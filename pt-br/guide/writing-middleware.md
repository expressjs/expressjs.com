---
layout: page
title: Escrevendo middlewares para uso em aplicativos do Express
description: Learn how to write custom middleware functions for Express.js applications, including examples and best practices for enhancing request and response handling.
menu: guide
lang: pt-br
redirect_from: /guide/writing-middleware.html
---

# Escrevendo middlewares pra uso em aplicativos do Express

<h2>Visão Geral</h2>

Funções de _Middleware_ são funções que tem acesso
ao [objeto de solicitação](/{{ page.lang }}/4x/api.html#req)
(`req`), o [objeto de resposta](/{{ page.lang }}/4x/api.html#res)
(`res`), e a próxima função de middleware no ciclo
solicitação-resposta do aplicativo. A próxima função middleware é
comumente denotada por uma variável chamada `next`.

Funções de middleware podem executar as seguintes tarefas:

- Executar qualquer código.
- Fazer mudanças nos objetos de solicitação e resposta.
- Encerrar o ciclo de solicitação-resposta.
- Chamar o próximo middleware na pilha.

Se a atual função de middleware não terminar o ciclo de
solicitação-resposta, ela precisa chamar `next()`
para passar o controle para a próxima função de middleware. Caso
contrário, a solicitação ficará suspensa.

O exemplo a seguir mostra os elementos de uma chamada de função de middleware:

<table id="mw-fig">
<tbody><tr><td id="mw-fig-imgcell">
<img src="/images/express-mw.png" alt="Elements of a middleware function call" id="mw-fig-img" />
</td>
<td class="mw-fig-callouts">
<div class="callout" id="callout1">O método HTTP para o qual a função de middleware é aplicada.</div></tbody>

<div class="callout" id="callout2">Caminho (rota) para o qual a função de middleware é aplicada.</div>

<div class="callout" id="callout3">A função de middleware.</div>

<div class="callout" id="callout4">Argumento de retorno de chamada para a função de middleware, chamado de "next" por convenção.</div>

<div class="callout" id="callout5">Argumento de <a href="../4x/api.html#res">resposta</a> HTTP para a função de middleware, chamado de "res" por convenção.</div>

<div class="callout" id="callout6">Argumento de <a href="../4x/api.html#req">solicitação</a> HTTP para a função de middleware, chamado de "req" por convenção.</div>
</td></tr>
</table>

Starting with Express 5, middleware functions that return a Promise will call `next(value)` when they reject or throw an error. `next` will be called with either the rejected value or the thrown Error.

<h2>Example</h2>

Aqui está um exemplo de um simples aplicativo "Hello World" do
Express, para o qual serão definidas duas funções de middleware:
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
Aqui está um exemplo simples de uma função de middleware chamada "myLogger". Esta
função apenas imprime "LOGGED" quando uma solicitação para o aplicativo passa por ela. A
função de middleware é designada para uma variável chamada `myLogger`.

```js
const myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}
```

<div class="doc-box doc-notice" markdown="1">
Observe a chamada acima para `next()`. A chamada
desta função chama a próxima função de middleware no aplicativo.
A função `next()` não faz parte do Node.js
ou da API Express, mas é o terceiro argumento que é passado para a
função de middleware. A função `next()` poderia ter
qualquer nome, mas por convenção ela é sempre chamada de "next".
Para
evitar confusão, sempre use esta convenção.
</div>

Para carregar a função de middleware, chame `app.use()`, especificando a função de middleware.
Por exemplo, o código a seguir carrega a função de middleware do `myLogger` antes da rota para o caminho raiz (/).

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

Sempre que o aplicativo recebe uma chamada, ele imprime a mensagem "LOGGED" no terminal.

A ordem de carregamento do middleware é importante: funções de middleware que são carregadas primeiro também são executadas primeiro.

Se `myLogger` é carregada após a rota para o
caminho raiz, a chamada nunca chegará a ela e o aplicativo não
imprimirá "LOGGED", pois o manipulador de rota do caminho raiz
encerra o ciclo de solicitação-resposta.

A função de middleware `myLogger` simplesmente imprime uma mensagem, e em seguida passa a solicitação para a próxima
função de middleware na pilha chamando a função `next()`.

<h3>Middleware function requestTime</h3>

O próximo exemplo inclui uma propriedade chamada
`requestTime` ao objeto da solicitação. Iremos
chamar esta função de middleware de "requestTime".

```js
const requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}
```

O aplicativo agora usa a função de middleware `requestTime`. Além
disso, a função de retorno de chamada do caminho raiz usa a
propriedade que a função de middleware inclui no
`req` (o objeto da solicitação).

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

Ao fazer uma solicitação para a raiz do aplicativo, o
aplicativo agora exibe o registro de data e hora da sua solicitação
no navegador.

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

Como você tem acesso ao objeto da solicitação, ao objeto de
resposta, à próxima função de middleware na pilha, e à API completa do
Node.js, as possibilidades com as funções de middleware são ilimitadas.

Para obter mais informações sobre middlewares no Express,
consulte: [Usando
middlewares no Express](/{{ page.lang }}/guide/using-middleware.html).

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
