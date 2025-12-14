---
layout: page
title: Manejo de errores de Express
description: Understand how Express.js handles errors in synchronous and asynchronous code, and learn to implement custom error handling middleware for your applications.
menu: guide
order: 6
redirect_from: "  "
---

# Error Handling

_Error Handling_ refers to how Express catches and processes errors that
occur both synchronously and asynchronously. Express comes with a default error
handler so you don't need to write your own to get started.

## Catching Errors

It's important to ensure that Express catches all errors that occur while
running route handlers and middleware.

Errors that occur in synchronous code inside route handlers and middleware
require no extra work. If synchronous code throws an error, then Express will
catch and process it. For example:

```js
app.get('/', (req, res) => {
  throw new Error('BROKEN') // Express will catch this on its own.
})
```

Defina las funciones de middleware de manejo de errores de la misma forma que otras funciones de middleware, excepto que las funciones de manejo de errores tienen cuatro argumentos en lugar de tres: `(err, req, res, next)`.  For example:

```js
app.get('/', (req, res, next) => {
  fs.readFile('/file-does-not-exist', (err, data) => {
    if (err) {
      next(err) // Pass errors to Express.
    } else {
      res.send(data)
    }
  })
})
```

Si tiene un manejador de rutas con varias funciones de devolución de llamada, puede utilizar el parámetro `route` para omitir el siguiente manejador de rutas.
For example:

```js
app.get('/user/:id', async (req, res, next) => {
  const user = await getUserById(req.params.id)
  res.send(user)
})
```

If `getUserById` throws an error or rejects, `next` will be called with either
the thrown error or the rejected value. If no rejected value is provided, `next`
will be called with a default Error object provided by the Express router.

Si pasa cualquier valor a la función `next()` (excepto la serie `'route'`), Express considera que la solicitud actual tiene un error y omitirá las restantes funciones de middleware y direccionamiento que no son de manejo de errores.

If the callback in a sequence provides no data, only errors, you can simplify
this code as follows:

```js
app.get('/', [
  function (req, res, next) {
    fs.writeFile('/inaccessible-path', 'data', next)
  },
  function (req, res) {
    res.send('OK')
  }
])
```

In the above example, `next` is provided as the callback for `fs.writeFile`,
which is called with or without errors. If there is no error, the second
handler is executed, otherwise Express catches and processes the error.

You must catch errors that occur in asynchronous code invoked by route handlers or
middleware and pass them to Express for processing. For example:

```js
app.get('/', (req, res, next) => {
  setTimeout(() => {
    try {
      throw new Error('BROKEN')
    } catch (err) {
      next(err)
    }
  }, 100)
})
```

The above example uses a `try...catch` block to catch errors in the
asynchronous code and pass them to Express. If the `try...catch`
block were omitted, Express would not catch the error since it is not part of the synchronous
handler code.

Use promises to avoid the overhead of the `try...catch` block or when using functions
that return promises.  For example:

```js
app.get('/', (req, res, next) => {
  Promise.resolve().then(() => {
    throw new Error('BROKEN')
  }).catch(next) // Errors will be passed to Express.
})
```

Since promises automatically catch both synchronous errors and rejected promises,
you can simply provide `next` as the final catch handler and Express will catch errors,
because the catch handler is given the error as the first argument.

You could also use a chain of handlers to rely on synchronous error
catching, by reducing the asynchronous code to something trivial. For example:

```js
app.get('/', [
  function (req, res, next) {
    fs.readFile('/maybe-valid-file', 'utf-8', (err, data) => {
      res.locals.data = data
      next(err)
    })
  },
  function (req, res) {
    res.locals.data = res.locals.data.split(',')[1]
    res.send(res.locals.data)
  }
])
```

The above example has a couple of trivial statements from the `readFile`
call. If `readFile` causes an error, then it passes the error to Express, otherwise you
quickly return to the world of synchronous error handling in the next handler
in the chain. Then, the example above tries to process the data. If this fails, then the
synchronous error handler will catch it. If you had done this processing inside
the `readFile` callback, then the application might exit and the Express error
handlers would not run.

Whichever method you use, if you want Express error handlers to be called in and the
application to survive, you must ensure that Express receives the error.

