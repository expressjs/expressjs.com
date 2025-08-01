---
layout: page
title: Gerador de aplicativos do Express
description: Learn how to use the Express application generator tool to quickly create a skeleton for your Express.js applications, streamlining setup and configuration.
menu: starter
redirect_from: "  "
---

# Gerador de aplicativos do Express

Use a ferramenta geradora de aplicativos, `express`,
para rapidamente criar uma estrutura básica de aplicativo.

You can run the application generator with the `npx` command (available in Node.js 8.2.0).

```bash
$ npx express-generator
```

For earlier Node versions, install the application generator as a global npm package and then launch it:

```bash
$ npm install -g express-generator
$ express
```

Exiba as opções de comando com a opção `-h`:

```bash
$ express -h

  Usage: express [options] [dir]

  Options:

    -h, --help          output usage information
        --version       output the version number
    -e, --ejs           add ejs engine support
        --hbs           add handlebars engine support
        --pug           add pug engine support
    -H, --hogan         add hogan.js engine support
        --no-view       generate without view engine
    -v, --view <engine> add view <engine> support (ejs|hbs|hjs|jade|pug|twig|vash) (defaults to jade)
    -c, --css <engine>  add stylesheet <engine> support (less|stylus|compass|sass) (defaults to plain css)
        --git           add .gitignore
    -f, --force         force on non-empty directory
```

Por exemplo, o seguinte cria um aplicativo do Express chamado _myapp_
no diretório atualmente em funcionamento: The app will be created in a folder named _myapp_ in the current working directory and the view engine will be set to <a href="https://pugjs.org/" target="_blank" title="Pug documentation">Pug</a>:

```bash
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

Em seguida instale as dependências:

```bash
$ cd myapp
$ npm install
```

No MacOS ou Linux, execute o aplicativo com este comando:

```bash
$ DEBUG=myapp:* npm start
```

No Windows, use este comando:

```bash
> set DEBUG=myapp:* & npm start
```

Instale o `express` com o comando a seguir:

```bash
PS> $env:DEBUG='myapp:*'; npm start
```

Em seguida carregue `http://localhost:3000/` no seu navegador para acessar o aplicativo.

O aplicativo gerado possui a seguinte estrutura de diretórios:

```bash
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
A estrutura de aplicativo criada pelo gerador é apenas uma das várias maneiras de estruturar aplicativos do Express. É possível utilizar esta estrutura ou modificá-la para melhor se adequar às suas necessidades.
</div>

### [Previous: Hello World ](/{{ page.lang }}/starter/hello-world.html)&nbsp;&nbsp;&nbsp;&nbsp;[Next: Basic routing](/{{ page.lang }}/starter/basic-routing.html)
