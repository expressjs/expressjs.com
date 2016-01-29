---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Použitie Express middleware
menu: guide
lang: sk
redirect_from: "/guide/using-middleware.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

# Použitie middleware

Express je webový framework s minimálnou vlastnou funkcionalitou: Express aplikácia je v podstate séria volaní middleware funkcií.

_Middleware_ funkcie sú funkcie, ktoré majú prístup k [request objektu](/4x/api.html#req)  (`req`), [response objektu](/4x/api.html#res) (`res`) a nasledujúcej middleware funkcii v request-response cykle aplikácie. Nasledujúca middleware funkcia v poradí je bežne označovaná premennou `next`.

Middleware funkcie dokážu vykonávať nasledujúce úlohy:

* Vykonať akýkoľvek kód.
* Vykonať zmeny na request a response objektoch.
* Ukončiť request-response cyklus.
* Zavolať nasledujúcu middleware funkciu v poradí.

Ak aktuálna middleware funkcia neukončuje request-response cyklus, musí posunúť obsluhu nasledujúcej middleware funkcii vyvolaním `next()`. V opačnom prípade zostane request 'visieť'.

Express aplikácia môže použiť nasledovné typy middleware funkcií:

 - [Application-level middleware](#middleware.application)
 - [Router-level middleware](#middleware.router)
 - [Error-handling middleware](#middleware.error-handling)
 - [Built-in middleware](#middleware.built-in)
 - [Third-party middleware](#middleware.third-party)

Application-level a router-level middleware môžete načítať s voliteľnou cestou (path-om).
Môžete taktiež načítať skupinu middleware funkcií dohromady, čím vytvoríte sub-stack middleware systém na danej ceste.

<h2 id='middleware.application'>Application-level middleware</h2>

Pripojte application-level middleware k inštancii [app objektu](/{{ page.lang }}/4x/api.html#app) použitím `app.use()` a `app.METHOD()` funkcií, kde `METHOD` je typicky HTTP metóda requestu, ktorý mddleware funkcia handluje (ako napr. GET, PUT, či POST) zapísaná v lowercase formáte.

Nasledujúci príklad ukazuje middleware funkciu, ktorá nie je pripojená na žiaden path. Funkcia bude vykonaná vždy, keď aplikácia obdrží request.

<pre>
<code class="language-javascript" translate="no">
var app = express();

app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});
</code>
</pre>

Nasledujúci príklad ukazuje middleware funkciu pripojenú na ceste `/user/:id`. Funkcia bude vykonaná vždy, keď aplikácia održí request na `/user/:id` a to bez ohľadu na typ použitej HTTP metódy.

<pre>
<code class="language-javascript" translate="no">
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
</code>
</pre>

Nasledujúci príklad ukazuje route a jej handler funkciu (middleware systém). Táto funkcia handluje GET requesty na ceste `/user/:id`.

<pre>
<code class="language-javascript" translate="no">
app.get('/user/:id', function (req, res, next) {
  res.send('USER');
});
</code>
</pre>

Tu je príklad načítania skupiny middleware funkcií pripojených na konkrétnu cesty. Príklad ilustruje sub-stack middleware, ktorý vypíše info o requeste pre všetky typy HTTP requestov vykonaných na `/user/:id`.

<pre>
<code class="language-javascript" translate="no">
app.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
</code>
</pre>

Route handlery dovoľujú definovať viacero route-ov pre jednu cestu. Nasledujúci príklad definuje dva routy pre GET requesty na ceste `/user/:id`. Definovanie druhého route nespôsobí žiadne problémy, ale ani sa nikdy nezavolá, pretože prvý route ukončí request-response cyklus.

Tento príklad zobrazuje middleware sub-stack ktorý handluje GET requesty na ceste `/user/:id`.

<pre>
<code class="language-javascript" translate="no">
app.get('/user/:id', function (req, res, next) {
  console.log('ID:', req.params.id);
  next();
}, function (req, res, next) {
  res.send('User Info');
});

// handler for the /user/:id path, which prints the user ID
app.get('/user/:id', function (req, res, next) {
  res.end(req.params.id);
});
</code>
</pre>

Ak chcete preskočiť zostávajúce middleware funkcie z router middleware stack-u, zavolajte `next('route')` čím posuniete obsluhu ďalšiemu route.
**POZNÁMKA**: `next('route')` zafunguje iba v takých middleware funkciách, ktoré boli načítané pomocou `app.METHOD()` alebo `router.METHOD()` funkcií.

Tento príklad zobrazuje middleware sub-stack, ktorý handluje GET requesty na ceste `/user/:id`.

<pre>
<code class="language-javascript" translate="no">
app.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next route
  if (req.params.id == 0) next('route');
  // otherwise pass the control to the next middleware function in this stack
  else next(); //
}, function (req, res, next) {
  // render a regular page
  res.render('regular');
});

// handler for the /user/:id path, which renders a special page
app.get('/user/:id', function (req, res, next) {
  res.render('special');
});
</code>
</pre>

<h2 id='middleware.router'>Router-level middleware</h2>

Router-level middleware funguje rovnakým spôsobom ako application-level middleware, avšak je pripojený k `express.Router()` inštancii.

<pre>
<code class="language-javascript" translate="no">
var router = express.Router();
</code>
</pre>
Router-level middleware načítate pomocou `router.use()` a `router.METHOD()` funkcií.

Nasledujúci príklad replikuje vyššie zobrazený application-level middleware použitím router-level middlewaru:

<pre>
<code class="language-javascript" translate="no">
var app = express();
var router = express.Router();

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next router
  if (req.params.id == 0) next('route');
  // otherwise pass control to the next middleware function in this stack
  else next(); //
}, function (req, res, next) {
  // render a regular page
  res.render('regular');
});

// handler for the /user/:id path, which renders a special page
router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id);
  res.render('special');
});

