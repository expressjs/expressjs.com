---
layout: page
title: Express の用語集
menu: resources
lang: ja
---

# 用語集

### アプリケーション

一般に、特定の目的で操作を実行するよう設計された 1 つ以上のプログラム。Express のコンテキストでは、Node.js プラットフォームで稼働する Express API を使用するプログラム。[アプリケーション・オブジェクト](/{{ page.lang }}/api.html#express)と呼ばれることもある。

### API

アプリケーション・プログラミング・インターフェース。最初に使用するときは、略語のスペルを略さない。

### Express

特定の意見に固執しない、Node.js アプリケーション向けの高速で最小限の Web フレームワーク。一般に、「Express」の望ましい呼び方は「Express.js」であるが、後者でも問題はない。

### libuv

主に Node.js で使用するために開発された、非同期入出力に重点を置いたマルチプラットフォーム・サポート・ライブラリー。

### ミドルウェア

最後のリクエストハンドラーの前に Express ルーティング層によって呼び出される関数。そのため、未加工要求と最後の目的のルートの間に配置される。ミドルウェアの用語に関しては、微妙な点がいくつかある。

  * `var foo = require('middleware')` は、Node.js モジュールを*要求* または*使用* することで呼び出される。その後、通常はステートメント `var mw = foo()` がミドルウェアを返す。
  * `app.use(mw)` は、*グローバル処理スタックにミドルウェアを追加* することで呼び出される。
  * `app.get('/foo', mw, function (req, res) { ... })` は、*「GET /foo」処理スタックにミドルウェアを追加* することで呼び出される。

### Node.js

スケーラブルなネットワーク・アプリケーションを作成するために使用されるソフトウェア・プラットフォーム。Node.js は、スクリプト言語として JavaScript を使用し、ノンブロッキング入出力と単一スレッドのイベント・ループを通して高スループットを実現する。[nodejs.org](http://nodejs.org/) を参照。**使用上の注意**: 初回は「Node.js」を使用し、その後は「Node」を使用する。

### オープン・ソース

形容詞として使用する場合は、ハイフンを付ける (例:「This is open-source software.」)。[Wikipedia の「Open-source software」](http://en.wikipedia.org/wiki/Open-source_software)を参照。注: 一般的にはこの用語にハイフンを付けないが、ここでは複合形容詞にハイフンを付けるという標準英語の規則に従う。

### リクエスト

HTTP リクエスト。クライアントは HTTP リクエストメッセージをサーバーに送信して、サーバーはレスポンスを返す。リクエストでは、いずれかの[リクエストメソッド](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods) (GET、POST など) を使用する必要がある。

### レスポンス

HTTP レスポンス。サーバーは、HTTP レスポンスメッセージをクライアントに返す。レスポンスにはリクエストの完了状況情報が含まれ、リクエストされた内容がメッセージの本文に入っている場合もある。

### ルート

リソースを識別する URL の一部。例えば、`http://foo.com/products/id` の中では「/products/id」がルートである。

### ルーター

API リファレンスで[ルーター](/{{ page.lang }}/4x/api.html#router)を参照。
