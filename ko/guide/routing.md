---
layout: page
title: Express 라우팅
menu: guide
lang: ko
---

# 라우팅

*라우팅*은 애플리케이션 엔드 포인트(URI)의 정의, 그리고 URI가 클라이언트 요청에 응답하는 방식을 말합니다.
라우팅에 대한 소개는 [기본 라우팅](/{{ page.lang }}/starter/basic-routing.html)을 참조하십시오.

다음 코드는 매우 기본적인 라우트의 예입니다.

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});
</code>
</pre>

<h2 id="route-methods">라우트 메소드</h2>

라우트 메소드는 HTTP 메소드 중 하나로부터 파생되며, `express` 클래스의 인스턴스에 연결됩니다.

다음 코드는 앱의 루트에 대한 GET 및 POST 메소드에 대해 정의된 라우트의 예입니다.

<pre>
<code class="language-javascript" translate="no">
// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage');
});

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage');
});
</code>
</pre>

Express는 HTTP 메소드에 해당하는 다음과 같은 라우팅 메소드를 지원합니다.
`get`, `post`, `put`, `head`, `delete`, `options`, `trace`, `copy`, `lock`, `mkcol`, `move`, `purge`, `propfind`, `proppatch`, `unlock`, `report`, `mkactivity`, `checkout`, `merge`, `m-search`, `notify`, `subscribe`, `unsubscribe`, `patch`, `search` 및 `connect`.

<div class="doc-box doc-info" markdown="1">
올바르지 않은 JavaScript 변수 이름으로 변환되는 메소드를 라우팅하려면 대괄호 표기법을 사용하십시오. 예를 들면
`app['m-search']('/', function ...` 등과 같습니다.
</div>

특수한 라우팅 메소드인 `app.all()`은 어떠한 HTTP 메소드로부터도 파생되지 않습니다. 이 메소드는 모든 요청 메소드에 대해 한 경로에서 미들웨어 함수를 로드하는 데 사용됩니다.

다음 예에서는, GET, POST, PUT 또는 DELETE 메소드를 사용하는 경우, 또는 [http 모듈](https://nodejs.org/api/http.html#http_http_methods)에서 지원되는 기타 모든 HTTP 요청 메소드를 사용하는 경우 등의 "/secret"에 대한 요청을 위하여 핸들러가 실행됩니다.

<pre>
<code class="language-javascript" translate="no">
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});
</code>
</pre>

<h2 id="route-paths">라우트 경로</h2>

라우트 경로는, 요청 메소드와의 조합을 통해, 요청이 이루어질 수 있는 엔드포인트를 정의합니다. 라우트 경로는 문자열, 문자열 패턴 또는 정규식일 수 있습니다.

