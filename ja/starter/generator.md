---
layout: page
title: Express application generator
menu: starter
lang: ja
---

# Express application generator

アプリケーション生成ツール`express`を使うことで、すぐにアプリケーションの骨組みを作ることができます。

下記のコマンドを使ってツールをインストールします。

<pre><code class="language-sh" translate="no">
$ npm install express-generator -g
</code></pre>

`-h`オプションでコマンドのオプションを表示します。

<pre><code class="language-sh" translate="no">
$ express -h

  Usage: express [options] [dir]

  Options:

    -h, --help          output usage information
    -V, --version       output the version number
    -e, --ejs           add ejs engine support (defaults to jade)
        --hbs           add handlebars engine support
    -H, --hogan         add hogan.js engine support
    -c, --css &lt;engine>  add stylesheet &lt;engine> support (less|stylus|compass|sass) (defaults to plain css)
        --git           add .gitignore
    -f, --force         force on non-empty directory
</code></pre>

例えば、下記は _myapp_ という名前のExpressアプリを現在のワーキングディレクトリに生成します。

<pre><code class="language-sh" translate="no">
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
</code></pre>

そうしたら、依存関係をインストールします。

<pre><code class="language-sh" translate="no">
$ cd myapp
$ npm install
</code></pre>

アプリを実行します。(MaxOS または Linux)

<pre><code class="language-sh" translate="no">
$ DEBUG=myapp npm start
</code></pre>

Windowsでは以下のコマンドを使います。

<pre><code class="language-sh" translate="no">
> set DEBUG=myapp & npm start
</code></pre>

ブラウザで`http://localhost:3000/`をロードして、アプリにアクセスします。

生成されたアプリのディレクトリ構造は以下のようになっています。

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
    ├── error.jade
    ├── index.jade
    └── layout.jade

7 directories, 9 files
</code></pre>

<div class="doc-box doc-info" markdown="1">
ジェネレータで生成されたアプリの構造は、複数あるExpressアプリを構造化する手法の一つにすぎません。
この構造を使わない、もしくはあなたのニーズに最も合うように変更するといったことを自由に行ってください。
</div>
