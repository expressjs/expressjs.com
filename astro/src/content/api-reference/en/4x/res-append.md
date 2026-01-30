<h3 id='res.append'>res.append(field [, value])</h3>

{% include admonitions/note.html content="`res.append()` is supported by Express v4.11.0+" %}
Appends the specified `value` to the HTTP response header `field`.  If the header is not already set,
it creates the header with the specified value.  The `value` parameter can be a string or an array.

{% include admonitions/note.html content="calling `res.set()` after `res.append()` will reset the previously-set header value." %}

```js
res.append('Link', ['<http://localhost/>', '<http://localhost:3000/>'])
res.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly')
res.append('Warning', '199 Miscellaneous warning')
```
