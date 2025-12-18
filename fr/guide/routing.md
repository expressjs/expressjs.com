---
layout: page
title: Routage Express
description: Apprenez à définir et à utiliser des routes dans les applications Express.js, y compris les méthodes de routes, les chemins de routes, les paramètres et l’utilisation de Router pour un routage modulaire.
menu: guide
order: 1
redirect_from: "  "
---

# Routage

_Routage_ fait référence à la définition de points finaux d'application (URI) et à la façon dont ils répondent aux demandes client.
Pour une introduction au routage, voir [Basic routing](/{{ page.lang }}/starter/basic-routing.html).

Vous définissez le routage à l’aide des méthodes de l’objet app d’Express correspondant aux méthodes HTTP :
par exemple, `app.get()` pour les requêtes GET et \`app.post pour les requêtes POST. Pour la liste complète,
voir [app.METHOD](/{{ page.lang }}/5x/api.html#app.METHOD). Vous pouvez également utiliser [app.all()](/{{ page.lang }}/5x/api.html#app.all) pour gérer toutes les méthodes HTTP et [app.use()](/{{ page.lang }}/5x/api.html#app.use) spécifier le middleware comme fonction de rappel (Voir [Utilisation du middleware](/{{ page.lang }}/guide/using-middleware.html) pour plus de détails).

Ces méthodes de routage spécifient une fonction de rappel (parfois "appelée fonction de gestion") qui est appelée lorsque l'application reçoit une requête correspondant à la route (point de terminaison) et à la méthode HTTP spécifiées. Autrement dit, l'application "écoute" les requêtes qui correspondent à la ou aux routes et à la ou aux méthodes spécifiées, et lorsqu'une correspondance est détectée, elle appelle la fonction de rappel définie.

En réalité, les méthodes de routage peuvent accepter plusieurs fonctions de rappel comme arguments.
Lorsqu'il y a plusieurs fonctions de rappel, il est important de fournier `next` comme argument à la fonction de rappel, puis d'appeler `next()` dans le corps de la fonction afin de passer le contrôle à la fonction de rappel suivante.

Le code suivant est un exemple de routage très basique.

```js
const express = require('express')
const app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello world')
})
```

<h2 id="route-methods">Méthodes de routage</h2>

Une méthode de routage est dérivée de l'une des méthodes HTTP, et est liée à une instance de la classe `express`.

Le code suivant est un exemple de routes qui sont définies pour les méthodes GET et POST jusqu'à la route de l'application.

```js
// GET method route
app.get('/', (req, res) => {
  res.send('GET request to the homepage')
})

