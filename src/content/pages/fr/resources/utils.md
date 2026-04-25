---
title: Utilitaires Express
description: Découvrez des modules utilitaires liés à Express.js et Node.js, y compris des outils pour les cookies, la protection CSRF, l'analyse d'URL, le routage, et plus encore pour améliorer vos applications.
---

## Fonctions utilitaires Express

L'organisation GitHub [pillarjs](https://github.com/pillarjs) contient un certain nombre de modules
pour des fonctions utilitaires qui peuvent être généralement utiles.

| Modules utilitaires                                            | Libellé                                                                                                                                                                                                                                                                  |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [cookies](https://www.npmjs.com/package/cookies)               | Obtenez et définissez les cookies HTTP(S) qui peuvent être signés pour éviter toute altération en utilisant Keygrip. Peut être utilisé avec la bibliothèque HTTP Node.js ou comme middleware Express. |
| [csrf](https://www.npmjs.com/package/csrf)                     | Contient la logique derrière la création et la vérification de jetons CSRF. Utilisez ce module pour créer un middleware CSRF personnalisé.                                                                                               |
| [finalhandler](https://www.npmjs.com/package/finalhandler)     | Fonction à invoquer comme dernière étape pour répondre à la requête HTTP.                                                                                                                                                                                |
| [parseurl](https://www.npmjs.com/package/parseurl)             | Analyser une URL avec le cache.                                                                                                                                                                                                                          |
| [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) | Transformez une chaîne de chemin de type Express, telle que \`\`/user/:name\` en une expression régulière.                                                                                                                               |
| [resolve-path](https://www.npmjs.com/package/resolve-path)     | Résout un chemin relatif par rapport à un chemin racine avec validation.                                                                                                                                                                                 |
| [router](https://www.npmjs.com/package/router)                 | Routeur de type middleware simple.                                                                                                                                                                                                                       |
| [send](https://www.npmjs.com/package/send)                     | Bibliothèque pour le streaming des fichiers en tant que réponse HTTP, avec le support des réponses partielles (gammes), la négociation conditional-GET et les événements granulaires.                                                 |

Pour des modules supplémentaires liés au protocole HTTP, voir [jshttp](https://github.com/jshttp).
