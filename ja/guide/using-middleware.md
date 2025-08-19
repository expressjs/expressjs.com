---
layout: page
title: Express ミドルウェアの使用
description: Learn how to use middleware in Express.js applications, including application-level and router-level middleware, error handling, and integrating third-party middleware.
menu: guide
redirect_from: "  "
---

# ミドルウェアの使用

Express は、それ自体では最小限の機能を備えたルーティングとミドルウェアの Web フレームワークです。Express アプリケーションは基本的に一連のミドルウェア関数呼び出しです。

_Middleware_ functions are functions that have access to the [request object](/{{ page.lang }}/5x/api.html#req)  (`req`), the [response object](/{{ page.lang }}/5x/api.html#res) (`res`), and the next middleware function in the application's request-response cycle. The next middleware function is commonly denoted by a variable named `next`.

ミドルウェア関数は以下のタスクを実行できます。

- 任意のコードを実行する。
- リクエストオブジェクトとレスポンスオブジェクトを変更する。
- リクエストレスポンスサイクルを終了する。
- スタック内の次のミドルウェア関数を呼び出す。

現在のミドルウェア関数がリクエストレスポンスサイクルを終了しない場合は、`next()` を呼び出して、次のミドルウェア関数に制御を渡す必要があります。そうしないと、リクエストはハングしたままになります。 Otherwise, the request will be left hanging.

Express アプリケーションは、以下のタイプのミドルウェアを使用できます。

- [アプリケーション・レベルのミドルウェア](#middleware.application)
- [ルーター・レベルのミドルウェア](#middleware.router)
- [エラー処理ミドルウェア](#middleware.error-handling)
- [標準装備のミドルウェア](#middleware.built-in)
- [サード・パーティー・ミドルウェア](#middleware.third-party)

アプリケーション・レベルとルーター・レベルのミドルウェアは、オプションのマウント・パスを指定してロードできます。
また、一連のミドルウェア関数を一緒にロードできます。こうすると、マウント・ポイントにミドルウェア・システムのサブスタックが作成されます。
You can also load a series of middleware functions together, which creates a sub-stack of the middleware system at a mount point.

<h2 id='middleware.application'>アプリケーション・レベルのミドルウェア</h2>

Bind application-level middleware to an instance of the [app object](/{{ page.lang }}/5x/api.html#app) by using the `app.use()` and `app.METHOD()` functions, where `METHOD` is the HTTP method of the request that the middleware function handles (such as GET, PUT, or POST) in lowercase.

This example shows a middleware function with no mount path. The function is executed every time the app receives a request.

```js
const express = require('express')
const app = express()

app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})
```

This example shows a middleware function mounted on the `/user/:id` path. 次の例は、`/user/:id` パスにマウントされたミドルウェア関数を示しています。この関数は、`/user/:id` パスに対するすべてのタイプの HTTP リクエストで実行されます。

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

次の例は、`/user/:id` パスへの GET リクエストを処理するミドルウェア・サブスタックを示しています。

```js
app.get('/user/:id', (req, res, next) => {
  console.log('ID:', req.params.id)
  next()
}, (req, res, next) => {
  res.send('User Info')
})

// handler for the /user/:id path, which prints the user ID
app.get('/user/:id', (req, res, next) => {
  res.send(req.params.id)
})
```

ルーター・ミドルウェア・スタックの残りのミドルウェア関数をスキップするには、`next('route')` を呼び出して、次のルートに制御を渡します。
**注**: `next('route')` は、`app.METHOD()` 関数または `router.METHOD()` 関数を使用してロードされたミドルウェア関数でのみ機能します。

{% capture next-function %}

`next('route')` will work only in middleware functions that were loaded by using the `app.METHOD()` or `router.METHOD()` functions.

{% endcapture %}

{% include admonitions/note.html content=next-function %}

次の例は、`/user/:id` パスへの GET リクエストを処理するミドルウェア・サブスタックを示しています。

```js
app.get('/user/:id', (req, res, next) => {
  // if the user ID is 0, skip to the next route
  if (req.params.id === '0') next('route')
  // otherwise pass the control to the next middleware function in this stack
  else next()
}, (req, res, next) => {
  // send a regular response
  res.send('regular')
})

// handler for the /user/:id path, which sends a special response
app.get('/user/:id', (req, res, next) => {
  res.send('special')
})
```

Middleware can also be declared in an array for reusability.

次の例は、ルートとそのハンドラー関数 (ミドルウェア・システム) を示しています。この関数は、`/user/:id` パスへの GET リクエストを処理します。

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

<h2 id='middleware.router'>ルーター・レベルのミドルウェア</h2>

ルーター・レベルのミドルウェアは、`express.Router()` のインスタンスにバインドされる点を除き、アプリケーション・レベルのミドルウェアと同じように動作します。

```js
const router = express.Router()
```

`router.use()` 関数と `router.METHOD()` 関数を使用して、ルーター・レベルのミドルウェアをロードします。

次のコードの例では、ルーター・レベルのミドルウェアを使用して、上記のアプリケーション・レベルのミドルウェアで示されているミドルウェア・システムを複製します。

```js
const express = require('express')
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
  else next()
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

ルータのミドルウェア機能の残りの部分をスキップするには、`next('router')`を呼び出してルータインスタンスから制御を戻します。

次の例は、`/user/:id` パスへの GET リクエストを処理するミドルウェア・サブスタックを示しています。

```js
const express = require('express')
const app = express()
const router = express.Router()

// predicate the router with a check and bail out when needed
router.use((req, res, next) => {
  if (!req.headers['x-auth']) return next('router')
  next()
})

router.get('/user/:id', (req, res) => {
  res.send('hello, user!')
})

// use the router and 401 anything falling through
app.use('/admin', router, (req, res) => {
  res.sendStatus(401)
})
```

<h2 id='middleware.error-handling'>エラー処理ミドルウェア</h2>

<div class="doc-box doc-notice" markdown="1">
Error-handling middleware always takes _four_ arguments. You must provide four arguments to identify it as an error-handling middleware function. Even if you don't need to use the `next` object, you must specify it to maintain the signature. Otherwise, the `next` object will be interpreted as regular middleware and will fail to handle errors.
</div>

エラー処理ミドルウェア関数は、その他のミドルウェア関数と同じ方法で定義しますが、例外として、シグニチャーで3つではなく4つの引数 `(err、req、res、next)`) を明示的に指定します。

```js
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

エラー処理ミドルウェアについて詳しくは、[エラー処理](/{{ page.lang }}/guide/error-handling.html)を参照してください。

<h2 id='middleware.built-in'>Built-in middleware</h2>

Starting with version 4.x, Express no longer depends on [Connect](https://github.com/senchalabs/connect). バージョン 4.x 以降、Express は [Connect](https://github.com/senchalabs/connect) に依存しなくなりました。以前に Express に組み込まれていたすべてのミドルウェア関数は個別のモジュールになりました。[ミドルウェア関数のリスト](https://github.com/senchalabs/connect#middleware)を参照してください。

Expressには、次のミドルウェア機能が組み込まれています。

- [express.static](/en/5x/api.html#express.static) serves static assets such as HTML files, images, and so on.
- [express.json](/en/5x/api.html#express.json) parses incoming requests with JSON payloads. **NOTE: Available with Express 4.16.0+**
- [express.urlencoded](/en/5x/api.html#express.urlencoded) parses incoming requests with URL-encoded payloads.  **NOTE: Available with Express 4.16.0+**

<h2 id='middleware.third-party'>Third-party middleware</h2>

Express アプリケーションに機能を追加するには、サード・パーティー・ミドルウェアを使用します。

必要な機能を提供する Node.js モジュールをインストールして、アプリケーションにアプリケーション・レベルまたはルーター・レベルでロードします。

次の例は、Cookie 解析ミドルウェア関数 `cookie-parser` のインストールおよびロードを示しています。

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

Express で一般的に使用されているサード・パーティー・ミドルウェア関数の一部のリストについては、[サード・パーティー・ミドルウェア](../resources/middleware.html)を参照してください。
