---
layout: page
title: Contoh Express "Hello World"
menu: starter
lang: id
description: Get started with Express.js by building a simple 'Hello World' application,
  demonstrating the basic setup and server creation for beginners.
---

# Contoh hello world

<div class="doc-box doc-info" markdown="1">
Contoh di bawah ini pada dasarnya adalah aplikasi Express paling sederhana yang dapat Anda buat. Ini adalah aplikasi file tunggal &mdash; _bukan_ apa yang akan Anda dapatkan jika menggunakan [Generator Express](/{{ page.lang }}/starter/generator.html), yang membuat struktur untuk aplikasi lengkap dengan banyak file JavaScript, dengan templat Jade, dan sub- direktori untuk berbagai tujuan.
</div>

```js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

Aplikasi ini memulai server dan mendengarkan koneksi pada _port_ 3000. Aplikasi merespon dengan "Hello World!" untuk _request_
ke URL _root_ (`/`) atau _route_. Untuk setiap jalur lainnya, ia akan merespons dengan **404 Not Found**.

### Berjalan secara Lokal

Pertama buat direktori bernama `myapp`, masuk ke direktori tersebut dan jalankan `npm init`. Kemudian, instal `express` sebagai dependensi, sesuai dengan [panduan instalasi](/{{ page.lang }}/starter/installing.html).

Di direktori `myapp`, buat file bernama `app.js` dan salin kode dari contoh di atas.

<div class="doc-box doc-notice" markdown="1">
`req` (<em>request</em>) dan `res` (<em>response</em>) adalah <em>objects</em> yang sama persis dengan yang disediakan Node, sehingga Anda dapat memanggilnya
`req.pipe()`, `req.on('data', callback)`, dan apa pun yang akan Anda lakukan tanpa melibatkan Express.
</div>

Jalankan aplikasi dengan perintah berikut:

```bash
$ node app.js
```

Kemudian, kunjungi `http://localhost:3000/` di browser untuk melihat hasilnya.

###  [Previous: Installing ](/{{ page.lang }}/starter/installing.html)&nbsp;&nbsp;&nbsp;&nbsp;[Next: Express Generator ](/{{ page.lang }}/starter/generator.html)
