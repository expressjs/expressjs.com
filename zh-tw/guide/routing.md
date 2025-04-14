---
layout: page
title: Express 路由
description: Learn how to define and use routes in Express.js applications, including route methods, route paths, parameters, and using Router for modular routing.
menu: guide
lang: zh-tw
redirect_from: /guide/routing.html
---

# 路由

_Routing_ refers to how an application's endpoints (URIs) respond to client requests.
For an introduction to routing, see [Basic routing](/{{ page.lang }}/starter/basic-routing.html).

You define routing using methods of the Express `app` object that correspond to HTTP methods;
for example, `app.get()` to handle GET requests and `app.post` to handle POST requests. For a full list,
see [app.METHOD](/{{ page.lang }}/5x/api.html#app.METHOD). You can also use [app.all()](/{{ page.lang }}/5x/api.html#app.all) to handle all HTTP methods and [app.use()](/{{ page.lang }}/5x/api.html#app.use) to
specify middleware as the callback function (See [Using middleware](/{{ page.lang }}/guide/using-middleware.html) for details).

These routing methods specify a callback function (sometimes called "handler functions") called when the application receives a request to the specified route (endpoint) and HTTP method. In other words, the application "listens" for requests that match the specified route(s) and method(s), and when it detects a match, it calls the specified callback function.

In fact, the routing methods can have more than one callback function as arguments.
With multiple callback functions, it is important to provide `next` as an argument to the callback function and then call `next()` within the body of the function to hand off control
to the next callback.

以下是以字串為基礎的部分路由路徑範例。

```js
const express = require('express')
const app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})
```

<h2 id="route-methods">路由方法</h2>

路由方法衍生自其中一個 HTTP 方法，並且會附加到 `express` 類別的實例中。

下列程式碼範例說明對應用程式根目錄提出 GET 和 POST 方法時所定義的路由。

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

`app.all()` 是一個特殊的路由方法，它不是衍生自任何 HTTP 方法。此方法用來在所有要求方法的路徑中載入中介軟體函數。 在下列範例中，不論您使用的是 GET、POST、PUT、DELETE 或 [http 模組](https://nodejs.org/api/http.html#http_http_methods)中支援的其他任何 HTTP 要求方法，都會針對傳給 "/secret" 的要求執行處理程式。

```js
app.all('/secret', (req, res, next) => {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
})
```

<h2 id="route-paths">路由路徑</h2>

Route paths, in combination with a request method, define the endpoints at which requests can be made. Route paths can be strings, string patterns, or regular expressions.

{% capture caution-character %} In express 5, the characters `?`, `+`, `*`, `[]`, and `()` are handled differently than in version 4, please review the [migration guide](/{{ page.lang }}/guide/migrating-5.html#path-syntax) for more information.{% endcapture %}

{% include admonitions/caution.html content=caution-character %}

{% capture note-dollar-character %}In express 4, regular expression characters such as `$` need to be escaped with a `\`.
{% endcapture %}

{% include admonitions/caution.html content=note-dollar-character %}

Express 使用 [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) 來找出相符的路由路徑；請參閱 path-to-regexp 說明文件，取得可用來定義路由路徑的所有可行方法。[Express Route Tester](http://forbeslindesay.github.io/express-route-tester/) 是一個用來測試 Express 基本路由的方便工具，只不過它不支援型樣相符。
[Express Playground Router](https://bjohansebas.github.io/playground-router/) is a handy tool for testing basic Express routes, although it does not support pattern matching.
{% endcapture %}

{% include admonitions/note.html content=note-path-to-regexp %}

{% include admonitions/warning.html content="Query strings are not part of the route path." %}

### Route paths based on strings

This route path will match requests to the root route, `/`.

```js
app.get('/', (req, res) => {
  res.send('root')
})
```

This route path will match requests to `/about`.

```js
app.get('/about', (req, res) => {
  res.send('about')
})
```

此路由路徑將符合傳送給 `/random.text` 的要求。

```js
app.get('/random.text', (req, res) => {
  res.send('random.text')
})
```

### Route paths based on string patterns

{% capture caution-string-patterns %} The string patterns in Express 5 no longer work. Please refer to the [migration guide](/{{ page.lang }}/guide/migrating-5.html#path-syntax) for more information.{% endcapture %}

{% include admonitions/caution.html content=caution-string-patterns %}

此路由路徑將符合 `acd` 和 `abcd`。

```js
app.get('/ab?cd', (req, res) => {
  res.send('ab?cd')
})
```

此路由路徑將符合 `abcd`、`abbcd`、`abbbcd` 等。

```js
app.get('/ab+cd', (req, res) => {
  res.send('ab+cd')
})
```

此路由路徑將符合 `abcd`、`abxcd`、`abRABDOMcd`、`ab123cd` 等。

```js
app.get('/ab*cd', (req, res) => {
  res.send('ab*cd')
})
```

此路由路徑將符合 `/abe` 和 `/abcde`。

```js
app.get('/ab(cd)?e', (req, res) => {
  res.send('ab(cd)?e')
})
```

### 以正規表示式為基礎的路由路徑範例：

This route path will match anything with an "a" in it.

```js
app.get(/a/, (req, res) => {
  res.send('/a/')
})
```

此路由路徑將符合 `butterfly` 和 `dragonfly`，但不符合 `butterflyman`、`dragonfly man` 等。

```js
app.get(/.*fly$/, (req, res) => {
  res.send('/.*fly$/')
})
```

<h2 id="route-parameters">當路由路徑配上要求方法時，即定義了發出要求時的目標端點。路由路徑可以是字串、字串型樣或正規表示式。</h2>

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

You can provide multiple callback functions that behave like [middleware](/{{ page.lang }}/guide/using-middleware.html) to handle a request. The only exception is that these callbacks might invoke `next('route')` to bypass the remaining route callbacks. You can use this mechanism to impose pre-conditions on a route, then pass control to subsequent routes if there's no reason to proceed with the current route.

Route handlers can be in the form of a function, an array of functions, or combinations of both, as shown in the following examples.

A single callback function can handle a route. For example:

```js
app.get('/example/a', (req, res) => {
  res.send('Hello from A!')
})
```

More than one callback function can handle a route (make sure you specify the `next` object). For example:

```js
app.get('/example/b', (req, res, next) => {
  console.log('the response will be sent by the next function ...')
  next()
}, (req, res) => {
  res.send('Hello from B!')
})
```

An array of callback functions can handle a route. For example:

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

A combination of independent functions and arrays of functions can handle a route. For example:

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

<h2 id="response-methods">回應方法</h2>

The methods on the response object (`res`) in the following table can send a response to the client, and terminate the request-response cycle. If none of these methods are called from a route handler, the client request will be left hanging.

| 方法                                                                                                                                                                                                                        | Description                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| [res.download()](/{{ page.lang }}/4x/api.html#res.download)     | 提示您提供要下載的檔案。                                                                                          |
| [res.end()](/{{ page.lang }}/4x/api.html#res.end)               | End the response process.                                                             |
| [res.json()](/{{ page.lang }}/4x/api.html#res.json)             | 傳送 JSON 回應。                                                                                           |
| [res.jsonp()](/{{ page.lang }}/4x/api.html#res.jsonp)           | 傳送 JSON 回應，並支援 JSONP。                                                                                 |
| [res.redirect()](/{{ page.lang }}/4x/api.html#res.redirect)     | 將要求重新導向。                                                                                              |
| [res.render()](/{{ page.lang }}/4x/api.html#res.render)         | Render a view template.                                                               |
| [res.send()](/{{ page.lang }}/4x/api.html#res.send)             | 傳送各種類型的回應。                                                                                            |
| [res.sendFile()](/{{ page.lang }}/4x/api.html#res.sendFile)     | 以八位元組串流形式傳送檔案。                                                                                        |
| [res.sendStatus()](/{{ page.lang }}/4x/api.html#res.sendStatus) | Set the response status code and send its string representation as the response body. |

<h2 id="app-route">app.route()</h2>

您可以使用 `app.route()`，來為路由路徑建立可鏈接的路由處理程式。
由於是在單一位置指定路徑，建立模組路由很有用，因為它可減少冗餘和打錯字的情況。如需路由的相關資訊，請參閱 [Router() 說明文件](/{{ page.lang }}/4x/api.html#router)。
Because the path is specified at a single location, creating modular routes is helpful, as is reducing redundancy and typos. For more information about routes, see: [Router() documentation](/{{ page.lang }}/5x/api.html#router).

下列範例顯示利用 `app.route()` 所定義的路由處理程式鏈。

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

Use the `express.Router` class to create modular, mountable route handlers. A `Router` instance is a complete middleware and routing system; for this reason, it is often referred to as a "mini-app".

The following example creates a router as a module, loads a middleware function in it, defines some routes, and mounts the router module on a path in the main app.

在應用程式目錄中建立一個名為 `birds.js` 的路由器檔案，內含下列內容：

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

然後將路由器模組載入應用程式中：

```js
const birds = require('./birds')

/// ...

app.use('/birds', birds)
```

現在，應用程式就能夠處理發給 `/birds` 和 `/birds/about` 的要求，並且呼叫該路由特定的 `timeLog` 中介軟體函數。

But if the parent route `/birds` has path parameters, it will not be accessible by default from the sub-routes. To make it accessible, you will need to pass the `mergeParams` option to the Router constructor [reference](/{{ page.lang }}/5x/api.html#app.use).

```js
*路由*是指應用程式端點 (URI) 的定義，以及應用程式如何回應用戶端要求。如需路由簡介，請參閱[基本路由](/{{ page.lang }}/starter/basic-routing.html)。
```
