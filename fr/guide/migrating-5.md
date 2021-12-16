---
layout: page
title: Migration vers Express 5
menu: guide
lang: fr
---

# Migration vers Express 5

<h2 id="overview">Présentation</h2>

Express 5.0 est encore au stade d'édition alpha mais voici un
aperçu des modifications qui figureront dans l'édition et la procédure
de migration de l'application Express 4 vers Express 5.

Express 5 n'est pas très différent d'Express 4 : les
modifications apportées à l'API ne sont pas aussi importantes qu'entre
les versions 3.0 et 4.0.
Bien que l'API de base reste identique, des modifications radicales ont été apportées ; en d'autres termes, un programme Express 4 risque de ne pas fonctionner si
vous le mettez à jour pour utiliser Express 5.

Pour installer la dernière version alpha et pour
prévisualiser Express 5, entrez la commande suivante dans le
répertoire principal de l'application :

```console
$ npm install express@5.0.0-alpha.2 --save
```

Vous pouvez alors exécuter les tests automatisés pour voir les
échecs et corriger les problèmes en fonction des mises à jour
répertoriées ci-dessous. Après avoir traité les échecs de test,
exécutez votre application pour détecter les erreurs qui se
produisent. Vous saurez tout de suite si l'application utilise des
méthodes ou des propriétés.

<h2 id="changes">Modifications dans Express 5</h2>

