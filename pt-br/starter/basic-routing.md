---
layout: page
title: Roteamento básico no Express
menu: starter
lang: pt-br
---

# Roteamento Básico

O *Roteamento* refere-se à determinação de como um
aplicativo responde a uma solicitação do cliente por um endpoint
específico, que é uma URI (ou caminho) e um método de solicitação HTTP
específico (GET, POST, e assim por diante).

Cada rota pode ter uma ou mais funções de manipulação, que são
executadas quando a rota é correspondida.

A definição de rotas aceita a seguinte estrutura:
<pre>
<code class="language-javascript" translate="no">
app.METHOD(PATH, HANDLER)
</code>
</pre>

Onde:

- `app` é uma instância do `express`.
- `METHOD` é um [método de solicitação HTTP](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol).
- `PATH` é um caminho no servidor.
- `HANDLER` é a função executada quando a rota é correspondida.

<div class="doc-box doc-notice" markdown="1">
Este tutorial assume que uma instância de `express`
chamada `app` está criada e o servidor está em
execução. Caso não tenha familiaridade com a criação e inicialização
de um aplicativo, consulte o [exemplo Hello world](/{{ page.lang }}/starter/hello-world.html).
</div>

Os seguintes exemplos ilustram a definição de rotas simples.

Responder com `Hello World!` na página inicial:

<pre>
<code class="language-javascript" translate="no">
app.get('/', function (req, res) {
  res.send('Hello World!');
});
</code>
</pre>

Responder a uma solicitação POST na rota raiz (`/`) com a página inicial do aplicativo:

<pre>
<code class="language-javascript" translate="no">
app.post('/', function (req, res) {
  res.send('Got a POST request');
});
</code>
</pre>

Responder a uma solicitação PUT para a rota `/user`:

<pre>
<code class="language-javascript" translate="no">
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});
</code>
</pre>

Responder a uma solicitação DELETE para a rota `/user`:

<pre>
<code class="language-javascript" translate="no">
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});
</code>
</pre>

Para obter mais detalhes  sobre roteamento, consulte o [guia de roteamento](/{{ page.lang }}/guide/routing.html).
