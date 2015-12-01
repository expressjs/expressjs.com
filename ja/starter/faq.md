---
layout: page
title: Express FAQ
menu: starter
lang: ja
---

# FAQ

## アプリケーションの構造はどのようにすべきですか？

この質問に対する明確な答えはありません。アプリケーションのスケールや関係するチームに依存します。
できるだけ柔軟にするために、Expressはアプリケーションの構造についての前提は何もありません。

ルーティングや他のロジックは、あなたの望むディレクトリ構造の中で、あなたの望む沢山のファイルの中で動作します。
インスピレーションを得るために、以下の例を見るといいでしょう。

* [Route listings](https://github.com/strongloop/express/blob/4.13.1/examples/route-separation/index.js#L32-47)
* [Route map](https://github.com/strongloop/express/blob/4.13.1/examples/route-map/index.js#L52-L66)
* [MVC style controllers](https://github.com/strongloop/express/tree/master/examples/mvc)

また、これらのパターンを簡略化するサードパーティーによる拡張機能があります。

* [Resourceful routing](https://github.com/expressjs/express-resource)

## どのようにしてモデルを定義しますか？

Expressはデータベースのための道具は全くありません。
サードパーティーのNodeモジュールに任せることで、ほどんどのデータベースへの接続を実現できます。

モデルを中心としたExpressベースのフレームワークである[LoopBack](http://loopback.io)を参照してください。

## どうしたらユーザー認証ができますか？

これはExpressが進んで対処しない頑固なエリアの一つです。
あなたが使いたいと思う認証スキームを使ってください。
ユーザー名とパスワードを用いたシンプルなスキームの例は [express/examples/auth](https://github.com/strongloop/express/tree/master/examples/auth) をご覧ください。

## Expressはどのテンプレートエンジンをサポートしていますか？

Expressは`(path, locals, callback)`のシグネチャを守っているすべてのテンプレートエンジンをサポートしています。
テンプレートエンジンのインターフェースを標準化し、キャッシュするためには、[consolidate.js](https://github.com/visionmedia/consolidate.js)をご覧ください。
リストにないテンプレートエンジンでも、Expressのシグネチャをサポートすることができます。

## どのようにして404を操作できますか？

Expressでは、404はエラーによる結果ではありません。
したがって、エラーハンドルミドルウェアは404を検知しません。
404というのは単に追加の作業がない、ということがその理由です。
言い換えれば、Expressがすべてのミドルウェアを実行し、そのどれもが応答しないことが分かったということです。
404を操作するためにやらなければならないことは、404を操作するためのミドルウェアを追加するだけです。

<pre><code class="language-javascript" translate="no">
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});
</code></pre>

## エラーハンドラをどう設定するか？

エラーハンドルミドルウェアを他のミドルウェアと同じように定義します。
具体的にはシグネチャ`(err, req, res, next)`を用います。
4引数の代わりに3引数でも定義できます。

<pre><code class="language-javascript" translate="no">
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
</code></pre>

詳細な情報は[Error handling](/{{ page.lang }}/guide/error-handling.html)を参照してください。

## どうしたらHTMLをそのまま表示できますか？

そのようなことはしないでください！　HTMLを`res.render()`を使って表示する必要はありません。
表示したい特定のファイルがあるなら、`res.sendFile()`を使ってください。
もし、ディレクトリから提供したいアセットがたくさんあるなら、`express.static()`ミドルウェアを使ってください。
