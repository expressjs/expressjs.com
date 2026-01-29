<h3 id='req.fresh'>req.fresh</h3>

When the response is still "fresh" in the client's cache `true` is returned, otherwise `false` is returned to indicate that the client cache is now stale and the full response should be sent.

When a client sends the `Cache-Control: no-cache` request header to indicate an end-to-end reload request, this module will return `false` to make handling these requests transparent.

Further details for how cache validation works can be found in the
[HTTP/1.1 Caching Specification](https://tools.ietf.org/html/rfc7234).

```js
console.dir(req.fresh)
// => true
```
