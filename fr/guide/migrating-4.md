---
layout: page
title: Migration vers Express 4
menu: guide
lang: fr
---

# Migration vers Express 4

<h2 id="overview">Présentation</h2>

Express 4 est un changement novateur d'Express 3. Cela signifie qu'une application Express 3 existante ne fonctionnera pas si vous mettez à jour la version Express dans les dépendances.

Cet article couvre :

<ul class="doclist">
  <li><a href="#changes">Modifications dans Express 4.</a></li>
  <li><a href="#example-migration">Un exemple</a> de migration d'une application Express 3 vers Express 4.</li>
  <li><a href="#app-gen">Mise à niveau vers le générateur d'applications Express 4.</a></li>
</ul>

<h2 id="changes">Modifications dans Express 4</h2>

De nombreuses modifications importantes ont été faites dans Express 4 :

<ul class="doclist">
  <li><a href="#core-changes">Modification du système principal et middleware d'Express.</a> Les dépendances Connect et des middleware intégrés ont été supprimées, vous devez donc ajouter les middleware vous-même.
  </li>
  <li><a href="#routing">Modifications du système de routage.</a></li>
  <li><a href="#other-changes">Autres modifications diverses.</a></li>
</ul>

Voir aussi :

* [Nouvelles fonctions dans la version 4.x.](https://github.com/expressjs/express/wiki/New-features-in-4.x)
* [Migration de la version 3.x vers 4.x.](https://github.com/expressjs/express/wiki/Migrating-from-3.x-to-4.x)

<h3 id="core-changes">
Modification du système principal et middleware d'Express
</h3>

Express 4 ne dépend plus de Connect, et supprime tous les middleware intégrés de son noyau, sauf la fonction `express.static`. Cela signifie qu'Express
est désormais un canevas Web de routage et de middleware indépendant et que les versions et
éditions d'Express ne sont pas affectées par les mises à jour de middleware.

Sans middleware intégré, vous devez explicitement ajouter tous les
middleware requis pour exécuter votre application. Procédez comme suit :

1. Installez le module : `npm install --save <module-name>`
2. Dans votre application, demandez le module : `require('module-name')`
3. Utilisez le module en fonction de cette documentation: `app.use( ... )`

La table suivante répertorie le middelware Express 3 et ces équivalents dans Express 4.

<table class="doctable" border="1">
<tr><th>Express 3</th><th>Express 4</th></tr>
<tr><td><code>express.bodyParser</code></td>
<td><a href="https://github.com/expressjs/body-parser">body-parser</a> +
<a href="https://github.com/expressjs/multer">multer</a></td></tr>
<tr><td><code>express.compress</code></td>
<td><a href="https://github.com/expressjs/compression">compression</a></td></tr>
<tr><td><code>express.cookieSession</code></td>
<td><a href="https://github.com/expressjs/cookie-session">cookie-session</a></td></tr>
<tr><td><code>express.cookieParser</code></td>
<td><a href="https://github.com/expressjs/cookie-parser">cookie-parser</a></td></tr>
<tr><td><code>express.logger</code></td>
<td><a href="https://github.com/expressjs/morgan">morgan</a></td></tr>
<tr><td><code>express.session</code></td>
<td><a href="https://github.com/expressjs/session">express-session</a></td></tr>
<tr><td><code>express.favicon</code></td>
<td><a href="https://github.com/expressjs/serve-favicon">serve-favicon</a></td></tr>
<tr><td><code>express.responseTime</code></td>
<td><a href="https://github.com/expressjs/response-time">response-time</a></td></tr>
<tr><td><code>express.errorHandler</code></td>
<td><a href="https://github.com/expressjs/errorhandler">errorhandler</a></td></tr>
<tr><td><code>express.methodOverride</code></td>
<td><a href="https://github.com/expressjs/method-override">method-override</a></td></tr>
<tr><td><code>express.timeout</code></td>
<td><a href="https://github.com/expressjs/timeout">connect-timeout</a></td></tr>
<tr><td><code>express.vhost</code></td>
<td><a href="https://github.com/expressjs/vhost">vhost</a></td></tr>
<tr><td><code>express.csrf</code></td>
<td><a href="https://github.com/expressjs/csurf">csurf</a></td></tr>
<tr><td><code>express.directory</code></td>
<td><a href="https://github.com/expressjs/serve-index">serve-index</a></td></tr>
<tr><td><code>express.static</code></td>
<td><a href="https://github.com/expressjs/serve-static">serve-static</a></td></tr>
</table>

Vous trouverez ici la [liste complète](https://github.com/senchalabs/connect#middleware) du middleware Express 4.

Dans la plupart des cas, il vous suffit de remplacer l'ancienne version du middelware 3 par
son équivalent Express 4. Pour plus d'informations, consultez la documentation relative au module dans
GitHub.

<h4 id="app-use"><code>app.use</code> accepte les paramètres</h4>

Dans la version 4 vous pouvez utilisez un paramètre variable pour définir le chemin vers lequel les fonctions middleware sont chargées, puis lire la valeur de ce paramètre dans le gestionnaire de routage.
Par exemple :

<pre>
<code class="language-javascript" translate="no">
app.use('/book/:id', function(req, res, next) {
  console.log('ID:', req.params.id);
  next();
});
</code>
</pre>
<h3 id="routing">
Le système de routage
</h3>

Les applications chargent dorénavant les middleware de routage de manière implicite, ce qui fait que vous n'avez plus à vous
soucier de l'ordre dans lequel les middleware sont chargés par rapport au middleware `router`.

La façon de définir des routes n'a pas changé mais le système de routage possède deux nouvelles fonctions
pour vous aider à organiser vos routes :

{: .doclist }
* Une nouvelle méthode, `app.route()`, permettant de créer des gestionnaires de routage sous forme de chaîne pour un chemin de routage.
* Une nouvelle classe, `express.Router`, permettant de créer des gestionnaires de routage modulaires pouvant être montés.

<h4 id="app-route">méthode <code>app.route()</code></h4>

La nouvelle méthode `app.route()` vous permet de créer des gestionnaires de routage sous forme de chaîne pour un chemin de routage. Etant donné que le chemin est spécifié à une seul emplacement, la création de routes modulaires est utile car elle réduit la redondance et les erreurs. Pour plus d'informations sur les routes, voir la [documentation `Router()`](/{{ page.lang }}/4x/api.html#router).

Voici quelques exemples de gestionnaires de chemin de chaînage définis à l'aide de la fonction `app.route()`.

<pre>
<code class="language-javascript" translate="no">
app.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });
</code>
</pre>

<h4 id="express-router">classe <code>express.Router</code> </h4>

L'autre fonction qui aide à organiser les routes est une nouvelle classe,
`express.Router`, que vous pouvez utiliser pour créer des gestionnaires de routage modulaires pouvant être
montés. Une instance `Router` est un middleware et un système de routage complet ; pour cette raison, elle est souvent appelée "mini-app".

L'exemple suivant créé une routeur en tant que module, charge un middleware dans celui-ci, définit des routes et monte le module sur un chemin dans l'application principale.

Par exemple, créez un fichier de routage nommé `birds.js` dans le répertoire app, avec le contenu suivant :

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var router = express.Router();

// middleware specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.send('Birds home page');
});
// define the about route
router.get('/about', function(req, res) {
  res.send('About birds');
});

