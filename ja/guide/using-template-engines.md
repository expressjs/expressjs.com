---
layout: page
title: Express でのテンプレート・エンジンの使用
description: Discover how to integrate and use template engines like Pug, Handlebars, and EJS with Express.js to render dynamic HTML pages efficiently.
menu: guide
lang: ja
redirect_from: /guide/using-template-engines.html
---

# Express でのテンプレート・エンジンの使用

A _template engine_ enables you to use static template files in your application. _テンプレートエンジン_ を使用すると、アプリケーションで静的なテンプレートファイルを使用できます。実行時に、テンプレートエンジンはテンプレートファイルの変数を実際の値に置き換え、テンプレートをクライアントに送信するHTMLファイルに変換します。このアプローチにより、HTMLページの設計が容易になります。
This approach makes it easier to design an HTML page.

Expressで動作する一般的なテンプレートエンジンには、[Pug](https://pugjs.org/api/getting-started.html)、[Mustache](https://www.npmjs.com/package/mustache)、[EJS](https://www.npmjs.com/package/ejs)があります。[Expressアプリケーションジェネレータ](/{{ page.lang }}/starter/generator.html)は[Jade](https://www.npmjs.com/package/jade)をデフォルトとして使用しますが、いくつかの他のものもサポートしています。

テンプレートファイルをレンダリングするには、次の[アプリケーション設定プロパティ](/{{ page.lang }}/4x/api.html#app.set)を設定し、ジェネレータで作成されたデフォルトアプリの`app.js`にセットします。

- `views`, the directory where the template files are located. `views`はテンプレートファイルが置かれているディレクトリ。例：`app.set('views', './views')`。これは、デフォルトではアプリケーションのルートディレクトリ内の`views`ディレクトリになります
  This defaults to the `views` directory in the application root directory.
- `view engine`, the template engine to use. `view engine`は使用するテンプレートエンジン。たとえば、Pugテンプレートエンジンを使用するには、`app.set('view engine', 'pug')`を使用します

次に、対応するテンプレートエンジンnpmパッケージをインストールします。たとえばPugをインストールするには：

```bash
$ npm install pug --save
```

<div class="doc-box doc-notice" markdown="1">Pug などの Express 対応テンプレート・エンジンは、`__express(filePath, options, callback)` という関数をエクスポートします。この関数は、テンプレート・コードをレンダリングするために `res.render()` 関数によって呼び出されます。
一部のテンプレート・エンジンは、この規則に従いません。[Consolidate.js](https://www.npmjs.org/package/consolidate) ライブラリーは、すべての一般的な Node.js テンプレート・エンジンをマップすることで、この規則に従います。そのため、Express 内でシームレスに動作します。

Some template engines do not follow this convention. The [@ladjs/consolidate](https://www.npmjs.com/package/@ladjs/consolidate)
library follows this convention by mapping all of the popular Node.js template engines, and therefore works seamlessly within Express.

</div>

ビュー・エンジンが設定された後は、アプリケーションでエンジンを指定したり、テンプレート・エンジンをロードしたりする必要はありません。(上記の例に対応した) 下記のように、Express がモジュールを内部的にロードします。

```js
app.set('view engine', 'pug')
```

以下の内容で `index.pug` という Pug テンプレート・ファイルを `views` ディレクトリーに作成します。

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

ホーム・ページに要求すると、`index.pug` ファイルは HTML としてレンダリングされます。

注：view engine のキャッシュは、テンプレートの出力内容をキャッシュしません。基本となるテンプレート自体だけです。このビューは、キャッシュがオンの場合でも、すべてのリクエストで再レンダリングされます。 The view is still re-rendered with every request even when the cache is on.
