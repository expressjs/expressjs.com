---
layout: page
title: Roteamento no Express
menu: guide
lang: pt_BR
---

# Roteamento

Roteamento é uma forma de determinar como uma aplicação responde a uma requisição do cliente para chegar a um ponto determinado, dependendo de qual foi a URI (path) e o método HTTP (GET, POST, etc...)  utilizado nessa requisição.
Exemplo básico de roteamento no Express:
~~~js

var express = require('express');
var app = express();

// responde com "hello world" quando uma requisição com método GET é feita à home page
app.get('/', function(req, res) {
  res.send('hello world');
});

~~~

<h2 id="route-methods">Métodos da rota</h2>

A rota é uma combinação de uma URI, um [método de requisição HTTP](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol), e manipuladores (handlers).
Cada rota pode ter um ou mais manipuladores (handler functions) que são executados quando a rota coincide.

Os métodos da rota são derivados dos métodos HTTP e vinculados a uma instância do Express.

A definição de rota segue a estrutura app.METHOD(PATH, HANDLER), onde app é uma instância express, METHOD é um dos métodos de requisição do HTTP, PATH é um caminho (rota) no servidor, e HANDLER é a função executada para a rota correspondente.

O código a seguir mostra alguns exemplos de rotas em um app.
~~~js
// responde com with "Hello World!" na homepage
app.get('/', function (req, res) {
  res.send('Hello World!');
});

// recebe uma requisição POST da homepage
app.post('/', function (req, res) {
  res.send('Got a POST request');
});

// recebe uma requisição PUT em /user
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});

// recebe uma requisição DELETE em /user
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});
~~~



O Express soporta os seguintes métodos de roteamento correspondentes aos métodos de requisição HTTP: get, post, put, head, delete, options, trace, copy, lock, mkcol, move, purge, propfind, proppatch, unlock, report, mkactivity, checkout, merge, m-search, notify, subscribe, unsubscribe, patch search e connect.

<div class="doc-box doc-info" markdown="1">
Para nomes de métodos de roteamento que formam variáveis JavaScript com nomes inválidos, use a notação de colchetes. Por exemplo, app['m-search']('/', function ...
</div>

Existe um metódo de roteamento especial, app.all(), que não é derivado de nenhum método HTTP. Ele é utilizado para o carregamento de middlewares para requisições em uma determinada rota (path) para qualquer método.

No exemplo a seguir, o handler será executado numa requisição para “/secret” a partir de qualquer método utilizado: GET, POST, PUT, DELETE, ou qualquer outro método de requisição suportado pelo módulo HTTP do Express.

~~~js
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // passa o controle para o próximo handler
});
~~~

<h2 id="route-paths">Caminho (path) da rota</h2>

Em combinação com um método de requisição, a rota define onde será o ponto final da requisição. A rota pode ser uma string, um padrão de string ou uma expressão regular.

