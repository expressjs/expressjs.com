---
layout: page
title: 對 Express 除錯
menu: guide
lang: zh-tw
---

# 對 Express 除錯

Express 在內部使用 [debug](https://www.npmjs.com/package/debug) 模組，來記載路由相符項、使用中的中介軟體函數、應用程式模式，以及要求/回應循環流程等相關資訊。

<div class="doc-box doc-info" markdown="1">
`debug` 像是 `console.log` 的擴增版本，但與 `console.log` 不同的是，您不必在正式作業程式碼中註銷 `debug` 日誌。依預設，會關閉記載，並且可以使用 `DEBUG` 環境變數有條件地開啟。
</div>

如果要查看 Express 中使用的所有內部日誌，在您啟動應用程式時，請將 `DEBUG` 環境變數設為 `express:*`。

```console
$ DEBUG=express:* node index.js
```

在 Windows 中，使用對應指令。

```console
> set DEBUG=express:* & node index.js
```

對 [express generator](/{{ page.lang }}/starter/generator.html) 產生的預設應用程式執行這個指令，會列印下列輸出：

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

當對應用程式發出要求時，您會看到 Express 程式碼中指定的日誌：

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

如果只想查看來自路由器實作的日誌，請將 `DEBUG` 的值設為 `express:router`。同樣地，如果只想查看來自應用程式實作的日誌，請將 `DEBUG` 的值設為 `express:application`，以此類推。

## `express` 產生的應用程式

`express` 指令產生的應用程式也會使用 `debug` 模組，且其除錯名稱空間的範圍限於應用程式的名稱。

舉例來說，如果您使用 `$ express sample-app` 來產生應用程式，您可以利用下列指令來啟用除錯陳述式：

```console
$ DEBUG=sample-app:* node ./bin/www
```

您可以指派以逗點區隔的名稱清單，來指定多個除錯名稱空間：

```console
$ DEBUG=http,mail,express:* node index.js
```

如需 `debug` 的相關資訊，請參閱 [debug](https://www.npmjs.com/package/debug)。
