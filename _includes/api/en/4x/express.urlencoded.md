<h3 id='express.urlencoded' class='h2'>express.urlencoded([options])</h3>

<div class="doc-box doc-info" markdown="1">
This middleware is available in Express v4.16.0 onwards.
</div>

This is a built-in middleware function in Express. It parses incoming requests
with urlencoded payloads and is based on [body-parser](/resources/middleware/body-parser.html).

Returns middleware that only parses urlencoded bodies and only looks at
requests where the `Content-Type` header matches the `type` option. This
parser accepts only UTF-8 encoding of the body and supports automatic
inflation of `gzip` and `deflate` encodings.

A new `body` object containing the parsed data is populated on the `request`
object after the middleware (i.e. `req.body`), or an empty object (`{}`) if
there was no body to parse, the `Content-Type` was not matched, or an error
occurred. This object will contain key-value pairs, where the value can be
a string or array (when `extended` is `false`), or any type (when `extended`
is `true`).

<div class="doc-box doc-warn" markdown="1">
As `req.body`'s shape is based on user-controlled input, all properties and
values in this object are untrusted and should be validated before trusting.
For example, `req.body.foo.toString()` may fail in multiple ways, for example
`foo` may not be there or may not be a string, and `toString` may not be a
function and instead a string or other user-input.
</div>

The following table describes the properties of the optional `options` object.

| Property         | Description                                                           |   Type      | Default         |
|------------------|-----------------------------------------------------------------------|-------------|-----------------|
| `extended`       | This option allows to choose between parsing the URL-encoded data with the `querystring` library (when `false`) or the `qs` library (when `true`). The "extended" syntax allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded. For more information, please [see the qs library](https://www.npmjs.org/package/qs#readme). | Boolean | `true` |
| `inflate`        | Enables or disables handling deflated (compressed) bodies; when disabled, deflated bodies are rejected. | Boolean | `true` |
| `limit`          | Controls the maximum request body size. If this is a number, then the value specifies the number of bytes; if it is a string, the value is passed to the [bytes](https://www.npmjs.com/package/bytes) library for parsing. | Mixed | `"100kb"` |
| `parameterLimit` | This option controls the maximum number of parameters that are allowed in the URL-encoded data. If a request contains more parameters than this value, an error will be raised. | Number | `1000` |
| `type`           | This is used to determine what media type the middleware will parse. This option can be a string, array of strings, or a function. If not a function, `type` option is passed directly to the [type-is](https://www.npmjs.org/package/type-is#readme) library and this can be an extension name (like `urlencoded`), a mime type (like `application/x-www-form-urlencoded`), or a mime type with a wildcard (like `*/x-www-form-urlencoded`). If a function, the `type` option is called as `fn(req)` and the request is parsed if it returns a truthy value. | Mixed | `"application/x-www-form-urlencoded"` |
| `verify`         | This option, if supplied, is called as `verify(req, res, buf, encoding)`, where `buf` is a `Buffer` of the raw request body and `encoding` is the encoding of the request. The parsing can be aborted by throwing an error. | Function | `undefined` |
