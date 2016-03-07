---
layout: page
title: Middleware für die Verwendung in Express-Anwendungen schreiben
menu: guide
lang: de
---

# Middleware für die Verwendung in Express-Anwendungen schreiben

<h2>Überblick</h2>

*Middlewarefunktionen* sind Funktionen, die Zugriff auf das [Anforderungsobjekt](/{{ page.lang }}/4x/api.html#req) (`req`), das [Antwortobjekt](/{{ page.lang }}/4x/api.html#res) (`res`) und die nächste Middlewarefunktion im Anforderung/Antwort-Zyklus der Anwendung haben. Die nächste Middlewarefunktion wird im Allgemeinen durch die Variable `next` bezeichnet.

Über Middlewarefunktionen lassen sich die folgenden Tasks ausführen:

* Ausführen von Code
* Vornehmen von Änderungen an der Anforderung und an Antwortobjekten
* Beenden des Anforderung/Antwort-Zyklus
* Aufrufen der nächsten Middleware im Stack

Wenn über die aktuelle Middlewarefunktion der Anforderung/Antwort-Zyklus nicht beendet werden kann, muss `next()` aufgerufen werden, um die Steuerung an die nächste Middlewarefunktion zu übergeben. Andernfalls geht die Anforderung in den Status "Blockiert" über.

Das folgende Beispiel zeigt die Elemente eines Middlewarefunktionsaufrufs:

<table style="padding: 0; border: 0; width: 960px; margin-bottom: 10px;">
<tr><td style="margin: 0; padding: 0px; border: 0; width: 410px;">
<img src="/images/express-mw.png" style="margin: 0px; padding: 0px; width: 410px; height: 308px;" />
</td>
<td style="margin: 0; padding: 0 0 0 5px; border: 0; width: 550px;">
<div class="callout" id="callout1">HTTP-Methode, für die die Middlewarefunktion angewendet wird.</div>

<div class="callout" id="callout2">Pfad (Weiterleitung), für den die Middlewarefunktion angewendet wird.</div>

<div class="callout" id="callout3">Die Middlewarefunktion.</div>

<div class="callout" id="callout4">Callback-Argument zur Middlewarefunktion, die nach der geltenden Konvention als "next" bezeichnet wird.</div>

<div class="callout" id="callout5">HTTP-<a href="../4x/api.html#res">Antwort</a>argument zur Middlewarefunktion, die nach der geltenden Konvention als "res" bezeichnet wird.</div>

<div class="callout" id="callout6">HTTP-<a href="../4x/api.html#req">Anforderungs</a>argument zur Middlewarefunktion, die nach der geltenden Konvention als "req" bezeichnet wird.</div>
</td></tr>
</table>

Dies ist ein Beispiel einer einfachen Express-Anwendung namens "Hello World", für die Sie zwei Middlewarefunktionen definieren:

<pre><code class="language-javascript" translate="no">
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000);
</code></pre>

<h2>Entwicklung</h2>

Dies ist ein einfaches Beispiel einer Middlewarefunktion namens "myLogger". Diese Funktion gibt lediglich "LOGGED" aus, wenn eine Anforderung zur Anwendung über diese Funktion läuft. Die Middlewarefunktion ist der Variablen `myLogger` zugeordnet.

<pre>
<code class="language-javascript" translate="no">
var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};
</code>
</pre>

<div class="doc-box doc-notice" markdown="1">
Beachten Sie den Aufruf oben zu `next()`. Durch den Aufruf dieser Funktion wird die nächste Middlewarefunktion in der Anwendung aufgerufen. Die Funktion `next()` ist nicht Teil der Node.js- oder Express-API, sondern das dritte Argument, das an die Middlewarefunktion übergeben wird. Die Funktion `next()` kann jeden beliebigen Namen haben, per Konvention erhält sie jedoch immer den Namen "next". Um Unklarheiten zu vermeiden, sollten Sie immer diese Konvention verwenden.
</div>


Zum Laden der Middlewarefunktion rufen Sie `app.use()` auf und geben die Middlewarefunktion an. Beispiel: Durch den folgenden Code wird die Middlewarefunktion `myLogger` vor der Weiterleitung zum Stammverzeichnispfad (/) geladen.

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var app = express();

var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

app.use(myLogger);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000);
</code>
</pre>

Sobald die Anwendung eine Anforderung erhält, gibt sie die Nachricht "LOGGED" an das Terminal aus.

Die Reihenfolge beim Laden der Middleware ist wichtig: Middlewarefunktionen, die zuerst geladen werden, werden auch zuerst ausgeführt.

Wenn `myLogger` nach der Weiterleitung zum Stammverzeichnispfad geladen wird, erreicht die Weiterleitung die Middlewarefunktion nicht. Die Anwendung gibt "LOGGED" nicht aus, weil der Routenhandler für den Stammverzeichnispfad den Anforderung/Antwort-Zyklus beendet.

Die Middlewarefunktion `myLogger` gibt einfach eine Nachricht aus und übergibt dann die Anforderung zur nächsten Middlewarefunktion im Stack durch Aufruf der Funktion `next()`.

Im nächsten Beispiel wird die Eigenschaft `requestTime` zum Anforderungsobjekt hinzugefügt. Diese Middlewarefunktion erhält den Namen "requestTime".

<pre>
<code class="language-javascript" translate="no">
var requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};
</code>
</pre>

Die Anwendung verwendet nun die Middlewarefunktion `requestTime`. Außerdem verwendet die Callback-Funktion der Weiterleitung zum Stammverzeichnispfad die Eigenschaft, die die Middlewarefunktion zu `req` (dem Anforderungsobjekt) hinzufügt.

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var app = express();

var requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

app.use(requestTime);

app.get('/', function (req, res) {
  var responseText = 'Hello World!<br>';
  responseText += '<small>Requested at: ' + req.requestTime + '</small>';
  res.send(responseText);
});

app.listen(3000);
</code>
</pre>

Wenn Sie eine Anforderung zum Stammverzeichnis der Anwendung einleiten, zeigt die Anwendung nun die Zeitmarke Ihrer Anforderung im Browser an.

Da Sie Zugriff auf das Anforderungsobjekt, das Antwortobjekt, die nächste Middlewarefunktion im Stack und die gesamte Node.js-API haben, sind die Möglichkeiten, die Sie mit Middlewarefunktionen haben, nahezu unendlich.

Weitere Informationen zur Verwendung von Middleware in Express siehe [ Express-Middleware verwenden](/{{ page.lang }}/guide/using-middleware.html).
