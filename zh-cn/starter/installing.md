---
layout: page
title: 安装 Express
menu: starter
lang: zh-cn
---

# 安装

假设您已经安装了 [Node.js](https://nodejs.org/)，创建目录以保存应用程序，并将其设置为工作目录。

<pre>
<code class="language-sh" translate="no">
$ mkdir myapp
$ cd myapp
</code>
</pre>

使用 `npm init` 命令为应用程序创建 `package.json` 文件。
有关 `package.json` 工作方式的更多信息，请参阅 [Specifics of npm's package.json handling](https://docs.npmjs.com/files/package.json)。

<pre>
<code class="language-sh" translate="no">
$ npm init
</code>
</pre>

此命令提示您输入若干项，例如应用程序的名称和版本。
现在，只需按回车键以接受其中大多数项的缺省值，但以下情况例外：

<pre>
<code class="language-sh" translate="no">
entry point: (index.js)
</code>
</pre>

输入 `app.js`，或者您希望使用的任何主文件名称。如果希望文件名为 `index.js`，请按回车键以接受建议的缺省文件名。

在 `app` 目录中安装 Express，然后将其保存在依赖项列表中。例如：

<pre>
<code class="language-sh" translate="no">
$ npm install express --save
</code>
</pre>

要暂时安装 Express 而不将其添加到依赖项列表中，请省略 `--save` 选项：

<pre>
<code class="language-sh" translate="no">
$ npm install express
</code>
</pre>

<div class="doc-box doc-info" markdown="1">
采用 `--save` 选项安装的 Node 模块已添加到 `package.json` 文件中的 `dependencies` 列表。
今后运行 `app` 目录中的 `npm install` 将自动安装依赖项列表中的模块。
</div>
