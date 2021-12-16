---
layout: page
title: Utilización del middleware de Express
menu: guide
lang: es
---

# Utilización del middleware

Express es una infraestructura web de direccionamiento y middleware que tiene una funcionalidad mínima propia: una aplicación Express es fundamentalmente una serie de llamadas a funciones de middleware.

Las funciones de *middleware* son funciones que tienen acceso al [objeto de solicitud](/{{ page.lang }}/4x/api.html#req) (`req`), al [objeto de respuesta](/{{ page.lang }}/4x/api.html#res) (`res`) y a la siguiente función de middleware en el ciclo de solicitud/respuestas de la aplicación. La siguiente función de middleware se denota normalmente con una variable denominada `next`.

Las funciones de middleware pueden realizar las siguientes tareas:

* Ejecutar cualquier código.
* Realizar cambios en la solicitud y los objetos de respuesta.
* Finalizar el ciclo de solicitud/respuestas.
* Invocar la siguiente función de middleware en la pila.

Si la función de middleware actual no finaliza el ciclo de solicitud/respuestas, debe invocar `next()` para pasar el control a la siguiente función de middleware. De lo contrario, la solicitud quedará colgada.

Una aplicación Express puede utilizar los siguientes tipos de middleware:

 - [Middleware de nivel de aplicación](#middleware.application)
 - [Middleware de nivel de direccionador](#middleware.router)
 - [Middleware de manejo de errores](#middleware.error-handling)
 - [Middleware incorporado](#middleware.built-in)
 - [Middleware de terceros](#middleware.third-party)

Puede cargar middleware de nivel de aplicación y de nivel de direccionador con una vía de acceso de montaje opcional.
También puede cargar una serie de funciones de middleware a la vez, lo que crea una subpila del sistema de middleware en un punto de montaje.

<h2 id='middleware.application'>Middleware de nivel de aplicación</h2>

Enlace el middleware de nivel de aplicación a una instancia del [objeto de aplicación](/{{ page.lang }}/4x/api.html#app) utilizando las funciones `app.use()` y `app.METHOD()`, donde `METHOD` es el método HTTP de la solicitud que maneja la función de middleware (por ejemplo, GET, PUT o POST) en minúsculas.

Este ejemplo muestra una función de middleware sin ninguna vía de acceso de montaje. La función se ejecuta cada vez que la aplicación recibe una solicitud.

<pre>
<code class="language-javascript" translate="no">
var app = express();

app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});
</code>
</pre>

Este ejemplo muestra una función de middleware montada en la vía de acceso `/user/:id`. La función se ejecuta para cualquier tipo de solicitud HTTP en la vía de acceso `/user/:id`.

<pre>
<code class="language-javascript" translate="no">
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
</code>
</pre>

Este ejemplo muestra una ruta y su función de manejador (sistema de middleware). La función maneja las solicitudes GET a la vía de acceso `/user/:id`.

<pre>
<code class="language-javascript" translate="no">
app.get('/user/:id', function (req, res, next) {
  res.send('USER');
});
</code>
</pre>

A continuación, se muestra un ejemplo de carga de una serie de funciones de middleware en un punto de montaje, con una vía de acceso de montaje.
Ilustra una subpila de middleware que imprime información de solicitud para cualquier tipo de solicitud HTTP en la vía de acceso `/user/:id`.

<pre>
<code class="language-javascript" translate="no">
app.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
</code>
</pre>

Los manejadores de rutas permiten definir varias rutas para una vía de acceso. El ejemplo siguiente define dos rutas para las solicitudes GET a la vía de acceso `/user/:id`. La segunda ruta no dará ningún problema, pero nunca se invocará, ya que la primera ruta finaliza el ciclo de solicitud/respuestas.

Este ejemplo muestra una subpila de middleware que maneja solicitudes GET a la vía de acceso `/user/:id`.

<pre>
<code class="language-javascript" translate="no">
app.get('/user/:id', function (req, res, next) {
  console.log('ID:', req.params.id);
  next();
}, function (req, res, next) {
  res.send('User Info');
});

// handler for the /user/:id path, which prints the user ID
app.get('/user/:id', function (req, res, next) {
  res.end(req.params.id);
});
</code>
</pre>

Para omitir el resto de las funciones de middleware de una pila de middleware de direccionador, invoque `next('route')` para pasar el control a la siguiente ruta.
**NOTA**: `next('route')` sólo funcionará en las funciones de middleware que se hayan cargado utilizando las funciones `app.METHOD()` o `router.METHOD()`.

Este ejemplo muestra una subpila de middleware que maneja solicitudes GET a la vía de acceso `/user/:id`.

<pre>
<code class="language-javascript" translate="no">
app.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next route
  if (req.params.id == 0) next('route');
  // otherwise pass the control to the next middleware function in this stack
  else next(); //
}, function (req, res, next) {
  // render a regular page
  res.render('regular');
});

// handler for the /user/:id path, which renders a special page
app.get('/user/:id', function (req, res, next) {
  res.render('special');
});
</code>
</pre>

<h2 id='middleware.router'>Middleware de nivel de direccionador</h2>

El middleware de nivel de direccionador funciona de la misma manera que el middleware de nivel de aplicación, excepto que está enlazado a una instancia de `express.Router()`.

<pre>
<code class="language-javascript" translate="no">
var router = express.Router();
</code>
</pre>
Cargue el middleware de nivel de direccionador utilizando las funciones `router.use()` y `router.METHOD()`.

El siguiente código de ejemplo replica el sistema de middleware que se ha mostrado anteriormente para el middleware de nivel de aplicación, utilizando el middleware de nivel de direccionador:

<pre>
<code class="language-javascript" translate="no">
var app = express();
var router = express.Router();

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next router
  if (req.params.id == 0) next('route');
  // otherwise pass control to the next middleware function in this stack
  else next(); //
}, function (req, res, next) {
  // render a regular page
  res.render('regular');
});

// handler for the /user/:id path, which renders a special page
router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id);
  res.render('special');
});

