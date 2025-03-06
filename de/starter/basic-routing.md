---
layout: page
title: Basisrouting in Express
description: Learn the fundamentals of routing in Express.js applications, including how to define routes, handle HTTP methods, and create route handlers for your web server.
menu: starter
lang: de
---

# Basisrouting

Per *Routing* wird bestimmt, wie eine Antwort auf eine Clientanforderung an einem bestimmten Endpunkt antwortet. Dies ist eine URI (oder ein Pfad) und eine bestimmte HTTP-Anforderungsmethode (GET, POST usw.).

Jede Weiterleitung (Route) kann eine oder mehrere Handlerfunktionen haben, die ausgeführt werden, wenn die Weiterleitung abgeglichen wird.

Weiterleitungsdefinitionen haben die folgende Struktur:
```js
app.METHOD(PATH, HANDLER)
```

Bedeutung:

- `app` ist eine Instanz von `express`.
- `METHOD` ist eine [HTTP-Anforderungsmethode](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol).
- `PATH` ist ein Pfad auf dem Server.
- `HANDLER` ist die Funktion, die ausgeführt wird, wenn die Weiterleitung abgeglichen wird.

<div class="doc-box doc-notice" markdown="1">
In diesem Lernprogramm wird vorausgesetzt, dass eine Instanz von `express` namens `app` erstellt und der Server ausgeführt wird. Wenn Sie mit dem Erstellen und Starten von Anwendungen nicht vertraut sind, spielen Sie das [Beispiel "Hello World"](/{{ page.lang }}/starter/hello-world.html) durch.
</div>

Die folgenden Beispiele veranschaulichen das Definieren einfacher Weiterleitungen.

Antworten Sie mit `Hello World!` auf der Homepage:

```js
app.get('/', (req, res) => {
  res.send('Hello World!')
})
```

Antworten Sie auf POST-Anforderungen auf die Weiterleitung zum Stammverzeichnis (`/`), der Homepage der Anwendung:

```js
app.post('/', (req, res) => {
  res.send('Got a POST request')
})
```

Antworten Sie auf eine PUT-Anforderung zur Weiterleitung `/user`:

```js
app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user')
})
```

Antworten Sie auf eine DELETE-Anforderung zur Weiterleitung `/user`:

```js
app.delete('/user', (req, res) => {
  res.send('Got a DELETE request at /user')
})
```

Details zum Thema Routing finden Sie in der entsprechenden [Routinganleitung](/{{ page.lang }}/guide/routing.html).
