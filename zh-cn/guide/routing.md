---
layout: page
title: Express 路由
menu: guide
lang: zh-cn
---

# 路由

*路由*表示应用程序端点 (URI) 的定义以及端点响应客户机请求的方式。
有关路由的简介，请参阅[基本路由](/{{ page.lang }}/starter/basic-routing.html)。

我们所使用的 app 与 HTTP 方法相对应的 Express 对象方法来定义路由，如 ```app.get()``` 用于处理 GET 请求，而 ```app.post``` 则用于处理 POST 请求。

这些路由方法都指定了回调函数（或者：“处理程序函数”），当程序接收到指定的路由（端点）的时候（也就是说 HTTP 方法请求时被调用），来调用回调函数，换句话说就是应用程序监听与指定路由和方法匹配的请求，当检测到匹配时，他会调用对应的回调函数。

以下代码是非常基本的路由示例。

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var app = express();

// 当对主页发出 GET 请求时，响应“hello world”
app.get('/', function(req, res) {
  res.send('hello world');
});
</code>
</pre>

<h2 id="route-methods">路由方法</h2>

路由方法派生自 HTTP 方法之一，附加到 `express` 类的实例。

以下代码是为访问应用程序根目录的 GET 和 POST 方法定义的路由示例。

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

Express 支持对应于 HTTP 方法的以下路由方法：`get`、`post`、`put`、`head`、`delete`、`options`、`trace`、`copy`、`lock`、`mkcol`、`move`、`purge`、`propfind`、`proppatch`、`unlock`、`report`、`mkactivity`、`checkout`、`merge`、`m-search`、`notify`、`subscribe`、`unsubscribe`、`patch`、`search` 和 `connect`。

<div class="doc-box doc-info" markdown="1">
要路由会转换为无效 JavaScript 变量名称的方法，请使用括号表示法。例如，`app['m-search']('/', function ...`
</div>

有一种特殊路由方法：`app.all()`，它并非派生自 HTTP 方法。该方法用于在所有请求方法的路径中装入中间件函数。

在以下示例中，无论您使用 GET、POST、PUT、DELETE 还是在 [http 模块](https://nodejs.org/api/http.html#http_http_methods)中支持的其他任何 HTTP 请求方法，都将为针对“/secret”的请求执行处理程序。

<pre>
<code class="language-javascript" translate="no">
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});
</code>
</pre>

<h2 id="route-paths">路由路径</h2>

路由路径与请求方法相结合，用于定义可以在其中提出请求的端点。路由路径可以是字符串、字符串模式或正则表达式。

