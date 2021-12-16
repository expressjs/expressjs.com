---
layout: page
title: Débogage d'Express
menu: guide
lang: fr
---

# Débogage d'Express

Express fait appel au module [debug](https://www.npmjs.com/package/debug) en interne
pour journaliser les informations concernant les correspondances de route, les fonctions middleware utilisées, le
mode de l'application ainsi que le flux du cycle de demande-réponse.

<div class="doc-box doc-info" markdown="1">
Le module `debug` est en quelque sorte une version étendue de `console.log`, mais contrairement à ce dernier,`` vous n'avez pas besoin de mettre en commentaire les journaux de
`debug` dans le code de production. La journalisation est désactivée par défaut et peut être activée de manière conditionnelle à l'aide de la variable d'environnement `DEBUG`.
</div>

Pour afficher tous les journaux internes utilisés dans Express, affectez à la variable d'environnement `DEBUG` la valeur `express:*` lors du lancement de votre application.

```console
$ DEBUG=express:* node index.js
```

Sous Windows, utilisez la commande correspondante.

```console
> set DEBUG=express:* & node index.js
```

L'exécution de cette commande sur l'application par défaut générée par le [générateur express](/{{ page.lang }}/starter/generator.html) imprime le résultat suivant :

```console
$ DEBUG=express:* node ./bin/www
  express:router:route new / +0ms
  express:router:layer new / +1ms
  express:router:route get / +1ms
  express:router:layer new / +0ms
  express:router:route new / +1ms
  express:router:layer new / +0ms
  express:router:route get / +0ms
  express:router:layer new / +0ms
  express:application compile etag weak +1ms
  express:application compile query parser extended +0ms
  express:application compile trust proxy false +0ms
  express:application booting in development mode +1ms
  express:router use / query +0ms
  express:router:layer new / +0ms
  express:router use / expressInit +0ms
  express:router:layer new / +0ms
  express:router use / favicon +1ms
  express:router:layer new / +0ms
  express:router use / logger +0ms
  express:router:layer new / +0ms
  express:router use / jsonParser +0ms
  express:router:layer new / +1ms
  express:router use / urlencodedParser +0ms
  express:router:layer new / +0ms
  express:router use / cookieParser +0ms
  express:router:layer new / +0ms
  express:router use / stylus +90ms
  express:router:layer new / +0ms
  express:router use / serveStatic +0ms
  express:router:layer new / +0ms
  express:router use / router +0ms
  express:router:layer new / +1ms
  express:router use /users router +0ms
  express:router:layer new /users +0ms
  express:router use / &lt;anonymous&gt; +0ms
  express:router:layer new / +0ms
  express:router use / &lt;anonymous&gt; +0ms
  express:router:layer new / +0ms
  express:router use / &lt;anonymous&gt; +0ms
  express:router:layer new / +0ms
```

Si une demande est par la suite effectuée à l'application, vous verrez les journaux spécifiés dans le code Express :

```console
  express:router dispatching GET / +4h
  express:router query  : / +2ms
  express:router expressInit  : / +0ms
  express:router favicon  : / +0ms
  express:router logger  : / +1ms
  express:router jsonParser  : / +0ms
  express:router urlencodedParser  : / +1ms
  express:router cookieParser  : / +0ms
  express:router stylus  : / +0ms
  express:router serveStatic  : / +2ms
  express:router router  : / +2ms
  express:router dispatching GET / +1ms
  express:view lookup "index.pug" +338ms
  express:view stat "/projects/example/views/index.pug" +0ms
  express:view render "/projects/example/views/index.pug" +1ms
```

Pour afficher les journaux uniquement à partir de l'implémentation du routeur, affectez à la variable d'environnement `DEBUG` la valeur `express:router`. De la même façon, pour afficher les journaux uniquement à partir de l'implémentation de l'application, affectez à la variable d'environnement `DEBUG` la valeur `express:application`, et ainsi de suite.

## Applications générées par la commande `express`

Une application générée par la commande `express` fait également appel au module `debug` et son espace de nom de débogage est délimité par le nom de l'application.

Ainsi, si vous avez généré l'application à l'aide de `$ express sample-app`, vous pouvez activer les instructions de débogage en exécutant la commande suivante :

```console
$ DEBUG=sample-app:* node ./bin/www
```

Vous pouvez spécifier plusieurs espaces de noms de débogage en affectant une liste de noms séparés par des virgules :

```console
$ DEBUG=http,mail,express:* node index.js
```

Pour plus d'informations sur le module `debug`, voir [debug](https://www.npmjs.com/package/debug).
