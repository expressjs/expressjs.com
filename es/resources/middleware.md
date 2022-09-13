---
layout: page
title: Middleware de Express
menu: resources
lang: es
---

# Middleware de terceros

Estos son algunos módulos de middleware de Express:

  - [body-parser](https://github.com/expressjs/body-parser): anteriormente `express.bodyParser`, `json` y `urlencoded`.
  Vea también:
    - [body](https://github.com/raynos/body)
    - [co-body](https://github.com/visionmedia/co-body)
    - [raw-body](https://github.com/stream-utils/raw-body)
  - [compression](https://github.com/expressjs/compression):  anteriormente `express.compress`
  - [connect-image-optimus](https://github.com/msemenistyi/connect-image-optimus): módulos de middleware de Connect/Express para el servicio óptimo de imágenes. Cambia las imágenes a `.webp` o `.jxr`, si es posible.
  - [connect-timeout](https://github.com/expressjs/timeout): anteriormente `express.timeout`
  - [cookie-parser](https://github.com/expressjs/cookie-parser): anteriormente `express.cookieParser`
  - [cookie-session](https://github.com/expressjs/cookie-session): anteriormente `express.cookieSession`
  - [errorhandler](https://github.com/expressjs/errorhandler): anteriormente `express.errorHandler`
  - [express-debug](https://github.com/devoidfury/express-debug): herramienta de desarrollo discreta que añade a la aplicación un separador con información sobre las variables de plantilla (locals), la sesión actual, datos de solicitud útiles, etc.
  - [express-partial-response](https://github.com/nemtsov/express-partial-response): módulo de middleware de Express middleware para filtrar partes de las respuestas JSON basándose en la serie de consulta `fields`; utiliza la respuesta parcial de la API de Google.
  - [express-session](https://github.com/expressjs/session): anteriormente `express.session`
  - [express-simple-cdn](https://github.com/jamiesteven/express-simple-cdn): módulo de middleware de Express para utilizar una CDN (Red de entrega de contenido) para los activos estáticos, con soporte de varios hosts (por ejemplo, cdn1.host.com, cdn2.host.com).
  - [express-slash](https://github.com/ericf/express-slash): módulo de middleware de Express para aquellos que son estrictos sobre las barras inclinadas finales.
  - [express-stormpath](https://github.com/stormpath/stormpath-express): módulo de middleware de Express para el almacenamiento de usuario, la autenticación, la autorización, SSO y la seguridad de datos.
  - [express-uncapitalize](https://github.com/jamiesteven/express-uncapitalize): módulo de middleware para redirigir las solicitudes que contienen mayúsculas a un formato en minúsculas canónico.
  - [helmet](https://github.com/helmetjs/helmet): módulo para ayudar a proteger las aplicaciones estableciendo varias cabeceras HTTP.
  - [join-io](https://github.com/coderaiser/join-io "join-io"): módulo para unir archivos sobre la marcha para reducir el recuento de solicitudes.
  - [method-override](https://github.com/expressjs/method-override): anteriormente `express.methodOverride`
  - [morgan](https://github.com/expressjs/morgan): anteriormente `logger`
  - [passport](https://github.com/jaredhanson/passport): módulo de middleware de Express para la autenticación.
  - [response-time](https://github.com/expressjs/response-time): anteriormente `express.responseTime`
  - [serve-favicon](https://github.com/expressjs/serve-favicon): anteriormente `express.favicon`
  - [serve-index](https://github.com/expressjs/serve-index): anteriormente `express.directory`
  - [serve-static](https://github.com/expressjs/serve-static): módulo para el servicio de contenido estático.
  - [static-expiry](https://github.com/paulwalker/connect-static-expiry): cabeceras de almacenamiento en memoria caché o URL de firma digital para activos estáticos, incluido el soporte para uno o varios dominios externos.
  - [vhost](https://github.com/expressjs/vhost): anteriormente `express.vhost`
  - [view-helpers](https://github.com/madhums/node-view-helpers): módulo de middleware de Express que proporciona métodos de ayudante comunes a las vistas.
  - [sriracha-admin](https://github.com/hdngr/siracha): módulo de middleware de Express que genera dinámicamente un sitio de administración para Mongoose.

Algunos módulos de middleware incluidos previamente con Connect ya no están soportados por el equipo de Connect/Express. Estos módulos se han sustituido por un módulo alternativo o deben reemplazarse por un módulo mejor. Utilice una de las siguientes alternativas:

  - express.cookieParser
    - [cookies](https://github.com/jed/cookies) y [keygrip](https://github.com/jed/keygrip)
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

Para ver más módulo de middleware, consulte:

 - [http-framework](https://github.com/Raynos/http-framework/wiki/Modules)
 - [expressjs](https://github.com/expressjs)
