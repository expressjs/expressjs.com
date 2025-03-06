---
layout: page
title: Debug di Express
menu: guide
lang: it
description: Learn how to enable and use debugging logs in Express.js applications
  by setting the DEBUG environment variable for enhanced troubleshooting.
---

# Debug di Express

Per visualizzare tutti i log interni utilizzati in Express, impostare la variabile di ambiente `DEBUG` su
`express:*` quando si avvia l'applicazione.

```bash
$ DEBUG=express:* node index.js
```

Su Windows, utilizzare il comando corrispondente.

```bash
> set DEBUG=express:* & node index.js
```

L'esecuzione di questo comando sull'applicazione predefinita generata da [Programma di creazione express](/{{ page.lang }}/starter/generator.html) consentirà di stampare il seguente output:

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

Quando successivamente viene effettuata una richiesta all'applicazione, verranno visualizzati i log specificati nel codice Express:

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

Per visualizzare i log solo dall'implementazione router impostare il valore `DEBUG` su `express:router`. In modo simile, per visualizzare i log solo dall'implementazione dell'applicazione impostare il valore `DEBUG` su `express:application` e così via.

## Applicazioni generate da `express`

Un'applicazione generata dal comando `express` utilizza inoltre il modulo `debug` e il relativo spazio dei nomi di debug viene associato al nome dell'applicazione.

Ad esempio, se l'applicazione è stata generata con `$ express sample-app`, è possibile abilitare le istruzioni di debug con il seguente comando:

```bash
$ DEBUG=sample-app:* node ./bin/www
```

È possibile specificare più di uno spazio dei nomi di debug assegnando un elenco di nomi separati da virgola:

```bash
$ DEBUG=http,mail,express:* node index.js
```
