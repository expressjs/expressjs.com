---
title: Desarrollar motores de plantillas para Express
description: Aprenda cómo desarrollar motores de plantillas personalizados para Express.js usando app.engine(), con ejemplos de creación e integración de su propia lógica de renderizado de plantillas.
---

Usa el método `app.engine(ext, callback)` para crear tu propio motor de plantillas. `ext` se refiere a la extensión del archivo, y `callback` es la función del motor de plantilla, que acepta los siguientes elementos como parámetros: la ubicación del archivo, el objeto de opciones y la función de devolución de llamada.

El siguiente código es un ejemplo de implementación de un motor de plantillas muy simple para renderizar archivos `.ntl`.

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

Tu aplicación ahora será capaz de procesar archivos `.ntl`. Crea un archivo llamado `index.ntl` en el directorio `views` con el siguiente contenido.

```pug
#title#
#message#
```

Luego, crea la siguiente ruta en tu aplicación.

```js
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' });
});
```

Cuando hagas una solicitud a la página de inicio, `index.ntl` será renderizado como HTML.
