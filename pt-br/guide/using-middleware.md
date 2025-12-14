---
layout: page
title: Usando middlewares do Express
description: Learn how to use middleware in Express.js applications, including application-level and router-level middleware, error handling, and integrating third-party middleware.
menu: guide
order: 3
redirect_from: "  "
---

# Usando middlewares

O Express é uma estrutura web de roteamento e middlewares que
tem uma funcionalidade mínima por si só: Um aplicativo do Express é
essencialmente uma série de chamadas de funções de middleware.

_Middleware_ functions are functions that have access to the [request object](/{{ page.lang }}/5x/api.html#req)  (`req`), the [response object](/{{ page.lang }}/5x/api.html#res) (`res`), and the next middleware function in the application's request-response cycle. A próxima função middleware é
comumente denotada por uma variável chamada `next`.

Funções de middleware podem executar as seguintes tarefas:

- Executar qualquer código.
- Fazer mudanças nos objetos de solicitação e resposta.
- Encerrar o ciclo de solicitação-resposta.
- Chamar a próxima função de middleware na pilha.

Se a atual função de middleware não terminar o ciclo de
solicitação-resposta, ela precisa chamar `next()`
para passar o controle para a próxima função de middleware. Caso
contrário, a solicitação ficará suspensa.

Um aplicativo Express pode usar os seguintes tipos de middleware:

- [Middleware de nível do aplicativo](#middleware.application)
- [Middleware de nível de roteador](#middleware.router)
- [Middleware de manipulação de erros](#middleware.error-handling)
- [Middleware integrado](#middleware.built-in)
- [Middleware de Terceiros](#middleware.third-party)

É possível carregar middlewares de nível de roteador e de nível do aplicativo com um caminho de montagem opcional.
É possível também carregar uma série de funções de middleware juntas, o que cria uma sub-pilha do sistema de middleware em um ponto de montagem.

<h2 id='middleware.application'>Middleware de nível do aplicativo</h2>

Bind application-level middleware to an instance of the [app object](/{{ page.lang }}/5x/api.html#app) by using the `app.use()` and `app.METHOD()` functions, where `METHOD` is the HTTP method of the request that the middleware function handles (such as GET, PUT, or POST) in lowercase.

Este exemplo mostra uma função de middleware sem um caminho de
montagem. A função é executada sempre que o aplicativo receber uma
solicitação.

```js
const express = require('express')
const app = express()

app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})
```

Este exemplo mostra uma função de middleware montada no caminho
`/user/:id`. A função é executada para qualquer tipo
de solicitação HTTP no caminho `/user/:id`.

```js
app.use('/user/:id', (req, res, next) => {
  console.log('Request Type:', req.method)
  next()
})
```

Este exemplo mostra uma rota e sua função
manipuladora (sistema de middleware). A função manipula solicitações
GET ao caminho `/user/:id`.

```js
app.get('/user/:id', (req, res, next) => {
  res.send('USER')
})
```

Aqui está um exemplo de carregamento de um série de funções de
middleware em um ponto de montagem, com um caminho de montagem.
Ele
ilustra uma sub-pilha de middleware que imprime informações de
solicitação para qualquer tipo de solicitação HTTP no caminho `/user/:id`.

```js
app.use('/user/:id', (req, res, next) => {
  console.log('Request URL:', req.originalUrl)
  next()
}, (req, res, next) => {
  console.log('Request Type:', req.method)
  next()
})
```

Manipuladores de rota permitem a você definir várias rotas para
um caminho. O exemplo abaixo define duas rotas para solicitações GET
no caminho `/user/:id`. A segunda rota não irá
causar nenhum problema, mas ela nunca será chamada pois a primeira
rota termina o ciclo solicitação-resposta.

Este exemplo mostra uma sub-pilha de middleware que manipula
solicitações GET no caminho `/user/:id`.

```js
app.get('/user/:id', (req, res, next) => {
  console.log('ID:', req.params.id)
  next()
}, (req, res, next) => {
  res.send('User Info')
})

// handler for the /user/:id path, which prints the user ID
app.get('/user/:id', (req, res, next) => {
  res.send(req.params.id)
})
```

`redirect`

{% capture next-function %}

`next('route')` will work only in middleware functions that were loaded by using the `app.METHOD()` or `router.METHOD()` functions.

{% endcapture %}

{% include admonitions/note.html content=next-function %}

Este exemplo mostra uma sub-pilha de middleware que manipula
solicitações GET no caminho `/user/:id`.

```js
app.get('/user/:id', (req, res, next) => {
  // if the user ID is 0, skip to the next route
  if (req.params.id === '0') next('route')
  // otherwise pass the control to the next middleware function in this stack
  else next()
}, (req, res, next) => {
  // send a regular response
  res.send('regular')
})

// handler for the /user/:id path, which sends a special response
app.get('/user/:id', (req, res, next) => {
  res.send('special')
})
```

Middleware can also be declared in an array for reusability.

É possível ter mais do que um diretório estático por aplicativo:

```js
function logOriginalUrl (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}

function logMethod (req, res, next) {
  console.log('Request Type:', req.method)
  next()
}

const logStuff = [logOriginalUrl, logMethod]
app.get('/user/:id', logStuff, (req, res, next) => {
  res.send('User Info')
})
```

<h2 id='middleware.router'>Middleware de nível de roteador</h2>

Middlewares de nível de roteador funcionam da mesma forma que
os middlewares de nível do aplicativo, mas estão vinculados a uma
instância do `express.Router()`.

```js
const router = express.Router()
```

Carregue os middlewares de nível de roteador usando as funções `router.use()` e `router.METHOD()`.

O seguinte código de exemplo replica o sistema de middleware
que é mostrado acima para o middleware de nível do aplicativo, usando
um middleware de nível de roteador:

```js
const express = require('express')
const app = express()
const router = express.Router()

// a middleware function with no mount path. This code is executed for every request to the router
router.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use('/user/:id', (req, res, next) => {
  console.log('Request URL:', req.originalUrl)
  next()
}, (req, res, next) => {
  console.log('Request Type:', req.method)
  next()
})

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get('/user/:id', (req, res, next) => {
  // if the user ID is 0, skip to the next router
  if (req.params.id === '0') next('route')
  // otherwise pass control to the next middleware function in this stack
  else next()
}, (req, res, next) => {
  // render a regular page
  res.render('regular')
})

// handler for the /user/:id path, which renders a special page
router.get('/user/:id', (req, res, next) => {
  console.log(req.params.id)
  res.render('special')
})

// mount the router on the app
app.use('/', router)
```

Para obter mais detalhes sobre a função `serve-static` e suas opções, consulte: documentação do[serve-static](https://github.com/expressjs/serve-static).

Este exemplo mostra uma sub-pilha de middleware que manipula
solicitações GET no caminho `/user/:id`.

```js
const express = require('express')
const app = express()
const router = express.Router()

// predicate the router with a check and bail out when needed
router.use((req, res, next) => {
  if (!req.headers['x-auth']) return next('router')
  next()
})

router.get('/user/:id', (req, res) => {
  res.send('hello, user!')
})

// use the router and 401 anything falling through
app.use('/admin', router, (req, res) => {
  res.sendStatus(401)
})
```

<h2 id='middleware.error-handling'>Middleware de manipulação de erros</h2>

<div class="doc-box doc-notice" markdown="1">
Middlewares de manipulação de erros sempre levam *quatro* argumentos. Você deve fornecer quatro argumentos para identificá-lo como uma
função de middleware de manipulação de erros. Mesmo se você não
precisar usar o objeto `next`, você deve
especificá-lo para manter a assinatura. Caso contrário, o objeto
`next` será interpretado como um middleware comum e
a manipulação de erros falhará.
</div>

Defina funções de middleware de manipulação de
erros da mesma forma que outras funções de middleware, exceto que com
quatro argumentos ao invés de três, especificamente com a assinatura
`(err, req, res, next)`):

```js
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

Para obter detalhes sobre middleware de manipulação de erros,
consulte [Manipulação de erros](/{{ page.lang }}/guide/error-handling.html).

<h2 id='middleware.built-in'>Middleware integrado</h2>

Desde a versão 4.x, o Express não depende mais do [Connect](https://github.com/senchalabs/connect). Com
exceção da `express.static`, todas as funções de
middleware que eram previamente incluídas com o Express estão agora
em módulos separados. Visualize  a lista
de funções de middleware.

Aqui está um exemplo de uso da função de middleware `express.static` com um objeto options elaborado:

- [express.static](/en/5x/api.html#express.static) serves static assets such as HTML files, images, and so on.
- [express.json](/en/5x/api.html#express.json) parses incoming requests with JSON payloads. **NOTE: Available with Express 4.16.0+**
- [express.urlencoded](/en/5x/api.html#express.urlencoded) parses incoming requests with URL-encoded payloads.  **NOTE: Available with Express 4.16.0+**

<h2 id='middleware.third-party'>Middleware de Terceiros</h2>

Use middlewares de terceiros para incluir funcionalidades aos aplicativos do Express

Instale o módulo Node.js para a funcionalidade requerida, em seguida carregue-a no seu aplicativo no nível do aplicativo ou no nível de roteador.

O exemplo a seguir ilustra a instalação e carregamento da
função de middleware para análise sintática de cookies `cookie-parser`.

```bash
$ npm install cookie-parser
```

```js
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

// load the cookie-parsing middleware
app.use(cookieParser())
```

Para obter uma lista parcial de funções de middleware de
terceiros que são comumente utilizadas com o Express, consulte:
[Middleware de Terceiros](../resources/middleware.html).
