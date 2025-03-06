---
layout: page
title: Routing di base Express
menu: starter
lang: it
description: Learn the fundamentals of routing in Express.js applications, including
  how to define routes, handle HTTP methods, and create route handlers for your web
  server.
---

# Routing di base

Per *Routing* si intende determinare come un'applicazione risponde a una richiesta client a un endpoint particolare, il quale è un URI (o percorso) e un metodo di richiesta HTTP specifico (GET, POST e così via).

Ciascuna route può disporre di una o più funzioni dell'handler, le quali vengono eseguite quando si trova una corrispondenza per la route.

La definizione della route ha la seguente struttura:
```js
app.METHOD(PATH, HANDLER)
```

Dove:

- `app` è un'istanza di `express`.
- `METHOD` è un [metodo di richiesta HTTP](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol).
- `PATH` è un percorso sul server.
- `HANDLER` è la funzione eseguita quando si trova una corrispondenza per la route.

<div class="doc-box doc-notice" markdown="1">
Questo tutorial presume che un'istanza di `express` denominata `app` sia stata creata e che il server sia in esecuzione. Se non si è in grado di creare un'applicazione e avviarla, consultare la sezione [Esempio di Hello world](/{{ page.lang }}/starter/hello-world.html).
</div>

I seguenti esempi mostrano come definire route semplici.

Rispondere con `Hello World!` sulla homepage:

```js
app.get('/', (req, res) => {
  res.send('Hello World!')
})
```

Rispondere alla richiesta POST sulla route principale (`/`), la home page dell'applicazione:

```js
app.post('/', (req, res) => {
  res.send('Got a POST request')
})
```

Rispondere a una richiesta PUT alla route `/user`:

```js
app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user')
})
```

Rispondere a una richiesta DELETE alla route `/user`:

```js
app.delete('/user', (req, res) => {
  res.send('Got a DELETE request at /user')
})
```

Per ulteriori dettagli sul routing, consultare il [Manuale routing](/{{ page.lang }}/guide/routing.html).
