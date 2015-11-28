---
layout: page
title: Express "Hello World" приклад
menu: starter
lang: uk
---

# Hello world приклад

Тут наведено приклад дуже простого Express додатку.

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
`req` (request) і` res` (response) є тими ж об'єктами які надає Node, тому ви можете виконати
`req.pipe ()`, `req.on ('data', callback)` і все інше, що не вимагає участі Express.
</div>

Додаток запусте сервер і буде слухати з'єднання на порту 3000. У відповідь на запит головної сторінки буде відправлено "Hello World!". Для всіх інших шляхів, відповіддю буде ** 404 Not Found **.

Збережіть код в файл під назвою `app.js` і запустіть за допомогою наступних команд.

~~~ sh
$ node app.js
~~~

Завантажте [http://localhost:3000/](http://localhost:3000/) в браузері щоб побачити результат.
