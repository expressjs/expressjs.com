---
layout: page
title: Installazione di Express
menu: starter
lang: it
---

# Installazione

Presumendo che sia stato già installato [Node.js](https://nodejs.org/), creare una directory in cui conservare l'applicazione e renderla la directory di lavoro.

```console
$ mkdir myapp
$ cd myapp
```

Utilizzare il comando `npm init` per creare un file `package.json` per l'applicazione.
Per ulteriori informazioni sul funzionamento di `package.json`, consultare [Informazioni specifiche sulla gestione di package.json di npm](https://docs.npmjs.com/files/package.json).

```console
$ npm init
```

Questo comando richiede di specificare alcune informazioni, ad esempio il nome e la versione dell'applicazione.
Per il momento, è possibile semplicemente premere il tasto INVIO per accettare i valori di default per molti di esse, ad eccezione di quanto segue:

```console
entry point: (index.js)
```

Immettere `app.js` o qualsiasi altra cosa come nome del file principale. Se si desidera che sia `index.js`, premere il tasto INVIO per accettare il nome file predefinito consigliato.

Quindi installare Express nella directory `myapp` e salvarlo nell'elenco delle dipendenze. Ad esempio:

```console
$ npm install express --save
```

Per installare momentaneamente Express e non aggiungerlo all'elenco di dipendenze, omettere l'opzione `--save`:

```console
$ npm install express
```

<div class="doc-box doc-info" markdown="1">
I moduli Node installati con l'opzione `--save` vengono aggiunti all'elenco `dependencies` nel file `package.json`.
Successivamente, l'esecuzione di `npm install` nella directory `app` installerà automaticamente i moduli nell'elenco di dipendenze.
</div>
