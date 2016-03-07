---
layout: page
title: Fehlerbehandlung in Express
menu: guide
lang: de
---

# Fehlerbehandlung

Middlewarefunktionen für die Fehlerbehandlung werden in derselben Weise definiert wie andere Middlewarefunktionen, nur, dass Fehlerbehandlungsfunktionen vier anstatt drei Argumente aufweisen:
`(err, req, res, next)`. Beispiel:

<pre>
<code class="language-javascript" translate="no">
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
</code>
</pre>

Middleware für die Fehlerbehandlung wird ganz zuletzt nach allen anderen `app.use()`- und Weiterleitungsaufrufen definiert. Beispiel:

<pre>
<code class="language-javascript" translate="no">
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser());
app.use(methodOverride());
app.use(function(err, req, res, next) {
  // logic
});
</code>
</pre>

Antworten von der Middlewarefunktion können das von Ihnen gewünschte Format aufweisen wie beispielsweise eine Fehlerseite im HTML-Format, eine einfache Nachricht oder eine JSON-Zeichenfolge.

Für organisatorische Zwecke (und Frameworks der höheren Ebene) können Sie mehrere Middlewarefunktionen für die Fehlerbehandlung definieren, wie Sie dies bei regulären Middlewarefunktionen auch tun würden. Wenn Sie beispielsweise eine Fehlerbehandlungsroutine (Error-Handler) für Anforderungen über `XHR` und andere Anforderungen definieren wollen, können Sie die folgenden Befehle verwenden:

<pre>
<code class="language-javascript" translate="no">
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser());
app.use(methodOverride());
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
</code>
</pre>

In diesem Beispiel kann die generische `logErrors`-Funktion Anforderungs- und Fehlerinformationen in `stderr` schreiben:

<pre>
<code class="language-javascript" translate="no">
function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}
</code>
</pre>

In diesem Beispiel wird `clientErrorHandler` wie folgt definiert. In diesem Fall wird der Fehler explizit an den nächsten Error-Handler übergeben:

<pre>
<code class="language-javascript" translate="no">
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}
</code>
</pre>

Die `errorHandler`-Funktion "catch-all" kann wie folgt implementiert werden:

<pre>
<code class="language-javascript" translate="no">
function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}
</code>
</pre>

Wenn Sie Übergaben an die Funktion `next()` vornehmen (außer die Zeichenfolge `'route'`), sieht Express die aktuelle Anforderung als Fehler an und überspringt alle verbleibenden fehlerfreien Behandlungsroutinen und Middlewarefunktionen. Wenn Sie den Fehler bearbeiten wollen, müssen Sie (wie im nächsten Abschnitt beschrieben) eine Fehlerbehandlungsweiterleitung erstellen.

Bei einem Routenhandler mit mehreren Callback-Funktionen können Sie den Parameter `route` verwenden, um den nächsten Routenhandler zu überspringen. Beispiel:

<pre>
<code class="language-javascript" translate="no">
app.get('/a_route_behind_paywall',
  function checkIfPaidSubscriber(req, res, next) {
    if(!req.user.hasPaid) {

      // continue handling this request
      next('route');
    }
  }, function getPaidContent(req, res, next) {
    PaidContent.find(function(err, doc) {
      if(err) return next(err);
      res.json(doc);
    });
  });
</code>
</pre>

In diesem Beispiel wird der Handler `getPaidContent` übersprungen. Alle verbleibenden Handler in `app` für `/a_route_behind_paywall` werden jedoch weiter ausgeführt.

<div class="doc-box doc-info" markdown="1">
Aufrufe zu `next()` und `next(err)` geben an, dass der aktuelle Handler abgeschlossen ist und welchen Status er aufweist. Durch `next(err)` werden alle verbleibenden Handler in der Kette übersprungen. Ausgenommen hiervor sind die Handler, die konfiguriert sind, um Fehler wie oben beschrieben zu behandeln.
</div>

## Die Standardfehlerbehandlungsroutine (Default Error Handler)

Express ist bereits mit einer integrierten Fehlerbehandlungsroutine ausgestattet, mit der alle in der Anwendung festgestellten Fehler gehandhabt werden können. Diese Middleware für die Fehlerbehandlung wird am Ende des Middleware-Funktionsstack hinzugefügt.

Wenn Sie einen Fehler an `next()` übergeben und diesen nicht mit einem Error-Handler bearbeiten, wird dieser über den integrierten Error-Handler bearbeitet. Der Fehler wird mit dem Stack-Trace zum Client geschrieben. Der Stack-Trace ist in der Produktionsumgebung nicht verfügbar.

<div class="doc-box doc-info" markdown="1">
Legen Sie die Umgebungsvariable `NODE_ENV` auf `production` fest, um die Anwendung im Produktionsmodus auszuführen.
</div>

Wenn `next()` mit einem Fehler aufgerufen wird, nachdem Sie mit dem Schreiben der Antwort begonnen haben (z. B., wenn Sie beim Streamen der Antwort zum Client einen Fehler feststellen), schließt die Standardfehlerbehandlungsroutine in Express die Verbindung, und die Anforderung schlägt fehl.

Wenn Sie also einen angepassten Error-Handler hinzufügen, empfiehlt es sich, eine Delegierung zur Standardfehlerbehandlungsroutine in Express vorzunehmen, wenn die Header bereits an den Client gesendet wurden:

<pre>
<code class="language-javascript" translate="no">
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
}
</code>
</pre>
