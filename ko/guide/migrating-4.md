---
layout: page
title: Express 4로의 마이그레이션
menu: guide
lang: ko
---

# Express 4로의 이전

<h2 id="overview">개요</h2>

Express 4는 Express 3로부터 근본적으로 변경되었습니다. 따라서 기존 Express 3 앱의 종속 항목의 Express 버전을 업데이트하면 기존 Express 3 앱은 작동하지 않습니다.

이 문서에서는 다음을 다룹니다.

<ul class="doclist">
  <li><a href="#changes">Express 4에서의 변경사항.</a></li>
  <li>Express 3 앱의 Express 4로의 마이그레이션의 <a href="#example-migration">예</a>.</li>
  <li><a href="#app-gen">Express 4 생성기로의 업그레이드.</a></li>
</ul>

<h2 id="changes">Express 4에서의 변경사항</h2>

Express 4에서는 여러 중요한 부분이 변경되었습니다.

<ul class="doclist">
  <li><a href="#core-changes">Express 코어 및 미들웨어 시스템에 대한 변경.</a> Connect 및 기본 제공 미들웨어에 대한 종속 항목이 제거되었으며, 따라서 사용자가 직접 미들웨어를 추가해야 합니다.
  </li>
  <li><a href="#routing">라우팅 시스템에 대한 변경.</a></li>
  <li><a href="#other-changes">기타 다양한 변경사항.</a></li>
</ul>

또한 다음을 참조하십시오.

