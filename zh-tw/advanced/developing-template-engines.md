---
layout: page
title: 開發 Express 範本引擎
menu: advanced
lang: zh-tw
---

# 開發 Express 範本引擎

利用 `app.engine(ext, callback)` 方法，來建立您自己的範本引擎。`ext` 是指副檔名，`callback` 是範本引擎函數，它可接受下列項目作為參數：檔案的位置、options 物件，以及回呼函數。

下列程式碼範例說明如何實作一個相當簡單的範本引擎，以呈現 `.ntl` 檔。

<pre>
<code class="language-javascript" translate="no">
var fs = require('fs'); // this engine requires the fs module
app.engine('ntl', function (filePath, options, callback) { // define the template engine
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(new Error(err));
    // this is an extremely simple template engine
    var rendered = content.toString().replace('#title#', '<title>'+ options.title +'</title>')
    .replace('#message#', '<h1>'+ options.message +'</h1>');
    return callback(null, rendered);
  });
});
app.set('views', './views'); // specify the views directory
app.set('view engine', 'ntl'); // register the template engine
</code>
</pre>

現在，您的應用程式能夠呈現 `.ntl` 檔。請在 `views` 目錄中建立一個名稱是 `index.ntl` 的檔案，內含下列內容。

<pre>
<code class="language-javascript" translate="no">
#title#
#message#
</code>
</pre>
然後在應用程式中建立下列路由。

<pre>
<code class="language-javascript" translate="no">
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});
</code>
</pre>
當您向首頁提出要求時，`index.ntl` 會呈現成 HTML。