// POST method route
app.post('/', (req, res) => {
  res.send('POST request to the homepage')
})
```

Express prend en charge des méthodes correspondant à toutes les méthodes de requête HTTP : `get`, `post`, etc. Pour la liste complète, voir [app.METHOD](/{{ page.lang }}/5x/api.html#app.METHOD).
Pour la liste complète, voir [app.METHOD](/{{ page.lang }}/5x/api.html#app.METHOD).

Il existe une méthode de routage spéciale, `app.all()`, qui n'est pas dérivée d'une méthode HTTP. Cette méthode est utilisée pour charger des fonctions middleware à un chemin d'accès pour toutes les méthodes de demande.

```js
app.all('/secret', (req, res, next) => {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
})
```

<h2 id="route-paths">Chemins de routage</h2>

Les chemins de routage, combinés à une méthode de demande, définissent les noeuds finaux sur lesquels peuvent être effectuées les demandes. Les chemins de routage peuvent être des chaînes, des masques de chaîne ou des expressions régulières.

{% capture caution-character %} Dans Express 5, les caractères `?`, `+`, `*`, `[]`, et `()` sont traités différemment par rapport à la version 4. Veuillez consulter le [migration guide](/{{ page.lang }}/guide/migrating-5.html#path-syntax) pour plus d'informations.{% endcapture %}

{% include admonitions/caution.html content=caution-character %}

{% capture note-dollar-character %}Dans Express 4, les caractères d'expression régulière tels que `$` doivent être échappés avec un `\`.
{% endcapture %}

{% include admonitions/caution.html content=note-dollar-character %}

{% capture note-path-to-regexp %}

Express utilise [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) pour faire correspondre les chemins de routes ; consultez la documentation de path-to-regexp pour connaître toutes les possibilités de définition des chemins de routes. [Express Route Tester](http://forbeslindesay.github.io/express-route-tester/) est un outil pratique permettant de tester des routes Express de base, bien qu'il ne prenne pas en charge le filtrage par motif.

{% endcapture %}

{% include admonitions/note.html content=note-path-to-regexp %}

{% capture query-string-note %}

Les chaînes de requête (query strings) ne font pas partie du chemin de la route.

{% endcapture %}

{% include admonitions/warning.html content=query-string-note %}

### Il s'agit d'exemples de chemins de routage basés sur des chaînes.

Ce chemin de routage fera correspondre des demandes à la route racine, `/`.

```js
app.get('/', (req, res) => {
  res.send('root')
})
```

Ce chemin de routage fera correspondre des demandes à `/about`.

```js
app.get('/about', (req, res) => {
  res.send('about')
})
```

Ce chemin de routage fera correspondre des demandes à `/random.text`.

```js
app.get('/random.text', (req, res) => {
  res.send('random.text')
})
```

### Il s'agit d'exemples de chemins de routage basés sur des masques de chaîne.

{% capture caution-string-patterns %} Les motifs de chaînes (string patterns) ne fonctionnent plus dans Express 5. Veuillez consulter [migration guide](/{{ page.lang }}/guide/migrating-5.html#path-syntax) pour plus d'informations.{% endcapture %}

{% include admonitions/caution.html content=caution-string-patterns %}

Ce chemin de routage fait correspondre `acd` et `abcd`.

```js
app.get('/ab?cd', (req, res) => {
  res.send('ab?cd')
})
```

Ce chemin de routage fait correspondre `abcd`, `abbcd`, `abbbcd`, etc.

```js
app.get('/ab+cd', (req, res) => {
  res.send('ab+cd')
})
```

Ce chemin de routage fait correspondre `abcd`, `abxcd`, `abRABDOMcd`, `ab123cd`, etc.

```js
app.get('/ab*cd', (req, res) => {
  res.send('ab*cd')
})
```

Ce chemin de routage fait correspondre `/abe` et `/abcde`.

```js
app.get('/ab(cd)?e', (req, res) => {
  res.send('ab(cd)?e')
})
```

### Exemples de chemins de routage basés sur des expressions régulières :

Ce chemin de routage fera correspondre tout élément dont le nom de chemin comprend la lettre "a".

```js
app.get(/a/, (req, res) => {
  res.send('/a/')
})
```

Ce chemin de routage fera correspondre `butterfly` et `dragonfly`, mais pas `butterflyman`, `dragonfly man`, etc.

```js
app.get(/.*fly$/, (req, res) => {
  res.send('/.*fly$/')
})
```

<h2 id="route-parameters">
Les chaînes de requête ne font pas partie du chemin de routage.
</h2>

Les paramètres de route sont des segments nommés de l'URL utilisés pour capturer les valeurs spécifiées à leur position dans l'URL. Les valeurs capturées sont placées dans l'objet `req.params`, avec le nom du paramètre de route spécifié dans le chemin comme clé correspondante.

```
Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }
```

Pour définir des routes avec des paramètres de route, il suffit de spécifier les paramètres dans le chemin de la route comme indiqué ci-dessous.

```js
app.get('/users/:userId/books/:bookId', (req, res) => {
  res.send(req.params)
})
```

<div class="doc-box doc-notice" markdown="1">
Le nom des paramètres de route doit être composé de "caractères alphanumériques" ([A-Za-z0-9_]).</div>

Comme le tiret (`-`) et le point (`.`) sont interprétés littéralement, ils peuvent être utilisés avec les paramètres de route à des fins pratiques.

```
Route path: /flights/:from-:to
Request URL: http://localhost:3000/flights/LAX-SFO
req.params: { "from": "LAX", "to": "SFO" }
```

```
Route path: /plantae/:genus.:species
Request URL: http://localhost:3000/plantae/Prunus.persica
req.params: { "genus": "Prunus", "species": "persica" }
```

{% capture warning-regexp %}
Dans Express 5, les caractères Regexp ne sont pas pris en chage dans les chemins de route. Pour plus d'informations, veuillez consulter le [guide de migration](/{{ page.lang }}/guide/migrating-5.html#path-syntax).{% endcapture %}

{% include admonitions/caution.html content=warning-regexp %}

Pour mieux contrôler la chaîne exacte pouvant être capturée par un paramètre de route, vous pouvez ajouter une expression régulière entre parenthèses (`()`):

```
Route path: /user/:userId(\d+)
Request URL: http://localhost:3000/user/42
req.params: {"userId": "42"}
```

{% capture escape-advisory %}

Comme l'expression régulière fait généralement partie d'une chaîne littérale, veillez à échapper tout caractère `\` avec un antislash supplémentaire, par exemple `\\d+`.

{% endcapture %}

{% include admonitions/warning.html content=escape-advisory %}

{% capture warning-version %}

Dans Express 4.x, <a href="https://github.com/expressjs/express/issues/2495">le caractère `*` dans une expression régulière n'est pas interprété de manière habituelle</a>. Comme solution de contournement, utilisez `{0,}` au lieu de `*`. Cela sera probablement corrigé dans Express 5.

{% endcapture %}

{% include admonitions/warning.html content=warning-version %}

<h2 id="route-handlers">Gestionnaires de routage</h2>

Vous pouvez fournir plusieurs fonctions de rappel qui se comportent comme des [middleware](/{{ page.lang }}/guide/using-middleware.html) pour gérer une demande. La seule exception est que ces fonctions de rappel peuvent faire appel à `next('route')` pour ignorer les rappels de route restants. Vous pouvez utiliser ce mécanisme pour imposer des conditions préalables sur une route, puis passer aux routes suivantes si aucune raison n'est fournie pour traiter la route actuelle.

```js
app.get('/user/:id', (req, res, next) => {
  if (req.params.id === '0') {
    return next('route')
  }
  res.send(`User ${req.params.id}`)
})

