---
layout: page
title: Routing Express
description: Learn how to define and use routes in Express.js applications, including route methods, route paths, parameters, and using Router for modular routing.
menu: guide
lang: it
redirect_from: /guide/routing.html
---

# Routing

_Routing_ fa riferimento alla definizione di endpoint dell'applicazione (URI) e alla loro modalità di risposta alle richieste del client.
Per un'introduzione al concetto di routing, consultare la sezione [Routing di base](/{{ page.lang }}/starter/basic-routing.html).

You define routing using methods of the Express `app` object that correspond to HTTP methods;
for example, `app.get()` to handle GET requests and `app.post` to handle POST requests. For a full list,
see [app.METHOD](/{{ page.lang }}/5x/api.html#app.METHOD). You can also use [app.all()](/{{ page.lang }}/5x/api.html#app.all) to handle all HTTP methods and [app.use()](/{{ page.lang }}/5x/api.html#app.use) to
specify middleware as the callback function (See [Using middleware](/{{ page.lang }}/guide/using-middleware.html) for details).

These routing methods specify a callback function (sometimes called "handler functions") called when the application receives a request to the specified route (endpoint) and HTTP method. In other words, the application "listens" for requests that match the specified route(s) and method(s), and when it detects a match, it calls the specified callback function.

In fact, the routing methods can have more than one callback function as arguments.
With multiple callback functions, it is important to provide `next` as an argument to the callback function and then call `next()` within the body of the function to hand off control
to the next callback.

Il codice seguente è un esempio di una route veramente di base.

```js
const express = require('express')
const app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})
```

<h2 id="route-methods">Metodi di route</h2>

Un metodo di route deriva da uno dei metodi HTTP ed è collegato ad un'istanza delle classe `express`.

Il codice seguente è un esempio di route definite per i metodi GET e POST nella root dell'app.

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

Esiste un metodo di routing speciale, `app.all()`, che non deriva da alcun metodo HTTP. Questo metodo viene utilizzato per caricare funzioni middleware in un percorso per tutti i metodi di richiesta.

```js
app.all('/secret', (req, res, next) => {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
})
```

<h2 id="route-paths">Percorsi di route</h2>

I percorsi di route, in combinazione con un metodo di richiesta, definiscono gli endpoint a cui possono essere rivolte richieste. I percorsi di route possono essere stringhe, modelli di stringa o espressioni regolari.

{% capture caution-character %} In express 5, the characters `?`, `+`, `*`, `[]`, and `()` are handled differently than in version 4, please review the [migration guide](/{{ page.lang }}/guide/migrating-5.html#path-syntax) for more information.{% endcapture %}

{% include admonitions/caution.html content=caution-character %}

{% capture note-dollar-character %}In express 4, regular expression characters such as `$` need to be escaped with a `\`.
{% endcapture %}

{% include admonitions/caution.html content=note-dollar-character %}

Express utilizza [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) per la corrispondenza dei percorsi di route; consultare la documentazione relativa a path-to-regexp per tutte le possibilità di definizione di percorsi di route. [Express Route Tester](http://forbeslindesay.github.io/express-route-tester/) è uno strumento utile per il test delle route Express di base, anche se non supporta la corrispondenza di modelli.
{% endcapture %}

{% include admonitions/note.html content=note-path-to-regexp %}

{% include admonitions/warning.html content="Query strings are not part of the route path." %}

### Ecco alcuni esempi di percorsi di route basati su stringhe.

Questo percorso di route corrisponderà a richieste nella route root, `/`.

```js
app.get('/', (req, res) => {
  res.send('root')
})
```

Questo percorso di route corrisponderà a richieste in `/about`.

```js
app.get('/about', (req, res) => {
  res.send('about')
})
```

Questo percorso di route corrisponderà a richieste in `/random.text`.

```js
app.get('/random.text', (req, res) => {
  res.send('random.text')
})
```

### Ecco alcuni esempi di percorsi di route basati su modelli di stringa.

{% capture caution-string-patterns %} The string patterns in Express 5 no longer work. Please refer to the [migration guide](/{{ page.lang }}/guide/migrating-5.html#path-syntax) for more information.{% endcapture %}

{% include admonitions/caution.html content=caution-string-patterns %}

Questo percorso di route corrisponderà a `acd` e `abcd`.

```js
app.get('/ab?cd', (req, res) => {
  res.send('ab?cd')
})
```

Questo percorso di route corrisponderà a `abcd`, `abbcd`, `abbbcd` e così via.

```js
app.get('/ab+cd', (req, res) => {
  res.send('ab+cd')
})
```

Questo percorso di route corrisponderà a `abcd`, `abxcd`, `abRABDOMcd`, `ab123cd` e così via.

```js
app.get('/ab*cd', (req, res) => {
  res.send('ab*cd')
})
```

Questo percorso di route corrisponderà a `/abe` e `/abcde`.

```js
app.get('/ab(cd)?e', (req, res) => {
  res.send('ab(cd)?e')
})
```

### Esempi di percorsi di route basati su espressioni regolari:

Questo percorso di route corrisponderà a qualsiasi elemento con "a" nel nome route.

```js
app.get(/a/, (req, res) => {
  res.send('/a/')
})
```

Questo percorso di route corrisponderà a `butterfly` e `dragonfly`, ma non a `butterflyman`, `dragonfly man` e così via.

```js
app.get(/.*fly$/, (req, res) => {
  res.send('/.*fly$/')
})
```

<h2 id="route-parameters">
Le stringhe di query non fanno parte del percorso di route.
</h2>

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

{% include admonitions/warning.html content="Because the regular expression is usually part of a literal string, be sure to escape any `\` characters with an additional backslash, for example `\\d+`." %}

{% capture warning-version %}
In Express 4.x, <a href="https://github.com/expressjs/express/issues/2495">the `*` character in regular expressions is not interpreted in the usual way</a>. As a workaround, use `{0,}` instead of `*`. This will likely be fixed in Express 5.
{% endcapture %}

{% include admonitions/warning.html content=warning-version %}

<h2 id="route-handlers">Handler di route</h2>

È possibile fornire molteplici funzioni di callback che si comportino come [middleware](/{{ page.lang }}/guide/using-middleware.html) per gestire una richiesta. La sola eccezione è rappresentata dal fatto che queste callback potrebbero richiamare `next('route')` per ignorare le callback di route restanti. È possibile utilizzare questo meccanismo per imporre pre-condizioni su una route, quindi, passare il controllo a route successive, nel caso non ci siano motivi per proseguire con la route corrente.

Gli handler di route possono avere il formato di una funzione, di un array di funzioni o di combinazioni di entrambi, come illustrato nei seguenti esempi.

Una singola funzione di callback può gestire una route. Ad esempio:

```js
app.get('/example/a', (req, res) => {
  res.send('Hello from A!')
})
```

Più funzioni di callback possono gestire una route (assicurarsi di specificare l'oggetto `next`). Ad esempio:

```js
app.get('/example/b', (req, res, next) => {
  console.log('the response will be sent by the next function ...')
  next()
}, (req, res) => {
  res.send('Hello from B!')
})
```

Un array di funzioni callback possono gestire una route. Ad esempio:

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

Una combinazione di funzioni indipendenti e array di funzioni può gestire una route. Ad esempio:

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

<h2 id="response-methods">Metodi di risposta</h2>

I metodi sull'oggetto risposta (`res`) nella seguente tabella possono inviare una risposta al client e terminare il ciclo richiesta-risposta. Se nessuno di questi metodi viene richiamato da un handler di route, la richiesta del client verrà lasciata in sospeso.

| Metodo                                                                                                                                                                                                                    | Descrizione                                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [res.download()](/{{ page.lang }}/4x/api.html#res.download)     | Richiedere un file da scaricare.                                                                                         |
| [res.end()](/{{ page.lang }}/4x/api.html#res.end)               | Terminare il processo di risposta.                                                                                       |
| [res.json()](/{{ page.lang }}/4x/api.html#res.json)             | Inviare una risposta JSON.                                                                                               |
| [res.jsonp()](/{{ page.lang }}/4x/api.html#res.jsonp)           | Inviare una risposta JSON con supporto JSONP.                                                                            |
| [res.redirect()](/{{ page.lang }}/4x/api.html#res.redirect)     | Reindirizzare una richiesta.                                                                                             |
| [res.render()](/{{ page.lang }}/4x/api.html#res.render)         | Eseguire il rendering di un template di vista.                                                                           |
| [res.send()](/{{ page.lang }}/4x/api.html#res.send)             | Inviare una risposta di vari tipi.                                                                                       |
| [res.sendFile](/{{ page.lang }}/4x/api.html#res.sendFile)                          | Inviare un file come un flusso di ottetti.                                                                               |
| [res.sendStatus()](/{{ page.lang }}/4x/api.html#res.sendStatus) | Impostare il codice di stato della risposta e inviare la relativa rappresentazione di stringa come corpo della risposta. |

<h2 id="app-route">app.route()</h2>

È possibile creare handler di route concatenabili per un percorso di route, utilizzando `app.route()`.
Poiché il percorso è specificato in una singola ubicazione, la creazione di route modulari è utile, come lo è la riduzione della ridondanza e degli errori tipografici. Per ulteriori informazioni sulle route, consultare: [Documentazione su Router()](/{{ page.lang }}/4x/api.html#router).

Ecco un esempio di handler di route concatenati, definiti utilizzando `app.route()`.

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

Utilizzare la classe `express.Router` per creare handler di route modulari, montabili. Un'istanza `Router` è un middleware e un sistema di routing completo; per questa ragione, spesso si definisce "mini-app".

Nel seguente esempio si crea un router come modulo, si carica al suo interno una funzione middleware, si definiscono alcune route e si monta un modulo router su un percorso nell'app principale.

Creare un file router denominato `birds.js` nella directory app, con il seguente contenuto:

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

Quindi, caricare il modulo router nell'app:

```js
const birds = require('./birds')

/// ...

app.use('/birds', birds)
```

L'app ora sarà in grado di gestire richieste a `/birds` e `/birds/about`, oltre a richiamare la funzione middleware `timeLog`, specifica per la route.

But if the parent route `/birds` has path parameters, it will not be accessible by default from the sub-routes. To make it accessible, you will need to pass the `mergeParams` option to the Router constructor [reference](/{{ page.lang }}/5x/api.html#app.use).

```js
Express supporta i seguenti metodi di routing che corrispondono a metodi HTTP: `get`, `post`, `put`, `head`, `delete`, `options`, `trace`, `copy`, `lock`, `mkcol`, `move`, `purge`, `propfind`, `proppatch`, `unlock`, `report`, `mkactivity`, `checkout`, `merge`, `m-search`, `notify`, `subscribe`, `unsubscribe`, `patch`, `search` e `connect`.
```
