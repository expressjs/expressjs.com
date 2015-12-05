---
layout: page
title: Escrevendo um middleware
menu: guide
lang: pt-br
---

# Escrevendo um <i>middleware</i>

<h2>Visão Geral</h2>

Funções do _middleware_ são funções que têm acesso para [requisitar objeto](/4x/api.html#req) (`req`), [responder objeto](/4x/api.html#res) (`res`) e a próxima função de <i>middleware</i> no ciclo de solicitação-resposta do aplicativo. A próxima função de <i>middleware</i> é comumente denotada por uma variável chamada `next`.

Funções de <i>middleware</i> podem executar as seguintes tarefas:

* Executar qualquer código.
* Fazer mudanças no objeto de requisição e de resposta.
* Fechar o ciclo requisição-resposta.
* Chamar o próximo <i>middleware</i> na pilha.

Se a função atual do middleware não termina o ciclo de requisição-resposta, ele deve chamar `next()` para passar o controle para a seguinte função de middleware. Caso contrário, a solicitação será deixada suspensa.

A figura a seguir mostra os elementos de uma chamada de função de <i>middleware</i>:

<table style="padding: 0; border: 0; width: 960px; margin-bottom: 10px;">
<tr><td style="margin: 0; padding: 0px; border: 0; width: 410px;">
<img src="/images/express-mw.png" style="margin: 0px; padding: 0px; width: 410px; height: 308px;" />
</td>
<td style="margin: 0; padding: 0 0 0 5px; border: 0; width: 550px;">
<div class="callout" id="callout1">Método HTTP para o qual se aplica a função de <i>middleware</i>.</div>

<div class="callout" id="callout2">Caminho (rota) para o qual se aplica a função de <i>middleware</i>.</div>

<div class="callout" id="callout3">A função de <i>middleware</i>.</div>

<div class="callout" id="callout4">Argumento de retorno de chamada para a função de middleware, chamado "next" por convenção.</div>

<div class="callout" id="callout5">HTTP <a href="/en/4x/api.html#res">solicita</a> o argumento para a função de middleware, chamado "res" por convenção.</div>

<div class="callout" id="callout6">HTTP <a href="/en/4x/api.html#req">requisita</a> o argumento para a função de middleware, chamado "req" por convenção.</div>
</td></tr>
</table>

Aqui está um exemplo de um aplicativo "Hello World" simples, usando Express, para o qual você irá definir duas funções de middleware:

<pre><code class="language-javascript" translate="no">
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000);
</code></pre>

<h2>Desenvolvimento</h2>

Aqui está um exemplo simples de uma função de middleware chamada "myLogger". Esta função só imprime "LOGGED" quando uma solicitação para o aplicativo passa através dele. A função de middleware é atribuída a uma variável chamada `myLogger`.

<pre><code class="language-javascript" translate="no">
var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};
</code></pre>

<div class="doc-box doc-notice" markdown="1">
Observe a chamada acima para `next()`. Chamando essa função invoca a próxima função de middleware no app.
A função `next()` não é uma parte do Node.js ou da API Express, mas é o terceiro argumento que é passado para a função de middleware. A função `next()` pode ser chamada qualquer coisa, mas por convenção sempre chama-se "next". Para evitar confusão, recorra à presente convenção.
</div>

Para carregar a função de middleware, chamada `app.use()`, especificando a função de middleware.
Por exemplo, o código a seguir carrega a função de middleware `myLogger` antes da rota para o caminho de raiz (/).

<pre><code class="language-javascript" translate="no">
var express = require('express');
var app = express();

var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

app.use(myLogger);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000);
</code></pre>

Cada vez que o aplicativo recebe uma solicitação, ele imprime a mensagem "LOGGED", para o terminal.

A ordem de carregamento do middleware é importante: funções de middleware que são carregadas primeiro também são executadas primeiro.

Se `myLogger` fosse carregado após a rota para o caminho de raiz, nunca atingiria a solicitação e o app não imprimiria "LOGGED", porque o manipulador de rotas do caminho raiz termina o ciclo de requisição-resposta.

A função de middleware `myLogger` simplesmente imprime uma mensagem, em seguida, passa a solicitação para a próxima função de middleware na pilha chamando a função 'next()'.

O exemplo seguinte adiciona uma propriedade chamada `requestTime` para o objeto do pedido. Nós vamos nomear esta função de middleware "requestTime".

<pre><code class="language-javascript" translate="no">
var requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};
</code></pre>

O app agora usa a função de middleware `requestTime`. Além disso, a função de retorno de chamada da rota do caminho raiz usa a propriedade que adiciona a função de middleware `req` (o objeto requisitado).

<pre><code class="language-javascript" translate="no">
var express = require('express');
var app = express();

var requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

app.use(requestTime);

app.get('/', function (req, res) {
  var responseText = 'Hello World!<br>';
  responseText += '<small>Requested at: ' + req.requestTime + '</small>';
  res.send(responseText);
});

app.listen(3000);
</code></pre>

Quando você faz um pedido para a raiz do aplicativo, o aplicativo agora exibe a hora do seu pedido no navegador.

Porque você tem acesso para o objeto do pedido, o objeto de resposta, a seguinte função de middleware na pilha e toda a API do Node.js, com funções de middleware suas possibilidades são infinitas.

Para obter mais informações sobre middleware com Express, consulte: [Usando middleware](/{{ page.lang }}/guide/using-middleware.html).
