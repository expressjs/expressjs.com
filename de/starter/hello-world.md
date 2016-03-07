---
layout: page
title: Beispiel "Hello World" in Express
menu: starter
lang: de
---

# Beispiel "Hello World"

<div class="doc-box doc-info" markdown="1">
Dies ist wohl die einfachste Express-Anwendung, die Sie erstellen können. Es handelt sich um eine Anwendung mit nur einer Datei und &mdash; *nicht* das, was Sie mit dem [Express Generator](/{{ page.lang }}/starter/generator.html) erhalten würden. Mit dem Generator würde das Gerüst für eine vollständige Anwendung mit zahlreichen JavaScript-Dateien, Jade-Vorlagen und Unterverzeichnissen für verschiedene Zwecke erstellt werden.
</div>

Erstellen Sie zunächst ein Verzeichnis namens `myapp`, wechseln Sie in das Verzeichnis und führen Sie `npm init` aus. Installieren Sie dann `express` als Abhängigkeit, wie im [Installationshandbuch](/{{ page.lang }}/starter/installing.html) beschrieben.

Erstellen Sie im Verzeichnis `myapp` eine Datei namens `app.js` und fügen Sie den folgenden Code hinzu:

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
</code>
</pre>

Die Anwendung startet einen Server und ist an Port 3000 empfangsbereit für Verbindungen. Die Anwendung antwortet mit "Hello World!" auf Anforderungen zur Stamm-URL (`/`) oder zu *route*. Bei jedem anderen Pfad lautet die Antwort **404 Not Found**.

<div class="doc-box doc-notice" markdown="1">
`req` (Anforderung) und `res` (Antwort) sind genau dieselben Objekte, die Node bereitstellt. Sie können also `req.pipe()`, `req.on('data', callback)` und alle anderen Tasks, die Sie ausführen wollen, ohne Express ausführen.
</div>

Führen Sie die Anwendung mit dem folgenden Befehl aus:

<pre>
<code class="language-sh" translate="no">
$ node app.js
</code>
</pre>

Laden Sie dann [http://localhost:3000/](http://localhost:3000/) in einen Browser, um die Ausgabe zu sehen.

