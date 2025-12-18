---
layout: page
title: Fehlerbehandlung in Express
description: Understand how Express.js handles errors in synchronous and asynchronous code, and learn to implement custom error handling middleware for your applications.
menu: guide
order: 6
redirect_from: "  "
---

# Fehlerbehandlung

_Error Handling_ refers to how Express catches and processes errors that
occur both synchronously and asynchronously. Express comes with a default error
handler so you don't need to write your own to get started.

## Catching Errors

It's important to ensure that Express catches all errors that occur while
running route handlers and middleware.

Errors that occur in synchronous code inside route handlers and middleware
require no extra work. If synchronous code throws an error, then Express will
catch and process it. Beispiel:

```js
app.get('/', (req, res) => {
  throw new Error('BROKEN') // Express will catch this on its own.
})
```

Middlewarefunktionen für die Fehlerbehandlung werden in derselben Weise definiert wie andere Middlewarefunktionen, nur, dass Fehlerbehandlungsfunktionen vier anstatt drei Argumente aufweisen:
`(err, req, res, next)`.  Beispiel:

```js
app.get('/', (req, res, next) => {
  fs.readFile('/file-does-not-exist', (err, data) => {
    if (err) {
      next(err) // Pass errors to Express.
    } else {
      res.send(data)
    }
  })
})
```

Middleware für die Fehlerbehandlung wird ganz zuletzt nach allen anderen `app.use()`- und Weiterleitungsaufrufen definiert.
Beispiel:

```js
app.get('/user/:id', async (req, res, next) => {
  const user = await getUserById(req.params.id)
  res.send(user)
})
```

If `getUserById` throws an error or rejects, `next` will be called with either
the thrown error or the rejected value. If no rejected value is provided, `next`
will be called with a default Error object provided by the Express router.

Wenn Sie Übergaben an die Funktion `next()` vornehmen (außer die Zeichenfolge `'route'`), sieht Express die aktuelle Anforderung als Fehler an und überspringt alle verbleibenden fehlerfreien Behandlungsroutinen und Middlewarefunktionen.

If the callback in a sequence provides no data, only errors, you can simplify
this code as follows:

```js
app.get('/', [
  function (req, res, next) {
    fs.writeFile('/inaccessible-path', 'data', next)
  },
  function (req, res) {
    res.send('OK')
  }
])
```

In the above example, `next` is provided as the callback for `fs.writeFile`,
which is called with or without errors. If there is no error, the second
handler is executed, otherwise Express catches and processes the error.

Bei einem Routenhandler mit mehreren Callback-Funktionen können Sie den Parameter `route` verwenden, um den nächsten Routenhandler zu überspringen. Beispiel:

```js
app.get('/', (req, res, next) => {
  setTimeout(() => {
    try {
      throw new Error('BROKEN')
    } catch (err) {
      next(err)
    }
  }, 100)
})
```

The above example uses a `try...catch` block to catch errors in the
asynchronous code and pass them to Express. If the `try...catch`
block were omitted, Express would not catch the error since it is not part of the synchronous
handler code.

Use promises to avoid the overhead of the `try...catch` block or when using functions
that return promises.  Beispiel:

```js
app.get('/', (req, res, next) => {
  Promise.resolve().then(() => {
    throw new Error('BROKEN')
  }).catch(next) // Errors will be passed to Express.
})
```

Since promises automatically catch both synchronous errors and rejected promises,
you can simply provide `next` as the final catch handler and Express will catch errors,
because the catch handler is given the error as the first argument.

You could also use a chain of handlers to rely on synchronous error
catching, by reducing the asynchronous code to something trivial. Beispiel:

```js
app.get('/', [
  function (req, res, next) {
    fs.readFile('/maybe-valid-file', 'utf-8', (err, data) => {
      res.locals.data = data
      next(err)
    })
  },
  function (req, res) {
    res.locals.data = res.locals.data.split(',')[1]
    res.send(res.locals.data)
  }
])
```

The above example has a couple of trivial statements from the `readFile`
call. If `readFile` causes an error, then it passes the error to Express, otherwise you
quickly return to the world of synchronous error handling in the next handler
in the chain. Then, the example above tries to process the data. If this fails, then the
synchronous error handler will catch it. If you had done this processing inside
the `readFile` callback, then the application might exit and the Express error
handlers would not run.

Whichever method you use, if you want Express error handlers to be called in and the
application to survive, you must ensure that Express receives the error.

## Die Standardfehlerbehandlungsroutine (Default Error Handler)

Express ist bereits mit einer integrierten Fehlerbehandlungsroutine ausgestattet, mit der alle in der Anwendung festgestellten Fehler gehandhabt werden können. Diese Middleware für die Fehlerbehandlung wird am Ende des Middleware-Funktionsstack hinzugefügt.

