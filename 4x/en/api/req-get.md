Returns the specified HTTP request header field (case-insensitive match).
The `Referrer` and `Referer` fields are interchangeable.

```js
req.get('Content-Type');
// => "text/plain"

req.get('content-type');
// => "text/plain"

req.get('Something');
// => undefined
```

Aliased as `req.header(field)`.
