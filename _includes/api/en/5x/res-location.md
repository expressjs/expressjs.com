<h3 id='res.location'>res.location(path)</h3>

Sets the response `Location` HTTP header to the specified `path` parameter.

```js
res.location('/foo/bar')
res.location('http://example.com')
res.location('back')
```

A `path` value of "back" has a special meaning, it refers to the URL specified in the `Referer` header of the request. If the `Referer` header was not specified, it refers to "/".

<div class='doc-box doc-warn' markdown="1">
After encoding the URL, if not encoded already, Express passes the specified URL to the browser in the `Location` header,
without any validation.

Browsers take the responsibility of deriving the intended URL from the current URL
or the referring URL, and the URL specified in the `Location` header; and redirect the user accordingly.
</div>