// mount the router on the app
app.use('/', router);
</code>
</pre>

<h2 id='middleware.error-handling'>Error-handling middleware</h2>

<div class="doc-box doc-notice" markdown="1">
Error-handling middleware príjma vždy _štyri_ argumenty.  Aby bolo možné identifikovať error-handling middleware funkciu, musíte jej definovať vždy štyri argumenty. Musíte ho definovať aj v situácii, kedy nepotrebujete použiť `next` objekt, aby ste dodržali dohodnutú signatúru. V opačnom prípade bude `next` objekt interpretovaný ako bežný middleware, ktorý nedokáže handlovať errory.
</div>

Error-handling middleware funkcie sa definujú rovnako ako ostatné middleware funkcie, len majú štyri argumenty namiesto troch, špecificky podľa signatúry `(err, req, res, next)`:

<pre>
<code class="language-javascript" translate="no">
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
</code>
</pre>

Pre viac informácií ohľadom error-handling middlewarov si pozrite sekciu: [Error handling](/{{ page.lang }}/guide/error-handling.html).

<h2 id='middleware.built-in'>Built-in middleware</h2>

Express od verzie 4.x nie je závislý na [Connect](https://github.com/senchalabs/connect) module. Okrem výnimky `express.static`, všetky predošlé middleware funkcie pôvodne obsiahnuté v Express sú teraz samostatné moduly. Zoznam middleware funkcií [si pozrite tu](https://github.com/senchalabs/connect#middleware).

<h4 id='express.static'>express.static(root, [options])</h4>

Jediným vstavaným  middlewarom v Express je `express.static` funkcia. Táto funkcia je založená na [serve-static](https://github.com/expressjs/serve-static) module a je zodpovedná za servovanie statického obsahu v Express aplikácii.

Parameter `root` špecifikuje hlavný adresár z ktorého bude statický obsah servovaný.

Voľiteľný `options` objekt môže mať nasledovné properties:

| Property      | Popis                                                                     |    Typ    | Default         |
|---------------|---------------------------------------------------------------------------|-----------|-----------------|
| `dotfiles`    | Možnosť servovať dotfiles. Možné hodnoty sú "allow", "deny", a "ignore"   | String    | "ignore"  |
| `etag`        | Zapne/vypne generovanie etag headra.                                      | Boolean   | `true`    |
| `extensions`  | Nastavuje file extension fallbacks. | Array | `[]` |
| `index`       | Odošle index súbor priečinka. Nastavte na `false` pre zakázanie indexovania. | Mixed | "index.html" |
 `lastModified` | Nastaví `Last-Modified` header na hodnotu dátumu poslednej modifikácie súboru podĺa OS. Možné hodnoty sú `true` alebo `false`. | Boolean | `true` |
| `maxAge`      | Nastaví max-age parameter pre Cache-Control header, v milisekundách alebo string v [ms formáte](https://www.npmjs.org/package/ms) | Number | 0 |
| `redirect`    | Presmeruje na koncové "/" ak je cesta priečinkom. | Boolean | `true` |
| `setHeaders`  | Funkcia pre nastavenie HTTP header-a servovaného so súborom. | Function |  |

Tu je príklad použitia `express.static` middleware funkcie s rôznou konfiguráciou options objektu:

<pre>
<code class="language-javascript" translate="no">
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
}

app.use(express.static('public', options));
</code>
</pre>

Môžete nastaviť aj viac ako jeden priečinok so statickým obsahom:

<pre>
<code class="language-javascript" translate="no">
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.static('files'));
</code>
</pre>

Pre viac detailov ohľadom `serve-static` funkcie a jej možnostiach si pozrite dokumentáciu k [serve-static](https://github.com/expressjs/serve-static) modulu.

<h2 id='middleware.third-party'>Third-party middleware</h2>

V Express aplikácii možete využiť taktiež third-party middleware funkcionalitu.

Nainštalujte požadovaný Node.js modul a načítajte ho do aplikácie ako aplikačný, či router middleware.

Nasledujúci príklad demonštruje inštaláciu a načítanie middleware funkcie `cookie-parser` slúžiacej na prácu s cookies.

<pre>
<code class="language-sh" translate="no">
$ npm install cookie-parser
</code>
</pre>

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

// load the cookie-parsing middleware
app.use(cookieParser());
</code>
</pre>

Čiastočný zoznam bežne používaných third-party middleware funkcií pre Express nájdete v sekcii: [Third-party middleware](../resources/middleware.html).
