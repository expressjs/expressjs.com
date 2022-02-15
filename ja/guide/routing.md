---
layout: page
title: Express でのルーティング
menu: guide
lang: ja
---

# ルーティング

*ルーティング* とは、アプリケーション・エンドポイント (URI) と、クライアントリクエストに対するそれらのレスポンスの定義のことです。
ルーティングの概要については、[基本的なルーティング](/{{ page.lang }}/starter/basic-routing.html)を参照してください。

ルーティングはHTTPメソッドに対応するExpressの`app`オブジェクトのメソッドを使用して定義します。たとえば、GETリクエストを処理する`app.get()`やPOSTリクエストを処理する`app.post`があります。
完全なリストについては、[app.METHOD](/{{ page.lang }}/4x/ api.html#app.METHODを)を参照してください。
また、すべてのHTTPメソッドを制御するために[app.all()](/{{ page.lang }}/4x/api.html#app.all)を、ミドルウェアを指定するために[app.use()](/{{ page.lang }}/4x/api.html#app.use)をコールバック関数として使用することができます(詳細については、[Using middleware](/{{ page.lang }}/guide/using-middleware.html)を参照してください)。

これらのルーティングメソッドは、アプリケーションが指定されたルート（エンドポイント）とHTTPメソッドへのリクエストを受け取ったときに呼び出されるコールバック関数（ハンドラ関数とも呼ばれます）を指定します。 つまり、アプリケーションは指定されたルートとメソッドに一致するリクエストをリッスンし、一致を検出すると指定されたコールバック関数を呼び出します。

実際、ルーティングメソッドは複数のコールバック関数を引数として持つことができます。
複数のコールバック関数では、コールバック関数に引数として`next`を指定し、次のコールバックに制御を渡す関数の本体内で`next()`を呼び出すことが重要です。

次のコードは、極めて基本的なルートの例です。

```js
const express = require('express')
const app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})
```

<h2 id="route-methods">route メソッド</h2>

route メソッドは、いずれかの HTTP メソッドから派生され、`express` クラスのインスタンスに付加されます。

次のコードは、アプリケーションのルートへの GET メソッドと POST メソッドに定義されたルートの例です。

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

Expressは、すべてのHTTPリクエストメソッドに対応するメソッド（`get`、`post`など）をサポートしています。
完全なリストについては、[app.METHOD](/{{ page.lang }}/4x/api.html#app.METHOD)を参照して下さい。

_すべての_ HTTPリクエストメソッドのパスにミドルウェア関数をロードするために使用される特別なルーティングメソッド、`app.all()`があります。 たとえば、GET、POST、PUT、DELETE、または[httpモジュール](https://nodejs.org/api/http.html#http_http_methods)でサポートされているその他のHTTPリクエストメソッドを使用するかどうかにかかわらず、"/secret"ルートへのリクエストに対して次のハンドラが実行されます。

```js
app.all('/secret', (req, res, next) => {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
})
```

<h2 id="route-paths">ルート・パス</h2>

ルート・パスは、リクエストメソッドとの組み合わせにより、リクエストを実行できるエンドポイントを定義します。ルート・パスは、ストリング、ストリング・パターン、または正規表現にすることができます。

文字`？`、`+`、`*`、`()`は正規表現の部分集合です。 ハイフン（`-`）とドット（`.`）は、文字列ベースのパスによって文字通り解釈されます。

パス文字列でドル文字（`$`）を使用する必要がある場合は、`([`と`])`の中にエスケープして囲みます。たとえば、"/data/$book"でのリクエストのパス文字列は"`/data /([\$])book`"となります。

<div class="doc-box doc-info" markdown="1">
Express は、ルート・パスのマッチングに [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) を使用します。ルート・パスの定義におけるすべての可能性については、path-to-regexp 資料を参照してください。[Express Route Tester](http://forbeslindesay.github.io/express-route-tester/) は、パターン・マッチングをサポートしていませんが、基本的な Express ルートをテストするための便利なツールです。
</div>

<div class="doc-box doc-warn" markdown="1">
クエリ文字列は、ルート・パスの一部ではありません。
</div>

次に、ストリングに基づくルート・パスの例を示します。

このルート・パスは、リクエストをルートのルート `/` にマッチングします。

```js
app.get('/', (req, res) => {
  res.send('root')
})
```

このルート・パスは、リクエストを `/about` にマッチングします。

```js
app.get('/about', (req, res) => {
  res.send('about')
})
```

このルート・パスは、リクエストを `/random.text` にマッチングします。

```js
app.get('/random.text', (req, res) => {
  res.send('random.text')
})
```

次に、ストリング・パターンに基づくルート・パスの例を示します。

このルート・パスは、`acd` および `abcd` をマッチングします。

```js
app.get('/ab?cd', (req, res) => {
  res.send('ab?cd')
})
```

このルート・パスは、`abcd`、`abbcd`、`abbbcd` などをマッチングします。

```js
app.get('/ab+cd', (req, res) => {
  res.send('ab+cd')
})
```

このルート・パスは、`abcd`、`abxcd`、`abRABDOMcd`、`ab123cd` などをマッチングします。

```js
app.get('/ab*cd', (req, res) => {
  res.send('ab*cd')
})
```

このルート・パスは、`/abe` および `/abcde` をマッチングします。

```js
app.get('/ab(cd)?e', (req, res) => {
  res.send('ab(cd)?e')
})
```

次に、正規表現に基づくルート・パスの例を示します。

このルート・パスは、ルート名に「a」が含まれるすべてのものをマッチングします。

```js
app.get(/a/, (req, res) => {
  res.send('/a/')
})
```

このルート・パスは、`butterfly` および `dragonfly` をマッチングしますが、`butterflyman`、`dragonfly man` などはマッチングしません。

```js
app.get(/.*fly$/, (req, res) => {
  res.send('/.*fly$/')
})
```

<h3 id="route-parameters">ルート・パラメータ</h3>

ルート・パラメータは、URL内の指定された値を取得するために使用されるURLセグメントのことを言います。捕捉された値は`req.params`オブジェクトの中で、パスに指定されたルート・パラメータの名前をそれぞれのキーとして設定されます。

```
ルート・パス: /users/:userId/books/:bookId
リクエストURL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
```

ルート・パラメータを使用してルートを定義するには、以下に示すようにルートのパスにルート・パラメータを指定するだけです。

```js
app.get('/users/:userId/books/:bookId', (req, res) => {
  res.send(req.params)
})
```

<div class="doc-box doc-notice" markdown="1">
ルート・パラメータの名前は、「単語文字」([A-Za-z0-9_])で構成する必要があります。
</div>

ハイフン（`-`）とドット（`.`）は文字通りに解釈されるので、有用な目的のためにルート・パラメータとともに使用することができます。

```
ルート・パス: /flights/:from-:to
リクエストURL: http://localhost:3000/flights/LAX-SFO
req.params: { "from": "LAX", "to": "SFO" }
```

```
ルート・パス: /plantae/:genus.:species
リクエストURL: http://localhost:3000/plantae/Prunus.persica
req.params: { "genus": "Prunus", "species": "persica" }
```

ルート・パラメータで一致させることができる正確な文字列をより詳細に制御するために、括弧（`()`）内で正規表現を追加できます：

```
ルート・パス: /user/:userId(\d+)
リクエストURL: http://localhost:3000/user/42
req.params: {"userId": "42"}
```

<div class="doc-box doc-warn" markdown="1">
正規表現は通常リテラル文字列の一部なので、<code>\\d+</code>のように<code>\</code>文字をバックスラッシュでエスケープしてください。
</div>

<div class="doc-box doc-warn" markdown="1">
Express 4.xでは、<a href="https://github.com/expressjs/express/issues/2495">正規表現の<code>*</code>文字は通常の方法で解釈されません。</a>回避策として、<code>*</code>の代わりに<code>{0,}</code>を使用してください。これは、Express 5で修正される可能性があります。
</div>

<h2 id="route-handlers">ルート・ハンドラー</h2>

リクエストを処理するために、[ミドルウェア](/{{ page.lang }}/guide/using-middleware.html)のように動作する複数のコールバック関数を指定できます。唯一の例外は、これらのコールバックが `next('route')` を呼び出して、残りのルート・コールバックをバイパスすることです。このメカニズムを使用して、ルートに事前条件を適用し、現在のルートで続行する理由がない場合に後続のルートに制御を渡すことができます。

次の例に示すように、ルート・ハンドラーの形式は、関数、関数の配列、または両方の組み合わせにすることができます。

単一のコールバック関数で 1 つのルートを処理できます。次に例を示します。

```js
app.get('/example/a', (req, res) => {
  res.send('Hello from A!')
})
```

複数のコールバック関数で1つのルートを処理できます (必ず、`next` オブジェクトを指定してください)。次に例を示します。

```js
app.get('/example/b', (req, res, next) => {
  console.log('the response will be sent by the next function ...')
  next()
}, (req, res) => {
  res.send('Hello from B!')
})
```

コールバック関数の配列で 1 つのルートを処理できます。次に例を示します。

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

独立した関数と、関数の配列の組み合わせで1つのルートを処理できます。次に例を示します。

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

<h2 id="response-methods">レスポンスメソッド</h2>

次の表に示すレスポンスオブジェクト (`res`) のメソッドは、レスポンスをクライアントに送信して、リクエストとレスポンスのサイクルを終了することができます。これらのメソッドのいずれもルート・ハンドラーから呼び出されない場合、クライアントリクエストはハングしたままになります。

| メソッド               | 説明
|----------------------|--------------------------------------
| [res.download()](/{{ page.lang }}/4x/api.html#res.download)   | ファイルのダウンロードのプロンプトを出します。
| [res.end()](/{{ page.lang }}/4x/api.html#res.end)        | レスポンスプロセスを終了します。
| [res.json()](/{{ page.lang }}/4x/api.html#res.json)       | JSON レスポンスを送信します。
| [res.jsonp()](/{{ page.lang }}/4x/api.html#res.jsonp)      | JSONP をサポートする JSON レスポンスを送信します。
| [res.redirect()](/{{ page.lang }}/4x/api.html#res.redirect)   | リクエストをリダイレクトします。
| [res.render()](/{{ page.lang }}/4x/api.html#res.render)     | ビュー・テンプレートをレンダリングします。
| [res.send()](/{{ page.lang }}/4x/api.html#res.send)       | さまざまなタイプのレスポンスを送信します。
| [res.sendFile](/{{ page.lang }}/4x/api.html#res.sendFile)     | ファイルをオクテット・ストリームとして送信します。
| [res.sendStatus()](/{{ page.lang }}/4x/api.html#res.sendStatus) | レスポンスのステータスコードを設定して、そのストリング表現をレスポンス本文として送信します。

<h2 id="app-route">app.route()</h2>

`app.route()` を使用して、ルート・パスの連結可能なルート・ハンドラーを作成できます。
パスは単一の場所で指定されるため、モジュール式のルートを作成すると、便利であるほか、冗長性とタイプミスを減らすことができます。ルートについて詳しくは、[Router() 資料](/{{ page.lang }}/4x/api.html#router)を参照してください。

次に、`app.route()` を使用して定義された、チェーニングされたルート・ハンドラーの例を示します。

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

モジュール式のマウント可能なルート・ハンドラーを作成するには、`express.Router` クラスを使用します。`Router` インスタンスは、完全なミドルウェアおよびルーティング・システムです。そのため、よく「ミニアプリケーション」と呼ばれます。

次の例では、ルーターをモジュールとして作成し、その中にミドルウェア関数をロードして、いくつかのルートを定義し、ルート・モジュールをメインアプリケーションのパスにマウントします。

アプリケーション・ディレクトリーに次の内容で `birds.js` というルーター・ファイルを作成します。

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

次に、ルーター・モジュールをアプリケーションにロードします。

```js
const birds = require('./birds')
// ...
app.use('/birds', birds)
```

これで、アプリケーションは、`/birds` および `/birds/about` に対するリクエストを処理するほか、ルートに固有の `timeLog` ミドルウェア関数を呼び出すことができるようになります。
