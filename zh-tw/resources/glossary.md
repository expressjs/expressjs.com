---
layout: page
title: Express 名詞解釋
menu: resources
lang: zh-tw
---

# 名詞解釋

### API

應用程式設計介面。在第一次使用時，會拼寫出縮寫。

### Express

快速、集思廣益、極簡的 Node.js 應用程式 Web 架構。一般而言，"Express" 比 "Express.js" 合適，不過，也能接受後者。

### libuv

多平台支援的程式庫，著重在非同步 I/O，主要開發供 Node.js 使用。

### Node.js

一種軟體平台，用來建置可調式網路應用程式。Node.js 使用 JavaScript 作為其 Scripting 語言，並透過非封鎖 I/O 和單一執行緒事件迴圈，來達到高傳輸量。請參閱 [nodejs.org](http://nodejs.org/)。**使用注意事項**：一開始稱為 "Node.js"，之後稱為 "Node"。

### 中介軟體 (middleware)

Express 路由層在最終要求處理程式之前所呼叫的函數，因此它位於原始要求與最終預期的路由中間。中介軟體周圍會有少許合宜的專有名詞點：

  * `var foo = require('middleware')` 可稱為*需要*或*使用* Node.js 模組。接著，`var mw = foo()` 陳述式通常會傳回中介軟體。
  * `app.use(mw)` 可稱為*將中介軟體新增至廣域處理程序堆疊*。
  * `app.get('/foo', mw, function (req, res) { ... })` 可稱為*將中介軟體新增至 "GET /foo" 處理程序堆疊*。

### 回應 (response)

一種 HTTP 回應。伺服器傳回 HTTP 回應訊息給用戶端。回應包含要求的相關完成狀態資訊，也可能將要求內容包含在其訊息內文中。

### 要求 (request)

一種 HTTP 要求。用戶端提交 HTTP 要求訊息給伺服器，再由伺服器傳回回應。要求必須使用其中一種[要求方法](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods)，例如 GET、POST 等。

### 開放程式碼 (open-source, open source)

當作為形容詞時，會加連號；例如："This is open-source software." 請參閱[維基百科上的開放程式碼軟體](http://en.wikipedia.org/wiki/Open-source_software)。附註：雖然此術語通常不會加連號，我們仍採用標準的英文規則，加上連號來代表複合形容詞。

### 路由 (route)

URL 的一部分，用來識別資源。例如，在 `http://foo.com/products/id` 中，"/products/id" 就是路由。

### 路由器 (router)

請參閱 API 參照中的[路由器](/{{ page.lang }}/4x/api.html#router)。

### 應用程式 (application)

通常是指設計成實行作業以達特定目的的一或多個程式。就 Express 環境定義來說，是指使用 Express API（在 Node.js 平台上執行）的程式。亦可稱為[應用程式物件 (app object)](/{{ page.lang }}/api.html#express)。
