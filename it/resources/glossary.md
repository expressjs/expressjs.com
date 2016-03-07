---
layout: page
title: Glossario di Express
menu: resources
lang: it
---

# Glossario

### applicazione

Solitamente, uno o più programmi progettati per gestire operazioni per uno scopo specifico.  In ambito di Express, un programma che utilizza API Express in esecuzione su una piattaforma Node.js.  Potrebbe inoltre fare riferimento a [app object](/{{ page.lang }}/api.html#express).

### API

Interfaccia di programmazione dell'applicazione.  Si consiglia di scrivere per intero l'acronimo quando lo si usa per la prima volta.

### Express

Un framework web veloce, non categorico e minimalista per le applicazioni Node.js.  Solitamente, si preferisce utilizzare "Express" piuttosto che "Express.js," anche se il secondo è accettabile.

### libuv

Una libreria di supporto multi-piattaforma che si focalizza su I/O asincrono, in principio sviluppato per essere utilizzato da Node.js.

### middleware

Una funzione che viene richiamata dal livello di routing Express prima dell'handler di richiesta finale, pertanto si trova al centro tra una richiesta base e la route prevista.  Segue un elenco che indica alcune terminologie utilizzate per middleware:

  * `var foo = require('middleware')` significa *richiesta* o *utilizzo* di un modulo Node.js. E l'istruzione `var mw = foo()` solitamente restituisce il middleware.
  * `app.use(mw)` significa *aggiunta del middleware allo stack di elaborazione globale*.
  * `app.get('/foo', mw, function (req, res) { ... })` significa *aggiunta del middleware allo stack di elaborazione "GET /foo"*.

### Node.js

Una piattaforma software utilizzata per creare applicazioni di rete scalabili. Node.js utilizza JavaScript e il relativo linguaggio di scripting e raggiunge una trasmissione di dati elevata tramite un I/O non a blocchi e un loop di evento a thread singolo.  Consultare [nodejs.org](http://nodejs.org/). **Nota di utilizzo**: Inizialmente, "Node.js," successivamente "Node".

### open-source, open source

Quando utilizzato come aggettivo, viene aggiunto un trattino; ad esempio: "Questo è un software open-source." Consultare [Software open-source su Wikipedia](http://en.wikipedia.org/wiki/Open-source_software). Nota: anche se è molto comune scriverlo senza trattino, stiamo utilizzando le regole dell'inglese standard che richiedono di inserire un trattino in un aggettivo composto.

### richiesta

Una richiesta HTTP.  Un client un messaggio di richiesta HTTP a un server, il quale restituisce una risposta.  La richiesta deve utilizzare uno dei diversi [metodi di richiesta](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods) ad esempio GET, POST e così via.

### risposta

Una risposta HTTP. Un server restituisce un messaggio di risposta HTTP al client. La risposta contiene le informazioni sullo stato di completamento su una richiesta e potrebbe inoltre contenere del contenuto richiesto nel corpo del messaggio.

### route

Parte di un URL che identifica una risorsa.  Ad esempio, in `http://foo.com/products/id`, "/products/id" è la route.

### router

Consultare [router](/{{ page.lang }}/4x/api.html#router) nei riferimenti API.
