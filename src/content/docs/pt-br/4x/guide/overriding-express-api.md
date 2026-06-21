---
title: Sobrescrevendo a API Expresso
description: Descubra como personalizar e estender a API do Express.js substituindo métodos e propriedades nos objetos de solicitação e resposta usando protótipos.
---

A API do Expresso consiste de vários métodos e propriedades nos objetos de solicitação e resposta. Estas são herdadas pelo protótipo. Há dois pontos de extensão para a API Express:

1. Os protótipos globais em `express.request` e `express.response`.
2. Protótipos específicos de aplicativo em `app.request` e `app.response`.

Alterar os protótipos globais afetará todos os aplicativos do Express carregados no mesmo processo. Se desejar, alterações podem ser feitas especificamente no aplicativo, alterando apenas os protótipos específicos do aplicativo após criar um novo aplicativo.

## Métodos

Você pode substituir a assinatura e o comportamento dos métodos existentes com o seu próprio, atribuindo uma função personalizada.

A seguir é um exemplo de substituição do comportamento de [res.sendStatus](/api#res.sendStatus).

```js
app.response.sendStatus = function (statusCode, type, message) {
  // code is intentionally kept simple for demonstration purpose
  return this.contentType(type).status(statusCode).send(message);
};
```

A implementação acima altera completamente a assinatura original de `res.sendStatus`. Agora aceita um código de estado, um tipo de codificação e a mensagem a ser enviada ao cliente.

O método sobrescrito agora pode ser usado dessa maneira:

```js
res.sendStatus(404, 'application/json', '{"error":"resource not found"}');
```

## propriedades

As propriedades da API Expresso também são:

1. Propriedades atribuídas (ex: `req.baseUrl`, `req.originalUrl`)
2. Definido como getters (ex: `req.secure`, `req.ip`)

Uma vez que as propriedades da categoria 1 são dinamicamente atribuídas aos objetos `request` e `response` no contexto do ciclo atual de resposta de solicitação, seu comportamento não pode ser substituído.

As propriedades da categoria 2 podem ser substituídas usando a API de extensões de API Express.

O código a seguir reescreve como o valor de `req.ip` deve ser derivado. Agora, ele simplesmente retorna o valor do cabeçalho de solicitação `Client-IP`.

```js
Object.defineProperty(app.request, 'ip', {
  configurable: true,
  enumerable: true,
  get() {
    return this.get('Client-IP');
  },
});
```

## Protótipo

Para fornecer a API Express, os objetos de solicitação/resposta passados para Express (via `app(req, res)`, por exemplo) precisam herdar do mesmo tipo de cadeia. Por padrão, isto é `http.IncomingRequest.prototype` para a solicitação e `http.ServerResponse.prototype` para a resposta.

Se necessário, recomenda-se que isso seja feito apenas a nível da aplicação, e não a nível global. Além disso, tenha cuidado para que o protótipo usado corresponda à funcionalidade o mais próximo possível dos protótipos padrão.

```js
// Use FakeRequest and FakeResponse in place of http.IncomingRequest and http.ServerResponse
// for the given app reference
Object.setPrototypeOf(Object.getPrototypeOf(app.request), FakeRequest.prototype);
Object.setPrototypeOf(Object.getPrototypeOf(app.response), FakeResponse.prototype);
```
