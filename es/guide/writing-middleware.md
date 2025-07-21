---
layout: page
title: Escritura de middleware para su uso en aplicaciones Express
description: Learn how to write custom middleware functions for Express.js applications, including examples and best practices for enhancing request and response handling.
menu: guide
redirect_from: "  "
---

# Escritura de middleware para su uso en aplicaciones Express

<h2>Overview</h2>

Las funciones de _middleware_ son funciones que tienen acceso al [objeto de solicitud](/{{ page.lang }}/4x/api.html#req) (`req`), al [objeto de respuesta](/{{ page.lang }}/4x/api.html#res) (`res`) y a la siguiente función de middleware en el ciclo de solicitud/respuestas de la aplicación. La siguiente función de middleware se denota normalmente con una variable denominada `next`.

Las funciones de middleware pueden realizar las siguientes tareas:

- Execute any code.
- Realizar cambios en la solicitud y los objetos de respuesta.
- Finalizar el ciclo de solicitud/respuestas.
- Invocar el siguiente middleware en la pila.

Si la función de middleware actual no finaliza el ciclo de solicitud/respuestas, debe invocar `next()` para pasar el control a la siguiente función de middleware. Otherwise, the request will be left hanging.

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

Starting with Express 5, middleware functions that return a Promise will call `next(value)` when they reject or throw an error. `next` will be called with either the rejected value or the thrown Error.

<h2><a name="redis"></a></h2>

A continuación, se muestra un ejemplo de una aplicación Express simple, "Hello World", para la que definirá dos funciones de middleware:
The remainder of this article will define and add three middleware functions to the application:
one called `myLogger` that prints a simple log message, one called `requestTime` that
displays the timestamp of the HTTP request, and one called `validateCookies` that validates incoming cookies.

```js
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000)
```

<h3>Middleware function myLogger</h3>
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
  console.log('LOGGED')
  next()
}

app.use(myLogger)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000)
```

Every time the app receives a request, it prints the message "LOGGED" to the terminal.

El orden de carga del middleware es importante: las funciones de middleware que se cargan primero también se ejecutan primero.

Si `myLogger` se carga después de la ruta a la vía de acceso raíz, la solicitud nunca la alcanza y la aplicación no imprime "LOGGED", ya que el manejador de rutas de la vía de acceso raíz determina el ciclo de solicitud/respuestas.

La función de middleware `myLogger` simplemente imprime un mensaje y, a continuación, pasa la solicitud a la siguiente función de middleware de la pila llamando a la función `next()`.

<h3>Middleware function requestTime</h3>

El siguiente ejemplo añade una propiedad denominada `requestTime` al objeto de solicitud. Llamaremos a esta función de middleware "requestTime".

```js
const requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}
```

The app now uses the `requestTime` middleware function. Asimismo, la función de devolución de llamada de la ruta de vía de acceso raíz utiliza la propiedad que la función de middleware añade a `req` (el objeto de solicitud).

```js
const express = require('express')
const app = express()

const requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}

app.use(requestTime)

app.get('/', (req, res) => {
  let responseText = 'Hello World!<br>'
  responseText += `<small>Requested at: ${req.requestTime}</small>`
  res.send(responseText)
})

app.listen(3000)
```

Cuando realiza una solicitud a la raíz de la aplicación, la aplicación ahora muestra la indicación de fecha y hora de la solicitud en el navegador.

<h3>Middleware function validateCookies</h3>

Finally, we'll create a middleware function that validates incoming cookies and sends a 400 response if cookies are invalid.

Here's an example function that validates cookies with an external async service.

```js
async function cookieValidator (cookies) {
  try {
    await externallyValidateCookie(cookies.testCookie)
  } catch {
    throw new Error('Invalid cookies')
  }
}
```

Here, we use the [`cookie-parser`](/resources/middleware/cookie-parser.html) middleware to parse incoming cookies off the `req` object and pass them to our `cookieValidator` function. The `validateCookies` middleware returns a Promise that upon rejection will automatically trigger our error handler.

```js
const express = require('express')
const cookieParser = require('cookie-parser')
const cookieValidator = require('./cookieValidator')

const app = express()

async function validateCookies (req, res, next) {
  await cookieValidator(req.cookies)
  next()
}

app.use(cookieParser())

app.use(validateCookies)

// error handler
app.use((err, req, res, next) => {
  res.status(400).send(err.message)
})

app.listen(3000)
```

<div class="doc-box doc-notice" markdown="1">
Note how `next()` is called after `await cookieValidator(req.cookies)`. This ensures that if `cookieValidator` resolves, the next middleware in the stack will get called. If you pass anything to the `next()` function (except the string `'route'` or `'router'`), Express regards the current request as being an error and will skip any remaining non-error handling routing and middleware functions.
</div>

Como tiene acceso al objeto de solicitud, el objeto de respuesta, la siguiente función de middleware de la pila y toda la API de Node.js, las posibilidades con las funciones de middleware son ilimitadas.

Para obtener más información sobre el middleware de Express, consulte: [Utilización del middleware de Express](/{{ page.lang }}/guide/using-middleware.html).

<h2>Configurable middleware</h2>

If you need your middleware to be configurable, export a function which accepts an options object or other parameters, which, then returns the middleware implementation based on the input parameters.

File: `my-middleware.js`

```js
module.exports = function (options) {
  return function (req, res, next) {
    // Implement the middleware function based on the options object
    next()
  }
}
```

The middleware can now be used as shown below.

```js
const mw = require('./my-middleware.js')

app.use(mw({ option1: '1', option2: '2' }))
```

Refer to [cookie-session](https://github.com/expressjs/cookie-session) and [compression](https://github.com/expressjs/compression) for examples of configurable middleware.
