---
layout: page
title: Express 常見問題 (FAQ)
menu: starter
lang: zh-tw
---

# 常見問題 (FAQ)

## 我該如何建立我的應用程式結構？

這個問題沒有明確答案。此答案取決於您應用程式的規模和涉及的團隊。為了盡可能靈活，Express 對於結構沒有任何的假設。

您可以根據自己的喜好，將路由和應用程式特定的其他邏輯放在任意數目的檔案和任何的目錄結構中。請檢視下列範例，以獲得一些啟發：

* [路由清單](https://github.com/expressjs/express/blob/4.13.1/examples/route-separation/index.js#L32-47)
* [路由對映](https://github.com/expressjs/express/blob/4.13.1/examples/route-map/index.js#L52-L66)
* [MVC 樣式控制器](https://github.com/expressjs/express/tree/master/examples/mvc)

此外，Express 有一些協力廠商延伸，可簡化部分這些型樣：

* [express-resource 路由](https://github.com/expressjs/express-resource)

## 如何定義模型？

Express 不會注意到資料庫的存在。此概念留給協力廠商 Node 模組處理，如此可讓您與幾近全部的資料庫溝通。

請參閱 [LoopBack](http://loopback.io)，取得以模組為中心的 Express 型架構。

## 如何鑑別使用者？

鑑別是 Express 另一個不涉及的自用領域。您可以使用任何您想要的鑑別方法。如需簡易使用者名稱 / 密碼方法，請參閱[這個範例](https://github.com/expressjs/express/tree/master/examples/auth)。


## Express 支援哪些範本引擎？

Express 支援符合 `(path, locals, callback)` 簽章的任何範本引擎。若要使範本引擎介面和快取正規化，請參閱 [consolidate.js](https://github.com/visionmedia/consolidate.js) 專案，以取得支援。未列出的範本引擎可能仍支援 Express 簽章。

## 如何處理 404 回應？

在 Express 中，404 回應並不是錯誤的結果，因此錯誤處理常式中介軟體不會擷取它們。會有此行為是因為 404 回應僅表示沒有額外的工作來執行；換句話說，Express 已執行所有的中介軟體函數和路由，並發現它們都沒有回應。您唯一要做的是在堆疊的最底端（其他所有函數下方），新增一個中介軟體函數，以處理 404 回應：

<pre>
<code class="language-javascript" translate="no">
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});
</code>
</pre>

## 如何設定錯誤處理程式？

錯誤處理中介軟體的定義方式，與其他中介軟體相同，差別在於引數是四個而非三個，具體來說，就是使用 `(err, req, res, next)` 簽章：

<pre>
<code class="language-javascript" translate="no">
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
</code>
</pre>

如需相關資訊，請參閱[錯誤處理](/{{ page.lang }}/guide/error-handling.html)。

## 如何呈現一般 HTML？

不需要！不需要用 `res.render()` 函數來「呈現」HTML。如果您有特定的檔案，請使用 `res.sendFile()` 函數。如果您會從目錄提供許多資產，請使用 `express.static()` 中介軟體函數。
