---
layout: page
title: 在 Express 中使用模板引擎
menu: guide
lang: zh-tw
description: Discover how to integrate and use template engines like Pug, Handlebars,
  and EJS with Express.js to render dynamic HTML pages efficiently.
---

# 在 Express 中使用模板引擎

模板引擎讓您能在應用程式中使用靜態模板檔案。在執行時，模板引擎會將靜態模板檔案中的變數取代為真實的值，並將模板轉換為 HTML 檔案發送至客戶端，這種方法使得設計一個 HTML 頁面變得更加容易。

部分主流的模板引擎 [Pug](https://pugjs.org/api/getting-started.html)、[Mustache](https://www.npmjs.com/package/mustache) 和 [EJS](https://www.npmjs.com/package/ejs) 均可被使用於 Express 中。[Express 應用程式產生器](http://expressjs.com/en/starter/generator.html)預設採用 [Jade](https://www.npmjs.com/package/jade)，但也支援包含上述的多種模板引擎。

您可以參閱 [Express Wiki](https://github.com/expressjs/express/wiki#template-engines) 以得知在 Express 中可使用的模板引擎，亦可參閱這篇文章
：[Comparing JavaScript Templating Engines: Jade, Mustache, Dust and More](https://web.archive.org/web/20240000000000/https://strongloop.com/strongblog/compare-javascript-templates-jade-mustache-dust/)。

<div class="doc-box doc-notice" markdown="1">
**注意**：Jade 已改名為 [Pug](https://www.npmjs.com/package/pug)。您仍可繼續於應用程式中使用 Jade，它仍能良好運作。然而，若您想取得其最新的版本，則必須在應用程式中將其取代為 Pug。
</div>

若要渲染模板檔案，您必須在應用程式產生器產生的 `app.js` 設定以下[應用程式屬性](http://expressjs.com/en/4x/api.html#app.set)：

- `views`：範本檔所在的目錄。例如：`app.set('views', './views')`，其預設為應用程式根目錄的 `views` 資料夾。
- `view engine`：要使用的範本引擎，例如若要使用 Pug 模板引擎：`app.set('view engine', 'pug')`

並安裝對應的模板引擎 npm 套件，例如安裝 Pug：

```bash
$ npm install pug --save
```

<div class="doc-box doc-notice" markdown="1">
與 Express 相容的範本引擎（例如 Pug）會匯出一個名稱是 `__express(filePath, options, callback)` 的函數，以供 `res.render()` 函數呼叫，來呈現範本程式碼。

有些範本引擎不遵循這項慣例。[Consolidate.js](https://www.npmjs.org/package/consolidate) 程式庫遵循這項慣例，它會對映所有常見的 Node.js 範本引擎，因此能在 Express 內平順無礙地運作。

</div>

在設定模板引擎之後，您不必指定引擎或將範本引擎模組載入到應用程式中；Express 會在內部載入模組，如以下所示（針對上述範例）。

```js
app.set('view engine', 'pug')
```

在 `views` 目錄中，建立一個名稱是 `index.pug` 並內含下列內容的 Pug 範本檔：

```pug
html
  head
    title= title
  body
    h1= message
```

建立路由以呈現 `index.pug` 檔。如果未設定 `view engine` 內容，您必須指定 `view` 檔的副檔名，否則可以省略此步驟。

```js
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})
```

當您向首頁發出請求時，`index.pug` 檔會以 HTML 被渲染出來。

注意：模板引擎緩存不會快取住模板輸出的內容，只會快取模板本身。即使開啟快取，視圖仍會隨著每個請求重新被渲染。

如需進一步瞭解範本引擎在 Express 中的運作方式，請參閱：[開發 Express 範本引擎](/{{ page.lang }}/advanced/developing-template-engines.html)。
