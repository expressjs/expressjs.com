---
layout: page
title: Express basic routing tutorial
menu: starter
lang: zh
---

# 路由基础教程

本教程是对Express路由功能的简单介绍。路由决定一个应用程序在某特定的端响应客户端的请求。这个端包括一个URI（或路径）和一个具体的HTTP请求方法（GET，POST，等等）。

每一个路由有一个或多个处理函数，当路由被匹配时将会执行。

定义的路由会使用如下结构`app.METHOD(PATH, HANDLER)`, `app`是`express`的实例，`METHOD`是[HTTP请求方法](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)，`PATH`是请求服务器时的路径，`HANDLER`是指当路由被匹配时所执行的函数。

<div class="doc-box doc-notice" markdown="1">
本教程假设`app`创建完成并已启动服务。如果你不熟悉如何创建`app`并启动它，请转到 [Hello world example](/{{ page.lang }}/starter/hello-world.html).
</div>

以下代码是app中的一些路由示例。

<pre><code class="language-javascript" translate="no">
// respond with "Hello World!" on the homepage
app.get('/', function (req, res) {
  res.send('Hello World!');
})

// accept POST request on the homepage
app.post('/', function (req, res) {
  res.send('Got a POST request');
})

// accept PUT request at /user
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
})

// accept DELETE request at /user
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
})
</code></pre>

更多详情 [路由使用指南](/{{ page.lang }}/guide/routing.html).
