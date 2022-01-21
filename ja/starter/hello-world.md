---
layout: page
title: Express の「Hello World」の例
menu: starter
lang: ja
---

# Hello World の例

<div class="doc-box doc-info" markdown="1">
ここで紹介するのは基本的に、作成できる最も単純な Express アプリケーションです。このアプリケーションは単一ファイル・アプリケーションであり、[Express ジェネレーター](/{{ page.lang }}/starter/generator.html) を使用して得られるものでは *ありません* 。このジェネレーターは、さまざまな目的で多数の JavaScript ファイル、Jade テンプレート、サブディレクトリーを使用する完全なアプリケーション用のスキャフォールディングを作成します。
</div>

最初に、`myapp` という名前のディレクトリーを作成して、そのディレクトリーに移動し、`npm init` を実行します。次に、[インストール・ガイド](/{{ page.lang }}/starter/installing.html)に従い、依存関係として `express` をインストールします。

`myapp` ディレクトリーで、`app.js` というファイルを作成して、以下のコードを追加します。

<pre>
<code class="language-javascript" translate="no">
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
</code>
</pre>

アプリケーションは、サーバーを始動して、ポート 3000 で接続を listen します。アプリケーションは、ルート URL (`/`) または*ルート* に対する要求に「Hello World!」と応答します。その他すべてのパスについては、「**404 Not Found**」と応答します。

<div class="doc-box doc-notice" markdown="1">
`req` (要求) と `res` (応答) は、Node が提供するのとまったく同じオブジェクトであるため、Express が関与しない場合と同じように、`req.pipe()`、`req.on('data', callback)` などを呼び出すことができます。
</div>

次のコマンドを使用してアプリケーションを実行します。

```console
$ node app.js
```

次に、ブラウザーに [http://localhost:3000/](http://localhost:3000/) をロードして、出力を確認します。