module.exports = router;
</code>
</pre>

Puis, chargez le module de routage dans l'application :

<pre>
<code class="language-javascript" translate="no">
var birds = require('./birds');
...
app.use('/birds', birds);
</code>
</pre>

L'application pourra gérer des demandes dans les chemins `/birds` et
`/birds/about`, et appellera le middleware `timeLog` spécifique à la route.

<h3 id="other-changes">
Autres modifications
</h3>

Le tableau suivant répertorie les autres modifications mineures mais importantes dans Express 4 :

<table class="doctable" border="1">
<tr>
<th>Objet</th>
<th>Description</th>
</tr>
<tr>
<td>Node.js</td>
<td>Express 4 nécessite Node.js 0.10.x ou ultérieur et a abandonné la prise en charge de
Node.js 0.8.x.</td>
</tr>
<tr>
<td markdown="1">
`http.createServer()`
</td>
<td markdown="1">
Le module `http` n'est plus nécessaire, à moins que vous ne l'utilisiez directement (socket.io/SPDY/HTTPS). L'application peut être démarrée à l'aide de la fonction
`app.listen()`.
</td>
</tr>
<tr>
<td markdown="1">
`app.configure()`
</td>
<td markdown="1">
La fonction `app.configure()` a été supprimée.  Utilisez
la fonction `process.env.NODE_ENV` ou
`app.get('env')` pour détecter l'environnement et configurer l'application, le cas échéant.
</td>
</tr>
<tr>
<td markdown="1">
`json spaces`
</td>
<td markdown="1">
La propriété d'application `json spaces` est désactivée par défaut dans Express 4.
</td>
</tr>
<tr>
<td markdown="1">
`req.accepted()`
</td>
<td markdown="1">
Use `req.accepts()`, `req.acceptsEncodings()`,
`req.acceptsCharsets()` et `req.acceptsLanguages()`.
</td>
</tr>
<tr>
<td markdown="1">
`res.location()`
</td>
<td markdown="1">
Ne résout plus les adresses URL relatives.
</td>
</tr>
<tr>
<td markdown="1">
`req.params`
</td>
<td markdown="1">
Anciennement un tableau ; il s'agit dorénavant d'un objet.
</td>
</tr>
<tr>
<td markdown="1">
`res.locals`
</td>
<td markdown="1">
Anciennement une fonction ; il s'agit dorénavant d'un objet.
</td>
</tr>
<tr>
<td markdown="1">
`res.headerSent`
</td>
<td markdown="1">
A été modifié en `res.headersSent`.
</td>
</tr>
<tr>
<td markdown="1">
`app.route`
</td>
<td markdown="1">
Dorénavant disponible comme `app.mountpath`.
</td>
</tr>
<tr>
<td markdown="1">
`res.on('header')`
</td>
<td markdown="1">
Supprimé.
</td>
</tr>
<tr>
<td markdown="1">
`res.charset`
</td>
<td markdown="1">
Supprimé.
</td>
</tr>
<tr>
<td markdown="1">
`res.setHeader('Set-Cookie', val)`
</td>
<td markdown="1">
Cette fonctionnalité se limite désormais à définir la valeur de cookie de base. Utilisez
`res.cookie()` pour plus de fonctionnalités.
</td>
</tr>
</table>

