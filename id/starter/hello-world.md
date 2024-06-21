---
layout: page
title: Contoh Express "Hello World"
menu: starter
lang: id
---

# Contoh hello world

<div class="doc-box doc-info" markdown="1">
Contoh di bawah ini pada dasarnya adalah aplikasi Express paling sederhana yang dapat Anda buat. Ini adalah aplikasi file tunggal &mdash; _bukan_ apa yang akan Anda dapatkan jika menggunakan [Generator Express](/{{ page.lang }}/starter/generator.html), yang membuat struktur untuk aplikasi lengkap dengan banyak file JavaScript, dengan templat Jade, dan sub- direktori untuk berbagai tujuan.
</div>

<script src="https://embed.runkit.com" data-element-id="hello-example" data-mode="endpoint" async defer></script>
<div id="hello-example"><pre><code class="language-js">
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
</code></pre></div>

Aplikasi ini memulai server dan mendengarkan koneksi pada _port_ 3000. Aplikasi merespon dengan "Hello World!" untuk _request_
ke URL _root_ (`/`) atau _route_. Untuk setiap jalur lainnya, ia akan merespons dengan **404 Not Found**.

Contoh di atas sebenarnya adalah server yang berfungsi: Silakan klik URL yang ditampilkan. Anda akan mendapat respons, dengan log real-time di halaman, dan perubahan apa pun yang Anda buat akan terlihat secara real-time. Hal ini didukung oleh [RunKit](https://runkit.com), yang menyediakan _playground_ untuk JavaScript secara interaktif yang terhubung ke lingkungan Node secara lengkap yang berjalan di browser web Anda.
Di bawah ini adalah petunjuk untuk menjalankan aplikasi yang sama di komputer lokal Anda.

<div class="doc-box doc-info" markdown="1">
RunKit adalah layanan pihak ketiga yang tidak berafiliasi dengan proyek Express.
</div>

### Berjalan secara Lokal

Pertama buat direktori bernama `myapp`, masuk ke direktori tersebut dan jalankan `npm init`. Kemudian, instal `express` sebagai dependensi, sesuai dengan [panduan instalasi](/{{ page.lang }}/starter/installing.html).

Di direktori `myapp`, buat file bernama `app.js` dan salin kode dari contoh di atas.

<div class="doc-box doc-notice" markdown="1">
`req` (<em>request</em>) dan `res` (<em>response</em>) adalah <em>objects</em> yang sama persis dengan yang disediakan Node, sehingga Anda dapat memanggilnya
`req.pipe()`, `req.on('data', callback)`, dan apa pun yang akan Anda lakukan tanpa melibatkan Express.
</div>

Jalankan aplikasi dengan perintah berikut:

```console
$ node app.js
```

Kemudian, kunjungi `http://localhost:3000/` di browser untuk melihat hasilnya.

###  [Previous: Installing ](/{{ page.lang }}/starter/installing.html)&nbsp;&nbsp;&nbsp;&nbsp;[Next: Express Generator ](/{{ page.lang }}/starter/generator.html)
