---
layout: page
title: 安装 Express
menu: starter
lang: zh
---

# 安装

首先，为你的应用创建一个目录，然后进入此目录并将此目录作为工作目录。

~~~sh
$ mkdir myapp
$ cd myapp
~~~

在当前目录中创建一个 `package.json` 文件。可以通过 `npm init` 命令来完成此工作。

~~~sh
$ npm init
~~~

在当前目录中安装 Express 并将其添加到依赖列表中：

~~~sh
$ npm install express --save
~~~

如果只是希望临时安装 Express，不希望将其添加到依赖列表中，请略去 `--save` 命令行参数：

~~~sh
$ npm install express
~~~

<div class="doc-box doc-info" markdown="1">
安装 Node 模块时，如果指定了 `--save` 参数，此模块将被添加到 `package.json` 文件的 `dependencies` 列表中。
将来再次在工作目录中执行 `npm install` 指令时，所有在依赖列表中的模块都将自动被安装。
</div>
