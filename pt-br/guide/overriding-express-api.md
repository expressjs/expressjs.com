---
layout: page
title: Sobrescrevendo a API Express
description: Descubra como personalizar e estender a API do Express.js substituindo métodos e propriedades nos objetos de solicitação e resposta usando protótipos.
menu: guide
order: 4
---

# Sobrescrevendo a API Express

A API do Express consiste de vários métodos e propriedades nos objetos de solicitação e resposta. Estas são herdadas pelo protótipo. Há dois pontos de extensão para a API Express:

1. Os protótipos globais em `express.request` e `express.response`.
2. App-specific prototypes at `app.request` and `app.response`.

Altering the global prototypes will affect all loaded Express apps in the same process. If desired, alterations can be made app-specific by only altering the app-specific prototypes after creating a new app.

## Métodos

You can override the signature and behavior of existing methods with your own, by assigning a custom function.

A seguir é um exemplo de substituição do comportamento de [res.sendStatus](/4x/api.html#res.sendStatus).

```js
app.response.sendStatus = function (statusCode, type, message) {
  // code is intentionally kept simple for demonstration purpose
  return this.contentType(type)
    .status(statusCode)
    .send(message)
}
```

The above implementation completely changes the original signature of `res.sendStatus`. It now accepts a status code, encoding type, and the message to be sent to the client.

O método sobrescrito agora pode ser usado dessa maneira:

```js
res.sendStatus(404, 'application/json', '{"error":"resource not found"}')
```

## Propriedades

As propriedades da API Express também são:

1. Propriedades atribuídas (ex: `req.baseUrl`, `req.originalUrl`)
2. Definido como getters (ex: `req.secure`, `req.ip`)

Since properties under category 1 are dynamically assigned on the `request` and `response` objects in the context of the current request-response cycle, their behavior cannot be overridden.

Properties under category 2 can be overwritten using the Express API extensions API.

The following code rewrites how the value of `req.ip` is to be derived. Now, it simply returns the value of the `Client-IP` request header.

```js
Object.defineProperty(app.request, 'ip', {
  configurable: true,
  enumerable: true,
  get () { return this.get('Client-IP') }
})
```

## Prototype

In order to provide the Express API, the request/response objects passed to Express (via `app(req, res)`, for example) need to inherit from the same prototype chain. By default, this is `http.IncomingRequest.prototype` for the request and `http.ServerResponse.prototype` for the response.

Unless necessary, it is recommended that this be done only at the application level, rather than globally. Also, take care that the prototype that is being used matches the functionality as closely as possible to the default prototypes.

```js
// Use FakeRequest and FakeResponse in place of http.IncomingRequest and http.ServerResponse
// for the given app reference
Object.setPrototypeOf(Object.getPrototypeOf(app.request), FakeRequest.prototype)
Object.setPrototypeOf(Object.getPrototypeOf(app.response), FakeResponse.prototype)
```
