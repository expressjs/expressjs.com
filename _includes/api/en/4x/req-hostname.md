<h3 id='req.hostname'>req.hostname</h3>

Contains the hostname derived from the `Host` HTTP header.

When the [`trust proxy` setting](/4x/api.html#trust.proxy.options.table) does not evaluate to `false`,
this property will instead have the value of the `X-Forwarded-Host` header field.
This header can be set by the client or by the proxy.

```js
// Host: "example.com:3000"
req.hostname
// => "example.com"
```
