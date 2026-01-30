<h3 id='req.stale'>req.stale</h3>

Check if the request is stale - aka Last-Modified and/or the ETag do not match,
indicating that the resource is "stale".

```js
console.dir(req.stale)
// => true
```
