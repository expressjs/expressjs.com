---
layout: page
title: 迁移到 Express 5
menu: guide
lang: zh-cn
---

# 迁移到 Express 5

<h2 id="overview">概述</h2>

Express 5.0 仍然处于 α 测试发布阶段，但我们可以在这里先睹为快，了解一下这个发行版中的变化以及如何将 Express 4 应用程序迁移到 Express 5。

Express 5 与 Express 4 的差异不是很大：对 API 的更改不像 3.0 到 4.0 升级那样大刀阔斧。虽然基本 API 保持相同，但仍有一些重大更改；换言之，如果将现有 Express 4 程序更新为使用 Express 5，那么该程序可能无法工作。

要安装最新的 α 测试版以预览 Express 5，请在应用程序根目录中输入以下命令：

```console
$ npm install express@5.0.0-alpha.2 --save
```

随后，可以运行自动化测试以查看哪些地方发生故障，然后根据以下列出的更新修复问题。在解决测试故障问题之后，运行应用程序以查看发生哪些错误。如果应用程序使用任何不受支持的方法或属性，您马上就可以发现。

<h2 id="changes">Express 5 中的更改</h2>

以下是将影响 Express 用户的更改的列表（截至在 α R2）。
请参阅 [pull request](https://github.com/expressjs/express/pull/2237) 以查看所有计划功能的列表。

**已移除的方法和属性**

<ul class="doclist">
  <li><a href="#app.del">app.del()</a></li>
  <li><a href="#app.param">app.param(fn)</a></li>
  <li><a href="#plural">复数的方法名称</a></li>
  <li><a href="#leading">app.param(name, fn) 的 name 自变量中的前置冒号</a></li>
  <li><a href="#req.param">req.param(name)</a></li>
  <li><a href="#res.json">res.json(obj, status)</a></li>
  <li><a href="#res.jsonp">res.jsonp(obj, status)</a></li>
  <li><a href="#res.send.body">res.send(body, status)</a></li>
  <li><a href="#res.send.status">res.send(status)</a></li>
  <li><a href="#res.sendfile">res.sendfile()</a></li>
</ul>

**已更改**

<ul class="doclist">
  <li><a href="#app.router">app.router</a></li>
  <li><a href="#req.host">req.host</a></li>
  <li><a href="#req.query">req.query</a></li>
</ul>

**改进**

<ul class="doclist">
  <li><a href="#res.render">res.render()</a></li>
</ul>

<h3>已移除的方法和属性</h3>

如果在应用程序中使用任何已删除的方法或属性，应用程序将崩溃。所以，需要在更新到 V5 之后更改应用程序。

<h4 id="app.del">app.del()</h4>

Express 5 不再支持 `app.del()` 函数。如果使用此函数，将抛出错误。要注册 HTTP DELETE 路由，请使用 `app.delete()` 函数。

最初之所以使用 `del` 而不是 `delete`，是因为 `delete` 是 JavaScript 中的保留关键字。但在 ECMAScript 6 时，`delete` 和其他保留关键字可以合法地用作属性名称。您可以在此阅读该讨论，这导致我们在此不推荐使用 `app.del` 函数。

<h4 id="app.param">app.param(fn)</h4>

`app.param(fn)` 特征符用于修改 `app.param(name, fn)` 函数的行为。自 V4.11.0 起不推荐使用该特征符，而 Express 5 完全不再提供支持。

<h4 id="plural">复数的方法名称</h4>

以下方法名称已加复数。在 Express 4 中，使用旧方法时会出现不推荐使用的警告。Express 5 则完全不再支持：

`req.acceptsCharset()` 由 `req.acceptsCharsets()` 取代。

`req.acceptsEncoding()` 由 `req.acceptsEncodings()` 取代。

`req.acceptsLanguage()` 由 `req.acceptsLanguages()` 取代。

<h4 id="leading">app.param(name, fn) 的名称中的前置冒号 (:)</h4>

`app.param(name, fn)` 函数名称中的前置冒号字符 (:) 是 Express 3 的遗留问题，为了向后兼容性，Express 4 提供支持但会显示不推荐使用的提醒。而 Express 5 则静默忽略它，使用不带前置冒号的名称参数。

如果您遵循 [app.param](/{{ page.lang }}/4x/api.html#app.param) 的 Express 4 文档进行开发，那么不会影响代码，因为文档中没有提及前置冒号。

<h4 id="req.param">req.param(name)</h4>

已移除用于检索表单数据的方法，因为这可能引起混淆，而且很危险。现在，您需要在 `req.params`、`req.body` 或 `req.query` 对象中专门寻找提交的参数名称。

<h4 id="res.json">res.json(obj, status)</h4>

Express 5 不再支持特征符 `res.json(obj, status)`。而是设置状态，然后将其链接到 `res.json()` 方法，如下所示：`res.status(status).json(obj)`。

<h4 id="res.jsonp">res.jsonp(obj, status)</h4>

Express 5 不再支持特征符 `res.jsonp(obj, status)`。而是设置状态，然后将其链接到 `res.jsonp()` 方法，如下所示：`res.status(status).jsonp(obj)`。

<h4 id="res.send.body">res.send(body, status)</h4>

Express 5 不再支持特征符 `res.send(obj, status)`。而是设置状态，然后将其链接到 `res.send()` 方法，如下所示：`res.status(status).send(obj)`。

<h4 id="res.send.status">res.send(status)</h4>

Express 5 不再支持特征符 <code>res.send(<em>status</em>)</code>，其中 *`status`* 是数字。而是使用 `res.sendStatus(statusCode)` 函数，它会设置 HTTP 响应头状态码并发送该代码的文字版：“Not Found”、“Internal Server Error”等。
如果需要使用 `res.send()` 函数来发送数字，请对该数字加上引号以将其转换为字符串，以便 Express 不会将其解释为尝试使用不受支持的旧特征符。

<h4 id="res.sendfile">res.sendfile()</h4>

在 Express 5 中，`res.sendfile()` 函数已由驼峰式大小写版本 `res.sendFile()` 替换。

<h3>已更改</h3>

<h4 id="app.router">app.router</h4>

在 Express 4 中已移除的 `app.router` 对象在 Express 5 中已恢复。在新版本中，此对象只是对 Express 基本路由器的引用，不像在 Express 3 中应用程序必须显式将该路由器装入。

<h4 id="req.host">req.host</h4>

在 Express 4 中，如果存在端口号，`req.host` 函数会错误地将其剥离。在 Express 5 中，则会保留端口号。

<h4 id="req.query">req.query</h4>

在 Express 4.7 以及 Express 5 之后，如果您希望使用自己的查询字符串解析逻辑函数，查询解析器选项可以接受 `false` 以禁用查询字符串解析。

<h3>改进</h3>

<h4 id="res.render">res.render()</h4>

现在，此方法为所有查看引擎强制执行异步行为，避免具有同步实现以及违反建议接口的查看引擎所导致的错误。
