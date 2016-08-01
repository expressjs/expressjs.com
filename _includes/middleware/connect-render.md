# connect-render [![Build Status](https://secure.travis-ci.org/fengmk2/connect-render.png)](http://travis-ci.org/fengmk2/connect-render) [![Coverage Status](https://coveralls.io/repos/fengmk2/connect-render/badge.png)](https://coveralls.io/r/fengmk2/connect-render)

[![NPM](https://nodei.co/npm/connect-render.png?downloads=true&stars=true)](https://nodei.co/npm/connect-render)

![logo](https://raw.github.com/fengmk2/connect-render/master/logo.png)

Template render helper using [ejs](https://github.com/visionmedia/ejs) for [connect](https://github.com/senchalabs/connect).

Support `connect` @1.8.x, @1.9.x and @2.2.0+ .

## Test connect version

* 1.8.x: 1.8.0 1.8.5 1.8.6 1.8.7
* 1.9.x: 1.9.0 1.9.1 1.9.2
* 2.2.x: 2.2.0 2.2.1 2.2.2
* 2.3.x: 2.3.0 2.3.1 2.3.2 2.3.3 2.3.4 2.3.5 2.3.6 2.3.7 2.3.8 2.3.9
* 2.4.x: 2.4.0 2.4.1 2.4.2 2.4.3 2.4.4 2.4.5 2.4.6
* 2.5.x
* 2.6.x
* 2.7.x
* 2.8.x
* 2.9.x

## Install

```bash
$ npm install connect-render
```

## Usage

```js
var connect = require('connect');
var render = require('connect-render');

var app = connect(
  render({
    root: __dirname + '/views',
    layout: 'layout.html',
    cache: true, // `false` for debug
    helpers: {
      sitename: 'connect-render demo site',
      starttime: new Date().getTime(),
      now: function (req, res) {
        return new Date();
      }
    }
  })
);

app.use(function (req, res) {
  res.render('index.html', { url: req.url });
});

app.listen(8080);
```

## API

### middleware(options)

```js
/**
 * connect-render: Template Render helper for connect
 *
 * Use case:
 *
 * var render = require('connect-render');
 * var connect = require('connect');
 *
 * connect(
 *   render({
 *     root: __dirname + '/views',
 *     cache: true, // must set `true` in production env
 *     layout: 'layout.html', // or false for no layout
 *     open: "<%", // ejs open tag, default is '<%'
 *     close: "%>", // ejs close tag, default is '%>'
 *     helpers: {
 *       config: config,
 *       sitename: 'NodeBlog Engine',
 *       _csrf: function (req, res) {
 *         return req.session ? req.session._csrf : "";
 *       },
 *     }
 *   });
 * );
 *
 * res.render('index.html', { title: 'Index Page', items: items });
 *
 * // no layout
 * res.render('blue.html', { items: items, layout: false });
 *
 * @param {Object} [options={}] render options.
 *  - {String} layout, layout name, default is `'layout.html'`.
 *    Set `layout=''` or `layout=false` meaning no layout.
 *  - {String} root, view files root dir.
 *  - {Boolean} cache, cache view content or not, default is `true`.
 *    Must set `cache = true` on production.
 *  - {String} viewExt, view file extname, default is `''`.
 * @return {Function} render middleware for `connect`
 */
function middleware(options) {}
```

### HttpServerResponse.render(view, options)

```js
/**
 * Render the view fill with options
 *
 * @param {String} view, view name.
 * @param {Object} [options=null]
 *  - {Boolean} layout, use layout or not, default is `true`.
 * @return {HttpServerResponse} this
 */
function render(view, options) {}
```

## Authors

```bash
$ git summary

 project  : connect-render
 repo age : 2 years
 active   : 17 days
 commits  : 45
 files    : 45
 authors  :
    42  fengmk2                 93.3%
     2  tangyao                 4.4%
     1  Jackson Tian            2.2%
```

## License

(The MIT License)

Copyright (c) 2012 - 2014 fengmk2 &lt;fengmk2@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
