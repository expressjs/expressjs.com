---
layout: page
title: Генератор Express додатку
menu: starter
lang: uk
---

# Генератор Express додатку

Використовуйте інструмент генерації додатків, `express`, для швидкого створення скелета додатку.

Встановлюйте його за допомогою команди.

<pre><code class="language-sh" translate="no">
$ npm install express-generator -g
</code></pre>

Для перегляду опцій команди використовуйте `-h` опцію:

<pre><code class="language-sh" translate="no">
$ express -h

  Usage: express [options] [dir]

  Options:

    -h, --help          output usage information
    -V, --version       output the version number
    -e, --ejs           add ejs engine support (defaults to jade)
        --hbs           add handlebars engine support
    -H, --hogan         add hogan.js engine support
    -c, --css &lt;engine>  add stylesheet &lt;engine> support (less|stylus|compass) (defaults to plain css)
    -f, --force         force on non-empty directory
</code></pre>

Приклад, наступна команда створює Express додаток з ім'ям _myapp_ в поточній директорії.

<pre><code class="language-sh" translate="no">
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
</code></pre>

Далі вам потрібно встановити залежності:

<pre><code class="language-sh" translate="no">
$ cd myapp
$ npm install
</code></pre>

Запуск програми (на MacOS або Linux):

<pre><code class="language-sh" translate="no">
$ DEBUG=myapp ./bin/www
</code></pre>

На Windows, використовуйте наступну команду:

<pre><code class="language-sh" translate="no">
> set DEBUG=myapp & node .\bin\www
</code></pre>

Далі відкрийте `http://localhost:3000/` у вашому браузері щоб подивитися роботу програми.

Згенерована структура додатку виглядає наступним чином.

<pre><code class="language-sh" translate="no">
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.jade
    ├── index.jade
    └── layout.jade

7 directories, 9 files
</code></pre>

<div class="doc-box doc-info" markdown="1">
Структура додатку згенерувала за допомогою генератора, всього лише один з безлічі способів організації структури Express додатків. Ви можете не використовувати Дану структуру або змінити її кращого використання під ваші потреби.
</div>
