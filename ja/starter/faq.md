---
layout: page
title: Express に関する FAQ
description: Find answers to frequently asked questions about Express.js, including topics on application structure, models, authentication, template engines, error handling, and more.
menu: starter
lang: ja
redirect_from: /starter/faq.html
---

# FAQ

## どのようにしてアプリケーションを構成するのですか?

There is no definitive answer to this question. The answer depends
on the scale of your application and the team that is involved. To be as
flexible as possible, Express makes no assumptions in terms of structure.

ルートやその他のアプリケーション固有のロジックは、必要な数だけのファイルや、任意のディレクトリー構造に存在できます。参考のために、以下の例を参照してください。 View the following
examples for inspiration:

- [ルートのリスト](https://github.com/expressjs/express/blob/4.13.1/examples/route-separation/index.js#L32-47)
- [ルートのマップ](https://github.com/expressjs/express/blob/4.13.1/examples/route-map/index.js#L52-L66)
- [MVC スタイルのコントローラー](https://github.com/expressjs/express/tree/master/examples/mvc)

また、これらのパターンを簡素化する、サード・パーティー製の Express 拡張版があります。

- [Resourceful ルーティング](https://github.com/expressjs/express-resource)

## どのようにしてモデルを定義するのですか?

Express には、データベースの概念がありません。この概念はサード・パーティーの Node モジュールに任せられているため、ほとんどのデータベースとやりとりできます。 This concept is
left up to third-party Node modules, allowing you to
interface with nearly any database.

モデルに関する Express ベースのフレームワークについては、[LoopBack](http://loopback.io) を参照してください。

## どのようにしてユーザーを認証するのですか?

Authentication is another opinionated area that Express does not
venture into. You may use any authentication scheme you wish.
認証は、Express が足を踏み入れていないもう 1 つの分野です。任意の認証スキームを使用できます。
単純なユーザー名/パスワードのスキームについては、[この例](https://github.com/expressjs/express/tree/master/examples/auth)を参照してください。

## Express はどのテンプレート・エンジンをサポートしているのですか?

Express は、`(パス、ロケール、コールバック)` シグニチャーに準拠するすべてのテンプレート・エンジンをサポートします。
テンプレート・エンジンのインターフェースとキャッシングを正規化するには、[consolidate.js](https://github.com/visionmedia/consolidate.js) プロジェクトでサポートを参照してください。リストされていないテンプレート・エンジンでも Express シグニチャーをサポートしている可能性があります。
To normalize template engine interfaces and caching, see the
[consolidate.js](https://github.com/visionmedia/consolidate.js)
project for support. Unlisted template engines might still support the Express signature.

For more information, see [Using template engines with Express](/{{page.lang}}/guide/using-template-engines.html).

## どのようにして 404 応答に対応するのですか?

Express では、404 応答はエラーの結果ではありません。そのため、エラー・ハンドラー・ミドルウェアはそれらをキャプチャーしません。このように動作するのは、404 応答は単に追加の処理が存在しないことを示しているためです。つまり、Express は、すべてのミドルウェア関数とルートを実行して、そのいずれも応答しなかったことを検出したということです。404 応答に対応するには、スタックの最下部 (他のすべての関数の下) にミドルウェア関数を追加するだけですみます。 This behavior is
because a 404 response simply indicates the absence of additional work to do;
in other words, Express has executed all middleware functions and routes,
and found that none of them responded. All you need to
do is add a middleware function at the very bottom of the stack (below all other functions)
to handle a 404 response:

```js
app.use((req, res, next) => {
  res.status(404).send('Sorry cant find that!')
})
```

Add routes dynamically at runtime on an instance of `express.Router()`
so the routes are not superseded by a middleware function.

## どのようにしてエラー・ハンドラーをセットアップするのですか?

エラー処理ミドルウェアの定義方法は、他のミドルウェアと同じですが、引数の数が 3 つではなく 4 つである点が異なります。具体的には、シグニチャー `(err、req、res、next)` です。

```js
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

詳細については、[エラー処理](/{{ page.lang }}/guide/error-handling.html)を参照してください。

## どのようにしてプレーン HTML をレンダリングするのですか?

You don't! レンダリングしません。`res.render()` 関数で HTML を「レンダリング」する必要はありません。
特定のファイルがある場合は、`res.sendFile()` 関数を使用します。
ディレクトリーから多数の資産を提供する場合は、`express.static()` ミドルウェア関数を使用します。
If you have a specific file, use the `res.sendFile()` function.
If you are serving many assets from a directory, use the `express.static()`
middleware function.

## What version of Node.js does Express require?

- [Express 4.x](/{{ page.lang }}/4x/api.html) requires Node.js 0.10 or higher.
- [Express 5.x](/{{ page.lang }}/5x/api.html) requires Node.js 18 or higher.

### [Previous: More examples ](/{{ page.lang }}/starter/examples.html)
