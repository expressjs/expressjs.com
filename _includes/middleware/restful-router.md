restful-router [![Build Status](https://travis-ci.org/expressjs/restful-router.svg?branch=master)](http://travis-ci.org/expressjs/restful-router) [![Coverage Status](https://coveralls.io/repos/fengmk2/restful-router/badge.png)](https://coveralls.io/r/fengmk2/restful-router)
=======

[![NPM](https://nodei.co/npm/restful-router.png?downloads=true&stars=true)](https://nodei.co/npm/restful-router/)

![logo](https://raw.github.com/fengmk2/restful-router/master/logo.png)

Simple RESTful url router.

## Install

```bash
$ npm install restful-router
```

## RESTful routes

```js
/**
 * Auto generate RESTful url routes.
 *
 * URL routes:
 *
 *  GET    /users[/]        => user.list()
 *  GET    /users/new       => user.new()
 *  GET    /users/:id       => user.show()
 *  GET    /users/:id/edit  => user.edit()
 *  POST   /users[/]        => user.create()
 *  PATCH  /users/:id       => user.update()
 *  DELETE /users/:id       => user.destroy()
 *
 * @param {Object} options
 *  - {Object} app, must impl `app.get(), app.post(), app.patch(), app.delete()`.
 *  - {String} name, resource's name. like `users, posts, tweets`.
 *  - {Object} controller, controller module contains `CRUD List` methods.
 *  - {String} [baseURL], default is '/'. e.g.: '/posts/:pid/'
 */
function restfulRouter(app, name, mod);
```

## Usage

```js
var restful = require('restful-router');
var connect = require('connect');
var urlrouter = require('urlrouter');
var user = require('./controllers/user');
var foo = require('./controllers/foo');

var server = connect(
  connect.query(),
  connect.bodyParser(),
  urlrouter(function (app) {
    app.get('/', function (req, res) {
      res.end('hello world');
    });

    /**
     * Users REST API
     *
     * GET    /users     => list()
     * GET    /users/:id => show(req.params.id)
     * POST   /users     => create()
     * PATCH  /users/:id => update(req.params.id)
     * DELETE /users/:id => delete(req.params.id)
     */
    restful({
      app: app,
      name: 'users',
      controller: user
    });

    /**
     * Foos REST API
     *
     * GET /users/:uid/foos/:date => show(req.params.uid, req.params.date)
     */
    restful({
      app: app,
      key: 'date',
      baseURL: '/users/:uid',
      name: 'foos',
      controller: foo,
    });

  })
).listen(3000);
```

## License

(The MIT License)

Copyright (c) 2013 fengmk2 &lt;fengmk2@gmail.com&gt;

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
