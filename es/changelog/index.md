---
layout: página
title: Registro de cambios urgente
description: Manténgase actualizado con el registro de cambios de la versión para Express.js, detallando nuevas características, correcciones de errores y cambios importantes en todas las versiones.
lang: es
sitemap: false
redirect_from:
  - /es/changelog/4x.html
  - es/changelog/4x.html
---

<nav aria-label="sidebar-heading">
  <div class="toc-container">
    <h3 id="sidebar-heading" class="toc-heading"><em>Versions</em></h3><button id="menu-toggle" title="show express versions">Versions <span>►</span></button>
    <ul id="menu">
      {% capture readme %}{% include changelog/menu.md %}{% endcapture %}
      <li>
        {{ readme | markdownify }}
      </li>
    </ul>
  </div>
</nav>

<div markdown="1" id="page-doc">

# Liberar registro de cambios

Todas las últimas actualizaciones, mejoras y correcciones a Express

## Express v5

{: id="5.x"}

### 5.1.0 - Release date: 2025-03-31

{: id="5.0.1"}

The 5.1.0 minor release includes some new features and improvements:

- Support for sending responses as Uint8Array
- Added support for ETag option in `res.sendFile()`
- Added support for adding multiple links with the same rel with `res.links()`
- Performance: Use loop for acceptParams
- [body-parser@2.2.0](https://github.com/expressjs/body-parser/releases/tag/v2.2.0)
  - Remove legacy node.js support checks for Brotli & `AsyncLocalStorage`
  - Remove `unpipe` & `destroy`
- [router@2.2.0](https://github.com/pillarjs/router/releases/tag/v2.2.0)
  - Restore `debug`. Now with the `router` scope instead of `express`.
  - Remove legacy node.js support checks for `setImmediate`
  - Deprecate non-native promise support
  - Remove `after`, `safe-buffer`, `array-flatten`, `setprotoypeof`, `methods`, `utils-merge`
- [finalhandler@2.1.0](https://github.com/pillarjs/finalhandler/releases/tag/v2.1.0)
  - Remove legacy node.js support checks for `headersSent`, `setImmediate`, & http2 support
  - Remove `unpipe`
- Transitioned all remaining dependencies to use `^` ranges instead of locked versions
- Add package.json funding field to highlight our OpenCollective
- See [Changelog v5.1.0](https://github.com/expressjs/express/releases/tag/v5.1.0)

### 5.0.1 - Fecha de lanzamiento: 2024-10-08

{: id="5.0.1"}

El parche 5.0.1 incluye una corrección de seguridad:

- Actualizar [jshttps/cookie](https://www.npmjs.com/package/cookie) para direccionar un [vulnerability](https://github.com/advisories/GHSA-pxg6-pf52-xh8x).

### 5.0.0 - Fecha de lanzamiento: 2024-09-09

{: id="5.0.0"}

Revisa la [guía de migración] (/{{page.lang}}/guide/migrating-5.html) con todos los cambios en esta nueva versión de Express.

## Express v4

{: id="4.x"}

### 4.21.2 - Fecha de lanzamiento: 2024-11-06

{: id="4.21.2"}

El parche 4.21.2 incluye una corrección de seguridad:

- Actualizar [pillajs/camino a regexp](https://www.npmjs.com/package/path-to-regexp) para dirigir una [vulnerability](https://github.com/advisories/GHSA-rhx6-c78j-4q9w).

### 4.21.1 - Fecha de lanzamiento: 2024-10-08

{: id="4.21.1"}

El parche 4.21.1 incluye una corrección de seguridad:

- Actualizar [jshttps/cookie](https://www.npmjs.com/package/cookie) para direccionar un [vulnerability](https://github.com/advisories/GHSA-pxg6-pf52-xh8x).

### 4.21.0 - Fecha de lanzamiento: 2024-09-11

{: id="4.21.0"}

La versión menor 4.21.0 incluye una nueva característica:

- Desaprobar `res.location("back")` y `res.redirect("back")` cadena mágica

### 4.20.0 - Fecha de lanzamiento: 2024-09-10

{: id="4.20.0"}

La versión menor 4.20.0 incluye correcciones de errores y algunas características nuevas, incluyendo:

- El [método `res.clearCookie()`](/{{ page.lang }}/4x/api.html#res.clearCookie) desaprueba las opciones `options.maxAge` y `options.expires`.
- El método [`res.redirect()`](/{{ page.lang }}/4x/api.html#res.redirect) elimina la representación de enlaces HTML.
- El método [`express.urlencoded()`](/{{ page.lang }}/4x/api.html#express.urlencoded) ahora tiene un nivel de profundidad de `32`, mientras que anteriormente era `Infinity`.
- Añade soporte para grupos con nombres coincidentes en las rutas usando una expresión regular
- Elimina la codificación de `\`, `|` y `^` para alinearse mejor con la especificación de URL

Para una lista completa de cambios en esta versión, vea [History.md](https://github.com/expressjs/express/blob/master/History.md#4200--2024-09-10)

### 4.19.2 - Fecha de lanzamiento: 2024-03-25

{: id="4.19.2"}

- La corrección mejorada para la redirección abierta permite omitir la lista

Para una lista completa de cambios en esta versión, vea [History.md](https://github.com/expressjs/express/blob/master/History.md#4192--2024-03-25)

### 4.19.1 - Fecha de lanzamiento: 2024 a 03

{: id="4.19.1"}

- Permite pasar a res.location sin cadenas con nuevas comprobaciones de manejo de codificación

Para una lista completa de cambios en esta versión, vea [History.md](https://github.com/expressjs/express/blob/master/History.md#4191--2024-03-20)

### 4.19.0 - Fecha de lanzamiento: 2024 - 03

{: id="4.19.0"}

- Evitar que la redirección abierta permita eludir la lista debido a la encodeurl
- deps: cookie@0.6.0

Para una lista completa de cambios en esta versión, vea [History.md](https://github.com/expressjs/express/blob/master/History.md#4190--2024-03-20)

### 4.18.3 - Fecha de lanzamiento: 2024-02-29

{: id="4.18.3"}

La versión 4.18.3 incluye la siguiente corrección de error:

<ul>
  <li markdown="1" class="changelog-item">
  Corregir peticiones de enrutamiento sin método. ([commit](https://github.com/expressjs/express/commit/74beeac0718c928b4ba249aba3652c52fbe32ca8))  
</li>
</ul>

Para una lista completa de cambios en esta versión, vea [History.md](https://github.com/expressjs/express/blob/master/History.md#4183--2024-02-26)

### 4.18.2 - Fecha de lanzamiento: 2022-10-08

{: id="4.18.2"}

La versión 4.18.2 incluye la siguiente corrección de error:

<ul>
  <li markdown="1" class="changelog-item">
  Corregir la ruta de regresión de una gran pila en una sola ruta. ([commit](https://github.com/expressjs/express/commit/7ec5dd2b3c5e7379f68086dae72859f5573c8b9b))  
</li>
</ul>

Para una lista completa de cambios en esta versión, vea [History.md](https://github.com/expressjs/express/blob/master/History.md#4182--2022-10-08)

### 4.18.1 - Fecha de publicación: 2022-04-29

{: id="4.18.1"}

La versión 4.18.1 incluye la siguiente corrección de error:

<ul>
  <li markdown="1" class="changelog-item">
  Fix the condition where if an Express application is created with a very large stack of routes, and all of those routes are sync (call `next()` synchronously), then the request processing may hang.
  </li>
</ul>

Para una lista completa de cambios en esta versión, vea [History.md](https://github.com/expressjs/express/blob/master/History.md#4181--2022-04-29).

### 4.18.0 - Fecha de lanzamiento: 2022-04-25

{: id="4.18.0"}

La versión menor 4.18.0 incluye correcciones de errores y algunas características nuevas, incluyendo:

<ul>
  <li markdown="1" class="changelog-item">
  El método [`app.get()`](/{{ page.lang }}/4x/api.html#app.get) y el método [`app.set()`](/{{ page.lang }}/4x/api.html#app.set) ahora ignora las propiedades directamente en `Object.prototype` al obtener un valor de configuración.
  </li>

  <li markdown="1" class="changelog-item">
  The [`res.cookie()` method](/{{ page.lang }}/4x/api.html#res.cookie) now accepts a "priority" option to set the Priority attribute on the Set-Cookie response header.
  </li>

  <li markdown="1" class="changelog-item">
  The [`res.cookie()` method](/{{ page.lang }}/4x/api.html#res.cookie) now rejects an Invalid Date object provided as the "expires" option.
  </li>

  <li markdown="1" class="changelog-item">
  The [`res.cookie()` method](/{{ page.lang }}/4x/api.html#res.cookie) now works when `null` or `undefined` is explicitly provided as the "maxAge" argument.
  </li>

  <li markdown="1" class="changelog-item">
  Starting with this version, Express supports Node.js 18.x.
  </li>

  <li markdown="1" class="changelog-item">
  El método [`res.download()`](/{{ page.lang }}/4x/api.html#res.download) ahora acepta una opción "root" para que coincida con [`res.sendFile()`](/{{ page.lang }}/4x/api.html#res.sendFile).
  </li>

  <li markdown="1" class="changelog-item">
  The [`res.download()` method](/{{ page.lang }}/4x/api.html#res.download) can be supplied with an `options` object without providing a `filename` argument, simplifying calls when the default `filename` is desired.
  </li>

  <li markdown="1" class="changelog-item">
  El método [`res.format()`](/{{ page.lang }}/4x/api.html#res.format) ahora invoca el manejador "default" proporcionado con los mismos argumentos que los manejadores de tipos (`req`, `res`, y `next`).
  </li>

  <li markdown="1" class="changelog-item">
  The [`res.send()` method](/{{ page.lang }}/4x/api.html#res.send) will not attempt to send a response body when the response code is set to 205.
  </li>

  <li markdown="1" class="changelog-item">
  The default error handler will now remove certain response headers that will break the error response rendering, if they were set previously.
  </li>

  <li markdown="1" class="changelog-item">
  El código de estado 425 ahora está representado como el estándar "Demasiado Early" en lugar de "Colección desordenada".
  </li>
</ul>

Para una lista completa de cambios en esta versión, vea [History.md](https://github.com/expressjs/express/blob/master/History.md#4180--2022-04-25).

### 4.17.3 - Fecha de lanzamiento: 2022-02-16

{: id="4.17.3"}

La versión 4.17.3 incluye una corrección de error:

<ul>
  <li markdown="1" class="changelog-item">
  Actualizar a [qs module](https://www.npmjs.com/package/qs) para una solución alrededor del análisis de propiedades `__proto__.
  </li>
</ul>

Para una lista completa de cambios en esta versión, vea [History.md](https://github.com/expressjs/express/blob/master/History.md#4173--2022-02-16).

### 4.17.2 - Fecha de lanzamiento: 2021-12-16

{: id="4.17.2"}

La versión 4.17.2 incluye las siguientes correcciones de errores:

<ul>
  <li markdown="1" class="changelog-item">
  Corregir el manejo de `undefined` en `res.jsonp` cuando se proporciona un callback.
  </li>

  <li markdown="1" class="changelog-item">
  Corregir el manejo de `undefined` en `res.json` y `res.jsonp` cuando `"json escape"` está habilitado.
  </li>

  <li markdown="1" class="changelog-item">
  Arregla el manejo de valores inválidos a la opción `maxAge` de `res.cookie()`.
  </li>

  <li markdown="1" class="changelog-item">
  Actualizar a [jshttp/proxy-addr module](https://www.npmjs.com/package/proxy-addr) para usar `req.socket` sobre `req.connection`.
  </li>

  <li markdown="1" class="changelog-item">
  Starting with this version, Express supports Node.js 14.x.
  </li>

</ul>

Para una lista completa de cambios en esta versión, vea [History.md](https://github.com/expressjs/express/blob/master/History.md#4172--2021-12-16).

### 4.17.1 - Fecha de lanzamiento: 2019-05-25

{: id="4.17.1"}

La versión 4.17.1 incluye una corrección de error:

<ul>
  <li markdown="1" class="changelog-item">
  The change to the `res.status()` API has been reverted due to causing regressions in existing Express 4 applications.
  </li>
</ul>

Para una lista completa de cambios en esta versión, vea [History.md](https://github.com/expressjs/express/blob/master/History.md#4171--2019-05-25).

### 4.17.0 - Fecha de lanzamiento: 2019-05-16

{: id="4.17.0"}

La versión menor 4.17.0 incluye correcciones de errores y algunas características nuevas, incluyendo:

<ul>
  <li markdown="1" class="changelog-item">
  El middleware `express.raw()` y `express.text()` han sido añadidos para proporcionar análisis de cuerpo de solicitud para más carga útil de peticiones. Esto utiliza el [módulo expressjs/body-parser](https://www.npmjs.com/package/body-parser) debajo, así que las aplicaciones que actualmente requieren el módulo por separado pueden cambiar a los analizadores incorporados.
  </li>

  <li markdown="1" class="changelog-item">
  The `res.cookie()` API now supports the `"none"` value for the `sameSite` option.
  </li>

  <li markdown="1" class="changelog-item">
  When the `"trust proxy"` setting is enabled, the `req.hostname` now supports multiple `X-Forwarded-For` headers in a request.
  </li>

  <li markdown="1" class="changelog-item">
  Starting with this version, Express supports Node.js 10.x and 12.x.
  </li>

  <li markdown="1" class="changelog-item">
  The `res.sendFile()` API now provides and more immediate and easier to understand error when a non-string is passed as the `path` argument.
  </li>

  <li markdown="1" class="changelog-item">
  The `res.status()` API now provides and more immediate and easier to understand error when `null` or `undefined` is passed as the argument.
  </li>
</ul>

Para una lista completa de cambios en esta versión, vea [History.md](https://github.com/expressjs/express/blob/master/History.md#4170--2019-05-16).

### 4.16.4 - Fecha de publicación: 2018-10-10

{: id="4.16.4"}

La versión 4.16.4 incluye varias correcciones de errores:

<ul>
  <li markdown="1" class="changelog-item">
  Fix issue where `"Request aborted"` may be logged in `res.sendfile`.
  </li>
</ul>

Para una lista completa de cambios en esta versión, vea [History.md](https://github.com/expressjs/express/blob/master/History.md#4164--2018-10-10).

### 4.16.3 - Fecha de publicación: 2018-03-12

{: id="4.16.3"}

La versión 4.16.3 incluye varias correcciones de errores:

<ul>
  <li markdown="1" class="changelog-item">
  Corregir la incidencia donde un simple `%` al final de la url en los `res. el método ocation` o el método `res.redirect` no se codificaría como `%25`.
  </li>

  <li markdown="1" class="changelog-item">
  Corregir problema donde un valor en blanco `req.url` puede resultar en un error arrojado dentro del manejo predeterminado 404.
  </li>

  <li markdown="1" class="changelog-item">
  Fix the generated HTML document for `express.static` redirect responses to properly include `</html>`.
  </li>
</ul>

Para una lista completa de cambios en esta versión, vea [History.md](https://github.com/expressjs/express/blob/master/History.md#4163--2018-03-12).

### 4.16.2 - Fecha de publicación: 2017-10-09

{: id="4.16.2"}

La versión 4.16.2 incluye una corrección de errores de regresión:

<ul>
  <li markdown="1" class="changelog-item">
  Repara un `TypeError` que puede ocurrir en el método `res.send` cuando un `Buffer` es pasado a `res. end` y la cabecera `ETag` ya está establecida en la respuesta.
  </li>
</ul>

Para una lista completa de cambios en esta versión, vea [History.md](https://github.com/expressjs/express/blob/master/History.md#4162--2017-10-09).

### 4.16.1 - Fecha de publicación: 2017-09-29

{: id="4.16.1"}

La versión 4.16.1 incluye una corrección de errores de regresión:

<ul>
  <li markdown="1" class="changelog-item">
  Actualizar a [pillarjs/send module](https://www.npmjs.com/package/send) para corregir una regresión de caso extremo que afectó a ciertos usuarios de `express.static`.
  </li>
</ul>

Para una lista completa de cambios en esta versión, vea [History.md](https://github.com/expressjs/express/blob/master/History.md#4161--2017-09-29).

### 4.16.0 - Fecha de publicación: 2017-09-28

{: id="4.16.0"}

La versión menor 4.16.0 incluye actualizaciones de seguridad, correcciones de errores, mejoras de rendimiento y algunas características nuevas, incluyendo:

<ul>
  <li markdown="1" class="changelog-item">
  Actualizar a [jshttp/forwived module](https://www.npmjs.com/package/forwarded) para direccionar un [vulnerability](https://npmjs.com/advisories/527). Esto puede afectar a su aplicación si se utilizan las siguientes API: `req.host`, `req.hostname`, `req.ip`, `req.ips`, `req.protocol`.
  </li>

  <li markdown="1" class="changelog-item">
  Actualizar una dependencia del [pillarjs/send module](https://www.npmjs.com/package/send) para dirigir una [vulnerability](https://npmjs.com/advisories/535) en la dependencia `mime`. Esto puede afectar a su aplicación si la entrada de cadena no confiable es pasada a las siguientes APIs: `res.type()`.
  </li>

  <li markdown="1" class="changelog-item">
  El [pilar / módulo de envío](https://www.npmjs.com/package/send) ha implementado una protección contra el Node.js 8.5.0 [vulnerability](https://nodejs.org/en/blog/vulnerability/september-2017-path-validation/). Utilizar cualquier versión anterior de Express con Node.js 8.5.0 (esa versión específica de Node.js) hará que las siguientes APIs sean vulnerables: `express.static`, `res.sendfile`, y `res.sendFile`.
  </li>

  <li markdown="1" class="changelog-item">
  Starting with this version, Express supports Node.js 8.x.
  </li>

  <li markdown="1" class="changelog-item">
  La nueva configuración `"json escape"` puede ser habilitada para escapar caracteres en `res.json()`, `res.jsonp()` y `res. end()` respuestas que pueden provocar que los clientes sniff la respuesta como HTML en lugar de honrar el `Content-Type`. Esto puede ayudar a proteger una aplicación Express de una clase de ataques persistentes basados en XSS.
  </li>

  <li markdown="1" class="changelog-item">
  El método [`res.download()`](/{{ page.lang }}/4x/api.html#res.download) ahora acepta un objeto opcional `options`.
  </li>

  <li markdown="1" class="changelog-item">
  El middleware `express.json()` y `express.urlencoded()` han sido añadidos para proporcionar el soporte de análisis del cuerpo de solicitud fuera de la caja. Esto utiliza el [módulo expressjs/body-parser](https://www.npmjs.com/package/body-parser) debajo, así que las aplicaciones que actualmente requieren el módulo por separado pueden cambiar a los analizadores incorporados.
  </li>

  <li markdown="1" class="changelog-item">
  El [`express.static()` middleware](/{{ page.lang }}/4x/api.html#express.static) y el [método `res.sendFile()`](/{{ page.lang }}/4x/api.html#res.sendFile) ahora soportan establecer la directiva `immutable` en la cabecera `Cache-Control`. Configurar esta cabecera con un `maxAge` apropiado evitará que los navegadores web envíen cualquier petición al servidor cuando el archivo esté todavía en su caché.
  </li>

  <li markdown="1" class="changelog-item">
  El [pilar / módulo de envío](https://www.npmjs.com/package/send) tiene una lista actualizada de tipos MIME para establecer mejor el `Content-Type` de más archivos. Hay 70 nuevos tipos para las extensiones de archivo.
  </li>
</ul>

Para una lista completa de cambios en esta versión, vea [History.md](https://github.com/expressjs/express/blob/master/History.md#4160--2017-09-28).

### 4.15.5 - Fecha de publicación: 2017-09-24

{: id="4.15.5"}

La versión 4.15.5 incluye actualizaciones de seguridad, algunas mejoras de rendimiento menores, y una corrección de errores:

<ul>
  <li markdown="1" class="changelog-item">
  Actualizar a [módulo de depuración](https://www.npmjs.com/package/debug) para dirigir un [vulnerability](https://snyk.io/vuln/npm:debug:20170905), pero este problema no afecta a Express.
  </li>

  <li markdown="1" class="changelog-item">
  Actualizar a [jshttp/fresh module](https://www.npmjs.com/package/fresh) para direccionar un [vulnerability](https://npmjs.com/advisories/526). Esto afectará a tu aplicación si se utilizan las siguientes API: `express.static`, `req.fresh`, `res.json`, `res.jsonp`, `res.send`, `res.sendfile` `res.sendFile`, `res.sendStatus`.
  </li>

  <li markdown="1" class="changelog-item">
  Actualizar a [jshttp/fresh module](https://www.npmjs.com/package/fresh) corrige el manejo de cabeceras modificadas con fechas no válidas y hace que el análisis de encabezados condicionales (como `If-None-Match`) sea más rápido.
  </li>
</ul>

Para una lista completa de cambios en esta versión, vea [History.md](https://github.com/expressjs/express/blob/master/History.md#4155--2017-09-24).

### 4.15.4 - Fecha de lanzamiento: 2017-08-06

{: id="4.15.4"}

La versión 4.15.4 incluye algunas correcciones de errores menores:

<ul>
  <li markdown="1" class="changelog-item">
  Corregir array siendo establecido para el valor `"proxy de confianza"` siendo manipulado en ciertas condiciones.
  </li>
</ul>

Para una lista completa de cambios en esta versión, vea [History.md](https://github.com/expressjs/express/blob/master/History.md#4154--2017-08-06).

### 4.15.3 - Fecha de publicación: 2017-05-16

{: id="4.15.3"}

La versión 4.15.3 incluye una actualización de seguridad y algunas correcciones de errores menores:

<ul>
  <li markdown="1" class="changelog-item">
  Actualizar una dependencia del [pillarjs/send module](https://www.npmjs.com/package/send) para dirigir un [vulnerability](https://snyk.io/vuln/npm:ms:20170412). Esto puede afectar a tu aplicación si la entrada de cadena no confiable es pasada a la opción `maxAge` en las siguientes APIs: `express.static`, `res.sendfile`, y `res.sendFile`.
  </li>

  <li markdown="1" class="changelog-item">
  Fix error when `res.set` cannot add charset to `Content-Type`.
  </li>

  <li markdown="1" class="changelog-item">
  Corregir `</html>` en documento HTML.
  </li>
</ul>

Para una lista completa de cambios en esta versión, vea [History.md](https://github.com/expressjs/express/blob/master/History.md#4153--2017-05-16).

### 4.15.2 - Fecha de publicación: 2017-03-06

{: id="4.15.2"}

La versión 4.15.2 incluye una corrección de errores menor:

<ul>
  <li markdown="1" class="changelog-item">
  Corregir las claves de análisis de regresión comenzando con `[` en el analizador de consulta extendido.
  </li>
</ul>

Para una lista completa de cambios en esta versión, vea [History.md](https://github.com/expressjs/express/blob/master/History.md#4152--2017-03-06).

### 4.15.1 - Fecha de publicación: 2017-03-05

{: id="4.15.1"}

La versión 4.15.1 incluye una corrección de errores menor:

<ul>
  <li markdown="1" class="changelog-item">
  Fix compatibility issue when using the datejs 1.x library where the [`express.static()` middleware](/{{ page.lang }}/4x/api.html#express.static) and [`res.sendFile()` method](/{{ page.lang }}/4x/api.html#res.sendFile) would incorrectly respond with 412 Precondition Failed.
  </li>
</ul>

Para una lista completa de cambios en esta versión, vea [History.md](https://github.com/expressjs/express/blob/master/History.md#4151--2017-03-05).

### 4.15.0 - Fecha de publicación: 2017-03-01

{: id="4.15.0"}

La versión menor 4.15.0 incluye correcciones de errores, mejoras de rendimiento y otras características menores, incluyendo:

<ul>
  <li markdown="1" class="changelog-item">
  Starting with this version, Express supports Node.js 7.x.
  </li>

  <li markdown="1" class="changelog-item">
  El middleware [`express.static()`](/{{ page.lang }}/4x/api.html#express.static) y el método [`res.sendFile()`](/{{ page.lang }}/4x/api.html#res.sendFile) ahora soportan las cabeceras de solicitud `If-Match` y `If-Unmodified-Since`.
  </li>

  <li markdown="1" class="changelog-item">
  Actualizar a [jshttp/etag module](https://www.npmjs.com/package/etag) para generar los ETags predeterminados para las respuestas que funcionan cuando Node.js tiene [FIPS habilitado cripto](https://nodejs.org/dist/latest/docs/api/cli.html#cli_enable_fips).
  </li>

  <li markdown="1" class="changelog-item">
  Varias respuestas HTML autogeneradas como el predeterminado no encontrado y los manejadores de errores responderán con documentos completos de HTML 5 y encabezados de seguridad adicionales.
  </li>
</ul>

Para una lista completa de cambios en esta versión, vea [History.md](https://github.com/expressjs/express/blob/master/History.md#4150--2017-03-01).

### 4.14.1 - Fecha de publicación: 2017-01-28

{: id="4.14.1"}

La versión 4.14.1 incluye correcciones de errores y mejoras de rendimiento, incluyendo:

<ul>
  <li markdown="1" class="changelog-item">
  Update to [pillarjs/finalhandler module](https://www.npmjs.com/package/finalhandler) fixes an exception when Express handles an `Error` object which has a `headers` property that is not an object.
  </li>
</ul>

Para una lista completa de cambios en esta versión, vea [History.md](https://github.com/expressjs/express/blob/master/History.md#4141--2017-01-28).

### 4.14.0 - Fecha de publicación: 2016-06-16

{: id="4.14.0"}

La versión menor 4.14.0 incluye correcciones de errores, actualización de seguridad, mejoras de rendimiento y otras características menores, incluyendo:

<ul>
  <li markdown="1" class="changelog-item">
  Starting with this version, Express supports Node.js 6.x.
  </li>

  <li markdown="1" class="changelog-item">
  Actualizar a [jshttp/negotiator module](https://www.npmjs.com/package/negotiator) corrige una [vulnerabilidad de denegación de servicio de expresión regular](https://npmjs.com/advisories/106).
  </li>

  <li markdown="1" class="changelog-item">
  El método [`res.sendFile()`](/{{ page.lang }}/4x/api.html#res.sendFile) ahora acepta dos nuevas opciones: `acceptRanges` y `cacheControl`.

- `acceptRanges` (por defecto es `true`), habilita o deshabilita aceptar solicitudes a distancia. Cuando está deshabilitada, la respuesta no envía la cabecera `Accept-Ranges` e ignora el contenido de la cabecera de solicitud `Range`.

- `cacheControl`, (por defecto es `true`), habilita o desactiva la cabecera de respuesta `Cache-Control`. Desactivarlo ignorará la opción `maxAge`.

- `res.sendFile` también ha sido actualizado para manejar la cabecera `Range` y redirecciones mejor.

  </li>

  <li markdown="1" class="changelog-item">
  El método [`res.location()`](/{{ page.lang }}/4x/api.html#res.location) y el método [`res.redirect()`](/{{ page.lang }}/4x/api.html#res.redirect) ahora codificará la cadena URL, si aún no está codificada.
  </li>

  <li markdown="1" class="changelog-item">
  The performance of the [`res.json()` method](/{{ page.lang }}/4x/api.html#res.json) and [`res.jsonp()` method](/{{ page.lang }}/4x/api.html#res.jsonp) have been improved in the common cases.
  </li>

  <li markdown="1" class="changelog-item">
  The [jshttp/cookie module](https://www.npmjs.com/package/cookie) (in addition to a number of other improvements) has been updated and now the [`res.cookie()` method](/{{ page.lang }}/4x/api.html#res.cookie) supports the `sameSite` option to let you specify the [SameSite cookie attribute](https://tools.ietf.org/html/draft-west-first-party-cookies-07).  

{% include admonitions/note.html content="Este atributo aún no ha sido completamente estandarizado, puede cambiar en el futuro, y muchos clientes pueden ignorarlo." %}

El valor posible para la opción `sameSite` son:

- `true`, que establece el atributo `SameSite` a `Strict` para el mismo cumplimiento estricto del sitio.
- `false`, que no establece el atributo `SameSite`.
- `'lax'`, que establece el atributo `SameSite` a `Lax` para la aplicación laxa del mismo sitio.
- `'strict'`, que establece el atributo `SameSite` a `Strict` para estricto cumplimiento del mismo sitio.

  </li>

  <li markdown="1" class="changelog-item">
  Absolute path checking on Windows, which was incorrect for some cases, has been fixed.
  </li>

  <li markdown="1" class="changelog-item">
  IP address resolution with proxies has been greatly improved.
  </li>

  <li markdown="1" class="changelog-item">
  The [`req.range()` method](/{{ page.lang }}/4x/api.html#req.range) options object now supports a `combine` option (`false` by default), which when `true`, combines overlapping and adjacent ranges and returns them as if they were specified that way in the header.
  </li>
</ul>

Para una lista completa de cambios en esta versión, vea [History.md](https://github.com/expressjs/express/blob/master/History.md#4140--2016-06-16).

</div>
