---
layout: page
title: Servicio de archivos estáticos en Express
description: Understand how to serve static files like images, CSS, and JavaScript in Express.js applications using the built-in 'static' middleware.
menu: starter
lang: en
redirect_from: "  "
---

# Servicio de archivos estáticos en Express

Para el servicio de archivos estáticos como, por ejemplo, imágenes, archivos CSS y archivos JavaScript, utilice la función de middleware incorporado `express.static` de Express.

The function signature is:

```js
express.static(root, [options])
```

The `root` argument specifies the root directory from which to serve static assets.
For more information on the `options` argument, see [express.static](/{{page.lang}}/4x/api.html#express.static).

Por ejemplo, utilice el siguiente código para el servicio de imágenes, archivos CSS y archivos JavaScript en un directorio denominado `public`:

```js
app.use(express.static('public'))
```

Ahora, puede cargar los archivos que hay en el directorio `public`:

```text
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
```

<div class="doc-box doc-info">
Express busca los archivos relativos al directorio estático, por lo que el nombre del directorio estático no forma parte del URL.
</div>

Para utilizar varios directorios de activos estáticos, invoque la función de middleware `express.static` varias veces:

```js
app.use(express.static('public'))
app.use(express.static('files'))
```

Express busca los archivos en el orden en el que se definen los directorios estáticos con la función de middleware `express.static`.

{% capture alert_content %}
For best results, [use a reverse proxy](/{{page.lang}}/advanced/best-practice-performance.html#use-a-reverse-proxy) cache to improve performance of serving static assets.
{% endcapture %}
{% include admonitions/note.html content=alert_content %}

Para crear un prefijo de vía de acceso virtual (donde la vía de acceso no existe realmente en el sistema de archivos) para los archivos a los que da servicio la función `express.static`, [especifique una vía de acceso de montaje](/{{ page.lang }}/4x/api.html#app.use) para el directorio estático, como se muestra a continuación:

```js
app.use('/static', express.static('public'))
```

Ahora, puede cargar los archivos que hay en el directorio `public` desde el prefijo de vía de acceso `/static`.

```text
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
```

No obstante, la vía de acceso que proporciona a la función `express.static` es relativa al directorio desde donde inicia el proceso `node`. Si ejecuta la aplicación Express desde cualquier otro directorio, es más seguro utilizar la vía de acceso absoluta del directorio al que desea dar servicio:

```js
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))
```

For more details about the `serve-static` function and its options, see  [serve-static](/resources/middleware/serve-static.html).

### [Previous: Basic Routing ](/{{ page.lang }}/starter/basic-routing.html)&nbsp;&nbsp;&nbsp;&nbsp;[Next: More examples ](/{{ page.lang }}/starter/examples.html)
