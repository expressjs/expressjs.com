---
layout: page
title: Usando mecanismos de modelo com o Express
description: Discover how to integrate and use template engines like Pug, Handlebars, and EJS with Express.js to render dynamic HTML pages efficiently.
menu: guide
lang: pt-br
redirect_from: /guide/using-template-engines.html
---

# Usando mecanismos de modelo com o Express

A _template engine_ enables you to use static template files in your application. At runtime, the template engine replaces
variables in a template file with actual values, and transforms the template into an HTML file sent to the client.
This approach makes it easier to design an HTML page.

The [Express application generator](/{{ page.lang }}/starter/generator.html) uses [Pug](https://pugjs.org/api/getting-started.html) as its default, but it also supports [Handlebars](https://www.npmjs.com/package/handlebars), and [EJS](https://www.npmjs.com/package/ejs), among others.

To render template files, set the following [application setting properties](/{{ page.lang }}/4x/api.html#app.set), in the default `app.js` created by the generator:

- `views`, é o diretório onde os arquivos de
  modelo estão localizados. Por exemplo: `app.set('views',
  './views')`
  This defaults to the `views` directory in the application root directory.
- `view engine`, o mecanismo de modelo a ser
  usado. Por Exemplo: `app.set('view engine', 'pug')`

Em seguida instale o pacote npm correspondente ao mecanismo de modelo:

```bash
$ npm install pug --save
```

<div class="doc-box doc-notice" markdown="1">
Mecanismos de modelo compatíveis com o Express como o Pug exportam
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
app.set('view engine', 'pug')
```

Crie um arquivo de modelo do Pug
chamado `index.pug` no diretório
`views`, com o seguinte conteúdo:

```pug
html
  head
    title= title
  body
    h1= message
```

Em seguida crie uma rota para renderizar o arquivo
`index.pug`. Se a propriedade `view
engine` não estiver configurada, é preciso especificar a
extensão do arquivo `view`. Caso contrário, é
possível omití-la.

```js
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})
```

Ao fazer uma solicitação à página inicial, o arquivo `index.pug` será renderizado como HTML.

The view engine cache does not cache the contents of the template's output, only the underlying template itself. The view is still re-rendered with every request even when the cache is on.
