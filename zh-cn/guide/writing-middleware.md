---
layout: page
title: 编写中间件以用于 Express 应用程序
description: Learn how to write custom middleware functions for Express.js applications, including examples and best practices for enhancing request and response handling.
menu: guide
lang: zh-cn
redirect_from: "  "
---

# 编写中间件以用于 Express 应用程序

<h2>概述</h2>

_中间件_函数能够访问[请求对象](/{{ page.lang }}/4x/api.html#req) (`req`)、[响应对象](/{{ page.lang }}/4x/api.html#res) (`res`) 以及应用程序的请求/响应循环中的下一个中间件函数。下一个中间件函数通常由名为 `next` 的变量来表示。 The `next` function is a function in the Express router which, when invoked, executes the middleware succeeding the current middleware.

中间件函数可以执行以下任务：

- 执行任何代码。
- 对请求和响应对象进行更改。
- 结束请求/响应循环。
- 调用堆栈中的下一个中间件。

如果当前中间件函数没有结束请求/响应循环，那么它必须调用 `next()`，以将控制权传递给下一个中间件函数。否则，请求将保持挂起状态。 Otherwise, the request will be left hanging.

以下示例显示中间件函数调用的元素：

<table id="mw-fig">
<tbody><tr><td id="mw-fig-imgcell">
<img src="/images/express-mw.png" alt="Elements of a middleware function call" id="mw-fig-img" />
</td>
<td class="mw-fig-callouts">
<div class="callout" id="callout1">中间件函数适用的 HTTP 方法。</div></tbody>

<div class="callout" id="callout2">中间件函数适用的路径（路由）。</div>

<div class="callout" id="callout3">中间件函数。</div>

<div class="callout" id="callout4">中间件函数的回调自变量，按约定称为“next”。</div>

<div class="callout" id="callout5">中间件函数的 HTTP <a href="../4x/api.html#res">响应</a>自变量，按约定称为“res”。</div>

<div class="callout" id="callout6">中间件函数的 HTTP <a href="../4x/api.html#req">请求</a>自变量，按约定称为“req”。</div>
</td></tr>
</table>

Starting with Express 5, middleware functions that return a Promise will call `next(value)` when they reject or throw an error. `next` will be called with either the rejected value or the thrown Error.

<h2>示例</h2>

以下是“Hello World”Express 应用程序的简单示例，将为其定义两个中间件函数：
The remainder of this article will define and add three middleware functions to the application:
one called `myLogger` that prints a simple log message, one called `requestTime` that
displays the timestamp of the HTTP request, and one called `validateCookies` that validates incoming cookies.

```js
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000)
```

<h3>Middleware function myLogger</h3>
Here is a simple example of a middleware function called "myLogger". This function just prints "LOGGED" when a request to the app passes through it. 以下是称为“myLogger”的中间件函数的简单示例。此函数仅在应用程序的请求通过它时显示“LOGGED”。中间件函数会分配给名为 `myLogger` 的变量。

```js
const myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}
```

<div class="doc-box doc-notice" markdown="1">
Notice the call above to `next()`. Calling this function invokes the next middleware function in the app.

请注意以上对 `next()` 的调用。调用此函数时，将调用应用程序中的下一个中间件函数。
`next()` 函数不是 Node.js 或 Express API 的一部分，而是传递给中间件函数的第三自变量。`next()` 函数可以命名为任何名称，但是按约定，始终命名为“next”。为了避免混淆，请始终使用此约定。
 The `next()` function could be named anything, but by convention it is always named "next".
To avoid confusion, always use this convention.
</div>

To load the middleware function, call `app.use()`, specifying the middleware function.
For example, the following code loads the `myLogger` middleware function before the route to the root path (/).

```js
const express = require('express')
const app = express()

const myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}

app.use(myLogger)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000)
```

应用程序每次收到请求时，会在终端上显示消息“LOGGED”。

中间件装入顺序很重要：首先装入的中间件函数也首先被执行。

如果在根路径的路由之后装入 `myLogger`，那么请求永远都不会到达该函数，应用程序也不会显示“LOGGED”，因为根路径的路由处理程序终止了请求/响应循环。

中间件函数 `myLogger` 只是显示消息，然后通过调用 `next()` 函数将请求传递到堆栈中的下一个中间件函数。

<h3>Middleware function requestTime</h3>

下一个示例将名为 `requestTime` 的属性添加到请求对象。我们将此中间件函数命名为“requestTime”。

```js
const requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}
```

The app now uses the `requestTime` middleware function. 现在，该应用程序使用 `requestTime` 中间件函数。此外，根路径路由的回调函数使用由中间件函数添加到 `req`（请求对象）的属性。

```js
const express = require('express')
const app = express()

const requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}

app.use(requestTime)

app.get('/', (req, res) => {
  let responseText = 'Hello World!<br>'
  responseText += `<small>Requested at: ${req.requestTime}</small>`
  res.send(responseText)
})

app.listen(3000)
```

您向应用程序根发出请求时，此应用程序当前在浏览器中显示请求的时间戳记。

<h3>Middleware function validateCookies</h3>

Finally, we'll create a middleware function that validates incoming cookies and sends a 400 response if cookies are invalid.

Here's an example function that validates cookies with an external async service.

```js
async function cookieValidator (cookies) {
  try {
    await externallyValidateCookie(cookies.testCookie)
  } catch {
    throw new Error('Invalid cookies')
  }
}
```

Here, we use the [`cookie-parser`](/resources/middleware/cookie-parser.html) middleware to parse incoming cookies off the `req` object and pass them to our `cookieValidator` function. The `validateCookies` middleware returns a Promise that upon rejection will automatically trigger our error handler.

```js
const express = require('express')
const cookieParser = require('cookie-parser')
const cookieValidator = require('./cookieValidator')

const app = express()

async function validateCookies (req, res, next) {
  await cookieValidator(req.cookies)
  next()
}

app.use(cookieParser())

app.use(validateCookies)

// error handler
app.use((err, req, res, next) => {
  res.status(400).send(err.message)
})

app.listen(3000)
```

<div class="doc-box doc-notice" markdown="1">
Note how `next()` is called after `await cookieValidator(req.cookies)`. This ensures that if `cookieValidator` resolves, the next middleware in the stack will get called. If you pass anything to the `next()` function (except the string `'route'` or `'router'`), Express regards the current request as being an error and will skip any remaining non-error handling routing and middleware functions.
</div>

因为您拥有请求对象、响应对象、堆栈中的下一个中间件函数以及整个 Node.js API 的访问权，所以中间件函数的可能性是无穷的。

有关 Express 中间件的更多信息，请参阅：[使用 Express 中间件](/{{ page.lang }}/guide/using-middleware.html)。

<h2>Configurable middleware</h2>

If you need your middleware to be configurable, export a function which accepts an options object or other parameters, which, then returns the middleware implementation based on the input parameters.

File: `my-middleware.js`

```js
module.exports = function (options) {
  return function (req, res, next) {
    // Implement the middleware function based on the options object
    next()
  }
}
```

The middleware can now be used as shown below.

```js
const mw = require('./my-middleware.js')

app.use(mw({ option1: '1', option2: '2' }))
```

Refer to [cookie-session](https://github.com/expressjs/cookie-session) and [compression](https://github.com/expressjs/compression) for examples of configurable middleware.
