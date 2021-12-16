---
layout: page
title: Express 미들웨어 사용
menu: guide
lang: ko
---

# 미들웨어 사용

Express는 자체적인 최소한의 기능을 갖춘 라우팅 및 미들웨어 웹 프레임워크이며, Express 애플리케이션은 기본적으로 일련의 미들웨어 함수 호출입니다.

*미들웨어* 함수는 [요청 오브젝트](/{{ page.lang }}/4x/api.html#req)(`req`), [응답 오브젝트](/{{ page.lang }}/4x/api.html#res) (`res`), 그리고 애플리케이션의 요청-응답 주기 중 그 다음의 미들웨어 함수 대한 액세스 권한을 갖는 함수입니다. 그 다음의 미들웨어 함수는 일반적으로 `next`라는 이름의 변수로 표시됩니다.

미들웨어 함수는 다음과 같은 태스크를 수행할 수 있습니다.

* 모든 코드를 실행.
* 요청 및 응답 오브젝트에 대한 변경을 실행.
* 요청-응답 주기를 종료.
* 스택 내의 그 다음 미들웨어 함수를 호출.

현재의 미들웨어 함수가 요청-응답 주기를 종료하지 않는 경우에는 `next()`를 호출하여 그 다음 미들웨어 함수에 제어를 전달해야 합니다. 그렇지 않으면 해당 요청은 정지된 채로 방치됩니다.

Express 애플리케이션은 다음과 같은 유형의 미들웨어를 사용할 수 있습니다.

 - [애플리케이션 레벨 미들웨어](#middleware.application)
 - [라우터 레벨 미들웨어](#middleware.router)
 - [오류 처리 미들웨어](#middleware.error-handling)
 - [기본 제공 미들웨어](#middleware.built-in)
 - [써드파티 미들웨어](#middleware.third-party)

애플리케이션 레벨 및 라우터 레벨 미들웨어는 선택적인 마운트 경로를 통해 로드할 수 있습니다.
일련의 미들웨어 함수를 함께 로드할 수도 있으며, 이를 통해 하나의 마운트 위치에 미들웨어 시스템의 하위 스택을 작성할 수 있습니다.

<h2 id='middleware.application'>애플리케이션 레벨 미들웨어</h2>

`app.use()` 및 `app.METHOD()` 함수를 이용해 애플리케이션 미들웨어를 [앱 오브젝트](/{{ page.lang }}/4x/api.html#app)의 인스턴스에 바인드하십시오. 이때 `METHOD`는 미들웨어 함수가 처리하는 요청(GET, PUT 또는 POST 등)의 소문자로 된 HTTP 메소드입니다.

다음 예에는 마운트 경로가 없는 미들웨어 함수가 표시되어 있습니다. 이 함수는 앱이 요청을 수신할 때마다 실행됩니다.

<pre>
<code class="language-javascript" translate="no">
var app = express();

app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});
</code>
</pre>

다음 예에는 `/user/:id` 경로에 마운트되는 미들웨어 함수가 표시되어 있습니다. 이 함수는 `/user/:id` 경로에
대한 모든 유형의 HTTP 요청에 대해 실행됩니다.

<pre>
<code class="language-javascript" translate="no">
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
</code>
</pre>

다음 예에는 라우트 및 해당 라우트의 핸들러 함수(미들웨어 시스템)이 표시되어 있습니다. 이 함수는 `/user/:id` 경로에 대한 GET 요청을 처리합니다.

<pre>
<code class="language-javascript" translate="no">
app.get('/user/:id', function (req, res, next) {
  res.send('USER');
});
</code>
</pre>

아래에는 하나의 마운트 경로를 통해 일련의 미들웨어 함수를 하나의 마운트 위치에 로드하는 예가 표시되어 있습니다.
이 예는 `/user/:id` 경로에 대한 모든 유형의 HTTP 요청에 대한 요청 정보를 인쇄하는 미들웨어 하위 스택을 나타냅니다.

<pre>
<code class="language-javascript" translate="no">
app.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
</code>
</pre>

라우트 핸들러를 이용하면 하나의 경로에 대해 여러 라우트를 정의할 수 있습니다. 아래의 예에서는 `/user/:id` 경로에 대한 GET 요청에 대해 2개의 라우트를 정의합니다. 두 번째 라우트는 어떠한 문제도 발생키지 않지만, 첫 번째 라우트가 요청-응답 주기를 종료시키므로 두 번째 라우트는 절대로 호출되지 않습니다.

다음 예에는 `/user/:id` 경로에 대한 GET 요청을 처리하는 미들웨어 하위 스택이 표시되어 있습니다.

<pre>
<code class="language-javascript" translate="no">
app.get('/user/:id', function (req, res, next) {
  console.log('ID:', req.params.id);
  next();
}, function (req, res, next) {
  res.send('User Info');
});

// handler for the /user/:id path, which prints the user ID
app.get('/user/:id', function (req, res, next) {
  res.end(req.params.id);
});
</code>
</pre>

라우터 미들웨어 스택의 나머지 미들웨어 함수들을 건너뛰려면 `next('route')`를 호출하여 제어를 그 다음 라우트로 전달하십시오.
**참고**: `next('route')`는 `app.METHOD()` 또는 `router.METHOD()` 함수를 이용해 로드된 미들웨어 함수에서만 작동합니다.

다음 예에는 `/user/:id` 경로에 대한 GET 요청을 처리하는 미들웨어 하위 스택이 표시되어 있습니다.

<pre>
<code class="language-javascript" translate="no">
app.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next route
  if (req.params.id == 0) next('route');
  // otherwise pass the control to the next middleware function in this stack
  else next(); //
}, function (req, res, next) {
  // render a regular page
  res.render('regular');
});

// handler for the /user/:id path, which renders a special page
app.get('/user/:id', function (req, res, next) {
  res.render('special');
});
</code>
</pre>

<h2 id='middleware.router'>라우터 레벨 미들웨어</h2>

라우터 레벨 미들웨어는 `express.Router()` 인스턴스에 바인드된다는 점을 제외하면 애플리케이션 레벨 미들웨어와 동일한 방식으로 작동합니다.

<pre>
<code class="language-javascript" translate="no">
var router = express.Router();
</code>
</pre>
`router.use()` 및 `router.METHOD()` 함수를 사용하여 라우터 레벨 미들웨어를 로드하십시오.

다음 예의 코드는 위에서 애플리케이션 레벨 미들웨어에 대해 표시된 미들웨어 시스템을 라우터 레벨 미들웨어를 사용하여 복제합니다.

<pre>
<code class="language-javascript" translate="no">
var app = express();
var router = express.Router();

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next router
  if (req.params.id == 0) next('route');
  // otherwise pass control to the next middleware function in this stack
  else next(); //
}, function (req, res, next) {
  // render a regular page
  res.render('regular');
});

// handler for the /user/:id path, which renders a special page
router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id);
  res.render('special');
});

