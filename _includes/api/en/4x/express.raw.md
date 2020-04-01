<h3 id='express.raw' class='h2'>express.raw([options])</h3>

<div class="doc-box doc-info" markdown="1">
This middleware is available in Express v4.17.0 onwards.
</div>

This is a built-in middleware function in Express. It parses incoming request
payloads into a `Buffer` and is based on
[body-parser](/resources/middleware/body-parser.html).

Returns middleware that parses all bodies as a `Buffer` and only looks at requests
where the `Content-Type` header matches the `type` option. This parser accepts
any Unicode encoding of the body and supports automatic inflation of `gzip` and
`deflate` encodings.

A new `body` `Buffer` containing the parsed data is populated on the `request`
object after the middleware (i.e. `req.body`), or an empty object (`{}`) if
there was no body to parse, the `Content-Type` was not matched, or an error
occurred.

<div class="doc-box doc-warn" markdown="1">
As `req.body`'s shape is based on user-controlled input, all properties and
values in this object are untrusted and should be validated before trusting.
For example, `req.body.toString()` may fail in multiple ways, for example
stacking multiple parsers `req.body` may be from a different parser. Testing
that `req.body` is a `Buffer` before calling buffer methods is recommended.
</div>

The following table describes the properties of the optional `options` object.

| Property  | Description                                                           |   Type      | Default         |
|-----------|-----------------------------------------------------------------------|-------------|-----------------|
| `inflate` | Enables or disables handling deflated (compressed) bodies; when disabled, deflated bodies are rejected. | Boolean | `true` |
| `limit`   | Controls the maximum request body size. If this is a number, then the value specifies the number of bytes; if it is a string, the value is passed to the [bytes](https://www.npmjs.com/package/bytes) library for parsing. | Mixed | `"100kb"` |
| `type`    | This is used to determine what media type the middleware will parse. This option can be a string, array of strings, or a function. If not a function, `type` option is passed directly to the [type-is](https://www.npmjs.org/package/type-is#readme) library and this can be an extension name (like `bin`), a mime type (like `application/octet-stream`), or a mime type with a wildcard (like `*/*` or `application/*`). If a function, the `type` option is called as `fn(req)` and the request is parsed if it returns a truthy value. | Mixed | `"application/octet-stream"` |
| `verify`  | This option, if supplied, is called as `verify(req, res, buf, encoding)`, where `buf` is a `Buffer` of the raw request body and `encoding` is the encoding of the request. The parsing can be aborted by throwing an error. | Function | `undefined` |
