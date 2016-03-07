---
layout: page
title: Template-Engines für Express entwickeln
menu: advanced
lang: de
---

# Template-Engines für Express entwickeln

Verwenden Sie die Methode `app.engine(ext, callback)`, um Ihre eigene Template-Engine zu erstellen. `ext` bezieht sich auf die Dateierweiterung, `callback` ist die Template-Engine-Funktion, die die folgenden Elemente als Parameter akzeptiert: die Position der Datei, das Optionsobjekt und die Callback-Funktion.

Der folgende Code ist ein Beispiel für die Implementierung einer sehr einfachen Template-Engine für die Ausgabe von `.ntl`-Dateien.

<pre>
<code class="language-javascript" translate="no">
var fs = require('fs'); // this engine requires the fs module
app.engine('ntl', function (filePath, options, callback) { // define the template engine
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(new Error(err));
    // this is an extremely simple template engine
    var rendered = content.toString().replace('#title#', '<title>'+ options.title +'</title>')
    .replace('#message#', '<h1>'+ options.message +'</h1>');
    return callback(null, rendered);
  });
});
app.set('views', './views'); // specify the views directory
app.set('view engine', 'ntl'); // register the template engine
</code>
</pre>

Ihre Anwendung ist jetzt in der Lage, `.ntl`-Dateien auszugeben. Erstellen Sie im Verzeichnis `views` eine Datei namens `index.ntl` mit dem folgenden Inhalt.

<pre>
<code class="language-javascript" translate="no">
#title#
#message#
</code>
</pre>
Erstellen Sie dann in Ihrer Anwendung die folgende Route.
<pre>
<code class="language-javascript" translate="no">
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});
</code>
</pre>
Wenn Sie eine Anforderung zur Homepage einleiten, wird `index.ntl` im HTML-Format ausgegeben.
