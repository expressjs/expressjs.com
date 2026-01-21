---
layout: page
title: Express 오류 처리
description: Express.js가 동기 및 비동기 코드에서 오류를 처리하는 방식을 이해하고, 애플리케이션에 맞는 사용자 정의 오류 처리 미들웨어를 구현하는 방법을 알아보세요.
menu: guide
order: 6
redirect_from: "  "
---

# 오류 처리

에러 처리란 Express가 동기 및 비동기적으로 발생하는 에러를 포착하고 처리하는 방식을 의미합니다. Express는 기본 에러 처리기를 제공하므로 시작하기 위해 직접 작성할 필요가 없습니다.

## 에러 포착하기

Express가 라우트 핸들러와 미들웨어 실행 중 발생하는 모든 에러를 포착하는 것이 중요합니다.

라우트 핸들러 및 미들웨어 내부의 동기 코드에서 발생하는 에러는 추가 작업이 필요하지 않습니다. 동기 코드에서 에러가 발생하면 Express가 에러를 감지하여 처리합니다. 예를 들면 다음과 같습니다.

```js
app.get('/', (req, res) => {
  throw new Error('BROKEN') // Express will catch this on its own.
})
```

여러 콜백 함수를 갖는 라우트 핸들러가 있는 경우에는 `route` 매개변수를 사용하여 그 다음의 라우트 핸들러로 건너뛸 수 있습니다.  예를 들면 다음과 같습니다.

```js
app.get('/', (req, res, next) => {
  fs.readFile('/file-does-not-exist', (err, data) => {
    if (err) {
      next(err) // Pass errors to Express.
    } else {
      res.send(data)
    }
  })
})
```

다른 미들웨어 함수와 동일한 방법으로 오류 처리 미들웨어 함수를 정의할 수 있지만,
오류 처리 함수는 3개가 아닌 4개의 인수, 즉 `(err, req, res, next)`를
갖는다는 점이 다릅니다.
예를 들면 다음과 같습니다.

```js
app.get('/user/:id', async (req, res, next) => {
  const user = await getUserById(req.params.id)
  res.send(user)
})
```

`getUserById`에서 에러가 발생하거나 거부(reject)되면, `next`는 발생한 에러 또는 거부된 값을 사용하여 호출됩니다. 만약 거부된 값(rejected value)이 제공되지 않으면 `next`는 Express 라우터가 제공하는 기본 에러 객체와 함께 호출됩니다.

`next()` 함수로 어떠한 내용을 전달하는 경우(`'route'`라는 문자열 제외), Express는 현재의 요청에 오류가 있는 것으로 간주하며, 오류 처리와 관련되지 않은 나머지 라우팅 및 미들웨어 함수를 건너뜁니다.

만약 연속적인 과정(sequence)에서 콜백이 데이터는 제공하지 않고 에러만 제공한다면 다음과 같이 코드를 간소화할 수 있습니다:

```js
app.get('/', [
  function (req, res, next) {
    fs.writeFile('/inaccessible-path', 'data', next)
  },
  function (req, res) {
    res.send('OK')
  }
])
```

위 예제에서, `next`는 `fs.writeFile`의 콜백으로 제공되며 이 콜백은 에러 발생 여부와 관계없이 호출됩니다. 에러가 없으면 두 번째 핸들러가 실행되고, 그렇지 않으면 Express에서 에러를 포착하여 처리합니다.

라우트 핸들러나 미들웨어에서 호출하는 비동기 코드에서 발생하는 에러는 반드시 포착하여 Express에 전달하여 처리해야 합니다. 예를 들면 다음과 같습니다.

```js
app.get('/', (req, res, next) => {
  setTimeout(() => {
    try {
      throw new Error('BROKEN')
    } catch (err) {
      next(err)
    }
  }, 100)
})
```

위 예제는 `try...catch` 블록을 사용하여 비동기 코드의 에러를 포착하여 Express에 전달합니다. 만약 `try...catch` 블록이 생략되면, Express는 해당 에러가 동기 핸들러 코드의 일부가 아니므로 에러를 포착하지 못할 것입니다.

