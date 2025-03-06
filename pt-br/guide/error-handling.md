---
layout: page
title: Manipulação de erros do Express
menu: guide
lang: pt-br
description: Understand how Express.js handles errors in synchronous and asynchronous
  code, and learn to implement custom error handling middleware for your applications.
---

# Manipulação de erros

Defina funções de middleware de manipulação de erros da mesma
forma que outras funções de middleware, exceto que funções de
manipulação de erros possuem quatro argumentos ao invés de três:
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

app.use(bodyParser())
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

app.use(bodyParser())
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

Se passar qualquer coisa para a função `next()`
(exceto a sequência de caracteres `'route'`),
o Express considera a solicitação atual como estando em erro e irá
ignorar quaisquer funções restantes de roteamento e middleware que
não sejam de manipulação de erros. Se desejar manipular este erro de
alguma forma, você terá que criar uma rota de manipulação de erros na
próxima seção.


Se você tiver um manipulador de rota com as funções de retorno
de chamada é possível usar o parâmetro `route`
para ignorar o próximo manipulador de rota. Por exemplo:

```js
app.get('/a_route_behind_paywall',
  (req, res, next) => {
    if (!req.user.hasPaid) {

      // continue handling this request
      next('route')
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
indicam que o manipulador atual está completo e em qual estado.
`next(err)` irá ignorar todos os manipuladores
remanescentes na cadeia exceto por aqueles que estão configurados
para manipular erros como descrito acima.
</div>

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
