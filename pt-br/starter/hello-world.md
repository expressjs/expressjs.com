---
layout: page
title: Exemplo de "Hello World" Express
menu: starter
lang: pt-br
---

# Exemplo de Hello world

<div class="doc-box doc-info" markdown="1">
Isto é essencialmente a aplicação mais simples de Express que você pode criar. É um arquivo único &mdash; _não_ é o que você obteria utilizando o [gerador Express](/{{ page.lang }}/starter/generator.html), o qual cria a estrutura para uma aplicação completa com vários arquivos JavaScript, templates Jade, e sub-diretórios para vários propósitos.
</div>

Primeiro, crie um diretório com o nome `myapp`, mude-o e execute  `npm init`. Em seguida, instale `express` como uma dependência, conforme o [Guia de Instalação](/{{ page.lang }}/starter/installing.html).

No diretório `myapp`, crie um arquivo com o nome `app.js` e adicione o seguinte código:

<pre><code class="language-javascript" translate="no">
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
</code></pre>

A aplicação irá executar o servidor e escutar na porta 3000 para conexões. Ela irá responder com "Hello World!" para requisições na raiz da URL (`/`) ou _rota_. Para cada outro caminho, irá reponder com **404 Not Found**.

<div class="doc-box doc-notice" markdown="1">
O `req` (requisição) e `res` (resposta) são exatamente os mesmos objetos que o Node disponibiliza, portanto você pode executar `req.pipe()`, `req.on('data', callback)`, e qualquer outra coisa que você consiga fazer sem ter o Express envolvido.
</div>

Execute a aplicação com o seguinte comando.

<pre><code class="language-sh" translate="no">
$ node app.js
</code></pre>

Então, carregue [http://localhost:3000/](http://localhost:3000/) em um <i>browser</i> e irá ver a saída.
