---
layout: page
title: Direccionamiento de Express
menu: guide
lang: es
---

# Direccionamiento

*Direccionamiento* hace referencia a la definición de puntos finales de aplicación (URI) y cómo responden a las solicitudes de cliente.
Para ver una introducción al direccionamiento, consulte [Direccionamiento básico](/{{ page.lang }}/starter/basic-routing.html).

El siguiente código es un ejemplo de una ruta muy básica.

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});
</code>
</pre>

<h2 id="route-methods">Métodos de ruta</h2>

Un método de ruta se deriva de uno de los métodos HTTP y se adjunta a una instancia de la clase `express`.

El siguiente código es un ejemplo de las rutas que se definen para los métodos GET y POST a la raíz de la aplicación.

<pre>
<code class="language-javascript" translate="no">
// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage');
});

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage');
});
</code>
</pre>

Express da soporte a los siguientes métodos de direccionamiento que se corresponden con los métodos HTTP: `get`, `post`, `put`, `head`, `delete`, `options`, `trace`, `copy`, `lock`, `mkcol`, `move`, `purge`, `propfind`, `proppatch`, `unlock`, `report`, `mkactivity`, `checkout`, `merge`, `m-search`, `notify`, `subscribe`, `unsubscribe`, `patch`, `search` y `connect`.

<div class="doc-box doc-info" markdown="1">
Para direccionar los métodos que se convierten en nombres de variable JavaScript no válidos, utilice la notación entre corchetes. Por ejemplo, `app['m-search']('/', function ...`
</div>

Hay un método de direccionamiento especial, `app.all()`, que no se deriva de ningún método HTTP. Este método se utiliza para cargar funciones de middleware en una vía de acceso para todos los métodos de solicitud.

En el siguiente ejemplo, el manejador se ejecutará para las solicitudes a "/secret", tanto si utiliza GET, POST, PUT, DELETE, como cualquier otro método de solicitud HTTP soportado en el [módulo http](https://nodejs.org/api/http.html#http_http_methods).

<pre>
<code class="language-javascript" translate="no">
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});
</code>
</pre>

<h2 id="route-paths">Vías de acceso de ruta</h2>

Las vías de acceso de ruta, en combinación con un método de solicitud, definen los puntos finales en los que pueden realizarse las solicitudes. Las vías de acceso de ruta pueden ser series, patrones de serie o expresiones regulares.

<div class="doc-box doc-info" markdown="1">
  Express utiliza [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) para correlacionar las vías de acceso de ruta; consulte la documentación de path-to-regexp para ver todas las posibilidades para definir vías de acceso de ruta. [Express Route Tester](http://forbeslindesay.github.io/express-route-tester/) es una herramienta muy útil para probar rutas básicas de Express, aunque no da soporte a la coincidencia de patrones.
</div>

<div class="doc-box doc-warn" markdown="1">
Las series de consulta no forman parte de la vía de acceso de ruta.
</div>

Estos son algunos ejemplos de vías de acceso de ruta basadas en series.

Esta vía de acceso de ruta coincidirá con las solicitudes a la ruta raíz, `/`.

<pre>
<code class="language-javascript" translate="no">
app.get('/', function (req, res) {
  res.send('root');
});
</code>
</pre>

Esta vía de acceso de ruta coincidirá con las solicitudes a `/about`.

<pre>
<code class="language-javascript" translate="no">
app.get('/about', function (req, res) {
  res.send('about');
});
</code>
</pre>

Esta vía de acceso de ruta coincidirá con las solicitudes a `/random.text`.

<pre>
<code class="language-javascript" translate="no">
app.get('/random.text', function (req, res) {
  res.send('random.text');
});
</code>
</pre>

Estos son algunos ejemplos de vías de acceso de ruta basadas en patrones de serie.

Esta vía de acceso de ruta coincidirá con `acd` y `abcd`.

<pre>
<code class="language-javascript" translate="no">
app.get('/ab?cd', function(req, res) {
  res.send('ab?cd');
});
</code>
</pre>

Esta vía de acceso de ruta coincidirá con `abcd`, `abbcd`, `abbbcd`, etc.

<pre>
<code class="language-javascript" translate="no">
app.get('/ab+cd', function(req, res) {
  res.send('ab+cd');
});
</code>
</pre>

Esta vía de acceso de ruta coincidirá con `abcd`, `abxcd`, `abRABDOMcd`, `ab123cd`, etc.

<pre>
<code class="language-javascript" translate="no">
app.get('/ab*cd', function(req, res) {
  res.send('ab*cd');
});
</code>
</pre>

Esta vía de acceso de ruta coincidirá con `/abe` y `/abcde`.

<pre>
<code class="language-javascript" translate="no">
app.get('/ab(cd)?e', function(req, res) {
 res.send('ab(cd)?e');
});
</code>
</pre>

<div class="doc-box doc-info" markdown="1">
Los caracteres ?, +, * y () son subconjuntos de sus contrapartidas de expresiones regulares. El guión (-) y el punto (.) se interpretan literalmente en las vías de acceso basadas en series.
</div>

Ejemplos de vías de acceso de ruta basadas en expresiones regulares:

Esta vía de acceso de ruta coincidirá con cualquier valor con una "a" en el nombre de la ruta.

<pre>
<code class="language-javascript" translate="no">
app.get(/a/, function(req, res) {
  res.send('/a/');
});
</code>
</pre>

Esta vía de acceso de ruta coincidirá con `butterfly` y `dragonfly`, pero no con `butterflyman`, `dragonfly man`, etc.

<pre>
<code class="language-javascript" translate="no">
app.get(/.*fly$/, function(req, res) {
  res.send('/.*fly$/');
});
</code>
</pre>

<h2 id="route-handlers">Manejadores de rutas</h2>

Puede proporcionar varias funciones de devolución de llamada que se comportan como [middleware](/{{ page.lang }}/guide/using-middleware.html) para manejar una solicitud. La única excepción es que estas devoluciones de llamada pueden invocar `next('route')` para omitir el resto de las devoluciones de llamada de ruta. Puede utilizar este mecanismo para imponer condiciones previas en una ruta y, a continuación, pasar el control a las rutas posteriores si no hay motivo para continuar con la ruta actual.

Los manejadores de rutas pueden tener la forma de una función, una matriz de funciones o combinaciones de ambas, como se muestra en los siguientes ejemplos.

Una función de devolución de llamada individual puede manejar una ruta.  Por ejemplo:

<pre>
<code class="language-javascript" translate="no">
app.get('/example/a', function (req, res) {
  res.send('Hello from A!');
});
</code>
</pre>

Más de una función de devolución de llamada puede manejar una ruta (asegúrese de especificar el objeto `next`). Por ejemplo:

<pre>
<code class="language-javascript" translate="no">
app.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from B!');
});
</code>
</pre>

