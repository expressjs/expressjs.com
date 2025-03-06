---
layout: page
title: Desarrollo de motores de plantilla para Express
menu: advanced
lang: es
description: Learn how to develop custom template engines for Express.js using app.engine(),
  with examples on creating and integrating your own template rendering logic.
---

# Desarrollo de motores de plantilla para Express

Utilice el método `app.engine(ext, callback)` para crear su propio motor de plantilla. `ext` hace referencia a la extensión de archivo y `callback` es la función de motor de plantilla, que acepta los siguientes elementos como parámetros: la ubicación del archivo, el objeto options y la función callback.

El siguiente código es un ejemplo de implementación de un motor de plantilla muy simple para la representación de archivos `.ntl`.

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

La aplicación ahora podrá representar archivos `.ntl`. Cree un archivo denominado `index.ntl` en el directorio `views` con el siguiente contenido.

```pug
#title#
#message#
```
A continuación, cree la ruta siguiente en la aplicación.

```js
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})
```
Cuando realice una solicitud a la página de inicio, `index.ntl` se representará como HTML.
