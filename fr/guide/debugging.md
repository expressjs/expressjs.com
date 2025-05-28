---
layout: page
title: Débogage d'Express
description: Learn how to enable and use debugging logs in Express.js applications by setting the DEBUG environment variable for enhanced troubleshooting.
menu: guide
lang: fr
redirect_from: "  "
---

# Débogage d'Express

Pour afficher tous les journaux internes utilisés dans Express, affectez à la variable d'environnement `DEBUG` la valeur `express:*` lors du lancement de votre application.

```bash
$ DEBUG=express:* node index.js
```

Sous Windows, utilisez la commande correspondante.

```bash
> $env:DEBUG = "express:*"; node index.js
```

L'exécution de cette commande sur l'application par défaut générée par le [générateur express](/{{ page.lang }}/starter/generator.html) imprime le résultat suivant :

```bash
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
  express:router use / &amp;lt;anonymous&amp;gt; +0ms
  express:router:layer new / +0ms
  express:router use / &amp;lt;anonymous&amp;gt; +0ms
  express:router:layer new / +0ms
  express:router use / &amp;lt;anonymous&amp;gt; +0ms
  express:router:layer new / +0ms
```

Si une demande est par la suite effectuée à l'application, vous verrez les journaux spécifiés dans le code Express :

```bash
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

Une application générée par la commande `express` également appel au module `debug` et son espace de nom de débogage est délimité par le nom de l'application.

Ainsi, si vous avez généré l'application à l'aide de `$ express sample-app`, vous pouvez activer les instructions de débogage en exécutant la commande suivante :

```bash
$ DEBUG=sample-app:* node ./bin/www
```

Vous pouvez spécifier plusieurs espaces de noms de débogage en affectant une liste de noms séparés par des virgules :

```bash
$ DEBUG=http,mail,express:* node index.js
```

## Advanced options

When running through Node.js, you can set a few environment variables that will change the behavior of the debug logging:

| Name                | Purpose                                                           |
| ------------------- | ----------------------------------------------------------------- |
| `DEBUG`             | Enables/disables specific debugging namespaces.   |
| `DEBUG_COLORS`      | Whether or not to use colors in the debug output. |
| `DEBUG_DEPTH`       | Object inspection depth.                          |
| `DEBUG_FD`          | File descriptor to write debug output to.         |
| `DEBUG_SHOW_HIDDEN` | Shows hidden properties on inspected objects.     |

{% capture debug-text %}

The environment variables beginning with `DEBUG_` end up being
converted into an Options object that gets used with `%o`/`%O` formatters.
See the Node.js documentation for
[`util.inspect()`](https://nodejs.org/api/util.html#util_util_inspect_object_options)
for the complete list.

{% endcapture %}

{% include admonitions/note.html content=debug-text %}
