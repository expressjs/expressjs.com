---
layout: page
title: Генератор приложений Express
menu: starter
lang: ru
---

# Генератор приложений Express

Для быстрого создания "скелета" приложения используется инструмент для генерации приложений `express`.

Установите `express` с помощью следующей команды:

```console
$ npm install express-generator -g
```

Для просмотра опций команды воспользуйтесь опцией `-h`:

```console
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

Например, следующая команда создает приложение Express с именем _myapp_ в текущем рабочем каталоге:

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

Затем установите зависимости:

```console
$ cd myapp
$ npm install
```

В MacOS или Linux запустите приложение с помощью следующей команды:

```console
$ DEBUG=myapp:* npm start
```

В Windows используется следующая команда:

```console
> set DEBUG=myapp:* & npm start
```

Затем откройте страницу http://localhost:3000/ в браузере для доступа к приложению.

Структура каталогов сгенерированного приложения выглядит следующим образом:

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
Структура приложения, сгенерированная с помощью генератора, является всего лишь одним из множества способов организации структуры приложений Express. Вы можете использовать данную структуру или изменять ее в соответствии со своими потребностями.
</div>
