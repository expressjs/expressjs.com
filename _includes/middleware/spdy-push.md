
# spdy-push

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

A SPDY Push helper to be used with [spdy](https://github.com/indutny/node-spdy).

- Handles `close` events and file descriptor leaks
- Automatically gzips
- Automatically sets the `content-length` and `content-type` headers if it can
- Supports pushing strings, buffers, streams, and files

## Example

```js
var spdy = require('spdy-push');

require('spdy').createServer(require('spdy-keys'), function (req, res) {
  if (res.isSpdy) {
    spdy(res).push('/script.js', {
      filename: 'public/script.js', // resolves against CWD
    }).catch(function (err) {
      console.error(err.stack); // log any critical errors
    })
  }

  res.statusCode = 204;
  res.end();
})
```

## API

### spdy(res).push([path], [options], [priority]).then( => )

- `path` is the path of the object being pushed.
  Can also be set as `options.path`.
- `priority` is the priority between `0-7` of the push stream
  with `7`, the default, being the lowest priority.
  Can also be set as `options.priority`.
- `options` are:
  - `headers`
  - `body` - a `String`, `Buffer`, or `Stream.Readable` body
  - `filename` - a path to a file. Resolves against CWD.

Either `options.body` or `options.filename` must be set.

You do not need to set the following headers:

- `content-encoding`
- `content-length`
- `content-type`

### .then( => )

Waits until the acknowledge event.

### .send().then( => )

Waits until the entire stream has been flushed.

[npm-image]: https://img.shields.io/npm/v/spdy-push.svg?style=flat-square
[npm-url]: https://npmjs.org/package/spdy-push
[github-tag]: http://img.shields.io/github/tag/jshttp/spdy-push.svg?style=flat-square
[github-url]: https://github.com/jshttp/spdy-push/tags
[travis-image]: https://img.shields.io/travis/jshttp/spdy-push.svg?style=flat-square
[travis-url]: https://travis-ci.org/jshttp/spdy-push
[coveralls-image]: https://img.shields.io/coveralls/jshttp/spdy-push.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/jshttp/spdy-push?branch=master
[david-image]: http://img.shields.io/david/jshttp/spdy-push.svg?style=flat-square
[david-url]: https://david-dm.org/jshttp/spdy-push
[license-image]: http://img.shields.io/npm/l/spdy-push.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/spdy-push.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/spdy-push
