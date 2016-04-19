---
layout: page
title: Servovanie statických súborov pomocou Express
menu: starter
lang: sk
---
<!---
 Copyright (c) 2016 StrongLoop, IBM, and Express Contributors
 License: MIT
-->

# Servovanie statických súborov pomocou Express

Na servovanie statických súborov ako sú obrázky, CSS a JavaScript súbory používajte vstavaný `express.static` middleware.

Pre priame servovanie statického obsahu zavolajte `express.static` middleware s parametrom predstavujúcim názov priečinka obsahujúceho statické súbory. Napr., pre servovanie obrázkov, CSS a JavaScript súborov z priečinka `public` použite:

<pre>
<code class="language-javascript" translate="no">
app.use(express.static('public'));
</code>
</pre>

Teraz dokážete načítať súbory obsiahnuté v `public` priečinku:

<pre>
<code class="plain-text" translate="no">
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
</code>
</pre>

<div class="doc-box doc-info">
Express vyhľadáva súbory relatívne od priečinka so statickým obsahom, takže názov tohto priečinka nie je súčasťou URL.
</div>

V prípade, že chcete použiť viacero priečinkov so statickým obsahom, zavolajte `express.static` funkciu osobitne pre každý priečinok:

<pre>
<code class="language-javascript" translate="no">
app.use(express.static('public'));
app.use(express.static('files'));
</code>
</pre>

Express vyhľadáva súbory v jednotlivých adresároch podľa toho, v akom poradí sú zadefinované pomocou použitia `express.static` funkcie.

Ak potrebujete vytvoriť virtuálny prefix pre cestu k statickým súborom (kde taká cesta (path) v skutočnosti na súborovom systéme neexistuje) servovaným pomocou `express.static` funkcie, [špecifikujte cestu](/{{ page.lang }}/4x/api.html#app.use) k statickému obsahu nasledovne:

<pre>
<code class="language-javascript" translate="no">
app.use('/static', express.static('public'));
</code>
</pre>

Teraz môžete načítať súbory nachádzajúce sa v priečinku `public` na ceste s prefixom `/static`.

<pre>
<code class="plain-text" translate="no">
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
</code>
</pre>

Pozor však na to, že cesta ktorú poskytnete `express.static` funkcii je relatívna k priečinku, z ktorého ste spustili váš `node` proces. Ak spúšťate express aplikáciu z iného priečinka, je bezpečnejšie použiť absolútnu cestu k priečinku, ktorý chcete servovať:

<pre>
<code class="language-javascript" translate="no">
app.use('/static', express.static(__dirname + '/public'));
</code>
</pre>
