---
layout: page
title: Express routing
menu: guide
lang: sk
---
<!---
 Copyright (c) 2016 StrongLoop, IBM, and Express Contributors
 License: MIT
-->
# Routing

_Routing_ definuje tzv. koncové body aplikácie (URI) a spôsob, akým odpovedajú na requesty klientov.
Základné informácie o routing-u sa dozviete v sekcii [Základný routing](/{{ page.lang }}/starter/basic-routing.html).

Tu je príklad, ako zadefinovať základný routing.

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});
</code>
</pre>

<h2 id="route-methods">Route metódy</h2>

Route metóda je odvodená z niektorej HTTP metódy a pripojená k inštancii `express` triedy.

Nasledujúci kód je ukážkou definície routing-u pre GET a POST metódy hlavnej stránky aplikácie.

<pre>
<code class="language-javascript" translate="no">
// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage');
});

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage');
});
</code>
</pre>

Express podporuje tieto routing metódy korešpondujúce k HTTP metódam: `get`, `post`, `put`, `head`, `delete`, `options`, `trace`, `copy`, `lock`, `mkcol`, `move`, `purge`, `propfind`, `proppatch`, `unlock`, `report`, `mkactivity`, `checkout`, `merge`, `m-search`, `notify`, `subscribe`, `unsubscribe`, `patch`, `search` a `connect`.

<div class="doc-box doc-info" markdown="1">
Tie routing metódy, ktorých názov nie je validným názvom pre JavaScript premennú, zapisujte pomocou zátvorkovej notácie. Napr.:
`app['m-search']('/', function ...`
</div>

Existuje špeciálna routing metóda `app.all()`, ktorá nie je odvodená zo žiadnej HTTP metódy. Táto metóda sa používa ako middleware funkcia pre konkrétny koncový bod a všetky jej request metódy.

Na nasledujúcom príklade je ukážka handler funkcie, ktorá bude vykonaná pri requeste na "/secret" bez ohľadu nato, či bude použitá GET, POST, PUT, DELETE, alebo akákoľvek iná HTTP request metóda podporovaná [http modulom](https://nodejs.org/api/http.html#http_http_methods).

<pre>
<code class="language-javascript" translate="no">
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});
</code>
</pre>

<h2 id="route-paths">Route cesty</h2>

Route cesty (route paths) definujú v kombinácii s request metódami koncové body, voči ktorým je možné vykonať request. Route cesty je možné definovať ako stringy, stringové patterny, alebo ako regulárne výrazy.

<div class="doc-box doc-info" markdown="1">
  Express používa pre spárovanie (matching) route cesty npm modul [path-to-regexp](https://www.npmjs.com/package/path-to-regexp); pre všetky možnosti definície route ciest si pozrite dokumentáciu k path-to-regexp modulu. [Express Route Tester](http://forbeslindesay.github.io/express-route-tester/) je užitočný nástroj pre testovanie základných Express route ciest, hoci nepodporuje pattern matching.
</div>

<div class="doc-box doc-warn" markdown="1">
Query stringy nie sú súčasťou route ciest.
</div>

Tu je niekoľko príkladov route ciest na základe stringov.

Táto route cesta sa spáruje s requestom na hlavný route, `/`.

<pre>
<code class="language-javascript" translate="no">
app.get('/', function (req, res) {
  res.send('root');
});
</code>
</pre>

Táto route cesta sa spáruje s requestom na `/about`.

<pre>
<code class="language-javascript" translate="no">
app.get('/about', function (req, res) {
  res.send('about');
});
</code>
</pre>

Táto route cesta sa spáruje s requestom na `/random.text`.

<pre>
<code class="language-javascript" translate="no">
app.get('/random.text', function (req, res) {
  res.send('random.text');
});
</code>
</pre>

Tu je niekoľko príkladov route ciest na základe stringových patternov.

Táto route cesta sa spáruje s requestom `acd` a `abcd`.

<pre>
<code class="language-javascript" translate="no">
app.get('/ab?cd', function(req, res) {
  res.send('ab?cd');
});
</code>
</pre>

Táto route cesta sa spáruje s requestom `abcd`, `abbcd`, `abbbcd`, atď.

<pre>
<code class="language-javascript" translate="no">
app.get('/ab+cd', function(req, res) {
  res.send('ab+cd');
});
</code>
</pre>

Táto route cesta sa spáruje s requestom `abcd`, `abxcd`, `abRANDOMcd`, `ab123cd`, atď.

<pre>
<code class="language-javascript" translate="no">
app.get('/ab*cd', function(req, res) {
  res.send('ab*cd');
});
</code>
</pre>

Táto route cesta sa spáruje s requestom `/abe` a `/abcde`.

<pre>
<code class="language-javascript" translate="no">
app.get('/ab(cd)?e', function(req, res) {
 res.send('ab(cd)?e');
});
</code>
</pre>

<div class="doc-box doc-info" markdown="1">
Znaky ?, +, *, a () sú podmnožinami ich regulárnych výrazov. Pomlčka (-) a bodka (.) sa reprezentujú ako text.
</div>

Príklady definícií route ciest s využitím regulárnych výrazov:

Táto route cesta bude spárovaná s každým requestom obsahujúcim "a".

<pre>
<code class="language-javascript" translate="no">
app.get(/a/, function(req, res) {
  res.send('/a/');
});
</code>
</pre>

Táto route cesta sa spáruje s requestom `butterfly` a `dragonfly`, ale nie `butterflyman`, `dragonfly man`, atď.

<pre>
<code class="language-javascript" translate="no">
app.get(/.*fly$/, function(req, res) {
  res.send('/.*fly$/');
});
</code>
</pre>

<h2 id="route-handlers">Route handler</h2>

Pre spracovanie requestu je možné zadefinovať viacero callback funkcií správajúcich sa ako [middleware](/{{ page.lang }}/guide/using-middleware.html). Jedinou výnimkou je, že tieto callback-y môžu samé vyvolať `next('route')` a tak vynechať zostávajúce definície callback-ov. Tento mechanizmus môžete použiť k stanoveniu podmienok spracovania a následne potom "odovzdať" riadenie ďalším route definíciám v prípade, že nie je dôvod ho ďalej spracovávať v aktuálnej route definícii.

Route handler môže byť definovaný ako funkcia, pole funkcií či kombinácia oboch, ako na nasledujúcich príkladoch.

Jedna callback funkcia pre obsluhu spracovania:

<pre>
<code class="language-javascript" translate="no">
app.get('/example/a', function (req, res) {
  res.send('Hello from A!');
});
</code>
</pre>

Môžete použiť aj viac ako jednu callback funkciu (nezabudnite špecifikovať `next` objekt). Napríklad:

<pre>
<code class="language-javascript" translate="no">
app.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from B!');
});
</code>
</pre>