프로미스를 사용하면 `try...catch` 블록의 오버헤드를 피하거나 프로미스를 반환하는 함수를 사용할 때 유용합니다. 예를 들면 다음과 같습니다.  예를 들면 다음과 같습니다.

```js
app.get('/', (req, res, next) => {
  Promise.resolve().then(() => {
    throw new Error('BROKEN')
  }).catch(next) // Errors will be passed to Express.
})
```

프로미스는 동기 에러와 거부된 프로미스를 모두 자동으로 포착하므로, `next`를 최종 catch 핸들러로 제공하기만 해도 Express가 에러를 포착합니다. 이는 catch 핸들러가 에러를 첫 번째 인자로 받기 때문입니다.

또한 비동기 코드를 최소화하여 동기 에러 감지에 의존하는 핸들러 체인을 사용할 수도 있습니다. 예를 들면 다음과 같습니다.

```js
app.get('/', [
  function (req, res, next) {
    fs.readFile('/maybe-valid-file', 'utf-8', (err, data) => {
      res.locals.data = data
      next(err)
    })
  },
  function (req, res) {
    res.locals.data = res.locals.data.split(',')[1]
    res.send(res.locals.data)
  }
])
```

위 예제에는 `readFile` 호출에서 몇 가지 간단한 내용을 포함합니다. 만약 `readFile`에서 에러가 발생한다면 Express로 해당 에러가 전달되고, 그렇지 않으면 체인의 다음 핸들러로 넘어가면서 동기적인 에러 처리 흐름으로 복귀하게 됩니다.  그런 다음 위 예제에서는 데이터 처리를 시도합니다. 만약 이 과정이 실패하면 동기 에러 핸들러가 에러를 포착합니다. 만약 이 처리를 `readFile` 콜백 내부에서 했다면 애플리케이션이 비정상 종료되어 Express 에러 핸들러가 실행되지 못할 수도 있습니다.

어떤 방법을 사용하든, Express 에러 핸들러가 호출되고 애플리케이션이 정상적으로 작동하게 하려면 Express가 에러를 받도록 해야 합니다.

## 기본 오류 핸들러

Express는 내장된 오류 핸들러와 함께 제공되며, 내장 오류 핸들러는 앱에서 발생할 수 있는 모든 오류를 처리합니다. 이러한 기본 오류 처리 미들웨어 함수는 미들웨어 함수 스택의 끝에 추가됩니다.

`next()`로 오류를 전달하지만 오류 핸들러에서 해당 오류를
처리하지 않는 경우, 기본 제공 오류 핸들러가 해당 오류를 처리하며, 해당 오류는
클라이언트에 스택 추적과 함께 기록됩니다. 스택 추적은 프로덕션 환경에 포함되어 있지 않습니다.

<div class="doc-box doc-info" markdown="1">
프로덕션 모드에서 앱을 실행하려면 환경 변수 `NODE_ENV`를 `production`으로 설정하십시오.
</div>

에러가 기록되면 다음 정보가 응답에 추가됩니다:

- `res.statusCode`는 `err.status` 또는 `err.statusCode`값으로 설정됩니다. 이 값이 4xx 또는 5xx 범위를 벗어나면 500 으로 설정됩니다.
- `res.statusMessage`는 상태 코드에 따라 설정됩니다.
- body는 프로덕션 환경일 경우 상태 코드 메시지의 HTML이 되고, 그렇지 않은 경우 `err.stack`이 됩니다.
- `err.headers` 객체에 지정된 모든 헤더가 포함됩니다.

응답의 기록을 시작한 후에 오류가 있는 `next()`를
호출하는 경우(예: 응답을 클라이언트로 스트리밍하는 중에 오류가
발생하는 경우), Express의 기본 오류 핸들러는 해당 연결을 닫고
해당 요청을 처리하지 않습니다.

