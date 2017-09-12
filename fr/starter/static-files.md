---
layout: page
title: Servir des fichiers statiques dans Express
menu: démarrage
lang: fr
---

# Servir des fichiers statiques dans Express

Pour servir des fichiers statiques tels que les images, les
fichiers CSS et les fichiers JavaScript, utilisez la fonction de
logiciel intermédiaire intégré `express.static` dans Express.

Passez le nom du répertoire qui contient les actifs
statiques dans la fonction de logiciel intermédiaire
`express.static` afin de commencer à servir
les fichiers directement. Par exemple, utilisez le code suivant pour
servir des images, des fichiers CSS et des fichiers JavaScript dans
un répertoire nommé `public` :

<pre>
<code class="language-javascript" translate="no">
app.use(express.static('public'));
</code>
</pre>

Maintenant, vous pouvez charger les fichiers qui sont dans le
répertoire `public` :

<pre>
<code class="language-javascript" translate="no">
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
</code>
</pre>

<div class="doc-box doc-info">
Express recherche les fichiers relatifs au répertoire statique, donc
le nom du répertoire statique ne fait pas partie de l'URL.
</div>

Pour utiliser plusieurs répertoires statiques actifs,
utilisez la fonction middleware
`express.static` plusieurs fois :

<pre>
<code class="language-javascript" translate="no">
app.use(express.static('public'));
app.use(express.static('files'));
</code>
</pre>

Express recherche les fichiers dans l'ordre dans lequel vous
avez établi les répertoires statiques avec la fonction middleware `express.static`.

Pour créer un préfixe de chemin d'accès virtuel (dans lequel le
chemin d'accès n'existe pas vraiment dans le système de fichiers)
pour les fichiers qui sont servis par la fonction
`express.static`, [indiquez un
chemin de montage](/{{ page.lang }}/4x/api.html#app.use) pour le répertoire statique, comme démontré
ci-dessous :

<pre>
<code class="language-javascript" translate="no">
app.use('/static', express.static('public'));
</code>
</pre>

Maintenant, vous pouvez charger les fichiers qui sont dans le
répertoire `public` à partir du préfixe de chemin
d'accès `/static`.

<pre>
<code class="language-javascript" translate="no">
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
</code>
</pre>

Cependant, le chemin d'accès que vous fournissez à la
fonction `express.static` est en rapport avec
le répertoire à partir duquel vous lancez votre processus `node`. Si
vous exécutez l'application express à partir d'un autre répertoire, il
est plus sûr d'utiliser le chemin d'accès absolu que vous voulez
servir :

<pre>
<code class="language-javascript" translate="no">
app.use('/static', express.static(__dirname + '/public'));
</code>
</pre>
