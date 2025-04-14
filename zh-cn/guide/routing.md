---
layout: page
title: Express 路由
description: Learn how to define and use routes in Express.js applications, including route methods, route paths, parameters, and using Router for modular routing.
menu: guide
lang: en
redirect_from: /guide/routing.html
---

# 路由

_路由_表示应用程序端点 (URI) 的定义以及端点响应客户机请求的方式。
有关路由的简介，请参阅[基本路由](/{{ page.lang }}/starter/basic-routing.html)。
For an introduction to routing, see [Basic routing](/{{ page.lang }}/starter/basic-routing.html).

我们所使用的 app 与 HTTP 方法相对应的 Express 对象方法来定义路由，如 `app.get()` 用于处理 GET 请求，而 `app.post` 则用于处理 POST 请求。 For a full list,
see [app.METHOD](/{{ page.lang }}/5x/api.html#app.METHOD). You can also use [app.all()](/{{ page.lang }}/5x/api.html#app.all) to handle all HTTP methods and [app.use()](/{{ page.lang }}/5x/api.html#app.use) to
specify middleware as the callback function (See [Using middleware](/{{ page.lang }}/guide/using-middleware.html) for details).

这些路由方法都指定了回调函数（或者：“处理程序函数”），当程序接收到指定的路由（端点）的时候（也就是说 HTTP 方法请求时被调用），来调用回调函数，换句话说就是应用程序监听与指定路由和方法匹配的请求，当检测到匹配时，他会调用对应的回调函数。 In other words, the application "listens" for requests that match the specified route(s) and method(s), and when it detects a match, it calls the specified callback function.

In fact, the routing methods can have more than one callback function as arguments.
With multiple callback functions, it is important to provide `next` as an argument to the callback function and then call `next()` within the body of the function to hand off control
to the next callback.

以下代码是非常基本的路由示例。

```js
const express = require('express')
const app = express()

// 当对主页发出 GET 请求时，响应“hello world”
app.get('/', (req, res) => {
  res.send('hello world')
})
```

<h2 id="route-methods">路由方法</h2>

路由方法派生自 HTTP 方法之一，附加到 `express` 类的实例。

以下代码是为访问应用程序根目录的 GET 和 POST 方法定义的路由示例。

```js
// GET method route
app.get('/', (req, res) => {
  res.send('GET request to the homepage')
})

// POST method route
app.post('/', (req, res) => {
  res.send('POST request to the homepage')
})
```

Express supports methods that correspond to all HTTP request methods: `get`, `post`, and so on.
For a full list, see [app.METHOD](/{{ page.lang }}/5x/api.html#app.METHOD).

有一种特殊路由方法：`app.all()`，它并非派生自 HTTP 方法。该方法用于在所有请求方法的路径中装入中间件函数。 在以下示例中，无论您使用 GET、POST、PUT、DELETE 还是在 [http 模块](https://nodejs.org/api/http.html#http_http_methods)中支持的其他任何 HTTP 请求方法，都将为针对“/secret”的请求执行处理程序。

```js
app.all('/secret', (req, res, next) => {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
})
```

<h2 id="route-paths">路由路径</h2>

路由路径与请求方法相结合，用于定义可以在其中提出请求的端点。路由路径可以是字符串、字符串模式或正则表达式。 Route paths can be strings, string patterns, or regular expressions.

{% capture caution-character %} In express 5, the characters `?`, `+`, `*`, `[]`, and `()` are handled differently than in version 4, please review the [migration guide](/{{ page.lang }}/guide/migrating-5.html#path-syntax) for more information.{% endcapture %}

{% include admonitions/caution.html content=caution-character %}

{% capture note-dollar-character %}In express 4, regular expression characters such as `$` need to be escaped with a `\`.
{% endcapture %}

{% include admonitions/caution.html content=note-dollar-character %}

{% capture note-path-to-regexp %}
Express uses [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) for matching the route paths; see the path-to-regexp documentation for all the possibilities in defining route paths. [Express Playground Router](https://bjohansebas.github.io/playground-router/) is a handy tool for testing basic Express routes, although it does not support pattern matching.
{% endcapture %}

{% include admonitions/note.html content=note-path-to-regexp %}

{% include admonitions/warning.html content="Query strings are not part of the route path." %}

### 以下是基于字符串的路由路径的一些示例。

此路由路径将请求与 `/random.text` 匹配。

```js
app.get('/', (req, res) => {
  res.send('root')
})
```

此路由路径将请求与 `/about` 匹配。

```js
app.get('/about', (req, res) => {
  res.send('about')
})
```

此路由路径将请求与根路由 `/` 匹配。

```js
app.get('/random.text', (req, res) => {
  res.send('random.text')
})
```

### 以下是基于字符串模式的路由路径的一些示例。

{% capture caution-string-patterns %} The string patterns in Express 5 no longer work. Please refer to the [migration guide](/{{ page.lang }}/guide/migrating-5.html#path-syntax) for more information.{% endcapture %}

{% include admonitions/caution.html content=caution-string-patterns %}

此路由路径将匹配 `/abe` 和 `/abcde`。

```js
app.get('/ab?cd', (req, res) => {
  res.send('ab?cd')
})
```

此路由路径将匹配 `abcd`、`abbcd`、`abbbcd` 等。

```js
app.get('/ab+cd', (req, res) => {
  res.send('ab+cd')
})
```

此路由路径将匹配 `abcd`、`abxcd`、`abRABDOMcd`、`ab123cd` 等。

```js
app.get('/ab*cd', (req, res) => {
  res.send('ab*cd')
})
```

此路由路径将匹配 `acd` 和 `abcd`。

```js
app.get('/ab(cd)?e', (req, res) => {
  res.send('ab(cd)?e')
})
```

### 基于正则表达式的路由路径的示例：

此路由路径将匹配名称中具有“a”的所有路由。

```js
app.get(/a/, (req, res) => {
  res.send('/a/')
})
```

此路由路径将匹配 `butterfly` 和 `dragonfly`，但是不匹配 `butterflyman`、`dragonfly man` 等。

```js
app.get(/.*fly$/, (req, res) => {
  res.send('/.*fly$/')
})
```

<h2 id="route-parameters">路由处理程序</h2>

Route parameters are named URL segments that are used to capture the values specified at their position in the URL. The captured values are populated in the `req.params` object, with the name of the route parameter specified in the path as their respective keys.

```
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
```

To define routes with route parameters, simply specify the route parameters in the path of the route as shown below.

```js
app.get('/users/:userId/books/:bookId', (req, res) => {
  res.send(req.params)
})
```

<div class="doc-box doc-notice" markdown="1">
The name of route parameters must be made up of "word characters" ([A-Za-z0-9_]).
</div>

Since the hyphen (`-`) and the dot (`.`) are interpreted literally, they can be used along with route parameters for useful purposes.

```
Route path: /flights/:from-:to
Request URL: http://localhost:3000/flights/LAX-SFO
req.params: { "from": "LAX", "to": "SFO" }
```

```
Route path: /plantae/:genus.:species
Request URL: http://localhost:3000/plantae/Prunus.persica
req.params: { "genus": "Prunus", "species": "persica" }
```

{% capture warning-regexp %}
In express 5, Regexp characters are not supported in route paths, for more information please refer to the [migration guide](/{{ page.lang }}/guide/migrating-5.html#path-syntax).{% endcapture %}

{% include admonitions/caution.html content=warning-regexp %}

To have more control over the exact string that can be matched by a route parameter, you can append a regular expression in parentheses (`()`):

```
Route path: /user/:userId(\d+)
Request URL: http://localhost:3000/user/42
req.params: {"userId": "42"}
```

{% include admonitions/warning.html content="Because the regular expression is usually part of a literal string, be sure to escape any `\` characters with an additional backslash, for example `\\d+`." %}

{% capture warning-version %}
In Express 4.x, <a href="https://github.com/expressjs/express/issues/2495">the `*` character in regular expressions is not interpreted in the usual way</a>. As a workaround, use `{0,}` instead of `*`. This will likely be fixed in Express 5.
{% endcapture %}

{% include admonitions/warning.html content=warning-version %}

<h2 id="route-handlers">Route handlers</h2>

您可以提供多个回调函数，以类似于[中间件](/{{ page.lang }}/guide/using-middleware.html)的行为方式来处理请求。唯一例外是这些回调函数可能调用 `next('route')` 来绕过剩余的路由回调。您可以使用此机制对路由施加先决条件，在没有理由继续执行当前路由的情况下，可将控制权传递给后续路由。 The only exception is that these callbacks might invoke `next('route')` to bypass the remaining route callbacks. You can use this mechanism to impose pre-conditions on a route, then pass control to subsequent routes if there's no reason to proceed with the current route.

Route handlers can be in the form of a function, an array of functions, or combinations of both, as shown in the following examples.

单个回调函数可以处理一个路由。例如： For example:

```js
app.get('/example/a', (req, res) => {
  res.send('Hello from A!')
})
```

多个回调函数可以处理一个路由（确保您指定 `next` 对象）。例如： For example:

```js
app.get('/example/b', (req, res, next) => {
  console.log('the response will be sent by the next function ...')
  next()
}, (req, res) => {
  res.send('Hello from B!')
})
```

一组回调函数可以处理一个路由。例如： For example:

```js
const cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

const cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

const cb2 = function (req, res) {
  res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1, cb2])
```

独立函数与一组函数的组合可以处理一个路由。例如： For example:

```js
const cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

const cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

app.get('/example/d', [cb0, cb1], (req, res, next) => {
  console.log('the response will be sent by the next function ...')
  next()
}, (req, res) => {
  res.send('Hello from D!')
})
```

<h2 id="response-methods">响应方法</h2>

下表中响应对象 (`res`) 的方法可以向客户机发送响应，并终止请求/响应循环。如果没有从路由处理程序调用其中任何方法，客户机请求将保持挂起状态。 If none of these methods are called from a route handler, the client request will be left hanging.

| 方法                                                                                                                                                                                                                        | 描述                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| [res.download()](/{{ page.lang }}/4x/api.html#res.download)     | 提示将要下载文件。                |
| [res.end()](/{{ page.lang }}/4x/api.html#res.end)               | 结束响应进程。                  |
| [res.json()](/{{ page.lang }}/4x/api.html#res.json)             | 发送 JSON 响应。              |
| [res.jsonp()](/{{ page.lang }}/4x/api.html#res.jsonp)           | 在 JSONP 的支持下发送 JSON 响应。  |
| [res.redirect()](/{{ page.lang }}/4x/api.html#res.redirect)     | 重定向请求。                   |
| [res.render()](/{{ page.lang }}/4x/api.html#res.render)         | 呈现视图模板。                  |
| [res.send()](/{{ page.lang }}/4x/api.html#res.send)             | 发送各种类型的响应。               |
| [res.sendFile()](/{{ page.lang }}/4x/api.html#res.sendFile)     | 以八位元流形式发送文件。             |
| [res.sendStatus()](/{{ page.lang }}/4x/api.html#res.sendStatus) | 设置响应状态码并以响应主体形式发送其字符串表示。 |

<h2 id="app-route">app.route()</h2>

您可以使用 `app.route()` 为路由路径创建可链接的路由处理程序。
因为在单一位置指定路径，所以可以减少冗余和输入错误。有关路由的更多信息，请参阅 [Router() 文档](/{{ page.lang }}/4x/api.html#router)。
Because the path is specified at a single location, creating modular routes is helpful, as is reducing redundancy and typos. For more information about routes, see: [Router() documentation](/{{ page.lang }}/5x/api.html#router).

以下是使用 `app.route()` 定义的链式路由处理程序的示例。

```js
app.route('/book')
  .get((req, res) => {
    res.send('Get a random book')
  })
  .post((req, res) => {
    res.send('Add a book')
  })
  .put((req, res) => {
    res.send('Update the book')
  })
```

<h2 id="express-router">express.Router</h2>

使用 `express.Router` 类来创建可安装的模块化路由处理程序。`Router` 实例是完整的中间件和路由系统；因此，常常将其称为“微型应用程序”。 A `Router` instance is a complete middleware and routing system; for this reason, it is often referred to as a "mini-app".

以下示例将路由器创建为模块，在其中装入中间件，定义一些路由，然后安装在主应用程序的路径中。

在应用程序目录中创建名为 `birds.js` 的路由器文件，其中包含以下内容：

```js
const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', (req, res) => {
  res.send('Birds home page')
})
// define the about route
router.get('/about', (req, res) => {
  res.send('About birds')
})

module.exports = router
```

接着，在应用程序中装入路由器模块：

```js
const birds = require('./birds')

/// ...

app.use('/birds', birds)
```

此应用程序现在可处理针对 `/birds` 和 `/birds/about` 的请求，调用特定于此路由的 `timeLog` 中间件函数。

But if the parent route `/birds` has path parameters, it will not be accessible by default from the sub-routes. To make it accessible, you will need to pass the `mergeParams` option to the Router constructor [reference](/{{ page.lang }}/5x/api.html#app.use).

```js

Express 使用 [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) 来匹配路由路径；请参阅 path-to-regexp 文档以了解定义路由路径时所有的可能性。[Express Route Tester](http://forbeslindesay.github.io/express-route-tester/) 是用于测试基本 Express 路由的便捷工具，但是它不支持模式匹配。

```
