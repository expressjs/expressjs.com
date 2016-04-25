---
layout: page
title: Express でのテンプレート・エンジンの使用
menu: guide
lang: ja
---

# Express でのテンプレート・エンジンの使用

Express でテンプレート・ファイルをレンダリングするには、その前に以下のアプリケーション設定を設定する必要があります。

* `views`。テンプレート・ファイルが配置されるディレクトリー。例: `app.set('views', './views')`
* `view engine`。使用するテンプレート・エンジン。例: `app.set('view engine', 'jade')`

次に、対応するテンプレート・エンジンの npm パッケージをインストールします。

```sh
$ npm install jade --save
```

<div class="doc-box doc-notice" markdown="1">
Jade などの Express 対応テンプレート・エンジンは、`__express(filePath, options, callback)` という関数をエクスポートします。この関数は、テンプレート・コードをレンダリングするために `res.render()` 関数によって呼び出されます。
一部のテンプレート・エンジンは、この規則に従いません。[Consolidate.js](https://www.npmjs.org/package/consolidate) ライブラリーは、すべての一般的な Node.js テンプレート・エンジンをマップすることで、この規則に従います。そのため、Express 内でシームレスに動作します。
</div>

ビュー・エンジンが設定された後は、アプリケーションでエンジンを指定したり、テンプレート・エンジンをロードしたりする必要はありません。(上記の例に対応した) 下記のように、Express がモジュールを内部的にロードします。

```js
app.set('view engine', 'jade');
```

以下の内容で `index.jade` という Jade テンプレート・ファイルを `views` ディレクトリーに作成します。

```js
html
  head
    title!= title
  body
    h1!= message
```

次に、`index.jade` ファイルをレンダリングするためのルートを作成します。`view engine` プロパティーが設定されていない場合は、`view` ファイルの拡張子を指定する必要があります。そうでない場合は、省略できます。

```js
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});
```

ホーム・ページに要求すると、`index.jade` ファイルは HTML としてレンダリングされます。

Express でのテンプレート・エンジンの動作について詳しくは、[Express 用のテンプレート・エンジンの開発](/{{ page.lang }}/advanced/developing-template-engines.html)を参照してください。
