---
title: FAQ  常见问题解答
description: 查找有关 Express.js 的常见问题解答，涵盖应用程序架构、数据模型、身份验证、模板引擎、错误处理等相关主题。
---

## 我应该如何组织我的应用程序？

这个问题没有标准答案。 答案取决于你的应用规模以及参与开发的团队。 为实现最大限度的灵活性，Express 不会对项目结构做任何强制限定。

路由和其他应用专属逻辑可拆分至任意数量文件，并采用你偏好的任意目录结构存放。 可参考下方示例获取项目结构设计思路：

- [Route listings](https://github.com/expressjs/express/blob/4.13.1/examples/route-separation/index.js#L32-L47)
- [Route map](https://github.com/expressjs/express/blob/4.13.1/examples/route-map/index.js#L52-L66)
- [MVC style controllers](https://github.com/expressjs/express/tree/master/examples/mvc)

此外，Express 拥有各类第三方扩展，能够简化部分开发架构范式：

- [Resourceful routing](https://github.com/expressjs/express-resource)

## 如何定义模型？

Express 本身不包含数据库相关概念。 这一概念交由第三方 Node 模块实现，让你能够与几乎所有数据库进行交互。

See [LoopBack](http://loopback.io) for an Express-based framework that is centered around models.

## 如何实现用户身份验证？

身份验证同样是一项带有主观选型倾向的功能，Express 并未涉足该领域。 你可以选用任意你想要的身份验证方案。
如需实现简易的用户名/密码验证方案，可参考[该示例](https://github.com/expressjs/express/tree/master/examples/auth)。

## Express 支持哪些模板引擎？

Express 支持所有符合 `(path, locals, callback)` 入参规范的模板引擎。
如需统一各类模板引擎的接口与缓存机制，可查看 [consolidate.js](https://github.com/visionmedia/consolidate.js) 项目以获取相关支持。 未列入清单的模板引擎也可能兼容 Express 的调用规范。

For more information, see [Using template engines with Express](/guide/using-template-engines).

## 如何处理 404 响应？

在 Express 中，404 响应并非由错误导致，因此错误处理中间件不会捕获这类响应。 出现这种行为的原因是，404 响应仅表示没有其他待执行的操作；换言之，Express 已执行完所有中间件函数和路由，但未找到任何能够响应请求的处理逻辑。 你只需在中间件栈的最底部（所有其他函数之后）添加一个中间件函数来处理 404 响应即可：

```js
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});
```

在运行时通过 `express.Router()` 实例动态添加路由，确保路由不会被中间件函数覆盖。

## 如何设置错误处理程序？

错误处理中间件的定义方式与其他中间件相同，区别在于它使用四个参数而非三个；具体的函数签名为 `(err, req, res, next)`：

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

For more information, see [Error handling](/guide/error-handling).

## 如何渲染纯 HTML？

无需额外操作！ 无需使用 `res.render()` 函数来“渲染” HTML。
如果你需要响应指定的文件，请使用 `res.sendFile()` 函数。
如果你要从一个目录提供多个静态资源，请使用 `express.static()` 中间件函数。

## Express 需要哪个版本的 Node.js？

- [Express 4.x](/4x/api) requires Node.js 0.10 or higher.
- [Express 5.x](/api) requires Node.js 18 or higher.
