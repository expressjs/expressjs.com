---
layout: page
title: 在 Express 中使用模板引擎
description: Discover how to integrate and use template engines like Pug, Handlebars, and EJS with Express.js to render dynamic HTML pages efficiently.
menu: guide
lang: zh-tw
redirect_from: /guide/using-template-engines.html
---

# 在 Express 中使用模板引擎

A _template engine_ enables you to use static template files in your application. 模板引擎讓您能在應用程式中使用靜態模板檔案。在執行時，模板引擎會將靜態模板檔案中的變數取代為真實的值，並將模板轉換為 HTML 檔案發送至客戶端，這種方法使得設計一個 HTML 頁面變得更加容易。
This approach makes it easier to design an HTML page.

部分主流的模板引擎 [Pug](https://pugjs.org/api/getting-started.html)、[Mustache](https://www.npmjs.com/package/mustache) 和 [EJS](https://www.npmjs.com/package/ejs) 均可被使用於 Express 中。[Express 應用程式產生器](http://expressjs.com/en/starter/generator.html)預設採用 [Jade](https://www.npmjs.com/package/jade)，但也支援包含上述的多種模板引擎。

若要渲染模板檔案，您必須在應用程式產生器產生的 `app.js` 設定以下[應用程式屬性](http://expressjs.com/en/4x/api.html#app.set)：

- `views`, the directory where the template files are located. `views`：範本檔所在的目錄。例如：`app.set('views', './views')`，其預設為應用程式根目錄的 `views` 資料夾。
  This defaults to the `views` directory in the application root directory.
- `view engine`, the template engine to use. `view engine`：要使用的範本引擎，例如若要使用 Pug 模板引擎：`app.set('view engine', 'pug')`

並安裝對應的模板引擎 npm 套件，例如安裝 Pug：

```bash
$ npm install pug --save
```

<div class="doc-box doc-notice" markdown="1">
與 Express 相容的範本引擎（例如 Pug）會匯出一個名稱是 `__express(filePath, options, callback)` 的函數，以供 `res.render()` 函數呼叫，來呈現範本程式碼。

Some template engines do not follow this convention. 有些範本引擎不遵循這項慣例。[Consolidate.js](https://www.npmjs.org/package/consolidate) 程式庫遵循這項慣例，它會對映所有常見的 Node.js 範本引擎，因此能在 Express 內平順無礙地運作。

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

Create a route to render the `index.pug` file. If the `view engine` property is not set,
you must specify the extension of the `view` file. Otherwise, you can omit it.

```js
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})
```

當您向首頁發出請求時，`index.pug` 檔會以 HTML 被渲染出來。

The view engine cache does not cache the contents of the template's output, only the underlying template itself. The view is still re-rendered with every request even when the cache is on.
