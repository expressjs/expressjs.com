---
layout: page
title: Express "Hello World" 实例
menu: starter
lang: zh
---

# Hello world 实例

下面展示的就是一个基本的 Express 应用实例。

<pre><code class="language-javascript" translate="no">
var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
</code></pre>

<div class="doc-box doc-notice" markdown="1">
`req`（request）和`res`（response）是Node提供的完全相同的对象，所以在不用Express参与的情况下，你还可以调用`req.pipe（）`，`req.on（'data', callback）`或其他任何你想调用的方法。
</div>

此应用会启动一个服务并且监听3000端口。当访问主页时会返回“Hello World!”。对于访问其他路径，将会响应**404 Not Found**。

保存这段代码到一个名为`app.js`的文件，执行如下命令

<pre><code class="language-sh" translate="no">
$ node app.js
</code></pre>

然后，在浏览器中访问[http://localhost:3000/](http://localhost:3000/)查看结果。
