---
layout: page
title: Express 错误处理
description: Understand how Express.js handles errors in synchronous and asynchronous code, and learn to implement custom error handling middleware for your applications.
menu: guide
lang: en
redirect_from: /guide/error-handling.html
---

# 错误处理

_Error Handling_ refers to how Express catches and processes errors that
occur both synchronously and asynchronously. Express comes with a default error
handler so you don't need to write your own to get started.

## 如果将错误传递到 `next()` 且未在错误处理程序中进行处理，那么该错误将由内置的错误处理程序处理；错误将写入客户机的堆栈跟踪内。堆栈跟踪不包含在生产环境中。

It's important to ensure that Express catches all errors that occur while
running route handlers and middleware.

Errors that occur in synchronous code inside route handlers and middleware
require no extra work. If synchronous code throws an error, then Express will
catch and process it. For example:

```js
app.get('/', (req, res) => {
  throw new Error('BROKEN') // Express will catch this on its own.
})
```

For errors returned from asynchronous functions invoked by route handlers
and middleware, you must pass them to the `next()` function, where Express will
catch and process them.  For example:

```js
app.get('/', (req, res, next) => {
  fs.readFile('/file-does-not-exist', (err, data) => {
    if (err) {
      next(err) // Pass errors to Express.
    } else {
      res.send(data)
    }
  })
})
```

Starting with Express 5, route handlers and middleware that return a Promise
will call `next(value)` automatically when they reject or throw an error.
For example:

```js
app.get('/user/:id', async (req, res, next) => {
  const user = await getUserById(req.params.id)
  res.send(user)
})
```

If `getUserById` throws an error or rejects, `next` will be called with either
the thrown error or the rejected value. If no rejected value is provided, `next`
will be called with a default Error object provided by the Express router.

如果将任何项传递到 `next()` 函数（除了字符串 `'route'`），那么 Express 会将当前请求视为处于错误状态，并跳过所有剩余的非错误处理路由和中间件函数。如果您希望以某种方式处理此错误，必须如下一节中所述创建一个错误处理路由。

If the callback in a sequence provides no data, only errors, you can simplify
this code as follows:

```js
app.get('/', [
  function (req, res, next) {
    fs.writeFile('/inaccessible-path', 'data', next)
  },
  function (req, res) {
    res.send('OK')
  }
])
```

In the above example, `next` is provided as the callback for `fs.writeFile`,
which is called with or without errors. If there is no error, the second
handler is executed, otherwise Express catches and processes the error.

You must catch errors that occur in asynchronous code invoked by route handlers or
middleware and pass them to Express for processing. For example:

```js
app.get('/', (req, res, next) => {
  setTimeout(() => {
    try {
      throw new Error('BROKEN')
    } catch (err) {
      next(err)
    }
  }, 100)
})
```

The above example uses a `try...catch` block to catch errors in the
asynchronous code and pass them to Express. If the `try...catch`
block were omitted, Express would not catch the error since it is not part of the synchronous
handler code.

Use promises to avoid the overhead of the `try...catch` block or when using functions
that return promises.  For example:

```js
app.get('/', (req, res, next) => {
  Promise.resolve().then(() => {
    throw new Error('BROKEN')
  }).catch(next) // Errors will be passed to Express.
})
```

Since promises automatically catch both synchronous errors and rejected promises,
you can simply provide `next` as the final catch handler and Express will catch errors,
because the catch handler is given the error as the first argument.

You could also use a chain of handlers to rely on synchronous error
catching, by reducing the asynchronous code to something trivial. For example:

```js
app.get('/', [
  function (req, res, next) {
    fs.readFile('/maybe-valid-file', 'utf-8', (err, data) => {
      res.locals.data = data
      next(err)
    })
  },
  function (req, res) {
    res.locals.data = res.locals.data.split(',')[1]
    res.send(res.locals.data)
  }
])
```

The above example has a couple of trivial statements from the `readFile`
call. If `readFile` causes an error, then it passes the error to Express, otherwise you
quickly return to the world of synchronous error handling in the next handler
in the chain. Then, the example above tries to process the data. If this fails, then the
synchronous error handler will catch it. If you had done this processing inside
the `readFile` callback, then the application might exit and the Express error
handlers would not run.

