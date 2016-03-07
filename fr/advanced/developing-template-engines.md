---
layout: page
title: Développement de moteurs de modèles pour Express
menu: advanced
lang: fr
---

# Développement de moteurs de modèles pour Express

Utilisez la méthode `app.engine(ext, callback)` pour créer votre propre moteur de modèle. `ext` fait référence à l'extension de fichier et `callback` est la fonction du moteur de modèle, qui accepte les éléments suivants en tant que paramètres : l'emplacement du fichier, l'objet options et la fonction callback.

Le code suivant est un exemple d'implémentation d'un moteur de modèle très simple qui permet d'afficher le rendu des fichiers `.ntl`.

<pre>
<code class="language-javascript" translate="no">
var fs = require('fs'); // this engine requires the fs module
app.engine('ntl', function (filePath, options, callback) { // define the template engine
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(new Error(err));
    // this is an extremely simple template engine
    var rendered = content.toString().replace('#title#', '<title>'+ options.title +'</title>')
    .replace('#message#', '<h1>'+ options.message +'</h1>');
    return callback(null, rendered);
  });
});
app.set('views', './views'); // specify the views directory
app.set('view engine', 'ntl'); // register the template engine
</code>
</pre>

Votre application est désormais en mesure d'afficher le rendu des fichiers `.ntl`. Créez un fichier nommé  `index.ntl` dans le répertoire `views` avec le contenu suivant.

<pre>
<code class="language-javascript" translate="no">
#title#
#message#
</code>
</pre>
ENsuite, créez la route suivante dans votre application.

<pre>
<code class="language-javascript" translate="no">
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});
</code>
</pre>
Lorsque vous effectuerez une demande à la page d'accueil, `index.ntl` sera rendu au format HTML.
