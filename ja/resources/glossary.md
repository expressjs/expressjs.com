---
layout: page
title: Express の用語集
description: A comprehensive glossary of terms related to Express.js, Node.js, middleware, routing, and other key concepts to help you understand and use Express effectively.
menu: resources
redirect_from: "  "
---

# 用語集

### アプリケーション

In general, one or more programs that are designed to carry out operations for a specific purpose.  一般に、特定の目的で操作を実行するよう設計された 1 つ以上のプログラム。Express のコンテキストでは、Node.js プラットフォームで稼働する Express API を使用するプログラム。[アプリケーション・オブジェクト](/{{ page.lang }}/api.html#express)と呼ばれることもある。  Might also refer to an [app object](/{{ page.lang }}/api.html#express).

### API

Application programming interface. Spell out the abbreviation when it is first used.

### Express

特定の意見に固執しない、Node.js アプリケーション向けの高速で最小限の Web フレームワーク。一般に、「Express」の望ましい呼び方は「Express.js」であるが、後者でも問題はない。 In general, "Express" is preferred to "Express.js," though the latter is acceptable.

### libuv

主に Node.js で使用するために開発された、非同期入出力に重点を置いたマルチプラットフォーム・サポート・ライブラリー。

### middleware

最後のリクエストハンドラーの前に Express ルーティング層によって呼び出される関数。そのため、未加工要求と最後の目的のルートの間に配置される。ミドルウェアの用語に関しては、微妙な点がいくつかある。 A few fine points of terminology around middleware:

- `var foo = require('middleware')` は、Node.js モジュールを_要求_ または_使用_ することで呼び出される。その後、通常はステートメント `var mw = foo()` がミドルウェアを返す。 Then the statement `var mw = foo()` typically returns the middleware.
- `app.use(mw)` は、_グローバル処理スタックにミドルウェアを追加_ することで呼び出される。
- `app.get('/foo', mw, function (req, res) { ... })` は、_「GET /foo」処理スタックにミドルウェアを追加_ することで呼び出される。

### Node.js

A software platform that is used to build scalable network applications. スケーラブルなネットワーク・アプリケーションを作成するために使用されるソフトウェア・プラットフォーム。Node.js は、スクリプト言語として JavaScript を使用し、ノンブロッキング入出力と単一スレッドのイベント・ループを通して高スループットを実現する。[nodejs.org](http://nodejs.org/) を参照。**使用上の注意**: 初回は「Node.js」を使用し、その後は「Node」を使用する。 See [nodejs.org](https://nodejs.org/en/). **Usage note**: Initially, "Node.js," thereafter "Node".

### オープン・ソース

When used as an adjective, hyphenate; for example: "This is open-source software." See [Open-source software on Wikipedia](http://en.wikipedia.org/wiki/Open-source_software).

{% capture english-rules %}

Although it is common not to hyphenate this term, we are using the standard English rules for hyphenating a compound adjective.

{% endcapture %}

{% include admonitions/note.html content=english-rules %}

### リクエスト

An HTTP request. HTTP レスポンス。サーバーは、HTTP レスポンスメッセージをクライアントに返す。レスポンスにはリクエストの完了状況情報が含まれ、リクエストされた内容がメッセージの本文に入っている場合もある。  HTTP リクエスト。クライアントは HTTP リクエストメッセージをサーバーに送信して、サーバーはレスポンスを返す。リクエストでは、いずれかの[リクエストメソッド](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods) (GET、POST など) を使用する必要がある。

### レスポンス

An HTTP response. A server returns an HTTP response message to the client. The response contains completion status information about the request and might also contain requested content in its message body.

### ルート

Part of a URL that identifies a resource. リソースを識別する URL の一部。例えば、`http://foo.com/products/id` の中では「/products/id」がルートである。

### ルーター

API リファレンスで[ルーター](/{{ page.lang }}/4x/api.html#router)を参照。
