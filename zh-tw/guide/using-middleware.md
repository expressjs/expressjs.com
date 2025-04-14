---
layout: page
title: 使用 Express 中介軟體
description: Learn how to use middleware in Express.js applications, including application-level and router-level middleware, error handling, and integrating third-party middleware.
menu: guide
lang: zh-tw
redirect_from: /guide/using-middleware.html
---

# 使用中介軟體

Express 是一個本身功能極簡的路由與中介軟體 Web 架構：本質上，Express 應用程式是一系列的中介軟體函數呼叫。

_Middleware_ functions are functions that have access to the [request object](/{{ page.lang }}/4x/api.html#req)  (`req`), the [response object](/{{ page.lang }}/4x/api.html#res) (`res`), and the next middleware function in the application's request-response cycle. The next middleware function is commonly denoted by a variable named `next`.

Middleware functions can perform the following tasks:

- 執行任何程式碼。
- Make changes to the request and the response objects.
- End the request-response cycle.
- Call the next middleware function in the stack.

If the current middleware function does not end the request-response cycle, it must call `next()` to pass control to the next middleware function. Otherwise, the request will be left hanging.

Express 應用程式可以使用下列類型的中介軟體：

- [應用程式層次的中介軟體](#middleware.application)
- [路由器層次的中介軟體](#middleware.router)
- [錯誤處理中介軟體](#middleware.error-handling)
- [內建中介軟體](#middleware.built-in)
- [協力廠商中介軟體](#middleware.third-party)

You can load application-level and router-level middleware with an optional mount path.
You can also load a series of middleware functions together, which creates a sub-stack of the middleware system at a mount point.

<h2 id='middleware.application'>應用程式層次的中介軟體</h2>

使用 `app.use()` 和 `app.METHOD()` 函數，將應用程式層次的中介軟體連結至 [app object](/{{ page.lang }}/4x/api.html#app) 實例，其中 `METHOD` 是中介軟體函數要處理的 HTTP 要求方法（例如 GET、PUT 或 POST），並採小寫。

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

Route handlers enable you to define multiple routes for a path. The example below defines two routes for GET requests to the `/user/:id` path. The second route will not cause any problems, but it will never get called because the first route ends the request-response cycle.

本例顯示中介軟體子堆疊，它處理了指向 `/user/:id` 路徑的 GET 要求。

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

To skip the rest of the middleware functions from a router middleware stack, call `next('route')` to pass control to the next route.

{% include admonitions/note.html content="`next('route')` will work only in middleware functions that were loaded by using the `app.METHOD()` or `router.METHOD()` functions." %}

本例顯示路由和其處理程式函數（中介軟體系統）。此函數會處理指向 `/user/:id` 路徑的 GET 要求。

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

本例顯示裝載在 `/user/:id` 路徑的中介軟體函數。會對 `/user/:id` 路徑上任何類型的 HTTP 要求，執行此函數。

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

<h2 id='middleware.router'>路由器層次的中介軟體</h2>

路由器層次的中介軟體的運作方式如同應用程式層次的中介軟體，不同之處在於它會連結至 `express.Router()` 實例。

```js
const router = express.Router()
```

請利用 `router.use()` 和 `router.METHOD()` 函數來載入路由器層次的中介軟體。

下列的程式碼範例是使用路由器層次的中介軟體，抄寫上述針對應用程式層次的中介軟體顯示的中介軟體系統：

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

本例顯示中介軟體子堆疊，它處理了指向 `/user/:id` 路徑的 GET 要求。

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

<h2 id='middleware.error-handling'>Error-handling middleware</h2>

<div class="doc-box doc-notice" markdown="1">
Error-handling middleware always takes _four_ arguments. You must provide four arguments to identify it as an error-handling middleware function. Even if you don't need to use the `next` object, you must specify it to maintain the signature. Otherwise, the `next` object will be interpreted as regular middleware and will fail to handle errors.
</div>

Define error-handling middleware functions in the same way as other middleware functions, except with four arguments instead of three, specifically with the signature `(err, req, res, next)`:

```js
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

For details about error-handling middleware, see: [Error handling](/{{ page.lang }}/guide/error-handling.html).

<h2 id='middleware.built-in'>Built-in middleware</h2>

從 4.x 版起，Express 不再相依於 [Connect](https://github.com/senchalabs/connect)。除了 `express.static`，Express 先前隨附的所有中介軟體函數現在位於個別的模組中。請檢視[中介軟體函數清單](https://github.com/senchalabs/connect#middleware)。 The middleware
functions that were previously included with Express are now in separate modules; see [the list of middleware functions](https://github.com/senchalabs/connect#middleware).

Express has the following built-in middleware functions:

- [express.static](/en/4x/api.html#express.static) serves static assets such as HTML files, images, and so on.
- [express.json](/en/4x/api.html#express.json) parses incoming requests with JSON payloads. **NOTE: Available with Express 4.16.0+**
- [express.urlencoded](/en/4x/api.html#express.urlencoded) parses incoming requests with URL-encoded payloads.  **NOTE: Available with Express 4.16.0+**

<h2 id='middleware.third-party'>Third-party middleware</h2>

Use third-party middleware to add functionality to Express apps.

針對必要的功能安裝 Node.js 模組，然後在應用程式層次或路由器層次將它載入到您的應用程式中。

下列範例說明如何安裝和載入用來剖析 Cookie 的中介軟體函數 `cookie-parser`。

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

For a partial list of third-party middleware functions that are commonly used with Express, see: [Third-party middleware](../resources/middleware.html).
