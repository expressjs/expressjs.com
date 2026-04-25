---
title: Foire Aux Questions
description: Retrouvez les réponses aux questions les plus fréquemment posées sur Express.js, y compris les sujets sur la structure de l'application, les modèles, l'authentification, les moteurs de gabarit, la gestion des erreurs, et plus encore.
---

## Comment structurer ma candidature ?

Il n'y a pas de réponse définitive à cette question. La réponse dépend
de l'échelle de votre candidature et de l'équipe impliquée. To be as
flexible as possible, Express makes no assumptions in terms of structure.

Les routes et autres logiques spécifiques à une application peuvent vivre dans autant de fichiers
que vous le souhaitez, dans n'importe quelle structure de répertoire que vous préférez. View the following
examples for inspiration:

- [Liste des itinéraires](https://github.com/expressjs/express/blob/4.13.1/examples/route-separation/index.js#L32-L47)
- [Route map](https://github.com/expressjs/express/blob/4.13.1/examples/route-map/index.js#L52-L66)
- [MVC style controllers](https://github.com/expressjs/express/tree/master/examples/mvc)

Il y a également des extensions tierces pour Express, qui simplifient certains de ces modèles:

- [Itinéraire de ressource](https://github.com/expressjs/express-resource)

## Comment définir des modèles?

Express n'a aucune notion de base de données. This concept is
left up to third-party Node modules, allowing you to
interface with nearly any database.

Voir [LoopBack](http://loopback.io) pour un framework basé sur Express, centré autour de modèles.

## Comment puis-je authentifier les utilisateurs ?

Authentication is another opinionated area that Express does not
venture into. Vous pouvez utiliser n'importe quel schéma d'authentification que vous souhaitez.
Pour un simple nom d'utilisateur / schéma de mot de passe, voir [cet exemple](https://github.com/expressjs/express/tree/master/examples/auth).

## Quels moteurs de gabarits sont supportés par Express ?

Express prend en charge tout moteur de gabarit qui est conforme à la signature `(path, locals, callback)`.
Pour normaliser les interfaces du moteur de gabarits et la mise en cache, consultez le projet
[consolidate.js](https://github.com/visionmedia/consolidate.js)
pour plus de support. Les moteurs de gabarits non listés peuvent toujours supporter la signature Express.

Pour plus d'informations, voir [Utilisation de moteurs de gabarits avec Express](/en/guide/using-template-engines).

## Comment gérer 404 réponses?

Dans Express, 404 réponses ne sont pas le résultat d'une erreur, donc
le middleware de gestion d'erreurs ne les capturera pas. Ce comportement est
car une réponse 404 indique simplement l'absence de travail supplémentaire à faire ;
en d'autres termes, Express a exécuté toutes les fonctions et routes du middleware,
et a trouvé qu'aucun d'eux n'a répondu. All you need to
do is add a middleware function at the very bottom of the stack (below all other functions)
to handle a 404 response:

```js
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});
```

Ajoute des routes dynamiquement à l'exécution sur une instance de `express.Router()`
afin que les routes ne soient pas remplacées par une fonction de middleware.

## Comment configurer un gestionnaire d'erreur ?

Vous définissez le middleware de la même manière que les autres middleware,
sauf avec quatre arguments au lieu de trois; spécifiquement avec la signature `(err, req, res, next)`:

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

Pour plus d'informations, voir [Gestion des erreurs] (/en/guide/error-handling).

## Comment rendre le HTML simple ?

Vous ne le faites pas! Il n'y a pas besoin de "render" HTML avec la fonction `res.render()`.
Si vous avez un fichier spécifique, utilisez la fonction `res.sendFile()`.
Si vous utilisez beaucoup d'actifs depuis un répertoire, utilisez la fonction `express.static()`
middleware.

## Quelle version de Node.js est requise ?

- [Express 4.x](/en/4x/api) nécessite Node.js 0.10 ou supérieur.
- [Express 5.x](/en/5x/api) nécessite Node.js 18 ou plus.
