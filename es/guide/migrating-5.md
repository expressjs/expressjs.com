---
layout: página
title: Migración a Express 5
description: Una guía completa para migrar sus aplicaciones Express.js de la versión 4 a 5, detallando los cambios de ruptura, métodos obsoletos y nuevas mejoras.
menu: guía
lang: es
redirect_from: /es/guide/migrating-5.html
---

# Migración a Express 5

<h2 id="overview">Resumen</h2>

Express 5 no es muy diferente de Express 4: los cambios en la API no son tan significativos como los de la migración de 3.0 a 4.0. Aunque la API básica permanece igual, continúa habiendo cambios que rompen el código existente; es decir, un programa de Express 4 existente no funcionará si lo actualiza para que utilice Express 5.

Para instalar esta versión, necesita tener una versión 18 o superior de Node.js. Luego, ejecuta el siguiente comando en el directorio de tu aplicación:

```sh
npm install "express@5"
```

A continuación, puede ejecutar las pruebas automatizadas para ver qué falla y solucionar los problemas según las actualizaciones siguientes. Después de solucionar los errores de las pruebas, ejecute la aplicación para ver qué errores se producen. Verá rápidamente si la aplicación utiliza métodos o propiedades que no están soportados.

## Express 5 Codemods

To help you migrate your express server, we have created a set of codemods that will help you automatically update your code to the latest version of Express.

Run the following command for run all the codemods available:

```sh
npx @expressjs/codemod upgrade
```

If you want to run a specific codemod, you can run the following command:

```sh
npx @expressjs/codemod name-of-the-codemod
```

