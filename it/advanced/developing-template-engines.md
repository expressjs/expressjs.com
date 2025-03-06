---
layout: page
title: Sviluppo dei motori di template per Express
menu: advanced
lang: it
description: Learn how to develop custom template engines for Express.js using app.engine(),
  with examples on creating and integrating your own template rendering logic.
---

# Sviluppo dei motori di template per Express

Utilizzare il metodo `app.engine(ext, callback)` per creare il proprio motore di template. `ext` è l'estensione file e `callback` è la funzione del motore di template, la quale accetta le seguenti voci come parametri: l'ubicazione del file, l'oggetto delle opzioni e la funzione callback.

Il seguente codice è un esempio di implementazione di un motore di template molto semplice per il rendering del file `.ntl`.

```js
const fs = require('fs') // this engine requires the fs module
app.engine('ntl', (filePath, options, callback) => { // define the template engine
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(new Error(err))
    // this is an extremely simple template engine
    const rendered = content.toString().replace('#title#', `<title>${options.title}</title>`)
      .replace('#message#', `<h1>${options.message}</h1>`)
    return callback(null, rendered)
  })
})
app.set('views', './views') // specify the views directory
app.set('view engine', 'ntl') // register the template engine
```

L'applicazione sarà ora in grado di effettuare il rendering dei file `.ntl`. Creare un file denominato `index.ntl` nella directory `views` con il seguente contenuto.

```pug
#title#
#message#
```
Successivamente, creare il seguente percorso nell'applicazione.

```js
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})
```
Quando si effettua una richiesta per la home page, `index.ntl` verrà visualizzato come HTML.
