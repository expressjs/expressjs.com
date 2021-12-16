---
layout: page
title: Express installieren
menu: starter
lang: de
---

# Installation

Angenommen, Sie haben [Node.js](https://nodejs.org/) bereits installiert. Erstellen Sie ein Verzeichnis für Ihre Anwendung und definieren Sie dieses Verzeichnis als Ihr Arbeitsverzeichnis.

```console
$ mkdir myapp
$ cd myapp
```

Erstellen Sie mit dem Befehl `npm init` eine Datei namens `package.json` für Ihre Anwendung. Weitere Informationen zur Funktionsweise von `package.json` finden Sie in den [Angaben zur Handhabung der npm-Datei package.json](https://docs.npmjs.com/files/package.json).

```console
$ npm init
```

Dieser Befehl fordert Sie zur Eingabe verschiedener Angaben wie Name und Version Ihrer Anwendung auf. Für den Moment reicht es, die Eingabetaste zu drücken und die Standardwerte für die meisten Angaben zu akzeptieren. Es gilt jedoch folgende Ausnahme:

```console
entry point: (index.js)
```

Geben Sie `app.js` oder einen Namen Ihrer Vorstellung als Namen für die Hauptdatei ein. Wenn dieser Name `index.js` lauten soll, drücken Sie die Eingabetaste, um den vorgeschlagenen Standarddateinamen zu akzeptieren.

Installieren Sie jetzt Express im Verzeichnis `myapp` und speichern Sie es in der Abhängigkeitsliste. Beispiel:

```console
$ npm install express --save
```

Wenn Sie Express vorübergehend installieren und nicht zur Abhängigkeitsliste hinzufügen wollen, geben Sie die Option `--save` nicht an:

```console
$ npm install express
```

<div class="doc-box doc-info" markdown="1">
Node-Module, die mit der Option `--save` installiert werden, werden zur `Abhängigkeitsliste` in der Datei `package.json` hinzugefügt. Danach werden bei der Ausführung von `npm install` im Verzeichnis `app` automatisch alle Module in der Abhängigkeitsliste installiert.
</div>
