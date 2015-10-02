---
layout: page
title: Express middleware
menu: resources
lang: en
---

# Middleware de terceiros

Exemplos de módulos middleware para Express:

  - [body-parser](https://github.com/expressjs/body-parser): antigo `express.bodyParser`, `json`, e `urlencoded`. 
  Veja também:
    - [body](https://github.com/raynos/body)
    - [co-body](https://github.com/visionmedia/co-body)
    - [raw-body](https://github.com/stream-utils/raw-body)
  - [compression](https://github.com/expressjs/compression) - antigo `express.compress`
  - [connect-image-optimus](https://github.com/msemenistyi/connect-image-optimus): Middleware Connect/Express para servir imagens. Use o webp/jpegxr se possível.
  - [connect-timeout](https://github.com/expressjs/timeout): antigo `express.timeout`
  - [cookie-parser](https://github.com/expressjs/cookie-parser): antigo `express.cookieParser`
  - [cookie-session](https://github.com/expressjs/cookie-session): antigo `express.cookieSession`
  - [csurf](https://github.com/expressjs/csurf): antigo `express.csrf`
  - [errorhandler](https://github.com/expressjs/errorhandler): antigo `express.errorHandler`
  - [express-debug](https://github.com/devoidfury/express-debug): Uma ferramenta de desenvolvimento que adiciona uma aba com informações sobre req, session, locals e outras informações para o seu aplicativo.
  - [express-partial-response](https://github.com/nemtsov/express-partial-response): Middleware Express para filtrar partes das respostas em JSON usando o parâmetro de url `fields`; Usando o *Google API's Partial Response*.
  - [express-session](https://github.com/expressjs/session): antigo `express.session`
  - [express-simple-cdn](https://github.com/jamiesteven/express-simple-cdn): Use facilmente um CDN para os seus arquivos estáticos com suporte a multiplos servidores (ex. cdn1.host.com, cdn2.host.com).
  - [express-slash](https://github.com/ericf/express-slash): Middleware Expresse para pessoas que são rigorosos quanto a barras no fim da URL.
  - [express-stormpath](https://github.com/stormpath/stormpath-express): Middleware Express para armazenar dados de usuários, autenticação, autorização, SSO, e segurança dos dados.
  - [express-uncapitalize](https://github.com/jamiesteven/express-uncapitalize): Redireciona requisições HTTP contendo letras maiúsculas para uma versão da url com letras minúsculas.
  - [join-io](https://github.com/coderaiser/join-io "join-io"): agrupa arquivos para reduzir a quantidade de requisições
  - [method-override](https://github.com/expressjs/method-override): antigo `express.methodOverride`
  - [morgan](https://github.com/expressjs/morgan): antigo `logger`
  - [passport](https://github.com/jaredhanson/passport): Middleware Express para autenticação.
  - [response-time](https://github.com/expressjs/response-time): antigo `express.responseTime`
  - [serve-favicon](https://github.com/expressjs/serve-favicon): antigo `express.favicon`
  - [serve-index](https://github.com/expressjs/serve-index): antigo `express.directory`
  - [serve-static](https://github.com/expressjs/serve-static): para servir conteúdo estático
  - [static-expiry](https://github.com/paulwalker/connect-static-expiry): Urls com impreção ditital/Cabeçalhos de cache para arquivos estáticos incluído suporte à domínios externos.
  - [vhost](https://github.com/expressjs/vhost): antigo `express.vhost`
  - [view-helpers](https://github.com/madhums/node-view-helpers): Um middleware Express que fornece métodos comuns para os templates.

Alguns dos middlewares que faziam parte do Connect não são mais suportados pela equipe Connect/Express
e foram substituídos por um módulo auternativo. Use uma dessas opções:

  - express.cookieParser
    - [cookies](https://github.com/jed/cookies) e [keygrip](https://github.com/jed/keygrip)
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

Para mais middlewares, veja também:
 - [http-framework](https://github.com/Raynos/http-framework/wiki/Modules)
 - [expressjs](https://github.com/expressjs)
