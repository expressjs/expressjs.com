---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE. 
### DO NOT CHANGE ANY OTHER TEXT. 
layout: page
title: Použitie templatovacích enginov v Express
menu: guide
lang: sk
redirect_from: "/guide/using-template-engines.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

# Použitie templatovacích enginov v Express

_Template engine_ umožňuje použitie statických template súborov vo vašej aplikácii. Template engine nahradí počas runtimu premenné aktuálnymi hodnotami a pretransformuje template do HTML súboru poslaného klientovi.
Tento prístup robí návrh HTML stránok jednoduchším.

Medzi populárne templatovacie enginy fungujúce s Express patria [Jade](http://jade-lang.com/), [Mustache](https://www.npmjs.com/package/mustache) a [EJS](https://www.npmjs.com/package/ejs).
[Express generátor](/{{ page.lang }}/starter/generator.html) požíva ako defaultný Jade, avšak podporuje aj mnohé ďalšie.

Zoznam podporovaných templatovacích enginov nájdete tu: [Template Engines (Express wiki)](https://github.com/strongloop/express/wiki#template-engines).
Pozrite si taktiež [Comparing JavaScript Templating Engines: Jade, Mustache, Dust and More](https://strongloop.com/strongblog/compare-javascript-templates-jade-mustache-dust/).

Aby Express dokázal spracovať a vyrendrovať template súbory, musí aplikácia obsahovať [nasledujúce nastavenia](/{{ page.lang }}/4x/api.html#app.set):

* `views`, cesta k priečinku kde sa nachádzajú template súbory. Napr: `app.set('views', './views')`. Defaultne to je priečinok `views` nachádzajúci sa v hlavnom priečinku aplikácie.
* `view engine`, templatovací engine ktorý chcete použiť. Napr., ak by ste chceli použiť Jade: `app.set('view engine', 'jade')`

Potom nainštalujte vybraný templatovací engine ako npm dependenciu. Napr. pre inštaláciu Jade spustite:

<pre>
<code class="language-sh" translate="no">
$ npm install jade --save
</code>
</pre>

<div class="doc-box doc-notice" markdown="1">
Templatovacie enginy kompatibilné s Express-om ako napr. Jade exportujú funkciu `__express(filePath, options, callback)`, ktorá je volaná pomocou `res.render()` funkcie k vyrendrovaniu template kódu.

Niektoré templatovacie enginy používajú inú konvenciu. [Consolidate.js](https://www.npmjs.org/package/consolidate) knižnica mapuje konvencie všetkých populárnych Node.js templatovacích enginov tak, aby bezproblémov fungovali s Express-om.
</div>

Nastavenie parametra view engine zabezpečí, že nieje potrebné špecifikovať engine, ani načítať modul templatovacieho enginu vo vašej aplikácii; Express načíta tento modul interne, ako je (pre príklad hore) zobrazené nižšie.

<pre>
<code class="language-javascript" translate="no">
app.set('view engine', 'jade');
</code>
</pre>

Vo `views` priečinku vytvorte Jade template súbor s názvom `index.jade` s takýmto obsahom:

<pre>
<code class="language-javascript" translate="no">
html
  head
    title= title
  body
    h1= message
</code>
</pre>

Potom zadefinujte route pre rendrovanie `index.jade` súboru. Ak `view engine` parameter nie je nastavený, musíte špecifikovať príponu vášho `view` súboru. V opačnom prípade ju špecifikovať netreba.

<pre>
<code class="language-javascript" translate="no">
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});
</code>
</pre>

Po vykonaní requestu na home page, sa súbor `index.jade` vyrendruje ako HTML.

Pre viac informácií ohľadom fungovania templatovacích enginov v Express-e si prečítajte: ["Vývoj templatovacích enginov pre Express"](/{{ page.lang }}/advanced/developing-template-engines.html).
