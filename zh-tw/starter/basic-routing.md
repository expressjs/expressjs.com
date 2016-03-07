---
layout: page
title: Express 基本路由
menu: starter
lang: zh-tw
---

# 基本路由

*路由*是指判斷應用程式如何回應用戶端對特定端點的要求，而這個特定端點是一個 URI（或路徑）與一個特定的 HTTP 要求方法（GET、POST 等）。

每一個路由可以有一或多個處理程式函數，當路由相符時，就會執行這些函數。

路由定義的結構如下：
<pre>
<code class="language-javascript" translate="no">
app.METHOD(PATH, HANDLER)
</code>
</pre>

其中：

- `app` 是 `express` 的實例。
- `METHOD` 是 [HTTP 要求方法](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)。
- `PATH` 是伺服器上的路徑。
- `HANDLER` 是當路由相符時要執行的函數。

<div class="doc-box doc-notice" markdown="1">
這項指導教學假設已建立名稱為 `app` 的 `express` 實例，且伺服器正在執行。如果您不熟悉如何建立和啟動應用程式，請參閱 [Hello world 範例](/{{ page.lang }}/starter/hello-world.html)。
</div>

下列範例說明如何定義簡單的路由。

首頁中以 `Hello World!` 回應。

<pre>
<code class="language-javascript" translate="no">
app.get('/', function (req, res) {
  res.send('Hello World!');
});
</code>
</pre>

對根路由 (`/`)（應用程式的首頁）發出 POST 要求時的回應：

<pre>
<code class="language-javascript" translate="no">
app.post('/', function (req, res) {
  res.send('Got a POST request');
});
</code>
</pre>

對 `/user` 路由發出 PUT 要求時的回應：

<pre>
<code class="language-javascript" translate="no">
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});
</code>
</pre>

對 `/user` 路由發出 DELETE 要求時的回應：

<pre>
<code class="language-javascript" translate="no">
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});
</code>
</pre>

如需路由的詳細資料，請參閱[路由手冊](/{{ page.lang }}/guide/routing.html)。
