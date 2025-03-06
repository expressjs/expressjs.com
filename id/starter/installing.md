---
layout: page
title: Menginstal Ekspres
menu: starter
lang: id
description: Learn how to install Express.js in your Node.js environment, including
  setting up your project directory and managing dependencies with npm.
---

# Menginstal

Kami asumsikan Anda telah menginstal [Node.js](https://nodejs.org/), buatlah direktori untuk menyimpan aplikasi Anda, dan jadikan itu sebagai direktori kerja Anda.

* [Express versi 4.x](/{{ page.lang }}/4x/api.html) memerlukan Node.js versi 0.10 atau yang lebih tinggi.
* [Express versi 5.x](/{{ page.lang }}/5x/api.html) memerlukan Node.js versi 18 atau yang lebih tinggi.

```bash
$ mkdir myapp
$ cd myapp
```

Gunakan perintah `npm init` untuk membuat file `package.json` untuk aplikasi Anda.
Untuk informasi selengkapnya tentang cara kerja `package.json`, lihat [Spesifikasi penggunaan package.json dari npm](https://docs.npmjs.com/files/package.json).

```bash
$ npm init
```

Perintah ini menanyakan beberapa hal, seperti nama dan versi aplikasi Anda.
Untuk saat ini, Anda cukup menekan RETURN/ENTER untuk menerima default sebagian besar, dengan pengecualian berikut:

```
entry point: (index.js)
```

Masukan `app.js`, atau apa pun nama file utamanya yang Anda inginkan. Jika Anda menginginkannya menjadi `index.js`, tekan RETURN/ENTER untuk menerima nama file default yang disarankan.

Sekarang, instal Express di direktori `myapp` dan simpan di daftar dependensi. Misalnya:

```bash
$ npm install express
```

Untuk menginstal Express secara sementara dan tidak menambahkannya ke daftar dependensi, jalankan perintah berikut:

```bash
$ npm install express --no-save
```

<div class="doc-box doc-info" markdown="1">
Secara default versi npm 5.0+, ketika menjalankan perintah `npm install` akan menambahkan modul ke daftar `dependencies` di file `package.json`; sedangkan untuk versi npm sebelumnya, Anda harus menentukan opsi `--save` secara eksplisit. Kemudian, setelah itu, menjalankan `npm install --save` di direktori aplikasi akan secara otomatis menginstal modul dalam daftar dependensi.
</div>

###  [Next: Hello World ](/{{ page.lang }}/starter/hello-world.html)
