---
layout: page
title: Express dasturlar generatori
menu: starter
lang: uz
---

# Express dasturlar generatori

Dastur generatsiya qilish uchun `express` buyrug'idan foydalanishgiz mumkin, u dasturning asosiy qismini yaratib beradi.

Uni o'rnatish uchun quyidagi buyruqlardan foydalaning.

```console
$ npm install express-generator -g
```

Qo'shimcha amallarda foydalanish uchun `-h` qo'shimchasini yozing:

```console
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
    -v, --view &lt;engine&gt; add view &lt;engine&gt; support (ejs|hbs|hjs|jade|pug|twig|vash) (defaults to jade)
    -c, --css &lt;engine&gt;  add stylesheet &lt;engine&gt; support (less|stylus|compass|sass) (defaults to plain css)
        --git           add .gitignore
    -f, --force         force on non-empty directory
```

Masalan, quyidagi buyruq _myapp_ nomi dasturni yaratadi.

```console
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

Keyin dasturning kerakli modullarni o'rnatish kerak bo'ladi:

```console
$ cd myapp
$ npm install
```

Dasturni ishga tushurish (MacOS va Linux):

```console
$ DEBUG=myapp ./bin/www
```

Windowsda esa, quyidagicha:

```console
> set DEBUG=myapp & node .\bin\www
```

Undan keyin brauzerda `http://localhost:3000/` manziligaa kirib dastur ishalayotganini tekshiring.

Generatsiya qilingan dasturning strukturasi quyidagicha bo'ladi.

```console
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
    ├── error.pug
    ├── index.pug
    └── layout.pug

7 directories, 9 files
```

<div class="doc-box doc-info" markdown="1">
Generator yordamida generatsiya qilingan struktra, Express dasturda yaratish mumkin bo'lgan strukturalardan bir usuli hisoblanadi. Siz bu strukturadan foydalanmasligingiz mumkin, o'zingizga kerakli ko'rinishda yaratishingiz mumkin.
</div>
