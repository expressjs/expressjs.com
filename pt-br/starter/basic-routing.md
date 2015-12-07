---
layout: page
title: Tutorial básico de roteamento do Express
menu: starter
lang: pt-br
---

# Tutorial básico de roteamento

_Roteamento_ determina como uma aplicação responde a uma requisição de um cliente a um <i>endpoint</i> específico, que é uma <i>URI</i> (ou caminho) e um método <i>HTTP</i> específico (<i>GET</i>, <i>POST</i>, etc...)

Cada rota pode ter uma ou mais funções <i>handler</i>, que é(serão) executada(s) quando a rota coincidir.

A definição de uma rota segue a seguinte estrutura:
<pre><code class="language-javascript" translate="no">
app.METHOD(PATH, HANDLER)
</code></pre>

Onde:

- `app` é uma instância do `express`.
- `METHOD` é um [método de requisição <i>HTTP</i>](https://pt.wikipedia.org/wiki/Hypertext_Transfer_Protocol).
- `PATH` é o caminho no servidor.
- `HANDLER` é a função que será executada quando a rota coincidir.

<div class="doc-box doc-notice" markdown="1">
Este tutorial assume que uma instância do `express` nomeada `app` é criada e o servidor está sendo executado. Se você não está familiarizado com a criação de uma aplicação e como executá-la, consulte o [exemplo de Hello world](/{{ page.lang }}/starter/hello-world.html).
</div>

O seguinte código demonstra alguns exemplos de rotas em uma aplicação.

Responde com "Hello World!" na página principal:

<pre><code class="language-javascript" translate="no">
app.get('/', function (req, res) {
  res.send('Hello World!');
});
</code></pre>

Aceita uma requisição POST na página principal:

<pre><code class="language-javascript" translate="no">
app.post('/', function (req, res) {
  res.send('Got a POST request');
});
</code></pre>

Aceita uma requisição PUT no caminho `/user`:

<pre><code class="language-javascript" translate="no">
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});
</code></pre>

Aceita uma requisição DELETE no caminho `/user`:

<pre><code class="language-javascript" translate="no">
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});
</code></pre>

Para maiores detalhes sobre roteamento, consulte o [guia de roteamento](/guide/routing.html).
