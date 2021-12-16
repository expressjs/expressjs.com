---
layout: page
title: Template-Engines in Express verwenden
menu: guide
lang: de
---

# Template-Engines in Express verwenden

Bevor über Express Vorlagendateien ausgegeben werden können, müssen die folgenden Anwendungseinstellungen festgelegt werden:

* `views`, das Verzeichnis, in dem sich die Vorlagendateien befinden. Beispiel: `app.set('views', './views')`
* `view engine`, die zu verwendende Template-Engine. Beispiel: `app.set('view engine', 'pug')`

Installieren Sie dann das entsprechende npm-Paket für die Template-Engine:

```console
$ npm install pug --save
```

<div class="doc-box doc-notice" markdown="1">
Express-konforme Template-Engines wie Pug exportieren eine Funktion namens `__express(filePath, options, callback)`, die über die Funktion `res.render()` aufgerufen wird, um den Vorlagencode ausgeben zu können. Einige Template-Engines folgen dieser Konvention nicht. Die Bibliothek [Consolidate.js](https://www.npmjs.org/package/consolidate) folgt dieser Konvention, indem alle gängigen Node.js-Template-Engines zugeordnet werden. Daher ist eine reibungslose Funktion in Express gewährleistet.
</div>

Nach der Festlegung der View-Engine muss die Engine nicht angegeben oder das Template-Engine-Modul nicht in Ihre Anwendung geladen werden. Express lädt das Modul intern (wie unten für das obige Beispiel gezeigt).

<pre>
<code class="language-javascript" translate="no">
app.set('view engine', 'pug');
</code>
</pre>

Erstellen Sie eine Pug-Vorlagendatei namens `index.pug` im Verzeichnis `views` mit dem folgenden Inhalt:

<pre>
<code class="language-javascript" translate="no">
html
  head
    title= title
  body
    h1= message
</code>
</pre>

Dann erstellen Sie eine Weiterleitung, um die Datei `index.pug` auszugeben. Wenn die Eigenschaft `view engine` nicht festgelegt wurde, müssen Sie die Erweiterung der Datei `view` angeben. Andernfalls müssen Sie diese Erweiterung nicht angeben.

<pre>
<code class="language-javascript" translate="no">
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});
</code>
</pre>

Wenn Sie eine Anforderung zur Homepage ausführen, wird die Datei `index.pug` im HTML-Format ausgegeben.

Weitere Informationen zur Funktionsweise von Template-Engines in Express siehe ["Template-Engines für Express entwickeln"](/{{ page.lang }}/advanced/developing-template-engines.html).
