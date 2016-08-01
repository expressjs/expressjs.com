# fresh

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Node.js Version][node-version-image]][node-version-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

HTTP response freshness testing

## Installation

```
$ npm install fresh
```

## API

```js
var fresh = require('fresh')
```

### fresh(req, res)

 Check freshness of `req` and `res` headers.

 When the cache is "fresh" __true__ is returned,
 otherwise __false__ is returned to indicate that
 the cache is now stale.

## Known Issues

This module is designed to only following the HTTP specifications,
not to work-around all kinda of client bugs (especially since this
module typically does not recieve enough information to understand
what the client actually is).

There is a known issue that in certain versions of Safari, Safari
will incorrectly make a request that allows this module to validate
freshness of the resource even when Safari does not have a
representation of the resource in the cache. The module
[jumanji](https://www.npmjs.com/package/jumanji) can be used in
an Express application to work-around this issue and also provides
links to further reading on this Safari bug.

## Example

```js
var req = { 'if-none-match': 'tobi' };
var res = { 'etag': 'luna' };
fresh(req, res);
// => false

var req = { 'if-none-match': 'tobi' };
var res = { 'etag': 'tobi' };
fresh(req, res);
// => true
```

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/fresh.svg
[npm-url]: https://npmjs.org/package/fresh
[node-version-image]: https://img.shields.io/node/v/fresh.svg
[node-version-url]: https://nodejs.org/en/
[travis-image]: https://img.shields.io/travis/jshttp/fresh/master.svg
[travis-url]: https://travis-ci.org/jshttp/fresh
[coveralls-image]: https://img.shields.io/coveralls/jshttp/fresh/master.svg
[coveralls-url]: https://coveralls.io/r/jshttp/fresh?branch=master
[downloads-image]: https://img.shields.io/npm/dm/fresh.svg
[downloads-url]: https://npmjs.org/package/fresh