* [New features in 4.x.](https://github.com/expressjs/express/wiki/New-features-in-4.x)
* [Migrating from 3.x to 4.x.](https://github.com/expressjs/express/wiki/Migrating-from-3.x-to-4.x)

<h3 id="core-changes">
Express 코어 및 미들웨어 시스템에 대한 변경
</h3>

Express 4는 더 이상 Connect에 종속되지 않으며, `express.static` 함수를
제외한 모든 기본 제공 미들웨어가 Express 4 코어에서 제거되었습니다. 따라서 Express는
이제 독립적인 라우팅 및 미들웨어 웹 프레임워크가 되었으며, Express 버전화 및 릴리스는
미들웨어 업데이트의 영향을 받지 않게 되었습니다.

기본 제공 미들웨어가 없으므로 사용자는 앱을 실행하는 데 필요한
모든 미들웨어를 명시적으로 추가해야 합니다. 이를 위해서는 다음 단계를 따르기만 하면 됩니다.

1. 모듈 설치: `npm install --save <module-name>`
2. 앱 내에서, 모듈 요청: `require('module-name')`
3. 해당 모듈의 문서에 따라 모듈 사용: `app.use( ... )`

다음 표에는 Express 3의 미들웨어 및 그에 대응하는 Express 4의 미들웨어가 나열되어 있습니다.

<table class="doctable" border="1">
<tr><th>Express 3</th><th>Express 4</th></tr>
<tr><td><code>express.bodyParser</code></td>
<td><a href="https://github.com/expressjs/body-parser">body-parser</a> +
<a href="https://github.com/expressjs/multer">multer</a></td></tr>
<tr><td><code>express.compress</code></td>
<td><a href="https://github.com/expressjs/compression">compression</a></td></tr>
<tr><td><code>express.cookieSession</code></td>
<td><a href="https://github.com/expressjs/cookie-session">cookie-session</a></td></tr>
<tr><td><code>express.cookieParser</code></td>
<td><a href="https://github.com/expressjs/cookie-parser">cookie-parser</a></td></tr>
<tr><td><code>express.logger</code></td>
<td><a href="https://github.com/expressjs/morgan">morgan</a></td></tr>
<tr><td><code>express.session</code></td>
<td><a href="https://github.com/expressjs/session">express-session</a></td></tr>
<tr><td><code>express.favicon</code></td>
<td><a href="https://github.com/expressjs/serve-favicon">serve-favicon</a></td></tr>
<tr><td><code>express.responseTime</code></td>
<td><a href="https://github.com/expressjs/response-time">response-time</a></td></tr>
<tr><td><code>express.errorHandler</code></td>
<td><a href="https://github.com/expressjs/errorhandler">errorhandler</a></td></tr>
<tr><td><code>express.methodOverride</code></td>
<td><a href="https://github.com/expressjs/method-override">method-override</a></td></tr>
<tr><td><code>express.timeout</code></td>
<td><a href="https://github.com/expressjs/timeout">connect-timeout</a></td></tr>
<tr><td><code>express.vhost</code></td>
<td><a href="https://github.com/expressjs/vhost">vhost</a></td></tr>
<tr><td><code>express.csrf</code></td>
<td><a href="https://github.com/expressjs/csurf">csurf</a></td></tr>
<tr><td><code>express.directory</code></td>
<td><a href="https://github.com/expressjs/serve-index">serve-index</a></td></tr>
<tr><td><code>express.static</code></td>
<td><a href="https://github.com/expressjs/serve-static">serve-static</a></td></tr>
</table>

Express 4 미들웨어의 [전체 목록](https://github.com/senchalabs/connect#middleware)을 참조하십시오.

대부분의 경우 구버전인 버전 3의 미들웨어를 Express 4의 대응하는
미들웨어로 대체할 수 있습니다. 상세 정보는 GitHub 모듈 문서를
참조하십시오.

<h4 id="app-use"><code>app.use</code>가 매개변수를 수락</h4>

버전 4에서는 미들웨어 함수가 로드되는 경로를 정의하기 위하여 가변 매개변수를 사용할 수 있으며, 이후 라우트 핸들러로부터 매개변수의 값을 읽을 수 있습니다.
예를 들면 다음과 같습니다.

<pre>
<code class="language-javascript" translate="no">
app.use('/book/:id', function(req, res, next) {
  console.log('ID:', req.params.id);
  next();
});
</code>
</pre>
<h3 id="routing">
라우팅 시스템
</h3>

이제 앱은 라우팅 미들웨어를 암시적으로 로드하므로, 더 이상
`router` 미들웨어에 대한 미들웨어 로드 순서에 대해
걱정할 필요가 없습니다.

라우트를 정의하는 방법은 변경되지 않았지만, 라우트의 구성을 돕기 위하여
라우팅 시스템에는 다음과 같은 2개의 새로운 기능이 추가되었습니다.

{: .doclist }
* 라우트 경로에 대하여 체인 가능한 라우트 핸들러를 작성할 수 있는 새로운 메소드인 `app.route()`.
* 모듈식 마운팅 가능한 라우트 핸들러를 작성할 수 있는 새로운 클래스인 `express.Router`.

<h4 id="app-route"><code>app.route()</code> 메소드</h4>

새롭게 추가된 `app.route()` 메소드를 이용하면 라우트 경로에 대하여 체인 가능한
라우트 핸들러를 작성할 수 있습니다. 경로는 한 곳에 지정되어 있으므로, 모듈식 라우트를 작성하면 중복성과 오타가 감소하여 도움이 됩니다. 라우트에 대한
자세한 정보는 [`Router()` 문서](/{{ page.lang }}/4x/api.html#router)를 참조하십시오.

`app.route()` 함수를 사용하여 정의된 체인 라우트 핸들러의 예는 다음과 같습니다.

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

<h4 id="express-router"><code>express.Router</code> 클래스</h4>

라우트의 구성을 돕는 다른 기능은 새롭게 추가된 클래스인
`express.Router`이며, 이를 이용해 모듈식 마운팅 가능한
라우트 핸들러를 작성할 수 있습니다. `Router` 인스턴스는 완전한 미들웨어이자
라우팅 시스템이며, 따라서 "미니 앱(mini-app)"이라고 불리는 경우가 많습니다.

다음 예에서는 라우터를 모듈로서 작성하고, 라우터 모듈에서 미들웨어를 로드하고,
몇몇 라우트를 정의하고, 기본 앱의 한 경로에 라우터 모듈을 마운트합니다.

예를 들면, 다음의 내용이 입력된 `birds.js`라는 이름의 라우터 파일을
앱 디렉토리에 작성할 수 있습니다.

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var router = express.Router();

// middleware specific to this router
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

앱은 이제 `/birds` 및 `/birds/about` 경로에 대한
요청을 처리할 수 있게 되었으며, 해당 라우트에 대한 특정한 미들웨어인
`timeLog`를 로드할 것입니다.

<h3 id="other-changes">
기타 변경사항
</h3>

다음 표에는 Express 4의 작지만 중요한 다른 변경사항이 나열되어 있습니다.

<table class="doctable" border="1">
<tr>
<th>오브젝트</th>
<th>설명</th>
</tr>
<tr>
<td>Node.js</td>
<td>Express 4에는 Node.js 0.10.x 이상이 필요하며 Node.js 0.8.x에 대한 지원은
중단되었습니다.</td>
</tr>
<tr>
<td markdown="1">
`http.createServer()`
</td>
<td markdown="1">
`http` 모듈을 이용해 직접 작업해야 하는 경우(socket.io/SPDY/HTTPS)를 제외하면, `http` 모듈이 더 이상 필요하지 않습니다. `app.listen()`
함수를 이용해 앱을 시작할 수 있습니다.
</td>
</tr>
<tr>
<td markdown="1">
`app.configure()`
</td>
<td markdown="1">
`app.configure()` 함수가 제거되었습니다.  환경을 발견하고
그에 따라 앱을 구성하려면 `process.env.NODE_ENV`
또는 `app.get('env')` 함수를 사용하십시오.
</td>
</tr>
<tr>
<td markdown="1">
`json spaces`
</td>
<td markdown="1">
Express 4에서는 기본적으로 `json spaces` 애플리케이션 특성을 사용하지 않습니다.
</td>
</tr>
<tr>
<td markdown="1">
`req.accepted()`
</td>
<td markdown="1">
`req.accepts()`, `req.acceptsEncodings()`,
`req.acceptsCharsets()` 및 `req.acceptsLanguages()`를 사용하십시오.
</td>
</tr>
<tr>
<td markdown="1">
`res.location()`
</td>
<td markdown="1">
더 이상 상대 URL을 분석하지 않습니다.
</td>
</tr>
<tr>
<td markdown="1">
`req.params`
</td>
<td markdown="1">
이전에는 배열이었지만 이제 오브젝트가 되었습니다.
</td>
</tr>
<tr>
<td markdown="1">
`res.locals`
</td>
<td markdown="1">
이전에는 함수였지만 이제 오브젝트가 되었습니다.
</td>
</tr>
<tr>
<td markdown="1">
`res.headerSent`
</td>
<td markdown="1">
`res.headersSent`로 변경되었습니다.
</td>
</tr>
<tr>
<td markdown="1">
`app.route`
</td>
<td markdown="1">
이제 `app.mountpath`로 사용 가능합니다.
</td>
</tr>
<tr>
<td markdown="1">
`res.on('header')`
</td>
<td markdown="1">
제거되었습니다.
</td>
</tr>
<tr>
<td markdown="1">
`res.charset`
</td>
<td markdown="1">
제거되었습니다.
</td>
</tr>
<tr>
<td markdown="1">
`res.setHeader('Set-Cookie', val)`
</td>
<td markdown="1">
이제 기능이 기본 쿠키 값의 설정으로 제한되었습니다. 추가적인
기능을 위해서는 `res.cookie()`를 사용하십시오.
</td>
</tr>
</table>

<h2 id="example-migration">앱 마이그레이션의 예</h2>

여기서는 Express 3 애플리케이션을 Express 4로 마이그레이션하는 예를 살펴보겠습니다.
대상 파일은 `app.js` 및 `package.json`입니다.

<h3 id="">
버전 3 앱
</h3>

<h4 id=""><code>app.js</code></h4>

다음과 같은 `app.js` 파일을 갖는 Express 버전 3 애플리케이션을 가정합니다.

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.methodOverride());
app.use(express.session({ secret: 'your secret here' }));
app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
</code>
</pre>

<h4 id=""><code>package.json</code></h4>

동반되는 버전 3의 `package.json` 파일의 내용은
  다음과 같을 수 있습니다.

<pre>
<code class="language-javascript" translate="no">
{
  "name": "application-name",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "3.12.0",
    "pug": "*"
  }
}
</code>
</pre>

<h3 id="">
프로세스
</h3>

다음의 명령을 통해 Express 4에 필요한 미들웨어를 설치하고 Express 및 Pug를
각각 최신 버전으로 업데이트하여 마이그레이션 프로세스를
시작하십시오.

```console
$ npm install serve-favicon morgan method-override express-session body-parser multer errorhandler express@latest pug@latest --save
```

`app.js`를 다음과 같이 변경하십시오.

1. 기본 제공 Express 미들웨어 함수인 `express.favicon`,
    `express.logger`, `express.methodOverride`,
    `express.session`, `express.bodyParser` 및
    `express.errorHandler`는 더 이상 `express`
    오브젝트에 사용할 수 없습니다.  이들 함수의 대체 함수를 수동으로
    설치한 후 앱에서 로드해야 합니다.

2. `app.router` 함수는 이제 로드할 필요가 없습니다.
    이 함수는 유효한 Express 4 앱 오브젝트가 아니므로
    `app.use(app.router);` 코드를 제거하십시오.

3. 미들웨어 함수들이 올바른 순서로 로드되는지 확인하십시오(앱 라우트를 로드한 후 `errorHandler`를 로드).

<h3 id="">버전 4 앱</h3>

<h4 id=""><code>package.json</code></h4>

위의 `npm` 명령을 실행하면 `package.json`이 다음과 같이 업데이트됩니다.

<pre>
<code class="language-javascript" translate="no">
{
  "name": "application-name",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "body-parser": "^1.5.2",
    "errorhandler": "^1.1.1",
    "express": "^4.8.0",
    "express-session": "^1.7.2",
    "pug": "^2.0.0-beta6",
    "method-override": "^2.1.2",
    "morgan": "^1.2.2",
    "multer": "^0.1.3",
    "serve-favicon": "^2.0.1"
  }
}
</code>
</pre>

<h4 id=""><code>app.js</code></h4>

이후 올바르지 않은 코드를 제거하고, 필요한 미들웨어를 로드하고,
필요에 따라 다른 변경을 실행하십시오. `app.js` 파일의 내용은 다음과 같습니다.

<pre>
<code class="language-javascript" translate="no">
var http = require('http');
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.get('/users', user.list);

// error handling middleware should be loaded after the loading the routes
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
</code>
</pre>

<div class="doc-box doc-info" markdown="1">
`http` 모듈을 이용해 직접 작업해야 하는 경우(socket.io/SPDY/HTTPS)를 제외하면 `http` 모듈을 로드할 필요가 없으며, 다음과 같은 방법으로 간단히 앱을 시작할 수 있습니다.
<pre>
<code class="language-js" translate="no">app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});</code>
</pre>
</div>

