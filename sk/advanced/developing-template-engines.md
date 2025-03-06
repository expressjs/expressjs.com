---
layout: page
title: Vývoj template enginov pre Express
menu: advanced
lang: sk
description: Learn how to develop custom template engines for Express.js using app.engine(),
  with examples on creating and integrating your own template rendering logic.
---

# Vývoj template enginov pre Express

Pre vytvorenie vlastného template enginu použite metódu `app.engine(ext, callback)`. Parameter `ext` špecifikuje príponu súborov a `callback` je samotná funkcia template enginu, ktorá príjma nasledujúce prvky ako parametre: cesta k súboru, options objekt a callback funkciu.

Nasledujúci kód je príkladom implementácie veľmi jednoduchého template enginu pre rendrovanie `.ntl` súborov.

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

Odteraz bude vaša aplikácia schopná rendrovať `.ntl` súbory. Vytvorte súbor s názvom `index.ntl` a `views` priečinok s nasledujúcim obsahom.

```pug
#title#
#message#
```
Potom vo vašej aplikácii vytvorte takýto route:

```js
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})
```
Keď vykonáte request na home page, `index.ntl` bude vyrendrované ako HTML.
