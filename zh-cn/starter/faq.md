---
layout: page
title: Express 常见问题及解答
menu: starter
lang: zh-cn
---

# 常见问题及解答

## 如何构造自己的应用程序？

这个问题没有固定答案。具体取决于您的应用程序以及参与团队的规模。为了实现尽可能的灵活性，Express 在结构方面不作任何假设。

路由和其他特定于应用程序的逻辑可以存在于您首选的任何目录结构的任意数量的文件中。请查看以下示例以获取灵感：

* [路由列表](https://github.com/expressjs/express/blob/4.13.1/examples/route-separation/index.js#L32-47)
* [路由图](https://github.com/expressjs/express/blob/4.13.1/examples/route-map/index.js#L52-L66)
* [MVC 样式控制器](https://github.com/expressjs/express/tree/master/examples/mvc)

另外还有针对 Express 的第三方扩展，这有助于简化某些模式：

* [资源丰富的路由](https://github.com/expressjs/express-resource)

## 如何定义模型？

Express 没有数据库概念。此概念留给第三方 Node 模块实现，因此可以接入几乎任何数据库。

请参阅 [LoopBack](http://loopback.io) 以了解处于模型中心的基于 Express 的框架。

## 如何对用户进行认证？

认证是 Express 没有涉足的另一严格领域。您可使用所希望的任何认证方案。
要了解简单的“用户名/密码”方案，请参阅[此示例](https://github.com/expressjs/express/tree/master/examples/auth)。


## Express 支持哪些模板引擎？

Express 支持符合 `(path, locals, callback)` 特征符的任何模板引擎。
为了使模板引擎接口和高速缓存实现标准化，请参阅 [consolidate.js](https://github.com/visionmedia/consolidate.js) 项目以获得支持。未列出的模板引擎可能也支持 Express 特征符。

## 如何处理 404 响应？

在 Express 中，404 响应不是错误的结果，所以错误处理程序中间件不会将其捕获。此行为是因为 404 响应只是表明缺少要执行的其他工作；换言之，Express 执行了所有中间件函数和路由，且发现它们都没有响应。您需要做的只是在堆栈的最底部（在其他所有函数之下）添加一个中间件函数来处理 404 响应：

<pre>
<code class="language-javascript" translate="no">
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});
</code>
</pre>

## 如何设置错误处理程序？

错误处理中间件的定义方式与其他中间件基本相同，差别在于错误处理中间件有四个自变量而不是三个，专门具有特征符 `(err, req, res, next)`：

<pre>
<code class="language-javascript" translate="no">
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
</code>
</pre>

有关更多信息，请参阅[错误处理](/{{ page.lang }}/guide/error-handling.html)。

## 如何呈现纯 HTML？

您不必这么做！无需使用 `res.render()` 函数来“呈现”HTML。
如果您具有特定文件，请使用 `res.sendFile()` 函数。
如果您希望从目录提供许多资产，请使用 `express.static()` 中间件函数。
