---
layout: page
title: Generator aplikasi Express
menu: starter
lang: id
description: Learn how to use the Express application generator tool to quickly create
  a skeleton for your Express.js applications, streamlining setup and configuration.
---

# Generator aplikasi Express

Gunakan alat generator aplikasi, `express-generator`, untuk membuat kerangka aplikasi dengan cepat.

Anda dapat menjalankan generator aplikasi dengan perintah `npx` (tersedia di Node.js versi 8.2.0).

```bash
$ npx express-generator
```

Untuk versi Node sebelumnya, instal generator aplikasi sebagai paket npm secara global lalu jalankan:

```bash
$ npm install -g express-generator
$ express
```

Tampilkan daftar opsi perintah dengan opsi `-h`:

```bash
$ express -h

  Usage: express [options] [dir]

  Options:

    -h, --help          output usage information
        --version       output the version number
    -e, --ejs           add ejs engine support
        --hbs           add handlebars engine support
        --pug           add pug engine support
    -H, --hogan         add hogan.js engine support
        --no-view       generate without view engine
    -v, --view <engine> add view <engine> support (ejs|hbs|hjs|jade|pug|twig|vash) (defaults to jade)
    -c, --css <engine>  add stylesheet <engine> support (less|stylus|compass|sass) (defaults to plain css)
        --git           add .gitignore
    -f, --force         force on non-empty directory
```

Misal, tutorial berikut ini kita akan membuat aplikasi Express bernama _myapp_. Aplikasi akan dibuat dalam folder bernama _myapp_ di direktori kerja saat ini dan _view engine_ yang akan digunakan adalah <a href="https://pugjs.org/" target="_blank" title="Pug documentation">Pug</a>:

```bash
$ express --view=pug myapp

   create : myapp
   create : myapp/package.json
   create : myapp/app.js
   create : myapp/public
   create : myapp/public/javascripts
   create : myapp/public/images
   create : myapp/routes
   create : myapp/routes/index.js
   create : myapp/routes/users.js
   create : myapp/public/stylesheets
   create : myapp/public/stylesheets/style.css
   create : myapp/views
   create : myapp/views/index.pug
   create : myapp/views/layout.pug
   create : myapp/views/error.pug
   create : myapp/bin
   create : myapp/bin/www
```

Kemudian instal semua dependensi project:

```bash
$ cd myapp
$ npm install
```

Di MacOS atau Linux, jalankan aplikasi dengan perintah ini:

```bash
$ DEBUG=myapp:* npm start
```

Di _Command Prompt_ Windows, gunakan perintah ini:

```bash
> set DEBUG=myapp:* & npm start
```

Di _PowerShell_ Windows, gunakan perintah ini:

```bash
PS> $env:DEBUG='myapp:*'; npm start
```


Kemudian, kunjungi `http://localhost:3000/` di browser Anda untuk mengakses aplikasi.

Aplikasi yang dihasilkan memiliki struktur direktori sebagai berikut:

```bash
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.pug
    ├── index.pug
    └── layout.pug

7 directories, 9 files
```

<div class="doc-box doc-info" markdown="1">
Struktur aplikasi yang dibuat oleh generator hanyalah salah satu dari banyak cara untuk membuat struktur aplikasi Express. Jangan ragu untuk menggunakan struktur ini atau memodifikasinya agar sesuai dengan kebutuhan Anda.
</div>

###  [Previous: Hello World ](/{{ page.lang }}/starter/hello-world.html)&nbsp;&nbsp;&nbsp;&nbsp;[Next: Basic routing](/{{ page.lang }}/starter/basic-routing.html)
