<h3 id='req.get'>req.get(field)</h3>

Get the case-insensitive request header `field`. The "Referrer" and "Referer" fields are interchangeable.

```js
req.get('Content-Type')
// => "text/plain"

req.get('content-type')
// => "text/plain"

req.get('Something')
// => undefined
```

p Aliased as `req.header(field)`.
