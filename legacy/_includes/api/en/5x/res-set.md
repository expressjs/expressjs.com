<h3 id='res.set'>res.set(field [, value])</h3>

Sets the response's HTTP header `field` to `value`.
To set multiple fields at once, pass an object as the parameter.

```js
res.set('Content-Type', 'text/plain')

res.set({
  'Content-Type': 'text/plain',
  'Content-Length': '123',
  ETag: '12345'
})
```

Aliased as `res.header(field [, value])`.
