---
layout: page
title: Instalación de Express
menu: starter
lang: es
---

# Instalación

Lo primero, crea un directorio para su aplicación, si no lo ha hecho, y entrar en su directorio de trabajo.

~~~sh
$ mkdir myapp
$ cd myapp
~~~

Crea un archivo `package.json` en el directorio de interés, si no existe ya, con el comando `npm init`.

~~~sh
$ npm init
~~~

Instala Express en el directorio y guardarlo en la lista de dependencias:

~~~sh
$ npm install express --save
~~~

Para instalar Express temporalmente, y no agregarlo a la listade dependencias, omitir la opción `--save`:

~~~sh
$ npm install express
~~~

<div class="doc-box doc-info" markdown="1">
Módulos de Node instalados con la opción `--save` se añaden a la lista de `dependencias` en el archivo `package.json`.
Luego, utilizando el comando `npm install` en el directorio de la aplicación se instalará automáticamente los módulos en la lista de dependencias.
</div>
