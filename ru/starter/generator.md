---
layout: page
title: Генератор приложения Express
menu: starter
lang: ru
---

# Генератор приложения Express

Используйте инструмент для генерации приложений `express` для быстрого создания скелета приложения.

Устанавливайте его с помощью следующей команды.

<pre><code class="language-sh" translate="no">
$ npm install express-generator -g
</code></pre>

Для просмотра опций команды используйте опцию `-h`:

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

Например, следующая команда создаст приложение Express с именем _myapp_ в текущей директории.

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

Далее вам нужно установить зависимости:

<pre><code class="language-sh" translate="no">
$ cd myapp
$ npm install
</code></pre>

Запуск приложения (на MacOS или Linux):

<pre><code class="language-sh" translate="no">
$ DEBUG=myapp ./bin/www
</code></pre>

На Windows используйте следующую команду:

<pre><code class="language-sh" translate="no">
> set DEBUG=myapp & node .\bin\www
</code></pre>

Далее откройте `http://localhost:3000/` в вашем браузере, чтобы запустить приложение.

Сгенерированая структура приложения выглядит следующим образом.

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
Структура приложения, сгенерированая с помощью генератора, является всего лишь одним из множества способов организации структуры приложений Express. Вы можете не использовать даную структуру или изменить её для лучшего соответствия вашим нуждам.
</div>
