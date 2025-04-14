---
layout: page
title: Express“Hello World”示例
description: Get started with Express.js by building a simple 'Hello World' application, demonstrating the basic setup and server creation for beginners.
menu: starter
lang: en
redirect_from: /starter/hello-world.html
---

# Hello world 示例

<div class="doc-box doc-info" markdown="1">
Embedded below is essentially the simplest Express app you can create. It is a single file app &mdash; _not_ what you'd get if you use the [Express generator](/{{ page.lang }}/starter/generator.html), which creates the scaffolding for a full app with numerous JavaScript files, Jade templates, and sub-directories for various purposes.
</div>

```js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

This app starts a server and listens on port 3000 for connections. 应用程序会启动服务器，并在端口 3000 上侦听连接。此应用程序以“Hello World!”响应针对根 URL (`/`) 或_路由_的请求。对于其他所有路径，它将以 **404 Not Found** 进行响应。 For every other path, it will respond with a **404 Not Found**.

### Running Locally

首先创建名为 `myapp` 的目录，切换到此目录，然后运行 `npm init`。根据[安装指南](/{{ page.lang }}/starter/installing.html)将 `express` 安装为依赖项。 Then, install `express` as a dependency, as per the [installation guide](/{{ page.lang }}/starter/installing.html).

在 `myapp` 目录中，创建名为 `app.js` 的文件，然后添加以下代码：

<div class="doc-box doc-notice" markdown="1">
`req`（请求）和 `res`（响应）与 Node 提供的对象完全相同，所以您可以在不涉及 Express 的情况下调用 `req.pipe()`、`req.on('data', callback)` 和要执行的其他任何函数。
</div>

使用以下命令运行应用程序：

```bash
$ node app.js
```

然后，在浏览器中输入 [http://localhost:3000/](http://localhost:3000/) 以查看输出。

### 这基本上是您可以创建的最简单的 Express 应用程序。这是单个文件应用程序 &mdash; 根本_不_需要动用 [Express 生成器](/{{ page.lang }}/starter/generator.html)。Express 生成器的作用就像是为完整的应用程序建立一个“脚手架”，包含各种用途的 JavaScript 文件、Jade 模板和子目录。
