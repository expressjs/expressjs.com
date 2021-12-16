---
layout: page
title: 将模板引擎用于 Express
menu: guide
lang: zh-cn
---

# 将模板引擎用于 Express

在 Express 可以呈现模板文件之前，必须设置以下应用程序设置：

* `views`：模板文件所在目录。例如：`app.set('views', './views')`
* `view engine`：要使用的模板引擎。例如：`app.set('view engine', 'pug')`

然后安装对应的模板引擎 npm 包：

```console
$ npm install pug --save
```

<div class="doc-box doc-notice" markdown="1">
与 Express 兼容的模板引擎（例如 Pug）导出名为 `__express(filePath, options, callback)` 的函数，该函数由 `res.render()` 函数调用以呈现模板代码。
某些模板引擎并不遵循此约定。[Consolidate.js](https://www.npmjs.org/package/consolidate) 库通过映射所有流行的 Node.js 模板引擎来遵循此约定，因此可以在 Express 内无缝工作。
</div>

在设置视图引擎之后，不必指定该引擎或者在应用程序中装入模板引擎模块；Express 在内部装入此模块，如下所示（针对以上示例）。

<pre>
<code class="language-javascript" translate="no">
app.set('view engine', 'pug');
</code>
</pre>

在 `views` 目录中创建名为 `index.pug` 的 Pug 模板文件，其中包含以下内容：

<pre>
<code class="language-javascript" translate="no">
html
  head
    title= title
  body
    h1= message
</code>
</pre>

随后创建路由以呈现 `index.pug` 文件。如果未设置 `view engine` 属性，必须指定 `view` 文件的扩展名。否则，可以将其忽略。

<pre>
<code class="language-javascript" translate="no">
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});
</code>
</pre>

向主页发出请求时，`index.pug` 文件将呈现为 HTML。


要了解有关模板引擎在 Express 中如何工作的更多信息，请参阅：[“为 Express 开发模板引擎”](/{{ page.lang }}/advanced/developing-template-engines.html)。