<h2 id="example-migration">Exemple de migration d'application</h2>

Voici un exemple de migration d'une application Express 3 vers Express 4.
Les fichiers qui nous intéressent sont `app.js` et `package.json`.

<h3 id="">
Application de la version 3
</h3>

<h4 id=""><code>app.js</code></h4>

Examinons une application Express v.3 avec le fichier `app.js` suivant :

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.methodOverride());
app.use(express.session({ secret: 'your secret here' }));
app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
</code>
</pre>

<h4 id=""><code>package.json</code></h4>

Voici à quoi ressemble le fichier `package.json` qui accompagne la version 3 :

<pre>
<code class="language-javascript" translate="no">
{
  "name": "application-name",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "3.12.0",
    "pug": "*"
  }
}
</code>
</pre>

<h3 id="">
Processus
</h3>

Commencez le processus de migration en installant le middleware requis pour l'application
Express 4 et en mettant à jour Express et Pug vers leur version la plus récente respective à l'aide de la commande suivante :

```console
$ npm install serve-favicon morgan method-override express-session body-parser multer errorhandler express@latest pug@latest --save
```

Apportez les modifications suivantes à `app.js` :

1. Les fonctions Express Middleware intégrées `express.favicon`,
    `express.logger`, `express.methodOverride`,
    `express.session`, `express.bodyParser` et
    `express.errorHandler` ne sont plus disponibles sur l'objet
    `express`.  Vous devez installer leurs fonctions alternatives
    manuellement et les charger dans l'application.

2. Vous ne devez plus charger la fonction `app.router`.
    Il ne s'agit pas d'un objet d'application Express 4 valide. Supprimez le code
    `app.use(app.router);`.

3. Assurez-vous que les fonctions middleware sont chargées dans l'ordre correct - chargez `errorHandler` après avoir chargé les routes d'application.

<h3 id="">Application de la version 4</h3>

<h4 id=""><code>package.json</code></h4>

Le fait d'exécuter la commande `npm` ci-dessus mettra à jour `package.json` comme suit :

<pre>
<code class="language-javascript" translate="no">
{
  "name": "application-name",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "body-parser": "^1.5.2",
    "errorhandler": "^1.1.1",
    "express": "^4.8.0",
    "express-session": "^1.7.2",
    "pug": "^2.0.0-beta6",
    "method-override": "^2.1.2",
    "morgan": "^1.2.2",
    "multer": "^0.1.3",
    "serve-favicon": "^2.0.1"
  }
}
</code>
</pre>

<h4 id=""><code>app.js</code></h4>

Puis, supprimez le code non valide, chargez les middleware requis et procédez aux autres changements,
le cas échéant. Voici à quoi ressemble le fichier `app.js` :

<pre>
<code class="language-javascript" translate="no">
var http = require('http');
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'uwotm8' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
app.get('/users', user.list);

