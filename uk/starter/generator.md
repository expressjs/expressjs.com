---
layout: page
title: Генератор структури застосунків Express
menu: starter
lang: uk
---

# Генератор структури застосунків Express

Можна використовувати інструмент `express-generator`, для швидкого створення каркасу застосунку.

Встановлюється `express-generator` наступною командою:

```console
$ npm install express-generator -g
```

З параметром `-h` можна проглянути доступні опції:

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

В наступному прикладі створюється каркас застосунку Express з іменем _myapp_ в поточній директорії:

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

Після чого треба встановити залежності:

```console
$ cd myapp
$ npm install
```

На MacOS чи Linux, запустіть застосунок такою командою:

```console
$ DEBUG=myapp:* npm start
```

На Windows, запускайте так:

```console
> set DEBUG=myapp:* & npm start
```

Тепер вводьте в адресному рядку браузера `http://localhost:3000/`.

Згенерований застосунок має наступну структуру директорій:

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
Створена структура за допомогою генератора є лише однією із багатьох можливих варіантів структури застосунків Express.
Не обмежуйте себе лише такою структурою, змінюйте її під свої потреби.
</div>
