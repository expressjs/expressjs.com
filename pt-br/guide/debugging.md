---
layout: page
title: Depurando o Express
menu: guide
lang: pt-br
---

# Depurando o Express

O Express usa o módulo de [depuração](https://www.npmjs.com/package/debug)
internamente para registrar informações de log sobre a correspondência de rotas, as funções middleware que estão em uso, o modo de
aplicativo, e o fluxo do ciclo solicitação-resposta.

<div class="doc-box doc-info" markdown="1">
O `debug` é como uma versão aumentada do `console.log` mas, diferente do
`console.log`, não é preciso comentar os logs de
`debug` no código na produção. O registro de logs
está desligado por padrão e podem ser ligados condicionadamente
usando a variável de ambiente `DEBUG`.
</div>

Para ver todos os logs interno usados no Express, configure a
variável de ambiente `DEBUG` para
`express:*` ao ativar seu aplicativo.

```console
$ DEBUG=express:* node index.js
```

No Windows, use o comando correspondente.

```console
> set DEBUG=express:* & node index.js
```

Executar este comando no aplicativo padrão gerado pelo
[express generator](/{{ page.lang }}/starter/generator.html) imprime a seguinte saída:

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

Quando uma solicitação é feita em seguida para o aplicativo,
você verá os logs especificados no código do Express:

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

```console
$ DEBUG=sample-app:* node ./bin/www
```

É possível especificar mais do que um namespace de depuração
designando uma lista de nomes separados por vírgulas:

```console
$ DEBUG=http,mail,express:* node index.js
```

Para obter mais informações sobre `debug`,
consulte o [debug](https://www.npmjs.com/package/debug).
