The remote IP address of the request.

If the `trust proxy` is setting enabled, it is the upstream address;
see [Express behind proxies](/guide/behind-proxies.html) for more information.

```js
req.ip
// => "127.0.0.1"
```
