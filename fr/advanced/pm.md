---
layout: page
title: Gestionnaires de processus pour les applications Express
menu: advanced
lang: fr
---

# Gestionnaires de processus pour les applications Express

Quand vous exécutez l'application Express pour la
production, utilisez un *gestionnaire de
processus* car celui-ci peut vous permettre :

- De redémarrer l'application manuellement si elle subit une panne.
- De vous informer sur les performances d'exécution et la consommation des ressources.
- De modifier les paramètres de manière dynamique afin d'améliorer les performances.
- De contrôler la mise en cluster.

Un gestionnaire de processus est quelque sorte un "conteneur" d'applications qui facilite le déploiement, offre une haute disponibilité et vous permet de gérer l'application lors de son exécution.

Les gestionnaires de processus les plus populaires pour Express et d'autres applications Node.js sont les suivants :

- [StrongLoop Process Manager](#sl)
- [PM2](#pm2)
- [Forever](#forever)


L'utilisation d'un de ces trois outils peut être très utile, cependant le gestionnaire de processus StrongLoop est le seul qui fournisse un délai d'exécution exhaustif ainsi qu'une solution de déploiement qui s'adresse à l'intégralité du cycle de vie de l'application, avec des outils pour chaque étape avant et après la production, le tout dans une interface unifiée.

Voici un bref aperçu de chacun de ces outils.
Pour une comparaison détaillée, voir [http://strong-pm.io/compare/](http://strong-pm.io/compare/).

## <a id="sl">StrongLoop Process Manager</a>

Le gestionnaire de processus StrongLoop (StrongLoop PM) est un gestionnaire de processus de production pour les applications Node.js. StrongLoop PM possède un équilibrage de charge, une surveillance et un déploiement multi-hôte, ainsi qu'une console graphique intégrés.
Vous pouvez utiliser StrongLoop PM pour les tâches suivantes :

- Construire, combiner et déployer votre application Node.js à un système local ou distant.
- Afficher les profils d'UC et les instantanés de segment de mémoire pour optimiser les performances et diagnostiquer les fuites de mémoire.
- Conserver des processus et des clusters avec une durée de vie illimitée.
- Afficher les indicateurs de performance dans votre application.
- Gérer facilement les déploiements multi-hôtes avec l'intégration Nginx.
- Unifier plusieurs StrongLoop PM avec un délai d'exécution des microservices réparti et qui est géré par Arc.

Vous pouvez utiliser StrongLoop PM en passant par un puissant outil d'interface de ligne de commande appelé `slc`, ou un outil graphique appelé Arc. Arc est un code source ouvert, avec une prise en charge professionnelle fournie par StrongLoop.

Pour plus d'informations, voir [http://strong-pm.io/](http://strong-pm.io/).

Documentation complète :

- [Utilisation des applications Node (documentation StrongLoop)](http://docs.strongloop.com/display/SLC)
- [Utilisation du gestionnaire de processus StrongLoop](http://docs.strongloop.com/display/SLC/Using+Process+Manager).

### Installation

```console
$ [sudo] npm install -g strongloop
```

### Utilisation de base

```console
$ cd my-app
$ slc start
```

Afficher le statut du gestionnaire de processus ainsi que de toutes les applications déployées :

```console
$ slc ctl
Service ID: 1
Service Name: my-app
Environment variables:
  No environment variables defined
Instances:
    Version  Agent version  Cluster size
     4.1.13      1.5.14           4
Processes:
        ID      PID   WID  Listening Ports  Tracking objects?  CPU profiling?
    1.1.57692  57692   0
    1.1.57693  57693   1     0.0.0.0:3001
    1.1.57694  57694   2     0.0.0.0:3001
    1.1.57695  57695   3     0.0.0.0:3001
    1.1.57696  57696   4     0.0.0.0:3001
```

Lister toutes les applications (services) sous gestion :

```console
$ slc ctl ls
Id          Name         Scale
 1          my-app       1
```

Arrêter une application :

```console
$ slc ctl stop my-app
```

Redémarrer une application :

```console
$ slc ctl restart my-app
```

Vous pouvez également "redémarrer en douceur", ce qui donne aux
processus de traitement un délai supplémentaire afin de fermer les
connexions existantes, et permet un redémarrage des applications en
cours :

```console
$ slc ctl soft-restart my-app
```

Supprimer une application de la gestion :

```console
$ slc ctl remove my-app
```

## <a id="pm2">PM2</a>

PM2 est un gestionnaire de processus de production pour les
applications Node.js, qui possède un équilibreur de charge intégré. PM2
vous permet de conserver des applications avec une durée de vie
illimitée et de les recharger sans temps d'arrêt, ce qui facilite
les tâches de l'administrateur système commun.  PM2 vous permet
également de gérer la journalisation, la surveillance et le
regroupement de l'application.

Pour plus d'informations, voir [https://github.com/Unitech/pm2](https://github.com/Unitech/pm2).

### Installation

```console
$ [sudo] npm install pm2 -g
```

### Utilisation de base

Quand vous démarrez une application en utilisant la commande `pm2` vous devez indiquer le chemin d'accès de
l'application. Cependant, quand vous arrêtez, redémarrez ou supprimez
une application, vous pouvez n'indiquer que le nom ou l'ID de
l'application.

```console
$ pm2 start npm --name my-app -- start
[PM2] restartProcessId process id 0
┌──────────┬────┬──────┬───────┬────────┬─────────┬────────┬─────────────┬──────────┐
│ App name │ id │ mode │ pid   │ status │ restart │ uptime │ memory      │ watching │
├──────────┼────┼──────┼───────┼────────┼─────────┼────────┼─────────────┼──────────┤
│ my-app   │ 0  │ fork │ 64029 │ online │ 1       │ 0s     │ 17.816 MB   │ disabled │
└──────────┴────┴──────┴───────┴────────┴─────────┴────────┴─────────────┴──────────┘
 Use the `pm2 show <id|name>` command to get more details about an app.
```

Quand vous démarrez une application à l'aide de la
commande `pm2`, l'application est immédiatement
envoyée en arrière-plan. Vous pouvez contrôler l'application
en arrière-plan à partir de la ligne de commande en utilisant diverses
commandes `pm2`.

Après qu'une application a été démarrée en utilisant la
commande `pm2`, elle est enregistrée dans la liste
de processus de PM2 avec un ID. Vous pouvez donc gérer les
applications avec le même nom à partir de répertoires différents
dans le système, en utilisant leurs ID.

Notez que si plusieurs application avec le même nom sont en
cours d'exécution, les commandes `pm2` les
affecteront toutes. Il vaut donc mieux utiliser les ID plutôt que les
noms pour gérer les applications individuelles.

Lister tous les processus en cours :

```console
$ pm2 list
```

Arrêter une application :

```console
$ pm2 stop 0
```

Redémarrer une application :

```console
$ pm2 restart 0
```

Pour afficher les informations détaillées d'une application :

```console
$ pm2 show 0
```

Pour supprimer une application du registre PM2 :

```console
$ pm2 delete 0
```


## <a id="forever">Forever</a>

Forever est un simple outil d'interface de ligne de commande qui permet de s'assurer qu'un script donné est exécuté de façon continue (forever). L'interface simple de Forever en fait un
outil idéal pour exécuter des déploiements plus petits des applications et des scripts de Node.jps.

Pour plus d'informations, voir [https://github.com/foreverjs/forever](https://github.com/foreverjs/forever).

### Installation

```console
$ [sudo] npm install forever -g
```

### Utilisation de base

Pour démarrer un script, utilisez la commande `forever start` et indiquez le chemin d'accès du script :

```console
$ forever start script.js
```

Cette commande exécutera le script en mode démon (à l'arrière-plan).

Pour exécuter le script de façon à ce qu'il soit joint au terminal, il ne faut pas prendre en compte `start` :

```console
$ forever script.js
```

C'est une bonne idée de consigner votre sortie du script et de
l'outil Forever en utilisant les options de consignation `-l`, `-o` et `-e`, comme illustré dans l'exemple suivant :

```console
$ forever start -l forever.log -o out.log -e err.log script.js
```

Pour visualiser la liste des scripts qui ont été démarrés par Forever :

```console
$ forever list
```

Pour arrêter un script qui a été démarré par Forever, utilisez
la commande `forever stop` et indiquez l'index de
processus (tel qu'il est listé par la commande `forever list`).

```console
$ forever stop 1
```

Sinon, indiquez le chemin d'accès du fichier :

```console
$ forever stop script.js
```

Pour arrêter tous les scripts qui ont été démarrés par Forever :

```console
$ forever stopall
```

Forever possède beaucoup d'autres options, et il fournit également une API programmable.
