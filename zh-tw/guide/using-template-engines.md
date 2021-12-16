---
layout: page
title: 對 Express 除錯
menu: guide
lang: zh-tw
---

# 在 Express 中使用範本引擎

您必須先設定下列應用程式設定，Express 才能呈現範本檔：

* `views`：範本檔所在的目錄。例如：`app.set('views', './views')`
* `view engine`：要使用的範本引擎。例如：`app.set('view engine', 'pug')`

然後安裝對應的範本引擎 npm 套件：

```console
$ npm install pug --save
```

<div class="doc-box doc-notice" markdown="1">
與 Express 相容的範本引擎（例如 Pug）會匯出一個名稱是 `__express(filePath, options, callback)` 的函數，以供 `res.render()` 函數呼叫，來呈現範本程式碼。

有些範本引擎不遵循這項慣例。[Consolidate.js](https://www.npmjs.org/package/consolidate) 程式庫遵循這項慣例，它會對映所有常見的 Node.js 範本引擎，因此能在 Express 內平順無礙地運作。
</div>

設定視圖引擎之後，您不必指定引擎或將範本引擎模組載入到應用程式中；Express 會在內部載入模組，如以下所示（針對上述範例）。

<pre>
<code class="language-javascript" translate="no">
app.set('view engine', 'pug');
</code>
</pre>

在 `views` 目錄中，建立一個名稱是 `index.pug` 的 Pug 範本檔，內含下列內容：

<pre>
<code class="language-javascript" translate="no">
html
  head
    title= title
  body
    h1= message
</code>
</pre>

然後建立路由，以呈現 `index.pug` 檔。如果未設定 `view engine` 內容，您必須指定 `view` 檔的副檔名。否則，您可以省略它。

<pre>
<code class="language-javascript" translate="no">
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});
</code>
</pre>

當您向首頁提出要求時，`index.pug` 檔會呈現成 HTML。

如需進一步瞭解範本引擎在 Express 中的運作方式，請參閱：[開發 Express 範本引擎](/{{ page.lang }}/advanced/developing-template-engines.html)。
