---
layout: page
title: Utilización de motores de plantilla con Express
description: Discover how to integrate and use template engines like Pug, Handlebars, and EJS with Express.js to render dynamic HTML pages efficiently.
menu: guide
redirect_from: "  "
---

# Utilización de motores de plantilla con Express

A _template engine_ enables you to use static template files in your application. At runtime, the template engine replaces
variables in a template file with actual values, and transforms the template into an HTML file sent to the client.
This approach makes it easier to design an HTML page.

The [Express application generator](/{{ page.lang }}/starter/generator.html) uses [Pug](https://pugjs.org/api/getting-started.html) as its default, but it also supports [Handlebars](https://www.npmjs.com/package/handlebars), and [EJS](https://www.npmjs.com/package/ejs), among others.

To render template files, set the following [application setting properties](/{{ page.lang }}/4x/api.html#app.set), in the default `app.js` created by the generator:

- `views`, el directorio donde se encuentran los archivos de plantilla. Ejemplo: `app.set('views', './views')`
  This defaults to the `views` directory in the application root directory.
- `view engine`, el motor de plantilla que se utiliza. Ejemplo: `app.set('view engine', 'pug')`

A continuación, instale el paquete npm de motor de plantilla correspondiente:

```bash
$ npm install pug --save
```

<div class="doc-box doc-notice" markdown="1">
Express-compliant template engines such as Pug export a function named `__express(filePath, options, callback)`,
which `res.render()` calls to render the template code.

Some template engines do not follow this convention. The [@ladjs/consolidate](https://www.npmjs.com/package/@ladjs/consolidate)
library follows this convention by mapping all of the popular Node.js template engines, and therefore works seamlessly within Express.

</div>

After the view engine is set, you don't have to specify the engine or load the template engine module in your app;
Express loads the module internally, for example:

```js
app.set('view engine', 'pug')
```

Cree un archivo de plantilla Pug denominado `index.pug` en el directorio `views`, con el siguiente contenido:

```pug
html
  head
    title= title
  body
    h1= message
```

A continuación, cree una ruta para representar el archivo `index.pug`. Si la propiedad `view engine` no se establece, debe especificar la extensión del archivo `view`. De lo contrario, puede omitirla.

```js
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})
```

Cuando realice una solicitud a la página de inicio, el archivo `index.pug` se representará como HTML.

The view engine cache does not cache the contents of the template's output, only the underlying template itself. The view is still re-rendered with every request even when the cache is on.
