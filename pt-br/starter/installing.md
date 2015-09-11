---
layout: page
title: Instalando Express
menu: starter
lang: pt-br
---

# Instalando

Assumindo que você já possui o [Node.js](https://nodejs.org/) instalado, crie um diretório que irá conter sua aplicação, e acesse o diretório.

~~~sh
$ mkdir myapp
$ cd myapp
~~~

Execute o comando `npm init` para criar o arquivo `package.json` para sua aplicação.
Para mais informações de como o `package.json` funciona, consulte as [Especificações para manipulação do package.json do npm](https://docs.npmjs.com/files/package.json).

~~~sh
$ npm init
~~~

Este comando pedirá algumas coisas como nome e versão da aplicação.
Por enquanto, você pode apenas apertar ENTER para aceitar os valores <i>default</i> para a maioria, exceto para:

~~~sh
entry point: (index.js)
~~~

Digite `app.js` ou o que você desejar que seja o nome do seu arquivo principal. Se você deseja que seja `index.js`, aperte ENTER para aceitar a sugestão <i>default</i> de nome de arquivo.

Agora instale Express no diretório da aplicação e salve na lista de dependências:

~~~sh
$ npm install express --save
~~~

Para instalar o Express temporariamente, e não adicioná-lo na lista de dependências, omita a opção `--save`:

~~~sh
$ npm install express
~~~

<div class="doc-box doc-info" markdown="1">
Módulos do Node isntalador com a opção `--save` serão adicionados a lista de `dependências` no arquivo `package.json`.
Então utilizando `npm install` no diretório da aplicação irá instalar automaticamente os módulos do lista de dependência.
</div>
