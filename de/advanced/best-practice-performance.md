---
layout: page
title: Leistungsspezifische Best Practices für Express-Anwendungen in Produktionsumgebungen
description: Discover performance and reliability best practices for Express apps in production, covering code optimizations and environment setups for optimal performance.
menu: advanced
lang: de
redirect_from: "  "
---

# Best Practices in Produktionsumgebungen: Leistung und Zuverlässigkeit

In diesem Beitrag werden Best Practices in Bezug auf Leistung und Zuverlässigkeit für Express-Anwendungen behandelt, die in der Produktionsumgebung bereitgestellt werden.

Dieses Thema gehört sicherlich zur "DevOps"-Welt und deckt traditionelle Entwicklungs- und Betriebsprozesse ab. Entsprechend sind die Informationen hier in zwei Teile unterteilt:

- Things to do in your code (the dev part):
  - Für statische Dateien Middleware verwenden
  - Keine synchronen Funktionen verwenden
  - [Do logging correctly](#do-logging-correctly)
  - [Handle exceptions properly](#handle-exceptions-properly)
- Things to do in your environment / setup (the ops part):
  - NODE_ENV auf "production" festlegen
  - Automatischen Neustart Ihrer Anwendung sicherstellen
  - Anwendung in einem Cluster ausführen
  - Anforderungsergebnisse im Cache speichern
  - Load Balancer verwenden
  - Reverse Proxy verwenden

## Things to do in your code {#in-code}

Dies sind einige Beispiele für Maßnahmen, die Sie an Ihrem Code vornehmen können, um die Anwendungsleistung zu verbessern:

- Für statische Dateien Middleware verwenden
- Keine synchronen Funktionen verwenden
- [Do logging correctly](#do-logging-correctly)
- [Handle exceptions properly](#handle-exceptions-properly)

### GZIP-Komprimierung verwenden

Mit der GZIP-Komprimierung lässt sich die Größe des Antworthauptteils deutlich verringern und somit die Geschwindigkeit der Webanwendung erhöhen. Verwenden Sie die Middleware [compression](https://www.npmjs.com/package/compression) für die GZIP-Komprimierung in Ihrer Express-Anwendung. Beispiel:

```js
const compression = require('compression')
const express = require('express')
const app = express()

app.use(compression())
```

Bei Websites mit hohem Datenverkehr in Produktionsumgebungen lässt sich die Komprimierung am besten installieren, indem sie auf Reverse Proxy-Ebene implementiert wird (siehe [Reverse Proxy verwenden](#proxy)). In diesem Fall wird die Middleware "compression" nicht benötigt. Details zur Aktivierung der GZIP-Komprimierung in Nginx siehe [Modul ngx_http_gzip_module](http://nginx.org/en/docs/http/ngx_http_gzip_module.html) in der Nginx-Dokumentation.

### Keine synchronen Funktionen verwenden

Synchrone Funktionen und Methoden belasten den Ausführungsprozess, bis sie zurückgegeben werden. Ein einzelner Aufruf für eine synchrone Funktion kann in wenigen Mikrosekunden oder Millisekunden zurückgegeben werden. Bei Websites mit hohem Datenverkehr hingegen summieren sich diese Aufrufe und verringern die Leistung der Anwendung. Sie sollten also deren Verwendung in Produktionsumgebungen vermeiden.

Auch wenn Node und viele andere Module synchrone und asynchrone Versionen ihrer Funktionen bieten, sollten Sie in Produktionsumgebungen immer die asynchrone Version verwenden. Nur beim ersten Systemstart ist die Verwendung einer synchronen Funktion begründet.

You can use the `--trace-sync-io` command-line flag to print a warning and a stack trace whenever your application uses a synchronous API. Auch wenn Sie diese natürlich nicht in der Produktionsumgebung verwenden werden, soll dadurch trotzdem sichergestellt werden, dass Ihr Code in der Produktionsumgebung eingesetzt werden kann. Weitere Informationen hierzu siehe [Wöchentliches Update für io.js 2.1.0](https://nodejs.org/en/blog/weekly-updates/weekly-update.2015-05-22/#2-1-0).

### Do logging correctly

Im Allgemeinen gibt es für die Protokollierung Ihrer Anwendung zwei Gründe: 1) Debugging und 2) Protokollierung von Anwendungsaktivitäten (im Wesentlichen alles andere, außer Debugging). Die Verwendung von`console.log()` oder `console.err()` zur Ausgabe von Protokollnachrichten an das Terminal ist in der Entwicklung gängige Praxis. But [these functions are synchronous](https://nodejs.org/api/console.html#console) when the destination is a terminal or a file, so they are not suitable for production, unless you pipe the output to another program.

#### Für Debuggingzwecke

Wenn Sie die Protokollierung für Debuggingzwecke nutzen, sollten Sie statt `console.log()` besser ein spezielles Debuggingmodul wie [debug](https://www.npmjs.com/package/debug) verwenden. Mit einem solchen Modul können Sie über die Umgebungsvariable DEBUG steuern, welche Debugnachrichten an `console.err()` gesendet werden (falls vorhanden). Um Ihre Anwendung rein asynchron zu halten, können Sie trotzdem `console.err()` per Pipe zu einem anderen Programm umleiten. Sie nehmen dann aber kein Debugging in der Produktionsumgebung vor, richtig?

#### Für Anwendungsaktivitäten

If you're logging app activity (for example, tracking traffic or API calls), instead of using `console.log()`, use a logging library like [Pino](https://www.npmjs.com/package/pino), which is the fastest and most efficient option available.

### Ausnahmebedingungen ordnungsgemäß handhaben

Node-Anwendungen stürzen ab, wenn eine nicht abgefangene Ausnahmebedingung vorkommt. Wenn diese Ausnahmebedingungen nicht behandelt und entsprechende Maßnahmen eingeleitet werden, stürzt Ihre Express-Anwendung ab und geht offline. Wenn Sie dem nachfolgenden Rat in [Sicherstellen, dass Ihre Anwendung automatisch neu gestartet wird](#restart) folgen, wird Ihre Anwendung nach einem Absturz wiederhergestellt. Glücklicherweise haben Express-Anwendungen nur eine kurze Initialisierungszeit. Nevertheless, you want to avoid crashing in the first place, and to do that, you need to handle exceptions properly.

Mit folgenden Verfahren stellen Sie sicher, dass alle Ausnahmebedingungen gehandhabt werden:

- ["try-catch" verwenden](#try-catch)
- ["Promises" verwenden](#promises)

Um näher auf diese Themen eingehen zu können, müssen Sie sich ein grundlegendes Verständnis der Fehlerbehandlung in Node und Express aneignen: Verwendung von Error-first-Callbacks und Propagieren von Fehlern in Middleware. Node verwendet die Konvention "Error-first-Callback" für die Rückgabe von Fehlern von asynchronen Funktionen, bei denen der erste Parameter zur Callback-Funktion das Fehlerobjekt ist, gefolgt von Ergebnisdaten in den nachfolgenden Parametern. Um anzugeben, dass kein Fehler vorliegt, müssen Sie "null" als ersten Parameter übergeben. Die Callback-Funktion muss der Konvention "Error-first-Callback" folgen, um den Fehler sinnvoll bearbeiten zu können. In Express hat sich bewährt, die Funktion "next()" zu verwenden, um Fehler über die Middleware-Chain zu propagieren.

Weitere Informationen zu den Grundlagen der Fehlerbehandlung siehe:

- [Fehlerbehandlung in Node.js](https://www.tritondatacenter.com/node-js/production/design/errors)

#### "try-catch" verwenden

"try-catch" ist ein JavaScript-Sprachkonstrukt, mit dem Sie Ausnahmebedingungen in synchronem Code abfangen können. Verwenden Sie "try-catch" beispielsweise, um JSON-Parsing-Fehler wie unten gezeigt zu bearbeiten.

Dies ist ein Beispiel zur Verwendung von "try-catch", um eine potenzielle "process-crashing"-Ausnahmebedingung zu handhaben.
Diese Middlewarefunktion akzeptiert einen Abfragefeldparameter mit dem Namen "params", der ein JSON-Objekt ist.

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

"try-catch" funktioniert jedoch nur in synchronem Code. Da die Node-Plattform primär asynchron ist (insbesondere in einer Produktionsumgebung), lassen sich mit "try-catch" nicht besonders viele Ausnahmebedingungen abfangen.

#### "Promises" verwenden

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

#### What not to do

Sie sollten _auf keinen_ Fall per Listener das Ereignis `uncaughtException` überwachen, das ausgegeben wird, wenn eine Ausnahmebedingung bis zurück zur Ereignisschleife bestehen bleibt. Durch das Hinzufügen eines Ereignislisteners für `uncaughtException` verändert sich das Standardverhalten des Prozesses, über das eine Ausnahmebedingung festgestellt wird. Das Ausführen einer Anwendung nach einer nicht abgefangenen Ausnahmebedingung ist aber eine durchaus riskante Vorgehensweise und wird nicht empfohlen, da der Prozessstatus störanfällig und unvorhersehbar wird.

Außerdem wird die Verwendung von `uncaughtException` offiziell als [grobes Vorgehen](https://nodejs.org/api/process.html#process_event_uncaughtexception) angesehen, sodass es den [Vorschlag](https://github.com/nodejs/node-v0.x-archive/issues/2582) gibt, die Funktion aus dem Kern zu entfernen. Das Überwachen von `uncaughtException` per Listener ist also keine gute Idee. Daher empfehlen wir Dinge wie Mehrfachprozesse und Supervisoren: Ein Absturz und anschließender Neustart ist häufig die zuverlässigste Art der Fehlerbehebung.

Zudem empfehlen wir, [domains](https://nodejs.org/api/domain.html) nicht zu verwenden. Mit diesem Modul, das zudem veraltet ist, lässt sich das Problem in der Regel nicht lösen.

## Things to do in your environment / setup {#in-environment}

Dies sind einige Beispiele für Maßnahmen, die Sie an Ihrer Systemumgebung vornehmen können, um die Anwendungsleistung zu verbessern:

- NODE_ENV auf "production" festlegen
- Automatischen Neustart Ihrer Anwendung sicherstellen
- Anwendung in einem Cluster ausführen
- Anforderungsergebnisse im Cache speichern
- Load Balancer verwenden
- Reverse Proxy verwenden

### NODE_ENV auf "production" festlegen

In der Umgebungsvariablen NODE_ENV wird die Umgebung angegeben, in der eine Anwendung ausgeführt wird (in der Regel ist dies die Entwicklungs- oder Produktionsumgebung). One of the simplest things you can do to improve performance is to set NODE_ENV to `production`.

Durch das Festlegen von NODE_ENV auf "production" führt Express Folgendes aus:

- Speichern von Anzeigevorlagen im Cache.
- Speichern von CSS-Dateien, die aus CSS-Erweiterungen generiert wurden, im Cache.
- Generieren von weniger ausführlichen Fehlernachrichten.

[Tests indicate](https://www.dynatrace.com/news/blog/the-drastic-effects-of-omitting-node-env-in-your-express-js-applications/) that just doing this can improve app performance by a factor of three!

Wenn Sie umgebungsspezifischen Code schreiben müssen, können Sie den Wert von NODE_ENV mit `process.env.NODE_ENV` überprüfen. Beachten Sie, dass die Überprüfung des Werts seiner Umgebungsvariablen eine leistungsbezogene Penalisierung nach sich zieht.

In einer Entwicklungsumgebung wird die Umgebungsvariable in der Regel in Ihrer interaktiven Shell festgelegt, indem Sie beispielsweise `export` oder Ihre Datei `.bash_profile` verwenden. But in general, you shouldn't do that on a production server; instead, use your OS's init system (systemd). Der nächste Abschnitt enthält weitere Details zur Verwendung des Init-Systems im Allgemeinen. Die Festlegung von NODE_ENV ist jedoch für das Leistungsverhalten so wichtig (und so einfach durchzuführen), dass hier besonders darauf eingegangen wird.

Verwenden Sie bei systemd die Anweisung `Environment` in Ihrer Einheitendatei. Beispiel:

```sh
# /etc/systemd/system/myservice.service
Environment=NODE_ENV=production
```

For more information, see [Using Environment Variables In systemd Units](https://www.flatcar.org/docs/latest/setup/systemd/environment-variables/).

### Automatischen Neustart Ihrer Anwendung sicherstellen

In der Produktionsumgebung sollte die Anwendung nie offline sein. Das bedeutet, dass Sie sicherstellen müssen, dass die Anwendung bei einem Absturz der Anwendung oder des Servers immer wieder neu gestartet wird. Auch wenn man hofft, das keines dieser Ereignisse jemals eintritt, muss man doch mit beiden Möglichkeiten rechnen und:

- einen Prozessmanager verwenden, um die Anwendung (und Node) bei einem Absturz neu zu starten.
- das Init-System Ihres Betriebssystems verwenden, um den Prozessmanager bei einem Absturz des Betriebssystems neu zu starten. Außerdem kann das Init-System auch ohne einen Prozessmanager verwendet werden.

Node-Anwendungen stürzen ab, wenn eine nicht abgefangene Ausnahmebedingung auftritt. Als Erstes müssen Sie in einem solchen Fall sicherstellen, dass Ihre Anwendung ausreichend getestet wurde und in der Lage ist, alle Ausnahmebedingungen zu handhaben (weitere Informationen siehe [Ausnahmebedingungen ordnungsgemäß handhaben](#exceptions)). Die sicherste Maßnahme ist jedoch, einen Mechanismus zu implementieren, über den bei einem Absturz der Anwendung ein automatischer Neustart der Anwendung ausgeführt wird.

#### Prozessmanager verwenden

In Entwicklungumgebungen wird die Anwendung einfach über die Befehlszeile mit `node server.js` oder einer vergleichbaren Datei gestartet. In der Produktionsumgebung hingegen ist durch diese Vorgehensweise die Katastrophe bereits vorprogrammiert. Wenn die Anwendung abstürzt, ist sie solange offline, bis Sie sie erneut starten. Um sicherzustellen, dass Ihre Anwendung nach einem Absturz neu gestartet wird, sollten Sie einen Prozessmanager verwenden. Ein Prozessmanager ist ein "Container" für Anwendungen, der die Bereitstellung erleichtert, eine hohe Verfügbarkeit sicherstellt und  die Verwaltung der Anwendung zur Laufzeit ermöglicht.

Neben einem Neustart der Anwendung nach einem Absturz bietet ein Prozessmanager noch weitere Möglichkeiten:

- Einblicke in die Laufzeitleistung und die Ressourcennutzung
- Dynamische Änderung der Einstellungen zur Verbesserung des Leistungsverhaltens
- Control clustering (pm2).

Historically, it was popular to use a Node.js process manager like [PM2](https://github.com/Unitech/pm2). See their documentation if you wish to do this. However, we recommend using your init system for process management.

#### Init-System verwenden

Als nächste Ebene der Zuverlässigkeit müssen Sie sicherstellen, dass Ihre Anwendung bei einem Serverneustart neu gestartet wird. Systeme können immer wieder aus verschiedenen Gründen abstürzen. Um sicherzustellen, dass Ihre Anwendung bei einem Serverabsturz neu gestartet wird, können Sie das in Ihr Betriebssystem integrierte Init-System verwenden. The main init system in use today is [systemd](https://wiki.debian.org/systemd).

Es gibt zwei Möglichkeiten, Init-Systeme mit Ihrer Express-Anwendung zu verwenden:

- Ausführung Ihrer Anwendung in einem Prozessmanager und Installation des Prozessmanagers als Service mit dem Init-System. Der Prozessmanager wird neu gestartet, wenn Ihre Anwendung abstürzt. Dies ist die empfohlene Vorgehensweise.
- Ausführung Ihrer Anwendung (und von Node) direkt mit dem Init-System. Diese Vorgehensweise ist zwar etwas einfacher, Sie profitieren jedoch nicht von den zusätzlichen Vorteilen des Einsatzes eines Prozessmanagers.

##### systemd

"systemd" ist ein Linux-System und Service-Manager. Die meisten wichtigen Linux-Distributionen haben "systemd" als Init-Standardsystem übernommen.

Eine "systemd"-Servicekonfigurationsdatei wird als _Einheitendatei_ bezeichnet, die die Endung ".service" hat. Dies ist ein Beispiel für eine Einheitendatei zur direkten Verwaltung einer Node-Anwendung (ersetzen Sie den Text in Fettdruck durch Werte für Ihr System und Ihre Anwendung): Replace the values enclosed in `<angle brackets>` for your system and app:

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

Weitere Informationen zu "systemd" siehe [systemd-Referenz (Man-Page)](http://www.freedesktop.org/software/systemd/man/systemd.unit.html).

### Anwendung in einem Cluster ausführen

In einem Multi-Core-System können Sie die Leistung einer Node-Anwendung mehrmals erhöhen, indem Sie einen Cluster von Prozessen starten. Ein Cluster führt mehrere Instanzen der Anwendung aus, idealerweise eine Instanz auf jedem CPU-Core.

![Balancing between application instances using the cluster API](/images/clustering.png)

Wichtig. Da die Anwendungsinstanzen als separate Prozesse ausgeführt werden, nutzen sie nicht dieselbe Hauptspeicherkapazität gemeinsam. Das heißt, Objekte befinden sich für jede Instanz der Anwendung auf lokaler Ebene. Daher kann der Status im Anwendungscode nicht beibehalten werden. Sie können jedoch einen speicherinternen Datenspeicher wie [Redis](http://redis.io/) verwenden, um sitzungsrelevante Daten und Statusinformationen zu speichern. Diese Einschränkung trifft im Wesentlichen auf alle Formen der horizontalen Skalierung zu, unabhängig davon, ob es sich um Clustering mit mehreren Prozessen oder mehreren physischen Servern handelt.

Bei in Gruppen zusammengefassten Anwendungen (geclusterte Anwendungen) können Verarbeitungsprozesse einzeln ausfallen, ohne dass sich dies auf die restlichen Prozesse auswirkt. Neben den Leistungsvorteilen ist die Fehlerisolierung ein weiterer Grund, einen Cluster von Anwendungsprozessen auszuführen. Wenn ein Verarbeitungsprozess abstürzt, müssen Sie sicherstellen, dass das Ereignis protokolliert und ein neuer Prozess mithilfe von "cluster.fork()" gestartet wird.

#### Clustermodule von Node verwenden

Clustering is made possible with Node's [cluster module](https://nodejs.org/api/cluster.html). Dadurch wird ein Masterprozess eingeleitet, um Verarbeitungsprozesse zu starten und eingehende Verbindungen auf die Verarbeitungsprozesse zu verteilen.

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

### Anforderungsergebnisse im Cache speichern

Eine weitere Strategie zur Verbesserung des Leistungsverhaltens in Produktionsumgebungen ist das Speichern von Anforderungergebnissen im Cache. Ihre Anwendung muss also diese Operation nicht wiederholt ausführen, um dieselbe Anforderung wiederholt zu bedienen.

Use a caching server like [Varnish](https://www.varnish-cache.org/) or [Nginx](https://blog.nginx.org/blog/nginx-caching-guide) (see also [Nginx Caching](https://serversforhackers.com/nginx-caching/)) to greatly improve the speed and performance of your app.

### Load Balancer verwenden

Unabhängig davon, wie gut eine Anwendung optimiert wurde, kann eine Einzelinstanz nur eine begrenzte Arbeitslast oder einen begrenzten Datenverkehr handhaben. Eine Möglichkeit, eine Anwendung zu skalieren, ist die Ausführung mehrerer Instanzen dieser Anwendung und die Verteilung des Datenverkehrs über eine Lastausgleichsfunktion (Load Balancer) vorzunehmen. Die Einrichtung eines solchen Load Balancer kann helfen, Leistung und Geschwindigkeit Ihrer Anwendung zu verbessern.

Ein Load Balancer ist in der Regel ein Reverse Proxy, der den Datenverkehr zu und von mehreren Anwendungsinstanzen und Servern koordiniert. You can easily set up a load balancer for your app by using [Nginx](https://nginx.org/en/docs/http/load_balancing.html) or [HAProxy](https://www.digitalocean.com/community/tutorials/an-introduction-to-haproxy-and-load-balancing-concepts).

Bei einer solchen Lastverteilung müssen Sie sicherstellen, dass Anforderungen, die einer bestimmten Sitzungs-ID zugeordnet sind, mit dem Prozess verbunden sind, von dem sie ursprünglich stammen. Dies wird auch als _Sitzungsaffinität_ oder _Affine Sitzungen_ bezeichnet und kann durch den obigen Vorschlag, einen Datenspeicher wie Redis für Sitzungsdaten zu verwenden (je nach Anwendung), umgesetzt werden. Eine Beschreibung hierzu siehe [Mehrere Knoten verwenden](https://socket.io/docs/v4/using-multiple-nodes/).

### Reverse Proxy verwenden

Ein Reverse Proxy befindet sich vor einer Webanwendung und führt Unterstützungsoperationen für die Anforderungen aus (außer das Weiterleiten von Anforderungen an die Anwendung). Fehlerseiten, Komprimierungen und Caching bearbeiten, Dateien bereitstellen und Lastverteilungen vornehmen.

Durch die Übergabe von Tasks, die keine Kenntnis des Anwendungsstatus erfordern, an einen Reverse Proxy muss Express keine speziellen Anwendungstasks mehr ausführen. For this reason, it is recommended to run Express behind a reverse proxy like [Nginx](https://www.nginx.org/) or [HAProxy](https://www.haproxy.org/) in production.
