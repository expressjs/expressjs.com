---
layout: page
title: Prechod na Express 4
menu: guide
lang: sk
---
<!---
 Copyright (c) 2016 StrongLoop, IBM, and Express Contributors
 License: MIT
-->

# Prechod na Express 4

<h2 id="overview">Overview</h2>

Express 4 prináša zlomové zmeny oproti Express 3. To znamená, že existujúce Express 3 aplikácie nebudú fungovať po update verzie Express a jej dependencií.

Tento článok pokrýva:

<ul class="doclist">
  <li><a href="#changes">Zmeny v Express 4.</a></li>
  <li><a href="#example-migration">Príklad</a> migrácie Express 3 aplikácie na Express 4.</li>
  <li><a href="#app-gen">Prechod na Express 4 app generátor.</a></li>
</ul>

<h2 id="changes">Zmeny v Express 4</h2>

Express 4 prináša niekoĺko podstatných zmien:

<ul class="doclist">
  <li><a href="#core-changes">Zmeny Express jadra a middleware systému.</a> Boli odstránené závislosti na Connect module a vstavaných middleware-och, takže ich budete musieť pridať sami.
  </li>
  <li><a href="#routing">Zmeny v routing systéme.</a></li>
  <li><a href="#other-changes">Ďalšie rôzne zmeny.</a></li>
</ul>

Pozrite sa taktiež na:

