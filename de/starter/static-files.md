---
layout: page
title: Statische Dateien in Express bereitstellen
description: Understand how to serve static files like images, CSS, and JavaScript in Express.js applications using the built-in 'static' middleware.
menu: starter
lang: de
redirect_from: /starter/static-files.html
---

# Statische Dateien in Express bereitstellen

Wenn Sie statische Dateien wie Bilder, CSS-Dateien und JavaScript-Dateien bereitstellen wollen, verwenden Sie die in Express integrierte Middlewarefunktion `express.static`.

The function signature is:

```js
express.static(root, [options])
```

The `root` argument specifies the root directory from which to serve static assets.
For more information on the `options` argument, see [express.static](/{{page.lang}}/4x/api.html#express.static).

Beispiel: Verwenden Sie den folgenden Code, um Bilder, CSS-Dateien und JavaScript-Dateien in einem Verzeichnis namens `public` bereitzustellen:

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

<div class="doc-box doc-info">Express sucht nach den Dateien, die sich auf das Verzeichnis mit den statischen Assets beziehen. Der Name dieses Verzeichnisses ist also nicht Teil der URL.</div>

Wenn Sie mehrere Verzeichnisse mit statischen Assets verwenden wollen, rufen Sie die Middlewarefunktion `express.static` mehrmals auf:

```js
app.use(express.static('public'))
app.use(express.static('files'))
```

Express sucht in der Reihenfolge nach den Dateien, in der sie die Verzeichnisse mit den statischen Assets über die Middlewarefunktion `express.static` festgelegt haben.

{% capture alert_content %}
For best results, [use a reverse proxy](/{{page.lang}}/advanced/best-practice-performance.html#use-a-reverse-proxy) cache to improve performance of serving static assets.
{% endcapture %}
{% include admonitions/note.html content=alert_content %}

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

For more details about the `serve-static` function and its options, see  [serve-static](/resources/middleware/serve-static.html).

### [Previous: Basic Routing ](/{{ page.lang }}/starter/basic-routing.html)&nbsp;&nbsp;&nbsp;&nbsp;[Next: More examples ](/{{ page.lang }}/starter/examples.html)