Una matriz de funciones de devolución de llamada puede manejar una ruta.  Por ejemplo:

<pre>
<code class="language-javascript" translate="no">
var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

var cb2 = function (req, res) {
  res.send('Hello from C!');
}

app.get('/example/c', [cb0, cb1, cb2]);
</code>
</pre>

Una combinación de funciones independientes y matrices de funciones puede manejar una ruta.  Por ejemplo:

<pre>
<code class="language-javascript" translate="no">
var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from D!');
});
</code>
</pre>

<h2 id="response-methods">Métodos de respuesta</h2>

Los métodos en el objeto de respuesta (`res`) de la tabla siguiente pueden enviar una respuesta al cliente y terminar el ciclo de solicitud/respuestas. Si ninguno de estos métodos se invoca desde un manejador de rutas, la solicitud de cliente se dejará colgada.

| Método               | Descripción
|----------------------|--------------------------------------
| [res.download()](/{{ page.lang }}/4x/api.html#res.download)   | Solicita un archivo para descargarlo.
| [res.end()](/{{ page.lang }}/4x/api.html#res.end)        | Finaliza el proceso de respuesta.
| [res.json()](/{{ page.lang }}/4x/api.html#res.json)       | Envía una respuesta JSON.
| [res.jsonp()](/{{ page.lang }}/4x/api.html#res.jsonp)      | Envía una respuesta JSON con soporte JSONP.
| [res.redirect()](/{{ page.lang }}/4x/api.html#res.redirect)   | Redirecciona una solicitud.
| [res.render()](/{{ page.lang }}/4x/api.html#res.render)     | Representa una plantilla de vista.
| [res.send()](/{{ page.lang }}/4x/api.html#res.send)       | Envía una respuesta de varios tipos.
| [res.sendFile()](/{{ page.lang }}/4x/api.html#res.sendFile)     | Envía un archivo como una secuencia de octetos.
| [res.sendStatus()](/{{ page.lang }}/4x/api.html#res.sendStatus) | Establece el código de estado de la respuesta y envía su representación de serie como el cuerpo de respuesta.

<h2 id="app-route">app.route()</h2>

Puede crear manejadores de rutas encadenables para una vía de acceso de ruta utilizando `app.route()`.
Como la vía de acceso se especifica en una única ubicación, la creación de rutas modulares es muy útil, al igual que la reducción de redundancia y errores tipográficos. Para obtener más información sobre las rutas, consulte: [Documentación de Router()](/{{ page.lang }}/4x/api.html#router).

A continuación, se muestra un ejemplo de manejadores de rutas encadenados que se definen utilizando `app.route()`.

<pre>
<code class="language-javascript" translate="no">
app.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });
</code>
</pre>

<h2 id="express-router">express.Router</h2>

Utilice la clase `express.Router` para crear manejadores de rutas montables y modulares. Una instancia `Router` es un sistema de middleware y direccionamiento completo; por este motivo, a menudo se conoce como una "miniaplicación".

El siguiente ejemplo crea un direccionador como un módulo, carga una función de middleware en él, define algunas rutas y monta el módulo de direccionador en una vía de acceso en la aplicación principal.

Cree un archivo de direccionador denominado `birds.js` en el directorio de la aplicación, con el siguiente contenido:

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.send('Birds home page');
});
// define the about route
router.get('/about', function(req, res) {
  res.send('About birds');
});

module.exports = router;
</code>
</pre>

A continuación, cargue el módulo de direccionador en la aplicación:

<pre>
<code class="language-javascript" translate="no">
var birds = require('./birds');
...
app.use('/birds', birds);
</code>
</pre>

La aplicación ahora podrá manejar solicitudes a `/birds` y `/birds/about`, así como invocar la función de middleware `timeLog` que es específica de la ruta.
