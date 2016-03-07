---
layout: page
title: Entregando arquivos estáticos no Express
menu: starter
lang: pt-br
---

# Entregando arquivos estáticos no Express

Para entregar arquivos estáticos como imagens, arquivos CSS, e
arquivos JavaScript, use a função de middleware `express.static`
integrada no Express.

Passe o nome do diretório que contém os ativos estáticos para a
função de middleware `express.static` para iniciar a
entregar os arquivos diretamente. Por exemplo, use o código a seguir
para entregar imagens, arquivos CSS, e arquivos JavaScript em um
diretório chamado `public`:

<pre>
<code class="language-javascript" translate="no">
app.use(express.static('public'));
</code>
</pre>

Agora, é possível carregar os arquivos que estão no diretório `public`:

<pre>
<code class="language-javascript" translate="no">
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
</code>
</pre>

<div class="doc-box doc-info">
O Express consulta os arquivos em relação ao diretório estático, para
que o nome do diretório estático não faça parte da URL.
</div>

Para usar vários diretórios de ativos estáticos, chame a função
de middleware `express.static` várias vezes:

<pre>
<code class="language-javascript" translate="no">
app.use(express.static('public'));
app.use(express.static('files'));
</code>
</pre>

O Express consulta os arquivos na ordem em que você configurar
os diretórios estáticos com a função de middleware
`express.static`.

Para criar um prefixo de caminho virtual (onde o caminho não
existe realmente no sistema de arquivos) para arquivos que são
entregues pela função `express.static`,
[especifique um caminho de montagem](/{{ page.lang }}/4x/api.html#app.use) para o
diretório estático, como mostrado abaixo:

<pre>
<code class="language-javascript" translate="no">
app.use('/static', express.static('public'));
</code>
</pre>

Agora, é possível carregar os arquivos que estão no diretório
`public` a partir do prefixo do caminho `/static`.

<pre>
<code class="language-javascript" translate="no">
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
</code>
</pre>

Entretanto, o caminho fornecido para a função
`express.static` é relativa ao diretório a partir do
qual você inicia o seu `node` de processo. Se você
executar o aplicativo express a partir de outro diretório, é mais
seguro utilizar o caminho absoluto do diretório para o qual deseja
entregar.

<pre>
<code class="language-javascript" translate="no">
app.use('/static', express.static(__dirname + '/public'));
</code>
</pre>
