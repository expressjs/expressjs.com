---
layout: page
title: Express のアプリケーション生成プログラム
menu: starter
lang: ja
---

# Express のアプリケーション生成プログラム

アプリケーション生成プログラム・ツールの `express` を使用すると、アプリケーション・スケルトンを素早く作成できます。

次のコマンドを使用して、`express` をインストールします。

```sh
$ npm install express-generator -g
```

`-h` オプションを指定してコマンド・オプションを表示します。

```sh
$ express -h

  Usage: express [options][dir]

  Options:

    -h, --help          output usage information
    -V, --version       output the version number
    -e, --ejs           add ejs engine support (defaults to jade)
        --hbs           add handlebars engine support
    -H, --hogan         add hogan.js engine support
    -c, --css &lt;engine&gt;  add stylesheet &lt;engine&gt; support (less|stylus|compass|sass) (defaults to plain css)
        --git           add .gitignore
    -f, --force         force on non-empty directory
```

例えば、以下のコマンドでは、現行作業ディレクトリーに _myapp_ という Express アプリケーションを作成します。

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

次に、依存関係をインストールします。

```sh
$ cd myapp
$ npm install
```

MacOS または Linux では、次のコマンドによってアプリケーションを実行します。

```sh
$ DEBUG=myapp:* npm start
```

Windows では、次のコマンドを使用します。

```sh
> set DEBUG=myapp:* & npm start
```

次に、ブラウザーに `http://localhost:3000/` をロードして、アプリケーションにアクセスします。

生成されたアプリケーションには、以下のディレクトリー構造があります。

```sh
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
    ├── error.jade
    ├── index.jade
    └── layout.jade

7 directories, 9 files
```

<div class="doc-box doc-info" markdown="1">
ここで生成プログラムによって作成されたアプリケーション構造は、Express アプリケーションを作成するための数多くの方法の 1 つにすぎません。この構造を自由に使用したり、ニーズに合わせて変更したりしてください。
</div>
