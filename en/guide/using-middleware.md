---
layout: page
title: Using Express middleware
description: Learn how to use middleware in Express.js applications, including application-level and router-level middleware, error handling, and integrating third-party middleware.
menu: guide
order: 3
redirect_from: "/guide/using-middleware.html"
---

# Using middleware

Express is a lightweight routing and middleware web framework. An Express application is essentially a series of middleware function calls executed during the request-response cycle.

_Middleware_ functions are functions that have access to:

- The [request object](/{{ page.lang }}/5x/api.html#req) (`req`)
- The [response object](/{{ page.lang }}/5x/api.html#res) (`res`)
- The next middleware function in the application's request-response cycle, commonly named `next`

Middleware functions can perform the following tasks:

- Execute any code
- Modify the request and response objects
- End the request-response cycle
- Pass control to the next middleware function

If a middleware function does not end the request-response cycle, it must call `next()`. Otherwise, the request will remain pending.

Express applications can use the following types of middleware:

- [Application-level middleware](#middleware.application)
- [Router-level middleware](#middleware.router)
- [Error-handling middleware](#middleware.error-handling)
- [Built-in middleware](#middleware.built-in)
- [Third-party middleware](#middleware.third-party)

You can load middleware functions with an optional mount path. Multiple middleware functions can also be grouped together to create a middleware sub-stack at a specific mount point.

<h2 id='middleware.application'>Application-level middleware</h2>

Application-level middleware is bound to an instance of the [app object](/{{ page.lang }}/5x/api.html#app) using:

- `app.use()`
- `app.METHOD()`

where `METHOD` is the lowercase HTTP method such as `get`, `post`, `put`, or `delete`.

## Middleware without a mount path

The following middleware runs for every incoming request:

```js
const express = require('express')
const app = express()

app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})
```

## Middleware mounted on a specific path

The following middleware runs for all request types on `/user/:id`:

```js
app.use('/user/:id', (req, res, next) => {
  console.log('Request Type:', req.method)
  next()
})
```

## Route handler example

This route handles GET requests to `/user/:id`:

```js
app.get('/user/:id', (req, res) => {
  res.send('USER')
})
```

## Multiple middleware functions

Middleware functions can be chained together to form a middleware sub-stack:

```js
app.use(
  '/user/:id',
  (req, res, next) => {
    console.log('Request URL:', req.originalUrl)
    next()
  },
  (req, res, next) => {
    console.log('Request Type:', req.method)
    next()
  }
)
```

## Route middleware sub-stack

The following example demonstrates multiple middleware handlers for the same route:

```js
app.get(
  '/user/:id',
  (req, res, next) => {
    console.log('ID:', req.params.id)
    next()
  },
  (req, res) => {
    res.send('User Info')
  }
)
```

> The middleware above ends the request-response cycle using `res.send()`. Any matching routes defined after this will not execute unless `next('route')` is used.

## Skipping to the next route

Call `next('route')` to skip the remaining middleware functions for the current route.

> `next('route')` works only in middleware functions loaded using `app.METHOD()` or `router.METHOD()`.

```js
app.get(
  '/user/:id',
  (req, res, next) => {
    if (req.params.id === '0') {
      next('route')
    } else {
      next()
    }
  },
  (req, res) => {
    res.send('regular')
  }
)

app.get('/user/:id', (req, res) => {
  res.send('special')
})
```

## Reusable middleware arrays

Middleware functions can also be grouped into arrays for better reusability:

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

app.get('/user/:id', logStuff, (req, res) => {
  res.send('User Info')
})
```

<h2 id='middleware.router'>Router-level middleware</h2>

Router-level middleware works the same way as application-level middleware, except it is bound to an instance of `express.Router()`.

```js
const router = express.Router()
```

Load router-level middleware using:

- `router.use()`
- `router.METHOD()`

The following example demonstrates router-level middleware:

```js
const express = require('express')
const app = express()
const router = express.Router()

// Runs for every request handled by this router
router.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})

// Middleware sub-stack
router.use(
  '/user/:id',
  (req, res, next) => {
    console.log('Request URL:', req.originalUrl)
    next()
  },
  (req, res, next) => {
    console.log('Request Type:', req.method)
    next()
  }
)

// Route-specific middleware
router.get(
  '/user/:id',
  (req, res, next) => {
    if (req.params.id === '0') {
      next('route')
    } else {
      next()
    }
  },
  (req, res) => {
    res.render('regular')
  }
)

// Special route handler
router.get('/user/:id', (req, res) => {
  console.log(req.params.id)
  res.render('special')
})

// Mount router
app.use('/', router)
```

## Skipping out of a router

Use `next('router')` to exit the current router instance and pass control back to the main application.

```js
const express = require('express')
const app = express()
const router = express.Router()

// Router guard middleware
router.use((req, res, next) => {
  if (!req.headers['x-auth']) {
    return next('router')
  }

  next()
})

router.get('/user/:id', (req, res) => {
  res.send('hello, user!')
})

// Fallback handler
app.use('/admin', router, (req, res) => {
  res.sendStatus(401)
})
```

<h2 id='middleware.error-handling'>Error-handling middleware</h2>

<div class="doc-box doc-notice" markdown="1">

Error-handling middleware always requires **four arguments**:

```js
(err, req, res, next)
```

Even if you do not use `next`, you must include it to ensure Express recognizes the function as error-handling middleware.

</div>

Example:

```js
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

For more information, see: [Error handling](/{{ page.lang }}/guide/error-handling.html)

<h2 id='middleware.built-in'>Built-in middleware</h2>

Starting from Express 4.x, Express no longer depends on [Connect](https://github.com/senchalabs/connect). Middleware previously bundled with Express is now maintained in separate modules.

Express includes the following built-in middleware functions:

- [express.static](/en/5x/api.html#express.static)  
  Serves static assets such as HTML files, images, CSS files, and JavaScript files.

- [express.json](/en/5x/api.html#express.json)  
  Parses incoming requests with JSON payloads.

- [express.urlencoded](/en/5x/api.html#express.urlencoded)  
  Parses incoming requests with URL-encoded payloads.

<h2 id='middleware.third-party'>Third-party middleware</h2>

Third-party middleware can be used to add additional functionality to Express applications.

Install the required package using npm and load it either at the application level or router level.

The following example demonstrates the `cookie-parser` middleware:

```bash
npm install cookie-parser
```

```js
const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()

// Load cookie-parsing middleware
app.use(cookieParser())
```

For more commonly used middleware packages, see:
[Third-party middleware](../resources/middleware.html)
