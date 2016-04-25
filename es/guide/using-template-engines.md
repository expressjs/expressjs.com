---
layout: page
title: Utilización de motores de plantilla con Express
menu: guide
lang: es
---

# Utilización de motores de plantilla con Express

Para que Express pueda representar archivos de plantilla, deben establecerse los siguientes valores de aplicación:

* `views`, el directorio donde se encuentran los archivos de plantilla. Ejemplo: `app.set('views', './views')`
* `view engine`, el motor de plantilla que se utiliza. Ejemplo: `app.set('view engine', 'jade')`

A continuación, instale el paquete npm de motor de plantilla correspondiente:

```sh
$ npm install jade --save
```

<div class="doc-box doc-notice" markdown="1">
Los motores de plantilla compatibles con Express como, por ejemplo, Jade exportan una función denominada `__express(filePath, options, callback)`, que es invocada por la función `res.render()` para representar el código de plantilla.

Algunos motores de plantilla no siguen esta convención. La biblioteca [Consolidate.js](https://www.npmjs.org/package/consolidate) sigue esta convención correlacionando todos los motores de plantilla de Node.js más conocidos, por lo que funciona de forma ininterrumpida en Express.
</div>

Una vez establecida la propiedad view engine, no tiene que especificar el motor ni cargar el módulo de motor de plantilla en la aplicación; Express carga el módulo internamente, como se muestra a continuación (para el ejemplo anterior).

```js
app.set('view engine', 'jade');
```

Cree un archivo de plantilla Jade denominado `index.jade` en el directorio `views`, con el siguiente contenido:

```js
html
  head
    title!= title
  body
    h1!= message
```

A continuación, cree una ruta para representar el archivo `index.jade`. Si la propiedad `view engine` no se establece, debe especificar la extensión del archivo `view`. De lo contrario, puede omitirla.

```js
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});
```

Cuando realice una solicitud a la página de inicio, el archivo `index.jade` se representará como HTML.

Para obtener más información sobre cómo funcionan los motores de plantilla en Express, consulte: ["Desarrollo de motores de plantilla para Express"](/{{ page.lang }}/advanced/developing-template-engines.html).
