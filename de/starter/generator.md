---
layout: page
title: Express-Anwendungsgenerator
description: Learn how to use the Express application generator tool to quickly create a skeleton for your Express.js applications, streamlining setup and configuration.
menu: starter
lang: de
redirect_from: /starter/generator.html
---

# Express-Anwendungsgenerator

Mit dem Application Generator Tool `express` können Sie innerhalb kürzester Zeit ein Anwendungsgerüst erstellen.

You can run the application generator with the `npx` command (available in Node.js 8.2.0).

```bash
$ npm install express-generator -g
```

For earlier Node versions, install the application generator as a global npm package and then launch it:

```bash
$ npm install -g express-generator
$ express
```

Zeigen Sie die Befehlsoptionen mit der Option `-h` an:

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

Im folgenden Beispiel wird eine Express-Anwendung mit dem Namen _myapp_ im aktuellen Arbeitsverzeichnis erstellt: The app will be created in a folder named _myapp_ in the current working directory and the view engine will be set to <a href="https://pugjs.org/" target="_blank" title="Pug documentation">Pug</a>:

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

Installieren Sie dann Abhängigkeiten:

```bash
$ cd myapp
$ npm install
```

Verwenden Sie unter Windows diesen Befehl:

```bash
$ DEBUG=myapp:* npm start
```

Führen Sie unter MacOS oder Linux die Anwendung mit diesem Befehl aus:

```bash
> set DEBUG=myapp:* & npm start
```

On Windows PowerShell, use this command:

```bash
PS> $env:DEBUG='myapp:*'; npm start
```

Laden Sie dann `http://localhost:3000/` in Ihren Browser, um auf die Anwendung zuzugreifen.

Die erstellte Anwendung hat die folgende Verzeichnisstruktur:

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
Die vom Generator erstellte Anwendungsstruktur ist nur eine der vielen Möglichkeiten, Express-Anwendungen zu strukturieren. Sie können diese Struktur verwenden oder sie an Ihre Anforderungen anpassen.
</div>

### [Previous: Hello World ](/{{ page.lang }}/starter/hello-world.html)&nbsp;&nbsp;&nbsp;&nbsp;[Next: Basic routing](/{{ page.lang }}/starter/basic-routing.html)
