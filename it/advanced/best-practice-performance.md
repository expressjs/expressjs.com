---
layout: page
title: Best Practice sulle prestazioni utilizzando Express in fase di produzione
menu: advanced
lang: it
---

# Best practice sulla produzione: prestazioni e affidabilità

## Panoramica

In questo articolo vengono descritte le best practice sulle prestazioni e sull'affidabilità per le applicazioni Express implementate per la produzione.

Questo argomento entra nel mondo di "devops", coprendo sia le operazioni che lo sviluppo tradizionale. Di conseguenza, le informazioni sono divise in due parti:

* [Operazioni da effettuare nel codice](#code) (la parte dello sviluppo).
* [Operazioni da effettuare nell'ambiente / configurazione](#env) (la parte delle operazioni).

<a name="code"></a>

## Operazioni da effettuare nel codice

Di seguito sono elencate alcune operazioni che è possibile effettuare nel codice per migliorare le prestazioni dell'applicazione:

* Utilizzare la compressione gzip
* Non utilizzare funzioni sincrone
* Utilizzare il middleware per servire file statici
* Effettuare correttamente la registrazione
* Gestire in modo appropriato le eccezioni

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

Se si sta utilizzando Node.js 4.0+ o io.js 2.1.0+, è possibile utilizzare il flag della riga di comando `--trace-sync-io` per stampare un avviso e un'analisi dello stack ogniqualvolta che un'applicazione utilizza una API sincrona. Naturalmente, non si consiglia di utilizzarlo nella produzione, ma solo per assicurare che il codice sia pronto per la produzione. Consultare l'[aggiornamento settimanale per io.js 2.1.0](https://nodejs.org/en/blog/weekly-updates/weekly-update.2015-05-22/#2-1-0) per ulteriori informazioni.

### Utilizzare il middleware per servire file statici

Nello sviluppo, è possibile utilizzare [res.sendFile()](/{{ page.lang }}/4x/api.html#res.sendFile) per servire i file statici. Ma non effettuare questa operazione in fase di produzione, poiché questa funzione deve effettuare un processo di lettura dal file system per ciascuna richiesta file, quindi si verificherà una latenza importante e si andrà a influenzare le prestazioni dell'applicazione. Notare che `res.sendFile()` *non* viene implementato con la chiamata di sistema [sendfile](http://linux.die.net/man/2/sendfile), che lo renderebbe molto più efficiente.

Al contrario, utilizzare il middleware [serve-static](https://www.npmjs.com/package/serve-static) (o qualcosa di equivalente), ottimizzato per servire i file per le applicazioni Express.

Un'altra opzione potrebbe essere quella di utilizzare un proxy inverso per servire file statici; consultare [Utilizzare un proxy inverso](#proxy) per ulteriori informazioni.

### Effettuare correttamente la registrazione

Solitamente, esistono due motivi per effettuare la registrazione dall'applicazione: per il debug e la registrazione dell'attività dell'applicazione (sostanzialmente, qualsiasi altra cosa). L'utilizzo di `console.log()` o `console.err()` per stampare i messaggi di log sul terminale, è un'operazione comune nello sviluppo. Ma [queste funzioni sono sincrone](https://nodejs.org/api/console.html#console_console_1) quando la destinazione è un terminale o un file, pertanto non sono adatte per la produzione, a meno che non si indirizzi l'output a un altro programma.

#### Per il debug

Se si sta effettuando la registrazione per motivi di debug, allora invece di utilizzare `console.log()`, utilizzare un modulo di debug speciale quale [debug](https://www.npmjs.com/package/debug). Questo modulo consente di utilizzare la variabile di ambiente DEBUG per controllare quali messaggi di debug vengono inviati a `console.err()`, se presenti. Per fare in modo che l'applicazione resti strettamente asincrona, è necessario instradare `console.err()` a un altro programma. Però a questo punto, non andrai ad effettuare il debug in fase di produzione giusto?

#### Per l'attività dell'applicazione

Se si sta registrando l'attività dell'applicazione (ad esempio, si sta tenendo traccia del traffico e delle chiamate API), invece di utilizzare `console.log()`, utilizzare una libreria di registrazione quale [Winston](https://www.npmjs.com/package/winston) o [Bunyan](https://www.npmjs.com/package/bunyan). Per un confronto dettagliato di queste due librerie, consultare il post del blog di StrongLoop [Comparing Winston and Bunyan Node.js Logging](https://strongloop.com/strongblog/compare-node-js-logging-winston-bunyan/).

<a name="exceptions"></a>

### Gestire in modo appropriato le eccezioni

Le applicazioni Node danno origine a errori quando riscontrano eccezioni non rilevate. Se tali eccezioni non vengono gestite o se non si effettuano operazioni appropriate, l'applicazione Express si arresterà in modo anomalo. Seguendo i consigli descritti in [Riavvio automatico dell'applicazione](#restart), sarà possibile recuperare l'applicazione dopo un arresto anomalo. Fortunatamente, le applicazioni Express solitamente hanno tempi di avvio molto brevi. Tuttavia, per prima cosa è necessario evitare che si verifichino arresti anomali, e per effettuare ciò, è necessario gestire in modo appropriato le eccezioni.

Per essere sicuri di gestire al meglio tutte le eccezioni, utilizzare le seguenti tecniche:

* [Utilizzare try-catch](#try-catch)
* [Utilizzare promises](#promises)

Prima di leggere questi argomenti, è necessario avere una conoscenza base della gestione degli errori di Node/Express: utilizzo di error-first callback e diffusione degli errori al middleware. Node utilizza la convenzione "error-first callback" per restituire gli errori da funzioni asincrone, dove il primo parametro per la funzione callback è l'oggetto dell'errore, seguito dai dati nei parametri successivi. Per indicare un errore, indicare null come primo parametro. La funzione callback deve seguire in modo corrispondente la convenzione error-first callback per gestire l'errore in modo significativo. In Express, il miglior modo è quello di utilizzare la funzione next() per diffondere gli errori attraverso la catena middleware.

Per ulteriori informazioni sulle nozioni di base della gestione degli errori, consultare:

* [Gestione degli errori in Node.js](https://www.joyent.com/developers/node/design/errors)
* [Come creare applicazioni Node solide: Gestione degli errori](https://strongloop.com/strongblog/robust-node-applications-error-handling/) (blog di StrongLoop)

#### Cosa non fare

Una cosa da *non* fare è quella di stare in ascolto per un evento `uncaughtException`, emesso quando un'eccezione si verifica ed è costante nel loop degli eventi. Se si aggiunge un programma di ascolto dell'evento per `uncaughtException` si cambierà il funzionamento predefinito del processo che sta riscontrando un'eccezione; il processo continuerà ad operare malgrado l'eccezione. Questo potrebbe risultare un ottimo modo per prevenire un arresto anomalo dell'applicazione, ma continuare ad utilizzare un'applicazione dopo che si è verificata un'eccezione non rilevata è pericoloso e non è consigliato, poiché lo stato del processo diventa non affidabile e non prevedibile.

Inoltre, l'utilizzo di `uncaughtException` è ufficialmente riconosciuto come [non conforme](https://nodejs.org/api/process.html#process_event_uncaughtexception) ed esiste una [proposta](https://github.com/nodejs/node-v0.x-archive/issues/2582) per la relativa rimozione dal core. Quindi continuare a visualizzare un evento `uncaughtException` non è un buon segno. Ecco perché consigliamo di usufruire di più processi e supervisori: l'arresto anomalo e il riavvio sono spesso il modo più affidabile per ripristinare una situazione dopo un errore.

Inoltre, non si consiglia di utilizzare l'opzione [domini](https://nodejs.org/api/domain.html). Solitamente non risolve il problema ed è considerato un modulo obsoleto.

<a name="try-catch"></a>

#### Utilizzare try-catch

Try-catch è un linguaggio JavaScript che è possibile utilizzare per rilevare eccezioni in codice sincrono. Ad esempio, utilizzare try-catch, per gestire errori di analisi JSON come mostrato di seguito.

Utilizzare uno strumento come [JSHint](http://jshint.com/) o [JSLint](http://www.jslint.com/) come supporto nel rilevamento di eccezioni implicite quali [errori di riferimento su variabili non definite](http://www.jshint.com/docs/options/#undef).

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

<a name="promises"></a>

#### Utilizzare promises

Promises gestirà qualsiasi eccezione (sia implicita che esplicita) in blocchi di codice asincrono che utilizzano `then()`. Aggiungere `.catch(next)` alla fine della catena promise. Ad esempio:

```js
app.get('/', (req, res, next) => {
  // do some sync stuff
  queryDb()
    .then((data) => makeCsv(data)) // handle data
    .then((csv) => { /* handle csv */ })
    .catch(next)
})

app.use((err, req, res, next) => {
  // handle error
})
```

Ora, tutti gli errori asincroni e sincroni vengono inoltrati al middleware degli errori.

Tuttavia, esistono due punti a cui prestare attenzione:

1.  Tutto il codice asincrono deve restituire promises (ad eccezione di emettitori). Se una libreria particolare non restituire promises, convertire l'oggetto base utilizzando una funzione di supporto come [Bluebird.promisifyAll()](http://bluebirdjs.com/docs/api/promise.promisifyall.html).
2.  Emettitori evento (come flussi) possono ancora dare origine ad eccezioni non rilevate. Quindi, assicurarsi di gestire l'evento di errore in modo appropriato, ad esempio:

```js
const wrap = fn => (...args) => fn(...args).catch(args[2])

app.get('/', wrap(async (req, res, next) => {
  const company = await getCompanyById(req.query.id)
  const stream = getLogoStreamById(company.id)
  stream.on('error', next).pipe(res)
}))
```

Per ulteriori informazioni sulla gestione degli errori mediante l'utilizzo di promises, consultare:

* [Asynchronous Error Handling in Express with Promises, Generators and ES7](https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/)
* [Promises in Node.js with Q – An Alternative to Callbacks](https://strongloop.com/strongblog/promises-in-node-js-with-q-an-alternative-to-callbacks/)

<a name="env"></a>

## Operazioni da effettuare nell'ambiente / configurazione

Di seguito sono elencate alcune operazioni che è possibile effettuare nell'ambiente del sistema per migliorare le prestazioni dell'applicazione:

* Impostare NODE_ENV su "produzione"
* Verificare che l'applicazione sia in grado di riavviarsi automaticamente
* Eseguire l'applicazione in un cluster
* Memorizzare in cache i risultati della richiesta
* Utilizzare un servizio di bilanciamento del carico
* Utilizzare un proxy inverso

### Impostare NODE_ENV su "produzione"

La variabile di ambiente NODE_ENV indica l'ambiente in cui è in esecuzione un'applicazione (solitamente, sviluppo o applicazione). Una delle cose più semplici da fare per migliorare le prestazioni, è impostare NODE_ENV su "produzione."

L'impostazione di NODE_ENV su "produzione" consente ad Express di:

* Memorizzare in cache i template di visualizzazione.
* Memorizzare in cache i file CSS generati da stensioni CSS.
* Generare meno messaggi di errore ridondanti.

[I test hanno confermato](http://apmblog.dynatrace.com/2015/07/22/the-drastic-effects-of-omitting-node_env-in-your-express-js-applications/) che seguendo queste indicazioni è possibile migliorare le prestazioni dell'applicazione di tre volte!

Se si ha la necessità di scrivere codice specifico dell'ambiente, è possibile selezionare il valore di NODE_ENV con `process.env.NODE_ENV`. Notare che la selezione del valore di qualsiasi variabile di ambiente influisce sulle prestazioni in modo negativo, quindi questa operazione deve essere effettuata con moderazione.

Nello sviluppo, solitamente si impostano le variabili di ambiente nella shell interattiva, ad esempio utilizzando `export` o il file `.bash_profile`. Ma solitamente non si consiglia di effettuare questa operazione su un server di produzione; al contrario, utilizzare il sistema init del sistema operativo (systemd o Upstart). La sezione successiva fornisce ulteriori dettagli sull'utilizzo in generale del sistema init, però anche impostare NODE_ENV è molto importante per le prestazioni (ed è facile da fare), evidenziato di seguito.

Con Upstart, utilizzare la parola chiave `env` nel file job. Ad esempio:

<pre>
<code class="language-sh" translate="no">
# /etc/init/env.conf
 env NODE_ENV=production
</code>
</pre>

Per ulteriori informazioni, consultare [Upstart Intro, Cookbook and Best Practices](http://upstart.ubuntu.com/cookbook/#environment-variables).

Con systemd, utilizzare la direttiva `Environment` nel file unit. Ad esempio:

<pre>
<code class="language-sh" translate="no">
# /etc/systemd/system/myservice.service
Environment=NODE_ENV=production
</code>
</pre>

Per ulteriori informazioni, consultare [Using Environment Variables In systemd Units](https://coreos.com/os/docs/latest/using-environment-variables-in-systemd-units.html).

Se si sta utilizzando StrongLoop Process Manager, è inoltre possibile [impostare la variabile di ambiente quando si installa StrongLoop PM as a service](https://docs.strongloop.com/display/SLC/Setting+up+a+production+host#Settingupaproductionhost-Setenvironmentvariables).

### Verificare che l'applicazione sia in grado di riavviarsi automaticamente

In fase di produzione, l'applicazione non deve mai andare offline. Ciò significa che deve riavviarsi nel caso in cui sia l'applicazione che il server terminino in modo anomalo. Anche se ovviamente si spera che entrambe queste situazioni non si verifichino mai, realisticamente è necessario considerare l'eventualità di:

* Utilizzare un process manager per riavviare l'applicazione (e Node) quando termina in modo anomalo.
* Utilizzare il sistema init fornito dal sistema operativo per riavviare il process manager quando il sistema operativo termina in modo anomalo. È inoltre possibile utilizzare il sistema init senza un process manager.

Le applicazioni Node terminano in modo anomalo se riscontrano eccezioni non rilevate. La prima cosa da fare è verificare che l'applicazione sia stata verificata e che sia in grado di gestire tutte le eccezioni (consultare [Gestire in modo appropriato le eccezioni](#exceptions) per dettagli). Come prevenzione, attivare un meccanismo che assicuri che applicazione si riavvii automaticamente in caso di arresto anomalo.

#### Utilizzare un process manager

Nello sviluppo, l'applicazione è stata avviata semplicemente dalla riga comandi con `node server.js` o qualcosa di simile. Ma se si effettua questa stessa operazione in campo di produzione si andrà incontro a situazioni pericolose. Se l'applicazione termina in modo anomalo, sarà offline finché non viene riavviata. Per fare in modo che l'applicazione si riavvii nel caso in cui termini in modo anomalo, utilizzare un process manager. Un process manager è un "contenitore" per le applicazioni che facilita lo sviluppo, fornisce un'elevata disponibilità e consente di gestire l'applicazione al momento del runtime.

Oltre a fare in modo di riavviare l'applicazione in caso di arresto anomalo, un process manager consente di:

* Ottenere insight relativi alle prestazioni di runtime e al consumo delle risorse.
* Modificare le impostazioni in modo dinamico per migliorare le prestazioni.
* Controllare il processo di clustering (StrongLoop PM e pm2).

I process manager più noti per Node sono i seguenti:

* [StrongLoop Process Manager](http://strong-pm.io/)
* [PM2](https://github.com/Unitech/pm2)
* [Forever](https://www.npmjs.com/package/forever)

Per un paragone a livello di funzioni dei tre process manager, consultare l'indirizzo [http://strong-pm.io/compare/](http://strong-pm.io/compare/). Per informazioni più dettagliate su tutti e tre i process manager, consultare [Process manager per le applicazioni Express](/{{ page.lang }}/advanced/pm.html).

L'utilizzo di questi process manager sarà sufficiente per far restare attiva l'applicazione, anche se dovesse capitare che si arresti in modo anomalo.

Tuttavia, StrongLoop PM dispone di molte funzioni che sono indicate in modo specifico per l'implementazione della produzione. È possibile utilizzarle insieme ai relativi strumenti di StrongLoop per:

* Creare e confezionare l'applicazione localmente, quindi implementarla in modo sicuro al sistema di produzione.
* Riavviare automaticamente l'applicazione se termina in modo anomalo per qualsiasi motivo.
* Gestire i cluster in modo remoto.
* Visualizzare i profili CPU e accumulare le istantanee per ottimizzare le prestazioni e diagnosticare le perdite di memoria.
* Visualizzare le metriche delle prestazioni per l'applicazione.
* Scalare facilmente a più host con un controllo integrato per il servizio di bilanciamento del carico Nginx.

Come mostrato di seguito, quando si installa StrongLoop PM come servizio del sistema operativo utilizzando il sistema init, si riavvierà automaticamente quando si riavvia il sistema. Pertanto, consentirà ai processi delle applicazioni e ai cluster di restare sempre attivi.

#### Utilizzare un sistema init

Il successivo livello di affidabilità è quello di assicurare che l'applicazione venga riavviata quando si riavvia il server. I sistemi possono ancora arrestarsi per moltissimi motivi. Per fare in modo che l'applicazione si riavvii nel caso in cui un server si arresti in modo anomalo, utilizzare il sistema init integrato al sistema operativo. Oggi, i due sistemi init principali in uso sono [systemd](https://wiki.debian.org/systemd) e [Upstart](http://upstart.ubuntu.com/).

Esistono due modi per utilizzare i sistemi init con l'applicazione Express:

* Far eseguire l'applicazione in un process manager e installare il process manager come servizio con il sistema init. Il process manager riavvierà l'applicazione nel caso in cui termini in modo anomalo e il sistema init riavvierà il process manager quando si riavvia il sistema operativo. Questa è la procedura consigliata.
* Far eseguire l'applicazione (e Node) direttamente con il sistema init. Questa operazione risulta più semplice ma non si hanno gli stessi vantaggi dell'utilizzo di un process manager.

##### Systemd

Systemd è un sistema Linux e un service manager. Le più importanti distribuzioni Linux hanno utilizzato systemd come sistema init predefinito.

Un file di configurazione del servizio systemd è denominato *unit file*, con un nome file che termina con .service. Segue un unit file di esempio per gestire un'applicazione Node direttamente (sostituire il testo in grassetto con i valori appropriati per il proprio sistema e applicazione):

<pre>
<code class="language-sh" translate="no">
[Unit]
Description=Awesome Express App

[Service]
Type=simple
ExecStart=/usr/local/bin/node /projects/myapp/index.js
WorkingDirectory=/projects/myapp

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
</code>
</pre>
Per ulteriori informazioni su systemd, consultare [systemd reference (man page)](http://www.freedesktop.org/software/systemd/man/systemd.unit.html).

##### StrongLoop PM in qualità di servizio systemd

È possibile installare facilmente StrongLoop Process Manager in qualità di servizio systemd. Dopo l'installazione, quando il server si riavvia, si riavvierà automaticamente StrongLoop PM, il quale riavvierà di conseguenza tutte le applicazioni che sta gestendo.

Per installare StrongLoop PM in qualità di servizio systemd:

```console
$ sudo sl-pm-install --systemd
```

Successivamente, avviare il servizio con:

```console
$ sudo /usr/bin/systemctl start strong-pm
```

Per ulteriori informazioni, consultare [Configurazione di un host di produzione (documentazione StrongLoop)](https://docs.strongloop.com/display/SLC/Setting+up+a+production+host#Settingupaproductionhost-RHEL7+,Ubuntu15.04or15.10).

##### Upstart

Upstart è uno strumento di sistema disponibile su molte distribuzioni Linux per l'avvio delle attività e dei servizi durante lo startup del sistema, per l'arresto delle stesse durante la fase di shutdown e per il controllo delle stesse. È possibile configurare l'applicazione Express o il process manager in qualità di servizio e successivamente Upstart le riavvierà automaticamente quando terminano in modo anomalo.

Un servizio Upstart è definito in un file di configurazione del lavoro (anche noto come "lavoro") con un nome file che termina con `.conf`. Il seguente esempio mostra come creare un lavoro denominato "myapp" per un'applicazione denominata "myapp" con il file principale ubicato in `/projects/myapp/index.js`.

Creare un file denominato `myapp.conf` in `/etc/init/` con il seguente contenuto (sostituire il testo in grassetto con i valori appropriati per il proprio sistema e applicazione):

<pre>
<code class="language-sh" translate="no">
# When to start the process
start on runlevel [2345]

# When to stop the process
stop on runlevel [016]

# Increase file descriptor limit to be able to handle more requests
limit nofile 50000 50000

# Use production mode
env NODE_ENV=production

# Run as www-data
setuid www-data
setgid www-data

# Run from inside the app dir
chdir /projects/myapp

# The process to start
exec /usr/local/bin/node /projects/myapp/index.js

# Restart the process if it is down
respawn

# Limit restart attempt to 10 times within 10 seconds
respawn limit 10 10
</code>
</pre>

NOTA: questo script richiede Upstart 1.4 o versione successiva, supportato su Ubuntu 12.04-14.10.

Poiché il lavoro è configurato per essere eseguito quando si avvia il sistema, l'applicazione verrà avviata insieme al sistema operativo e riavviata automaticamente se l'applicazione termina in modo anomalo o se il sistema si arresta.

Oltre a riavviare automaticamente l'applicazione, Upstart consente di utilizzare i seguenti comandi:

* `start myapp` – Avviare l'applicazione
* `restart myapp` – Riavviare l'applicazione
* `stop myapp` – Arrestare l'applicazione.

Per ulteriori informazioni su Upstart, consultare [Upstart Intro, Cookbook and Best Practises](http://upstart.ubuntu.com/cookbook).

##### StrongLoop PM in qualità di servizio Upstart

È possibile installare facilmente StrongLoop Process Manager in qualità di servizio Upstart. Dopo l'installazione, quando il server si riavvia, si riavvierà automaticamente StrongLoop PM, il quale riavvierà di conseguenza tutte le applicazioni che sta gestendo.

Per installare StrongLoop PM in qualità di servizio Upstart 1.4:

```console
$ sudo sl-pm-install
```

Successivamente, eseguire il servizio con:

```console
$ sudo /sbin/initctl start strong-pm
```

NOTA: su sistemi che non supportano Upstart 1.4, i comandi sono leggermente differenti. Consultare [Configurazione di un host di produzione (documentazione StrongLoop)](https://docs.strongloop.com/display/SLC/Setting+up+a+production+host#Settingupaproductionhost-RHELLinux5and6,Ubuntu10.04-.10,11.04-.10) per ulteriori informazioni.

### Eseguire l'applicazione in un cluster

In un sistema multicore, è possibile aumentare le prestazioni di un'applicazione Node di molte volte avviando un cluster di processi. Un cluster esegue molte istanze di un'applicazione, nel caso ideale, un'istanza su ciascun core CPU, quindi, distribuendo il carico e le attività tra le istanze.

<!--![Bilanciamento tra le istanze dell'applicazione utilizzando l'API del cluster](/images/clustering.png)-->

IMPORTANTE: poiché le istanze dell'applicazione vengono eseguite come processi separati, non condividono lo stesso spazio di memoria. Ossia, gli oggetti sono locali rispetto a ciascuna istanza dell'applicazione. Pertanto, non è possibile conservare lo stato nel codice dell'applicazione. Tuttavia, è possibile utilizzare un datastore in-memory, ad esempio [Redis](http://redis.io/) per memorizzare lo stato e i dati relativi alla sessione. Questa condizione si applica fondamentalmente a tutti i moduli di scaling orizzontale, se il processo di clustering viene effettuato con più processi o più server fisici.

Nelle applicazioni sottoposte a cluster, i processi di lavoro possono ternare in modo anomalo individualmente senza influenzare gli altri processi. Oltre ai vantaggi che si possono ottenere dalle prestazioni, l'isolamento dell'errore è un altro motivo che spinge a eseguire un cluster di processi di applicazioni. Quando un processo di lavoro termina in modo anomalo, ricordarsi sempre di registrare l'evento e di dare origine a un nuovo processo utilizzando cluster.fork().

#### Utilizzo del modulo cluster di Node

Il processo di clustering è stato reso possibile con il [cluster module](https://nodejs.org/docs/latest/api/cluster.html) di Node. Ciò consente a un processo principale di dare origine a processi di lavoro e di distribuire le connessioni in entrata tra i processi di lavoro. Tuttavia, invece di utilizzare direttamente questo modulo, è meglio utilizzare uno dei molti strumenti disponibili che svolgono questa attività automaticamente; ad esempio [node-pm](https://www.npmjs.com/package/node-pm) o [cluster-service](https://www.npmjs.com/package/cluster-service).

#### Utilizzo di StrongLoop PM

Se si implementa l'applicazione a StrongLoop Process Manager (PM), è possibile sfruttare i vantaggi del processo di clustering *senza* dover modificare il codice dell'applicazione.

Quando StrongLoop Process Manager (PM) esegue un'applicazione, la esegue automaticamente in un cluster con un numero di processi di lavoro equivalente al numero di core CPU presenti sul sistema. È possibile modificare manualmente il numero di processi di lavoro nel cluster utilizzando lo strumento della riga comandi senza arrestare l'applicazione.

Ad esempio, se l'applicazione è stata implementata su prod.foo.com e StrongLoop PM è in ascolto sulla porta 8701 (quella predefinita), per impostare la dimensione del cluster a otto utilizzando slc:

```console
$ slc ctl -C http://prod.foo.com:8701 set-size my-app 8
```

Per ulteriori informazioni sul processo di clustering con StrongLoop PM, consultare [Processo di clustering](https://docs.strongloop.com/display/SLC/Clustering) nella documentazione StrongLoop.

### Memorizzare in cache i risultati della richiesta

Un'altra strategia per migliorare le prestazioni in fase di produzione è quella di memorizzare in cache i risultati delle richieste, in modo tale che l'applicazione non debba gestire nuovamente la stessa richiesta.

Utilizzare un server di memorizzazione in cache quale [Varnish](https://www.varnish-cache.org/) o [Nginx](https://www.nginx.com/resources/wiki/start/topics/examples/reverseproxycachingexample/) (vedere anche [Nginx Caching](https://serversforhackers.com/nginx-caching/)) per migliorare notevolmente la velocità e le prestazioni dell'applicazione.

### Utilizzare un servizio di bilanciamento del carico

A prescindere da quanto sia ottimizzata un'applicazione, una singola istanza è in grado di gestire solo una quantità limitata di carico e traffico. Un modo per scalare un'applicazione è quello di eseguire più delle proprie istanze e distribuire il traffico tramite un servizio di bilanciamento del carico. L'impostazione di un servizio di bilanciamento del carico può migliorare la velocità e le prestazioni dell'applicazione e abilitarla a scalare di più di quanto sia possibile fare con una singola istanza.

Un servizio di bilanciamento del carico è solitamente un proxy inverso che gestisce il traffico a e d più istanze di applicazione e server. È possibile impostare facilmente un servizio di bilanciamento del carico per l'applicazione utilizzando [Nginx](http://nginx.org/en/docs/http/load_balancing.html) or [HAProxy](https://www.digitalocean.com/community/tutorials/an-introduction-to-haproxy-and-load-balancing-concepts).

Con il servizio di bilanciamento del carico, è possibile che sia necessario garantire che le richieste associate a un ID sessione particolare si connettano al processo che le ha originate. Questo processo è noto come *affinità sessione* o *sessioni delicate*. Si consiglia di utilizzare un data store, ad esempio Redis, per i dati sessione (a seconda dell'applicazione). Per informazioni, consultare [Utilizzo di più nodi](http://socket.io/docs/using-multiple-nodes/).

#### Utilizzo di StrongLoop PM con un servizio di bilanciamento del carico Nginx

[StrongLoop Process Manager](http://strong-pm.io/) si integra con un controller Nginx, rendendo semplice il processo di configurazione di ambienti di produzione multi host. Per ulteriori informazioni, consultare [Processo di scaling su più server](https://docs.strongloop.com/display/SLC/Scaling+to+multiple+servers) (documentazione StrongLoop).
<a name="proxy"></a>

### Utilizzare un proxy inverso

Un proxy inverso si trova davanti a un'applicazione web ed esegue le operazioni di supporto sulle richieste, oltre a indirizzare le richieste all'applicazione. Inoltre, è in grado di gestire pagine di errore, compressioni, memorizzazioni in cache e il bilanciamento del carico.

Le attività di gestione che non richiedono la conoscenza dello stato dell'applicazione per un proxy inverso consentono ad Express di eseguire attività dell'applicazione specializzate. Per questo motivo, si consiglia di eseguire Express dietro un proxy inverso come [Nginx](https://www.nginx.com/) o [HAProxy](http://www.haproxy.org/) in fase di produzione.
