---
layout: page
title: Express application generator
menu: starter
lang: ja
---

# Express application generator

アプリケーション生成ツール`express`を使うことで、すぐにアプリケーションの骨組みを作ることができます。

下記のコマンドを使ってツールをインストールします。

~~~sh
$ npm install express-generator -g
~~~

`-h`オプションでコマンドのオプションを表示します。

~~~sh
$ express -h

  Usage: express [options] [dir]

  Options:

    -h, --help          output usage information
    -V, --version       output the version number
    -e, --ejs           add ejs engine support (defaults to jade)
        --hbs           add handlebars engine support
    -H, --hogan         add hogan.js engine support
    -c, --css <engine>  add stylesheet <engine> support (less|stylus|compass|sass) (defaults to plain css)
        --git           add .gitignore
    -f, --force         force on non-empty directory
~~~

例えば、下記は _myapp_ という名前のExpressアプリを現在のワーキングディレクトリに生成します。

~~~sh
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
~~~

そうしたら、依存関係をインストールします。

~~~sh
$ cd myapp
$ npm install
~~~

アプリを実行します。(MaxOS または Linux)

~~~sh
$ DEBUG=myapp npm start
~~~

Windowsでは以下のコマンドを使います。

~~~sh
> set DEBUG=myapp & npm start
~~~

ブラウザで`http://localhost:3000/`をロードして、アプリにアクセスします。

生成されたアプリのディレクトリ構造は以下のようになっています。

~~~sh
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
~~~

<div class="doc-box doc-info" markdown="1">
ジェネレータで生成されたアプリの構造は、複数あるExpressアプリを構造化する手法の一つにすぎません。
この構造を使わない、もしくはあなたのニーズに最も合うように変更するといったことを自由に行ってください。
</div>
