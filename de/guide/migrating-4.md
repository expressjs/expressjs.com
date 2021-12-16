---
layout: page
title: Migration auf Express 4
menu: guide
lang: de
---

# Wechsel zu Express 4

<h2 id="overview">Überblick</h2>

Express 4 bietet grundlegende Veränderungen im Vergleich zu Express 3. Das bedeutet, dass eine Express 3-Anwendung nicht funktioniert, wenn Sie die Express-Version in ihren Abhängigkeiten aktualisieren.

In diesem Beitrag werden folgende Themen behandelt:

<ul class="doclist">
  <li><a href="#changes">Änderungen in Express 4</a></li>
  <li><a href="#example-migration">Beispiel</a> für die Migration einer Express 3-Anwendung auf Express 4</li>
  <li><a href="#app-gen">Upgrade auf den Express 4 App Generator</a></li>
</ul>

<h2 id="changes">Änderungen in Express 4</h2>

In Express 4 wurden einige signifikante Änderungen vorgenommen:

<ul class="doclist">
  <li><a href="#core-changes">Änderungen am Express-Core- und Middlewaresystem.</a> Die Abhängigkeiten bei Connect und der integrierten Middleware wurden entfernt. Sie müssen also Middleware selbst hinzufügen. </li>
  <li><a href="#routing">Änderungen am Weiterleitungssystem (Routingsystem).</a></li>
  <li><a href="#other-changes">Weitere Änderungen.</a></li>
</ul>

Siehe hierzu auch:

