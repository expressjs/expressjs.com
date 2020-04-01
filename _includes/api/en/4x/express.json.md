<h3 id='express.json' class='h2'>express.json([options])</h3>

<div class="doc-box doc-info" markdown="1">
This middleware is available in Express v4.16.0 onwards.
</div>

This is a built-in middleware function in Express. It parses incoming requests
with JSON payloads and is based on
[body-parser](/resources/middleware/body-parser.html).

Returns middleware that only parses JSON and only looks at requests where
the `Content-Type` header matches the `type` option. This parser accepts any
Unicode encoding of the body and supports automatic inflation of `gzip` and
`deflate` encodings.

A new `body` object containing the parsed data is populated on the `request`
object after the middleware (i.e. `req.body`), or an empty object (`{}`) if
there was no body to parse, the `Content-Type` was not matched, or an error
occurred.

<div class="doc-box doc-warn" markdown="1">
As `req.body`'s shape is based on user-controlled input, all properties and
values in this object are untrusted and should be validated before trusting.
For example, `req.body.foo.toString()` may fail in multiple ways, for example
`foo` may not be there or may not be a string, and `toString` may not be a
function and instead a string or other user-input.
</div>

The following table describes the properties of the optional `options` object.

| Property      | Description                                                           |   Type      | Default         |
|---------------|-----------------------------------------------------------------------|-------------|-----------------|
| `inflate`     | Enables or disables handling deflated (compressed) bodies; when disabled, deflated bodies are rejected. | Boolean | `true` |
| `limit`       | Controls the maximum request body size. If this is a number, then the value specifies the number of bytes; if it is a string, the value is passed to the [bytes](https://www.npmjs.com/package/bytes) library for parsing. | Mixed | `"100kb"` |
| `reviver`     | The `reviver` option is passed directly to `JSON.parse` as the second argument. You can find more information on this argument [in the MDN documentation about JSON.parse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#Example.3A_Using_the_reviver_parameter). | Function | `null` |
| `strict`      | Enables or disables only accepting arrays and objects; when disabled will accept anything `JSON.parse` accepts. | Boolean | `true` |
| `type`        | This is used to determine what media type the middleware will parse. This option can be a string, array of strings, or a function. If not a function, `type` option is passed directly to the [type-is](https://www.npmjs.org/package/type-is#readme) library and this can be an extension name (like `json`), a mime type (like `application/json`), or a mime type with a wildcard (like `*/*` or `*/json`). If a function, the `type` option is called as `fn(req)` and the request is parsed if it returns a truthy value. | Mixed | `"application/json"` |
| `verify`      | This option, if supplied, is called as `verify(req, res, buf, encoding)`, where `buf` is a `Buffer` of the raw request body and `encoding` is the encoding of the request. The parsing can be aborted by throwing an error. | Function | `undefined` |
