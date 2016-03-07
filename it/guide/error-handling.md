---
layout: page
title: Gestione degli errori di Express
menu: guide
lang: it
---

# Gestione degli errori

Definire le funzioni middleware di gestione degli errori nello stesso modo in cui si definiscono altre funzioni middleware,
ad eccezione delle funzioni di gestione degli errori che hanno quattro argomenti invece di tre:
`(err, req, res, next)`. Ad esempio:

<pre>
<code class="language-javascript" translate="no">
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
</code>
</pre>

Si definisce il middleware di gestione degli errori per ultimo, successivamente `app.use()` e altre chiamate route; ad esempio:

<pre>
<code class="language-javascript" translate="no">
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser());
app.use(methodOverride());
app.use(function(err, req, res, next) {
  // logic
});
</code>
</pre>

Le risposte dall'interno delle funzione middleware possono essere in qualsiasi formato desiderato, ad esempio una pagina di errore HTML, un messaggio semplice o una stringa JSON.

Per motivi organizzativi (e framework di livello più alto), è possibile definire
diverse funzioni middleware di gestione degli errori, come solitamente si fa con
le funzioni middleware normali. Ad esempio, se si desidera definire un programma di gestione errori per le richieste
effettuate utilizzando `XHR` e quelle senza, è necessario utilizzare i seguenti comandi:

<pre>
<code class="language-javascript" translate="no">
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser());
app.use(methodOverride());
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
</code>
</pre>

In questo esempio, il `logErrors` generico potrebbe scrivere le richieste e le informazioni sull'errore
su `stderr`, ad esempio:

<pre>
<code class="language-javascript" translate="no">
function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}
</code>
</pre>

Inoltre, in questo esempio, `clientErrorHandler` viene definito come segue; in questo caso, l'errore viene chiaramente tramandato al successivo:

<pre>
<code class="language-javascript" translate="no">
function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}
</code>
</pre>

La funzione "catch-all" `errorHandler` potrebbe essere implementata come segue:

<pre>
<code class="language-javascript" translate="no">
function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}
</code>
</pre>

Se si trasmette qualsiasi cosa alla funzione `next()` (ad eccezione della stringa `'route'`), Express considera la richiesta corrente come se contenesse errori e ignorerà qualsiasi altra funzione middleware e routing di non gestione degli errori restante. Se si desidera gestire quell'errore in qualche modo, sarà necessario creare una route di gestione degli errori come descritto nella sezione successiva.

Se si dispone di un gestore route con più funzioni di callback, è possibile utilizzare il parametro `route` per passare al successivo gestore route.  Ad esempio:

<pre>
<code class="language-javascript" translate="no">
app.get('/a_route_behind_paywall',
  function checkIfPaidSubscriber(req, res, next) {
    if(!req.user.hasPaid) {

      // continue handling this request
      next('route');
    }
  }, function getPaidContent(req, res, next) {
    PaidContent.find(function(err, doc) {
      if(err) return next(err);
      res.json(doc);
    });
  });
</code>
</pre>

In questo esempio, il gestore `getPaidContent` verrà ignorato ma qualsiasi altro gestore rimanente in `app` per `/a_route_behind_paywall` verrà eseguito senza interruzione.

<div class="doc-box doc-info" markdown="1">
Le chiamate a `next()` e `next(err)` indicano che il gestore corrente è completo e in che stato si trova.  `next(err)` ignorerà tutti gli handler rimanenti nella catena ad eccezione degli handler configurati per gestire gli errori come descritto sopra.
</div>

## Il gestore errori predefinito

Express viene fornito insieme a un gestore degli errori integrato, il quale gestisce gli errori che potrebbero verificarsi nell'applicazione. Questa funzione middleware di gestione degli errori viene aggiunta alla fine dello stack della funzione middleware.

Se un errore viene ignorato e passato a `next()` e non viene gestito in un gestore
degli errori, verrà gestito dal gestore errori integrato; l'errore verrà scritto sul client con la traccia
stack. La traccia stack non viene inclusa nell'ambiente di produzione.

<div class="doc-box doc-info" markdown="1">
Impostare la variabile di ambiente `NODE_ENV` su `production`, per eseguire l'applicazione nella modalità di produzione.
</div>

Se si chiama `next()` con un errore dopo che si è iniziato a scrivere la risposta
(ad esempio, se si riscontra un errore mentre si esegue lo streaming della
risposta al client) il gestore degli errori predefinito di Express chiude la connessione
e rifiuta la richiesta.

Pertanto, quando si aggiunge un gestore degli errori personalizzato, si consiglia di associarlo al meccanismo
di gestione degli errori predefinito in Express, quando le intestazioni
sono state già inviate al client:

<pre>
<code class="language-javascript" translate="no">
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
}
</code>
</pre>
