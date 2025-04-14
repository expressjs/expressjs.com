---
layout: page
title: Migrazione a Express 5
description: A comprehensive guide to migrating your Express.js applications from version 4 to 5, detailing breaking changes, deprecated methods, and new improvements.
menu: guide
lang: it
redirect_from: /guide/migrating-5.html
---

# Passaggio a Express 5

<h2 id="overview">Panoramica</h2>

Express 5 non è molto differente da Express 4: le modifiche all'API non sono così importanti come quelle che sono state effettuate nel passaggio dalla 3.0 alla 4.0. Anche se le API di base sono le stesse, ci sono comunque delle modifiche importanti; in altre parole, un programma Express 4 esistente potrebbe non funzionare se lo si aggiorna per utilizzare Express 5.

To install this version, you need to have a Node.js version 18 or higher. Then, execute the following command in your application directory:

```sh
npm install "express@5"
```

È quindi possibile eseguire i test automatizzati per trovare errori e correggere i problemi in base agli aggiornamenti elencati di seguito. Dopo aver gestito gli errori del test, avviare l'applicazione per verificare gli errori. Si noterà subito se l'applicazione utilizza qualsiasi metodo o proprietà non supportati.

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

<h2 id="changes">Modifiche in Express 5</h2>

**Proprietà e metodi rimossi**

<ul class="doclist">
  <li><a href="#app.del">app.del()</a></li>
  <li><a href="#app.param">app.param(fn)</a></li>
  <li><a href="#plural">Nomi di metodi al plurale</a></li>
  <li><a href="#leading">Due punti nell'argomento del nome in app.param(name, fn)</a></li>
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

**Miglioramenti**

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

**Modificato**

<ul class="doclist">
  <li><a href="#res.render">res.render()</a></li>
  <li><a href="#brotli-support">Brotli encoding support</a></li>
</ul>

### Proprietà e metodi rimossi

Se si utilizza uno dei seguenti metodi o proprietà nell'applicazione, quest'ultima si chiuderà in modo anomalo. Quindi, sarà necessario modificare l'applicazione dopo aver effettuato l'aggiornamento alla versione 5.

<h4 id="app.del">app.del()</h4>

Express 5 non supporta più la funzione `app.del()`. Se si utilizza questa funzione verrà generato un errore. Per registrare le route HTTP DELETE, utilizzare al contrario la funzione `app.delete()`.

Inizialmente era stato utilizzato il comando `del` al posto di `delete`, perché `delete` è una parola chiave riservata in JavaScript. Tuttavia, a partire da ECMAScript 6, `delete` e altre parole chiave riservate possono essere utilizzate liberamente come nomi di proprietà.

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

La firma `app.param(fn)` è stata utilizzata per modificare la funzionalità della funzione `app.param(name, fn)`. È stata considerata obsoleta a partire dalla v4.11.0 e non è più supportata in Express 5.

<h4 id="plural">Nomi di metodi al plurale</h4>

I seguenti nomi di metodi sono stati messi al plurale. In Express 4, l'utilizzo di vecchi metodi ha dato origine ad avvisi di deprecazione. Express 5 non li supporta più in alcun modo:

`req.acceptsLanguage()` è stato sostituito con `req.acceptsLanguages()`.

`req.acceptsCharset()` è stato sostituito con `req.acceptsCharsets()`.

`req.acceptsEncoding()` è stato sostituito con `req.acceptsEncodings()`.

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

<h4 id="leading">Due punti (:) nel nome per app.param(name, fn)</h4>

I due punti (:) nel nome della funzione `app.param(name, fn)` è una eredità di Express 3 e per il bene della compatibilità con le versioni precedenti, Express 4 supporta questa condizione ma comunque fornendo un messaggio di avviso di deprecazione. Express 5 lo ignorerà senza avvisi e utilizzerà il parametro nome senza inserire i due punti.

