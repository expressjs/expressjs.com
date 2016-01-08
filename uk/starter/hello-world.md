---
layout: page
title: Express "Hello World" приклад
menu: starter
lang: uk
---

# Hello world приклад

Тут наведено приклад дуже простого Express додатку.

<pre><code class="language-javascript" translate="no">
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})
</code></pre>

<div class="doc-box doc-notice" markdown="1">
`req` (request) і` res` (response) є тими ж об'єктами які надає Node, тому ви можете виконати
`req.pipe ()`, `req.on ('data', callback)` і все інше, що не вимагає участі Express.
</div>

Додаток запусте сервер і буде слухати з'єднання на порту 3000. У відповідь на запит головної сторінки буде відправлено "Hello World!". Для всіх інших шляхів, відповіддю буде ** 404 Not Found **.

Збережіть код в файл під назвою `app.js` і запустіть за допомогою наступних команд.

<pre><code class="language-sh" translate="no">
$ node app.js
</code></pre>

Завантажте [http://localhost:3000/](http://localhost:3000/) в браузері щоб побачити результат.
