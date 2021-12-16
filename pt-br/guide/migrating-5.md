---
layout: page
title: Migrando para o Express 5
menu: guide
lang: pt-br
---

# Migrando para o Express 5

<h2 id="overview">Visão Geral</h2>

O Express 5.0 ainda está no estágio de liberação alfa, mas aqui
está uma prévia das mudanças que estarão na liberação e como migrar
seu aplicativo do Express 4 app para o Express 5.

O Express 5 não é muito diferente do Express 4: As mudanças na
API não são tão significantes quanto as do 3.0 para o 4.0.  Apesar de
a API básica permanecer a mesma, ainda existem mudanças disruptivas;
em outras palavras um programa do Express 4 existente pode não
funcionar se você atualizá-lo para usar o Express 5.

Para instalar o alfa mais recente e ter uma prévia do Express
5, digite o seguinte comando no diretório raiz do seu aplicativo:

```console
$ npm install express@5.0.0-alpha.2 --save
```

É possível em seguida executar seus testes automatizados para
verificar o que falha, e corrigir os problemas de acordo com as
atualizações abaixo. Após endereçar as falhas nos testes, execute o
seu aplicativo para verificar quais erros ocorrem. Você descobrirá
imediatamente se o aplicativo utiliza quaisquer métodos ou
propriedades que não são suportados.

<h2 id="changes">Mudanças no Express 5</h2>

