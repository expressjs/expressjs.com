---
layout: page
title: Compilazione del middleware per l'utilizzo nelle applicazioni Express
menu: guide
lang: it
---

# Compilazione del middleware per l'utilizzo nelle applicazioni Express

<h2>Panoramica</h2>

Le funzioni *middleware* sono funzioni con accesso all'[oggetto richiesta](/{{ page.lang }}/4x/api.html#req)  (`req`), all'[oggetto risposta](/{{ page.lang }}/4x/api.html#res) (`res`) e alla successiva funzione middleware nel ciclo richiesta-risposta dell'applicazione. La successiva funzione middleware viene comunemente denotata da una variabile denominata `next`.

Le funzioni middleware possono eseguire le attività elencate di seguito:

* Eseguire qualsiasi codice.
* Apportare modifiche agli oggetti richiesta e risposta.
* Terminare il ciclo richiesta-risposta.
* Chiamare il successivo middleware nello stack.

Se la funzione middleware corrente non termina il ciclo richiesta-risposta, deve richiamare `next()` per passare il controllo alla successiva funzione middleware. Altrimenti, la richiesta verrà lasciata in sospeso.

I seguenti esempi mostrano gli elementi di una chiamata alla funzione middleware:

<table style="padding: 0; border: 0; width: 960px; margin-bottom: 10px;">
<tr><td style="margin: 0; padding: 0px; border: 0; width: 410px;">
<img src="/images/express-mw.png" style="margin: 0px; padding: 0px; width: 410px; height: 308px;" />
</td>
<td style="margin: 0; padding: 0 0 0 5px; border: 0; width: 550px;">
<div class="callout" id="callout1">Metodo HTTP per cui si applica la funzione middleware.</div>

<div class="callout" id="callout2">Percorso (route) per cui si applica la funzione middleware.</div>

<div class="callout" id="callout3">La funzione middleware.</div>

<div class="callout" id="callout4">Argomento di callback nella funzione middleware, denominata per convenzione "next".</div>

<div class="callout" id="callout5">Argomento <a href="../4x/api.html#res">risposta</a> HTTP nella funzione middleware, denominato "res" per convenzione.</div>

<div class="callout" id="callout6">Argomento <a href="../4x/api.html#req">richiesta</a> HTTP nella funzione middleware, denominato "req" per convenzione.</div>
</td></tr>
</table>

<!--
<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var app = express();
app.get('/', function(req, res, next) {
	next();
});
</code>
</pre>

* <code>app.get</code>: Metodo HTTP per cui si applica la funzione middleware.

* <code>'/'</code>: Percorso (route) per cui si applica la funzione middleware.

* <code>function</code>: La funzione middleware.

* <code>req</code>: Argomento <a href="../4x/api.html#req">richiesta</a> HTTP nella funzione middleware, denominato "req" per convenzione.

* <code>res</code>: Argomento <a href="../4x/api.html#res">risposta</a> HTTP nella funzione middleware, denominato "res" per convenzione.

* <code>next</code>: Argomento di callback nella funzione middleware, denominata per convenzione "next".
-->

Ecco un esempio di una semplice applicazione Express "Hello World", per cui si definiranno due funzioni middleware:

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000);
</code>
</pre>

<h2>Sviluppo</h2>

Ecco un semplice esempio di una funzione middleware, denominata "myLogger". Questa funzione stampa semplicemente la dicitura "LOGGED" quando una richiesta all'applicazione la attraversa. La funzione middleware è assegnata ad una variabile denominata `myLogger`.

<pre>
<code class="language-javascript" translate="no">
var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};
</code>
</pre>

<div class="doc-box doc-notice" markdown="1">
Si noti la chiamata precedente a `next()`.  Richiamando questa funzione si richiama la successiva funzione middleware nell'applicazione.
La funzione `next()` non fa parte dell'API Express o Node.js, ma è il terzo argomento trasmesso alla funzione middleware.  La funzione `next()` potrebbe essere denominata in qualsiasi modo, ma per convenzione viene sempre denominata "next". Per evitare confusione, utilizzare sempre questa convenzione.
</div>

Per caricare la funzione middleware, richiamare `app.use()`, specificando la funzione middleware.
Ad esempio, il seguente codice carica la funzione middleware `myLogger` prima della route al percorso root (/).

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var app = express();

var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

app.use(myLogger);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000);
</code>
</pre>

Ogni volta che un'applicazione riceve una richiesta, viene stampato il messaggio "LOGGED" sul terminale.

L'ordine di caricamento del middleware è importante: le funzioni middleware che vengono caricate per prime vengono anche eseguite per prime.

Se `myLogger` viene caricato dopo la route sul percorso root, la richiesta non lo raggiunge mai e l'applicazione non stampa "LOGGED", poiché l'handler di route del percorso root termina il ciclo richiesta-risposta.

La funzione middleware `myLogger` stampa semplicemente un messaggio, successivamente passa la richiesta alla successiva funzione middleware nello stack chiamando la funzione `next()`.

Nel successivo esempio viene aggiunta una proprietà denominata `requestTime` all'oggetto richiesta. Questa funzione middleware verrà denominata "requestTime".

<pre>
<code class="language-javascript" translate="no">
var requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};
</code>
</pre>

L'applicazione utilizza ora la funzione middleware `requestTime`. Inoltre, la funzione di callback della route percorso root utilizza la proprietà che la funzione middleware aggiunge a `req` (l'oggetto richiesta).

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var app = express();

var requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

app.use(requestTime);

app.get('/', function (req, res) {
  var responseText = 'Hello World!<br>';
  responseText += '<small>Requested at: ' + req.requestTime + '</small>';
  res.send(responseText);
});

app.listen(3000);
</code>
</pre>

Quando si effettua una richiesta al root dell'applicazione, l'applicazione mostra la cronologia data e ora della richiesta nel browser.

Poiché si dispone dell'accesso all'oggetto richiesta, l'oggetto risposta, la successiva funzione middleware nello stack e l'API Node.js completo, le possibilità con le funzioni middleware sono infinite.

Per ulteriori informazioni sul middleware Express, consultare: [Utilizzo del middleware Express](/{{ page.lang }}/guide/using-middleware.html).
