---
layout: middleware
title: Middleware de Express
description: Explore una lista de módulos de middleware de Express.js mantenidos por el equipo Express y la comunidad, incluyendo middleware integrado y módulos populares de terceros.
menu: recursos
lang: es
redirect_from: /resources/middleware.html
module: mw-home
---

## Middleware de terceros

Estos son algunos módulos de middleware de Express:

| [express-slash](https://github.com/ericf/express-slash): módulo de middleware de Express para aquellos que son estrictos sobre las barras inclinadas finales. | Descripción                                                                                                                               |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| [body-parser](/{{page.lang}}/resources/middleware/body-parser.html)                                                                                                                           | Analizar cuerpo de petición HTTP.                                                                                         |
| [compression](/{{page.lang}}/resources/middleware/compression.html)                                                                                                                           | Comprimir respuestas HTTP.                                                                                                |
| [connect-rid](/{{page.lang}}/resources/middleware/connect-rid.html)                                                                                                                           | Generar ID de solicitud única.                                                                                            |
| [cookie-parser](/{{page.lang}}/resources/middleware/cookie-parser.html)                                                                                                                       | Analizar cabecera de cookie y rellenar `req.cookies`. See also [cookies](https://github.com/jed/cookies). |
| [cookie-session](/{{page.lang}}/resources/middleware/cookie-session.html)                                                                                                                     | Establecer sesiones basadas en cookies.                                                                                   |
| [cors](/{{page.lang}}/resources/middleware/cors.html)                                                                                                                                         | Habilitar compartir recursos de origen cruzado (CORS) con varias opciones.                             |
| [errorhandler](/{{page.lang}}/resources/middleware/errorhandler.html)                                                                                                                         | Desarrollo/depuración de errores de desarrollo.                                                                           |
| [method-override](/{{page.lang}}/resources/middleware/method-override.html)                                                                                                                   | Anular los métodos HTTP usando la cabecera.                                                                               |
| [morgan](/{{page.lang}}/resources/middleware/morgan.html)                                                                                                                                     | Logger de solicitudes HTTP.                                                                                               |
| [multer](/{{page.lang}}/resources/middleware/multer.html)                                                                                                                                     | Manejar datos de forma multiparte.                                                                                        |
| [response-time](/{{page.lang}}/resources/middleware/response-time.html)                                                                                                                       | Grabar tiempo de respuesta HTTP.                                                                                          |
| [serve-favicon](/{{page.lang}}/resources/middleware/serve-favicon.html)                                                                                                                       | Sirva un favicón.                                                                                                         |
| [serve-index](/{{page.lang}}/resources/middleware/serve-index.html)                                                                                                                           | Servir listado de directorios para una ruta determinada.                                                                  |
| [serve-static](/{{page.lang}}/resources/middleware/serve-static.html)                                                                                                                         | Servir archivos estáticos.                                                                                                |
| [session](/{{page.lang}}/resources/middleware/session.html)                                                                                                                                   | Establecer sesiones basadas en servidores (sólo desarrollo).                                           |
| [timeout](/{{page.lang}}/resources/middleware/timeout.html)                                                                                                                                   | Set a timeout perioHTTP request processing.                                                                               |
| [vhost](/{{page.lang}}/resources/middleware/vhost.html)                                                                                                                                       | Crear dominios virtuales.                                                                                                 |

## Para ver más módulo de middleware, consulte:

Estos son algunos módulos de middleware más populares.

{% include community-caveat.html %}

| [express-slash](https://github.com/ericf/express-slash): módulo de middleware de Express para aquellos que son estrictos sobre las barras inclinadas finales. | Descripción                                                                                                                                                                                |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [helmet](https://github.com/helmetjs/helmet): módulo para ayudar a proteger las aplicaciones estableciendo varias cabeceras HTTP.                             | Ayuda a proteger tus aplicaciones configurando varias cabeceras HTTP.                                                                                                      |
| [passport](https://github.com/jaredhanson/passport): módulo de middleware de Express para la autenticación.                                                   | Autenticación usando "estrategias" como OAuth, OpenID y muchas otras.  See [passportjs.org](https://passportjs.org/) for more information. |