<div class="doc-box doc-info" markdown="1">
  Express는 라우트 경로의 일치를 위해 [path-to-regexp](https://www.npmjs.com/package/path-to-regexp)를 사용합니다. 라우트 경로를 정의할 수 있는 모든 가능성을 확인하려면 path-to-regexp 문서를 참조하십시오. [Express Route Tester](http://forbeslindesay.github.io/express-route-tester/)는 기본적인 Express 라우트의 테스트를 위한 편리한 도구이지만, 패턴 일치는 지원하지 않습니다.
</div>

<div class="doc-box doc-warn" markdown="1">
조회 문자열은 라우트 경로의 일부가 아닙니다.
</div>

문자열을 기반으로 하는 라우트 경로의 몇 가지 예는 다음과 같습니다.

다음의 라우트 경로는 요청을 루트 라우트 `/`에 일치시킵니다.

<pre>
<code class="language-javascript" translate="no">
app.get('/', function (req, res) {
  res.send('root');
});
</code>
</pre>

다음의 라우트 경로는 요청을 `/about`에 일치시킵니다.

<pre>
<code class="language-javascript" translate="no">
app.get('/about', function (req, res) {
  res.send('about');
});
</code>
</pre>

다음의 라우트 경로는 요청을 `/random.text`에 일치시킵니다.

<pre>
<code class="language-javascript" translate="no">
app.get('/random.text', function (req, res) {
  res.send('random.text');
});
</code>
</pre>

문자열 패턴을 기반으로 하는 라우트 경로의 몇 가지 예는 다음과 같습니다.

다음의 라우트 경로는 `acd` 및 `abcd`와 일치합니다.

<pre>
<code class="language-javascript" translate="no">
app.get('/ab?cd', function(req, res) {
  res.send('ab?cd');
});
</code>
</pre>

다음의 라우트 경로는 `abcd`, `abbcd` 및 `abbbcd` 등과 일치합니다.

<pre>
<code class="language-javascript" translate="no">
app.get('/ab+cd', function(req, res) {
  res.send('ab+cd');
});
</code>
</pre>

다음의 라우트 경로는 `abcd`, `abxcd`, `abRABDOMcd` 및 `ab123cd` 등과 일치합니다.

<pre>
<code class="language-javascript" translate="no">
app.get('/ab*cd', function(req, res) {
  res.send('ab*cd');
});
</code>
</pre>

다음의 라우트 경로는 `/abe` 및 `/abcde`와 일치합니다.

<pre>
<code class="language-javascript" translate="no">
app.get('/ab(cd)?e', function(req, res) {
 res.send('ab(cd)?e');
});
</code>
</pre>

<div class="doc-box doc-info" markdown="1">
?, +, * 및 () 문자는 정규식 문자의 서브세트입니다. 하이픈(-) 및 점(.)은 문자열 기반 경로에 의해 문자 그대로 해석됩니다.
</div>

정규식을 기반으로 하는 라우트 경로의 예:

다음의 라우트 경로는 라우트 이름에 "a"가 포함된 모든 항목과 일치합니다.

<pre>
<code class="language-javascript" translate="no">
app.get(/a/, function(req, res) {
  res.send('/a/');
});
</code>
</pre>

다음의 라우트 경로는 `butterfly` 및 `dragonfly`와 일치하지만, `butterflyman` 및 `dragonfly man` 등과 일치하지 않습니다.

<pre>
<code class="language-javascript" translate="no">
app.get(/.*fly$/, function(req, res) {
  res.send('/.*fly$/');
});
</code>
</pre>

<h2 id="route-handlers">라우트 핸들러</h2>

[미들웨어](/{{ page.lang }}/guide/using-middleware.html)와 비슷하게 작동하는 여러 콜백 함수를 제공하여 요청을 처리할 수 있습니다. 유일한 차이점은 이러한 콜백은 `next('route')`를 호출하여 나머지 라우트 콜백을 우회할 수도 있다는 점입니다. 이러한 메커니즘을 이용하면 라우트에 대한 사전 조건을 지정한 후, 현재의 라우트를 계속할 이유가 없는 경우에는 제어를 후속 라우트에 전달할 수 있습니다.

다음 예에 나타난 것과 같이, 라우트 핸들러는 함수나 함수 배열의 형태 또는 둘을 조합한 형태일 수 있습니다.

하나의 콜백 함수는 하나의 라우트를 처리할 수 있습니다.  예를 들면 다음과 같습니다.

<pre>
<code class="language-javascript" translate="no">
app.get('/example/a', function (req, res) {
  res.send('Hello from A!');
});
</code>
</pre>

2개 이상의 콜백 함수는 하나의 라우트를 처리할 수 있습니다(`next` 오브젝트를 반드시 지정해야 함). 예를 들면 다음과 같습니다.

<pre>
<code class="language-javascript" translate="no">
app.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from B!');
});
</code>
</pre>

하나의 콜백 함수 배열은 하나의 라우트를 처리할 수 있습니다.  예를 들면 다음과 같습니다.

<pre>
<code class="language-javascript" translate="no">
var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

var cb2 = function (req, res) {
  res.send('Hello from C!');
}

app.get('/example/c', [cb0, cb1, cb2]);
</code>
</pre>

