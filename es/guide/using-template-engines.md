---
layout: página
title: Utilización de motores de plantilla con Express
description: Descubra cómo integrar y utilizar motores de plantillas como Pug, Handlebars y EJS con Express.js para renderizar páginas HTML dinámicas eficientemente.
menu: guía
lang: es
redirect_from: /guide/using-template-engines.html
---

# Utilización de motores de plantilla con Express

Un _template engine_ le permite usar plantillas estáticas en su aplicación. En tiempo de ejecución, el motor de plantillas reemplaza variables
en un archivo de plantilla con valores reales. y transforma la plantilla en un archivo HTML enviado al cliente.
Este enfoque facilita el diseño de una página HTML.

El [generador de aplicaciones Express](/{{ page.lang }}/starter/generator. tml) usa [Pug](https://pugjs.org/api/getting-started.html) como su valor predeterminado, pero también soporta [Handlebars](https://www.npmjs.com/package/handlebars), y [EJS](https://www.npmjs.com/package/ejs), entre otros.

Para renderizar los archivos de plantilla, establece las siguientes [propiedades de configuración de la aplicación](/{{ page.lang }}/4x/api.html#app.set), en el `app.js` por defecto creado por el generador:

- `views`, el directorio donde se encuentran los archivos de plantilla. Ejemplo: `app.set('views', './views')`
  Esto por defecto es el directorio `views` en el directorio raíz de la aplicación.
- `view engine`, el motor de plantilla que se utiliza. Ejemplo: `app.set('view engine', 'pug')`

A continuación, instale el paquete npm de motor de plantilla correspondiente:

````bash
$ npm install pug --save
```bash

<div class="doc-box doc-notice" markdown="1">
Los motores de plantilla compatibles con Express como, por ejemplo, Pug exportan una función denominada `__express(filePath, options, callback)`, que es invocada por la función `res.render()` para representar el código de plantilla.

Algunos motores de plantilla no siguen esta convención. La biblioteca [Consolidate.js](https://www.npmjs.org/package/consolidate) sigue esta convención correlacionando todos los motores de plantilla de Node.js más conocidos, por lo que funciona de forma ininterrumpida en Express.
</div>

Una vez establecida la propiedad view engine, no tiene que especificar el motor ni cargar el módulo de motor de plantilla en la aplicación; Express carga el módulo internamente, como se muestra a continuación (para el ejemplo anterior).

```js
app.set('view engine', 'pug');
````

<div class="doc-box doc-notice" markdown="1">
Motores de plantillas compatibles con Express, como Pug exportar una función llamada `__express(filePath, options, callback)`,
que `res.render()` llama para renderizar el código de plantilla.

Algunos motores de plantillas no siguen esta convención. La biblioteca [@ladjs/consolidate](https://www.npmjs.com/package/@ladjs/consolidate)
sigue esta convención mapeando todos los motores de plantillas populares de Node.js, y por lo tanto funciona perfectamente dentro de Express.

</div>

Después de que el motor de vista esté definido, no tiene que especificar el motor o cargar el módulo de motor de plantillas en su aplicación;
Express carga el módulo internamente, por ejemplo:

```js
app.set('ver motor', 'pug')
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
  res.render('index', { title: 'Hey', message: '¡Hola!' })
})
```

Cuando realice una solicitud a la página de inicio, el archivo `index.pug` se representará como HTML.

La caché del motor de vistas no almacena en caché el contenido de la salida de la plantilla, sólo la misma plantilla subyacente. La vista todavía se vuelve a procesar con cada petición incluso cuando la caché está encendida.
