---
layout: page
title: Express uygulama oluşturucu
menu: starter
lang: tr
---
# Express uygulama oluşturucu

Çabukça bir uygulama iskeleti oluşturmak için, `express-generator` aracını kullanın.

`express-generator` paketi `express` komut-satır aracını kurar. Bunu yapmak için aşağıdaki komutu çalıştırın:

```console
$ npm install express-generator -g
```

Komut seçeneklerini `-h` opsiyonu ile görüntüleyin:

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

aşağıdaki örnek, _myapp_ adında bir Express uygulaması yaratır. Uygulama _myapp_ dizininde barınacak ve görünüm (view) motoru <a href="https://pugjs.org/" target="_blank" title="Pug documentation">Pug</a> olarak ayarlanacaktır.

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

Daha sonrasında bağımlılıkları kurun:

```console
$ cd myapp
$ npm install
```

MacOS veya Linux için uygulamayı bu komut ile çalıştırın:

```console
$ DEBUG=myapp:* npm start
```

Windows için bu komutu kullanın:

```console
> set DEBUG=myapp:* & npm start
```

Uygulamaya erişmek için tarayıcınızda `http://localhost:3000/` adresini ziyaret edin.

Oluşturulan uygulamanın dizini aşağıdaki yapıda olacaktır:

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
Burada oluşturulan dizin yapısı, Express uygulamasını yapılandırabileceğiniz birçok seçenekten sadece birisidir. İhtiyacınıza en uygun şekilde bu yapıyı kullanabilir ya da düzenleyebilirsiniz.
</div>

###  [Önceki: Merhaba Dünya ](/{{ page.lang }}/starter/hello-world.html)&nbsp;&nbsp;&nbsp;&nbsp;[Sonraki: Basit Yol Atama](/{{ page.lang }}/starter/basic-routing.html)
