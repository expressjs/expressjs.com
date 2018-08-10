---
layout: page
title: Express のアプリケーション生成プログラム
menu: starter
lang: ja
---

# Express のアプリケーション生成プログラム

アプリケーション生成プログラム・ツールの `express` を使用すると、アプリケーション・スケルトンを素早く作成できます。

次のコマンドを使用して、`express` をインストールします。

<pre>
<code class="language-sh" translate="no">
$ npm install express-generator -g
</code>
</pre>

`-h` オプションを指定してコマンド・オプションを表示します。

<pre>
<code class="language-sh" translate="no">
$ express -h

  Usage: express [options][dir]

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
</code>
</pre>

例えば、以下のコマンドでは、現行作業ディレクトリーに _myapp_ という Express アプリケーションを作成します。

<pre>
<code class="language-sh" translate="no">
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
</code>
</pre>

次に、依存関係をインストールします。

<pre>
<code class="language-sh" translate="no">
$ cd myapp
$ npm install
</code>
</pre>

MacOS または Linux では、次のコマンドによってアプリケーションを実行します。

<pre>
<code class="language-sh" translate="no">
$ DEBUG=myapp:* npm start
</code>
</pre>

Windows では、次のコマンドを使用します。

<pre>
<code class="language-sh" translate="no">
> set DEBUG=myapp:* & npm start
</code>
</pre>

次に、ブラウザーに `http://localhost:3000/` をロードして、アプリケーションにアクセスします。

生成されたアプリケーションには、以下のディレクトリー構造があります。

<pre>
<code class="language-sh" translate="no">
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
</code>
</pre>

<div class="doc-box doc-info" markdown="1">
ここで生成プログラムによって作成されたアプリケーション構造は、Express アプリケーションを作成するための数多くの方法の 1 つにすぎません。この構造を自由に使用したり、ニーズに合わせて変更したりしてください。
</div>