app.get('/user/:id', (req, res) => {
  res.send('Special handler for user ID 0')
})
```

Dans cet exemple :

- `GET /user/5` → géré par la première route → envoie "User 5"
- `GET /user/0` → la première route appelle `next('route')`, en passant à la prochaine route correspondant à `/user/:id`

Les gestionnaires de route se trouvent sous la forme d'une fonction, d'un tableau de fonctions ou d'une combinaison des deux, tel qu'indiqué dans les exemples suivants.

Une fonction de rappel unique peut traiter une route. Par exemple :

```js
app.get('/example/a', (req, res) => {
  res.send('Hello from A!')
})
```

Plusieurs fonctions de rappel peuvent traiter une route (n'oubliez pas de spécifier l'objet `next`). Par exemple :

```js
app.get('/example/b', (req, res, next) => {
  console.log('the response will be sent by the next function ...')
  next()
}, (req, res) => {
  res.send('Hello from B!')
})
```

Un tableau de fonctions de rappel peut traiter une route. Par exemple :

```js
const cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

const cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

const cb2 = function (req, res) {
  res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1, cb2])
```

Une combinaison de fonctions indépendantes et des tableaux de fonctions peuvent gérer une route. Par exemple :

```js
const cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

const cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

app.get('/example/d', [cb0, cb1], (req, res, next) => {
  console.log('the response will be sent by the next function ...')
  next()
}, (req, res) => {
  res.send('Hello from D!')
})
```

<h2 id="response-methods">Méthodes de réponse</h2>

Les méthodes de l'objet de réponse (`res`) décrites dans le tableau suivant peuvent envoyer une réponse au client, et mettre fin au cycle de demande-réponse. Si aucune de ces méthodes n'est appelée par un gestionnaire de routage, la demande du client restera bloquée.

| Méthode                                                                                                                                                                                                                   | Description                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| [res.download()](/{{ page.lang }}/4x/api.html#res.download)     | Vous invite à télécharger un fichier.                                                                         |
| [res.end()](/{{ page.lang }}/4x/api.html#res.end)               | Met fin au processus de réponse.                                                                              |
| [res.json()](/{{ page.lang }}/4x/api.html#res.json)             | Envoie une réponse JSON.                                                                                      |
| [res.jsonp()](/{{ page.lang }}/4x/api.html#res.jsonp)           | Envoie une réponse JSON avec une prise en charge JSONP.                                                       |
| [res.redirect()](/{{ page.lang }}/4x/api.html#res.redirect)     | Redirige une demande.                                                                                         |
| [res.render()](/{{ page.lang }}/4x/api.html#res.render)         | Génère un modèle de vue.                                                                                      |
| [res.send()](/{{ page.lang }}/4x/api.html#res.send)             | Envoie une réponse de divers types.                                                                           |
| [res.sendFile()](/{{ page.lang }}/4x/api.html#res.sendFile)     | Envoyer un fichier sous forme de flux octet.                                                                  |
| [res.sendStatus()](/{{ page.lang }}/4x/api.html#res.sendStatus) | Définit le code de statut de réponse et envoie sa représentation sous forme de chaîne comme corps de réponse. |

<h2 id="app-route">app.route()</h2>

Vous pouvez créer des gestionnaires de routage sous forme de chaîne pour un chemin de routage en utilisant `app.route()`.
Etant donné que le chemin est spécifié à une seul emplacement, la création de routes modulaires est utile car elle réduit la redondance et les erreurs. Pour plus d'informations sur les routes, voir la [documentation Router()](/{{ page.lang }}/4x/api.html#router).

Voici quelques exemples de gestionnaires de chemin de chaînage définis à l'aide de `app.route()`.

```js
app.route('/book')
  .get((req, res) => {
    res.send('Get a random book')
  })
  .post((req, res) => {
    res.send('Add a book')
  })
  .put((req, res) => {
    res.send('Update the book')
  })
