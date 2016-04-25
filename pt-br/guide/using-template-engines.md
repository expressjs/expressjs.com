---
layout: page
title: Usando mecanismos de modelo com o Express
menu: guide
lang: pt-br
---

# Usando mecanismos de modelo com o Express

Antes do Express poder renderizar arquivos de modelo, as
seguintes configurações do aplicativo devem ser configuradas:

* `views`, é o diretório onde os arquivos de
modelo estão localizados. Por exemplo: `app.set('views',
'./views')`
* `view engine`, o mecanismo de modelo a ser
usado. Por Exemplo: `app.set('view engine', 'jade')`

Em seguida instale o pacote npm correspondente ao mecanismo de modelo:

```sh
$ npm install jade --save
```

<div class="doc-box doc-notice" markdown="1">
Mecanismos de modelo compatíveis com o Express como o Jade exportam
uma função chamada `__express(filePath, options,
callback)`, que é chamada pela função
`res.render()` para renderizar o código de modelo.

Alguns mecanismos de modelo não seguem esta convenção. A
biblioteca [Consolidate.js](https://www.npmjs.org/package/consolidate)
segue esta convenção mapeando todos os mecanismos de modelo populares
do Node.js, e portanto funciona de forma harmoniosa com o Express.
</div>

Após o mecanismo de visualização estar configurado, você não
precisa especificar o mecanismo ou carregar o módulo do mecanismo de
modelo no seu aplicativo; o Express carrega o módulo internamente,
como mostrado abaixo (para o exemplo acima).

```js
app.set('view engine', 'jade');
```

Crie um arquivo de modelo do Jade
chamado `index.jade` no diretório
`views`, com o seguinte conteúdo:

```js
html
  head
    title!= title
  body
    h1!= message
```

Em seguida crie uma rota para renderizar o arquivo
`index.jade`. Se a propriedade `view
engine` não estiver configurada, é preciso especificar a
extensão do arquivo `view`. Caso contrário, é
possível omití-la.

```js
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});
```

Ao fazer uma solicitação à página inicial, o arquivo `index.jade` será renderizado como HTML.

Para aprender mais sobre como mecanismos de modelo funcionam no
Express, consulte: ["Desenvolvendo mecanismos de para o Express"](/{{ page.lang }}/advanced/developing-template-engines.html).
