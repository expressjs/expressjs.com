---
layout: page
title: Statische Dateien in Express bereitstellen
description: Understand how to serve static files like images, CSS, and JavaScript in Express.js applications using the built-in 'static' middleware.
menu: starter
lang: de
---

# Statische Dateien in Express bereitstellen

Wenn Sie statische Dateien wie Bilder, CSS-Dateien und JavaScript-Dateien bereitstellen wollen, verwenden Sie die in Express integrierte Middlewarefunktion `express.static`.

Übergeben Sie den Namen des Verzeichnisses mit den statischen Assets an die Middlewarefunktion `express.static`, um direkt mit dem Bereitstellen der Dateien zu beginnen. Beispiel: Verwenden Sie den folgenden Code, um Bilder, CSS-Dateien und JavaScript-Dateien in einem Verzeichnis namens `public` bereitzustellen:

```js
app.use(express.static('public'))
```

Jetzt können Sie die Dateien laden, die sich im Verzeichnis `public` befinden:

```text
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
```

<div class="doc-box doc-info">
Express sucht nach den Dateien, die sich auf das Verzeichnis mit den statischen Assets beziehen. Der Name dieses Verzeichnisses ist also nicht Teil der URL. </div>

Wenn Sie mehrere Verzeichnisse mit statischen Assets verwenden wollen, rufen Sie die Middlewarefunktion `express.static` mehrmals auf:

```js
app.use(express.static('public'))
app.use(express.static('files'))
```

Express sucht in der Reihenfolge nach den Dateien, in der sie die Verzeichnisse mit den statischen Assets über die Middlewarefunktion `express.static` festgelegt haben.

Wenn Sie ein Präfix für einen virtuellen Pfad (in dem der Pfad nicht wirklich im Dateisystem existiert) für Dateien festlegen wollen, die über die Funktion `express.static` bereitgestellt werden, [müssen Sie einen Mountpfad](/{{ page.lang }}/4x/api.html#app.use) für das Verzeichnis mit den statischen Assets wie unten gezeigt angeben:

```js
app.use('/static', express.static('public'))
```

Jetzt können Sie die Dateien, die sich im Verzeichnis `public` befinden, aus dem Pfadpräfix `/static` laden.

```text
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
```

Der Pfad, den Sie für die Funktion `express.static` angeben, ist jedoch relativ zum Verzeichnis, aus dem Sie Ihren Prozess `node` starten. Wenn Sie die Express-Anwendung aus einem anderen Verzeichnis ausführen, ist es sicherer, den absoluten Pfad des Verzeichnisses zu verwenden, das Sie bereitstellen wollen:

```js
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))
```
