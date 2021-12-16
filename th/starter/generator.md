---
layout: page
title: Express application generator
menu: starter
lang: th
---

# เครื่องมือสร้าง Express

ใช้เครื่องมือสร้าง โดยพินพ์คำสั่ง `express-generator` เพื่อสร้างโครงสร้างหลักของแอปพลิเคชันอย่างรวดเร็ว

`express-generator` ติดตั้งแพ็กเกจไปยังชุดคำสั่ง `express`  ใช้คำสั่งด้านล่างนี้เพื่อติดตั้ง:

```console
$ npm install express-generator -g
```
แสดงตัวเลือกคำสั่งทั้งหมดด้วย `h`:

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
    -v, --view <engine> add view <engine> support (ejs|hbs|hjs|jade|pug|twig|vash) (defaults to jade)
    -c, --css <engine>  add stylesheet <engine> support (less|stylus|compass|sass) (defaults to plain css)
        --git           add .gitignore
    -f, --force         force on non-empty directory
```
สำหรับตัวอย่าง คำสั่งข้างล่างนี้เพื่อสร้าง Express app ที่ชื่อว่า _myapp_ โดยจะสร้างโฟล์เดอร์ชื่อ _myapp_ ในไดเรกเทอรีที่ใช้งานอยู่ และตั้ง view engine เป็น <a href="https://pugjs.org/" target="_blank" title="Pug documentation">Pug</a>:

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
แล้วติดตั้งโมดูลเกี่ยวโยง (dependencies):

```console
$ cd myapp
$ npm install
```

บน MacOS หรือ Linux รัน app ด้วยคำสั่งนี้:

```console
$ DEBUG=myapp:* npm start
```

บน Windows ใช้คำสั่งนี้:

```console
> set DEBUG=myapp:* & npm start
```

แล้วโหลด `http://localhost:3000/` ในเว็บเบราว์เซอร์ของคุณเพื่อเข้าถึง app

หลังจากสร้าง app แล้วจะได้โครงสร้างไดเรกทอรีดังนี้:

```console
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
โครงสร้าง app ที่สร้างโดยเครื่องมือสร้างเป็นเพียงวิธีหนึ่งของอีกหลายวิธี ของการสร้างโครงสร้าง app ของ Express สามารถใช้โครงสร้างนี้ได้ หรือว่าจะแก้ไขเพื่อให้เหมาะสมที่สุดสำหรับความต้องการของคุณ
</div>
