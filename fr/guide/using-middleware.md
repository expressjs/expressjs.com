---
layout: page
title: Utilisation de middleware Express
menu: guide
lang: fr
---

# Utilisation de middleware

Express est une infrastructure web middleware et de routage, qui a des fonctions propres minimes : une application Express n'est ni plus ni moins qu'une succession d'appels de fonctions middleware.

Les fonctions de *middleware* sont des fonctions qui peuvent accéder à l'[objet Request](/{{ page.lang }}/4x/api.html#req)  (`req`), l'[objet response](/{{ page.lang }}/4x/api.html#res) (`res`) et à la fonction middleware suivant dans le cycle demande-réponse de l'application. La fonction middleware suivant est couramment désignée par une variable nommée `next`.

Les fonctions middleware effectuent les tâches suivantes :

* Exécuter tout type de code.
* Apporter des modifications aux objets de demande et de réponse.
* Terminer le cycle de demande-réponse.
* Appeler la fonction middleware suivant dans la pile.

Si la fonction middleware en cours ne termine pas le cycle de demande-réponse, elle doit appeler la fonction `next()` pour transmettre le contrôle à la fonction middleware suivant. Sinon, la demande restera bloquée.

Une application Express peut utiliser les types de middleware suivants :

 - [Middleware niveau application](#middleware.application)
 - [Middleware niveau routeur](#middleware.router)
 - [Middleware de traitement d'erreurs](#middleware.error-handling)
 - [Middleware intégré](#middleware.built-in)
 - [Middleware tiers](#middleware.third-party)

Vous pouvez charger le middleware niveau application et niveau routeur à l'aide d'un chemin de montage facultatif.
Vous pouvez également charger une série de fonctions middleware ensemble, ce qui crée une sous-pile du système de middleware à un point de montage.

<h2 id='middleware.application'>Middleware niveau application</h2>

Liez le middleware niveau application à une instance de l'objet [app object](/{{ page.lang }}/4x/api.html#app) en utilisant les fonctions `app.use()` et `app.METHOD()`, où `METHOD` est la méthode HTTP de la demande que gère la fonction middleware (par exemple GET, PUT ou POST) en minuscules.

Cet exemple illustre une fonction middleware sans chemin de montage. La fonction est exécutée à chaque fois que l'application reçoit une demande.

<pre>
<code class="language-javascript" translate="no">
var app = express();

app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});
</code>
</pre>

Cet exemple illustre une fonction middleware montée sur le chemin `/user/:id`. La fonction est exécutée pour tout type de
demande HTTP sur le chemin`/user/:id`.

<pre>
<code class="language-javascript" translate="no">
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
</code>
</pre>

Cet exemple illustre une route et sa fonction de gestionnaire (système de middleware). La fonction gère les demandes GET adressées au chemin `/user/:id`.

<pre>
<code class="language-javascript" translate="no">
app.get('/user/:id', function (req, res, next) {
  res.send('USER');
});
</code>
</pre>

Voici un exemple de chargement d'une série de fonctions middleware sur un point de montage, avec un chemin de montage.
Il illustre une sous-pile de middleware qui imprime les infos de demande pour tout type de demande HTTP adressée au chemin `/user/:id`.

<pre>
<code class="language-javascript" translate="no">
app.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
</code>
</pre>

Les gestionnaires de routage vous permettent de définir plusieurs routes pour un chemin. L'exemple ci-dessous définit deux routes pour les demandes GET adressées au chemin `/user/:id`. La deuxième route ne causera aucun problème, mais ne sera jamais appelée puisque la première route boucle le cycle demande-réponse.

Cet exemple illustre une sous-pile de middleware qui gère les demandes GET adressées au chemin `/user/:id`.

<pre>
<code class="language-javascript" translate="no">
app.get('/user/:id', function (req, res, next) {
  console.log('ID:', req.params.id);
  next();
}, function (req, res, next) {
  res.send('User Info');
});

// handler for the /user/:id path, which prints the user ID
app.get('/user/:id', function (req, res, next) {
  res.end(req.params.id);
});
</code>
</pre>

Pour ignorer les fonctions middleware issues d'une pile de middleware de routeur, appelez `next('route')` pour passer le contrôle à la prochaine route.
**REMARQUE **: `next('route')` ne fonctionnera qu'avec les fonctions middleware qui ont été chargées via les fonctions `app.METHOD()` ou `router.METHOD()`.

Cet exemple illustre une sous-pile de middleware qui gère les demandes GET adressées au chemin `/user/:id`.

<pre>
<code class="language-javascript" translate="no">
app.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next route
  if (req.params.id == 0) next('route');
  // otherwise pass the control to the next middleware function in this stack
  else next(); //
}, function (req, res, next) {
  // render a regular page
  res.render('regular');
});

// handler for the /user/:id path, which renders a special page
app.get('/user/:id', function (req, res, next) {
  res.render('special');
});
</code>
</pre>

<h2 id='middleware.router'>Middleware niveau routeur</h2>

Le middleware niveau routeur fonctionne de la même manière que le middleware niveau application, à l'exception près qu'il est lié à une instance de `express.Router()`.

<pre>
<code class="language-javascript" translate="no">
var router = express.Router();
</code>
</pre>
Chargez le middleware niveau routeur par le biais des fonctions `router.use()` et `router.METHOD()`.

Le code d'exemple suivant réplique le système de middleware illustré ci-dessus pour le middleware niveau application, en utilisant un middleware niveau routeur :

<pre>
<code class="language-javascript" translate="no">
var app = express();
var router = express.Router();

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next router
  if (req.params.id == 0) next('route');
  // otherwise pass control to the next middleware function in this stack
  else next(); //
}, function (req, res, next) {
  // render a regular page
  res.render('regular');
});

