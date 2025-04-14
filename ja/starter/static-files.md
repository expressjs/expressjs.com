---
layout: page
title: Express での静的ファイルの提供
description: Understand how to serve static files like images, CSS, and JavaScript in Express.js applications using the built-in 'static' middleware.
menu: starter
lang: ja
redirect_from: /starter/static-files.html
---

# Express での静的ファイルの提供

イメージ、CSS ファイル、JavaScript ファイルなどの静的ファイルを提供するには、Express に標準実装されている `express.static` ミドルウェア関数を使用します。

The function signature is:

```js
express.static(root, [options])
```

The `root` argument specifies the root directory from which to serve static assets.
For more information on the `options` argument, see [express.static](/{{page.lang}}/4x/api.html#express.static).

For example, use the following code to serve images, CSS files, and JavaScript files in a directory named `public`:

```js
app.use(express.static('public'))
```

これで、`public` ディレクトリーに入っているファイルをロードできます。

```text
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
```

<div class="doc-box doc-info">
Express は、静的ディレクトリーから相対的なファイルを検索するため、静的ディレクトリーの名前は URL の一部ではありません。
</div>

複数の静的アセットディレクトリーを使用するには、`express.static` ミドルウェア関数を複数回呼び出します。

```js
app.use(express.static('public'))
app.use(express.static('files'))
```

Express は、`express.static` ミドルウェア関数に静的ディレクトリーが設定された順序でファイルを検索します。

{% capture alert_content %}
For best results, [use a reverse proxy](/{{page.lang}}/advanced/best-practice-performance.html#use-a-reverse-proxy) cache to improve performance of serving static assets.
{% endcapture %}
{% include admonitions/note.html content=alert_content %}

`express.static` 関数によって提供されるファイルの仮想パスのプレフィックス (パスは実際にはファイル・システムに存在しません) を作成するには、次に示すように、静的ディレクトリーの[マウント・パスを指定](/{{ page.lang }}/4x/api.html#app.use)します。

```js
app.use('/static', express.static('public'))
```

これで、`public` ディレクトリー内のファイルを `/static` パス・プレフィックスからロードできます。

```text
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
```

ただし、`express.static` 関数に指定するパスは、`node` プロセスを起動するディレクトリーに対して相対的です。別のディレクトリーから Express アプリケーションを実行する場合は、提供するディレクトリーの絶対パスを使用する方が安全です。 If you run the express app from another directory, it's safer to use the absolute path of the directory that you want to serve:

```js
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))
```

For more details about the `serve-static` function and its options, see  [serve-static](/resources/middleware/serve-static.html).

### [Previous: Basic Routing ](/{{ page.lang }}/starter/basic-routing.html)&nbsp;&nbsp;&nbsp;&nbsp;[Next: More examples ](/{{ page.lang }}/starter/examples.html)
