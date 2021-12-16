---
layout: page
title: Process manager per le applicazioni Express
menu: advanced
lang: it
---

# Process manager per le applicazioni Express

Quando si eseguono le applicazioni Express per la produzione, è utile utilizzare un *process manager* per effettuare le seguenti attività:

- Riavviare l'applicazione automaticamente se termina in modo anomalo.
- Ottenere insight relativi alle prestazioni di runtime e al consumo delle risorse.
- Modificare le impostazioni in modo dinamico per migliorare le prestazioni.
- Controllare il processo di clustering.

Un process manager è simile a un server delle applicazioni: è un "contenitore" per le applicazioni che facilita lo sviluppo, fornisce un'elevata disponibilità e consente di gestire l'applicazione al momento del runtime.

I process manager più noti per Express e altre applicazioni Node.js sono i seguenti:

- [StrongLoop Process Manager](#sl)
- [PM2](#pm2)
- [Forever](#forever)


L'utilizzo di uno di questi tre strumenti può essere molto utile, tuttavia, StrongLoop Process Manager è l'unico strumento che fornisce una soluzione di distribuzione e runtime completa che interessa il ciclo di vita dell'intera applicazione Node.js, con la possibilità di usufruire di strumenti in ciascuna fase prima e dopo la produzione, in un'interfaccia unificata.

Segue una breve descrizione relativa ad ogni strumento.
Per un confronto dettagliato, consultare [http://strong-pm.io/compare/](http://strong-pm.io/compare/).

## <a id="sl">StrongLoop Process Manager</a>

StrongLoop Process Manager (StrongLoop PM) è un process manager di produzione per le applicazioni Node.js. StrongLoop PM dispone di servizi di bilanciamento del carico integrati, del servizio di monitoraggio, dell'implementazione multi-host e di una console grafica.
È possibile utilizzare StrongLoop PM per svolgere le seguenti attività:

- Creare, creare pacchetti e implementare l'applicazione Node.js su un sistema locale o remoto.
- Visualizzare i profili CPU e accumulare le istantanee per ottimizzare le prestazioni e diagnosticare le perdite di memoria.
- Fare in modo che i processi e i cluster siano per sempre attivi.
- Visualizzare le metriche delle prestazioni sull'applicazione.
- Gestire con facilità le implementazioni multi-host con l'integrazione Nginx.
- Unificare più StrongLoop PM a un runtime di microservizi distribuito gestito dall'Arc.

È possibile gestire StrongLoop PM utilizzando uno strumento di interfaccia della riga comandi avanzato denominato `slc` oppure uno strumento grafico denominato Arc. Arc è open source, con un supporto professionale fornito da StrongLoop.

Per ulteriori informazioni, consultare [http://strong-pm.io/](http://strong-pm.io/).

Documentazione completa:

- [Operating Node apps (documentazione StrongLoop)](http://docs.strongloop.com/display/SLC)
- [Using StrongLoop Process Manager](http://docs.strongloop.com/display/SLC/Using+Process+Manager).

### Installazione

```console
$ [sudo] npm install -g strongloop
```

### Utilizzo di base

```console
$ cd my-app
$ slc start
```

Visualizzare lo stato del Process Manager e tutte le applicazioni implementate:

```console
$ slc ctl
Service ID: 1
Service Name: my-app
Environment variables:
  No environment variables defined
Instances:
    Version  Agent version  Cluster size
     4.1.13      1.5.14           4
Processes:
        ID      PID   WID  Listening Ports  Tracking objects?  CPU profiling?
    1.1.57692  57692   0
    1.1.57693  57693   1     0.0.0.0:3001
    1.1.57694  57694   2     0.0.0.0:3001
    1.1.57695  57695   3     0.0.0.0:3001
    1.1.57696  57696   4     0.0.0.0:3001
```

Elencare tutte le applicazioni (servizi) sotto la gestione:

```console
$ slc ctl ls
Id          Name         Scale
 1          my-app       1
```

Arrestare un'applicazione:

```console
$ slc ctl stop my-app
```

Riavviare un'applicazione:

```console
$ slc ctl restart my-app
```

È inoltre possibile effettuare un "avvio a caldo," il quale fornisce ai processi di lavoro un determinato periodo di tempo per chiudere le connessioni e successivamente riavviare l'applicazione corrente:

```console
$ slc ctl soft-restart my-app
```

Per rimuovere un'applicazione dalla gestione:

```console
$ slc ctl remove my-app
```

## <a id="pm2">PM2</a>

PM2 è un process manager di produzione per le applicazioni Node.js, che dispone di un servizio di bilanciamento del carico integrato. PM2 è utile per consentire alle applicazioni di essere sempre attive e consente di ricaricarle senza interruzione, inoltre faciliterà le attività di gestione del sistema comuni.  PM2 inoltre consente di gestire la registrazione dell'applicazione, il monitoraggio e il clustering.

Per ulteriori informazioni, consultare [https://github.com/Unitech/pm2](https://github.com/Unitech/pm2).

### Installazione

```console
$ [sudo] npm install pm2 -g
```

### Utilizzo di base

Quando si avvia un'applicazione utilizzando il comando `pm2`, è necessario specificare il percorso dell'applicazione. Tuttavia, quando si arresta, riavvia o si cancella un'applicazione, è possibile specificare solo il nome o l'ID dell'applicazione.

```console
$ pm2 start npm --name my-app -- start
[PM2] restartProcessId process id 0
┌──────────┬────┬──────┬───────┬────────┬─────────┬────────┬─────────────┬──────────┐
│ App name │ id │ mode │ pid   │ status │ restart │ uptime │ memory      │ watching │
├──────────┼────┼──────┼───────┼────────┼─────────┼────────┼─────────────┼──────────┤
│ my-app   │ 0  │ fork │ 64029 │ online │ 1       │ 0s     │ 17.816 MB   │ disabled │
└──────────┴────┴──────┴───────┴────────┴─────────┴────────┴─────────────┴──────────┘
 Use the `pm2 show <id|name>` command to get more details about an app.
```

Quando si avvia un'applicazione utilizzando il comando `pm2`, l'applicazione viene immediatamente inviata all'applicazione di background. È possibile controllare l'applicazione di background dalla riga comandi utilizzando diversi comandi `pm2`.

Dopo che un'applicazione viene avviata tramite il comando `pm2`, viene registrata nell'elenco di processi PM2 con un ID. È possibile quindi gestire le applicazioni con lo stesso nome da directory differenti sul sistema, utilizzando i relativi ID.

Notare che se più di un'applicazione è in esecuzione con lo stesso nome, i comandi `pm2` saranno relativi a tutte quelle applicazioni. Pertanto, si consiglia di utilizzare gli ID invece dei nomi per gestire applicazioni individuali.

Elencare tutti i processi in esecuzione:

```console
$ pm2 list
```

Arrestare un'applicazione:

```console
$ pm2 stop 0
```

Riavviare un'applicazione:

```console
$ pm2 restart 0
```

Per visualizzare informazioni dettagliate su un'applicazione:

```console
$ pm2 show 0
```

Per rimuovere un'applicazione dal registro di PM2:

```console
$ pm2 delete 0
```


## <a id="forever">Forever</a>

Forever è uno strumento di interfaccia della riga comandi semplice che assicura che uno script fornito sia in esecuzione continua (forever). L'interfaccia semplice Forever è ideale per l'esecuzione di piccole distribuzioni degli script e applicazioni di Node.js.

Per ulteriori informazioni, consultare [https://github.com/foreverjs/forever](https://github.com/foreverjs/forever).

### Installazione

```console
$ [sudo] npm install forever -g
```

### Utilizzo di base

Per avviare uno script, utilizzare il comando `forever start` e specificare il percorso dello script:

```console
$ forever start script.js
```

Questo comando consentirà l'esecuzione dello script in modalità daemon (in background).

Per eseguire lo script in modo tale che sia visualizzato sul terminale, omettere `start`:

```console
$ forever script.js
```

Si consiglia di registrare l'output dallo strumento Forever e lo script utilizzando le opzioni di registrazione `-l`, `-o` e `-e`, come mostrato nel seguente esempio:

```console
$ forever start -l forever.log -o out.log -e err.log script.js
```

Per visualizzare l'elenco di script avviati da Forever:

```console
$ forever list
```

Per arrestare uno script che era stato avviato da Forever, utilizzare il comando `forever stop` e specificare l'indice del processo (come elencato dal comando `forever list`).

```console
$ forever stop 1
```

In alternativa, specificare il percorso del file:

```console
$ forever stop script.js
```

Per arrestare tutti gli script avviati da Forever:

```console
$ forever stopall
```

Forever dispone di molte più opzioni e fornisce inoltre un'API programmatica.
