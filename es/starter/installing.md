---
layout: page
title: Instalación de Express
menu: starter
lang: es
---

# Instalación

Lo primero, crea un directorio para su aplicación, si no lo ha hecho, y entrar en su directorio de trabajo.

<pre><code class="language-sh" translate="no">
$ mkdir myapp
$ cd myapp
</code></pre>

Crea un archivo `package.json` en el directorio de interés, si no existe ya, con el comando `npm init`.

<pre><code class="language-sh" translate="no">
$ npm init
</code></pre>

Instala Express en el directorio y guardarlo en la lista de dependencias:

<pre><code class="language-sh" translate="no">
$ npm install express --save
</code></pre>

Para instalar Express temporalmente, y no agregarlo a la listade dependencias, omitir la opción `--save`:

<pre><code class="language-sh" translate="no">
$ npm install express
</code></pre>

<div class="doc-box doc-info" markdown="1">
Módulos de Node instalados con la opción `--save` se añaden a la lista de `dependencias` en el archivo `package.json`.
Luego, utilizando el comando `npm install` en el directorio de la aplicación se instalará automáticamente los módulos en la lista de dependencias.
</div>
