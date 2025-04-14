---
layout: page
title: Utilizzo di motori di template con Express
description: Discover how to integrate and use template engines like Pug, Handlebars, and EJS with Express.js to render dynamic HTML pages efficiently.
menu: guide
lang: it
redirect_from: /guide/using-template-engines.html
---

# Utilizzo di motori di template con Express

A _template engine_ enables you to use static template files in your application. At runtime, the template engine replaces
variables in a template file with actual values, and transforms the template into an HTML file sent to the client.
This approach makes it easier to design an HTML page.

The [Express application generator](/{{ page.lang }}/starter/generator.html) uses [Pug](https://pugjs.org/api/getting-started.html) as its default, but it also supports [Handlebars](https://www.npmjs.com/package/handlebars), and [EJS](https://www.npmjs.com/package/ejs), among others.

To render template files, set the following [application setting properties](/{{ page.lang }}/4x/api.html#app.set), in the default `app.js` created by the generator:

- `views`, la directory dove sono ubicati i file di template. Ad esempio: `app.set('views', './views')`
  This defaults to the `views` directory in the application root directory.
- `view engine`, il motore di template da utilizzare. Ad esempio: `app.set('view engine', 'pug')`

Quindi, installare il pacchetto npm del motore di template corrispondente:

```bash
$ npm install pug --save
```

<div class="doc-box doc-notice" markdown="1">
I motori di template compatibili con Express, ad esempio Pug esportano una funzione denominata `__express(filePath, options, callback)`, che viene richiamata dalla funzione `res.render()`, per il rendering del codice di template.

Alcuni motori di template non seguono questa convenzione. La libreria [Consolidate.js](https://www.npmjs.org/package/consolidate) segue questa convenzione, associando tutti i motori di template Node.js popolari e, perciò, funziona ininterrottamente in Express.

</div>

Una volta specificata l'impostazione view engine, non è necessario specificare il motore o caricare il modulo del motore di template nella propria app; Express carica il modulo internamente, come mostrato di seguito (per l'esempio precedente).

```js
app.set('view engine', 'pug')
```

Creare un file di template Pug denominato `index.pug` nella directory `views`, con il seguente contenuto:

```pug
html
  head
    title= title
  body
    h1= message
```

Quindi, creare una route per il rendering del file `index.pug`. Se la proprietà `view engine` non è impostata, è necessario specificare l'estensione del file `view`. Altrimenti, è possibile ometterla.

```js
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})
```

Quando si fa una richiesta alla home page, verrà eseguito il rendering del file `index.pug` come HTML.

The view engine cache does not cache the contents of the template's output, only the underlying template itself. The view is still re-rendered with every request even when the cache is on.
