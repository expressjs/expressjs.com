---
layout: page
title: Utilización del middleware de Express
description: Learn how to use middleware in Express.js applications, including application-level and router-level middleware, error handling, and integrating third-party middleware.
menu: guide
lang: en
redirect_from: "  "
---

# Utilización del middleware

Express es una infraestructura web de direccionamiento y middleware que tiene una funcionalidad mínima propia: una aplicación Express es fundamentalmente una serie de llamadas a funciones de middleware.

Las funciones de _middleware_ son funciones que tienen acceso al [objeto de solicitud](/{{ page.lang }}/4x/api.html#req) (`req`), al [objeto de respuesta](/{{ page.lang }}/4x/api.html#res) (`res`) y a la siguiente función de middleware en el ciclo de solicitud/respuestas de la aplicación. La siguiente función de middleware se denota normalmente con una variable denominada `next`.

Las funciones de middleware pueden realizar las siguientes tareas:

- Execute any code.
- Realizar cambios en la solicitud y los objetos de respuesta.
- Finalizar el ciclo de solicitud/respuestas.
- Invocar la siguiente función de middleware en la pila.

Si la función de middleware actual no finaliza el ciclo de solicitud/respuestas, debe invocar `next()` para pasar el control a la siguiente función de middleware. Otherwise, the request will be left hanging.

An Express application can use the following types of middleware:

- [Application-level middleware](#middleware.application)
- [Middleware de nivel de direccionador](#middleware.router)
- [Error-handling middleware](#middleware.error-handling)
- [Built-in middleware](#middleware.built-in)
- [Third-party middleware](#middleware.third-party)

Puede cargar middleware de nivel de aplicación y de nivel de direccionador con una vía de acceso de montaje opcional.
También puede cargar una serie de funciones de middleware a la vez, lo que crea una subpila del sistema de middleware en un punto de montaje.

<h2 id='middleware.application'>Application-level middleware</h2>

Enlace el middleware de nivel de aplicación a una instancia del [objeto de aplicación](/{{ page.lang }}/4x/api.html#app) utilizando las funciones `app.use()` y `app.METHOD()`, donde `METHOD` es el método HTTP de la solicitud que maneja la función de middleware (por ejemplo, GET, PUT o POST) en minúsculas.

Este ejemplo muestra una función de middleware sin ninguna vía de acceso de montaje. The function is executed every time the app receives a request.

```js
const express = require('express')
const app = express()

app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})
```

Este ejemplo muestra una función de middleware montada en la vía de acceso `/user/:id`. La función se ejecuta para cualquier tipo de solicitud HTTP en la vía de acceso `/user/:id`.

```js
app.use('/user/:id', (req, res, next) => {
  console.log('Request Type:', req.method)
  next()
})
```

Este ejemplo muestra una ruta y su función de manejador (sistema de middleware). La función maneja las solicitudes GET a la vía de acceso `/user/:id`.

```js
app.get('/user/:id', (req, res, next) => {
  res.send('USER')
})
```

A continuación, se muestra un ejemplo de carga de una serie de funciones de middleware en un punto de montaje, con una vía de acceso de montaje.
Ilustra una subpila de middleware que imprime información de solicitud para cualquier tipo de solicitud HTTP en la vía de acceso `/user/:id`.

```js
app.use('/user/:id', (req, res, next) => {
  console.log('Request URL:', req.originalUrl)
  next()
}, (req, res, next) => {
  console.log('Request Type:', req.method)
  next()
})
```

Los manejadores de rutas permiten definir varias rutas para una vía de acceso. El ejemplo siguiente define dos rutas para las solicitudes GET a la vía de acceso `/user/:id`. La segunda ruta no dará ningún problema, pero nunca se invocará, ya que la primera ruta finaliza el ciclo de solicitud/respuestas.

Este ejemplo muestra una subpila de middleware que maneja solicitudes GET a la vía de acceso `/user/:id`.

```js
app.get('/user/:id', (req, res, next) => {
  console.log('ID:', req.params.id)
  next()
}, (req, res, next) => {
  res.send('User Info')
})

// handler for the /user/:id path, which prints the user ID
app.get('/user/:id', (req, res, next) => {
  res.send(req.params.id)
})
```

Para omitir el resto de las funciones de middleware de una pila de middleware de direccionador, invoque `next('route')` para pasar el control a la siguiente ruta.

{% capture next-function %}

`next('route')` will work only in middleware functions that were loaded by using the `app.METHOD()` or `router.METHOD()` functions.

{% endcapture %}

{% include admonitions/note.html content=next-function %}

Este ejemplo muestra una subpila de middleware que maneja solicitudes GET a la vía de acceso `/user/:id`.

```js
app.get('/user/:id', (req, res, next) => {
  // if the user ID is 0, skip to the next route
  if (req.params.id === '0') next('route')
  // otherwise pass the control to the next middleware function in this stack
  else next()
}, (req, res, next) => {
  // send a regular response
  res.send('regular')
})

// handler for the /user/:id path, which sends a special response
app.get('/user/:id', (req, res, next) => {
  res.send('special')
})
```

Middleware can also be declared in an array for reusability.

A continuación, se muestra un ejemplo de uso de la función de middleware `express.static` con un objeto de opciones elaboradas:

```js
function logOriginalUrl (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}

function logMethod (req, res, next) {
  console.log('Request Type:', req.method)
  next()
}

const logStuff = [logOriginalUrl, logMethod]
app.get('/user/:id', logStuff, (req, res, next) => {
  res.send('User Info')
})
```

<h2 id='middleware.router'>Middleware de nivel de direccionador</h2>

El middleware de nivel de direccionador funciona de la misma manera que el middleware de nivel de aplicación, excepto que está enlazado a una instancia de `express.Router()`.

```js
const router = express.Router()
```

Cargue el middleware de nivel de direccionador utilizando las funciones `router.use()` y `router.METHOD()`.

El siguiente código de ejemplo replica el sistema de middleware que se ha mostrado anteriormente para el middleware de nivel de aplicación, utilizando el middleware de nivel de direccionador:

```js
const express = require('express')
const app = express()
const router = express.Router()

// a middleware function with no mount path. This code is executed for every request to the router
router.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use('/user/:id', (req, res, next) => {
  console.log('Request URL:', req.originalUrl)
  next()
}, (req, res, next) => {
  console.log('Request Type:', req.method)
  next()
})

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get('/user/:id', (req, res, next) => {
  // if the user ID is 0, skip to the next router
  if (req.params.id === '0') next('route')
  // otherwise pass control to the next middleware function in this stack
  else next()
}, (req, res, next) => {
  // render a regular page
  res.render('regular')
})

// handler for the /user/:id path, which renders a special page
router.get('/user/:id', (req, res, next) => {
  console.log(req.params.id)
  res.render('special')
})

// mount the router on the app
app.use('/', router)
```

Para obtener más detalles sobre la función `serve-static` y sus opciones, consulte la documentación de [serve-static](https://github.com/expressjs/serve-static).

Este ejemplo muestra una subpila de middleware que maneja solicitudes GET a la vía de acceso `/user/:id`.

```js
const express = require('express')
const app = express()
const router = express.Router()

// predicate the router with a check and bail out when needed
router.use((req, res, next) => {
  if (!req.headers['x-auth']) return next('router')
  next()
})

router.get('/user/:id', (req, res) => {
  res.send('hello, user!')
})

// use the router and 401 anything falling through
app.use('/admin', router, (req, res) => {
  res.sendStatus(401)
})
```

<h2 id='middleware.error-handling'>Error-handling middleware</h2>

<div class="doc-box doc-notice" markdown="1">
El middleware de manejo de errores siempre utiliza *cuatro* argumentos. Debe proporcionar cuatro argumentos para identificarlo como una función de middleware de manejo de errores. Aunque no necesite utilizar el objeto `next`, debe especificarlo para mantener la firma. De lo contrario, el objeto `next` se interpretará como middleware normal y no podrá manejar errores.
</div>

Defina las funciones de middleware de manejo de errores de la misma forma que otras funciones de middleware, excepto con cuatro argumentos en lugar de tres, específicamente con la firma `(err, req, res, next)`:

```js
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

Para obtener detalles sobre el middleware de manejo de errores, consulte: [Manejo de errores](/{{ page.lang }}/guide/error-handling.html).

<h2 id='middleware.built-in'>Built-in middleware</h2>

Desde la versión 4.x, Express ya no depende de [Connect](https://github.com/senchalabs/connect). Excepto `express.static`, todas las funciones de middleware que se incluían previamente con Express están ahora en módulos diferentes. Consulte [la lista de funciones de middleware](https://github.com/senchalabs/connect#middleware).

La única función de middleware incorporado en Express es `express.static`.

- [express.static](/en/4x/api.html#express.static) serves static assets such as HTML files, images, and so on.
- [express.json](/en/4x/api.html#express.json) parses incoming requests with JSON payloads. **NOTE: Available with Express 4.16.0+**
- [express.urlencoded](/en/4x/api.html#express.urlencoded) parses incoming requests with URL-encoded payloads.  **NOTE: Available with Express 4.16.0+**

<h2 id='middleware.third-party'>Third-party middleware</h2>

Utilice el middleware de terceros para añadir funcionalidad a las aplicaciones Express.

Instale el módulo Node.js para la funcionalidad necesaria y cárguelo en la aplicación a nivel de aplicación o a nivel de direccionador.

El siguiente ejemplo ilustra la instalación y carga de la función de middleware de análisis de cookies `cookie-parser`.

```bash
$ npm install cookie-parser
```

```js
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

// load the cookie-parsing middleware
app.use(cookieParser())
```

Para ver una lista parcial de las funciones de middleware de terceros que más se utilizan con Express, consulte: [Middleware de terceros](../resources/middleware.html).
