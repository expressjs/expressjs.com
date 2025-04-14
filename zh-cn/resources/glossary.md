---
layout: page
title: Express 词汇表
description: A comprehensive glossary of terms related to Express.js, Node.js, middleware, routing, and other key concepts to help you understand and use Express effectively.
menu: resources
lang: en
redirect_from: /resources/glossary.html
---

# 词汇表

### 应用程序 (application)

In general, one or more programs that are designed to carry out operations for a specific purpose.  一般而言，表示设计为针对特定目的执行操作的一个或多个程序。在 Express 的上下文中，表示使用 Node.js 平台上运行的 Express API 的一个程序。可能还指[应用程序对象](/{{ page.lang }}/api.html#express)。  Might also refer to an [app object](/{{ page.lang }}/api.html#express).

### API

应用程序编程接口。在首次使用时包含此缩写。 Spell out the abbreviation when it is first used.

### Express

Node.js 应用程序的一种高度包容、快速而极简的 Web 框架。一般而言，“Express”优先于“Express.js”，但是后者也可接受。 In general, "Express" is preferred to "Express.js," though the latter is acceptable.

### libuv

一种多平台支持库，关注异步 I/O，主要供 Node.js 使用。

### 中间件 (middleware)

在最终请求处理程序之前由 Express 路由层调用的函数，因此位于原始请求与最终期望的路由之间的中间位置。有关中间件的术语有几点说明： A few fine points of terminology around middleware:

- 调用 `var foo = require('middleware')`：_需要_或_使用_ Node.js 模块。随后 `var mw = foo()` 语句通常返回中间件。 Then the statement `var mw = foo()` typically returns the middleware.
- 调用 `app.use(mw)`：_将中间件添加到全局处理堆栈_。
- 调用 `app.get('/foo', mw, function (req, res) { ... })`：_将中间件添加到“GET /foo”处理堆栈_。

### Node.js

A software platform that is used to build scalable network applications. 用于构建可扩展网络应用程序的一种软件平台。Node.js 将 JavaScript 用作其脚本编制语言，并通过非阻塞 I/O 和单线程事件循环实现大吞吐量。请参阅 [nodejs.org](http://nodejs.org/)。**使用说明**：最初为“Node.js”，后来成为“Node”。 See [nodejs.org](https://nodejs.org/en/). **Usage note**: Initially, "Node.js," thereafter "Node".

### 开放源码 (open-source, open source)

英文中用作形容词时，以连字符连接；例如：“This is open-source software”。请参阅 [Wikipedia 上的开源软件](http://en.wikipedia.org/wiki/Open-source_software)。注：虽然不对此术语添加连字符也很常见，但是我们使用标准英语规则对复合形容词添加连字符。 See [Open-source software on Wikipedia](http://en.wikipedia.org/wiki/Open-source_software).

{% include admonitions/note.html content="Although it is common not to hyphenate this term, we are using the standard English rules for hyphenating a compound adjective." %}

### 请求 (request)

An HTTP request. HTTP 响应。服务器将 HTTP 响应消息返回给客户机。此响应包含关于请求的完整状态信息，可能还在消息体中包含请求的内容。  HTTP 请求。客户机向服务器提交 HTTP 请求消息，然后服务器返回响应。该请求必须使用若干[请求方法](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods)之一，例如 GET、POST 等。

### 响应 (response)

An HTTP response. A server returns an HTTP response message to the client. The response contains completion status information about the request and might also contain requested content in its message body.

### 路由 (route)

Part of a URL that identifies a resource. 标识资源的部分 URL。例如，在 `http://foo.com/products/id` 中，“/products/id”是路由。

### 路由器 (router)

请参阅“API 参考”中的[路由器](/{{ page.lang }}/4x/api.html#router)。
