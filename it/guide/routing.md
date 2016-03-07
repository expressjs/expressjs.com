---
layout: page
title: Routing Express
menu: guide
lang: it
---

# Routing

*Routing* fa riferimento alla definizione di endpoint dell'applicazione (URI) e alla loro modalità di risposta alle richieste del client.
Per un'introduzione al concetto di routing, consultare la sezione [Routing di base](/{{ page.lang }}/starter/basic-routing.html).

Il codice seguente è un esempio di una route veramente di base.

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});
</code>
</pre>

<h2 id="route-methods">Metodi di route</h2>

Un metodo di route deriva da uno dei metodi HTTP ed è collegato ad un'istanza delle classe `express`.

Il codice seguente è un esempio di route definite per i metodi GET e POST nella root dell'app.

<pre>
<code class="language-javascript" translate="no">
// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage');
});

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage');
});
</code>
</pre>

Express supporta i seguenti metodi di routing che corrispondono a metodi HTTP: `get`, `post`, `put`, `head`, `delete`, `options`, `trace`, `copy`, `lock`, `mkcol`, `move`, `purge`, `propfind`, `proppatch`, `unlock`, `report`, `mkactivity`, `checkout`, `merge`, `m-search`, `notify`, `subscribe`, `unsubscribe`, `patch`, `search` e `connect`.

<div class="doc-box doc-info" markdown="1">
In metodi di route che si convertono in nomi di variabili JavaScript non validi, utilizzare la notazione tra parentesi. Ad esempio,
`app['m-search']('/', function ...`
</div>

Esiste un metodo di routing speciale, `app.all()`, che non deriva da alcun metodo HTTP. Questo metodo viene utilizzato per caricare funzioni middleware in un percorso per tutti i metodi di richiesta.

Nell'esempio seguente, l'handler verrà eseguito per richieste a "/secret" se si stanno utilizzando GET, POST, PUT, DELETE, o qualsiasi altro metodo di richiesta HTTP supportato nel [modulo http](https://nodejs.org/api/http.html#http_http_methods).

<pre>
<code class="language-javascript" translate="no">
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});
</code>
</pre>

<h2 id="route-paths">Percorsi di route</h2>

I percorsi di route, in combinazione con un metodo di richiesta, definiscono gli endpoint a cui possono essere rivolte richieste. I percorsi di route possono essere stringhe, modelli di stringa o espressioni regolari.

<div class="doc-box doc-info" markdown="1">
  Express utilizza [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) per la corrispondenza dei percorsi di route; consultare la documentazione relativa a path-to-regexp per tutte le possibilità di definizione di percorsi di route. [Express Route Tester](http://forbeslindesay.github.io/express-route-tester/) è uno strumento utile per il test delle route Express di base, anche se non supporta la corrispondenza di modelli.
</div>

<div class="doc-box doc-warn" markdown="1">
Le stringhe di query non fanno parte del percorso di route.
</div>

Ecco alcuni esempi di percorsi di route basati su stringhe.

Questo percorso di route corrisponderà a richieste nella route root, `/`.

<pre>
<code class="language-javascript" translate="no">
app.get('/', function (req, res) {
  res.send('root');
});
</code>
</pre>

Questo percorso di route corrisponderà a richieste in `/about`.

<pre>
<code class="language-javascript" translate="no">
app.get('/about', function (req, res) {
  res.send('about');
});
</code>
</pre>

Questo percorso di route corrisponderà a richieste in `/random.text`.

<pre>
<code class="language-javascript" translate="no">
app.get('/random.text', function (req, res) {
  res.send('random.text');
});
</code>
</pre>

Ecco alcuni esempi di percorsi di route basati su modelli di stringa.

Questo percorso di route corrisponderà a `acd` e `abcd`.

<pre>
<code class="language-javascript" translate="no">
app.get('/ab?cd', function(req, res) {
  res.send('ab?cd');
});
</code>
</pre>

Questo percorso di route corrisponderà a `abcd`, `abbcd`, `abbbcd` e così via.

<pre>
<code class="language-javascript" translate="no">
app.get('/ab+cd', function(req, res) {
  res.send('ab+cd');
});
</code>
</pre>

Questo percorso di route corrisponderà a `abcd`, `abxcd`, `abRABDOMcd`, `ab123cd` e così via.

<pre>
<code class="language-javascript" translate="no">
app.get('/ab*cd', function(req, res) {
  res.send('ab*cd');
});
</code>
</pre>

Questo percorso di route corrisponderà a `/abe` e `/abcde`.

<pre>
<code class="language-javascript" translate="no">
app.get('/ab(cd)?e', function(req, res) {
 res.send('ab(cd)?e');
});
</code>
</pre>

<div class="doc-box doc-info" markdown="1">
I caratteri ?, +, * e () sono sottoinsiemi delle rispettive controparti di espressioni regolari. Trattino (-) e punto (.) vengono interpretati letteralmente da percorsi basati su stringhe.
</div>

Esempi di percorsi di route basati su espressioni regolari:

Questo percorso di route corrisponderà a qualsiasi elemento con "a" nel nome route.

<pre>
<code class="language-javascript" translate="no">
app.get(/a/, function(req, res) {
  res.send('/a/');
});
</code>
</pre>

Questo percorso di route corrisponderà a `butterfly` e `dragonfly`, ma non a `butterflyman`, `dragonfly man` e così via.

<pre>
<code class="language-javascript" translate="no">
app.get(/.*fly$/, function(req, res) {
  res.send('/.*fly$/');
});
</code>
</pre>

<h2 id="route-handlers">Handler di route</h2>

È possibile fornire molteplici funzioni di callback che si comportino come [middleware](/{{ page.lang }}/guide/using-middleware.html) per gestire una richiesta. La sola eccezione è rappresentata dal fatto che queste callback potrebbero richiamare `next('route')` per ignorare le callback di route restanti. È possibile utilizzare questo meccanismo per imporre pre-condizioni su una route, quindi, passare il controllo a route successive, nel caso non ci siano motivi per proseguire con la route corrente.

Gli handler di route possono avere il formato di una funzione, di un array di funzioni o di combinazioni di entrambi, come illustrato nei seguenti esempi.

Una singola funzione di callback può gestire una route.  Ad esempio:

<pre>
<code class="language-javascript" translate="no">
app.get('/example/a', function (req, res) {
  res.send('Hello from A!');
});
</code>
</pre>

Più funzioni di callback possono gestire una route (assicurarsi di specificare l'oggetto `next`). Ad esempio:

<pre>
<code class="language-javascript" translate="no">
app.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from B!');
});
</code>
</pre>

