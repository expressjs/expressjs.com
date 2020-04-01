---
layout: page
title: FAQ Express
menu: starter
lang: fr
---

# FAQ

## Comment puis-je structurer mon application ?

Il n'existe pas de réponse définitive à cette question. La réponse dépend
de l'échelle de votre application et de l'équipe qui est impliquée. Pour être aussi
flexible que possible, Express ne fait aucune supposition en terme de structure.

Les routes et la logique propre à l'application peuvent être opérationnelles dans autant de fichiers
que vous le souhaitez, et dans les structures de répertoire que vous préférez. Pour plus d'inspiration,
consultez les exemples suivants :

* [Listes de routes](https://github.com/expressjs/express/blob/4.13.1/examples/route-separation/index.js#L32-47)
* [Feuille de route](https://github.com/expressjs/express/blob/4.13.1/examples/route-map/index.js#L52-L66)
* [Contrôleurs de style MVC](https://github.com/expressjs/express/tree/master/examples/mvc)

Il existe aussi des extensions tiers pour Express, permettant de simplifier certains de ces modèles :

* [Routage ingénieux](https://github.com/expressjs/express-resource)

## Comment puis-je définir des modèles ?

Express ne connaît pas les bases de données. Ce concept est
laissé aux modules Node tiers, vous permettant ainsi
d'interagir avec quasiment toutes les bases de données.

Voir [LoopBack](http://loopback.io) pour obtenir une infrastructure basée sur Express et centrée autour de modèles.

## Comment puis-je authentifier des utilisateurs ?

L'authentification est une autre partie complexe dans laquelle Express
ne s'aventure pas. Vous pouvez utiliser tous les schémas d'authentification que vous voulez.
Pour un schéma simple de type nom d'utilisateur/mot de passe, voir [cet exemple](https://github.com/expressjs/express/tree/master/examples/auth).


## Quels moteurs de modèles Express prend-il en charge ?

Express prend en charge tous les moteurs de modèles conformes à la signature `(path, locals, callback)`.
Pour normaliser les interfaces de moteur de modèles et la mise en cache, voir le
projet [consolidate.js](https://github.com/visionmedia/consolidate.js)
pour la prise en charge. Des moteurs de modèles non répertoriés peuvent encore prendre en charge la signature Express.

## Comment puis-je gérer des réponses 404 ?

Dans Express, étant donné que les réponses 404 ne sont pas le résultat d'une erreur,
le middleware de traitement d'erreurs ne les traite pas. Ce comportement est
dû au fait qu'une réponse 404 indique simplement l'absence d'un travail supplémentaire à effectuer.
En d'autres termes, Express a exécuté toutes les routes et fonctions middleware,
et aucune n'a répondu. Tout ce que vous avez à faire est
d'ajouter une fonction middleware à la toute fin de la pile (en-dessous de toutes les autres fonctions)
pour gérer une réponse 404 :

<pre>
<code class="language-javascript" translate="no">
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});
</code>
</pre>

## Comment puis-je configurer un gestionnaire d'erreurs ?

Vous pouvez définir un middleware de traitement d'erreurs de la même façon qu'un autre middleware,
à l'exception qu'il faudra 4 arguments au lieu de 3 ; et plus particulièrement avec la signature `(err, req, res, next)` :

<pre>
<code class="language-javascript" translate="no">
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
</code>
</pre>

Pour plus d'informations, voir [Traitement d'erreurs](/{{ page.lang }}/guide/error-handling.html).

## Comment puis-je générer un fichier HTML simple ?

Vous ne pouvez pas ! Il n'est pas nécessaire de "générer" un fichier HTML avec la fonction `res.render()`.
Si vous avez un fichier spécifique, utilisez la fonction `res.sendFile()`.
Si vous utilisez plusieurs actifs d'un répertoire, utilisez la fonction middleware `express.static()`.
