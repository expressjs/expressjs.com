---
layout: page
title: Express 오류 처리
menu: guide
lang: ko
---

# 오류 처리

다른 미들웨어 함수와 동일한 방법으로 오류 처리 미들웨어 함수를 정의할 수 있지만,
오류 처리 함수는 3개가 아닌 4개의 인수, 즉 `(err, req, res, next)`를
갖는다는 점이 다릅니다. 예를 들면 다음과 같습니다.

<pre>
<code class="language-javascript" translate="no">
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
</code>
</pre>

오류 처리 미들웨어는 다른 `app.use()` 및 라우트 호출을 정의한 후에 마지막으로 정의해야 하며, 예를 들면 다음과 같습니다.

<pre>
<code class="language-javascript" translate="no">
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser());
app.use(methodOverride());
app.use(function(err, req, res, next) {
  // logic
});
</code>
</pre>

미들웨어 함수 내부로부터의 응답은 HTML 오류 페이지, 단순한 메시지 또는 JSON 문자열 등 여러분이 선호하는 모든 형식일 수 있습니다.

조직적(및 상위 레벨 프레임워크) 목적을 위해, 여러 오류 처리
미들웨어 함수를 정의할 수 있으며, 이는 일반적인 미들웨어 함수를 정의할 때와
매우 비슷합니다. 예를 들어 `XHR`를 이용한 요청 및
그렇지 않은 요청에 대한 오류 처리를 정의하려는 경우, 다음과 같은 명령을 사용할 수 있습니다.

<pre>
<code class="language-javascript" translate="no">
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser());
app.use(methodOverride());
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
</code>
</pre>

이 예에서 일반 `logErrors`는 요청 및 오류 정보를 `stderr`에
기록할 수도 있으며, 예를 들면 다음과 같습니다.

<pre>
<code class="language-javascript" translate="no">
function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}
</code>
</pre>

또한 이 예에서 `clientErrorHandler`는 다음과 같이 정의되며, 이 경우 오류는 명시적으로 그 다음 항목으로 전달됩니다.

<pre>
<code class="language-javascript" translate="no">
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}
</code>
</pre>

"모든 오류를 처리하는(catch-all)" `errorHandler` 함수는 다음과 같이 구현될 수 있습니다.

<pre>
<code class="language-javascript" translate="no">
function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}
</code>
</pre>

`next()` 함수로 어떠한 내용을 전달하는 경우(`'route'`라는 문자열 제외), Express는 현재의 요청에 오류가 있는 것으로 간주하며, 오류 처리와 관련되지 않은 나머지 라우팅 및 미들웨어 함수를 건너뜁니다. 이러한 오류를 어떻게든 처리하기 원하는 경우, 다음 섹션에 설명된 것과 같이 오류 처리 라우트를 작성해야 합니다.

여러 콜백 함수를 갖는 라우트 핸들러가 있는 경우에는 `route` 매개변수를 사용하여 그 다음의 라우트 핸들러로 건너뛸 수 있습니다.  예를 들면 다음과 같습니다.

<pre>
<code class="language-javascript" translate="no">
app.get('/a_route_behind_paywall',
  function checkIfPaidSubscriber(req, res, next) {
    if(!req.user.hasPaid) {

      // continue handling this request
      next('route');
    }
  }, function getPaidContent(req, res, next) {
    PaidContent.find(function(err, doc) {
      if(err) return next(err);
      res.json(doc);
    });
  });
</code>
</pre>

이 예에서 `getPaidContent` 핸들러의 실행은 건너뛰지만, `/a_route_behind_paywall`에 대한 `app` 내의 나머지 핸들러는 계속하여 실행됩니다.

<div class="doc-box doc-info" markdown="1">
`next()` 및 `next(err)`에 대한 호출은 현재의 핸들러가 완료되었다는 것과 해당 핸들러의 상태를 표시합니다.  `next(err)`는 위에 설명된 것과 같이 오류를 처리하도록 설정된 핸들러를 제외한 체인 내의 나머지 모든 핸들러를 건너뜁니다.
</div>

## 기본 오류 핸들러

Express는 내장된 오류 핸들러와 함께 제공되며, 내장 오류 핸들러는 앱에서 발생할 수 있는 모든 오류를 처리합니다. 이러한 기본 오류 처리 미들웨어 함수는 미들웨어 함수 스택의 끝에 추가됩니다.

`next()`로 오류를 전달하지만 오류 핸들러에서 해당 오류를
처리하지 않는 경우, 기본 제공 오류 핸들러가 해당 오류를 처리하며, 해당 오류는
클라이언트에 스택 추적과 함께 기록됩니다. 스택 추적은 프로덕션 환경에 포함되어 있지 않습니다.

<div class="doc-box doc-info" markdown="1">
프로덕션 모드에서 앱을 실행하려면 환경 변수 `NODE_ENV`를 `production`으로 설정하십시오.
</div>

응답의 기록을 시작한 후에 오류가 있는 `next()`를
호출하는 경우(예: 응답을 클라이언트로 스트리밍하는 중에 오류가
발생하는 경우), Express의 기본 오류 핸들러는 해당 연결을 닫고
해당 요청을 처리하지 않습니다.

따라서 사용자 정의 오류 핸들러를 추가할 때, 헤더가 이미 클라이언트로 전송된 경우에는
다음과 같이 Express 내의 기본 오류 처리 메커니즘에 위임해야 합니다:

<pre>
<code class="language-javascript" translate="no">
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
}
</code>
</pre>

만약 `next()`를 여러분의 코드에서 여러 번 호출한다면, 사용자 정의 오류 핸들러가 있음에도 불구하고 기본 오류 핸들러가 발동될 수 있음에 주의하십시오.
