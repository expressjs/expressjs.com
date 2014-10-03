<div class='doc-box doc-warn'>
<p>
Express passes the specified URL string as-is to the browser in the `Location` header, without any validation or manipulation, except in case of `back`.
</p>
<p>
Browsers take the responsibility of deriving the intended URL from the current URL or the referring URL, and the URL specified in the `Location` header; and redirect the user accordingly.
</p>
</div>

Redirect to the given `url` with optional `status` code defaulting to 302 "Found".

```js
res.redirect('/foo/bar');
res.redirect('http://example.com');
res.redirect(301, 'http://example.com');
res.redirect('../login');
```
Redirects can be a fully qualified URI for redirecting to a different site:

```js
res.redirect('http://google.com');
```
Redirects can be relative to the root of the host name. For example, if you were on `http://example.com/admin/post/new`, the following redirect to `/admin` would land you at `http://example.com/admin`:

```js
res.redirect('/admin');
```

Redirects can be relative to the current URL. A redirection of `post/new`, from `http://example.com/blog/admin/` (notice the trailing slash), would  give you `http://example.com/blog/admin/post/new`.

```js
res.redirect('post/new');
```

Redirecting to `post/new` from `http://example.com/blog/admin` (no trailing slash), will take you to `http://example.com/blog/post/new`.

If you found the above behavior confusing, think of path segments as directories (have trailing slashes) and files, it will start to make sense.


Pathname relative redirects are also possible. If you were on `http://example.com/admin/post/new`, the following redirect would land you at `http//example.com/admin/post`:

```js
res.redirect('..');
```

A `back` redirection will redirect the request back to the Referer (or Referrer), defaulting to `/` when missing.

```js
res.redirect('back');    
```
