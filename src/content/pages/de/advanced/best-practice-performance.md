---
title: 'Best Practices: Leistung und Zuverlässigkeit'
description: Entdecken Sie Performance und Zuverlässigkeits-Best Practices für Express-Apps in der Produktion, die Code-Optimierungen und Umgebungs-Setups für optimale Performance abdecken.
---

Dieser Artikel befasst sich mit der Leistungsfähigkeit und der Zuverlässigkeit der besten Verfahren für Express-Anwendungen, die in der Produktion eingesetzt werden.

Dieses Thema fällt eindeutig in die "Devops"-Welt, die sowohl traditionelle Entwicklung als auch Operationen umfasst. Dementsprechend sind die Informationen in zwei Teile aufgeteilt:

- Dinge in Ihrem Code zu tun (dev part):
  - [Benutze gzip Kompression](#use-gzip-compression)
  - [Keine synchronen Funktionen](#dont-use-synchronous-functions)
  - [Logging korrekt](#do-logging-correctly)
  - [Ausnahmen richtig behandeln](#handle-exceptions-properly)
- Dinge zu tun in Ihrer Umgebung / in Ihrer Umgebung (der Ops-Teil):
  - [Setze NODE_ENV auf "Produktion"](#set-node_env-to-production)
  - [Stelle sicher, dass deine App automatisch neu startet](#ensure-your-app-automatically-restarts)
  - [Starte deine App in einem Cluster](#run-your-app-in-a-cluster)
  - [Cache-Anfrageergebnisse](#cache-request-results)
  - [Lastausgleich verwenden](#use-a-load-balancer)
  - [Reverse Proxy](#use-a-reverse-proxy) verwenden

## Dinge in deinem Code zu tun

Hier sind einige Dinge, die Sie in Ihrem Code tun können, um die Leistung Ihrer Anwendung zu verbessern:

- [Benutze gzip Kompression](#use-gzip-compression)
- [Keine synchronen Funktionen](#dont-use-synchronous-functions)
- [Logging korrekt](#do-logging-correctly)
- [Ausnahmen richtig behandeln](#handle-exceptions-properly)

### Gzip Komprimierung verwenden

Gzip-Komprimierung kann die Reaktionskörper erheblich verringern und damit die Geschwindigkeit einer Web-App erhöhen. Benutzen Sie die [compression](https://www.npmjs.com/package/compression) Middleware für gzip Komprimierung in Ihrer Express-App. Zum Beispiel:

```js
const compression = require('compression');
const express = require('express');
const app = express();

app.use(compression());
```

Für eine stark frequentierte Website in der Produktion, der beste Weg zur Komprimierung ist die Implementierung auf umgekehrter Proxyebene (siehe [Reverse Proxy](#use-a-reverse-proxy)) . In diesem Fall brauchen Sie keine Komprimierungsmittelware. For details on enabling gzip compression in Nginx, see [Module ngx_http_gzip_module](https://nginx.org/en/docs/http/ngx_http_gzip_module.html) in the Nginx documentation.

### Keine synchronen Funktionen verwenden

Synchronische Funktionen und Methoden binden den Ausführungsprozess bis sie zurückkehren. Ein einzelner Aufruf einer synchronen Funktion kann in ein paar Mikrosekunden oder Millisekunden zurückgegeben werden auf Websites mit hohem Traffic jedoch tragen diese Anrufe dazu bei, die Performance der App zu reduzieren. Vermeiden Sie ihren Einsatz in der Produktion.

Obwohl Node und viele Module synchrone und asynchrone Versionen ihrer Funktionen liefern, verwenden Sie immer die asynchrone Version in der Produktion. Die einzige Zeit, in der eine synchrone Funktion gerechtfertigt werden kann, ist beim ersten Start.

Du kannst das `--trace-sync-io` Kommandozeilen-Flag verwenden, um eine Warnung und einen Stack-Trace zu drucken, wann immer deine Anwendung eine synchrone API verwendet. Natürlich möchten Sie dies nicht in der Produktion verwenden, sondern vielmehr sicherstellen, dass Ihr Code produktionsbereit ist. See the [node command-line options documentation](https://nodejs.org/api/cli.html#trace-sync-io) for more information.

### Logging korrekt

Im Allgemeinen gibt es zwei Gründe für die Protokollierung aus Ihrer App: Für das Debuggen und für die Protokollierung von App-Aktivitäten (im Wesentlichen alles andere). Die Verwendung von `console.log()` oder `console.error()` zum Drucken von Logmeldungen an das Terminal ist gängige Praxis in der Entwicklung. But [these functions are synchronous](https://nodejs.org/api/console.html#console) when the destination is a terminal or a file, so they are not suitable for production, unless you pipe the output to another program.

#### Zum Debuggen

Wenn du zum Debuggen loggst, benutze anstelle von `console.log()` ein spezielles Debugging-Modul wie [debug](https://www.npmjs.com/package/debug). Dieses Modul ermöglicht es Ihnen, die DEBUG Umgebungsvariable zu verwenden, um zu kontrollieren, welche Debug-Meldungen an `console.error()` gesendet werden, falls vorhanden. Um deine App rein asynchron zu halten, solltest du trotzdem `console.error()` zu einem anderen Programm weiterleiten. Aber dann bist du nicht wirklich in der Produktion zu debuggen, oder?

#### Für App-Aktivitäten

Wenn Sie App-Aktivitäten protokollieren (zum Beispiel Traffic oder API-Aufrufe), anstatt „Konsole“. og()\`, verwende eine Logging-Bibliothek wie [Pino](https://www.npmjs.com/package/pino), die schnellste und effizienteste verfügbare Option.

### Ausnahmen richtig handhaben

Knoten-Apps stürzen ab, wenn sie auf eine nicht gefangene Ausnahme stoßen. Wenn Sie Ausnahmen nicht bearbeiten und entsprechende Maßnahmen ergreifen, wird Ihre Express-App zum Absturz bringen und offline gehen. Wenn du dem Rat folgst [Stelle sicher, dass deine App automatisch neu startet](#ensure-your-app-automatically-restarts) unten, dann wird deine App von einem Absturz erholt. Glücklicherweise haben Express-Apps in der Regel eine kurze Startzeit. Nichtsdestotrotz wollen Sie einen Absturz vermeiden, und dazu müssen Sie die Ausnahmen ordentlich behandeln.

Um sicherzustellen, dass Sie mit allen Ausnahmen umgehen, verwenden Sie folgende Techniken:

- [Versuchscatch](#use-try-catch)
- [Versprechungen verwenden](#use-promises)

Bevor Sie in diese Themen eintauchen, sollten Sie ein grundlegendes Verständnis von Node/Express-Fehlerbehandlung haben: Verwendung von Fehler-First Callbacks und Verbreitung von Fehlern in Middleware. Knoten verwendet eine "error-first callback"-Konvention um Fehler aus asynchronen Funktionen zurückzugeben, wobei der erste Parameter der Callback-Funktion das Fehlerobjekt ist, gefolgt von Ergebnisdaten in folgenden Parametern. Um keinen Fehler anzugeben, übergeben Sie Null als ersten Parameter. Die Callback-Funktion muss entsprechend der ersten Callback-Konvention folgen, um den Fehler sinnvoll zu bearbeiten. Und in Express ist es am besten, die next() Funktion zu nutzen, um Fehler über die Middleware-Kette zu verbreiten.

Für mehr über die Grundlagen der Fehlerbehandlung, siehe:

- [Error Handling in Node.js](https://web.archive.org/web/20210619211351/https://www.joyent.com/node-js/production/design/errors)

#### Versuchsfang verwenden

Try-catch ist eine JavaScript-Sprachkonstruktion, die Sie verwenden können, um Ausnahmen im synchronen Code zu fangen. Verwenden Sie zum Beispiel den versuchen Catch, um JSON-Parsing-Fehler wie unten gezeigt zu behandeln.

Hier ist ein Beispiel für die Verwendung von "try-catch", um eine mögliche Prozessabsturzausnahme zu bewältigen.
Diese Middleware-Funktion akzeptiert einen Abfragefeldparameter namens "params", das ein JSON-Objekt ist.

```js
app.get('/search', (req, res) => {
  // Simulating async operation
  setImmediate(() => {
    const jsonStr = req.query.params;
    try {
      const jsonObj = JSON.parse(jsonStr);
      res.send('Success');
    } catch (e) {
      res.status(400).send('Invalid JSON string');
    }
  });
});
```

Der Versuch funktioniert jedoch nur für synchrone Code. Da die Knotenplattform primär asynchron ist (insbesondere in einer Produktionsumgebung), wird der Versuch nicht viele Ausnahmen fangen.

#### Versprechen verwenden

Wenn ein Fehler in einer `async` Funktion ausgelöst wird oder ein abgelehntes Versprechen in einer `async` Funktion erwartet wird, diese Fehler werden an den Fehlerhandler übergeben, als ob `next(err)` aufgerufen würde

```js
app.get('/', async (req, res, next) => {
  const data = await userData(); // If this promise fails, it will automatically call `next(err)` to handle the error.

  res.send(data);
});

app.use((err, req, res, next) => {
  res.status(err.status ?? 500).send({ error: err.message });
});
```

Außerdem können Sie asynchrone Funktionen für Ihre Middleware verwenden und der Router verarbeitet Fehler, wenn das Versprechen fehlschlägt, zum Beispiel:

```js
app.use(async (req, res, next) => {
  req.locals.user = await getUser(req);

  next(); // This will be called if the promise does not throw an error.
});
```

Best Practices ist es, Fehler so nah wie möglich an der Website zu behandeln. So während dies jetzt im Router behandelt wird, ist es am besten, den Fehler in der Middleware zu fangen und ihn zu bearbeiten, ohne sich auf eine separate Middleware zu verlassen.

#### Was nicht zu tun

Eine Sache, die du _nicht_ tun solltest ist, auf das `uncaptException` Event zu hören emittiert, wenn eine Ausnahme den ganzen Weg zurück zur Ereignis-Schleife weht. Das Hinzufügen eines Ereignis-Listeners für `uncaughtException` ändert das Standardverhalten des Prozesses, der auf eine Ausnahme stößt; wird der Prozess trotz der Ausnahme weiterhin laufen. Dies könnte nach einer guten Möglichkeit klingen, um zu verhindern, dass Ihre App abstürzt, aber die Anwendung nach einer nicht gefangenen Ausnahme weiterhin zu laufen ist eine gefährliche Praxis und wird nicht empfohlen, weil der Zustand des Prozesses unzuverlässig und unberechenbar wird.

Additionally, using `uncaughtException` is officially recognized as [crude](https://nodejs.org/api/process.html#event-uncaughtexception). Also ist das Hören auf `uncaughtException` eine schlechte Idee. Aus diesem Grund empfehlen wir Dinge wie mehrere Prozesse und Supervisoren: Absturz und Neustart sind oft der zuverlässigste Weg, um einen Fehler zu beheben.

We also don't recommend using [domains](https://nodejs.org/api/domain.html). Es löst das Problem im Allgemeinen nicht und ist ein veraltetes Modul.

## Dinge zu tun in Ihrer Umgebung / Einrichtung

Hier sind einige Dinge, die Sie in Ihrer Systemumgebung tun können, um die Leistung Ihrer App zu verbessern:

- [Setze NODE_ENV auf "Produktion"](#set-node_env-to-production)
- [Stelle sicher, dass deine App automatisch neu startet](#ensure-your-app-automatically-restarts)
- [Starte deine App in einem Cluster](#run-your-app-in-a-cluster)
- [Cache-Anfrageergebnisse](#cache-request-results)
- [Lastausgleich verwenden](#use-a-load-balancer)
- [Reverse Proxy](#use-a-reverse-proxy) verwenden

### Knoten_ENV auf "Produktion" setzen

Die NODE_ENV Umgebungsvariable spezifiziert die Umgebung, in der eine Anwendung ausgeführt wird (normalerweise Entwicklung oder Produktion). Eines der einfachsten Dinge, die Sie tun können, um die Leistung zu verbessern, ist, NODE_ENV auf `production` zu setzen.

Setze NODE_ENV auf "production" makes Express:

- Cache-Ansichtsvorlagen.
- Cache-CSS-Dateien, die aus CSS-Erweiterungen generiert wurden.
- Weniger ausführliche Fehlermeldungen generieren.

[Tests indicate](https://web.archive.org/web/20250814011110/https://www.dynatrace.com/news/blog/the-drastic-effects-of-omitting-node-env-in-your-express-js-applications/) that just doing this can improve app performance by a factor of three!

Wenn Sie umweltspezifischen Code schreiben müssen, können Sie den Wert von NODE_ENV mit `process.env.NODE_ENV` überprüfen. Beachten Sie, dass die Überprüfung des Wertes einer Umgebungsvariable eine Leistungsstrafe verursacht und daher sparsam durchgeführt werden sollte.

In der Entwicklung setzst du in der Regel Umgebungsvariablen in deiner interaktiven Shell ein, indem du `export` oder deine `.bash_profile` Datei verwendest. Aber im Allgemeinen sollten Sie das nicht auf einem Produktionsserver tun; stattdessen sollten Sie das Init-System Ihres Betriebssystems (System) verwenden. Der nächste Abschnitt enthält weitere Details zur Verwendung Ihres Init-Systems im Allgemeinen aber das Setzen von `NODE_ENV` ist so wichtig für die Leistung (und einfach zu tun), dass es hier hervorgehoben wird.

Mit dem System verwenden Sie die `Environment` Direktive in Ihrer Einheitendatei. Zum Beispiel:

```sh

Environment=NODE_ENV=production
```

Weitere Informationen finden Sie unter [Umgebungsvariablen in systemd Units](https://www.flatcar.org/docs/latest/setup/systemd/environment-variables/).

### Stellen Sie sicher, dass Ihre App automatisch neu gestartet wird

In der Produktion wollen Sie nicht, dass Ihre Bewerbung offline ist. Dies bedeutet, dass Sie sicherstellen müssen, dass es sowohl neu gestartet wird, wenn die App abstürzt als auch wenn der Server selbst abstürzt. Obwohl Sie hoffen, dass keines dieser Ereignisse eintritt, müssen Sie realistischerweise beide Eventualitäten berücksichtigen von:

- Verwendung eines Prozess-Managers, um die App (und den Knoten) neu zu starten, wenn sie abstürzt.
- Verwendung des von Ihrem Betriebssystem zur Verfügung gestellten Init-Systems, um den Prozessmanager beim Absturz des Betriebssystems neu zu starten. Es ist auch möglich, das Init-System ohne Prozessmanager zu verwenden.

Knotenapplikationen stürzen ab, wenn sie eine nicht gefangene Ausnahme erleben. Das Wichtigste, was Sie tun müssen, ist, sicherzustellen, dass Ihre App gut getestet ist und alle Ausnahmen handhabt (siehe [Ausnahmen ordnungsgemäß behandeln](#handle-exceptions-properly) für Details). Aber als Fail-Safe setzen Sie einen Mechanismus, um sicherzustellen, dass wenn und wenn Ihre App abstürzt, automatisch neu gestartet wird.

#### Prozessmanager verwenden

In der Entwicklung hast du deine App einfach von der Kommandozeile aus mit `node server.js` oder etwas Ähnlichem gestartet. Aber dies in der Produktion zu tun, ist ein Rezept für eine Katastrophe. Wenn die App abstürzt, wird sie offline sein, bis Sie sie neu starten. Um sicherzustellen, dass Ihre App neu gestartet wird, wenn sie abstürzt, verwenden Sie einen Prozessmanager. Ein Prozessmanager ist ein "Container" für Anwendungen, die den Einsatz erleichtern, eine hohe Verfügbarkeit bieten und Ihnen die Verwaltung der Anwendung zur Laufzeit ermöglichen.

Zusätzlich zum Neustart Ihrer App bei einem Absturz kann ein Prozessmanager Sie aktivieren:

- Gewinnen Sie Einblicke in Laufzeitleistung und Ressourcenverbrauch.
- Ändern Sie die Einstellungen dynamisch, um die Leistung zu verbessern.
- Steuerung Clustering (pm2).

Historisch war es beliebt, einen Node.js Prozessmanager wie [PM2](https://github.com/Unitech/pm2) zu verwenden. Lesen Sie deren Dokumentation, wenn Sie dies tun möchten. Wir empfehlen jedoch, Ihr Init-System für das Prozessmanagement zu verwenden.

#### Init-System verwenden

Die nächste Ebene der Zuverlässigkeit besteht darin, sicherzustellen, dass Ihre App beim Neustart des Servers neu gestartet wird. Systeme können aus verschiedenen Gründen immer noch heruntergehen. Um sicherzustellen, dass Ihre App neu gestartet wird, wenn der Server abstürzt, verwenden Sie das Init-System, das in Ihr Betriebssystem integriert wurde. Das heute verwendete Hauptinitsystem ist [systemd](https://wiki.debian.org/systemd).

Es gibt zwei Möglichkeiten, Init-Systeme mit Ihrer Express-App zu verwenden:

- Führen Sie Ihre App in einem Prozessmanager aus und installieren Sie den Prozessmanager als Service mit dem Init-System. Der Prozessmanager startet Ihre App neu, wenn die App abstürzt, und das Init-System startet den Prozessmanager beim Neustart des Betriebssystems neu. Dies ist der empfohlene Ansatz.
- Führen Sie Ihre App (und Ihren Knoten) direkt mit dem Init-System aus. Das ist etwas einfacher, aber Sie haben nicht die zusätzlichen Vorteile eines Prozessmanagers.

##### Systemd

Systemd ist ein Linux System und Service Manager. Die meisten großen Linux-Distributionen haben System als Standard-Init-System übernommen.

Eine Systemd-Service-Konfigurationsdatei heißt _unit file_, mit einem Dateinamen endet in `.service`. Hier ist eine Beispiel-Einheitsdatei, um eine Knoten-App direkt zu verwalten. Ersetzen Sie die Werte in `<angle brackets>` für Ihr System und App:

```sh
[Unit]
Description=<Awesome Express App>

[Service]
Type=simple
ExecStart=/usr/local/bin/node </projects/myapp/index.js>
WorkingDirectory=</projects/myapp>

User=nobody
Group=nogroup


Environment=NODE_ENV=production


LimitNOFILE=infinity


LimitCORE=infinity

StandardInput=null
StandardOutput=syslog
StandardError=syslog
Restart=always

[Install]
WantedBy=multi-user.target
```

For more information on systemd, see the [systemd reference (man page)](https://www.freedesktop.org/software/systemd/man/latest/systemd.unit.html).

### Starte deine App in einem Cluster

In einem Multi-Core-System können Sie die Leistung einer Knoten-App um ein Vielfaches erhöhen, indem Sie einen Cluster von Prozessen starten. Ein Cluster führt mehrere Instanzen der App aus, idealerweise eine Instanz auf jedem CPU-Core, wodurch die Last und Aufgaben auf die Instanzen verteilt werden.

![Balance zwischen Anwendungsinstanzen mit der Cluster-API](/images/clustering.png)

WICHTIG: Da die App-Instanzen als separate Prozesse laufen, teilen sie nicht den gleichen Speicherplatz. Das heißt, Objekte sind lokal für jede Instanz der App. Daher können Sie den Status im Anwendungscode nicht beibehalten. However, you can use an in-memory datastore like [Redis](https://redis.io/) to store session-related data and state. Dieser Vorbehalt bezieht sich im Wesentlichen auf alle Formen der horizontalen Skalierung, sei es beim Clustering mit mehreren Prozessen oder mehreren physischen Servern.

In geclusterten Apps können Worker-Prozesse individuell abstürzen, ohne den Rest der Prozesse zu beeinträchtigen. Abgesehen von den Leistungsvorteilen ist die Fehlerisolierung ein weiterer Grund, einen Cluster von App-Prozessen auszuführen. Immer wenn ein Worker-Prozess abstürzt, vergewissern Sie sich, das Ereignis zu protokollieren und einen neuen Prozess mit cluster.fork() zu erzeugen.

#### Cluster-Modul des Knotens

Clustering is made possible with Node's [cluster module](https://nodejs.org/api/cluster.html). Dies ermöglicht es einem Master-Prozess, Worker-Prozesse zu generieren und eingehende Verbindungen unter den Arbeitern zu verteilen.

#### PM2 verwenden

Wenn Sie Ihre Anwendung mit PM2 bereitstellen, können Sie die Vorteile des Clustering _without out_ Ändern Ihres Anwendungscodes nutzen. Du solltest sicherstellen, dass deine [Anwendung zustandslos ist](https://pm2.keymetrics.io/docs/usage/specifics/#stateless-apps) zuerst , was bedeutet, dass keine lokalen Daten im Prozess gespeichert werden (wie Sessions, Websocket-Verbindungen und dergleichen).

Wenn du eine Anwendung mit PM2 ausführst, kannst du den **Cluster-Modus** aktivieren, um ihn in einem Cluster mit einer Anzahl von Instanzen deiner Wahl auszuführen zum Beispiel die übereinstimmende Anzahl der verfügbaren CPUs. Du kannst die Anzahl der Prozesse im Cluster manuell mit dem Kommandozeilenwerkzeug `pm2` ändern, ohne die App zu stoppen.

Um den Cluster-Modus zu aktivieren, starten Sie Ihre Anwendung so:

```bash

$ pm2 start npm --name my-app -i 4 -- start

$ pm2 start npm --name my-app -i max -- start
```

Dies kann auch innerhalb einer PM2-Prozessdatei konfiguriert werden (`ecosystem.config. s` oder ähnlich) indem `exec_mode` auf `cluster` und `instances` auf die Anzahl der zu startenden Arbeiter gesetzt wird.

Nach dem Ausführen kann die Anwendung so skaliert werden:

```bash

$ pm2 scale my-app +3

$ pm2 scale my-app 2
```

Weitere Informationen zum Clustering mit PM2 finden Sie unter [Cluster Mode](https://pm2.keymetrics.io/docs/usage/cluster-mode/) in der PM2-Dokumentation.

### Cache-Abfrageergebnisse

Eine weitere Strategie zur Verbesserung der Leistung in der Produktion ist das Cache-Ergebnis von Anfragen so dass Ihre App die Operation nicht wiederholt, um dieselbe Anfrage wiederholt zu bedienen.

Use a caching server like [Varnish](https://www.varnish.org/) or [Nginx](https://blog.nginx.org/blog/nginx-caching-guide) (see also [Nginx Caching](https://serversforhackers.com/c/nginx-caching)) to greatly improve the speed and performance of your app.

### Lastausgleich verwenden

Egal wie optimiert eine App ist, eine einzelne Instanz kann nur eine begrenzte Menge an Last und Traffic verwalten. Eine Möglichkeit, eine App zu skalieren, besteht darin, mehrere Instanzen davon auszuführen und den Traffic über einen Lastausgleicher zu verteilen. Das Einrichten eines Lastausgleichs kann die Leistung und Geschwindigkeit Ihrer App verbessern und es ermöglichen, mehr zu skalieren, als mit einer einzigen Instanz möglich ist.

Ein Loadbalancer ist in der Regel ein Reverse-Proxy, der den Datenverkehr zu und von mehreren Anwendungsinstanzen und Servern regelt. You can easily set up a load balancer for your app by using [Nginx](https://nginx.org/en/docs/http/load_balancing.html) or [HAProxy](https://www.digitalocean.com/community/tutorials/an-introduction-to-haproxy-and-load-balancing-concepts).

Bei Loadbalancing müssen Sie eventuell sicherstellen, dass Anforderungen, die mit einer bestimmten Session-ID in Verbindung stehen, mit dem Prozess verbunden sind, der sie verursacht hat. Dies ist _session_, oder _sticky sessions_, bekannt und kann durch den oben genannten Vorschlag angesprochen werden, um einen Datenspeicher wie Redis für Sitzungsdaten (je nach Anwendung) zu verwenden. Für eine Diskussion siehe [Mehrere Knoten verwenden](https://socket.io/docs/v4/using-multiple-nodes/).

### Reverse-Proxy verwenden

Ein Reverse Proxy sitzt vor einer Web-App und führt unterstützende Operationen auf den Anfragen aus, abgesehen von der Weiterleitung von Anfragen an die App. Es kann Fehlerseiten, Komprimierung, Caching, Servieren von Dateien und laden Balancing unter anderem.

Die Übergabe von Aufgaben, die keine Kenntnisse des Anwendungszustands an einen Reverse Proxy erfordern, gibt Express frei, spezielle Anwendungsaufgaben durchzuführen. For this reason, it is recommended to run Express behind a reverse proxy like [Nginx](https://nginx.org/) or [HAProxy](https://www.haproxy.org/) in production.
