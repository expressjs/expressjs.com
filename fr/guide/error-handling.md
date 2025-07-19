---
layout: page
title: Traitement d'erreurs Express
description: Understand how Express.js handles errors in synchronous and asynchronous code, and learn to implement custom error handling middleware for your applications.
menu: guide
redirect_from: "  "
---

# Traitement d'erreurs

_Error Handling_ refers to how Express catches and processes errors that
occur both synchronously and asynchronously. Express comes with a default error
handler so you don't need to write your own to get started.

## Catching Errors

It's important to ensure that Express catches all errors that occur while
running route handlers and middleware.

Errors that occur in synchronous code inside route handlers and middleware
require no extra work. If synchronous code throws an error, then Express will
catch and process it. Par exemple :

```js
app.get('/', (req, res) => {
  throw new Error('BROKEN') // Express will catch this on its own.
})
```

Définissez les fonctions middleware de traitement d'erreurs de la même manière que les autres fonctions middleware,
à l'exception près que les fonctions de traitement d'erreurs se composent de quatre arguments et non de trois :
`(err, req, res, next)`.  Par exemple :

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

Si vous disposez d'un gestionnaire de routage avec plusieurs fonctions callback, vour pouvez utiliser le paramètre `route` pour passer au gestionnaire de routage suivant.
Par exemple :

```js
app.get('/user/:id', async (req, res, next) => {
  const user = await getUserById(req.params.id)
  res.send(user)
})
```

If `getUserById` throws an error or rejects, `next` will be called with either
the thrown error or the rejected value. If no rejected value is provided, `next`
will be called with a default Error object provided by the Express router.

Si vous transmettez tout à la fonction `next()` (sauf la chaîne `'route'`), Express considère la demande en cours
comme étant erronée et ignorera tout routage de gestion non lié à une erreur et toute fonction middleware restants.

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
middleware and pass them to Express for processing. Par exemple :

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
that return promises.  Par exemple :

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
catching, by reducing the asynchronous code to something trivial. Par exemple :

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

## Le gestionnaire de traitement d'erreurs par défaut

Express propose un gestionnaire d'erreurs intégré, qui traite toutes les erreurs qui pourraient survenir dans l'application. Cette fonction middleware de traitement d'erreurs par défaut est ajoutée à la fin de la pile de fonctions middleware.

Si vous transmettez l'erreur à `next()` et que vous ne voulez pas la gérer dans
un gestionnaire d'erreurs, elle sera gérée par le gestionnaire d'erreurs intégré ; l'erreur sera alors écrite dans le client avec la
trace de pile. La trace de pile n'est pas incluse dans l'environnement de production.

<div class="doc-box doc-info" markdown="1">
Définissez la variable d'environnement `NODE_ENV` sur `production` afin d'exécuter l'application en mode production.
</div>

When an error is written, the following information is added to the
response:

- The `res.statusCode` is set from `err.status` (or `err.statusCode`). If
  this value is outside the 4xx or 5xx range, it will be set to 500.
- The `res.statusMessage` is set according to the status code.
- The body will be the HTML of the status code message when in production
  environment, otherwise will be `err.stack`.
- Any headers specified in an `err.headers` object.

Si vous appelez `next()` avec une erreur après avoir démarré l'écriture de la
réponse (par exemple, si vous rencontrez une erreur lors de la diffusion en flux de la
réponse au client) le gestionnaire de traitement d'erreurs par défaut Express ferme la
connexion et met la demande en échec.

De ce fait, lorsque vous ajoutez un gestionnaire d'erreurs personnalisé, vous devriez déléguer
les mécanismes de gestion d'erreur par défaut à Express, lorsque les en-têtes
ont déjà été envoyés au client :

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
`(err, req, res, next)`. Par exemple :

```js
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

Définissez le middleware de traitement d'erreurs en dernier, après les autres appels `app.use()` et de routes ; par exemple :

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

Les réponses issues d'une fonction middleware peuvent être au format de votre choix, par exemple une page d'erreur HTML, un simple message ou une chaîne JSON.

A des fins organisationnelles (et d'infrastructure de niveau supérieur), vous pouvez définir plusieurs fonctions middleware de traitement d'erreurs, tout comme vous le feriez avec d'autres fonctions middleware ordinaires. Par exemple, si vous vouliez définir un gestionnaire d'erreurs pour les demandes réalisées avec `XHR` et pour celles réalisées sans, vous pourriez utiliser les commandes suivantes :

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

Dans cet exemple, les erreurs `logErrors` génériques pourraient écrire des informations de demande et d'erreur dans `stderr`, par exemple :

```js
function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}
```

Egalement dans cet exemple, `clientErrorHandler` est défini comme suit ; dans ce cas, l'erreur est explicitement transmise à la fonction suivante :

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

La fonction "catch-all" `errorHandler` peut être mise en oeuvre comme suit :

```js
function errorHandler (err, req, res, next) {
  res.status(500)
  res.render('error', { error: err })
}
```

If you have a route handler with multiple callback functions, you can use the `route` parameter to skip to the next route handler. Par exemple :

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

Dans cet exemple, le gestionnaire `getPaidContent` sera ignoré, mais tous les gestionnaires restants dans `app` pour `/a_route_behind_paywall` continueront d'être exécutés.

<div class="doc-box doc-info" markdown="1">
Les appels `next()` et `next(err)` indiquent que le gestionnaire en cours a fini et quel est son état.  `next(err)` ignorera tous les gestionnaires restants dans la chaîne, sauf ceux définis pour gérer les erreurs tel que décrit ci-dessus.
</div>
