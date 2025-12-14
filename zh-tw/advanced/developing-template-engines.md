---
layout: page
title: 開發 Express 範本引擎
description: Learn how to develop custom template engines for Express.js using app.engine(), with examples on creating and integrating your own template rendering logic.
menu: advanced
order: 1
redirect_from: "  "
---

# 開發 Express 範本引擎

利用 `app.engine(ext, callback)` 方法，來建立您自己的範本引擎。`ext` 是指副檔名，`callback` 是範本引擎函數，它可接受下列項目作為參數：檔案的位置、options 物件，以及回呼函數。 `ext` refers to the file extension, and `callback` is the template engine function, which accepts the following items as parameters: the location of the file, the options object, and the callback function.

下列程式碼範例說明如何實作一個相當簡單的範本引擎，以呈現 `.ntl` 檔。

```js
const fs = require('fs') // this engine requires the fs module
app.engine('ntl', (filePath, options, callback) => { // define the template engine
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err)
    // this is an extremely simple template engine
    const rendered = content.toString()
      .replace('#title#', `<title>${options.title}</title>`)
      .replace('#message#', `<h1>${options.message}</h1>`)
    return callback(null, rendered)
  })
})
app.set('views', './views') // specify the views directory
app.set('view engine', 'ntl') // register the template engine
```

Your app will now be able to render `.ntl` files. 現在，您的應用程式能夠呈現 `.ntl` 檔。請在 `views` 目錄中建立一個名稱是 `index.ntl` 的檔案，內含下列內容。

```pug
#title#
#message#
```

Then, create the following route in your app.

```js
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})
```

當您向首頁提出要求時，`index.ntl` 會呈現成 HTML。