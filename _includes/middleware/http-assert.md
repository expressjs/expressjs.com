#http-assert

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

Assert with status codes. Like ctx.throw() in Koa, but with a guard.

##Example
```js
var assert = require('http-assert');
var ok = require('assert');

try {
  assert(username == 'fjodor', 401, 'authentication failed');
} catch (err) {
  ok(err.status == 401);
  ok(err.message == 'authentication failed');
  ok(err.expose);
}
```

##Licence
MIT

[npm-image]: https://img.shields.io/npm/v/http-assert.svg?style=flat-square
[npm-url]: https://npmjs.org/package/http-assert
[travis-image]: https://img.shields.io/travis/jshttp/http-assert.svg?style=flat-square
[travis-url]: https://travis-ci.org/jshttp/http-assert
[coveralls-image]: https://img.shields.io/coveralls/jshttp/http-assert.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/jshttp/http-assert?branch=master
[david-image]: http://img.shields.io/david/jshttp/http-assert.svg?style=flat-square
[david-url]: https://david-dm.org/jshttp/http-assert
[license-image]: http://img.shields.io/npm/l/http-assert.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/http-assert.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/http-assert
