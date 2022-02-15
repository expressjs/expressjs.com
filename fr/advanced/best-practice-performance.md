---
layout: page
title: Meilleures pratiques en termes de performances pour l'utilisation d'Express en production
menu: advanced
lang: fr
---

# Meilleures pratiques en production : performances et fiabilité

## Présentation

Cet article traite des meilleures pratiques en termes de performances et de fiabilité pour les applications Express déployées en production.

La présente rubrique s'inscrit clairement dans le concept "devops", qui couvre à la fois le développement traditionnel et l'exploitation. Ainsi, les informations se divisent en deux parties :

* [A faire dans votre code](#code) (partie développement, "dev").
* [A faire dans votre environnement/configuration](#env) (partie exploitation, "ops").

<a name="code"></a>

## A faire dans votre code

Les actions suivantes peuvent être réalisées dans votre code afin d'améliorer les performances de votre application :

* Utiliser la compression gzip
* Ne pas utiliser les fonctions synchrones
* Utiliser le middleware pour exploiter les fichiers statiques
* Procéder à une journalisation correcte
* Traiter correctement les exceptions

### Utiliser la compression gzip

La compression Gzip peut considérablement réduire la taille du corps de réponse et ainsi augmenter la vitesse d'une application Web. Utilisez le middleware [compression](https://www.npmjs.com/package/compression) pour la compression gzip dans votre application Express. Par exemple :

```js
const compression = require('compression')
const express = require('express')
const app = express()
app.use(compression())
```

Pour un site Web en production dont le trafic est élevé, la meilleure méthode pour mettre en place la compression consiste à l'implémenter au niveau d'un proxy inverse (voir [Utiliser un proxy inverse](#proxy)). Dans ce cas, vous n'avez pas besoin d'utiliser le middleware compression. Pour plus de détails sur l'activation de la compression gzip dans Nginx, voir [Module ngx_http_gzip_module](http://nginx.org/en/docs/http/ngx_http_gzip_module.html) dans la documentation Nginx.

### Ne pas utiliser les fonctions synchrones

Les fonctions et les méthodes synchrones ralentissent le processus d'exécution jusqu'à leur retour. Un simple appel à une fonction synchrone peut revenir en quelques microsecondes ou millisecondes ; pour les sites Web dont le trafic est élevé, ces appels s'additionnent et réduisent les performances de l'application. Evitez de les utiliser en production.

Bien que Node et plusieurs modules mettent à disposition les versions synchrone et asynchrone de leurs fonctions, utilisez toujours la version asynchrone en production. L'utilisation d'une fonction synchrone n'est justifiée que lors du démarrage initial.

Si vous utilisez Node.js 4.0+ ou io.js 2.1.0+, vous pouvez utiliser l'option de ligne de commande `--trace-sync-io` pour imprimer un avertissement et une trace de pile chaque fois que votre application utilise une API synchrone. Bien entendu vous n'utiliserez pas réellement cette option en production, mais plutôt pour vérifier que votre code est prêt pour la phase production. Pour plus d'informations, voir [Weekly update for io.js 2.1.0](https://nodejs.org/en/blog/weekly-updates/weekly-update.2015-05-22/#2-1-0).

### Utiliser le middleware pour exploiter les fichiers statiques

En développement, vous pouvez utiliser [res.sendFile()](/{{ page.lang }}/4x/api.html#res.sendFile) pour exploiter les fichiers statiques. Ne l'utilisez toutefois pas en production, car cette fonction doit lire le système de fichiers pour chaque demande de fichier ; elle se heurterait à des temps d'attente importants qui affecteraient les performances globales de l'application. Notez que `res.sendFile()` n'est *pas* implémentée avec l'appel système [sendfile](http://linux.die.net/man/2/sendfile), qui la rendrait beaucoup plus efficace.

Utilisez plutôt le middleware [serve-static](https://www.npmjs.com/package/serve-static) (ou tout middleware équivalent), qui est optimisé pour l'utilisation des fichiers dans les applications Express.

Encore mieux, utilisez un proxy inverse pour exploiter les fichiers statiques ; pour plus d'informations, voir [Utiliser un proxy inverse](#proxy).

### Procéder à une journalisation correcte

En règle générale, vous utilisez la journalisation à partir de votre application à deux fins : le débogage et la journalisation de l'activité de votre application (principalement tout le reste). L'utilisation de `console.log()` ou de `console.err()` pour imprimer des messages de journal sur le terminal est une pratique courante en développement. Cependant, [ces fonctions sont synchrones](https://nodejs.org/api/console.html#console_console_1) lorsque la destination est un terminal ou un fichier ; elles ne conviennent donc pas en production, à moins que vous ne dirigiez la sortie vers un autre programme.

#### Pour le débogage

Si vous utilisez la journalisation à des fins de débogage, utilisez un module de débogage spécial tel que [debug](https://www.npmjs.com/package/debug) plutôt que d'utiliser `console.log()`. Ce module vous permet d'utiliser la variable d'environnement DEBUG pour contrôler les messages de débogage envoyés à `console.err()`, le cas échéant. Pour que votre application reste exclusivement asynchrone, vous devrez toujours diriger `console.err()` vers un autre programme. Mais bon, vous n'allez pas vraiment procéder à un débogage en production, n'est-ce pas ?

#### Pour journaliser l'activité de votre application

Si vous journalisez l'activité de votre application (par exemple, pour suivre le trafic ou les appels API), utilisez une bibliothèque de journalisation telle que [Winston](https://www.npmjs.com/package/winston) ou [Bunyan](https://www.npmjs.com/package/bunyan) plutôt que d'utiliser `console.log()`. Pour obtenir une comparaison détaillée de ces deux bibliothèques, consultez l'article StrongLoop intitulé [Comparing Winston and Bunyan Node.js Logging](https://strongloop.com/strongblog/compare-node-js-logging-winston-bunyan/).

<a name="exceptions"></a>

### Traiter correctement les exceptions

Les applications Node plantent lorsqu'elles tombent sur une exception non interceptée. Si vous ne traitez pas les exceptions et ne prenez pas les décisions appropriées, votre application Express plantera et sera déconnectée. Si vous suivez les conseils de la rubrique ci-dessous intitulée [Vérifier que votre application redémarre automatiquement](#restart), votre application pourra être restaurée suite à un plantage. Le délai de démarrage des applications Express est heureusement court en règle générale. Vous souhaitez toutefois éviter tout plantage en priorité et pour ce faire, vous devez traiter les exceptions correctement.

Pour vérifier que vous traitez toutes les exceptions, procédez comme suit :

* [Utiliser try-catch](#try-catch)
* [Utiliser des promesses](#promises)

Avant de s'immerger dans les rubriques qui suivent, il est conseillé de posséder des connaissances de base concernant le traitement des erreurs Node/Express, à savoir l'utilisation des rappels "error-first" et la propagation des erreurs dans le middleware. Node utilise la convention de "rappel error-first" pour renvoyer les erreurs issues des fonctions asynchrones, dans laquelle le premier paramètre de la fonction callback est l'objet error, suivi par les données de résultat dans les paramètres suivants. Pour n'indiquer aucune erreur, indiquez null comme premier paramètre. La fonction de rappel doit suivre la convention de rappel "error-first" de sorte à traiter l'erreur de manière significative. Dans Express, la meilleure pratique consiste à utiliser la fonction next() pour propager les erreurs via la chaîne du middleware.

Pour plus d'informations sur les bases du traitement des erreurs, voir :

* [Error Handling in Node.js](https://www.joyent.com/developers/node/design/errors)
* [Building Robust Node Applications: Error Handling](https://strongloop.com/strongblog/robust-node-applications-error-handling/) (blogue StrongLoop)

#### A ne pas faire

Vous ne devriez *pas* écouter l'événement `uncaughtException`, émis lorsqu'une exception remonte vers la boucle d'événements. L'ajout d'un programme d'écoute d'événement pour `uncaughtException` va modifier le comportement par défaut du processus qui rencontre une exception ; le processus va continuer à s'exécuter malgré l'exception. Cela pourrait être un bon moyen d'empêcher votre application de planter, mais continuer à exécuter l'application après une exception non interceptée est une pratique dangereuse qui n'est pas recommandée, étant donné que l'état du processus devient peu fiable et imprévisible.

De plus, l'utilisation d'`uncaughtException` est officiellement reconnue comme étant [rudimentaire](https://nodejs.org/api/process.html#process_event_uncaughtexception) et il a été [proposé](https://github.com/nodejs/node-v0.x-archive/issues/2582) de le supprimer. Ecouter `uncaughtException` n'est qu'une mauvaise idée. Voilà pourquoi nous recommandons d'utiliser plusieurs processus et superviseurs à la place : faire planter son application et la redémarrer est souvent plus sûr que de la restaurer après une erreur.

L'utilisation de [domain](https://nodejs.org/api/domain.html) n'est également pas recommandée. Ce module obsolète ne résout globalement pas le problème.

<a name="try-catch"></a>

#### Utiliser try-catch

Try-catch est un élément de langage JavaScript que vous pouvez utiliser pour intercepter les exceptions dans le code synchrone. Utilisez try-catch pour traiter les erreurs d'analyse JSON, comme indiqué ci-dessous, par exemple.

Utilisez un outil tel que [JSHint](http://jshint.com/) ou [JSLint](http://www.jslint.com/) pour vous aider à identifier les exceptions implicites comme les [erreurs de référence dans les variables non définies](http://www.jshint.com/docs/options/#undef).

Voici un exemple d'utilisation de try-catch pour traiter une exception potentielle de plantage de processus.
Cette fonction middleware accepte un paramètre de zone de requête nommé "params" qui est un objet JSON.

```js
app.get('/search', (req, res) => {
  // Simulating async operation
  setImmediate(() => {
    const jsonStr = req.query.params
    try {
      const jsonObj = JSON.parse(jsonStr)
      res.send('Success')
    } catch (e) {
      res.status(400).send('Invalid JSON string')
    }
  })
})
```

Toutefois, try-catch ne fonctionne que dans le code synchrone. Etant donné que la plateforme Node est principalement asynchrone (en particulier dans un environnement de production), try-catch n'interceptera pas beaucoup d'exceptions.

<a name="promises"></a>

#### Utiliser des promesses

Les promesses vont traiter n'importe quelle exception (explicite et implicite) dans les blocs de code asynchrone qui utilisent `then()`. Contentez-vous d'ajouter `.catch(next)` à la fin des chaînes de promesse. Par exemple :

```js
app.get('/', (req, res, next) => {
  // do some sync stuff
  queryDb()
    .then((data) => makeCsv(data)) // handle data
    .then((csv) => { /* handle csv */ })
    .catch(next)
})

app.use((err, req, res, next) => {
  // handle error
})
```

Toutes les erreurs asynchrones et synchrones sont à présent propagées vers le middleware de traitement des erreurs.

Observez toutefois les deux avertissements suivants :

1.  L'intégralité de votre code asynchrone doit renvoyer des promesses (à l'exception des émetteurs). Si une bibliothèque spécifique ne renvoie pas de promesses, convertissez l'objet de base à l'aide d'une fonction d'aide telle que [Bluebird.promisifyAll()](http://bluebirdjs.com/docs/api/promise.promisifyall.html).
2.  Les émetteurs d'événements (comme les flux) peuvent toujours générer des exceptions non interceptées. Veillez donc à traiter l'événement d'erreur de manière appropriée ; par exemple :

```js
const wrap = fn => (...args) => fn(...args).catch(args[2])

app.get('/', wrap(async (req, res, next) => {
  const company = await getCompanyById(req.query.id)
  const stream = getLogoStreamById(company.id)
  stream.on('error', next).pipe(res)
}))
```

Pour plus d'informations sur le traitement des erreurs à l'aide de promesses, voir :

* [Asynchronous Error Handling in Express with Promises, Generators and ES7](https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/)
* [Promises in Node.js with Q – An Alternative to Callbacks](https://strongloop.com/strongblog/promises-in-node-js-with-q-an-alternative-to-callbacks/)

<a name="env"></a>

## A faire dans votre environnement/configuration

Les actions suivantes peuvent être réalisées dans votre environnement système afin d'améliorer les performances de votre application :

* Définir NODE_ENV sur "production"
* Vérifier que votre application redémarre automatiquement
* Exécuter votre application dans un cluster
* Mettre en cache les résultats d'une demande
* Utiliser un équilibreur de charge
* Utiliser un proxy inverse

### Définir NODE_ENV sur "production"

La variable d'environnement NODE_ENV spécifie l'environnement dans lequel une application s'exécute (en règle générale, développement ou production). Le moyen le plus simple d'améliorer vos performances consiste à définir NODE_ENV sur "production."

En définissant NODE_ENV sur "production", Express :

* Met en cache les modèles d'affichage.
* Met en cache les fichiers CSS générés à partir d'extensions CSS.
* Génère moins de messages d'erreur prolixes.

[Les tests indiquent](http://apmblog.dynatrace.com/2015/07/22/the-drastic-effects-of-omitting-node_env-in-your-express-js-applications/) que ce simple paramétrage peut multiplier les performances d'application par trois !

Si vous avez besoin d'écrire du code spécifique à un environnement, vous pouvez vérifier la valeur de NODE_ENV avec `process.env.NODE_ENV`. Sachez que la vérification de la valeur de n'importe quelle variable d'environnement pénalise les performances et devrait donc être effectuée avec modération.

En développement, vous définissez généralement les variables d'environnement dans votre shell interactif, à l'aide de `export` ou de votre fichier `.bash_profile` par exemple. Il n'est toutefois pas conseillé de le faire sur un serveur de production ; utilisez plutôt le système init de votre système d'exploitation (systemd ou Upstart). La section qui suit fournit des détails sur l'utilisation de votre système init en général, mais la définition de NODE_ENV est tellement importante pour les performances (et facile à réaliser), qu'elle est mise en évidence ici.

Avec Upstart, utilisez le mot clé `env` dans votre fichier de travail. Par exemple :

<pre>
<code class="language-sh" translate="no">
# /etc/init/env.conf
 env NODE_ENV=production
</code>
</pre>

Pour plus d'informations, voir [Upstart Intro, Cookbook and Best Practices](http://upstart.ubuntu.com/cookbook/#environment-variables).

Avec systemd, utilisez la directive `Environment` dans votre fichier d'unité. Par exemple :

<pre>
<code class="language-sh" translate="no">
# /etc/systemd/system/myservice.service
Environment=NODE_ENV=production
</code>
</pre>

Pour plus d'informations, voir [Using Environment Variables In systemd Units](https://coreos.com/os/docs/latest/using-environment-variables-in-systemd-units.html).

Si vous utilisez StrongLoop Process Manager, vous pouvez également [définir la variable d'environnement lorsque vous installez StrongLoop PM en tant que service](https://docs.strongloop.com/display/SLC/Setting+up+a+production+host#Settingupaproductionhost-Setenvironmentvariables).

### Vérifier que votre application redémarre automatiquement

En production, vous ne souhaitez jamais que votre application soit déconnectée. Vous devez donc veiller à ce qu'elle redémarre si elle plante et si le serveur plante. Même si vous espérez que cela n'arrive pas, vous devez en réalité considérer ces deux éventualités en :

* Utilisant un gestionnaire de processus pour redémarrer l'application (et Node) lorsqu'elle plante.
* Utilisant le système init fourni par votre système d'exploitation pour redémarrer le gestionnaire de processus lorsque le système d'exploitation plante. Vous pouvez également utiliser le système init sans gestionnaire de processus.

Les applications Node plantent si elles tombent sur une exception non interceptée. Avant toute chose, vérifiez que votre application est correctement testée et qu'elle traite toutes les exceptions (voir [Traiter correctement les exceptions](#exceptions) pour plus de détails). En cas d'échec, mettez en place un mécanisme qui garantit que si et lorsque votre application plante, elle redémarre automatiquement.

#### Utiliser un gestionnaire de processus

En développement, vous avez simplement démarré votre application à partir de la ligne de commande avec `node server.js` ou une instruction similaire. En production, cela vous mènera droit au désastre. Si l'application plante, elle sera déconnectée tant que vous ne la redémarrerez pas. Pour garantir que votre application redémarre si elle plante, utilisez un gestionnaire de processus. Un gestionnaire de processus est un "conteneur" d'applications qui facilite le déploiement, offre une haute disponibilité et vous permet de gérer l'application lors de son exécution.

En plus de redémarrer votre application lorsqu'elle plante, un gestionnaire de processus peut vous permettre :

* De vous informer sur les performances d'exécution et la consommation des ressources.
* De modifier les paramètres de manière dynamique afin d'améliorer les performances.
* De contrôler la mise en cluster (StrongLoop PM et pm2).

Les gestionnaires de processus les plus populaires pour Node sont les suivants :

* [StrongLoop Process Manager](http://strong-pm.io/)
* [PM2](https://github.com/Unitech/pm2)
* [Forever](https://www.npmjs.com/package/forever)

Pour obtenir une comparaison détaillée de ces trois gestionnaires de processus, voir [http://strong-pm.io/compare/](http://strong-pm.io/compare/). Pour obtenir une présentation détaillée, voir [Gestionnaires de processus pour les applications Express](/{{ page.lang }}/advanced/pm.html).

L'utilisation de l'un de ces trois gestionnaires de processus suffira à garder votre application active, même si elle plantera de temps en temps.

StrongLoop PM possède un grand nombre de fonctionnalités qui ciblent en particulier le déploiement en production. Vous pouvez l'utiliser avec les outils StrongLoop associés pour :

* Générer et mettre en package votre application en local, puis la déployer en toute sécurité sur votre système de production.
* Redémarrer automatiquement votre application si elle plante pour une raison quelconque.
* Gérer vos clusters à distance.
* Afficher les profils d'UC et les instantanés de segment de mémoire pour optimiser les performances et diagnostiquer les fuites de mémoire.
* Afficher les mesures de performance de votre application.
* Evoluer facilement vers plusieurs hôtes avec un contrôlé intégré de l'équilibreur de charge Nginx.

Comme décrit ci-dessous, lorsque vous installez StrongLoop PM en tant que service de système d'exploitation à l'aide de votre système init, il redémarre automatiquement au redémarrage du système. Ainsi, vos processus applicatifs et vos clusters resteront toujours actifs.

#### Utiliser un système init

Le niveau de fiabilité suivant consiste à garantir que votre application redémarre lorsque le serveur redémarre. Les systèmes peuvent toujours tomber en panne pour divers motifs. Pour garantir que votre application redémarre si le serveur plante, utilisez le système init intégré à votre système d'exploitation. Les deux principaux systèmes init actuellement utilisés sont [systemd](https://wiki.debian.org/systemd) et [Upstart](http://upstart.ubuntu.com/).

Vous pouvez utiliser les systèmes init de deux manières dans votre application Express :

* Exécutez votre application dans un gestionnaire de processus, puis installez le gestionnaire de processus en tant que service avec le système init. Le gestionnaire de processus va redémarrer votre application lorsqu'elle plantera et le système init va redémarrer le gestionnaire de processus lorsque le système d'exploitation redémarrera. Il s'agit de la méthode recommandée.
* Exécutez votre application (et Node) directement avec le système init. Cette méthode est plus simple, mais vous ne profitez pas des avantages d'un gestionnaire de processus.

##### Systemd

Systemd est un système Linux et un gestionnaire de services. La plupart des distributions Linux principales ont adopté systemd comme leur système init par défaut.

Un fichier de configuration de service systemd est appelé *fichier d'unité* et porte l'extension .service. Voici un exemple de fichier d'unité permettant de gérer une application Node directement (remplacez le texte en gras par les valeurs appropriées à votre système et votre application) :

<pre>
<code class="language-sh" translate="no">
[Unit]
Description=Awesome Express App

[Service]
Type=simple
ExecStart=/usr/local/bin/node /projects/myapp/index.js
WorkingDirectory=/projects/myapp

User=nobody
Group=nogroup

# Environment variables:
Environment=NODE_ENV=production

# Allow many incoming connections
LimitNOFILE=infinity

# Allow core dumps for debugging
LimitCORE=infinity

StandardInput=null
StandardOutput=syslog
StandardError=syslog
Restart=always

[Install]
WantedBy=multi-user.target
</code>
</pre>
Pour plus d'informations sur systemd, voir la [page d'aide de systemd](http://www.freedesktop.org/software/systemd/man/systemd.unit.html).

##### StrongLoop PM en tant que service systemd

Vous pouvez facilement installer StrongLoop Process Manager en tant que service systemd. Une fois que c'est fait, lorsque le serveur redémarre, il redémarre automatiquement StrongLoop PM, qui redémarre ensuite toutes les applications qu'il gère.

Pour installer StrongLoop PM en tant que service systemd :

```console
$ sudo sl-pm-install --systemd
```

Démarrez ensuite le service comme suit :

```console
$ sudo /usr/bin/systemctl start strong-pm
```

Pour plus d'informations, voir [Setting up a production host](https://docs.strongloop.com/display/SLC/Setting+up+a+production+host#Settingupaproductionhost-RHEL7+,Ubuntu15.04or15.10) dans la documentation StrongLoop.

##### Upstart

Upstart est un outil système disponible sur un grand nombre de distributions Linux et qui permet de démarrer des tâches et des services pendant le démarrage du système, de les arrêter pendant l'arrêt du système et de les superviser. Vous pouvez configurer votre application Express ou votre gestionnaire de processus en tant que service, puis Upstart le redémarrera automatiquement lorsqu'il plantera.

Un service Upstart est défini dans un fichier de configuration de travail (également appelé "travail") portant l'extension `.conf`. L'exemple qui suit décrit comment créer un travail appelé "myapp" pour une application nommée "myapp" avec le fichier principal situé dans `/projects/myapp/index.js`.

Créez un fichier nommé `myapp.conf` dans `/etc/init/` avec le contenu suivant (remplacez le texte en gras par les valeurs appropriées à votre système et votre application) :

<pre>
<code class="language-sh" translate="no">
# When to start the process
start on runlevel [2345]

# When to stop the process
stop on runlevel [016]

# Increase file descriptor limit to be able to handle more requests
limit nofile 50000 50000

# Use production mode
env NODE_ENV=production

# Run as www-data
setuid www-data
setgid www-data

# Run from inside the app dir
chdir /projects/myapp

# The process to start
exec /usr/local/bin/node /projects/myapp/index.js

# Restart the process if it is down
respawn

# Limit restart attempt to 10 times within 10 seconds
respawn limit 10 10
</code>
</pre>

REMARQUE : ce script nécessite Upstart 1.4 ou ultérieur, pris en charge sur Ubuntu 12.04-14.10.

Etant donné que le travail est configuré pour s'exécuter au démarrage du système, votre application sera démarrée avec le système d'exploitation et sera redémarrée automatiquement si l'application plante ou si le système tombe en panne.

En plus de redémarrer automatiquement l'application, Upstart vous permet d'utiliser les commandes suivantes :

* `start myapp` – Démarre l'application
* `restart myapp` – Redémarre l'application
* `stop myapp` – Arrête l'application

Pour plus d'informations sur Upstart, voir [Upstart Intro, Cookbook and Best Practises](http://upstart.ubuntu.com/cookbook).

##### StrongLoop PM en tant que service Upstart

Vous pouvez facilement installer StrongLoop Process Manager en tant que service Upstart. Une fois que c'est fait, lorsque le serveur redémarre, il redémarre automatiquement StrongLoop PM, qui redémarre ensuite toutes les applications qu'il gère.

Pour installer StrongLoop PM en tant que service Upstart 1.4 :

```console
$ sudo sl-pm-install
```

Exécutez ensuite le service comme suit :

```console
$ sudo /sbin/initctl start strong-pm
```

REMARQUE : sur les systèmes qui ne prennent pas en charge Upstart 1.4, les commandes sont légèrement différentes. Pour plus d'informations, voir [Setting up a production host](https://docs.strongloop.com/display/SLC/Setting+up+a+production+host#Settingupaproductionhost-RHELLinux5and6,Ubuntu10.04-.10,11.04-.10) dans la documentation StrongLoop.

### Exécuter votre application dans un cluster

Dans un système multicoeur, vous pouvez augmenter les performances d'une application Node en lançant un cluster de processus. Un cluster exécute plusieurs instances de l'application, idéalement une instance sur chaque coeur d'UC, répartissant ainsi la charge et les tâches entre les instances.

<!--![Equilibrage entre les instances d'application à l'aide de l'API de cluster](/images/clustering.png)-->

IMPORTANT : étant donné que les instances d'application s'exécutent en tant que processus distincts, elles ne partagent pas le même espace mémoire. Autrement dit, les objets sont en local sur chaque instance de l'application. Par conséquent, vous ne pouvez pas conserver l'état dans le code de l'application. Vous pouvez toutefois utiliser un magasin de données en mémoire tel que [Redis](http://redis.io/) pour stocker les données de session et l'état. Cette fonctionnalité s'applique essentiellement à toutes les formes de mise à l'échelle horizontale, que la mise en cluster soit effectuée avec plusieurs processus ou avec plusieurs serveurs physiques.

Dans les applications mises en cluster, les processus de traitement peuvent planter individuellement sans impacter le reste des processus. Outre les avantages en termes de performance, l'isolement des pannes constitue une autre raison d'exécuter un cluster de processus d'application. Chaque fois qu'un processus de traitement plante, veillez toujours à consigner l'événement et à génération un nouveau processus à l'aide de cluster.fork().

#### Utilisation du module cluster de Node

La mise en cluster peut être réalisée avec le [module cluster](https://nodejs.org/docs/latest/api/cluster.html) de Node. Ce module permet à un processus maître de générer des processus de traitement et de répartir les connexions entrantes parmi ces processus. Toutefois, plutôt que d'utiliser ce module directement, utilisez l'un des nombreux outils qui le font pour vous, à savoir [node-pm](https://www.npmjs.com/package/node-pm) ou [cluster-service](https://www.npmjs.com/package/cluster-service) par exemple.

#### Utilisation de StrongLoop PM

Si vous déployez votre application dans StrongLoop Process Manager (PM), vous pouvez alors utiliser la mise en cluster *sans* modifier votre code d'application.

Lorsque StrongLoop Process Manager (PM) exécute une application, il l'exécute automatiquement dans un cluster avec un nombre de processus de traitement égal au nombre de coeurs d'UC sur le système. Vous pouvez modifier manuellement le nombre de processus de traitement dans le cluster à l'aide de l'outil de ligne de commande slc sans arrêter l'application.

Par exemple, en supposant que vous avez déployé votre application sur prod.foo.com et que StrongLoop PM est en mode écoute sur le port 8701 (par défaut), pour définir la taille du cluster sur 8 à l'aide de slc :

```console
$ slc ctl -C http://prod.foo.com:8701 set-size my-app 8
```

Pour plus d'informations sur la mise en cluster avec StrongLoop PM, voir [Clustering](https://docs.strongloop.com/display/SLC/Clustering) dans la documentation StrongLoop.

### Mettre en cache les résultats d'une demande

Pour améliorer les performances en production, vous pouvez également mettre en cache le résultat des demandes, de telle sorte que votre application ne répète pas l'opération de traitement de la même demande plusieurs fois.

Utilisez un serveur de mise en cache tel que [Varnish](https://www.varnish-cache.org/) ou [Nginx](https://www.nginx.com/resources/wiki/start/topics/examples/reverseproxycachingexample/) (voir aussi [Nginx Caching](https://serversforhackers.com/nginx-caching/)) pour améliorer considérablement la vitesse et les performances de votre application.

### Utiliser un équilibreur de charge

Quel que soit le niveau d'optimisation d'une application, une instance unique ne peut traiter qu'un volume limité de charge et de trafic. Pour faire évoluer une application, vous pouvez exécuter plusieurs instances de cette application et répartir le trafic en utilisant un équilibreur de charge. La configuration d'un équilibreur de charge peut améliorer les performances et la vitesse de votre application et lui permettre d'évoluer plus largement qu'avec une seule instance.

Un équilibreur de charge est généralement un proxy inverse qui orchestre le trafic entrant et sortant de plusieurs instances d'application et serveurs. Vous pouvez facilement configurer un équilibreur de charge pour votre application à l'aide de [Nginx](http://nginx.org/en/docs/http/load_balancing.html) ou de [HAProxy](https://www.digitalocean.com/community/tutorials/an-introduction-to-haproxy-and-load-balancing-concepts).

Avec l'équilibrage de charge, vous devrez peut-être vérifier que les demandes associées à un ID de session spécifique sont connectées au processus dont elles sont issues. Ce procédé est appelé *affinité de session* (ou *sessions persistantes*) et peut être effectué en utilisant un magasin de données tel que Redis pour les données de session (en fonction de votre application), comme décrit ci-dessus. Pour en savoir plus, voir [Using multiple nodes](http://socket.io/docs/using-multiple-nodes/).

#### Utilisation de StrongLoop PM avec un équilibreur de charge Nginx

[StrongLoop Process Manager](http://strong-pm.io/) est intégré à un contrôleur Nginx, ce qui permet de paramétrer facilement les configurations d'environnement de production à plusieurs hôtes. Pour plus d'informations, voir [Scaling to multiple servers](https://docs.strongloop.com/display/SLC/Scaling+to+multiple+servers) (documentation StrongLoop).
<a name="proxy"></a>

### Utiliser un proxy inverse

Un proxy inverse accompagne une application Web et exécute des opérations de prise en charge sur les demandes, en plus de diriger les demandes vers l'application. Il peut gérer les pages d'erreur, la compression, la mise en cache, le dépôt de fichiers et l'équilibrage de charge entre autres.

La transmission de tâches qui ne requièrent aucune connaissance de l'état d'application à un proxy inverse permet à Express de réaliser des tâches d'application spécialisées. C'est pour cette raison qu'il est recommandé d'exécuter Express derrière un proxy inverse tel que [Nginx](https://www.nginx.com/) ou [HAProxy](http://www.haproxy.org/) en production.