```

<h2 id="express-router">express.Router</h2>

Utilisez la classe `express.Router` pour créer des gestionnaires de route modulaires et pouvant être montés. Une instance `Router` est un middleware et un système de routage complet ; pour cette raison, elle est souvent appelée "mini-app".

L'exemple suivant créé une routeur en tant que module, charge une fonction middleware, définit des routes et monte le module de routeur sur un chemin dans l'application principale.

Créez un fichier de routage nommé `birds.js` dans le répertoire app, avec le contenu suivant :

```js
const express = require('express')
const router = express.Router()

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now())
  next()
}
router.use(timeLog)

// define the home page route
router.get('/', (req, res) => {
  res.send('Birds home page')
})
// define the about route
router.get('/about', (req, res) => {
  res.send('About birds')
})

module.exports = router
```

Puis, chargez le module de routage dans l'application :

```js
const birds = require('./birds')

// ...

app.use('/birds', birds)
```

L'application pourra dorénavant gérer des demandes dans `/birds` et `/birds/about`, et appeler la fonction middleware `timeLog` spécifique à la route.

Mais si la route parente `/birds` possède des paramètres de chemin, ils ne seront pas accessibles par défaut depuis les sous-routes. Pour qu'ils soient accessibles, vous devez passer l'option `mergeParams` au constructeur de Router [reference](/{{ page.lang }}/5x/api.html#app.use).

```js
const router = express.Router({ mergeParams: true })
```
