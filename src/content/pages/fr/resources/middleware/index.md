---
title: Schémas exprès
description: Explorez une liste de modules de middleware Express.js maintenus par l'équipe Express et la communauté, y compris les modules middleware intégrés et les modules tiers populaires.
---

Les modules middleware Express listés ici sont maintenus par la
[équipe Expressjs](https://github.com/orgs/expressjs/people).

| Module Middleware                                        | Libellé                                                                                                        |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| [body-parser](/resources/middleware/body-parser)         | Analyse du corps de la requête HTTP.                                                                           |
| [compression](/resources/middleware/compression)         | Compresser les réponses HTTP.                                                                                  |
| [cookie-parser](/resources/middleware/cookie-parser)     | Analyser l'en-tête des cookies et remplir `req.cookies`. Voir aussi [cookies](https://github.com/jed/cookies). |
| [cookie-session](/resources/middleware/cookie-session)   | Établir des sessions basées sur les cookies.                                                                   |
| [cors](/resources/middleware/cors)                       | Activer le partage de ressources entre les origines multiples (CORS) avec diverses options.                    |
| [errorhandler](/resources/middleware/errorhandler)       | Gestion des erreurs de développement/débogage.                                                                 |
| [method-override](/resources/middleware/method-override) | Remplacer les méthodes HTTP par des en-têtes.                                                                  |
| [morgan](/resources/middleware/morgan)                   | Enregistreur de requêtes HTTP.                                                                                 |
| [multer](/resources/middleware/multer)                   | Gérer les données de formulaires multi-pièces.                                                                 |
| [response-time](/resources/middleware/response-time)     | Enregistrer le temps de réponse HTTP.                                                                          |
| [serve-favicon](/resources/middleware/serve-favicon)     | Servez un favicon.                                                                                             |
| [serve-index](/resources/middleware/serve-index)         | Servez la liste des répertoires pour un chemin donné.                                                          |
| [serve-static](/resources/middleware/serve-static)       | Servir les fichiers statiques.                                                                                 |
| [session](/resources/middleware/session)                 | Établir des sessions basées sur le serveur (développement uniquement).                                         |
| [timeout](/resources/middleware/timeout)                 | Définir un délai de traitement des requêtes HTTP expiré.                                                       |
| [vhost](/resources/middleware/vhost)                     | Créer des domaines virtuels.                                                                                   |

## Modules middleware additionnels

Ce sont quelques modules additionnels populaires de middleware.

<Alert type="warning">
  Cette information se réfère à des sites tiers, des produits ou des modules tiers qui ne sont pas maintenus par l'équipe
  Expressjs. La liste ci-dessous ne constitue pas une approbation ou une recommandation de l'équipe du projet
  Expressjs.
</Alert>

| Module Middleware                                   | Libellé                                                                                                                                                       |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [helmet](https://github.com/helmetjs/helmet)        | Permet de sécuriser vos applications en définissant divers en-têtes HTTP.                                                                                     |
| [passport](https://github.com/jaredhanson/passport) | Authentification en utilisant des "stratégies" telles que OAuth, OpenID et bien d'autres. See [passportjs.org](https://passportjs.org/) for more information. |
