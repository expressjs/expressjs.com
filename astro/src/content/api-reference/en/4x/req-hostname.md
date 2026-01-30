<h3 id='req.hostname'>req.hostname</h3>

Contains the hostname derived from the `Host` HTTP header.

When the [`trust proxy` setting](/4x/api.html#trust.proxy.options.table)
does not evaluate to `false`, this property will instead get the value
from the `X-Forwarded-Host` header field. This header can be set by
the client or by the proxy.

If there is more than one `X-Forwarded-Host` header in the request, the
value of the first header is used. This includes a single header with
comma-separated values, in which the first value is used.

<div class="doc-box doc-info" markdown="1">
Prior to Express v4.17.0, the `X-Forwarded-Host` could not contain multiple
values or be present more than once.
</div>

```js
// Host: "example.com:3000"
console.dir(req.hostname)
// => 'example.com'
```
