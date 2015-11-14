---
layout: page
title: Генератор Express приложения
menu: starter
lang: ru
---

# Генератор Express приложения

Используйте инструмент генерации приложений, `express`, для быстрого создания скелета приложения.

Устанавливайте его с помощу команды.

~~~sh
$ npm install express-generator -g
~~~

Для просмотра опций команды используйте `-h` опцию:

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

Пример, следующая команда создаст Express приложение с именем _myapp_ в текущей директории.

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

Далее вам нужно установить зависимости:

~~~sh
$ cd myapp 
$ npm install
~~~

Запуск приложения (на MacOS или Linux):

~~~sh
$ DEBUG=myapp ./bin/www
~~~

На Windows, используйте слудующу команду:

~~~sh
> set DEBUG=myapp & node .\bin\www
~~~

Далее откройте `http://localhost:3000/` в вашем браузере что бы посмотреть работу приложения.

Сгенерированя структура приложения выглядит следующим образом.

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
Структура приложения сгенерированая с помощью генератора, всего лишь один из множества способов организации структуры Express приложений. Вы можете не использовать даную структуру или изменить её лучшего использования под ваши нужды.
</div>
