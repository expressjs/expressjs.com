---
layout: page
title: Desenvolvendo mecanismos de modelo para o Express
menu: advanced
lang: pt-br
---

# Desenvolvendo mecanismos de modelo para o Express

Use o método `app.engine(ext, callback)`
para criar seu próprio mecanismo de modelo. `ext`
refere-se à extensão do arquivo, e  `callback` é a
função de mecanismo de modelo, que aceita os seguintes itens como
parâmetros: a localização do arquivo, o objeto de opções, e a função
de retorno de chamada.

O código a seguir é um exemplo de implementação de um mecanismo
de modelo muito simples para renderização de arquivos `.ntl`.

<pre>
<code class="language-javascript" translate="no">
var fs = require('fs'); // this engine requires the fs module
app.engine('ntl', function (filePath, options, callback) { // define the template engine
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(new Error(err));
    // this is an extremely simple template engine
    var rendered = content.toString().replace('#title#', '<title>'+ options.title +'</title>')
    .replace('#message#', '<h1>'+ options.message +'</h1>');
    return callback(null, rendered);
  });
});
app.set('views', './views'); // specify the views directory
app.set('view engine', 'ntl'); // register the template engine
</code>
</pre>

Seu aplicativo estará agora habilitado a renderizar arquivos `.ntl`. Crie
um arquivo chamado `index.ntl` no diretório
`views` com o seguinte conteúdo.

<pre>
<code class="language-javascript" translate="no">
#title#
#message#
</code>
</pre>
Em seguida, crie a seguinte rota no seu aplicativo.

<pre>
<code class="language-javascript" translate="no">
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});
</code>
</pre>
Ao fazer uma solicitação à página inicial, o `index.ntl` será renderizado como HTML.
