---
layout: page
title: Routage de base Express
menu: starter
lang: fr
---

# Routage de base

*Routage* fait référence à la détermination de la façon dont une application répond à un 
nœud final spécifique, c'est-à-dire un URI (ou chemin) et une méthode de requête HTTP (GET, POST, etc.).

Chaque route peut avoir une ou plusieurs fonctions de gestionnaire, qui sont exécutées lorsque la route est mise en correspondance.

La définition de la route utilise la structure suivante :
<pre>
<code class="language-javascript" translate="no">
app.METHOD(PATH, HANDLER)
</code>
</pre>

Où :

- `app` est une instance d'`express`.
- `METHOD` est une [méthode de demande HTTP](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol).
- `PATH` est un chemin sur le serveur.
- `HANDLER` est la fonction exécutée lorsque la route est mise en correspondance.

<div class="doc-box doc-notice" markdown="1">
Ce tutoriel suppose qu'une instance d'`express` appelée `app` soit créée et que le serveur soit en cours d'exécution.
Si vous ne savez pas créer et démarrer une application, reportez-vous à l'[exemple Hello world](/{{ page.lang }}/starter/hello-world.html).
</div>

Les exemples suivants illustrent la définition de routes simples.

Réponse `Hello World!` sur la page d'accueil :

<pre>
<code class="language-javascript" translate="no">
app.get('/', function (req, res) {
  res.send('Hello World!');
});
</code>
</pre>

Réponse à une demande POST sur la route racine (`/`), sur la page d'accueil de l'application :

<pre>
<code class="language-javascript" translate="no">
app.post('/', function (req, res) {
  res.send('Got a POST request');
});
</code>
</pre>

Réponse à une demande PUT sur la route `/user` :

<pre>
<code class="language-javascript" translate="no">
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});
</code>
</pre>

Réponse à une demande DELETE sur la route `/user` :

<pre>
<code class="language-javascript" translate="no">
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});
</code>
</pre>

Pour plus de détails sur le routage, reportez-vous au [guide de routage](/{{ page.lang }}/guide/routing.html).
