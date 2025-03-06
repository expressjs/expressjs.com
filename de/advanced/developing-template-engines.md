---
layout: page
title: Template-Engines für Express entwickeln
description: Learn how to develop custom template engines for Express.js using app.engine(), with examples on creating and integrating your own template rendering logic.
menu: advanced
lang: de
---

# Template-Engines für Express entwickeln

Verwenden Sie die Methode `app.engine(ext, callback)`, um Ihre eigene Template-Engine zu erstellen. `ext` bezieht sich auf die Dateierweiterung, `callback` ist die Template-Engine-Funktion, die die folgenden Elemente als Parameter akzeptiert: die Position der Datei, das Optionsobjekt und die Callback-Funktion.

Der folgende Code ist ein Beispiel für die Implementierung einer sehr einfachen Template-Engine für die Ausgabe von `.ntl`-Dateien.

```js
const fs = require('fs') // this engine requires the fs module
app.engine('ntl', (filePath, options, callback) => { // define the template engine
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(new Error(err))
    // this is an extremely simple template engine
    const rendered = content.toString().replace('#title#', `<title>${options.title}</title>`)
      .replace('#message#', `<h1>${options.message}</h1>`)
    return callback(null, rendered)
  })
})
app.set('views', './views') // specify the views directory
app.set('view engine', 'ntl') // register the template engine
```

Ihre Anwendung ist jetzt in der Lage, `.ntl`-Dateien auszugeben. Erstellen Sie im Verzeichnis `views` eine Datei namens `index.ntl` mit dem folgenden Inhalt.

```pug
#title#
#message#
```
Erstellen Sie dann in Ihrer Anwendung die folgende Route.
```js
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})
```
Wenn Sie eine Anforderung zur Homepage einleiten, wird `index.ntl` im HTML-Format ausgegeben.