// error handling middleware should be loaded after the loading the routes
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
</code>
</pre>

<div class="doc-box doc-info" markdown="1">
A mois que vous deviez utiliser le module `http` (socket.io/SPDY/HTTPS) directement, vous n'avez pas à le charger et l'application peut être démarrée comme suit :
<pre>
<code class="language-js" translate="no">app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});</code>
</pre>
</div>

<h3 id="">Exécutez l'application</h3>

Le processus de migration est terminé et l'application est désormais une application
Express 4. Pour confirmer, démarrez l'application en utilisant la commande suivante :

```console
$ node .
```

Chargez [http://localhost:3000](http://localhost:3000)
  et voyez comment la page d'accueil est générée par Express 4.

<h2 id="app-gen">Mise à niveau vers le générateur d'applications Express 4</h2>

L'outil de ligne de commande qui permet de générer une application Express est toujours
  `express`, mais pour effectuer la mise à niveau vers la nouvelle version, vous devez désinstaller
  le générateur d'applications Express 3 puis installer la nouvelle version d'`express-generator`.

<h3 id="">Installation </h3>

Si le générateur d'applications Express 3 est installé sur votre système, vous devez le désinstaller :

```console
$ npm uninstall -g express
```

En fonction de la configuration de vos privilèges de fichier et de répertoire,
vous devrez exécuter cette commande avec `sudo`.A présent, installez le nouveau générateur :

```console
$ npm install -g express-generator
```

En fonction de la configuration de vos privilèges de fichier et de répertoire,
vous devrez exécuter cette commande avec `sudo`.

Désormais, la commande `express` sur votre système est mise à jour vers le générateur Express 4.

<h3 id="">Modifications du générateur d'applications </h3>

Les options et les syntaxe de commande restent généralement identiques, avec les exceptions suivantes :

{: .doclist }
* L'option `--sessions` a été supprimée.
* L'option `--jshtml` a été supprimée.
* L'option `--hogan` a été ajoutée à la prise en charge de [Hogan.js](http://twitter.github.io/hogan.js/).

<h3 id="">Exemple</h3>

Exécutez la commande suivante pour créer une application Express 4 :

```console
$ express app4
```

Si vous examinez le contenu du fichier `app4/app.js`, vous remarquerez que toutes
les fonctions middleware (sauf `express.static`) qui sont requises pour
l'application sont chargées en tant que modules indépendants, et le middleware `router` n'est plus chargé
explicitement dans l'application.

Vous noterez également que le fichier `app.js` est désormais un module Node.js, contrairement à l'application autonome qui a été générée par l'ancien générateur.

Après avoir installé les dépendances, démarrez l'application en utilisant la commande suivante :

```console
$ npm start
```

Si vous examinez le script de démarrage npm dans le fichier `package.json`,
vous remarquerez dorénavant que la commande qui démarre l'application est
`node ./bin/www` alors qu'il s'agissait de `node app.js`
dans Express 3.

Puisque le fichier `app.js` qui a été généré par le générateur Express 4 est
désormais un module Node.js, il ne peut plus être démarré indépendamment en tant qu'application
(sauf si vous modifiez le code). Le module doit être chargé dans un fichier Node.js et démarré
via le fichier Node.js. Dans cet exemple, le fichier Node.js est `./bin/www`.

Ni le répertoire `bin` ni le fichier `www`
sans extension n'est obligatoire pour créer une application Express ou démarrer celle-ci. Ce ne sont ici que des suggestions faites par le générateur, donc n'hésitez pas à les modifier si besoin.

Pour se débarrasser du répertoire `www` et garder la présentation d'Express 3,
supprimez la ligne `module.exports = app;` à la fin du fichier
`app.js`, puis collez le code suivant à la place :

<pre>
<code class="language-javascript" translate="no">
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
</code>
</pre>

Assurez-vous d'avoir chargé le module `debug` en haut du fichier `app.js` à l'aide du code suivant :

<pre>
<code class="language-javascript" translate="no">
var debug = require('debug')('app4');
</code>
</pre>

Ensuite, modifiez `"start": "node ./bin/www"` dans le fichier `package.json` en `"start": "node app.js"`.

Vous avez à présent déplacé la fonctionnalité depuis `./bin/www` de nouveau
dans `app.js`.  Cette modification n'est pas recommandée, mais l'exercice vous aide à comprendre le mode de fonctionnement
du fichier `./bin/www` et la raison pour laquelle le fichier `app.js` ne se lance plus seul.