You can find the list of available codemods [here](https://github.com/expressjs/codemod?tab=readme-ov-file#available-codemods).

<h2 id="changes">Cambios en Express 5</h2>

**Métodos y propiedades eliminados**

<ul class="doclist">
  <li><a href="#app.del">app.del()</a></li>
  <li><a href="#app.param">app.param(fn)</a></li>
  <li><a href="#plural">Nombres de métodos pluralizados</a></li>
  <li><a href="#leading">Dos puntos delanteros en el argumento de nombre en app.param(name, fn)</a></li>
  <li><a href="#req.param">req.param(nombre)</a></li>
  <li><a href="#res.json">res.json(obj, status)</a></li>
  <li><a href="#res.jsonp">res.jsonp(obj, status)</a></li>
  <li><a href="#magic-redirect">res.redirect('back') y res.location('back')</a></li>  
  <li><a href="#res.redirect">res.redirect(url, status)</a></li>
  <li><a href="#res.send.body">res.send(body, status)</a></li>
  <li><a href="#res.send.status">res.send(status)</a></li>
  <li><a href="#res.sendfile">res.sendfile()</a></li>
  <li><a href="#express.static.mime">express.static.mime</a></li>
  <li><a href="#express:router-debug-logs">express:router debug logs</a></li>
</ul>

**Mejoras**

<ul class="doclist">
  <li><a href="#path-syntax">Ruta de ruta que coincide con la sintaxis</a></li>
  <li><a href="#rejected-promises">promesas rechazadas manejadas por middleware y manejadores</a></li>
  <li><a href="#express.urlencoded">express.urlencoded</a></li>
  <li><a href="#app.listen">app.listen</a></li>
  <li><a href="#app.router">app.router</a></li>
  <li><a href="#req.body">req.body</a></li>
  <li><a href="#req.host">req.host</a></li>
  <li><a href="#req.query">req.query</a></li>
  <li><a href="#res.clearCookie">res.clearCookie</a></li>
  <li><a href="#res.status">res.status</a></li>
  <li><a href="#res.vary">res.vary</a></li>
</ul>

**Modificados**

<ul class="doclist">
  <li><a href="#res.render">res.render()</a></li>
  <li><a href="#brotli-support">Soporte de codificación de Brotli</a></li>
</ul>

### Métodos y propiedades eliminados

Si utiliza cualquiera de estos métodos o propiedades en la aplicación, se bloqueará. Por lo tanto, deberá cambiar la aplicación después de actualizar a la versión 5.

<h4 id="app.del">app.del()</h4>

Express 5 ya no da soporte a la función `app.del()`. Si utiliza esta función, se genera un error. Para registrar las rutas HTTP DELETE, utilice la función `app.delete()` en su lugar.

Inicialmente, se utilizaba `del` en lugar de `delete`, porque `delete` es una palabra clave reservada en JavaScript. No obstante, a partir de ECMAScript 6, `delete` y otras palabras clave reservadas pueden utilizarse correctamente como nombres de propiedad.

{% capture codemod-deprecated-signatures %}
You can replace the deprecated signatures with the following command:

```plain-text
npx @expressjs/codemod v4-deprecated-signatures
```

{% endcapture %}

{% include admonitions/note.html content=codemod-deprecated-signatures %}

```js
// v4
app.del('/user/:id', (req, res) => {
  res.send(`DELETE /user/${req.params.id}`)
})

// v5
app. elete('/user/:id', (req, res) => {
  res.send(`DELETE /user/${req.params.id}`)
})
```

<h4 id="app.param">app.param(fn)</h4>

La firma `app.param(fn)` se utilizaba para modificar el comportamiento de la función `app.param(name, fn)`. Está en desuso desde v4.11.0 y Express 5 ya no le da soporte.

<h4 id="plural">Nombres de métodos pluralizados</h4>

Los siguientes nombres de métodos se han pluralizado. En Express 4, el uso de los métodos antiguos daba como resultado un aviso de obsolescencia. Express 5 ya no les da soporte:

`req.acceptsLanguage()` se ha sustituido por `req.acceptsLanguages()`.

`req.acceptsCharset()` se ha sustituido por `req.acceptsCharsets()`.

`req.acceptsEncoding()` se ha sustituido por `req.acceptsEncodings()`.

{% capture codemod-pluralized-methods %}
You can replace the deprecated signatures with the following command:

```plain-text
npx @expressjs/codemod pluralized-methods
```

{% endcapture %}

{% include admonitions/note.html content=codemod-pluralized-methods %}

```js
// v4
app.all('/', (req, res) => {
  req.acceptsCharset('utf-8')
  req. cceptsEncoding('br')
  req.acceptsLanguage('en')

  // ...
})

// v5
app. ll('/', (req, res) => {
  req.acceptsCharsets('utf-8')
  req.acceptsEncodings('br')
  req.acceptsLanguages('en')

  // ...
})
```

<h4 id="leading">Dos puntos (:) delanteros en el nombre de app.param(name, fn)</h4>

El carácter de dos puntos (:) delanteros en el nombre de la función `app.param(name, fn)` es un remanente de Express 3 y, a efectos de retrocompatibilidad, Express 4 le daba soporte con un aviso de obsolescencia. Express 5 lo ignorará de forma silenciosa y utilizará el parámetro de nombre sin añadir el prefijo de dos puntos.

Esto no afectará al código si sigue la documentación de Express 4 de [app.param](/{{ page.lang }}/4x/api.html#app.param), ya que no hace ninguna referencia a los dos puntos delanteros.

<h4 id="req.param">req.param(nombre)</h4>

Este método potencialmente confuso y peligroso de recuperar datos de formulario se ha eliminado. No necesitará buscar específicamente el nombre de parámetro enviado en el objeto `req.params`, `req.body` o `req.query`.

{% capture codemod-req-param %}
You can replace the deprecated signatures with the following command:

```plain-text
npx @expressjs/codemod req-param
```

{% endcapture %}

{% include admonitions/note.html content=codemod-req-param %}

```js
// v4
app.post('/user', (req, res) => {
  const id = req.param('id')
  const body = req. aram('body')
  const query = req.param('query')

  // ...
})

// v5
app.post('/user', (req, res) => {
  const id = req.params. d
  const body = req.body
  const query = req.query

  // ...
})
```

<h4 id="res.json">res.json(obj, estado)</h4>

Express 5 ya no da soporte a la firma `res.json(obj, status)`. En su lugar, establezca el estado y encadénelo al método `res.json()` de la siguiente manera: `res.status(status).json(obj)`.

{% include admonitions/note.html content=codemod-deprecated-signatures %}

```js
// v4
app.post('/user', (req, res) => {
  res.json({ name: 'Ruben' }, 201)
})

// v5
app. ost('/user', (req, res) => {
  res.status(201).json({ name: 'Ruben' })
})
```

<h4 id="res.jsonp">res.jsonp(obj, status)</h4>

Express 5 ya no da soporte a la firma `res.jsonp(obj, status)`. En su lugar, establezca el estado y encadénelo al método `res.jsonp()` de la siguiente manera: `res.status(status).jsonp(obj)`.

{% include admonitions/note.html content=codemod-deprecated-signatures %}

```js
// v4
app.post('/user', (req, res) => {
  res.jsonp({ name: 'Ruben' }, 201)
})

// v5
app. ost('/user', (req, res) => {
  res.status(201).jsonp({ name: 'Ruben' })
})
```

<h4 id="res.redirect">res.redirect(url, status)</h4>

Express 5 ya no da soporte a la firma `res.send(obj, status)`. En su lugar, establezca el estado y encadénelo al método `res.send()` de la siguiente manera: `res.status(status).send(obj)`.

{% include admonitions/note.html content=codemod-deprecated-signatures %}

```js
// v4
app.get('/user', (req, res) => {
  res.redirect('/users', 301)
})

// v5
app. et('/user', (req, res) => {
  res.redirect(301, '/users')
})
```

<h4 id="magic-redirect">res.redirect('back') y res.location('back')</h4>

Express 5 ya no soporta la cadena mágica `back` en los métodos `res.redirect()` y `res.location()`. En su lugar, utilice el valor `req.get('Referrer') || '/'` para redirigir de vuelta a la página anterior. En Express 4, los métodos res.`redirect('back')` y `res.location('back')` fueron obsoletos.

{% capture codemod-magic-redirect %}
You can replace the deprecated signatures with the following command:

```plain-text
npx @expressjs/codemod magic-redirect
```

{% endcapture %}

{% include admonitions/note.html content=codemod-magic-redirect %}

```js
// v4
app.get('/user', (req, res) => {
  res.redirect('back')
})

// v5
app. et('/user', (req, res) => {
  res.redirect(req.get('Referrer') || '/')
})
```

<h4 id="res.send.body">res.send(cuerpo, estado)</h4>

Express 5 ya no soporta la firma `res.send(obj, status)`. En su lugar, establece el estado y luego lo encadena al método `res.send()` de esta manera: `res.status(status).send(obj)`.

{% include admonitions/note.html content=codemod-deprecated-signatures %}

```js
// v4
app.get('/user', (req, res) => {
  res.send({ name: 'Ruben' }, 200)
})

// v5
app. et('/user', (req, res) => {
  res.status(200).send({ name: 'Ruben' })
})
```

<h4 id="res.send.status">res.send(status)</h4>

Express 5 ya no da soporte a la firma <code>res.send(<em>status</em>)</code>, donde _`status`_ es un número. En su lugar, utilice la función `res.sendStatus(statusCode)`, que establece el código de estado de la cabecera de respuesta HTTP y envía la versión de texto del código: "Not Found", "Internal Server Error", etc.
Si necesita enviar un número utilizando la función `res.send()`, escríbalo entre comillas para convertirlo en una serie, para que Express no lo interprete como un intento de utilizar la firma antigua no soportada.

{% include admonitions/note.html content=codemod-deprecated-signatures %}

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

<h4 id="res.sendfile">res.sendfile()</h4>

La función `res.sendfile()` se ha sustituido por una versión de la función `res.sendFile()` con cada palabra en mayúscula en Express 5.

{% include admonitions/note.html content=codemod-deprecated-signatures %}

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

<h4 id="express.static.mime">express.static.mime</h4>

In Express 5, `mime` is no longer an exported property of the `static` field.
Use the [`mime-types` package](https://github.com/jshttp/mime-types) to work with MIME type values.

```js
// v4
express.static.mime.lookup('json')

// v5
const mime = require('mime-types')
mime.lookup('json')
```

<h4 id="express:router-debug-logs">express:router debug logs</h4>

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

<h3>Modificados</h3>

<h4 id="path-syntax">Ruta de ruta que coincide con sintaxis</h4>

Ruta de ruta que coincide con la sintaxis es cuando se proporciona una cadena como el primer parámetro a las APIs `app.all()`, `app.use()`, `app.METHOD()`, `router.all()`, `router.METHOD()`, y `router.use()`. Se han realizado los siguientes cambios en cómo la cadena de ruta se corresponde con una solicitud entrante:

- El comodín `*` debe tener un nombre, coincidiendo con el comportamiento de los parámetros `:`, use `/*splat` en lugar de `/*`

```js
// v4
app.get('/*', async (req, res) => {
  res.send('ok')
})

// v5
app. et('/*splat', async (req, res) => {
  res.send('ok')
})
```

{% capture note_wildcard %}
`*splat` coincide con cualquier ruta sin la ruta raíz. Si necesita coincidir con la ruta de la raíz también `/`, puede usar `/{*splat}`, envolviendo el comodín entre llaves.

```js
// v5
app.get('/{*splat}', async (req, res) => {
  res.send('ok')
})
```

{% endcapture %}
{% include admonitions/note.html content=note_wildcard %}

- El carácter opcional `?` ya no es compatible, utilice llaves en su lugar.

```js
// v4
app.get('/:file.:ext?', async (req, res) => {
  res.send('ok')
})

// v5
app. et('/:file{.:ext}', async (req, res) => {
  res.send('ok')
})
```

- Los caracteres de expresión regular no son compatibles. Por ejemplo:

```js
app.get('/[discussion|page]/:slug', async (req, res) => {
  res.status(200).send('ok')
})
```

debe cambiarse a:

```js
app.get(['/discussion/:slug', '/page/:slug'], async (req, res) => {
  res.status(200).send('ok')
})
```

- Algunos caracteres han sido reservados para evitar confusión durante la actualización (`()[]?+!`), use `\` para escapar de ellos.
- Los nombres de parámetros ahora soportan identificadores JavaScript válidos, o citan como `:"this"`.

<h4 id="rejected-promises">Las promesas rechazadas manejadas por middleware y manejadores</h4>

Solicitar middleware y manejadores que devuelven promesas rechazadas ahora son manejados reenviando el valor rechazado como un `Error` al middleware que maneja errores. Esto significa que usar 'async' funciones como middleware y manejadores son más fáciles que nunca. Cuando se arroja un error en una función `async` o una promesa rechazada es `await`ed dentro de una función asíncrona, esos errores se pasarán al gestor de errores como si llamara a `next(err)`.

Detalles de cómo Express maneja los errores se cubren en la [documentación de manejo de errores](/en/guide/error-handling.html).

<h4 id="express.urlencoded">express.urlencoded</h4>

El método `express.urlencoded` hace que la opción `extended` sea `false` por defecto.

<h4 id="app.listen">app.listen</h4>

En Express 5, el método `app.listen` invocará la función callback proporcionada por el usuario (si se proporciona) cuando el servidor reciba un evento de error. En Express 4, esos errores se lanzarían. This change shifts error handling responsibility to the callback function in Express 5. Si hay un error, se pasará al callback como argumento.
Por ejemplo:

```js
const server = app.listen(8080, '0.0.0.0', (error) => {
  if (error) {
    arrojar error // e.g. EADDRINUSE
  }
  console.log(`Escuchando en ${JSON.stringify(server.address())}`)
})
```

<h4 id="app.router">app.router</h4>

El objeto `app.router`, que se ha eliminado en Express 4, ha vuelto en Express 5. En la nueva versión, este objeto es sólo una referencia al direccionador de Express base, a diferencia de en Express 3, donde una aplicación debía cargarlo explícitamente.

<h4 id="req.body">req.body</h4> 

La propiedad `req.body` devuelve `undefined` cuando el cuerpo no ha sido analizado. En Express 4, devuelve `{}` por defecto.

<h4 id="req.host">req.host</h4>

En Express 4, la función `req.host` fragmentaba incorrectamente el número de puerto si estaba presente. En Express 5, el número de puerto se mantiene.

<h4 id="req.query">req.query</h4>

La propiedad `req.query` ya no es una propiedad escribible y en su lugar es un getter. El analizador de consultas por defecto ha sido cambiado de "extendido" a "simple".

<h4 id="res.clearCookie">res.clearCookie</h4>

El método `res.clearCookie` ignora las opciones `maxAge` y `expires` proporcionadas por el usuario.

<h4 id="res.status">res.estado</h4>

El método `res.status` sólo acepta enteros en el rango de `100` a `999`, siguiendo el comportamiento definido por Node. , y devuelve un error cuando el código de estado no es un entero.

<h4 id="res.query">res.variar</h4>

El `res.vary` arroja un error cuando falta el argumento `field`. En Express 4, si el argumento fue omitido, dio una advertencia en la consola

### Mejoras

<h4 id="res.render">res.render()</h4>

Este método ahora impone un comportamiento asíncrono para todos los motores de vistas, lo que evita los errores provocados por los motores de vistas que tenían una implementación síncrona e incumplían la interfaz recomendada.

<h4 id="brotli-support">Soporte de codificación Brotli</h4>

Express 5 soporta la codificación de Brotli para peticiones recibidas de clientes que lo soportan.
