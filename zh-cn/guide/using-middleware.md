---
layout: page
title: 使用 Express 中间件
description: Learn how to use middleware in Express.js applications, including application-level and router-level middleware, error handling, and integrating third-party middleware.
menu: guide
lang: en
redirect_from: /guide/using-middleware.html
---

# 使用中间件

Express 是一个路由和中间件 Web 框架，其自身只具有最低程度的功能：Express 应用程序基本上是一系列中间件函数调用。

_中间件_函数能够访问[请求对象](/{{ page.lang }}/4x/api.html#req) (`req`)、[响应对象](/{{ page.lang }}/4x/api.html#res) (`res`) 以及应用程序的请求/响应循环中的下一个中间件函数。下一个中间件函数通常由名为 `next` 的变量来表示。 The next middleware function is commonly denoted by a variable named `next`.

中间件函数可以执行以下任务：

- 执行任何代码。
- 对请求和响应对象进行更改。
- 结束请求/响应循环。
- 调用堆栈中的下一个中间件函数。

如果当前中间件函数没有结束请求/响应循环，那么它必须调用 `next()`，以将控制权传递给下一个中间件函数。否则，请求将保持挂起状态。 Otherwise, the request will be left hanging.

Express 应用程序可以使用以下类型的中间件：

- [应用层中间件](#middleware.application)
- [路由器层中间件](#middleware.router)
- [错误处理中间件](#middleware.error-handling)
- [内置中间件](#middleware.built-in)
- [第三方中间件](#middleware.third-party)

You can load application-level and router-level middleware with an optional mount path.
You can also load a series of middleware functions together, which creates a sub-stack of the middleware system at a mount point.

<h2 id='middleware.application'>应用层中间件</h2>

使用 `app.use()` 和 `app.METHOD()` 函数将应用层中间件绑定到[应用程序对象](/{{ page.lang }}/4x/api.html#app)的实例，其中 `METHOD` 是中间件函数处理的请求的小写 HTTP 方法（例如 GET、PUT 或 POST）。

This example shows a middleware function with no mount path. The function is executed every time the app receives a request.

```js
const app = express()

app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})
```

This example shows a middleware function mounted on the `/user/:id` path. The function is executed for any type of
HTTP request on the `/user/:id` path.

```js
app.use('/user/:id', (req, res, next) => {
  console.log('Request Type:', req.method)
  next()
})
```

This example shows a route and its handler function (middleware system). The function handles GET requests to the `/user/:id` path.

```js
app.get('/user/:id', (req, res, next) => {
  res.send('USER')
})
```

Here is an example of loading a series of middleware functions at a mount point, with a mount path.
It illustrates a middleware sub-stack that prints request info for any type of HTTP request to the `/user/:id` path.

```js
app.use('/user/:id', (req, res, next) => {
  console.log('Request URL:', req.originalUrl)
  next()
}, (req, res, next) => {
  console.log('Request Type:', req.method)
  next()
})
```

Route handlers enable you to define multiple routes for a path. 路由处理程序使您可以为一个路径定义多个路由。以下示例为针对 `/user/:id` 路径的 GET 请求定义两个路由。第二个路由不会导致任何问题，但是永远都不会被调用，因为第一个路由结束了请求/响应循环。 The second route will not cause any problems, but it will never get called because the first route ends the request-response cycle.

此示例显示一个中间件子堆栈，用于处理针对 `/user/:id` 路径的 GET 请求。

```js
app.get('/user/:id', (req, res, next) => {
  console.log('ID:', req.params.id)
  next()
}, (req, res, next) => {
  res.send('User Info')
})

// handler for the /user/:id path, which prints the user ID
app.get('/user/:id', (req, res, next) => {
  res.end(req.params.id)
})
```

要跳过路由器中间件堆栈中剩余的中间件函数，请调用 `next('route')` 将控制权传递给下一个路由。
**注**：`next('route')` 仅在使用 `app.METHOD()` 或 `router.METHOD()` 函数装入的中间件函数中有效。

{% include admonitions/note.html content="`next('route')` will work only in middleware functions that were loaded by using the `app.METHOD()` or `router.METHOD()` functions." %}

此示例显示一个路由及其处理程序函数（中间件系统）。此函数处理针对 `/user/:id` 路径的 GET 请求。

```js
app.get('/user/:id', (req, res, next) => {
  // if the user ID is 0, skip to the next route
  if (req.params.id === '0') next('route')
  // otherwise pass the control to the next middleware function in this stack
  else next() //
}, (req, res, next) => {
  // render a regular page
  res.render('regular')
})

// handler for the /user/:id path, which renders a special page
app.get('/user/:id', (req, res, next) => {
  res.render('special')
})
```

Middleware can also be declared in an array for reusability.

此示例显示安装在 `/user/:id` 路径中的中间件函数。在 `/user/:id` 路径中为任何类型的 HTTP 请求执行此函数。

```js
function logOriginalUrl (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}

function logMethod (req, res, next) {
  console.log('Request Type:', req.method)
  next()
}

const logStuff = [logOriginalUrl, logMethod]
app.get('/user/:id', logStuff, (req, res, next) => {
  res.send('User Info')
})
```

<h2 id='middleware.router'>路由器层中间件</h2>

路由器层中间件的工作方式与应用层中间件基本相同，差异之处在于它绑定到 `express.Router()` 的实例。

```js
const router = express.Router()
```

以下是在安装点使用安装路径装入一系列中间件函数的示例。
它演示一个中间件子堆栈，用于显示针对 `/user/:id` 路径的任何类型 HTTP 请求的信息。

使用 `router.use()` 和 `router.METHOD()` 函数装入路由器层中间件。
以下示例代码使用路由器层中间件复制以上为应用层中间件显示的中间件系统：

```js
const app = express()
const router = express.Router()

// a middleware function with no mount path. This code is executed for every request to the router
router.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use('/user/:id', (req, res, next) => {
  console.log('Request URL:', req.originalUrl)
  next()
}, (req, res, next) => {
  console.log('Request Type:', req.method)
  next()
})

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get('/user/:id', (req, res, next) => {
  // if the user ID is 0, skip to the next router
  if (req.params.id === '0') next('route')
  // otherwise pass control to the next middleware function in this stack
  else next() //
}, (req, res, next) => {
  // render a regular page
  res.render('regular')
})

// handler for the /user/:id path, which renders a special page
router.get('/user/:id', (req, res, next) => {
  console.log(req.params.id)
  res.render('special')
})

// mount the router on the app
app.use('/', router)
```

To skip the rest of the router's middleware functions, call `next('router')`
to pass control back out of the router instance.

此示例显示一个中间件子堆栈，用于处理针对 `/user/:id` 路径的 GET 请求。

```js
const options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}

app.use(express.static('public', options))
```

<h2 id='middleware.error-handling'>错误处理中间件</h2>

<div class="doc-box doc-notice" markdown="1">
Error-handling middleware always takes _four_ arguments. You must provide four arguments to identify it as an error-handling middleware function. Even if you don't need to use the `next` object, you must specify it to maintain the signature. Otherwise, the `next` object will be interpreted as regular middleware and will fail to handle errors.
</div>

错误处理中间件函数的定义方式与其他中间件函数基本相同，差别在于错误处理函数有四个自变量而不是三个，专门具有特征符 `(err, req, res, next)`：

```js
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

有关错误处理中间件的详细信息，请参阅：[错误处理](/{{ page.lang }}/guide/error-handling.html)。

<h2 id='middleware.built-in'>内置中间件</h2>

Starting with version 4.x, Express no longer depends on [Connect](https://github.com/senchalabs/connect). 自 V4.x 起，Express 不再依赖于 [Connect](https://github.com/senchalabs/connect)。除 `express.static` 外，先前 Express 随附的所有中间件函数现在以单独模块的形式提供。请查看[中间件函数的列表](https://github.com/senchalabs/connect#middleware)。

Express has the following built-in middleware functions:

- [express.static](/en/4x/api.html#express.static) serves static assets such as HTML files, images, and so on.
- [express.json](/en/4x/api.html#express.json) parses incoming requests with JSON payloads. **NOTE: Available with Express 4.16.0+**
- [express.urlencoded](/en/4x/api.html#express.urlencoded) parses incoming requests with URL-encoded payloads.  **NOTE: Available with Express 4.16.0+**

<h2 id='middleware.third-party'>第三方中间件</h2>

使用第三方中间件向 Express 应用程序添加功能。

安装具有所需功能的 Node.js 模块，然后在应用层或路由器层的应用程序中将其加装入。

以下示例演示如何安装和装入 cookie 解析中间件函数 `cookie-parser`。

```bash
$ npm install cookie-parser
```

```js
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

// load the cookie-parsing middleware
app.use(cookieParser())
```

有关 Express 常用的第三方中间件函数的部分列表，请参阅：[第三方中间件](../resources/middleware.html)。
