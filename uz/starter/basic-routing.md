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
Ushbu qo'llanmani foydalanishdan oldin `express` obyektidan ekzamplyar olib, uni `app` deb atang va serverni ishga tushuring.  Agar siz bu bilan tanish bo'lmasangiz, unda [Hello world misol](/starter/hello-world.html) qo'llanmanisini o'qib chiqing.
</div>

Quyidagi kodlar marshrutizatsiyaga bir necha misollar keltirilgan.

<pre><code class="language-javascript" translate="no">
// Bosh sahifada "Hello World!" javobini qaytaradi.
app.get('/', function (req, res) {
  res.send('Hello World!');
})

// Bosh sahifada POST so'rovni qabul qilish.
app.post('/', function (req, res) {
  res.send('Got a POST request');
})

// /user manzilida PUT so'rovni qabul qilish.
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
})

// /user mazilida DELETE so'rovni qabul qilish.
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
})
</code></pre>

Marshrutizatsiya haqida to'liq ma'lumot olish uchun, ma'lumotnoma orqali [Marshrutizatsiya](/guide/routing.html) bo'limini o'qib chiqing.
