---
layout: page
title: Template-Engines in Express verwenden
description: Discover how to integrate and use template engines like Pug, Handlebars, and EJS with Express.js to render dynamic HTML pages efficiently.
menu: guide
lang: de
redirect_from: /guide/using-template-engines.html
---

# Template-Engines in Express verwenden

A _template engine_ enables you to use static template files in your application. At runtime, the template engine replaces
variables in a template file with actual values, and transforms the template into an HTML file sent to the client.
This approach makes it easier to design an HTML page.

The [Express application generator](/{{ page.lang }}/starter/generator.html) uses [Pug](https://pugjs.org/api/getting-started.html) as its default, but it also supports [Handlebars](https://www.npmjs.com/package/handlebars), and [EJS](https://www.npmjs.com/package/ejs), among others.

To render template files, set the following [application setting properties](/{{ page.lang }}/4x/api.html#app.set), in the default `app.js` created by the generator:

- `views`, das Verzeichnis, in dem sich die Vorlagendateien befinden. Beispiel: `app.set('views', './views')`
  This defaults to the `views` directory in the application root directory.
- `view engine`, die zu verwendende Template-Engine. Beispiel: `app.set('view engine', 'pug')`

Installieren Sie dann das entsprechende npm-Paket für die Template-Engine:

```bash
$ npm install pug --save
```

<div class="doc-box doc-notice" markdown="1">Express-konforme Template-Engines wie Pug exportieren eine Funktion namens `__express(filePath, options, callback)`, die über die Funktion `res.render()` aufgerufen wird, um den Vorlagencode ausgeben zu können.

Einige Template-Engines folgen dieser Konvention nicht. Die Bibliothek [Consolidate.js](https://www.npmjs.org/package/consolidate) folgt dieser Konvention, indem alle gängigen Node.js-Template-Engines zugeordnet werden. Daher ist eine reibungslose Funktion in Express gewährleistet.

</div>

Nach der Festlegung der View-Engine muss die Engine nicht angegeben oder das Template-Engine-Modul nicht in Ihre Anwendung geladen werden. Express lädt das Modul intern (wie unten für das obige Beispiel gezeigt).

```js
app.set('view engine', 'pug')
```

Erstellen Sie eine Pug-Vorlagendatei namens `index.pug` im Verzeichnis `views` mit dem folgenden Inhalt:

```pug
html
  head
    title= title
  body
    h1= message
```

Dann erstellen Sie eine Weiterleitung, um die Datei `index.pug` auszugeben. Wenn die Eigenschaft `view engine` nicht festgelegt wurde, müssen Sie die Erweiterung der Datei `view` angeben. Andernfalls müssen Sie diese Erweiterung nicht angeben.

```js
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})
```

Wenn Sie eine Anforderung zur Homepage ausführen, wird die Datei `index.pug` im HTML-Format ausgegeben.

The view engine cache does not cache the contents of the template's output, only the underlying template itself. The view is still re-rendered with every request even when the cache is on.
