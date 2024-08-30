---
layout: page
title: Dasar routing Express
menu: starter
lang: id
---

# Dasar _routing_

_Routing_ mengacu pada cara menentukan bagaimana aplikasi merespons permintaan klien ke titik akhir (_endpoint_) tertentu, yang merupakan URI (atau jalur) dan mengirimkan metode permintaan HTTP tertentu (GET, POST, dan seterusnya).

Setiap rute dapat memiliki satu atau lebih fungsi pengendali, yang dijalankan ketika rute yang dipanggil tersebut cocok.

Definisi rute tersebut mengambil struktur sebagai berikut:

```js
app.METHOD(PATH, HANDLER)
```

Dimana:

- `app` adalah sebuah _class_ dari `express`.
- `METHOD` adalah sebuah [Metode _HTTP request_](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods), dalam huruf kecil.
- `PATH` adalah _path_ atau jalur yang didefinisikan di server.
- `HANDLER` adalah _function_ yang dijalankan ketika rute yang dipanggil cocok.

<div class="doc-box doc-notice" markdown="1">
Pada tutorial ini mengasumsikan bahwa <em>class</em> dari `express` bernama `app` telah dibuat dan server sedang berjalan. Jika Anda belum terbiasa dalam membuat sebuah aplikasi dan memulainya, Anda dapat melihat [Contoh hello world](/{{ page.lang }}/starter/hello-world.html).
</div>

Contoh berikut ini akan mengilustrasikan cara pendefinisian rute secara sederhana.

Respons dengan `Hello World!` di halaman _home_:

```js
app.get('/', (req, res) => {
  res.send('Hello World!')
})
```

Respons dengan metode _request_ POST pada rute _root_ (`/`), halaman _home_ aplikasi:

```js
app.post('/', (req, res) => {
  res.send('Got a POST request')
})
```

Respons dengan metode _request_ PUT pada rute `/user`:

```js
app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user')
})
```

Respons dengan metode _request_ DELETE pada rute `/user`:

```js
app.delete('/user', (req, res) => {
  res.send('Got a DELETE request at /user')
})
```

Untuk detail lebih lanjut tentang perutean, Anda dapat melihat [panduan _routing_](/{{ page.lang }}/guide/routing.html).

###  [Previous: Express application generator ](/{{ page.lang }}/starter/generator.html)&nbsp;&nbsp;&nbsp;&nbsp;[Next: Serving static files in Express ](/{{ page.lang }}/starter/static-files.html)
