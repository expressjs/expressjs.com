---
layout: page
title: Express "Hello World"
menu: starter
lang: uz
---

# Hello world 

Bu yerda Express dasturga eng sodda misol keltirilgan.

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
`req` (request) va `res` (response) Node taqdim etayotgan obyektlar hisoblanadi, shuning uchun
`req.pipe()`, `req.on('data', callback)` Express talab qilmaydigan boshqa obyektlar.
</div>

Dastur serverni ishga tushuradi va 3000 portdagi aloqani eshitib turadi. Javob sifatida bosh sahifaga "Hello World!" so'zi jo'natiladi. Qolgan barcha sahifalarga esa **404 Not Found** javobi jo'natiladi.

Kodni yozib, `app.js` faylida saqlab qoying. Uni ishga tushurish uchun quyidagi buyruqni ishga tushiring:

~~~ sh
$ node app.js
~~~

Natijani ko'rish uchun, brauzerdan [http://localhost:3000/](http://localhost:3000/) manziliga kiring.
