---
layout: page
title: Debuggovanie Express
menu: guide
lang: sk
---
<!---
 Copyright (c) 2016 StrongLoop, IBM, and Express Contributors
 License: MIT
-->

# Debuggovanie Express

Express interne používa k logovaniu informácií ohľadom route matchingu, použitých middleware funkciách, aplikačného módu a toku request response cyklu modul [debug](https://www.npmjs.com/package/debug).

<div class="doc-box doc-info" markdown="1">
`debug` je ako rozšírena verzia `console.log`, ale narozdiel od `console.log`, nemusíte zakomentovávať volania `debug` v produkčnom kóde. Logovanie je vypnuté defaultne a je možné ho zapnúť použitím `DEBUG` environment premennej.
</div>

Ak chcete vidieť všetky interné logy Express-u, nastavte pri spúštaní vašej aplikácie environment premennú `DEBUG` na hodnotu
`express:*`.

```console
$ DEBUG=express:* node index.js
```

Na Windows-e použite nasledujúci príkaz.

```console
> set DEBUG=express:* & node index.js
```

Spustením tohto príkazu v prípade defaultnej aplikácie vygenerovanej pomocou [express generátora](/{{ page.lang }}/starter/generator.html) vypíše nasledujúci výstup:

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

Následne, keď aplikácia odchytí request, uvidíte nasledujúce logy špecifikované v Express kóde:

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

Ak chcete vidieť iba logy z router implementácie, nastavte hodnotu premennej `DEBUG` na `express:router`. Podobne, ak chcete vidieť iba logy z implementácie aplikácie, nastavte hodnotu premennej `DEBUG` na `express:application` atď.

## Aplikácie vygenerované príkazom `express`

Aplikácia vygenerovaná príkazom `express` taktiež používa modul `debug` a jej debug namespace je dostupný pod názvom aplikácie.

Pomocou nasledujúceho príkazu, dokážete povoliť debug výpisy pre aplikáciu vygenerovanú pomocou `$ express sample-app` takto:

```console
$ DEBUG=sample-app:* node ./bin/www
```

Pomocou čiarkou oddeleného zoznamu názvov môžete špecifikovať viac ako jeden debug namespace:

```console
$ DEBUG=http,mail,express:* node index.js
```

Pre viac informácií ohľadom `debug` modulu si pozrite [debug](https://www.npmjs.com/package/debug).