Un array di funzioni callback possono gestire una route.  Ad esempio:

<pre>
<code class="language-javascript" translate="no">
var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

var cb2 = function (req, res) {
  res.send('Hello from C!');
}

app.get('/example/c', [cb0, cb1, cb2]);
</code>
</pre>

Una combinazione di funzioni indipendenti e array di funzioni può gestire una route.  Ad esempio:

<pre>
<code class="language-javascript" translate="no">
var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from D!');
});
</code>
</pre>

<h2 id="response-methods">Metodi di risposta</h2>

I metodi sull'oggetto risposta (`res`) nella seguente tabella possono inviare una risposta al client e terminare il ciclo richiesta-risposta. Se nessuno di questi metodi viene richiamato da un handler di route, la richiesta del client verrà lasciata in sospeso.

| Metodo               | Descrizione
|----------------------|--------------------------------------
| [res.download()](/{{ page.lang }}/4x/api.html#res.download)   | Richiedere un file da scaricare.
| [res.end()](/{{ page.lang }}/4x/api.html#res.end)        | Terminare il processo di risposta.
| [res.json()](/{{ page.lang }}/4x/api.html#res.json)       | Inviare una risposta JSON.
| [res.jsonp()](/{{ page.lang }}/4x/api.html#res.jsonp)      | Inviare una risposta JSON con supporto JSONP.
| [res.redirect()](/{{ page.lang }}/4x/api.html#res.redirect)   | Reindirizzare una richiesta.
| [res.render()](/{{ page.lang }}/4x/api.html#res.render)     | Eseguire il rendering di un template di vista.
| [res.send()](/{{ page.lang }}/4x/api.html#res.send)       | Inviare una risposta di vari tipi.
| [res.sendFile](/{{ page.lang }}/4x/api.html#res.sendFile)     | Inviare un file come un flusso di ottetti.
| [res.sendStatus()](/{{ page.lang }}/4x/api.html#res.sendStatus) | Impostare il codice di stato della risposta e inviare la relativa rappresentazione di stringa come corpo della risposta.

<h2 id="app-route">app.route()</h2>

È possibile creare handler di route concatenabili per un percorso di route, utilizzando `app.route()`.
Poiché il percorso è specificato in una singola ubicazione, la creazione di route modulari è utile, come lo è la riduzione della ridondanza e degli errori tipografici. Per ulteriori informazioni sulle route, consultare: [Documentazione su Router()](/{{ page.lang }}/4x/api.html#router).

Ecco un esempio di handler di route concatenati, definiti utilizzando `app.route()`.

<pre>
<code class="language-javascript" translate="no">
app.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });
</code>
</pre>

<h2 id="express-router">express.Router</h2>

Utilizzare la classe `express.Router` per creare handler di route modulari, montabili. Un'istanza `Router` è un middleware e un sistema di routing completo; per questa ragione, spesso si definisce "mini-app".

Nel seguente esempio si crea un router come modulo, si carica al suo interno una funzione middleware, si definiscono alcune route e si monta un modulo router su un percorso nell'app principale.

Creare un file router denominato `birds.js` nella directory app, con il seguente contenuto:

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.send('Birds home page');
});
// define the about route
router.get('/about', function(req, res) {
  res.send('About birds');
});

module.exports = router;
</code>
</pre>

Quindi, caricare il modulo router nell'app:

<pre>
<code class="language-javascript" translate="no">
var birds = require('./birds');
...
app.use('/birds', birds);
</code>
</pre>

L'app ora sarà in grado di gestire richieste a `/birds` e `/birds/about`, oltre a richiamare la funzione middleware `timeLog`, specifica per la route.
