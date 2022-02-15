<h3 id='req.range'>req.range(size[, options])</h3>

`Range` header parser.

The `size` parameter is the maximum size of the resource.

The `options` parameter is an object that can have the following properties.

| Property    | Type |  Description                                                     |
|-------------|-------------------------------------------------------------------------|
| `combine`   | Boolean | Specify if overlapping & adjacent ranges should be combined, defaults to `false`. When `true`, ranges will be combined and returned as if they were specified that way in the header.

An array of ranges will be returned or negative numbers indicating an error parsing.

* `-2` signals a malformed header string
* `-1` signals an unsatisfiable range

```js
// parse header from request
const range = req.range(1000)

// the type of the range
if (range.type === 'bytes') {
  // the ranges
  range.forEach((r) => {
    // do something with r.start and r.end
  })
}
```
