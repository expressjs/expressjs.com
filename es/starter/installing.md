---
layout: page
title: Instalación de Express
menu: starter
lang: es
---

# Instalación

Suponiendo que ya ha instalado [Node.js](https://nodejs.org/), cree un directorio para que contenga la aplicación y conviértalo en el directorio de trabajo.

<pre>
<code class="language-sh" translate="no">
$ mkdir myapp
$ cd myapp
</code>
</pre>

Utilice el mandato `npm init` para crear un archivo `package.json` para la aplicación.
Para obtener más información sobre cómo funciona `package.json`, consulte [Specifics of npm's package.json handling](https://docs.npmjs.com/files/package.json).

<pre>
<code class="language-sh" translate="no">
$ npm init
</code>
</pre>

Este mandato solicita varios elementos como, por ejemplo, el nombre y la versión de la aplicación.
Por ahora, sólo tiene que pulsar INTRO para aceptar los valores predeterminados para la mayoría de ellos, con la siguiente excepción:

<pre>
<code class="language-sh" translate="no">
entry point: (index.js)
</code>
</pre>

Especifique `app.js` o el nombre que desee para el archivo principal. Si desea que sea `index.js`, pulse INTRO para aceptar el nombre de archivo predeterminado recomendado.

A continuación, instale Express en el directorio `app` y guárdelo en la lista de dependencias. Por ejemplo:

<pre>
<code class="language-sh" translate="no">
$ npm install express --save
</code>
</pre>

Para instalar Express temporalmente y no añadirlo a la lista de dependencias, omita la opción `--save`:

<pre>
<code class="language-sh" translate="no">
$ npm install express
</code>
</pre>

<div class="doc-box doc-info" markdown="1">
Los módulos de Node que se instalan con la opción `--save` se añaden a la lista `dependencies` en el archivo `package.json`.
Posteriormente, si ejecuta `npm install` en el directorio `app`, los módulos se instalarán automáticamente en la lista de dependencias.
</div>
