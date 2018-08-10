---
layout: page
title: Express dasturlar generatori
menu: starter
lang: uz
---

# Express dasturlar generatori

Dastur generatsiya qilish uchun `express` buyrug'idan foydalanishgiz mumkin, u dasturning asosiy qismini yaratib beradi.

Uni o'rnatish uchun quyidagi buyruqlardan foydalaning.

<pre><code class="language-sh" translate="no">
$ npm install express-generator -g
</code></pre>

Qo'shimcha amallarda foydalanish uchun `-h` qo'shimchasini yozing:

<pre><code class="language-sh" translate="no">
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
</code></pre>

Masalan, quyidagi buyruq _myapp_ nomi dasturni yaratadi.

<pre><code class="language-sh" translate="no">
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
</code></pre>

Keyin dasturning kerakli modullarni o'rnatish kerak bo'ladi:

<pre><code class="language-sh" translate="no">
$ cd myapp
$ npm install
</code></pre>

Dasturni ishga tushurish (MacOS va Linux):

<pre><code class="language-sh" translate="no">
$ DEBUG=myapp ./bin/www
</code></pre>

Windowsda esa, quyidagicha:

<pre><code class="language-sh" translate="no">
> set DEBUG=myapp & node .\bin\www
</code></pre>

Undan keyin brauzerda `http://localhost:3000/` manziligaa kirib dastur ishalayotganini tekshiring.

Generatsiya qilingan dasturning strukturasi quyidagicha bo'ladi.

<pre><code class="language-sh" translate="no">
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
</code></pre>

<div class="doc-box doc-info" markdown="1">
Generator yordamida generatsiya qilingan struktra, Express dasturda yaratish mumkin bo'lgan strukturalardan bir usuli hisoblanadi. Siz bu strukturadan foydalanmasligingiz mumkin, o'zingizga kerakli ko'rinishda yaratishingiz mumkin.
</div>
