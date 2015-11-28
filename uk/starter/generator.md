---
layout: page
title: Генератор Express додатку
menu: starter
lang: uk
---

# Генератор Express додатку

Використовуйте інструмент генерації додатків, `express`, для швидкого створення скелета додатку.

Встановлюйте його за допомогою команди.

~~~sh
$ npm install express-generator -g
~~~

Для перегляду опцій команди використовуйте `-h` опцію:

~~~sh
$ express -h

  Usage: express [options] [dir]

  Options:

    -h, --help          output usage information
    -V, --version       output the version number
    -e, --ejs           add ejs engine support (defaults to jade)
        --hbs           add handlebars engine support
    -H, --hogan         add hogan.js engine support
    -c, --css <engine>  add stylesheet <engine> support (less|stylus|compass) (defaults to plain css)
    -f, --force         force on non-empty directory
~~~

Приклад, наступна команда створює Express додаток з ім'ям _myapp_ в поточній директорії.

~~~sh
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
~~~

Далі вам потрібно встановити залежності:

~~~sh
$ cd myapp 
$ npm install
~~~

Запуск програми (на MacOS або Linux):

~~~sh
$ DEBUG=myapp ./bin/www
~~~

На Windows, використовуйте наступну команду:

~~~sh
> set DEBUG=myapp & node .\bin\www
~~~

Далі відкрийте `http://localhost:3000/` у вашому браузері щоб подивитися роботу програми.

Згенерована структура додатку виглядає наступним чином.

~~~sh
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
~~~

<div class="doc-box doc-info" markdown="1">
Структура додатку згенерувала за допомогою генератора, всього лише один з безлічі способів організації структури Express додатків. Ви можете не використовувати Дану структуру або змінити її кращого використання під ваші потреби.
</div>
