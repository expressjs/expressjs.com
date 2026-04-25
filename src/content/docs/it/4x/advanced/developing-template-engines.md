---
title: Sviluppo di modelli di motori per Express
description: Impara a sviluppare motori di template personalizzati per Express.js utilizzando app.engine(), con esempi sulla creazione e l'integrazione della tua logica di rendering dei modelli.
---

Usa il metodo `app.engine(ext, callback)` per creare il tuo modello di motore. `ext` si riferisce all'estensione del file, e `callback` è la funzione del motore del modello, che accetta i seguenti elementi come parametri: la posizione del file, l'oggetto opzioni, e la funzione di callback.

Il seguente codice è un esempio di implementazione di un semplice modello di motore per il rendering dei file `.ntl`.

```js
const fs = require('fs'); // this engine requires the fs module
app.engine('ntl', (filePath, options, callback) => {
  // define the template engine
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err);
    // this is an extremely simple template engine
    const rendered = content
      .toString()
      .replace('#title#', `<title>${options.title}</title>`)
      .replace('#message#', `<h1>${options.message}</h1>`);
    return callback(null, rendered);
  });
});
app.set('views', './views'); // specify the views directory
app.set('view engine', 'ntl'); // register the template engine
```

La tua app sarà ora in grado di visualizzare i file `.ntl`. Crea un file chiamato `index.ntl` nella directory `views` con il seguente contenuto.

```pug
#title#
#message#
```

Quindi, crea il seguente percorso nella tua app.

```js
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' });
});
```

Quando fai una richiesta alla home page, `index.ntl` sarà renderizzato come HTML.
