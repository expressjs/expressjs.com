---
layout: page
title: Express の基本的なルーティング
menu: starter
lang: ja
---

# 基本的なルーティング

*ルーティング* とは、アプリケーションが特定のエンドポイントに対するクライアント要求に応答する方法として、URI (またはパス) と特定の HTTP 要求メソッド (GET、POST など) を決定することです。

各ルートには、1 つ以上のハンドラー関数があり、それらはルートが一致したときに実行されます。

ルート定義では、次の構造を使用します。
<pre>
<code class="language-javascript" translate="no">
app.METHOD(PATH, HANDLER)
</code>
</pre>

各部分の意味は次のとおりです。

- `app` は、`express` のインスタンスです。
- `METHOD` は、[HTTP 要求メソッド](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) です。
- `PATH` は、サーバー上のパスです。
- `HANDLER` は、ルートが一致したときに実行される関数です。

<div class="doc-box doc-notice" markdown="1">
このチュートリアルでは、`app` という名前の `express` のインスタンスが作成されていて、サーバーが稼働中であることを想定しています。アプリケーションの作成と開始に慣れていない場合は、[Hello World の例](/{{ page.lang }}/starter/hello-world.html) を参照してください。
</div>

以下の例は、単純なルートの定義を示しています。

ホーム・ページで `Hello World!` と応答します。

<pre>
<code class="language-javascript" translate="no">
app.get('/', function (req, res) {
  res.send('Hello World!');
});
</code>
</pre>

アプリケーションのホーム・ページであるルートのルート (`/`) で POST 要求に応答します。

<pre>
<code class="language-javascript" translate="no">
app.post('/', function (req, res) {
  res.send('Got a POST request');
});
</code>
</pre>

`/user` ルートに対する PUT 要求に応答します。

<pre>
<code class="language-javascript" translate="no">
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});
</code>
</pre>

`/user` ルートに対する DELETE 要求に応答します。

<pre>
<code class="language-javascript" translate="no">
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});
</code>
</pre>

ルーティングについて詳しくは、[ルーティング・ガイド](/{{ page.lang }}/guide/routing.html)を参照してください。
