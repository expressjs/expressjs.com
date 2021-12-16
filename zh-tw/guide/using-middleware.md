---
layout: page
title: 使用 Express 中介軟體
menu: guide
lang: zh-tw
---

# 使用中介軟體

Express 是一個本身功能極簡的路由與中介軟體 Web 架構：本質上，Express 應用程式是一系列的中介軟體函數呼叫。

*中介軟體*函數是一些有權存取[要求物件](/{{ page.lang }}/4x/api.html#req) (`req`)、[回應物件](/{{ page.lang }}/4x/api.html#res) (`res`) 和應用程式要求/回應循環中之下一個中介軟體函數的函數。下一個中介軟體函數通常以名為 `next` 的變數表示。

中介軟體函數可以執行下列作業：

* 執行任何程式碼。
* 對要求和回應物件進行變更。
* 結束要求/回應循環。
* 呼叫堆疊中的下一個中介軟體函數。

如果現行中介軟體函數不會結束要求/回應循環，它必須呼叫 `next()`，以便將控制權傳遞給下一個中介軟體函數。否則，要求將會停擺。

Express 應用程式可以使用下列類型的中介軟體：

 - [應用程式層次的中介軟體](#middleware.application)
 - [路由器層次的中介軟體](#middleware.router)
 - [錯誤處理中介軟體](#middleware.error-handling)
 - [內建中介軟體](#middleware.built-in)
 - [協力廠商中介軟體](#middleware.third-party)

您可以使用選用的裝載路徑，來載入應用程式層次的中介軟體和路由器層次的中介軟體。您也可以一併載入一系列的中介軟體函數，如此會在裝載點建立一個中介軟體系統子堆疊。

<h2 id='middleware.application'>應用程式層次的中介軟體</h2>

使用 `app.use()` 和 `app.METHOD()` 函數，將應用程式層次的中介軟體連結至 [app object](/{{ page.lang }}/4x/api.html#app) 實例，其中 `METHOD` 是中介軟體函數要處理的 HTTP 要求方法（例如 GET、PUT 或 POST），並採小寫。

本例顯示沒有裝載路徑的中介軟體函數。每當應用程式收到要求時，就會執行此函數。

<pre>
<code class="language-javascript" translate="no">
var app = express();

app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});
</code>
</pre>

本例顯示裝載在 `/user/:id` 路徑的中介軟體函數。會對 `/user/:id` 路徑上任何類型的 HTTP 要求，執行此函數。

<pre>
<code class="language-javascript" translate="no">
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
</code>
</pre>

本例顯示路由和其處理程式函數（中介軟體系統）。此函數會處理指向 `/user/:id` 路徑的 GET 要求。

<pre>
<code class="language-javascript" translate="no">
app.get('/user/:id', function (req, res, next) {
  res.send('USER');
});
</code>
</pre>

下列範例顯示使用裝載路徑在裝載點載入一系列中介軟體函數。其中說明中介軟體子堆疊，這個子堆疊會針對指向 `/user/:id` 路徑之任何類型的 HTTP 要求，列印其要求資訊。

<pre>
<code class="language-javascript" translate="no">
app.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
</code>
</pre>

路由處理程式可讓您為一個路徑定義多個路由。下列範例為指向 `/user/:id` 路徑的 GET 要求，定義兩個路由。第二個路由不會造成任何問題，卻絕不會呼叫，因為第一個路由會結束要求/回應循環。

本例顯示中介軟體子堆疊，它處理了指向 `/user/:id` 路徑的 GET 要求。

<pre>
<code class="language-javascript" translate="no">
app.get('/user/:id', function (req, res, next) {
  console.log('ID:', req.params.id);
  next();
}, function (req, res, next) {
  res.send('User Info');
});

// handler for the /user/:id path, which prints the user ID
app.get('/user/:id', function (req, res, next) {
  res.end(req.params.id);
});
</code>
</pre>

如果要跳過路由器中介軟體堆疊中其餘的中介軟體函數，請呼叫 `next('route')`，將控制權傳遞給下一個路由。**附註**：
`next('route')` 只適用於使用 `app.METHOD()` 或 `router.METHOD()` 函數載入的中介軟體函數。

本例顯示中介軟體子堆疊，它處理了指向 `/user/:id` 路徑的 GET 要求。

<pre>
<code class="language-javascript" translate="no">
app.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next route
  if (req.params.id == 0) next('route');
  // otherwise pass the control to the next middleware function in this stack
  else next(); //
}, function (req, res, next) {
  // render a regular page
  res.render('regular');
});

// handler for the /user/:id path, which renders a special page
app.get('/user/:id', function (req, res, next) {
  res.render('special');
});
</code>
</pre>

<h2 id='middleware.router'>路由器層次的中介軟體</h2>

路由器層次的中介軟體的運作方式如同應用程式層次的中介軟體，不同之處在於它會連結至 `express.Router()` 實例。

<pre>
<code class="language-javascript" translate="no">
var router = express.Router();
</code>
</pre>
請利用 `router.use()` 和 `router.METHOD()` 函數來載入路由器層次的中介軟體。

下列的程式碼範例是使用路由器層次的中介軟體，抄寫上述針對應用程式層次的中介軟體顯示的中介軟體系統：

<pre>
<code class="language-javascript" translate="no">
var app = express();
var router = express.Router();

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next router
  if (req.params.id == 0) next('route');
  // otherwise pass control to the next middleware function in this stack
  else next(); //
}, function (req, res, next) {
  // render a regular page
  res.render('regular');
});

// handler for the /user/:id path, which renders a special page
router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id);
  res.render('special');
});

