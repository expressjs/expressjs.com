---
layout: page
title: Express installieren
description: Erfahren Sie, wie Sie Express.js in Ihrer Node.js-Umgebung installieren, wie Sie Ihr Projektverzeichnis aufsetzen und Abhängigkeiten mit npm verwalten.
menu: starter
order: 1
redirect_from: '  '
---

# Installation

Angenommen, Sie haben [Node.js](https://nodejs.org/) bereits installiert. Erstellen Sie ein Verzeichnis für Ihre Anwendung und definieren Sie dieses Verzeichnis als Ihr Arbeitsverzeichnis.

- [Express 4.x](/{{ page.lang }}/4x/api.html) requires Node.js 0.10 or higher.
- [Express 5.x](/{{ page.lang }}/5x/api.html) requires Node.js 18 or higher.

```bash
$ mkdir myapp
$ cd myapp
```

Erstellen Sie mit dem Befehl `npm init` eine Datei namens `package.json` für Ihre Anwendung.
Weitere Informationen zur Funktionsweise von `package.json` finden Sie in den [Angaben zur Handhabung der npm-Datei package.json](https://docs.npmjs.com/files/package.json).

```bash
$ npm init
```

Dieser Befehl fordert Sie zur Eingabe verschiedener Angaben wie Name und Version Ihrer Anwendung auf.
For now, you can simply hit RETURN to accept the defaults for most of them, with the following exception:

```
entry point: (index.js)
```

Geben Sie `app.js` oder einen Namen Ihrer Vorstellung als Namen für die Hauptdatei ein. Wenn dieser Name `index.js` lauten soll, drücken Sie die Eingabetaste, um den vorgeschlagenen Standarddateinamen zu akzeptieren.

Installieren Sie jetzt Express im Verzeichnis `myapp` und speichern Sie es in der Abhängigkeitsliste. Beispiel:

```bash
$ npm install express
```

Wenn Sie Express vorübergehend installieren und nicht zur Abhängigkeitsliste hinzufügen wollen, geben Sie die Option `--save` nicht an:

```bash
$ npm install express --no-save
```

<div class="doc-box doc-info" markdown="1">
Node-Module, die mit der Option `--save` installiert werden, werden zur `Abhängigkeitsliste` in der Datei `package.json` hinzugefügt. Danach werden bei der Ausführung von `npm install` im Verzeichnis `app` automatisch alle Module in der Abhängigkeitsliste installiert.
</div>
