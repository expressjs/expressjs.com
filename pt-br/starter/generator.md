---
layout: page
title: Gerador de aplicação Express
menu: starter
lang: pt-br
---

# Gerador de aplicação Express

Utiliza a ferramenta de geração de aplicação, `express`, para rapidamente criar um esqueleto de aplicação.

Instale com a seguinte linha de comando.

~~~sh
$ npm install express-generator -g
~~~

Mostre as opções de comando com a opção `-h`:

~~~sh
$ express -h

  Usage: express [options] [dir]

  Options:

    -h, --help          output usage information
    -V, --version       output the version number
    -e, --ejs           add ejs engine support (defaults to jade)
        --hbs           add handlebars engine support
    -H, --hogan         add hogan.js engine support
    -c, --css <engine>  add stylesheet <engine> support (less|stylus|compass|sass) (defaults to plain css)
        --git           add .gitignore
    -f, --force         force on non-empty directory
~~~

Por exemplo, o seguinte comando cria uma aplicação Express nomeada _myapp_ no diretório corrente.

~~~sh
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
~~~

Então instale as dependências:

~~~sh
$ cd myapp 
$ npm install
~~~

Rode a aplicação (no MaxOS ou Linux):

~~~sh
$ DEBUG=myapp npm start
~~~

No Windows, utilize este comando:

~~~sh
> set DEBUG=myapp & npm start
~~~

Então abra `http://localhost:3000` no seu <i>browser</i> para acessar a aplicação.

A estrutura da aplicação gerada será semelhante a esta.

~~~sh
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.jade
    ├── index.jade
    └── layout.jade

7 directories, 9 files
~~~

<div class="doc-box doc-info" markdown="1">
A estrutura de aplicação gerada pelo gerador é apenas uma dos múltiplos jeitos de estruturar uma aplicação Express. Sinta-se livre para não usá-la ou modificá-la para melhor atender suas necessidades.
</div>
