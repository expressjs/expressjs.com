---
title: res.clearCookie
description: Clears the cookie with the specified name by sending a Set-Cookie header that sets its expiration date in the past.
menuTitle: res.clearCookie
---

<h3 id='res.clearCookie'>res.clearCookie(name [, options])</h3>

Clears the cookie with the specified `name` by sending a `Set-Cookie` header that sets its expiration date in the past.
This instructs the client that the cookie has expired and is no longer valid. For more information
about available `options`, see [res.cookie()](#res.cookie).

<div class="doc-box doc-warn" markdown="1">
If the `maxAge` or `expires` options are set, the cookie may not be cleared depending on the time values provided,
as Express does not ignore these options. It is therefore recommended to omit these options when calling this
method. Passing these two options has been deprecated since Express v4.20.0.
</div>

<div class="doc-box doc-notice" markdown="1">
Web browsers and other compliant clients will only clear the cookie if the given
`options` is identical to those given to [res.cookie()](#res.cookie), excluding
`expires` and `maxAge`.
</div>

```js
res.cookie('name', 'tobi', { path: '/admin' })
res.clearCookie('name', { path: '/admin' })
```
