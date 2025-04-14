---
layout: page
title: Migration vers Express 5
description: A comprehensive guide to migrating your Express.js applications from version 4 to 5, detailing breaking changes, deprecated methods, and new improvements.
menu: guide
lang: fr
redirect_from: /guide/migrating-5.html
---

# Migration vers Express 5

<h2 id="overview">Présentation</h2>

Express 5 n'est pas très différent d'Express 4 : les
modifications apportées à l'API ne sont pas aussi importantes qu'entre
les versions 3.0 et 4.0. Bien que l'API de base reste identique, des modifications radicales ont été apportées ; en d'autres termes, un programme Express 4 risque de ne pas fonctionner si
vous le mettez à jour pour utiliser Express 5.

To install this version, you need to have a Node.js version 18 or higher. Then, execute the following command in your application directory:

```sh
npm install "express@5"
```

Vous pouvez alors exécuter les tests automatisés pour voir les
échecs et corriger les problèmes en fonction des mises à jour
répertoriées ci-dessous. Après avoir traité les échecs de test,
exécutez votre application pour détecter les erreurs qui se
produisent. Vous saurez tout de suite si l'application utilise des
méthodes ou des propriétés.

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

<h2 id="changes">Modifications dans Express 5</h2>

**Méthodes et propriétés supprimées**

<ul class="doclist">
  <li><a href="#app.del">app.del()</a></li>
  <li><a href="#app.param">app.param(fn)</a></li>
  <li><a href="#plural">Noms de méthodes au pluriel</a></li>
  <li><a href="#leading">Signe deux-points de tête dans l'argument du
nom pour app.param(name, fn)</a></li>
  <li><a href="#req.param">req.param(name)</a></li>
  <li><a href="#res.json">res.json(obj, status)</a></li>
  <li><a href="#res.jsonp">res.jsonp(obj, status)</a></li>
  <li><a href="#magic-redirect">res.redirect('back') and res.location('back')</a></li>  
  <li><a href="#res.redirect">res.redirect(url, status)</a></li>
  <li><a href="#res.send.body">res.send(body, status)</a></li>
  <li><a href="#res.send.status">res.send(status)</a></li>
  <li><a href="#res.sendfile">res.sendfile()</a></li>
  <li><a href="#express.static.mime">express.static.mime</a></li>
  <li><a href="#express:router-debug-logs">express:router debug logs</a></li>
</ul>

**Améliorations**

<ul class="doclist">
  <li><a href="#path-syntax">Path route matching syntax</a></li>
  <li><a href="#rejected-promises">Rejected promises handled from middleware and handlers</a></li>
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

**Modifié**

<ul class="doclist">
  <li><a href="#res.render">res.render()</a></li>
  <li><a href="#brotli-support">Brotli encoding support</a></li>
</ul>

### Méthodes et propriétés supprimées

Si vous utilisez une de ces méthodes ou propriétés dans votre
application, elle tombera en panne. Vous devrez donc modifier votre
application après la mise à jour vers la version 5.

<h4 id="app.del">app.del()</h4>

Express 5 ne prend plus en charge la fonction
`app.del()`. Si vous utilisez cette fonction, une
erreur est émise. Pour enregistrer des routes HTTP DELETE, utilisez la fonction
`app.delete()` à la place.

Initialement, `del` était utilisé au lieu de
`delete` car `delete` est un mot
clé réservé dans JavaScript. Cependant, à partir d'ECMAScript 6,
`delete` et les autres mots clés réservés peuvent
être utilisés en toute légalité comme noms de propriété.

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
app.delete('/user/:id', (req, res) => {
  res.send(`DELETE /user/${req.params.id}`)
})
```

<h4 id="app.param">app.param(fn)</h4>

La signature `app.param(fn)` servait à
modifier le comportement de la fonction
`app.param(name, fn)`. Elle est obsolète depuis la
version 4.11.0 et Express 5 ne la prend plus en charge.

<h4 id="plural">Noms de méthodes au pluriel</h4>

Les noms de méthode suivants ont été mis au pluriel. Dans Express 4, l'utilisation des anciennes méthodes ont généré un avertissement
d'obsolescence. Express 5 ne les prend plus du tout en charge :

`req.acceptsLanguage()` est remplacé par
`req.acceptsLanguages()`.

`req.acceptsCharset()` est remplacé par
`req.acceptsCharsets()`.

`req.acceptsEncoding()` est remplacé par
`req.acceptsEncodings()`.

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

<h4 id="leading">Signe deux-points (:) de tête dans le nom de la
fonction app.param(name, fn)</h4>

Le signe deux-points (:) de tête dans le nom de la fonction
`app.param(name, fn)` est une subsistance d'Express 3 et, pour des raisons de
compatibilité avec les versions antérieures, Express 4 la prenait en
charge avec un avis sur l'obsolescence. Express 5 l'ignore
automatiquement et utilise le paramètre de nom sans le préfixer d'un
signe deux-points.

Cela n'affectera normalement pas votre code si vous lisez la documentation Express 4
d'[app.param](/{{ page.lang }}/4x/api.html#app.param) car cela ne mentionne pas le signe deux-points de tête.

<h4 id="req.param">req.param(name)</h4>

Cette méthode potentiellement déroutante et dangereuse
d'extraction des données de formulaire a été supprimée. Vous devrez
désormais rechercher spécifiquement le nom du paramètre soumis dans
l'objet `req.params`, `req.body` ou `req.query`.

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

<h4 id="res.json">res.json(obj, status)</h4>

Express 5 ne prend plus en charge la signature
`res.json(obj, status)`. A la place, définissez le
statut et enchaînez-le à la méthode
`res.json()` comme suit :
`res.status(status).json(obj)`.

{% include admonitions/note.html content=codemod-deprecated-signatures %}

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

<h4 id="res.jsonp">res.jsonp(obj, status)</h4>

Express 5 ne prend plus en charge la signature
`res.jsonp(obj, status)`. A la place, définissez le
statut et enchaînez-le à la méthode `res.jsonp()`
comme suit : `res.status(status).jsonp(obj)`.

{% include admonitions/note.html content=codemod-deprecated-signatures %}

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

<h4 id="res.redirect">res.redirect(url, status)</h4>

Express 5 ne prend plus en charge la signature
`res.send(obj, status)`. A la place, définissez le
statut et enchaînez-le à la méthode `res.send()`
comme suit : `res.status(status).send(obj)`.

{% include admonitions/note.html content=codemod-deprecated-signatures %}

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

<h4 id="magic-redirect">res.redirect('back') and res.location('back')</h4>

Express 5 no longer supports the magic string `back` in the `res.redirect()` and `res.location()` methods. Instead, use the `req.get('Referrer') || '/'` value to redirect back to the previous page. In Express 4, the res.`redirect('back')` and `res.location('back')` methods were deprecated.

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
app.get('/user', (req, res) => {
  res.redirect(req.get('Referrer') || '/')
})
```

