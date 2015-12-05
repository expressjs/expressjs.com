---
layout: page
title: Migrando para o Express 5
menu: guide
lang: pt-br
---

# Migrando para o Express 5

<h2 id="overview">Visão Geral</h2>

Express 5.0 ainda está em versão <i>alfa</i>, mas aqui está uma visualização das alterações e como migrar seu aplicativo Express 4 para Express 5.

Express 5 não é muito diferente do Express 4: as alterações da API não são tão significativas como a da 3.0 para a 4.0. Embora a API básica permaneça a mesma, ainda existem alterações significativas; em outras palavras um programa existente usando o Express 4 pode não funcionar se você atualizá-lo para usar o Express 5.

Para instalar o mais recente <i>alpha</i> e visualizar o Express 5, digite o seguinte comando no diretório raiz do aplicativo:

<pre><code class="language-sh" translate="no">
$ npm install express@5.0.0-alpha.2 --save
</code></pre>

Você pode então executar testes automatizados para ver o que falhou e corrigir problemas de acordo com as atualizações listadas abaixo. Depois de enfrentar falhas de teste, execute seu app para ver erros que ocorrem. Você vai descobrir agora mesmo se o aplicativo usa quaisquer métodos ou propriedades que não são suportadas.

<h2 id="changes">Mudanças do Express 5</h2>

Aqui está a lista de mudanças (no momento do lançamento do alfa 2) que irá afetá-lo como um usuário do Express.
Veja a [pull request](https://github.com/strongloop/express/pull/2237) para obter uma lista de todos os recursos planejados.

**Métodos e Propriedades foram removidos**

<ul class="doclist">
  <li><a href="#app.del">app.del()</a></li>
  <li><a href="#app.param">app.param(fn)</a></li>
  <li><a href="#plural">Nomes de método pluralizados</a></li>
  <li><a href="#leading">Dois pontos iniciais no argumento nome para app.param(name, fn)</a></li>
  <li><a href="#req.param">req.param(name)</a></li>
  <li><a href="#res.json">res.json(obj, status)</a></li>
  <li><a href="#res.jsonp">res.jsonp(obj, status)</a></li>
  <li><a href="#res.send.body">res.send(body, status)</a></li>
  <li><a href="#res.send.status">res.send(status)</a></li>
  <li><a href="#res.sendfile">res.sendfile()</a></li>
</ul>

**Mudou**

<ul class="doclist">
  <li><a href="#app.router">app.router</a></li>
  <li><a href="#req.host">req.host</a></li>
  <li><a href="#req.query">req.query</a></li>
</ul>

**Melhorias**

<ul class="doclist">
  <li><a href="#res.render">res.render()</a></li>
</ul>

<h3>Propriedades e métodos removidos</h3>

Se você usar qualquer um desses métodos ou propriedades em seu aplicativo, ele irá travar. Então, você precisará alterar seu aplicativo após você atualizar para a versão 5.

<h4 id="app.del">app.del()</h4>

Express 5 não oferece mais suporte a função `app.del()`. Se você usar essa função é gerado um erro. Para registrar rotas HTTP DELETE, use a função `app.delete()`.

Inicialmente, `del` foi usado em vez de `delete`, porque 'delete' é uma palavra reservada em JavaScript. No entanto, a partir do ECMAScript 6, `delete` e outra palavras-chave reservadas podem legalmente ser usadas como nomes de propriedade. Você pode ler a discussão que levou para a substituição da função `app.del` aqui.

<h4 id="app.param">app.param(fn)</h4>

A assinatura de `app.param(fn)` foi usada para modificar o comportamento da função `app.param(name, fn)`. Isso foi preterido desde v4.11.0, e Express 5 já não oferece suporte a ele em tudo.

<h4 id="plural">Nomes de método pluralizados</h4>

Os seguintes nomes de método estavam pluralizados. No Express 4, usar os métodos antigos resultou em um aviso de substituição. Express 5 não oferece mais suporte em tudo:

`req.acceptsCharset()` é substituído por `req.acceptsCharsets()`.

`req.acceptsEncoding()` é substituído por `req.acceptsEncodings()`.

`req.acceptsLanguage()` é substituído por `req.acceptsLanguages()`.

<h4 id="leading">Dois pontos (:) iniciais no argumento nome para app.param(name, fn)</h4>

Um caractere de dois pontos (:) iniciando no nome da função `app.param(name, fn)` é um remanescente da Express 3, e por uma questão compatibilidade, Express 4 suporta com um aviso de substituição. Express 5 silenciosamente irá ignorá-lo e usar o parâmetro de nome sem prefixá-lo com dois-pontos.

Isso não deve afetar seu código se você seguir a documentação do Express 4 em [app.param](/{{page.lang}}/4x/api.html#app.param), como ele não menciona os dois pontos iniciais.

<h4 id="req.param">req.param(name)</h4>

Esse método potencialmente confuso e perigoso de recuperação de dados de formulário foi removido. Agora você precisará olhar especificamente para o nome do parâmetro enviado no objeto `req.params`, `req.body`, ou `req.query`.

<h4 id="res.json">res.json(obj, status)</h4>

Express 5 não oferece mais suporte a assinatura `res.json(obj, status)`. Em vez disso, defina o status e encadei-o em seguida para o método `res.json()`, assim: `res.status(status).json(obj)`.

<h4 id="res.jsonp">res.jsonp(obj, status)</h4>

Express 5 não oferece mais suporte a assinatura `res.jsonp(obj, status)`. Em vez disso, defina o status e encadei-o em seguida para o método `res.jsonp()`, assim: `res.status(status).jsonp(obj)`.

<h4 id="res.send.body">res.send(body, status)</h4>

Express 5 não oferece mais suporte a assinatura `res.send(obj, status)`. Em vez disso, defina o status e encadei-o em seguida para o método `res.send()`, assim: `res.status(status).send(obj)`.

<h4 id="res.send.status">res.send(status)</h4>

Express 5 não oferece mais suporte a assinatura <code>res.send(<em>status</em>)</code>, onde _`status`_ é um número. Em vez disso, use a função `res.sendStatus(statusCode)`, o que define o código de status HTTP cabeçalho de resposta e envia a versão texto do código: "Not Found", "Internal Server Error", e assim por diante.
Se você precisa enviar um número usando a função `res.send()`, cite o número para convertê-lo para uma <i>string</i>, para que o Express não interprete-o como uma tentativa de usar a não suportada assinatura antiga.

<h4 id="res.sendfile">res.sendfile()</h4>

A função `res.sendfile()` foi substituído por uma versão camel-case `res.sendFile()` no Express 5.

<h3>Mudou</h3>

<h4 id="app.router">app.router</h4>

O objeto `app.router`, cujo foi removido no Express 4, fez um retorno no Express 5. Na nova versão, este objeto é apenas uma referência para o roteamento básico do Express, ao contrário do Express 3, onde tinha um app para carregá-lo explicitamente.

<h4 id="req.host">req.host</h4>

No Express 4, a função `req.host` incorretamente tirou o número da porta se ele estava presente. No Express 5 o número da porta é mantido.

<h4 id="req.query">req.query</h4>

Em Express 4.7 e Express 5 (em diante), a opção de query parser pode aceitar `false` para desabilitar a análise de caracteres de consulta, quando você quiser usar sua própria função para a consulta lógica de análise de caracteres.

<h3>Melhorias</h3>

<h4 id="res.render">res.render()</h4>

Este método agora impõe o comportamento assíncrono para todas as <i>view engines</i>, evitando erros causados por <i>view engines</i> que tinham uma implementação síncrona e que violavam a interface recomendada.
