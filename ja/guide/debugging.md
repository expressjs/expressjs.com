---
layout: page
title: Express のデバッグ
description: Learn how to enable and use debugging logs in Express.js applications by setting the DEBUG environment variable for enhanced troubleshooting.
menu: guide
order: 7
redirect_from: "  "
---

# Express のデバッグ

Express で使用されているすべての内部ログを表示するには、アプリケーションの起動時に `DEBUG` 環境変数を `express:*` に設定します。

```bash
$ DEBUG=express:* node index.js
```

Windows では、対応するコマンドを使用します。

```bash
> $env:DEBUG = "express:*"; node index.js
```

[express ジェネレーター](/{{ page.lang }}/starter/generator.html) で生成されるデフォルトのアプリケーションでこのコマンドを実行すると、以下の出力が表示されます。

```bash
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
  express:router use / &amp;lt;anonymous&amp;gt; +0ms
  express:router:layer new / +0ms
  express:router use / &amp;lt;anonymous&amp;gt; +0ms
  express:router:layer new / +0ms
  express:router use / &amp;lt;anonymous&amp;gt; +0ms
  express:router:layer new / +0ms
```

その後、アプリケーションに対して要求が出されると、Express コードで指定された次のログが表示されます。

```bash
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

ルーター実装からのログのみを表示するには、`DEBUG` の値を `express:router` に設定します。同様に、アプリケーション実装からのログのみを表示するには、`DEBUG` を `express:application` に設定します。その他についても同様に設定します。 Likewise, to see logs only from the application implementation, set the value of `DEBUG` to `express:application`, and so on.

## `express` によって生成されるアプリケーション

`express` コマンドによって生成されるアプリケーションも `debug` モジュールを使用します。そのデバッグ名前空間はアプリケーションの名前に設定されます。

例えば、`$ express sample-app` を使用してアプリケーションを生成する場合、次のコマンドを使用してデバッグ・ステートメントを有効にすることができます。

```bash
$ DEBUG=sample-app:* node ./bin/www
```

名前のコンマ区切りリストを割り当てることで、複数のデバッグ名前空間を指定できます。

```bash
$ DEBUG=http,mail,express:* node index.js
```

## Advanced options

When running through Node.js, you can set a few environment variables that will change the behavior of the debug logging:

| Name                | Purpose                                                           |
| ------------------- | ----------------------------------------------------------------- |
| `DEBUG`             | Enables/disables specific debugging namespaces.   |
| `DEBUG_COLORS`      | Whether or not to use colors in the debug output. |
| `DEBUG_DEPTH`       | Object inspection depth.                          |
| `DEBUG_FD`          | File descriptor to write debug output to.         |
| `DEBUG_SHOW_HIDDEN` | Shows hidden properties on inspected objects.     |

{% capture debug-text %}

The environment variables beginning with `DEBUG_` end up being
converted into an Options object that gets used with `%o`/`%O` formatters.
See the Node.js documentation for
[`util.inspect()`](https://nodejs.org/api/util.html#util_util_inspect_object_options)
for the complete list.

{% endcapture %}

{% include admonitions/note.html content=debug-text %}
