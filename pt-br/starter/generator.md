---
layout: page
title: Gerador de aplicativos do Express
menu: starter
lang: pt-br
---

# Gerador de aplicativos do Express

Use a ferramenta geradora de aplicativos, `express`,
para rapidamente criar uma estrutura básica de aplicativo.

Instale o `express` com o comando a seguir:

```sh
$ npm install express-generator -g
```

Exiba as opções de comando com a opção `-h`:

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

Por exemplo, o seguinte cria um aplicativo do Express chamado _myapp_
no diretório atualmente em funcionamento:

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

Em seguida instale as dependências:

```sh
$ cd myapp
$ npm install
```

No MacOS ou Linux, execute o aplicativo com este comando:

```sh
$ DEBUG=myapp:* npm start
```

No Windows, use este comando:

```sh
> set DEBUG=myapp:* & npm start
```

Em seguida carregue `http://localhost:3000/` no seu navegador para acessar o aplicativo.


O aplicativo gerado possui a seguinte estrutura de diretórios:

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
A estrutura de aplicativo criada pelo gerador é apenas uma das várias maneiras de estruturar aplicativos do Express.
É possível utilizar esta estrutura ou modificá-la para melhor se adequar às suas necessidades.
</div>
