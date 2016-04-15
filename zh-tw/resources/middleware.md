---
layout: page
title: Express 中介軟體
menu: resources
lang: zh-tw
---

# 協力廠商中介軟體

以下是部分的 Express 中介軟體模組：

  - [body-parser](https://github.com/expressjs/body-parser)：即先前的 `express.bodyParser`、`json` 和 `urlencoded`。另請參閱：
    - [body](https://github.com/raynos/body)
    - [co-body](https://github.com/visionmedia/co-body)
    - [raw-body](https://github.com/stream-utils/raw-body)
  - [compression](https://github.com/expressjs/compression)：即先前的 `express.compress`
  - [connect-image-optimus](https://github.com/msemenistyi/connect-image-optimus)：可提供最佳影像的 Connect/Express 中介軟體模組。如果可能的話，請將影像切換成 `.webp` 或 `.jxr`。
  - [connect-timeout](https://github.com/expressjs/timeout)：即先前的 `express.timeout`
  - [cookie-parser](https://github.com/expressjs/cookie-parser)：即先前的 `express.cookieParser`
  - [cookie-session](https://github.com/expressjs/cookie-session)：即先前的 `express.cookieSession`
  - [csurf](https://github.com/expressjs/csurf)：即先前的 `express.csrf`
  - [errorhandler](https://github.com/expressjs/errorhandler)：即先前的 `express.errorHandler`
  - [express-debug](https://github.com/devoidfury/express-debug)：低調的開發工具，可在您的應用程式中新增標籤，內含範本變數 (locals)、現行階段作業、有用的要求資料等相關資訊。
  - [express-partial-response](https://github.com/nemtsov/express-partial-response)：Express 中介軟體模組，會根據 `fields` 查詢字串，使用 Google API 的 Partial Response 來濾除 JSON 回應部分。
  - [express-session](https://github.com/expressjs/session)：即先前的 `express.session`
  - [express-simple-cdn](https://github.com/jamiesteven/express-simple-cdn)：Express 中介軟體模組，會將 CDN 用於靜態資產，並支援多部主機（例如：cdn1.host.com、cdn2.host.com）。
  - [express-slash](https://github.com/ericf/express-slash)：Express 中介軟體模組，供嚴格看待尾端斜線的人員使用。
  - [express-stormpath](https://github.com/stormpath/stormpath-express)：Express 中介軟體模組，供使用者執行儲存、鑑別、授權、SSO 和資料安全。
  - [express-uncapitalize](https://github.com/jamiesteven/express-uncapitalize)：中介軟體模組，可將含有大寫的 HTTP 要求重新導向至標準小寫形式。
  - [helmet](https://github.com/helmetjs/helmet)：此模組會設定各種 HTTP 標頭，有助於保護您應用程式的安全。
  - [join-io](https://github.com/coderaiser/join-io "join-io")：此模組會即時結合檔案，來減少要求計數。
  - [method-override](https://github.com/expressjs/method-override)：即先前的 `express.methodOverride`
  - [morgan](https://github.com/expressjs/morgan)：即先前的 `logger`
  - [passport](https://github.com/jaredhanson/passport)：鑑別用的 Express 中介軟體模組。
  - [response-time](https://github.com/expressjs/response-time)：即先前的 `express.responseTime`
  - [serve-favicon](https://github.com/expressjs/serve-favicon)：即先前的 `express.favicon`
  - [serve-index](https://github.com/expressjs/serve-index)：即先前的 `express.directory`
  - [serve-static](https://github.com/expressjs/serve-static)：此模組可提供靜態內容。
  - [static-expiry](https://github.com/paulwalker/connect-static-expiry)：靜態資產的加指紋 URL 或「快取標頭」，還支援一或多個外部網域。
  - [vhost](https://github.com/expressjs/vhost)：即先前的 `express.vhost`
  - [view-helpers](https://github.com/madhums/node-view-helpers)：Express 中介軟體模組，可提供一般 helper 方法給視圖。
  - [sriracha-admin](https://github.com/hdngr/siracha)：Express 中介軟體模組，可為 Mongoose 動態產生管理網站。

Connect/Express 團隊不再支援 Connect 先前隨附的一些中介軟體模組。這些模組會以替代模組取代，或者應以更好的模組取代。請使用下列其中一個替代項目：

  - express.cookieParser
    - [cookies](https://github.com/jed/cookies) 和 [keygrip](https://github.com/jed/keygrip)
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

如需其他的中介軟體模組，請參閱：

 - [http-framework](https://github.com/Raynos/http-framework/wiki/Modules)
 - [expressjs](https://github.com/expressjs)
