---
layout: page
title: Utilizzo di motori di template con Express
menu: guide
lang: it
---

# Utilizzo di motori di template con Express

Prima che Express possa eseguire il rendering di file template, è necessario specificare le seguenti impostazioni dell'applicazione:

* `views`, la directory dove sono ubicati i file di template. Ad esempio: `app.set('views', './views')`
* `view engine`, il motore di template da utilizzare. Ad esempio: `app.set('view engine', 'pug')`

Quindi, installare il pacchetto npm del motore di template corrispondente:

```console
$ npm install pug --save
```

<div class="doc-box doc-notice" markdown="1">
I motori di template compatibili con Express, ad esempio Pug esportano una funzione denominata `__express(filePath, options, callback)`, che viene richiamata dalla funzione `res.render()`, per il rendering del codice di template.

Alcuni motori di template non seguono questa convenzione. La libreria [Consolidate.js](https://www.npmjs.org/package/consolidate) segue questa convenzione, associando tutti i motori di template Node.js popolari e, perciò, funziona ininterrottamente in Express.
</div>

Una volta specificata l'impostazione view engine, non è necessario specificare il motore o caricare il modulo del motore di template nella propria app; Express carica il modulo internamente, come mostrato di seguito (per l'esempio precedente).

<pre>
<code class="language-javascript" translate="no">
app.set('view engine', 'pug');
</code>
</pre>

Creare un file di template Pug denominato `index.pug` nella directory `views`, con il seguente contenuto:

<pre>
<code class="language-javascript" translate="no">
html
  head
    title= title
  body
    h1= message
</code>
</pre>

Quindi, creare una route per il rendering del file `index.pug`. Se la proprietà `view engine` non è impostata, è necessario specificare l'estensione del file `view`. Altrimenti, è possibile ometterla.

<pre>
<code class="language-javascript" translate="no">
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});
</code>
</pre>

Quando si fa una richiesta alla home page, verrà eseguito il rendering del file `index.pug` come HTML.

Per ulteriori informazioni su come funzionano i motori di template in Express, consultare la sezione: ["Sviluppo dei motori di template per Express"](/{{ page.lang }}/advanced/developing-template-engines.html).
