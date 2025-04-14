---
layout: page
title: Servir des fichiers statiques dans Express
description: Understand how to serve static files like images, CSS, and JavaScript in Express.js applications using the built-in 'static' middleware.
menu: démarrage
lang: fr
redirect_from: /starter/static-files.html
---

# Servir des fichiers statiques dans Express

Pour servir des fichiers statiques tels que les images, les
fichiers CSS et les fichiers JavaScript, utilisez la fonction de
logiciel intermédiaire intégré `express.static` dans Express.

The function signature is:

```js
express.static(root, [options])
```

The `root` argument specifies the root directory from which to serve static assets.
For more information on the `options` argument, see [express.static](/{{page.lang}}/4x/api.html#express.static).

Par exemple, utilisez le code suivant pour
servir des images, des fichiers CSS et des fichiers JavaScript dans
un répertoire nommé `public` :

```js
app.use(express.static('public'))
```

Maintenant, vous pouvez charger les fichiers qui sont dans le
répertoire `public` :

```text
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
```

<div class="doc-box doc-info">
Express recherche les fichiers relatifs au répertoire statique, donc
le nom du répertoire statique ne fait pas partie de l'URL.
</div>

Pour utiliser plusieurs répertoires statiques actifs,
utilisez la fonction middleware
`express.static` plusieurs fois :

```js
app.use(express.static('public'))
app.use(express.static('files'))
```

Express recherche les fichiers dans l'ordre dans lequel vous
avez établi les répertoires statiques avec la fonction middleware `express.static`.

{% capture alert_content %}
For best results, [use a reverse proxy](/{{page.lang}}/advanced/best-practice-performance.html#use-a-reverse-proxy) cache to improve performance of serving static assets.
{% endcapture %}
{% include admonitions/note.html content=alert_content %}

Pour créer un préfixe de chemin d'accès virtuel (dans lequel le
chemin d'accès n'existe pas vraiment dans le système de fichiers)
pour les fichiers qui sont servis par la fonction
`express.static`, [indiquez un
chemin de montage](/{{ page.lang }}/4x/api.html#app.use) pour le répertoire statique, comme démontré
ci-dessous :

```js
app.use('/static', express.static('public'))
```

Maintenant, vous pouvez charger les fichiers qui sont dans le
répertoire `public` à partir du préfixe de chemin
d'accès `/static`.

```text
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
```

Cependant, le chemin d'accès que vous fournissez à la
fonction `express.static` est en rapport avec
le répertoire à partir duquel vous lancez votre processus `node`. Si
vous exécutez l'application express à partir d'un autre répertoire, il
est plus sûr d'utiliser le chemin d'accès absolu que vous voulez
servir :

```js
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))
```

For more details about the `serve-static` function and its options, see  [serve-static](/resources/middleware/serve-static.html).

### [Previous: Basic Routing ](/{{ page.lang }}/starter/basic-routing.html)&nbsp;&nbsp;&nbsp;&nbsp;[Next: More examples ](/{{ page.lang }}/starter/examples.html)
