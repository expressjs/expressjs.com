---
layout: page
title: Použitie template enginov v Express
menu: guide
lang: sk
---
<!---
 Copyright (c) 2016 StrongLoop, IBM, and Express Contributors
 License: MIT
-->

# Použitie template enginov v Express

_Template engine_ umožňuje použitie statických template súborov vo vašej aplikácii. Template engine nahradí v runtime premenné aktuálnymi hodnotami a pretransformuje template do HTML súboru poslaného klientovi.
Tento prístup robí návrh HTML stránok jednoduchším.

Medzi populárne template enginy fungujúce s Express patria [Pug](https://pugjs.org/api/getting-started.html), [Mustache](https://www.npmjs.com/package/mustache) a [EJS](https://www.npmjs.com/package/ejs).
[Express generátor](/{{ page.lang }}/starter/generator.html) požíva ako defaultný Pug, avšak podporuje aj mnohé ďalšie.

Zoznam podporovaných template enginov nájdete tu: [Template Engines (Express wiki)](https://github.com/expressjs/express/wiki#template-engines).
Pozrite si taktiež [Comparing JavaScript Templating Engines: Jade, Mustache, Dust and More](https://strongloop.com/strongblog/compare-javascript-templates-jade-mustache-dust/).

Aby Express dokázal spracovať a vyrendrovať template súbory, musí aplikácia obsahovať [nasledujúce nastavenia](/{{ page.lang }}/4x/api.html#app.set):

* `views`, cesta k priečinku, kde sa nachádzajú template súbory. Napr: `app.set('views', './views')`. Defaultne to je priečinok `views` nachádzajúci sa v hlavnom priečinku aplikácie.
* `view engine`, template engine, ktorý chcete použiť. Napr., ak by ste chceli použiť Pug: `app.set('view engine', 'pug')`

Potom nainštalujte vybraný template engine ako npm dependenciu. Napr. pre inštaláciu Pug spustite:

```console
$ npm install pug --save
```

<div class="doc-box doc-notice" markdown="1">
Templatovacie enginy kompatibilné s Express ako napr. Pug exportujú funkciu `__express(filePath, options, callback)`, ktorá je volaná pomocou `res.render()` funkcie k vyrendrovaniu template kódu.

Niektoré template enginy používajú inú konvenciu. [Consolidate.js](https://www.npmjs.org/package/consolidate) knižnica mapuje konvencie všetkých populárnych Node.js template enginov tak, aby bezproblémov fungovali s Express.
</div>

Nastavenie parametra view engine zabezpečí, že nie je potrebné špecifikovať engine, ani načítať modul template enginu vo vašej aplikácii; Express načíta tento modul interne, ako je (pre príklad hore) zobrazené nižšie.

<pre>
<code class="language-javascript" translate="no">
app.set('view engine', 'pug');
</code>
</pre>

Vo `views` priečinku vytvorte Pug template súbor s názvom `index.pug` s takýmto obsahom:

<pre>
<code class="language-javascript" translate="no">
html
  head
    title= title
  body
    h1= message
</code>
</pre>

Potom zadefinujte route pre rendrovanie `index.pug` súboru. Ak `view engine` parameter nie je nastavený, musíte špecifikovať príponu vášho `view` súboru. V opačnom prípade ju špecifikovať netreba.

<pre>
<code class="language-javascript" translate="no">
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});
</code>
</pre>

Po vykonaní requestu na hlavnú stránku, sa súbor `index.pug` vyrendruje ako HTML.

Pre viac informácií ohľadom fungovania template enginov v Express si prečítajte: ["Vývoj template enginov pre Express"](/{{ page.lang }}/advanced/developing-template-engines.html).