<div class="doc-box doc-info" markdown="1">
Express 使用 [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) 来匹配路由路径；请参阅 path-to-regexp 文档以了解定义路由路径时所有的可能性。[Express Route Tester](http://forbeslindesay.github.io/express-route-tester/) 是用于测试基本 Express 路由的便捷工具，但是它不支持模式匹配。
</div>

<div class="doc-box doc-warn" markdown="1">
查询字符串不是路由路径的一部分。
</div>

以下是基于字符串的路由路径的一些示例。

此路由路径将请求与根路由 `/` 匹配。

<pre>
<code class="language-javascript" translate="no">
app.get('/', function (req, res) {
  res.send('root');
});
</code>
</pre>

此路由路径将请求与 `/about` 匹配。

<pre>
<code class="language-javascript" translate="no">
app.get('/about', function (req, res) {
  res.send('about');
});
</code>
</pre>

此路由路径将请求与 `/random.text` 匹配。

<pre>
<code class="language-javascript" translate="no">
app.get('/random.text', function (req, res) {
  res.send('random.text');
});
</code>
</pre>

以下是基于字符串模式的路由路径的一些示例。

此路由路径将匹配 `acd` 和 `abcd`。

<pre>
<code class="language-javascript" translate="no">
app.get('/ab?cd', function(req, res) {
  res.send('ab?cd');
});
</code>
</pre>

此路由路径将匹配 `abcd`、`abbcd`、`abbbcd` 等。

<pre>
<code class="language-javascript" translate="no">
app.get('/ab+cd', function(req, res) {
  res.send('ab+cd');
});
</code>
</pre>

此路由路径将匹配 `abcd`、`abxcd`、`abRABDOMcd`、`ab123cd` 等。

<pre>
<code class="language-javascript" translate="no">
app.get('/ab*cd', function(req, res) {
  res.send('ab*cd');
});
</code>
</pre>

此路由路径将匹配 `/abe` 和 `/abcde`。

<pre>
<code class="language-javascript" translate="no">
app.get('/ab(cd)?e', function(req, res) {
 res.send('ab(cd)?e');
});
</code>
</pre>

<div class="doc-box doc-info" markdown="1">
字符 ?、+、* 和 () 是其正则表达式同应项的子集。基于字符串的路径按字面理解连字符 (-) 和点 (.)。
</div>

基于正则表达式的路由路径的示例：

此路由路径将匹配名称中具有“a”的所有路由。

<pre>
<code class="language-javascript" translate="no">
app.get(/a/, function(req, res) {
  res.send('/a/');
});
</code>
</pre>

此路由路径将匹配 `butterfly` 和 `dragonfly`，但是不匹配 `butterflyman`、`dragonfly man` 等。

<pre>
<code class="language-javascript" translate="no">
app.get(/.*fly$/, function(req, res) {
  res.send('/.*fly$/');
});
</code>
</pre>

<h2 id="route-handlers">路由处理程序</h2>

您可以提供多个回调函数，以类似于[中间件](/{{ page.lang }}/guide/using-middleware.html)的行为方式来处理请求。唯一例外是这些回调函数可能调用 `next('route')` 来绕过剩余的路由回调。您可以使用此机制对路由施加先决条件，在没有理由继续执行当前路由的情况下，可将控制权传递给后续路由。

路由处理程序的形式可以是一个函数、一组函数或者两者的结合，如以下示例中所示。

单个回调函数可以处理一个路由。例如：

<pre>
<code class="language-javascript" translate="no">
app.get('/example/a', function (req, res) {
  res.send('Hello from A!');
});
</code>
</pre>

多个回调函数可以处理一个路由（确保您指定 `next` 对象）。例如：

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

一组回调函数可以处理一个路由。例如：

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

独立函数与一组函数的组合可以处理一个路由。例如：

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

<h2 id="response-methods">响应方法</h2>

下表中响应对象 (`res`) 的方法可以向客户机发送响应，并终止请求/响应循环。如果没有从路由处理程序调用其中任何方法，客户机请求将保持挂起状态。

|   方法               | 描述
|----------------------|--------------------------------------
| [res.download()](/{{ page.lang }}/4x/api.html#res.download)     | 提示将要下载文件。
| [res.end()](/{{ page.lang }}/4x/api.html#res.end)               | 结束响应进程。
| [res.json()](/{{ page.lang }}/4x/api.html#res.json)             | 发送 JSON 响应。
| [res.jsonp()](/{{ page.lang }}/4x/api.html#res.jsonp)           | 在 JSONP 的支持下发送 JSON 响应。
| [res.redirect()](/{{ page.lang }}/4x/api.html#res.redirect)     | 重定向请求。
| [res.render()](/{{ page.lang }}/4x/api.html#res.render)         | 呈现视图模板。
| [res.send()](/{{ page.lang }}/4x/api.html#res.send)             | 发送各种类型的响应。
| [res.sendFile()](/{{ page.lang }}/4x/api.html#res.sendFile)       | 以八位元流形式发送文件。
| [res.sendStatus()](/{{ page.lang }}/4x/api.html#res.sendStatus) | 设置响应状态码并以响应主体形式发送其字符串表示。

<h2 id="app-route">app.route()</h2>

您可以使用 `app.route()` 为路由路径创建可链接的路由处理程序。
因为在单一位置指定路径，所以可以减少冗余和输入错误。有关路由的更多信息，请参阅 [Router() 文档](/{{ page.lang }}/4x/api.html#router)。

以下是使用 `app.route()` 定义的链式路由处理程序的示例。

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

使用 `express.Router` 类来创建可安装的模块化路由处理程序。`Router` 实例是完整的中间件和路由系统；因此，常常将其称为“微型应用程序”。

以下示例将路由器创建为模块，在其中装入中间件，定义一些路由，然后安装在主应用程序的路径中。

在应用程序目录中创建名为 `birds.js` 的路由器文件，其中包含以下内容：

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

接着，在应用程序中装入路由器模块：

<pre>
<code class="language-javascript" translate="no">
var birds = require('./birds');
...
app.use('/birds', birds);
</code>
</pre>

此应用程序现在可处理针对 `/birds` 和 `/birds/about` 的请求，调用特定于此路由的 `timeLog` 中间件函数。
