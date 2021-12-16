---
layout: page
title: Prechod na Express 5
menu: guide
lang: sk
---
<!---
 Copyright (c) 2016 StrongLoop, IBM, and Express Contributors
 License: MIT
-->

# Prechod na Express 5

<h2 id="overview">Overview</h2>

Hoci je Express 5.0 ešte len v alpha release verzii, tu je náhľad zmien, ktoré budú v tomto release a návod ako zmigrovať vašu aplikáciu z verzie Express 4 na Express 5.

Express 5 sa od Express 4 veľmi nelíši: Zmeny v API nie sú tak veľké, ako v pŕipade prechodu z verzie 3.0 na 4.0. Hoci základné API zostáva rovnaké, sú tam niektoré podstatné zmeny; inými slovami, existujúca Express 4 aplikácia nemusí po upgrade na Express 5 fungovať.

Pre nainštalovanie poslednej alpha verzie Express 5, spustite v hlavnom priečinku vašej aplikácie nasledujúci príkaz:

```console
$ npm install express@5.0.0-alpha.2 --save
```

Potom môžete spustiť vaše automatizované testy, aby ste videli čo padá a opravili tieto problémy podľa informácií nižšie. Potom, ako identifikujete padajúce testy, spustite aplikáciu, aby ste videli aké errory nastávajú. Okamžite zistíte, či aplikácia používa niektorú z metód, alebo properties, ktoré nie sú podporované.

<h2 id="changes">Zmeny v Express 5</h2>

