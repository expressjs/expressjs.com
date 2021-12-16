---
layout: page
title: Migrazione a Express 4
menu: guide
lang: it
---

# Passaggio a Express 4

<h2 id="overview">Panoramica</h2>

Express 4 è stato modificato rispetto a Express 3. Ciò significa che un'applicazione Express 3 esistente non funzionerà se si aggiornano le dipendenze della versione Express.

Argomenti di questo articolo:

<ul class="doclist">
  <li><a href="#changes">Modifiche in Express 4.</a></li>
  <li><a href="#example-migration">Un esempio</a> di migrazione di un'applicazione Express 3 a Express 4.</li>
  <li><a href="#app-gen">Aggiornamento al programma di creazione dell'applicazione Express 4.</a></li>
</ul>

<h2 id="changes">Modifiche in Express 4</h2>

Sono state apportate diverse modifiche importanti alla versione Express 4:

<ul class="doclist">
  <li><a href="#core-changes">Modifiche al sistema middleware e al core di Express.</a> Le dipendenze su Connect e il middleware integrato sono state rimosse, pertanto è necessario aggiungere il middleware manualmente.
  </li>
  <li><a href="#routing">Modifiche al sistema di routing.</a></li>
  <li><a href="#other-changes">Altre modifiche.</a></li>
</ul>

Consultare inoltre:

