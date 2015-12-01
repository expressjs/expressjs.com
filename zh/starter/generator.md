---
layout: page
title: Express应用生成器
menu: starter
lang: zh
---

# Express应用生成器

使用应用生成器`express`快速创建一个应用程序框架。

你可以使用以下命令来安装：

<pre><code class="language-sh" translate="no">
$ npm install express-generator -g
</code></pre>

使用 `-h` 选项来显示命令的选项列表：

<pre><code class="language-sh" translate="no">
$ express -h

  Usage: express [options] [dir]

  Options:

    -h, --help          output usage information     输出使用说明
    -V, --version       output the version number    输出版本号
    -e, --ejs           add ejs engine support (defaults to jade)  添加ejs引擎支持（默认为jade）
        --hbs           add handlebars engine support              添加handlebars引擎支持
    -H, --hogan         add hogan.js engine support                添加hogan.js引擎支持
    -c, --css &lt;engine>  add stylesheet &lt;engine> support (less|stylus|compass) (defaults to plain css)  添加样式表预处理引擎支持(less|stylus|compass)
    -f, --force         force on non-empty directory               强制在非空的目录生成应用框架
</code></pre>

举个例子，下面的命令可以在当前目录创建一个名为 _myapp_ 的Express应用。

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

接下来安装依赖包：

<pre><code class="language-sh" translate="no">
$ cd myapp
$ npm install
</code></pre>

运行程序 (MacOS或Linux)：

<pre><code class="language-sh" translate="no">
$ DEBUG=myapp ./bin/www
</code></pre>

在Windows上，你需要运行这条命令：

<pre><code class="language-sh" translate="no">
> set DEBUG=myapp & node .\bin\www
</code></pre>

接下来在浏览器中打开 `http://localhost:3000/` 来访问应用。

生成的应用目录结构大概是这样的：

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
应用生成器生成的应用结构仅仅是众多Express应用结构中的一种，你也可以选择不使用它或者做一些修改来最好地适应你的需要。
</div>
