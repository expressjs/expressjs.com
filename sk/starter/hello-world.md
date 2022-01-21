---
layout: page
title: Express "Hello World" príklad
menu: starter
lang: sk
---
<!---
 Copyright (c) 2016 StrongLoop, IBM, and Express Contributors
 License: MIT
-->

# Hello world príklad

<div class="doc-box doc-info" markdown="1">
Toto bude v podstate najjednoduchšia Express aplikácia akú možete vytvoriť. Aplikácia s jedným súborom &mdash; _nie_ taká, ako keby ste použili [Express generátor](/{{ page.lang }}/starter/generator.html), ktorý vytvorí základnú štruktúru pre plnohodnotnú aplikáciu s niekoľkými JavaScript súbormi, Jade templatami a pod-adresármi pre rôzne účely.
</div>

Najskôr si vytvorte priečinok s názvom `myapp`, presuňte sa tam a spustite príkaz `npm init`. Potom nainštalujte `express` ako dependenciu podľa [inštalačnej príručky](/{{ page.lang }}/starter/installing.html).

V priečinku `myapp` vytvorte súbor s názvom `app.js` a vložte do neho nasledovný kód:

<pre>
<code class="language-javascript" translate="no">
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
</code>
</pre>

Aplikácia naštartuje server a na porte 3000 začne počúvať na pripojenia. Aplikácia odpovie "Hello World!" na request na hlavnú URL (`/`) alebo _route_. Pre každú inú URL odpovie prostredníctvom **404 Not Found**.

<div class="doc-box doc-notice" markdown="1">
Request (požiadavka) `req` a response (odpoveď) `res` sú presne rovnaké objekty, ktoré Node štandardne poskytuje, takže môžete spraviť `req.pipe()`, `req.on('data', callback)` a hocičo iné, čo by ste spravili v prípade, ak by ste nepoužili Express.
</div>

Spustite aplikáciu pomocou nasledujúceho príkazu:

```console
$ node app.js
```

Potom v prehliadači zadajte [http://localhost:3000/](http://localhost:3000/) a pozrite si výstup.

