---
layout: page
title: Aggiornamenti sulla sicurezza Express
menu: advanced
lang: it
---

# Aggiornamenti sulla sicurezza

<div class="doc-box doc-notice" markdown="1">
Le vulnerabilità di Node.js influenzano direttamente Express. Pertanto, [verificare sempre le vulnerabilità Node.js](http://blog.nodejs.org/vulnerability/) e assicurarsi di utilizzare l'ultima versione corretta di Node.js.
</div>

L'elenco seguente mostra le vulnerabilità di Express che sono state corrette nell'aggiornamento della versione specificato.

## 4.x

  * 4.11.1
    * Risolta la vulnerabilità del rilevamento del percorso root in `express.static`, `res.sendfile` e `res.sendFile`
  * 4.10.7
    * Risolta la vulnerabilità del reindirizzamento aperto in `express.static` ([advisory](https://npmjs.com/advisories/35), [CVE-2015-1164](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-1164)).
  * 4.8.8
    * Risolte le vulnerabilità trasversali della directory in `express.static` ([advisory](http://npmjs.com/advisories/32), [CVE-2014-6394](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2014-6394)).
  * 4.8.4
    * Node.js 0.10 può portare alla perdita di `fd` in determinate situazioni che influenzano `express.static` e `res.sendfile`. Le richieste sospette potrebbero causare una perdita di `fd` ed eventualmente il verificarsi di errori `EMFILE` e risposte mancate del server.
  * 4.8.0
    * Le matrici sparse che dispongono di indici estremamente elevati nella stringa di query potrebbero causare errori di memoria nel processo e una chiusura anomala del server.
    * Gli oggetti di stringa query molto nidificati potrebbero causare un blocco del processo e una mancata risposta da parte del server.

## 3.x

  * 3.19.1
    * Risolta la vulnerabilità del rilevamento del percorso root in `express.static`, `res.sendfile` e `res.sendFile`
  * 3.19.0
    * Risolta la vulnerabilità del reindirizzamento aperto in `express.static` ([advisory](https://npmjs.com/advisories/35), [CVE-2015-1164](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-1164)).
  * 3.16.10
    * Risolte le vulnerabilità trasversali della directory in `express.static`.
  * 3.16.6
    * Node.js 0.10 può portare alla perdita di `fd` in determinate situazioni che influenzano `express.static` e `res.sendfile`. Le richieste sospette potrebbero causare una perdita di `fd` ed eventualmente il verificarsi di errori `EMFILE` e risposte mancate del server.
  * 3.16.0
    * Le matrici sparse che dispongono di indici estremamente elevati nella stringa di query potrebbero causare errori di memoria nel processo e una chiusura anomala del server.
    * Gli oggetti di stringa query molto nidificati potrebbero causare un blocco del processo e una mancata risposta da parte del server.
  * 3.3.0
    * La risposta 404 di un metodo non supportato sovrascrive un tentativo suscettibili in precedenza ad attacchi XSS (cross-site scripting).
