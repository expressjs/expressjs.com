---
layout: page
title: Express 应用程序生成器
menu: starter
lang: zh-cn
---

# Express 应用程序生成器

可使用应用程序生成器工具 (`express-generator`) 快速创建应用程序框架。

您可以使用 `npx` 命令（在 Node.js 8.2.0 中可用）运行应用程序生成器。

```console
$ npx express-generator
```

对于早期的 Node 版本，可将应用程序生成器作为全局 npm 软件包安装，然后启动它。

```console
$ npm install -g express-generator
$ express
```

使用 `-h` 选项显示命令选项：

```console
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

例如，以下语句在当前工作目录中创建名为 _myapp_ 的 Express 应用程序并将视图引擎将设置为 [Pug](https://pugjs.org/) ：

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

然后安装依赖项：

```console
$ cd myapp
$ npm install
```

在 MacOS 或 Linux 上，采用以下命令运行此应用程序：

```console
$ DEBUG=myapp:* npm start
```

在 Windows 命令提示符上，使用以下命令：

```console
> set DEBUG=myapp:* & npm start
```

在 Windows PowerShell 上，使用以下命令：

```console
PS> $env:DEBUG='myapp:*'; npm start
```

然后在浏览器中输入 `http://localhost:3000/` 以访问此应用程序。

生成的应用程序具有以下目录结构：

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
生成器创建的应用程序结构只是构造 Express 应用程序的众多方法之一。请随意使用此结构或者对其进行修改以最大程度满足自己的需求。
</div>
