---
layout: page
title: Generador de aplicaciones Express
menu: starter
lang: es
---

# Generador de aplicaciones Express

Utilice la herramienta de generador de aplicaciones, `express`, para crear rápidamente un esqueleto de aplicación.

Instale `express` con el siguiente mandato:

```console
$ npm install express-generator -g
```

Muestre las opciones de mandato con la opción `-h`:

```console
$ express -h

  Usage: express [options][dir]

  Options:

    -h, --help          output usage information
        --version       output the version number
    -e, --ejs           add ejs engine support
        --hbs           add handlebars engine support
        --pug           add pug engine support
    -H, --hogan         add hogan.js engine support
        --no-view       generate without view engine
    -v, --view &lt;engine&gt; add view &lt;engine&gt; support (ejs|hbs|hjs|jade|pug|twig|vash) (defaults to jade)
    -c, --css &lt;engine&gt;  add stylesheet &lt;engine&gt; support (less|stylus|compass|sass) (defaults to plain css)
        --git           add .gitignore
    -f, --force         force on non-empty directory
```

Por ejemplo, el código siguiente crea una aplicación Express denominada _myapp_. La aplicación será creada en una carpeta llamada _myapp_ en el directorio de trabajo actual y el motor de vistas será asignado a <a href="https://pugjs.org/" target="_blank" title="Documentación de Pug">Pug</a>:

```console
$ express --view=pug myapp

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
   create : myapp/views/index.pug
   create : myapp/views/layout.pug
   create : myapp/views/error.pug
   create : myapp/bin
   create : myapp/bin/www
```

A continuación, instale las dependencias:

```console
$ cd myapp
$ npm install
```

En MacOS o Linux, ejecute la aplicación con este mandato:

```console
$ DEBUG=myapp:* npm start
```

En Windows, utilice este mandato:

```console
> set DEBUG=myapp:* & npm start
```

A continuación, cargue `http://localhost:3000/` en el navegador para acceder a la aplicación.

La aplicación generada tiene la siguiente estructura de directorios:

```console
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
    ├── error.pug
    ├── index.pug
    └── layout.pug

7 directories, 9 files
```

<div class="doc-box doc-info" markdown="1">
La estructura de la aplicación creada por el generador es sólo una de las muchas formas de estructurar las aplicaciones Express. Puede utilizar esta estructura o modificarla según sus necesidades.
</div>