<h3 id="">앱 실행</h3>

마이그레이션 프로세스가 완료되었으며, 이제 앱은
Express 4 앱이 되었습니다. 확인을 위하여, 다음의 명령을 이용해 앱을 시작하십시오.

```console
$ node .
```

[http://localhost:3000](http://localhost:3000)을
  로드한 후 홈 페이지가 Express 4에 의해 렌더링되는 것을 확인하십시오.

<h2 id="app-gen">Express 4 앱 생성기로의 업그레이드</h2>

Express 앱을 생성하기 위한 명령행 도구는 여전히
  `express`이지만, 새 버전으로 업그레이드하려면
  Express 3 앱 생성기의 설치를 제거한 후 새로운
  `express-generator`를 설치해야 합니다.

<h3 id="">설치 </h3>

Express 3 앱 생성기가 이미 시스템에 설치되어 있는 경우, 다음과 같이
Express 3 앱 생성기의 설치를 제거해야 합니다.

```console
$ npm uninstall -g express
```

파일 및 디렉토리 권한이 구성된 방식에 따라서, 위의 명령은
`sudo`를 이용해 실행해야 할 수도 있습니다.

이제 다음과 같이 새 생성기를 설치하십시오.

```console
$ npm install -g express-generator
```

파일 및 디렉토리 권한이 구성된 방식에 따라서, 위의 명령은
`sudo`를 이용해 실행해야 할 수도 있습니다.

이제 시스템의 `express` 명령이 Express 4 생성기로
업데이트되었습니다.

<h3 id="">앱 생성기에 대한 변경사항 </h3>

다음을 제외하면, 명령의 옵션 및 용도는 대체로 동일하게 유지되었습니다.

{: .doclist }
* `--sessions` 옵션이 제거되었습니다.
* `--jshtml` 옵션이 제거되었습니다.
* [Hogan.js](http://twitter.github.io/hogan.js/)를 지원하기 위한 `--hogan` 옵션이 추가되었습니다.

<h3 id="">예</h3>

Express 4 앱을 작성하기 위하여 다음의 명령을 실행하십시오.

```console
$ express app4
```

`app4/app.js` 파일의 내용을 살펴보면, 앱에 필요한 모든 미들웨어
함수(`express.static` 제외)가 독립적인 모듈로서 로드되며
`router` 미들웨어는 이제 앱에 명시적으로 로드되지 않는다는 것을
알 수 있습니다.

또한 이전에 `app.js` 파일은 구버전의 생성기에 의해 생성되는 독립형 앱이었지만, 이제는 Node.js의 모듈이 되었다는 것을 알 수 있습니다.

종속 항목을 설치한 후, 다음의 명령을 이용해 앱을 시작하십시오.

```console
$ npm start
```

`package.json` 파일 내의 npm 시작 스크립트를 살펴보면,
Express 3에서는 `node app.js`를 이용해 앱을 시작했지만,
이제 앱을 시작하는 실제 명령은 `node ./bin/www`라는 것을
알 수 있습니다.

Express 4 생성기에 의해 생성된 `app.js` 파일은 이제 Node.js의 모듈이므로,
`app.js` 파일은 더 이상 하나의 앱으로서 독립적으로 시작될 수
없습니다(코드를 수정하는 경우 제외). 이러한 모듈은 Node.js 파일에서 로드되어야 하며
Node.js 파일을 통해 시작되어야 합니다. 이 경우에서 Node.js 파일은
`./bin/www`입니다.

이제는 Express 앱을 작성하거나 앱을 시작하는 데 있어 `bin` 디렉토리 또는
확장자 없는 `www` 파일이 필수가 아닙니다. 이들은
단지 생성기에 의한 추천사항이며, 따라서 필요사항에 맞추어 수정해도
좋습니다.

`www` 디렉토리를 제거하고 "Express 3의 방식"을 유지하려면,
`app.js` 파일의 끝에 있는 `module.exports = app;`가
포함된 행을 삭제한 후 그 자리에 다음의 코드를 붙여넣으십시오.

<pre>
<code class="language-javascript" translate="no">
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
</code>
</pre>

`debug` 모듈은 다음의 코드를 이용하여 `app.js` 파일의 맨 위에서 로드되어야 합니다.

<pre>
<code class="language-javascript" translate="no">
var debug = require('debug')('app4');
</code>
</pre>

다음으로, `package.json` 파일의 `"start": "node ./bin/www"`를 `"start": "node app.js"`로 변경하십시오.

이제 `./bin/www`의 기능이 다시 `app.js`로
이전되었습니다.  이러한 변경은 권장되지 않지만, 이러한 연습을 통해
`./bin/www` 파일의 작동 원리를 이해하고 `app.js` 파일이
더 이상 자체적으로 시작되지 않는 이유를 이해할 수 있습니다.
