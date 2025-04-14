---
layout: page
title: Utilisation de moteurs de modèles avec Express
description: Discover how to integrate and use template engines like Pug, Handlebars, and EJS with Express.js to render dynamic HTML pages efficiently.
menu: guide
lang: fr
redirect_from: /guide/using-template-engines.html
---

# Utilisation de moteurs de modèles avec Express

A _template engine_ enables you to use static template files in your application. At runtime, the template engine replaces
variables in a template file with actual values, and transforms the template into an HTML file sent to the client.
This approach makes it easier to design an HTML page.

The [Express application generator](/{{ page.lang }}/starter/generator.html) uses [Pug](https://pugjs.org/api/getting-started.html) as its default, but it also supports [Handlebars](https://www.npmjs.com/package/handlebars), and [EJS](https://www.npmjs.com/package/ejs), among others.

To render template files, set the following [application setting properties](/{{ page.lang }}/4x/api.html#app.set), in the default `app.js` created by the generator:

- `views`, le répertoire dans lequel se trouvent les fichiers modèles. Par exemple : `app.set('views', './views')`
  This defaults to the `views` directory in the application root directory.
- `view engine`, le moteur de modèle à utiliser. Par exemple : `app.set('view engine', 'pug')`

Ensuite, installez le package npm du moteur de modèle correspondant :

```bash
$ npm install pug --save
```

<div class="doc-box doc-notice" markdown="1">
Les moteurs de modèles conformes à Express tels que Pug exportent une fonction nommée `__express(filePath, options, callback)`, qui est appelée par la fonction `res.render()` pour générer le code de modèle.

Certaines moteurs de modèles ne suivent pas cette convention. La bibliothèque [Consolidate.js](https://www.npmjs.org/package/consolidate) suit cette convention en mappant tous les moteurs de modèles Node.js répandus, et fonctionne donc parfaitement avec Express.

</div>

Une fois le moteur de vue défini, vous n'avez pas à spécifier le moteur ou à charger le module de moteur de modèles dans votre application ; Express charge le module en interne, comme indiqué ci-dessous (pour l'exemple ci-dessus).

```js
app.set('view engine', 'pug')
```

Créez un fichier de modèle Pug nommé `index.pug` dans le répertoire `views`, avec le contenu suivant :

```pug
html
  head
    title= title
  body
    h1= message
```

Puis, créez une route pour générer le fichier `index.pug`. Si la propriété `view engine` n'est pas définie, vous devez spécifier l'extension du fichier `view`. Sinon, vous pouvez l'omettre.

```js
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})
```

Lorsque vous faites une demande vers la page d'accueil, le fichier `index.pug` est généré en HTML.

The view engine cache does not cache the contents of the template's output, only the underlying template itself. The view is still re-rendered with every request even when the cache is on.
