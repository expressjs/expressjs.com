---
layout: page
title: 撰寫中介軟體以用於 Express 應用程式中
menu: guide
lang: zh-tw
---

# 撰寫中介軟體以用於 Express 應用程式中

<h2>概觀</h2>

*中介軟體*函數是一些有權存取[要求物件](/{{ page.lang }}/4x/api.html#req) (`req`)、[回應物件](/{{ page.lang }}/4x/api.html#res) (`res`) 和應用程式要求/回應循環中之下一個中介軟體函數的函數。下一個中介軟體函數通常以名為 `next` 的變數表示。

中介軟體函數可以執行下列作業：

* 執行任何程式碼。
* 對要求和回應物件進行變更。
* 結束要求/回應循環。
* 呼叫堆疊中的下一個中介軟體。

如果現行中介軟體函數不會結束要求/回應循環，它必須呼叫 `next()`，以便將控制權傳遞給下一個中介軟體函數。否則，要求將會停擺。

下列範例顯示中介軟體函數呼叫中的元素：

<table id="mw-fig">
<tr><td id="mw-fig-imgcell">
<img src="/images/express-mw.png" id="mw-fig-img" />
</td>
<td class="mw-fig-callouts">
<div class="callout" id="callout1">要套用中介軟體函數的 HTTP 方法。</div>

<div class="callout" id="callout2">要套用中介軟體函數的路徑（路由）。</div>

<div class="callout" id="callout3">中介軟體函數。</div>

<div class="callout" id="callout4">中介軟體函數的回呼引數，依慣例，稱為 "next"。</div>

<div class="callout" id="callout5">中介軟體函數的 HTTP <a href="../4x/api.html#res">response</a> 引數，依慣例，稱為 "res"。</div>

<div class="callout" id="callout6">中介軟體函數的 HTTP <a href="../4x/api.html#req">request</a> 引數，依慣例，稱為 "req"。</div>
</td></tr>
</table>

下列範例顯示簡單的 "Hello World" Express 應用程式，您將為這個應用程式定義兩個中介軟體函數：

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000);
</code>
</pre>

<h2>開發</h2>

以下的簡單範例顯示一個稱為 "myLogger" 的中介軟體函數。當透過這個函數將要求傳遞給應用程式時，此函數只會列印 "LOGGED"。中介軟體函數會指派給名為 `myLogger` 的變數。

<pre>
<code class="language-javascript" translate="no">
var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};
</code>
</pre>

<div class="doc-box doc-notice" markdown="1">
請注意上述對 `next()` 的呼叫。呼叫這個函數時，會呼叫應用程式中的下一個中介軟體函數。`next()` 函數並非 Node.js 或 Express API 的一部分，而是傳遞給中介軟體函數的第三個引數。`next()` 函數雖沒有命名限制，但依慣例，都是稱為 "next"。為避免混淆，請一律採用此慣例。
</div>

若要載入中介軟體函數，請呼叫 `app.use()`，以指定中介軟體函數。舉例來說，下列程式碼會在根路徑 (/) 路由之前先載入 `myLogger` 中介軟體函數。

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var app = express();

var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

app.use(myLogger);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000);
</code>
</pre>

每當應用程式收到要求時，它會將 "LOGGED" 訊息列印至終端機。

中介軟體的載入順序很重要：先載入的中介軟體函數也會先執行。

如果 `myLogger` 是在根路徑路由之後才載入，要求永不會抵達該函數，應用程式也不會列印 "LOGGED"，因為根路徑的路由處理程式會終止要求/回應循環。

中介軟體函數 `myLogger` 只會列印訊息，然後呼叫 `next()` 函數，將要求傳遞給堆疊中的下一個中介軟體函數。

下一個範例是在要求物件中新增一個稱為 `requestTime` 的內容。我們將這個中介軟體函數命名為 "requestTime"。

<pre>
<code class="language-javascript" translate="no">
var requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};
</code>
</pre>

現在，應用程式會使用 `requestTime` 中介軟體函數。此外，根路徑路由的回呼函數會使用中介軟體函數新增至 `req`（要求物件）的內容。

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var app = express();

var requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

app.use(requestTime);

app.get('/', function (req, res) {
  var responseText = 'Hello World!<br>';
  responseText += '<small>Requested at: ' + req.requestTime + '</small>';
  res.send(responseText);
});

app.listen(3000);
</code>
</pre>

當您對應用程式根位置發出要求時，應用程式現在會在瀏覽器中顯示該要求的時間戳記。

由於您有權存取要求物件、回應物件、堆疊中的下一個中介軟體函數，以及整個 Node.js API，因此，中介軟體函數的可能性無止盡。

如需 Express 中介軟體的相關資訊，請參閱：[使用 Express 中介軟體](/{{ page.lang }}/guide/using-middleware.html)。
