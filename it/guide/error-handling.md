---
layout: page
title: Gestione degli errori di Express
description: Understand how Express.js handles errors in synchronous and asynchronous code, and learn to implement custom error handling middleware for your applications.
menu: guide
order: 6
redirect_from: "  "
---

# Gestione degli errori

_Error Handling_ refers to how Express catches and processes errors that
occur both synchronously and asynchronously. Express comes with a default error
handler so you don't need to write your own to get started.

## Catching Errors

It's important to ensure that Express catches all errors that occur while
running route handlers and middleware.

Errors that occur in synchronous code inside route handlers and middleware
require no extra work. If synchronous code throws an error, then Express will
catch and process it. Ad esempio:

```js
app.get('/', (req, res) => {
  throw new Error('BROKEN') // Express will catch this on its own.
})
```

Definire le funzioni middleware di gestione degli errori nello stesso modo in cui si definiscono altre funzioni middleware,
ad eccezione delle funzioni di gestione degli errori che hanno quattro argomenti invece di tre:
`(err, req, res, next)`.  Ad esempio:

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

Se si dispone di un gestore route con più funzioni di callback, è possibile utilizzare il parametro `route` per passare al successivo gestore route.
Ad esempio:

```js
app.get('/user/:id', async (req, res, next) => {
  const user = await getUserById(req.params.id)
  res.send(user)
})
```

If `getUserById` throws an error or rejects, `next` will be called with either
the thrown error or the rejected value. If no rejected value is provided, `next`
will be called with a default Error object provided by the Express router.

Se si trasmette qualsiasi cosa alla funzione `next()` (ad eccezione della stringa `'route'`), Express considera la richiesta corrente come se contenesse errori e ignorerà qualsiasi altra funzione middleware e routing di non gestione degli errori restante.

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

You must catch errors that occur in asynchronous code invoked by route handlers or
middleware and pass them to Express for processing. Ad esempio:

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
that return promises.  Ad esempio:

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
catching, by reducing the asynchronous code to something trivial. Ad esempio:

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

## Il gestore errori predefinito

Express viene fornito insieme a un gestore degli errori integrato, il quale gestisce gli errori che potrebbero verificarsi nell'applicazione. Questa funzione middleware di gestione degli errori viene aggiunta alla fine dello stack della funzione middleware.

Se un errore viene ignorato e passato a `next()` e non viene gestito in un gestore
degli errori, verrà gestito dal gestore errori integrato; l'errore verrà scritto sul client con la traccia
stack. La traccia stack non viene inclusa nell'ambiente di produzione.

<div class="doc-box doc-info" markdown="1">
Impostare la variabile di ambiente `NODE_ENV` su `production`, per eseguire l'applicazione nella modalità di produzione.
</div>

When an error is written, the following information is added to the
response:

- The `res.statusCode` is set from `err.status` (or `err.statusCode`). If
  this value is outside the 4xx or 5xx range, it will be set to 500.
- The `res.statusMessage` is set according to the status code.
- The body will be the HTML of the status code message when in production
  environment, otherwise will be `err.stack`.
- Any headers specified in an `err.headers` object.

Se si chiama `next()` con un errore dopo che si è iniziato a scrivere la risposta
(ad esempio, se si riscontra un errore mentre si esegue lo streaming della
risposta al client) il gestore degli errori predefinito di Express chiude la connessione
e rifiuta la richiesta.

Pertanto, quando si aggiunge un gestore degli errori personalizzato, si consiglia di associarlo al meccanismo
di gestione degli errori predefinito in Express, quando le intestazioni
sono state già inviate al client:

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
`(err, req, res, next)`. Ad esempio:

```js
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

Si definisce il middleware di gestione degli errori per ultimo, successivamente `app.use()` e altre chiamate route; ad esempio:

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

Le risposte dall'interno delle funzione middleware possono essere in qualsiasi formato desiderato, ad esempio una pagina di errore HTML, un messaggio semplice o una stringa JSON.

Per motivi organizzativi (e framework di livello più alto), è possibile definire
diverse funzioni middleware di gestione degli errori, come solitamente si fa con
le funzioni middleware normali. Ad esempio, se si desidera definire un programma di gestione errori per le richieste
effettuate utilizzando `XHR` e quelle senza, è necessario utilizzare i seguenti comandi:

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

In questo esempio, il `logErrors` generico potrebbe scrivere le richieste e le informazioni sull'errore
su `stderr`, ad esempio:

```js
function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}
```

Inoltre, in questo esempio, `clientErrorHandler` viene definito come segue; in questo caso, l'errore viene chiaramente tramandato al successivo:

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

La funzione "catch-all" `errorHandler` potrebbe essere implementata come segue:

```js
function errorHandler (err, req, res, next) {
  res.status(500)
  res.render('error', { error: err })
}
```

If you have a route handler with multiple callback functions, you can use the `route` parameter to skip to the next route handler. Ad esempio:

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

In questo esempio, il gestore `getPaidContent` verrà ignorato ma qualsiasi altro gestore rimanente in `app` per `/a_route_behind_paywall` verrà eseguito senza interruzione.

<div class="doc-box doc-info" markdown="1">
Le chiamate a `next()` e `next(err)` indicano che il gestore corrente è completo e in che stato si trova.  `next(err)` ignorerà tutti gli handler rimanenti nella catena ad eccezione degli handler configurati per gestire gli errori come descritto sopra.
</div>
