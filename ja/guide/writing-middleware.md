---
layout: page
title: Express アプリケーションで使用するミドルウェアの作成
description: Learn how to write custom middleware functions for Express.js applications, including examples and best practices for enhancing request and response handling.
menu: guide
order: 2
redirect_from: "  "
---

# Express アプリケーションで使用するミドルウェアの作成

<h2>概説</h2>

_ミドルウェア_ 関数は、[リクエストオブジェクト](/{{ page.lang }}/4x/api.html#req) (`req`)、[レスポンスオブジェクト](/{{ page.lang }}/4x/api.html#res) (`res`)、およびアプリケーションのリクエストレスポンスサイクルにおける次のミドルウェア関数に対するアクセス権限を持つ関数です。次のミドルウェア関数は一般的に、`next` という変数で表されます。 The `next` function is a function in the Express router which, when invoked, executes the middleware succeeding the current middleware.

ミドルウェア関数は以下のタスクを実行できます。

- 任意のコードを実行する。
- リクエストオブジェクトとレスポンスオブジェクトを変更する。
- リクエストレスポンスサイクルを終了する。
- スタック内の次のミドルウェアを呼び出す。

現在のミドルウェア関数がリクエストレスポンスサイクルを終了しない場合は、`next()` を呼び出して、次のミドルウェア関数に制御を渡す必要があります。そうしないと、リクエストはハングしたままになります。 Otherwise, the request will be left hanging.

次の例は、ミドルウェア関数呼び出しの要素を示しています。

<div class="table-scroller">
<table id="mw-fig">
<tbody><tr><td id="mw-fig-imgcell">
<img src="/images/express-mw.png" alt="Elements of a middleware function call" id="mw-fig-img" />
</td>
<td class="mw-fig-callouts">
<div class="callout" id="callout1">ミドルウェア関数が適用される HTTP メソッド。</div></tbody>

<div class="callout" id="callout2"> ミドルウェア関数が適用されるパス (ルート)。</div>

<div class="callout" id="callout3">ミドルウェア関数。</div>

<div class="callout" id="callout4">ミドルウェア関数へのコールバック引数 (慣習的に「next」と呼ばれます)。</div>

<div class="callout" id="callout5">ミドルウェア関数への HTTP <a href="../4x/api.html#res">レスポンス</a>引数 (慣習的に「res」と呼ばれます)。</div>

<div class="callout" id="callout6">ミドルウェア関数への HTTP <a href="../4x/api.html#req">リクエスト</a>引数 (慣習的に「req」と呼ばれます)。</div>
</td></tr>
</table>
</div>

Starting with Express 5, middleware functions that return a Promise will call `next(value)` when they reject or throw an error. `next` will be called with either the rejected value or the thrown Error.

<h2>例</h2>

Here is an example of a simple "Hello World" Express application.
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

<h3>ミドルウェア関数 myLogger</h3>
Here is a simple example of a middleware function called "myLogger". This function just prints "LOGGED" when a request to the app passes through it. 次に、"myLogger"というミドルウェア関数の簡単な例を示します。この関数は、アプリケーションへのリクエストがそれを通過するときに、単に "LOGGED"を出力します。ミドルウェア関数は、`myLogger`という名前の変数に割り当てられます。

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
ミドルウェア関数をロードするには、ミドルウェア関数を指定して `app.use()` を呼び出します。
例えば、次のコードは、ルート・パス (/) へのルートの前に `myLogger` ミドルウェア関数をロードします。

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

アプリケーションは、リクエストを受け取るたびに、端末にメッセージ「LOGGED」を出力します。

ミドルウェアのロードの順序は重要です。最初にロードされたミドルウェア関数が常に最初に実行されます。

`myLogger` がルート・パスの後にロードされた場合、リクエストが到達することはなく、アプリケーションは「LOGGED」を出力しません。ルート・パスのルート・ハンドラーがリクエストレスポンスサイクルを終了するためです。

ミドルウェア関数 `myLogger` は、単にメッセージを出力してから、`next()` 関数を呼び出して、スタック内の次のミドルウェア関数へのリクエストに移ります。

<h3>ミドルウェア関数 requestTime</h3>

次に、「requestTime」というミドルウェア関数を作成し、`requestTime`というプロパティとしてリクエストオブジェクトに追加します。

```js
const requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}
```

The app now uses the `requestTime` middleware function. これで、アプリケーションが `requestTime` ミドルウェア関数を使用するようになります。また、ルート・パス・ルートのコールバック関数は、ミドルウェア関数が `req` (リクエストオブジェクト) に追加するプロパティーを使用します。

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

アプリケーションのルートにリクエストすると、アプリケーションは、リクエストのタイムスタンプをブラウザーに表示します。

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

リクエストオブジェクト、レスポンスオブジェクト、スタック内の次のミドルウェア関数、および Node.js API を利用できるため、ミドルウェア関数が持つ可能性は無限です。

Express ミドルウェアについて詳しくは、[Express ミドルウェアの使用](/{{ page.lang }}/guide/using-middleware.html)を参照してください。

<h2>設定可能なミドルウェア</h2>

ミドルウェアを設定可能にする必要がある場合は、optionsオブジェクトまたはその他のパラメータを受け入れる関数をエクスポートし、入力パラメータに基づいてミドルウェアの実装を返します。

File: `my-middleware.js`

```js
module.exports = function (options) {
  return function (req, res, next) {
    // Implement the middleware function based on the options object
    next()
  }
}
```

ミドルウェアは以下のように使用できるようになりました。

```js
const mw = require('./my-middleware.js')

app.use(mw({ option1: '1', option2: '2' }))
```

設定可能なミドルウェアの例については、[cookie-session](https://github.com/expressjs/cookie-session)および[compression](https://github.com/expressjs/compression)を参照してください。
