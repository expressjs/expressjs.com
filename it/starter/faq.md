---
layout: page
title: FAQ di Express
menu: starter
lang: it
---

# FAQ

## In che modo devo strutturare l'applicazione?

Non esiste una risposta definitiva a questa domanda. La risposta dipende
dalla scalabilità dell'applicazione e dal team coinvolto. Per essere molto flessibile,
Express non fornisce molte indicazioni in termini di struttura.

Le route e altre logiche specifiche dell'applicazione possono essere presenti in molti file,
in qualsiasi struttura di directory desiderata. Visualizzare i seguenti
esempi:

* [Elenchi route](https://github.com/expressjs/express/blob/4.13.1/examples/route-separation/index.js#L32-47)
* [Definizione route](https://github.com/expressjs/express/blob/4.13.1/examples/route-map/index.js#L52-L66)
* [Controllori stile MVC](https://github.com/expressjs/express/tree/master/examples/mvc)

Inoltre, ci sono delle estensioni di terze parti per Express, le quali semplificano alcuni di questi modelli:

* [Routing pieno di risorse](https://github.com/expressjs/express-resource)

## In che modo è possibile definire i modelli?

Express non ha nessuna nozione di database. Questo concetto viene lasciato a moduli
Node di terzi, consentendo di interfacciarsi
con quasi qualsiasi database.

Consultare [LoopBack](http://loopback.io) per un framework basato su Express incentrato sui modelli.

## In che modo è possibile autenticare gli utenti?

L'autenticazione è un'altra area categorica in cui non si
avventura Express.  È possibile utilizzare qualsiasi schema di autenticazione desiderato.
Per uno schema nome utente / password semplice, consultare [questo esempio](https://github.com/expressjs/express/tree/master/examples/auth).


## Quale motore di template supporta Express?

Express supporta qualsiasi motore di template conforme alla sigla `(path, locals, callback)`.
Per normalizzare le interfacce del motore di template e la memorizzazione in cache, consultare il progetto
[consolidate.js](https://github.com/visionmedia/consolidate.js)
per il supporto. I motori di template potrebbero ancora non supportare Express.

## In che modo è possibile gestire le risposte 404?

In Express, le risposte 404 non sono il risultato di un errore, pertanto
il middleware di gestione degli errori non le individuerà. Questo accade perché
una risposta 404 indica semplicemente l'assenza di ulteriori operazioni da effettuare;
in altre parole, Express ha eseguito tutte le funzioni middleware e route
e non ha riscontrato nessuna risposta da parte di quest'ultimi. L'unica cosa da fare è aggiungere
una funzione middleware alla parte finale dello stack (sotto tutte le altre funzioni)
per gestire una risposta 404:

<pre>
<code class="language-javascript" translate="no">
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});
</code>
</pre>

## In che modo è possibile impostare un gestore degli errori?

È possibile definire il middleware di gestione degli errori nello stesso modo in cui si definisce qualsiasi altro middleware,
ad eccezione delle funzioni di gestione degli errori che hanno quattro argomenti invece di tre; nello specifico la firma `(err, req, res, next)`:

<pre>
<code class="language-javascript" translate="no">
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
</code>
</pre>

Per ulteriori informazioni, consultare [Gestione degli errori](/{{ page.lang }}/guide/error-handling.html).

## In che modo è possibile eseguire il rendering dell'HTML normale?

Non è necessario farlo! Non è necessario "eseguire il rendering" dell'HTML con la funzione `res.render()`.
Se si dispone di un file specifico, utilizzare la funzione `res.sendFile()`.
Se si stanno gestendo molti asset da una directory, utilizzare la funzione middleware
`express.static()`.
