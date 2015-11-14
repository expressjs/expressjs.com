---
layout: page
title: Express "Hello World" пример
menu: starter
lang: ru
---

# Hello world пример

Здесь приведен пример очень простого Express приложения.

~~~js
var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
~~~

<div class="doc-box doc-notice" markdown="1">
`req` (request) и `res` (response) являються теми же объектами которые предоставляет Node, поэтому вы можте выполнить
`req.pipe()`, `req.on('data', callback)` и все другое, что не требует участия Express.
</div>

Приложение запустит сервер и будет слушать соединение на порте 3000. В ответ на запрос главной страницы будет отправлено "Hello World!". Для всех других путей, ответом будет **404 Not Found**.

Сохраните код в файл под названием `app.js` и запустите с помощу следующей команды.

~~~ sh
$ node app.js
~~~

Загрузите [http://localhost:3000/](http://localhost:3000/) в браузере что бы увидеть результат.
