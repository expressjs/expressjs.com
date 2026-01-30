<h3 id='req.acceptsLanguages'>req.acceptsLanguages([lang, ...])</h3>

Returns the first accepted language of the specified languages,
based on the request's `Accept-Language` HTTP header field.
If none of the specified languages is accepted, returns `false`.

If no `lang` argument is given, then `req.acceptsLanguages()`
returns all languages from the HTTP `Accept-Language` header
as an `Array`.

For more information, or if you have issues or concerns, see [accepts](https://github.com/expressjs/accepts).

Express (4.x) source: [request.js line 179](https://github.com/expressjs/express/blob/4.x/lib/request.js#L179)

Accepts (1.3) source: [index.js line 195](https://github.com/jshttp/accepts/blob/f69c19e459bd501e59fb0b1a40b7471bb578113a/index.js#L195)
