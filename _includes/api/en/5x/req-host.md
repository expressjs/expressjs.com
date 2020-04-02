<h3 id='req.host'>req.host</h3>

Contains the host derived from the `Host` HTTP header.

When the [`trust proxy` setting](api.html#app.settings.table)
does not evaluate to `false`, this property will instead get the value
from the `X-Forwarded-Host` header field. This header can be set by
the client or by the proxy.

If there is more than one `X-Forwarded-Host` header in the request, the
value of the first header is used. This includes a single header with
comma-separated values, in which the first value is used.

```js
// Host: "example.com:3000"
console.dir(req.host)
// => 'example.com:3000'

// Host: "[::1]:3000"
console.dir(req.host)
// => '[::1]:3000'
```
