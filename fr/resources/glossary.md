---
layout: page
title: Glossaire Express
menu: resources
lang: fr
---

# Glossaire

### application

En général, un ou plusieurs programmes conçus pour réaliser des opérations dans un but précis.  Dans le contexte d'Express, il s'agit d'un programme qui utilise l'API Express s'exécutant sur la plateforme Node.js.  Peut également faire référence à un [objet d'application](/{{ page.lang }}/api.html#express).

### API

Interface de programme d'application.  Développez l'abréviation lorsqu'elle est utilisée pour la première fois.

### demande

Demande HTTP.  Un client soumet un message de demande HTTP à un serveur, qui renvoie une réponse.  La demande doit utiliser une des [méthodes de demande](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods) telles que GET, POST...

### Express

Infrastructure Web minimaliste, souple et rapide pour les applications Node.js.  En général, on préfère utiliser "Express" que "Express.js," bien que ce dernier soit acceptable.

### libuv

Bibliothèque de prise en charge multiplateforme qui se centralise sur les E-S asynchrones, développée principalement pour être utilisée par Node.js.

### middleware

Fonction qui est appelée par la couche de routage Express avant le gestionnaire de demande final, et qui se trouve entre une demande brute et la route finale prévue.  Quelques points subtiles de terminologie autour des middleware :

  * `var foo = require('middleware')` est appelé *demande* ou *utilisation* d'un module Node.js. Ensuite, l'instruction `var mw = foo()`  renvoie généralement le middleware.
  * `app.use(mw)` est appelé *ajout du middleware à la pile de processus global*.
  * `app.get('/foo', mw, function (req, res) { ... })` est appelé *ajout du middleware à la pile de processus "GET /foo"*.

### Node.js

Plateforme logicielle utilisée pour générer des applications réseau évolutives. Node.js utilise JavaScript comme langage de script, et atteint un rendement élevé via une E-S non bloquante et une boucle d'événements à une seule unité d'exécution.  Voir [nodejs.org](http://nodejs.org/). **Note d'utilisation** : En général, "Node.js," "Node" par la suite.

### open-source, open source

Lorsqu'il est utilisé comme adjectif, utilisez la forme avec le trait d'union. Par exemple : "Il s'agit d'un logiciel open-source." Voir [Open-source software sur Wikipedia](http://en.wikipedia.org/wiki/Open-source_software). Remarque : Bien qu'open-source ne soit pas commun, nous utilisons les règles anglaises standard pour unir par un trait d'union un adjectif composé.

### réponse

Réponse HTTP. Un serveur renvoie un message de réponse HTTP au client. La réponse contient des informations relatives à l'état d'achèvement de la demande et peut également contenir le contenu demandé dans le corps du message.

### route

Partie de l'URL qui permet d'identifier une ressource.  Par exemple, dans `http://foo.com/products/id`, "/products/id" est la route.

### routeur

Voir [routeur](/{{ page.lang }}/4x/api.html#router) dans Référence de l'API.
