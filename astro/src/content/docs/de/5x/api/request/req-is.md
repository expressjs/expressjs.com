---
title: req.is
description: Returns the matching content type if the incoming request's "Content-Type" HTTP header field
---

<h3 id='req.is'>req.is(type)</h3>

Returns the matching content type if the incoming request's "Content-Type" HTTP header field
matches the MIME type specified by the `type` parameter. If the request has no body, returns `null`.
Returns `false` otherwise.

```js
// With Content-Type: text/html; charset=utf-8
req.is('html'); // => 'html'
req.is('text/html'); // => 'text/html'
req.is('text/*'); // => 'text/*'

// When Content-Type is application/json
req.is('json'); // => 'json'
req.is('application/json'); // => 'application/json'
req.is('application/*'); // => 'application/*'

// Using arrays
// When Content-Type is application/json
req.is(['json', 'html']); // => 'json'

// Using multiple arguments
// When Content-Type is application/json
req.is('json', 'html'); // => 'json'

req.is('html'); // => false
req.is(['xml', 'yaml']); // => false
req.is('xml', 'yaml'); // => false
```

For more information, or if you have issues or concerns, see [type-is](https://github.com/expressjs/type-is).
