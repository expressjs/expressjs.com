---
layout: page
title: Express базове навчання маршрутизації
menu: starter
lang: uk
---

# Базове навчання маршрутизації

Цей матеріал базове уявлення по роботі маршрутизації в Express. Маршрутизація визначає як додаток відповідає на клієнтський запит до конкретної адреси (endpoint), який являеться URI (або шлях) та певного методу HTTP запиту (GET, POST, і т.д.).

Кожен маршрут (route) має одну або більше функцій обробки, які виконуються коли маршрут зіставиться.

Визначення маршруту має наступну структуру `app.METHOD(PATH, HANDLER)`, де `app` це екземпляр `express`, `METHOD` це [HTTP request method](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol), `PATH` це адреса на сайті, і `HANDLER` це функція яка виконується коли маршрут буде зіставлений.

<div class="doc-box doc-notice" markdown="1">
Це керівництво передбачає що екземпляр `express` названий `app` створений і сервер запущено. Якщо ви не знайомі зі створенням і запуском додатку, ознайомтеся з [Hello world приклад](/starter/hello-world.html).
</div>

Наступний код демонструє деякі приклади маршрутів у додатку.

<pre><code class="language-javascript" translate="no">
// Відповідь "Hello World!" на гловній сторінці
app.get('/', function (req, res) {
  res.send('Hello World!');
})

// отримання POST запиту на головну сторінку
app.post('/', function (req, res) {
  res.send('Got a POST request');
})

// отримання PUT запиту на адресу /user
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
})

// отримання DELETE запиту за адресою /user
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
})
</code></pre>

Щоб більше дізнатися про маршрутизацію, ознайомтеся з керівництвом [Маршрутизація](/guide/routing.html).
