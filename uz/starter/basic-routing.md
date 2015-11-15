---
layout: page
title: Express asosiy marshrutizatsiya
menu: starter
lang: uz
---

# Asosiy marshrutizatsiya
Ushbu material Expressda asosiy marshrutizatsiyalar bilan ishlash haqidadir. Marshrutizatsiya dasturda HTTP so'rovlarga (GET, POST va b.sh) murojat qilinganda, ma'lum bir manzilga(endpoint) qanday javob berishini aniqlaydi.

Har bir marshrut(route) bir yoki ko'plar qayta ishlovchi funksiyalarga ega.

Marshrutni aniqlash quyidagi ko'rinishga ega `app.METHOD(PATH, HANDLER)`, bu yerda `app` `express`ning ekzamplyari, `METHOD` esa [HTTP request method](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol), `PATH` esa saytdagi manzili va `HANDLER` esa marshrut chaqirilganda bajariladinga funksiya.
<div class="doc-box doc-notice" markdown="1">
Этот руководство подразумевает что экземпляр `express` названый `app` создан и сервер запущен. Если вы не знакомы с созданием и запуском приложения, ознакомтесь с [Hello world пример](/starter/hello-world.html).
</div>

Следующий код демонстрирует некоторые примеры маршрутов в приложении.

~~~js
// ответ с "Hello World!" на главной странице
app.get('/', function (req, res) {
  res.send('Hello World!');
})

// получение POST запроса на главную страницу
app.post('/', function (req, res) {
  res.send('Got a POST request');
})

// получение PUT запроса по адресу /user
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
})

// получение DELETE запроса по адресу /user
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
})
~~~

Что бы больше узнать про маршрутизацию, ознакомтесь с руководством [Маршрутизация](/guide/routing.html).
