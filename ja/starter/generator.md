---
layout: page
title: Express のアプリケーション生成プログラム
description: Learn how to use the Express application generator tool to quickly create a skeleton for your Express.js applications, streamlining setup and configuration.
menu: starter
lang: ja
redirect_from: /starter/generator.html
---

# Express のアプリケーション生成プログラム

アプリケーション生成プログラム・ツールの `express` を使用すると、アプリケーション・スケルトンを素早く作成できます。

You can run the application generator with the `npx` command (available in Node.js 8.2.0).

```bash
$ npm install express-generator -g
```

For earlier Node versions, install the application generator as a global npm package and then launch it:

```bash
$ npm install -g express-generator
$ express
```

`-h` オプションを指定してコマンド・オプションを表示します。

```bash
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
```

例えば、以下のコマンドでは、現行作業ディレクトリーに _myapp_ という Express アプリケーションを作成します。 The app will be created in a folder named _myapp_ in the current working directory and the view engine will be set to <a href="https://pugjs.org/" target="_blank" title="Pug documentation">Pug</a>:

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

次に、依存関係をインストールします。

```bash
$ cd myapp
$ npm install
```

Windows では、次のコマンドを使用します。

```bash
$ DEBUG=myapp:* npm start
```

On Windows Command Prompt, use this command:

```bash
> set DEBUG=myapp:* & npm start
```

On Windows PowerShell, use this command:

```bash
PS> $env:DEBUG='myapp:*'; npm start
```

次に、ブラウザーに `http://localhost:3000/` をロードして、アプリケーションにアクセスします。

生成されたアプリケーションには、以下のディレクトリー構造があります。

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
The app structure created by the generator is just one of many ways to structure Express apps. Feel free to use this structure or modify it to best suit your needs.
</div>

### [Previous: Hello World ](/{{ page.lang }}/starter/hello-world.html)&nbsp;&nbsp;&nbsp;&nbsp;[Next: Basic routing](/{{ page.lang }}/starter/basic-routing.html)
