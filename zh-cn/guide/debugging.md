---
layout: page
title: 调试 Express
description: Learn how to enable and use debugging logs in Express.js applications by setting the DEBUG environment variable for enhanced troubleshooting.
menu: guide
lang: zh-cn
redirect_from: "  "
---

# 调试 Express

要查看 Express 中使用的所有内部日志，在启动应用程序时，请将 `DEBUG` 环境变量设置为 `express:*`。

```bash
$ DEBUG=express:* node index.js
```

在 Windows 上，使用对应的命令。

```bash
> $env:DEBUG = "express:*"; node index.js
```

在 [Express 生成器](/{{ page.lang }}/starter/generator.html)所生成的缺省应用程序上运行此命令将显示以下输出：

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

向应用程序发出请求时，可以看到 Express 代码中指定的日志：

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

要仅查看来自路由器实现的日志，请将 `DEBUG` 的值设置为 `express:router`。与此类似，要仅查看来自应用程序实现的日志，请将 `DEBUG` 的值设置为 `express:application`，以此类推。 Likewise, to see logs only from the application implementation, set the value of `DEBUG` to `express:application`, and so on.

## `express` 生成的应用程序

`express` 命令生成的应用程序还使用 `debug` 模块，其调试名称空间范围限定为应用程序的名称。

例如，如果您以 `$ express sample-app` 生成应用程序，那么可以使用以下命令来启用调试语句：

```bash
$ DEBUG=sample-app:* node ./bin/www
```

可以通过分配逗号分隔的名称列表来指定多个调试名称空间：

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
