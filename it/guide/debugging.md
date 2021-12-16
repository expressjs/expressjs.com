---
layout: page
title: Debug di Express
menu: guide
lang: it
---

# Debug di Express

Express utilizza il modulo [debug](https://www.npmjs.com/package/debug)
internamente per registrare le informazioni sulle corrispondenze route, le funzioni middleware in uso, la modalità dell'applicazione
e il flusso del ciclo richiesta/risposta.

<div class="doc-box doc-info" markdown="1">
`debug` corrisponde a una versione estesa di `console.log`, ma diversamente da `console.log`, non è necessario
creare commenti per i log `debug` nel codice di produzione. Il processo di registrazione è disattivato per impostazione predefinita e può essere attivato utilizzando la variabile di ambiente `DEBUG`.
</div>

Per visualizzare tutti i log interni utilizzati in Express, impostare la variabile di ambiente `DEBUG` su
`express:*` quando si avvia l'applicazione.

```console
$ DEBUG=express:* node index.js
```

Su Windows, utilizzare il comando corrispondente.

```console
> set DEBUG=express:* & node index.js
```

L'esecuzione di questo comando sull'applicazione predefinita generata da [Programma di creazione express](/{{ page.lang }}/starter/generator.html) consentirà di stampare il seguente output:

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

Quando successivamente viene effettuata una richiesta all'applicazione, verranno visualizzati i log specificati nel codice Express:

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

Per visualizzare i log solo dall'implementazione router impostare il valore `DEBUG` su `express:router`. In modo simile, per visualizzare i log solo dall'implementazione dell'applicazione impostare il valore `DEBUG` su `express:application` e così via.

## Applicazioni generate da `express`

Un'applicazione generata dal comando `express` utilizza inoltre il modulo `debug` e il relativo spazio dei nomi di debug viene associato al nome dell'applicazione.

Ad esempio, se l'applicazione è stata generata con `$ express sample-app`, è possibile abilitare le istruzioni di debug con il seguente comando:

```console
$ DEBUG=sample-app:* node ./bin/www
```

È possibile specificare più di uno spazio dei nomi di debug assegnando un elenco di nomi separati da virgola:

```console
$ DEBUG=http,mail,express:* node index.js
```

Per ulteriori informazioni su `debug`, consultare [debug](https://www.npmjs.com/package/debug).
