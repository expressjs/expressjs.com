---
layout: page
title: Servindo arquivos estáticos no Express
menu: starter
lang: pt-br
---

# Servindo arquivos estáticos no Express

Para servir arquivos estáticos, como imagens, CSS, e JavaScript, é realizado com a ajuda de um <i>middleware</i> embutido no Express - `express.static`.

Passe o nome do diretório, que será marcado como a localização dos arquivos estáticos, para que o <i>middleware</i> `express.static` comece a servir os arquivos diretamente. Por exemplo, se você deixa suas imagens, CSS e JavaScript em um diretório com o nome `public`, você pode fazer o seguinte:

<pre><code class="language-javascript" translate="no">
app.use(express.static('public'));
</code></pre>

Agora, você é capaz de carregar os arquivos que estão sob o diretório `public`:

<pre class="plain-text"><code class="plain-text" translate="no">
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
</code></pre>

<div class="doc-box doc-info">
Os arquivos são procurados em relação ao diretório estático, portanto, o nome do diretório estático não faz parte da URL.
</div>

Se você deseja múltiplos diretórios como diretórios de arquivos estáticos, você pode chamar o <i>middleware</i> `express.static` múltiplas vezes:

<pre><code class="language-javascript" translate="no">
app.use(express.static('public'));
app.use(express.static('files'));
</code></pre>

Os arquivos serão procurados na ordem em que os diretórios estáticos foram configurados usando o <i>middleware</i> `express.static`.

Se você deseja criar um prefixo "virtual" (desde que o caminho não exista no <i>file system</i>) de caminho para os arquivos servidos pelo `express.static`, você pode [especificar um caminho de montagem](/4x/api.html#app.use) para o diretório estático, conforme apresentado abaixo:

<pre><code class="language-javascript" translate="no">
app.use('/static', express.static('public'));
</code></pre>

Agora, se você é capaz de carregar os arquivos que estão sob o diretório `public`, pelo prefixo de caminho "/static".

<pre class="plain-text"><code class="plain-text" translate="no">
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
</code></pre>

No entanto, o caminho que você fornecer para a função `express.static` é relativo ao diretório de onde você iniciar seu processo do Node. Se você executar o aplicativo de outro diretório, é mais seguro usar o caminho absoluto do diretório que você deseja servir:

<pre><code class="language-javascript" translate="no">
app.use('/static', express.static(__dirname + '/public'));
</code></pre>
