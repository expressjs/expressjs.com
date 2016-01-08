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
