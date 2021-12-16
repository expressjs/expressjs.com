---
layout: page
title: Installation d'Express
menu: starter
lang: fr
---

# Installation

En supposant que [Node.js](https://nodejs.org/) est déjà installé, créez un répertoire pour héberger votre application et faites-en votre répertoire de travail.

```console
$ mkdir myapp
$ cd myapp
```

Utilisez la commande `npm init` afin de créer un fichier `package.json` pour votre application.
Pour plus d'informations sur le fonctionnement du fichier `package.json`, voir [Specifics of npm's package.json handling](https://docs.npmjs.com/files/package.json).

```console
$ npm init
```

Cette commande vous invite à fournir un certain nombre d'informations, telles que le nom et la version de votre application.
Pour le moment, vous pouvez simplement appuyer sur la touche RETURN pour accepter les valeurs par défaut, à l'exception de ce qui suit :

```console
entry point: (index.js)
```

Entrez `app.js` ou un nom de votre choix pour le fichier principal. Si vous souhaitez que le nom soit `index.js`, appuyez sur la touche RETURN pour accepter le nom de fichier par défaut suggéré.

Installez ensuite Express dans le répertoire `myapp`, puis sauvegardez-le dans la liste des dépendances. Par exemple :

```console
$ npm install express --save
```

Pour installer Express de façon temporaire et ne pas l'ajouter à la liste des dépendances, omettez l'option `--save` :

```console
$ npm install express
```

<div class="doc-box doc-info" markdown="1">
Les modules Node.js installés à l'aide de l'option `--save` sont ajoutés à la liste des dépendances `dependencies`, dans le fichier `package.json`.
Par défaut, depuis la version 5.0, `npm install <package-name>` ajoute automatiquement le module Node.js à la liste des dépendances.
Par la suite, l'exécution de `npm install` dans le répertoire de l'application installera automatiquement les modules présents dans la liste des dépendances.
</div>
