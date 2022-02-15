---
layout: page
title: Leistungsspezifische Best Practices für Express-Anwendungen in Produktionsumgebungen
menu: advanced
lang: de
---

# Best Practices in Produktionsumgebungen: Leistung und Zuverlässigkeit

## Überblick

In diesem Beitrag werden Best Practices in Bezug auf Leistung und Zuverlässigkeit für Express-Anwendungen behandelt, die in der Produktionsumgebung bereitgestellt werden.

Dieses Thema gehört sicherlich zur "DevOps"-Welt und deckt traditionelle Entwicklungs- und Betriebsprozesse ab. Entsprechend sind die Informationen hier in zwei Teile unterteilt:

* [Empfehlungen für Maßnahmen an Ihrem Code](#code) (Entwicklung).
* [Empfehlungen für Maßnahmen an Ihrer Umgebung/Ihrem Setup](#env) (Betrieb).

<a name="code"></a>

## Empfehlungen für Maßnahmen an Ihrem Code

Dies sind einige Beispiele für Maßnahmen, die Sie an Ihrem Code vornehmen können, um die Anwendungsleistung zu verbessern:

* GZIP-Komprimierung verwenden
* Keine synchronen Funktionen verwenden
* Für statische Dateien Middleware verwenden
* Auf ordnungsgemäße Protokollierung achten
* Ausnahmebedingungen ordnungsgemäß handhaben

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

Wenn Sie Node.js 4.0 und höher oder io.js 2.1.0 und höher verwenden, können Sie über das Befehlszeilenflag `--trace-sync-io` eine Warnung und einen Stack-Trace ausgeben, wenn Ihre Anwendung eine synchrone API verwendet. Auch wenn Sie diese natürlich nicht in der Produktionsumgebung verwenden werden, soll dadurch trotzdem sichergestellt werden, dass Ihr Code in der Produktionsumgebung eingesetzt werden kann. Weitere Informationen hierzu siehe [Wöchentliches Update für io.js 2.1.0](https://nodejs.org/en/blog/weekly-updates/weekly-update.2015-05-22/#2-1-0).

### Für statische Dateien Middleware verwenden

Bei der Entwicklung können Sie [res.sendFile()](/{{ page.lang }}/4x/api.html#res.sendFile) für statische Dateien verwenden. Dies gilt jedoch nicht für die Produktionsumgebung, da diese Funktion bei jeder Dateianforderung aus dem Dateisystem lesen muss. Dadurch kommt es zu deutlichen Latenzen, die sich negativ auf die Gesamtleistung der Anwendung auswirken. Beachten Sie, dass `res.sendFile()` *nicht* mit dem Systemaufruf [sendfile](http://linux.die.net/man/2/sendfile) implementiert wird, wodurch dieser deutlich effizienter wäre.

Verwenden Sie stattdessen die Middleware [serve-static](https://www.npmjs.com/package/serve-static) (oder etwas Vergleichbares), die für die Bereitstellung von Dateien für Express-Anwendungen optimiert ist.

Die bessere Option wäre, für statische Dateien einen Reverse Proxy zu verwenden. Weitere Informationen siehe [Reverse Proxy verwenden](#proxy).

### Auf ordnungsgemäße Protokollierung achten

Im Allgemeinen gibt es für die Protokollierung Ihrer Anwendung zwei Gründe: 1) Debugging und 2) Protokollierung von Anwendungsaktivitäten (im Wesentlichen alles andere, außer Debugging). Die Verwendung von`console.log()` oder `console.err()` zur Ausgabe von Protokollnachrichten an das Terminal ist in der Entwicklung gängige Praxis. [Diese Funktionen sind jedoch synchron](https://nodejs.org/api/console.html#console_console_1), wenn das Ziel ein Terminal oder eine Datei ist. Sie sind also für Produktionsumgebungen nicht geeignet, es sei denn, Sie leiten die Ausgabe per Pipe zu einem anderen Programm um.

#### Für Debuggingzwecke

Wenn Sie die Protokollierung für Debuggingzwecke nutzen, sollten Sie statt `console.log()` besser ein spezielles Debuggingmodul wie [debug](https://www.npmjs.com/package/debug) verwenden. Mit einem solchen Modul können Sie über die Umgebungsvariable DEBUG steuern, welche Debugnachrichten an `console.err()` gesendet werden (falls vorhanden). Um Ihre Anwendung rein asynchron zu halten, können Sie trotzdem `console.err()` per Pipe zu einem anderen Programm umleiten. Sie nehmen dann aber kein Debugging in der Produktionsumgebung vor, richtig?

#### Für Anwendungsaktivitäten

Wenn Sie Anwendungsaktivitäten protokollieren (z. B. den Datenverkehr oder API-Aufrufe aufzeichnen), sollten Sie statt `console.log()` eine Protokollierungsbibliothek wie [Winston](https://www.npmjs.com/package/winston) oder [Bunyan](https://www.npmjs.com/package/bunyan) verwenden. Einen ausführlichen Vergleich dieser beiden Bibliotheken finden Sie im StrongLoop-Blogbeitrag [Vergleich von Winston und Bunyan für die Node.js-Protokollierung](https://strongloop.com/strongblog/compare-node-js-logging-winston-bunyan/).

<a name="exceptions"></a>

### Ausnahmebedingungen ordnungsgemäß handhaben

Node-Anwendungen stürzen ab, wenn eine nicht abgefangene Ausnahmebedingung vorkommt. Wenn diese Ausnahmebedingungen nicht behandelt und entsprechende Maßnahmen eingeleitet werden, stürzt Ihre Express-Anwendung ab und geht offline. Wenn Sie dem nachfolgenden Rat in [Sicherstellen, dass Ihre Anwendung automatisch neu gestartet wird](#restart) folgen, wird Ihre Anwendung nach einem Absturz wiederhergestellt. Glücklicherweise haben Express-Anwendungen nur eine kurze Initialisierungszeit. Nichtsdestotrotz sollten Sie in erster Linie solche Abstürze vermeiden. Und hierzu müssen Sie Ausnahmebedingungen ordnungsgemäß handhaben.

Mit folgenden Verfahren stellen Sie sicher, dass alle Ausnahmebedingungen gehandhabt werden:

* ["try-catch" verwenden](#try-catch)
* ["Promises" verwenden](#promises)

Um näher auf diese Themen eingehen zu können, müssen Sie sich ein grundlegendes Verständnis der Fehlerbehandlung in Node und Express aneignen: Verwendung von Error-first-Callbacks und Propagieren von Fehlern in Middleware. Node verwendet die Konvention "Error-first-Callback" für die Rückgabe von Fehlern von asynchronen Funktionen, bei denen der erste Parameter zur Callback-Funktion das Fehlerobjekt ist, gefolgt von Ergebnisdaten in den nachfolgenden Parametern. Um anzugeben, dass kein Fehler vorliegt, müssen Sie "null" als ersten Parameter übergeben. Die Callback-Funktion muss der Konvention "Error-first-Callback" folgen, um den Fehler sinnvoll bearbeiten zu können. In Express hat sich bewährt, die Funktion "next()" zu verwenden, um Fehler über die Middleware-Chain zu propagieren.

Weitere Informationen zu den Grundlagen der Fehlerbehandlung siehe:

* [Fehlerbehandlung in Node.js](https://www.joyent.com/developers/node/design/errors)
* [Aufbau leistungsfähiger Node-Anwendungen: Fehlerbehandlung](https://strongloop.com/strongblog/robust-node-applications-error-handling/) (StrongLoop-Blog)

#### Was Sie unterlassen sollten

Sie sollten *auf keinen* Fall per Listener das Ereignis `uncaughtException` überwachen, das ausgegeben wird, wenn eine Ausnahmebedingung bis zurück zur Ereignisschleife bestehen bleibt. Durch das Hinzufügen eines Ereignislisteners für `uncaughtException` verändert sich das Standardverhalten des Prozesses, über das eine Ausnahmebedingung festgestellt wird. Der Prozess läuft dann trotz der Ausnahmebedingung weiter. Dies mag sich vielleicht gut anhören, um einem Absturz Ihrer Anwendung vorzubeugen. Das Ausführen einer Anwendung nach einer nicht abgefangenen Ausnahmebedingung ist aber eine durchaus riskante Vorgehensweise und wird nicht empfohlen, da der Prozessstatus störanfällig und unvorhersehbar wird.

Außerdem wird die Verwendung von `uncaughtException` offiziell als [grobes Vorgehen](https://nodejs.org/api/process.html#process_event_uncaughtexception) angesehen, sodass es den [Vorschlag](https://github.com/nodejs/node-v0.x-archive/issues/2582) gibt, die Funktion aus dem Kern zu entfernen. Das Überwachen von `uncaughtException` per Listener ist also keine gute Idee. Daher empfehlen wir Dinge wie Mehrfachprozesse und Supervisoren: Ein Absturz und anschließender Neustart ist häufig die zuverlässigste Art der Fehlerbehebung.

Zudem empfehlen wir, [domains](https://nodejs.org/api/domain.html) nicht zu verwenden. Mit diesem Modul, das zudem veraltet ist, lässt sich das Problem in der Regel nicht lösen.

<a name="try-catch"></a>

#### "try-catch" verwenden

"try-catch" ist ein JavaScript-Sprachkonstrukt, mit dem Sie Ausnahmebedingungen in synchronem Code abfangen können. Verwenden Sie "try-catch" beispielsweise, um JSON-Parsing-Fehler wie unten gezeigt zu bearbeiten.

Verwenden Sie ein Tool wie [JSHint](http://jshint.com/) oder [JSLint](http://www.jslint.com/), um implizite Ausnahmebedingungen wie [Referenzfehler bei nicht definierten Variablen](http://www.jshint.com/docs/options/#undef) zu finden.

Dies ist ein Beispiel zur Verwendung von "try-catch", um eine potenzielle "process-crashing"-Ausnahmebedingung zu handhaben. Diese Middlewarefunktion akzeptiert einen Abfragefeldparameter mit dem Namen "params", der ein JSON-Objekt ist.

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

<a name="promises"></a>

#### "Promises" verwenden

Mit "Promises" werden alle Ausnahmebedingungen (explizite und implizite) in asynchronen Codeblöcken gehandhabt, die `then()` verwenden. Sie müssen nur `.catch(next)` am Ende der Promises-Ketten hinzufügen. Beispiel:

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

Jetzt werden alle asynchronen und synchronen Fehler zur Middleware "error" propagiert.

Es gibt jedoch zwei Vorbehalte:

1.  Der gesamte asynchrone Code muss "Promises" zurückgeben (außer Emitter). Wenn eine bestimmte Bibliothek keine "Promises" zurückgibt, müssen Sie das Basisobjekt mit einer Helper-Funktion wie [Bluebird.promisifyAll()](http://bluebirdjs.com/docs/api/promise.promisifyall.html) konvertieren.
2.  Ereignisemitter (wie Streams) können nach wie vor nicht abgefangene Ausnahmebedingungen verursachen. Sie müssen also sicherstellen, dass Sie das Fehlerereignis ordnungsgemäß handhaben. Beispiel:

```js
const wrap = fn => (...args) => fn(...args).catch(args[2])

app.get('/', wrap(async (req, res, next) => {
  const company = await getCompanyById(req.query.id)
  const stream = getLogoStreamById(company.id)
  stream.on('error', next).pipe(res)
}))
```

Weitere Informationen zur Fehlerbehandlung mithilfe von "Promises" siehe:

* [Asynchrone Fehlerbehandlung in Express mit "Promises", Generatoren und ES7](https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/)
* ["Promises" in Node.js mit Q – eine Alternative zu Callbacks](https://strongloop.com/strongblog/promises-in-node-js-with-q-an-alternative-to-callbacks/)

<a name="env"></a>

## Empfehlungen für Maßnahmen an Ihrer Umgebung/Ihrem Setup

Dies sind einige Beispiele für Maßnahmen, die Sie an Ihrer Systemumgebung vornehmen können, um die Anwendungsleistung zu verbessern:

* NODE_ENV auf "production" festlegen
* Automatischen Neustart Ihrer Anwendung sicherstellen
* Anwendung in einem Cluster ausführen
* Anforderungsergebnisse im Cache speichern
* Load Balancer verwenden
* Reverse Proxy verwenden

### NODE_ENV auf "production" festlegen

In der Umgebungsvariablen NODE_ENV wird die Umgebung angegeben, in der eine Anwendung ausgeführt wird (in der Regel ist dies die Entwicklungs- oder Produktionsumgebung). Am einfachsten lässt sich die Leistung verbessern, indem NODE_ENV auf "production" festgelegt wird.

Durch das Festlegen von NODE_ENV auf "production" führt Express Folgendes aus:

* Speichern von Anzeigevorlagen im Cache.
* Speichern von CSS-Dateien, die aus CSS-Erweiterungen generiert wurden, im Cache.
* Generieren von weniger ausführlichen Fehlernachrichten.

[Tests deuten darauf hin](http://apmblog.dynatrace.com/2015/07/22/the-drastic-effects-of-omitting-node_env-in-your-express-js-applications/), dass alleine dadurch die Anwendungsleistung um den Faktor 3 verbessert werden kann!

Wenn Sie umgebungsspezifischen Code schreiben müssen, können Sie den Wert von NODE_ENV mit `process.env.NODE_ENV` überprüfen. Beachten Sie, dass die Überprüfung des Werts seiner Umgebungsvariablen eine leistungsbezogene Penalisierung nach sich zieht. Sie sollten also sehr sparsam damit umgehen.

In einer Entwicklungsumgebung wird die Umgebungsvariable in der Regel in Ihrer interaktiven Shell festgelegt, indem Sie beispielsweise `export` oder Ihre Datei `.bash_profile` verwenden. Im Allgemeinen sollten Sie dies nicht auf dem Produktionsserver vornehmen. Verwenden Sie stattdessen das Init-System (systemd oder Upstart) Ihres Betriebssystems. Der nächste Abschnitt enthält weitere Details zur Verwendung des Init-Systems im Allgemeinen. Die Festlegung von NODE_ENV ist jedoch für das Leistungsverhalten so wichtig (und so einfach durchzuführen), dass hier besonders darauf eingegangen wird.

Verwenden Sie bei Upstart das Schlüsselwort `env` in Ihrer Jobdatei. Beispiel:

<pre>
<code class="language-sh" translate="no">
# /etc/init/env.conf
 env NODE_ENV=production
</code>
</pre>

Weitere Informationen hierzu siehe [Upstart Intro, Cookbook and Best Practices](http://upstart.ubuntu.com/cookbook/#environment-variables).

Verwenden Sie bei systemd die Anweisung `Environment` in Ihrer Einheitendatei. Beispiel:

<pre>
<code class="language-sh" translate="no">
# /etc/systemd/system/myservice.service
Environment=NODE_ENV=production
</code>
</pre>

Weitere Informationen siehe [Umgebungsvariablen in systemd-Einheiten verwenden](https://coreos.com/os/docs/latest/using-environment-variables-in-systemd-units.html).

Wenn Sie StrongLoop Process Manager verwenden, können Sie auch die [Umgebungsvariable festlegen, wenn Sie StrongLoop Process Manager als Service installieren](https://docs.strongloop.com/display/SLC/Setting+up+a+production+host#Settingupaproductionhost-Setenvironmentvariables).

### Automatischen Neustart Ihrer Anwendung sicherstellen

In der Produktionsumgebung sollte die Anwendung nie offline sein. Das bedeutet, dass Sie sicherstellen müssen, dass die Anwendung bei einem Absturz der Anwendung oder des Servers immer wieder neu gestartet wird. Auch wenn man hofft, das keines dieser Ereignisse jemals eintritt, muss man doch mit beiden Möglichkeiten rechnen und:

* einen Prozessmanager verwenden, um die Anwendung (und Node) bei einem Absturz neu zu starten.
* das Init-System Ihres Betriebssystems verwenden, um den Prozessmanager bei einem Absturz des Betriebssystems neu zu starten. Außerdem kann das Init-System auch ohne einen Prozessmanager verwendet werden.

Node-Anwendungen stürzen ab, wenn eine nicht abgefangene Ausnahmebedingung auftritt. Als Erstes müssen Sie in einem solchen Fall sicherstellen, dass Ihre Anwendung ausreichend getestet wurde und in der Lage ist, alle Ausnahmebedingungen zu handhaben (weitere Informationen siehe [Ausnahmebedingungen ordnungsgemäß handhaben](#exceptions)). Die sicherste Maßnahme ist jedoch, einen Mechanismus zu implementieren, über den bei einem Absturz der Anwendung ein automatischer Neustart der Anwendung ausgeführt wird.

#### Prozessmanager verwenden

In Entwicklungumgebungen wird die Anwendung einfach über die Befehlszeile mit `node server.js` oder einer vergleichbaren Datei gestartet. In der Produktionsumgebung hingegen ist durch diese Vorgehensweise die Katastrophe bereits vorprogrammiert. Wenn die Anwendung abstürzt, ist sie solange offline, bis Sie sie erneut starten. Um sicherzustellen, dass Ihre Anwendung nach einem Absturz neu gestartet wird, sollten Sie einen Prozessmanager verwenden. Ein Prozessmanager ist ein "Container" für Anwendungen, der die Bereitstellung erleichtert, eine hohe Verfügbarkeit sicherstellt und  die Verwaltung der Anwendung zur Laufzeit ermöglicht.

Neben einem Neustart der Anwendung nach einem Absturz bietet ein Prozessmanager noch weitere Möglichkeiten:

* Einblicke in die Laufzeitleistung und die Ressourcennutzung
* Dynamische Änderung der Einstellungen zur Verbesserung des Leistungsverhaltens
* Steuerung des Clustering (StrongLoop PM und PM2)

Die gängigsten Prozessmanager für Node sind:

* [StrongLoop Process Manager](http://strong-pm.io/)
* [PM2](https://github.com/Unitech/pm2)
* [Forever](https://www.npmjs.com/package/forever)

Einen Vergleich der Features und Funktionen dieser Prozessmanager finden Sie hier: [http://strong-pm.io/compare/](http://strong-pm.io/compare/). Eine ausführliche Einführung in diese drei Prozessmanager finden Sie hier: [Prozessmanager für Express-Anwendungen](/{{ page.lang }}/advanced/pm.html).

Die Verwendung eines dieser Prozessmanager reicht aus, um Ihre Anwendung betriebsbereit zu halten, selbst wenn sie hin und wieder abstürzt.

StrongLoop PM verfügt jedoch über zahlreiche Features und Funktionen, die sich speziell auf Implementierungen in der Produktionsumgebung beziehen. Sie können diesen Prozessmanager und die zugehörigen StrongLoop-Tools für folgende Zwecke verwenden:

* Lokales Erstellen und Packen Ihrer Anwendung mit anschließender sicherer Bereitstellung auf Ihrem Produktionssystem
* Automatischer Neustart Ihrer Anwendung nach einem Absturz aus irgendeinem Grund
* Verwaltung Ihrer Cluster über Fernzugriff
* Anzeige von CPU-Profilen und Heapspeichermomentaufnahmen (Heap-Snapshots) zur Optimierung der Leistung und Diagnose von Speicherlecks
* Anzeige von Leistungsmessdaten für Ihre Anwendung
* Einfache Skalierung auf mehrere Hosts mit integrierter Steuerung für Nginx Load Balancer

Wie unten beschrieben, erfolgt ein automatischer Neustart beim Systemwiederanlauf, wenn Sie StrongLoop Process Manager über Ihr Init-System als Betriebssystemservice installieren. Dadurch bleiben Ihre Anwendungsprozesse und Cluster dauerhaft betriebsbereit.

#### Init-System verwenden

Als nächste Ebene der Zuverlässigkeit müssen Sie sicherstellen, dass Ihre Anwendung bei einem Serverneustart neu gestartet wird. Systeme können immer wieder aus verschiedenen Gründen abstürzen. Um sicherzustellen, dass Ihre Anwendung bei einem Serverabsturz neu gestartet wird, können Sie das in Ihr Betriebssystem integrierte Init-System verwenden. Die beiden wichtigsten Init-Systeme sind aktuell [systemd](https://wiki.debian.org/systemd) und [Upstart](http://upstart.ubuntu.com/).

Es gibt zwei Möglichkeiten, Init-Systeme mit Ihrer Express-Anwendung zu verwenden:

* Ausführung Ihrer Anwendung in einem Prozessmanager und Installation des Prozessmanagers als Service mit dem Init-System. Der Prozessmanager wird neu gestartet, wenn Ihre Anwendung abstürzt. Das Init-System startet dann den Prozessmanager neu, sobald das Betriebssystem neu gestartet wird. Dies ist die empfohlene Vorgehensweise.
* Ausführung Ihrer Anwendung (und von Node) direkt mit dem Init-System. Diese Vorgehensweise ist zwar etwas einfacher, Sie profitieren jedoch nicht von den zusätzlichen Vorteilen des Einsatzes eines Prozessmanagers.

##### systemd

"systemd" ist ein Linux-System und Service-Manager. Die meisten wichtigen Linux-Distributionen haben "systemd" als Init-Standardsystem übernommen.

Eine "systemd"-Servicekonfigurationsdatei wird als *Einheitendatei* bezeichnet, die die Endung ".service" hat. Dies ist ein Beispiel für eine Einheitendatei zur direkten Verwaltung einer Node-Anwendung (ersetzen Sie den Text in Fettdruck durch Werte für Ihr System und Ihre Anwendung):

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
Weitere Informationen zu "systemd" siehe [systemd-Referenz (Man-Page)](http://www.freedesktop.org/software/systemd/man/systemd.unit.html).
##### StrongLoop Process Manager als "systemd"-Service

Sie können StrongLoop Process Manager problemlos als "systemd"-Service installieren. Dadurch wird beim Serverneustart StrongLoop Process Manager automatisch neu gestartet. Dadurch wiederum werden alle Anwendungen neu gestartet, die von diesem Prozessmanager verwaltet werden.

So installieren Sie StrongLoop Process Manager als "systemd"-Service:

```console
$ sudo sl-pm-install --systemd
```

Starten Sie dann den Service mit:

```console
$ sudo /usr/bin/systemctl start strong-pm
```

Weitere Informationen hierzu finden Sie im Thema [Produktionshost einrichten (in der StrongLoop-Dokumentation)](https://docs.strongloop.com/display/SLC/Setting+up+a+production+host#Settingupaproductionhost-RHEL7+,Ubuntu15.04or15.10).

##### Upstart

"Upstart" ist ein Systemtool, das auf vielen Linux-Distributionen verfügbar ist. Mit diesem Tool können Aufgaben (Tasks) und Services beim Systemstart gestartet, beim Herunterfahren gestoppt und auch überwacht werden. Sie können Ihre Express-Anwendung oder einen Prozessmanager als Service konfigurieren. "Upstart" startet diese dann bei einem Absturz automatisch neu.

Ein "Upstart"-Service wird als Jobkonfigurationsdatei (auch als "Job" bezeichnet) definiert, deren Dateiname mit `.conf` endet. Das folgende Beispiel zeigt, wie ein Job namens "myapp" für eine Anwendung namens "myapp" erstellt wird, wobei sich die Hauptdatei im Verzeichnis `/projects/myapp/index.js` befindet.

Erstellen Sie eine Datei namens `myapp.conf` unter `/etc/init/` mit dem folgenden Inhalt (ersetzen Sie den Text in Fettdruck durch Werte für Ihr System und Ihre Anwendung):

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

Hinweis: Dieses Script erfordert Upstart 1.4 oder höher mit Unterstützung auf Ubuntu 12.04-14.10.

Da der Job so konfiguriert ist, dass er beim Systemstart ausgeführt wird, wird Ihre Anwendung zusammen mit dem Betriebssystem gestartet und automatisch neu gestartet, wenn die Anwendung abstürzt oder das System heruntergefahren wird.

Neben dem automatischen Neustart der Anwendung können Sie mit Upstart die folgenden Befehle verwenden:

* `start myapp` – Anwendung starten
* `restart myapp` – Anwendung neu starten
* `stop myapp` – Anwendung stoppen

Weitere Informationen zu "Upstart" siehe [Upstart Intro, Cookbook and Best Practises](http://upstart.ubuntu.com/cookbook).

##### StrongLoop Process Manager als "Upstart"-Service

Sie können StrongLoop Process Manager problemlos als "Upstart"-Service installieren. Dadurch wird beim Serverneustart StrongLoop Process Manager automatisch neu gestartet. Dadurch wiederum werden alle Anwendungen neu gestartet, die von diesem Prozessmanager verwaltet werden.

So installieren Sie StrongLoop Process Manager als "Upstart 1.4"-Service:

```console
$ sudo sl-pm-install
```

Fühen Sie dann den Service aus mit:

```console
$ sudo /sbin/initctl start strong-pm
```

Hinweis: Auf Systemen, die Upstart 1.4 nicht unterstützen, sind die Befehle leicht unterschiedlich. Weitere Informationen hierzu siehe das
Thema [Einrichtung eines Produktionshosts (in der StrongLoop-Dokumentation)](https://docs.strongloop.com/display/SLC/Setting+up+a+production+host#Settingupaproductionhost-RHELLinux5and6,Ubuntu10.04-.10,11.04-.10).

### Anwendung in einem Cluster ausführen

In einem Multi-Core-System können Sie die Leistung einer Node-Anwendung mehrmals erhöhen, indem Sie einen Cluster von Prozessen starten. Ein Cluster führt mehrere Instanzen der Anwendung aus, idealerweise eine Instanz auf jedem CPU-Core. Dadurch werden die Arbeitslasten und die Tasks auf die Instanzen verteilt.

<!--![Lastausgleich zwischen Anwendungsinstanzen mithilfe der Cluster-API](/images/clustering.png)-->

Wichtig. Da die Anwendungsinstanzen als separate Prozesse ausgeführt werden, nutzen sie nicht dieselbe Hauptspeicherkapazität gemeinsam. Das heißt, Objekte befinden sich für jede Instanz der Anwendung auf lokaler Ebene. Daher kann der Status im Anwendungscode nicht beibehalten werden. Sie können jedoch einen speicherinternen Datenspeicher wie [Redis](http://redis.io/) verwenden, um sitzungsrelevante Daten und Statusinformationen zu speichern. Diese Einschränkung trifft im Wesentlichen auf alle Formen der horizontalen Skalierung zu, unabhängig davon, ob es sich um Clustering mit mehreren Prozessen oder mehreren physischen Servern handelt.

Bei in Gruppen zusammengefassten Anwendungen (geclusterte Anwendungen) können Verarbeitungsprozesse einzeln ausfallen, ohne dass sich dies auf die restlichen Prozesse auswirkt. Neben den Leistungsvorteilen ist die Fehlerisolierung ein weiterer Grund, einen Cluster von Anwendungsprozessen auszuführen. Wenn ein Verarbeitungsprozess abstürzt, müssen Sie sicherstellen, dass das Ereignis protokolliert und ein neuer Prozess mithilfe von "cluster.fork()" gestartet wird.

#### Clustermodule von Node verwenden

Das Clustering erfolgt über das [Clustermodul](https://nodejs.org/docs/latest/api/cluster.html) von Node. Dadurch wird ein Masterprozess eingeleitet, um Verarbeitungsprozesse zu starten und eingehende Verbindungen auf die Verarbeitungsprozesse zu verteilen. Anstatt dieses Modul jedoch direkt zu verwenden, ist es deutlich besser, eines der vielen angebotenen Tools einzusetzen, das diesen Vorgang automatisch für Sie ausführt, wie beispielsweise [node-pm](https://www.npmjs.com/package/node-pm) oder [cluster-service](https://www.npmjs.com/package/cluster-service).

#### StrongLoop Process Manager verwenden

Wenn Sie Ihre Anwendung auf StrongLoop Process Manager (PM) bereitstellen, können Sie die Vorteile des Clustering nutzen, *ohne* Ihren Anwendungscode ändern zu müssen.

Wenn StrongLoop Process Manager (PM) eine Anwendung ausführt, wird diese automatisch in einem Cluster ausgeführt. Die Anzahl der Verarbeitungsprozesse entspricht dabei der Anzahl der CPU-Cores im System. Sie können die Anzahl der Verarbeitungsprozesse manuell im Cluster ändern. Hierfür verwenden Sie das Befehlszeilentool "slc", ohne die Anwendung stoppen zu müssen.

Beispiel: Angenommen, Sie haben Ihre Anwendung auf prod.foo.com bereitgestellt, und StrongLoop PM ist auf Port 8701 (Standardport) empfangsbereit. Dann müssen Sie die Clustergröße mithilfe von "slc" auf "8" einstellen.

```console
$ slc ctl -C http://prod.foo.com:8701 set-size my-app 8
```

Weitere Informationen zum Clustering mit StrongLoop PM finden Sie im Thema [Clustering](https://docs.strongloop.com/display/SLC/Clustering) in der StrongLoop-Dokumentation.

### Anforderungsergebnisse im Cache speichern

Eine weitere Strategie zur Verbesserung des Leistungsverhaltens in Produktionsumgebungen ist das Speichern von Anforderungergebnissen im Cache. Ihre Anwendung muss also diese Operation nicht wiederholt ausführen, um dieselbe Anforderung wiederholt zu bedienen.

Mithilfe eines Caching-Servers wie [Varnish](https://www.varnish-cache.org/) oder [Nginx](https://www.nginx.com/resources/wiki/start/topics/examples/reverseproxycachingexample/) (siehe auch [Nginx Caching](https://serversforhackers.com/nginx-caching/)) lassen sich Geschwindigkeit und Leistung Ihrer Anwendung hervorragend verbessern.

### Load Balancer verwenden

Unabhängig davon, wie gut eine Anwendung optimiert wurde, kann eine Einzelinstanz nur eine begrenzte Arbeitslast oder einen begrenzten Datenverkehr handhaben. Eine Möglichkeit, eine Anwendung zu skalieren, ist die Ausführung mehrerer Instanzen dieser Anwendung und die Verteilung des Datenverkehrs über eine Lastausgleichsfunktion (Load Balancer) vorzunehmen. Die Einrichtung eines solchen Load Balancer kann helfen, Leistung und Geschwindigkeit Ihrer Anwendung zu verbessern. Zudem lässt sich dadurch die Anwendung besser skalieren als mit einer Einzelinstanz.

Ein Load Balancer ist in der Regel ein Reverse Proxy, der den Datenverkehr zu und von mehreren Anwendungsinstanzen und Servern koordiniert. Sie können ohne großen Aufwand einen Load Balancer für Ihre Anwendung einrichten. Verwenden Sie hierzu [Nginx](http://nginx.org/en/docs/http/load_balancing.html) oder [HAProxy](https://www.digitalocean.com/community/tutorials/an-introduction-to-haproxy-and-load-balancing-concepts).

Bei einer solchen Lastverteilung müssen Sie sicherstellen, dass Anforderungen, die einer bestimmten Sitzungs-ID zugeordnet sind, mit dem Prozess verbunden sind, von dem sie ursprünglich stammen. Dies wird auch als *Sitzungsaffinität* oder *Affine Sitzungen* bezeichnet und kann durch den obigen Vorschlag, einen Datenspeicher wie Redis für Sitzungsdaten zu verwenden (je nach Anwendung), umgesetzt werden. Eine Beschreibung hierzu siehe [Mehrere Knoten verwenden](http://socket.io/docs/using-multiple-nodes/).

#### StrongLoop Process Manager mit einem Nginx Load Balancer verwenden

[StrongLoop Process Manager](http://strong-pm.io/) lässt sich in einen Nginx-Controller integrieren und erleichtert dadurch das Konfigurieren von Produktionsumgebungen mit mehreren Hosts. Weitere Informationen finden Sie im Thema zum [Skalieren auf mehrere Server](https://docs.strongloop.com/display/SLC/Scaling+to+multiple+servers) (in der StrongLoop-Dokumentation).
<a name="proxy"></a>

### Reverse Proxy verwenden

Ein Reverse Proxy befindet sich vor einer Webanwendung und führt Unterstützungsoperationen für die Anforderungen aus (außer das Weiterleiten von Anforderungen an die Anwendung). Er kann u. a. Fehlerseiten, Komprimierungen und Caching bearbeiten, Dateien bereitstellen und Lastverteilungen vornehmen.

Durch die Übergabe von Tasks, die keine Kenntnis des Anwendungsstatus erfordern, an einen Reverse Proxy muss Express keine speziellen Anwendungstasks mehr ausführen. Aus diesem Grund wird empfohlen, in Produktionsumgebungen Express hinter einem Reverse Proxy wie [Nginx](https://www.nginx.com/) oder [HAProxy](http://www.haproxy.org/) auszuführen.
