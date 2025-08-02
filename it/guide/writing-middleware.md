---
layout: page
title: Compilazione del middleware per l'utilizzo nelle applicazioni Express
description: Learn how to write custom middleware functions for Express.js applications, including examples and best practices for enhancing request and response handling.
menu: guide
redirect_from: "  "
---

# Compilazione del middleware per l'utilizzo nelle applicazioni Express

<h2>Panoramica</h2>

Le funzioni _middleware_ sono funzioni con accesso all'[oggetto richiesta](/{{ page.lang }}/4x/api.html#req)  (`req`), all'[oggetto risposta](/{{ page.lang }}/4x/api.html#res) (`res`) e alla successiva funzione middleware nel ciclo richiesta-risposta dell'applicazione. La successiva funzione middleware viene comunemente denotata da una variabile denominata `next`.

Le funzioni middleware possono eseguire le attività elencate di seguito:

- Eseguire qualsiasi codice.
- Apportare modifiche agli oggetti richiesta e risposta.
- Terminare il ciclo richiesta-risposta.
- Chiamare il successivo middleware nello stack.

Se la funzione middleware corrente non termina il ciclo richiesta-risposta, deve richiamare `next()` per passare il controllo alla successiva funzione middleware. Altrimenti, la richiesta verrà lasciata in sospeso.

I seguenti esempi mostrano gli elementi di una chiamata alla funzione middleware:

<div class="table-scroller">
<table id="mw-fig">
<tbody><tr><td id="mw-fig-imgcell">
<img src="/images/express-mw.png" alt="Elements of a middleware function call" id="mw-fig-img" />
</td>
<td class="mw-fig-callouts">
<div class="callout" id="callout1">Metodo HTTP per cui si applica la funzione middleware.</div></tbody>

<div class="callout" id="callout2">Percorso (route) per cui si applica la funzione middleware.</div>

<div class="callout" id="callout3">La funzione middleware.</div>

<div class="callout" id="callout4">Argomento di callback nella funzione middleware, denominata per convenzione "next".</div>

<div class="callout" id="callout5">Argomento <a href="../4x/api.html#res">risposta</a> HTTP nella funzione middleware, denominato "res" per convenzione.</div>

<div class="callout" id="callout6">Argomento <a href="../4x/api.html#req">richiesta</a> HTTP nella funzione middleware, denominato "req" per convenzione.</div>
</td></tr>
</table>
</div>

Starting with Express 5, middleware functions that return a Promise will call `next(value)` when they reject or throw an error. `next` will be called with either the rejected value or the thrown Error.

<h2>Esempio</h2>

Ecco un esempio di una semplice applicazione Express "Hello World", per cui si definiranno due funzioni middleware:
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

<h3>Middleware function myLogger</h3>
Ecco un semplice esempio di una funzione middleware, denominata "myLogger". Questa funzione stampa semplicemente la dicitura "LOGGED" quando una richiesta all'applicazione la attraversa. La funzione middleware è assegnata ad una variabile denominata `myLogger`.

```js
const myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}
```

<div class="doc-box doc-notice" markdown="1">
Si noti la chiamata precedente a `next()`. Richiamando questa funzione si richiama la successiva funzione middleware nell'applicazione.
La funzione `next()` non fa parte dell'API Express o Node.js, ma è il terzo argomento trasmesso alla funzione middleware. La funzione `next()` potrebbe essere denominata in qualsiasi modo, ma per convenzione viene sempre denominata "next".
Per evitare confusione, utilizzare sempre questa convenzione.
</div>

Per caricare la funzione middleware, richiamare `app.use()`, specificando la funzione middleware.
Ad esempio, il seguente codice carica la funzione middleware `myLogger` prima della route al percorso root (/).

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

Ogni volta che un'applicazione riceve una richiesta, viene stampato il messaggio "LOGGED" sul terminale.

L'ordine di caricamento del middleware è importante: le funzioni middleware che vengono caricate per prime vengono anche eseguite per prime.

Se `myLogger` viene caricato dopo la route sul percorso root, la richiesta non lo raggiunge mai e l'applicazione non stampa "LOGGED", poiché l'handler di route del percorso root termina il ciclo richiesta-risposta.

La funzione middleware `myLogger` stampa semplicemente un messaggio, successivamente passa la richiesta alla successiva funzione middleware nello stack chiamando la funzione `next()`.

<h3>Middleware function requestTime</h3>

Nel successivo esempio viene aggiunta una proprietà denominata `requestTime` all'oggetto richiesta. Questa funzione middleware verrà denominata "requestTime".

```js
const requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}
```

L'applicazione utilizza ora la funzione middleware `requestTime`. Inoltre, la funzione di callback della route percorso root utilizza la proprietà che la funzione middleware aggiunge a `req` (l'oggetto richiesta).

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

Quando si effettua una richiesta al root dell'applicazione, l'applicazione mostra la cronologia data e ora della richiesta nel browser.

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

Poiché si dispone dell'accesso all'oggetto richiesta, l'oggetto risposta, la successiva funzione middleware nello stack e l'API Node.js completo, le possibilità con le funzioni middleware sono infinite.

Per ulteriori informazioni sul middleware Express, consultare: [Utilizzo del middleware Express](/{{ page.lang }}/guide/using-middleware.html).

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
