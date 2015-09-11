---
layout: page
title: Tutorial básico de roteamento do Express
menu: starter
lang: pt-br
---

# Tutorial básico de roteamento

Este tutorial é uma introdução básica ao roteamento com Express. Roteamento determina como uma aplicação responde a uma requisição de um cliente a um <i>endpoint</i> específico, que é uma <i>URI</i> (ou caminho) e um método HTTP específico (GET, POST, etc...)

Cada rota pode ter uma ou mais funções <i>handler</i>, que é(serão) executada(s) quando a rota coincidir.

A definição de uma rota segue a seguinte estrutura `app.METHOD(PATH, HANDLER)`, onde `app` é uma instância do `express`, `METHOD` é um [método de requisição HTTP](https://pt.wikipedia.org/wiki/Hypertext_Transfer_Protocol), `PATH` é o caminho no servidor, e `HANDLER` é a função que será executada quando a rota coincidir.


<div class="doc-box doc-notice" markdown="1">
Este tutorial assume que uma instância do `express` nomeada `app` é criada e o servidor está sendo executado. Se você não está familiarizado com a criação de uma aplicação e como executá-la, consulte o [exemplo de Hello world](/starter/hello-world.html).
</div>

O seguinte código demonstra alguns exemplos de rotas em uma aplicação.

~~~js
// responde com "Hello World!" na página principal
app.get('/', function (req, res) {
  res.send('Hello World!');
});

// aceita uma requisição POST na página principal
app.post('/', function (req, res) {
  res.send('Got a POST request');
});

// aceita uma requisição PUT no caminho /user
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});

// aceita uma requisição DELETE no caminho /user
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});
~~~

Para maiores detalhes sobre roteamento, consulte o [guia de roteamento](/guide/routing.html). 
