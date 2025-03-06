---
layout: page
title: Menampilkan file statis di Express
menu: starter
lang: id
description: Understand how to serve static files like images, CSS, and JavaScript
  in Express.js applications using the built-in 'static' middleware.
---

# Menampilkan file statis di Express

Untuk menamplikan file statis seperti gambar, file CSS, dan file JavaScript, dapat menggunakan fungsi middleware bawaan `express.static` di Express.

_Signature_ fungsinya adalah:

```js
express.static(root, [options])
```

Argumen `root` menentukan direktori _root_ tempat aset statis akan ditampilkan.
Untuk informasi selengkapnya tentang argumen `options`, lihat [express.static](/{{page.lang}}/4x/api.html#express.static).

Misalnya, gunakan kode berikut untuk menyajikan gambar, file CSS, dan file JavaScript dalam direktori bernama `public`:

```js
app.use(express.static('public'))
```

Sekarang, Anda dapat melihat file yang ada di direktori `public`:

```text
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
```

<div class="doc-box doc-info">
Express mencari file yang berdasarkan lokasi dari direktori statisnya, sehingga nama direktori statis bukan bagian dari URL.
</div>

Untuk menggunakan beberapa direktori aset statis, panggil fungsi middleware `express.static` beberapa kali:

```js
app.use(express.static('public'))
app.use(express.static('files'))
```

Express akan mencari file sesuai urutan Anda mengatur direktori statis melalui fungsi middleware `express.static`.

<div class="doc-box doc-info" markdown="1">CATATAN: Untuk hasil terbaik, [gunakan reverse proxy](/{{page.lang}}/advanced/best-practice-performance.html#use-a-reverse-proxy) cache untuk meningkatkan kinerja penyajian aset statis.
</div>

Untuk membuat awalan jalur virtual (yang jalurnya sebenarnya tidak ada dalam sistem file) untuk file yang akan ditampilkan oleh fungsi `express.static`, [tentukan jalur pemasangan](/{{ page.lang }}/4x /api.html#app.use) untuk direktori statis, seperti yang ditunjukkan di bawah ini:

```js
app.use('/static', express.static('public'))
```

Sekarang, Anda dapat melihat file yang ada di direktori `public` menggunakan awalan jalur `/static`.

```text
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
```

Namun, jalur yang Anda berikan ke fungsi `express.static` adalah relatif terhadap direktori tempat Anda meluncurkan proses `node`. Jika Anda menjalankan aplikasi ekspres dari direktori lain, lebih aman menggunakan jalur absolut dari direktori yang ingin Anda ditampilkan:

```js
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))
```

Untuk detail selengkapnya tentang fungsi `serve-static` dan opsinya, lihat [serve-static](/resources/middleware/serve-static.html).

### [Previous: Basic Routing ](/{{ page.lang }}/starter/basic-routing.html)&nbsp;&nbsp;&nbsp;&nbsp;[Next: More examples ](/{{ page.lang }}/starter/examples.html)
