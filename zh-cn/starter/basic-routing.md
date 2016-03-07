---
layout: page
title: Express 基本路由
menu: starter
lang: zh-cn
---

# 基本路由

*路由*用于确定应用程序如何响应对特定端点的客户机请求，包含一个 URI（或路径）和一个特定的 HTTP 请求方法（GET、POST 等）。

每个路由可以具有一个或多个处理程序函数，这些函数在路由匹配时执行。

路由定义采用以下结构：
<pre>
<code class="language-javascript" translate="no">
app.METHOD(PATH, HANDLER)
</code>
</pre>

其中：

- `app` 是 `express` 的实例。
- `METHOD` 是 [HTTP 请求方法](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)。
- `PATH` 是服务器上的路径。
- `HANDLER` 是在路由匹配时执行的函数。

<div class="doc-box doc-notice" markdown="1">
本教程假定创建了名为 `app` 的 `express` 实例且服务器正在运行。如果您对创建和启动应用程序并不熟悉，请参阅 [Hello world 示例](/{{ page.lang }}/starter/hello-world.html)。
</div>

以下示例演示了如何定义简单路由。

以主页上的 `Hello World!` 进行响应：

<pre>
<code class="language-javascript" translate="no">
app.get('/', function (req, res) {
  res.send('Hello World!');
});
</code>
</pre>

在根路由 (`/`) 上（应用程序的主页）对 POST 请求进行响应：

<pre>
<code class="language-javascript" translate="no">
app.post('/', function (req, res) {
  res.send('Got a POST request');
});
</code>
</pre>

对 `/user` 路由的 PUT 请求进行响应：

<pre>
<code class="language-javascript" translate="no">
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});
</code>
</pre>

对 `/user` 路由的 DELETE 请求进行响应：

<pre>
<code class="language-javascript" translate="no">
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});
</code>
</pre>

有关路由的更多详细信息，请参阅[路由指南](/{{ page.lang }}/guide/routing.html)。
