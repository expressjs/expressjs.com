---
layout: page
title: Express 應用程式產生器
menu: starter
lang: zh-tw
---

# Express 應用程式產生器

使用應用程式產生器工具 `express`，快速建立應用程式架構。

使用下列指令來安裝 `express`：

<pre>
<code class="language-sh" translate="no">
$ npm install express-generator -g
</code>
</pre>

使用 `-h` 選項來顯示指令選項：

<pre>
<code class="language-sh" translate="no">
$ express -h

  Usage: express [options][dir]

  Options:

    -h, --help          output usage information
    -V, --version       output the version number
    -e, --ejs           add ejs engine support (defaults to pug)
        --hbs           add handlebars engine support
    -H, --hogan         add hogan.js engine support
    -c, --css &lt;engine&gt;  add stylesheet &lt;engine&gt; support (less|stylus|compass|sass) (defaults to plain css)
        --git           add .gitignore
    -f, --force         force on non-empty directory
</code>
</pre>

舉例來說，以下是在現行工作目錄中建立一個名為 _myapp_ 的 Express 應用程式：

<pre>
<code class="language-sh" translate="no">
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
   create : myapp/views/index.pug
   create : myapp/views/layout.pug
   create : myapp/views/error.pug
   create : myapp/bin
   create : myapp/bin/www
</code>
</pre>

然後安裝相依項目：

<pre>
<code class="language-sh" translate="no">
$ cd myapp
$ npm install
</code>
</pre>

在 MacOS 或 Linux 中，使用下列指令來執行應用程式：

<pre>
<code class="language-sh" translate="no">
$ DEBUG=myapp:* npm start
</code>
</pre>

在 Windows 中，使用下列指令：

<pre>
<code class="language-sh" translate="no">
> set DEBUG=myapp:* & npm start
</code>
</pre>

然後在瀏覽器中載入 `http://localhost:3000/`，以存取應用程式。

產生的應用程式具有如下的目錄結構：

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
使用產生器來建立應用程式結構，只是多種用來建立 Express 應用程式結構的其中一種方式。您有權使用這種結構，或是加以修改盡量符合您的需求。
</div>
