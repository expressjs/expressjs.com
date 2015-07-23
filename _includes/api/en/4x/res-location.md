<h3 id='res.location'>res.location(path)</h3>

Sets the response `Location` HTTP header field based on the specified `path`
parameter; for example:

~~~js
res.location('/foo/bar');
res.location('foo/bar');
res.location('http://example.com');
res.location('../login');
res.location('back');
~~~

The `path` parameter can be any of the paths as for [res.redirect()](#res.redirect):
an absolute URL, a path relative to application root, a path relative to current mount
path, and so on.

For example, if your application is mounted at `/blog`, the following would set the
`location` header to `/blog/admin`:

~~~js
res.location('admin')
~~~

<div class='doc-box doc-warn' markdown="1">
Express passes the specified URL string as-is to the browser in the `Location` header,
without any validation or manipulation, except in case of `back`.

Browsers take the responsibility of deriving the intended URL from the current URL
or the referring URL, and the URL specified in the `Location` header; and redirect the user accordingly.
</div>
