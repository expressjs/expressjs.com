---
layout: page
title: Express middleware
menu: resources
lang: sk
---
<!---
 Copyright (c) 2016 StrongLoop, IBM, and Express Contributors
 License: MIT
-->

# Third-party middleware

Tu je zoznam niektorých Express middleware modulov:

  - [body-parser](https://github.com/expressjs/body-parser): kedysi `express.bodyParser`, `json` a `urlencoded`.
  Pozrite sa taktiež na:
  - [body](https://github.com/raynos/body)
  - [co-body](https://github.com/visionmedia/co-body)
  - [raw-body](https://github.com/stream-utils/raw-body)
  - [compression](https://github.com/expressjs/compression):  kedysi `express.compress`
  - [connect-image-optimus](https://github.com/msemenistyi/connect-image-optimus): Connect/Express middleware moduly pre optimálne servovanie obrázkov. V prípade podpory transformuje obrázky na `.webp` príp. `.jxr`.
  - [connect-timeout](https://github.com/expressjs/timeout): kedysi `express.timeout`
  - [cookie-parser](https://github.com/expressjs/cookie-parser): kedysi `express.cookieParser`
  - [cookie-session](https://github.com/expressjs/cookie-session): kedysi `express.cookieSession`
  - [csurf](https://github.com/expressjs/csurf): kedysi `express.csrf`
  - [errorhandler](https://github.com/expressjs/errorhandler): kedysi `express.errorHandler`
  - [express-debug](https://github.com/devoidfury/express-debug): nenápadný development tool, ktorý pridá panel s informáciami ohľadom template premenných, aktuálnej session, informácie o request dátach a ďalšie užitočné informácie.
  - [express-partial-response](https://github.com/nemtsov/express-partial-response): Express middleware modul slúžiaci k odfiltrovaniu častí JSON odpovedi na podľa hodnoty query parametra `fields`.
  - [express-session](https://github.com/expressjs/session): predtým `express.session`
  - [express-simple-cdn](https://github.com/jamiesteven/express-simple-cdn): Express middleware modul pre používanie CDN na statické assety s podporou viacerých hostov (napr.: cdn1.host.com, cdn2.host.com).
  - [express-slash](https://github.com/ericf/express-slash): Express middleware modul pre ľudí ktorí to s trailing slashes myslia vážne.
  - [express-stormpath](https://github.com/stormpath/stormpath-express): Express middleware modul pre ukladanie, autentifikáciu, autorizáciu, SSO a bezpečnosť dát.
  - [express-uncapitalize](https://github.com/jamiesteven/express-uncapitalize): middleware modul slúžiaci na presmerovávanie HTTP requestov obsahujúcich uppercase na canonical lowercase formu.
  - [helmet](https://github.com/helmetjs/helmet): modul ktorý vám pomôže zabezpečiť vašu aplikáciu pomocou nastavenia rozličných HTTP hlavičiek.
  - [join-io](https://github.com/coderaiser/join-io "join-io"): modul slúžiaci na spájanie súborov "on the fly" kvoli zredukovaniu počtu volaní.
  - [method-override](https://github.com/expressjs/method-override): kedysi `express.methodOverride`
  - [morgan](https://github.com/expressjs/morgan):  kedysi `logger`
  - [passport](https://github.com/jaredhanson/passport): Express middleware modul slúžiaci na autentifikáciu.
  - [response-time](https://github.com/expressjs/response-time): kedysi `express.responseTime`
  - [serve-favicon](https://github.com/expressjs/serve-favicon): kedysi `express.favicon`
  - [serve-index](https://github.com/expressjs/serve-index): kedysi `express.directory`
  - [serve-static](https://github.com/expressjs/serve-static): modul pre servovanie statického obsahu.
  - [static-expiry](https://github.com/paulwalker/connect-static-expiry): modul na tvorbu tzv. fingerprinted URL a caching hlavičiek pre statický obsah s podporou jednej i viacerých domén.
  - [vhost](https://github.com/expressjs/vhost): kedysi `express.vhost`
  - [view-helpers](https://github.com/madhums/node-view-helpers): Express middleware modul poskytujúci bežné helper metódy pre views.
  - [sriracha-admin](https://github.com/hdngr/siracha): Express middleware modul ktorý dynamicky generuje admin stránky pre Mongoose.

Niektoré middleware moduly, ktoré kedysi boli súčasťou Connect-u už viac nie sú podporované Connect/Express tímom. Tieto moduly boli, alebo by mali byť, nahradené alternatívnymi lepšími modulmi. Používajte niektoré z nasledujúcich alternatív:

  - express.cookieParser
    - [cookies](https://github.com/jed/cookies) a [keygrip](https://github.com/jed/keygrip)
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

Ďalšie middleware moduly nájdete tu:

 - [http-framework](https://github.com/Raynos/http-framework/wiki/Modules)
 - [expressjs](https://github.com/expressjs)
