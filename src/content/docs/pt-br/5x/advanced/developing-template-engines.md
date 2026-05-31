---
title: Desenvolvendo modelos de motores para Express
description: Aprenda a desenvolver motores de modelos personalizados para Express.js usando app.engine(), com exemplos sobre como criar e integrar sua própria lógica de renderização de templates.
---

Use o método `app.engine(ext, callback)` para criar o seu próprio motor de templates. `ext` refere-se à extensão de arquivo, e `callback` é a função template engine que aceita os seguintes itens como parâmetros: a localização do arquivo, o objeto de opções e a função de retorno de chamada.

O código a seguir é um exemplo de implementação de um mecanismo muito simples de template para renderizar arquivos `.ntl`.

```js
const fs = require('fs'); // this engine requires the fs module
app.engine('ntl', (filePath, options, callback) => {
  // define the template engine
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err);
    // this is an extremely simple template engine
    const rendered = content
      .toString()
      .replace('#title#', `<title>${options.title}</title>`)
      .replace('#message#', `<h1>${options.message}</h1>`);
    return callback(null, rendered);
  });
});
app.set('views', './views'); // specify the views directory
app.set('view engine', 'ntl'); // register the template engine
```

Seu aplicativo poderá renderizar arquivos `.ntl`. Crie um arquivo chamado `index.ntl` no diretório `views` com o seguinte conteúdo.

```pug
#title#
#message#
```

Em seguida, crie a seguinte rota no seu app.

```js
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' });
});
```

Quando você fizer uma solicitação à página inicial, `index.ntl` será processado como HTML.
