---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Générateur d'applications Express
menu: starter
lang: fr
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

# Générateur d'applications Express

Utilisez l'outil de générateur d'applications, `express`, pour créer rapidement un squelette d'application.

Installez `express` à l'aide de la commande suivante :

<pre>
<code class="language-sh" translate="no">
$ npm install express-generator -g
</code>
</pre>

Affichez les options de commande à l'aide de l'option `-h` :

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

Par exemple, ce qui suit crée une application Express nommée _myapp_ dans le répertoire de travail en cours :

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

Ensuite, installez les dépendances :

<pre>
<code class="language-sh" translate="no">
$ cd myapp
$ npm install
</code>
</pre>

Sous MacOS ou Linux, exécutez l'application à l'aide de la commande suivante :

<pre>
<code class="language-sh" translate="no">
$ DEBUG=myapp:* npm start
</code>
</pre>

Sous Windows, utilisez la commande suivante :

<pre>
<code class="language-sh" translate="no">
> set DEBUG=myapp:* & npm start
</code>
</pre>

Ensuite, chargez 'http://hôte_local:3000/' dans votre navigateur pour accéder à l'application.

L'application générée possède la structure de répertoire suivante :

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
La structure d'application créée par le générateur est l'une des nombreuses manières possibles de structurer les applications Express. Vous avez toute latitude pour l'utiliser ou la modifier en fonction de vos besoins.
</div>
