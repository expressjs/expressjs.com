---
layout: page
title: Migración a Express 4
menu: guide
lang: es
---

# Migración a Express 4

<h2 id="overview">Visión general</h2>

Express 4 es un cambio que rompe el código existente de Express 3, etc. Esto implica que una aplicación Express 3 existente no funcionará si actualiza la versión de Express en sus dependencias.

En este artículo se describen:

<ul class="doclist">
  <li><a href="#changes">Los cambios en Express 4.</a></li>
  <li><a href="#example-migration">Un ejemplo</a> de migración de una aplicación Express 3 a Express 4.</li>
  <li><a href="#app-gen">La actualización al generador de aplicaciones Express 4. </a></li>
</ul>

<h2 id="changes">Los cambios en Express 4</h2>

Se han realizado varios cambios importantes en Express 4:

<ul class="doclist">
  <li><a href="#core-changes">Cambios en el sistema principal y de middleware de Express.</a> Las dependencias de Connect y el middleware incorporado se han eliminado, por lo que debe añadir el middleware manualmente.
  </li>
  <li><a href="#routing">Cambios en el sistema de direccionamiento.</a></li>
  <li><a href="#other-changes">Otros cambios.</a></li>
</ul>

Vea también:

* [Nuevas características en 4.x.](https://github.com/expressjs/express/wiki/New-features-in-4.x)
* [Migración de 3.x a 4.x.](https://github.com/expressjs/express/wiki/Migrating-from-3.x-to-4.x)

<h3 id="core-changes">
Cambios en el sistema principal y de middleware de Express
</h3>

Express 4 ya no depende de Connect y elimina todo el middleware incorporado de su núcleo, excepto la función `express.static`. Esto significa que ahora Express es una infraestructura web de middleware y direccionamiento independiente, y que los releases y las versiones de Express no se ven afectados por las actualizaciones de middleware.

Sin el middleware incorporado, debe añadir explícitamente todo el
middleware necesario para ejecutar la aplicación. Sólo tiene que seguir estos pasos:

1. Instalar el módulo: `npm install --save <module-name>`
2. En su aplicación, requerir el módulo: `require('module-name')`
3. Utilizar el módulo según su documentación: `app.use( ... )`

En la tabla siguiente se lista el middleware de Express 3 y su contrapartida en Express 4.

<table class="doctable" border="1">
<tr><th>Express 3</th><th>Express 4</th></tr>
<tr><td><code>express.bodyParser</code></td>
<td><a href="https://github.com/expressjs/body-parser">body-parser</a> +
<a href="https://github.com/expressjs/multer">multer</a></td></tr>
<tr><td><code>express.compress</code></td>
<td><a href="https://github.com/expressjs/compression">compression</a></td></tr>
<tr><td><code>express.cookieSession</code></td>
<td><a href="https://github.com/expressjs/cookie-session">cookie-session</a></td></tr>
<tr><td><code>express.cookieParser</code></td>
<td><a href="https://github.com/expressjs/cookie-parser">cookie-parser</a></td></tr>
<tr><td><code>express.logger</code></td>
<td><a href="https://github.com/expressjs/morgan">morgan</a></td></tr>
<tr><td><code>express.session</code></td>
<td><a href="https://github.com/expressjs/session">express-session</a></td></tr>
<tr><td><code>express.favicon</code></td>
<td><a href="https://github.com/expressjs/serve-favicon">serve-favicon</a></td></tr>
<tr><td><code>express.responseTime</code></td>
<td><a href="https://github.com/expressjs/response-time">response-time</a></td></tr>
<tr><td><code>express.errorHandler</code></td>
<td><a href="https://github.com/expressjs/errorhandler">errorhandler</a></td></tr>
<tr><td><code>express.methodOverride</code></td>
<td><a href="https://github.com/expressjs/method-override">method-override</a></td></tr>
<tr><td><code>express.timeout</code></td>
<td><a href="https://github.com/expressjs/timeout">connect-timeout</a></td></tr>
<tr><td><code>express.vhost</code></td>
<td><a href="https://github.com/expressjs/vhost">vhost</a></td></tr>
<tr><td><code>express.csrf</code></td>
<td><a href="https://github.com/expressjs/csurf">csurf</a></td></tr>
<tr><td><code>express.directory</code></td>
<td><a href="https://github.com/expressjs/serve-index">serve-index</a></td></tr>
<tr><td><code>express.static</code></td>
<td><a href="https://github.com/expressjs/serve-static">serve-static</a></td></tr>
</table>

Esta es la [lista completa](https://github.com/senchalabs/connect#middleware) de middleware de Express 4.

En la mayoría de los casos, sólo tiene que sustituir el middleware de la versión 3 antigua por su contrapartida de Express 4. Para obtener detalles, consulte la documentación del módulo en GitHub.

<h4 id="app-use"><code>app.use</code> acepta parámetros</h4>

En la versión 4, puede utilizar un parámetro de variable para definir la vía de acceso donde se cargan las funciones de middleware y, a continuación, leer el valor del parámetro en el manejador de rutas.
Por ejemplo:

<pre>
<code class="language-javascript" translate="no">
app.use('/book/:id', function(req, res, next) {
  console.log('ID:', req.params.id);
  next();
});
</code>
</pre>
<h3 id="routing">
El sistema de direccionamiento
</h3>

Ahora las aplicaciones cargan implícitamente el middleware de direccionamiento, por lo que ya no tiene que preocuparse del orden con el que se carga el middleware respecto al middleware de `router`.

La forma en que define las rutas no varía, pero el sistema de direccionamiento tiene dos nuevas características que permiten organizar las rutas:

{: .doclist }
* Un nuevo método, `app.route()`, para crear manejadores de rutas encadenables para una vía de acceso de ruta.
* Una nueva clase, `express.Router`, para crear manejadores de rutas montables modulares.

<h4 id="app-route">Método <code>app.route()</code></h4>

El nuevo método `app.route()` permite crear manejadores de rutas encadenables para una vía de acceso de ruta. Como la vía de acceso se especifica en una única ubicación, la creación de rutas modulares es muy útil, al igual que la reducción de redundancia y errores tipográficos. Para obtener más información sobre las rutas, consulte la [`documentación` de Router()](/{{ page.lang }}/4x/api.html#router).

A continuación, se muestra un ejemplo de manejadores de rutas encadenados que se definen utilizando la función `app.route()`.

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

<h4 id="express-router">Clase <code>express.Router</code></h4>

La otra característica que permite organizar las rutas es una nueva clase, `express.Router`, que puede utilizar para crear manejadores de rutas montables modulares. Una instancia `Router` es un sistema de middleware y direccionamiento completo; por este motivo, a menudo se conoce como una "miniaplicación".

El siguiente ejemplo crea un direccionador como un módulo, carga el middleware en él, define algunas rutas y lo monta en una vía de acceso en la aplicación principal.

Por ejemplo, cree un archivo de direccionador denominado `birds.js` en el directorio de la aplicación, con el siguiente contenido:

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var router = express.Router();

// middleware specific to this router
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

La aplicación ahora podrá manejar solicitudes a las vías de acceso `/birds` y `/birds/about`, e invocará el middleware `timeLog` que es específico de la ruta.

<h3 id="other-changes">
Otros cambios
</h3>

En la tabla siguiente se muestran otros cambios pequeños pero importantes en Express 4:

<table class="doctable" border="1">
<tr>
<th>Objeto</th>
<th>Descripción</th>
</tr>
<tr>
<td>Node.js</td>
<td>Express 4 requiere Node.js 0.10.x o posterior y deja de dar soporte a
Node.js 0.8.x.</td>
</tr>
<tr>
<td markdown="1">
`http.createServer()`
</td>
<td markdown="1">
El módulo `http` ya no es necesario, a menos que necesite trabajar directamente con él (socket.io/SPDY/HTTPS). La aplicación puede iniciarse utilizando la función `app.listen()`.
</td>
</tr>
<tr>
<td markdown="1">
`app.configure()`
</td>
<td markdown="1">
La función `app.configure()` se ha eliminado.  Utilice la función `process.env.NODE_ENV` o
`app.get('env')` para detectar el entorno y configure la aplicación según corresponda.
</td>
</tr>
<tr>
<td markdown="1">
`json spaces`
</td>
<td markdown="1">
La propiedad de aplicación `json spaces` está inhabilitada de forma predeterminada en Express 4.
</td>
</tr>
<tr>
<td markdown="1">
`req.accepted()`
</td>
<td markdown="1">
Utilice `req.accepts()`, `req.acceptsEncodings()`,
`req.acceptsCharsets()` y `req.acceptsLanguages()`.
</td>
</tr>
<tr>
<td markdown="1">
`res.location()`
</td>
<td markdown="1">
Ya no resuelve los URL relativos.
</td>
</tr>
<tr>
<td markdown="1">
`req.params`
</td>
<td markdown="1">
Era una matriz, ahora es un objeto.
</td>
</tr>
<tr>
<td markdown="1">
`res.locals`
</td>
<td markdown="1">
Era una función, ahora es un objeto.
</td>
</tr>
<tr>
<td markdown="1">
`res.headerSent`
</td>
<td markdown="1">
Se ha cambiado por `res.headersSent`.
</td>
</tr>
<tr>
<td markdown="1">
`app.route`
</td>
<td markdown="1">
Ahora está disponible como `app.mountpath`.
</td>
</tr>
<tr>
<td markdown="1">
`res.on('header')`
</td>
<td markdown="1">
Se ha eliminado.
</td>
</tr>
<tr>
<td markdown="1">
`res.charset`
</td>
<td markdown="1">
Se ha eliminado.
</td>
</tr>
<tr>
<td markdown="1">
`res.setHeader('Set-Cookie', val)`
</td>
<td markdown="1">
La funcionalidad está ahora limitada a establecer el valor de cookie básico. Utilice `res.cookie()` para obtener la funcionalidad adicional.
</td>
</tr>
</table>

<h2 id="example-migration">Migración de aplicación de ejemplo</h2>

A continuación, se muestra un ejemplo de migración de una aplicación Express 3 a Express 4.
Los archivos de interés son `app.js` y `package.json`.

<h3 id="">
Aplicación versión 3
</h3>

<h4 id=""><code>app.js</code></h4>

Considere una aplicación Express v.3 con el siguiente archivo `app.js`:

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.methodOverride());
app.use(express.session({ secret: 'your secret here' }));
app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
</code>
</pre>

<h4 id=""><code>package.json</code></h4>

El archivo `package.json` de la versión 3 correspondiente será similar al siguiente:

<pre>
<code class="language-javascript" translate="no">
{
  "name": "application-name",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "3.12.0",
    "pug": "*"
  }
}
</code>
</pre>

<h3 id="">
Proceso
</h3>

Para empezar el proceso de migración, instale el middleware necesario para la aplicación Express 4 y actualice Express y Pug a su versión respectiva más reciente con el siguiente mandato:

```console
$ npm install serve-favicon morgan method-override express-session body-parser multer errorhandler express@latest pug@latest --save
```

Realice los cambios siguientes en `app.js`:

1. Las funciones de middleware de Express incorporadas `express.favicon`,
    `express.logger`, `express.methodOverride`,
    `express.session`, `express.bodyParser` y
    `express.errorHandler` ya no están disponibles en el objeto `express`.  Debe instalar sus alternativas manualmente y cargarlas en la aplicación.

2. Ya no es necesario cargar la función `app.router`.
    No es un objeto de aplicación Express 4 válido, por lo que debe eliminar el código `app.use(app.router);`.

3. Asegúrese de que las funciones de middleware se cargan en el orden correcto: cargue `errorHandler` después de cargar las rutas de aplicación.

<h3 id="">Aplicación versión 4</h3>

<h4 id=""><code>package.json</code></h4>

La ejecución del mandato `npm` anterior actualizará `package.json` de la siguiente manera:

<pre>
<code class="language-javascript" translate="no">
{
  "name": "application-name",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "body-parser": "^1.5.2",
    "errorhandler": "^1.1.1",
    "express": "^4.8.0",
    "express-session": "^1.7.2",
    "pug": "2.0.0-beta6",
    "method-override": "^2.1.2",
    "morgan": "^1.2.2",
    "multer": "^0.1.3",
    "serve-favicon": "^2.0.1"
  }
}
</code>
</pre>

<h4 id=""><code>app.js</code></h4>

A continuación, elimine el código no válido, cargue el middleware necesario y realice otros cambios según sea necesario. El archivo `app.js` será parecido al siguiente:

<pre>
<code class="language-javascript" translate="no">
var http = require('http');
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.get('/users', user.list);

// error handling middleware should be loaded after the loading the routes
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
</code>
</pre>

<div class="doc-box doc-info" markdown="1">
A menos que necesite trabajar directamente con el módulo `http` (socket.io/SPDY/HTTPS), no es necesario cargarlo y la aplicación puede iniciarse simplemente de la siguiente manera:
<pre>
<code class="language-js" translate="no">app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});</code>
</pre>
</div>

