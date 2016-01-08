---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Generador de aplicaciones Express
menu: starter
lang: es
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

# Generador de aplicaciones Express

Utilice la herramienta de generador de aplicaciones, `express`, para crear rápidamente un esqueleto de aplicación.

Instale `express` con el siguiente mandato:

<pre>
<code class="language-sh" translate="no">
$ npm install express-generator -g
</code>
</pre>

Muestre las opciones de mandato con la opción `-h`:

<pre>
<code class="language-sh" translate="no">
$ express -h

  Usage: express [options][dir]

  Options:

    -h, --help          output usage information
    -V, --version       output the version number
    -e, --ejs           add ejs engine support (defaults to jade)
        --hbs           add handlebars engine support
    -H, --hogan         add hogan.js engine support
    -c, --css &lt;engine&gt;  add stylesheet &lt;engine&gt; support (less|stylus|compass|sass) (defaults to plain css)
        --git           add .gitignore
    -f, --force         force on non-empty directory
</code>
</pre>

Por ejemplo, el código siguiente crea una aplicación Express denominada _myapp_ en el directorio de trabajo actual:

<pre>
<code class="language-sh" translate="no">
$ express myapp

   create : myapp
   create : myapp/package.json
   create : myapp/app.js
   create : myapp/public
   create : myapp/public/javascripts
   create : myapp/public/images
   create : myapp/routes
   create : myapp/routes/index.js
   create : myapp/routes/users.js
   create : myapp/public/stylesheets
   create : myapp/public/stylesheets/style.css
   create : myapp/views
   create : myapp/views/index.jade
   create : myapp/views/layout.jade
   create : myapp/views/error.jade
   create : myapp/bin
   create : myapp/bin/www
</code>
</pre>

A continuación, instale las dependencias:

<pre>
<code class="language-sh" translate="no">
$ cd myapp
$ npm install
</code>
</pre>

En MacOS o Linux, ejecute la aplicación con este mandato:

<pre>
<code class="language-sh" translate="no">
$ DEBUG=myapp:* npm start
</code>
</pre>

En Windows, utilice este mandato:

<pre>
<code class="language-sh" translate="no">
> set DEBUG=myapp:* & npm start
</code>
</pre>

A continuación, cargue `http://localhost:3000/` en el navegador para acceder a la aplicación.

La aplicación generada tiene la siguiente estructura de directorios:

<pre>
<code class="language-sh" translate="no">
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.jade
    ├── index.jade
    └── layout.jade

7 directories, 9 files
</code>
</pre>

<div class="doc-box doc-info" markdown="1">
La estructura de la aplicación creada por el generador es sólo una de las muchas formas de estructurar las aplicaciones Express. Puede utilizar esta estructura o modificarla según sus necesidades.
</div>
