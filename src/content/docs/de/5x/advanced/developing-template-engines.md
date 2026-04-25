---
title: Template-Engines für Express entwickeln
description: Erfahren Sie, wie Sie mithilfe von app.engine() benutzerdefinierte Template-Engines für Express.js entwickeln können, mit Beispielen zur Erstellung und Integration Ihrer eigenen Template-Rendering-Logik.
---

Benutze die `app.engine(ext, callback)` Methode, um deine eigene Template-Engine zu erstellen. `ext` bezieht sich auf die Dateierweiterung, und `callback` ist die Template-Engine-Funktion, , die die folgenden Elemente als Parameter akzeptiert: den Speicherort der Datei, das Optionsobjekt und die Callback-Funktion.

Der folgende Code ist ein Beispiel für die Implementierung einer sehr einfachen Template-Engine zum Rendern von `.ntl` Dateien.

```js
const fs = require('fs'); // this engine requires the fs module
app.engine('ntl', (filePath, options, callback) => {
  // define the template engine
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err);
    // this is an extremely simple template engine
    const rendered = content
      .toString()
      .replace('#title#', `<title>${options.title}</title>`)
      .replace('#message#', `<h1>${options.message}</h1>`);
    return callback(null, rendered);
  });
});
app.set('views', './views'); // specify the views directory
app.set('view engine', 'ntl'); // register the template engine
```

Deine App wird nun in der Lage sein, `.ntl`-Dateien zu rendern. Erstelle eine Datei namens `index.ntl` im `views` Verzeichnis mit folgendem Inhalt.

```pug
#title#
#message#
```

Erstellen Sie dann die folgende Route in Ihrer App.

```js
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' });
});
```

Wenn du eine Anfrage an die Startseite stellt, wird `index.ntl` als HTML dargestellt.
