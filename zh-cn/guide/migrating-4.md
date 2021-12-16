---
layout: page
title: 迁移到 Express 4
menu: guide
lang: zh-cn
---

# 迁移到 Express 4

<h2 id="overview">概述</h2>

Express 4 对 Express 3 进行了重大更改，这意味着，如果您在现有 Express 3 应用程序的依赖项中更新了 Express 版本，那么该应用程序将无法工作。

本文讲述：

<ul class="doclist">
  <li><a href="#changes">Express 4 中的更改。</a></li>
  <li>将 Express 3 应用程序迁移到 Express 4 的<a href="#example-migration">示例</a>。</li>
  <li><a href="#app-gen">升级到 Express 4 应用程序生成器。</a></li>
</ul>

<h2 id="changes">Express 4 中的更改</h2>

Express 4 中进行了若干重大更改：

<ul class="doclist">
  <li><a href="#core-changes">对 Express 核心和中间件系统进行了更改。</a>移除了 Connect 依赖项和内置的中间件，所以您必须自己添加中间件。</li>
  <li><a href="#routing">对路由系统进行了更改。</a></li>
  <li><a href="#other-changes">其他各种更改。</a></li>
</ul>

另请参阅：

* [New features in 4.x](https://github.com/expressjs/express/wiki/New-features-in-4.x)。
* [Migrating from 3.x to 4.x](https://github.com/expressjs/express/wiki/Migrating-from-3.x-to-4.x)。

<h3 id="core-changes">
对 Express 核心和中间件系统的更改。
</h3>

Express 4 不再依赖于 Connect，从其核心移除了所有内置的中间件（除了 `express.static` 函数）。这意味着 Express 现在是独立的路由和中间件 Web 框架，Express 的版本控制和发行不受中间件更新的影响。

由于没有内置中间件，因此您必须显式添加所需的所有中间件才能运行应用程序。只需执行以下步骤：

1. 安装模块：`npm install --save <module-name>`
2. 在应用程序中需要此模块：`require('module-name')`
3. 根据文档使用模块：`app.use( ... )`

下表列出了 Express 3 中间件及其在 Express 4 中的对应组件。

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

可参考 Express 4 中间件的[完整列表](https://github.com/senchalabs/connect#middleware)。

在大多数情况下，可以将旧的 V3 中间件替换为 Express 4 的对应组件。有关详细信息，请参阅 GitHub 中的模块文档。

<h4 id="app-use"><code>app.use</code> 可以使用参数</h4>

在 V4 中，您可以使用变量参数来定义装入中间件函数的路径，然后从路由处理程序读取参数的值。
例如：

<pre>
<code class="language-javascript" translate="no">
app.use('/book/:id', function(req, res, next) {
  console.log('ID:', req.params.id);
  next();
});
</code>
</pre>
<h3 id="routing">
路由系统
</h3>

应用程序现在隐式装入路由中间件，所以您不再需要担心其他中间件相对于`路由`中间件的装入顺序。

定义路由的方式并未改变，但是路由系统新增了两个功能，用于帮助组织路由：

{: .doclist }
* 一个新方法 `app.route()`，用于为路由路径创建可链接的路由处理程序。
* 一个新类 `express.Router`，用于创建可安装的模块化路由处理程序。

<h4 id="app-route"><code>app.route()</code> 方法</h4>

新的 `app.route()` 方法使您可以为路由路径创建可链接的路由处理程序。创建模块化路由很有帮助，因为在单一位置指定路径，所以可以减少冗余和输入错误。有关路由的更多信息，请参阅 [`Router()` 文档](/{{ page.lang }}/4x/api.html#router)。

以下是使用 `app.route()` 函数定义的链式路由处理程序的示例。

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

<h4 id="express-router"><code>express.Router</code> 类</h4>

有助于组织路由的另一个功能是新类 `express.Router`，可用于创建可安装的模块化路由处理程序。`Router` 实例是完整的中间件和路由系统；因此，常常将其称为“微型应用程序”。

以下示例将路由器创建为模块，在其中装入中间件，定义一些路由，然后安装在主应用程序的路径中。

例如，在应用程序目录中创建名为 `birds.js` 的路由器文件，其中包含以下内容：

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

接着，在应用程序中装入路由器模块：

<pre>
<code class="language-javascript" translate="no">
var birds = require('./birds');
...
app.use('/birds', birds);
</code>
</pre>

此应用程序现在可处理针对 `/birds` 和 `/birds/about` 路径的请求，调用特定于此路由的 `timeLog` 中间件。

<h3 id="other-changes">
其他更改
</h3>

下表列出 Express 4 中虽小但重要的其他更改：

<table class="doctable" border="1">
<tr>
<th>对象</th>
<th>描述</th>
</tr>
<tr>
<td>Node.js</td>
<td>Express 4 需要 Node.js 0.10.x 或更高版本，已取消对 Node.js 0.8.x 的支持。</td>
</tr>
<tr>
<td markdown="1">
`http.createServer()`
</td>
<td markdown="1">
不再需要 `http` 模块，除非您要直接使用它 (socket.io/SPDY/HTTPS)。可以使用 `app.listen()` 函数来启动此应用程序。
</td>
</tr>
<tr>
<td markdown="1">
`app.configure()`
</td>
<td markdown="1">
已移除 `app.configure()` 函数。使用 `process.env.NODE_ENV` 或 `app.get('env')` 功能来检测环境并相应配置该应用程序。
</td>
</tr>
<tr>
<td markdown="1">
`json spaces`
</td>
<td markdown="1">
在 Express 4 中，缺省情况下，已禁用 `json spaces` 应用程序属性。
</td>
</tr>
<tr>
<td markdown="1">
`req.accepted()`
</td>
<td markdown="1">
使用 `req.accepts()`、`req.acceptsEncodings()`、`req.acceptsCharsets()` 和 `req.acceptsLanguages()`。
</td>
</tr>
<tr>
<td markdown="1">
`res.location()`
</td>
<td markdown="1">
不再解析相对 URL。
</td>
</tr>
<tr>
<td markdown="1">
`req.params`
</td>
<td markdown="1">
原来是数组；现在是对象。
</td>
</tr>
<tr>
<td markdown="1">
`res.locals`
</td>
<td markdown="1">
原来是函数；现在是对象。
</td>
</tr>
<tr>
<td markdown="1">
`res.headerSent`
</td>
<td markdown="1">
更改为 `res.headersSent`。
</td>
</tr>
<tr>
<td markdown="1">
`app.route`
</td>
<td markdown="1">
现在可作为 `app.mountpath` 使用。
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
功能现在已限制为设置基本 cookie 值。将 `res.cookie()` 用于增添的功能。
</td>
</tr>
</table>

<h2 id="example-migration">应用程序迁移示例</h2>

以下是将 Express 3 应用程序迁移到 Express 4 的示例。
涉及的文件包括 `app.js` 和 `package.json`。

<h3 id="">
V3 应用程序
</h3>

<h4 id=""><code>app.js</code></h4>

考虑具有以下 `app.js` 文件的 Express V3 应用程序：

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

随附的 V3 `package.json` 文件可能具有类似于以下的内容：

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
进程
</h3>

使用以下命令安装 Express 4 应用程序的必需中间件并将 Express 和 Pug 分别更新到其最新版本，从而开始迁移过程：

```console
$ npm install serve-favicon morgan method-override express-session body-parser multer errorhandler express@latest pug@latest --save
```

对 `app.js` 进行以下更改：

1. Express 内置中间件函数 `express.favicon`、`express.logger`、`express.methodOverride`、`express.session`、`express.bodyParser` 和 `express.errorHandler` 不再可用于 `express` 对象。您必须手动安装其替代项，然后在应用程序中装入。

2. 不再需要装入 `app.router` 函数。它不是有效的 Express 4 应用程序对象，所以移除了 `app.use(app.router);` 代码。

3. 确保以正确顺序装入中间件函数 - 在装入应用程序路由之后装入 `errorHandler`。

<h3 id="">V4 应用程序</h3>

<h4 id=""><code>package.json</code></h4>

运行以上 `npm` 命令会更新 `package.json`，如下所示：

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

随后，移除无效代码，装入所需中间件，并根据需要进行其他更改。`app.js` 文件如下：

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
除非您需要直接使用 `http` 模块 (socket.io/SPDY/HTTPS)，否则不需要将其装入，可按以下方式启动此应用程序：
<pre>
<code class="language-js" translate="no">app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});</code>
</pre>
</div>

<h3 id="">运行应用程序</h3>

迁移过程完成，此应用程序现在是 Express 4 版本。要进行确认，可使用以下命令启动此应用程序：

```console
$ node .
```

装入 [http://localhost:3000](http://localhost:3000)，然后查看 Express 4 呈现的主页。

<h2 id="app-gen">升级到 Express 4 应用程序生成器</h2>

用于生成 Express 应用程序的命令行工具仍然是 `express`，但是要升级到新版本，您必须卸载 Express 3 应用程序生成器，然后安装新的 `express-generator`。

<h3 id="">安装</h3>

如果您已经在系统上安装了 Express 3 应用程序生成器，必须将其卸载：

```console
$ npm uninstall -g express
```

根据您的文件和目录特权的配置方式，可能需要使用 `sudo` 来运行此命令。
立即安装新的生成器：

```console
$ npm install -g express-generator
```

根据您的文件和目录特权的配置方式，可能需要使用 `sudo` 来运行此命令。


现在，系统上的 `express` 命令已更新到 Express 4 生成器。

<h3 id="">对应用程序生成器的更改</h3>

命令选项和用法大体保持相同，但也存在以下例外：

{: .doclist }
* 已移除 `--sessions` 选项。
* 已移除 `--jshtml` 选项。
* 已添加 `--hogan` 选项来支持 [Hogan.js](http://twitter.github.io/hogan.js/)。

<h3 id="">示例</h3>

执行以下命令来创建 Express 4 应用程序：

```console
$ express app4
```

如果查看 `app4/app.js` 文件的内容，那么会注意到应用程序所需的所有中间件函数（除了 `express.static`）都作为独立模块装入，而在应用程序中不再显式装入 `router` 中间件。

还可以注意到，与旧生成器生成的独立应用程序相反，`app.js` 文件现在是 Node.js 模块。

在安装依赖项之后，可使用以下命令来启动此应用程序：

```console
$ npm start
```

如果查看 `package.json` 文件中的 npm 启动脚本，可以注意到启动应用程序的实际命令是 `node ./bin/www`，而过去在 Express 3 中，该命令是 `node app.js`。

因为 Express 4 生成器生成的 `app.js` 文件现在是 Node.js 模块，所以不再能够将其作为应用程序独立启动（除非修改代码）。必须在 Node.js 文件中加载此模块，并通过 Node.js 文件启动。在此情况下，Node.js 文件是 `./bin/www`。

对于创建 Express 应用程序或启动此应用程序，`bin` 目录或无扩展名的 `www` 文件都不是必需的。它们只是生成器提出的建议，可随意根据自己的需求进行修改。

如果不想使用 `www` 目录，而是保持“Express 3 风格”，请删除 `app.js` 文件末尾的 `module.exports = app;` 行，然后将以下代码粘贴在到该位置：

<pre>
<code class="language-javascript" translate="no">
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
</code>
</pre>

确保使用以下代码在 `app.js` 文件之上装入 `debug` 模块：

<pre>
<code class="language-javascript" translate="no">
var debug = require('debug')('app4');
</code>
</pre>

下一步，将 `package.json` 文件中的 `"start": "node ./bin/www"` 更改为 `"start": "node app.js"`。

现在，您已将 `./bin/www` 的功能恢复为 `app.js`。不建议进行此更改，但是此练习可以帮助您理解 `./bin/www` 文件的工作方式，以及为何 `app.js` 文件不再自行启动。
