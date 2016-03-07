---
layout: page
title: Express のミドルウェア
menu: resources
lang: ja
---

# サード・パーティー・ミドルウェア

下記に、いくつかの Express ミドルウェア・モジュールを挙げます。

  - [body-parser](https://github.com/expressjs/body-parser): 以前の `express.bodyParser`、`json`、`urlencoded`。以下も参照してください。
    - [body](https://github.com/raynos/body)
    - [co-body](https://github.com/visionmedia/co-body)
    - [raw-body](https://github.com/stream-utils/raw-body)
  - [compression](https://github.com/expressjs/compression): 以前の `express.compress`
  - [connect-image-optimus](https://github.com/msemenistyi/connect-image-optimus): 最適なイメージ・サービス提供を実現する Connect/Express ミドルウェア・モジュール。可能な場合は、イメージを `.webp` または `.jxr` に切り替えてください。
  - [connect-timeout](https://github.com/expressjs/timeout): 以前の `express.timeout`
  - [cookie-parser](https://github.com/expressjs/cookie-parser): 以前の `express.cookieParser`
  - [cookie-session](https://github.com/expressjs/cookie-session): 以前の `express.cookieSession`
  - [csurf](https://github.com/expressjs/csurf): 以前の `express.csrf`
  - [errorhandler](https://github.com/expressjs/errorhandler): 以前の `express.errorHandler`
  - [express-debug](https://github.com/devoidfury/express-debug): テンプレート変数 (ローカル)、現行セッション、有用な要求データなどに関する情報を示すタブをアプリケーションに追加する小規模な開発ツール。
  - [express-partial-response](https://github.com/nemtsov/express-partial-response): Google API の Partial Response を使用することで、`fields` 照会ストリングに基づいて JSON 応答の一部をフィルターで除去するための Express ミドルウェア・モジュール。
  - [express-session](https://github.com/expressjs/session): 以前の `express.session`
  - [express-simple-cdn](https://github.com/jamiesteven/express-simple-cdn): 複数ホストのサポート (例えば、cdn1.host.com、cdn2.host.com) を備え、静的資産に CDN を使用するための Express ミドルウェア・モジュール。
  - [express-slash](https://github.com/ericf/express-slash): 末尾スラッシュを厳密に処理するユーザー向けの Express ミドルウェア・モジュール。
  - [express-stormpath](https://github.com/stormpath/stormpath-express): ユーザー・ストレージ、認証、許可、SSO、データ・セキュリティーのための Express ミドルウェア・モジュール。
  - [express-uncapitalize](https://github.com/jamiesteven/express-uncapitalize): 大文字を含む HTTP 要求を正規の小文字形式に変換するためのミドルウェア・モジュール。
  - [helmet](https://github.com/helmetjs/helmet): さまざまな HTTP ヘッダーを設定することでアプリケーションを保護する上で役立つモジュール。
  - [join-io](https://github.com/coderaiser/join-io "join-io"): 要求数を減らすために処理中にファイルを結合するモジュール。
  - [method-override](https://github.com/expressjs/method-override): 以前の `express.methodOverride`
  - [morgan](https://github.com/expressjs/morgan): 以前の `logger`
  - [passport](https://github.com/jaredhanson/passport): 認証のための Express ミドルウェア・モジュール。
  - [response-time](https://github.com/expressjs/response-time): 以前の `express.responseTime`
  - [serve-favicon](https://github.com/expressjs/serve-favicon): 以前の `express.favicon`
  - [serve-index](https://github.com/expressjs/serve-index): 以前の `express.directory`
  - [serve-static](https://github.com/expressjs/serve-static): 静的コンテンツを提供するためのモジュール。
  - [static-expiry](https://github.com/paulwalker/connect-static-expiry): 1 つ以上の外部ドメインに対するサポートを含む、静的資産の指紋認証 URL またはキャッシング・ヘッダー。
  - [vhost](https://github.com/expressjs/vhost): 以前の `express.vhost`
  - [view-helpers](https://github.com/madhums/node-view-helpers): ビューに共通ヘルパー・メソッドを提供する Express ミドルウェア・モジュール。
  - [sriracha-admin](https://github.com/hdngr/siracha): Mongoose 用の管理サイトを動的に生成する Express ミドルウェア・モジュール。

以前は Connect に組み込まれていた一部のミドルウェア・モジュールは、Connect/Express チームによってサポートされなくなっています。これらのモジュールは、代替のモジュールに置き換えられているか、より優れたモジュールに置き換えられる必要があります。以下のいずれかの代替モジュールを使用してください。

  - express.cookieParser
    - [cookies](https://github.com/jed/cookies) および [keygrip](https://github.com/jed/keygrip)
  - express.limit
    - [raw-body](https://github.com/stream-utils/raw-body)
  - express.multipart
    - [connect-busboy](https://github.com/mscdex/connect-busboy)
    - [multer](https://github.com/expressjs/multer)
    - [connect-multiparty](https://github.com/superjoe30/connect-multiparty)
  - express.query
    - [qs](https://github.com/visionmedia/node-querystring)
  - express.staticCache
    - [st](https://github.com/isaacs/st)
    - [connect-static](https://github.com/andrewrk/connect-static)

その他のミドルウェア・モジュールについては、下記を参照してください。

 - [http-framework](https://github.com/Raynos/http-framework/wiki/Modules)
 - [expressjs](https://github.com/expressjs)
