---
layout: page
title: Express basic routing tutorial
menu: starter
lang: ja
---

# 基本的なルーティングチュートリアル

このチュートリアルはExpressでルーティングをするための導入です。
ルーティングはURI(またはpath)や特定のHTTPリクエストメソッド(GET, POSTなど)といったクライアントからの特定のリクエストに対して、アプリケーションがどのように応答するか決定します。

ルートは一つ以上のハンドラ関数を持っていて、ルートにマッチした時には / のハンドラ関数が実行されます。

ルートの定義は`app.METHOD(PATH, HANDLER)`と書きます。
ここでの`app`は`express`のインスタンス、`METHOD`は[HTTPリクエストメソッド](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)、`PATH`はサーバー上のパス、`HANDLER`はルーティングがマッチした時に実行される関数を示しています。

<div class="doc-box doc-notice" markdown="1">
このチュートリアルでは`express`のインスタンスが`app`という名前で作成され、サーバーが動作していることが前提となっています。
あなたがアプリの作成と開始についてよくわからない場合は[Hello world example](/{{ page.lang }}/starter/hello-world.html)を参照してください。
</div>

下記のコードはルートのいくつかの例を示しています。

<pre><code class="language-javascript" translate="no">
// respond with "Hello World!" on the homepage
app.get('/', function (req, res) {
  res.send('Hello World!');
});

// accept POST request on the homepage
app.post('/', function (req, res) {
  res.send('Got a POST request');
});

// accept PUT request at /user
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});

// accept DELETE request at /user
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});
</code></pre>

ルーティングについての詳細は[routing guide](/{{ page.lang }}/guide/routing.html)を参照してください。
