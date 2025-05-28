---
layout: page
title: 为 Express 开发模板引擎
description: Learn how to develop custom template engines for Express.js using app.engine(), with examples on creating and integrating your own template rendering logic.
menu: advanced
lang: en
redirect_from: "  "
---

# 为 Express 开发模板引擎

可以使用 `app.engine(ext, callback)` 方法创建自己的模板引擎。`ext` 表示文件扩展名，而 `callback` 表示模板引擎函数，它接受以下项作为参数：文件位置、选项对象和回调函数。 `ext` refers to the file extension, and `callback` is the template engine function, which accepts the following items as parameters: the location of the file, the options object, and the callback function.

以下代码示例实现非常简单的模板引擎以呈现 `.ntl` 文件。

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

Your app will now be able to render `.ntl` files. 应用程序现在能够呈现 `.ntl` 文件。在 `views` 目录中创建名为 `index.ntl` 且包含以下内容的文件：

```pug
#title#
#message#
```

然后，在应用程序中创建以下路径：

```js
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})
```

您向主页发出请求时，`index.ntl` 将呈现为 HTML。