---
layout: page
title: Express "Hello World"
menu: starter
lang: uz
---

# Hello world

Bu yerda Express dasturga eng sodda misol keltirilgan.

<pre><code class="language-javascript" translate="no">
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
</code></pre>

<div class="doc-box doc-notice" markdown="1">
`req` (request) va `res` (response) Node taqdim etayotgan obyektlar hisoblanadi, shuning uchun
`req.pipe()`, `req.on('data', callback)` Express talab qilmaydigan boshqa obyektlar.
</div>

Dastur serverni ishga tushuradi va 3000 portdagi aloqani eshitib turadi. Javob sifatida bosh sahifaga "Hello World!" so'zi jo'natiladi. Qolgan barcha sahifalarga esa **404 Not Found** javobi jo'natiladi.

Kodni yozib, `app.js` faylida saqlab qoying. Uni ishga tushurish uchun quyidagi buyruqni ishga tushiring:

<pre><code class="language-sh" translate="no">
$ node app.js
</code></pre>

Natijani ko'rish uchun, brauzerdan [http://localhost:3000/](http://localhost:3000/) manziliga kiring.
