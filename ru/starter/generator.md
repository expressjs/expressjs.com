---
layout: page
title: Генератор приложений Express
menu: starter
lang: ru
---

# Генератор приложений Express

Для быстрого создания "скелета" приложения используется инструмент для генерации приложений `express`.

Установите `express` с помощью следующей команды:

```sh
$ npm install express-generator -g
```

Для просмотра опций команды воспользуйтесь опцией `-h`:

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

Например, следующая команда создает приложение Express с именем _myapp_ в текущем рабочем каталоге:

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

Затем установите зависимости:

```sh
$ cd myapp
$ npm install
```

В MacOS или Linux запустите приложение с помощью следующей команды:

```sh
$ DEBUG=myapp:* npm start
```

В Windows используется следующая команда:

```sh
> set DEBUG=myapp:* & npm start
```

Затем откройте страницу http://localhost:3000/ в браузере для доступа к приложению.

Структура каталогов сгенерированного приложения выглядит следующим образом:

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
Структура приложения, сгенерированная с помощью генератора, является всего лишь одним из множества способов организации структуры приложений Express. Вы можете использовать данную структуру или изменять ее в соответствии со своими потребностями.
</div>
