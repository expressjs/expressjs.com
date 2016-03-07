---
layout: page
title: 为 Express 开发模板引擎
menu: advanced
lang: zh-cn
---

# 为 Express 开发模板引擎

可以使用 `app.engine(ext, callback)` 方法创建自己的模板引擎。`ext` 表示文件扩展名，而 `callback` 表示模板引擎函数，它接受以下项作为参数：文件位置、选项对象和回调函数。

以下代码示例实现非常简单的模板引擎以呈现 `.ntl` 文件。

<pre>
<code class="language-javascript" translate="no">
var fs = require('fs'); // this engine requires the fs module
app.engine('ntl', function (filePath, options, callback) { // define the template engine
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(new Error(err));
    // this is an extremely simple template engine
    var rendered = content.toString().replace('#title#', '<title>'+ options.title +'</title>')
    .replace('#message#', '<h1>'+ options.message +'</h1>');
    return callback(null, rendered);
  });
});
app.set('views', './views'); // specify the views directory
app.set('view engine', 'ntl'); // register the template engine
</code>
</pre>

应用程序现在能够呈现 `.ntl` 文件。在 `views` 目录中创建名为 `index.ntl` 且包含以下内容的文件：

<pre>
<code class="language-javascript" translate="no">
#title#
#message#
</code>
</pre>
然后，在应用程序中创建以下路径：
<pre>
<code class="language-javascript" translate="no">
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});
</code>
</pre>
您向主页发出请求时，`index.ntl` 将呈现为 HTML。
