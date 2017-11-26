---
layout: page
title: 在 Express 中提供静态文件
menu: starter
lang: zh-cn
---

# 在 Express 中提供静态文件

为了提供诸如图像、CSS 文件和 JavaScript 文件之类的静态文件，请使用 Express 中的 `express.static` 内置中间件函数。

将包含静态资源的目录的名称传递给 `express.static` 中间件函数，以便开始直接提供这些文件。例如，使用以下代码在名为 `public` 的目录中提供图像、CSS 文件和 JavaScript 文件：

<pre>
<code class="language-javascript" translate="no">
app.use(express.static('public'));
</code>
</pre>

现在，可以访问位于 `public` 目录中的文件：

<pre>
<code class="language-javascript" translate="no">
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
</code>
</pre>

<div class="doc-box doc-info">
Express 相对于静态目录查找文件，因此静态目录的名称不是此 URL 的一部分。
</div>

要使用多个静态资源目录，请多次调用 `express.static` 中间件函数：

<pre>
<code class="language-javascript" translate="no">
app.use(express.static('public'));
app.use(express.static('files'));
</code>
</pre>

Express 以您使用 `express.static` 中间件函数设置静态目录的顺序来查找文件。

要为 `express.static` 函数提供的文件创建虚拟路径前缀（路径并不实际存在于文件系统中），请为静态目录[指定安装路径](/{{ page.lang }}/4x/api.html#app.use)，如下所示：

<pre>
<code class="language-javascript" translate="no">
app.use('/static', express.static('public'));
</code>
</pre>

现在，可以访问具有 `/static` 路径前缀的 `public` 目录中的文件。

<pre>
<code class="language-javascript" translate="no">
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
</code>
</pre>

然而，向 `express.static` 函数提供的路径相对于您在其中启动 `node` 进程的目录。如果从另一个目录运行 Express 应用程序，那么对于提供资源的目录使用绝对路径会更安全：

<pre>
<code class="language-javascript" translate="no">
app.use('/static', express.static(__dirname + '/public'));
</code>
</pre>
