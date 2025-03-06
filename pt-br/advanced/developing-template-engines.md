---
layout: page
title: Desenvolvendo mecanismos de modelo para o Express
menu: advanced
lang: pt-br
description: Learn how to develop custom template engines for Express.js using app.engine(),
  with examples on creating and integrating your own template rendering logic.
---

# Desenvolvendo mecanismos de modelo para o Express

Use o método `app.engine(ext, callback)`
para criar seu próprio mecanismo de modelo. `ext`
refere-se à extensão do arquivo, e  `callback` é a
função de mecanismo de modelo, que aceita os seguintes itens como
parâmetros: a localização do arquivo, o objeto de opções, e a função
de retorno de chamada.

O código a seguir é um exemplo de implementação de um mecanismo
de modelo muito simples para renderização de arquivos `.ntl`.

```js
const fs = require('fs') // this engine requires the fs module
app.engine('ntl', (filePath, options, callback) => { // define the template engine
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(new Error(err))
    // this is an extremely simple template engine
    const rendered = content.toString().replace('#title#', `<title>${options.title}</title>`)
      .replace('#message#', `<h1>${options.message}</h1>`)
    return callback(null, rendered)
  })
})
app.set('views', './views') // specify the views directory
app.set('view engine', 'ntl') // register the template engine
```

Seu aplicativo estará agora habilitado a renderizar arquivos `.ntl`. Crie
um arquivo chamado `index.ntl` no diretório
`views` com o seguinte conteúdo.

```pug
#title#
#message#
```
Em seguida, crie a seguinte rota no seu aplicativo.

```js
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})
```
Ao fazer uma solicitação à página inicial, o `index.ntl` será renderizado como HTML.