// mount the router on the app
app.use('/', router);
</code>
</pre>

<h2 id='middleware.error-handling'>오류 처리 미들웨어</h2>

<div class="doc-box doc-notice" markdown="1">
오류 처리 미들웨어에는 항상 *4개*의 인수가 필요합니다.  어떠한 함수를 오류 처리 미들웨어 함수로 식별하려면 4개의 인수를 제공해야 합니다. `next` 오브젝트를 사용할 필요는 없지만, 시그니처를 유지하기 위해 해당 오브젝트를 지정해야 합니다. 그렇지 않으면 `next` 오브젝트는 일반적인 미들웨어로 해석되어 오류 처리에 실패하게 됩니다.
</div>

다른 미들웨어 함수와 동일반 방법으로 다음과 같이 오류 처리 미들웨어 함수를 정의할 수 있지만, 오류 처리 함수는 3개가 아닌 4개의 인수, 구체적으로 말하면 `(err, req, res, next)` 시그니처를 갖는다는 점이 다릅니다.

<pre>
<code class="language-javascript" translate="no">
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
</code>
</pre>

오류 처리 미들웨어에 대한 상세 정보는 [오류 처리](/{{ page.lang }}/guide/error-handling.html)를 참조하십시오.

<h2 id='middleware.built-in'>기본 제공 미들웨어</h2>

