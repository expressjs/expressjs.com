---
layout: page
title: 在 Express 中提供静态文件
description: Understand how to serve static files like images, CSS, and JavaScript in Express.js applications using the built-in 'static' middleware.
menu: starter
lang: en
redirect_from: /starter/static-files.html
---

# 在 Express 中提供静态文件

为了提供诸如图像、CSS 文件和 JavaScript 文件之类的静态文件，请使用 Express 中的 `express.static` 内置中间件函数。

The function signature is:

```js
express.static(root, [options])
```

The `root` argument specifies the root directory from which to serve static assets.
For more information on the `options` argument, see [express.static](/{{page.lang}}/4x/api.html#express.static).

For example, use the following code to serve images, CSS files, and JavaScript files in a directory named `public`:

```js
app.use(express.static('public'))
```

现在，可以访问位于 `public` 目录中的文件：

```text
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
```

<div class="doc-box doc-info">
Express 相对于静态目录查找文件，因此静态目录的名称不是此 URL 的一部分。
</div>

要使用多个静态资源目录，请多次调用 `express.static` 中间件函数：

```js
app.use(express.static('public'))
app.use(express.static('files'))
```

Express 以您使用 `express.static` 中间件函数设置静态目录的顺序来查找文件。

{% capture alert_content %}
For best results, [use a reverse proxy](/{{page.lang}}/advanced/best-practice-performance.html#use-a-reverse-proxy) cache to improve performance of serving static assets.
{% endcapture %}
{% include admonitions/note.html content=alert_content %}

要为 `express.static` 函数提供的文件创建虚拟路径前缀（路径并不实际存在于文件系统中），请为静态目录[指定安装路径](/{{ page.lang }}/4x/api.html#app.use)，如下所示：

```js
app.use('/static', express.static('public'))
```

现在，可以访问具有 `/static` 路径前缀的 `public` 目录中的文件。

```text
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
```

然而，向 `express.static` 函数提供的路径相对于您在其中启动 `node` 进程的目录。如果从另一个目录运行 Express 应用程序，那么对于提供资源的目录使用绝对路径会更安全： If you run the express app from another directory, it's safer to use the absolute path of the directory that you want to serve:

```js
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))
```

For more details about the `serve-static` function and its options, see  [serve-static](/resources/middleware/serve-static.html).

### [Previous: Basic Routing ](/{{ page.lang }}/starter/basic-routing.html)&nbsp;&nbsp;&nbsp;&nbsp;[Next: More examples ](/{{ page.lang }}/starter/examples.html)
