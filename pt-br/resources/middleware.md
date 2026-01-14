---
layout: middleware
title: Middleware do Express
description: Explore uma lista de módulos de middleware Express.js mantidos pela equipe Express e pela comunidade, incluindo módulos de intermediários e de terceiros populares.
menu: resources
order: 3
redirect_from: "  "
module: mw-home
---

## Middleware do Express

Aqui estão alguns módulos middleware do Express:

| Módulo de Middleware                                                        | Descrição                                                                                                                                     |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| [body-parser](/{{page.lang}}/resources/middleware/body-parser.html)         | Analisar corpo da requisição HTTP.                                                                                            |
| [compression](/{{page.lang}}/resources/middleware/compression.html)         | Comprimir respostas HTTP.                                                                                                     |
| [connect-rid](/{{page.lang}}/resources/middleware/connect-rid.html)         | Gerar ID único de requisição.                                                                                                 |
| [cookie-parser](/{{page.lang}}/resources/middleware/cookie-parser.html)     | Analisar cabeçalho de cookie e preencher `req.cookies`. Ver também [cookies](https://github.com/jed/cookies). |
| [cookie-session](/{{page.lang}}/resources/middleware/cookie-session.html)   | Estabelecer sessões baseadas em cookies.                                                                                      |
| [cors](/{{page.lang}}/resources/middleware/cors.html)                       | Ativa o compartilhamento de recursos entre origens (CORS) com várias opções.                               |
| [errorhandler](/{{page.lang}}/resources/middleware/errorhandler.html)       | Processamento/depuração do desenvolvimento.                                                                                   |
| [method-override](/{{page.lang}}/resources/middleware/method-override.html) | Substituir métodos HTTP utilizando header.                                                                                    |
| [morgan](/{{page.lang}}/resources/middleware/morgan.html)                   | Log de requisições HTTP.                                                                                                      |
| [multer](/{{page.lang}}/resources/middleware/multer.html)                   | Manipule dados de formulários multi-part.                                                                                     |
| [response-time](/{{page.lang}}/resources/middleware/response-time.html)     | Record HTTP response time.                                                                                                    |
| [serve-favicon](/{{page.lang}}/resources/middleware/serve-favicon.html)     | Sirva um favicon.                                                                                                             |
| [serve-index](/{{page.lang}}/resources/middleware/serve-index.html)         | Serve directory listing for a given path.                                                                                     |
| [serve-static](/{{page.lang}}/resources/middleware/serve-static.html)       | Servir arquivos estáticos.                                                                                                    |
| [session](/{{page.lang}}/resources/middleware/session.html)                 | Establish server-based sessions (development only).                                                        |
| [timeout](/{{page.lang}}/resources/middleware/timeout.html)                 | Set a timeout perioHTTP request processing.                                                                                   |
| [vhost](/{{page.lang}}/resources/middleware/vhost.html)                     | Criar domínios virtuais.                                                                                                      |

## Para obter mais módulos middleware, consulte:

These are some additional popular middleware modules.

{% include community-caveat.html %}

| Módulo de Middleware                                                                                                                 | Descrição                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [st](https://github.com/isaacs/st)                                                                                                   | [helmet](https://github.com/helmetjs/helmet): módulo para ajudar a proteger seus aplicativos configurando vários cabeçalhos HTTP.                                     |
| [passport](https://github.com/jaredhanson/passport): módulo middleware do Express para autenticação. | Authentication using "strategies" such as OAuth, OpenID and many others.  Veja [passportjs.org](https://passportjs.org/) para obter mais informações. |
