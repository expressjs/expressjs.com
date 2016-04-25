---
layout: page
title: Utilisation de moteurs de modèles avec Express
menu: guide
lang: fr
---

# Utilisation de moteurs de modèles avec Express

Pour qu'Express puisse afficher le rendu des fichiers modèles, vous devez définir les paramètres d'application suivants :

* `views`, le répertoire dans lequel se trouvent les fichiers modèles. Par exemple : `app.set('views', './views')`
* `view engine`, le moteur de modèle à utiliser. Par exemple : `app.set('view engine', 'jade')`

Ensuite, installez le package npm du moteur de modèle correspondant :

```sh
$ npm install jade --save
```

<div class="doc-box doc-notice" markdown="1">
Les moteurs de modèles conformes à Express tels que Jade exportent une fonction nommée `__express(filePath, options, callback)`, qui est appelée par la fonction `res.render()` pour générer le code de modèle.

Certaines moteurs de modèles ne suivent pas cette convention. La bibliothèque [Consolidate.js](https://www.npmjs.org/package/consolidate) suit cette convention en mappant tous les moteurs de modèles Node.js répandus, et fonctionne donc parfaitement avec Express.
</div>

Une fois le moteur de vue défini, vous n'avez pas à spécifier le moteur ou à charger le module de moteur de modèles dans votre application ; Express charge le module en interne, comme indiqué ci-dessous (pour l'exemple ci-dessus).

```js
app.set('view engine', 'jade');
```

Créez un fichier de modèle Jade nommé `index.jade` dans le répertoire `views`, avec le contenu suivant :

```js
html
  head
    title!= title
  body
    h1!= message
```

Puis, créez une route pour générer le fichier `index.jade`. Si la propriété `view engine` n'est pas définie, vous devez spécifier l'extension du fichier `view`. Sinon, vous pouvez l'omettre.

```js
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});
```

Lorsque vous faites une demande vers la page d'accueil, le fichier `index.jade` est généré en HTML.

Pour en savoir plus sur le fonctionnement des moteurs de modèle dans Express, voir : ["Développement de moteurs de modèles pour Express"](/{{ page.lang }}/advanced/developing-template-engines.html).
