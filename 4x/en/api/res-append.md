<div class="doc-box doc-info">`res.append()` is supported from Express v4.11.0 onwards</div>

Append additional value `value` to an existing header named `field`; or create the header with the value `value`, if the header is not already set. `value` can be a string or an array of values to be appended.

Note that, calling `res.set()` after `res.append()` will reset the previously set header value.

```js
res.append('Link', ['<http://localhost/>', '<http://localhost:3000/>']);
res.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly');
res.append('Warning', '199 Miscellaneous warning');
```
