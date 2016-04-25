---
layout: page
title: Express dasturlar generatori
menu: starter
lang: uz
---

# Express dasturlar generatori

Dastur generatsiya qilish uchun `express` buyrug'idan foydalanishgiz mumkin, u dasturning asosiy qismini yaratib beradi.

Uni o'rnatish uchun quyidagi buyruqlardan foydalaning.

```sh
$ npm install express-generator -g
```

Qo'shimcha amallarda foydalanish uchun `-h` qo'shimchasini yozing:

```sh
$ express -h

  Usage: express [options] [dir]

  Options:

    -h, --help          output usage information
    -V, --version       output the version number
    -e, --ejs           add ejs engine support (defaults to jade)
        --hbs           add handlebars engine support
    -H, --hogan         add hogan.js engine support
    -c, --css &lt;engine>  add stylesheet &lt;engine> support (less|stylus|compass) (defaults to plain css)
    -f, --force         force on non-empty directory
```

Masalan, quyidagi buyruq _myapp_ nomi dasturni yaratadi.

```sh
$ express myapp

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
   create : myapp/views/index.jade
   create : myapp/views/layout.jade
   create : myapp/views/error.jade
   create : myapp/bin
   create : myapp/bin/www
```

Keyin dasturning kerakli modullarni o'rnatish kerak bo'ladi:

```sh
$ cd myapp
$ npm install
```

Dasturni ishga tushurish (MacOS va Linux):

```sh
$ DEBUG=myapp ./bin/www
```

Windowsda esa, quyidagicha:

```sh
> set DEBUG=myapp & node .\bin\www
```

Undan keyin brauzerda `http://localhost:3000/` manziligaa kirib dastur ishalayotganini tekshiring.

Generatsiya qilingan dasturning strukturasi quyidagicha bo'ladi.

```sh
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.jade
    ├── index.jade
    └── layout.jade

7 directories, 9 files
```

<div class="doc-box doc-info" markdown="1">
Generator yordamida generatsiya qilingan struktra, Express dasturda yaratish mumkin bo'lgan strukturalardan bir usuli hisoblanadi. Siz bu strukturadan foydalanmasligingiz mumkin, o'zingizga kerakli ko'rinishda yaratishingiz mumkin.
</div>
