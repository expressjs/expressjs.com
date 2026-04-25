---
title: Express API のオーバーライド
description: リクエストとレスポンスオブジェクトのメソッドとプロパティをプロトタイプを使用してオーバーライドすることで、Express.js API をカスタマイズして拡張する方法をご覧ください。
---

Express API は、リクエストオブジェクトとレスポンスオブジェクトのさまざまなメソッドとプロパティで構成されています。 これらはプロトタイプによって継承されます。 Express API には 2 つの拡張ポイントがあります。

1. `express.request` と `express.response` のグローバルプロトタイプ。
2. `app.request`と`app.response`でアプリ固有のプロトタイプ。

グローバルプロトタイプを変更すると、読み込まれたすべてのExpressアプリが同じプロセスで影響を受けます。 必要に応じて、新しいアプリを作成した後にアプリ固有のプロトタイプを変更するだけで、アプリ固有の変更を行うことができます。

## メソッド

カスタム関数を割り当てることで、既存のメソッドの署名と振る舞いを独自のメソッドで上書きできます。

以下は、 [res.sendStatus](/en/4x/api#res.sendStatus) の挙動を上書きした例です。

```js
app.response.sendStatus = function (statusCode, type, message) {
  // code is intentionally kept simple for demonstration purpose
  return this.contentType(type).status(statusCode).send(message);
};
```

上記の実装は `res.sendStatus` の元の署名を完全に変更します。 ステータスコード、エンコーディングタイプ、およびメッセージをクライアントに送信できるようになりました。

オーバーライドされたメソッドは次のように使用できます。

```js
res.sendStatus(404, 'application/json', '{"error":"resource not found"}');
```

## プロパティー

Express API のプロパティは以下のいずれかです。

1. 割り当てられたプロパティ (例: `req.baseUrl`, `req.originalUrl`)
2. getters (例: `req.secure`, `req.ip`) として定義されています。

category 1 のプロパティは、現在のリクエスト-レスポンスサイクルのコンテキストで `request` と `response` オブジェクトに動的に割り当てられます。 彼らの行動はオーバーライドできない

カテゴリ2のプロパティはExpress API拡張機能APIを使用して上書きすることができます。

次のコードは `req.ip` の値をどのように派生するかを書き換えます。 これで、`Client-IP` リクエストヘッダの値を返すだけです。

```js
Object.defineProperty(app.request, 'ip', {
  configurable: true,
  enumerable: true,
  get() {
    return this.get('Client-IP');
  },
});
```

## プロトタイプ

Express API を提供するためには、Express に渡された request/response オブジェクトを (`app(req) 経由で) 提供します。 res)`は同じプロトタイプチェーンから継承する必要があります。 デフォルトでは、リクエストの `http.IncomingRequest.prototype` と、レスポンスの `http.ServerResponse.prototype` です。

必要がない限り、これはアプリケーションレベルでのみ行うことを推奨します。 また、使用されているプロトタイプは、可能な限りデフォルトのプロトタイプに近い機能を備えていることに注意してください。

```js
// Use FakeRequest and FakeResponse in place of http.IncomingRequest and http.ServerResponse
// for the given app reference
Object.setPrototypeOf(Object.getPrototypeOf(app.request), FakeRequest.prototype);
Object.setPrototypeOf(Object.getPrototypeOf(app.response), FakeResponse.prototype);
```
