---
title: Outrepasser l'API Express
description: Découvrez comment personnaliser et étendre l'API Express.js en écrasant les méthodes et les propriétés sur les objets de demande et de réponse à l'aide de prototypes.
---

L'API Express se compose de différentes méthodes et propriétés sur les objets de requête et de réponse. Celles-ci sont héritées du prototype. Il y a deux points d'extension pour l'API Express :

1. Les prototypes globaux à `express.request` et `express.response`.
2. Prototypes spécifiques à l'application à `app.request` et `app.response`.

Modifier les prototypes globaux affectera toutes les applications Express chargées dans le même processus. Si vous le souhaitez, les modifications peuvent être apportées à l'application en modifiant uniquement les prototypes spécifiques à l'application après avoir créé une nouvelle application.

## Méthodes

Vous pouvez remplacer la signature et le comportement des méthodes existantes avec vos propres méthodes en assignant une fonction personnalisée.

Voici un exemple de surcharge du comportement de [res.sendStatus](/en/4x/api#res.sendStatus).

```js
app.response.sendStatus = function (statusCode, type, message) {
  // code is intentionally kept simple for demonstration purpose
  return this.contentType(type).status(statusCode).send(message);
};
```

L'implémentation ci-dessus modifie complètement la signature originale de `res.sendStatus`. Il accepte maintenant un code de statut, un type d'encodage, et le message à envoyer au client.

La méthode surchargée peut maintenant être utilisée de cette manière:

```js
res.sendStatus(404, 'application/json', '{"error":"resource not found"}');
```

## Propriétés

Les propriétés de l'API Express sont soit :

1. Propriétés assignées (ex: `req.baseUrl`, `req.originalUrl`)
2. Défini comme getters (ex: `req.secure`, `req.ip`)

Puisque les propriétés de la catégorie 1 sont assignées dynamiquement sur les objets `request` et `response` dans le contexte du cycle de réponse de la requête courante, leur comportement ne peut pas être remplacé.

Les propriétés de la catégorie 2 peuvent être écrasées en utilisant l'API des extensions API Express.

Le code suivant réécrit comment la valeur de `req.ip` doit être dérivée. Maintenant, il retourne simplement la valeur de l'en-tête de la requête `Client-IP`.

```js
Object.defineProperty(app.request, 'ip', {
  configurable: true,
  enumerable: true,
  get() {
    return this.get('Client-IP');
  },
});
```

## Prototype

Afin de fournir l'API Express, les objets de requête/réponse passés à Express (via `app(req, res)`, par exemple) doivent hériter de la même chaîne de prototypes. Par défaut, c'est `http.IncomingRequest.prototype` pour la requête et `http.ServerResponse.prototype` pour la réponse.

Sauf si nécessaire, il est recommandé de le faire uniquement au niveau de l'application, plutôt qu'au niveau mondial. Veillez également à ce que le prototype utilisé corresponde le plus près possible à la fonctionnalité des prototypes par défaut.

```js
// Use FakeRequest and FakeResponse in place of http.IncomingRequest and http.ServerResponse
// for the given app reference
Object.setPrototypeOf(Object.getPrototypeOf(app.request), FakeRequest.prototype);
Object.setPrototypeOf(Object.getPrototypeOf(app.response), FakeResponse.prototype);
```
