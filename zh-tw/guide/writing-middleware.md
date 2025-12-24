---
layout: page
title: 撰寫中介軟體以用於 Express 應用程式中
description: Learn how to write custom middleware functions for Express.js applications, including examples and best practices for enhancing request and response handling.
menu: guide
order: 2
redirect_from: "  "
---

# 撰寫中介軟體以用於 Express 應用程式中

<h2>概觀</h2>

_Middleware_ functions are functions that have access to the [request object](/{{ page.lang }}/5x/api.html#req) (`req`), the [response object](/{{ page.lang }}/5x/api.html#res) (`res`), and the `next` function in the application's request-response cycle. The `next` function is a function in the Express router which, when invoked, executes the middleware succeeding the current middleware.

Middleware functions can perform the following tasks:

- 執行任何程式碼。
- Make changes to the request and the response objects.
- End the request-response cycle.
- Call the next middleware in the stack.

If the current middleware function does not end the request-response cycle, it must call `next()` to pass control to the next middleware function. Otherwise, the request will be left hanging.

The following figure shows the elements of a middleware function call:

<div class="table-scroller">
<table id="mw-fig">
<tbody><tr><td id="mw-fig-imgcell">
<img src="/images/express-mw.png" alt="Elements of a middleware function call" id="mw-fig-img" />
</td>
<td class="mw-fig-callouts">
<div class="callout" id="callout1">HTTP method for which the middleware function applies.</div></tbody>

<div class="callout" id="callout2">Path (route) for which the middleware function applies.</div>

<div class="callout" id="callout3">The middleware function.</div>

<div class="callout" id="callout4">中介軟體函數的回呼引數，依慣例，稱為 "next"。</div>

<div class="callout" id="callout5">中介軟體函數的 HTTP <a href="../5x/api.html#res">response</a> 引數，依慣例，稱為 "res"。</div>

<div class="callout" id="callout6">中介軟體函數的 HTTP <a href="../5x/api.html#req">request</a> 引數，依慣例，稱為 "req"。</div>
</td></tr>
</table>
</div>

Starting with Express 5, middleware functions that return a Promise will call `next(value)` when they reject or throw an error. `next` will be called with either the rejected value or the thrown Error.

<h2>範例</h2>

下列範例顯示簡單的 "Hello World" Express 應用程式，您將為這個應用程式定義兩個中介軟體函數：
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
Here is a simple example of a middleware function called "myLogger". This function just prints "LOGGED" when a request to the app passes through it. The middleware function is assigned to a variable named `myLogger`.

```js
const myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}
```

<div class="doc-box doc-notice" markdown="1">
Notice the call above to `next()`. Calling this function invokes the next middleware function in the app.
The `next()` function is not a part of the Node.js or Express API, but is the third argument that is passed to the middleware function. The `next()` function could be named anything, but by convention it is always named "next".
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

每當應用程式收到要求時，它會將 "LOGGED" 訊息列印至終端機。

The order of middleware loading is important: middleware functions that are loaded first are also executed first.

如果 `myLogger` 是在根路徑路由之後才載入，要求永不會抵達該函數，應用程式也不會列印 "LOGGED"，因為根路徑的路由處理程式會終止要求/回應循環。

The middleware function `myLogger` simply prints a message, then passes on the request to the next middleware function in the stack by calling the `next()` function.

<h3>Middleware function requestTime</h3>

Next, we'll create a middleware function called "requestTime" and add a property called `requestTime`
to the request object.

```js
const requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}
```

The app now uses the `requestTime` middleware function. Also, the callback function of the root path route uses the property that the middleware function adds to `req` (the request object).

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

When you make a request to the root of the app, the app now displays the timestamp of your request in the browser.

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

Because you have access to the request object, the response object, the next middleware function in the stack, and the whole Node.js API, the possibilities with middleware functions are endless.

For more information about Express middleware, see: [Using Express middleware](/{{ page.lang }}/guide/using-middleware.html).

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