<h4 id="res.send.body">res.send(body, status)</h4>

Express 5 no longer supports the signature `res.send(obj, status)`. Instead, set the status and then chain it to the `res.send()` method like this: `res.status(status).send(obj)`.

{% include admonitions/note.html content=codemod-deprecated-signatures %}

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

<h4 id="res.send.status">res.send(status)</h4>

Express 5 ne prend plus en charge la signature <code>res.send(<em>statut</em>)</code>, où _`statut`_
est un nombre. A la place, utilisez la fonction
`res.sendStatus(statusCode)`
qui définit le code de statut de l'en-tête de réponse HTTP et envoie
la version texte du code: "Not Found", "Internal Server Error", etc.
Si vous devez envoyer un nombre à l'aide de la fonction `res.send()`,
mettez ce nombre entre guillemets pour qu'Express ne l'interprète pas
comme une tentative d'utilisation de l'ancienne signature non prise en charge.

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

La fonction `res.sendfile()` a été remplacée
par une
version CamelCase `res.sendFile()` dans Express 5.

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

<h3>Modifié</h3>

<h4 id="path-syntax">Path route matching syntax</h4>

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

- Regexp characters are not supported. Par exemple :

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

<h4 id="rejected-promises">Rejected promises handled from middleware and handlers</h4>

Request middleware and handlers that return rejected promises are now handled by forwarding the rejected value as an `Error` to the error handling middleware. This means that using `async` functions as middleware and handlers are easier than ever. When an error is thrown in an `async` function or a rejected promise is `await`ed inside an async function, those errors will be passed to the error handler as if calling `next(err)`.

Details of how Express handles errors is covered in the [error handling documentation](/en/guide/error-handling.html).

<h4 id="express.urlencoded">express.urlencoded</h4>

The `express.urlencoded` method makes the `extended` option `false` by default.

<h4 id="app.listen">app.listen</h4>

In Express 5, the `app.listen` method will invoke the user-provided callback function (if provided) when the server receives an error event. In Express 4, such errors would be thrown. This change shifts error-handling responsibility to the callback function in Express 5. If there is an error, it will be passed to the callback as an argument.
Par exemple :

```js
const server = app.listen(8080, '0.0.0.0', (error) => {
  if (error) {
    throw error // e.g. EADDRINUSE
  }
  console.log(`Listening on ${JSON.stringify(server.address())}`)
})
```

<h4 id="app.router">app.router</h4>

L'objet `app.router`, qui a été supprimé dans Express 4, est revenu dans Express 5. Dans la version, cet objet
n'est qu'une référence dans le routeur Express de base, contrairement à Express 3, où une application devait le charger explicitement.

<h4 id="req.body">req.body</h4> 

The `req.body` property returns `undefined` when the body has not been parsed. In Express 4, it returns `{}` by default.

<h4 id="req.host">req.host</h4>

Dans Express 4, la `req.host` retirait de
manière incorrecte le numéro de port s'il était présent. Dans Express 5, ce numéro de port est conservé.

<h4 id="req.query">req.query</h4>

The `req.query` property is no longer a writable property and is instead a getter. The default query parser has been changed from "extended" to "simple".

<h4 id="res.clearCookie">res.clearCookie</h4>

The `res.clearCookie` method ignores the `maxAge` and `expires` options provided by the user.

<h4 id="res.status">res.status</h4>

The `res.status` method only accepts integers in the range of `100` to `999`, following the behavior defined by Node.js, and it returns an error when the status code is not an integer.

<h4 id="res.query">res.vary</h4>

The `res.vary` throws an error when the `field` argument is missing. In Express 4, if the argument was omitted, it gave a warning in the console

### Améliorations

<h4 id="res.render">res.render()</h4>

Cette méthode impose désormais un comportement asynchrone pour
tous les moteurs de vue. Cela évite les bogues générés par les
moteurs de vue qui avaient une implémentation synchrone et qui
ne prenaient pas en compte l'interface recommandée.

<h4 id="brotli-support">Brotli encoding support</h4>

Express 5 supports Brotli encoding for requests received from clients that support it.
