---
layout: page
title: Express "Hello World" 範例
menu: starter
lang: zh-tw
---

# Hello world 範例

<div class="doc-box doc-info" markdown="1">
本質上，這是您所能建立的最簡易 Express 應用程式。它是單一檔案應用程式 &mdash; 與您使用 [Express 產生器](/{{ page.lang }}/starter/generator.html)所產生的結果*不同*，Express 產生器會建立完整應用程式框架，其中含有眾多 JavaScript 檔案、Jade 範本，以及各種用途的子目錄。
</div>

首先請建立一個名為 `myapp` 的目錄，切換至該目錄，並執行 `npm init`。然後按照[安裝手冊](/{{ page.lang }}/starter/installing.html)，將 `express` 安裝成一個相依關係。

在 `myapp` 目錄中，建立名為 `app.js` 的檔案，並新增下列程式碼：

<pre>
<code class="language-javascript" translate="no">
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
</code>
</pre>

應用程式會啟動伺服器，並在埠 3000 接聽連線。應用程式對指向根 URL (`/`) 或*路由*的要求，以 "Hello World!" 回應。對於其他每一個路徑，它的回應是 **404 找不到**。

<div class="doc-box doc-notice" markdown="1">
`req`（要求）和 `res`（回應）與 Node 提供的物件完全相同，因此您可以呼叫 `req.pipe()`、`req.on('data', callback)`，以及任何您要執行的項目，而不需要 Express 涉及。
</div>

使用下列指令來執行應用程式：

```console
$ node app.js
```

然後在瀏覽器中載入 [http://localhost:3000/](http://localhost:3000/)，以查看輸出。