Aqui está a lista de mudanças (até a liberação alpha 2) que
irão afetá-lo como um usuário do Express.
Consulte por
[solicitação
de pull](https://github.com/expressjs/express/pull/2237) para obter uma lista de todas funcionalidades
planejadas.

**Métodos e propriedades removidas**

<ul class="doclist">
  <li><a href="#app.del">app.del()</a></li>
  <li><a href="#app.param">app.param(fn)</a></li>
  <li><a href="#plural">Nomes de métodos pluralizados</a></li>
  <li><a href="#leading">Vírgula no início no argumento nome para o  app.param(name, fn)</a></li>
  <li><a href="#req.param">req.param(name)</a></li>
  <li><a href="#res.json">res.json(obj, status)</a></li>
  <li><a href="#res.jsonp">res.jsonp(obj, status)</a></li>
  <li><a href="#res.send.body">res.send(body, status)</a></li>
  <li><a href="#res.send.status">res.send(status)</a></li>
  <li><a href="#res.sendfile">res.sendfile()</a></li>
</ul>

**Mudadas**

<ul class="doclist">
  <li><a href="#app.router">app.router</a></li>
  <li><a href="#req.host">req.host</a></li>
  <li><a href="#req.query">req.query</a></li>
</ul>

**Melhorias**

<ul class="doclist">
  <li><a href="#res.render">res.render()</a></li>
</ul>

<h3>Métodos e propriedades removidas</h3>

Se estiver usando qualquer um desses métodos ou propriedades
no seu aplicativo, ele irá quebrar. Portanto, será necessário alterar
o seu aplicativo após fazer a atualização para a versão 5.

<h4 id="app.del">app.del()</h4>

O Express 5 não suporta mais a função `app.del()`. Se
você usas esta função um erro será lançado. Para registrar rotas HTTP DELETE, use a função `app.delete()` ao invés disso.

Inicialmente `del` era usada ao invés de
`delete`, porque `delete` é uma
palavra-chave reservada no JavaScript. Entretanto, a partir do ECMAScript 6,
`delete` e outras palavras-chave reservadas podem
legalmente ser usadas como nomes de propriedades. É possível ler a
discussão que levou à descontinuação da função `app.del` aqui.

<h4 id="app.param">app.param(fn)</h4>

A assinatura `app.param(fn)` foi usada para
modificar o comportamento da função `app.param(name, fn)`. Ela
foi descontinuada desde a v4.11.0, e o Express 5 não a suporta mais de nenhuma forma.

<h4 id="plural">Nomes de métodos pluralizados</h4>

Os seguintes nomes de métodos podem ser pluralizados. No
Express 4, o uso dos métodos antigos resultava em um aviso de
descontinuação.  O Express 5 não os suporta mais de forma nenhuma:

`req.acceptsCharset()` é substituído por `req.acceptsCharsets()`.

`req.acceptsEncoding()` é substituído por `req.acceptsEncodings()`.

`req.acceptsLanguage()` é substituído por `req.acceptsLanguages()`.

<h4 id="leading">Dois pontos no começo (:) do nome do app.param(name, fn)</h4>

Um caractere de dois pontos (:) no início do nome para a função
`app.param(name, fn)` é um remanescente do Express
3, e para fins de compatibilidade com versões anteriores, o Express 4
suportava-o com um aviso de descontinuação. O Express 5 irá
silenciosamente ignorá-lo e usar o nome do parâmetro sem prefixá-lo
com os dois pontos.

Isso não deve afetar o seu código se você seguiu a documentação
do Express 4 do [app.param](/{{ page.lang }}/4x/api.html#app.param), já que ela não
menciona os dois pontos no início.

<h4 id="req.param">req.param(name)</h4>

Este é um método potencialmente confuso e perigoso de recuperação de dados de formulário foi removido. Você precisará agora especificamente olhar para o nome do parâmetro enviado no objeto `req.params`,
`req.body`, ou `req.query`.

<h4 id="res.json">res.json(obj, status)</h4>

O Express 5 não suporta mais a assinatura `res.json(obj, status)`. Ao
invés disso, configure o status e então encadeie-o ao método `res.json()` assim:
`res.status(status).json(obj)`.

<h4 id="res.jsonp">res.jsonp(obj, status)</h4>

O Express 5 não suporta mais a assinatura `res.jsonp(obj, status)`. Ao invés disso, configure o status e então encadeie-o ao método
`res.jsonp()` assim: `res.status(status).jsonp(obj)`.

<h4 id="res.send.body">res.send(body, status)</h4>

O Express 5 não suporta mais a assinatura `res.send(obj, status)`. Ao invés disso, configure o status e então encadeie-o ao método
`res.send()` assim: `res.status(status).send(obj)`.

<h4 id="res.send.status">res.send(status)</h4>

O Express 5 não suporta mais a assinatura <code>res.send(<em>status</em>)</code>, onde *`status`*
é um número. Ao invés disso, use a função
`res.sendStatus(statusCode)`, que configura o código
do status do cabeçalho de resposta HTTP  e envia a versão de texto do
código: "Não Encontrado", "Erro Interno de Servidor", e assim por
diante.
Se precisar enviar um número usando a função
`res.send()`, coloque o número entre aspas para
converte-lo para um sequência de caracteres, para que o Express não o
interprete como uma tentativa de usar a assinatura antiga não
suportada.

<h4 id="res.sendfile">res.sendfile()</h4>

A função `res.sendfile()` foi substituída pela
versão em formato camel-case `res.sendFile()` no
Express 5.

<h3>Mudadas</h3>

<h4 id="app.router">app.router</h4>

O objeto `app.router`, que foi removido no
Express 4, está de volta no Express 5. Na nove versão, este objeto é
apenas uma referência para o roteador Express base, diferentemente do
Express 3, onde um aplicativo tinha que carregá-lo explicitamente.

<h4 id="req.host">req.host</h4>

No Express 4, a função `req.host`
incorretamente removia o número da porta caso estivesse presente. No
Express 5 o número da porta é mantido.

<h4 id="req.query">req.query</h4>

No Express 4.7 e do Express 5 para frente, o analisador
sintático de consulta pode aceitar `false` para
desativar  a análise sintática de sequência de consulta quando desejar
usar sua própria função para a lógica de análise sintática de
sequência de consultas.

<h3>Melhorias</h3>

<h4 id="res.render">res.render()</h4>

Este método agora impinge comportamento assíncrono  para todos
os mecanismos de visualização, evitando erros causados pelos
mecanismos de visualização que tinham uma implementação síncrona e
que violavam a interface recomendada.
