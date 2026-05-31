---
title: middleware espresso
description: Esplora un elenco di moduli middleware Express.js gestiti dal team Express e dalla comunità, inclusi middleware incorporati e popolari moduli di terze parti.
---

The Express middleware modules listed here are maintained by the
[Expressjs team](https://github.com/orgs/expressjs/people).

| Modulo Middleware                                           | Descrizione                                                                                                      |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| [body-parser](/en/resources/middleware/body-parser)         | Analizza il corpo della richiesta HTTP.                                                                          |
| [compression](/en/resources/middleware/compression)         | Comprimi le risposte HTTP.                                                                                       |
| [cookie-parser](/en/resources/middleware/cookie-parser)     | Analizza l'intestazione dei cookie e popola `req.cookies`. Cfr. anche [cookies](https://github.com/jed/cookies). |
| [cookie-session](/en/resources/middleware/cookie-session)   | Stabilisci sessioni basate sui cookie.                                                                           |
| [cors](/en/resources/middleware/cors)                       | Abilita la condivisione delle risorse di origine incrociata (CORS) con varie opzioni.                            |
| [errorhandler](/en/resources/middleware/errorhandler)       | Gestione errori di sviluppo/debug.                                                                               |
| [method-override](/en/resources/middleware/method-override) | Ignora i metodi HTTP usando l'intestazione.                                                                      |
| [morgan](/en/resources/middleware/morgan)                   | Registratore di richieste HTTP.                                                                                  |
| [multer](/en/resources/middleware/multer)                   | Gestire i dati multi-parte.                                                                                      |
| [response-time](/en/resources/middleware/response-time)     | Registra il tempo di risposta HTTP.                                                                              |
| [serve-favicon](/en/resources/middleware/serve-favicon)     | Servire una favicon.                                                                                             |
| [serve-index](/en/resources/middleware/serve-index)         | Serve l'elenco delle directory per un percorso specificato.                                                      |
| [serve-static](/en/resources/middleware/serve-static)       | Servire file statici.                                                                                            |
| [session](/en/resources/middleware/session)                 | Stabilisci sessioni basate su server (solo sviluppo).                                                            |
| [timeout](/en/resources/middleware/timeout)                 | Imposta un timeout elaborazione richiesta perioHTTP.                                                             |
| [vhost](/en/resources/middleware/vhost)                     | Crea domini virtuali.                                                                                            |

## Moduli middleware aggiuntivi

Questi sono alcuni moduli middleware popolari aggiuntivi.

<Alert type="warning">
  Queste informazioni si riferiscono a siti, prodotti o moduli di terze parti che non sono mantenuti dal team
  Expressjs. L'elenco qui non costituisce un'approvazione o una raccomandazione da parte del team di progetto
  Expressjs.
</Alert>

| Modulo Middleware                                   | Descrizione                                                                                                                                        |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| [helmet](https://github.com/helmetjs/helmet)        | Aiuta a proteggere le tue app impostando varie intestazioni HTTP.                                                                                  |
| [passport](https://github.com/jaredhanson/passport) | Autenticazione utilizzando "strategie" come OAuth, OpenID e molte altre. Vedi [passportjs.org](https://passportjs.org/) per maggiori informazioni. |
