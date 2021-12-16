---
layout: page
title: 移轉至 Express 4
menu: guide
lang: zh-tw
---

# 移至 Express 4

<h2 id="overview">概觀</h2>

Express 4 是對 Express 3 的突破性變更。也就是說，如果您在其相依關係中更新 Express 版本，現有的 Express 3 應用程式將無法運作。

本文涵蓋：

<ul class="doclist">
  <li><a href="#changes">Express 4 中的變更。</a></li>
  <li>將 Express 3 應用程式移轉至 Express 4 的<a href="#example-migration">範例</a>。</li>
  <li><a href="#app-gen">升級至 Express 4 應用程式產生器。</a></li>
</ul>

<h2 id="changes">Express 4 中的變更</h2>

Express 4 有數項明顯的變更：

<ul class="doclist">
  <li><a href="#core-changes">Express 核心和中介軟體系統的變更。</a>Connect 和內建中介軟體的相依關係已移除，因此您必須自行新增中介軟體。
  </li>
  <li><a href="#routing">路由系統的變更。</a></li>
  <li><a href="#other-changes">其他各項變更。</a></li>
</ul>

另請參閱：

* [New features in 4.x](https://github.com/expressjs/express/wiki/New-features-in-4.x)
* [Migrating from 3.x to 4.x](https://github.com/expressjs/express/wiki/Migrating-from-3.x-to-4.x)

<h3 id="core-changes">
Express 核心和中介軟體系統的變更
</h3>

Express 4 不再相依於 Connect，除了 `express.static` 函數，其他所有的內建中介軟體皆已從其核心移除。也就是說，Express 現在是一個獨立的路由與中介軟體 Web 架構，Express 的版本化與版次不受中介軟體更新的影響。

由於沒有內建中介軟體，您必須明確新增執行您應用程式所需的所有中介軟體。只需遵循下列步驟：

1. 安裝模組：`npm install --save <module-name>`
2. 在您的應用程式中，需要模組：`require('module-name')`
3. 遵循模組的說明文件來使用該模組：`app.use( ... )`

下表列出 Express 3 中介軟體和其在 Express 4 中的對應項目。

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

以下是 Express 4 中介軟體的[完整清單](https://github.com/senchalabs/connect#middleware)。

在大部分情況下，只需將舊有第 3 版中介軟體取代為其 Express 4 對應項目。如需詳細資料，請參閱 GitHub 中的模組說明文件。

<h4 id="app-use"><code>app.use</code> 接受參數</h4>

在第 4 版中，您可以使用變數參數，來定義中介軟體函數的載入路徑，然後從路由處理程式讀取參數值。例如：


<pre>
<code class="language-javascript" translate="no">
app.use('/book/:id', function(req, res, next) {
  console.log('ID:', req.params.id);
  next();
});
</code>
</pre>
<h3 id="routing">
路由系統
</h3>

Apps 現在隱含地載入了路由中介軟體，因此您不用再擔心該中介軟體相對於 `router` 中介軟體的載入順序。

路由的定義方式不變，但是路由系統多了兩個新特性，可協助您組織路由：

{: .doclist }
* 新方法 `app.route()`，用來為路由路徑建立可鏈接的路由處理程式。
* 新類別 `express.Router`，用來建立可裝載的模組路由處理程式。

<h4 id="app-route"><code>app.route()</code> 方法</h4>

新的 `app.route()` 方法可讓您為路由路徑建立可鏈接的路由處理程式。由於是在單一位置指定路徑，建立模組路由很有用，因為它可減少冗餘和打錯字的情況。如需路由的相關資訊，請參閱 [`Router()` 說明文件](/{{ page.lang }}/4x/api.html#router)。

下列範例顯示利用 `app.route()` 函數所定義的路由處理程式鏈。

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

<h4 id="express-router"><code>express.Router</code> 類別</h4>

有助於組織路由的另一項特性是一個新類別 `express.Router`，可用來建立可裝載的模組路由處理程式。`Router` 實例是一個完整的中介軟體與路由系統；
因此，常被稱為「迷你應用程式」。

下列範例是將路由器建立成模組、
在其中載入中介軟體、定義一些路由，並將它裝載在主要應用程式中的路徑。

例如，在應用程式目錄中建立一個名為 `birds.js` 的路由器檔案，內含下列內容：

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

然後將路由器模組載入應用程式中：

<pre>
<code class="language-javascript" translate="no">
var birds = require('./birds');
...
app.use('/birds', birds);
</code>
</pre>

現在，應用程式就能夠處理發給 `/birds` 和 `/birds/about` 路徑的要求，並且會呼叫該路由特定的 `timeLog` 中介軟體。

<h3 id="other-changes">
其他變更
</h3>

下表列出 Express 4 其他小幅卻很重要的變更：

<table class="doctable" border="1">
<tr>
<th>物件</th>
<th>說明</th>
</tr>
<tr>
<td>Node.js</td>
<td>Express 4 需要 Node.js 0.10.x 或更新版本，且不再支援 Node.js 0.8.x。</td>
</tr>
<tr>
<td markdown="1">
`http.createServer()`
</td>
<td markdown="1">
不再需要 `http` 模組，除非您需要直接使用它 (socket.io/SPDY/HTTPS)。應用程式可藉由使用 `app.listen()` 函數來啟動。
</td>
</tr>
<tr>
<td markdown="1">
`app.configure()`
</td>
<td markdown="1">
`app.configure()` 函數已移除。請使用 `process.env.NODE_ENV` 或 `app.get('env')` 函數來偵測環境，並據以配置應用程式。
</td>
</tr>
<tr>
<td markdown="1">
`json spaces`
</td>
<td markdown="1">
Express 4 中依預設會停用 `json spaces` 應用程式內容。
</td>
</tr>
<tr>
<td markdown="1">
`req.accepted()`
</td>
<td markdown="1">
使用 `req.accepts()`、`req.acceptsEncodings()`、`req.acceptsCharsets()` 和 `req.acceptsLanguages()`。</td>
</tr>
<tr>
<td markdown="1">
`res.location()`
</td>
<td markdown="1">
不再解析相對 URL。
</td>
</tr>
<tr>
<td markdown="1">
`req.params`
</td>
<td markdown="1">
之前是陣列；現在是物件。
</td>
</tr>
<tr>
<td markdown="1">
`res.locals`
</td>
<td markdown="1">
之前是函數；現在是物件。
</td>
</tr>
<tr>
<td markdown="1">
`res.headerSent`
</td>
<td markdown="1">
已變更為 `res.headersSent`。
</td>
</tr>
<tr>
<td markdown="1">
`app.route`
</td>
<td markdown="1">
現在以 `app.mountpath` 形式提供。
</td>
</tr>
<tr>
<td markdown="1">
`res.on('header')`
</td>
<td markdown="1">
已移除。
</td>
</tr>
<tr>
<td markdown="1">
`res.charset`
</td>
<td markdown="1">
已移除。
</td>
</tr>
<tr>
<td markdown="1">
`res.setHeader('Set-Cookie', val)`
</td>
<td markdown="1">
現在功能僅限於設定基本 Cookie 值。請使用
`res.cookie()` 來取得新增的功能。
</td>
</tr>
</table>

<h2 id="example-migration">應用程式移轉範例</h2>

下列範例顯示如何將 Express 3 應用程式移轉至 Express 4。值得一提的檔案是 `app.js` 和 `package.json`。

<h3 id="">
第 3 版應用程式
</h3>

<h4 id=""><code>app.js</code></h4>

假設 Express 第 3 版應用程式具有下列的 `app.js` 檔：

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

附帶的第 3 版 `package.json` 檔可能類似如下：

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
程序
</h3>

開始移轉程序，作法是使用下列指令，為 Express 4 應用程式安裝必要的中介軟體，並將 Express 和 Pug 更新為其個別的最新版本：

```console
$ npm install serve-favicon morgan method-override express-session body-parser multer errorhandler express@latest pug@latest --save
```

對 `app.js` 進行下列變更：

1. `express` 物件中不再提供內建 Express 中介軟體函數
`express.favicon`、`express.logger`, `express.methodOverride`、`express.session`、`express.bodyParser` 和 `express.errorHandler`。您必須手動安裝其替代項目，並將它們載入到應用程式。

2. 不再需要載入 `app.router` 函數。它不是有效的 Express 4 應用程式物件，因此請移除 `app.use(app.router);` 程式碼。

3. 請確定中介軟體函數的載入順序正確 - 載入應用程式路由之後，再載入 `errorHandler`。

<h3 id="">第 4 版應用程式</h3>

<h4 id=""><code>package.json</code></h4>

執行上述 `npm` 指令，將會更新 `package.json`，如下所示：

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

然後移除無效的程式碼、載入必要的中介軟體，並視需要進行其他的變更。`app.js` 檔看似如下：

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
除非您需要直接使用 `http` 模組 (socket.io/SPDY/HTTPS)，並不需要載入它，只需採下列方式就能啟動應用程式：
<pre>
<code class="language-js" translate="no">app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});</code>
</pre>
</div>

<h3 id="">執行應用程式</h3>

移轉程序已完成，現在應用程式是一個 Express 4 應用程式。若要確認，請使用下列指令來啟動應用程式：

```console
$ node .
```

載入 [http://localhost:3000](http://localhost:3000)，並查看 Express 4 所呈現的首頁。

<h2 id="app-gen">升級至 Express 4 應用程式產生器</h2>

用來產生 Express 應用程式的指令行工具仍然是 `express`，但為了升級至新版本，您必須解除安裝 Express 3 應用程式產生器，再安裝新的 `express-generator`。

<h3 id="">安裝</h3>

如果您的系統已安裝 Express 3 應用程式產生器，必須解除安裝它：

```console
$ npm uninstall -g express
```

視您如何配置檔案與目錄專用權而定，您可能需要使用 `sudo` 來執行這個指令。

現在安裝新的產生器：

```console
$ npm install -g express-generator
```

視您如何配置檔案與目錄專用權而定，您可能需要使用 `sudo` 來執行這個指令。

現在，您系統上的 `express` 指令已更新為 Express 4 產生器。

<h3 id="">應用程式產生器的變更</h3>

除了以下，指令的選項與用法大致不變：

{: .doclist }
* 已移除 `--sessions` 選項。
* 已移除 `--jshtml` 選項。
* 新增了 `--hogan` 選項，以支援 [Hogan.js](http://twitter.github.io/hogan.js/)。

<h3 id="">範例</h3>

執行下列指令，以建立 Express 4 應用程式：

```console
$ express app4
```

如果您查看 `app4/app.js` 檔的內容，您會發現應用程式所需要的所有中介軟體函數（但不包括 `express.static`）都載入成獨立模組，且 `router` 中介軟體不再明確載入到應用程式中。

您也會發現，相對於舊產生器產生的獨立式應用程式，`app.js` 檔現在是一個 Node.js 模組。

安裝相依關係之後，請使用下列指令來啟動應用程式：

```console
$ npm start
```

如果您查看 `package.json` 檔中的 npm 啟動 Script，您會發現，啟動應用程式的實際指令是 `node ./bin/www`，這在 Express 3 中是 `node app.js`。

由於 Express 4 產生器產生的 `app.js` 檔現在是一個 Node.js 模組，因此無法再以應用程式形式單獨啟動它（除非您修改程式碼）。模組必須載入到 Node.js 檔，並透過 Node.js 檔啟動。在本例中，Node.js 檔是 `./bin/www`。

在建立 Express 應用程式或啟動應用程式時，`bin` 目錄和沒有副檔名
`www` 的檔案都不是必要的。它們只是產生器所建議的，您大可根據自己的需求來修改它們。

若要除去 `www` 目錄，並採用「Express 3 形式」，請刪除 `app.js` 檔尾端的 `module.exports = app;` 字行，然後在該處貼上下列程式碼：

<pre>
<code class="language-javascript" translate="no">
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
</code>
</pre>

請使用下列程式碼，確定 `debug` 模組是載入於 `app.js` 檔頂端：

<pre>
<code class="language-javascript" translate="no">
var debug = require('debug')('app4');
</code>
</pre>

然後將 `package.json` 檔中的 `"start": "node ./bin/www"` 變更為 `"start": "node app.js"`。

現在您已將 `./bin/www` 的功能移回至 `app.js`。不建議進行這項變更，但這項練習有助您瞭解 `./bin/www` 檔的運作方式，以及 `app.js` 檔不再自行啟動的原因。
