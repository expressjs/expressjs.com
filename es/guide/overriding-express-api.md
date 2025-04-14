---
layout: página
title: Reemplazar la API Express
description: Descubra cómo personalizar y extender la API de Express.js reemplazando métodos y propiedades en los objetos de solicitud y respuesta usando prototipos.
menu: guía
lang: es
---

# Reemplazar la API Express

La API Express consiste en varios métodos y propiedades sobre los objetos de solicitud y respuesta. Estos son heredados por prototipo. Hay dos puntos de extensión para la API Express:

1. Los prototipos globales en `express.request` y `express.response`.
2. prototipos específicos de la aplicación en `app.request` y `app.response`.

Alterar los prototipos globales afectará a todas las aplicaciones cargadas Express en el mismo proceso. Si se desea, las alteraciones pueden hacerse específicas de la aplicación sólo modificando los prototipos específicos de la aplicación después de crear una nueva aplicación.

## Métodos

Puede anular la firma y el comportamiento de los métodos existentes con los suyos, asignando una función personalizada.

A continuación se muestra un ejemplo de anular el comportamiento de [res.sendStatus](/4x/api.html#res.sendStatus).

```js
app.response.sendStatus = function (statusCode, type, message) {
  // código es intencionalmente mantenido simple para el propósito de demostración
  devuelve esto. ontentType(type)
    .status(statusCode)
    .send(message)
}
```

La implementación anterior cambia completamente la firma original de `res.sendStatus`. Ahora acepta un código de estado, tipo de codificación, y el mensaje que se enviará al cliente.

El método sobreescrito ahora puede utilizarse de esta manera:

```js
res.sendStatus(404, 'application/json', '{"error":"resource not found"}')
```

## Propiedades

Las propiedades en la API Express son tamaño:

1. Propiedades asignadas (ej: `req.baseUrl`, `req.originalUrl`)
2. Definido como getters (ej: `req.secure`, `req.ip`)

Dado que las propiedades de la categoría 1 se asignan dinámicamente a los objetos `request` y `response` en el contexto del ciclo actual de petición-respuesta, su comportamiento no puede ser anulado.

Las propiedades de la categoría 2 se pueden sobrescribir usando la API Express de extensiones API.

El siguiente código reescribe cómo se derivará el valor de `req.ip`. Ahora, simplemente devuelve el valor de la cabecera de petición `Client-IP`.

```js
Object.defineProperty(app.request, 'ip', {
  configurable: true,
  enumerable: true,
  get () { return this.get('Client-IP') }
})
```

## Prototipo

Para proporcionar la API Express, los objetos de solicitud / respuesta pasados a Express (a través de `app(req, res)`, por ejemplo) necesita heredar de la misma cadena prototipo. Por defecto, esto es `http.IncomingRequest.prototype` para la solicitud y `http.ServerResponse.prototype` para la respuesta.

A menos que sea necesario, se recomienda que esto se haga únicamente a nivel de aplicación, en lugar de a nivel global. Además, tenga cuidado de que el prototipo que se está utilizando coincida con la funcionalidad lo más cerca posible de los prototipos predeterminados.

```js
// Usar FakeRequest y FakeResponse en lugar de http.IncomingRequest y http.ServerResponse
// para la referencia de la aplicación dada
Object.setPrototypeOf(Object.getPrototypeOf(app.request), FakeRequest.prototype)
Object.setPrototypeOf(Object.getPrototypeOf(app.response), FakeResponse.prototype)
```