// mount the router on the app
app.use('/', router);
</code>
</pre>

<h2 id='middleware.error-handling'>錯誤處理中介軟體</h2>

<div class="doc-box doc-notice" markdown="1">
錯誤處理中介軟體一律會使用*四個*引數。您必須提供這四個引數，將它識別為錯誤處理中介軟體函數。即使您不需要使用 `next` 物件也必須指定，以維護簽章。否則，會將 `next` 物件解譯為一般中介軟體，而無法處理錯誤。
</div>

錯誤處理中介軟體函數的定義方式，與其他中介軟體函數相同，差別在於引數是四個而非三個，具體來說，就是使用 `(err, req, res, next)`) 簽章：

<pre>
<code class="language-javascript" translate="no">
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
</code>
</pre>

如需錯誤處理中介軟體的詳細資料，請參閱：[錯誤處理](/{{ page.lang }}/guide/error-handling.html)。

<h2 id='middleware.built-in'>內建中介軟體</h2>

從 4.x 版起，Express 不再相依於 [Connect](https://github.com/senchalabs/connect)。除了 `express.static`，Express 先前隨附的所有中介軟體函數現在位於個別的模組中。請檢視[中介軟體函數清單](https://github.com/senchalabs/connect#middleware)。

<h4 id='express.static'>express.static(root, [options])</h4>

Express 唯一的內建中介軟體函數是 `express.static`。此函數以 [serve-static](https://github.com/expressjs/serve-static) 為基礎，負責在 Express 應用程式中提供靜態資產。

`root` 引數指定提供靜態資產的根目錄。

`options` 選用物件可具有下列內容：

| 內容      | 說明                                                           |   類型      | 預設值         |
|---------------|-----------------------------------------------------------------------|-------------|-----------------|
| `dotfiles`    | 用來提供點檔案的選項。可能的值是 "allow"、"deny" 和 "ignore" | 字串 | "ignore" |
| `etag`        | 啟用或停用 etag 的產生  | 布林 | `true` |
| `extensions`  | 設定副檔名遞補。 | 陣列 | `[]` |
| `index`       | 傳送目錄索引檔。設定 `false`，會停用目錄檢索。 | 混合 | "index.html" |
 `lastModified` | 將 `Last-Modified` 標頭設為作業系統上檔案的前次修改日期。可能的值是 `true` 或 `false`。 | 布林 | `true` |
| `maxAge`      | 設定 Cache-Control 標頭的 max-age 內容，以毫秒為單位或 [ms 格式](https://www.npmjs.org/package/ms)的字串 | 數字 | 0 |
| `redirect`    | 當路徑名稱是目錄時，重新導向至尾端 "/"。 | 布林 | `true` |
| `setHeaders`  | 用來設定 HTTP 標頭以提供檔案的函數。 | 函數 |  |

下列範例顯示如何使用 `express.static` 中介軟體函數，且其中詳細闡述了 options 物件：

<pre>
<code class="language-javascript" translate="no">
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
}

app.use(express.static('public', options));
</code>
</pre>

每一個應用程式可有多個靜態目錄：

<pre>
<code class="language-javascript" translate="no">
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.static('files'));
</code>
</pre>

如需 `serve-static` 函數和其選項的詳細資料，請參閱 [serve-static](https://github.com/expressjs/serve-static) 說明文件。

<h2 id='middleware.third-party'>協力廠商中介軟體</h2>

使用協力廠商中介軟體，在 Express 應用程式中新增功能。

針對必要的功能安裝 Node.js 模組，然後在應用程式層次或路由器層次將它載入到您的應用程式中。

下列範例說明如何安裝和載入用來剖析 Cookie 的中介軟體函數 `cookie-parser`。

```console
$ npm install cookie-parser
```

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

// load the cookie-parsing middleware
app.use(cookieParser());
</code>
</pre>

如需 Express 中常用的部分協力廠商中介軟體函數清單，請參閱：[協力廠商中介軟體](../resources/middleware.html)。
