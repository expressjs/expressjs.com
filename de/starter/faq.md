---
layout: page
title: Häufig gestellte Fragen zu Express
menu: starter
lang: de
---

# Häufig gestellte Fragen

## Wie muss ich meine Anwendung strukturieren?

Auf diese Frage gibt es keine verbindliche Antwort. Die Antwort hängt vom Umfang Ihrer Anwendung und dem eingebundenen Team ab. Um so flexibel wie möglich zu sein, gibt es bei Express keine Voraussetzungen hinsichtlich der Struktur.

Weiterleitungen und andere anwendungsspezifische Logik können in einer beliebigen Anzahl von Dateien und in jeder von Ihnen bevorzugten Verzeichnisstruktur vorkommen. Die folgenden Beispiele sollen als Entscheidungshilfe dienen:


* [Weiterleitungslisten](https://github.com/expressjs/express/blob/4.13.1/examples/route-separation/index.js#L32-47)
* [Weiterleitungszuordnung](https://github.com/expressjs/express/blob/4.13.1/examples/route-map/index.js#L52-L66)
* [Controller im MVC-Stil](https://github.com/expressjs/express/tree/master/examples/mvc)

Darüber hinaus gibt es Erweiterungen anderer Anbieter für Express, die zur Vereinfachung einiger dieser Muster beitragen:

* [Weiterleitung mit "express-resource"](https://github.com/expressjs/express-resource)

## Wie definiere ich Modelle?

Express hat keine Vorstellungen von einer Datenbank. Dieses Konzept bleibt Node-Modulen anderer Anbieter überlassen, wodurch Schnittstellen zu allen Datenbank möglich sind.

[LoopBack](http://loopback.io) zeigt ein Express-basiertes Framework, um das Modelle angeordnet sind.

## Wie kann ich Benutzer authentifizieren?

Die Authentifizierung ist ein weiterer meinungsstarker Bereich, in den Express nicht eingreift. Sie können ein Authentifizierungsschema nach Ihren Vorstellungen verwenden. Ein einfaches Benutzername/Kennwort-Schema können Sie in [diesem Beispiel](https://github.com/expressjs/express/tree/master/examples/auth) sehen.


## Welche Template-Engines unterstützt Express?

Express unterstützt jede Template-Engine, die der `(path, locals, callback)`-Signatur entspricht. Informationen zur Normalisierung von Template-Engine-Schnittstellen und -Caching siehe das Projekt [consolidate.js](https://github.com/visionmedia/consolidate.js). Nicht aufgelistete Template-Engines können trotzdem die Express-Signatur unterstützen.

## Wie handhabe ich 404-Antworten?

In Express sind 404-Antworten nicht das Ergebnis eines Fehlers, sodass diese Antworten von der Fehlerbehandlungsroutine nicht erfasst werden. Dieses Verhalten ist damit zu erklären, dass eine 404-Antwort einfach angibt, dass keine weiteren Arbeiten auszuführen sind. In anderen Worten: Express hat alle Middlewarefunktionen und Weiterleitungen ausgeführt und festgestellt, dass keine Funktion eine Antwort zurückgegeben hat. Sie müssen also bei der Handhabung der 404-Antwort nur eine Middlewarefunktion am Ende des Stacks (unterhalb von allen anderen Funktionen) hinzufügen:

<pre>
<code class="language-javascript" translate="no">
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});
</code>
</pre>

## Wie richte ich eine Fehlerbehandlungsroutine ein?

Middleware für die Fehlerbehandlung wird in derselben Weise definiert wie andere Middleware; außer dass sie vier anstatt drei Argumente aufweist. Dies gilt speziell bei der Signatur `(err, req, res, next)`:

<pre>
<code class="language-javascript" translate="no">
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
</code>
</pre>

Weitere Informationen siehe [Fehlerbehandlung](/{{ page.lang }}/guide/error-handling.html).

## Wie gebe ich normales HTML-Format aus?

Das ist nicht Ihre Aufgabe! Sie müssen kein HTML-Format mit der Funktion `res.render()` ausgeben. Verwenden Sie die Funktion `res.sendFile()`, wenn Sie es mit einer bestimmten Datei zu tun haben. Wenn Sie viele Assets aus einem Verzeichnis bedienen müssen, verwenden Sie die Middlewarefunktion `express.static()`.
