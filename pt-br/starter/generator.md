---
layout: page
title: Gerador de aplicação Express
menu: starter
lang: pt-br
---

# Gerador de aplicação Express

Utiliza a ferramenta de geração de aplicação, `express`, para rapidamente criar um esqueleto de aplicação.

Instale com a seguinte linha de comando.

<pre><code class="language-sh" translate="no">
$ npm install express-generator -g
</code></pre>

Mostre as opções de comando com a opção `-h`:

<pre><code class="language-sh" translate="no">
$ express -h

  Usage: express [options] [dir]

  Options:

    -h, --help          output usage information
    -V, --version       output the version number
    -e, --ejs           add ejs engine support (defaults to jade)
        --hbs           add handlebars engine support
    -H, --hogan         add hogan.js engine support
    -c, --css &lt;engine>  add stylesheet &lt;engine> support (less|stylus|compass|sass) (defaults to plain css)
        --git           add .gitignore
    -f, --force         force on non-empty directory
</code></pre>

Por exemplo, o seguinte comando cria uma aplicação Express nomeada _myapp_ no diretório corrente.

<pre><code class="language-sh" translate="no">
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
</code></pre>

Então instale as dependências:

<pre><code class="language-sh" translate="no">
$ cd myapp
$ npm install
</code></pre>

Rode a aplicação (no MaxOS ou Linux):

<pre><code class="language-sh" translate="no">
$ DEBUG=myapp npm start
</code></pre>

No Windows, utilize este comando:

<pre><code class="language-sh" translate="no">
> set DEBUG=myapp & npm start
</code></pre>

Então abra `http://localhost:3000` no seu <i>browser</i> para acessar a aplicação.

A estrutura da aplicação gerada será semelhante a esta.

<pre><code class="language-sh" translate="no">
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
</code></pre>

<div class="doc-box doc-info" markdown="1">
A estrutura de aplicação gerada pelo gerador é apenas uma dos múltiplos jeitos de estruturar uma aplicação Express. Sinta-se livre para não usá-la ou modificá-la para melhor atender suas necessidades.
</div>
