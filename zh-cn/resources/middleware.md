---
layout: page
title: Express 中间件
menu: resources
lang: zh-cn
---

# 第三方中间件

以下是一些 Express 中间件模块：

  - [body-parser](https://github.com/expressjs/body-parser)：先前为 `express.bodyParser`、`json` 和 `urlencoded`。另请参阅：
    - [body](https://github.com/raynos/body)
    - [co-body](https://github.com/visionmedia/co-body)
    - [raw-body](https://github.com/stream-utils/raw-body)
  - [compression](https://github.com/expressjs/compression)：先前为 `express.compress`。
  - [connect-image-optimus](https://github.com/msemenistyi/connect-image-optimus)：用于提供最优映像的 Connect/Express 中间件模块。如有可能，可将映像切换为 `.webp` 或 `.jxr`。
  - [connect-timeout](https://github.com/expressjs/timeout)：先前为 `express.timeout`。
  - [cookie-parser](https://github.com/expressjs/cookie-parser)：先前为 `express.cookieParser`。
  - [cookie-session](https://github.com/expressjs/cookie-session)：先前为 `express.cookieSession`。
  - [csurf](https://github.com/expressjs/csurf)：先前为 `express.csrf`。
  - [errorhandler](https://github.com/expressjs/errorhandler)：先前为 `express.errorHandler`。
  - [express-debug](https://github.com/devoidfury/express-debug)：不引人注目的开发工具，用于向应用程序添加一个选项卡，其中包含有关模板变量（本地）、当前会话、有用请求数据等方面的信息。
  - [express-partial-response](https://github.com/nemtsov/express-partial-response)：Express 中间件模块，使用 Google API 的 Partial Response，根据 `fields` 查询字符串过滤掉 JSON 响应的各个部分。
  - [express-session](https://github.com/expressjs/session)：先前为 `express.session`。
  - [express-simple-cdn](https://github.com/jamiesteven/express-simple-cdn)：Express 中间件模块，将 CDN 用于静态资产，具有多主机支持（例如：cdn1.host.com、cdn2.host.com）。
  - [express-slash](https://github.com/ericf/express-slash)：Express 中间件模块，适用于对末尾斜杠有很严格要求的人员。
  - [express-stormpath](https://github.com/stormpath/stormpath-express)：实现用户存储、认证、授权、SSO 和数据安全性的 Express 中间件模块。
  - [express-uncapitalize](https://github.com/jamiesteven/express-uncapitalize)：中间件模块，用于将包含大写字母的 HTTP 请求转换为标准的小写形式。
  - [helmet](https://github.com/helmetjs/helmet)：一个模块，用于通过设置各种 HTTP 头来帮助保护应用程序。
  - [join-io](https://github.com/coderaiser/join-io "join-io")：一个模块，用于实时联接文件以减少请求数目。
  - [method-override](https://github.com/expressjs/method-override)：先前为 `express.methodOverride`。
  - [morgan](https://github.com/expressjs/morgan)：先前为 `logger`。
  - [passport](https://github.com/jaredhanson/passport)：用于认证的 Express 中间件模块。
  - [response-time](https://github.com/expressjs/response-time)：先前为 `express.responseTime`。
  - [serve-favicon](https://github.com/expressjs/serve-favicon)：先前为 `express.favicon`。
  - [serve-index](https://github.com/expressjs/serve-index)：先前为 `express.directory`。
  - [serve-static](https://github.com/expressjs/serve-static)：用于提供静态内容的模块。
  - [static-expiry](https://github.com/paulwalker/connect-static-expiry)：静态资产的指纹式 URL 或高速缓存头，包含对一个或多个外部域的支持。
  - [vhost](https://github.com/expressjs/vhost)：先前为 `express.vhost`。
  - [view-helpers](https://github.com/madhums/node-view-helpers)：Express 中间件模块，用于向视图提供常见助手方法。
  - [sriracha-admin](https://github.com/hdngr/siracha)：Express 中间件模块，为 Mongoose 动态生成管理站点。

Connect 先前随附的一些中间件模块不再受到 Connect/Express 团队的支持。这些模块由替代模块所取代，或者应该被更好的模块取代。请使用以下替代模块之一：

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

有关更多中间件模块，请参阅：

 - [http-framework](https://github.com/Raynos/http-framework/wiki/Modules)
 - [expressjs](https://github.com/expressjs)
