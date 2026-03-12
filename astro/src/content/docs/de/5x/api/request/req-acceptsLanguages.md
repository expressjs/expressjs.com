---
title: req.acceptsLanguages
description: Returns the first accepted language of the specified languages,
---

<h3 id='req.acceptsLanguages'>req.acceptsLanguages([lang, ...])</h3>

Returns the first accepted language of the specified languages,
based on the request's `Accept-Language` HTTP header field.
If none of the specified languages is accepted, returns `false`.

If no `lang` argument is given, then `req.acceptsLanguages()`
returns all languages from the HTTP `Accept-Language` header
as an `Array`.

For more information, or if you have issues or concerns, see [accepts](https://github.com/expressjs/accepts).

Express (5.x) source: [request.js line 172](https://github.com/expressjs/express/blob/v5.1.0/lib/request.js#L172)

Accepts (2.0) source: [index.js line 195](https://github.com/jshttp/accepts/blob/2.0.0/index.js#L195)
