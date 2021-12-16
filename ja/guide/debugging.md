---
layout: page
title: Express のデバッグ
menu: guide
lang: ja
---

# Express のデバッグ

Express は、[debug](https://www.npmjs.com/package/debug) モジュールを内部的に使用して、ルートの一致、使用中のミドルウェア関数、アプリケーション・モード、および要求と応答のサイクルのフローに関する情報をログに記録します。

<div class="doc-box doc-info" markdown="1">
`debug` は、`console.log` の拡張版のようなものですが、`console.log` とは異なり、実動コードで `debug` ログをコメント化する必要はありません。ロギングはデフォルトでオフになっており、`DEBUG` 環境変数を使用して条件付きでオンにすることができます。
</div>

Express で使用されているすべての内部ログを表示するには、アプリケーションの起動時に `DEBUG` 環境変数を `express:*` に設定します。

```console
$ DEBUG=express:* node index.js
```

Windows では、対応するコマンドを使用します。

```console
> set DEBUG=express:* & node index.js
```

[express ジェネレーター](/{{ page.lang }}/starter/generator.html) で生成されるデフォルトのアプリケーションでこのコマンドを実行すると、以下の出力が表示されます。

```console
$ DEBUG=express:* node ./bin/www
  express:router:route new / +0ms
  express:router:layer new / +1ms
  express:router:route get / +1ms
  express:router:layer new / +0ms
  express:router:route new / +1ms
  express:router:layer new / +0ms
  express:router:route get / +0ms
  express:router:layer new / +0ms
  express:application compile etag weak +1ms
  express:application compile query parser extended +0ms
  express:application compile trust proxy false +0ms
  express:application booting in development mode +1ms
  express:router use / query +0ms
  express:router:layer new / +0ms
  express:router use / expressInit +0ms
  express:router:layer new / +0ms
  express:router use / favicon +1ms
  express:router:layer new / +0ms
  express:router use / logger +0ms
  express:router:layer new / +0ms
  express:router use / jsonParser +0ms
  express:router:layer new / +1ms
  express:router use / urlencodedParser +0ms
  express:router:layer new / +0ms
  express:router use / cookieParser +0ms
  express:router:layer new / +0ms
  express:router use / stylus +90ms
  express:router:layer new / +0ms
  express:router use / serveStatic +0ms
  express:router:layer new / +0ms
  express:router use / router +0ms
  express:router:layer new / +1ms
  express:router use /users router +0ms
  express:router:layer new /users +0ms
  express:router use / &lt;anonymous&gt; +0ms
  express:router:layer new / +0ms
  express:router use / &lt;anonymous&gt; +0ms
  express:router:layer new / +0ms
  express:router use / &lt;anonymous&gt; +0ms
  express:router:layer new / +0ms
```

その後、アプリケーションに対して要求が出されると、Express コードで指定された次のログが表示されます。

```console
  express:router dispatching GET / +4h
  express:router query  : / +2ms
  express:router expressInit  : / +0ms
  express:router favicon  : / +0ms
  express:router logger  : / +1ms
  express:router jsonParser  : / +0ms
  express:router urlencodedParser  : / +1ms
  express:router cookieParser  : / +0ms
  express:router stylus  : / +0ms
  express:router serveStatic  : / +2ms
  express:router router  : / +2ms
  express:router dispatching GET / +1ms
  express:view lookup "index.pug" +338ms
  express:view stat "/projects/example/views/index.pug" +0ms
  express:view render "/projects/example/views/index.pug" +1ms
```

ルーター実装からのログのみを表示するには、`DEBUG` の値を `express:router` に設定します。同様に、アプリケーション実装からのログのみを表示するには、`DEBUG` を `express:application` に設定します。その他についても同様に設定します。

## `express` によって生成されるアプリケーション

`express` コマンドによって生成されるアプリケーションも `debug` モジュールを使用します。そのデバッグ名前空間はアプリケーションの名前に設定されます。

例えば、`$ express sample-app` を使用してアプリケーションを生成する場合、次のコマンドを使用してデバッグ・ステートメントを有効にすることができます。

```console
$ DEBUG=sample-app:* node ./bin/www
```

名前のコンマ区切りリストを割り当てることで、複数のデバッグ名前空間を指定できます。

```console
$ DEBUG=http,mail,express:* node index.js
```

`debug` の詳細については、[debug](https://www.npmjs.com/package/debug) を参照してください。
