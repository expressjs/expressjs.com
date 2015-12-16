---
layout: page
title: Depurando no Express
menu: guide
lang: pt-br
---

# Depurando no Express

Express utiliza o módulo [debug](https://github.com/visionmedia/debug) internamente para registrar informações(logs) sobre combinação de rotas, middlewares em uso, modo de aplicação, e o fluxo do ciclo de requisição e resposta(request-response cycle).

<div class="doc-box doc-info" markdown="1">
‘debug’, é como uma versão incrementada do ‘console.log’. Mas ao contrário deste, você não tem que comentar logs de depuração no código em produção. Esta opção já vem desabilitada por padrão e pode ser condicionalmente habilitada com o uso de uma varíavel de ambiente chamada ‘DEBUG’.
</div>

Para visualizar todos os logs internos utilizados no Express, apenas configure a variável de ambiente DEBUG para `express:*` quando for executar sua aplicação.

<pre><code class="language-sh" translate="no">
$ DEBUG=express:* node index.js
</code></pre>

No windows, utilize o seguinte comando:

<pre><code class="language-sh" translate="no">
> set DEBUG=express:* & node index.js
</code></pre>

Executando o comando acima na aplicação padrão gerada pelo [express generator](/{{ page.lang }}/starter/generator.html) mostrará a seguinte saída:

<pre><code class="language-sh" translate="no">
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
  express:router use / &lt;anonymous> +0ms
  express:router:layer new / +0ms
  express:router use / &lt;anonymous> +0ms
  express:router:layer new / +0ms
  express:router use / &lt;anonymous> +0ms
  express:router:layer new / +0ms
</code></pre>

Agora, quando uma requisição for realizada em sua aplicação, você verá os logs gerados pelo Express:

<pre><code class="language-sh" translate="no">
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
  express:view lookup "index.jade" +338ms
  express:view stat "/projects/example/views/index.jade" +0ms
  express:view render "/projects/example/views/index.jade" +1ms
</code></pre>

Para visualizer apenas os logs da implementação de rotas, configure a varíavel `DEBUG` para `express:router`. Da mesma forma, para logs somente da implementação da aplicação, utilize `express:application`, e assim por diante.

## `express`-generated app

A aplicação gerada pelo comando `express` também utiliza o módulo `debug` e seu namespace possui como escopo o nome da aplicação.

Ao criar uma aplicação como a seguinte:

<pre><code class="language-sh" translate="no">
$ express sample-app
</code></pre>

Você poderá habilitar a depuração com o comando a seguir:

<pre><code class="language-sh" translate="no">
$ DEBUG=sample-app node ./bin/www
</code></pre>

Você pode especificar mais de um namespace de depuração, atribuindo uma lista cujos elementos são separados por vírgula, como abaixo:

<pre><code class="language-sh" translate="no">
$ DEBUG=http,mail,express:* node index.js
</code></pre>

Para mais informações sobre o módulo `debug`, veja o [debug guide](https://github.com/visionmedia/debug).