Questa procedura non dovrebbe influenzare il codice se si segue correttamente la documentazione di Express 4 di [app.param](/{{ page.lang }}/4x/api.html#app.param), poiché non si parla dei due punti.

<h4 id="req.param">req.param(name)</h4>

Questo metodo poco chiaro e molto pericoloso che si utilizzava per richiamare i dati del modulo è stato rimosso. Ora sarà necessario ricercare il nome del parametro inviato nell'oggetto `req.params`, `req.body` o `req.query`.

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

Express 5 non supporta più la firma `res.json(obj, status)`. Al contrario, impostare lo stato e successivamente associarlo al metodo `res.json()` come segue: `res.status(status).json(obj)`.

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

Express 5 non supporta più la firma `res.jsonp(obj, status)`. Al contrario, impostare lo stato e successivamente associarlo al metodo `res.jsonp()` come segue: `res.status(status).jsonp(obj)`.

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

Express 5 non supporta più la firma `res.send(obj, status)`. Al contrario, impostare lo stato e successivamente associarlo al metodo `res.send()` come segue: `res.status(status).send(obj)`.

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

Express 5 non supporta più la firma <code>res.send(<em>status</em>)</code>, dove _`status`_ è un numero. Al contrario, utilizzare la funzione `res.sendStatus(statusCode)`, la quale imposta il codice di stato dell'intestazione della risposta HTTP e invia la versione di testo del codice: "Non trovato", "Errore interno del server" e così via.
Se è necessario inviare un numero utilizzando la funzione `res.send()`, citare il numero per convertirlo in una stringa, in modo tale che Express non lo interpreti come un tentativo di utilizzo di una firma vecchia non supportata.

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

La funzione `res.sendfile()` è stata sostituita da una versione in cui ogni frase composta inizia con una lettera maiuscola che utilizza ad esempio `res.sendFile()` in Express 5.

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

<h3>Modificato</h3>

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

- Regexp characters are not supported. Ad esempio:

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
Ad esempio:

```js
const server = app.listen(8080, '0.0.0.0', (error) => {
  if (error) {
    throw error // e.g. EADDRINUSE
  }
  console.log(`Listening on ${JSON.stringify(server.address())}`)
})
```

<h4 id="app.router">app.router</h4>

L'oggetto `app.router`, che era stato rimosso in Express 4, è ritornato in Express 5. Nella nuova versione, questo oggetto è solo un riferimento al router Express di base, diversamente da Express 3, in cui un'applicazione aveva il compito esplicito di caricarlo.

<h4 id="req.body">req.body</h4> 

The `req.body` property returns `undefined` when the body has not been parsed. In Express 4, it returns `{}` by default.

<h4 id="req.host">req.host</h4>

In Express 4, la funzione `req.host` andava a rimuovere in modo non corretto il numero porta nel caso fosse stato presente. In Express 5 il numero porta viene conservato.

<h4 id="req.query">req.query</h4>

The `req.query` property is no longer a writable property and is instead a getter. The default query parser has been changed from "extended" to "simple".

<h4 id="res.clearCookie">res.clearCookie</h4>

The `res.clearCookie` method ignores the `maxAge` and `expires` options provided by the user.

<h4 id="res.status">res.status</h4>

The `res.status` method only accepts integers in the range of `100` to `999`, following the behavior defined by Node.js, and it returns an error when the status code is not an integer.

<h4 id="res.query">res.vary</h4>

The `res.vary` throws an error when the `field` argument is missing. In Express 4, if the argument was omitted, it gave a warning in the console

### Miglioramenti

<h4 id="res.render">res.render()</h4>

Questo metodo ora potenzia i funzionamenti asincroni per tutti i motori di visualizzazione, evitando i bug causati dai motori di visualizzazione con un'implementazione sincrona e che violavano l'interfaccia consigliata.

<h4 id="brotli-support">Brotli encoding support</h4>

Express 5 supports Brotli encoding for requests received from clients that support it.
