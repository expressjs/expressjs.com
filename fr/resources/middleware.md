---
layout: page
title: Middleware Express
menu: resources
lang: fr
---

# Middleware tiers

Voici quelques modules de middleware Express :

  - [body-parser](https://github.com/expressjs/body-parser) : précédemment `express.bodyParser`, `json` et `urlencoded`.
  Voir aussi :
    - [body](https://github.com/raynos/body)
    - [co-body](https://github.com/visionmedia/co-body)
    - [raw-body](https://github.com/stream-utils/raw-body)
  - [compression](https://github.com/expressjs/compression) : précédemment `express.compress`
  - [connect-image-optimus](https://github.com/msemenistyi/connect-image-optimus) : modules de middleware Connect/Express pour une utilisation des images optimale. Bascule les images en `.webp` ou `.jxr`, dans la mesure du possible.
  - [connect-timeout](https://github.com/expressjs/timeout) : précédemment `express.timeout`
  - [cookie-parser](https://github.com/expressjs/cookie-parser) : précédemment `express.cookieParser`
  - [cookie-session](https://github.com/expressjs/cookie-session) : précédemment `express.cookieSession`
  - [csurf](https://github.com/expressjs/csurf) : précédemment `express.csrf`
  - [errorhandler](https://github.com/expressjs/errorhandler) : précédemment `express.errorHandler`
  - [express-debug](https://github.com/devoidfury/express-debug) : outil de développement discret qui ajoute un onglet avec des informations sur les variables de canevas (environnements locaux), les sessions en cours, les données de demandes utiles et bien plus, à votre application.
  - [express-partial-response](https://github.com/nemtsov/express-partial-response) : module Express Middleware permettant de filtrer des éléments de réponses JSON en fonction de la chaîne de requête `zones` ; en utilisant la réponse partielle de l'API Google.
  - [express-session](https://github.com/expressjs/session) : précédemment `express.session`
  - [express-simple-cdn](https://github.com/jamiesteven/express-simple-cdn) : module Express Middleware permettant d'utiliser un CDN pour les actifs statiques, avec la prise en charge de plusieurs hôtes (Par exemple : cdn1.host.com, cdn2.host.com).
  - [express-slash](https://github.com/ericf/express-slash) : module Express Middleware destiné aux personnes qui sont strictes sur le respect des barres obliques.
  - [express-stormpath](https://github.com/stormpath/stormpath-express) : module Express Middleware destiné au stockage utilisateur, à l'authentification, à l'autorisation, à la connexion unique et à la sécurité des données.
  - [express-uncapitalize](https://github.com/jamiesteven/express-uncapitalize) : module middleware destiné à la redirection des demandes HTTP contenant des majuscules en format canonique en minuscules.
  - [helmet](https://github.com/helmetjs/helmet) : module qui aide à sécuriser vos applications en définissant divers en-têtes HTTP.
  - [join-io](https://github.com/coderaiser/join-io "join-io") : module permettant de joindre des fichiers à la volée pour réduire le nombre de demandes.
  - [method-override](https://github.com/expressjs/method-override) : précédemment `express.methodOverride`
  - [morgan](https://github.com/expressjs/morgan) : précédemment `logger`
  - [passport](https://github.com/jaredhanson/passport) : module de middleware Express dédié à l'authentification.
  - [response-time](https://github.com/expressjs/response-time) : précédemment `express.responseTime`
  - [serve-favicon](https://github.com/expressjs/serve-favicon) : précédemment `express.favicon`
  - [serve-index](https://github.com/expressjs/serve-index) : précédemment `express.directory`
  - [serve-static](https://github.com/expressjs/serve-static) : module d'utilisation du contenu statique.
  - [static-expiry](https://github.com/paulwalker/connect-static-expiry) : URL à empreinte digitale ou en-têtes de mise en cache pour les actifs statiques, y compris la prise en charge d'un ou plusieurs domaines externes.
  - [vhost](https://github.com/expressjs/vhost) : précédemment `express.vhost`
  - [view-helpers](https://github.com/madhums/node-view-helpers) : module Express Middleware qui offre des méthodes d'auxiliaires courantes destinées aux vues.
  - [sriracha-admin](https://github.com/hdngr/siracha) : module Express Middleware qui génère de façon dynamique un site administrateur pour Mongoose.

Certains modules middleware précédemment inclus avec Connect ne sont plus pris en charge par l'équipe Connect/Express. Ils sont remplacés par un module alternatif ou devraient être remplacés par un module supérieur. Utilisez l'une des alternatives suivantes :

  - express.cookieParser
    - [cookies](https://github.com/jed/cookies) et [keygrip](https://github.com/jed/keygrip)
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

Pour découvrir plus de modules de middleware, voir :

 - [http-framework](https://github.com/Raynos/http-framework/wiki/Modules)
 - [expressjs](https://github.com/expressjs)
