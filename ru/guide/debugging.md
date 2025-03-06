---
layout: page
title: Отладка Express
menu: guide
lang: ru
description: Learn how to enable and use debugging logs in Express.js applications
  by setting the DEBUG environment variable for enhanced troubleshooting.
---

# Отладка Express

Для просмотра всех внутренних протоколов, используемых в Express, при запуске приложения задайте для переменной среды `DEBUG` значение `express:*`.

```bash
$ DEBUG=express:* node index.js
```

В Windows используется соответствующая команда.

```bash
> set DEBUG=express:* & node index.js
```

При запуске этой команды в стандартном приложении, созданном с помощью  [генератора приложений Express](/{{ page.lang }}/starter/generator.html), будет получен следующий вывод:

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
  express:router use / &lt;anonymous&gt; +0ms
  express:router:layer new / +0ms
  express:router use / &lt;anonymous&gt; +0ms
  express:router:layer new / +0ms
  express:router use / &lt;anonymous&gt; +0ms
  express:router:layer new / +0ms
```

При последующем запросе, адресованном приложению, вы увидите протоколы, заданные в коде Express:

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

Для просмотра протоколов только из реализации маршрутизатора, задайте для переменной `DEBUG` значение `express:router`. Аналгичным образом, для просмотра протоколов только из реализации приложения, задайте для переменной `DEBUG` значение `express:application` и т.д.

## Приложения, генерируемые с помощью команды `express`

Приложение, генерируемое с помощью команды `express`, также использует модуль `debug`, и область действия пространства имен отладки определяется именем приложения.

Например, если приложение сгенерировано с помощью команды `$ express sample-app`, операторы отладки (операторы debug) можно активировать с помощью следующей команды:

```bash
$ DEBUG=sample-app:* node ./bin/www
```

Можно указать несколько пространств имен для отладки, путем ввода списка имен через запятую:

```bash
$ DEBUG=http,mail,express:* node index.js
```
