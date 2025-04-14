---
layout: página
title: Servicio de archivos estáticos en Express
description: Describa cómo servir archivos estáticos como imágenes, CSS y JavaScript en aplicaciones Express.js usando el middleware 'static' incorporado.
menu: iniciador
lang: es
redirect_from: /starter/static-files.html
---

# Servicio de archivos estáticos en Express

Para el servicio de archivos estáticos como, por ejemplo, imágenes, archivos CSS y archivos JavaScript, utilice la función de middleware incorporado `express.static` de Express.

La firma de la función es:

```js
express.static(raíz, [options])
```

El argumento `root` especifica el directorio raíz desde el cual servir activos estáticos.
Para más información sobre el argumento `options`, vea [express.static](/{{page.lang}}/4x/api.html#express.static).

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
Para mejores resultados, [usa un proxy inverso](/{{page.lang}}/advanced/best-practice-performance.html#use-a-reverse-proxy) caché para mejorar el rendimiento de los activos estáticos.
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

Para más detalles sobre la función `serve-static` y sus opciones, vea  [serve-static](/resources/middleware/serve-static.html).

### [Anterior: Ruta Básica](/{{ page.lang }}/starter/basic-routing.html)&nbsp;&nbsp;&nbsp;&nbsp;[Siguiente: Más ejemplos ](/{{ page.lang }}/starter/examples.html)