Tu je zoznam zmien (týkajúcich sa verzie alpha 2 release), ktoré vás, ako používateľa Express aplikácie, môžu ovplyvniť.
Pozrite sa na zoznam [pull request-ov](https://github.com/expressjs/express/pull/2237) všetkých plánovaných zmien.

**Odstránené metódy a properties**

<ul class="doclist">
  <li><a href="#app.del">app.del()</a></li>
  <li><a href="#app.param">app.param(fn)</a></li>
  <li><a href="#plural">Pluralizované názvy metód</a></li>
  <li><a href="#leading">Dvojbodka na začiatku v name argumente volania app.param(name, fn)</a></li>
  <li><a href="#req.param">req.param(name)</a></li>
  <li><a href="#res.json">res.json(obj, status)</a></li>
  <li><a href="#res.jsonp">res.jsonp(obj, status)</a></li>
  <li><a href="#res.send.body">res.send(body, status)</a></li>
  <li><a href="#res.send.status">res.send(status)</a></li>
  <li><a href="#res.sendfile">res.sendfile()</a></li>
</ul>

**Zmenené**

<ul class="doclist">
  <li><a href="#app.router">app.router</a></li>
  <li><a href="#req.host">req.host</a></li>
  <li><a href="#req.query">req.query</a></li>
</ul>

**Vylepšenia**

<ul class="doclist">
  <li><a href="#res.render">res.render()</a></li>
</ul>

<h3>Odstránené metódy a properties</h3>

Ak používate niektorú z nasledujúcich metód, alebo properties vo vašej aplikácii, aplikácia bude padať. Preto budete musieť vykonať zmeny vo vašej aplikácii, aby fungovala aj po update na veziu 5.

<h4 id="app.del">app.del()</h4>

Express 5 už viac nepodporuje `app.del()` funkciu. V prípade použitia tejto metódy nastane error. Namiesto nej použite pre zaregistrovanie HTTP DELETE route-ov funkciu `app.delete()`.

Pôvodne bola funkcia `del` používaná namiesto `delete`, pretože `delete` je v JavaScript-e rezervované kľúčové slovo. Avšak od ECMAScript 6, `delete` a ďalšie rezervované klúčové slová môžu byť bezpečne použité ako názov property.

<h4 id="app.param">app.param(fn)</h4>

Zápis `app.param(fn)` bol používaný pre modifikovanie správania `app.param(name, fn)` funkcie. Tento zápis bol označený ako deprecated už od v4.11.0 a Express 5 ho už nepodporuje vôbec.

<h4 id="plural">Pluralizované názvy metód</h4>

Nasledujúce názvy metód boli pluralizované. Používanie pôvodných názvov v Express 4 viedlo k deprecation warning-om. Express 5 ich už nepodporuje vôbec:

`req.acceptsCharset()` bola nahradená za `req.acceptsCharsets()`.

`req.acceptsEncoding()` bola nahradená za `req.acceptsEncodings()`.

`req.acceptsLanguage()` bola nahradená za `req.acceptsLanguages()`.

<h4 id="leading">Dvojbodka (:) na začiatku v name argumente volania app.param(name, fn)</h4>

Dvojbodka (:) na začiatku v name argumente volania `app.param(name, fn)` funkcie je pozostatkom z Express 3 a v záujme spätnej kompatibility ju Express 4 podporoval s deprecation warning-om. Express 5 ju bude ticho ignorovať a používa name parameter bez prefixu počiatočnej dvojbodky.

Táto zmena by nemala ovplyvniť váš kód v prípade, ak postupujete podľa dokumentácie k Express 4 [app.param](/{{ page.lang }}/4x/api.html#app.param), kde sa žiadna počiatočná dvojbodka už nespomína.

<h4 id="req.param">req.param(name)</h4>

Táto potenciálne mätúca a nebezpečná metóda získania dát z formulára bola odstránená. Odteraz budete musieť pozrieť na konkrétny názov parametra v `req.params`, `req.body`, alebo `req.query` objektu.

<h4 id="res.json">res.json(obj, status)</h4>

Express 5 už viac nepodporuje zápis `res.json(obj, status)`. Namiesto toho nastavte status a zreťazte ho s `res.json()` volaním, takto `res.status(status).json(obj)`.

<h4 id="res.jsonp">res.jsonp(obj, status)</h4>

Express 5 už viac nepodporuje zápis `res.jsonp(obj, status)`. Namiesto toho nastavte status a zreťazte ho s `res.jsonp()` volaním, takto: `res.status(status).jsonp(obj)`.

<h4 id="res.send.body">res.send(body, status)</h4>

Express 5 už viac nepodporuje zápis `res.send(obj, status)`. Namiesto toho nastavte status a zreťazte ho s `res.send()` volaním, takto: `res.status(status).send(obj)`.

<h4 id="res.send.status">res.send(status)</h4>

Express 5 už viac nepodporuje zápis <code>res.send(<em>status</em>)</code>, kde _`status`_ je číslo. Namiesto toho použite funkciu `res.sendStatus(statusCode)`, ktorá nastavuje status kód HTTP response hlavičky a odošle jej textovú verziu spolu s: "Not Found", "Internal Server Error", a podobne.
Ak potrebujete poslať pomocou funkcie `res.send()` číslo, uveďte ho v úvodzovkách, aby ste ho pretypovali na string, takže to Express nevyhodnotí ako pokus o nepodporovaný zápis.

<h4 id="res.sendfile">res.sendfile()</h4>

Funkcia `res.sendfile()` bola v Express 5 nahradená camel-cased verziou `res.sendFile()`.

<h3>Zmenené</h3>

<h4 id="app.router">app.router</h4>

Objekt `app.router`, ktorý bol v Express 4 odstránený, bol v Express 5 vrátený späť. V novej verzii je tento objekt len referenciou na základný Express router, kým v Express 3 ho bolo nutné explicitne načítať.

<h4 id="req.host">req.host</h4>

Funkcia `req.host` v Express 4 nekorektne odstraňovala číslo portu, ak bol definovaný. V Express 5 je číslo portu ponechané.

<h4 id="req.query">req.query</h4>

V Express 4.7 a od Express 5, query parser parameter akceptuje hodnotu `false` pre zakázanie parsovania query stringu v prípade, ak chcete použiť vlastnú funkciu na parsovanie.

<h3>Improvements</h3>

<h4 id="res.render">res.render()</h4>

Táto metóda si odteraz vynucuje asynchrónne správanie všetkých view engine-ov, čím predchádza chybám spôsobenými view engine-ami, ktorých implementácia je synchrónna a porušuje doporučený interface.
