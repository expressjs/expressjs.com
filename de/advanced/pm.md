---
layout: page
title: Prozessmanager für Express-Anwendungen
menu: advanced
lang: de
---

# Prozessmanager für Express-Anwendungen

Wenn Sie Express-Anwendungen für Produktionsumgebungen ausführen, ist der Einsatz eines *Prozessmanagers* hilfreich, um folgende Aufgaben (Tasks) auszuführen:

- Automatischer Neustart der Anwendung nach einem Absturz
- Einblicke in die Laufzeitleistung und die Ressourcennutzung
- Dynamische Änderung der Einstellungen zur Verbesserung des Leistungsverhaltens
- Steuerung des Clustering

Ein Prozessmanager ist vergleichbar mit einem Anwendungsserver: er ist ein "Container" für Anwendungen, der die Bereitstellung erleichtert, eine hohe Verfügbarkeit sicherstellt und die Verwaltung der Anwendung zur Laufzeit ermöglicht.

Die gängigsten Prozessmanager für Express- und andere Node.js-Anwendungen sind:

- [StrongLoop Process Manager](#sl)
- [PM2](#pm2)
- [Forever](#forever)


Der Einsatz eines dieser drei Tools kann sehr hilfreich sein. StrongLoop Process Manager ist jedoch das einzige Tool, dass eine umfassende Laufzeit- und Bereitstellungslösung bietet, die den gesamten  Node.js-Anwendungslebenszyklus abdeckt. Für jeden Schritt vor und nach der Produktion steht über eine einheitliche Schnittstelle ein Tool zur Verfügung.

Nachfolgend finden Sie einen Kurzbeschreibung zu jedem dieser Tools.
Einen ausführlichen Vergleich der Tools finden Sie unter [http://strong-pm.io/compare/](http://strong-pm.io/compare/).

## <a id="sl">StrongLoop Process Manager</a>

StrongLoop Process Manager (StrongLoop PM) ist ein Prozessmanager für Node.js-Anwendungen in Produktionsumgebungen. StrongLoop PM verfügt über integrierte Funktionen für Lastverteilung, Überwachung und Bereitstellung auf mehreren Hosts sowie eine grafische Konsole. Mit StrongLoop PM lassen sich die folgenden Aufgaben (Tasks) ausführen:

- Erstellen, Packen und Bereitstellen Ihrer Node.js-Anwendung auf einem lokalen oder fernen System
- Anzeige von CPU-Profilen und Heapspeichermomentaufnahmen (Heap-Snapshots) zur Optimierung der Leistung und Diagnose von Speicherlecks
- Herstellen der dauerhaften Betriebsbereitschaft von Prozessen und Clustern
- Anzeige von Leistungsmessdaten für Ihre Anwendung
- Einfache Verwaltung von Bereitstellungen auf mehreren Hosts inkl. Nginx-Integration
- Vereinheitlichung mehrerer StrongLoop PMs auf einer über Arc verwalteten verteilten Microservices-Laufzeitumgebung

StrongLoop PM kann über ein leistungsfähiges Befehlszeilen-Schnittstellentool namens `slc` oder das grafisch orientierte Tool Arc genutzt werden. Arc ist ein Open-Source-Tool, das  von StrongLoop kompetent unterstützt wird.

Weitere Informationen siehe [http://strong-pm.io/](http://strong-pm.io/).

Vollständige Dokumentation

- [Node-Anwendungen im Betrieb (in der StrongLoop-Dokumentation)](http://docs.strongloop.com/display/SLC)
- [StrongLoop Process Manager verwenden](http://docs.strongloop.com/display/SLC/Using+Process+Manager)

### Installation

```console
$ [sudo] npm install -g strongloop
```

### Grundlegende Verwendung

```console
$ cd my-app
$ slc start
```

Anzeigen des Status von Process Manager und allen bereitgestellten Anwendungen:

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

Auflisten aller verwalteten Anwendungen (Services):

```console
$ slc ctl ls
Id          Name         Scale
 1          my-app       1
```

Stoppen einer Anwendung:

```console
$ slc ctl stop my-app
```

Neustart einer Anwendung:

```console
$ slc ctl restart my-app
```

Sie können auch einen "Soft Restart" durchführen, damit die Verarbeitungsprozesse eine Karenzzeit zum Schließen bestehender Verbindungen erhalten. Dann kann die aktuelle Anwendung neu gestartet werden:

```console
$ slc ctl soft-restart my-app
```

Entfernen einer Anwendung aus dem Verwaltungsprozess:

```console
$ slc ctl remove my-app
```

## <a id="pm2">PM2</a>

PM2 ist ein Prozessmanager für Node.js-Anwendungen in Produktionsumgebungen, der über eine integrierte Lastausgleichsfunktion verfügt. Mit PM2 lässt sich die dauerhafte Betriebsbereitschaft von Anwendungen sicherstellen. So können die Anwendungen ohne Ausfallzeiten erneut geladen werden, wodurch die Ausführung allgemeiner Systemverwaltungsaufgaben erleichtert wird. Über PM2 können auch Protokollierung, Überwachung und Clustering von Anwendungen vorgenommen werden.

Weitere Informationen siehe [https://github.com/Unitech/pm2](https://github.com/Unitech/pm2).

### Installation

```console
$ [sudo] npm install pm2 -g
```

### Grundlegende Verwendung

Wenn Sie eine Anwendung mit dem Befehl `pm2` starten, müssen Sie den Pfad zur Anwendung angeben. Wenn Sie eine Anwendung jedoch stoppen, neu starten oder löschen, können Sie auch nur den Namen oder die ID der Anwendung angeben.

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

Wenn Sie eine Anwendung mit dem Befehl `pm2` starten, wird die Anwendung sofort in den Hintergrund gestellt. Sie können diese im Hintergrund laufende Anwendung über die Befehlszeile mit verschiedenen `pm2`-Befehlen steuern.

nach dem Starten einer Anwendung mit dem Befehl `pm2` wird diese in der PM2-Prozessliste mit einer ID registriert. Sie können also Anwendungen mit demselben Namen aus verschiedenen Verzeichnissen auf dem System über deren ID verwalten.

Beachten Sie Folgendes: Wenn mehrere Anwendungen mit demselben Namen ausgeführt werden, gelten die `pm2`-Befehle für alle Anwendungen. Verwenden Sie daher für das Verwalten einzelner Anwendungen IDs anstelle von Namen.

Erstellen einer Liste aller aktiven Prozesse:

```console
$ pm2 list
```

Stoppen einer Anwendung:

```console
$ pm2 stop 0
```

Neustart einer Anwendung:

```console
$ pm2 restart 0
```

Anzeige detaillierter Informationen zu einer Anwendung:

```console
$ pm2 show 0
```

Entfernen einer Anwendung aus dem PM2-Register:

```console
$ pm2 delete 0
```


## <a id="forever">Forever</a>

Forever ist ein einfaches Befehlszeilen-Schnittstellentool, mit dem sichergestellt wird, dass ein Script kontinuierlich ausgeführt wird. Die einfache Benutzerschnittstelle von Forever eignet sich ideal für einfachere Bereitstellungen von Node.js-Anwendungen und Scripts.

Weitere Informationen siehe [https://github.com/foreverjs/forever](https://github.com/foreverjs/forever).

### Installation

```console
$ [sudo] npm install forever -g
```

### Grundlegende Verwendung

Verwenden Sie zum Starten eines Scripts den Befehl `forever start` und geben Sie den Pfad zum Script an:

```console
$ forever start script.js
```

Dieser Befehl führt das Script im Dämonmodus (im Hintergrund) aus.

Wenn Sie das Script so ausführen wollen, dass es an das Terminal angehängt wird, müssen Sie `start` weglassen:

```console
$ forever script.js
```

Es ist sinnvoll, Ausgaben des Forever-Tools und des Scripts mit den Protokollierungsoptionen `-l`, `-o` und `-e` zu protokollieren (wie in diesem Beispiel gezeigt):

```console
$ forever start -l forever.log -o out.log -e err.log script.js
```

Anzeigen der Liste mit Scripts, die über Forever gestartet wurden:

```console
$ forever list
```

Stoppen eines Scripts, das über Forever gestartet wurde. Verwenden Sie hierzu den Befehl `forever stop` und geben Sie den Prozessindex an (der über den Befehl `forever list` erstellt wird).

```console
$ forever stop 1
```

Geben Sie alternativ den Pfad zur Datei an:

```console
$ forever stop script.js
```

Stoppen aller Scripts, die über Forever gestartet wurden:

```console
$ forever stopall
```

Forever verfügt über eine Vielzahl von Optionen sowie eine programmgesteuerte API.
