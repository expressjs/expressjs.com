---
layout: page
title: Depurando o Express
description: Learn how to enable and use debugging logs in Express.js applications by setting the DEBUG environment variable for enhanced troubleshooting.
menu: guide
order: 7
redirect_from: "  "
---

# Depurando o Express

Para ver todos os logs interno usados no Express, configure a
variável de ambiente `DEBUG` para
`express:*` ao ativar seu aplicativo.

```bash
$ DEBUG=express:* node index.js
```

No Windows, use o comando correspondente.

```bash
> $env:DEBUG = "express:*"; node index.js
```

Executar este comando no aplicativo padrão gerado pelo
[express generator](/{{ page.lang }}/starter/generator.html) imprime a seguinte saída:

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

Quando uma solicitação é feita em seguida para o aplicativo,
você verá os logs especificados no código do Express:

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

Para ver os logs apenas da implementação do roteador configure
o valor de `DEBUG` para
`express:router`. Do mesmo modo, para ver os logs
apenas da implementação do aplicativo configure o valor de
`DEBUG` para `express:application`,
e assim por diante.

## Aplicativos gerados pelo `express`

Um aplicativo gerado pelo comando `express`
também usa o módulo de `debug` e o seu namespace de
depuração está com o escopo definido para o nome do aplicativo.

Por exemplo, se você gerou o aplicativo com o `$ express
sample-app`, é possível ativar as instruções de depuração
com o seguinte comando:

```bash
$ DEBUG=sample-app:* node ./bin/www
```

É possível especificar mais do que um namespace de depuração
designando uma lista de nomes separados por vírgulas:

```bash
$ DEBUG=http,mail,express:* node index.js
```

## Opções avançadas

When running through Node.js, you can set a few environment variables that will change the behavior of the debug logging:

| Nome                | Objetivo                                                          |
| ------------------- | ----------------------------------------------------------------- |
| `DEBUG`             | Enables/disables specific debugging namespaces.   |
| `DEBUG_COLORS`      | Whether or not to use colors in the debug output. |
| `DEBUG_DEPTH`       | Object inspection depth.                          |
| `DEBUG_FD`          | File descriptor to write debug output to.         |
| `DEBUG_SHOW_HIDDEN` | Shows hidden properties on inspected objects.     |

{% capture debug-text %}

The environment variables beginning with `DEBUG_` end up being
converted into an Options object that gets used with `%o`/`%O` formatters.
Veja a documentação do Node.js para
[`util.inspect()`](https://nodejs.org/api/util.html#util_util_inspect_object_options)
para a lista completa.

{% endcapture %}

{% include admonitions/note.html content=debug-text %}
