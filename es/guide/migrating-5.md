---
layout: page
title: Migración a Express 5
description: A comprehensive guide to migrating your Express.js applications from version 4 to 5, detailing breaking changes, deprecated methods, and new improvements.
menu: guide
order: 10
redirect_from: "  "
---

# Migración a Express 5

<h2 id="overview">Overview</h2>

Express 5 no es muy diferente de Express 4: los cambios en la API no son tan significativos como los de la migración de 3.0 a 4.0. Aunque la API básica permanece igual, continúa habiendo cambios que rompen el código existente; es decir, un programa de Express 4 existente no funcionará si lo actualiza para que utilice Express 5.

To install this version, you need to have a Node.js version 18 or higher. Then, execute the following command in your application directory:

```sh
npm install "express@5"
```

A continuación, puede ejecutar las pruebas automatizadas para ver qué falla y solucionar los problemas según las actualizaciones siguientes. Después de solucionar los errores de las pruebas, ejecute la aplicación para ver qué errores se producen. Verá rápidamente si la aplicación utiliza métodos o propiedades que no están soportados.

## Express 5 Codemods

To help you migrate your express server, we have created a set of codemods that will help you automatically update your code to the latest version of Express.

Run the following command for run all the codemods available:

```sh
npx codemod@latest @expressjs/v5-migration-recipe
```

If you want to run a specific codemod, you can run the following command:

```sh
npx codemod@latest @expressjs/name-of-the-codemod
```

