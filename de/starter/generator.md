---
layout: page
title: Express-Anwendungsgenerator
menu: starter
lang: de
---

# Express-Anwendungsgenerator

Mit dem Application Generator Tool `express` können Sie innerhalb kürzester Zeit ein Anwendungsgerüst erstellen.

Installieren Sie `express` mit dem folgenden Befehl:

```sh
$ npm install express-generator -g
```

Zeigen Sie die Befehlsoptionen mit der Option `-h` an:

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

Im folgenden Beispiel wird eine Express-Anwendung mit dem Namen _myapp_ im aktuellen Arbeitsverzeichnis erstellt:

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

Installieren Sie dann Abhängigkeiten:

```sh
$ cd myapp
$ npm install
```

Führen Sie unter MacOS oder Linux die Anwendung mit diesem Befehl aus:

```sh
$ DEBUG=myapp:* npm start
```

Verwenden Sie unter Windows diesen Befehl:

```sh
> set DEBUG=myapp:* & npm start
```

Laden Sie dann `http://localhost:3000/` in Ihren Browser, um auf die Anwendung zuzugreifen.

Die erstellte Anwendung hat die folgende Verzeichnisstruktur:

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
Die vom Generator erstellte Anwendungsstruktur ist nur eine der vielen Möglichkeiten, Express-Anwendungen zu strukturieren. Sie können diese Struktur verwenden oder sie an Ihre Anforderungen anpassen.
</div>