## El manejador de errores predeterminado

Express se suministra con un manejador de errores incorporado, que se encarga de los errores que aparecen en la aplicación. Esta función de middleware de manejo de errores predeterminada se añade al final de la pila de funciones de middleware.

Si pasa un error a `next()` y no lo maneja en el manejador de errores, lo manejará el manejador de errores incorporado; el error se escribirá en el cliente con el seguimiento de la pila. El seguimiento de la pila no se incluye en el entorno de producción.

<div class="doc-box doc-info" markdown="1">
Establezca la variable de entorno `NODE_ENV` en `production`, para ejecutar la aplicación en modalidad de producción.
</div>

When an error is written, the following information is added to the
response:

- The `res.statusCode` is set from `err.status` (or `err.statusCode`). If
  this value is outside the 4xx or 5xx range, it will be set to 500.
- The `res.statusMessage` is set according to the status code.
- The body will be the HTML of the status code message when in production
  environment, otherwise will be `err.stack`.
- Any headers specified in an `err.headers` object.

Si invoca `next()` con un error después de haber empezado a escribir la respuesta (por ejemplo, si encuentra un error mientras se envía la respuesta en modalidad continua al cliente), el manejador de errores predeterminado de Express cierra la conexión y falla la solicitud.

Por lo tanto, cuando añade un manejador de errores personalizado, se recomienda delegar en los mecanismos de manejo de errores predeterminados de Express, cuando las cabeceras ya se han enviado al cliente:

```js
function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
}
```

Note that the default error handler can get triggered if you call `next()` with an error
in your code more than once, even if custom error handling middleware is in place.

Other error handling middleware can be found at [Express middleware](/{{ page.lang }}/resources/middleware.html).

## Writing error handlers

Define error-handling middleware functions in the same way as other middleware functions,
except error-handling functions have four arguments instead of three:
`(err, req, res, next)`. For example:

```js
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

El middleware de manejo de errores se define al final, después de otras llamadas de rutas y `app.use()`; por ejemplo:

```js
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(methodOverride())
app.use((err, req, res, next) => {
  // logic
})
```

Las respuestas desde una función de middleware pueden estar en el formato que prefiera, por ejemplo, una página de errores HTML, un mensaje simple o una serie JSON.

A efectos de la organización (y de infraestructura de nivel superior), puede definir varias funciones de middleware de manejo de errores, de la misma forma que con las funciones de middleware normales. Por ejemplo, si desea definir un manejador de errores para las solicitudes realizadas utilizando `XHR`, y las que no lo tienen, puede utilizar los siguientes mandatos:

```js
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(methodOverride())
app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)
```

En este ejemplo, los `logErrors` genéricos pueden escribir información de solicitudes y errores en `stderr`, por ejemplo:

```js
function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}
```

También en este ejemplo, `clientErrorHandler` se define de la siguiente manera; en este caso, el error se pasa de forma explícita al siguiente:

Notice that when _not_ calling "next" in an error-handling function, you are responsible for writing (and ending) the response. Otherwise, those requests will "hang" and will not be eligible for garbage collection.

```js
function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}
```

La función que detecta todos los errores de `errorHandler` puede implementarse de la siguiente manera:

```js
function errorHandler (err, req, res, next) {
  res.status(500)
  res.render('error', { error: err })
}
```

If you have a route handler with multiple callback functions, you can use the `route` parameter to skip to the next route handler. For example:

```js
app.get('/a_route_behind_paywall',
  (req, res, next) => {
    if (!req.user.hasPaid) {
      // continue handling this request
      next('route')
    } else {
      next()
    }
  }, (req, res, next) => {
    PaidContent.find((err, doc) => {
      if (err) return next(err)
      res.json(doc)
    })
  })
```

En este ejemplo, se omitirá el manejador `getPaidContent`, pero los restantes manejadores en `app` para `/a_route_behind_paywall` continuarán ejecutándose.

<div class="doc-box doc-info" markdown="1">
Las llamadas a `next()` y `next(err)` indican que el manejador actual está completo y en qué estado.  `next(err)` omitirá los demás manejadores de la cadena, excepto los que se hayan configurado para manejar errores como se ha descrito anteriormente.
</div>
