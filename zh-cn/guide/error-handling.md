---
layout: page
title: Express 错误处理
menu: guide
lang: zh-cn
---

# 错误处理

错误处理中间件函数的定义方式与其他中间件函数基本相同，差别在于错误处理函数有四个自变量而不是三个：`(err, req, res, next)`：例如：

<pre>
<code class="language-javascript" translate="no">
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
</code>
</pre>

请在其他 `app.use()` 和路由调用之后，最后定义错误处理中间件，例如：

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

中间件函数中的响应可以采用您首选的任何格式，例如，HTML 错误页、简单消息或 JSON 字符串。

出于组织（和更高级框架）的目的，可以定义若干错误处理中间件函数，这和对常规中间件函数的处理很相似。例如，如果您希望为使用 `XHR` 发出的请求以及未使用此对象发出的请求定义错误处理程序，可以使用以下命令：

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

在此示例中，通用 `logErrors` 可能将请求和错误信息写入 `stderr`，例如：

<pre>
<code class="language-javascript" translate="no">
function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}
</code>
</pre>

也是在此示例中，`clientErrorHandler` 定义如下，错误会显式传递到下一项：

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

“catch-all”`errorHandler` 函数可以如下实现：

<pre>
<code class="language-javascript" translate="no">
function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}
</code>
</pre>

如果将任何项传递到 `next()` 函数（除了字符串 `'route'`），那么 Express 会将当前请求视为处于错误状态，并跳过所有剩余的非错误处理路由和中间件函数。如果您希望以某种方式处理此错误，必须如下一节中所述创建一个错误处理路由。

如果一个路由处理程序具有多个回调函数，那么可以使用 `route` 参数跳至下一个路由处理程序。例如：

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

在此示例中，将跳过 `getPaidContent` 处理程序，而将继续执行 `/a_route_behind_paywall` 的 `app` 中所有剩余的处理程序。

<div class="doc-box doc-info" markdown="1">
对 `next()` 和 `next(err)` 的调用会表明当前处理程序是否完整以及处于何种状态。`next(err)` 将跳过链中所有剩余的处理程序（设置为按上述方式处理错误的处理程序除外）。
</div>

## 缺省错误处理程序

Express 随附一个内置的错误处理程序，负责处理应用程序中可能遇到的任何错误。这个缺省的错误处理中间件函数添加在中间件函数集的末尾。

如果将错误传递到 `next()` 且未在错误处理程序中进行处理，那么该错误将由内置的错误处理程序处理；错误将写入客户机的堆栈跟踪内。堆栈跟踪不包含在生产环境中。

<div class="doc-box doc-info" markdown="1">
将环境变量 `NODE_ENV` 设置为 `production`，以生产方式运行此应用程序。
</div>

如果在开始写响应之后调用 `next()` 时出错（例如，如果在以流式方式将响应传输到客户机时遇到错误），Express 缺省错误处理程序会关闭连接并使请求失败。

因此，在添加定制错误处理程序时，如果头已发送到客户机，您可能希望委托给 Express 中的缺省错误处理机制处理：

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
