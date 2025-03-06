---
layout: page
title: Express hata ayıklama
menu: guide
lang: tr
redirect_from: /guide/debugging.html
description: Learn how to enable and use debugging logs in Express.js applications
  by setting the DEBUG environment variable for enhanced troubleshooting.
---
# Express hata ayıklama

Express uygulamasında kullanılan ütün dahili logları görmek için, uygulamanızı başlatırken `DEBUG` ortam değikenini `express:*` olarak güncelleyin.

```bash
$ DEBUG=express:* node index.js
```

Windows'ta aynı komutun karşılığını kullanın.

```bash
> set DEBUG=express:* & node index.js
```
[express generator](/{{ page.lang }}/starter/generator.html) kullanılarak yaratılan varsayılan uygulamada bu komutu koşmak aşağıdakileri yazdıracak:

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

Ve uygulamaya bir istek yapıldığında, Express kodunda belirtilen logları göreceksiniz:

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

Sadece yönlendirme implementasyonundan logları görmek için, `DEBUG` değişkenini `express:router` olarak ayarlayın. Aynı şekilde, sadece uygulama implementasyonundan logları görmek için `DEBUG` değişkenini `express:application` olarak ayarlayın, ve benzeri.

## `express` tarafından yaratılan uygulamalar

`express` komutu tarafından yaratılan bir uygulama da `debug` modülünü kullanır ve hata ayıklama isim alanı, uygulamanın isiminin kapsamı içine alınır.

Örneğin, `$ express sample-app` ile bir uygulama yarattığınızda, debug ifadelerini aşağıdaki komutla etkinleştirebilirsiniz:

```bash
$ DEBUG=sample-app:* node ./bin/www
```

Virgül ile ayrılmış bir isimler listesini atayarak birden fazla debug isim alanı belirtebilirsiniz:

```bash
$ DEBUG=http,mail,express:* node index.js
```

## Gelişmiş seçenekler

Node.js üzerinden koşulduğunda hata ayıklama loglamasının davranışını değiştirecek birkaç ortam değişkeni ayarlayabilirsiniz:

| İsim      | Amaç                                            |
|-----------|-------------------------------------------------|
| `DEBUG`   | Spesifik hata ayıklama isim alanlarını devre dışı bırakma veya etkinleştirme. |
| `DEBUG_COLORS`| Hata ayıklama çıktısında renk kullanıp kullanmama.|
| `DEBUG_DEPTH` | Nesne inceleme derinliği.|
| `DEBUG_FD`    | Hata ayıklama çıktısının yazılacağı dosya tanımlayıcı. |
| `DEBUG_SHOW_HIDDEN` | İncelenen nesnelerde gizli özellikleri gösterme. |

__Not:__ `DEBUG_` ile başlayan ortam değişkenleri, `%o`/`%O` biçemleyicileriyle kullanılmak üzere bir Seçenekler nesnesine dönüştürülür.
Tam listeyi görmek için Node.js'in [`util.inspect()`](https://nodejs.org/api/util.html#util_util_inspect_object_options) dökümantasyonuna bakınız.
