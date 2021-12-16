---
layout: page
title: Отладка Express
menu: guide
lang: ru
---

# Отладка Express

В Express используется внутренний модуль [debug](https://www.npmjs.com/package/debug) для
регистрации информации о сопоставлениях маршрутов, используемых функциях промежуточной обработки, режиме приложения и выполнении цикла "запрос-ответ".

<div class="doc-box doc-info" markdown="1">
`debug` можно сравнить с расширенной версией `console.log`, но, в отличие от `console.log`, в рабочем коде не нужно добавлять символы комментария к протоколам `debug`. Ведение протокола по умолчанию выключено, но его можно условно активировать с помощью среды переменной `DEBUG`.
</div>

Для просмотра всех внутренних протоколов, используемых в Express, при запуске приложения задайте для переменной среды `DEBUG` значение `express:*`.

```console
$ DEBUG=express:* node index.js
```

В Windows используется соответствующая команда.

```console
> set DEBUG=express:* & node index.js
```

При запуске этой команды в стандартном приложении, созданном с помощью  [генератора приложений Express](/{{ page.lang }}/starter/generator.html), будет получен следующий вывод:

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

При последующем запросе, адресованном приложению, вы увидите протоколы, заданные в коде Express:

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

Для просмотра протоколов только из реализации маршрутизатора, задайте для переменной `DEBUG` значение `express:router`. Аналгичным образом, для просмотра протоколов только из реализации приложения, задайте для переменной `DEBUG` значение `express:application` и т.д.

## Приложения, генерируемые с помощью команды `express`

Приложение, генерируемое с помощью команды `express`, также использует модуль `debug`, и область действия пространства имен отладки определяется именем приложения.

Например, если приложение сгенерировано с помощью команды `$ express sample-app`, операторы отладки (операторы debug) можно активировать с помощью следующей команды:

```console
$ DEBUG=sample-app:* node ./bin/www
```

Можно указать несколько пространств имен для отладки, путем ввода списка имен через запятую:

```console
$ DEBUG=http,mail,express:* node index.js
```

Дополнительная информация о модуле `debug` приведена на странице [debug](https://www.npmjs.com/package/debug).
