---
layout: page
title: Express FAQ
menu: starter
lang: id
---

# FAQ

## Bagaimana sebaiknya struktur aplikasi saya?

Tidak ada jawaban pasti untuk pertanyaan ini. Jawabannya tergantung
pada skala aplikasi Anda dan tim yang terlibat. Sefleksibel mungkin, sehingga Express tidak membuat asumsi dalam hal struktur.

Kumpulan rute dan logika khusus lainnya di dalam aplikasi dapat berada di
banyak file sesuai keinginan Anda, dalam struktur direktori apa pun yang Anda
inginkan. Lihat contoh berikut ini sebagai inspirasi:

* [Route listings](https://github.com/expressjs/express/blob/4.13.1/examples/route-separation/index.js#L32-L47)
* [Route map](https://github.com/expressjs/express/blob/4.13.1/examples/route-map/index.js#L52-L66)
* [MVC style controllers](https://github.com/expressjs/express/tree/master/examples/mvc)

Selain itu, ada ekstensi (_extension_) dari pihak ketiga untuk Express, yang menyederhanakan beberapa pola berikut:

* [Resourceful routing](https://github.com/expressjs/express-resource)

## Bagaimana cara mendefinisikan model?

Express tidak memiliki gagasan tentang database. Jadi, konsep ini
diserahkan kepada modul Node dari pihak ketiga, memungkinkan Anda
melakukannya secara antarmuka dengan hampir semua database.

Lihat [LoopBack](http://loopback.io) untuk kerangka kerja berbasis
Express yang berpusat pada model.

## Bagaimana cara mengautentikasi pengguna?

Otentikasi adalah area yang beropini (_opinionated area_) lainnya yang
tidak dimasuki oleh Express. Sehingga Anda dapat menggunakan skema otentikasi apa pun yang Anda inginkan. Untuk skema _username/password_
sederhana, Anda dapat melihat [contoh ini](https://github.com/expressjs/express/tree/master/examples/auth).

## _Template engines_ mana saja yang mendukung Express?

Express mendukung _template engine_ apa pun yang sesuai dengan _signature_ `(path, locals, callback)`.
Untuk menormalkan antarmuka mesin _template engine_ dan _caching_, lihat
[consolidate.js](https://github.com/visionmedia/consolidate.js)
daftar _template engine_ yang mendukung express. _Template engine_ yang tidak terdaftar mungkin masih mendukung _signature_ dari Express.

Untuk informasi lebih lanjut, lihat [Penggunaan _template engine_ dengan Express](/{{page.lang}}/guide/using-template-engines.html).

## Bagaimana cara menangani respon 404?

Di Express, respon 404 bukanlah hasil dari sebuah _error_, jadi
_error-handler middleware_ tidak akan menangkapnya. Perilaku ini terjadi
karena respon 404 hanya menunjukkan tidak adanya pekerjaan tambahan yang harus dilakukan;
dengan kata lain, Express telah menjalankan semua fungsi dan rute dari _middleware_ yang ada,
kemudian menemukan bahwa tidak ada satupun dari mereka yang merespons. Jadi, yang Anda perlukan lakukan adalah menambahkan fungsi middleware di bagian paling bawah dari _stack_ yang ada (di bawah semua fungsi lainnya).
Oleh karena itu, untuk menangani respon 404 secara sederhana adalah sebagai berikut:

```js
app.use((req, res, next) => {
  res.status(404).send('Maaf data tidak dapat ditemukan!')
})
```

Tambahkan rute secara dinamis saat runtime pada _class_ (_instance_) `express.Router()` sehingga rute tidak digantikan oleh fungsi middleware.

## Bagaimana cara membuat _error handler_?

Anda dapat mendefinisikan _error-handler middleware_ dengan cara yang sama seperti _middleware_ lainnya, kecuali dengan empat argumen, bukan tiga; secara khusus dengan _signature_ `(err, req, res, next)`:

```js
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Ada yang salah!')
})
```

Untuk informasi selengkapnya, lihat [Penanganan _Error_](/{{ page.lang }}/guide/error-handling.html).

## Bagaimana cara merender HTML biasa?

Jangan lakukan! Tidak perlu "merender" HTML dengan fungsi `res.render()`.
Jika Anda memiliki file tertentu, gunakan fungsi `res.sendFile()`.
Jika Anda menyajikan banyak aset dari sebuah direktori, gunakan fungsi middleware `express.static()`.

## Versi Node.js apa yang dibutuhkan Express?

* [Express versi 4.x](/{{ page.lang }}/4x/api.html) memerlukan Node.js versi 0.10 atau yang lebih tinggi.
* [Express versi 5.x](/{{ page.lang }}/5x/api.html) memerlukan Node.js versi 18 atau yang lebih tinggi.

###  [Previous: More examples ](/{{ page.lang }}/starter/examples.html)