Môžete použiť aj pole callback funkcií.  Napr.:

<pre>
<code class="language-javascript" translate="no">
var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

var cb2 = function (req, res) {
  res.send('Hello from C!');
}

app.get('/example/c', [cb0, cb1, cb2]);
</code>
</pre>

Tu je ukážka kombinácia nezávislých funkcií a poľa funkcií:

<pre>
<code class="language-javascript" translate="no">
var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from D!');
});
</code>
</pre>

<h2 id="response-methods">Response metódy</h2>

Metódy response objektu (`res`) v nasledujúcej tabuľke dokážu odoslať odpoveť klientovi a ukončiť request-response cyklus. Ak žiadna z týchto metód nebude zavolaná z route handler-a, request klienta zostane "visieť" nespracovaný.

| Method               | Description
|----------------------|--------------------------------------
| [res.download()](/{{ page.lang }}/4x/api.html#res.download)   | Ponúkne súbor na stianutie.
| [res.end()](/{{ page.lang }}/4x/api.html#res.end)        | Ukončí proces odpovede.
| [res.json()](/{{ page.lang }}/4x/api.html#res.json)       | Odošle odpoveď ako JSON.
| [res.jsonp()](/{{ page.lang }}/4x/api.html#res.jsonp)      | Odošle JSON odpoveď s podporou JSONP.
| [res.redirect()](/{{ page.lang }}/4x/api.html#res.redirect)   | Presmeruje request.
| [res.render()](/{{ page.lang }}/4x/api.html#res.render)     | Vyrendruje view template.
| [res.send()](/{{ page.lang }}/4x/api.html#res.send)       | Odošle odpoveď rôzneho typu.
| [res.sendFile()](/{{ page.lang }}/4x/api.html#res.sendFile)     | Odošle súbor ako octet stream.
| [res.sendStatus()](/{{ page.lang }}/4x/api.html#res.sendStatus) | Nastaví status kód odpovede a odošle jej textovú reprezentáciu ako telo odpovede.

<h2 id="app-route">app.route()</h2>

Pomocou `app.route()` dokážete vytvoriť zreťaziteľné route handlery pre konkrétnu route cestu.
Pretože je route cesta špecifikovaná na jednom mieste, tvorba takýchto routes je užitočná a znižuje redundanciu a preklepy. Pre viac informácií o použití route pozrite: [Router() dokumentáciu](/{{ page.lang }}/4x/api.html#router).

Tu je príklad zreťazenia route handlerov definovaných pomocou `app.route()`.

<pre>
<code class="language-javascript" translate="no">
app.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });
</code>
</pre>

<h2 id="express-router">express.Router</h2>

Ak chcete vytvoriť modulárne a zreťazitelné route handlery použite `express.Router` triedu. `Router` inštancia je kompletný middleware a routing systém; z tohto dôvodu sa často označuje ako "mini-app".

Nasledujúci príklad demonštruje vytvorenie router modulu, načítanie middleware funkcie, špecifikuje niekoľko route definícií a ukazuje pripojenie router modulu na cestu (path) v hlavnej aplikácii.

V priečinku aplikácie vytvorte router súbor nazvaný `birds.js` s takýmto obsahom:

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.send('Birds home page');
});
// define the about route
router.get('/about', function(req, res) {
  res.send('About birds');
});

module.exports = router;
</code>
</pre>

Následne načítajte tento router modul do aplikácie:

<pre>
<code class="language-javascript" translate="no">
var birds = require('./birds');
...
app.use('/birds', birds);
</code>
</pre>

Aplikácia bude teraz schopná obslúžiť prichádzajúce požiadavky na ceste `/birds` a `/birds/about`, a taktiež vyvolať `timeLog` middleware funkciu, ktorá je špecifická pre tento route.
