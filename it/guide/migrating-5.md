---
layout: page
title: Migrazione a Express 5
menu: guide
lang: it
---

# Passaggio a Express 5

<h2 id="overview">Panoramica</h2>

Express 5.0 si trova ancora nella fase di release alfa, ma di seguito vengono mostrate le modifiche che verranno riportate nel release e come migrare l'applicazione Express 4 a Express 5.

Express 5 non è molto differente da Express 4: le modifiche all'API non sono così importanti come quelle che sono state effettuate nel passaggio dalla 3.0 alla 4.0.  Anche se le API di base sono le stesse, ci sono comunque delle modifiche importanti; in altre parole, un programma Express 4 esistente potrebbe non funzionare se lo si aggiorna per utilizzare Express 5.

Per installare l'ultima alfa e per vedere in anteprima Express 5, immettere il seguente comando nella directory root dell'applicazione:

```console
$ npm install express@5.0.0-alpha.2 --save
```

È quindi possibile eseguire i test automatizzati per trovare errori e correggere i problemi in base agli aggiornamenti elencati di seguito. Dopo aver gestito gli errori del test, avviare l'applicazione per verificare gli errori. Si noterà subito se l'applicazione utilizza qualsiasi metodo o proprietà non supportati.

<h2 id="changes">Modifiche in Express 5</h2>

