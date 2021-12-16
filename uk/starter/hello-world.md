---
layout: page
title: Приклад з "Hello World" в Express
menu: starter
lang: uk
---

# Приклад виводу "Hello world"

<div class="doc-box doc-info" markdown="1">
Далі показано дуже спрощений варіант створення застосунку Express. Тут використовується єдиний файл &mdash; тобто _не_ те, що ви отримуєте в результаті роботи [генератора Express](/{{ page.lang }}/starter/generator.html), який створює каркас для повноцінного, хоча й мінімалістичного застосунку, з декількома файлами JavaScript, шаблонами Jade,
та субдиректоріями для деяких потреб.
</div>

Для початку, створіть директорію з ім’ям `myapp`, перейдіть в неї та запустіть `npm init`. Потім встановіть `express` як залежність,
так як це показано в [керівництві встановлення](/{{ page.lang }}/starter/installing.html).

В директорії `myapp`, створіть файл з ім’ям `app.js` та додайте наступний код:

<pre><code class="language-javascript" translate="no">
var express = require('express');
var app = express();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000, () => {
  console.log('Приклад застосунку, який прослуховує 3000-ий порт!')
})
</code></pre>

Цей скрипт запускає сервер та прослуховує з’єднання на 3000-му порті. В результаті виводиться "Hello World!",
коли запити адресуються до кореневого URL (`/`) або кореневого _маршруту_. Для усіх інших адрес формується відповідь **404 Not Found**.

<div class="doc-box doc-notice" markdown="1">
Змінні `req` (request) та `res` (response) містять ті ж об’єкти, які надає Node.js, тобто ви можете викликати
`req.pipe()`, `req.on('data', callback)`, та виконувати будь-які інші дії без участі Express.
</div>

Запустіть застосунок наступною командою:

```console
$ node app.js
```

Після чого, відкрийте браузер за адресою `http://localhost:3000/` щоб побачити результат.
