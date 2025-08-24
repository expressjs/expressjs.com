<h3 id='req.fresh'>req.fresh</h3>

When the response is still "fresh" in the client's cache `true` is returned, otherwise `false` is returned to indicate that the client cache is now stale and the full response should be sent.

In order to check whether the response is still "fresh" in the client's cache or not, two tags will be used ETag and If-None-Match. ETag will be fetched from response (saved internally from application) and other tag will be received from client's request.

When a client sends the `Cache-Control: no-cache` request header to indicate an end-to-end reload request, this module will return `false` to make handling these requests transparent.

Further details for how cache validation works can be found in the
[HTTP/1.1 Caching Specification](https://tools.ietf.org/html/rfc7234).

```js

// Get value for ETag where you saved it initially, In general you 
// may use a file to store timestamps with API request name

res.set('ETag', "foo")
console.dir(req.fresh)
// => true
```
