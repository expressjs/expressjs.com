---
layout: page
title: Desenvolvendo template engines para Express
menu: advanced
lang: pt-br
---

# Desenvolvendo template engines para Express

Utilize o método `app.engine(ext, callback)` sua própria template entgine. `ext` se refere à extensão dos arquivos de template, `callback` é a função do template engine que recebe como parâmetros a localização do arquivo, o objeto `options`, e a fução callback.

A seguir temos um exemplo bem simples de uma template engine que renderiza arquivos com extensão ".ntl".

<pre><code class="language-javascript" translate="no">
var fs = require('fs'); // esta engine requer o módulo fs.
app.engine('ntl', function (filePath, options, callback) { // define a template engine
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(new Error(err));
    // esta é uma template engine extremamente simples
    var rendered = content.toString().replace('#title#', '<title>'+ options.title +'</title>')
    .replace('#message#', '<h1>'+ options.message +'</h1>');
    return callback(null, rendered);
  })
});
app.set('views', './views'); // especifica o dirétórios onde estão as views
app.set('view engine', 'ntl'); // registra a template engine
</code></pre>

Você poderá renderizar arquivos ".ntl". Crie uma arquivo chamado "index.ntl" no diretório views com o seguinte conteúdo.

<pre><code class="language-javascript" translate="no">
#title#
#message#
</code></pre>
Agora, crie a seguinte rota no seu app.

<pre><code class="language-javascript" translate="no">
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
})
</code></pre>

Fazendo-se uma requisição para a home page, "index.ntl" será renderizado como HTML.
