---
layout: page
title: Exemplo de "Hello World" Express
menu: starter
lang: pt-br
---

# Exemplo de Hello world

Tenha certeza que você seguiu as instruções de [Instalação](/starter/installing.html). 

Agora, vocês vão criar uma aplicação Express bem básica.  

<div class="doc-box doc-info" markdown="1">  
NOTA: Isto é essencialmente a aplicação mais simples de Express que você pode criar. É um arquivo único&mdash;_não_ é o que você obteria utilizando o [gerador Express](/starter/generator.html), o qual cria a estrutura para uma aplicação completa com vários arquivos JavaScript, templates Jade, e sub-diretórios para vários propósitos.  
</div>

No diretório `myapp`, crie um arquivo com o nome `app.js` e adicione o seguinte código:

~~~js
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
~~~

A aplicação irá executar o servidor e escutar na porta 3000 por conexões. Ela irá responder com "Hello World!" para requisições na raiz da URL (`/`) ou _rota_. Para cada outro caminho, irá reponder com **404 Not Found**.

<div class="doc-box doc-notice" markdown="1">
O `req` (requisição) e `res` (resposta) são exatamente os mesmos objetos que o Node disponibiliza, portanto você pode executar `req.pipe()`, `req.on('data', callback)`, e qualquer outra coisa que você consiga fazer sem ter o Express envolvido.
</div>

Execute a aplicação com o seguinte comando.

~~~ sh
$ node app.js
~~~

Então, carregue [http://localhost:3000/](http://localhost:3000/) em um <i>browser</i> e irá ver a saída.
