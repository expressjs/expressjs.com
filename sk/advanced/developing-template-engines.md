---
layout: page
title: Vývoj template enginov pre Express
menu: advanced
lang: sk
---
<!---
 Copyright (c) 2016 StrongLoop, IBM, and Express Contributors
 License: MIT
-->

# Vývoj template enginov pre Express

Pre vytvorenie vlastného template enginu použite metódu `app.engine(ext, callback)`. Parameter `ext` špecifikuje príponu súborov a `callback` je samotná funkcia template enginu, ktorá príjma nasledujúce prvky ako parametre: cesta k súboru, options objekt a callback funkciu.

Nasledujúci kód je príkladom implementácie veľmi jednoduchého template enginu pre rendrovanie `.ntl` súborov.

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

Odteraz bude vaša aplikácia schopná rendrovať `.ntl` súbory. Vytvorte súbor s názvom `index.ntl` a `views` priečinok s nasledujúcim obsahom.

<pre>
<code class="language-javascript" translate="no">
#title#
#message#
</code>
</pre>
Potom vo vašej aplikácii vytvorte takýto route:

<pre>
<code class="language-javascript" translate="no">
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});
</code>
</pre>
Keď vykonáte request na home page, `index.ntl` bude vyrendrované ako HTML.
