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

```sh
$ npm install express-generator -g
```

Pre zobrazenie ďalších možností príkazu zadajte prepínač `-h`:

```sh
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
```

Nasledujúci príkaz vytvorí v aktuálnom priečinku Express aplikáciu s názvom _myapp_:

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

Potom nainštalujte dependencie:

```sh
$ cd myapp
$ npm install
```

Na MacOS príp. Linux, spustíte aplikáciu príkazom:

```sh
$ DEBUG=myapp:* npm start
```

Na Windows, príkazom:

```sh
> set DEBUG=myapp:* & npm start
```

Potom v prehliadači zadajte `http://localhost:3000/`.

Vygenerovaná aplikácia má naslednovnú štruktúru priečinkov:

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
Takáto štruktúra aplikácie je len jedným z mnohých spôsobov usporiadania Express aplikácie. Môžete ju použit, alebo ju zmeniť tak, ako vám bude najlepšie vyhovovať.
</div>