* [Neue Features/Funktionen in 4.x.](https://github.com/expressjs/express/wiki/New-features-in-4.x)
* [Migration von 3.x auf 4.x.](https://github.com/expressjs/express/wiki/Migrating-from-3.x-to-4.x)

<h3 id="core-changes">
Änderungen am Express-Core- und Middlewaresystem</h3>

In Express 4 bestehen keine Abhängigkeiten mehr zu Connect. Alle integrierten Middlewarefunktionen werden aus dem Core entfernt. Ausgenommen hiervon ist die Funktion `express.static`. Das bedeutet, dass Express nun ein unabhängiges Routing- und Middleware-Web-Framework ist und Express-Versionierung und -Releases von Middleware-Updates nicht betroffen sind.

Ohne integrierte Middleware müssen Sie explizit alle Middlewarefunktionen hinzufügen, die für die Ausführung Ihrer Anwendung erforderlich sind. Befolgen Sie einfach diese Schritte:

1. Installieren des Moduls: `npm install --save <modulname>`
2. Anfordern des Moduls in Ihrer Anwendung: `require('modulname')`
3. Verwendung des Moduls gemäß Dokumentation: `app.use( ... )`

In der folgenden Tabelle sind Express 3-Middlewarefunktionen und deren Entsprechungen in Express 4 aufgelistet.

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

Hier finden Sie die [komplette Liste](https://github.com/senchalabs/connect#middleware) der Express 4-Middleware.

In den meisten Fällen können Sie einfach nur die Middleware der alten Version 3 durch deren Entsprechung in Express 4 ersetzen. Details hierzu finden Sie in der modulspezifischen Dokumentation in GitHub.

<h4 id="app-use"><code>app.use</code> akzeptiert Parameter. </h4>

In Version 4 können Sie über einen Variablenparameter den Pfad definieren, in den Middlewarefunktionen geladen werden. Dann können Sie den Wert des Parameters aus dem Routenhandler laden. Beispiel:

<pre>
<code class="language-javascript" translate="no">
app.use('/book/:id', function(req, res, next) {
  console.log('ID:', req.params.id);
  next();
});
</code>
</pre>
<h3 id="routing">
Das Routingsystem
</h3>

Anwendungen laden nun implizit Routing-Middleware. Sie müssen sich also keine Gedanken mehr über die Reihenfolge machen, in der die Middleware in Bezug auf die `router`-Middleware geladen wird.

Die Art und Weise, wie Weiterleitungen (Routen) definiert werden, bleibt unverändert. Das Routingsystem verfügt jedoch über zwei neue Funktionen, die beim Organisieren Ihrer Weiterleitungen helfen:

{: .doclist }
* Die neue Methode `app.route()` zum Erstellen verkettbarer Routenhandler für einen Weiterleitungspfad
* Die neue Klasse `express.Router` zum Erstellen modular einbindbarer Routenhandler

<h4 id="app-route">Die Methode <code>app.route()</code></h4>

Die neue Methode `app.route()` hilft beim Erstellen verkettbarer Routenhandler für einen Weiterleitungspfad. Da der Pfad an einer einzelnen Position angegeben wird, ist das Erstellen modularer Weiterleitungen hilfreich, da Redundanzen und Schreibfehler reduziert werden. Weitere Informationen zu Weiterleitungen finden Sie in der Dokumentation zu [`Router()`](/{{ page.lang }}/4x/api.html#router).

Dies ist ein Beispiel für verkettete Routenhandler, die mit der Funktion `app.route()` definiert werden.

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

<h4 id="express-router">Die Klasse <code>express.Router</code></h4>

Eine weitere Funktion, die beim Organisieren von Weiterleitungen hilft, ist die neue Klasse `express.Router`. Über diese Klasse können Sie modular einbindbare Routenhandler erstellen. Eine `Router`-Instanz ist ein vollständiges Middleware- und Routingsystem. Aus diesem Grund wird diese Instanz oft auch als "Mini-App" bezeichnet.

Im folgenden Beispiel wird ein Router als Modul erstellt, Middleware in das Modul geladen, es werden Weiterleitungen definiert und das Modul letztendlich in einen Pfad in der Hauptanwendung eingebunden.

Beispiel: Erstellen Sie eine Routerdatei namens `birds.js` mit dem folgenden Inhalt im Anwendungsverzeichnis:

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

Laden Sie dann das Routermodul in die Anwendung:

<pre>
<code class="language-javascript" translate="no">
var birds = require('./birds');
...
app.use('/birds', birds);
</code>
</pre>

Die Anwendung kann nun Anforderungen an die Pfade `/birds` und `/birds/about` bearbeiten und ruft die Middleware `timeLog` auf, die speziell für diese Weiterleitung bestimmt ist.

<h3 id="other-changes">
Weitere Änderungen </h3>

In der folgenden Tabelle sind andere kleinere, aber trotzdem wichtige Änderungen in Express 4 aufgeführt:

<table class="doctable" border="1">
<tr>
<th>Objekt</th>
<th>Beschreibung</th>
</tr>
<tr>
<td>Node.js
</td>
<td>Express 4 erfordert Node.js 0.10.x oder höher und unterstützt nicht mehr Node.js 0.8.x.
</td>
</tr>
<tr>
<td markdown="1">
`http.createServer()`
</td>
<td markdown="1">
Das Modul `http` wird nicht mehr benötigt, es sei denn, Sie müssen direkt mit dem Modul arbeiten (socket.io/SPDY/HTTPS). Die Anwendung kann mithilfe der Funktion `app.listen()` gestartet werden.
</td>
</tr>
<tr>
<td markdown="1">
`app.configure()`
</td>
<td markdown="1">
Die Funktion `app.configure()` wurde entfernt. Verwenden Sie die Funktion `process.env.NODE_ENV` oder `app.get('env')`, um die Umgebung zu erkennen und die Anwendung entsprechend zu konfigurieren.
</td>
</tr>
<tr>
<td markdown="1">
`json spaces`
</td>
<td markdown="1">
Die Anwendungseigenschaft `json spaces` ist in Express 4 standardmäßig inaktiviert.
</td>
</tr>
<tr>
<td markdown="1">
`req.accepted()`
</td>
<td markdown="1">
Verwenden Sie `req.accepts()`, `req.acceptsEncodings()`, `req.acceptsCharsets()` und `req.acceptsLanguages()`.
</td>
</tr>
<tr>
<td markdown="1">
`res.location()`
</td>
<td markdown="1">
Löst keine relativen URLs mehr auf.
</td>
</tr>
<tr>
<td markdown="1">
`req.params`
</td>
<td markdown="1">
War bisher ein Array, ist nun ein Objekt.
</td>
</tr>
<tr>
<td markdown="1">
`res.locals`
</td>
<td markdown="1">
War bisher eine Funktion, ist nun ein Objekt.
</td>
</tr>
<tr>
<td markdown="1">
`res.headerSent`
</td>
<td markdown="1">
Geändert in `res.headersSent`.
</td>
</tr>
<tr>
<td markdown="1">
`app.route`
</td>
<td markdown="1">
Nun verfügbar als `app.mountpath`.
</td>
</tr>
<tr>
<td markdown="1">
`res.on('header')`
</td>
<td markdown="1">
Entfernt.
</td>
</tr>
<tr>
<td markdown="1">
`res.charset`
</td>
<td markdown="1">
Entfernt.
</td>
</tr>
<tr>
<td markdown="1">
`res.setHeader('Set-Cookie', val)`
</td>
<td markdown="1">
Die Funktionalität ist nun auf die Einstellung des Basis-Cookiewerts begrenzt. Verwenden Sie `res.cookie()`, um weitere Funktionalität zu erhalten.
</td>
</tr>
</table>

<h2 id="example-migration">Beispiel für eine Anwendungsmigration</h2>

Dies ist ein Beispiel für die Migration einer Express 3-Anwendung auf Express 4. Die dabei interessanten Dateien sind `app.js` und `package.json`.

<h3 id="">
Anwendung der Version 3
</h3>

<h4 id=""><code>app.js</code></h4>

Es wird eine Express v.3-Anwendung mit der folgenden Datei `app.js` angenommen:

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

Die zugehörige `package.json`-Datei der Version 3 sieht in etwa wie folgt aus:

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
Prozess
</h3>

Beginnen Sie den Migrationsprozess mit der Installation der erforderlichen Middleware für die Express 4-Anwendung und der Aktualisierung von Express und Pug auf die aktuellen Versionen. Verwenden Sie hierzu den folgenden Befehl:

```console
$ npm install serve-favicon morgan method-override express-session body-parser multer errorhandler express@latest pug@latest --save
```

Nehmen Sie an `app.js` die folgenden Änderungen vor:

1. Die integrierten Express-Middlewarefunktionen `express.favicon`,
    `express.logger`, `express.methodOverride`,
    `express.session`, `express.bodyParser` und
    `express.errorHandler` sind im Objekt `express` nicht mehr verfügbar. Sie müssen deren Alternativen manuell installieren und in die Anwendung laden.

2. Sie müssen die Funktion `app.router` nicht mehr laden. Sie ist kein gültiges Express 4-Anwendungsobjekt. Entfernen Sie also den Code `app.use(app.router);`.

3. Stellen Sie sicher, dass die Middlewarefunktionen in der richtigen Reihenfolge geladen werden – laden Sie `errorHandler` nach dem Laden der Anwendungsweiterleitungen.

<h3 id="">Anwendung der Version 4 </h3>

<h4 id=""><code>package.json</code></h4>

Durch Ausführung des Befehls `npm` wird `package.json` wie folgt aktualisiert:

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

Entfernen Sie dann ungültigen Code, laden Sie die erforderliche Middleware und nehmen Sie andere Änderungen nach Bedarf vor. Die Datei `app.js` sieht dann wie folgt aus:

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
Wenn Sie nicht direkt mit dem Modul `http` arbeiten müssen (socket.io/SPDY/HTTPS), ist das Laden des Moduls nicht erforderlich. Die Anwendung kann dann einfach wie folgt gestartet werden:
<pre>
<code class="language-js" translate="no">app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
</code>
</pre>
</div>

<h3 id="">Anwendung ausführen</h3>

Der Migrationsprozess ist abgeschlossen und die Anwendung ist nun eine Express 4-Anwendung. Zum Bestätigen starten Sie die Anwendung mit dem folgenden Befehl:

```console
$ node .
```

Laden Sie [http://localhost:3000](http://localhost:3000) und sehen Sie, wie die Homepage von Express 4 wiedergegeben wird.

<h2 id="app-gen">Upgrade auf den Express 4 App Generator</h2>

Das Befehlszeilentool zum Generieren einer Express-Anwendung ist nach wie vor `express`. Für ein Upgrade auf die neue Version müssen Sie jedoch den Express 3 App Generator deinstallieren und dann den neuen Generator `express-generator` installieren.

<h3 id="">Installation</h3>

Wenn der Express 3 App Generator bereits auf Ihrem System installiert ist, müssen Sie diesen deinstallieren:

```console
$ npm uninstall -g express
```

Abhängig davon, wie Ihre Datei- und Verzeichnissberechtigungen konfiguriert sind, müssen Sie diesen Befehl möglicherweise mit `sudo` ausführen.
Installieren Sie nun den neuen Generator:

```console
$ npm install -g express-generator
```

Abhängig davon, wie Ihre Datei- und Verzeichnissberechtigungen konfiguriert sind, müssen Sie diesen Befehl möglicherweise mit `sudo` ausführen.


Nun wird der Befehl `express` auf Ihrem System auf den Express 4 App Generator aktualisiert.

<h3 id="">Änderungen am App Generator </h3>

Befehlsoptionen und -nutzung bleiben größtenteils unverändert. Es gelten jedoch folgende Ausnahmen:

{: .doclist }
* Option `--sessions` wurde entfernt.
* Option `--jshtml` wurde entfernt.
* Option `--hogan` wurde hinzugefügt, um [Hogan.js](http://twitter.github.io/hogan.js/) zu unterstützen.

<h3 id="">Beispiel</h3>

Führen Sie den folgenden Befehl aus, um eine Express 4-Anwendung zu erstellen:

```console
$ express app4
```

Wenn Sie sich den Inhalt der Datei `app4/app.js` ansehen, werden Sie feststellen, dass alle Middlewarefunktionen (außer `express.static`), die für die Anwendung  erforderlich sind, als unabhängige Module geladen werden und die Middleware `router` nicht mehr explizit in die Anwendung geladen wird.

Sie werden auch feststellen, dass die Datei `app.js` nun ein Node.js-Modul ist – im Gegensatz zur eigenständigen Anwendung, die vom bisherigen Generator generiert wurde.

Starten Sie nach der Installation der Abhängigkeiten die Anwendung mit dem folgenden Befehl:

```console
$ npm start
```

Wenn Sie sich das npm-Startscript in der Datei `package.json` näher ansehen, werden Sie feststellen, dass der eigentliche Befehl, der die Anwendung startet, `node ./bin/www` heißt. Dieser Befehl lautete in Express 3 `node app.js`.

Da die Datei `app.js`, die vom Express 4 Generator erstellt wurde, nun ein Node.js-Modul ist, kann dieses nicht mehr wie bisher unabhängig als Anwendung gestartet werden (es sei denn, Sie ändern den Code). Das Modul muss in eine Node.js-Datei geladen und über die Node.js-Datei gestartet werden. Die Node.js-Datei ist in diesem Fall `./bin/www`.

Weder das Verzeichnis `bin` noch die erweiterungslose Datei `www` ist für das Erstellen einer Express-Anwendung oder das Starten der Anwendung zwingend erforderlich. Dies sind lediglich Vorschläge des Generators. Sie können diese also je nach Ihren Anforderungen ändern.

Um das Verzeichnis `www` zu löschen und alles im "Express 3-Stil" zu belassen, löschen Sie die Zeile mit dem Eintrag `module.exports = app;` am Ende der Datei `app.js`. Fügen Sie dann stattdessen den folgenden Code an derselben Position ein:

<pre>
<code class="language-javascript" translate="no">
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
</code>
</pre>

Stellen Sie sicher, dass Sie das Modul `debug` am Anfang der Datei `app.js` laden. Verwenden Sie dazu den folgenden Code:

<pre>
<code class="language-javascript" translate="no">
var debug = require('debug')('app4');
</code>
</pre>

Ändern Sie als Nächstes `"start": "node ./bin/www"` in der Datei `package.json` in `"start": "node app.js"`.

Sie haben nun die Funktionalität von `./bin/www` wieder in `app.js` verschoben. Diese Änderung wird nicht empfohlen. Die Übung hat Ihnen jedoch geholfen, zu verstehen, wie die Datei `./bin/www` funktioniert und warum die Datei `app.js` nicht mehr automatisch gestartet wird.
