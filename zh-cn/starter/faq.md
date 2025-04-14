---
layout: page
title: Express 常见问题及解答
description: Find answers to frequently asked questions about Express.js, including topics on application structure, models, authentication, template engines, error handling, and more.
menu: starter
lang: en
redirect_from: /starter/faq.html
---

# 常见问题及解答

## 如何构造自己的应用程序？

There is no definitive answer to this question. 这个问题没有固定答案。具体取决于您的应用程序以及参与团队的规模。为了实现尽可能的灵活性，Express 在结构方面不作任何假设。 To be as
flexible as possible, Express makes no assumptions in terms of structure.

路由和其他特定于应用程序的逻辑可以存在于您首选的任何目录结构的任意数量的文件中。请查看以下示例以获取灵感： View the following
examples for inspiration:

- [路由列表](https://github.com/expressjs/express/blob/4.13.1/examples/route-separation/index.js#L32-47)
- [路由图](https://github.com/expressjs/express/blob/4.13.1/examples/route-map/index.js#L52-L66)
- [MVC 样式控制器](https://github.com/expressjs/express/tree/master/examples/mvc)

另外还有针对 Express 的第三方扩展，这有助于简化某些模式：

- [资源丰富的路由](https://github.com/expressjs/express-resource)

## 如何定义模型？

Express 没有数据库概念。此概念留给第三方 Node 模块实现，因此可以接入几乎任何数据库。 This concept is
left up to third-party Node modules, allowing you to
interface with nearly any database.

请参阅 [LoopBack](http://loopback.io) 以了解处于模型中心的基于 Express 的框架。

## 如何对用户进行认证？

Authentication is another opinionated area that Express does not
venture into. You may use any authentication scheme you wish.
认证是 Express 没有涉足的另一严格领域。您可使用所希望的任何认证方案。
要了解简单的“用户名/密码”方案，请参阅[此示例](https://github.com/expressjs/express/tree/master/examples/auth)。

## Express 支持哪些模板引擎？

Express 支持符合 `(path, locals, callback)` 特征符的任何模板引擎。
为了使模板引擎接口和高速缓存实现标准化，请参阅 [consolidate.js](https://github.com/visionmedia/consolidate.js) 项目以获得支持。未列出的模板引擎可能也支持 Express 特征符。
To normalize template engine interfaces and caching, see the
[consolidate.js](https://github.com/visionmedia/consolidate.js)
project for support. Unlisted template engines might still support the Express signature.

For more information, see [Using template engines with Express](/{{page.lang}}/guide/using-template-engines.html).

## 如何处理 404 响应？

在 Express 中，404 响应不是错误的结果，所以错误处理程序中间件不会将其捕获。此行为是因为 404 响应只是表明缺少要执行的其他工作；换言之，Express 执行了所有中间件函数和路由，且发现它们都没有响应。您需要做的只是在堆栈的最底部（在其他所有函数之下）添加一个中间件函数来处理 404 响应： This behavior is
because a 404 response simply indicates the absence of additional work to do;
in other words, Express has executed all middleware functions and routes,
and found that none of them responded. All you need to
do is add a middleware function at the very bottom of the stack (below all other functions)
to handle a 404 response:

```js
app.use((req, res, next) => {
  res.status(404).send('Sorry cant find that!')
})
```

Add routes dynamically at runtime on an instance of `express.Router()`
so the routes are not superseded by a middleware function.

## 如何设置错误处理程序？

错误处理中间件的定义方式与其他中间件基本相同，差别在于错误处理中间件有四个自变量而不是三个，专门具有特征符 `(err, req, res, next)`：

```js
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

有关更多信息，请参阅[错误处理](/{{ page.lang }}/guide/error-handling.html)。

## 如何呈现纯 HTML？

You don't! 您不必这么做！无需使用 `res.render()` 函数来“呈现”HTML。
如果您具有特定文件，请使用 `res.sendFile()` 函数。
如果您希望从目录提供许多资产，请使用 `express.static()` 中间件函数。
If you have a specific file, use the `res.sendFile()` function.
If you are serving many assets from a directory, use the `express.static()`
middleware function.

## What version of Node.js does Express require?

- [Express 4.x](/{{ page.lang }}/4x/api.html) requires Node.js 0.10 or higher.
- [Express 5.x](/{{ page.lang }}/5x/api.html) requires Node.js 18 or higher.

### [Previous: More examples ](/{{ page.lang }}/starter/examples.html)