독립적인 함수와 함수 배열의 조합은 하나의 라우트를 처리할 수 있습니다.  예를 들면 다음과 같습니다.

<pre>
<code class="language-javascript" translate="no">
var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from D!');
});
</code>
</pre>

<h2 id="response-methods">응답 메소드</h2>

다음 표에 표시된 응답 오브젝트에 대한 메소드(`res`)는 응답을 클라이언트로 전송하고 요청-응답 주기를 종료할 수 있습니다. 라우트 핸들러로부터 다음 메소드 중 어느 하나도 호출되지 않는 경우, 클라이언트 요청은 정지된 채로 방치됩니다.

| 메소드               | 설명
|----------------------|--------------------------------------
| [res.download()](/{{ page.lang }}/4x/api.html#res.download)   | 파일이 다운로드되도록 프롬프트합니다.
| [res.end()](/{{ page.lang }}/4x/api.html#res.end)        | 응답 프로세스를 종료합니다.
| [res.json()](/{{ page.lang }}/4x/api.html#res.json)       | JSON 응답을 전송합니다.
| [res.jsonp()](/{{ page.lang }}/4x/api.html#res.jsonp)      | JSONP 지원을 통해 JSON 응답을 전송합니다.
| [res.redirect()](/{{ page.lang }}/4x/api.html#res.redirect)   | 요청의 경로를 재지정합니다.
| [res.render()](/{{ page.lang }}/4x/api.html#res.render)     | 보기 템플리트를 렌더링합니다.
| [res.send()](/{{ page.lang }}/4x/api.html#res.send)       | 다양한 유형의 응답을 전송합니다.
| [res.sendFile()](/{{ page.lang }}/4x/api.html#res.sendFile)     | 파일을 옥텟 스트림의 형태로 전송합니다.
| [res.sendStatus()](/{{ page.lang }}/4x/api.html#res.sendStatus) | 응답 상태 코드를 설정한 후 해당 코드를 문자열로 표현한 내용을 응답 본문으로서 전송합니다.

<h2 id="app-route">app.route()</h2>

`app.route()`를 이용하면 라우트 경로에 대하여 체인 가능한 라우트 핸들러를 작성할 수 있습니다.
경로는 한 곳에 지정되어 있으므로, 모듈식 라우트를 작성하면 중복성과 오타가 감소하여 도움이 됩니다. 라우트에 대한 자세한 정보는 [Router() 문서](/{{ page.lang }}/4x/api.html#router)를 참조하십시오.

`app.route()`를 사용하여 정의된 체인 라우트 핸들러의 예는 다음과 같습니다.

<pre>
<code class="language-javascript" translate="no">
app.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });
</code>
</pre>

<h2 id="express-router">express.Router</h2>

`express.Router` 클래스를 사용하면 모듈식 마운팅 가능한 핸들러를 작성할 수 있습니다. `Router` 인스턴스는 완전한 미들웨어이자 라우팅 시스템이며, 따라서 "미니 앱(mini-app)"이라고 불리는 경우가 많습니다.

다음 예에서는 라우터를 모듈로서 작성하고, 라우터 모듈에서 미들웨어 함수를 로드하고, 몇몇 라우트를 정의하고, 기본 앱의 한 경로에 라우터 모듈을 마운트합니다.

다음의 내용이 입력된 `birds.js`라는 이름의 라우터 파일을 앱 디렉토리에 작성하십시오.

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.send('Birds home page');
});
// define the about route
router.get('/about', function(req, res) {
  res.send('About birds');
});

module.exports = router;
</code>
</pre>

이후 앱 내에서 다음과 같이 라우터 모듈을 로드하십시오.

<pre>
<code class="language-javascript" translate="no">
var birds = require('./birds');
...
app.use('/birds', birds);
</code>
</pre>

앱은 이제 `/birds` 및 `/birds/about`에 대한 요청을 처리할 수 있게 되었으며, 해당 라우트에 대한 특정한 미들웨어 함수인 `timeLog`를 호출할 것입니다.
