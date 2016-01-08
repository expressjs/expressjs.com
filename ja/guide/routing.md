---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Express でのルーティング
menu: guide
lang: ja
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

# ルーティング

*ルーティング* とは、アプリケーション・エンドポイント (URI) と、クライアント要求に対するそれらの応答の定義のことです。
ルーティングの概要については、[基本的なルーティング](/{{ page.lang }}/starter/basic-routing.html)を参照してください。

次のコードは、極めて基本的なルートの例です。

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});
</code>
</pre>

<h2 id="route-methods">route メソッド</h2>

route メソッドは、いずれかの HTTP メソッドから派生され、`express` クラスのインスタンスに付加されます。

次のコードは、アプリケーションのルートへの GET メソッドと POST メソッドに定義されたルートの例です。

<pre>
<code class="language-javascript" translate="no">
// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage');
});

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage');
});
</code>
</pre>

Express は、HTTP メソッドに対応する以下のルーティング・メソッドをサポートします。`get`、`post`、`put`、`head`、`delete`、`options`、`trace`、`copy`、`lock`、`mkcol`、`move`、`purge`、`propfind`、`proppatch`、`unlock`、`report`、`mkactivity`、`checkout`、`merge`、`m-search`、`notify`、`subscribe`、`unsubscribe`、`patch`、`search`、および `connect`。

<div class="doc-box doc-info" markdown="1">
無効な JavaScript 変数名に変換されるメソッドをルーティングするには、大括弧の表記を使用します。例えば、`app['m-search']('/', function ...` を使用します。
</div>

どの HTTP メソッドからも派生されない `app.all()` という特殊なルーティング・メソッドがあります。このメソッドは、すべての要求メソッドのパスにミドルウェア関数をロードするために使用されます。

次の例では、[http モジュール](https://nodejs.org/api/http.html#http_http_methods)でサポートされている GET、POST、PUT、DELETE、またはその他の HTTP 要求メソッドのいずれを使用している場合でも、ハンドラーは「/secret」への要求に対して実行されます。

<pre>
<code class="language-javascript" translate="no">
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});
</code>
</pre>

<h2 id="route-paths">ルート・パス</h2>

ルート・パスは、要求メソッドとの組み合わせにより、要求を実行できるエンドポイントを定義します。ルート・パスは、ストリング、ストリング・パターン、または正規表現にすることができます。

<div class="doc-box doc-info" markdown="1">
Express は、ルート・パスのマッチングに [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) を使用します。ルート・パスの定義におけるすべての可能性については、path-to-regexp 資料を参照してください。[Express Route Tester](http://forbeslindesay.github.io/express-route-tester/) は、パターン・マッチングをサポートしていませんが、基本的な Express ルートをテストするための便利なツールです。
</div>

<div class="doc-box doc-warn" markdown="1">
照会ストリングは、ルート・パスの一部ではありません。
</div>

次に、ストリングに基づくルート・パスの例を示します。

このルート・パスは、要求をルートのルート `/` にマッチングします。

<pre>
<code class="language-javascript" translate="no">
app.get('/', function (req, res) {
  res.send('root');
});
</code>
</pre>

このルート・パスは、要求を `/about` にマッチングします。

<pre>
<code class="language-javascript" translate="no">
app.get('/about', function (req, res) {
  res.send('about');
});
</code>
</pre>

このルート・パスは、要求を `/random.text` にマッチングします。

<pre>
<code class="language-javascript" translate="no">
app.get('/random.text', function (req, res) {
  res.send('random.text');
});
</code>
</pre>

次に、ストリング・パターンに基づくルート・パスの例を示します。

このルート・パスは、`acd` および `abcd` をマッチングします。

<pre>
<code class="language-javascript" translate="no">
app.get('/ab?cd', function(req, res) {
  res.send('ab?cd');
});
</code>
</pre>

このルート・パスは、`abcd`、`abbcd`、`abbbcd` などをマッチングします。

<pre>
<code class="language-javascript" translate="no">
app.get('/ab+cd', function(req, res) {
  res.send('ab+cd');
});
</code>
</pre>

このルート・パスは、`abcd`、`abxcd`、`abRABDOMcd`、`ab123cd` などをマッチングします。

<pre>
<code class="language-javascript" translate="no">
app.get('/ab*cd', function(req, res) {
  res.send('ab*cd');
});
</code>
</pre>

このルート・パスは、`/abe` および `/abcde` をマッチングします。

<pre>
<code class="language-javascript" translate="no">
app.get('/ab(cd)?e', function(req, res) {
 res.send('ab(cd)?e');
});
</code>
</pre>

<div class="doc-box doc-info" markdown="1">
文字 ?、+、*、および () は、正規表現文字のサブセットです。ハイフン (-) およびドット (.) は、ストリングに基づくパスによってそのまま解釈されます。
</div>

次に、正規表現に基づくルート・パスの例を示します。

このルート・パスは、ルート名に「a」が含まれるすべてのものをマッチングします。

<pre>
<code class="language-javascript" translate="no">
app.get(/a/, function(req, res) {
  res.send('/a/');
});
</code>
</pre>

このルート・パスは、`butterfly` および `dragonfly` をマッチングしますが、`butterflyman`、`dragonfly man` などはマッチングしません。

<pre>
<code class="language-javascript" translate="no">
app.get(/.*fly$/, function(req, res) {
  res.send('/.*fly$/');
});
</code>
</pre>

<h2 id="route-handlers">ルート・ハンドラー</h2>

要求を処理するために、[ミドルウェア](/{{ page.lang }}/guide/using-middleware.html)のように動作する複数のコールバック関数を指定できます。唯一の例外は、これらのコールバックが `next('route')` を呼び出して、残りのルート・コールバックをバイパスすることです。このメカニズムを使用して、ルートに事前条件を適用し、現在のルートで続行する理由がない場合に後続のルートに制御を渡すことができます。

次の例に示すように、ルート・ハンドラーの形式は、関数、関数の配列、または両方の組み合わせにすることができます。

単一のコールバック関数で 1 つのルートを処理できます。次に例を示します。

<pre>
<code class="language-javascript" translate="no">
app.get('/example/a', function (req, res) {
  res.send('Hello from A!');
});
</code>
</pre>

複数のコールバック関数で 1 つのルートを処理できます (必ず、`next` オブジェクトを指定してください)。次に例を示します。

<pre>
<code class="language-javascript" translate="no">
app.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from B!');
});
</code>
</pre>

