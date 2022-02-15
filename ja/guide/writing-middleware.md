---
layout: page
title: Express アプリケーションで使用するミドルウェアの作成
menu: guide
lang: ja
---

# Express アプリケーションで使用するミドルウェアの作成

<h2>概説</h2>

*ミドルウェア* 関数は、[リクエストオブジェクト](/{{ page.lang }}/4x/api.html#req) (`req`)、[レスポンスオブジェクト](/{{ page.lang }}/4x/api.html#res) (`res`)、およびアプリケーションのリクエストレスポンスサイクルにおける次のミドルウェア関数に対するアクセス権限を持つ関数です。次のミドルウェア関数は一般的に、`next` という変数で表されます。

ミドルウェア関数は以下のタスクを実行できます。

* 任意のコードを実行する。
* リクエストオブジェクトとレスポンスオブジェクトを変更する。
* リクエストレスポンスサイクルを終了する。
* スタック内の次のミドルウェアを呼び出す。

現在のミドルウェア関数がリクエストレスポンスサイクルを終了しない場合は、`next()` を呼び出して、次のミドルウェア関数に制御を渡す必要があります。そうしないと、リクエストはハングしたままになります。

次の例は、ミドルウェア関数呼び出しの要素を示しています。

<table id="mw-fig">
<tr><td id="mw-fig-imgcell">
<img src="/images/express-mw.png" id="mw-fig-img" />
</td>
<td class="mw-fig-callouts">
<div class="callout" id="callout1">ミドルウェア関数が適用される HTTP メソッド。</div>

<div class="callout" id="callout2"> ミドルウェア関数が適用されるパス (ルート)。</div>

<div class="callout" id="callout3">ミドルウェア関数。</div>

<div class="callout" id="callout4">ミドルウェア関数へのコールバック引数 (慣習的に「next」と呼ばれます)。</div>

<div class="callout" id="callout5">ミドルウェア関数への HTTP <a href="../4x/api.html#res">レスポンス</a>引数 (慣習的に「res」と呼ばれます)。</div>

<div class="callout" id="callout6">ミドルウェア関数への HTTP <a href="../4x/api.html#req">リクエスト</a>引数 (慣習的に「req」と呼ばれます)。</div>
</td></tr>
</table>

<h2>例</h2>

次に、簡単な「Hello World」Expressアプリケーションの例を示します。 この記事の残りの部分では、アプリケーションに2つのミドルウェア関数、つまり単純なログメッセージを出力する`myLogger`と、HTTP要求のタイムスタンプを表示する`requestTime`という2つのミドルウェア関数を定義して追加します。

```js
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000)
```

<h3>ミドルウェア関数 myLogger</h3>

次に、"myLogger"というミドルウェア関数の簡単な例を示します。この関数は、アプリケーションへのリクエストがそれを通過するときに、単に "LOGGED"を出力します。ミドルウェア関数は、`myLogger`という名前の変数に割り当てられます。

```js
const myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}
```

<div class="doc-box doc-notice" markdown="1">

上記の `next()` の呼び出しに注意してください。この関数を呼び出すと、アプリケーション内の次のミドルウェア関数が呼び出されます。
`next()` 関数は、Node.js または Express API の一部ではありませんが、ミドルウェア関数に渡される 3 番目の引数です。`next()` 関数に任意の名前を付けることは可能ですが、慣習的に常に「next」と呼ばれます。混乱を避けるために、常にこの規則に従ってください。
</div>

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

これで、アプリケーションが `requestTime` ミドルウェア関数を使用するようになります。また、ルート・パス・ルートのコールバック関数は、ミドルウェア関数が `req` (リクエストオブジェクト) に追加するプロパティーを使用します。

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