Whichever method you use, if you want Express error handlers to be called in and the
application to survive, you must ensure that Express receives the error.

## 缺省错误处理程序

Express 随附一个内置的错误处理程序，负责处理应用程序中可能遇到的任何错误。这个缺省的错误处理中间件函数添加在中间件函数集的末尾。 This default error-handling middleware function is added at the end of the middleware function stack.

If you pass an error to `next()` and you do not handle it in a custom error
handler, it will be handled by the built-in error handler; the error will be
written to the client with the stack trace. The stack trace is not included
in the production environment.

<div class="doc-box doc-info" markdown="1">
将环境变量 `NODE_ENV` 设置为 `production`，以生产方式运行此应用程序。
</div>

When an error is written, the following information is added to the
response:

- The `res.statusCode` is set from `err.status` (or `err.statusCode`). If
  this value is outside the 4xx or 5xx range, it will be set to 500.
- The `res.statusMessage` is set according to the status code.
- The body will be the HTML of the status code message when in production
  environment, otherwise will be `err.stack`.
- Any headers specified in an `err.headers` object.

如果在开始写响应之后调用 `next()` 时出错（例如，如果在以流式方式将响应传输到客户机时遇到错误），Express 缺省错误处理程序会关闭连接并使请求失败。

因此，在添加定制错误处理程序时，如果头已发送到客户机，您可能希望委托给 Express 中的缺省错误处理机制处理：

```js
function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
}
```

Note that the default error handler can get triggered if you call `next()` with an error
in your code more than once, even if custom error handling middleware is in place.

Other error handling middleware can be found at [Express middleware](/{{ page.lang }}/resources/middleware.html).

## Writing error handlers

错误处理中间件函数的定义方式与其他中间件函数基本相同，差别在于错误处理函数有四个自变量而不是三个：`(err, req, res, next)`：例如： For example:

```js
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

请在其他 `app.use()` 和路由调用之后，最后定义错误处理中间件，例如：

```js
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

app.use(bodyParser())
app.use(methodOverride())
app.use((err, req, res, next) => {
  // logic
})
```

中间件函数中的响应可以采用您首选的任何格式，例如，HTML 错误页、简单消息或 JSON 字符串。

For organizational (and higher-level framework) purposes, you can define
several error-handling middleware functions, much as you would with
regular middleware functions. For example, to define an error-handler
for requests made by using `XHR` and those without:

```js
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

app.use(bodyParser())
app.use(methodOverride())
app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)
```

在此示例中，通用 `logErrors` 可能将请求和错误信息写入 `stderr`，例如：

```js
function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}
```

也是在此示例中，`clientErrorHandler` 定义如下，错误会显式传递到下一项：

Notice that when _not_ calling "next" in an error-handling function, you are responsible for writing (and ending) the response. Otherwise, those requests will "hang" and will not be eligible for garbage collection.

```js
function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}
```

“catch-all”`errorHandler` 函数可以如下实现：

```js
function errorHandler (err, req, res, next) {
  res.status(500)
  res.render('error', { error: err })
}
```

如果一个路由处理程序具有多个回调函数，那么可以使用 `route` 参数跳至下一个路由处理程序。例如： For example:

```js
app.get('/a_route_behind_paywall',
  (req, res, next) => {
    if (!req.user.hasPaid) {

      // continue handling this request
      next('route')
    }
  }, (req, res, next) => {
    PaidContent.find((err, doc) => {
      if (err) return next(err)
      res.json(doc)
    })
  })
```

在此示例中，将跳过 `getPaidContent` 处理程序，而将继续执行 `/a_route_behind_paywall` 的 `app` 中所有剩余的处理程序。

<div class="doc-box doc-info" markdown="1">

对 `next()` 和 `next(err)` 的调用会表明当前处理程序是否完整以及处于何种状态。`next(err)` 将跳过链中所有剩余的处理程序（设置为按上述方式处理错误的处理程序除外）。
  `next(err)` will skip all remaining handlers in the chain except for those that are set up to handle errors as described above.
</div>
