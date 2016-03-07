---
layout: page
title: Middleware do Express
menu: resources
lang: pt-br
---

# Middleware de Terceiros

Aqui estão alguns módulos middleware do Express:


  - [body-parser](https://github.com/expressjs/body-parser): anteriormente `express.bodyParser`, `json`, e `urlencoded`.
  Consulte também:
    - [body](https://github.com/raynos/body)
    - [co-body](https://github.com/visionmedia/co-body)
    - [raw-body](https://github.com/stream-utils/raw-body)
  - [compression](https://github.com/expressjs/compression): anteriormente `express.compress`
  - [connect-image-optimus](https://github.com/msemenistyi/connect-image-optimus): Módulos de middleware do Connect/Express para entrega otimizada de imagens. Alterna imagens para `.webp` ou `.jxr`, se possível.
  - [connect-timeout](https://github.com/expressjs/timeout): anteriormente `express.timeout`
  - [cookie-parser](https://github.com/expressjs/cookie-parser): anteriormente `express.cookieParser`
  - [cookie-session](https://github.com/expressjs/cookie-session): anteriormente `express.cookieSession`
  - [csurf](https://github.com/expressjs/csurf): anteriormente `express.csrf`
  - [errorhandler](https://github.com/expressjs/errorhandler): anteriormente `express.errorHandler`
  - [express-debug](https://github.com/devoidfury/express-debug): ferramenta não obstrutiva de desenvolvimento que inclui uma guia com informações sobre variáveis de modelo (locais), sessão corrente, dados de solicitação úteis e mais para o seu aplicativo.
  - [express-partial-response](https://github.com/nemtsov/express-partial-response): módulo de middleware do Express para filtrar partes das respostas JSON baseado nos `fields` da sequência de consultas; usando a Resposta parcial da API do Google.

  - [express-session](https://github.com/expressjs/session): anteriormente `express.session`
  - [express-simple-cdn](https://github.com/jamiesteven/express-simple-cdn): Módulo middleware do Express para usar um CDN para ativos estáticos, com suporte a múltiplos hosts (Por exemplo: cdn1.host.com, cdn2.host.com).
  - [express-slash](https://github.com/ericf/express-slash): Módulo middleware do Express para pessoas rigorosas quanto ao uso de barras no fim.

  - [express-stormpath](https://github.com/stormpath/stormpath-express): Módulo middleware do Express para armazenamento de usuário, autenticação, autorização,SSO e segurança de dados.

  - [express-uncapitalize](https://github.com/jamiesteven/express-uncapitalize): módulo middleware para redirecionamento de solicitações HTTP contendo letras maiúsculas para a forma canônica minúscula.

  - [helmet](https://github.com/helmetjs/helmet): módulo para ajudar a proteger seus aplicativos configurando vários cabeçalhos HTTP.
  - [join-io](https://github.com/coderaiser/join-io "join-io"): módulo para junção de arquivos em tempo de execução para reduzir a contagem de solicitações.
  - [method-override](https://github.com/expressjs/method-override): anteriormente `express.methodOverride`
  - [morgan](https://github.com/expressjs/morgan):  anteriormente `logger`
  - [passport](https://github.com/jaredhanson/passport): módulo middleware do Express para autenticação.
  - [response-time](https://github.com/expressjs/response-time): anteriormente `express.responseTime`
  - [serve-favicon](https://github.com/expressjs/serve-favicon): anteriormente `express.favicon`
  - [serve-index](https://github.com/expressjs/serve-index): anteriormente `express.directory`
  - [serve-static](https://github.com/expressjs/serve-static): módulo para entregar conteúdo estático.
  - [static-expiry](https://github.com/paulwalker/connect-static-expiry): URLs identificadas ou Armazenamento em cache de Cabeçalhos para ativos estáticos incluindo suporte para um ou mais domínios externos.

  - [vhost](https://github.com/expressjs/vhost): anteriormente `express.vhost`
  - [view-helpers](https://github.com/madhums/node-view-helpers): módulo middleware do Express que fornece métodos auxiliares comuns para as visualizações.

  - [sriracha-admin](https://github.com/hdngr/siracha): módulo middleware do Express que gera dinamicamente um site de administração para o Mongoose.

Alguns módulos de middleware anteriormente incluídos com o
Connect não são mais suportados pelo time Connect/Express. Estes
módulos foram substituídos por um módulo alternativo, ou devem ser
substituídos por um módulo melhor. Use uma das alternativas a seguir:


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

Para obter mais módulos middleware, consulte:

 - [http-framework](https://github.com/Raynos/http-framework/wiki/Modules)
 - [expressjs](https://github.com/expressjs)
