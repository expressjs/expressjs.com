---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Programma di creazione applicazione Express
menu: starter
lang: it
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

# Programma di creazione applicazione Express

Utilizzare lo strumento di creazione dell'applicazione, `express`, per creare velocemente una struttura dell'applicazione.

Installare `express` con il seguente comando:

<pre>
<code class="language-sh" translate="no">
$ npm install express-generator -g
</code>
</pre>

Visualizzare le opzioni del comando con l'opzione `-h`:

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

Ad esempio, quanto segue crea un'applicazione Express denominata _myapp_ nella directory di lavoro corrente:

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

Successivamente, installare le dipendenze:

<pre>
<code class="language-sh" translate="no">
$ cd myapp
$ npm install
</code>
</pre>

Su MacOS o Linux, eseguire l'applicazione con il seguente comando:

<pre>
<code class="language-sh" translate="no">
$ DEBUG=myapp:* npm start
</code>
</pre>

Su Windows, utilizzare questo comando:

<pre>
<code class="language-sh" translate="no">
> set DEBUG=myapp:* & npm start
</code>
</pre>

Quindi caricare `http://localhost:3000/` sul browser per accedere all'applicazione.

L'applicazione creata dispone della seguente struttura per la directory:

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
La struttura dell'applicazione creata dal programma di creazione è solo uno dei tanti modi disponibili per creare la struttura delle applicazioni Express. È possibile utilizzare questa struttura o modificarla a seconda delle proprie necessità.
</div>