4.x 버전 이후의 Express는 더 이상 [Connect](https://github.com/senchalabs/connect)에 종속되지 않습니다. `express.static`의 실행을 제외하면, 이전에 Express와 함께
포함되었던 모든 미들웨어 함수는 이제 별도의 모듈에 포함되어 있습니다. [미들웨어 함수 목록](https://github.com/senchalabs/connect#middleware)을 확인하십시오.

<h4 id='express.static'>express.static(root, [options])</h4>

Express의 유일한 기본 제공 미들웨어 함수는 `express.static`입니다. 이 함수는 [serve-static](https://github.com/expressjs/serve-static)을 기반으로 하며, Express 애플리케이션의 정적 자산을 제공하는 역할을 합니다.

`root` 인수는 정적 자산의 제공을 시작하는 위치가 되는 루트 디렉토리를 지정합니다.

선택사항인 `options` 오브젝트는 다음과 같은 특성을 가질 수 있습니다.

| 특성      | 설명                                                           |   유형      | 기본값         |
|---------------|-----------------------------------------------------------------------|-------------|-----------------|
| `dotfiles`    | dotfile을 제공하기 위한 옵션입니다. 사용 가능한 값은 "allow", "deny" 및 "ignore"입니다. | 문자열 | "ignore" |
| `etag`        | etag의 생성을 사용 또는 사용 안함으로 설정합니다.  | 부울 | `true` |
| `extensions`  | 파일 확장자 폴백을 설정합니다. | 배열 | `[]` |
| `index`       | 디렉토리 인덱스 파일을 전송합니다. 디렉토리 인덱스 작성을 사용하지 않으려면 `false`를 설정하십시오. | 혼합 | "index.html" |
 `lastModified` | OS에서 해당 파일이 마지막으로 수정된 날짜를 `Last-Modified` 헤더에 설정합니다. 사용 가능한 값은 `true` 또는 `false`입니다. | 부울 | `true` |
| `maxAge`      | 밀리초 또는 [ms 형식](https://www.npmjs.org/package/ms)의 문자열로 Cache-Control 헤더의 max-age 특성을 설정합니다. | 숫자 | 0 |
| `redirect`    | 경로 이름이 디렉토리인 경우 후미부의 "/"로 경로를 재지정합니다. | 부울 | `true` |
| `setHeaders`  | 파일을 제공하도록 HTTP 헤더를 설정하기 위한 함수입니다. | 함수 |  |

아래에는 상세한 옵션 오브젝트와 함께 `express.static` 미들웨어 함수를 사용하는 예가 표시되어 있습니다.

<pre>
<code class="language-javascript" translate="no">
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
}

app.use(express.static('public', options));
</code>
</pre>

다음과 같이, 하나의 앱은 2개 이상의 정적 디렉토리를 가질 수 있습니다.

<pre>
<code class="language-javascript" translate="no">
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.static('files'));
</code>
</pre>

`serve-static` 함수 및 그 옵션에 대한 자세한 정보는 [serve-static](https://github.com/expressjs/serve-static) 문서를 참조하십시오.

<h2 id='middleware.third-party'>써드파티 미들웨어</h2>

Express 앱에 기능을 추가하려면 써드파티 미들웨어를 사용하십시오.

필요한 기능을 위한 Node.js 모듈을 설치한 후, 애플리케이션 레벨 또는 라우터 레벨에서 해당 모듈을 앱에 로드하십시오.

다음 예는 쿠키 구문 분석 미들웨어 함수인 `cookie-parser`의 설치 및 로드를 나타냅니다.

```console
$ npm install cookie-parser
```

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

// load the cookie-parsing middleware
app.use(cookieParser());
</code>
</pre>

Express와 함께 일반적으로 사용되고 있는 써드파티 미들웨어 함수의 일부 목록을 확인하려면 [써드파티 미들웨어](../resources/middleware.html)를 참조하십시오.
