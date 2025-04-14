---
layout: page
title: Weiterleitung in Express
description: Learn how to define and use routes in Express.js applications, including route methods, route paths, parameters, and using Router for modular routing.
menu: guide
lang: de
redirect_from: /guide/routing.html
---

# Weiterleitung (Routing)

Der Begriff _Weiterleitung_ (Routing) bezieht sich auf die Definition von Anwendungsendpunkten (URIs) und deren Antworten auf Clientanforderungen.
Eine Einführung in dieses Routing siehe [Basisrouting](/{{ page.lang }}/starter/basic-routing.html).

You define routing using methods of the Express `app` object that correspond to HTTP methods;
for example, `app.get()` to handle GET requests and `app.post` to handle POST requests. For a full list,
see [app.METHOD](/{{ page.lang }}/5x/api.html#app.METHOD). You can also use [app.all()](/{{ page.lang }}/5x/api.html#app.all) to handle all HTTP methods and [app.use()](/{{ page.lang }}/5x/api.html#app.use) to
specify middleware as the callback function (See [Using middleware](/{{ page.lang }}/guide/using-middleware.html) for details).

These routing methods specify a callback function (sometimes called "handler functions") called when the application receives a request to the specified route (endpoint) and HTTP method. In other words, the application "listens" for requests that match the specified route(s) and method(s), and when it detects a match, it calls the specified callback function.

In fact, the routing methods can have more than one callback function as arguments.
With multiple callback functions, it is important to provide `next` as an argument to the callback function and then call `next()` within the body of the function to hand off control
to the next callback.

Der folgende Code ist ein Beispiel für ein sehr einfaches Basisrouting.

```js
const express = require('express')
const app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})
```

<h2 id="route-methods">Weiterleitungsmethoden</h2>

Eine Weiterleitungsmethode wird von einer HTTP-Methode abgeleitet und an eine Instanz der Klasse `express` angehängt.

Der folgende Code ist ein Beispiel für Weiterleitungen, die für die Methoden GET und POST zum Stamm (Root) der Anwendung definiert werden.

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

Es gibt eine spezielle Weiterleitungsmethode, `app.all()`, die nicht von einer HTTP-Methode abgeleitet wird. Diese Methode wird zum Laden von Middlewarefunktionen bei einem Pfad für alle Anforderungsmethoden verwendet. Im folgenden Beispiel wird der Handler für Anforderungen zur Weiterleitung "/secret" ausgeführt, um herauszufinden, ob Sie GET-, POST-, PUT-, DELETE- oder andere HTTP-Anforderungsmethoden verwenden, die im [HTTP-Modul](https://nodejs.org/api/http.html#http_http_methods) unterstützt werden.

```js
app.all('/secret', (req, res, next) => {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
})
```

<h2 id="route-paths">Weiterleitungspfade</h2>

Über Weiterleitungspfade werden in Kombination mit einer Anforderungsmethode die Endpunkte definiert, bei denen Anforderungen erfolgen können. Weiterleitungspfade können Zeichenfolgen, Zeichenfolgemuster oder reguläre Ausdrücke sein.

{% capture caution-character %} In express 5, the characters `?`, `+`, `*`, `[]`, and `()` are handled differently than in version 4, please review the [migration guide](/{{ page.lang }}/guide/migrating-5.html#path-syntax) for more information.{% endcapture %}

{% include admonitions/caution.html content=caution-character %}

{% capture note-dollar-character %}In express 4, regular expression characters such as `$` need to be escaped with a `\`.
{% endcapture %}

{% include admonitions/caution.html content=note-dollar-character %}

Express verwendet für den Abgleich der Weiterleitungspfade [path-to-regexp](https://www.npmjs.com/package/path-to-regexp). In der Dokumentation zu "path-to-regexp" finden Sie alle Möglichkeiten zum Definieren von Weiterleitungspfaden. [Express Route Tester](http://forbeslindesay.github.io/express-route-tester/) ist ein handliches Tool zum Testen von Express-Basisweiterleitungen, auch wenn dieses Tool keine Musterabgleiche unterstützt.
{% endcapture %}

{% include admonitions/note.html content=note-path-to-regexp %}

{% include admonitions/warning.html content="Query strings are not part of the route path." %}

### Route paths based on strings

Dieser Weiterleitungspfad gleicht Weiterleitungsanforderungen zum Stammverzeichnis (`/`) ab.

```js
app.get('/', (req, res) => {
  res.send('root')
})
```

Dieser Weiterleitungspfad gleicht Anforderungen mit `/about` ab.

```js
app.get('/about', (req, res) => {
  res.send('about')
})
```

Dieser Weiterleitungspfad gleicht Anforderungen mit `/random.text` ab.

```js
app.get('/random.text', (req, res) => {
  res.send('random.text')
})
```

### Route paths based on string patterns

{% capture caution-string-patterns %} The string patterns in Express 5 no longer work. Please refer to the [migration guide](/{{ page.lang }}/guide/migrating-5.html#path-syntax) for more information.{% endcapture %}

{% include admonitions/caution.html content=caution-string-patterns %}

Dieser Weiterleitungspfad gleicht `acd` und `abcd` ab.

```js
app.get('/ab?cd', (req, res) => {
  res.send('ab?cd')
})
```

Dies sind einige Beispiele für Weiterleitungspfade auf Basis von Zeichenfolgemustern.

```js
app.get('/ab+cd', (req, res) => {
  res.send('ab+cd')
})
```

Dies sind einige Beispiele für Weiterleitungspfade auf Basis von Zeichenfolgen.

```js
app.get('/ab*cd', (req, res) => {
  res.send('ab*cd')
})
```

Dieser Weiterleitungspfad gleicht `/abe` und `/abcde` ab.

```js
app.get('/ab(cd)?e', (req, res) => {
  res.send('ab(cd)?e')
})
```

### Route paths based on regular expressions

Dieser Weiterleitungspfad gleicht alle Weiterleitungsnamen ab, die den Buchstaben "a" enthalten.

```js
app.get(/a/, (req, res) => {
  res.send('/a/')
})
```

Dieser Weiterleitungspfad gleicht `butterfly` und `dragonfly`, jedoch nicht `butterflyman`, `dragonfly man` usw.

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

{% include admonitions/warning.html content="Because the regular expression is usually part of a literal string, be sure to escape any `\` characters with an additional backslash, for example `\\d+`." %}

{% capture warning-version %}
In Express 4.x, <a href="https://github.com/expressjs/express/issues/2495">the `*` character in regular expressions is not interpreted in the usual way</a>. As a workaround, use `{0,}` instead of `*`. This will likely be fixed in Express 5.
{% endcapture %}

{% include admonitions/warning.html content=warning-version %}

<h2 id="route-handlers">Routenhandler (Weiterleitungsroutinen)</h2>

Sie können mehrere Callback-Funktionen angeben, die sich wie [Middleware](/{{ page.lang }}/guide/using-middleware.html) verhalten, um eine Anforderung zu verarbeiten. Die einzige Ausnahme hierbei ist, dass diese Callbacks möglicherweise `next('route')` aufrufen, um die verbleibenden Weiterleitungs-Callbacks zu umgehen. Mit diesem Verfahren können Sie Vorabbedingungen für eine Weiterleitung festlegen und dann die Steuerung an nachfolgende Weiterleitungen übergeben, wenn kein Grund vorliegt, mit der aktuellen Weiterleitung fortzufahren.

Routenhandler können eine Funktion und/oder ein Funktionsarray sein, wie in den folgenden Beispielen zu sehen ist.

Eine einzelne Callback-Funktion kann eine Weiterleitung verarbeiten. Beispiel:

```js
app.get('/example/a', (req, res) => {
  res.send('Hello from A!')
})
```

Mehrere Callback-Funktionen können eine Weiterleitung verarbeiten (achten Sie darauf, dass Sie das Objekt `next` angeben). Beispiel:

```js
app.get('/example/b', (req, res, next) => {
  console.log('the response will be sent by the next function ...')
  next()
}, (req, res) => {
  res.send('Hello from B!')
})
```

Ein Array von Callback-Funktionen kann eine Weiterleitung verarbeiten. Beispiel:

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

Eine Kombination aus unabhängigen Funktionen und Funktionsarrays kann eine Weiterleitung verarbeiten. Beispiel:

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

<h2 id="response-methods">Antwortmethoden</h2>

Über die Methoden für das Antwortobjekt (`res`) in der folgenden Tabelle kann eine Antwort an den Client gesendet und der Anforderung/Antwort-Zyklus beendet werden. Wenn keine dieser Methoden über einen Routenhandler aufgerufen wird, bleibt die Clientanforderung im Status "blockiert".

| Methode                                                                                                                                                                                                                   | Beschreibung                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| [res.download()](/{{ page.lang }}/4x/api.html#res.download)     | Gibt eine Eingabeaufforderung zum Herunterladen einer Datei aus.                                |
| [res.end()](/{{ page.lang }}/4x/api.html#res.end)               | End the response process.                                                                       |
| [res.json()](/{{ page.lang }}/4x/api.html#res.json)             | Sendet eine JSON-Antwort.                                                                       |
| [res.jsonp()](/{{ page.lang }}/4x/api.html#res.jsonp)           | Sendet eine JSON-Antwort mit JSONP-Unterstützung.                                               |
| [res.redirect()](/{{ page.lang }}/4x/api.html#res.redirect)     | Leitet eine Anforderung um.                                                                     |
| [res.render()](/{{ page.lang }}/4x/api.html#res.render)         | Render a view template.                                                                         |
| [res.send()](/{{ page.lang }}/4x/api.html#res.send)             | Sendet eine Antwort mit unterschiedlichen Typen.                                                |
| [res.sendFile](/{{ page.lang }}/4x/api.html#res.sendFile)                          | Sendet eine Datei als Oktett-Stream.                                                            |
| [res.sendStatus()](/{{ page.lang }}/4x/api.html#res.sendStatus) | Legt den Antwortstatuscode fest und sendet dessen Zeichenfolgedarstellung als Antworthauptteil. |

<h2 id="app-route">app.route()</h2>

Sie können mithilfe von `app.route()` verkettbare Routenhandler für einen Weiterleitungspfad erstellen.
Da der Pfad an einer einzelnen Position angegeben wird, ist das Erstellen modularer Weiterleitungen hilfreich, da Redundanzen und Schreibfehler reduziert werden. Weitere Informationen zu Weiterleitungen finden Sie in der Dokumentation zu [Router()](/{{ page.lang }}/4x/api.html#router).

Dies ist ein Beispiel für verkettete Routenhandler, die mit der Funktion `app.route()` definiert werden.

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

Mit der Klasse `express.Router` lassen sich modular einbindbare Routenhandler erstellen. Eine `Router`-Instanz ist ein vollständiges Middleware- und Routingsystem. Aus diesem Grund wird diese Instanz oft auch als "Mini-App" bezeichnet.

Im folgenden Beispiel wird ein Router als Modul erstellt, eine Middlewarefunktion in das Modul geladen, es werden Weiterleitungen definiert und das Modul letztendlich in einen Pfad in der Hauptanwendung eingebunden.

Erstellen Sie eine Routerdatei namens `birds.js` mit dem folgenden Inhalt im Anwendungsverzeichnis:

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

Laden Sie dann das Routermodul in die Anwendung:

```js
const birds = require('./birds')

/// ...

app.use('/birds', birds)
```

Die Anwendung kann nun Anforderungen an die Pfade `/birds` und `/birds/about` bearbeiten und ruft die Middlewarefunktion `timeLog` auf, die speziell für diese Weiterleitung bestimmt ist.

But if the parent route `/birds` has path parameters, it will not be accessible by default from the sub-routes. To make it accessible, you will need to pass the `mergeParams` option to the Router constructor [reference](/{{ page.lang }}/5x/api.html#app.use).

```js
Express unterstützt die folgenden Weiterleitungsmethoden, die den HTTP-Methoden entsprechen: `get`, `post`, `put`, `head`, `delete`, `options`, `trace`, `copy`, `lock`, `mkcol`, `move`, `purge`, `propfind`, `proppatch`, `unlock`, `report`, `mkactivity`, `checkout`, `merge`, `m-search`, `notify`, `subscribe`, `unsubscribe`, `patch`, `search` und `connect`.
```
