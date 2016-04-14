---
layout: page
title: Express slovník
menu: resources
lang: sk
---
<!---
 Copyright (c) 2016 StrongLoop, IBM, and Express Contributors
 License: MIT
-->

# Slovník

<div class="doc-box doc-warn">Toto je pracovná verzia</div>

### aplikácia

Vo všeobecnosti je to jeden, či viacej programov navrhnutých k vykonávaniu operácií za špecifickým účelom. V kontexte Express-u je to program, používajúci Express API fungujúceho na Node.js platforme. Pozrite sa na [app object](/{{ page.lang }}/api.html#express).

### API

Application programming interface. Hláskujte po písmenkách.

### Express

Express je minimalistický, flexibilný, webový framework pre Node.js aplikácie. Vo všeobecnosti, názov "Express" je preferovaný pred "Express.js," ktorý je ale taktiež zaužívaný a akceptovaný.

### libuv

Multi-platformová knižnica zameriavajúca sa na asynchrónne I/O, primárne navrhnutá pre použitie s Node.js.

### middleware

Je funkcia vyvolaná Express routing layer-om ešte pred zavolaním finálneho request handlera a preto "sedí" v strede medzi samotným requestom a routom.  Zopár ďalších bodov terminológie týkajúcej sa middleware:

  * `var foo = require('middleware')` je zavolaný _requirnutím_ alebo _použitím_ Node.js modulu. Potom, výraz `var mw = foo()` typicky vracia middleware.
  * `app.use(mw)` je zavolaný _pridaním middlewaru do globálneho stacku spracovania_.
  * `app.get('/foo', mw, function (req, res) { ... })` je zavolaný pridaním middlewaru do stacku spracovania "GET /foo"_.

### Node.js

Sofvérová platforma používaná na budovanie škálovateľných aplikácií. Node.js používa JavaScript ako svoj skriptovací jazyk a dosahuje vysokú priepustnosť pomocou neblokujúcich I/O operácií a single-thread event loop-u.  Pozrite sa na [nodejs.org](https://nodejs.org/en/). **Pozn. používania**: Pôvodne, "Node.js," neskor už len "Node".

### open-source, open source

Keď je použitý vo význame prídavného mena, používa sa pomlčka; Napr." Toto je open-source softvér". Pozrite sa na [Open-source software on Wikipedia](http://en.wikipedia.org/wiki/Open-source_software). Pozn.: Hoci sa bežne pomlčka nepoužíva, v tejto dokumentácii sú použité pravidlá angličtiny, kde sa zložené prídavné mená spájajú pomlčkou.

### request

HTTP request. Klient zašle HTTP request message na server, ktorý vráti response. Request musí používať niektorú z [request metód](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods) ako je GET, POST a pod..

### response

HTTP response. Server vracia klientovi HTTP response message. Response obsahuje informáciu o stave spracovania requestu a taktiež môže obsahovať message body.

### route

Časť URL identifikujúca resource. Napr. v prípade `http://foo.com/products/id` je route "/products/id".

### router

Pozrite sa na definíciu [router](/{{ page.lang }}/api.html#router) v API dokumentácii.
