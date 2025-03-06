---
layout: page
title: Direccionamiento básico de Express
menu: starter
lang: es
description: Learn the fundamentals of routing in Express.js applications, including
  how to define routes, handle HTTP methods, and create route handlers for your web
  server.
---

# Direccionamiento básico

El *direccionamiento* hace referencia a la determinación de cómo responde una aplicación a una solicitud de cliente en un determinado punto final, que es un URI (o una vía de acceso) y un método de solicitud HTTP específico (GET, POST, etc.).

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
  res.send('Hello World!')
})
```

Responda a la solicitud POST en la ruta raíz (`/`), la página de inicio de la aplicación:

```js
app.post('/', (req, res) => {
  res.send('Got a POST request')
})
```

Responda a una solicitud PUT en la ruta `/user`:

```js
app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user')
})
```

Responda a una solicitud DELETE en la ruta `/user`:

```js
app.delete('/user', (req, res) => {
  res.send('Got a DELETE request at /user')
})
```

Para obtener más detalles sobre el direccionamiento, consulte la [guía de direccionamiento](/{{ page.lang }}/guide/routing.html).
