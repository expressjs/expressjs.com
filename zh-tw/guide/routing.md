---
layout: page
title: Express 路由
menu: guide
lang: zh-tw
description: Learn how to define and use routes in Express.js applications, including
  route methods, route paths, parameters, and using Router for modular routing.
---

# 路由

*路由*是指應用程式端點 (URI) 的定義，以及應用程式如何回應用戶端要求。如需路由簡介，請參閱[基本路由](/{{ page.lang }}/starter/basic-routing.html)。

下列程式碼範例說明相當基本的路由。

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

Express 支援下列的路由方法，這些方法對應至 HTTP 方法：`get`、
`post`、`put`、`head`、`delete`、`options`、
`trace`、`copy`、`lock`、`mkcol`、`move`、`purge`、`propfind`、`proppatch`、`unlock`、`report`、`mkactivity`、`checkout`、`merge`、`m-search`、`notify`、`subscribe`、`unsubscribe`、`patch`、`search`，以及 `connect`。

<div class="doc-box doc-info" markdown="1">
如果要遞送的方法會轉換成無效的 JavaScript 變數名稱，請使用括弧表示法。例如，`app['m-search']('/', function ...`
</div>

`app.all()` 是一個特殊的路由方法，它不是衍生自任何 HTTP 方法。此方法用來在所有要求方法的路徑中載入中介軟體函數。

在下列範例中，不論您使用的是 GET、POST、PUT、DELETE 或 [http 模組](https://nodejs.org/api/http.html#http_http_methods)中支援的其他任何 HTTP 要求方法，都會針對傳給 "/secret" 的要求執行處理程式。

```js
app.all('/secret', (req, res, next) => {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
})
```

<h2 id="route-paths">路由路徑</h2>

當路由路徑配上要求方法時，即定義了發出要求時的目標端點。路由路徑可以是字串、字串型樣或正規表示式。

<div class="doc-box doc-info" markdown="1">
  Express 使用 [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) 來找出相符的路由路徑；請參閱 path-to-regexp 說明文件，取得可用來定義路由路徑的所有可行方法。[Express Route Tester](http://forbeslindesay.github.io/express-route-tester/) 是一個用來測試 Express 基本路由的方便工具，只不過它不支援型樣相符。
</div>

<div class="doc-box doc-warn" markdown="1">
查詢字串不是路由路徑的一部分。
</div>

以下是以字串為基礎的部分路由路徑範例。

此路由路徑將符合傳送給根路由 `/` 的要求。

```js
app.get('/', (req, res) => {
  res.send('root')
})
```

此路由路徑將符合傳送給 `/about` 的要求。

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

以下是以字串型樣為基礎的部分路由路徑範例。

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

<div class="doc-box doc-info" markdown="1">
 ?、+、* 和 () 字元是其正規表示式對應項目的一部分。以字串為基礎的路徑會照字面來解譯連字符號 (-) 和句點 (.)。
</div>

以正規表示式為基礎的路由路徑範例：

只要路由名稱中有 "a"，都與這個路由路徑相符。

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

<h2 id="route-handlers">路由處理程式</h2>

您可以提供其行為類似[中介軟體](/{{ page.lang }}/guide/using-middleware.html)的多個回呼函數，以處理要求。唯一的例外情況是這些回呼可能會呼叫
`next('route')`，來略過其餘的路由回呼。如果沒有理由繼續處理現行路由，您可以使用這項機制，在路由中強制施行前置條件，然後將控制權傳遞給後續的路由。

路由處理程式的形式可以是一個函數、函數陣列，或上述兩種的組合，如下列範例所示。

單一回呼函數可以處理路由。例如：


```js
app.get('/example/a', (req, res) => {
  res.send('Hello from A!')
})
```

多個回呼函數可以處理路由（請確定您有指定 `next` 物件）。例如：


```js
app.get('/example/b', (req, res, next) => {
  console.log('the response will be sent by the next function ...')
  next()
}, (req, res) => {
  res.send('Hello from B!')
})
```
回呼函數陣列可以處理路由。例如：


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

獨立函數與函數陣列的組合可以處理路由。例如：


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

在下表中，回應物件 (`res`) 中的方法可以傳送回應給用戶端，並終止要求/回應循環。如果路由處理程式都沒有呼叫這些方法，用戶端要求將會停擺。

| 方法               | 說明
|----------------------|--------------------------------------
| [res.download()](/{{ page.lang }}/4x/api.html#res.download)   | 提示您提供要下載的檔案。
| [res.end()](/{{ page.lang }}/4x/api.html#res.end)        | 結束回應程序。
| [res.json()](/{{ page.lang }}/4x/api.html#res.json)       | 傳送 JSON 回應。
| [res.jsonp()](/{{ page.lang }}/4x/api.html#res.jsonp)      | 傳送 JSON 回應，並支援 JSONP。
| [res.redirect()](/{{ page.lang }}/4x/api.html#res.redirect)   | 將要求重新導向。
| [res.render()](/{{ page.lang }}/4x/api.html#res.render)     | 呈現視圖範本。
| [res.send()](/{{ page.lang }}/4x/api.html#res.send)       | 傳送各種類型的回應。
| [res.sendFile()](/{{ page.lang }}/4x/api.html#res.sendFile)     | 以八位元組串流形式傳送檔案。
| [res.sendStatus()](/{{ page.lang }}/4x/api.html#res.sendStatus) | 設定回應狀態碼，並以回應內文形式傳送其字串表示法。

<h2 id="app-route">app.route()</h2>

您可以使用 `app.route()`，來為路由路徑建立可鏈接的路由處理程式。
由於是在單一位置指定路徑，建立模組路由很有用，因為它可減少冗餘和打錯字的情況。如需路由的相關資訊，請參閱 [Router() 說明文件](/{{ page.lang }}/4x/api.html#router)。

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

`express.Router` 類別用來建立可裝載的模組路由處理程式。`Router` 實例是一個完整的中介軟體與路由系統；
因此，常被稱為「迷你應用程式」。

下列範例是將路由器建立成模組、
在其中載入中介軟體函數、定義一些路由，並且將路由器模組裝載在主要應用程式中的路徑。

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
