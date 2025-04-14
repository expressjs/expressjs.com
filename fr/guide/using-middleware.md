---
layout: page
title: Utilisation de middleware Express
description: Learn how to use middleware in Express.js applications, including application-level and router-level middleware, error handling, and integrating third-party middleware.
menu: guide
lang: fr
redirect_from: /guide/using-middleware.html
---

# Utilisation de middleware

Express est une infrastructure web middleware et de routage, qui a des fonctions propres minimes : une application Express n'est ni plus ni moins qu'une succession d'appels de fonctions middleware.

Les fonctions de _middleware_ sont des fonctions qui peuvent accéder à l'[objet Request](/{{ page.lang }}/4x/api.html#req)  (`req`), l'[objet response](/{{ page.lang }}/4x/api.html#res) (`res`) et à la fonction middleware suivant dans le cycle demande-réponse de l'application. La fonction middleware suivant est couramment désignée par une variable nommée `next`.

Les fonctions middleware effectuent les tâches suivantes :

- Exécuter tout type de code.
- Apporter des modifications aux objets de demande et de réponse.
- Terminer le cycle de demande-réponse.
- Appeler la fonction middleware suivant dans la pile.

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

```js
const app = express()

app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})
```

Cet exemple illustre une fonction middleware montée sur le chemin `/user/:id`. La fonction est exécutée pour tout type de
demande HTTP sur le chemin`/user/:id`.

```js
app.use('/user/:id', (req, res, next) => {
  console.log('Request Type:', req.method)
  next()
})
```

Cet exemple illustre une route et sa fonction de gestionnaire (système de middleware). La fonction gère les demandes GET adressées au chemin `/user/:id`.

```js
app.get('/user/:id', (req, res, next) => {
  res.send('USER')
})
```

Voici un exemple de chargement d'une série de fonctions middleware sur un point de montage, avec un chemin de montage.
Il illustre une sous-pile de middleware qui imprime les infos de demande pour tout type de demande HTTP adressée au chemin `/user/:id`.

```js
app.use('/user/:id', (req, res, next) => {
  console.log('Request URL:', req.originalUrl)
  next()
}, (req, res, next) => {
  console.log('Request Type:', req.method)
  next()
})
```

Les gestionnaires de routage vous permettent de définir plusieurs routes pour un chemin. L'exemple ci-dessous définit deux routes pour les demandes GET adressées au chemin `/user/:id`. La deuxième route ne causera aucun problème, mais ne sera jamais appelée puisque la première route boucle le cycle demande-réponse.

Cet exemple illustre une sous-pile de middleware qui gère les demandes GET adressées au chemin `/user/:id`.

```js
app.get('/user/:id', (req, res, next) => {
  console.log('ID:', req.params.id)
  next()
}, (req, res, next) => {
  res.send('User Info')
})

// handler for the /user/:id path, which prints the user ID
app.get('/user/:id', (req, res, next) => {
  res.end(req.params.id)
})
```

Pour ignorer les fonctions middleware issues d'une pile de middleware de routeur, appelez `next('route')` pour passer le contrôle à la prochaine route.

\*\*REMARQUE \*\*: `next('route')` ne fonctionnera qu'avec les fonctions middleware qui ont été chargées via les fonctions `app.METHOD()` ou `router.METHOD()`. %}

Réapplique les barres obliques "/" lorsque le chemin d'accès est un répertoire.

```js
app.get('/user/:id', (req, res, next) => {
  // if the user ID is 0, skip to the next route
  if (req.params.id === '0') next('route')
  // otherwise pass the control to the next middleware function in this stack
  else next() //
}, (req, res, next) => {
  // render a regular page
  res.render('regular')
})

// handler for the /user/:id path, which renders a special page
app.get('/user/:id', (req, res, next) => {
  res.render('special')
})
```

Middleware can also be declared in an array for reusability.

Voici un exemple d'utilisation de la fonction middleware `express.static` avec un objet options élaboré :

```js
function logOriginalUrl (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}

function logMethod (req, res, next) {
  console.log('Request Type:', req.method)
  next()
}

const logStuff = [logOriginalUrl, logMethod]
app.get('/user/:id', logStuff, (req, res, next) => {
  res.send('User Info')
})
```

<h2 id='middleware.router'>Middleware niveau routeur</h2>

Le middleware niveau routeur fonctionne de la même manière que le middleware niveau application, à l'exception près qu'il est lié à une instance de `express.Router()`.

```js
const router = express.Router()
```

Chargez le middleware niveau routeur par le biais des fonctions `router.use()` et `router.METHOD()`.

Le code d'exemple suivant réplique le système de middleware illustré ci-dessus pour le middleware niveau application, en utilisant un middleware niveau routeur :

```js
const app = express()
const router = express.Router()

// a middleware function with no mount path. This code is executed for every request to the router
router.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use('/user/:id', (req, res, next) => {
  console.log('Request URL:', req.originalUrl)
  next()
}, (req, res, next) => {
  console.log('Request Type:', req.method)
  next()
})

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get('/user/:id', (req, res, next) => {
  // if the user ID is 0, skip to the next router
  if (req.params.id === '0') next('route')
  // otherwise pass control to the next middleware function in this stack
  else next() //
}, (req, res, next) => {
  // render a regular page
  res.render('regular')
})

// handler for the /user/:id path, which renders a special page
router.get('/user/:id', (req, res, next) => {
  console.log(req.params.id)
  res.render('special')
})

// mount the router on the app
app.use('/', router)
```

Pour obtenir plus de détails sur la fonction `serve-static` et ses options, reportez-vous à la documentation [serve-static](https://github.com/expressjs/serve-static).

Cet exemple illustre une sous-pile de middleware qui gère les demandes GET adressées au chemin `/user/:id`.

```js
const options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}

app.use(express.static('public', options))
```

<h2 id='middleware.error-handling'>Middleware de traitement d'erreurs</h2>

<div class="doc-box doc-notice" markdown="1">
Le middleware de traitement d'erreurs comporte toujours *quatre* arguments. Vous devez fournir quatre arguments pour l'identifier comme une fonction middleware de traitement d'erreurs. Même si vous n'avez pas besoin d'utiliser l'objet `next`, vous devez le spécifier pour maintenir la signature. Sinon, l'objet `next` sera interprété comme un middleware ordinaire et n'arrivera pas à gérer les erreurs.
</div>

Définissez les fonctions middleware de traitement d'erreurs de la même façon que d'autres fonctions middleware, à l'exception près qu'il faudra 4 arguments au lieu de 3, et plus particulièrement avec la signature `(err, req, res, next)`) :

```js
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

Pour obtenir des détails sur le middleware de traitement d'erreurs, reportez-vous à : [Traitement d'erreurs](/{{ page.lang }}/guide/error-handling.html).

<h2 id='middleware.built-in'>Middleware intégré</h2>

Depuis la version 4.x, Express ne dépend plus de [Connect](https://github.com/senchalabs/connect). A l'exception de `express.static`, toutes les fonctions middleware
précédemment incluses à Express' font désormais partie de modules distincts. Veuillez vous reporter à [la liste des fonctions middleware](https://github.com/senchalabs/connect#middleware).

La seule fonction middleware intégrée dans Express est `express.static`.

- [express.static](/en/4x/api.html#express.static) serves static assets such as HTML files, images, and so on.
- [express.json](/en/4x/api.html#express.json) parses incoming requests with JSON payloads. **NOTE: Available with Express 4.16.0+**
- [express.urlencoded](/en/4x/api.html#express.urlencoded) parses incoming requests with URL-encoded payloads.  **NOTE: Available with Express 4.16.0+**

<h2 id='middleware.third-party'>Middleware tiers</h2>

Utilisez un middleware tiers pour ajouter des fonctionnalités à des applications Express.

Installez le module Node.js pour la fonctionnalité requise, puis chargez-le dans votre application au niveau application ou au niveau router.

L'exemple suivant illustre l'installation et le chargement de la fonction middleware d'analyse de cookie `cookie-parser`.

```bash
$ npm install cookie-parser
```

```js
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

// load the cookie-parsing middleware
app.use(cookieParser())
```

Pour obtenir une liste non exhaustive des fonctions middleware tiers utilisées couramment avec Express, reportez-vous à : [Middleware tiers](../resources/middleware.html).
