---
layout: page
title: Utilizzo del middleware Express
menu: guide
lang: it
description: Learn how to use middleware in Express.js applications, including application-level
  and router-level middleware, error handling, and integrating third-party middleware.
---

# Utilizzo del middleware

Express è un framework Web di routing e middleware, con funzionalità sua propria minima: un'applicazione Express è essenzialmente a serie di chiamate a funzioni middleware.

Le funzioni *middleware* sono funzioni con accesso all'[oggetto richiesta](/{{ page.lang }}/4x/api.html#req)  (`req`), all'[oggetto risposta](/{{ page.lang }}/4x/api.html#res) (`res`) e alla successiva funzione middleware nel ciclo richiesta-risposta dell'applicazione. La successiva funzione middleware viene comunemente denotata da una variabile denominata `next`.

Le funzioni middleware possono eseguire le attività elencate di seguito:

* Eseguire qualsiasi codice.
* Apportare modifiche agli oggetti richiesta e risposta.
* Terminare il ciclo richiesta-risposta.
* Chiamare la successiva funzione middleware nello stack.

Se la funzione middleware corrente non termina il ciclo richiesta-risposta, deve richiamare `next()` per passare il controllo alla successiva funzione middleware. Altrimenti, la richiesta verrà lasciata in sospeso.

Un'applicazione Express può utilizzare i seguenti tipi di middleware:

 - [Middleware a livello dell'applicazione](#middleware.application)
 - [Middleware a livello del router](#middleware.router)
 - [Middleware di gestione degli errori](#middleware.error-handling)
 - [Middleware integrato](#middleware.built-in)
 - [Middleware di terzi](#middleware.third-party)

È possibile caricare il middleware a livello dell'applicazione e del router con un percorso di montaggio facoltativo.
È possibile inoltre caricare una serie di funzioni middleware contemporaneamente e, in questo modo, si crea un sotto-stack del sistema middleware in un punto di montaggio.

<h2 id='middleware.application'>Middleware a livello dell'applicazione</h2>

Associare il middleware al livello dell'applicazione ad un'istanza dell'[oggetto app](/{{ page.lang }}/4x/api.html#app) utilizzando le funzioni `app.use()` e `app.METHOD()`, dove `METHOD` corrisponde al metodo HTTP della richiesta che la funzione middleware gestisce (ad esempio GET, PUT o POST) in lettere minuscole.

Questo esempio presenta una funzione middleware senza percorso di montaggio. La funzione viene eseguita ogni volta che l'app riceve una richiesta.

```js
const app = express()

app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})
```

Questo esempio presenta una funzione middleware montata nel percorso `/user/:id`. La funzione viene eseguita per qualsiasi tipo di
richiesta HTTP nel percorso `/user/:id`.

```js
app.use('/user/:id', (req, res, next) => {
  console.log('Request Type:', req.method)
  next()
})
```

Questo esempio presenta una route e la relativa funzione handler (sistema middleware). La funzione gestisce richieste GET nel percorso `/user/:id`.

```js
app.get('/user/:id', (req, res, next) => {
  res.send('USER')
})
```

Ecco un esempio di caricamento di una serie di funzioni middleware in un punto di montaggio, con un percorso di montaggio.
Illustra un sotto-stack middleware che stampa informazioni sulla richiesta per qualsiasi tipo di richiesta HTTP nel percorso `/user/:id`.

```js
app.use('/user/:id', (req, res, next) => {
  console.log('Request URL:', req.originalUrl)
  next()
}, (req, res, next) => {
  console.log('Request Type:', req.method)
  next()
})
```

Gli handler di route consentono di definire molteplici route per un percorso. Nell'esempio sottostante sono definite due route per richieste GET nel percorso `/user/:id`. La seconda route non provocherà alcun problema, ma non verrà mai chiamata, poiché la prima route termina il ciclo di richiesta-risposta.

Questo esempio presenta un sotto-stack middleware che gestisce richieste GET nel percorso `/user/:id`.

```js
app.get('/user/:id', (req, res, next) => {
  console.log('ID:', req.params.id)
  next()
}, (req, res, next) => {
  res.send('User Info')
})

// handler for the /user/:id path, which prints the user ID
app.get('/user/:id', (req, res, next) => {
  res.end(req.params.id)
})
```

Per ignorare le restanti funzioni middleware da uno stack di middleware del router, richiamare `next('route')` per passare il controllo alla route successiva.
**NOTA**: `next('route')` funzionerà solo in funzioni middleware che sono state caricate utilizzando le funzioni `app.METHOD()` o `router.METHOD()`.

Questo esempio presenta un sotto-stack middleware che gestisce richieste GET nel percorso `/user/:id`.

```js
app.get('/user/:id', (req, res, next) => {
  // if the user ID is 0, skip to the next route
  if (req.params.id === '0') next('route')
  // otherwise pass the control to the next middleware function in this stack
  else next() //
}, (req, res, next) => {
  // render a regular page
  res.render('regular')
})

// handler for the /user/:id path, which renders a special page
app.get('/user/:id', (req, res, next) => {
  res.render('special')
})
```

<h2 id='middleware.router'>Middleware a livello del router</h2>

Il middleware a livello del router funziona nello stesso modo di quello a livello dell'applicazione, fatta eccezione per il fatto di essere associato ad un'istanza di `express.Router()`.

```js
const router = express.Router()
```
Caricare il middleware a livello del router utilizzando le funzioni `router.use()` e `router.METHOD()`.

Il seguente codice di esempio replica il sistema middleware mostrato sopra per il middleware a livello dell'applicazione, utilizzando il middleware a livello del router:

```js
const app = express()
const router = express.Router()

// a middleware function with no mount path. This code is executed for every request to the router
router.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use('/user/:id', (req, res, next) => {
  console.log('Request URL:', req.originalUrl)
  next()
}, (req, res, next) => {
  console.log('Request Type:', req.method)
  next()
})

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get('/user/:id', (req, res, next) => {
  // if the user ID is 0, skip to the next router
  if (req.params.id === '0') next('route')
  // otherwise pass control to the next middleware function in this stack
  else next() //
}, (req, res, next) => {
  // render a regular page
  res.render('regular')
})

// handler for the /user/:id path, which renders a special page
router.get('/user/:id', (req, res, next) => {
  console.log(req.params.id)
  res.render('special')
})

// mount the router on the app
app.use('/', router)
```
<h2 id='middleware.error-handling'>Middleware di gestione degli errori</h2>

<div class="doc-box doc-notice" markdown="1">
Il middleware di gestione degli errori impiega sempre *quattro* argomenti.  È necessario fornire quattro argomenti per identificarlo come funzione middleware di gestione degli errori. Anche se non è necessario utilizzare l'oggetto `next`, lo si deve specificare per mantenere la firma. Altrimenti, l'oggetto `next` verrà interpretato come middleware regolare e non sarà in grado di gestire gli errori.
</div>

Definire le funzioni middleware di gestione degli errori nello stesso modo delle altre funzioni middleware, ma con quattro argomenti invece di tre, nello specifico con la firma `(err, req, res, next)`):

```js
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

Per dettagli sul middleware di gestione degli errori, consultare la sezione: [Gestione degli errori](/{{ page.lang }}/guide/error-handling.html).

<h2 id='middleware.built-in'>Middleware integrato</h2>

Dalla versione 4.x, Express non dipende più da [Connect](https://github.com/senchalabs/connect). Fatta eccezione per `express.static`, tutte le funzioni
middleware che prima erano state incluse in Express, ora sono in moduli separati. Vedere [l'elenco delle funzioni middleware](https://github.com/senchalabs/connect#middleware).

<h4 id='express.static'>express.static(root, [options])</h4>

L'unica funzione middleware integrata in Express è `express.static`. Questa funzione è basata su [serve-static](https://github.com/expressjs/serve-static) ed è responsabile della fornitura degli asset statici di un'applicazione Express.

L'argomento `root` specifica la directory root da cui fornire gli asset statici.

L'oggetto facoltativo `options` può avere le seguenti proprietà:

| Proprietà      | Descrizione                                                           |   Tipo      | Valore predefinito         |
|---------------|-----------------------------------------------------------------------|-------------|-----------------|
| `dotfiles`    | Opzione per la fornitura di dotfiles. Valori possibili sono "allow", "deny" e "ignore" | Stringa | "ignore" |
| `etag`        | Abilitare o disabilitare la generazione di etag  | Booleano | `true` |
| `extensions`  | Imposta i fallback dell'estensione file. | Array | `[]` |
| `index`       | Invia un file di indice di directory. Impostare su `false` per disabilitare l'indicizzazione della directory. | Misto | "index.html" |
 `lastModified` | Impostare l'intestazione `Last-Modified`sulla data dell'ultima modifica del file nel sistema operativo. I valori possibili sono `true` o `false`. | Booleano | `true` |
| `maxAge`      | Impostare la proprietà dell'intestazione Cache-Control, in millisecondi o una stringa in [formato ms](https://www.npmjs.org/package/ms) | Numero | 0 |
| `redirect`    | Reindirizzare al carattere "/" finale, quando il nome percorso è una directory. | Booleano | `true` |
| `setHeaders`  | Funzione per l'impostazione delle intestazioni HTTP perché siano adatte al file. | Funzione |  |

Ecco un esempio di utilizzo della funzione middleware `express.static` con un oggetto opzioni elaborato:

```js
const options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}

app.use(express.static('public', options))
```

È possibile avere più di una directory statica per app:

```js
app.use(express.static('public'))
app.use(express.static('uploads'))
app.use(express.static('files'))
```

Per ulteriori dettagli sulla funzione `serve-static` e sulle relative opzioni, consultare: documentazione [serve-static](https://github.com/expressjs/serve-static).

<h2 id='middleware.third-party'>Middleware di terzi</h2>

Utilizzare il middleware di terzi per aggiungere funzionalità alle app Express.

Installare il modulo Node.js per la funzionalità richiesta, quindi, caricarlo nella propria app a livello dell'applicazione o a livello del router.

Il seguente esempio illustra l'installazione e il caricamento della funzione middleware di analisi dei cookie `cookie-parser`.

```bash
$ npm install cookie-parser
```

```js
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

// load the cookie-parsing middleware
app.use(cookieParser())
```

Per un elenco parziale delle funzioni middleware di terzi comunemente utilizzate con Express, consultare la sezione: [Middleware di terzi](../resources/middleware.html).