따라서 사용자 정의 오류 핸들러를 추가할 때, 헤더가 이미 클라이언트로 전송된 경우에는
다음과 같이 Express 내의 기본 오류 처리 메커니즘에 위임해야 합니다:

```js
function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
}
```

만약 `next()`를 여러분의 코드에서 여러 번 호출한다면, 사용자 정의 오류 핸들러가 있음에도 불구하고 기본 오류 핸들러가 발동될 수 있음에 주의하십시오.

다른 에러 핸들링 미들웨어는 [Express middleware](/{{ page.lang }}/resources/middleware.html) 에서 확인할 수 있습니다.

## 에러 핸들러 작성하기

에러 핸들링 미들웨어 함수는 다른 미들웨어 함수와 동일한 방식으로 정의합니다. 단, 에러 핸들링 함수는 세 개가 아닌 네 개의 인수(`err`, `req`, `res`, `next`)를 받는다는 점이 다릅니다. 예를 들면 다음과 같습니다.

```js
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

오류 처리 미들웨어는 다른 `app.use()` 및 라우트 호출을 정의한 후에 마지막으로 정의해야 하며, 예를 들면 다음과 같습니다.

```js
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(methodOverride())
app.use((err, req, res, next) => {
  // logic
})
```

미들웨어 함수 내부로부터의 응답은 HTML 오류 페이지, 단순한 메시지 또는 JSON 문자열 등 여러분이 선호하는 모든 형식일 수 있습니다.

조직적(및 상위 레벨 프레임워크) 목적을 위해, 여러 오류 처리
미들웨어 함수를 정의할 수 있으며, 이는 일반적인 미들웨어 함수를 정의할 때와
매우 비슷합니다. 예를 들어 `XHR`를 이용한 요청 및
그렇지 않은 요청에 대한 오류 처리를 정의하려는 경우, 다음과 같은 명령을 사용할 수 있습니다.

```js
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(methodOverride())
app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)
```

이 예에서 일반 `logErrors`는 요청 및 오류 정보를 `stderr`에
기록할 수도 있으며, 예를 들면 다음과 같습니다.

```js
function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}
```

또한 이 예에서 `clientErrorHandler`는 다음과 같이 정의되며, 이 경우 오류는 명시적으로 그 다음 항목으로 전달됩니다.

에러 핸들링 함수에서 "next"를 호출하지 **않을** 경우, response를 작성하고 종료해야 합니다. 그렇지 않으면 해당 request는 "중단(hang)"되어 가비지 컬렉션 대상이 되지 않습니다.

```js
function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}
```

"모든 오류를 처리하는(catch-all)" `errorHandler` 함수는 다음과 같이 구현될 수 있습니다.

```js
function errorHandler (err, req, res, next) {
  res.status(500)
  res.render('error', { error: err })
}
```

만약 여러개의 콜백 함수가 있는 라우트 핸들러가 있다면 `route` 매개변수를 사용하여 다음 라우트 핸들러로 건너뛸 수 있습니다. 예를 들면 다음과 같습니다.

```js
app.get('/a_route_behind_paywall',
  (req, res, next) => {
    if (!req.user.hasPaid) {
      // continue handling this request
      next('route')
    } else {
      next()
    }
  }, (req, res, next) => {
    PaidContent.find((err, doc) => {
      if (err) return next(err)
      res.json(doc)
    })
  })
```

이 예에서 `getPaidContent` 핸들러의 실행은 건너뛰지만, `/a_route_behind_paywall`에 대한 `app` 내의 나머지 핸들러는 계속하여 실행됩니다.

<div class="doc-box doc-info" markdown="1">
`next()` 및 `next(err)`에 대한 호출은 현재의 핸들러가 완료되었다는 것과 해당 핸들러의 상태를 표시합니다.  `next(err)`는 위에 설명된 것과 같이 오류를 처리하도록 설정된 핸들러를 제외한 체인 내의 나머지 모든 핸들러를 건너뜁니다.
</div>
