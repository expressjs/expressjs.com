---
layout: page
title: 在 Express 中提供靜態檔案
description: Understand how to serve static files like images, CSS, and JavaScript in Express.js applications using the built-in 'static' middleware.
menu: starter
lang: zh-tw
redirect_from: /starter/static-files.html
---

# 在 Express 中提供靜態檔案

To serve static files such as images, CSS files, and JavaScript files, use the `express.static` built-in middleware function in Express.

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

現在，您可以載入位於 `public` 目錄中的檔案：

```text
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
```

<div class="doc-box doc-info">
Express 會查閱靜態目錄的相對檔案，因此靜態目錄的名稱不是 URL 的一部分。
</div>

To use multiple static assets directories, call the `express.static` middleware function multiple times:

```js
app.use(express.static('public'))
app.use(express.static('files'))
```

Express looks up the files in the order in which you set the static directories with the `express.static` middleware function.

{% capture alert_content %}
For best results, [use a reverse proxy](/{{page.lang}}/advanced/best-practice-performance.html#use-a-reverse-proxy) cache to improve performance of serving static assets.
{% endcapture %}
{% include admonitions/note.html content=alert_content %}

如果要為 `express.static` 函數所提供的檔案，建立虛擬路徑字首（其中的路徑事實上不存在於檔案系統中），請為靜態目錄[指定裝載路徑](/{{ page.lang }}/4x/api.html#app.use)，如下所示：

```js
app.use('/static', express.static('public'))
```

現在，您可以透過 `/static` 路徑字首，來載入 `public` 目錄中的檔案。

```text
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
```

不過，您提供給 `express.static` 函數的路徑，是相對於您從中啟動 `node` 程序的目錄。如果您是從另一個目錄執行 Express 應用程式，保險作法是使用您想提供之目錄的絕對路徑： If you run the express app from another directory, it's safer to use the absolute path of the directory that you want to serve:

```js
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))
```

For more details about the `serve-static` function and its options, see  [serve-static](/resources/middleware/serve-static.html).

### [Previous: Basic Routing ](/{{ page.lang }}/starter/basic-routing.html)&nbsp;&nbsp;&nbsp;&nbsp;[Next: More examples ](/{{ page.lang }}/starter/examples.html)