Wenn Sie einen Fehler an `next()` übergeben und diesen nicht mit einem Error-Handler bearbeiten, wird dieser über den integrierten Error-Handler bearbeitet. Der Fehler wird mit dem Stack-Trace zum Client geschrieben. Der Stack-Trace ist in der Produktionsumgebung nicht verfügbar.

<div class="doc-box doc-info" markdown="1">
Legen Sie die Umgebungsvariable `NODE_ENV` auf `production` fest, um die Anwendung im Produktionsmodus auszuführen.
</div>

When an error is written, the following information is added to the
response:

- The `res.statusCode` is set from `err.status` (or `err.statusCode`). If
  this value is outside the 4xx or 5xx range, it will be set to 500.
- The `res.statusMessage` is set according to the status code.
- The body will be the HTML of the status code message when in production
  environment, otherwise will be `err.stack`.
- Any headers specified in an `err.headers` object.

Wenn `next()` mit einem Fehler aufgerufen wird, nachdem Sie mit dem Schreiben der Antwort begonnen haben (z. B., wenn Sie beim Streamen der Antwort zum Client einen Fehler feststellen), schließt die Standardfehlerbehandlungsroutine in Express die Verbindung, und die Anforderung schlägt fehl.

Wenn Sie also einen angepassten Error-Handler hinzufügen, empfiehlt es sich, eine Delegierung zur Standardfehlerbehandlungsroutine in Express vorzunehmen, wenn die Header bereits an den Client gesendet wurden:

```js
function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
}
```

Note that the default error handler can get triggered if you call `next()` with an error
in your code more than once, even if custom error handling middleware is in place.

Other error handling middleware can be found at [Express middleware](/{{ page.lang }}/resources/middleware.html).

## Writing error handlers

Define error-handling middleware functions in the same way as other middleware functions,
except error-handling functions have four arguments instead of three:
`(err, req, res, next)`. Beispiel:

```js
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

You define error-handling middleware last, after other `app.use()` and routes calls; for example:

```js
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(methodOverride())
app.use((err, req, res, next) => {
  // logic
})
```

Antworten von der Middlewarefunktion können das von Ihnen gewünschte Format aufweisen wie beispielsweise eine Fehlerseite im HTML-Format, eine einfache Nachricht oder eine JSON-Zeichenfolge.

Für organisatorische Zwecke (und Frameworks der höheren Ebene) können Sie mehrere Middlewarefunktionen für die Fehlerbehandlung definieren, wie Sie dies bei regulären Middlewarefunktionen auch tun würden. Wenn Sie beispielsweise eine Fehlerbehandlungsroutine (Error-Handler) für Anforderungen über `XHR` und andere Anforderungen definieren wollen, können Sie die folgenden Befehle verwenden:

```js
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(methodOverride())
app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)
```

In diesem Beispiel kann die generische `logErrors`-Funktion Anforderungs- und Fehlerinformationen in `stderr` schreiben:

```js
function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}
```

In diesem Beispiel wird `clientErrorHandler` wie folgt definiert. In diesem Fall wird der Fehler explizit an den nächsten Error-Handler übergeben:

Notice that when _not_ calling "next" in an error-handling function, you are responsible for writing (and ending) the response. Otherwise, those requests will "hang" and will not be eligible for garbage collection.

```js
function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}
```

Die `errorHandler`-Funktion "catch-all" kann wie folgt implementiert werden:

```js
function errorHandler (err, req, res, next) {
  res.status(500)
  res.render('error', { error: err })
}
```

If you have a route handler with multiple callback functions, you can use the `route` parameter to skip to the next route handler. Beispiel:

```js
app.get('/a_route_behind_paywall',
  (req, res, next) => {
    if (!req.user.hasPaid) {
      // continue handling this request
      next('route')
    } else {
      next()
    }
  }, (req, res, next) => {
    PaidContent.find((err, doc) => {
      if (err) return next(err)
      res.json(doc)
    })
  })
```

In diesem Beispiel wird der Handler `getPaidContent` übersprungen. Alle verbleibenden Handler in `app` für `/a_route_behind_paywall` werden jedoch weiter ausgeführt.

<div class="doc-box doc-info" markdown="1">
Aufrufe zu `next()` und `next(err)` geben an, dass der aktuelle Handler abgeschlossen ist und welchen Status er aufweist.  Durch `next(err)` werden alle verbleibenden Handler in der Kette übersprungen. Ausgenommen hiervor sind die Handler, die konfiguriert sind, um Fehler wie oben beschrieben zu behandeln.
</div>
