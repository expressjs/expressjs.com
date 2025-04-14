---
layout: page
title: Instalando o Express
description: Learn how to install Express.js in your Node.js environment, including setting up your project directory and managing dependencies with npm.
menu: starter
lang: pt-br
redirect_from: /starter/installing.html
---

# Instalação

Assumindo que já tenha instalado o [Node.js](https://nodejs.org/), crie um diretório
para conter o seu aplicativo, e torne-o seu diretório ativo.

- [Express 4.x](/{{ page.lang }}/4x/api.html) requires Node.js 0.10 or higher.
- [Express 5.x](/{{ page.lang }}/5x/api.html) requires Node.js 18 or higher.

```bash
$ mkdir myapp
$ cd myapp
```

Use o comando `npm init` para criar um arquivo `package.json` para o seu aplicativo.
Para obter mais informações sobre como o `package.json` funciona,
consulte [Detalhes do tratamento de package.json do npm](https://docs.npmjs.com/files/package.json).

```bash
$ npm init
```

Este comando solicita por várias coisas, como o nome e versão do seu aplicativo.
Por enquanto, é possível simplesmente pressionar RETURN para aceitar
os padrões para a maioria deles, com as seguintes exceções:

```
entry point: (index.js)
```

Insira `app.js`, ou qualquer nome que deseje
para o arquivo principal. Se desejar que seja `index.js`, pressione RETURN para aceitar o nome de
arquivo padrão sugerido.

Agora instale o Express no diretório `myapp`
e salve-o na lista de dependências. Por exemplo:

```bash
$ npm install express
```

Para instalar o Express temporariamente não o inclua na lista
de dependências, omita a opção `--save`:

```bash
$ npm install express --save
```

<div class="doc-box doc-info" markdown="1">
Módulos do Node instalados com a opção `--save`
são incluídas na lista `dependencies` no arquivo
`package.json`. Posteriormente, executando `npm install` no diretório
`app` irá automaticamente instalar os módulos na
lista de dependências.
</div>

### [Next: Hello World ](/{{ page.lang }}/starter/hello-world.html)