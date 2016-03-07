---
layout: page
title: Instalando o Express
menu: starter
lang: pt-br
---

# Instalação

Assumindo que já tenha instalado o [Node.js](https://nodejs.org/), crie um diretório
para conter o seu aplicativo, e torne-o seu diretório ativo.


<pre>
<code class="language-sh" translate="no">
$ mkdir myapp
$ cd myapp
</code>
</pre>

Use o comando `npm init` para criar um arquivo `package.json` para o seu aplicativo.
Para obter mais informações sobre como o `package.json` funciona,
consulte [Detalhes do tratamento de package.json do npm](https://docs.npmjs.com/files/package.json).

<pre>
<code class="language-sh" translate="no">
$ npm init
</code>
</pre>

Este comando solicita por várias coisas, como o nome e versão do seu aplicativo.
Por enquanto, é possível simplesmente pressionar RETURN para aceitar
os padrões para a maioria deles, com as seguintes exceções:


<pre>
<code class="language-sh" translate="no">
entry point: (index.js)
</code>
</pre>

Insira `app.js`, ou qualquer nome que deseje
para o arquivo principal. Se desejar que seja `index.js`, pressione RETURN para aceitar o nome de
arquivo padrão sugerido.

Agora instale o Express no diretório `app`
e salve-o na lista de dependências. Por exemplo:

<pre>
<code class="language-sh" translate="no">
$ npm install express --save
</code>
</pre>

Para instalar o Express temporariamente não o inclua na lista
de dependências, omita a opção `--save`:

<pre>
<code class="language-sh" translate="no">
$ npm install express
</code>
</pre>

<div class="doc-box doc-info" markdown="1">
Módulos do Node instalados com a opção `--save`
são incluídas na lista `dependencies` no arquivo
`package.json`.
Posteriormente, executando `npm install` no diretório
`app` irá automaticamente instalar os módulos na
lista de dependências.
</div>