// mount the router on the app
app.use('/', router);
</code>
</pre>

<h2 id='middleware.error-handling'>Middleware de manejo de errores</h2>

<div class="doc-box doc-notice" markdown="1">
El middleware de manejo de errores siempre utiliza *cuatro* argumentos.  Debe proporcionar cuatro argumentos para identificarlo como una función de middleware de manejo de errores. Aunque no necesite utilizar el objeto `next`, debe especificarlo para mantener la firma. De lo contrario, el objeto `next` se interpretará como middleware normal y no podrá manejar errores.
</div>

Defina las funciones de middleware de manejo de errores de la misma forma que otras funciones de middleware, excepto con cuatro argumentos en lugar de tres, específicamente con la firma `(err, req, res, next)`:

<pre>
<code class="language-javascript" translate="no">
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
</code>
</pre>

Para obtener detalles sobre el middleware de manejo de errores, consulte: [Manejo de errores](/{{ page.lang }}/guide/error-handling.html).

<h2 id='middleware.built-in'>Middleware incorporado</h2>

Desde la versión 4.x, Express ya no depende de [Connect](https://github.com/senchalabs/connect). Excepto `express.static`, todas las funciones de middleware que se incluían previamente con Express están ahora en módulos diferentes. Consulte [la lista de funciones de middleware](https://github.com/senchalabs/connect#middleware).

<h4 id='express.static'>express.static(root, [options])</h4>

La única función de middleware incorporado en Express es `express.static`. Esta función se basa en [serve-static](https://github.com/expressjs/serve-static) y es responsable del servicio de activos estáticos de una aplicación Express.

El argumento `root` especifica el directorio raíz desde el que se realiza el servicio de activos estáticos.

El objeto `options` opcional puede tener las siguientes propiedades:

| Propiedad      | Descripción                                                           |   Tipo      | Valor predeterminado         |
|---------------|-----------------------------------------------------------------------|-------------|-----------------|
| `dotfiles`    | Opción para el servicio de dotfiles. Los valores posibles son "allow", "deny" e "ignore" | Serie | "ignore" |
| `etag`        | Habilitar o inhabilitar la generación de etag  | Booleano | `true` |
| `extensions`  | Establece las reservas de extensiones de archivos. | Matriz | `[]` |
| `index`       | Envía el archivo de índices de directorios. Establézcalo en `false` para inhabilitar la indexación de directorios. | Mixto | "index.html" |
 `lastModified` | Establezca la cabecera `Last-Modified` en la última fecha de modificación del archivo en el sistema operativo. Los valores posibles son `true` o `false`. | Booleano | `true` |
| `maxAge`      | Establezca la propiedad max-age de la cabecera Cache-Control en milisegundos o una serie en [formato ms](https://www.npmjs.org/package/ms) | Número | 0 |
| `redirect`    | Redireccionar a la "/" final cuando el nombre de vía de acceso es un directorio. | Booleano | `true` |
| `setHeaders`  | Función para establecer las cabeceras HTTP que se sirven con el archivo. | Función |  |

A continuación, se muestra un ejemplo de uso de la función de middleware `express.static` con un objeto de opciones elaboradas:

<pre>
<code class="language-javascript" translate="no">
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
}

app.use(express.static('public', options));
</code>
</pre>

Puede tener más de un directorio estático para cada aplicación:

<pre>
<code class="language-javascript" translate="no">
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.static('files'));
</code>
</pre>

Para obtener más detalles sobre la función `serve-static` y sus opciones, consulte la documentación de [serve-static](https://github.com/expressjs/serve-static).

<h2 id='middleware.third-party'>Middleware de terceros</h2>

Utilice el middleware de terceros para añadir funcionalidad a las aplicaciones Express.

Instale el módulo Node.js para la funcionalidad necesaria y cárguelo en la aplicación a nivel de aplicación o a nivel de direccionador.

El siguiente ejemplo ilustra la instalación y carga de la función de middleware de análisis de cookies `cookie-parser`.

```console
$ npm install cookie-parser
```

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

// load the cookie-parsing middleware
app.use(cookieParser());
</code>
</pre>

Para ver una lista parcial de las funciones de middleware de terceros que más se utilizan con Express, consulte: [Middleware de terceros](../resources/middleware.html).
