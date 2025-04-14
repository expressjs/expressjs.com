---
layout: page
title: Express の「Hello World」の例
description: Get started with Express.js by building a simple 'Hello World' application, demonstrating the basic setup and server creation for beginners.
menu: starter
lang: ja
redirect_from: /starter/hello-world.html
---

# Hello World の例

<div class="doc-box doc-info" markdown="1">
Embedded below is essentially the simplest Express app you can create. It is a single file app &mdash; _not_ what you'd get if you use the [Express generator](/{{ page.lang }}/starter/generator.html), which creates the scaffolding for a full app with numerous JavaScript files, Jade templates, and sub-directories for various purposes.
</div>

```js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

This app starts a server and listens on port 3000 for connections. アプリケーションは、サーバーを始動して、ポート 3000 で接続を listen します。アプリケーションは、ルート URL (`/`) または_ルート_ に対する要求に「Hello World!」と応答します。その他すべてのパスについては、「**404 Not Found**」と応答します。 For every other path, it will respond with a **404 Not Found**.

### Running Locally

最初に、`myapp` という名前のディレクトリーを作成して、そのディレクトリーに移動し、`npm init` を実行します。次に、[インストール・ガイド](/{{ page.lang }}/starter/installing.html)に従い、依存関係として `express` をインストールします。 Then, install `express` as a dependency, as per the [installation guide](/{{ page.lang }}/starter/installing.html).

`myapp` ディレクトリーで、`app.js` というファイルを作成して、以下のコードを追加します。

<div class="doc-box doc-notice" markdown="1">
`req` (要求) と `res` (応答) は、Node が提供するのとまったく同じオブジェクトであるため、Express が関与しない場合と同じように、`req.pipe()`、`req.on('data', callback)` などを呼び出すことができます。
</div>

次のコマンドを使用してアプリケーションを実行します。

```bash
$ node app.js
```

次に、ブラウザーに [http://localhost:3000/](http://localhost:3000/) をロードして、出力を確認します。

### ここで紹介するのは基本的に、作成できる最も単純な Express アプリケーションです。このアプリケーションは単一ファイル・アプリケーションであり、[Express ジェネレーター](/{{ page.lang }}/starter/generator.html) を使用して得られるものでは _ありません_ 。このジェネレーターは、さまざまな目的で多数の JavaScript ファイル、Jade テンプレート、サブディレクトリーを使用する完全なアプリケーション用のスキャフォールディングを作成します。
