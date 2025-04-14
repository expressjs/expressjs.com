---
layout: página
title: utilidades exprés
description: Descubra los módulos de utilidad relacionados con Express.js y Node.js, incluyendo herramientas para cookies, protección CSRF, análisis de URL, enrutamiento, y más para mejorar sus aplicaciones.
menu: recursos
lang: es
redirect_from: /resources/Budgetties.html
---

## Funciones de utilidad Express

La organización [pillarjs](https://github.com/pillarjs) de GitHub contiene varios módulos
para funciones de utilidad que pueden ser generalmente útiles.

| Módulos de utilidad                                            | Descripción                                                                                                                                                                                                                                       |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [cookies](https://www.npmjs.com/package/cookies)               | Obtener y configurar cookies HTTP(S) que se pueden firmar para evitar manipulaciones, usando Keygrip. Se puede usar con la librería HTTP de Node.js o como middleware Express. |
| [csrf](https://www.npmjs.com/package/csrf)                     | Contiene la lógica detrás de la creación y verificación de token CSRF.  Utilice este módulo para crear un middleware CSRF personalizado.                                                                          |
| [finalhandler](https://www.npmjs.com/package/finalhandler)     | Función para invocar como paso final para responder a la petición HTTP.                                                                                                                                                           |
| [parseurl](https://www.npmjs.com/package/parseurl)             | Analizar una URL con caché.                                                                                                                                                                                                       |
| [path-match](https://www.npmjs.com/package/path-match)         | Envoltura fina alrededor de [path-to-regexp](https://github.com/component/path-to-regexp) para facilitar la extracción de nombres de parámetros.                                                                                  |
| [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) | Convierte una cadena de ruta tipo Express-style como \`\`/user/:name\` en una expresión regular.                                                                                                                  |
| [resolve-path](https://www.npmjs.com/package/resolve-path)     | Resuelve una ruta relativa contra una ruta raíz con validación.                                                                                                                                                                   |
| [router](https://www.npmjs.com/package/router)                 | Enrutador simple de tipo middleware.                                                                                                                                                                                              |
| [routington](https://www.npmjs.com/package/routington)         | Enrutador de URL basado en pruebas para definir y coincidir con URLs.                                                                                                                                                             |
| [send](https://www.npmjs.com/package/send)                     | Biblioteca para streaming de archivos como respuesta HTTP, con soporte para respuestas parciales (rangos), negociación condicional-GET y eventos granulares.                                                   |
| [templation](https://www.npmjs.com/package/templation)         | Ver sistema similar a `res.render()` inspirado en [co-views](https://github.com/visionmedia/co-views) y [consolidate.js](https://github.com/visionmedia/consolidate.js/).                                         |

Para módulos adicionales relacionados con HTTP, consulte [jshttp](http://jshttp.github.io/).
