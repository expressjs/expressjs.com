---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Express generátor
menu: starter
lang: sk
redirect_from: "/starter/generator.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

# Express generátor

Pre rýchle vygenerovanie skeletonu aplikácie môžete použit nástroj `express`.

Nainštalujte `express` pomocou nasledujúceho príkazu:

<pre>
<code class="language-sh" translate="no">
$ npm install express-generator -g
</code>
</pre>

Pre zobrazenie ďalších možností príkazu zadajte prepínač `-h`:

<pre>
<code class="language-sh" translate="no">
$ express -h

  Usage: express [options] [dir]

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

Nasledujúci príkaz vytvorí v aktuálnom priečinku Express aplikáciu s názvom _myapp_:

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

Potom nainštalujte dependencie:

<pre>
<code class="language-sh" translate="no">
$ cd myapp
$ npm install
</code>
</pre>

Na MacOS príp. Linux, spustíte aplikáciu príkazom:

<pre>
<code class="language-sh" translate="no">
$ DEBUG=myapp:* npm start
</code>
</pre>

Na Windows, príkazom:

<pre>
<code class="language-sh" translate="no">
> set DEBUG=myapp:* & npm start
</code>
</pre>

Potom v prehliadači zadajte `http://localhost:3000/`.

Vygenerovaná aplikácia má naslednovnú štruktúru priečinkov:

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
Takáto štruktúra aplikácie je len jedným z mnohých spôsobov usporiadania Express aplikácie. Môžete ju použit, alebo ju zmeniť tak, ako vám bude najlepšie vyhovovať.
</div>