<div class="doc-box doc-info" markdown="1">
  O Express utiliza [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) para casar caminhos de rota;consulte a documentação para conhecer todas as possibilidades de definição de rotas. [Express Route Tester](http://forbeslindesay.github.io/express-route-tester/) é uma ferramenta para testes básicos de rotas no Express, porém não suporta casamento de padrões.
</div>

<div class="doc-box doc-warn" markdown="1">
Observação: query strings não são parte do caminho de uma rota.
</div>

Exemplos de rotas baseadas em string:
~~~js
// casa requisições para root
app.get('/', function (req, res) {
  res.send('root');
});

// casa requisições para /about
app.get('/about', function (req, res) {
  res.send('about');
});

// casa requisições para /random.text
app.get('/random.text', function (req, res) {
  res.send('random.text');
});
~~~
Exemplo de rotas baseadas em padrões de string:
~~~js
// casa requisições acd e abcd
app.get('/ab?cd', function(req, res) {
  res.send('ab?cd');
});

// casa requisições abcd, abbcd, abbbcd, e etc...
app.get('/ab+cd', function(req, res) {
  res.send('ab+cd');
});

// casa requisições abcd, abxcd, abRABDOMcd, ab123cd, e etc...
app.get('/ab*cd', function(req, res) {
  res.send('ab*cd');
});

// will match /abe and /abcde
app.get('/ab(cd)?e', function(req, res) {
 res.send('ab(cd)?e');
});
~~~

<div class="doc-box doc-info" markdown="1">
Os caracteres ?, +, *, e () são subconjuntos de suas expresões regulares. O hífem (-) e o ponto (.) são interpretados literalmente em rotas baseadas em strings.
</div>

Exemplos de rotas baseadas em expressões regulares:

~~~js
// casa qualquer requisição com uma letra a no nome da rota:
app.get(/a/, function(req, res) {
  res.send('/a/');
});

// casa com butterfly, dragonfly; mas não casa com butterflyman, dragonfly man, e etc...
app.get(/.*fly$/, function(req, res) {
  res.send('/.*fly$/');
});
~~~

<h2 id="route-handlers">Manipuladores (handlers)</h2>

Vocé pode fornecer várias funções de retorno de chamada (callback) que se comportam exatamente como middlewares para lidar com uma requisição.
A diferença é que esses callbacks podem invocar ume próxima rota, next(‘route’), ignorando o restante do callback.
Você pode usar isso para definir condições em uma rota e então passar o controle para uma rota seguinte se não for mais necessário continuar executando a rota atual.
Handlers podem vir em forma de função, array de funções ou várias combinações de ambos, como mostram os exemplos a seguir.

Uma rota pode ser manipulada usando uma simples função callback:
~~~js
app.get('/example/a', function (req, res) {
  res.send('Hello from A!');
});
~~~

Uma rota pode ser manipulada usando uma ou mais funções callback (o objeto next precisa ser especificado):

~~~js
app.get('/example/b', function (req, res, next) {
  console.log('response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from B!');
});
~~~

Uma rota pode ser manipulada utilizando-se um array de funções callback:


~~~js
var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

var cb2 = function (req, res) {
  res.send('Hello from C!');
}

app.get('/example/c', [cb0, cb1, cb2]);
~~~

Uma rota pode ser manipulada utilizando-se uma combinação de array  de funções e funções independentes:

~~~js
var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from D!');
});
~~~

<h2 id="response-methods">Métodos de resposta (response methods)</h2>

Os métodos em um objeto de resposta (res) na tabela seguinte podem enviar respostar ao cliente e encerrar o ciclo de requisição e resposta. Se nenhum deles é chamado por um manipulador (handler), então a requisição do cliente será deixada em espera.

| Método               | Descrição                          
|----------------------|--------------------------------------
| [res.download()](/4x/api.html#res.download)   | Solicita o download de um arquivo.
| [res.end()](/4x/api.html#res.end)        | Finaliza a resposta.
| [res.json()](/4x/api.html#res.json)       | Envia um JSON como resposta.
| [res.jsonp()](/4x/api.html#res.jsonp)      | Envia uma JSON com suporte JSONP como resposta.
| [res.redirect()](/4x/api.html#res.redirect)   | Redireciona uma requisição.
| [res.render()](/4x/api.html#res.render)     | Renderiza um template view.
| [res.send()](/4x/api.html#res.send)       | Envia uma resposta de vários tipos.
| [res.sendFile](/4x/api.html#res.sendFile)     | Envia um arquivo como octet stream.
| [res.sendStatus()](/4x/api.html#res.sendStatus) | Define o código de status da resposta e envia uma string representando este status como corpo da resposta (response body).

<h2 id="app-route">app.route()</h2>

Encadeamento de manipuladores (handlers) para uma rota podem ser criados utilizando-se app.route().
Como nesse caso a rota (path) é especificada em um único local, isso ajuda a criar rotas modulares, reduzindo a redundância e erros de digitação. Para mais informações consulte a documentação [Router()](/4x/api.html#router).

Aqui está um exemplo de handlers encadeados definidos com a utilização de app.route():

~~~js
app.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });
~~~

<h2 id="express-router">express.Router</h2>

A classe express.Router pode ser usada para criar manipuladores de rota modulares. 
Uma instância Router é um sistema completo de middleware e roteamento; Por isso, é muitas vezes chamado de um "mini-app". 

O exemplo a seguir cria um router como um módulo, carrega um middleware nele, define algumas rotas, e o monta em uma única rota no app principal.
Crie um arquivo chamado routerbirds.js no diretório app, com o seguinte conteúdo:


~~~js
var express = require('express');
var router = express.Router();

// middleware específico para este router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define a rota para a home page
router.get('/', function(req, res) {
  res.send('Birds home page');
});
// define a rota para about
router.get('/about', function(req, res) {
  res.send('About birds');
});
module.exports = router;
~~~

Então carregue o módulo router num app:

~~~js
var birds = require('./birds');
...
app.use('/birds', birds);
~~~

O app agora será capaz de lidar com as requisições para '/birds' e '/birds/about' e chamando o middleware timeLog específico para a rota.
