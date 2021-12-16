---
layout: page
title: 使用 Express 中间件
menu: guide
lang: zh-cn
---

# 使用中间件

Express 是一个路由和中间件 Web 框架，其自身只具有最低程度的功能：Express 应用程序基本上是一系列中间件函数调用。

*中间件*函数能够访问[请求对象](/{{ page.lang }}/4x/api.html#req) (`req`)、[响应对象](/{{ page.lang }}/4x/api.html#res) (`res`) 以及应用程序的请求/响应循环中的下一个中间件函数。下一个中间件函数通常由名为 `next` 的变量来表示。

中间件函数可以执行以下任务：

* 执行任何代码。
* 对请求和响应对象进行更改。
* 结束请求/响应循环。
* 调用堆栈中的下一个中间件函数。

如果当前中间件函数没有结束请求/响应循环，那么它必须调用 `next()`，以将控制权传递给下一个中间件函数。否则，请求将保持挂起状态。

Express 应用程序可以使用以下类型的中间件：

 - [应用层中间件](#middleware.application)
 - [路由器层中间件](#middleware.router)
 - [错误处理中间件](#middleware.error-handling)
 - [内置中间件](#middleware.built-in)
 - [第三方中间件](#middleware.third-party)

您可以使用可选安装路径来装入应用层和路由器层中间件。
还可以将一系列中间件函数一起装入，这样会在安装点创建中间件系统的子堆栈。

<h2 id='middleware.application'>应用层中间件</h2>

使用 `app.use()` 和 `app.METHOD()` 函数将应用层中间件绑定到[应用程序对象](/{{ page.lang }}/4x/api.html#app)的实例，其中 `METHOD` 是中间件函数处理的请求的小写 HTTP 方法（例如 GET、PUT 或 POST）。

此示例显示没有安装路径的中间件函数。应用程序每次收到请求时执行该函数。

<pre>
<code class="language-javascript" translate="no">
var app = express();

app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});
</code>
</pre>

此示例显示安装在 `/user/:id` 路径中的中间件函数。在 `/user/:id` 路径中为任何类型的 HTTP 请求执行此函数。

<pre>
<code class="language-javascript" translate="no">
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
</code>
</pre>

此示例显示一个路由及其处理程序函数（中间件系统）。此函数处理针对 `/user/:id` 路径的 GET 请求。

<pre>
<code class="language-javascript" translate="no">
app.get('/user/:id', function (req, res, next) {
  res.send('USER');
});
</code>
</pre>

以下是在安装点使用安装路径装入一系列中间件函数的示例。
它演示一个中间件子堆栈，用于显示针对 `/user/:id` 路径的任何类型 HTTP 请求的信息。

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

路由处理程序使您可以为一个路径定义多个路由。以下示例为针对 `/user/:id` 路径的 GET 请求定义两个路由。第二个路由不会导致任何问题，但是永远都不会被调用，因为第一个路由结束了请求/响应循环。

此示例显示一个中间件子堆栈，用于处理针对 `/user/:id` 路径的 GET 请求。

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

要跳过路由器中间件堆栈中剩余的中间件函数，请调用 `next('route')` 将控制权传递给下一个路由。
**注**：`next('route')` 仅在使用 `app.METHOD()` 或 `router.METHOD()` 函数装入的中间件函数中有效。

此示例显示一个中间件子堆栈，用于处理针对 `/user/:id` 路径的 GET 请求。

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

<h2 id='middleware.router'>路由器层中间件</h2>

路由器层中间件的工作方式与应用层中间件基本相同，差异之处在于它绑定到 `express.Router()` 的实例。

<pre>
<code class="language-javascript" translate="no">
var router = express.Router();
</code>
</pre>
使用 `router.use()` 和 `router.METHOD()` 函数装入路由器层中间件。
以下示例代码使用路由器层中间件复制以上为应用层中间件显示的中间件系统：

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

<h2 id='middleware.error-handling'>错误处理中间件</h2>

<div class="doc-box doc-notice" markdown="1">
错误处理中间件始终采用*四个*自变量。必须提供四个自变量，以将函数标识为错误处理中间件函数。即使无需使用 `next` 对象，也必须指定该对象以保持特征符的有效性。否则，`next` 对象将被解释为常规中间件，从而无法处理错误。
</div>

错误处理中间件函数的定义方式与其他中间件函数基本相同，差别在于错误处理函数有四个自变量而不是三个，专门具有特征符 `(err, req, res, next)`：

<pre>
<code class="language-javascript" translate="no">
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
</code>
</pre>

有关错误处理中间件的详细信息，请参阅：[错误处理](/{{ page.lang }}/guide/error-handling.html)。

<h2 id='middleware.built-in'>内置中间件</h2>

自 V4.x 起，Express 不再依赖于 [Connect](https://github.com/senchalabs/connect)。除 `express.static` 外，先前 Express 随附的所有中间件函数现在以单独模块的形式提供。请查看[中间件函数的列表](https://github.com/senchalabs/connect#middleware)。

<h4 id='express.static'>express.static(root, [options])</h4>

Express 中唯一内置的中间件函数是 `express.static`。此函数基于 [serve-static](https://github.com/expressjs/serve-static)，负责提供 Express 应用程序的静态资源。

`root` 自变量指定从其中提供静态资源的根目录。

可选的 `options` 对象可以具有以下属性：

| 属性          |        描述                                                           |   类型      |  缺省值         |
|---------------|-----------------------------------------------------------------------|-------------|-----------------|
| `dotfiles`    | 是否对外输出文件名以点（.）开头的文件。有效值包括“allow”、“deny”和“ignore” | 字符串 | “ignore” |
| `etag`        | 启用或禁用 etag 生成  | 布尔 | `true` |
| `extensions`  | 用于设置后备文件扩展名。 | 数组 | `[]` |
| `index`       | 发送目录索引文件。设置为 `false` 可禁用建立目录索引。 | 混合 | “index.html” |
 `lastModified` | 将 `Last-Modified` 的头设置为操作系统上该文件的上次修改日期。有效值包括 `true` 或 `false`。 | 布尔 | `true` |
| `maxAge`      | 设置 Cache-Control 头的 max-age 属性（以毫秒或者 [ms 格式](https://www.npmjs.org/package/ms)中的字符串为单位） | 数字 | 0 |
| `redirect`    | 当路径名是目录时重定向到结尾的“/”。 | 布尔 | `true` |
| `setHeaders`  | 用于设置随文件一起提供的 HTTP 头的函数。 | 函数 |  |

以下示例将使用了 `express.static` 中间件，并且提供了一个详细的'options'对象（作为示例）：

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

对于每个应用程序，可以有多个静态目录：

<pre>
<code class="language-javascript" translate="no">
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.static('files'));
</code>
</pre>

有关 `serve-static` 函数及其选项的更多详细信息，请参阅：[serve-static](https://github.com/expressjs/serve-static) 文档。

<h2 id='middleware.third-party'>第三方中间件</h2>

使用第三方中间件向 Express 应用程序添加功能。

安装具有所需功能的 Node.js 模块，然后在应用层或路由器层的应用程序中将其加装入。

以下示例演示如何安装和装入 cookie 解析中间件函数 `cookie-parser`。

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

有关 Express 常用的第三方中间件函数的部分列表，请参阅：[第三方中间件](../resources/middleware.html)。
