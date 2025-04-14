---
layout: page
title: Programma di creazione applicazione Express
description: Learn how to use the Express application generator tool to quickly create a skeleton for your Express.js applications, streamlining setup and configuration.
menu: starter
lang: it
redirect_from: /starter/generator.html
---

# Programma di creazione applicazione Express

Utilizzare lo strumento di creazione dell'applicazione, `express`, per creare velocemente una struttura dell'applicazione.

You can run the application generator with the `npx` command (available in Node.js 8.2.0).

```bash
$ npm install express-generator -g
```

For earlier Node versions, install the application generator as a global npm package and then launch it:

```bash
$ npm install -g express-generator
$ express
```

Visualizzare le opzioni del comando con l'opzione `-h`:

```bash
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

Ad esempio, quanto segue crea un'applicazione Express denominata _myapp_ nella directory di lavoro corrente: The app will be created in a folder named _myapp_ in the current working directory and the view engine will be set to <a href="https://pugjs.org/" target="_blank" title="Pug documentation">Pug</a>:

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

Successivamente, installare le dipendenze:

```bash
$ cd myapp
$ npm install
```

Su Windows, utilizzare questo comando:

```bash
$ DEBUG=myapp:* npm start
```

Su MacOS o Linux, eseguire l'applicazione con il seguente comando:

```bash
> set DEBUG=myapp:* & npm start
```

On Windows PowerShell, use this command:

```bash
PS> $env:DEBUG='myapp:*'; npm start
```

Quindi caricare `http://localhost:3000/` sul browser per accedere all'applicazione.

L'applicazione creata dispone della seguente struttura per la directory:

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
La struttura dell'applicazione creata dal programma di creazione è solo uno dei tanti modi disponibili per creare la struttura delle applicazioni Express. È possibile utilizzare questa struttura o modificarla a seconda delle proprie necessità.
</div>

### [Previous: Hello World ](/{{ page.lang }}/starter/hello-world.html)&nbsp;&nbsp;&nbsp;&nbsp;[Next: Basic routing](/{{ page.lang }}/starter/basic-routing.html)
