---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Пример "Hello World" в Express
menu: starter
lang: ru
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

# Пример "Hello world"

<div class="doc-box doc-info" markdown="1">
Ниже приведен пример самого простого приложения, которое можно создать с помощью Express. Оно состоит из одного файла, *в отличие* от приложений, генерируемых с помощью [генератора приложений Express](/{{ page.lang }}/starter/generator.html), который обеспечивает создание основы для полноценного приложения с многочисленными файлами на JavaScript, шаблонами Jade и вложенными каталогами различного предназначения.
</div>

Вначале создайте каталог с именем `myapp`, перейдите в него и запустите команду `npm init`. Затем установите `express` как зависимость, следуя указаниям, приведенным в [руководстве по установке](/{{ page.lang }}/starter/installing.html).

В каталоге `myapp` создайте файл с именем `app.js` и добавьте следующий код:

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
</code>
</pre>

Приложение запускает сервер и слушает соединения на порте 3000. Приложение выдает ответ "Hello World!" на запросы, адресованные корневому URL (`/`) или *маршруту*. Для всех остальных путей ответом будет **404 Not Found**.

<div class="doc-box doc-notice" markdown="1">
`req` (запрос) и `res` (ответ) являются теми же объектами, которые предоставляет Node,  поэтому можно вызвать `req.pipe()`, `req.on('data', callback)` и выполнить любые другие действия, не требующие участия Express.
</div>

Запустите приложение с помощью следующей команды:

<pre>
<code class="language-sh" translate="no">
$ node app.js
</code>
</pre>

После этого откройте в браузере страницу [http://localhost:3000/](http://localhost:3000/), чтобы просмотреть результат.

