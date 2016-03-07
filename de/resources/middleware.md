---
layout: page
title: Express-Middleware
menu: resources
lang: de
---

# Middleware anderer Anbieter

Nachfolgend sind einige Express-Middlewaremodule aufgeführt:

  - [body-parser](https://github.com/expressjs/body-parser): Bisher: `express.bodyParser`, `json` und `urlencoded`.
  Siehe auch:
    - [body](https://github.com/raynos/body)
    - [co-body](https://github.com/visionmedia/co-body)
    - [raw-body](https://github.com/stream-utils/raw-body)
  - [compression](https://github.com/expressjs/compression): Bisher `express.compress`
  - [connect-image-optimus](https://github.com/msemenistyi/connect-image-optimus): Connect/Express-Middlewaremodule für optimales Image-Serving. Wechselt Images (wenn möglich) zu `.webp` oder `.jxr`.
  - [connect-timeout](https://github.com/expressjs/timeout): Bisher: `express.timeout`
  - [cookie-parser](https://github.com/expressjs/cookie-parser): Bisher: `express.cookieParser`
  - [cookie-session](https://github.com/expressjs/cookie-session): Bisher: `express.cookieSession`
  - [csurf](https://github.com/expressjs/csurf): Bisher: `express.csrf`
  - [errorhandler](https://github.com/expressjs/errorhandler): Bisher: `express.errorHandler`
  - [express-debug](https://github.com/devoidfury/express-debug): Entwicklungstool, mit dem eine Registerkarte mit Informationen zu Vorlagenvariablen (lokalen Variablen), zur aktuellen Sitzung, zu hilfreichen Anforderungsdaten usw. Ihrer Anwendung hinzugefügt werden können.
  - [express-partial-response](https://github.com/nemtsov/express-partial-response): Express-Middlewaremodul für die Filterung von Teilen von JSON-Antworten auf Basis der Abfragezeichenfolge `fields` durch Verwendung der Google-API Partial Response.
  - [express-session](https://github.com/expressjs/session): Bisher: `express.session`
  - [express-simple-cdn](https://github.com/jamiesteven/express-simple-cdn): Express-Middlewaremodul für die Verwendung eines CDN (Content Delivery Network) für statische Assets mit Unterstützung mehrerer Hosts (Beispiel: cdn1.host.com, cdn2.host.com).
  - [express-slash](https://github.com/ericf/express-slash): Express-Middlewaremodul für Benutzer, die hohen Wert auf abschließende Schrägstriche legen.
  - [express-stormpath](https://github.com/stormpath/stormpath-express): Express-Middlewaremodul für Benutzerspeicher, Authentifizierung, Autorisierung, SSO und Datensicherheit.
  - [express-uncapitalize](https://github.com/jamiesteven/express-uncapitalize): Middlewaremodul für die Umleitung von HTTP-Anforderungen mit Großbuchstaben in eine kanonische Form mit Kleinbuchstaben.
  - [helmet](https://github.com/helmetjs/helmet): Modul zur Sicherung Ihrer Anwendungen durch Festlegung verschiedener HTTP-Header.
  - [join-io](https://github.com/coderaiser/join-io "join-io"): Modul für die Verknüpfung von Dateien während der Verarbeitung, um die Anzahl der Anforderungen zu reduzieren.
  - [method-override](https://github.com/expressjs/method-override): Bisher: `express.methodOverride`
  - [morgan](https://github.com/expressjs/morgan): Bisher: `logger`
  - [passport](https://github.com/jaredhanson/passport): Express-Middlewaremodul für die Authentifizierung.
  - [response-time](https://github.com/expressjs/response-time): Bisher: `express.responseTime`
  - [serve-favicon](https://github.com/expressjs/serve-favicon): Bisher: `express.favicon`
  - [serve-index](https://github.com/expressjs/serve-index): Bisher: `express.directory`
  - [serve-static](https://github.com/expressjs/serve-static): Modul für statischen Inhalt.
  - [static-expiry](https://github.com/paulwalker/connect-static-expiry): URLs mit elektronischem Fingerabdruck oder Caching-Headern für statische Assets einschließlich Unterstützung für eine oder mehrere externe Domänen.
  - [vhost](https://github.com/expressjs/vhost): Bisher: `express.vhost`
  - [view-helpers](https://github.com/madhums/node-view-helpers): Express-Middlewaremodul, das allgemeine Helper-Methoden für Ansichten bereitstellt.
  - [sriracha-admin](https://github.com/hdngr/siracha): Express-Middlewaremodul, das eine Administratorsite für Mongoose dynamisch generiert.

Einige Middlewaremodule, die bisher zu Connect gehörten, werden vom Connect/Express-Team nicht mehr unterstützt. Diese Module werden durch ein alternatives oder besseres Modul ersetzt. Verwenden Sie eine der folgenden Alternativen:

  - express.cookieParser
    - [cookies](https://github.com/jed/cookies) und [keygrip](https://github.com/jed/keygrip)
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

Informationen zu weiteren Middlewaremodulen siehe:

 - [http-framework](https://github.com/Raynos/http-framework/wiki/Modules)
 - [expressjs](https://github.com/expressjs)
