---
title: Express 用テンプレートエンジンの開発
description: App.engine() を使用して Express.js 用のカスタムテンプレートエンジンを開発する方法と、独自のテンプレートレンダリングロジックの作成と統合の例をご覧ください。
---

`app.engine(ext, callback)`メソッドを使用して、独自のテンプレートエンジンを作成します。 `ext`はファイル拡張子を指し、`callback`はテンプレートエンジン関数です。 は、次の項目をパラメータとして受け付けます。ファイルの場所、options オブジェクト、およびコールバック関数です。

以下のコードは、`.ntl`ファイルをレンダリングするための非常に単純なテンプレートエンジンを実装した例です。

```js
const fs = require('fs'); // this engine requires the fs module
app.engine('ntl', (filePath, options, callback) => {
  // define the template engine
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err);
    // this is an extremely simple template engine
    const rendered = content
      .toString()
      .replace('#title#', `<title>${options.title}</title>`)
      .replace('#message#', `<h1>${options.message}</h1>`);
    return callback(null, rendered);
  });
});
app.set('views', './views'); // specify the views directory
app.set('view engine', 'ntl'); // register the template engine
```

アプリは `.ntl` ファイルをレンダリングできるようになります。 `views`ディレクトリに`index.ntl`という名前のファイルを作成します。

```pug
#title#
#message#
```

次に、アプリに次のルートを作成します。

```js
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' });
});
```

ホームページへのリクエストを行うと、`index.ntl`はHTMLとしてレンダリングされます。
