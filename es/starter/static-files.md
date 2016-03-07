---
layout: page
title: Servicio de archivos estáticos en Express
menu: starter
lang: es
---

# Servicio de archivos estáticos en Express

Para el servicio de archivos estáticos como, por ejemplo, imágenes, archivos CSS y archivos JavaScript, utilice la función de middleware incorporado `express.static` de Express.

Pase el nombre del directorio que contiene los activos estáticos a la función de middleware `express.static` para empezar directamente el servicio de los archivos. Por ejemplo, utilice el siguiente código para el servicio de imágenes, archivos CSS y archivos JavaScript en un directorio denominado `public`:

<pre>
<code class="language-javascript" translate="no">
app.use(express.static('public'));
</code>
</pre>

Ahora, puede cargar los archivos que hay en el directorio `public`:

<pre>
<code class="language-javascript" translate="no">
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
</code>
</pre>

<div class="doc-box doc-info">
Express busca los archivos relativos al directorio estático, por lo que el nombre del directorio estático no forma parte del URL.
</div>

Para utilizar varios directorios de activos estáticos, invoque la función de middleware `express.static` varias veces:

<pre>
<code class="language-javascript" translate="no">
app.use(express.static('public'));
app.use(express.static('files'));
</code>
</pre>

Express busca los archivos en el orden en el que se definen los directorios estáticos con la función de middleware `express.static`.

Para crear un prefijo de vía de acceso virtual (donde la vía de acceso no existe realmente en el sistema de archivos) para los archivos a los que da servicio la función `express.static`, [especifique una vía de acceso de montaje](/{{ page.lang }}/4x/api.html#app.use) para el directorio estático, como se muestra a continuación:

<pre>
<code class="language-javascript" translate="no">
app.use('/static', express.static('public'));
</code>
</pre>

Ahora, puede cargar los archivos que hay en el directorio `public` desde el prefijo de vía de acceso `/static`.

<pre>
<code class="language-javascript" translate="no">
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
</code>
</pre>

No obstante, la vía de acceso que proporciona a la función `express.static` es relativa al directorio desde donde inicia el proceso `node`. Si ejecuta la aplicación Express desde cualquier otro directorio, es más seguro utilizar la vía de acceso absoluta del directorio al que desea dar servicio:

<pre>
<code class="language-javascript" translate="no">
app.use('/static', express.static(__dirname + '/public'));
</code>
</pre>