<h3 id="">Ejecutar la aplicación</h3>

El proceso de migración está completo y la aplicación es ahora una aplicación
Express 4. Para confirmarlo, inicie la aplicación utilizando el siguiente mandato:

```console
$ node .
```

Cargue [http://localhost:3000](http://localhost:3000) y vea la página de inicio que representa Express 4.

<h2 id="app-gen">La actualización al generador de aplicaciones Express 4</h2>

La herramienta de línea de mandatos para generar una aplicación Express continúa siendo `express`, pero para actualizar a la nueva versión, debe desinstalar el generador de aplicaciones Express 3 e instalar el nuevo `express-generator`.

<h3 id="">Instalación </h3>

Si ya ha instalado el generador de aplicaciones Express 3 en el sistema, debe desinstalarlo:

```console
$ npm uninstall -g express
```

Dependiendo de cómo se configuren los privilegios de archivos y directorios, deberá ejecutar este mandato con `sudo`.

A continuación, instale el nuevo generador:

```console
$ npm install -g express-generator
```

Dependiendo de cómo se configuren los privilegios de archivos y directorios, deberá ejecutar este mandato con `sudo`.

Ahora el mandato `express` en el sistema se actualiza al generador de Express 4.

<h3 id="">Cambios en el generador de aplicaciones </h3>

Las opciones de mandato y el uso continúan prácticamente iguales, con las siguientes excepciones:

{: .doclist }
* Se ha eliminado la opción `--sessions`.
* Se ha eliminado la opción `--jshtml`.
* Se ha añadido la opción `--hogan` para dar soporte a [Hogan.js](http://twitter.github.io/hogan.js/).

<h3 id="">Ejemplo</h3>

Ejecute el siguiente mandato para crear una aplicación Express 4:

```console
$ express app4
```

Si consulta el contenido del archivo `app4/app.js`, observará que todas las funciones de middleware (excepto `express.static`) que son necesarias para la aplicación se cargan como módulos independientes y que el middleware de `router` ya no se carga de forma explícita en la aplicación.

También observará que el archivo `app.js` es ahora un módulo Node.js, a diferencia de la aplicación autónoma que generaba el antiguo generador.

Después de instalar las dependencias, inicie la aplicación utilizando el siguiente mandato:

```console
$ npm start
```

Si consulta el script de inicio npm en el archivo `package.json`, observará que el mandato que inicia la aplicación es `node ./bin/www`, que antes era `node app.js` en Express 3.

Como el archivo `app.js` que generaba el generador de Express 4 ahora es un módulo Node.js, ya no puede iniciarse independientemente como una aplicación (a menos que modifique el código). El módulo debe cargarse en un archivo Node.js e iniciarse utilizando el archivo Node.js. El archivo Node.js es `./bin/www` en este caso.

Ni el directorio `bin` ni el archivo `www`
sin extensión son obligatorios para crear una aplicación Express o iniciar la aplicación. Son sólo sugerencias realizadas por el generador, por lo que puede modificarlos según sus necesidades.

Para eliminar el directorio `www` y dejarlo todo como en "Express 3",
suprima la línea `module.exports = app;` al final del archivo `app.js` y pegue el siguiente código en su lugar:

<pre>
<code class="language-javascript" translate="no">
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
</code>
</pre>

Asegúrese de cargar el módulo `debug` encima del archivo `app.js` utilizando el código siguiente:

<pre>
<code class="language-javascript" translate="no">
var debug = require('debug')('app4');
</code>
</pre>

A continuación, cambie `"start": "node ./bin/www"` en el archivo `package.json` por `"start": "node app.js"`.

Ahora ha devuelto la funcionalidad de `./bin/www` a `app.js`.  Este cambio no se recomienda, pero el ejercicio permite entender cómo funciona el archivo `./bin/www` y por qué el archivo `app.js` ya no se inicia solo.
