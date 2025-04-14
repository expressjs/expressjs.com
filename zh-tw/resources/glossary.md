---
layout: page
title: Express 名詞解釋
description: A comprehensive glossary of terms related to Express.js, Node.js, middleware, routing, and other key concepts to help you understand and use Express effectively.
menu: resources
lang: zh-tw
redirect_from: /resources/glossary.html
---

# 名詞解釋

### 應用程式 (application)

In general, one or more programs that are designed to carry out operations for a specific purpose.  通常是指設計成實行作業以達特定目的的一或多個程式。就 Express 環境定義來說，是指使用 Express API（在 Node.js 平台上執行）的程式。亦可稱為[應用程式物件 (app object)](/{{ page.lang }}/api.html#express)。  Might also refer to an [app object](/{{ page.lang }}/api.html#express).

### API

Application programming interface. Spell out the abbreviation when it is first used.

### Express

A fast, un-opinionated, minimalist web framework for Node.js applications. 快速、集思廣益、極簡的 Node.js 應用程式 Web 架構。一般而言，"Express" 比 "Express.js" 合適，不過，也能接受後者。

### libuv

多平台支援的程式庫，著重在非同步 I/O，主要開發供 Node.js 使用。

### middleware

A function that is invoked by the Express routing layer before the final request handler, and thus sits in the middle between a raw request and the final intended route. A few fine points of terminology around middleware:

- `var foo = require('middleware')` 可稱為_需要_或_使用_ Node.js 模組。接著，`var mw = foo()` 陳述式通常會傳回中介軟體。 Then the statement `var mw = foo()` typically returns the middleware.
- `app.use(mw)` 可稱為_將中介軟體新增至廣域處理程序堆疊_。
- `app.get('/foo', mw, function (req, res) { ... })` 可稱為_將中介軟體新增至 "GET /foo" 處理程序堆疊_。

### Node.js

A software platform that is used to build scalable network applications. Node.js uses JavaScript as its scripting language, and achieves high throughput via non-blocking I/O and a single-threaded event loop. See [nodejs.org](https://nodejs.org/en/). **Usage note**: Initially, "Node.js," thereafter "Node".

### 開放程式碼 (open-source, open source)

當作為形容詞時，會加連號；例如："This is open-source software." 請參閱[維基百科上的開放程式碼軟體](http://en.wikipedia.org/wiki/Open-source_software)。附註：雖然此術語通常不會加連號，我們仍採用標準的英文規則，加上連號來代表複合形容詞。

{% include admonitions/note.html content="Although it is common not to hyphenate this term, we are using the standard English rules for hyphenating a compound adjective." %}

### 要求 (request)

An HTTP request. A client submits an HTTP request message to a server, which returns a response.  一種 HTTP 要求。用戶端提交 HTTP 要求訊息給伺服器，再由伺服器傳回回應。要求必須使用其中一種[要求方法](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods)，例如 GET、POST 等。

### 回應 (response)

一種 HTTP 回應。伺服器傳回 HTTP 回應訊息給用戶端。回應包含要求的相關完成狀態資訊，也可能將要求內容包含在其訊息內文中。 A server returns an HTTP response message to the client. The response contains completion status information about the request and might also contain requested content in its message body.

### 路由 (route)

Part of a URL that identifies a resource. URL 的一部分，用來識別資源。例如，在 `http://foo.com/products/id` 中，"/products/id" 就是路由。

### 路由器 (router)

請參閱 API 參照中的[路由器](/{{ page.lang }}/4x/api.html#router)。