コールバック関数の配列で 1 つのルートを処理できます。次に例を示します。

<pre>
<code class="language-javascript" translate="no">
var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

var cb2 = function (req, res) {
  res.send('Hello from C!');
}

app.get('/example/c', [cb0, cb1, cb2]);
</code>
</pre>

独立した関数と関数の配列の組み合わせで 1 つのルートを処理できます。次に例を示します。

<pre>
<code class="language-javascript" translate="no">
var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from D!');
});
</code>
</pre>

<h2 id="response-methods">応答メソッド</h2>

次の表に示す応答オブジェクト (`res`) のメソッドは、応答をクライアントに送信して、要求と応答のサイクルを終了することができます。これらのメソッドのいずれもルート・ハンドラーから呼び出されない場合、クライアント要求はハングしたままになります。

| メソッド               | 説明
|----------------------|--------------------------------------
| [res.download()](/{{ page.lang }}/4x/api.html#res.download)   | ファイルのダウンロードのプロンプトを出します。
| [res.end()](/{{ page.lang }}/4x/api.html#res.end)        | 応答プロセスを終了します。
| [res.json()](/{{ page.lang }}/4x/api.html#res.json)       | JSON 応答を送信します。
| [res.jsonp()](/{{ page.lang }}/4x/api.html#res.jsonp)      | JSONP をサポートする JSON 応答を送信します。
| [res.redirect()](/{{ page.lang }}/4x/api.html#res.redirect)   | 要求をリダイレクトします。
| [res.render()](/{{ page.lang }}/4x/api.html#res.render)     | ビュー・テンプレートをレンダリングします。
| [res.send()](/{{ page.lang }}/4x/api.html#res.send)       | さまざまなタイプの応答を送信します。
| [res.sendFile](/{{ page.lang }}/4x/api.html#res.sendFile)     | ファイルをオクテット・ストリームとして送信します。
| [res.sendStatus()](/{{ page.lang }}/4x/api.html#res.sendStatus) | 応答の状況コードを設定して、そのストリング表現を応答本文として送信します。

<h2 id="app-route">app.route()</h2>

`app.route()` を使用して、ルート・パスのチェーン可能なルート・ハンドラーを作成できます。
パスは単一の場所で指定されるため、モジュール式のルートを作成すると、便利であるほか、冗長性とタイプミスを減らすことができます。ルートについて詳しくは、[Router() 資料](/{{ page.lang }}/4x/api.html#router)を参照してください。

次に、`app.route()` を使用して定義された、チェーニングされたルート・ハンドラーの例を示します。

<pre>
<code class="language-javascript" translate="no">
app.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });
</code>
</pre>

<h2 id="express-router">express.Router</h2>

モジュール式のマウント可能なルート・ハンドラーを作成するには、`express.Router` クラスを使用します。`Router` インスタンスは、完全なミドルウェアおよびルーティング・システムです。そのため、よく「ミニアプリケーション」と呼ばれます。

次の例では、ルーターをモジュールとして作成し、その中にミドルウェア関数をロードして、いくつかのルートを定義し、ルート・モジュールをメインアプリケーションのパスにマウントします。

アプリケーション・ディレクトリーに次の内容で `birds.js` というルーター・ファイルを作成します。

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.send('Birds home page');
});
// define the about route
router.get('/about', function(req, res) {
  res.send('About birds');
});

module.exports = router;
</code>
</pre>

次に、ルーター・モジュールをアプリケーションにロードします。

<pre>
<code class="language-javascript" translate="no">
var birds = require('./birds');
...
app.use('/birds', birds);
</code>
</pre>

これで、アプリケーションは、`/birds` および `/birds/about` に対する要求を処理するほか、ルートに固有の `timeLog` ミドルウェア関数を呼び出すことができるようになります。
