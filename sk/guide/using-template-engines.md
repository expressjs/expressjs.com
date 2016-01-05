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

Aby Express dokázal spracovať a vyrendrovať template súbory, musí aplikácia obsahovať nasledujúce nastavenia:

* `views`, cesta k priečinku kde sa nachádzajú template súbory. Napr: `app.set('views', './views')`
* `view engine`, templatovací engine ktorý chcete použiť. Napr: `app.set('view engine', 'jade')`

Potom nainštalujte vybraný templatovací engine ako npm dependenciu:

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
    title!= title
  body
    h1!= message
</code>
</pre>

Potom zadefinujte route pre rendrovanie `index.jade` súboru. Ak `view engine` parameter nebol nastavený, musíte špecifikovať príponu vášho `view` súboru. V opačnom prípade ju špecifikovať netreba.

<pre>
<code class="language-javascript" translate="no">
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});
</code>
</pre>

Po vykonaní requestu na home page, sa súbor `index.jade` vyrendruje ako HTML.

Pre viac informácií ohľadom fungovania templatovacích enginov v Express-e si prečítajte: ["Vývoj templatovacích enginov pre Express"](/{{ page.lang }}/advanced/developing-template-engines.html).
