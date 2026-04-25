---
title: 'Meilleures pratiques de production : performance et fiabilité'
description: Découvrez les meilleures pratiques de performance et de fiabilité pour les applications Express en production, couvrant les optimisations de code et les configurations d'environnement pour des performances optimales.
---

Cet article traite des meilleures pratiques de performance et de fiabilité pour les applications Express déployées en production.

Ce sujet tombe clairement dans le monde des « dévalises », englobant tant le développement traditionnel que les opérations. En conséquence, l'information est divisée en deux parties :

- Les choses à faire dans votre code (la partie développeur) :
  - [Utiliser la compression gzip](#use-gzip-compression)
  - [Ne pas utiliser de fonctions synchrones](#dont-use-synchronous-functions)
  - [Faire la journalisation correctement](#do-logging-correctly)
  - [Gérer les exceptions correctement] (#handle-exceptions-properly)
- Choses à faire dans votre environnement / configuration (partie Ops) :
  - [Définir NODE_ENV comme "production"](#set-node_env-to-production)
  - (#ensure-your-app-automatically-restarts)
  - [Exécuter votre application dans un cluster](#run-your-app-in-a-cluster)
  - (#cache-request-results)
  - [Utiliser un répartiteur de charge](#use-a-load-balancer)
  - [Utiliser un proxy inverse](#use-a-reverse-proxy)

## Les choses à faire dans votre code

Voici quelques choses que vous pouvez faire dans votre code pour améliorer les performances de votre application :

- [Utiliser la compression gzip](#use-gzip-compression)
- [Ne pas utiliser de fonctions synchrones](#dont-use-synchronous-functions)
- [Faire la journalisation correctement](#do-logging-correctly)
- [Gérer les exceptions correctement] (#handle-exceptions-properly)

### Utiliser la compression gzip

La compression Gzip peut réduire considérablement la taille du corps de réponse et ainsi augmenter la vitesse d'une application web. Utilisez le middleware [compression](https://www.npmjs.com/package/compression) pour la compression gzip dans votre application Express. Par exemple :

```js
const compression = require('compression');
const express = require('express');
const app = express();

app.use(compression());
```

Pour un site internet à fort trafic en production, la meilleure façon de mettre en place une compression est de l'implémenter à un niveau de proxy inverse (voir [Utiliser un proxy inverse](#use-a-reverse-proxy)). Dans ce cas, vous n'avez pas besoin d'utiliser le middleware de compression. Pour plus de détails sur l'activation de la compression gzip dans Nginx, voir [Module ngx_http_gzip_module](http://nginx.org/en/docs/http/ngx_http_gzip_module) dans la documentation Nginx.

### Ne pas utiliser les fonctions synchrones

Les fonctions et méthodes synchrones lient le processus d'exécution jusqu'à ce qu'elles soient retournées. Un seul appel à une fonction synchrone peut retourner en quelques microsecondes ou millisecondes, Cependant, dans les sites Web à fort trafic, ces appels s'ajoutent et réduisent les performances de l'application. Évitez leur utilisation en production.

Bien que Node et de nombreux modules fournissent des versions synchrones et asynchrones de leurs fonctions, utilisez toujours la version asynchrone en production. Le seul moment où une fonction synchrone peut être justifiée est au démarrage initial.

Vous pouvez utiliser le flag en ligne de commande `--trace-sync-io` pour afficher une alerte et une trace de pile chaque fois que votre application utilise une API synchrone. Bien sûr, vous ne voudriez pas utiliser cela en production, mais plutôt vous assurer que votre code est prêt pour la production. Voir la [documentation des options de la ligne de commande node](https://nodejs.org/api/cli#cli_trace_sync_io) pour plus d'informations.

### Faire la journalisation correctement

En général, il y a deux raisons de se connecter depuis votre application : pour le débogage et pour l'activité des applications de journalisation (essentiellement tout le reste). Utiliser `console.log()` ou `console.error()` pour imprimer les messages de log vers le terminal est pratique courante dans le développement. Mais [ces fonctions sont synchronisées] (https://nodejs.org/api/console#console) lorsque la destination est un terminal ou un fichier, elles ne sont donc pas adaptées à la production, à moins que vous ne conduisiez la sortie vers un autre programme.

#### Pour le débogage

Si vous êtes connecté à des fins de débogage, alors au lieu d'utiliser `console.log()`, utilisez un module de débogage spécial comme [debug](https://www.npmjs.com/package/debug). Ce module vous permet d'utiliser la variable d'environnement DEBUG pour contrôler quels messages de débogage sont envoyés à `console.error()`, le cas échéant. Pour garder votre application purement asynchrone, vous vouliez toujours canaliser `console.error()` vers un autre programme. Mais alors, vous n'allez pas vraiment déboguer en production, n'est-ce pas?

#### Pour l'activité de l'application

Si vous connectez l'activité de l'application (par exemple, suivre le trafic ou les appels API), au lieu d'utiliser la « console ». og()\`, utilise une bibliothèque de log comme [Pino](https://www.npmjs.com/package/pino), qui est l'option la plus rapide et la plus efficace disponible.

### Gérer correctement les exceptions

Les applications de nœud plantent lorsqu'elles rencontrent une exception non prise. Ne pas gérer les exceptions et prendre les actions appropriées fera planter votre application Express et se déconnectera. Si vous suivez les conseils de [Assurez-vous que votre application redémarre automatiquement] (#ensure-your-app-automatically-restarts) ci-dessous, votre application se remettra d'un crash. Heureusement, les applications Express ont généralement un temps de démarrage court. Néanmoins, vous voulez éviter de planter en premier lieu, et pour ce faire, vous devez gérer les exceptions correctement.

Pour vous assurer de gérer toutes les exceptions, utilisez les techniques suivantes :

- [Utiliser try-catch](#use-try-catch)
- [Utiliser des promesses](#use-promises)

Avant de plonger dans ces sujets, vous devriez avoir une compréhension de base de la gestion des erreurs Node/Express : utiliser les premiers callbacks d'erreurs et propager les erreurs dans les middleware. Le noeud utilise une convention "error-first callback" pour retourner des erreurs à partir de fonctions asynchrones, où le premier paramètre de la fonction callback est l'objet erreur, suivi par les données de résultat dans les paramètres successifs. Pour indiquer aucune erreur, passez null comme premier paramètre. La fonction callback doit suivre la première convention de callback pour gérer l'erreur de manière significative. Et dans Express, la meilleure pratique est d'utiliser la fonction next() pour propager les erreurs à travers la chaîne du middleware.

Pour en savoir plus sur les fondamentaux de la gestion des erreurs, voir :

- [Gestion des erreurs dans Node.js](https://www.tritondatacenter.com/node-js/production/design/errors)

#### Utiliser try-catch

Try-catch est un langage JavaScript que vous pouvez utiliser pour attraper des exceptions dans le code synchrone. Utilisez try-catch, par exemple, pour gérer les erreurs d'analyse JSON comme indiqué ci-dessous.

Voici un exemple d'utilisation de try-catch pour gérer une éventuelle exception plantant le processus.
Cette fonction du middleware accepte un paramètre de champ de requête nommé "params" qui est un objet JSON.

```js
app.get('/search', (req, res) => {
  // Simulating async operation
  setImmediate(() => {
    const jsonStr = req.query.params;
    try {
      const jsonObj = JSON.parse(jsonStr);
      res.send('Success');
    } catch (e) {
      res.status(400).send('Invalid JSON string');
    }
  });
});
```

Cependant, essayer-catch ne fonctionne que pour du code synchrone. Parce que la plate-forme Node est principalement asynchrone (particulièrement dans un environnement de production), les captures d'essai ne prendront pas beaucoup d'exceptions.

#### Utiliser les promesses

Lorsqu'une erreur est levée dans une fonction `async` ou qu'une promesse rejetée est attendue à l'intérieur d'une fonction `async`, ces erreurs seront passées au gestionnaire d'erreurs comme si elle appelait `next(err)`

```js
app.get('/', async (req, res, next) => {
  const data = await userData(); // If this promise fails, it will automatically call `next(err)` to handle the error.

  res.send(data);
});

app.use((err, req, res, next) => {
  res.status(err.status ?? 500).send({ error: err.message });
});
```

De plus, vous pouvez utiliser des fonctions asynchrones pour votre middleware, et le routeur gérera des erreurs si la promesse échoue, par exemple :

```js
app.use(async (req, res, next) => {
  req.locals.user = await getUser(req);

  next(); // This will be called if the promise does not throw an error.
});
```

La meilleure pratique est de gérer les erreurs le plus près possible du site. Donc, tant que ceci est maintenant géré dans le routeur, Il est préférable d’attraper l’erreur dans le middleware et de la manipuler sans s’appuyer sur un middleware séparé.

#### Ce qu'il ne faut pas faire

Une chose que vous ne devriez pas _faire_ est d'écouter l'évènement `uncatghtException` émise lorsqu'une exception bulle tout le retour à la boucle d'événement. Ajouter un event listener pour `uncatghtException` changera le comportement par défaut du processus qui rencontre une exception ; le processus continuera à fonctionner malgré l'exception. Cela peut sembler un bon moyen d'empêcher votre application de planter, mais continuer à exécuter l'application après une exception non capturée est une pratique dangereuse et n'est pas recommandé, parce que l'état du processus devient peu fiable et imprévisible.

De plus, l'utilisation de `uncaughtException` est officiellement reconnue comme [crude](https://nodejs.org/api/process#process_event_uncaughtexception). Donc l'écoute de `uncatghtException` est juste une mauvaise idée. C'est pourquoi nous recommandons des choses comme des processus multiples et des superviseurs : plantage et redémarrage est souvent le moyen le plus fiable de se remettre d'une erreur.

Nous ne recommandons pas non plus d'utiliser [domains](https://nodejs.org/api/domain). Il ne résout généralement pas le problème et est un module obsolète.

## Choses à faire dans votre environnement / configuration

Voici quelques choses que vous pouvez faire dans votre environnement système pour améliorer les performances de votre application :

- [Définir NODE_ENV comme "production"](#set-node_env-to-production)
- (#ensure-your-app-automatically-restarts)
- [Exécuter votre application dans un cluster](#run-your-app-in-a-cluster)
- (#cache-request-results)
- [Utiliser un répartiteur de charge](#use-a-load-balancer)
- [Utiliser un proxy inverse](#use-a-reverse-proxy)

### Définir NODE_ENV à "production"

La variable d'environnement NODE_ENV spécifie l'environnement dans lequel une application est en cours d'exécution (généralement, développement ou production). L'une des choses les plus simples que vous pouvez faire pour améliorer les performances est de définir NODE_ENV à `production`.

Définir NODE_ENV sur "production" rend Express:

- Modèles d'affichage du cache.
- Cache les fichiers CSS générés à partir des extensions CSS.
- Générer des messages d'erreur moins verbeux.

[Les tests indiquent](https://www.dynatrace.com/news/blog/the-drastic-effects-of-omitting-node-env-in-your-express-js-applications/) que cela peut améliorer les performances de l'application par un facteur de trois !

Si vous avez besoin d'écrire du code spécifique à l'environnement, vous pouvez vérifier la valeur de NODE_ENV avec `process.env.NODE_ENV`. Sachez que la vérification de la valeur d'une variable d'environnement entraîne une pénalité de performance, et qu'elle devrait donc être faite avec modération.

En développement, vous définissez généralement des variables d'environnement dans votre shell interactif, par exemple en utilisant `export` ou votre fichier `.bash_profile`. Mais en général, vous ne devriez pas le faire sur un serveur de production ; au lieu de cela, utilisez le système d'initialisation de votre système d'exploitation (système). La section suivante fournit plus de détails sur l'utilisation de votre système d'initialisation en général, mais le paramètre `NODE_ENV` est si important pour les performances (et facile à faire), qu'il est mis en évidence ici.

Avec le système, utilisez la directive `Environnement` dans votre fichier unitaire. Par exemple :

```sh

Environment=NODE_ENV=production
```

Pour plus d'informations, voir [Utilisation des variables d'environnement dans les unités systémiques](https://www.flatcar.org/docs/latest/setup/systemd/environment-variables/).

### Assurez-vous que votre application redémarre automatiquement

En production, vous ne voulez pas que votre application soit déconnectée, jamais. Cela signifie que vous devez vous assurer qu'il redémarre à la fois si l'application plante et si le serveur lui-même plante. Bien que vous espériez qu'aucun de ces événements ne se produise, réalistement, vous devez rendre compte des deux éventualités par:

- Utiliser un gestionnaire de processus pour redémarrer l'application (et Node) quand il plante.
- Utiliser le système d'initialisation fourni par votre système d'exploitation pour redémarrer le gestionnaire de processus lorsque le système d'exploitation plante. Il est également possible d'utiliser le système d'initialisation sans gestionnaire de processus.

Les applications de nœud plantent si elles rencontrent une exception non prise. La première chose à faire est de s'assurer que votre application est bien testée et gère toutes les exceptions (voir [gérer les exceptions correctement](#handle-exceptions-properly) pour plus de détails). Mais en tant que sécurité pour les échecs, mettez en place un mécanisme pour vous assurer que si et quand votre application se bloque, elle redémarrera automatiquement.

#### Utiliser un gestionnaire de processus

En cours de développement, vous avez démarré votre application simplement à partir de la ligne de commande avec `node server.js` ou quelque chose de similaire. Mais faire cela dans la production est une recette de désastre. Si l'application plante, elle sera hors ligne jusqu'à ce que vous la redémarrez. Pour s'assurer que votre application redémarre si elle plante, utilisez un gestionnaire de processus. Un gestionnaire de processus est un "conteneur" pour les applications qui facilitent le déploiement, fournissent une disponibilité élevée et vous permettent de gérer l'application à l'exécution.

En plus de redémarrer votre application en cas de plantage, un gestionnaire de processus peut vous permettre de :

- Obtenez un aperçu de la performance de l’exécution et de la consommation des ressources.
- Modifiez les paramètres de façon dynamique pour améliorer les performances.
- Contrôle de la grappe (pm2).

Historiquement, il était populaire d'utiliser un gestionnaire de processus Node.js comme [PM2](https://github.com/Unitech/pm2). Consultez leur documentation si vous le souhaitez. Cependant, nous vous recommandons d'utiliser votre système d'initialisation pour la gestion des processus.

#### Utiliser un système d'initialisation

La prochaine étape de la fiabilité est de s'assurer que votre application redémarre lorsque le serveur redémarre. Les systèmes peuvent encore diminuer pour diverses raisons. Pour vous assurer que votre application redémarre si le serveur plante, utilisez le système d'initialisation intégré à votre système d'exploitation. Le système d'initialisation principal utilisé aujourd'hui est [systemd](https://wiki.debian.org/systemd).

Il y a deux façons d'utiliser les systèmes d'initialisation avec votre application Express :

- Exécutez votre application dans un gestionnaire de processus et installez le gestionnaire de processus en tant que service avec le système d'initialisation. Le gestionnaire de processus redémarrera votre application lorsque l'application se bloque, et le système d'initialisation redémarrera le gestionnaire de processus lorsque le système d'exploitation redémarrera. C'est l'approche recommandée.
- Exécutez votre application (et Node) directement avec le système d'initialisation. C'est un peu plus simple, mais vous n'aurez pas les avantages supplémentaires d'utiliser un gestionnaire de processus.

##### Systemd

Systemd est un gestionnaire de systèmes et de services Linux. La plupart des grandes distributions Linux ont adopté le système comme système d'initialisation par défaut.

Un fichier de configuration du service système est appelé un fichier _unit avec un nom de fichier se terminant par `.service`. Voici un exemple de fichier d'unité pour gérer une application Node directement. Remplacez les valeurs placées en `<angle brackets>` pour votre système et votre application:

```sh
[Unit]
Description=<Awesome Express App>

[Service]
Type=simple
ExecStart=/usr/local/bin/node </projects/myapp/index.js>
WorkingDirectory=</projects/myapp>

User=nobody
Group=nogroup


Environment=NODE_ENV=production


LimitNOFILE=infinity


LimitCORE=infinity

StandardInput=null
StandardOutput=syslog
StandardError=syslog
Restart=always

[Install]
WantedBy=multi-user.target
```

Pour plus d'informations sur le système, voir [systemd reference (man page)] (http://www.freedesktop.org/software/systemd/man/systemd.unit).

### Exécutez votre application dans un cluster

Dans un système multi-cœurs, vous pouvez augmenter les performances d'une application Node de plusieurs fois en lançant un cluster de processus. Un cluster exécute plusieurs instances de l'application, idéalement une instance sur chaque noyau de processeur, distribuant ainsi la charge et les tâches entre les instances.

![Balancing between application instances using the cluster API](/images/clustering.png)

IMPORTANT: Puisque les instances de l'application s'exécutent sous forme de processus séparés, elles ne partagent pas le même espace mémoire. C'est-à-dire que les objets sont locaux à chaque instance de l'application. Par conséquent, vous ne pouvez pas maintenir l'état dans le code de l'application. Cependant, vous pouvez utiliser un datastore en mémoire comme [Redis](http://redis.io/) pour stocker des données et des états liés à la session. Cette mise en garde s'applique essentiellement à toutes les formes de mise à l'échelle horizontale, qu'il s'agisse de regroupement avec de multiples processus ou de multiples serveurs physiques.

Dans les applications groupées, les processus de travail peuvent planter individuellement sans affecter le reste des processus. Mis à part les avantages des performances, l'isolement des défaillances est une autre raison de lancer un cluster de processus applicatifs. À chaque fois qu'un processus worker plante, assurez-vous toujours de consigner l'événement et de faire apparaître un nouveau processus en utilisant la fonction cluster.fork().

#### Utilisation du module de cluster de Node

Le groupement est rendu possible avec le [module de clustage] (https://nodejs.org/api/cluster). Cela permet à un processus maître de faire apparaître des processus de travail et de distribuer des connexions entrantes entre les travailleurs.

#### Utilisation du PM2

Si vous déployez votre application avec PM2, alors vous pouvez profiter de la grappe de serveurs _sans_ pour modifier le code de votre application. Vous devez d'abord vous assurer que votre [application est sans états] (https://pm2.keymetrics.io/docs/usage/specifics/#stateless-apps) signifiant qu'aucune donnée locale n'est stockée dans le processus (comme les sessions, les connexions websocket et les autres).

Lorsque vous exécutez une application avec PM2, vous pouvez activer le **mode de cluster** pour l'exécuter dans une grappe avec un certain nombre d'instances de votre choix, comme le nombre de processeurs disponibles sur la machine. Vous pouvez modifier manuellement le nombre de processus dans le cluster en utilisant l'outil en ligne de commande `pm2` sans arrêter l'application.

Pour activer le mode cluster, lancez votre application comme suit:

```bash

$ pm2 start npm --name my-app -i 4 -- start

$ pm2 start npm --name my-app -i max -- start
```

Ceci peut également être configuré dans un fichier de processus PM2 (`ecosystem.config. s` ou similaire) en définissant `exec_mode` à `cluster` et `instances` au nombre de travaux à commencer.

Une fois exécutée, l'application peut être mise à l'échelle comme ceci:

```bash

$ pm2 scale my-app +3

$ pm2 scale my-app 2
```

Pour plus d'informations sur la grappe de serveurs avec PM2, voir [Mode clusters](https://pm2.keymetrics.io/docs/usage/cluster-mode/) dans la documentation PM2.

### Résultats de la requête de cache

Une autre stratégie pour améliorer les performances en production est de mettre en cache le résultat des requêtes, afin que votre application ne répète pas l'opération pour répondre à la même requête de manière répétée.

Utilisez un serveur de cache comme [Varnish](https://www.varnish-cache.org/) ou [Nginx](https://blog.nginx.org/blog/nginx-caching-guide) (voir aussi [Nginx Caching](https://serversforhackers.com/nginx-caching/)) pour améliorer considérablement la vitesse et les performances de votre application.

### Utiliser un répartiteur de charge

Quelle que soit l'optimisation d'une application, une seule instance ne peut gérer qu'une quantité limitée de charge et de trafic. Une façon de mettre à l'échelle une application est d'exécuter plusieurs instances et de distribuer le trafic via un répartiteur de charge. La mise en place d'un répartiteur de charge peut améliorer les performances et la vitesse de votre application et l'activer pour augmenter la taille de votre système par une seule instance.

Un répartiteur de charge est généralement un mandataire inversé qui orchestre le trafic entre et à partir de plusieurs instances et serveurs d'applications. Vous pouvez facilement configurer un répartiteur de charge pour votre application en utilisant [Nginx](https://nginx.org/en/docs/http/load_balancing) ou [HAProxy](https://www.digitalocean.com/community/tutorials/an-introduction-to-haproxy-and-load-balancing-concepts).

Avec l'équilibrage de charge, vous devrez peut-être vous assurer que les requêtes qui sont associées à un ID de session particulier se connectent au processus qui les a originés. C'est connu sous le nom _affinity_, ou _sticky sessions_, et peut être adressé par la suggestion ci-dessus d'utiliser un stockage de données tel que Redis pour les données de session (selon votre application). Pour une discussion, voir [Utilisation de plusieurs nœuds](https://socket.io/docs/v4/using-multiple-nodes/).

### Utiliser un proxy inversé

Un mandataire inversé se trouve devant une application Web et effectue des opérations de support sur les requêtes, en plus de diriger les requêtes vers l'application. Il peut gérer les pages d'erreurs, la compression, la mise en cache, le service de fichiers et l'équilibrage de charge, entre autres.

Le transfert de tâches qui ne nécessitent pas de connaissance de l'état de l'application à un mandataire inversé libère Express pour effectuer des tâches d'application spécialisées. Pour cette raison, il est recommandé d'exécuter Express derrière un proxy inverse comme [Nginx](https://www.nginx.org/) ou [HAProxy](https://www.haproxy.org/) en production.
