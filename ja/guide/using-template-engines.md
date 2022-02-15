---
layout: page
title: Express でのテンプレート・エンジンの使用
menu: guide
lang: ja
---

# Express でのテンプレート・エンジンの使用

_テンプレートエンジン_ を使用すると、アプリケーションで静的なテンプレートファイルを使用できます。実行時に、テンプレートエンジンはテンプレートファイルの変数を実際の値に置き換え、テンプレートをクライアントに送信するHTMLファイルに変換します。このアプローチにより、HTMLページの設計が容易になります。

Expressで動作する一般的なテンプレートエンジンには、[Pug](https://pugjs.org/api/getting-started.html)、[Mustache](https://www.npmjs.com/package/mustache)、[EJS](https://www.npmjs.com/package/ejs)があります。[Expressアプリケーションジェネレータ](/{{ page.lang }}/starter/generator.html)は[Jade](https://www.npmjs.com/package/jade)をデフォルトとして使用しますが、いくつかの他のものもサポートしています。

Expressで使用できるテンプレートエンジンのリストについては、[テンプレートエンジン (Express wiki)](https://github.com/expressjs/express/wiki#template-engines)を参照してください。また、[JavaScript テンプレートエンジンの比較: Jade, Mustache, Dust など](https://strongloop.com/strongblog/compare-javascript-templates-jade-mustache-dust/)も参照してください。

<div class="doc-box doc-notice" markdown="1">

**注**：Jadeは[Pug](https://www.npmjs.com/package/pug)に改名されました。あなたはアプリで引き続きJadeを使うことができ、うまく動くでしょう。しかしながら、テンプレートエンジンを最新のバージョンにアップデートしたい場合は、アプリでJadeをPugに置き換える必要があります。

</div>

テンプレートファイルをレンダリングするには、次の[アプリケーション設定プロパティ](/{{ page.lang }}/4x/api.html#app.set)を設定し、ジェネレータで作成されたデフォルトアプリの`app.js`にセットします。

* `views`はテンプレートファイルが置かれているディレクトリ。例：`app.set('views', './views')`。これは、デフォルトではアプリケーションのルートディレクトリ内の`views`ディレクトリになります
* `view engine`は使用するテンプレートエンジン。たとえば、Pugテンプレートエンジンを使用するには、`app.set('view engine', 'pug')`を使用します

次に、対応するテンプレートエンジンnpmパッケージをインストールします。たとえばPugをインストールするには：

```console
$ npm install pug --save
```

<div class="doc-box doc-notice" markdown="1">

Pug などの Express 対応テンプレート・エンジンは、`__express(filePath, options, callback)` という関数をエクスポートします。この関数は、テンプレート・コードをレンダリングするために `res.render()` 関数によって呼び出されます。
一部のテンプレート・エンジンは、この規則に従いません。[Consolidate.js](https://www.npmjs.org/package/consolidate) ライブラリーは、すべての一般的な Node.js テンプレート・エンジンをマップすることで、この規則に従います。そのため、Express 内でシームレスに動作します。

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

次に、`index.pug` ファイルをレンダリングするためのルートを作成します。`view engine` プロパティーが設定されていない場合は、`view` ファイルの拡張子を指定する必要があります。そうでない場合は、省略できます。

```js
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})
```

ホーム・ページに要求すると、`index.pug` ファイルは HTML としてレンダリングされます。

注：view engine のキャッシュは、テンプレートの出力内容をキャッシュしません。基本となるテンプレート自体だけです。このビューは、キャッシュがオンの場合でも、すべてのリクエストで再レンダリングされます。

Express でのテンプレート・エンジンの動作について詳しくは、[Express 用のテンプレート・エンジンの開発](/{{ page.lang }}/advanced/developing-template-engines.html)を参照してください。
