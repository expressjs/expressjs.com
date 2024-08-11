---
layout: page
title: New Features in 3.x
menu: guide
lang: en
redirect_from: "/guide/new-features-in-3x.html"
---
# New Features in 3.x
## Express

-   `express.application` prototype
-   `express.request` prototype
-   `express.response` prototype

## Application

-   `app.head()` support
-   `app.locals` object (`app.locals.foo = 'bar'`)
-   `app.locals(obj)` (`app.locals({ foo: 'bar', bar: 'baz'})`)
-   `app.render(name[, options], callback)` to render app-level views
-   `app.engine(ext, callback)` to map template engines

## Settings

-   `trust proxy` setting enables the use of "X-Forwarded-Proto" for `req.protocol` and `res.redirect` url construction
-   `json spaces` setting enables the developer to decide if `res.json()` responds with nicely formatted JSON or compact json (this value is passed to `JSON.stringify()`)
-   `json replacer` setting is a callback which is passed to `JSON.stringify()` in `res.json()` allowing you to manipulate and filter the JSON response

## Request

-   `req.path` the request pathname
-   `req.protocol` returns the protocol string "http" or "https" (supports X-Forwarded-Proto via `trust proxy` setting)
-   `req.get(field)` gets a request header field value (`req.get('Host')`)
-   `req.accepts(type)` improved
-   `req.accepts(types)` added, returns the most viable type
-   `req.accepted` array of parsed **Accept** values sorted by quality
-   `req.acceptsCharset(charset)` added
-   `req.acceptedCharsets` array of parsed **Accept-Charset** values sorted by quality
-   `req.acceptsLanguage(lang)` added
-   `req.acceptedLanguages` array of parsed **Accept-Language** values sorted by quality
-   `req.signedCookies` object containing signed cookies
-   `req.stale` to see if a request is stale (based on ETag/Last-Modified)
-   `req.fresh` to complement `req.stale`
-   `req.ips` to return an array of X-Forwarded-For values when "trust proxy" is enabled
-   `req.ip` return the upstream addr in `req.ips` or `req.connection.remoteAddress`
-   `req.range(size)` parses the Range header field

## Response

-   `res.get(field)` gets a response header field value (`res.get('Content-Length')`)
-   `res.set(field, value)` sets a response header field (`res.set('Content-Length', n)`)
-   `res.set(obj)` set several field values
-   `res.type(path)` alias of previous `res.contentType(path)`, allows `res.type('json')`, `res.type('application/x-whatever')`
-   `res.format(obj)` to format responses based on qvalue-sorted Accept
-   JSON cookie support (`res.cookie('cart', { ids: [1,2,3] })`, `req.cookies.cart.ids`)
-   signed cookie support (`res.cookie(name, value, { signed: true })`)
-   `res.format(obj)` for content-negotiation
-   `res.locals` object (`res.locals.foo = 'bar'`)
-   `res.locals(obj)` (`res.locals({ foo: 'bar', bar: 'baz')`)
-   `res.redirect()` X-Forwarded-Proto support
-   `res.redirect()` relative support (`res.redirect('../new')`, `res.redirect('./edit')`, etc)
-   `res.links(obj)` set the "Link" header field with the given links
-   `res.jsonp([status], obj)` was added for explicit JSONP support