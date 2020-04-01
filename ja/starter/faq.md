---
layout: page
title: Express に関する FAQ
menu: starter
lang: ja
---

# FAQ

## どのようにしてアプリケーションを構成するのですか?

この質問に対する決定的な答えはありません。ご使用のアプリケーションや関与するチームの規模によって答えは異なります。可能な限り柔軟であるために、Express には、構造に関する前提がありません。

ルートやその他のアプリケーション固有のロジックは、必要な数だけのファイルや、任意のディレクトリー構造に存在できます。参考のために、以下の例を参照してください。

* [ルートのリスト](https://github.com/expressjs/express/blob/4.13.1/examples/route-separation/index.js#L32-47)
* [ルートのマップ](https://github.com/expressjs/express/blob/4.13.1/examples/route-map/index.js#L52-L66)
* [MVC スタイルのコントローラー](https://github.com/expressjs/express/tree/master/examples/mvc)

また、これらのパターンを簡素化する、サード・パーティー製の Express 拡張版があります。

* [Resourceful ルーティング](https://github.com/expressjs/express-resource)

## どのようにしてモデルを定義するのですか?

Express には、データベースの概念がありません。この概念はサード・パーティーの Node モジュールに任せられているため、ほとんどのデータベースとやりとりできます。

モデルに関する Express ベースのフレームワークについては、[LoopBack](http://loopback.io) を参照してください。

## どのようにしてユーザーを認証するのですか?

認証は、Express が足を踏み入れていないもう 1 つの分野です。任意の認証スキームを使用できます。
単純なユーザー名/パスワードのスキームについては、[この例](https://github.com/expressjs/express/tree/master/examples/auth)を参照してください。


## Express はどのテンプレート・エンジンをサポートしているのですか?

Express は、`(パス、ロケール、コールバック)` シグニチャーに準拠するすべてのテンプレート・エンジンをサポートします。
テンプレート・エンジンのインターフェースとキャッシングを正規化するには、[consolidate.js](https://github.com/visionmedia/consolidate.js) プロジェクトでサポートを参照してください。リストされていないテンプレート・エンジンでも Express シグニチャーをサポートしている可能性があります。

## どのようにして 404 応答に対応するのですか?

Express では、404 応答はエラーの結果ではありません。そのため、エラー・ハンドラー・ミドルウェアはそれらをキャプチャーしません。このように動作するのは、404 応答は単に追加の処理が存在しないことを示しているためです。つまり、Express は、すべてのミドルウェア関数とルートを実行して、そのいずれも応答しなかったことを検出したということです。404 応答に対応するには、スタックの最下部 (他のすべての関数の下) にミドルウェア関数を追加するだけですみます。

<pre>
<code class="language-javascript" translate="no">
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});
</code>
</pre>

## どのようにしてエラー・ハンドラーをセットアップするのですか?

エラー処理ミドルウェアの定義方法は、他のミドルウェアと同じですが、引数の数が 3 つではなく 4 つである点が異なります。具体的には、シグニチャー `(err、req、res、next)` です。

<pre>
<code class="language-javascript" translate="no">
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
</code>
</pre>

詳細については、[エラー処理](/{{ page.lang }}/guide/error-handling.html)を参照してください。

## どのようにしてプレーン HTML をレンダリングするのですか?

レンダリングしません。`res.render()` 関数で HTML を「レンダリング」する必要はありません。
特定のファイルがある場合は、`res.sendFile()` 関数を使用します。
ディレクトリーから多数の資産を提供する場合は、`express.static()` ミドルウェア関数を使用します。
