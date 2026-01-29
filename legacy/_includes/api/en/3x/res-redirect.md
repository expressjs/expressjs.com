<h3 id='res.redirect'>res.redirect([status], url)</h3>

Redirect to the given `url` with optional `status` code
defaulting to 302 "Found".

```js
res.redirect('/foo/bar')
res.redirect('http://example.com')
res.redirect(301, 'http://example.com')
res.redirect('../login')
```

Express supports a few forms of redirection, first being
a fully qualified URI for redirecting to a different site:

```js
res.redirect('http://google.com')
```

The second form is the pathname-relative redirect, for example
if you were on `http://example.com/admin/post/new`, the
following redirect to `/admin` would land you at `http://example.com/admin`:

```js
res.redirect('/admin')
```

This next redirect is relative to the `mount` point of the application. For example
if you have a blog application mounted at `/blog`, ideally it has no knowledge of
where it was mounted, so where a redirect of `/admin/post/new` would simply give you
`http://example.com/admin/post/new`, the following mount-relative redirect would give
you `http://example.com/blog/admin/post/new`:

```js
res.redirect('admin/post/new')
```

Pathname relative redirects are also possible. If you were
on `http://example.com/admin/post/new`, the following redirect
would land you at `http//example.com/admin/post`:

```js
res.redirect('..')
```

The final special-case is a `back` redirect, redirecting back to
the Referer (or Referrer), defaulting to `/` when missing.

```js
res.redirect('back')
```
