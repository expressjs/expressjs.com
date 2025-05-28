---
layout: page
title: Best Practice sulle prestazioni utilizzando Express in fase di produzione
description: Discover performance and reliability best practices for Express apps in production, covering code optimizations and environment setups for optimal performance.
menu: advanced
lang: it
redirect_from: "  "
---

# Best practice sulla produzione: prestazioni e affidabilità

In questo articolo vengono descritte le best practice sulle prestazioni e sull'affidabilità per le applicazioni Express implementate per la produzione.

Questo argomento entra nel mondo di "devops", coprendo sia le operazioni che lo sviluppo tradizionale. Di conseguenza, le informazioni sono divise in due parti:

- Things to do in your code (the dev part):
  - Utilizzare la compressione gzip
  - [Asynchronous Error Handling in Express with Promises, Generators and ES7](https://web.archive.org/web/20240000000000/https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/)
  - Gestire in modo appropriato le eccezioni
  - [Handle exceptions properly](#handle-exceptions-properly)
- [Operazioni da effettuare nell'ambiente / configurazione](#env) (la parte delle operazioni).
  - Impostare NODE_ENV su "produzione"
  - Al contrario, utilizzare il middleware [serve-static](https://www.npmjs.com/package/serve-static) (o qualcosa di equivalente), ottimizzato per servire i file per le applicazioni Express.
  - Eseguire l'applicazione in un cluster
  - <a name="try-catch"></a>
  - Utilizzare un servizio di bilanciamento del carico
  - Utilizzare un proxy inverso

## Things to do in your code {#in-code}

Di seguito sono elencate alcune operazioni che è possibile effettuare nel codice per migliorare le prestazioni dell'applicazione:

- Utilizzare la compressione gzip
- [Asynchronous Error Handling in Express with Promises, Generators and ES7](https://web.archive.org/web/20240000000000/https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/)
- Gestire in modo appropriato le eccezioni
- [Handle exceptions properly](#handle-exceptions-properly)

### Utilizzare la compressione gzip

La compressione gzip è in grado di ridurre notevolmente la dimensione del contenuto della risposta e di conseguenza aumentare la velocità di un'applicazione web. Utilizzare il middleware di [compressione](https://www.npmjs.com/package/compression) per la compressione gzip nell'applicazione Express. Ad esempio:

```js
const compression = require('compression')
const express = require('express')
const app = express()

app.use(compression())
```

Per un sito web ad elevato traffico nella produzione, il miglior modo per utilizzare la compressione è quello di implementarla ad un livello di proxy inverso (consultare [Utilizzare un proxy inverso](#proxy)). In questo caso, non è necessario utilizzare il middleware di compressione. Per dettagli su come abilitare la compressione gzip in Nginx, consultare [Modulo ngx_http_gzip_module](http://nginx.org/en/docs/http/ngx_http_gzip_module.html) nella documentazione Nginx.

### Non utilizzare funzioni sincrone

I metodi e le funzioni sincrone ostacolano il processo di esecuzione finché non restituiscono un risultato. Una chiamata singola a una funzione sincrona potrebbe restituire un risultato in pochi microsecondi o millisecondi, tuttavia in siti web ad elevato traffico, queste chiamate aggiungono e riducono le prestazioni di un'applicazione. Evitarne l'utilizzo in produzione.

Poiché Node e molti moduli forniscono versioni sicrone e asincrone delle relative funzioni, utilizzare sempre la versione asincrona nella produzione. L'unico caso in cui l'utilizzo di una funzione sincrona è giustificato, è allo startup iniziale.

You can use the `--trace-sync-io` command-line flag to print a warning and a stack trace whenever your application uses a synchronous API. Naturalmente, non si consiglia di utilizzarlo nella produzione, ma solo per assicurare che il codice sia pronto per la produzione. Consultare l'[aggiornamento settimanale per io.js 2.1.0](https://nodejs.org/en/blog/weekly-updates/weekly-update.2015-05-22/#2-1-0) per ulteriori informazioni.

### Effettuare correttamente la registrazione

Solitamente, esistono due motivi per effettuare la registrazione dall'applicazione: per il debug e la registrazione dell'attività dell'applicazione (sostanzialmente, qualsiasi altra cosa). L'utilizzo di `console.log()` o `console.err()` per stampare i messaggi di log sul terminale, è un'operazione comune nello sviluppo. But [these functions are synchronous](https://nodejs.org/api/console.html#console) when the destination is a terminal or a file, so they are not suitable for production, unless you pipe the output to another program.

#### Per il debug

Se si sta effettuando la registrazione per motivi di debug, allora invece di utilizzare `console.log()`, utilizzare un modulo di debug speciale quale [debug](https://www.npmjs.com/package/debug). Questo modulo consente di utilizzare la variabile di ambiente DEBUG per controllare quali messaggi di debug vengono inviati a `console.err()`, se presenti. Per fare in modo che l'applicazione resti strettamente asincrona, è necessario instradare `console.err()` a un altro programma. Però a questo punto, non andrai ad effettuare il debug in fase di produzione giusto?

#### Per l'attività dell'applicazione

If you're logging app activity (for example, tracking traffic or API calls), instead of using `console.log()`, use a logging library like [Pino](https://www.npmjs.com/package/pino), which is the fastest and most efficient option available.

### Handle exceptions properly

Le applicazioni Node danno origine a errori quando riscontrano eccezioni non rilevate. Se tali eccezioni non vengono gestite o se non si effettuano operazioni appropriate, l'applicazione Express si arresterà in modo anomalo. Seguendo i consigli descritti in [Riavvio automatico dell'applicazione](#restart), sarà possibile recuperare l'applicazione dopo un arresto anomalo. Fortunatamente, le applicazioni Express solitamente hanno tempi di avvio molto brevi. Tuttavia, per prima cosa è necessario evitare che si verifichino arresti anomali, e per effettuare ciò, è necessario gestire in modo appropriato le eccezioni.

Per essere sicuri di gestire al meglio tutte le eccezioni, utilizzare le seguenti tecniche:

- [Utilizzare try-catch](#try-catch)
- [Utilizzare promises](#promises)

Prima di leggere questi argomenti, è necessario avere una conoscenza base della gestione degli errori di Node/Express: utilizzo di error-first callback e diffusione degli errori al middleware. Node utilizza la convenzione "error-first callback" per restituire gli errori da funzioni asincrone, dove il primo parametro per la funzione callback è l'oggetto dell'errore, seguito dai dati nei parametri successivi. Per indicare un errore, indicare null come primo parametro. La funzione callback deve seguire in modo corrispondente la convenzione error-first callback per gestire l'errore in modo significativo. In Express, il miglior modo è quello di utilizzare la funzione next() per diffondere gli errori attraverso la catena middleware.

Per ulteriori informazioni sulle nozioni di base della gestione degli errori, consultare:

- [Gestione degli errori in Node.js](https://www.tritondatacenter.com/node-js/production/design/errors)

#### Utilizzare try-catch

Try-catch è un linguaggio JavaScript che è possibile utilizzare per rilevare eccezioni in codice sincrono. Ad esempio, utilizzare try-catch, per gestire errori di analisi JSON come mostrato di seguito.

Di seguito viene riportato un esempio di utilizzo di try-catch per la gestione di un'eccezione che dà origine a un arresto anomalo del processo.
Questa funzione middleware accetta un parametro del campo query denominato "params" che è un oggetto JSON.

```js
app.get('/search', (req, res) => {
  // Simulating async operation
  setImmediate(() => {
    const jsonStr = req.query.params
    try {
      const jsonObj = JSON.parse(jsonStr)
      res.send('Success')
    } catch (e) {
      res.status(400).send('Invalid JSON string')
    }
  })
})
```

Tuttavia, try-catch funziona solo per il codice sincrono. Poiché la piattaforma Node è principalmente asincrona (nello specifico in un ambiente di produzione), try-catch non sarà in grado di rilevare molte eccezioni.

#### Utilizzare promises

When an error is thrown in an `async` function or a rejected promise is awaited inside an `async` function, those errors will be passed to the error handler as if calling `next(err)`

```js
app.get('/', async (req, res, next) => {
  const data = await userData() // If this promise fails, it will automatically call `next(err)` to handle the error.

  res.send(data)
})

app.use((err, req, res, next) => {
  res.status(err.status ?? 500).send({ error: err.message })
})
```

Also, you can use asynchronous functions for your middleware, and the router will handle errors if the promise fails, for example:

```js
app.use(async (req, res, next) => {
  req.locals.user = await getUser(req)

  next() // This will be called if the promise does not throw an error.
})
```

Best practice is to handle errors as close to the site as possible. So while this is now handled in the router, it’s best to catch the error in the middleware and handle it without relying on separate error-handling middleware.

#### Cosa non fare

Una cosa da _non_ fare è quella di stare in ascolto per un evento `uncaughtException`, emesso quando un'eccezione si verifica ed è costante nel loop degli eventi. Se si aggiunge un programma di ascolto dell'evento per `uncaughtException` si cambierà il funzionamento predefinito del processo che sta riscontrando un'eccezione; il processo continuerà ad operare malgrado l'eccezione. Questo potrebbe risultare un ottimo modo per prevenire un arresto anomalo dell'applicazione, ma continuare ad utilizzare un'applicazione dopo che si è verificata un'eccezione non rilevata è pericoloso e non è consigliato, poiché lo stato del processo diventa non affidabile e non prevedibile.

Inoltre, l'utilizzo di `uncaughtException` è ufficialmente riconosciuto come [non conforme](https://nodejs.org/api/process.html#process_event_uncaughtexception) ed esiste una [proposta](https://github.com/nodejs/node-v0.x-archive/issues/2582) per la relativa rimozione dal core. Quindi continuare a visualizzare un evento `uncaughtException` non è un buon segno. Ecco perché consigliamo di usufruire di più processi e supervisori: l'arresto anomalo e il riavvio sono spesso il modo più affidabile per ripristinare una situazione dopo un errore.

Inoltre, non si consiglia di utilizzare l'opzione [domini](https://nodejs.org/api/domain.html). Solitamente non risolve il problema ed è considerato un modulo obsoleto.

## Things to do in your environment / setup

{#in-environment}

Di seguito sono elencate alcune operazioni che è possibile effettuare nell'ambiente del sistema per migliorare le prestazioni dell'applicazione:

- Impostare NODE_ENV su "produzione"
- Al contrario, utilizzare il middleware [serve-static](https://www.npmjs.com/package/serve-static) (o qualcosa di equivalente), ottimizzato per servire i file per le applicazioni Express.
- Eseguire l'applicazione in un cluster
- <a name="try-catch"></a>
- Utilizzare un servizio di bilanciamento del carico
- Utilizzare un proxy inverso

### Impostare NODE_ENV su "produzione"

La variabile di ambiente NODE_ENV indica l'ambiente in cui è in esecuzione un'applicazione (solitamente, sviluppo o applicazione). One of the simplest things you can do to improve performance is to set NODE_ENV to `production`.

L'impostazione di NODE_ENV su "produzione" consente ad Express di:

- Memorizzare in cache i template di visualizzazione.
- Memorizzare in cache i file CSS generati da stensioni CSS.
- Generare meno messaggi di errore ridondanti.

[Tests indicate](https://www.dynatrace.com/news/blog/the-drastic-effects-of-omitting-node-env-in-your-express-js-applications/) that just doing this can improve app performance by a factor of three!

Se si ha la necessità di scrivere codice specifico dell'ambiente, è possibile selezionare il valore di NODE_ENV con `process.env.NODE_ENV`. Notare che la selezione del valore di qualsiasi variabile di ambiente influisce sulle prestazioni in modo negativo, quindi questa operazione deve essere effettuata con moderazione.

Nello sviluppo, solitamente si impostano le variabili di ambiente nella shell interattiva, ad esempio utilizzando `export` o il file `.bash_profile`. But in general, you shouldn't do that on a production server; instead, use your OS's init system (systemd). La sezione successiva fornisce ulteriori dettagli sull'utilizzo in generale del sistema init, però anche impostare NODE_ENV è molto importante per le prestazioni (ed è facile da fare), evidenziato di seguito.

Con systemd, utilizzare la direttiva `Environment` nel file unit. Ad esempio:

```sh
# /etc/systemd/system/myservice.service
Environment=NODE_ENV=production
```

For more information, see [Using Environment Variables In systemd Units](https://www.flatcar.org/docs/latest/setup/systemd/environment-variables/).

### Verificare che l'applicazione sia in grado di riavviarsi automaticamente

In fase di produzione, l'applicazione non deve mai andare offline. Ciò significa che deve riavviarsi nel caso in cui sia l'applicazione che il server terminino in modo anomalo. Anche se ovviamente si spera che entrambe queste situazioni non si verifichino mai, realisticamente è necessario considerare l'eventualità di:

- Utilizzare un process manager per riavviare l'applicazione (e Node) quando termina in modo anomalo.
- Utilizzare il sistema init fornito dal sistema operativo per riavviare il process manager quando il sistema operativo termina in modo anomalo. È inoltre possibile utilizzare il sistema init senza un process manager.

Le applicazioni Node terminano in modo anomalo se riscontrano eccezioni non rilevate. La prima cosa da fare è verificare che l'applicazione sia stata verificata e che sia in grado di gestire tutte le eccezioni (consultare [Gestire in modo appropriato le eccezioni](#exceptions) per dettagli). Come prevenzione, attivare un meccanismo che assicuri che applicazione si riavvii automaticamente in caso di arresto anomalo.

#### Utilizzare un process manager

Nello sviluppo, l'applicazione è stata avviata semplicemente dalla riga comandi con `node server.js` o qualcosa di simile. Ma se si effettua questa stessa operazione in campo di produzione si andrà incontro a situazioni pericolose. Se l'applicazione termina in modo anomalo, sarà offline finché non viene riavviata. Per fare in modo che l'applicazione si riavvii nel caso in cui termini in modo anomalo, utilizzare un process manager. Un process manager è un "contenitore" per le applicazioni che facilita lo sviluppo, fornisce un'elevata disponibilità e consente di gestire l'applicazione al momento del runtime.

Oltre a fare in modo di riavviare l'applicazione in caso di arresto anomalo, un process manager consente di:

- Ottenere insight relativi alle prestazioni di runtime e al consumo delle risorse.
- Modificare le impostazioni in modo dinamico per migliorare le prestazioni.
- Control clustering (pm2).

Historically, it was popular to use a Node.js process manager like [PM2](https://github.com/Unitech/pm2). See their documentation if you wish to do this. However, we recommend using your init system for process management.

#### Utilizzare un sistema init

Il successivo livello di affidabilità è quello di assicurare che l'applicazione venga riavviata quando si riavvia il server. I sistemi possono ancora arrestarsi per moltissimi motivi. Per fare in modo che l'applicazione si riavvii nel caso in cui un server si arresti in modo anomalo, utilizzare il sistema init integrato al sistema operativo. The main init system in use today is [systemd](https://wiki.debian.org/systemd).

Esistono due modi per utilizzare i sistemi init con l'applicazione Express:

- Far eseguire l'applicazione in un process manager e installare il process manager come servizio con il sistema init. Il process manager riavvierà l'applicazione nel caso in cui termini in modo anomalo e il sistema init riavvierà il process manager quando si riavvia il sistema operativo. Questa è la procedura consigliata.
- Far eseguire l'applicazione (e Node) direttamente con il sistema init. Questa operazione risulta più semplice ma non si hanno gli stessi vantaggi dell'utilizzo di un process manager.

##### Systemd

Systemd è un sistema Linux e un service manager. Le più importanti distribuzioni Linux hanno utilizzato systemd come sistema init predefinito.

Un file di configurazione del servizio systemd è denominato _unit file_, con un nome file che termina con .service. Segue un unit file di esempio per gestire un'applicazione Node direttamente (sostituire il testo in grassetto con i valori appropriati per il proprio sistema e applicazione): Replace the values enclosed in `<angle brackets>` for your system and app:

```sh
[Unit]
Description=<Awesome Express App>

[Service]
Type=simple
ExecStart=/usr/local/bin/node </projects/myapp/index.js>
WorkingDirectory=</projects/myapp>

User=nobody
Group=nogroup

# Environment variables:
Environment=NODE_ENV=production

# Allow many incoming connections
LimitNOFILE=infinity

# Allow core dumps for debugging
LimitCORE=infinity

StandardInput=null
StandardOutput=syslog
StandardError=syslog
Restart=always

[Install]
WantedBy=multi-user.target
```

Per ulteriori informazioni su systemd, consultare [systemd reference (man page)](http://www.freedesktop.org/software/systemd/man/systemd.unit.html).

### Eseguire l'applicazione in un cluster

In un sistema multicore, è possibile aumentare le prestazioni di un'applicazione Node di molte volte avviando un cluster di processi. Un cluster esegue molte istanze di un'applicazione, nel caso ideale, un'istanza su ciascun core CPU, quindi, distribuendo il carico e le attività tra le istanze.

![Balancing between application instances using the cluster API](/images/clustering.png)

IMPORTANTE: poiché le istanze dell'applicazione vengono eseguite come processi separati, non condividono lo stesso spazio di memoria. Ossia, gli oggetti sono locali rispetto a ciascuna istanza dell'applicazione. Pertanto, non è possibile conservare lo stato nel codice dell'applicazione. Tuttavia, è possibile utilizzare un datastore in-memory, ad esempio [Redis](http://redis.io/) per memorizzare lo stato e i dati relativi alla sessione. Questa condizione si applica fondamentalmente a tutti i moduli di scaling orizzontale, se il processo di clustering viene effettuato con più processi o più server fisici.

Nelle applicazioni sottoposte a cluster, i processi di lavoro possono ternare in modo anomalo individualmente senza influenzare gli altri processi. Oltre ai vantaggi che si possono ottenere dalle prestazioni, l'isolamento dell'errore è un altro motivo che spinge a eseguire un cluster di processi di applicazioni. Quando un processo di lavoro termina in modo anomalo, ricordarsi sempre di registrare l'evento e di dare origine a un nuovo processo utilizzando cluster.fork().

#### Utilizzo del modulo cluster di Node

Clustering is made possible with Node's [cluster module](https://nodejs.org/api/cluster.html). Ciò consente a un processo principale di dare origine a processi di lavoro e di distribuire le connessioni in entrata tra i processi di lavoro.

#### Using PM2

If you deploy your application with PM2, then you can take advantage of clustering _without_ modifying your application code. You should ensure your [application is stateless](https://pm2.keymetrics.io/docs/usage/specifics/#stateless-apps) first, meaning no local data is stored in the process (such as sessions, websocket connections and the like).

When running an application with PM2, you can enable **cluster mode** to run it in a cluster with a number of instances of your choosing, such as the matching the number of available CPUs on the machine. You can manually change the number of processes in the cluster using the `pm2` command line tool without stopping the app.

To enable cluster mode, start your application like so:

```bash
# Start 4 worker processes
$ pm2 start npm --name my-app -i 4 -- start
# Auto-detect number of available CPUs and start that many worker processes
$ pm2 start npm --name my-app -i max -- start
```

This can also be configured within a PM2 process file (`ecosystem.config.js` or similar) by setting `exec_mode` to `cluster` and `instances` to the number of workers to start.

Once running, the application can be scaled like so:

```bash
# Add 3 more workers
$ pm2 scale my-app +3
# Scale to a specific number of workers
$ pm2 scale my-app 2
```

For more information on clustering with PM2, see [Cluster Mode](https://pm2.keymetrics.io/docs/usage/cluster-mode/) in the PM2 documentation.

### Memorizzare in cache i risultati della richiesta

Un'altra strategia per migliorare le prestazioni in fase di produzione è quella di memorizzare in cache i risultati delle richieste, in modo tale che l'applicazione non debba gestire nuovamente la stessa richiesta.

Use a caching server like [Varnish](https://www.varnish-cache.org/) or [Nginx](https://blog.nginx.org/blog/nginx-caching-guide) (see also [Nginx Caching](https://serversforhackers.com/nginx-caching/)) to greatly improve the speed and performance of your app.

### Utilizzare un servizio di bilanciamento del carico

A prescindere da quanto sia ottimizzata un'applicazione, una singola istanza è in grado di gestire solo una quantità limitata di carico e traffico. Un modo per scalare un'applicazione è quello di eseguire più delle proprie istanze e distribuire il traffico tramite un servizio di bilanciamento del carico. L'impostazione di un servizio di bilanciamento del carico può migliorare la velocità e le prestazioni dell'applicazione e abilitarla a scalare di più di quanto sia possibile fare con una singola istanza.

Un servizio di bilanciamento del carico è solitamente un proxy inverso che gestisce il traffico a e d più istanze di applicazione e server. You can easily set up a load balancer for your app by using [Nginx](https://nginx.org/en/docs/http/load_balancing.html) or [HAProxy](https://www.digitalocean.com/community/tutorials/an-introduction-to-haproxy-and-load-balancing-concepts).

Con il servizio di bilanciamento del carico, è possibile che sia necessario garantire che le richieste associate a un ID sessione particolare si connettano al processo che le ha originate. Questo processo è noto come _affinità sessione_ o _sessioni delicate_. Si consiglia di utilizzare un data store, ad esempio Redis, per i dati sessione (a seconda dell'applicazione). Per informazioni, consultare [Utilizzo di più nodi](https://socket.io/docs/v4/using-multiple-nodes/).

### Utilizzare un proxy inverso

Un proxy inverso si trova davanti a un'applicazione web ed esegue le operazioni di supporto sulle richieste, oltre a indirizzare le richieste all'applicazione. Inoltre, è in grado di gestire pagine di errore, compressioni, memorizzazioni in cache e il bilanciamento del carico.

Le attività di gestione che non richiedono la conoscenza dello stato dell'applicazione per un proxy inverso consentono ad Express di eseguire attività dell'applicazione specializzate. For this reason, it is recommended to run Express behind a reverse proxy like [Nginx](https://www.nginx.org/) or [HAProxy](https://www.haproxy.org/) in production.
