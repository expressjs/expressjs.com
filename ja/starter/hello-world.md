---
layout: page
title: Express "Hello World" example
menu: starter
lang: ja
---

# Hello world

まず、[インストール](http://expressjs.com/ja/starter/installing.html)の指示通りにできているか確認してください。

それでは、非常に基本的なExpressのアプリを作っていきましょう。

<div class="doc-box doc-info" markdown="1">
NOTE: これは、基本的に、あなたが作成できる最も簡単なExpressアプリです。
あなたが欲しいのがシングルファイルアプリケーションでないなら、[Express generator](/starter/generator.html)を使ってください。
Express generatorは多数のJavaScriptファイルや、Jadeテンプレート、サブディレクトリなどの様々な目的を用いるフルアプリケーションのための足場を生成します。
</div>

`myapp`ディレクトリで`app.js`という名前のファイルを作成し、下記のコードを追加します。

<pre><code class="language-javascript" translate="no">
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
</code></pre>

アプリはサーバーを立ち上げて3000番ポートで接続を待機します。このアプリは、ルートURL(`/`)または _route_ へのリクエストに対して"Hello World!"と応答します。その他のすべてのパスには **404 Not Found** を返します。

<div class="doc-box doc-notice" markdown="1">
`req` (request)や`res` (response)は厳格にNodeが与えるオブジェクトと同じです。よって、`req.pipe()`や`req.on('data', callback)`を呼び出すことができ、その他もExpressに関係なく呼び出すことができます。
</div>

下記のコマンドでアプリを実行してください。

<pre><code class="language-sh" translate="no">
$ node app.js
</code></pre>

ブラウザで[http://localhost:3000/](http://localhost:3000/)を読み込むと、応答が確認できます。
