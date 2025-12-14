---
layout: page
title: Manipulação de erros do Express
description: Understand how Express.js handles errors in synchronous and asynchronous code, and learn to implement custom error handling middleware for your applications.
menu: guide
order: 6
redirect_from: "  "
---

# Manipulação de erros

_Error Handling_ refers to how Express catches and processes errors that
occur both synchronously and asynchronously. Express comes with a default error
handler so you don't need to write your own to get started.

## Catching Errors

It's important to ensure that Express catches all errors that occur while
running route handlers and middleware.

Errors that occur in synchronous code inside route handlers and middleware
require no extra work. If synchronous code throws an error, then Express will
catch and process it. Por exemplo:

```js
app.get('/', (req, res) => {
  throw new Error('BROKEN') // Express will catch this on its own.
})
```

Defina funções de middleware de manipulação de erros da mesma
forma que outras funções de middleware, exceto que funções de
manipulação de erros possuem quatro argumentos ao invés de três:
`(err, req, res, next)`.  Por exemplo:

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

Se você tiver um manipulador de rota com as funções de retorno
de chamada é possível usar o parâmetro `route`
para ignorar o próximo manipulador de rota.
Por exemplo:

```js
app.get('/user/:id', async (req, res, next) => {
  const user = await getUserById(req.params.id)
  res.send(user)
})
```

If `getUserById` throws an error or rejects, `next` will be called with either
the thrown error or the rejected value. If no rejected value is provided, `next`
will be called with a default Error object provided by the Express router.

Se passar qualquer coisa para a função `next()`
(exceto a sequência de caracteres `'route'`),
o Express considera a solicitação atual como estando em erro e irá
ignorar quaisquer funções restantes de roteamento e middleware que
não sejam de manipulação de erros.

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
middleware and pass them to Express for processing. Por exemplo:

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
that return promises.  Por exemplo:

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
catching, by reducing the asynchronous code to something trivial. Por exemplo:

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

## O Manipulador de Erros Padrão

O Express vem com um manipulador de erros integrado, que cuida
de qualquer erro que possa ser encontrado no aplicativo. Essa função
de middleware de manipulação de erros padrão é incluída no final da
pilha de funções de middleware.

se você passar um erro para o `next()` e você
não manipulá-lo com um manipulador de erros, ele irá ser manipulado
por um manipulador de erros integrado; o erro será escrito no cliente
com o rastreio de pilha. O rastreio de pilha não será incluído no
ambiente de produção.

<div class="doc-box doc-info" markdown="1">
Configura a variável de ambiente `NODE_ENV` para
`production`, para executar o aplicativo em modo de
produção.
</div>

When an error is written, the following information is added to the
response:

- The `res.statusCode` is set from `err.status` (or `err.statusCode`). If
  this value is outside the 4xx or 5xx range, it will be set to 500.
- The `res.statusMessage` is set according to the status code.
- The body will be the HTML of the status code message when in production
  environment, otherwise will be `err.stack`.
- Any headers specified in an `err.headers` object.

Se você chamar o `next()` com um erro após ter
inicializado escrevendo a resposta (por exemplo, se encontrar um erro
enquanto passa a resposta ao cliente) o manipulador de erros padrão do
Express fecha a conexão e falha a solicitação.

Portanto ao incluir um manipulador de erro customizado, você
desejará delegar para o mecanismo de manipulação de erros padrão no
Express, quando os cabeçalhos já tiverem sido enviados para o cliente:

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
`(err, req, res, next)`. Por exemplo:

```js
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

Você define os middlewares de manipulação de erros por
último, após outros `app.use()` e chamads de rota; por
exemplo:

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

Repostas de dentro de uma função de middleware podem estar em
qualquer formato que preferir, como uma página HTML de erros, uma
mensagem simples, ou uma sequência de caracteres JSON.

Para propósitos organizacionais (e estrutura de alto nível), é
possível definir várias funções de middleware de manipulação de
erros, de forma muito parecida como você faria com funções de
middleware comuns. Por exemplo, se desejar definir um manipulador de
erros para solicitações feitas usando o `XHR`, e
aqueles sem, você pode usar os seguintes comandos:

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

Neste exemplo, o `logErrors` genérico pode
escrever informações de solicitações e erros no
`stderr`, por exemplo:

```js
function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}
```

Também neste exemplo, o `clientErrorHandler` é
definido como segue; neste caso, o erro é explicitamente passado para
o próximo:

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

A função "catch-all" `errorHandler` pode ser implementada como segue:

```js
function errorHandler (err, req, res, next) {
  res.status(500)
  res.render('error', { error: err })
}
```

If you have a route handler with multiple callback functions, you can use the `route` parameter to skip to the next route handler. Por exemplo:

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

Neste exemplo, o manipulador `getPaidContent`
será ignorado mas qualquer manipulador remanescente no
`app` para
`/a_route_behind_paywall` continuariam sendo
executados.

<div class="doc-box doc-info" markdown="1">
Chamadas para `next()` e `next(err)`
indicam que o manipulador atual está completo e em qual estado.  `next(err)` irá ignorar todos os manipuladores
remanescentes na cadeia exceto por aqueles que estão configurados
para manipular erros como descrito acima.
</div>
