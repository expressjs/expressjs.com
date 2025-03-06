---
layout: page
title: Routage de base Express
menu: starter
lang: fr
description: Learn the fundamentals of routing in Express.js applications, including
  how to define routes, handle HTTP methods, and create route handlers for your web
  server.
---

# Routage de base

*Routage* fait référence à la détermination de la façon dont une application répond à un 
nœud final spécifique, c'est-à-dire un URI (ou chemin) et une méthode de requête HTTP (GET, POST, etc.).

Chaque route peut avoir une ou plusieurs fonctions de gestionnaire, qui sont exécutées lorsque la route est mise en correspondance.

La définition de la route utilise la structure suivante :
```js
app.METHOD(PATH, HANDLER)
```

Où :

- `app` est une instance d'`express`.
- `METHOD` est une [méthode de demande HTTP](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol).
- `PATH` est un chemin sur le serveur.
- `HANDLER` est la fonction exécutée lorsque la route est mise en correspondance.

<div class="doc-box doc-notice" markdown="1">
Ce tutoriel suppose qu'une instance d'`express` appelée `app` soit créée et que le serveur soit en cours d'exécution.
Si vous ne savez pas créer et démarrer une application, reportez-vous à l'[exemple Hello world](/{{ page.lang }}/starter/hello-world.html).
</div>

Les exemples suivants illustrent la définition de routes simples.

Réponse `Hello World!` sur la page d'accueil :

```js
app.get('/', (req, res) => {
  res.send('Hello World!')
})
```

Réponse à une demande POST sur la route racine (`/`), sur la page d'accueil de l'application :

```js
app.post('/', (req, res) => {
  res.send('Got a POST request')
})
```

Réponse à une demande PUT sur la route `/user` :

```js
app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user')
})
```

Réponse à une demande DELETE sur la route `/user` :

```js
app.delete('/user', (req, res) => {
  res.send('Got a DELETE request at /user')
})
```

Pour plus de détails sur le routage, reportez-vous au [guide de routage](/{{ page.lang }}/guide/routing.html).
