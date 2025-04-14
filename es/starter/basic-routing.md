---
layout: página
title: Direccionamiento básico de Express
description: Aprenda los fundamentos de la enrutamiento en aplicaciones Express.js, incluyendo cómo definir rutas, manejar métodos HTTP y crear manejadores de rutas para su servidor web.
menu: iniciador
lang: es
redirect_from: /starter/basic-routing.html
---

# Direccionamiento básico

El _direccionamiento_ hace referencia a la determinación de cómo responde una aplicación a una solicitud de cliente en un determinado punto final, que es un URI (o una vía de acceso) y un método de solicitud HTTP específico (GET, POST, etc.).

Cada ruta puede tener una o varias funciones de manejador, que se excluyen cuando se correlaciona la ruta.

La definición de ruta tiene la siguiente estructura:

```js
app.METHOD(PATH, HANDLER)
```

Donde:

- `app` es una instancia de `express`.
- `METHOD` es un [método de solicitud HTTP](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol).
- `PATH` es una vía de acceso en el servidor.
- `HANDLER` es la función que se ejecuta cuando se correlaciona la ruta.

<div class="doc-box doc-notice" markdown="1">
En esta guía de aprendizaje se supone que se crea una instancia de `express` denominada `app` y que el servidor está en ejecución. Si no está familiarizado con la creación y el inicio de una aplicación, consulte el [Ejemplo Hello world](/{{ page.lang }}/starter/hello-world.html).
</div>

El siguiente ejemplo ilustra la definición de rutas simples.

Responda con `Hello World!` en la página inicial:

```js
app.get('/', (req, res) => {
  res.send('¡Hola Mundo!')
})
```

Responda a la solicitud POST en la ruta raíz (`/`), la página de inicio de la aplicación:

```js
app.post('/', (req, res) => {
  res.send('Obtiene una solicitud POST')
})
```

Responda a una solicitud PUT en la ruta `/user`:

```js
app.put('/user', (req, res) => {
  res.send('Obtener una solicitud PUT en /user')
})
```

Responda a una solicitud DELETE en la ruta `/user`:

```js
app.delete('/user', (req, res) => {
  res.send('Obtuvo una solicitud DELETE en /user')
})
```

Para obtener más detalles sobre el direccionamiento, consulte la [guía de direccionamiento](/{{ page.lang }}/guide/routing.html).

### [Anterior: generador de aplicaciones exprés ](/{{ page.lang }}/starter/generator.html)&nbsp;&nbsp;&nbsp;&nbsp;[Siguiente: expandiendo archivos estáticos en Express ](/{{ page.lang }}/starter/static-files.html)