Voici la liste des modifications (par rapport à l'édition alpha
2) qui vous concerneront en tant qu'utilisateur d'Express.
Consultez la
[demande d'extraction](https://github.com/expressjs/express/pull/2237)
pour une liste de toutes les fonctions planifiées.

**Méthodes et propriétés supprimées**

<ul class="doclist">
  <li><a href="#app.del">app.del()</a></li>
  <li><a href="#app.param">app.param(fn)</a></li>
  <li><a href="#plural">Noms de méthodes au pluriel</a></li>
  <li><a href="#leading">Signe deux-points de tête dans l'argument du
nom pour app.param(name, fn)</a></li>
  <li><a href="#req.param">req.param(name)</a></li>
  <li><a href="#res.json">res.json(obj, status)</a></li>
  <li><a href="#res.jsonp">res.jsonp(obj, status)</a></li>
  <li><a href="#res.send.body">res.send(body, status)</a></li>
  <li><a href="#res.send.status">res.send(status)</a></li>
  <li><a href="#res.sendfile">res.sendfile()</a></li>
</ul>

**Modifié**

<ul class="doclist">
  <li><a href="#app.router">app.router</a></li>
  <li><a href="#req.host">req.host</a></li>
  <li><a href="#req.query">req.query</a></li>
</ul>

**Améliorations**

<ul class="doclist">
  <li><a href="#res.render">res.render()</a></li>
</ul>

<h3>Méthodes et propriétés supprimées</h3>

Si vous utilisez une de ces méthodes ou propriétés dans votre
application, elle tombera en panne. Vous devrez donc modifier votre
application après la mise à jour vers la version 5.

<h4 id="app.del">app.del()</h4>

Express 5 ne prend plus en charge la fonction
`app.del()`. Si vous utilisez cette fonction, une
erreur est émise. Pour enregistrer des routes HTTP DELETE, utilisez la fonction
`app.delete()` à la place.

Initialement, `del` était utilisé au lieu de
`delete` car `delete` est un mot
clé réservé dans JavaScript. Cependant, à partir d'ECMAScript 6,
`delete` et les autres mots clés réservés peuvent
être utilisés en toute légalité comme noms de propriété. Vous pouvez lire la
discussion qui a donné lieu à l'obsolescence de la fonction
`app.del` ici.

<h4 id="app.param">app.param(fn)</h4>

La signature `app.param(fn)` servait à
modifier le comportement de la fonction
`app.param(name, fn)`. Elle est obsolète depuis la
version 4.11.0 et Express 5 ne la prend plus en charge.

<h4 id="plural">Noms de méthodes au pluriel</h4>

Les noms de méthode suivants ont été mis au pluriel. Dans Express 4, l'utilisation des anciennes méthodes ont généré un avertissement
d'obsolescence. Express 5 ne les prend plus du tout en charge :

`req.acceptsCharset()` est remplacé par
`req.acceptsCharsets()`.

`req.acceptsEncoding()` est remplacé par
`req.acceptsEncodings()`.

`req.acceptsLanguage()` est remplacé par
`req.acceptsLanguages()`.

<h4 id="leading">Signe deux-points (:) de tête dans le nom de la
fonction app.param(name, fn)</h4>

Le signe deux-points (:) de tête dans le nom de la fonction
`app.param(name, fn)` est une subsistance d'Express 3 et, pour des raisons de
compatibilité avec les versions antérieures, Express 4 la prenait en
charge avec un avis sur l'obsolescence. Express 5 l'ignore
automatiquement et utilise le paramètre de nom sans le préfixer d'un
signe deux-points.

Cela n'affectera normalement pas votre code si vous lisez la documentation Express 4
d'[app.param](/{{ page.lang }}/4x/api.html#app.param) car cela ne mentionne pas le signe deux-points de tête.

<h4 id="req.param">req.param(name)</h4>

Cette méthode potentiellement déroutante et dangereuse
d'extraction des données de formulaire a été supprimée. Vous devrez
désormais rechercher spécifiquement le nom du paramètre soumis dans
l'objet `req.params`, `req.body` ou `req.query`.

<h4 id="res.json">res.json(obj, status)</h4>

Express 5 ne prend plus en charge la signature
`res.json(obj, status)`. A la place, définissez le
statut et enchaînez-le à la méthode
`res.json()` comme suit :
`res.status(status).json(obj)`.

<h4 id="res.jsonp">res.jsonp(obj, status)</h4>

Express 5 ne prend plus en charge la signature
`res.jsonp(obj, status)`. A la place, définissez le
statut et enchaînez-le à la méthode `res.jsonp()`
comme suit : `res.status(status).jsonp(obj)`.

<h4 id="res.send.body">res.send(body, status)</h4>

Express 5 ne prend plus en charge la signature
`res.send(obj, status)`. A la place, définissez le
statut et enchaînez-le à la méthode `res.send()`
comme suit : `res.status(status).send(obj)`.

<h4 id="res.send.status">res.send(status)</h4>

Express 5 ne prend plus en charge la signature
<code>res.send(<em>statut</em>)</code>, où *`statut`*
est un nombre. A la place, utilisez la fonction
`res.sendStatus(statusCode)`
qui définit le code de statut de l'en-tête de réponse HTTP et envoie
la version texte du code: "Not Found", "Internal Server Error", etc.
Si vous devez envoyer un nombre à l'aide de la fonction `res.send()`,
mettez ce nombre entre guillemets pour qu'Express ne l'interprète pas
comme une tentative d'utilisation de l'ancienne signature non prise en charge.

<h4 id="res.sendfile">res.sendfile()</h4>

La fonction `res.sendfile()` a été remplacée
par une
version CamelCase `res.sendFile()` dans Express 5.

<h3>Modifié</h3>

<h4 id="app.router">app.router</h4>

L'objet `app.router`, qui a été supprimé dans Express 4, est revenu dans Express 5. Dans la version, cet objet
n'est qu'une référence dans le routeur Express de base, contrairement à Express 3, où une application devait le charger explicitement.

<h4 id="req.host">req.host</h4>

Dans Express 4, la `req.host` retirait de
manière incorrecte le numéro de port s'il était présent. Dans Express 5, ce numéro de port est conservé.

<h4 id="req.query">req.query</h4>

Dans Express 4.7 et à partir d'Express 5, l'option
d'analyseur de requêtes peut accepter `false` pour
désactiver l'analyse syntaxique de chaîne de requête lorsque vous
souhaitez utiliser votre propre fonction pour la logique d'analyse
syntaxique de chaîne de requête.

<h3>Améliorations</h3>

<h4 id="res.render">res.render()</h4>

Cette méthode impose désormais un comportement asynchrone pour
tous les moteurs de vue. Cela évite les bogues générés par les
moteurs de vue qui avaient une implémentation synchrone et qui
ne prenaient pas en compte l'interface recommandée.
