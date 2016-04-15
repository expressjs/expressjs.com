---
layout: page
title: Ecriture de middleware utilisable dans les applications Express
menu: guide
lang: fr
---

# Ecriture de middleware utilisable dans les applications Express

<h2>Présentation</h2>

Les fonctions de *middleware* sont des fonctions qui peuvent accéder à l'[objet Request](/{{ page.lang }}/4x/api.html#req)  (`req`), l'[objet response](/{{ page.lang }}/4x/api.html#res) (`res`) et à la fonction middleware suivant dans le cycle demande-réponse de l'application. La fonction middleware suivant est couramment désignée par une variable nommée `next`.

Les fonctions middleware effectuent les tâches suivantes :

* Exécuter tout type de code.
* Apporter des modifications aux objets de demande et de réponse.
* Terminer le cycle de demande-réponse.
* Appeler le middleware suivant dans la pile.

Si la fonction middleware en cours ne termine pas le cycle de demande-réponse, elle doit appeler la fonction `next()` pour transmettre le contrôle à la fonction middleware suivant. Sinon, la demande restera bloquée.

L'exemple suivant montre les éléments d'un appel de fonction middleware:

<table style="padding: 0; border: 0; width: 960px; margin-bottom: 10px;">
<tr><td style="margin: 0; padding: 0px; border: 0; width: 410px;">
<img src="/images/express-mw.png" style="margin: 0px; padding: 0px; width: 410px; height: 308px;" />
</td>
<td style="margin: 0; padding: 0 0 0 5px; border: 0; width: 550px;">
<div class="callout" id="callout1">Méthode HTTP à laquelle la fonction middleware s'applique.</div>

<div class="callout" id="callout2">Chemin (route) auquel la fonction middleware s'applique.</div>

<div class="callout" id="callout3">Fonction de middleware.</div>

<div class="callout" id="callout4">Argument de rappel à la fonction middleware, appelée "next" par convention.</div>

<div class="callout" id="callout5">Argument de <a href="../4x/api.html#res">réponse</a> HTTP à la fonction middleware, appelé "res" par convention.</div>

<div class="callout" id="callout6">Argument de <a href="../4x/api.html#req">demande</a> HTTP à la fonction middleware, appelé "req" par convention.</div>
</td></tr>
</table>

<!--
<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var app = express();
app.get('/', function(req, res, next) {
	next();
});
</code>
</pre>

* <code>app.get</code>: Méthode HTTP à laquelle la fonction middleware s'applique.

* <code>'/'</code>: Chemin (route) auquel la fonction middleware s'applique.

* <code>function</code>: Fonction de middleware.

* <code>req</code>: Argument de <a href="../4x/api.html#req">demande</a> HTTP à la fonction middleware, appelé "req" par convention.

* <code>res</code>: Argument de <a href="../4x/api.html#res">réponse</a> HTTP à la fonction middleware, appelé "res" par convention.

* <code>next</code>: Argument de rappel à la fonction middleware, appelée "next" par convention.
-->

Voici un exemple d'une application Express "Hello World" simple, pour laquelle vous allez définir deux fonctions middleware :

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000);
</code>
</pre>

<h2>Développement</h2>

Voici un exemple simple de fonction middleware appelée "myLogger". Cette fonction imprime simplement "LOGGED" lorsqu'une demande traverse l'application. La fonction middleware est affectée à une variable nommée `myLogger`.

<pre>
<code class="language-javascript" translate="no">
var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};
</code>
</pre>

<div class="doc-box doc-notice" markdown="1">
Notez l'appel ci-dessus de la fonction `next()`,  qui appelle la fonction middleware suivant dans l'application. La fonction `next()` ne fait pas partie du Node.js ou de l'API Express, mais c'est le troisième argument qui est transmis à la fonction middleware.  La fonction `next()` peut porter n'importe quel nom, mais par convention elle est toujours appelée "next". Pour éviter toute confusion, il est préférable de respecter cette convention.
</div>

Pour charger la fonction middleware, appelez `app.use()` en spécifiant la fonction middleware.
Par exemple, le code suivant charge la fonction middleware `myLogger` avant la route au chemin racine (/).

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var app = express();

var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

app.use(myLogger);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000);
</code>
</pre>

Chaque fois que l'application reçoit une demande, elle imprime le message "LOGGED" sur le terminal.

L'ordre de chargement des middleware est important : les fonctions middleware chargées en premier sont également exécutées en premier.

Si `myLogger` est chargé après la route au chemin racine, la demande ne l'atteindra jamais et l'application n'imprimera pas "LOGGED", car le gestionnaire de route du chemin racine interrompra le cycle de demande-réponse.

La fonction middleware `myLogger` imprime simplement un message, puis traite la demande à la fonction middleware suivant dans la pile en appelant la fonction `next()`.

L'exemple suivant ajoute une propriété appelée `requestTime` à l'objet Request. Nous nommerons cette fonction middleware "requestTime".

<pre>
<code class="language-javascript" translate="no">
var requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};
</code>
</pre>

L'application utilise désormais la fonction middleware `requestTime`. De plus, la fonction callback de la route du chemin racine utilise la propriété que la fonction middleware ajoute à `req` (l'objet Request).

<pre>
<code class="language-javascript" translate="no">
var express = require('express');
var app = express();

var requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

app.use(requestTime);

app.get('/', function (req, res) {
  var responseText = 'Hello World!<br>';
  responseText += '<small>Requested at: ' + req.requestTime + '</small>';
  res.send(responseText);
});

app.listen(3000);
</code>
</pre>

Si vous effectuez une demande à la racine de l'application, cette dernière affiche maintenant l'horodatage de la demande dans le navigateur.

Puisque vous avez accès à l'objet Request, à l'objet Response, à la fonction middleware suivant dans la pile et à l'API Node.js complète, le champ des possibles avec les fonctions middleware est infini.

Pour plus d'informations sur les middleware Express, voir [Utilisation de middleware Express](/{{ page.lang }}/guide/using-middleware.html).
