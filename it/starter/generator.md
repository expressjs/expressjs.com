---
layout: page
title: Programma di creazione applicazione Express
menu: starter
lang: it
---

# Programma di creazione applicazione Express

Utilizzare lo strumento di creazione dell'applicazione, `express`, per creare velocemente una struttura dell'applicazione.

Installare `express` con il seguente comando:

```console
$ npm install express-generator -g
```

Visualizzare le opzioni del comando con l'opzione `-h`:

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

Ad esempio, quanto segue crea un'applicazione Express denominata _myapp_ nella directory di lavoro corrente:

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

Successivamente, installare le dipendenze:

```console
$ cd myapp
$ npm install
```

Su MacOS o Linux, eseguire l'applicazione con il seguente comando:

```console
$ DEBUG=myapp:* npm start
```

Su Windows, utilizzare questo comando:

```console
> set DEBUG=myapp:* & npm start
```

Quindi caricare `http://localhost:3000/` sul browser per accedere all'applicazione.

L'applicazione creata dispone della seguente struttura per la directory:

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
La struttura dell'applicazione creata dal programma di creazione è solo uno dei tanti modi disponibili per creare la struttura delle applicazioni Express. È possibile utilizzare questa struttura o modificarla a seconda delle proprie necessità.
</div>
