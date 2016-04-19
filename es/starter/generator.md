---
layout: page
title: Generador de aplicaciones Express
menu: starter
lang: es
---

# Generador de aplicaciones Express

Utilice la herramienta de generador de aplicaciones, `express`, para crear rápidamente un esqueleto de aplicación.

Instale `express` con el siguiente mandato:

```sh
$ npm install express-generator -g
```

Muestre las opciones de mandato con la opción `-h`:

```sh
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
```

Por ejemplo, el código siguiente crea una aplicación Express denominada _myapp_ en el directorio de trabajo actual:

```sh
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
```

A continuación, instale las dependencias:

```sh
$ cd myapp
$ npm install
```

En MacOS o Linux, ejecute la aplicación con este mandato:

```sh
$ DEBUG=myapp:* npm start
```

En Windows, utilice este mandato:

```sh
> set DEBUG=myapp:* & npm start
```

A continuación, cargue `http://localhost:3000/` en el navegador para acceder a la aplicación.

La aplicación generada tiene la siguiente estructura de directorios:

```sh
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
```

<div class="doc-box doc-info" markdown="1">
La estructura de la aplicación creada por el generador es sólo una de las muchas formas de estructurar las aplicaciones Express. Puede utilizar esta estructura o modificarla según sus necesidades.
</div>