You can find the list of available codemods [here](https://codemod.link/express).

<h2 id="changes">Changes in Express 5</h2>

**Métodos y propiedades eliminados**

<ul class="doclist">
  <li><a href="#app.del">app.del()</a></li>
  <li><a href="#app.param">app.param(fn)</a></li>
  <li><a href="#plural">Nombres de métodos pluralizados</a></li>
  <li><a href="#leading">Dos puntos delanteros en el argumento de nombre en app.param(name, fn)</a></li>
  <li><a href="#req.param">req.param(name)</a></li>
  <li><a href="#res.json">res.json(obj, status)</a></li>
  <li><a href="#res.jsonp">res.jsonp(obj, status)</a></li>
  <li><a href="#magic-redirect">res.redirect('back') and res.location('back')</a></li>
  <li><a href="#res.redirect">res.redirect(url, status)</a></li>
  <li><a href="#res.send.body">res.send(body, status)</a></li>
  <li><a href="#res.send.status">res.send(status)</a></li>
  <li><a href="#res.sendfile">res.sendfile()</a></li>
  <li><a href="#router.param">router.param(fn)</a></li>
  <li><a href="#express.static.mime">express.static.mime</a></li>
  <li><a href="#express:router-debug-logs">express:router debug logs</a></li>
</ul>

**Mejoras**

<ul class="doclist">
  <li><a href="#path-syntax">Path route matching syntax</a></li>
  <li><a href="#rejected-promises">Rejected promises handled from middleware and handlers</a></li>
  <li><a href="#express.urlencoded">express.urlencoded</a></li>
  <li><a href="#express.static.dotfiles">express.static dotfiles</a></li>
  <li><a href="#app.listen">app.listen</a></li>
  <li><a href="#app.router">app.router</a></li>
  <li><a href="#req.body">req.body</a></li>
  <li><a href="#req.host">req.host</a></li>
  <li><a href="#req.params">req.params</a></li>
  <li><a href="#req.query">req.query</a></li>
  <li><a href="#res.clearCookie">res.clearCookie</a></li>
  <li><a href="#res.status">res.status</a></li>
  <li><a href="#res.vary">res.vary</a></li>
</ul>

**Modificados**

<ul class="doclist">
  <li><a href="#res.render">res.render()</a></li>
  <li><a href="#brotli-support">Brotli encoding support</a></li>
</ul>

## Removed methods and properties

Si utiliza cualquiera de estos métodos o propiedades en la aplicación, se bloqueará. Por lo tanto, deberá cambiar la aplicación después de actualizar a la versión 5.

<h3 id="app.del">app.del()</h3>

Express 5 ya no da soporte a la función `app.del()`. Si utiliza esta función, se genera un error. Para registrar las rutas HTTP DELETE, utilice la función `app.delete()` en su lugar.

Inicialmente, se utilizaba `del` en lugar de `delete`, porque `delete` es una palabra clave reservada en JavaScript. No obstante, a partir de ECMAScript 6, `delete` y otras palabras clave reservadas pueden utilizarse correctamente como nombres de propiedad.

{% capture codemod-route-del-to-delete %}
You can replace the deprecated signatures with the following command:

```plain-text
npx codemod@latest @expressjs/route-del-to-delete
```

{% endcapture %}

{% include admonitions/note.html content=codemod-route-del-to-delete %}

```js
// v4
app.del('/user/:id', (req, res) => {
  res.send(`DELETE /user/${req.params.id}`)
})

// v5
app.delete('/user/:id', (req, res) => {
  res.send(`DELETE /user/${req.params.id}`)
})
```

<h3 id="app.param">app.param(fn)</h3>

La firma `app.param(fn)` se utilizaba para modificar el comportamiento de la función `app.param(name, fn)`. Está en desuso desde v4.11.0 y Express 5 ya no le da soporte.

<h3 id="plural">Pluralized method names</h3>

Los siguientes nombres de métodos se han pluralizado. En Express 4, el uso de los métodos antiguos daba como resultado un aviso de obsolescencia. Express 5 ya no les da soporte:

`req.acceptsLanguage()` se ha sustituido por `req.acceptsLanguages()`.

`req.acceptsCharset()` se ha sustituido por `req.acceptsCharsets()`.

`req.acceptsEncoding()` se ha sustituido por `req.acceptsEncodings()`.

{% capture codemod-pluralized-methods %}
You can replace the deprecated signatures with the following command:

```plain-text
npx codemod@latest @expressjs/pluralize-method-names
```

{% endcapture %}

{% include admonitions/note.html content=codemod-pluralized-methods %}

```js
// v4
app.all('/', (req, res) => {
  req.acceptsCharset('utf-8')
  req.acceptsEncoding('br')
  req.acceptsLanguage('en')

  // ...
})

// v5
app.all('/', (req, res) => {
  req.acceptsCharsets('utf-8')
  req.acceptsEncodings('br')
  req.acceptsLanguages('en')

  // ...
})
```

<h3 id="leading">Dos puntos (:) delanteros en el nombre de app.param(name, fn)</h3>

El carácter de dos puntos (:) delanteros en el nombre de la función `app.param(name, fn)` es un remanente de Express 3 y, a efectos de retrocompatibilidad, Express 4 le daba soporte con un aviso de obsolescencia. Express 5 lo ignorará de forma silenciosa y utilizará el parámetro de nombre sin añadir el prefijo de dos puntos.

Esto no afectará al código si sigue la documentación de Express 4 de [app.param](/{{ page.lang }}/4x/api.html#app.param), ya que no hace ninguna referencia a los dos puntos delanteros.

<h3 id="req.param">req.param(name)</h3>

Este método potencialmente confuso y peligroso de recuperar datos de formulario se ha eliminado. No necesitará buscar específicamente el nombre de parámetro enviado en el objeto `req.params`, `req.body` o `req.query`.

{% capture codemod-req-param %}
You can replace the deprecated signatures with the following command:

```plain-text
npx codemod@latest @expressjs/explicit-request-params
```

{% endcapture %}

{% include admonitions/note.html content=codemod-req-param %}

```js
// v4
app.post('/user', (req, res) => {
  const id = req.param('id')
  const body = req.param('body')
  const query = req.param('query')

  // ...
})

// v5
app.post('/user', (req, res) => {
  const id = req.params.id
  const body = req.body
  const query = req.query

  // ...
})
```

<h3 id="res.json">res.json(obj, status)</h3>

Express 5 ya no da soporte a la firma `res.json(obj, status)`. En su lugar, establezca el estado y encadénelo al método `res.json()` de la siguiente manera: `res.status(status).json(obj)`.

{% capture codemod-status-send-order %}
You can replace the deprecated signatures with the following command:

```plain-text
npx codemod@latest @expressjs/status-send-order
```

{% endcapture %}

{% include admonitions/note.html content=codemod-status-send-order %}

```js
// v4
app.post('/user', (req, res) => {
  res.json({ name: 'Ruben' }, 201)
})

// v5
app.post('/user', (req, res) => {
  res.status(201).json({ name: 'Ruben' })
})
```

<h3 id="res.jsonp">res.jsonp(obj, status)</h3>

Express 5 ya no da soporte a la firma `res.jsonp(obj, status)`. En su lugar, establezca el estado y encadénelo al método `res.jsonp()` de la siguiente manera: `res.status(status).jsonp(obj)`.

{% include admonitions/note.html content=codemod-status-send-order %}

```js
// v4
app.post('/user', (req, res) => {
  res.jsonp({ name: 'Ruben' }, 201)
})

// v5
app.post('/user', (req, res) => {
  res.status(201).jsonp({ name: 'Ruben' })
})
```

<h3 id="res.redirect">res.redirect(url, status)</h3>

Express 5 ya no da soporte a la firma `res.send(obj, status)`. En su lugar, establezca el estado y encadénelo al método `res.send()` de la siguiente manera: `res.status(status).send(obj)`.

{% capture codemod-redirect-arg-order %}
You can replace the deprecated signatures with the following command:

```plain-text
npx codemod@latest @expressjs/redirect-arg-order
```

{% endcapture %}

{% include admonitions/note.html content=codemod-redirect-arg-order %}

```js
// v4
app.get('/user', (req, res) => {
  res.redirect('/users', 301)
})

// v5
app.get('/user', (req, res) => {
  res.redirect(301, '/users')
})
```

<h3 id="magic-redirect">res.redirect('back') and res.location('back')</h3>

Express 5 no longer supports the magic string `back` in the `res.redirect()` and `res.location()` methods. Instead, use the `req.get('Referrer') || '/'` value to redirect back to the previous page. In Express 4, the `res.redirect('back')` and `res.location('back')` methods were deprecated.

{% capture codemod-back-redirect-deprecated %}
You can replace the deprecated signatures with the following command:

```plain-text
npx codemod@latest @expressjs/back-redirect-deprecated
```

{% endcapture %}

{% include admonitions/note.html content=codemod-back-redirect-deprecated %}

```js
// v4
app.get('/user', (req, res) => {
  res.redirect('back')
})

// v5
app.get('/user', (req, res) => {
  res.redirect(req.get('Referrer') || '/')
})
```

<h3 id="res.send.body">res.send(body, status)</h3>

Express 5 no longer supports the signature `res.send(obj, status)`. Instead, set the status and then chain it to the `res.send()` method like this: `res.status(status).send(obj)`.

{% include admonitions/note.html content=codemod-status-send-order %}

```js
// v4
app.get('/user', (req, res) => {
  res.send({ name: 'Ruben' }, 200)
})

// v5
app.get('/user', (req, res) => {
  res.status(200).send({ name: 'Ruben' })
})
```

<h3 id="res.send.status">res.send(status)</h3>

Express 5 ya no da soporte a la firma <code>res.send(<em>status</em>)</code>, donde _`status`_ es un número. En su lugar, utilice la función `res.sendStatus(statusCode)`, que establece el código de estado de la cabecera de respuesta HTTP y envía la versión de texto del código: "Not Found", "Internal Server Error", etc.
Si necesita enviar un número utilizando la función `res.send()`, escríbalo entre comillas para convertirlo en una serie, para que Express no lo interprete como un intento de utilizar la firma antigua no soportada.

{% include admonitions/note.html content=codemod-status-send-order %}

```js
// v4
app.get('/user', (req, res) => {
  res.send(200)
})

// v5
app.get('/user', (req, res) => {
  res.sendStatus(200)
})
```

<h3 id="res.sendfile">res.sendfile()</h3>

La función `res.sendfile()` se ha sustituido por una versión de la función `res.sendFile()` con cada palabra en mayúscula en Express 5.

**Note:** In Express 5, `res.sendFile()` uses the `mime-types` package for MIME type detection, which returns different Content-Type values than Express 4 for several common file types:

- JavaScript files (.js): now "text/javascript" instead of "application/javascript"
- JSON files (.json): now "application/json" instead of "text/json"
- CSS files (.css): now "text/css" instead of "text/plain"
- XML files (.xml): now "application/xml" instead of "text/xml"
- Font files (.woff): now "font/woff" instead of "application/font-woff"
- SVG files (.svg): now "image/svg+xml" instead of "application/svg+xml"

{% capture codemod-camelcase-sendfile %}
You can replace the deprecated signatures with the following command:

```plain-text
npx codemod@latest @expressjs/camelcase-sendfile
```

{% endcapture %}

{% include admonitions/note.html content=codemod-camelcase-sendfile %}

```js
// v4
app.get('/user', (req, res) => {
  res.sendfile('/path/to/file')
})

// v5
app.get('/user', (req, res) => {
  res.sendFile('/path/to/file')
})
```

<h3 id="router.param">router.param(fn)</h3>

The `router.param(fn)` signature was used for modifying the behavior of the `router.param(name, fn)` function. Está en desuso desde v4.11.0 y Express 5 ya no le da soporte.

<h3 id="express.static.mime">express.static.mime</h3>

In Express 5, `mime` is no longer an exported property of the `static` field.
Use the [`mime-types` package](https://github.com/jshttp/mime-types) to work with MIME type values.

**Important:** This change affects not only direct usage of `express.static.mime` but also other Express methods that rely on MIME type detection, such as `res.sendFile()`. The following MIME types have changed from Express 4:

- JavaScript files (.js): now served as "text/javascript" instead of "application/javascript"
- JSON files (.json): now served as "application/json" instead of "text/json"
- CSS files (.css): now served as "text/css" instead of "text/plain"
- HTML files (.html): now served as "text/html; charset=utf-8" instead of just "text/html"
- XML files (.xml): now served as "application/xml" instead of "text/xml"
- Font files (.woff): now served as "font/woff" instead of "application/font-woff"

```js
// v4
express.static.mime.lookup('json')

// v5
const mime = require('mime-types')
mime.lookup('json')
```

<h3 id="express:router-debug-logs">express:router debug logs</h3>

In Express 5, router handling logic is performed by a dependency. Therefore, the
debug logs for the router are no longer available under the `express:` namespace.
In v4, the logs were available under the namespaces `express:router`, `express:router:layer`,
and `express:router:route`. All of these were included under the namespace `express:*`.
In v5.1+, the logs are available under the namespaces `router`, `router:layer`, and `router:route`.
The logs from `router:layer` and `router:route` are included in the namespace `router:*`.
To achieve the same detail of debug logging when using `express:*` in v4, use a conjunction of
`express:*`, `router`, and `router:*`.

```sh
# v4
DEBUG=express:* node index.js

# v5
DEBUG=express:*,router,router:* node index.js
```

## Modificados

<h3 id="path-syntax">Path route matching syntax</h3>

Path route matching syntax is when a string is supplied as the first parameter to the `app.all()`, `app.use()`, `app.METHOD()`, `router.all()`, `router.METHOD()`, and `router.use()` APIs. The following changes have been made to how the path string is matched to an incoming request:

- The wildcard `*` must have a name, matching the behavior of parameters `:`, use `/*splat` instead of `/*`

```js
// v4
app.get('/*', async (req, res) => {
  res.send('ok')
})

// v5
app.get('/*splat', async (req, res) => {
  res.send('ok')
})
```

{% capture note_wildcard %}
`*splat` matches any path without the root path. If you need to match the root path as well `/`, you can use `/{*splat}`, wrapping the wildcard in braces.

```js
// v5
app.get('/{*splat}', async (req, res) => {
  res.send('ok')
})
```

{% endcapture %}
{% include admonitions/note.html content=note_wildcard %}

- The optional character `?` is no longer supported, use braces instead.

```js
// v4
app.get('/:file.:ext?', async (req, res) => {
  res.send('ok')
})

// v5
app.get('/:file{.:ext}', async (req, res) => {
  res.send('ok')
})
```

- Regexp characters are not supported. For example:

```js
app.get('/[discussion|page]/:slug', async (req, res) => {
  res.status(200).send('ok')
})
```

should be changed to:

```js
app.get(['/discussion/:slug', '/page/:slug'], async (req, res) => {
  res.status(200).send('ok')
})
```

- Some characters have been reserved to avoid confusion during upgrade (`()[]?+!`), use `\` to escape them.
- Parameter names now support valid JavaScript identifiers, or quoted like `:"this"`.

<h3 id="rejected-promises">Rejected promises handled from middleware and handlers</h3>

Request middleware and handlers that return rejected promises are now handled by forwarding the rejected value as an `Error` to the error handling middleware. This means that using `async` functions as middleware and handlers are easier than ever. When an error is thrown in an `async` function or a rejected promise is `await`ed inside an async function, those errors will be passed to the error handler as if calling `next(err)`.

Details of how Express handles errors is covered in the [error handling documentation](/en/guide/error-handling.html).

<h3 id="express.urlencoded">express.urlencoded</h3>

The `express.urlencoded` method makes the `extended` option `false` by default.

<h3 id="express.static.dotfiles">express.static dotfiles</h3>

In Express 5, the `express.static` middleware's `dotfiles` option now defaults to `"ignore"`. This is a change from Express 4, where dotfiles were served by default. As a result, files inside a directory that starts with a dot (`.`), such as `.well-known`, will no longer be accessible and will return a **404 Not Found** error. This can break functionality that depends on serving dot-directories, such as Android App Links, and Apple Universal Links.

Example of breaking code:

```js
// v4
app.use(express.static('public'))
```

After migrating to Express 5, a request to `/.well-known/assetlinks.json` will result in a **404 Not Found**.

To fix this, serve specific dot-directories explicitly using the `dotfiles: "allow"` option:

```js
// v5
app.use('/.well-known', express.static('public/.well-known', { dotfiles: 'allow' }))
app.use(express.static('public'))
```

This approach allows you to safely serve only the intended dot-directories while keeping the default secure behavior for other dotfiles, which remain inaccessible.

<h3 id="app.listen">app.listen</h3>

In Express 5, the `app.listen` method will invoke the user-provided callback function (if provided) when the server receives an error event. In Express 4, such errors would be thrown. This change shifts error-handling responsibility to the callback function in Express 5. If there is an error, it will be passed to the callback as an argument.
For example:

```js
const server = app.listen(8080, '0.0.0.0', (error) => {
  if (error) {
    throw error // e.g. EADDRINUSE
  }
  console.log(`Listening on ${JSON.stringify(server.address())}`)
})
```

<h3 id="app.router">app.router</h3>

El objeto `app.router`, que se ha eliminado en Express 4, ha vuelto en Express 5. En la nueva versión, este objeto es sólo una referencia al direccionador de Express base, a diferencia de en Express 3, donde una aplicación debía cargarlo explícitamente.

<h3 id="req.body">req.body</h3>

The `req.body` property returns `undefined` when the body has not been parsed. In Express 4, it returns `{}` by default.

<h3 id="req.host">req.host</h3>

En Express 4, la función `req.host` fragmentaba incorrectamente el número de puerto si estaba presente. In Express 5, the port number is maintained.

<h3 id="req.params">req.params</h3>

The `req.params` object now has a **null prototype** when using string paths. However, if the path is defined with a regular expression, `req.params` remains a standard object with a normal prototype. Additionally, there are two important behavioral changes:

**Wildcard parameters are now arrays:**

Wildcards (e.g., `/*splat`) capture path segments as an array instead of a single string.

```js
app.get('/*splat', (req, res) => {
  // GET /foo/bar
  console.dir(req.params)
  // => [Object: null prototype] { splat: [ 'foo', 'bar' ] }
})
```

**Unmatched parameters are omitted:**

In Express 4, unmatched wildcards were empty strings (`''`) and optional `:` parameters (using `?`) had a key with value `undefined`. In Express 5, unmatched parameters are completely omitted from `req.params`.

```js
// v4: unmatched wildcard is empty string
app.get('/*', (req, res) => {
  // GET /
  console.dir(req.params)
  // => { '0': '' }
})

// v4: unmatched optional param is undefined
app.get('/:file.:ext?', (req, res) => {
  // GET /image
  console.dir(req.params)
  // => { file: 'image', ext: undefined }
})

// v5: unmatched optional param is omitted
app.get('/:file{.:ext}', (req, res) => {
  // GET /image
  console.dir(req.params)
  // => [Object: null prototype] { file: 'image' }
})
```

<h3 id="req.query">req.query</h3>

The `req.query` property is no longer a writable property and is instead a getter. The default query parser has been changed from "extended" to "simple".

<h3 id="res.clearCookie">res.clearCookie</h3>

The `res.clearCookie` method ignores the `maxAge` and `expires` options provided by the user.

<h3 id="res.status">res.status</h3>

The `res.status` method only accepts integers in the range of `100` to `999`, following the behavior defined by Node.js, and it returns an error when the status code is not an integer.

<h3 id="res.query">res.vary</h3>

The `res.vary` throws an error when the `field` argument is missing. In Express 4, if the argument was omitted, it gave a warning in the console

## Improvements

<h3 id="res.render">res.render()</h3>

Este método ahora impone un comportamiento asíncrono para todos los motores de vistas, lo que evita los errores provocados por los motores de vistas que tenían una implementación síncrona e incumplían la interfaz recomendada.

<h3 id="brotli-support">Brotli encoding support</h3>

Express 5 supports Brotli encoding for requests received from clients that support it.
