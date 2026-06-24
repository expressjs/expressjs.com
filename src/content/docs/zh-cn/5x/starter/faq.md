---
title: 常见问题
description: 查找有关 Express.js 的常见问题解答，包括应用结构、模型、身份验证、模板引擎、错误处理等主题。
---

## 我应该如何组织我的应用结构？

这个问题没有绝对的答案。答案取决于你的应用规模以及参与的团队。为了尽可能灵活，Express 在结构方面不做任何假设。

路由和其他应用特定的逻辑可以放在任意数量的文件中，使用你喜欢的任何目录结构。查看以下示例获取灵感：

- [路由列表](https://github.com/expressjs/express/blob/4.13.1/examples/route-separation/index.js#L32-L47)
- [路由映射](https://github.com/expressjs/express/blob/4.13.1/examples/route-map/index.js#L52-L66)
- [MVC 风格控制器](https://github.com/expressjs/express/tree/master/examples/mvc)

此外，还有一些 Express 的第三方扩展，可以简化其中一些模式：

- [资源路由](https://github.com/expressjs/express-resource)

## 我如何定义模型？

Express 没有数据库的概念。这个概念留给第三方 Node 模块，允许你与几乎任何数据库进行交互。

查看 [LoopBack](http://loopback.io)，这是一个基于 Express 的以模型为中心的框架。

## 我如何对用户进行身份验证？

身份验证是另一个 Express 不涉及的有争议领域。你可以使用任何你想要的身份验证方案。
对于简单的用户名/密码方案，请参阅[此示例](https://github.com/expressjs/express/tree/master/examples/auth)。

## Express 支持哪些模板引擎？

Express 支持任何符合 `(path, locals, callback)` 签名的模板引擎。
要统一模板引擎接口和缓存，请参阅 [consolidate.js](https://github.com/visionmedia/consolidate.js) 项目获取支持。未列出的模板引擎可能仍然支持 Express 签名。

有关更多信息，请参阅[在 Express 中使用模板引擎](/guide/using-template-engines)。

## 我如何处理 404 响应？

在 Express 中，404 响应不是错误的结果，因此错误处理中间件不会捕获它们。这种行为是因为 404 响应仅仅表示没有更多工作要做；换句话说，Express 已执行所有中间件函数和路由，发现它们都没有响应。你只需要在栈的最底部（所有其他函数之下）添加一个中间件函数来处理 404 响应：

```js
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});
```

在 `express.Router()` 实例上在运行时动态添加路由，以便路由不会被中间件函数覆盖。

## 我如何设置错误处理程序？

你定义错误处理中间件的方式与其他中间件相同，只是有四个参数而不是三个；具体签名为 `(err, req, res, next)`：

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

有关更多信息，请参阅[错误处理](/guide/error-handling)。

## 我如何渲染纯 HTML？

你不需要！没有必要使用 `res.render()` 函数来"渲染" HTML。如果你有一个特定的文件，使用 `res.sendFile()` 函数。如果你要从一个目录提供许多资产，使用 `express.static()` 中间件函数。

## Express 需要什么版本的 Node.js？

- [Express 4.x](/4x/api) 需要 Node.js 0.10 或更高版本。
- [Express 5.x](/api) 需要 Node.js 18 或更高版本。
