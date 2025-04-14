---
layout: página
title: Escritura de middleware para su uso en aplicaciones Express
description: Aprenda cómo escribir funciones personalizadas de middleware para aplicaciones Express.js, incluyendo ejemplos y mejores prácticas para mejorar la gestión de peticiones y respuestas.
menu: guía
lang: es
redirect_from: /es/guide/writing-middleware.html
---

# Escritura de middleware para su uso en aplicaciones Express

<h2>Resumen</h2>

Las funciones de _middleware_ son funciones que tienen acceso al [objeto de solicitud](/{{ page.lang }}/4x/api.html#req) (`req`), al [objeto de respuesta](/{{ page.lang }}/4x/api.html#res) (`res`) y a la siguiente función de middleware en el ciclo de solicitud/respuestas de la aplicación. La siguiente función de middleware se denota normalmente con una variable denominada `next`.

Las funciones de middleware pueden realizar las siguientes tareas:

- Ejecutar cualquier código.
- Realizar cambios en la solicitud y los objetos de respuesta.
- Finalizar el ciclo de solicitud/respuestas.
- Invocar el siguiente middleware en la pila.

Si la función de middleware actual no finaliza el ciclo de solicitud/respuestas, debe invocar `next()` para pasar el control a la siguiente función de middleware. De lo contrario, la solicitud quedará colgada.

El siguiente ejemplo muestra los elementos de una llamada a función de middleware:

<table id="mw-fig">
<tbody><tr><td id="mw-fig-imgcell">
<img src="/images/express-mw.png" alt="Elements of a middleware function call" id="mw-fig-img" />
</td>
<td class="mw-fig-callouts">
<div class="callout" id="callout1">Método HTTP para el que se aplica la función de middleware.</div></tbody>

<div class="callout" id="callout2">Vía de acceso (ruta) para la que se aplica la función de middleware.</div>

<div class="callout" id="callout3">La función de middleware.</div>

<div class="callout" id="callout4">Argumento de devolución de llamada a la función de middleware, denominado "next" por convención.</div>

<div class="callout" id="callout5">Argumento de <a href="../4x/api.html#res">respuesta</a> HTTP a la función de middleware, denominado "res" por convención.</div>

<div class="callout" id="callout6">Argumento de <a href="../4x/api.html#req">solicitud</a> HTTP a la función de middleware, denominado "req" por convención.</div>
</td></tr>
</table>

A partir de Express 5, las funciones de middleware que devuelven una Promise llamarán `next(value)` cuando rechacen o lancen un error. `next` será llamado con el valor rechazado o con el error arrojado.

<h2>Ejemplo</h2>

A continuación, se muestra un ejemplo de una aplicación Express simple, "Hello World", para la que definirá dos funciones de middleware:
El resto de este artículo definirá y añadirá tres funciones de middleware a la aplicación:
una llamada `myLogger` que imprime un simple mensaje de registro, uno llamado `requestTime` que
muestra la marca de tiempo de la petición HTTP, y uno llamado `validateCookies` que valida las cookies entrantes.

```js
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('¡Hola Mundo!')
})

app.listen(3000)
```

<h3>Función Middleware myLogger</h3>
Este es un ejemplo simple de una función de middleware denominada "myLogger". Esta función simplemente imprime "LOGGED" cuando una solicitud de la aplicación pasa por ella. La función de middleware se asigna a una variable denominada `myLogger`.

```js
const myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}
```

<div class="doc-box doc-notice" markdown="1">
Observe la llamada anterior a `next()`. La llamada a esta función invoca la siguiente función de middleware en la aplicación.
La función `next()` no forma parte de la API de Express o Node.js, pero es el tercer argumento que se pasa a la función de middleware. La función `next()` puede tener cualquier nombre, pero por convención siempre se denomina "next".
Para evitar confusiones, utilice siempre esta convención.
</div>

Para cargar la función de middleware, llame a `app.use()`, especificando la función de middleware.
Por ejemplo, el siguiente código carga la función de middleware `myLogger` antes de la ruta a la vía de acceso raíz (/).

```js
const express = require('express')
const app = express()

const myLogger = function (req, res, next) {
  consola. og('LOGGED')
  next()
}

app.use(myLogger)

app.get('/', (req, res) => {
  res.send('¡Hola Mundo!')
})

app.listen(3000)
```

Cada vez que la aplicación recibe una solicitud, imprime el mensaje "LOGGED" en el terminal.

El orden de carga del middleware es importante: las funciones de middleware que se cargan primero también se ejecutan primero.

Si `myLogger` se carga después de la ruta a la vía de acceso raíz, la solicitud nunca la alcanza y la aplicación no imprime "LOGGED", ya que el manejador de rutas de la vía de acceso raíz determina el ciclo de solicitud/respuestas.

La función de middleware `myLogger` simplemente imprime un mensaje y, a continuación, pasa la solicitud a la siguiente función de middleware de la pila llamando a la función `next()`.

<h3>Tiempo de solicitud de la función Middleware</h3>

El siguiente ejemplo añade una propiedad denominada `requestTime` al objeto de solicitud. Llamaremos a esta función de middleware "requestTime".

```js
const requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}
```

La aplicación ahora utiliza la función de middleware `requestTime`. Asimismo, la función de devolución de llamada de la ruta de vía de acceso raíz utiliza la propiedad que la función de middleware añade a `req` (el objeto de solicitud).

```js
const express = require('express')
const app = express()

const requestTime = function (req, res, next) {
  req. equestTime = Date.now()
  next()
}

app.use(requestTime)

app. et('/', (req, res) => {
  let responseText = '¡Hola Mundo!<br>'
  responseText += `<small>Solicitado en: ${req.requestTime}</small>`
  res. end(responseText)
})

app.listen(3000)
```

Cuando realiza una solicitud a la raíz de la aplicación, la aplicación ahora muestra la indicación de fecha y hora de la solicitud en el navegador.

<h3>Función Middleware validateCookies</h3>

Finalmente, crearemos una función de middleware que valida las cookies entrantes y envía una respuesta 400 si las cookies no son válidas.

Aquí hay una función de ejemplo que valida las cookies con un servicio externo asíncrono.

```js
async function cookieValidator (cookies) {
  try {
    await externallyValidateCookie(cookies.testCookie)
  } catch {
    throw new Error('Invalid cookies')
  }
}
```

Aquí usamos el [`cookie-parser`](/resources/middleware/cookie-parser.html) middleware para analizar las cookies entrantes del objeto `req` y pasarlas a nuestra función `cookieValidator`. El middleware `validateCookies` devuelve una Promesa que al rechazar activará automáticamente nuestro gestor de errores.

```js
const express = require('express')
const cookieParser = require('cookie-parser')
const cookieValidator = require('. cookieValidator')

const app = express()

async function validateCookies (req, res, next) {
  await cookieValidator(req. ookies)
  next()
}

app.use(cookieParser())

app.use(validateCookies)

// manejador de errores
app. se((err, req, res, next) => {
  res.status(400).send(err.message)
})

app.listen(3000)
```

<div class="doc-box doc-notice" markdown="1">
Observe cómo `next()` es llamado después de `await cookieValidator(req.cookies)`. Esto asegura que si `cookieValidator` resuelve, se llamará al siguiente middleware en la pila. Si pasas algo a la función `next()` (excepto la cadena `'route'` o `'router'`), Expresar considera que la solicitud actual es un error y se saltará cualquier función de ruteo y middleware que quede sin errores.
</div>

Como tiene acceso al objeto de solicitud, el objeto de respuesta, la siguiente función de middleware de la pila y toda la API de Node.js, las posibilidades con las funciones de middleware son ilimitadas.

Para obtener más información sobre el middleware de Express, consulte: [Utilización del middleware de Express](/{{ page.lang }}/guide/using-middleware.html).

<h2>Middleware configurable</h2>

Si necesita que su middleware sea configurable, exporte una función que acepte un objeto de opciones u otros parámetros, , que luego devuelve la implementación de middleware basada en los parámetros de entrada.

Archivo: `my-middleware.js`

```js
módulo. xports = function (options) {
  return function (req, res, next) {
    // Implementar la función middleware basada en el objeto de opciones
    next()
  }
}
```

El middleware ahora puede ser usado como se muestra a continuación.

```js
const mw = require('./my-middleware.js')

app.use(mw({ option1: '1', option2: '2' }))
```

Consulte [cookie-session](https://github.com/expressjs/cookie-session) y [compression](https://github.com/expressjs/compression) para ver ejemplos de middleware configurable.
