<h3 id='req.accepts'>req.accepts(types)</h3>

Check if the given `types` are acceptable, returning
the best match when true, otherwise `undefined` - in which
case you should respond with 406 "Not Acceptable".

The `type` value may be a single mime type string
such as "application/json", the extension name
such as "json", a comma-delimited list or an array. When a list
or array is given the best match, if any is returned.

```js
// Accept: text/html
req.accepts('html')
// => "html"

// Accept: text/*, application/json
req.accepts('html')
// => "html"
req.accepts('text/html')
// => "text/html"
req.accepts('json, text')
// => "json"
req.accepts('application/json')
// => "application/json"

// Accept: text/*, application/json
req.accepts('image/png')
req.accepts('png')
// => undefined

// Accept: text/*;q=.5, application/json
req.accepts(['html', 'json'])
req.accepts('html, json')
// => "json"
```
