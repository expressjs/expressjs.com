---
layout: page
title: Express FAQ
menu: starter
lang: sk
---
<!---
 Copyright (c) 2016 StrongLoop, IBM, and Express Contributors
 License: MIT
-->

# FAQ

## Akú štruktúru priečinkov by som mal zvoliť pre svoju aplikáciu?

Jednoznačná odpoveď na túto otázku neexistuje. Odpoveď závisí od rozsahu
aplikácie a tímu, ktorí na nej pracuje. Z dôvodu maximálnej flexibility nedefinuje
Express žiadne pravidlá, či obmedzenia.

Samotná logika pre routing a ostatné špecifické časti aplikácie môže byť rozdelená
do ľubovoľného počtu súborov a organizovaná v ľubovoľnej štruktúre priečinkov,
presne tak, ako vám to vyhovuje. Pre inšpiráciu sa pozrite sa na nasledujúce príklady:

* [Route listings](https://github.com/expressjs/express/blob/4.13.1/examples/route-separation/index.js#L32-47)
* [Route maping](https://github.com/expressjs/express/blob/4.13.1/examples/route-map/index.js#L52-L66)
* [MVC style controllers](https://github.com/expressjs/express/tree/master/examples/mvc)

Existujú taktiež mnohé rozšírenia tretích strán, ktoré toto zjednodušujú:

* [Resourceful routing](https://github.com/expressjs/express-resource)

## Ako si zadefinujem model?

Samotný Express nemá žiaden koncept databáze. Tento koncept je ponechaný na Node moduly tretích strán,
ktoré umožňujú pracovať s takmer všetkými databázami.

Pre viac informácií ohľadom frameworku postavenom na Express-e, ktorý sa zameriava na prácu s modelom,
navštívte stránku [LoopBack](http://loopback.io).

## Ako dokážem autentifikovať používateľov?

Autentifikácia je ďalšia otvorená oblasť do ktorej Express priamo nezasahuje.
Môžete si zvoliť akúkoľvek autentifikačnú schému, ktorá vám vyhovuje. Pre jednoduchú meno / heslo autentifikáciu si pozrite [tento príklad](https://github.com/expressjs/express/tree/master/examples/auth).


## Aké template enginy Express podporuje?

Express podporuje všetky template enginy definujúce `(path, locals, callback)` signatúru.
Pre porovnanie rozhraní template enginov a caching-u sa pozrite na projekt
[consolidate.js](https://github.com/visionmedia/consolidate.js).
Templatovacie enginy, ktoré nie sú v zozname, môžu byť Express-om taktiež podporované.

## Ako handlovať 404-ky?

V Express aplikácii nie sú odpovede 404 výsledkom chyby, preto ich error-handler middleware nezachytí.
Toto správanie je z dôvodu, že odpoveď 404 jednoducho indikuje absenciu práce, ktorú treba vykonať,
inými slovami, Express vykonal všetky middlware funkcie a nenašiel žiaden routing,
ktorý by na danú požiadavku vedel odpovedať. Všetko čo musíte spraviť k odchyteniu 404-ky je, že pridáte nasledovnú middleware funkciu pod všetky ostatné definície:

<pre>
<code class="language-javascript" translate="no">
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});
</code>
</pre>

## Ako si zadefinujem error handler?

Error-handling middleware je rovnakým middlewarom ako všetky ostatné,
s jediným rozdielom a to, že je vyvolaný so štyrmi argumentami, namiesto troch.
Jeho signatúra je nasledovná `(err, req, res, next)`:

<pre>
<code class="language-javascript" translate="no">
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
</code>
</pre>

Viac informácií sa dozviete v kapitole [Error handling](/{{ page.lang }}/guide/error-handling.html).

## Ako dokážem rendrovať čisté HTML?

Nedokážeš! Nie je žiaden dôvod na rendrovanie HTML pomocou `res.render()` funkcie.
Ak máte konkrétny súbor, použite `res.sendFile()` funkciu.
Ak potrebujete servovať veľa statických súborov z konkrétneho priečinka, použite `express.static()`
middleware.