Di seguito viene riportato l'elenco di modifiche (a partire dal release alfa) che influenzeranno gli utenti di Express.
Consultare [pull request](https://github.com/expressjs/express/pull/2237) per un elenco di funzioni pianificate.

**Proprietà e metodi rimossi**

<ul class="doclist">
  <li><a href="#app.del">app.del()</a></li>
  <li><a href="#app.param">app.param(fn)</a></li>
  <li><a href="#plural">Nomi di metodi al plurale</a></li>
  <li><a href="#leading">Due punti nell'argomento del nome in app.param(name, fn)</a></li>
  <li><a href="#req.param">req.param(name)</a></li>
  <li><a href="#res.json">res.json(obj, status)</a></li>
  <li><a href="#res.jsonp">res.jsonp(obj, status)</a></li>
  <li><a href="#res.send.body">res.send(body, status)</a></li>
  <li><a href="#res.send.status">res.send(status)</a></li>
  <li><a href="#res.sendfile">res.sendfile()</a></li>
</ul>

**Modificato**

<ul class="doclist">
  <li><a href="#app.router">app.router</a></li>
  <li><a href="#req.host">req.host</a></li>
  <li><a href="#req.query">req.query</a></li>
</ul>

**Miglioramenti**

<ul class="doclist">
  <li><a href="#res.render">res.render()</a></li>
</ul>

<h3>Proprietà e metodi rimossi</h3>

Se si utilizza uno dei seguenti metodi o proprietà nell'applicazione, quest'ultima si chiuderà in modo anomalo. Quindi, sarà necessario modificare l'applicazione dopo aver effettuato l'aggiornamento alla versione 5.

<h4 id="app.del">app.del()</h4>

Express 5 non supporta più la funzione `app.del()`. Se si utilizza questa funzione verrà generato un errore. Per registrare le route HTTP DELETE, utilizzare al contrario la funzione `app.delete()`.

Inizialmente era stato utilizzato il comando `del` al posto di `delete`, perché `delete` è una parola chiave riservata in JavaScript. Tuttavia, a partire da ECMAScript 6, `delete` e altre parole chiave riservate possono essere utilizzate liberamente come nomi di proprietà. È possibile leggere la documentazione in cui viene descritto come si è arrivati alla deprecazione della funzione `app.del` qui.

<h4 id="app.param">app.param(fn)</h4>

La firma `app.param(fn)` è stata utilizzata per modificare la funzionalità della funzione `app.param(name, fn)`. È stata considerata obsoleta a partire dalla v4.11.0 e non è più supportata in Express 5.

<h4 id="plural">Nomi di metodi al plurale</h4>

I seguenti nomi di metodi sono stati messi al plurale. In Express 4, l'utilizzo di vecchi metodi ha dato origine ad avvisi di deprecazione.  Express 5 non li supporta più in alcun modo:

`req.acceptsCharset()` è stato sostituito con `req.acceptsCharsets()`.

`req.acceptsEncoding()` è stato sostituito con `req.acceptsEncodings()`.

`req.acceptsLanguage()` è stato sostituito con `req.acceptsLanguages()`.

<h4 id="leading">Due punti (:) nel nome per app.param(name, fn)</h4>

I due punti (:) nel nome della funzione `app.param(name, fn)` è una eredità di Express 3 e per il bene della compatibilità con le versioni precedenti, Express 4 supporta questa condizione ma comunque fornendo un messaggio di avviso di deprecazione. Express 5 lo ignorerà senza avvisi e utilizzerà il parametro nome senza inserire i due punti.

Questa procedura non dovrebbe influenzare il codice se si segue correttamente la documentazione di Express 4 di [app.param](/{{ page.lang }}/4x/api.html#app.param), poiché non si parla dei due punti.

<h4 id="req.param">req.param(name)</h4>

Questo metodo poco chiaro e molto pericoloso che si utilizzava per richiamare i dati del modulo è stato rimosso. Ora sarà necessario ricercare il nome del parametro inviato nell'oggetto `req.params`, `req.body` o `req.query`.

<h4 id="res.json">res.json(obj, status)</h4>

Express 5 non supporta più la firma `res.json(obj, status)`. Al contrario, impostare lo stato e successivamente associarlo al metodo `res.json()` come segue: `res.status(status).json(obj)`.

<h4 id="res.jsonp">res.jsonp(obj, status)</h4>

Express 5 non supporta più la firma `res.jsonp(obj, status)`. Al contrario, impostare lo stato e successivamente associarlo al metodo `res.jsonp()` come segue: `res.status(status).jsonp(obj)`.

<h4 id="res.send.body">res.send(body, status)</h4>

Express 5 non supporta più la firma `res.send(obj, status)`. Al contrario, impostare lo stato e successivamente associarlo al metodo `res.send()` come segue: `res.status(status).send(obj)`.

<h4 id="res.send.status">res.send(status)</h4>

Express 5 non supporta più la firma <code>res.send(<em>status</em>)</code>, dove *`status`* è un numero. Al contrario, utilizzare la funzione `res.sendStatus(statusCode)`, la quale imposta il codice di stato dell'intestazione della risposta HTTP e invia la versione di testo del codice: "Non trovato", "Errore interno del server" e così via.
Se è necessario inviare un numero utilizzando la funzione `res.send()`, citare il numero per convertirlo in una stringa, in modo tale che Express non lo interpreti come un tentativo di utilizzo di una firma vecchia non supportata.

<h4 id="res.sendfile">res.sendfile()</h4>

La funzione `res.sendfile()` è stata sostituita da una versione in cui ogni frase composta inizia con una lettera maiuscola che utilizza ad esempio `res.sendFile()` in Express 5.

<h3>Modificato</h3>

<h4 id="app.router">app.router</h4>

L'oggetto `app.router`, che era stato rimosso in Express 4, è ritornato in Express 5. Nella nuova versione, questo oggetto è solo un riferimento al router Express di base, diversamente da Express 3, in cui un'applicazione aveva il compito esplicito di caricarlo.

<h4 id="req.host">req.host</h4>

In Express 4, la funzione `req.host` andava a rimuovere in modo non corretto il numero porta nel caso fosse stato presente. In Express 5 il numero porta viene conservato.

<h4 id="req.query">req.query</h4>

In Express 4.7 e da Express 5 in avanti, l'opzione parser query può accettare `false` per disabilitare l'analisi della stringa query quando si desidera utilizzare la propria funzione per la logica di analisi della stringa query.

<h3>Miglioramenti</h3>

<h4 id="res.render">res.render()</h4>

Questo metodo ora potenzia i funzionamenti asincroni per tutti i motori di visualizzazione, evitando i bug causati dai motori di visualizzazione con un'implementazione sincrona e che violavano l'interfaccia consigliata.
