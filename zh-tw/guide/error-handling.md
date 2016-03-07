---
layout: page
title: Express 錯誤處理
menu: guide
lang: zh-tw
---

# 錯誤處理

錯誤處理中介軟體函數的定義方式，與其他中介軟體函數相同，差別在於錯誤處理函數的引數是四個而非三個：`(err, req, res, next)`。例如：


<pre>
<code class="language-javascript" translate="no">
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
</code>
</pre>

您是在定義其他 `app.use()` 和路由呼叫之後，最後才定義錯誤處理中介軟體；例如：

<pre>
<code class="language-javascript" translate="no">
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser());
app.use(methodOverride());
app.use(function(err, req, res, next) {
  // logic
});
</code>
</pre>

中介軟體函數內的回應可以是任何您喜好的格式，如：HTML 錯誤頁面、簡式訊息或 JSON 字串。

為了方便組織（和更高層次的架構），您可以定義數個錯誤處理中介軟體函數，就像您處理一般中介軟體函數一樣。舉例來說，如果您想為使用及沒有使用 `XHR` 所建立的要求，各定義一個錯誤處理程式，您可以使用下列指令：

<pre>
<code class="language-javascript" translate="no">
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser());
app.use(methodOverride());
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
</code>
</pre>

在本例中，通用的 `logErrors` 可能將要求和錯誤資訊寫入至 `stderr`，例如：

<pre>
<code class="language-javascript" translate="no">
function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}
</code>
</pre>

此外在本例中，`clientErrorHandler` 定義成如下；在此情況下，會將錯誤明確傳遞給下一個：

<pre>
<code class="language-javascript" translate="no">
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}
</code>
</pre>

"catch-all" `errorHandler` 函數的實作方式如下：

<pre>
<code class="language-javascript" translate="no">
function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}
</code>
</pre>

不論您傳遞何者給 `next()` 函數（`'route'` 字串除外），Express 都會將現行要求視為發生錯誤，且會跳過其餘任何的非錯誤處理路由和中介軟體函數。如果您想以某種方式來處理該錯誤，您必須按照下一節的說明來建立錯誤處理路由。

如果您的路由處理程式有多個回呼函數，可以使用 `route` 參數來跳到下一個路由處理程式。例如：


<pre>
<code class="language-javascript" translate="no">
app.get('/a_route_behind_paywall',
  function checkIfPaidSubscriber(req, res, next) {
    if(!req.user.hasPaid) {

      // continue handling this request
      next('route');
    }
  }, function getPaidContent(req, res, next) {
    PaidContent.find(function(err, doc) {
      if(err) return next(err);
      res.json(doc);
    });
  });
</code>
</pre>

在本例中，會跳過 `getPaidContent` 處理程式，但是會繼續執行 `app` 中 `/a_route_behind_paywall` 的其餘處理程式。

<div class="doc-box doc-info" markdown="1">
呼叫 `next()` 和 `next(err)`，指出現行處理程式已完成以及處於何種狀態。除了依上述說明設定成用來處理錯誤的那些處理程式，`next(err)` 會跳過處理程式鏈中其餘所有的處理程式。</div>

## 預設錯誤處理程式

Express 隨附一個內建錯誤處理常式，它會處理應用程式中可能遇到的任何錯誤。這個預設錯誤處理中介軟體函數新增於中介軟體函數堆疊尾端。

如果您傳遞錯誤至 `next()`，且您沒有在錯誤處理常式中處理它，將會交由內建錯誤處理常式處理；該錯誤會連同堆疊追蹤寫入至用戶端。在正式作業環境中，則不包含堆疊追蹤。

<div class="doc-box doc-info" markdown="1">
將 `NODE_ENV` 環境變數設為 `production`，以便在正式作業模式下執行應用程式。
</div>

在您開始撰寫回應之後，一旦在呼叫 `next()` 時才發生錯誤（例如，當您將回應串流輸出至用戶端時遇到錯誤），Express 的預設錯誤處理程式會關閉連線，並使要求失敗。

因此，在您新增自訂錯誤處理常式時，如果標頭已傳送給用戶端，您會希望委派給 Express 中的預設錯誤處理機制處理：

<pre>
<code class="language-javascript" translate="no">
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
}
</code>
</pre>
