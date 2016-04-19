---
layout: page
title: Tvorba middleware pre použitie v Express applikáciách
menu: guide
lang: sk
---
<!---
 Copyright (c) 2016 StrongLoop, IBM, and Express Contributors
 License: MIT
-->

# Tvorba middleware pre použitie v Express aplikáciách

<h2>Prehľad</h2>

_Middleware_ funkcie sú funkcie, ktoré majú prístup k [request objektu](/4x/api.html#req)  (`req`), [response objektu](/4x/api.html#res) (`res`) a nasledujúcej middleware funkcii v request-response cykle aplikácie. Nasledujúca middleware funkcia v poradí je bežne označovaná premennou `next`.

Middleware funkcie dokážu vykonávať nasledujúce úlohy:

* Vykonať akýkoľvek kód.
* Vykonať zmeny na request a response objektoch.
* Ukončiť request-response cyklus.
* Zavolať nasledujúcu middleware funkciu v poradí.

Ak aktuálna middleware funkcia neukončuje request-response cyklus, musí posunúť obsluhu nasledujúcej middleware funkcii vyvolaním `next()`. V opačnom prípade zostane request 'visieť'.

Nasledujúci diagram ukazuje jednotlivé časti volania middleware funkcie:

<table id="mw-fig">
<tr><td id="mw-fig-imgcell">
<img src="/images/express-mw.png" id="mw-fig-img" />
</td>
<td class="mw-fig-callouts">
<div class="callout" id="callout1">HTTP metóda pre ktorú je middleware funkcia aplikovateľná.</div>

<div class="callout" id="callout2">Cesta (route) pre ktorú je middleware funkcia aplikovateľná.</div>

<div class="callout" id="callout3">Middleware funkcia.</div>

<div class="callout" id="callout4">Callback argument k middleware funkcii, nazvaný "next" podľa konvencie.</div>

<div class="callout" id="callout5">HTTP <a href="/en/4x/api.html#res">response</a> argument k middleware funkcii, nazvaný "res" podľa konvencie.</div>

<div class="callout" id="callout6">HTTP <a href="/en/4x/api.html#req">request</a> argument k middleware funkcii, nazvaný "req" podľa konvencie.</div>
</td></tr>
</table>

<h2>Príklad</h2>

Tu je príklad jednoduchej "Hello World" Express aplikácie.
Zvyšná časť tohto článku definuje a pridáva do aplikácie dve middleware funkcie:
jedna nazvaná `myLogger` ktorá vypíše jednoduchú log message a druhá nazvaná `requestTime` ktorá vypíše timestamp HTTP requestu.

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000);
</code>
</pre>

<h2>Middleware funkcia myLogger</h2>

Tu je príklad jednoduchej middleware funkcie nazvanej "myLogger". Táto funkcia len vypíše "LOGGED", vždy keď aplikácia odchytí request. Middleware funkcia je priradená premennej nazvanej `myLogger`.

<pre>
<code class="language-javascript" translate="no">
var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};
</code>
</pre>

<div class="doc-box doc-notice" markdown="1">
Všimnite si volanie `next()` metódy hore. Zavolanie tejto funkcie vyvolá ďalší middleware v aplikácii.
Funkcia `next()` nie je súčasťou Node.js či Express API, ale je tretím argumentom s ktorým je middleware funkcia vyvolaná.
Funkcia `next()` môže byť nazvaná hocijako, ale podľa konvencie sa zvykne nazývať vždy "next".
Aby ste predišli zmätkom používajte túto konvenciu.
</div>

Pre načítanie middleware funkcie zavolajte `app.use()`, prostredníctvom ktorej ho špecifikujete.
Nasledujúci kód načíta `myLogger` middleware funkciu ešte pred route definíciou hlavnej cesty aplikácie (/).

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var app = express();

var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

app.use(myLogger);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000);
</code>
</pre>

Vždy keď aplikácia obdrží request požiadavku, vypíše do konzoly správu "LOGGED".

Poradie načítania middleware-ov je dôležité: middleware funkcie, ktoré sú načítane prvé, sú aj ako prvé vyvolané.

Ak by `myLogger` bol načítaný až za definíciou route pre hlavnú stránku aplikácie, nikdy by ho request nedosiahol a aplikácia by nevypísala "LOGGED", pretože route handler ukončí request-response cyklus.

Táto `myLogger` middleware funkcia len vypisuje správu a posunie spracovanie ďalšej middleware funkcii v poradí zavolaním funkcie `next()`.

<h3>Middleware funkcia requestTime</h3>

Ďalej vytvoríme middleware funkciu s názvom "requestTime" a ktorá pridáva `requestTime` atribút na request objekt.

<pre>
<code class="language-javascript" translate="no">
var requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};
</code>
</pre>

Aplikácia teraz používa `requestTime` middleware funkciu. Taktiež callback funkcia pre obsluhu route hlavnej stránky aplikácie používa atribút, ktorý táto middleware funkcia pridala na `req` (request objekt).

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var app = express();

var requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

app.use(requestTime);

app.get('/', function (req, res) {
  var responseText = 'Hello World!<br>';
  responseText += '<small>Requested at: ' + req.requestTime + '</small>';
  res.send(responseText);
});

app.listen(3000);
</code>
</pre>

Po vykonaní requestu na hlavnú stránku aplikácie sa zobrazí v prehliadači timestamp vášho requestu.

Keďže máte prístup k request a response objektu, ďalšej middleware funkcii v poradí a celému Node.js API, možnosti middleware funkcií sú nekonečné.

Pre viac informácií ohľadom Express middleware si pozrite: [Použitie Express middleware](/{{ page.lang }}/guide/using-middleware.html).
