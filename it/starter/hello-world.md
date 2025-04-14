---
layout: page
title: Esempio di "Hello World" di express
description: Get started with Express.js by building a simple 'Hello World' application, demonstrating the basic setup and server creation for beginners.
menu: starter
lang: it
redirect_from: /starter/hello-world.html
---

# Esempio di Hello world

<div class="doc-box doc-info" markdown="1">
In sostanza, questa sarà l'applicazione Express più semplice che è possibile creare. È un'applicazione a singolo file &mdash; e *non* quello che si ottiene se si utilizza il [Programma di creazione Express](/{{ page.lang }}/starter/generator.html), il quale crea le fondamenta per un'applicazione completa con molti file JavaScript, template Jade e sotto directory per diversi scopi.
</div>

```js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

L'applicazione avvia un server e resta in ascolto sulla porta 3000 per le connessioni. L'applicazione risponde con "Hello World!" per le richieste
all'URL root (`/`) o _route_. Per qualsiasi altro percorso, risponderà con il messaggio **404 Non trovato**.

### Running Locally

Per prima cosa creare una directory denominata `myapp`, passare a quest'ultima ed eseguire `npm init`. Quindi installare `express` come dipendenza, come descritto nella [Guida all'installazione](/{{ page.lang }}/starter/installing.html).

Nella directory `myapp`, creare un file denominato `app.js` e aggiungere il seguente codice:

<div class="doc-box doc-notice" markdown="1">
I valori `req` (richiesta) e `res` (risposta) sono esattamente gli stessi oggetti forniti da Node, quindi è possibile richiamare
`req.pipe()`, `req.on('data', callback)` e qualsiasi cosa che si farebbe senza il coinvolgimento di Express.
</div>

Eseguire l'applicazione con il seguente comando:

```bash
$ node app.js
```

Successivamente, caricare [http://localhost:3000/](http://localhost:3000/) su un browser per visualizzare l'output.

### [Previous: Installing ](/{{ page.lang }}/starter/installing.html)&nbsp;&nbsp;&nbsp;&nbsp;[Next: Express Generator ](/{{ page.lang }}/starter/generator.html)
