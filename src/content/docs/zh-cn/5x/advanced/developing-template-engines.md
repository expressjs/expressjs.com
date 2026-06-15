---
title: 为 Express 开发模板引擎
description: 学习如何使用 app.engine() 为 Express.js 开发自定义模板引擎，并通过示例讲解如何创建和集成自定义模板渲染逻辑。
---

使用 `app.engine(ext, callback)` 方法创建自定义模板引擎。 `ext` 表示文件扩展名，`callback` 是模板引擎函数，它接收以下参数：文件路径、选项对象以及回调函数。

以下代码示例实现了一个极简的模板引擎，用于渲染 `.ntl` 文件。

```js
const fs = require('fs'); // this engine requires the fs module
app.engine('ntl', (filePath, options, callback) => {
  // define the template engine
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err);
    // this is an extremely simple template engine
    const rendered = content
      .toString()
      .replace('#title#', `<title>${options.title}</title>`)
      .replace('#message#', `<h1>${options.message}</h1>`);
    return callback(null, rendered);
  });
});
app.set('views', './views'); // specify the views directory
app.set('view engine', 'ntl'); // register the template engine
```

你的应用现在将能够渲染 `.ntl` 文件。 在 `views` 目录中创建一个名为 `index.ntl` 的文件，并写入以下内容。

```pug
#title#
#message#
```

然后在你的应用中创建如下路由。

```js
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' });
});
```

当你向主页发起请求时，`index.ntl` 文件会被渲染为 HTML。