* [New features in 4.x.](https://github.com/expressjs/express/wiki/New-features-in-4.x)
* [Migrating from 3.x to 4.x.](https://github.com/expressjs/express/wiki/Migrating-from-3.x-to-4.x)

<h3 id="core-changes">
Zmeny Express jadra a middleware systému
</h3>

Express 4 už nie je závislý na Connect a z jeho jadra boli odstránené všetky vstavané middleware funkcie, okrem `express.static` funkcie. To znamená, že Express je teraz nezávislým routing a middleware webovým frameworkom a taktiež verzionovanie Express a jeho releasy nie sú ovplyvnené updatami middlewarov.

Terazm bez vstavaných middlewarov, musíte explicitne pridať všetky middleware funkcie, ktoré vaša aplikácia potrebuje k svojmu fungovaniu. Jednoducho pokračujte podľa nasledujúcich krokov:

1. Nainštalujte požadovaný modul: `npm install --save <module-name>`
2. Pridajte vo vašej aplikácii require na daný modul: `require('module-name')`
3. Použite modul podľa jeho dokumentácie: `app.use( ... )`

Nasledujúca tabuľka obsahuje zoznam Express 3 middlewarov a ich varianty v Express 4.

<table class="doctable" border="1">
<tr><th>Express 3</th><th>Express 4</th></tr>
<tr><td><code>express.bodyParser</code></td>
<td><a href="https://github.com/expressjs/body-parser">body-parser</a> +
<a href="https://github.com/expressjs/multer">multer</a></td></tr>
<tr><td><code>express.compress</code></td>
<td><a href="https://github.com/expressjs/compression">compression</a></td></tr>
<tr><td><code>express.cookieSession</code></td>
<td><a href="https://github.com/expressjs/cookie-session">cookie-session</a></td></tr>
<tr><td><code>express.cookieParser</code></td>
<td><a href="https://github.com/expressjs/cookie-parser">cookie-parser</a></td></tr>
<tr><td><code>express.logger</code></td>
<td><a href="https://github.com/expressjs/morgan">morgan</a></td></tr>
<tr><td><code>express.session</code></td>
<td><a href="https://github.com/expressjs/session">express-session</a></td></tr>
<tr><td><code>express.favicon</code></td>
<td><a href="https://github.com/expressjs/serve-favicon">serve-favicon</a></td></tr>
<tr><td><code>express.responseTime</code></td>
<td><a href="https://github.com/expressjs/response-time">response-time</a></td></tr>
<tr><td><code>express.errorHandler</code></td>
<td><a href="https://github.com/expressjs/errorhandler">errorhandler</a></td></tr>
<tr><td><code>express.methodOverride</code></td>
<td><a href="https://github.com/expressjs/method-override">method-override</a></td></tr>
<tr><td><code>express.timeout</code></td>
<td><a href="https://github.com/expressjs/timeout">connect-timeout</a></td></tr>
<tr><td><code>express.vhost</code></td>
<td><a href="https://github.com/expressjs/vhost">vhost</a></td></tr>
<tr><td><code>express.csrf</code></td>
<td><a href="https://github.com/expressjs/csurf">csurf</a></td></tr>
<tr><td><code>express.directory</code></td>
<td><a href="https://github.com/expressjs/serve-index">serve-index</a></td></tr>
<tr><td><code>express.static</code></td>
<td><a href="https://github.com/expressjs/serve-static">serve-static</a></td></tr>
</table>

Tu je [kompletný zoznam](https://github.com/senchalabs/connect#middleware) Express 4 middlewarov.

Vo väčšine prípadov môžete jednoducho nahradiť starý Express 3 middleware jeho Express 4 variantou. Pre viac informácií si pozrite dokumentáciu daného modulu na Github-e.

<h4 id="app-use"><code>app.use</code> príjma parameter</h4>

Vo verzii 4 môžete použiť voliteľný parameter k definovaniu path-u, kedy sa má middleware funkcia načítať a následne prečítať hodnotu parametra z route handlera.
Napr.:

<pre>
<code class="language-javascript" translate="no">
app.use('/book/:id', function(req, res, next) {
  console.log('ID:', req.params.id);
  next();
});
</code>
</pre>
<h3 id="routing">
Routing systém
</h3>

Aplikácia odteraz explicitne načíta routing middleware, takže už sa viac nemusíte starať o to, v akom poradí bude ktorý middleware načítaný s ohľadom na `router` middleware.

Spôsob, akým definujete route sa nezmenil, ale samotný routing systém má dve nové features k jeho lepšej organizácii:

{: .doclist }
* Nová metóda, `app.route()` slúži na vytvorenie zreťaziteľných route handlerov pre daný route path (cestu).
* Nová trieda, `express.Router`, slúži na vytvorenie modulárnych, pripojiteľných route handlerov.

<h4 id="app-route"><code>app.route()</code> metóda</h4>

Nová metóda `app.route()` vám umožňuje vytvárať zreťaziteľné route handlery pre daný route path (cestu). Pretože je path (cesta) špecifikovaný na jednom mieste, tvorba takýchto modulárnych routes je užitočná, kedže znižuje redundanciu a možné preklepy. Pre viac informácií ohľadom route sa pozrite na [`Router()` dokumentáciu](/{{ page.lang }}/4x/api.html#router).

Tu je príklad zreťazených route handlerov definovaných pomocou `app.route()` funkcie.

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

<h4 id="express-router"><code>express.Router</code> trieda</h4>

Ďalšou novou feature, ktorá napomáha k lepšej organizácii routes, je nová trieda `express.Router`, ktorú môžete použiť k tvorbe modulárnych, pripojiteľných route handlerov. `Router` inštancia je kompletný middleware routing systém; z tohto dôvodu je často označovaná aj ako "mini-app".

Nasledujúci príklad vytvára router ako modul, načítava v ňom middleware, definuje niekoľko routes a pripája tento router na path v hlavnej aplikácii.

Napr., vytvorte v priečinku vašej aplikácie router súbor s názvom `birds.js` s takýmto obsahom:

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var router = express.Router();

// middleware specific to this router
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

Potom tento router načítajte vo vašej aplikácii:

<pre>
<code class="language-javascript" translate="no">
var birds = require('./birds');
...
app.use('/birds', birds);
</code>
</pre>

Aplikácia bude odteraz schopná obslúžiť requesty na path-och `/birds` a
`/birds/about` a zavolá `timeLog` middleware, ktorý je špecifický pre tento route.

<h3 id="other-changes">
Ostatné zmeny
</h3>

Nasledujúca tabuľka obsahuje zoznam drobných, ale dôležitých zmien v Express 4:

<table class="doctable" border="1">
<tr>
<th>Objekt</th>
<th>Popis</th>
</tr>
<tr>
<td>Node.js</td>
<td>Express 4 si vyžaduje Node.js 0.10.x a vyšší a už nepodporuje Node.js 0.8.x.</td>
</tr>
<tr>
<td markdown="1">
`http.createServer()`
</td>
<td markdown="1">
`http` modul už nie je potrebný, pokiaľ s ním nepotrebujete priamo pracovať (socket.io/SPDY/HTTPS). Aplikáciu dokážete naštartovať pomocou `app.listen()` funkcie.
</td>
</tr>
<tr>
<td markdown="1">
`app.configure()`
</td>
<td markdown="1">
Funkcia `app.configure()` bola odstránená. Pre detekciu environment nastavení a nastavenia aplikácie použite `process.env.NODE_ENV` alebo funkciu
`app.get('env')`.
</td>
</tr>
<tr>
<td markdown="1">
`json spaces`
</td>
<td markdown="1">
Aplikačná property `json spaces` je defaultne v Express 4 vypnutá.
</td>
</tr>
<tr>
<td markdown="1">
`req.accepted()`
</td>
<td markdown="1">
Používajte `req.accepts()`, `req.acceptsEncodings()`,
`req.acceptsCharsets()` a `req.acceptsLanguages()`.
</td>
</tr>
<tr>
<td markdown="1">
`res.location()`
</td>
<td markdown="1">
Už viac nevyhodnocuje relatívne URLky.
</td>
</tr>
<tr>
<td markdown="1">
`req.params`
</td>
<td markdown="1">
Bolo pôvodne pole, teraz je objektom.
</td>
</tr>
<tr>
<td markdown="1">
`res.locals`
</td>
<td markdown="1">
Bola pôvodne funkcia, teraz je objekt.
</td>
</tr>
<tr>
<td markdown="1">
`res.headerSent`
</td>
<td markdown="1">
Zmenená na `res.headersSent`.
</td>
</tr>
<tr>
<td markdown="1">
`app.route`
</td>
<td markdown="1">
Teraz dostupná ako `app.mountpath`.
</td>
</tr>
<tr>
<td markdown="1">
`res.on('header')`
</td>
<td markdown="1">
Zmazané.
</td>
</tr>
<tr>
<td markdown="1">
`res.charset`
</td>
<td markdown="1">
Zmazané.
</td>
</tr>
<tr>
<td markdown="1">
`res.setHeader('Set-Cookie', val)`
</td>
<td markdown="1">
Funkcionalita je odteraz obmedzená na nastavenie základnej hodnoty cookie. Pre pridanú funkcionalitu používajte `res.cookie()`.
</td>
</tr>
</table>

<h2 id="example-migration">Príklad migrácie aplikácie</h2>

Tu je príklad migrácie Express 3 aplikácie na Express 4.
Súbory, ktoré vás môžu zaujímať sú `app.js` a `package.json`.

<h3 id="">
Applikácia vo verzii 3
</h3>

<h4 id=""><code>app.js</code></h4>

Majme takúto Express v.3 aplikáciu s takýmto `app.js` súborom:

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.methodOverride());
app.use(express.session({ secret: 'your secret here' }));
app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
</code>
</pre>

<h4 id=""><code>package.json</code></h4>

Sprievodný `package.json` pre verziu 3 by vyzeral nejak takto:

<pre>
<code class="language-javascript" translate="no">
{
  "name": "application-name",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "3.12.0",
    "pug": "*"
  }
}
</code>
</pre>

<h3 id="">
Proces
</h3>

Proces migrácie začnite nainštalovaním všetkých potrebných middlewarov pre vašu Express 4 aplikáciu a updatom Express a Pug na ich prislúchajúce najnovšie verzie nasledujúcim príkazom:

```console
$ npm install serve-favicon morgan method-override express-session body-parser multer errorhandler express@latest pug@latest --save
```

V `app.js` vykonajte tieto zmeny:

1. Vstavané Express middleware funkcie `express.favicon`,
    `express.logger`, `express.methodOverride`,
    `express.session`, `express.bodyParser` a
    `express.errorHandler` už nie sú dostupné na
    `express` objekte. Musíte nainštalovať a načítať ich prislúchajúce alternatívy v aplikácii manuálne.

2. Už viac nepotrebujete načítať `app.router` funkciu.
    Nieje validným Express 4 app objektom, preto zmažte nasledujúci kód
    `app.use(app.router);`.

3. Uistite sa, že middleware funkcie sú načítané v správnom poradí - načítajte `errorHandler` až po načítaní app routes.

<h3 id="">Aplikácia vo verzii 4</h3>

<h4 id=""><code>package.json</code></h4>

Spustením kódu vyššie, `npm` príkaz updatne `package.json` nasledovne:

<pre>
<code class="language-javascript" translate="no">
{
  "name": "application-name",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "body-parser": "^1.5.2",
    "errorhandler": "^1.1.1",
    "express": "^4.8.0",
    "express-session": "^1.7.2",
    "pug": "^2.0.0-beta6",
    "method-override": "^2.1.2",
    "morgan": "^1.2.2",
    "multer": "^0.1.3",
    "serve-favicon": "^2.0.1"
  }
}
</code>
</pre>

<h4 id=""><code>app.js</code></h4>

Potom zmažte nesprávny kód, načítajte potrebné middlewary a vykonajte ďalšie potrebné zmeny. Súbor `app.js` bude potom vyzerať takto:

<pre>
<code class="language-javascript" translate="no">
var http = require('http');
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.get('/users', user.list);

// error handling middleware should be loaded after the loading the routes
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
</code>
</pre>

<div class="doc-box doc-info" markdown="1">
Pokiaľ nepotrebujete priamo pracovať s `http` modulom (socket.io/SPDY/HTTPS), nie je nutné ho načítať a aplikáciu môžete jednoducho naštartovať týmto spôsobom:
<pre>
<code class="language-js">app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});</code>
</pre>
</div>

