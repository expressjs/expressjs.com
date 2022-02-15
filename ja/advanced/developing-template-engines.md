---
layout: page
title: Express 用のテンプレート・エンジンの開発
menu: advanced
lang: ja
---

# Express 用のテンプレート・エンジンの開発

独自のテンプレート・エンジンを作成するには、`app.engine(ext, callback)` メソッドを使用します。`ext` はファイル拡張子を表し、`callback` はテンプレート・エンジン関数です。この関数は、ファイルのロケーション、options オブジェクト、およびコールバック関数の項目をパラメーターとして受け入れます。

次のコードは、`.ntl` ファイルをレンダリングするための極めて単純なテンプレート・エンジンを実装する例です。

```js
const fs = require('fs') // this engine requires the fs module
app.engine('ntl', (filePath, options, callback) => { // define the template engine
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err)
    // this is an extremely simple template engine
    const rendered = content.toString().replace('#title#', `<title>${options.title}</title>`)
      .replace('#message#', `<h1>${options.message}</h1>`)
    return callback(null, rendered)
  })
})
app.set('views', './views') // specify the views directory
app.set('view engine', 'ntl') // register the template engine
```

これで、アプリケーションは `.ntl` ファイルをレンダリングできるようになります。以下のコンテンツで `index.ntl` というファイルを `views` ディレクトリーに作成します。

```text
#title#
#message#
```
次に、アプリケーションで次のルートを作成します。

```js
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})
```
ホーム・ページに要求すると、`index.ntl` ファイルは HTML としてレンダリングされます。
