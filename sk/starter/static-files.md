---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Servovanie statických súborov pomocou Express
menu: starter
lang: sk
redirect_from: "/starter/static-files.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

# Servovanie statických súborov pomocou Express

Na servovanie statických súborov ako sú obrázky, CSS a JavaScript súbory používajte vstavaný `express.static` middleware.

Pre priame servovanie statického obsahu zavolajte `express.static` middleware funkcii s parametrom názvu priečinka obsahujúceho statické súbory. Napr., pre servovanie obrázkov, CSS a JavaScript súborov z priečinka `public` použite:

<pre><code class="language-javascript" translate="no">
app.use(express.static('public'));
</code></pre>

Teraz dokážete načítať súbory obsiahnuté v `public` priečinku:

<pre class="plain-text"><code class="plain-text" translate="no">
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
</code></pre>

<div class="doc-box doc-info">
Express vyhľadáva súbory relatívne od priečinka so statickým obsahom, takže názov tohto priečinka nieje súčasťou URL.
</div>

V prípade, ak chcete použiť viacero priečinkov so statickým obsahom, zavolajte `express.static` middleware funkciu osobitne pre každý priečinok:

<pre><code class="language-javascript" translate="no">
app.use(express.static('public'));
app.use(express.static('files'));
</code></pre>

Express vyhľadáva súbory v jednotlivých adresároch podľa toho v akom poradí sú zadefinované pomocou použitia `express.static` middleware funkcie.

Ak potrebujete vytvoriť virtuálny prefix pre cestu k statickým súborom (kde taká cesta v skutočnosti na súborovom systéme neexistuje) servovaným pomocou `express.static` funkcie, [špecifikujte cestu](/{{ page.lang }}/4x/api.html#app.use) k statickému obsahu nasledovne:

<pre><code class="language-javascript" translate="no">
app.use('/static', express.static('public'));
</code></pre>

Teraz môžete načítať súbory nachádzajúce sa v `public` priečinku z cesty s prefixom `/static`.

<pre class="plain-text"><code class="plain-text" translate="no">
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
</code></pre>

Avšak, cesta ktorú poskytnete `express.static` funkcii je relatívna k priečinku, z ktorého ste spustili váš `node` proces. Ak spúšťate express aplikáciu z iného priečinka, je bezpečnejšie použiť absolútnu cestu k priečinku, ktorý chcete servovať:

<pre><code class="language-javascript" translate="no">
app.use('/static', express.static(__dirname + '/public'));
</code></pre>
