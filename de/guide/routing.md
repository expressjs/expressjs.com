---
layout: page
title: Weiterleitung in Express
description: Learn how to define and use routes in Express.js applications, including route methods, route paths, parameters, and using Router for modular routing.
menu: guide
lang: de
---

# Weiterleitung (Routing)

Der Begriff *Weiterleitung* (Routing) bezieht sich auf die Definition von Anwendungsendpunkten (URIs) und deren Antworten auf Clientanforderungen. Eine Einführung in dieses Routing siehe [Basisrouting](/{{ page.lang }}/starter/basic-routing.html).

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

Express unterstützt die folgenden Weiterleitungsmethoden, die den HTTP-Methoden entsprechen: `get`, `post`, `put`, `head`, `delete`, `options`, `trace`, `copy`, `lock`, `mkcol`, `move`, `purge`, `propfind`, `proppatch`, `unlock`, `report`, `mkactivity`, `checkout`, `merge`, `m-search`, `notify`, `subscribe`, `unsubscribe`, `patch`, `search` und `connect`.

<div class="doc-box doc-info" markdown="1">
Verwenden Sie zum Weiterleiten von Methoden, die zu den JavaScript-Variablennamen führen, die Notation "Eckige Klammer". Beispiel: `app['m-search']('/', function ...`
</div>

Es gibt eine spezielle Weiterleitungsmethode, `app.all()`, die nicht von einer HTTP-Methode abgeleitet wird. Diese Methode wird zum Laden von Middlewarefunktionen bei einem Pfad für alle Anforderungsmethoden verwendet.

Im folgenden Beispiel wird der Handler für Anforderungen zur Weiterleitung "/secret" ausgeführt, um herauszufinden, ob Sie GET-, POST-, PUT-, DELETE- oder andere HTTP-Anforderungsmethoden verwenden, die im [HTTP-Modul](https://nodejs.org/api/http.html#http_http_methods) unterstützt werden.

```js
app.all('/secret', (req, res, next) => {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
})
```

<h2 id="route-paths">Weiterleitungspfade</h2>

Über Weiterleitungspfade werden in Kombination mit einer Anforderungsmethode die Endpunkte definiert, bei denen Anforderungen erfolgen können. Weiterleitungspfade können Zeichenfolgen, Zeichenfolgemuster oder reguläre Ausdrücke sein.

<div class="doc-box doc-info" markdown="1">
Express verwendet für den Abgleich der Weiterleitungspfade [path-to-regexp](https://www.npmjs.com/package/path-to-regexp). In der Dokumentation zu "path-to-regexp" finden Sie alle Möglichkeiten zum Definieren von Weiterleitungspfaden. [Express Route Tester](http://forbeslindesay.github.io/express-route-tester/) ist ein handliches Tool zum Testen von Express-Basisweiterleitungen, auch wenn dieses Tool keine Musterabgleiche unterstützt.
</div>

<div class="doc-box doc-warn" markdown="1">
Abfragezeichenfolgen sind nicht Teil des Weiterleitungspfads.
</div>

Dies sind einige Beispiele für Weiterleitungspfade auf Basis von Zeichenfolgen.

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

Dies sind einige Beispiele für Weiterleitungspfade auf Basis von Zeichenfolgemustern.

Dieser Weiterleitungspfad gleicht `acd` und `abcd` ab.

```js
app.get('/ab?cd', (req, res) => {
  res.send('ab?cd')
})
```

Dieser Weiterleitungspfad gleicht `abcd`, `abbcd`, `abbbcd` usw. ab.

```js
app.get('/ab+cd', (req, res) => {
  res.send('ab+cd')
})
```

Dieser Weiterleitungspfad gleicht `abcd`, `abxcd`, `abRABDOMcd`, `ab123cd` usw. ab.

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

<div class="doc-box doc-info" markdown="1">
Die Zeichen ?, +, * und () sind Subsets ihrer Entsprechungen in regulären Ausdrücken. Der Bindestrich (-) und der Punkt (.) werden von zeichenfolgebasierten Pfaden förmlich interpretiert.
</div>

Beispiele für Weiterleitungspfade auf Basis regulärer Ausdrücke:

Dieser Weiterleitungspfad gleicht alle Weiterleitungsnamen ab, die den Buchstaben "a" enthalten.

```js
app.get(/a/, (req, res) => {
  res.send('/a/')
})
```

Dieser Weiterleitungspfad gleicht `butterfly` und `dragonfly`, jedoch nicht `butterflyman`, `dragonfly man` usw. ab.

```js
app.get(/.*fly$/, (req, res) => {
  res.send('/.*fly$/')
})
```

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

| Methode               | Beschreibung
|----------------------|--------------------------------------
| [res.download()](/{{ page.lang }}/4x/api.html#res.download)   | Gibt eine Eingabeaufforderung zum Herunterladen einer Datei aus.
| [res.end()](/{{ page.lang }}/4x/api.html#res.end)        | Beendet den Prozess "Antwort".
| [res.json()](/{{ page.lang }}/4x/api.html#res.json)       | Sendet eine JSON-Antwort.
| [res.jsonp()](/{{ page.lang }}/4x/api.html#res.jsonp)      | Sendet eine JSON-Antwort mit JSONP-Unterstützung.
| [res.redirect()](/{{ page.lang }}/4x/api.html#res.redirect)   | Leitet eine Anforderung um.
| [res.render()](/{{ page.lang }}/4x/api.html#res.render)     | Gibt eine Anzeigevorlage aus.
| [res.send()](/{{ page.lang }}/4x/api.html#res.send)       | Sendet eine Antwort mit unterschiedlichen Typen.
| [res.sendFile](/{{ page.lang }}/4x/api.html#res.sendFile)     | Sendet eine Datei als Oktett-Stream.
| [res.sendStatus()](/{{ page.lang }}/4x/api.html#res.sendStatus) | Legt den Antwortstatuscode fest und sendet dessen Zeichenfolgedarstellung als Antworthauptteil.

<h2 id="app-route">app.route()</h2>

Sie können mithilfe von `app.route()` verkettbare Routenhandler für einen Weiterleitungspfad erstellen. Da der Pfad an einer einzelnen Position angegeben wird, ist das Erstellen modularer Weiterleitungen hilfreich, da Redundanzen und Schreibfehler reduziert werden. Weitere Informationen zu Weiterleitungen finden Sie in der Dokumentation zu [Router()](/{{ page.lang }}/4x/api.html#router).

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
