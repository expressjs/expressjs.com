<h3 id='req.protocol'>req.protocol</h3>

Contains the request protocol string: either `http` or (for TLS requests) `https`.

When the [`trust proxy` setting](#trust.proxy.options.table) does not evaluate to `false`,
this property will use the value of the `X-Forwarded-Proto` header field if present.
This header can be set by the client or by the proxy.

```js
console.dir(req.protocol)
// => "http"
```
