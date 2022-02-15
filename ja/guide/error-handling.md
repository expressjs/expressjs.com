---
layout: page
title: Express でのエラー処理
menu: guide
lang: ja
---

# エラー処理

_エラー処理_ は、Expressが同期的および非同期的に発生するエラーをキャッチして処理する方法です。Expressにはデフォルトのエラーハンドラが付属しているので、自分で作成する必要はありません。

## エラーのキャッチ

Expressがルート・ハンドラとミドルウェアの実行中に発生するすべてのエラーを確実にキャッチすることが重要です。

ルート・ハンドラとミドルウェア内の同期コードで発生するエラーは、余分な作業を必要としません。同期コードがエラーをスローすると、Expressはそれをキャッチして処理します。 例えば：

```js
app.get('/', (req, res) => {
  throw new Error('BROKEN') // Express will catch this on its own.
})
```

ルート・ハンドラとミドルウェアによって呼び出された非同期関数から返されたエラーについては、それらを`next()`関数に渡す必要があります。ここでExpressはそれらをキャッチして処理します。例えば：

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

シーケンス内のコールバックにデータがなく、エラーのみが発生する場合は、次のようにこのコードを単純化できます。

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

上記の例では`fs.writeFile`のコールバックとして`next`が提供されています。これはエラーの有無にかかわらず呼び出されます。エラーがなければ、2番目のハンドラが実行されます。それ以外の場合、Expressはエラーをキャッチして処理します。

ルート・ハンドラまたはミドルウェアによって呼び出された非同期コードで発生したエラーをキャッチして、Expressに渡して処理する必要があります。例えば：

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

上記の例では、`try ... catch`ブロックを使用して非同期コードのエラーを捕捉してExpressに渡しています。`try ... catch`ブロックが省略された場合、Expressは同期ハンドラ・コードの一部ではないため、エラーをキャッチしません。

Promiseを使って`try..catch`ブロックのオーバーヘッドを避けるか、Promiseを返す関数を使うとき。例えば：

```js
app.get('/', (req, res, next) => {
  Promise.resolve().then(() => {
    throw new Error('BROKEN')
  }).catch(next) // Errors will be passed to Express.
})
```

Promiseは自動的に同期エラーと拒否されたPromiseをキャッチするので、catchハンドラに最初の引数としてエラーが与えられ、最終的なcatchハンドラとして`next`を指定するだけで、Expressはエラーをキャッチします。

また、非同期コードを単純なものに減らすことで、同期エラーのキャッチに依存する一連のハンドラを使用することもできます。例えば：

```js
app.get('/', [
  function (req, res, next) {
    fs.readFile('/maybe-valid-file', 'utf8', (err, data) => {
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

上の例は`readFile`呼び出しからの簡単なステートメントをいくつか持っています。`readFile`でエラーが発生した場合、エラーをExpressに渡します。そうでなければ、チェーン内の次のハンドラで同期エラー処理の世界に素早く戻ります。次に、上記の例ではデータを処理しようとしています。これが失敗すると、同期エラーハンドラはそれをキャッチします。 この処理を`readFile`コールバックの中で行った場合、アプリケーションは終了し、Expressのエラーハンドラは実行されません。

どちらの方法を使用しても、Expressのエラーハンドラを呼び出す場合や、アプリケーションを存続させる場合は、Expressがエラーを受け取るようにする必要があります。

## デフォルトのエラー処理

Expressには、アプリケーションで発生する可能性のあるエラーを処理するビルトインエラーハンドラが付属しています。 このデフォルトのエラー処理ミドルウェア関数は、ミドルウェア関数スタックの最後に追加されます。

`next()`にエラーを渡し、カスタムエラーハンドラでそれを処理しない場合、それは組み込みのエラーハンドラによって処理されます。エラーはスタックトレースを使用してクライアントに書き込まれます。スタックトレースは本番環境には含まれていません。

<div class="doc-box doc-info" markdown="1">

プロダクションモードでアプリケーションを実行するには、環境変数`NODE_ENV`を` production`に設定します。

</div>

レスポンスの記述を開始した後でエラーを伴って`next()`を呼び出すと（例えば、クライアントへの応答をストリーミング中にエラーが発生した場合）、Expressのデフォルトエラーハンドラは接続を閉じてリクエストを失敗します。

したがって、カスタムエラーハンドラを追加するときは、ヘッダーがすでにクライアントに送信されているときに、デフォルトのExpressエラーハンドラに委任する必要があります。

```js
function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
}
```

カスタムエラー処理ミドルウェアが存在していても、コード内でエラーが2回以上発生したときに`next()`を呼び出すと、デフォルトのエラーハンドラがトリガされることに注意してください。

## エラー処理を記述する

エラー処理ミドルウェア関数は、その他のミドルウェア関数と同じ方法で定義しますが、エラー処理関数の引数が3つではなく、4つ `(err、req、res、next)` であることが例外です。次に例を示します。

```js
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

エラー処理ミドルウェアは、その他の `app.use()` およびルート呼び出しの後で最後に定義します。次に例を示します。

```js
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(methodOverride())
app.use((err, req, res, next) => {
  // logic
})
```

ミドルウェア関数の中からの応答は、HTML エラー・ページ、単純なメッセージ、または JSON ストリングなど、任意の形式にすることができます。

組織的な (および高水準フレームワークの) 目的で、通常のミドルウェア関数と同じように、複数のエラー処理のミドルウェア関数を定義できます。例えば、`XHR` を使用する要求と、使用しない要求のためのエラー・ハンドラーを定義するには、以下のコマンドを使用します。

```js
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(methodOverride())
app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)
```

この例では、汎用の `logErrors` が要求とエラーの情報を `stderr` に書き込む可能性があります。次に例を示します。

```js
function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}
```

また、この例では、`clientErrorHandler` は次のように定義されます。この場合、エラーは明示的に次のエラーに渡されます。

エラー処理関数の中で"next"を呼んで _いない_ ときは、レスポンスの記述（および終了）を行う必要があります。そうしなければ、それらのリクエストは「ハング」し、ガベージコレクションの対象になりません。

```js
function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}
```

「catch-all」`errorHandler` 関数は、次のように実装されます。

```js
function errorHandler (err, req, res, next) {
  res.status(500)
  res.render('error', { error: err })
}
```

`next()` 関数に (ストリング `'route'` を除く) 何らかを渡すと、Express は、現在のリクエストでエラーが発生したと想定して、エラーが発生していない残りのすべての処理のルーティングとミドルウェア関数をスキップします。そのエラーを何らかの方法で渡す場合は、次のセクションで説明するようにエラー処理ルートを作成する必要があります。

複数のコールバック関数を使用するルート・ハンドラーがある場合、`route` パラメーターを使用して、次のルート・ハンドラーまでスキップできます。次に例を示します。

```js
app.get('/a_route_behind_paywall',
  (req, res, next) => {
    if (!req.user.hasPaid) {
      // continue handling this request
      next('route')
    } else {
      next()
    }
  }, (req, res, next) => {
    PaidContent.find((err, doc) => {
      if (err) return next(err)
      res.json(doc)
    })
  })
```

この例では、`getPaidContent` ハンドラーはスキップされますが、`/a_route_behind_paywall` の `app` にある残りのハンドラーはすべて引き続き実行されます。

<div class="doc-box doc-info" markdown="1">

`next()` および `next(err)` の呼び出しは、現在のハンドラーが完了したことと、その状態を示します。`next(err)` は、上記のようにエラーを処理するようにセットアップされたハンドラーを除き、チェーン内の残りのハンドラーをすべてスキップします。

</div>
