---
layout: page
title: Express generátor
menu: starter
lang: sk
---
<!---
 Copyright (c) 2016 StrongLoop, IBM, and Express Contributors
 License: MIT
-->

# Express generátor

Pre rýchle vygenerovanie skeletonu aplikácie môžete použit nástroj `express-generator`.

Nainštalujte `express-generator` pomocou nasledujúceho príkazu:

```console
$ npm install express-generator -g
```

Pre zobrazenie ďalších možností príkazu zadajte prepínač `-h`:

```console
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
    -v, --view &lt;engine&gt; add view &lt;engine&gt; support (ejs|hbs|hjs|jade|pug|twig|vash) (defaults to jade)
    -c, --css &lt;engine&gt;  add stylesheet &lt;engine&gt; support (less|stylus|compass|sass) (defaults to plain css)
        --git           add .gitignore
    -f, --force         force on non-empty directory
```

Nasledujúci príkaz vytvorí v aktuálnom priečinku Express aplikáciu s názvom _myapp_:

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

Potom nainštalujte dependencie:

```console
$ cd myapp
$ npm install
```

Na MacOS príp. Linux, spustíte aplikáciu príkazom:

```console
$ DEBUG=myapp:* npm start
```

Na Windows, príkazom:

```console
> set DEBUG=myapp:* & npm start
```

Potom v prehliadači zadajte `http://localhost:3000/`.

Vygenerovaná aplikácia má naslednovnú štruktúru priečinkov:

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
Takáto štruktúra aplikácie je len jedným z mnohých spôsobov usporiadania Express aplikácie. Môžete ju použit, alebo ju zmeniť tak, ako vám bude najlepšie vyhovovať.
</div>