// handler for the /user/:id path, which renders a special page
router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id);
  res.render('special');
});

// mount the router on the app
app.use('/', router);
</code>
</pre>

<h2 id='middleware.error-handling'>Middleware de traitement d'erreurs</h2>

<div class="doc-box doc-notice" markdown="1">
Le middleware de traitement d'erreurs comporte toujours *quatre* arguments.  Vous devez fournir quatre arguments pour l'identifier comme une fonction middleware de traitement d'erreurs. Même si vous n'avez pas besoin d'utiliser l'objet `next`, vous devez le spécifier pour maintenir la signature. Sinon, l'objet `next` sera interprété comme un middleware ordinaire et n'arrivera pas à gérer les erreurs.
</div>

Définissez les fonctions middleware de traitement d'erreurs de la même façon que d'autres fonctions middleware, à l'exception près qu'il faudra 4 arguments au lieu de 3, et plus particulièrement avec la signature `(err, req, res, next)`) :

<pre>
<code class="language-javascript" translate="no">
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
</code>
</pre>

Pour obtenir des détails sur le middleware de traitement d'erreurs, reportez-vous à : [Traitement d'erreurs](/{{ page.lang }}/guide/error-handling.html).

<h2 id='middleware.built-in'>Middleware intégré</h2>

Depuis la version 4.x, Express ne dépend plus de [Connect](https://github.com/senchalabs/connect). A l'exception de `express.static`, toutes les fonctions middleware
précédemment incluses à Express' font désormais partie de modules distincts. Veuillez vous reporter à [la liste des fonctions middleware](https://github.com/senchalabs/connect#middleware).

<h4 id='express.static'>express.static(root, [options])</h4>

La seule fonction middleware intégrée dans Express est `express.static`. Cette fonction est basée sur [serve-static](https://github.com/expressjs/serve-static) et a la responsabilité de servir les actifs statiques d'une application Express.

L'argument `root` spécifie le répertoire racine à partir duquel servir les actifs statiques.

L'objet `options` facultatif peut avoir les propriétés suivantes :

| Propriété      | Description                                                           |   Type      | Valeur par défaut          |
|---------------|-----------------------------------------------------------------------|-------------|-----------------|
| `dotfiles`    | Option pour servir les fichiers dotfiles. Les valeurs possibles sont "allow", "deny" et "ignore" | Chaîne | "ignore" |
| `etag`        | Activer ou désactiver la génération etag  | Booléen | `true` |
| `extensions`  | Définit l'extension de fichier de rechange. | Tableau | `[]` |
| `index`       | Envoie le fichier d'index du répertoire. Utilisez `false` pour désactiver l'indexation de répertoire. | Mix | "index.html" |
 `lastModified` | Définit l'en-tête `Last-Modified` sur la date de dernière modification du fichier dans le système d'exploitation. Les valeurs possibles sont `true` ou `false`. | Booléen | `true` |
| `maxAge`      | Définit la propriété max-age de l'en-tête Cache-Control, en millisecondes ou par une chaîne au format [ms format](https://www.npmjs.org/package/ms) | Numérique | 0 |
| `redirect`    | Réapplique les barres obliques "/" lorsque le chemin d'accès est un répertoire. | Booléen | `true` |
| `setHeaders`  | Fonction pour définir les en-têtes HTTP à servir avec le fichier. | Fonction |  |

Voici un exemple d'utilisation de la fonction middleware `express.static` avec un objet options élaboré :

<pre>
<code class="language-javascript" translate="no">
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
}

app.use(express.static('public', options));
</code>
</pre>

Vous pouvez avoir plusieurs répertoires statiques par application :

<pre>
<code class="language-javascript" translate="no">
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.static('files'));
</code>
</pre>

Pour obtenir plus de détails sur la fonction `serve-static` et ses options, reportez-vous à la documentation [serve-static](https://github.com/expressjs/serve-static).

<h2 id='middleware.third-party'>Middleware tiers</h2>

Utilisez un middleware tiers pour ajouter des fonctionnalités à des applications Express.

Installez le module Node.js pour la fonctionnalité requise, puis chargez-le dans votre application au niveau application ou au niveau router.

L'exemple suivant illustre l'installation et le chargement de la fonction middleware d'analyse de cookie `cookie-parser`.

```console
$ npm install cookie-parser
```

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

// load the cookie-parsing middleware
app.use(cookieParser());
</code>
</pre>

Pour obtenir une liste non exhaustive des fonctions middleware tiers utilisées couramment avec Express, reportez-vous à : [Middleware tiers](../resources/middleware.html).
