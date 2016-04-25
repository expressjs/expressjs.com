---
layout: page
title: Exemple "Hello world" Express
menu: starter
lang : fr
---

# Exemple Hello world

<div class="doc-box doc-info" markdown="1">
Il s'agit de l'application Express la plus simple que vous puissiez créer. Cette application ne contient qu'un seul fichier, c'est-à-dire *tout l'inverse* de ce que vous obtiendriez avec le
[générateur Express](/{{ page.lang }}/starter/generator.html), qui crée l'échafaudage d'une application entière, avec des fichiers JavaScript, des modèles Jade et des sous-répertoires pour divers motifs.
</div>

Premièrement, créez un répertoire appelé `myapp`, rendez-vous dedans et exécutez la commande `npm init`.
Ensuite, installez `express` en tant que dépendance en suivant les instructions du [guide d'installation](/{{ page.lang }}/starter/installing.html).

Dans le répertoire `myapp`, créez un fichier appelé `app.js` et ajoutez le code suivant :

```js
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
```

L'application démarre un serveur et écoute le port 3000 à la recherche de connexions. L'application répond "Hello World!" aux demandes adressées
à l'URL racine (`/`) ou à la *route* racine. Pour tous les autres chemins d'accès, elle répondra par **404 Not Found**.

<div class="doc-box doc-notice" markdown="1">
Les objets `req` (demande) et `res` (réponse) sont exactement les mêmes que ceux que le Noeud fournit, vous pouvez donc appeler
`req.pipe()`, `req.on('data', callback)` et tout autre objet sans recourir à Express.
</div>

Exécutez l'application avec la commande suivante :

```sh
$ node app.js
```

Puis chargez [http://localhost:3000/](http://localhost:3000/) dans un navigateur pour consulter le résultat.

