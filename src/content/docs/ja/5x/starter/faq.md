---
title: FAQ
description: Express.jsについてよく寄せられる質問の答えを見つけましょう。その中には、アプリケーション構造、モデル、認証、テンプレートエンジン、エラー処理などのトピックが含まれます。
---

## アプリケーションを構成するにはどうすればいいですか?

この質問には決定的な答えはありません。 この質問には決定的な答えはありません。 The answer depends
on the scale of your application and the team that is involved. 可能な限り
柔軟性を持たせるために、Expressは構造的な仮定をしません。

ルートやその他のアプリケーション固有のロジックは、任意のディレクトリ構造において、
好きな数のファイルに保存することができます。 View the following
examples for inspiration: View the following
examples for inspiration:

- [Route listings](https://github.com/expressjs/express/blob/4.13.1/examples/route-separation/index.js#L32-L47)
- [Route map](https://github.com/expressjs/express/blob/4.13.1/examples/route-map/index.js#L52-L66)
- [MVC style controllers](https://github.com/expressjs/express/tree/master/examples/mvc)

また、Express 用のサードパーティの拡張機能もあり、これらのパターンのいくつかを簡素化します。

- [Resourceful routing](https://github.com/expressjs/express-resource)

## モデルを定義するにはどうすればいいですか?

Express にはデータベースという概念はありません。 このコンセプトは
サードパーティ製の Node モジュールに残されており、ほぼすべてのデータベースと
インターフェイスを使用できます。 このコンセプトは
サードパーティ製の Node モジュールに残されており、ほぼすべてのデータベースと
インターフェイスを使用できます。

モデルを中心とした Express ベースのフレームワークについては [LoopBack](http://loopback.io) を参照してください。

## どのようにユーザーを認証できますか?

Authentication is another opinionated area that Express does not
venture into. 任意の認証スキームを使用できます。
任意の認証スキームを使用できます。
単純なユーザー名/パスワードスキームについては、[この例](https://github.com/expressjs/express/tree/master/examples/auth)を参照してください。

## Expressはどのテンプレートエンジンをサポートしていますか?

Express は、\\`(path, local, callback) 署名に適合するテンプレートエンジンをサポートしています。
テンプレートエンジンインターフェイスとキャッシュを正規化するには、
[consolidate.js](https://github.com/visionmedia/consolidate.js)
プロジェクトをサポートしてください。 リストされていないテンプレートエンジンは引き続きExpress 署名をサポートする可能性があります。
テンプレートエンジンインターフェイスとキャッシュを正規化するには、
[consolidate.js](https://github.com/visionmedia/consolidate.js)
プロジェクトをサポートしてください。 リストされていないテンプレートエンジンは引き続きExpress 署名をサポートする可能性があります。

詳しくは、[Expressでテンプレートエンジンを使用する](/guide/using-template-engines)を参照してください。

## 404応答はどのように処理すればいいですか?

Expressでは404応答はエラーの結果ではないため、
エラーハンドラミドルウェアはそれらを捕捉しません。 Expressでは404応答はエラーの結果ではないため、
エラーハンドラミドルウェアはそれらを捕捉しません。 This behavior is
because a 404 response simply indicates the absence of additional work to do;
in other words, Express has executed all middleware functions and routes,
and found that none of them responded. All you need to
do is add a middleware function at the very bottom of the stack (below all other functions)
to handle a 404 response:

```js
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});
```

`express.Router()`
のインスタンスで実行時にルートを動的に追加することで、ルートはミドルウェア関数に取って代わられません。

## エラーハンドラの設定方法は?

他のミドルウェアと同じ方法でエラー処理ミドルウェア
を定義します。ただし、3つではなく4つの引数を使用します。 具体的にはシグネチャ`(err, req, res, next)`を指定します。

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

詳細については、[Error handling](/guide/error-handling)を参照してください。

## プレーンHTMLをレンダリングするにはどうすればいいですか?

違います！ 違います！ `res.render()`関数でHTMLを「レンダリング」する必要はありません。
特定のファイルがある場合は、 `res.sendFile()` 関数を使用します。
ディレクトリから多くのアセットを提供している場合は、`express.static()`
ミドルウェア関数を使用してください。
特定のファイルがある場合は、 `res.sendFile()` 関数を使用します。
ディレクトリから多くのアセットを提供している場合は、`express.static()`
ミドルウェア関数を使用してください。

## Express にはどのバージョンの Node.js が必要ですか?

- [Express 4.x](/4x/api) では、Node.js 0.10 以上が必要です。
- Express 5.x](/api) ではNode.js 18 以上が必要です。
