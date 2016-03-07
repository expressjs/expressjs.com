---
layout: page
title: Middleware Express
menu: resources
lang: it
---

# Middleware di terzi

Di seguito vengono riportati alcuni moduli middleware Express:

  - [body-parser](https://github.com/expressjs/body-parser): in precedenza `express.bodyParser`, `json` e `urlencoded`.
  Consultare inoltre:
    - [body](https://github.com/raynos/body)
    - [co-body](https://github.com/visionmedia/co-body)
    - [raw-body](https://github.com/stream-utils/raw-body)
  - [compression](https://github.com/expressjs/compression): in precedenza `express.compress`
  - [connect-image-optimus](https://github.com/msemenistyi/connect-image-optimus): moduli middleware Connect/Express per una gestione dell'immagine ottimale. Se possibile, cambia le estensioni delle immagini a `.webp` o `.jxr`.
  - [connect-timeout](https://github.com/expressjs/timeout): in precedenza `express.timeout`
  - [cookie-parser](https://github.com/expressjs/cookie-parser): in precedenza `express.cookieParser`
  - [cookie-session](https://github.com/expressjs/cookie-session): in precedenza `express.cookieSession`
  - [csurf](https://github.com/expressjs/csurf): in precedenza `express.csrf`
  - [errorhandler](https://github.com/expressjs/errorhandler): in precedenza `express.errorHandler`
  - [express-debug](https://github.com/devoidfury/express-debug): uno strumento di sviluppo riservato che aggiunge una scheda contenente informazioni sulle variabili di template (locali), sessione corrente, dati della richiesta utili e altro ancora all'applicazione.
  - [express-partial-response](https://github.com/nemtsov/express-partial-response): modulo middleware Express per filtrare le parti delle risposte JSON in base alla stringa query `fields`; utilizzando una risposta parziale API Google.
  - [express-session](https://github.com/expressjs/session): in precedenza `express.session`
  - [express-simple-cdn](https://github.com/jamiesteven/express-simple-cdn): modulo middleware Express per l'utilizzo di un CDN per asset statici, con supporto host multiplo (Ad esempio: cdn1.host.com, cdn2.host.com).
  - [express-slash](https://github.com/ericf/express-slash): modulo middleware Express per persone che sono rigide sull'utilizzo di barre.
  - [express-stormpath](https://github.com/stormpath/stormpath-express): modulo middleware Express per lo storage utente, autenticazione, autorizzazione, SSO e sicurezza dati.
  - [express-uncapitalize](https://github.com/jamiesteven/express-uncapitalize): modulo middleware per il reindirizzamento delle richieste HTTP contenenti caratteri maiuscoli per una forma con caratteri minuscoli canonica.
  - [helmet](https://github.com/helmetjs/helmet): modulo che aiuta a proteggere le applicazioni impostando varie intestazioni HTTP.
  - [join-io](https://github.com/coderaiser/join-io "join-io"): modulo per unire i file in entrata per ridurre il conteggio delle richieste.
  - [method-override](https://github.com/expressjs/method-override): in precedenza `express.methodOverride`
  - [morgan](https://github.com/expressjs/morgan): in precedenza `logger`
  - [passport](https://github.com/jaredhanson/passport): modulo middleware Express per l'autenticazione.
  - [response-time](https://github.com/expressjs/response-time): in precedenza `express.responseTime`
  - [serve-favicon](https://github.com/expressjs/serve-favicon): in precedenza `express.favicon`
  - [serve-index](https://github.com/expressjs/serve-index): in precedenza `express.directory`
  - [serve-static](https://github.com/expressjs/serve-static): modulo per gestire i contenuti statici.
  - [static-expiry](https://github.com/paulwalker/connect-static-expiry): URL riconosciute o Caching Header per asset statici incluso il supporto per uno o più domini esterni.
  - [vhost](https://github.com/expressjs/vhost): in precedenza `express.vhost`
  - [view-helpers](https://github.com/madhums/node-view-helpers): modulo middleware Express che fornisce metodi di aiuto comuni per le viste.
  - [sriracha-admin](https://github.com/hdngr/siracha): modulo middleware Express che crea in modo dinamico un sito admin per Mongoose.

Alcuni moduli middleware precedentemente inclusi in Connect non sono più supportati dal team di Connect/Express. Questi moduli sono stati sostituiti da un modulo alternativo o dovrebbero essere sostituiti a un modulo migliore. Utilizzare una delle seguenti alternative:

  - express.cookieParser
    - [cookie](https://github.com/jed/cookies) e [keygrip](https://github.com/jed/keygrip)
  - express.limit
    - [raw-body](https://github.com/stream-utils/raw-body)
  - express.multipart
    - [connect-busboy](https://github.com/mscdex/connect-busboy)
    - [multer](https://github.com/expressjs/multer)
    - [connect-multiparty](https://github.com/superjoe30/connect-multiparty)
  - express.query
    - [qs](https://github.com/visionmedia/node-querystring)
  - express.staticCache
    - [st](https://github.com/isaacs/st)
    - [connect-static](https://github.com/andrewrk/connect-static)

Per ulteriori moduli middleware, consultare:

 - [http-framework](https://github.com/Raynos/http-framework/wiki/Modules)
 - [expressjs](https://github.com/expressjs)
