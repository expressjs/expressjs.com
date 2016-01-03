---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Express "Hello World" príklad
menu: starter
lang: sk
redirect_from: "/starter/hello-world.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

# Hello world príklad

<div class="doc-box doc-info" markdown="1">
Toto bude v podstate najjednoduchšia Express aplikácia akú možete vytvoriť. Aplikácia s jedným súborom &mdash; _nie_ taká, ako keby ste použili [Express generátor](/{{ page.lang }}/starter/generator.html), ktorý vytvorí základnú štruktúru pre plnohodnotnú aplikáciu s niekoľkými JavaScript súbormi, Jade templatami a podadresármi pre rôzne účely.
</div>

Najskôr si vytvorte priečinok s názvom `myapp`, presuňte sa tam a spustite `npm init`. Potom nainštalujte `express` ako dependenciu podľa [inštalačnej príručky](/{{ page.lang }}/starter/installing.html).

V priečinku `myapp` vytvorte súbor s názvom `app.js` a vložte do neho nasledovný kód:

<pre>
<code class="language-javascript" translate="no">
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
</code>
</pre>

Aplikácia naštartuje server a začne počúvať na porte 3000 na pripojenia. Aplikácia odpovie "Hello World!" na request na hlavnú URL (`/`) alebo _route_. Pre každú inú URL odpovie prostredníctvom **404 Not Found**.

<div class="doc-box doc-notice" markdown="1">
Request (požiadavka) `req` a response (odpoveď) `res` sú presne rovnaké objekty, ktoré Node štandardne poskytuje, takže môžete spraviť `req.pipe()`, `req.on('data', callback)` a hocičo iné, čo by ste spravili v prípade, ak by ste nepoužili Express.
</div>

Aplikáciu spustíte pomocou nasledujúceho príkazu:

<pre>
<code class="language-sh" translate="no">
$ node app.js
</code>
</pre>

Potom v prehliadači zadajte [http://localhost:3000/](http://localhost:3000/) a sledujte výstup.

