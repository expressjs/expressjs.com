<h3 id='res.location'>res.location</h3>

Set the location header.

```js
res.location('/foo/bar')
res.location('foo/bar')
res.location('http://example.com')
res.location('../login')
res.location('back')
```

You can use the same kind of `urls` as in `res.redirect()`.

For example, if your application is mounted at `/blog`,
the following would set the `location` header to
`/blog/admin`:

```js
res.location('admin')
```
