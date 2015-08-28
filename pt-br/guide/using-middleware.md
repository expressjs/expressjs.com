---
layout: page
title: Usando middleware
menu: guide
lang: pt-br
---

# Usando middleware

Express é um framework de roteamento e mddleware com um mínimo de funcionalidades próprias. Um aplicativo Express é essencialmente uma série de chamadas a middlewares.

_Middleware_ é uma função com acesso ao [objeto de requisição](/4x/api.html#req) (req), ao [objeto de resposta](/4x/api.html#res) (res), e ao próximo middleware no ciclo requisição-resposta do aplicativo. Normalmente middlewares são denominados por uma variável chamada next.

Um middleware pode:

 - Executar qualquer código.
 - Fazer alterações nos objetos de requisição e de resposta.
 - Finalizar o ciclo de requisição e resposta.
 - Chamar o próximo middleware na pilha.

Se o middleware atual não finalizar o ciclo requisição-resposta, ele precisa chamar next() para passar o controle ao próximo middleware, caso contrário a requisição ficará em aberto.

Um aplicativo Express pode usar os seguintes tipos de middleware

 - [Application-level middleware](#middleware.application)
 - [Router-level middleware](#middleware.router)
 - [Error-handling middleware](#middleware.error-handling)
 - [Built-in middleware](#middleware.built-in)
 - [Third-party middleware](#middleware.third-party)

Você pode carregar middlewares application-level e router-level com uma montagem de rotas opcional. Também pode carregar uma série de funções middlewares criando uma sub-pilha de sistemas de middlewares em um ponto da montagem.

<h2 id='middleware.application'>Application-level middleware</h2>

Vinculamos um middleware application-level a uma instância do objeto app utilizando app.use() e app.METHOD(), onde METHOD é o método de requisição HTTP que será manipulado, tal como GET, PUT, POST e qualquer outro (escrito em minúsculas).
Por exemplo:

~~~js
var app = express();

// um middleware sem path; é executado por qualquer requisição feita a app
app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});
// a middleware montado com /user/:id; será executado por qualquer tipo de requisição de HTTP para /user/:id
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// uma rota e sua função manipuladora (middleware system) que trata requisições GET para /user/:id
app.get('/user/:id', function (req, res, next) {
  res.send('USER');
});
~~~

Aqui está um exemplo de carregamento de uma série de middlewares em um ponto de montagem com um caminho montado.

~~~js
// uma sub-pilha que imprime informações de qualquer tipo de requisição HTTP para /user/:id 
app.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
~~~

Manipuladores de rota (route handlers) permitem que você defina múltiplas rotas para um caminho (path).
O exemplo abaixo define duas rotas para /user/:id com a requisição tipo GET. A segunda rota não causará qualquer problema, pois ela nunca será chamada, porque a primeira finaliza o ciclo de requsição-resposta.

~~~js
// uma sub pilha middleware que manipula requisições GET para /user/:id
app.get('/user/:id', function (req, res, next) {
  console.log('ID:', req.params.id);
  next();
}, function (req, res, next) {
  res.send('User Info');
});

// manipulador para /user/:id que imprime o id do usuário
app.get('/user/:id', function (req, res, next) {
  res.end(req.params.id);
});
~~~

Para pular o resto do middleware e passar o controle para o próximo middleware da rota, utilizamos `next('route')`. 
**Nota**: `next('route')` só funcionará em middlewares carregados com `app.METHOD()` ou `router.METHOD()`.


~~~js
// uma sub-pilha de middleware que manipula requisições GET para /user/:id
app.get('/user/:id', function (req, res, next) {
  // if user id is 0, skip to the next route
  if (req.params.id == 0) next('route');
  // else pass the control to the next middleware in this stack
  else next(); //
}, function (req, res, next) {
  // render a regular page
  res.render('regular');
});

// manipulador para /user/:id com renderização em uma página especial
app.get('/user/:id', function (req, res, next) {
  res.render('special');
});
~~~

<h2 id='middleware.router'>Router-level middleware</h2>

Um middleware router-level funciona de forma semelhante a um middleware application-level, porém está limitado a uma instância de `express.Router()`.

~~~js
var router = express.Router();
~~~

Carregamos middlewares router-level utilizando `router.use()` e `router.METHOD()`.

O próximo exemplo de código refaz o sistema de middleware para application-level mostrado anteriormente, usando agora um middleware router-level:

~~~js
var app = express();
var router = express.Router();

// um middleware sem definição de rota (path), será executado para qualquer requisição ao router.
router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// uma sub-pilha de middleware mostrando informações para qualquer tipo de requisição HTTP feita a /user/:id
router.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// uma sub-pilha middleware com manipuladores (handlers) para requisições GET para /user/:id
router.get('/user/:id', function (req, res, next) {
  // se user id é 0, pula para o próximo router
  if (req.params.id == 0) next('route');
  // se não, passa o controle para o próximo middleware nesta pilha.
  else next(); //
}, function (req, res, next) {
  // render a regular page
  res.render('regular');
});

// manipulador (handler) para /user/:id que renderiza uma página especial.
router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id);
  res.render('special');
});

// montagem da rota no app
app.use('/', router);
~~~

<h2 id='middleware.error-handling'>Error-handling middleware</h2>

<div class="doc-box doc-notice" markdown="1">
Middlewares error-handling sempre têm quatro argumentos. Você precisa fornecer quatro argumentos para que um middleware seja identificado como error-handling. Mesmo que o objeto next não seja utilizado, você precisa especificá-lo na assinatura da função; caso contrário o middleware não será interpretado como um error-handling e não poderá ser utilizado para tratar erros.
</div>

Definimos um middleware error-handling como qualquer outro middleware, exceto pela presença de quatro argumentos em vez de apenas três, especificamente com a assinatura `(err, req, res, next)`:

~~~js
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
~~~

Para mais detalhes sobre middlewares error-handling, veja [Error handling](/guide/error-handling.html).

<h2 id='middleware.built-in'>Built-in middleware</h2>

A partir da versão 4.x, o Express não depende mais do middleware [Connect](https://github.com/senchalabs/connect). Com exceção de `express.static`, todos os middlewares anteriormente incluídos no Express estão agora em módulos separados. Consulte a [lista de middlewares](https://github.com/senchalabs/connect#middleware).


<h4 id='express.static'>express.static(root, [options])</h4>

O único middleware built-in no Express é o `express.static`. Este middleware é baseado no [serve-static](https://github.com/expressjs/serve-static), e é responsável por servir ativos estáticos (static assets) de uma aplicação Express.
O argumento root especifica o diretório raíz onde estão os ativos estáticos.
O argumento options é opcional, e pode ter as seguintes propriedades.


| Propriedade      | Descrição                                                           |   Tipo      | Valor padrão         |
|---------------|-----------------------------------------------------------------------|-------------|-----------------|
| `dotfiles`    | Opção para servir arquivos com notação dotfile (“.nome”). Os valores possíveis são “allow”, “deny”, e “ignore” | String | "ignore" |
| `etag`        | Habilita ou não a geração de etag.  | Boolean | `true` |
| `extensions`  | Conjunto de extensões de arquivos “fallback”. | Array | `[]` |
| `index`       | Envio do arquivo index do diretório. Defina como false para desabilitar a indexação do diretório. | Mixed | "index.html" |
 `lastModified` | Defini o header Last-Modified para a data da última modificação do arquivo no sistema operacional. Os valores possíveis são true ou false. | Boolean | `true` |
| `maxAge`      | Define a propriedade max-age do header Cache-Control em milisegundos ou uma string em [formato ms](https://www.npmjs.org/package/ms). | Number | 0 |
| `redirect`    | Redireciona para "/" quando pathname é um diretório. | Boolean | `true` |
| `setHeaders`  | Função para definir os cabeçalhos HTTP (headers) para enviar com o arquivo. | Function |  |

Aqui está um exemplo de utilização do middleware `express.static` com um complexo objeto options.

~~~js
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
}

app.use(express.static('public', options));
~~~

Você pode ter mais de um diretório estático por app.

~~~js
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.static('files'));
~~~

Para mais informações sobre o middleware serve-static e suas opções, consulte a [documentação do serve-static](https://github.com/expressjs/serve-static).

<h2 id='middleware.third-party'>Third-party middleware</h2>

Utiliza-se middleware third-party para adicionar funcionalidades aos apps Express.

Instala-se o módulo Node para a funcionalidade requerida e carrega-se dentro do app em um middleware application-level ou router-level.

O exemplo a seguir ilustra a instalação e carregamento do middleware `cookie-parser`.

~~~sh
$ npm install cookie-parser
~~~

~~~js
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

// load the cookie parsing middleware
app.use(cookieParser());
~~~

Consulte [middlewares third-party](../resources/middleware.html) para uma lista parcial dos que são mais utilizados com Express.
