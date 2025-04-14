---
layout: página
title: Ejemplo "Hello World" de Express
description: Comienza con Express.js construyendo una sencilla aplicación 'Hola Mundo', demostrando la configuración básica y la creación de servidores para principiantes.
menu: iniciador
lang: es
redirect_from: /starter/hello-world.html
---

# Ejemplo Hello world

<div class="doc-box doc-info" markdown="1">
Esta es básicamente la aplicación Express más sencilla que puede crear. Es una aplicación de archivo simple &mdash; *no* lo que obtendrá si utiliza el [generador de Express](/{{ page.lang }}/starter/generator.html), que crea el andamiaje para una aplicación completa con varios archivos JavaScript, plantillas Jade y subdirectorios para distintos propósitos.
</div>

```js
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res. end('¡Hola Mundo!')
})

app.listen(port, () => {
  console.log(`Ejemplo de aplicación escuchando en el puerto ${port}`)
})
```

La aplicación inicia un servidor y escucha las conexiones en el puerto 3000. La aplicación responde con "Hello World!" para las solicitudes al URL raíz (`/`) o a la _ruta_ raíz. Para cada vía de acceso diferente, responderá con un error **404 Not Found**.

### Ejecutar localmente

En primer lugar, cree un directorio denominado `myapp`, cámbielo y ejecute `npm init`. A continuación, instale `express` como una dependencia, según se describe en la [guía de instalación](/{{ page.lang }}/starter/installing.html).

En el directorio `myapp`, cree un archivo denominado `app.js` y añada el código siguiente:

<div class="doc-box doc-notice" markdown="1">
`req` (solicitud) y `res` (respuesta) son exactamente los mismos objetos que proporciona Node, por lo que puede invocar `req.pipe()`, `req.on('data', callback)` y cualquier otro objeto que invocaría sin estar Express implicado.
</div>

Ejecute la aplicación con el siguiente mandato:

```bash
$ node app.js
```

A continuación, cargue [http://localhost:3000/](http://localhost:3000/) en un navegador para ver la salida.

### [Anterior: Instalar ](/{{ page.lang }}/starter/installing.html)&nbsp;&nbsp;&nbsp;&nbsp;[Siguiente: Express Generator ](/{{ page.lang }}/starter/generator.html)
