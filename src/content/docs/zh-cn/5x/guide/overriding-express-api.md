---
title: 重写Express API
description: 了解如何通过原型重写请求和响应对象上的方法与属性，来自定义并扩展 Express.js API。
---

Express API 由请求对象和响应对象上的多种方法与属性组成。 这些内容通过原型继承。 Express API 有两个扩展点：

1. `express.request` 和 `express.response` 上的全局原型。
2. 应用专属原型位于 `app.request` 和 `app.response`。

修改全局原型会影响同一进程中所有已加载的 Express 应用。 如果需要，你可以在创建新应用后仅修改应用专属原型，从而实现仅针对当前应用的修改。

## Methods

你可以通过分配自定义函数，使用自己的实现重写现有方法的签名和行为。

Following is an example of overriding the behavior of [res.sendStatus](/en/4x/api#res.sendStatus).

```js
app.response.sendStatus = function (statusCode, type, message) {
  // code is intentionally kept simple for demonstration purpose
  return this.contentType(type).status(statusCode).send(message);
};
```

上述实现彻底更改了`res.sendStatus`原本的方法签名。 该方法现在可接收状态码、编码类型以及要发送给客户端的消息。

重写后的方法现在可以这样使用：

```js
res.sendStatus(404, 'application/json', '{"error":"resource not found"}');
```

## Properties

Express API 中的属性分为两类：

1. 赋值属性（例如：`req.baseUrl`、`req.originalUrl`）
2. 取值器定义属性（例如：`req.secure`、`req.ip`）

由于第一类属性是在当前请求-响应周期的上下文中动态赋值到`request`和`response`对象上的，因此无法重写其行为。

第二类属性可通过 Express API 扩展接口进行重写。

以下代码重写了`req.ip`值的获取方式。 现在，它仅返回 `Client-IP` 请求头的值。

```js
Object.defineProperty(app.request, 'ip', {
  configurable: true,
  enumerable: true,
  get() {
    return this.get('Client-IP');
  },
});
```

## Prototype

为了提供 Express API，传递给 Express 的请求/响应对象（例如通过 `app(req, res)`）需要继承自相同的原型链。 默认情况下，请求对象继承自 `http.IncomingRequest.prototype`，响应对象继承自 `http.ServerResponse.prototype`。

除非必要，否则建议仅在应用层面执行此操作，而非全局层面。 此外，请注意所使用的原型需尽可能与默认原型的功能保持一致。

```js
// Use FakeRequest and FakeResponse in place of http.IncomingRequest and http.ServerResponse
// for the given app reference
Object.setPrototypeOf(Object.getPrototypeOf(app.request), FakeRequest.prototype);
Object.setPrototypeOf(Object.getPrototypeOf(app.response), FakeResponse.prototype);
```
