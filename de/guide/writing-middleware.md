---
layout: page
title: Middleware für die Verwendung in Express-Anwendungen schreiben
description: Learn how to write custom middleware functions for Express.js applications, including examples and best practices for enhancing request and response handling.
menu: guide
lang: de
redirect_from: /guide/writing-middleware.html
---

# Middleware für die Verwendung in Express-Anwendungen schreiben

<h2>Überblick</h2>

_Middlewarefunktionen_ sind Funktionen, die Zugriff auf das [Anforderungsobjekt](/{{ page.lang }}/4x/api.html#req) (`req`), das [Antwortobjekt](/{{ page.lang }}/4x/api.html#res) (`res`) und die nächste Middlewarefunktion im Anforderung/Antwort-Zyklus der Anwendung haben. Die nächste Middlewarefunktion wird im Allgemeinen durch die Variable `next` bezeichnet.

Über Middlewarefunktionen lassen sich die folgenden Tasks ausführen:

- Ausführen von Code
- Vornehmen von Änderungen an der Anforderung und an Antwortobjekten
- End the request-response cycle.
- Aufrufen der nächsten Middleware im Stack

Wenn über die aktuelle Middlewarefunktion der Anforderung/Antwort-Zyklus nicht beendet werden kann, muss `next()` aufgerufen werden, um die Steuerung an die nächste Middlewarefunktion zu übergeben. Andernfalls geht die Anforderung in den Status "Blockiert" über.

Das folgende Beispiel zeigt die Elemente eines Middlewarefunktionsaufrufs:

<table id="mw-fig">
<tbody><tr><td id="mw-fig-imgcell">
<img src="/images/express-mw.png" alt="Elements of a middleware function call" id="mw-fig-img" />
</td>
<td class="mw-fig-callouts">
<div class="callout" id="callout1">HTTP-Methode, für die die Middlewarefunktion angewendet wird.</div></tbody>

<div class="callout" id="callout2">Pfad (Weiterleitung), für den die Middlewarefunktion angewendet wird.</div>

<div class="callout" id="callout3">Die Middlewarefunktion.</div>

<div class="callout" id="callout4">Callback-Argument zur Middlewarefunktion, die nach der geltenden Konvention als "next" bezeichnet wird.</div>

<div class="callout" id="callout5">HTTP-<a href="../4x/api.html#res">Antwort</a>argument zur Middlewarefunktion, die nach der geltenden Konvention als "res" bezeichnet wird.</div>

<div class="callout" id="callout6">HTTP-<a href="../4x/api.html#req">Anforderungs</a>argument zur Middlewarefunktion, die nach der geltenden Konvention als "req" bezeichnet wird.</div>
</td></tr>
</table>

Starting with Express 5, middleware functions that return a Promise will call `next(value)` when they reject or throw an error. `next` will be called with either the rejected value or the thrown Error.

<h2>Beispiel</h2>

Here is an example of a simple "Hello World" Express application.
The remainder of this article will define and add three middleware functions to the application:
one called `myLogger` that prints a simple log message, one called `requestTime` that
displays the timestamp of the HTTP request, and one called `validateCookies` that validates incoming cookies.

```js
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000)
```

<h3>Dies ist ein Beispiel einer einfachen Express-Anwendung namens "Hello World", für die Sie zwei Middlewarefunktionen definieren:</h3>
Dies ist ein einfaches Beispiel einer Middlewarefunktion namens "myLogger". Diese Funktion gibt lediglich "LOGGED" aus, wenn eine Anforderung zur Anwendung über diese Funktion läuft. Die Middlewarefunktion ist der Variablen `myLogger` zugeordnet.

```js
const myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}
```

<div class="doc-box doc-notice" markdown="1">
Beachten Sie den Aufruf oben zu `next()`. Durch den Aufruf dieser Funktion wird die nächste Middlewarefunktion in der Anwendung aufgerufen.
Die Funktion `next()` ist nicht Teil der Node.js- oder Express-API, sondern das dritte Argument, das an die Middlewarefunktion übergeben wird. Die Funktion `next()` kann jeden beliebigen Namen haben, per Konvention erhält sie jedoch immer den Namen "next".
Um Unklarheiten zu vermeiden, sollten Sie immer diese Konvention verwenden.
</div>

Zum Laden der Middlewarefunktion rufen Sie `app.use()` auf und geben die Middlewarefunktion an.
Beispiel: Durch den folgenden Code wird die Middlewarefunktion `myLogger` vor der Weiterleitung zum Stammverzeichnispfad (/) geladen.

```js
const express = require('express')
const app = express()

const myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}

app.use(myLogger)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000)
```

Sobald die Anwendung eine Anforderung erhält, gibt sie die Nachricht "LOGGED" an das Terminal aus.

Die Reihenfolge beim Laden der Middleware ist wichtig: Middlewarefunktionen, die zuerst geladen werden, werden auch zuerst ausgeführt.

Wenn `myLogger` nach der Weiterleitung zum Stammverzeichnispfad geladen wird, erreicht die Weiterleitung die Middlewarefunktion nicht. Die Anwendung gibt "LOGGED" nicht aus, weil der Routenhandler für den Stammverzeichnispfad den Anforderung/Antwort-Zyklus beendet.

Die Middlewarefunktion `myLogger` gibt einfach eine Nachricht aus und übergibt dann die Anforderung zur nächsten Middlewarefunktion im Stack durch Aufruf der Funktion `next()`.

<h3>Middleware function requestTime</h3>

Im nächsten Beispiel wird die Eigenschaft `requestTime` zum Anforderungsobjekt hinzugefügt. Diese Middlewarefunktion erhält den Namen "requestTime".

```js
const requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}
```

Die Anwendung verwendet nun die Middlewarefunktion `requestTime`. Außerdem verwendet die Callback-Funktion der Weiterleitung zum Stammverzeichnispfad die Eigenschaft, die die Middlewarefunktion zu `req` (dem Anforderungsobjekt) hinzufügt.

```js
const express = require('express')
const app = express()

const requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}

app.use(requestTime)

app.get('/', (req, res) => {
  let responseText = 'Hello World!<br>'
  responseText += `<small>Requested at: ${req.requestTime}</small>`
  res.send(responseText)
})

app.listen(3000)
```

Wenn Sie eine Anforderung zum Stammverzeichnis der Anwendung einleiten, zeigt die Anwendung nun die Zeitmarke Ihrer Anforderung im Browser an.

<h3>Middleware function validateCookies</h3>

Finally, we'll create a middleware function that validates incoming cookies and sends a 400 response if cookies are invalid.

Here's an example function that validates cookies with an external async service.

```js
async function cookieValidator (cookies) {
  try {
    await externallyValidateCookie(cookies.testCookie)
  } catch {
    throw new Error('Invalid cookies')
  }
}
```

Here, we use the [`cookie-parser`](/resources/middleware/cookie-parser.html) middleware to parse incoming cookies off the `req` object and pass them to our `cookieValidator` function. The `validateCookies` middleware returns a Promise that upon rejection will automatically trigger our error handler.

```js
const express = require('express')
const cookieParser = require('cookie-parser')
const cookieValidator = require('./cookieValidator')

const app = express()

async function validateCookies (req, res, next) {
  await cookieValidator(req.cookies)
  next()
}

app.use(cookieParser())

app.use(validateCookies)

// error handler
app.use((err, req, res, next) => {
  res.status(400).send(err.message)
})

app.listen(3000)
```

<div class="doc-box doc-notice" markdown="1">
Note how `next()` is called after `await cookieValidator(req.cookies)`. This ensures that if `cookieValidator` resolves, the next middleware in the stack will get called. If you pass anything to the `next()` function (except the string `'route'` or `'router'`), Express regards the current request as being an error and will skip any remaining non-error handling routing and middleware functions.
</div>

Da Sie Zugriff auf das Anforderungsobjekt, das Antwortobjekt, die nächste Middlewarefunktion im Stack und die gesamte Node.js-API haben, sind die Möglichkeiten, die Sie mit Middlewarefunktionen haben, nahezu unendlich.

Weitere Informationen zur Verwendung von Middleware in Express siehe [ Express-Middleware verwenden](/{{ page.lang }}/guide/using-middleware.html).

<h2>Configurable middleware</h2>

If you need your middleware to be configurable, export a function which accepts an options object or other parameters, which, then returns the middleware implementation based on the input parameters.

File: `my-middleware.js`

```js
module.exports = function (options) {
  return function (req, res, next) {
    // Implement the middleware function based on the options object
    next()
  }
}
```

The middleware can now be used as shown below.

```js
const mw = require('./my-middleware.js')

app.use(mw({ option1: '1', option2: '2' }))
```

Refer to [cookie-session](https://github.com/expressjs/cookie-session) and [compression](https://github.com/expressjs/compression) for examples of configurable middleware.
