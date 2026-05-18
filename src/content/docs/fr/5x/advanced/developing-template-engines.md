---
title: Développement de moteurs de gabarits pour Express
description: Apprenez comment développer des moteurs de gabarits personnalisés pour Express.js en utilisant app.engine(), avec des exemples sur la création et l'intégration de votre propre logique de rendu de gabarits.
---

Utilisez la méthode `app.engine(ext, callback)` pour créer votre propre moteur de template. `ext` fait référence à l'extension de fichier, et `callback` est la fonction du moteur de gabarit, qui accepte les éléments suivants comme paramètres: l'emplacement du fichier, l'objet d'options et la fonction de rappel.

Le code suivant est un exemple d'implémenter un moteur de gabarit très simple pour le rendu des fichiers `.ntl`.

```js
const fs = require('fs'); // this engine requires the fs module
app.engine('ntl', (filePath, options, callback) => {
  // define the template engine
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err);
    // this is an extremely simple template engine
    const rendered = content
      .toString()
      .replace('#title#', `<title>${options.title}</title>`)
      .replace('#message#', `<h1>${options.message}</h1>`);
    return callback(null, rendered);
  });
});
app.set('views', './views'); // specify the views directory
app.set('view engine', 'ntl'); // register the template engine
```

Votre application sera maintenant en mesure d'afficher les fichiers `.ntl`. Créez un fichier nommé `index.ntl` dans le dossier `views` avec le contenu suivant.

```pug
#title#
#message#
```

Ensuite, créez la route suivante dans votre application.

```js
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' });
});
```

Lorsque vous faites une requête sur la page d'accueil, `index.ntl` sera rendu en HTML.
