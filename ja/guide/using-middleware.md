---
layout: page
title: Express ミドルウェアの使用
menu: guide
lang: ja
---

# ミドルウェアの使用

Express は、それ自体では最小限の機能を備えたルーティングとミドルウェアの Web フレームワークです。Express アプリケーションは基本的に一連のミドルウェア関数呼び出しです。

*ミドルウェア* 関数は、[requestオブジェクト](/{{ page.lang }}/4x/api.html#req) (`req`)、[responseオブジェクト](/{{ page.lang }}/4x/api.html#res) (`res`)、およびアプリケーションのリクエストレスポンスサイクルにおける次のミドルウェア関数に対するアクセス権限を持つ関数です。次のミドルウェア関数は一般的に、`next` という変数で表されます。

ミドルウェア関数は以下のタスクを実行できます。

* 任意のコードを実行する。
* リクエストオブジェクトとレスポンスオブジェクトを変更する。
* リクエストレスポンスサイクルを終了する。
* スタック内の次のミドルウェア関数を呼び出す。

現在のミドルウェア関数がリクエストレスポンスサイクルを終了しない場合は、`next()` を呼び出して、次のミドルウェア関数に制御を渡す必要があります。そうしないと、リクエストはハングしたままになります。

Express アプリケーションは、以下のタイプのミドルウェアを使用できます。

 - [アプリケーション・レベルのミドルウェア](#middleware.application)
 - [ルーター・レベルのミドルウェア](#middleware.router)
 - [エラー処理ミドルウェア](#middleware.error-handling)
 - [標準装備のミドルウェア](#middleware.built-in)
 - [サード・パーティー・ミドルウェア](#middleware.third-party)

アプリケーション・レベルとルーター・レベルのミドルウェアは、オプションのマウント・パスを指定してロードできます。
また、一連のミドルウェア関数を一緒にロードできます。こうすると、マウント・ポイントにミドルウェア・システムのサブスタックが作成されます。

<h2 id='middleware.application'>アプリケーション・レベルのミドルウェア</h2>

`app.use()` 関数と `app.METHOD()` 関数を使用して、アプリケーション・レベルのミドルウェアを [appオブジェクト](/{{ page.lang }}/4x/api.html#app) のインスタンスにバインドします。ここで、`METHOD` は、ミドルウェア関数が小文字で処理するリクエスト (GET、PUT、POST など) の HTTP メソッドです。

次の例は、マウント・パスを指定しないミドルウェア関数を示しています。この関数は、アプリケーションがリクエストを受け取るたびに実行されます。

```js
const app = express()

app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})
```

次の例は、`/user/:id` パスにマウントされたミドルウェア関数を示しています。この関数は、`/user/:id` パスに対するすべてのタイプの HTTP リクエストで実行されます。

```js
app.use('/user/:id', (req, res, next) => {
  console.log('Request Type:', req.method)
  next()
})
```

次の例は、ルートとそのハンドラー関数 (ミドルウェア・システム) を示しています。この関数は、`/user/:id` パスへの GET リクエストを処理します。

```js
app.get('/user/:id', (req, res, next) => {
  res.send('USER')
})
```

次に、マウント・パスを指定して、一連のミドルウェア関数をマウント・ポイントにロードする例を示します。
`/user/:id` パスへのすべてのタイプの HTTP リクエストに関するリクエスト情報を出力するミドルウェア・サブスタックを示しています。

```js
app.use('/user/:id', (req, res, next) => {
  console.log('Request URL:', req.originalUrl)
  next()
}, (req, res, next) => {
  console.log('Request Type:', req.method)
  next()
})
```

ルート・ハンドラーを使用すると、パスに複数のルートを定義できます。下記の例では、`/user/:id` パスへの GET リクエストに 2 つのルートを定義しています。2 番目のルートは、問題を発生させるものではありませんが、最初のルートがリクエストレスポンスサイクルを終了するため、呼び出されることはありません。

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
  res.end(req.params.id)
})
```

ルーター・ミドルウェア・スタックの残りのミドルウェア関数をスキップするには、`next('route')` を呼び出して、次のルートに制御を渡します。
**注**: `next('route')` は、`app.METHOD()` 関数または `router.METHOD()` 関数を使用してロードされたミドルウェア関数でのみ機能します。

次の例は、`/user/:id` パスへの GET リクエストを処理するミドルウェア・サブスタックを示しています。

```js
app.get('/user/:id', (req, res, next) => {
  // if the user ID is 0, skip to the next route
  if (Number(req.params.id) === 0) next('route')
  // otherwise pass the control to the next middleware function in this stack
  else next()
}, (req, res, next) => {
  // render a regular page
  res.render('regular')
})

// handler for the /user/:id path, which renders a special page
app.get('/user/:id', (req, res, next) => {
  res.render('special')
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
  if (Number(req.params.id) === 0) next('route')
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

この例は、`/user/:id`パスに対するGET要求を処理するミドルウェアサブスタックを示しています。

```js
const app = express()
const router = express.Router()

// predicate the router with a check and bail out when needed
router.use((req, res, next) => {
  if (!req.headers['x-auth']) return next('router')
  next()
})

router.get('/', (req, res) => {
  res.send('hello, user!')
})

// use the router and 401 anything falling through
app.use('/admin', router, (req, res) => {
  res.sendStatus(401)
})
```

<h2 id='middleware.error-handling'>エラー処理ミドルウェア</h2>

<div class="doc-box doc-notice" markdown="1">

エラー処理ミドルウェアは常に *4つ* の引数を使用します。エラー処理ミドルウェア関数として識別されるように 4 つの引数を指定する必要があります。`next` オブジェクトは、使用する必要がない場合でも、シグニチャーを維持するために指定する必要があります。指定しないと、`next` オブジェクトは通常のミドルウェアとして解釈され、エラーを処理できなくなります。
</div>

エラー処理ミドルウェア関数は、その他のミドルウェア関数と同じ方法で定義しますが、例外として、シグニチャーで3つではなく4つの引数 `(err、req、res、next)`) を明示的に指定します。

```js
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

エラー処理ミドルウェアについて詳しくは、[エラー処理](/{{ page.lang }}/guide/error-handling.html)を参照してください。

<h2 id='middleware.built-in'>標準装備のミドルウェア</h2>

バージョン 4.x 以降、Express は [Connect](https://github.com/senchalabs/connect) に依存しなくなりました。以前に Express に組み込まれていたすべてのミドルウェア関数は個別のモジュールになりました。[ミドルウェア関数のリスト](https://github.com/senchalabs/connect#middleware)を参照してください。

Expressには、次のミドルウェア機能が組み込まれています。

- [express.static](/en/4x/api.html#express.static) は、HTMLファイルや画像などの静的リソースを提供します
- [express.json](/en/4x/api.html#express.json) はJSONペイロードで受信したリクエストを解析します。**注：Express 4.16.0以降で利用可能**
- [express.urlencoded](/en/4x/api.html#express.urlencoded) は、URLエンコードされたペイロードで受信したリクエストを解析します。**注：Express 4.16.0以降で利用可能**

<h2 id='middleware.third-party'>サード・パーティー・ミドルウェア</h2>

Express アプリケーションに機能を追加するには、サード・パーティー・ミドルウェアを使用します。

必要な機能を提供する Node.js モジュールをインストールして、アプリケーションにアプリケーション・レベルまたはルーター・レベルでロードします。

次の例は、Cookie 解析ミドルウェア関数 `cookie-parser` のインストールおよびロードを示しています。

```console
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
