---
layout: page
title: Express FAQ
menu: starter
lang: pt-br
---

# FAQ

## Como eu devo estruturar minha aplicação?

Não existe uma resposta definitiva para esta questão. Ela depende
ta escala da sua aplicação e do time envolvido. Para ser o mais
flexível possível, o Express não possui premissas em termos de estrutura.

Rotas e outras lógicas específicas da aplicação podem ficar em quantos
arquivos que você desejar, em qualquer estrutura de diretório que você
preferir. Veja os seguintes exemplos para inspiração:

* [Route listings](https://github.com/strongloop/express/blob/4.13.1/examples/route-separation/index.js#L32-47)
* [Route map](https://github.com/strongloop/express/blob/4.13.1/examples/route-map/index.js#L52-L66)
* [MVC style controllers](https://github.com/strongloop/express/tree/master/examples/mvc)

Também, existem extensões de terceiros para o Express, que simplificam alguns destes padrões:

* [Resourceful routing](https://github.com/expressjs/express-resource)

## Como eu defino modelos?

Express não tem noção nenhuma da banco de dados como um todo.
Isto é deixado para módulos do Node de terceiros, permitindo
que você faça interface com quase qualquer banco de dados.

Veja [LoopBack](http://loopback.io) para um framework baseado em Express centrado em modelos.

## Como eu posso autenticar usuários?

Está é uma outra área que o Express não se aventura.
Você pode utilizar qualquer schema de autenticação que desejar.
Para um schema simples de <i>username</i> / <i>password</i>, veja [este exemplo](https://github.com/strongloop/express/tree/master/examples/auth).


## Qual <i>engine</i> de template que o Express suporta?

Express suporta qualquer <i>engine</i> de template que siga a assinatura `(path, locals, callback)`.
Para normalizar a interface e cache de template <i>engine</i>, veja o projeto
[consolidate.js](https://github.com/visionmedia/consolidate.js) para apoio.
<i>Engine</i> de templates não listadas, podem ter a assinatura do Express.

## Como o lidar com 404s?

No Express, 404s não são resultados de erro. Portanto,
o <i>middleware</i> de tratamento de erro não irá capturar 404s.
Isto é porque 404 é simplesmente a ausência de um trabalho adicional;
em outras palavras, Express executou todos os <i>middlewares</i> /
rotas, e não nenhum deles respondeu. Tudo o que você precisa fazer
é adicionar por último um <i>middleware</i> (depois te todos os
outros) para tratar o 404:

<pre><code class="language-javascript" translate="no">
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});
</code></pre>

## Como configurar tratamento de erros?

Você pode definir um <i>middleware</i> para tratamento de erros do mesmo
jeito que os outros <i>middlewares</i>, exceto que com quatro argumentos
ao invés de três; especificamente com a assinatura `(err, req, res, next)`:

<pre><code class="language-javascript" translate="no">
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
</code></pre>

Para mais informações, veja [Tratamento de Erro](/guide/error-handling.html).

## Como eu renderizo HTML puro?

Você não faz! Não tem porque "renderizar" HTML com `res.render()`.
Se você tem um arquivo específico, use `res.sendFile()`.
Se vocês está servindo diversos arquivos de um diretório use o
<i>middleware</i> `express.static()`.
