---
layout: page
title: Direccionamiento de Express
description: Learn how to define and use routes in Express.js applications, including route methods, route paths, parameters, and using Router for modular routing.
menu: guide
lang: es
redirect_from: "  "
---

# Direccionamiento

_Direccionamiento_ hace referencia a la definición de puntos finales de aplicación (URI) y cómo responden a las solicitudes de cliente.
Para ver una introducción al direccionamiento, consulte [Direccionamiento básico](/{{ page.lang }}/starter/basic-routing.html).

You define routing using methods of the Express `app` object that correspond to HTTP methods;
for example, `app.get()` to handle GET requests and `app.post` to handle POST requests. For a full list,
see [app.METHOD](/{{ page.lang }}/5x/api.html#app.METHOD). You can also use [app.all()](/{{ page.lang }}/5x/api.html#app.all) to handle all HTTP methods and [app.use()](/{{ page.lang }}/5x/api.html#app.use) to
specify middleware as the callback function (See [Using middleware](/{{ page.lang }}/guide/using-middleware.html) for details).

These routing methods specify a callback function (sometimes called "handler functions") called when the application receives a request to the specified route (endpoint) and HTTP method. In other words, the application "listens" for requests that match the specified route(s) and method(s), and when it detects a match, it calls the specified callback function.

In fact, the routing methods can have more than one callback function as arguments.
With multiple callback functions, it is important to provide `next` as an argument to the callback function and then call `next()` within the body of the function to hand off control
to the next callback.

The following code is an example of a very basic route.

```js
const express = require('express')
const app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})
```

<h2 id="route-methods">Route methods</h2>

A route method is derived from one of the HTTP methods, and is attached to an instance of the `express` class.

El siguiente código es un ejemplo de las rutas que se definen para los métodos GET y POST a la raíz de la aplicación.

```js
// GET method route
app.get('/', (req, res) => {
  res.send('GET request to the homepage')
})

// POST method route
app.post('/', (req, res) => {
  res.send('POST request to the homepage')
})
```

Express supports methods that correspond to all HTTP request methods: `get`, `post`, and so on.
For a full list, see [app.METHOD](/{{ page.lang }}/5x/api.html#app.METHOD).

Hay un método de direccionamiento especial, `app.all()`, que no se deriva de ningún método HTTP. Este método se utiliza para cargar funciones de middleware en una vía de acceso para todos los métodos de solicitud. En el siguiente ejemplo, el manejador se ejecutará para las solicitudes a "/secret", tanto si utiliza GET, POST, PUT, DELETE, como cualquier otro método de solicitud HTTP soportado en el [módulo http](https://nodejs.org/api/http.html#http_http_methods).

```js
app.all('/secret', (req, res, next) => {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
})
```

<h2 id="route-paths">Vías de acceso de ruta</h2>

Las vías de acceso de ruta, en combinación con un método de solicitud, definen los puntos finales en los que pueden realizarse las solicitudes. Las vías de acceso de ruta pueden ser series, patrones de serie o expresiones regulares.

{% capture caution-character %} In express 5, the characters `?`, `+`, `*`, `[]`, and `()` are handled differently than in version 4, please review the [migration guide](/{{ page.lang }}/guide/migrating-5.html#path-syntax) for more information.{% endcapture %}

{% include admonitions/caution.html content=caution-character %}

{% capture note-dollar-character %}In express 4, regular expression characters such as `$` need to be escaped with a `\`.
{% endcapture %}

{% include admonitions/caution.html content=note-dollar-character %}

{% capture note-path-to-regexp %}

Express uses [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) for matching the route paths; see the path-to-regexp documentation for all the possibilities in defining route paths. [Express Route Tester](http://forbeslindesay.github.io/express-route-tester/) es una herramienta muy útil para probar rutas básicas de Express, aunque no da soporte a la coincidencia de patrones.

{% endcapture %}

{% include admonitions/note.html content=note-path-to-regexp %}

{% capture query-string-note %}

Query strings are not part of the route path.

{% endcapture %}

{% include admonitions/warning.html content=query-string-note %}

### Route paths based on strings

Esta vía de acceso de ruta coincidirá con las solicitudes a la ruta raíz, `/`.

```js
app.get('/', (req, res) => {
  res.send('root')
})
```

Esta vía de acceso de ruta coincidirá con las solicitudes a `/about`.

```js
app.get('/about', (req, res) => {
  res.send('about')
})
```

Esta vía de acceso de ruta coincidirá con las solicitudes a `/random.text`.

```js
app.get('/random.text', (req, res) => {
  res.send('random.text')
})
```

### Route paths based on string patterns

{% capture caution-string-patterns %} The string patterns in Express 5 no longer work. Please refer to the [migration guide](/{{ page.lang }}/guide/migrating-5.html#path-syntax) for more information.{% endcapture %}

{% include admonitions/caution.html content=caution-string-patterns %}

Esta vía de acceso de ruta coincidirá con `acd` y `abcd`.

```js
app.get('/ab?cd', (req, res) => {
  res.send('ab?cd')
})
```

Esta vía de acceso de ruta coincidirá con `abcd`, `abbcd`, `abbbcd`, etc.

```js
app.get('/ab+cd', (req, res) => {
  res.send('ab+cd')
})
```

Esta vía de acceso de ruta coincidirá con `abcd`, `abxcd`, `abRABDOMcd`, `ab123cd`, etc.

```js
app.get('/ab*cd', (req, res) => {
  res.send('ab*cd')
})
```

Esta vía de acceso de ruta coincidirá con `/abe` y `/abcde`.

```js
app.get('/ab(cd)?e', (req, res) => {
  res.send('ab(cd)?e')
})
```

### Ejemplos de vías de acceso de ruta basadas en expresiones regulares:

Esta vía de acceso de ruta coincidirá con cualquier valor con una "a" en el nombre de la ruta.

```js
app.get(/a/, (req, res) => {
  res.send('/a/')
})
```

Esta vía de acceso de ruta coincidirá con `butterfly` y `dragonfly`, pero no con `butterflyman`, `dragonfly man`, etc.

```js
app.get(/.*fly$/, (req, res) => {
  res.send('/.*fly$/')
})
```

<h2 id="route-parameters">Route parameters</h2>

Route parameters are named URL segments that are used to capture the values specified at their position in the URL. The captured values are populated in the `req.params` object, with the name of the route parameter specified in the path as their respective keys.

```
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
```

To define routes with route parameters, simply specify the route parameters in the path of the route as shown below.

```js
app.get('/users/:userId/books/:bookId', (req, res) => {
  res.send(req.params)
})
```

<div class="doc-box doc-notice" markdown="1">
The name of route parameters must be made up of "word characters" ([A-Za-z0-9_]).
</div>

Since the hyphen (`-`) and the dot (`.`) are interpreted literally, they can be used along with route parameters for useful purposes.

```
Route path: /flights/:from-:to
Request URL: http://localhost:3000/flights/LAX-SFO
req.params: { "from": "LAX", "to": "SFO" }
```

```
Route path: /plantae/:genus.:species
Request URL: http://localhost:3000/plantae/Prunus.persica
req.params: { "genus": "Prunus", "species": "persica" }
```

{% capture warning-regexp %}
In express 5, Regexp characters are not supported in route paths, for more information please refer to the [migration guide](/{{ page.lang }}/guide/migrating-5.html#path-syntax).{% endcapture %}

{% include admonitions/caution.html content=warning-regexp %}

To have more control over the exact string that can be matched by a route parameter, you can append a regular expression in parentheses (`()`):

```
Route path: /user/:userId(\d+)
Request URL: http://localhost:3000/user/42
req.params: {"userId": "42"}
```

{% capture escape-advisory %}

Because the regular expression is usually part of a literal string, be sure to escape any `\` characters with an additional backslash, for example `\\d+`.

{% endcapture %}

{% include admonitions/warning.html content=escape-advisory %}

{% capture warning-version %}

In Express 4.x, <a href="https://github.com/expressjs/express/issues/2495">the `*` character in regular expressions is not interpreted in the usual way</a>. As a workaround, use `{0,}` instead of `*`. This will likely be fixed in Express 5.

{% endcapture %}

{% include admonitions/warning.html content=warning-version %}

<h2 id="route-handlers">Route handlers</h2>

Puede proporcionar varias funciones de devolución de llamada que se comportan como [middleware](/{{ page.lang }}/guide/using-middleware.html) para manejar una solicitud. La única excepción es que estas devoluciones de llamada pueden invocar `next('route')` para omitir el resto de las devoluciones de llamada de ruta. Puede utilizar este mecanismo para imponer condiciones previas en una ruta y, a continuación, pasar el control a las rutas posteriores si no hay motivo para continuar con la ruta actual.

Los manejadores de rutas pueden tener la forma de una función, una matriz de funciones o combinaciones de ambas, como se muestra en los siguientes ejemplos.

Una función de devolución de llamada individual puede manejar una ruta. For example:

```js
app.get('/example/a', (req, res) => {
  res.send('Hello from A!')
})
```

Más de una función de devolución de llamada puede manejar una ruta (asegúrese de especificar el objeto `next`). For example:

```js
app.get('/example/b', (req, res, next) => {
  console.log('the response will be sent by the next function ...')
  next()
}, (req, res) => {
  res.send('Hello from B!')
})
```

Una matriz de funciones de devolución de llamada puede manejar una ruta. For example:

```js
const cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

const cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

const cb2 = function (req, res) {
  res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1, cb2])
```

Una combinación de funciones independientes y matrices de funciones puede manejar una ruta. For example:

```js
const cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

const cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

app.get('/example/d', [cb0, cb1], (req, res, next) => {
  console.log('the response will be sent by the next function ...')
  next()
}, (req, res) => {
  res.send('Hello from D!')
})
```

<h2 id="response-methods">Response methods</h2>

Los métodos en el objeto de respuesta (`res`) de la tabla siguiente pueden enviar una respuesta al cliente y terminar el ciclo de solicitud/respuestas. Si ninguno de estos métodos se invoca desde un manejador de rutas, la solicitud de cliente se dejará colgada.

| Method                                                                                                                                                                                                                    | Description                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| [res.download()](/{{ page.lang }}/4x/api.html#res.download)     | Solicita un archivo para descargarlo.                                                                         |
| [res.end()](/{{ page.lang }}/4x/api.html#res.end)               | Finaliza el proceso de respuesta.                                                                             |
| [res.json()](/{{ page.lang }}/4x/api.html#res.json)             | Envía una respuesta JSON.                                                                                     |
| [res.jsonp()](/{{ page.lang }}/4x/api.html#res.jsonp)           | Send a JSON response with JSONP support.                                                                      |
| [res.redirect()](/{{ page.lang }}/4x/api.html#res.redirect)     | Redirecciona una solicitud.                                                                                   |
| [res.render()](/{{ page.lang }}/4x/api.html#res.render)         | Representa una plantilla de vista.                                                                            |
| [res.send()](/{{ page.lang }}/4x/api.html#res.send)             | Envía una respuesta de varios tipos.                                                                          |
| [res.sendFile()](/{{ page.lang }}/4x/api.html#res.sendFile)     | Envía un archivo como una secuencia de octetos.                                                               |
| [res.sendStatus()](/{{ page.lang }}/4x/api.html#res.sendStatus) | Establece el código de estado de la respuesta y envía su representación de serie como el cuerpo de respuesta. |

<h2 id="app-route">app.route()</h2>

Puede crear manejadores de rutas encadenables para una vía de acceso de ruta utilizando `app.route()`.
Como la vía de acceso se especifica en una única ubicación, la creación de rutas modulares es muy útil, al igual que la reducción de redundancia y errores tipográficos. Para obtener más información sobre las rutas, consulte: [Documentación de Router()](/{{ page.lang }}/4x/api.html#router).

A continuación, se muestra un ejemplo de manejadores de rutas encadenados que se definen utilizando `app.route()`.

```js
app.route('/book')
  .get((req, res) => {
    res.send('Get a random book')
  })
  .post((req, res) => {
    res.send('Add a book')
  })
  .put((req, res) => {
    res.send('Update the book')
  })
```

<h2 id="express-router">express.Router</h2>

Utilice la clase `express.Router` para crear manejadores de rutas montables y modulares. Una instancia `Router` es un sistema de middleware y direccionamiento completo; por este motivo, a menudo se conoce como una "miniaplicación".

El siguiente ejemplo crea un direccionador como un módulo, carga una función de middleware en él, define algunas rutas y monta el módulo de direccionador en una vía de acceso en la aplicación principal.

Cree un archivo de direccionador denominado `birds.js` en el directorio de la aplicación, con el siguiente contenido:

```js
const express = require('express')
const router = express.Router()

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now())
  next()
}
router.use(timeLog)

// define the home page route
router.get('/', (req, res) => {
  res.send('Birds home page')
})
// define the about route
router.get('/about', (req, res) => {
  res.send('About birds')
})

module.exports = router
```

A continuación, cargue el módulo de direccionador en la aplicación:

```js
const birds = require('./birds')

// ...

app.use('/birds', birds)
```

La aplicación ahora podrá manejar solicitudes a `/birds` y `/birds/about`, así como invocar la función de middleware `timeLog` que es específica de la ruta.

But if the parent route `/birds` has path parameters, it will not be accessible by default from the sub-routes. To make it accessible, you will need to pass the `mergeParams` option to the Router constructor [reference](/{{ page.lang }}/5x/api.html#app.use).

```js
const router = express.Router({ mergeParams: true })
```
