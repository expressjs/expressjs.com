---
layout: page
title: Express-Middleware verwenden
menu: guide
lang: de
---

# Middleware verwenden

Express ist ein Weiterleitungs- und Middleware-Web-Framework, das selbst nur minimale Funktionalität aufweist: Eine Express-Anwendung besteht im Wesentlichen aus einer Reihe von Middlewarefunktionsaufrufen.

*Middlewarefunktionen* sind Funktionen, die Zugriff auf das [Anforderungsobjekt](/{{ page.lang }}/4x/api.html#req) (`req`), das [Antwortobjekt](/{{ page.lang }}/4x/api.html#res) (`res`) und die nächste Middlewarefunktion im Anforderung/Antwort-Zyklus der Anwendung haben. Die nächste Middlewarefunktion wird im Allgemeinen durch die Variable `next` bezeichnet.

Über Middlewarefunktionen lassen sich die folgenden Tasks ausführen:

* Ausführen von Code
* Vornehmen von Änderungen an der Anforderung und an Antwortobjekten
* Beenden des Anforderung/Antwort-Zyklus
* Aufrufen der nächsten Middlewarefunktion im Stack

Wenn über die aktuelle Middlewarefunktion der Anforderung/Antwort-Zyklus nicht beendet werden kann, muss `next()` aufgerufen werden, um die Steuerung an die nächste Middlewarefunktion zu übergeben. Andernfalls geht die Anforderung in den Status "Blockiert" über.

Eine Express-Anwendung kann die folgenden Middlewaretypen verwenden:

 - [Middleware auf Anwendungsebene](#middleware.application)
 - [Middleware auf Routerebene](#middleware.router)
 - [Middleware für die Fehlerbehandlung](#middleware.error-handling)
 - [Integrierte Middleware](#middleware.built-in)
 - [Middleware anderer Anbieter](#middleware.third-party)

Sie können Middleware auf Anwendungsebene und Routerebene mit einem optionalen Mountpfad laden. Sie können auch eine Reihe von Middlewarefunktionen zusammen laden. Dadurch wird ein Sub-Stack des Middlewaresystems am Mountpunkt erstellt.

<h2 id='middleware.application'>Middleware auf Anwendungsebene</h2>

Binden Sie Middleware auf Anwendungsebene zu einer Instanz des [Anwendungsobjekts](/{{ page.lang }}/4x/api.html#app), indem Sie die Funktionen `app.use()` und `app.METHOD()` verwenden. `METHOD` ist dabei die HTTP-Methode der Anforderung, die die Middlewarefunktion in Kleinschreibung verarbeitet (wie GET, PU oder POST).

Dieses Beispiel zeigt eine Middlewarefunktion ohne Mountpfad. Die Funktion wird immer dann ausgeführt, wenn die Anwendung eine Anforderung erhält.

<pre>
<code class="language-javascript" translate="no">
var app = express();

app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});
</code>
</pre>

Dieses Beispiel zeigt eine Middlewarefunktion mit dem Mountpfad `/user/:id`. Die Funktion wird für jede Art von HTTP-Anforderung auf dem Pfad `/user/:id` ausgeführt.

<pre>
<code class="language-javascript" translate="no">
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
</code>
</pre>

Dieses Beispiel zeigt eine Weiterleitung und deren Handlerfunktion (Middlewaresystem). Die Funktion verarbeitet GET-Anforderungen zum Pfad `/user/:id`.

<pre>
<code class="language-javascript" translate="no">
app.get('/user/:id', function (req, res, next) {
  res.send('USER');
});
</code>
</pre>

Dies ist ein Beispiel zum Laden einer Reihe von Middlewarefunktionen an einem Mountpunkt mit einem Mountpfad. Das Beispiel veranschaulicht einen Middleware-Stack, über den Anforderungsinformationen  zu einer HTTP-Anforderung zum Pfad `/user/:id` ausgegeben werden.

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

Mit einem Routenhandler können Sie mehrere Weiterleitungen für einen Pfad definieren. Im folgenden Beispiel werden zwei Weiterleitungen für GET-Anforderungen zum Pfad `/user/:id` definiert. Die zweite Weiterleitung verursacht zwar keine Probleme, wird jedoch nie aufgerufen, da durch die erste Weiterleitung der Anforderung/Antwort-Zyklus beendet wird.

Dieses Beispiel zeigt einen Middleware-Sub-Stack, über den GET-Anforderungen zum Pfad `/user/:id` verarbeitet werden.

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

Wenn Sie den Rest der Middlewarefunktionen eines Weiterleitungs-Middleware-Stack überspringen wollen, rufen Sie `next('route')` auf, um die Steuerung an die nächste Weiterleitung zu übergeben. **HINWEIS**: `next('route')` funktioniert nur in Middlewarefunktionen, die über die Funktionen `app.METHOD()` oder `router.METHOD()` geladen wurden.

Dieses Beispiel zeigt einen Middleware-Sub-Stack, über den GET-Anforderungen zum Pfad `/user/:id` verarbeitet werden.

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

<h2 id='middleware.router'>Middleware auf Routerebene</h2>

Middleware auf Routerebene funktioniert in der gleichen Weise wie Middleware auf Anwendungsebene, mit dem einzigen Unterschied, dass sie an eine Instanz von `express.Router()` gebunden ist.

<pre>
<code class="language-javascript" translate="no">
var router = express.Router();
</code>
</pre>
Laden Sie Middleware auf Routerebene über die Funktionen `router.use()` und `router.METHOD()`.
Der folgende Beispielcode repliziert das Middlewaresystem, das oben für die Middleware auf Anwendungsebene gezeigt wird, durch Verwendung von Middleware auf Routerebene.

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

<h2 id='middleware.error-handling'>Middleware für die Fehlerbehandlung</h2>

<div class="doc-box doc-notice" markdown="1">
Middleware für die Fehlerbehandlung benötigt immer *vier* Argumente. Sie müssen vier Argumente angeben, um die Erkennung als Middlewarefunktion für die Fehlerbehandlung zu ermöglichen. Selbst wenn das Objekt `next` nicht verwenden müssen, müssen Sie dies angeben, um die Signatur beizubehalten. Andernfalls wird das Objekt `next` als reguläre Middleware interpretiert, sodass keine Fehlerbehandlung möglich ist.
</div>

Middlewarefunktionen für die Fehlerbehandlung werden in derselben Weise definiert wie andere Middlewarefunktionen, außer dass Fehlerbehandlungsfunktionen speziell bei Signaturen vier anstatt drei Argumente aufweisen `(err, req, res, next)`:

<pre>
<code class="language-javascript" translate="no">
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
</code>
</pre>

Details zu Middleware für die Fehlerbehandlung siehe [Fehlerbehandlung](/{{ page.lang }}/guide/error-handling.html).

<h2 id='middleware.built-in'>Integrierte Middleware</h2>

Seit Version 4.x bestehen bei Express keine Abhängigkeiten zu [Connect](https://github.com/senchalabs/connect) mehr. Mit Ausnahme von `express.static` befinden sich nun alle Middlewarefunktionen, die bisher in Express enthalten waren, in separaten Modulen. Sehen Sie sich hierzu auch die [Liste der Middlewarefunktionen](https://github.com/senchalabs/connect#middleware) an.

<h4 id='express.static'>express.static(root, [options])</h4>

Die einzige integrierte Middlewarefunktion in Express ist `express.static`. Diese Funktion basiert auf [serve-static](https://github.com/expressjs/serve-static) und ist zuständig für die statischen Assets einer Express-Anwendung.

Das Argument `root` gibt das Stammverzeichnis an, von dem aus statische Assets bedient werden.

Das optionale Objekt `options` kann folgende Eigenschaften aufweisen:

| Eigenschaft      | Beschreibung                                                           |   Typ      | Standard         |
|---------------|-----------------------------------------------------------------------|-------------|-----------------|
| `dotfiles`    | Option für Dateien mit Punkterweiterung (dotfiles). Mögliche Werte sind "allow", "deny" und "ignore" | Zeichenfolge | "ignore" |
| `etag`        | Aktiviert oder inaktiviert die etag-Generierung.  | Boolesch | `true` |
| `extensions`  | Legt Dateierweiterungs-Fallbacks fest. | Bereich | `[]` |
| `index`       | Sendet die verzeichnissspezifische indexierte Datei. Bei `false` wird die Verzeichnisindexierung inaktiviert.  | Gemischt | "index.html" |
 `lastModified` | Legt den Header `Last-Modified` auf das Datum der letzten Änderung der Datei im Betriebssystem fest. Mögliche Werte sind`true` und `false`. | Boolesch | `true` |
| `maxAge`      | Legt die Eigenschaft "max-age" des Headers "Cache-Control" in Millisekunden oder als Zeichenfolge im [ms-Format](https://www.npmjs.org/package/ms) fest. | Zahl | 0 |
| `redirect`    | Umleitung zu einem abschließenden "/", wenn der Pfadname ein Verzeichnis ist. | Boolesch | `true` |
| `setHeaders`  | Funktion zum Festlegen von HTTP-Headern für die Datei.  | Funktion |  |

Dies ist ein Beispiel zur Verwendung der Middlewarefunktion `express.static` mit einem ausführlich dargestellten Optionsobjekt:

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

Es sind mehrere statische Verzeichnisse pro Anwendung möglich:

<pre>
<code class="language-javascript" translate="no">
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.static('files'));
</code>
</pre>

Details zur Funktion `serve-static` und deren Optionen finden Sie in der Dokumentation zu [serve-static](https://github.com/expressjs/serve-static).

<h2 id='middleware.third-party'>Middleware anderer Anbieter</h2>

Mit Middleware anderer Anbieter können Sie Express-Anwendungen um neue Funktionalität erweitern.

Installieren Sie das Modul Node.js für die erforderliche Funktionalität. Laden Sie das Modul dann in Ihre Anwendung auf Anwendungsebene oder auf Routerebene.

Das folgende Beispiel veranschaulicht das Installieren und Laden der Middlewarefunktion `cookie-parser` für das Cookie-Parsing.

```console
$ npm install cookie-parser
```

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

// load the cookie-parsing middleware
app.use(cookieParser());
</code>
</pre>

Eine nicht vollständige Liste zu den Middlewarefunktionen anderer Anbieter, die im Allgemeinen mit Express verwendet werden, finden Sie unter [Middleware anderer Anbieter](../resources/middleware.html).
