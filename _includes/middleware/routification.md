# Routification [![Build Status](https://travis-ci.org/expressjs/routification.png)](https://travis-ci.org/expressjs/routification)

Turn any connect app into an Express-like router.
In the future, Express will be a Routification instance.
Unlike Express 3.0, each route is its own middleware.
You will probably see a very insigificant performance drop,
but there's no more implicit `app.use(app.router)` you have to worry about.

Routification is built on [path-to-regexp](https://github.com/component/path-to-regexp).
If you have any issues with path matching,
please open an issue in that repository instead.

Routification assumes you've `npm install connect` yourself.
It does not rely on `connect` itself.

## API

### var app = routification([app], [options])

`app` is an optional `connect` instance.
`options` are passed to [path-to-regexp](https://github.com/component/path-to-regexp#pathtoregexppath-keys-options).

```js
var routify = require('routification')
var app = routify()
var app = routify(connect())
var app = routify({
  sensitive: true
})
var app = routify(connect(), {
  sensitive: true
})
```

### app\[VERB](path || regexp, middleware...)

Verb can be any HTTP method supported by node.
`delete` is also aliased as `del`.
Each `middleware` should have a signature of `(req, res)` or `(req, res, next)`.

Note: if the request method is `HEAD`,
it will also match any `GET` routes as well.
To match `HEAD` and not `GET`,
do `app.head()` before any `app.get()`.

### app.all(path || regexp, middleware...)

Will match any request with the given path or regexp.

### License

The MIT License (MIT)

Copyright (c) 2013 Jonathan Ong me@jongleberry.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
