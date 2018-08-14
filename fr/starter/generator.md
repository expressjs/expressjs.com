---
layout: page
title: Générateur d'applications Express
menu: starter
lang: fr
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
</code>
</pre>

Par exemple, ce code crée une application Express nomée _myapp_. L'application sera crée dans le dossier _myapp_, lui meme placé dans le repertoir de travail courant. Le moteur de vue sera configuré avec <a href="pugjs.org" target="_blank" title="Documentation Pug">Pug</a>:

<pre>
<code class="language-sh" translate="no">
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
    ├── error.pug
    ├── index.pug
    └── layout.pug

7 directories, 9 files
</code>
</pre>

<div class="doc-box doc-info" markdown="1">
La structure d'application créée par le générateur est l'une des nombreuses manières possibles de structurer les applications Express. Vous avez toute latitude pour l'utiliser ou la modifier en fonction de vos besoins.
</div>
