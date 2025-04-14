---
layout: página
title: Manejo de errores de Express
description: Descargue cómo Express.js maneja errores en código sincrónico y asíncrono, y aprenda a implementar middleware de manejo de errores personalizado para sus aplicaciones.
menu: guía
lang: es
redirect_from: /es/guide/error-handling.html
---

# Manejo de errores

_Error Handling_ refers to how Express catches and processes errors that
occur both synchronously and asynchronously. Express viene con un manejador de error predeterminado
, así que no necesitas escribir el tuyo propio para empezar.

## Errores de captura

Es importante asegurarse de que Express capture todos los errores que ocurren mientras
ejecuta los manejadores de rutas y el middleware.

Los errores que ocurren en el código sincrónico dentro de los manejadores de rutas y middleware
no requieren trabajo extra. Si el código sincrónico arroja un error, entonces Express hará
capturarlo y procesarlo. Por ejemplo:

```js
app.get('/', (req, res) => {
  throw new Error('BROKEN') // Expresa capturará esto por su cuenta.
})
```

Defina las funciones de middleware de manejo de errores de la misma forma que otras funciones de middleware, excepto que las funciones de manejo de errores tienen cuatro argumentos en lugar de tres: `(err, req, res, next)`.  Por ejemplo:

```js
app.get('/', (req, res, next) => {
  fs. eadFile('/file-no-exist', (err, data) => {
    if (err) {
      next(err) // Pasar errores a Express.
    } else {
      res. end(data)
    }
  })
})
```

Si tiene un manejador de rutas con varias funciones de devolución de llamada, puede utilizar el parámetro `route` para omitir el siguiente manejador de rutas.
Por ejemplo:

```js
app.get('/user/:id', async (req, res, next) => {
  const user = await getUserById(req.params.id)
  res.send(user)
})
```

Si `getUserById` arroja un error o rechaza, `next` será llamado con
el error arrojado o el valor rechazado. Si no se proporciona ningún valor rechazado, `next`
será llamado con un objeto de Error predeterminado proporcionado por el enrutador Express.

Si pasa cualquier valor a la función `next()` (excepto la serie `'route'`), Express considera que la solicitud actual tiene un error y omitirá las restantes funciones de middleware y direccionamiento que no son de manejo de errores.

Si la devolución de llamada en una secuencia no proporciona datos, sólo errores, puede simplificar
este código de la siguiente manera:

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

En el ejemplo anterior, `next` es proporcionado como el callback para `fs.writeFile`,
que es llamado con o sin errores. Si no hay error, se ejecuta el segundo manejador
, de lo contrario Express catches y procesa el error.

Debe capturar errores que ocurren en código asíncrono invocado por manejadores de ruta o un middleware
y pasarlos a Express para su procesamiento. Por ejemplo:

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

El ejemplo anterior utiliza un bloque `try...catch` para capturar errores en el código asincrónico
y pasarlos a Express. Si el bloque `try...catch`
fuera omitido, Express no capturaría el error ya que no es parte del código de manejador
sincrónico.

Usa promesas para evitar la sobrecarga del bloque "intentar...atrapar" o al usar funciones
que devuelven promesas.  Por ejemplo:

```js
app.get('/', (req, res, next) => {
  Promise.resolve().then(() => {
    throw new Error('BROKEN')
  }).catch(next) // Los errores se pasarán a Express.
})
```

Since promises automatically catch both synchronous errors and rejected promises,
you can simply provide `next` as the final catch handler and Express will catch errors,
because the catch handler is given the error as the first argument.

También podría utilizar una cadena de manejadores para depender de la captura de errores sincrónicos
, reduciendo el código asincrónico a algo trivial. Por ejemplo:

```js
app.get('/', [
  function (req, res, next) {
    fs. eadFile('/maybe-valid-file', 'utf-8', (err, data) => {
      res.locals. ata = datos
      siguiente(err)
    })
  }, Función
  (req, res) {
    res. ocals.data = res.locals.data.split(',')[1]
    res.send(res.locals.data)
  }
])
```

El ejemplo anterior tiene un par de declaraciones triviales de la llamada `readFile`
. Si `readFile` causa un error, entonces pasa el error a Express, de lo contrario
regresa rápidamente al mundo del manejo sincrónico de errores en el siguiente manejador
en la cadena. Luego, el ejemplo anterior intenta procesar los datos. Si esto falla, entonces el gestor de errores sincrónico
lo capturará. Si hubiera hecho este procesamiento dentro de
el callback `readFile`, entonces la aplicación podría salir y los manejadores de error Express
no se ejecutarían.

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

- El `res.statusCode` se establece desde `err.status` (o `err.statusCode`). Si
  este valor está fuera del rango 4xx o 5xx, se establecerá a 500.
- El `res.statusMessage` se establece de acuerdo al código de estado.
- El cuerpo será el HTML del mensaje del código de estado cuando en el entorno
  de producción, de lo contrario será `err.stack`.
- Cualquier cabecera especificada en un objeto `err.headers`.

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

Tenga en cuenta que el manejador de errores por defecto puede activarse si llama a `next()` con un error
en su código más de una vez, incluso si el middleware está configurado para manejar errores personalizados.

Otro middleware de manejo de errores puede encontrarse en [Express middleware](/{{ page.lang }}/resources/middleware.html).

## Manejadores de errores escritos

Define las funciones de middleware de la misma manera que otras funciones de middleware,
excepto las funciones de manejo de errores tienen cuatro argumentos en lugar de tres:
`(err, req, res, next)`. Por ejemplo:

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

app.use(bodyParser())
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

app.use(bodyParser())
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

Tenga en cuenta que cuando _no_ llama "siguiente" en una función de manejo de errores, usted es responsable de escribir (y terminar) la respuesta. De lo contrario, esas solicitudes se "colgarán" y no serán elegibles para la recolección de basura.

```js
function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500). end({ error: 'Something failed!' })
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

Si tiene un manejador de ruta con múltiples funciones de callback, puede utilizar el parámetro `route` para saltar al siguiente manejador de ruta. Por ejemplo:

```js
app.get('/a_route_behind_paywall',
  (req, res, next) => {
    if (!req.user.hasPaid) {

      // continue handling this request
      next('route')
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
