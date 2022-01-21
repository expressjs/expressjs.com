---
layout: page
title: Ejemplo "Hello World" de Express
menu: starter
lang: es
---

# Ejemplo Hello world

<div class="doc-box doc-info" markdown="1">
Esta es básicamente la aplicación Express más sencilla que puede crear. Es una aplicación de archivo simple &mdash; *no* lo que obtendrá si utiliza el [generador de Express](/{{ page.lang }}/starter/generator.html), que crea el andamiaje para una aplicación completa con varios archivos JavaScript, plantillas Jade y subdirectorios para distintos propósitos.
</div>

En primer lugar, cree un directorio denominado `myapp`, cámbielo y ejecute `npm init`. A continuación, instale `express` como una dependencia, según se describe en la [guía de instalación](/{{ page.lang }}/starter/installing.html).

En el directorio `myapp`, cree un archivo denominado `app.js` y añada el código siguiente:

<pre>
<code class="language-javascript" translate="no">
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
</code>
</pre>

La aplicación inicia un servidor y escucha las conexiones en el puerto 3000. La aplicación responde con "Hello World!" para las solicitudes al URL raíz (`/`) o a la *ruta* raíz. Para cada vía de acceso diferente, responderá con un error **404 Not Found**.

<div class="doc-box doc-notice" markdown="1">
`req` (solicitud) y `res` (respuesta) son exactamente los mismos objetos que proporciona Node, por lo que puede invocar `req.pipe()`, `req.on('data', callback)` y cualquier otro objeto que invocaría sin estar Express implicado.
</div>

Ejecute la aplicación con el siguiente mandato:

```console
$ node app.js
```

A continuación, cargue [http://localhost:3000/](http://localhost:3000/) en un navegador para ver la salida.

