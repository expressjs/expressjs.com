---
layout: page
title: Routing di base Express
menu: starter
lang: it
---

# Routing di base

Per *Routing* si intende determinare come un'applicazione risponde a una richiesta client a un endpoint particolare, il quale è un URI (o percorso) e un metodo di richiesta HTTP specifico (GET, POST e così via).

Ciascuna route può disporre di una o più funzioni dell'handler, le quali vengono eseguite quando si trova una corrispondenza per la route.

La definizione della route ha la seguente struttura:
<pre>
<code class="language-javascript" translate="no">
app.METHOD(PATH, HANDLER)
</code>
</pre>

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

<pre>
<code class="language-javascript" translate="no">
app.get('/', function (req, res) {
  res.send('Hello World!');
});
</code>
</pre>

Rispondere alla richiesta POST sulla route principale (`/`), la home page dell'applicazione:

<pre>
<code class="language-javascript" translate="no">
app.post('/', function (req, res) {
  res.send('Got a POST request');
});
</code>
</pre>

Rispondere a una richiesta PUT alla route `/user`:

<pre>
<code class="language-javascript" translate="no">
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});
</code>
</pre>

Rispondere a una richiesta DELETE alla route `/user`:

<pre>
<code class="language-javascript" translate="no">
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});
</code>
</pre>

Per ulteriori dettagli sul routing, consultare il [Manuale routing](/{{ page.lang }}/guide/routing.html).
