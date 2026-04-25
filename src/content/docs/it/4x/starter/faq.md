---
title: FAQ
description: Trova le risposte alle domande più frequenti su Express.js, inclusi argomenti sulla struttura delle applicazioni, modelli, autenticazione, modelli motori, gestione degli errori e altro ancora.
---

## Come dovrei strutturare la mia applicazione?

Non esiste una risposta definitiva a questa domanda. La risposta dipende da
sulla scala della tua applicazione e del team che è coinvolto. Per essere il più flessibile possibile
, Express non fa ipotesi in termini di struttura.

Le rotte e altre logiche specifiche per le applicazioni possono vivere in tutti i file
che desideri, in qualsiasi struttura di directory che preferisci. Visualizza i seguenti esempi di ispirazione
:

- [Elenco delle rotte](https://github.com/expressjs/express/blob/4.13.1/examples/route-separation/index.js#L32-L47)
- [Mappa del percorso](https://github.com/expressjs/express/blob/4.13.1/examples/route-map/index.js#L52-L66)
- [MVC style controllers](https://github.com/expressjs/express/tree/master/examples/mvc)

Inoltre, ci sono estensioni di terze parti per Express, che semplificano alcuni di questi modelli:

- [Instradamento delle risorse](https://github.com/expressjs/express-resource)

## Come definisco i modelli?

Express non ha alcuna nozione di banca dati. Questo concetto è
lasciato fino a moduli Nodo di terze parti, consentendo di
interfaccia con quasi tutti i database.

Vedi [LoopBack](http://loopback.io) per un framework basato su Espresso che è centrato sui modelli.

## Come posso autenticare gli utenti?

L'autenticazione è un'altra area opinionata in cui Express non si avventura
. È possibile utilizzare qualsiasi schema di autenticazione desiderato.
Per un semplice schema username / password, vedere [questo esempio](https://github.com/expressjs/express/tree/master/examples/auth).

## Quali modelli di motori supporta Express?

Express supporta qualsiasi modello di motore conforme alla firma `(percorso, locale, callback)`.
Per normalizzare i modelli di interfacce motore e caching, vedere il progetto
[consolidate.js](https://github.com/visionmedia/consolidate.js)
per il supporto. Motori modello non elencati potrebbero ancora supportare la firma Express.

Per ulteriori informazioni, vedere [Utilizzo di modelli di motori con Express](/en/guide/using-template-engines).

## Come posso gestire 404 risposte?

In Express, 404 risposte non sono il risultato di un errore, quindi
il middleware del gestore dell'errore non le catturerà. Questo comportamento è
perché una risposta 404 indica semplicemente l'assenza di lavoro supplementare da fare;
in altre parole, Express ha eseguito tutte le funzioni e i percorsi del middleware,
e ha trovato che nessuno di loro ha risposto. Tutto quello che devi fare
è aggiungere una funzione middleware nella parte inferiore dello stack (sotto tutte le altre funzioni)
per gestire una risposta 404:

```js
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});
```

Aggiungi percorsi dinamicamente al runtime su un'istanza di `express.Router()`
in modo che i percorsi non siano sostituiti da una funzione middleware.

## Come faccio a configurare un gestore di errori?

Definisci middleware per la gestione degli errori allo stesso modo di altri middleware,
tranne con quattro argomenti invece di tre; specificatamente con la firma `(err, req, res, next)`:

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

Per ulteriori informazioni, vedere [Gestione degli errori](/en/guide/error-handling).

## Come faccio a rendere semplice HTML?

Non lo fate! Non c'è bisogno di "render" HTML con la funzione `res.render()`.
Se hai un file specifico, usa la funzione `res.sendFile()`.
Se stai servendo molti asset da una directory, usa la funzione middleware `express.static()`
.

## Quale versione di Node.js richiede Express?

- [Express 4.x](/en/4x/api) richiede Node.js 0.10 o superiore.
- [Express 5.x](/en/5x/api) richiede Node.js 18 o superiore.
