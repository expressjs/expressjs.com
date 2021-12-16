---
layout: page
title: 移轉至 Express 5
menu: guide
lang: zh-tw
---

# 移至 Express 5

<h2 id="overview">概觀</h2>

Express 5.0 尚在 Alpha 版階段，這裡讓您預覽版本中的變更以及如何將 Express 4 應用程式移轉至 Express 5。

Express 5 與 Express 4 之間差異不大：API 的變更不會像從 3.0 至 4.0 那樣顯著。雖然基本 API 維持相同，仍有一些突破性變更；換句話說，如果您更新成使用 Express 5，現有 Express 4 程式可能無法運作。

如果要安裝最新的 Alpha 版並預覽 Express 5，請在您應用程式根目錄中輸入下列指令：

```console
$ npm install express@5.0.0-alpha.2 --save
```

然後您可以執行自動化測試，查看失敗之處，並根據下方列出的更新項目來修正問題。解決測試失敗之後，請執行您的應用程式，查看發生哪些錯誤。只要應用程式使用任何不支援的方法或內容，您會馬上發現。

<h2 id="changes">Express 5 中的變更</h2>

這裡列出將會影響您（作為 Express 使用者）的變更（起自 Alpha 2 版）。如需所有規劃的特性清單，請參閱 [pull request](https://github.com/expressjs/express/pull/2237)。

**已移除的方法和內容**

<ul class="doclist">
  <li><a href="#app.del">app.del()</a></li>
  <li><a href="#app.param">app.param(fn)</a></li>
  <li><a href="#plural">複數化的方法名稱</a></li>
  <li><a href="#leading">app.param(name, fn) 名稱引數中的前導冒號</a></li>
  <li><a href="#req.param">req.param(name)</a></li>
  <li><a href="#res.json">res.json(obj, status)</a></li>
  <li><a href="#res.jsonp">res.jsonp(obj, status)</a></li>
  <li><a href="#res.send.body">res.send(body, status)</a></li>
  <li><a href="#res.send.status">res.send(status)</a></li>
  <li><a href="#res.sendfile">res.sendfile()</a></li>
</ul>

**已變更**

<ul class="doclist">
  <li><a href="#app.router">app.router</a></li>
  <li><a href="#req.host">req.host</a></li>
  <li><a href="#req.query">req.query</a></li>
</ul>

**改良**

<ul class="doclist">
  <li><a href="#res.render">res.render()</a></li>
</ul>

<h3>已移除的方法和內容</h3>

如果您在應用程式中使用上述任何方法或內容，應用程式將會當機。因此，更新至第 5 版之後，您需要變更應用程式。

<h4 id="app.del">app.del()</h4>

Express 5 不再支援 `app.del()` 函數。如果您使用此函數，會擲出錯誤。若要登錄 HTTP DELETE 路由，請改用 `app.delete()` 函數。

最初是使用 `del` 而非 `delete`，因為 `delete` 是 JavaScript 中的保留關鍵字。不過，從 ECMAScript 6 起，`delete` 和其他保留關鍵字可以合法作為內容名稱。您可以在這裡閱讀導致淘汰 `app.del` 函數的相關討論。

<h4 id="app.param">app.param(fn)</h4>

`app.param(fn)` 簽章用來修改 `app.param(name, fn)` 函數的行為。從 4.11.0 版起就已淘汰，Express 5 已全然不再支援。

<h4 id="plural">複數化的方法名稱</h4>

下列方法名稱已複數化。在 Express 4 中，使用舊方法會引發淘汰警告。Express 5 已全然不再支援：

`req.acceptsCharset()` 以 `req.acceptsCharsets()` 取代。

`req.acceptsEncoding()` 以 `req.acceptsEncodings()` 取代。

`req.acceptsLanguage()` 以 `req.acceptsLanguages()` 取代。

<h4 id="leading">app.param(name, fn) 名稱中的前導冒號 (:)</h4>

`app.param(name, fn)` 函數名稱中的前導冒號字元 (:) 遺留自 Express 3，基於舊版相容性，Express 4 仍支援它，只是會發出淘汰警示。Express 5 會無聲自動忽略它，並使用少了冒號字首的名稱參數。

如果您遵循 Express 4 [app.param](/{{ page.lang }}/4x/api.html#app.param) 說明文件，應該不會影響您的程式碼，因為該說明文件不會提及前導冒號。

<h4 id="req.param">req.param(name)</h4>

這個用來擷取表單資料的方法因可能造成混淆且招致危險，而已經移除。現在您需要明確尋找 `req.params`、`req.body` 或 `req.query` 物件中所提交的參數名稱。

<h4 id="res.json">res.json(obj, status)</h4>

Express 5 不再支援 `res.json(obj, status)` 簽章。請改以設定狀態，然後與 `res.json()` 方法鏈接，如下所示：`res.status(status).json(obj)`。

<h4 id="res.jsonp">res.jsonp(obj, status)</h4>

Express 5 不再支援 `res.jsonp(obj, status)` 簽章。請改以設定狀態，然後與 `res.jsonp()` 方法鏈接，如下所示：`res.status(status).jsonp(obj)`。

<h4 id="res.send.body">res.send(body, status)</h4>

Express 5 不再支援 `res.send(obj, status)` 簽章。請改以設定狀態，然後與 `res.send()` 方法鏈接，如下所示：`res.status(status).send(obj)`。

<h4 id="res.send.status">res.send(status)</h4>

Express 5 不再支援 <code>res.send(<em>status</em>)</code> 簽章，其中 *`status`* 是數字。請改用 `res.sendStatus(statusCode)` 函數，此函數是設定 HTTP 回應標頭狀態碼，並傳送文字版的程式碼：「找不到」、「內部伺服器錯誤」等。
如果您需要使用 `res.send()` 函數來傳送數字，請將數字括上引號來轉換成字串，這樣 Express 就不會解譯它以試圖使用不支援的舊簽章。

<h4 id="res.sendfile">res.sendfile()</h4>

`res.sendfile()` 函數已被 Express 5 中的駝峰式大小寫版本 `res.sendFile()` 取代。

<h3>已變更</h3>

<h4 id="app.router">app.router</h4>

`app.router` 物件已在 Express 4 中移除，在 Express 5 中又重新納入。
在新版本中，這個物件只用來參照至基本 Express 路由器，不像在 Express 3 中，應用程式還得明確載入它。

<h4 id="req.host">req.host</h4>

在 Express 4 中，`req.host` 函數會不當去除埠號（如果有的話）。在 Express 5 中，會維護埠號。

<h4 id="req.query">req.query</h4>

在 Express 4.7 以及從 Express 5 開始，當您想使用自己的函數作為查詢字串剖析邏輯時，查詢剖析器選項可以接受 `false` 以停用查詢字串剖析。

<h3>改良</h3>

<h4 id="res.render">res.render()</h4>

此方法現在會針對所有視圖引擎施行非同步行為，可避免採行同步實作及違反建議介面的視圖引擎所造成的錯誤。