<h3 id="">Spustite aplikáciu</h3>

Proces migrácie je kompletný a aplikácia je teraz Express 4 aplikáciou. Pre overenie spustite aplikáciu pomocou nasledujúceho príkazu:

```console
$ node .
```

Načítajte v prehliadači [http://localhost:3000](http://localhost:3000)
  a pozrite si domovskú stránku aplikácie vyrendrovanú pomocou Express 4.

<h2 id="app-gen">Prechod na Express 4 app generátor</h2>

Tento command-line tool slúžiaci na generovanie Express aplikácie je stále
  `express`, ale k tomu, aby ste vykonali upgrade na novú verziu musíte najprv pôvodný Express 3 app generátor odinštalovať a potom nainštalovať nový `express-generator`.

<h3 id="">Inštalácia</h3>

Ak už máte Express 3 app generátor na vašom systéme nainštalovaný, musíte ho najskôr odinštalovať:

```console
$ npm uninstall -g express
```

V závislosti od toho, ako sú nakonfigurované vaše oprávnenia k súborom a priečinkom,
môže byť potrebné spustiť tento príkaz pomocou `sudo`.

Teraz nainštalujte nový generátor:

```console
$ npm install -g express-generator
```

V závislosti od toho, ako sú nakonfigurované vaše oprávnenia k súborom a priečinkom,
môže byť potrebné spustiť tento príkaz pomocou `sudo`.

Teraz je príkaz `express` aktualizovaný na vašom systéme na
Express 4 generátor.

<h3 id="">Zmeny app generátora</h3>

Prepínače a použitia príkazu zostali prevažne rovnaké, okrem nasledujúcich výnimiek:

{: .doclist }
* Odstránený prepínač `--sessions`.
* Odstránený prepínač `--jshtml`.
* Pridaný prepínač `--hogan` pre podporu [Hogan.js](http://twitter.github.io/hogan.js/).

<h3 id="">Príklad</h3>

K vytvoreniu Express 4 aplikácie spustite nasledujúci príkaz:

```console
$ express app4
```

Ak sa pozriete na obsah `app4/app.js` súboru, všimnete si, že všetky middleware funkcie (okrem `express.static`), ktoré sú potrebné pre aplikáciu, sú načítané ako samostatné, nezávislé moduly a `router` middleware už nie je v aplikácii explicitne načítaný.

Taktiež si všimnite, že súbor `app.js` je odteraz Node.js modulom, v porovnaní so standalone aplikáciou vygenerovanou starým generátorom.

Po nainštalovaní závislostí spustite aplikáciu pomocou nasledujúceho príkazu:

```console
$ npm start
```

Ak sa pozriete na npm start skript v `package.json` súbore,
všimnete si, že aktuálny príkaz pre spustenie aplikácie je
`node ./bin/www`, ktorý bol v Express 3 pôvodne `node app.js`.

Pretože súbor `app.js`, ktorý bol vygenerovaný Express 4 generátorom je odteraz Node.js modul,
už nemôže byť viacej spustený nezávisle ako aplikácia (pokiaľ nezmeníte kód).
Modul musí byť načítaný a spustený ako Node.js súbor. Node.js súbor je v tomto prípade`./bin/www`.

Priečinok `bin` ani bezpríponový súbor `www` nie sú povinné k vytvoreniu ani spusteniu aplikácie.
Sú len návrhom vyrobeným generátorom, takže ich môzete zmeniť podľa vašich potrieb.

Ak sa chcete zbaviť `www` priečinka a ponechať to v starom "Express 3 formáte",
zmažte riadok `module.exports = app;` na konci `app.js` súboru a namiesto neho vložte nasledujúci kód:

<pre>
<code class="language-javascript" translate="no">
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
</code>
</pre>

Uistite sa, že ste načítali `debug` modul, v hornej časti vášho `app.js` súboru, použitím nasledujúceho kódu:

<pre>
<code class="language-javascript" translate="no">
var debug = require('debug')('app4');
</code>
</pre>

Ďalej zmeňte v súbore `package.json` riadok `"start": "node ./bin/www"`  na `"start": "node app.js"`.

Týmto ste presunuli funkcionalitu `./bin/www` späť do `app.js`. Táto zmena sa neodporúča, ale toto cvičenie vám pomôže porozumieť ako `./bin/www` súbor pracuje a prečo `app.js` už viac nie je možné samostatne spustiť.