* [Nuove funzioni in 4.x.](https://github.com/expressjs/express/wiki/New-features-in-4.x)
* [Migrazione da 3.x a 4.x.](https://github.com/expressjs/express/wiki/Migrating-from-3.x-to-4.x)

<h3 id="core-changes">
Modifiche al sistema middleware e al core di Express
</h3>

Express 4 non dipende più da Connect e non ha più il middleware integrato nel core,
ad eccezione della funzione `express.static`. Ciò significa che ora
Express è un framework web middleware e routing indipendente
i release e le versioni di Express non vengono influenzate dagli aggiornamenti middleware.

Senza un middleware integrato, è necessario aggiungere esplicitamente tutto il
middleware richiesto per eseguire l'applicazione. Seguire semplicemente questi passaggi:

1. Installare il modulo: `npm install --save <module-name>`
2. Nell'applicazione, richiedere il modulo: `require('module-name')`
3. Utilizzare il modulo relativamente alla propria documentazione: `app.use( ... )`

La seguente tabella elenca il middleware Express 3 e le relative controparti in Express 4.

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

Segue l'[elenco completo](https://github.com/senchalabs/connect#middleware) di middleware Express 4.

In molti casi, è possibile semplicemente sostituire il middleware della versione 3 meno recente con la relativa controparte
Express 4. Per dettagli, consultare la documentazione del modulo in
GitHub.

<h4 id="app-use"><code>app.use</code> accetta i parametri</h4>

Nella versione 4 è possibile utilizzare un parametro di variabile per definire il percorso in cui vengono caricate le funzioni middleware, quindi leggere il valore del parametro dal programma di gestione route.
Ad esempio:

<pre>
<code class="language-javascript" translate="no">
app.use('/book/:id', function(req, res, next) {
  console.log('ID:', req.params.id);
  next();
});
</code>
</pre>
<h3 id="routing">
Il sistema di routing
</h3>

Le applicazioni ora sono in grado di caricare il middleware di routing, pertanto non sarà più necessario
pensare all'ordine in cui è caricato il middleware rispetto al middleware
`router`.

Il modo in cui viene definita la route non è cambiato ma il sistema di routing dispone di due nuove
funzioni utili per organizzare le route:

{: .doclist }
* Un nuovo metodo, `app.route()`, per creare handler di route a catena per un percorso route.
* Un nuova classe, `express.Router`, per creare handler di route assemblabili in modo modulare.

<h4 id="app-route">Metodo <code>app.route()</code></h4>

Il nuovo metodo `app.route()` consente di creare handler di route a catena
per un percorso route. Poiché il percorso è specificato in una singola ubicazione, la creazione di route modulari è utile, poiché riduce le possibilità di riscontrare errori tipografici e di ridondanza. Per ulteriori informazioni
sulle route, consultare la documentazione [`Router()`](/{{ page.lang }}/4x/api.html#router).

Segue un esempio di handler di route a catena definiti utilizzando la funzione `app.route()`.

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

<h4 id="express-router">Classe <code>express.Router</code></h4>

L'altra funzione che risulta utile per organizzare le route in una nuova classe,
`express.Router`, che è possibile utilizzare per creare handler di route assemblabili in modo modulare. Un'istanza `Router` è un sistema di routing e middleware completo;
per questo motivo spesso viene fatto riferimento a questo come "mini-app".

Nel seguente esempio si crea un router come modulo, si carica il middleware all'interno di esso,
si definiscono alcune route e si caricano su un percorso nell'applicazione principale.

Ad esempio, creare un file router denominato `birds.js` nella directory dell'applicazione,
con i seguenti contenuti:

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

Successivamente, caricare il modulo router nell'applicazione:

<pre>
<code class="language-javascript" translate="no">
var birds = require('./birds');
...
app.use('/birds', birds);
</code>
</pre>

L'applicazione sarà ora in grado di gestire le richieste per i percorsi `/birds` e
`/birds/about` e chiamerà il middleware `timeLog`
specifico per la route.

<h3 id="other-changes">
Altre modifiche
</h3>

La seguente tabella elenca altre piccole ma importanti modifiche applicate a Express 4:

<table class="doctable" border="1">
<tr>
<th>Oggetto</th>
<th>Descrizione</th>
</tr>
<tr>
<td>Node.js</td>
<td>Express 4 richiede Node.js 0.10.x o versione successiva e non esiste più supporto per
Node.js 0.8.x.</td>
</tr>
<tr>
<td markdown="1">
`http.createServer()`
</td>
<td markdown="1">
Il modulo `http` non è più necessario, a meno che non sia necessario utilizzarlo (socket.io/SPDY/HTTPS). L'applicazione può essere avviata utilizzando
la funzione `app.listen()`.
</td>
</tr>
<tr>
<td markdown="1">
`app.configure()`
</td>
<td markdown="1">
La funzione `app.configure()` è stata rimossa.  Utilizzare la funzione
`process.env.NODE_ENV` o
`app.get('env')` per rilevare l'ambiente e configurare l'applicazione in modo appropriato.
</td>
</tr>
<tr>
<td markdown="1">
`json spaces`
</td>
<td markdown="1">
La proprietà dell'applicazione `json spaces` è disattivata per impostazione predefinita in Express 4.
</td>
</tr>
<tr>
<td markdown="1">
`req.accepted()`
</td>
<td markdown="1">
Utilizzare `req.accepts()`, `req.acceptsEncodings()`,
`req.acceptsCharsets()` e `req.acceptsLanguages()`.
</td>
</tr>
<tr>
<td markdown="1">
`res.location()`
</td>
<td markdown="1">
Non risolve più le URL relative.
</td>
</tr>
<tr>
<td markdown="1">
`req.params`
</td>
<td markdown="1">
Era un array; ora è un oggetto.
</td>
</tr>
<tr>
<td markdown="1">
`res.locals`
</td>
<td markdown="1">
Era una funzione; ora è un oggetto.
</td>
</tr>
<tr>
<td markdown="1">
`res.headerSent`
</td>
<td markdown="1">
Modificato in `res.headersSent`.
</td>
</tr>
<tr>
<td markdown="1">
`app.route`
</td>
<td markdown="1">
Ora disponibile come `app.mountpath`.
</td>
</tr>
<tr>
<td markdown="1">
`res.on('header')`
</td>
<td markdown="1">
Rimosso.
</td>
</tr>
<tr>
<td markdown="1">
`res.charset`
</td>
<td markdown="1">
Rimosso.
</td>
</tr>
<tr>
<td markdown="1">
`res.setHeader('Set-Cookie', val)`
</td>
<td markdown="1">
La funzionalità ora è limitata alla sola impostazione del valore cookie di base. Utilizzare
`res.cookie()` per aggiungere altre funzionalità.
</td>
</tr>
</table>

<h2 id="example-migration">Esempio di migrazione dell'applicazione</h2>

Segue un esempio di migrazione dell'applicazione da Express 3 a Express 4.
I file da considerare sono `app.js` e `package.json`.

<h3 id="">
Applicazione con la versione 3
</h3>

<h4 id=""><code>app.js</code></h4>

Prendere in considerazione l'applicazione Express v.3 con il seguente file `app.js`:

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

Il file `package.json` della versione 3 associata deve
apparire come segue:

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
Processo
</h3>

Iniziare il processo di migrazione installando il middleware richiesto per l'applicazione
Express 4 e aggiornando Express e Pug alla versione aggiornata
con il seguente comando:

```console
$ npm install serve-favicon morgan method-override express-session body-parser multer errorhandler express@latest pug@latest --save
```

Apportare le seguenti modifiche a `app.js`:

1. Le funzioni middleware di Express integrate `express.favicon`,
    `express.logger`, `express.methodOverride`,
    `express.session`, `express.bodyParser` e
    `express.errorHandler` non sono più disponibili nell'oggetto
    `express`.  È necessario installare le funzioni alternative
    manualmente e caricarle sull'applicazione.

2. Non è più necessario caricare la funzione `app.router`.
    Non è un oggetto applicazione Express 4 valido, pertanto rimuovere il codice
    `app.use(app.router);`.

3. Assicurarsi che le funzioni middleware siano state caricate nell'ordine corretto - caricare `errorHandler` dopo aver caricato le route dell'applicazione.

<h3 id="">Applicazione con la versione 4</h3>

<h4 id=""><code>package.json</code></h4>

L'esecuzione del comando `npm` aggiornerà `package.json` come segue:

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

Successivamente, rimuovere il codice non valido, caricare il middleware richiesto e apportare le modifiche
necessarie. Il file `app.js` apparirà come segue:

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
A meno che non sia necessario gestire direttamente il modulo `http` (socket.io/SPDY/HTTPS), il relativo caricamento non è richiesto e l'applicazione può essere avviata semplicemente come segue:
<pre>
<code class="language-js" translate="no">app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});</code>
</pre>
</div>

<h3 id="">Eseguire l'applicazione</h3>

Il processo di migrazione è stato completato e ora l'applicazione
è stata aggiornata a Express 4. Per confermare, avviare l'applicazione utilizzando il seguente comando:

```console
$ node .
```

Caricare [http://localhost:3000](http://localhost:3000)
  e visualizzare la home page sottoposta a rendering da Express 4.

<h2 id="app-gen">Aggiornamento al programma di creazione dell'applicazione Express 4</h2>

Lo strumento della riga comandi per generare un'applicazione Express è sempre
  `express` ma per effettuare l'aggiornamento alla nuova versione è necessario disinstallare
  il programma di creazione dell'applicazione di Express 3 e successivamente installare il nuovo
  `express-generator`.

<h3 id="">Installazione</h3>

Se il programma di creazione dell'applicazione di Express 3 è già installato sul sistema,
è necessario disinstallarlo:

```console
$ npm uninstall -g express
```

A seconda di come sono configurati i privilegi del file e della directory,
potrebbe essere necessario eseguire questo comando con `sudo`.

Ora, installare il nuovo programma di creazione:

```console
$ npm install -g express-generator
```

A seconda di come sono configurati i privilegi del file e della directory,
potrebbe essere necessario eseguire questo comando con `sudo`.

Ora, il comando `express` sul sistema è aggiornato al programma di creazione
di Express 4.

<h3 id="">Modifiche al programma di creazione dell'applicazione </h3>

L'utilizzo e le opzioni del comando sono rimaste quasi gli stessi, con le seguenti eccezioni:

{: .doclist }
* È stata rimossa l'opzione `--sessions`.
* È stata rimossa l'opzione `--jshtml`.
* È stata aggiunta l'opzione `--hogan` per supportare [Hogan.js](http://twitter.github.io/hogan.js/).

<h3 id="">Esempio</h3>

Eseguire il seguente comando per creare un'applicazione Express 4:

```console
$ express app4
```

Se si visualizzano i contenuti del file `app4/app.js`, si noterà che tutte le funzioni
middleware (ad eccezione di `express.static`) richieste per l'applicazione,
sono caricate come moduli indipendenti e il middleware `router`
non viene più caricato in modo esplicito sull'applicazione.

Si noterà inoltre che il file `app.js` è ora un modulo Node.js, diversamente dall'applicazione autonoma che era stata generate dal vecchio programma di creazione.

Dopo aver installato le dipendenze, avviare l'applicazione utilizzando il seguente comando:

```console
$ npm start
```

Se si visualizza lo script di avvio npm nel file `package.json`,
si noterà che il comando effettivo che avvia l'applicazione è
`node ./bin/www`, il quale era `node app.js`
in Express 3.

Poiché il file `app.js` generato dal programma di creazione di Express 4
è ora un modulo Node.js, non può essere più avviato individualmente come un'applicazione
(a meno che non venga modificato il codice). Il modulo deve essere caricato in un file Node.js
e avviato tramite il file Node.js. Il file Node.js è `./bin/www`
in questo caso.

La directory `bin` e il file senza estensione `www`
non sono obbligatori per la creazione di un'applicazione Express o per avviare l'applicazione. Sono solo consigli
creati dal programma di creazione, pertanto è possibile modificarli a seconda delle
necessità.

Per rimuovere la directory `www` e conservare le cose "come farebbe Express 3",
cancellare la riga in cui viene riportata la dicitura `module.exports = app;` alla fine del file
`app.js`, quindi incollare il seguente codice al proprio posto:

<pre>
<code class="language-javascript" translate="no">
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
</code>
</pre>

Assicurarsi di caricare il modulo `debug` all'inizio del file `app.js` utilizzando il seguente codice:

<pre>
<code class="language-javascript" translate="no">
var debug = require('debug')('app4');
</code>
</pre>

Successivamente, modificare `"start": "node ./bin/www"` nel file `package.json` in `"start": "node app.js"`.

È stata spostata la funzionalità di `./bin/www` di nuovo in
`app.js`.  Questa modifica non è consigliata, ma questa prova consente di comprendere in che modo funziona
il file `./bin/www` e perché il file `app.js`
non si avvia più in modo autonomo.
