---
layout: page
title: 在 Express 中提供靜態檔案
menu: starter
lang: zh-tw
---

# 在 Express 中提供靜態檔案

如果要提供影像、CSS 檔案和 JavaScript 檔案等之類的靜態檔案，請使用 Express 中的 `express.static` 內建中介軟體函數。

將含有靜態資產的目錄名稱傳遞給 `express.static` 中介軟體函數，就能直接開始提供檔案。舉例來說，使用下列程式碼在名稱是 `public` 的目錄中，提供影像、CSS 檔案和 JavaScript 檔案：

<pre>
<code class="language-javascript" translate="no">
app.use(express.static('public'));
</code>
</pre>

現在，您可以載入位於 `public` 目錄中的檔案：

<pre>
<code class="language-javascript" translate="no">
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
</code>
</pre>

<div class="doc-box doc-info">
Express 會查閱靜態目錄的相對檔案，因此靜態目錄的名稱不是 URL 的一部分。
</div>

如果要使用多個靜態資產目錄，請呼叫 `express.static` 中介軟體函數多次：

<pre>
<code class="language-javascript" translate="no">
app.use(express.static('public'));
app.use(express.static('files'));
</code>
</pre>

Express 在查閱檔案時，會依照您使用 `express.static` 中介軟體函數來設定靜態目錄的順序。

如果要為 `express.static` 函數所提供的檔案，建立虛擬路徑字首（其中的路徑事實上不存在於檔案系統中），請為靜態目錄[指定裝載路徑](/{{ page.lang }}/4x/api.html#app.use)，如下所示：

<pre>
<code class="language-javascript" translate="no">
app.use('/static', express.static('public'));
</code>
</pre>

現在，您可以透過 `/static` 路徑字首，來載入 `public` 目錄中的檔案。

<pre>
<code class="language-javascript" translate="no">
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
</code>
</pre>

不過，您提供給 `express.static` 函數的路徑，是相對於您從中啟動 `node` 程序的目錄。如果您是從另一個目錄執行 Express 應用程式，保險作法是使用您想提供之目錄的絕對路徑：

<pre>
<code class="language-javascript" translate="no">
app.use('/static', express.static(__dirname + '/public'));
</code>
</pre>
