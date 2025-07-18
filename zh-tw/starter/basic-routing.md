---
layout: page
title: Express 基本路由
description: Learn the fundamentals of routing in Express.js applications, including how to define routes, handle HTTP methods, and create route handlers for your web server.
menu: starter
redirect_from: "  "
---

# 基本路由

_Routing_ refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).

Each route can have one or more handler functions, which are executed when the route is matched.

路由定義的結構如下：

```js
app.METHOD(PATH, HANDLER)
```

Where:

- `app` 是 `express` 的實例。
- `METHOD` 是 [HTTP 要求方法](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)。
- `PATH` 是伺服器上的路徑。
- `HANDLER` 是當路由相符時要執行的函數。

<div class="doc-box doc-notice" markdown="1">
This tutorial assumes that an instance of `express` named `app` is created and the server is running. 
這項指導教學假設已建立名稱為 `app` 的 `express` 實例，且伺服器正在執行。如果您不熟悉如何建立和啟動應用程式，請參閱 [Hello world 範例](/{{ page.lang }}/starter/hello-world.html)。

</div>

下列範例說明如何定義簡單的路由。

首頁中以 `Hello World!` 回應。

```js
app.get('/', (req, res) => {
  res.send('Hello World!')
})
```

對根路由 (`/`)（應用程式的首頁）發出 POST 要求時的回應：

```js
app.post('/', (req, res) => {
  res.send('Got a POST request')
})
```

對 `/user` 路由發出 PUT 要求時的回應：

```js
app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user')
})
```

對 `/user` 路由發出 DELETE 要求時的回應：

```js
app.delete('/user', (req, res) => {
  res.send('Got a DELETE request at /user')
})
```

如需路由的詳細資料，請參閱[路由手冊](/{{ page.lang }}/guide/routing.html)。

### [Previous: Express application generator ](/{{ page.lang }}/starter/generator.html)&nbsp;&nbsp;&nbsp;&nbsp;[Next: Serving static files in Express ](/{{ page.lang }}/starter/static-files.html)