---
layout: página
title: Direccionamiento de Express
description: Aprenda cómo definir y usar rutas en aplicaciones Express.js, incluyendo métodos de ruta, rutas de ruta, parámetros, y usando Router para rutas modulares.
menu: guía
lang: es
redirect_from: /es/guide/routing.html
---

# Direccionamiento

_Direccionamiento_ hace referencia a la definición de puntos finales de aplicación (URI) y cómo responden a las solicitudes de cliente.
Para ver una introducción al direccionamiento, consulte [Direccionamiento básico](/{{ page.lang }}/starter/basic-routing.html).

Define enrutamiento usando métodos del objeto Express `app` que corresponden a métodos HTTP;
por ejemplo, `app. et()` para manejar solicitudes GET y `app.post` para manejar solicitudes POST. Para una lista completa,
vea [app.METHOD](/{{ page.lang }}/5x/api.html#app.METHOD). También puedes usar [app.all()](/{{ page.lang }}/5x/api.html#app.all) para manejar todos los métodos HTTP y [app.use()](/{{ page.lang }}/5x/api.html#app. se) a
especificar middleware como función de callback (Ver [Usando middleware](/{{ page.lang }}/guide/using-middleware.html) para más detalles).

Estos métodos de enrutamiento especifican una función de callback (a veces llamada "funciones manejadoras") llamada cuando la aplicación recibe una petición a la ruta especificada (endpoint) y el método HTTP. En otras palabras, la aplicación "escucha" para peticiones que coinciden con el/los método(s) especificado(s), y cuando detecta una coincidencia, llama a la función de callback especificada.

De hecho, los métodos de enrutamiento pueden tener más de una función de callback como argumentos.
Con múltiples funciones de callback, es importante proporcionar `next` como un argumento a la función de callback y luego llamar `next()` dentro del cuerpo de la función para desactivar el control
al siguiente callback.

El siguiente código es un ejemplo de una ruta muy básica.

```js
const express = require('express')
const app = express()

// responder con "hola mundo" cuando una solicitud GET se hace a la página de inicio
aplicación. et('/', (req, res) => {
  res.send('hola mundo')
})
```

<h2 id="route-methods">Métodos de ruta</h2>

Un método de ruta se deriva de uno de los métodos HTTP y se adjunta a una instancia de la clase `express`.

El siguiente código es un ejemplo de las rutas que se definen para los métodos GET y POST a la raíz de la aplicación.

```js
// Ruta del método GET
app.get('/', (req, res) => {
  res. end('GET request to the homepage')
})

// POST method route
app. ost('/', (req, res) => {
  res.send('POST request to the homepage')
})
```

Express soporta métodos que corresponden a todos los métodos de petición HTTP: `get`, `post`, y así sucesivamente.
Para una lista completa, vea [app.METHOD](/{{ page.lang }}/5x/api.html#app.METHOD).

Hay un método de direccionamiento especial, `app.all()`, que no se deriva de ningún método HTTP. Este método se utiliza para cargar funciones de middleware en una vía de acceso para todos los métodos de solicitud. En el siguiente ejemplo, el manejador se ejecutará para las solicitudes a "/secret", tanto si utiliza GET, POST, PUT, DELETE, como cualquier otro método de solicitud HTTP soportado en el [módulo http](https://nodejs.org/api/http.html#http_http_methods).

```js
app.all('/secret', (req, res, next) => {
  console.log('Acceder a la sección secreta ...')
  next() // pasar el control al siguiente manejador
})
```

<h2 id="route-paths">Vías de acceso de ruta</h2>

Las vías de acceso de ruta, en combinación con un método de solicitud, definen los puntos finales en los que pueden realizarse las solicitudes. Las vías de acceso de ruta pueden ser series, patrones de serie o expresiones regulares.

{% capture caution-character %} En expreso 5, ¿los caracteres `? , `+`, `\*`, `[]`, y `()\` son manejados de manera diferente que en la versión 4, por favor revisa la [guía de migración](/{{ page.lang }}/guide/migrating-5. tml#sintaxis de ruta) para más información.{% endcapture %}

{% include admonitions/caution.html content=caution-character %}

{% capture note-dollar-character %}En expreso 4, los caracteres de expresión regular como `$` necesitan ser escapados con un `\`.
{% endcapture %}

{% include admonitions/caution.html content=note-dollar-character %}

Express utiliza [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) para correlacionar las vías de acceso de ruta; consulte la documentación de path-to-regexp para ver todas las posibilidades para definir vías de acceso de ruta. [Express Route Tester](http://forbeslindesay.github.io/express-route-tester/) es una herramienta muy útil para probar rutas básicas de Express, aunque no da soporte a la coincidencia de patrones.
{% endcapture %}

{% include admonitions/note.html content=note-path-to-regexp %}

{% include admonitions/warning.html content="Las cadenas de consulta no son parte de la ruta de ruta." %}

### Rutas de ruta basadas en cadenas

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

### Rutas de ruta basadas en patrones de cadenas

{% capture caution-string-patterns %} Los patrones de cadena en Express 5 ya no funcionan. Por favor, consulta la [guía de migración](/{{ page.lang }}/guide/migrating-5.html#path-syntax) para más información.{% endcapture %}

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

<h2 id="route-parameters">Parámetros de ruta</h2>

Los parámetros de ruta se llaman segmentos de URL que se utilizan para capturar los valores especificados en su posición en la URL. Los valores capturados son poblados en el objeto `req.params`, con el nombre del parámetro de ruta especificado en la ruta como sus claves respectivas.

```
Ruta de ruta: /users/:userId/books/:bookId
URL de petición: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
```

Para definir rutas con parámetros de ruta, simplemente especifique los parámetros de ruta en la ruta como se muestra a continuación.

```js
app.get('/users/:userId/books/:bookId', (req, res) => {
  res.send(req.params)
})
```

<div class="doc-box doc-notice" markdown="1">
The name of route parameters must be made up of "word characters" ([A-Za-z0-9_]).
</div>

Dado que los guiones (`-`) y el punto (`.`) se interpretan literalmente, pueden ser utilizados junto con parámetros de ruta para propósitos útiles.

```
Ruta de ruta: /flights/:from-:to
Request URL: http://localhost:3000/flights/LAX-SFO
req.params: { "from": "LAX", "to": "SFO" }
```

```
Ruta de ruta: /plantae/:genus.:species
Request URL: http://localhost:3000/plantae/Prunus.persica
req.params: { "genus": "Prunus", "species": "persica" }
```

{% capture warning-regexp %}
En expreso 5, los caracteres regexp no están soportados en las rutas de ruta, para más información por favor consulte la [guía de migración](/{{ page.lang }}/guide/migrating-5.html#path-syntax).{% endcapture %}

{% include admonitions/caution.html content=warning-regexp %}

Para tener más control sobre la cadena exacta que puede coincidir con un parámetro de ruta, puede añadir una expresión regular entre paréntesis (`()`):

```
Ruta de ruta: /user/:userId(\d+)
URL de Solicitud: http://localhost:3000/user/42
req.params: {"userId": "42"}
```

{% include admonitions/warning. tml content="Debido a que la expresión regular es generalmente parte de una cadena literal, asegúrate de escapar cualquier carácter `\` con una barra invertida adicional, por ejemplo `\\d+`." %}

{% capture warning-version %}
En Express 4.x, <a href="https://github.com/expressjs/express/issues/2495">el carácter `*` en expresiones regulares no se interpreta de la forma habitual</a>. Como un workaround, usa `{0,}` en lugar de `*`. Es probable que esto se arregle en Express 5.
{% endcapture %}

{% include admonitions/warning.html content=warning-version %}

<h2 id="route-handlers">Manejadores de rutas</h2>

Puede proporcionar varias funciones de devolución de llamada que se comportan como [middleware](/{{ page.lang }}/guide/using-middleware.html) para manejar una solicitud. La única excepción es que estas devoluciones de llamada pueden invocar `next('route')` para omitir el resto de las devoluciones de llamada de ruta. Puede utilizar este mecanismo para imponer condiciones previas en una ruta y, a continuación, pasar el control a las rutas posteriores si no hay motivo para continuar con la ruta actual.

Los manejadores de rutas pueden tener la forma de una función, una matriz de funciones o combinaciones de ambas, como se muestra en los siguientes ejemplos.

Una función de devolución de llamada individual puede manejar una ruta. Por ejemplo:

```js
app.get('/example/a', (req, res) => {
  res.send('Hola de A!')
})
```

Más de una función de devolución de llamada puede manejar una ruta (asegúrese de especificar el objeto `next`). Por ejemplo:

```js
app.get('/example/b', (req, res, next) => {
  console.log('la respuesta será enviada por la siguiente función . .')
  next()
}, (req, res) => {
  res.send('Hola de B!')
})
```

Una matriz de funciones de devolución de llamada puede manejar una ruta. Por ejemplo:

```js
const cb0 = function (req, res, next) {
  consola. og('CB0')
  next()
}

const cb1 = function (req, res, next) {
  consola. og('CB1')
  next()
}

const cb2 = function (req, res) {
  res. end('Hola de C!')
}

app.get('/example/c', [cb0, cb1, cb2])
```

Una combinación de funciones independientes y matrices de funciones puede manejar una ruta. Por ejemplo:

```js
const cb0 = function (req, res, next) {
  consola. og('CB0')
  next()
}

const cb1 = function (req, res, next) {
  consola. og('CB1')
  next()
}

app. et('/example/d', [cb0, cb1], (req, res, next) => {
  console.log('la respuesta será enviada por la siguiente función . .')
  next()
}, (req, res) => {
  res.send('Hola de D!')
})
```

<h2 id="response-methods">Métodos de respuesta</h2>

Los métodos en el objeto de respuesta (`res`) de la tabla siguiente pueden enviar una respuesta al cliente y terminar el ciclo de solicitud/respuestas. Si ninguno de estos métodos se invoca desde un manejador de rutas, la solicitud de cliente se dejará colgada.

| Método                                                                                                                                                                                                                    | Descripción                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| [res.download()](/{{ page.lang }}/4x/api.html#res.download)     | Solicita un archivo para descargarlo.                                                                         |
| [res.end()](/{{ page.lang }}/4x/api.html#res.end)               | Finaliza el proceso de respuesta.                                                                             |
| [res.json()](/{{ page.lang }}/4x/api.html#res.json)             | Envía una respuesta JSON.                                                                                     |
| [res.jsonp()](/{{ page.lang }}/4x/api.html#res.jsonp)           | Envía una respuesta JSON con soporte JSONP.                                                                   |
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
    res.send('Obtener un libro aleatorio')
  })
  . ost((req, res) => {
    res.send('Agregar un libro')
  })
  . ut((req, res) => {
    res.send('Actualizar el libro')
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
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})
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

/// ...

app.use('/birds', birds)
```

La aplicación ahora podrá manejar solicitudes a `/birds` y `/birds/about`, así como invocar la función de middleware `timeLog` que es específica de la ruta.

Pero si la ruta padre `/birds` tiene parámetros de ruta, no será accesible por defecto desde las subrutas. Para hacerlo accesible, necesitará pasar la opción `mergeParams` al constructor de Router [reference](/{{ page.lang }}/5x/api.html#app.use).

```js
Express da soporte a los siguientes métodos de direccionamiento que se corresponden con los métodos HTTP: `get`, `post`, `put`, `head`, `delete`, `options`, `trace`, `copy`, `lock`, `mkcol`, `move`, `purge`, `propfind`, `proppatch`, `unlock`, `report`, `mkactivity`, `checkout`, `merge`, `m-search`, `notify`, `subscribe`, `unsubscribe`, `patch`, `search` y `connect`.
```
