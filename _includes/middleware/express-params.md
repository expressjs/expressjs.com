
# express-params

  Express param pre-condition functions.

## Installation

 Works with Express 2.5.x

    $ npm install express-params

## Usage

 Simply invoke the `extend()` method on an express `HTTPServer` to add this functionality.

```javascript
var express = require('express')
  , params = require('express-params')
  , app = express.createServer();

params.extend(app);
```

## RegExp

  Regular expressions can be used to extract data from pathname
  segments as shown below. When matched `req.params.range` contains
  the capture groups of the `regexp.exec()` call.

```javascript
app.param('range', /^(\w+)\.\.(\w+)?$/);

app.get('/range/:range', function(req, res, next){
  var range = req.params.range;
  res.send('from ' + range[1] + ' to ' + range[2]);
});
```

  Another use-case for regular expression parameters is to validate input,
  for example here we may want to route via numeric id, followed by a route
  which will accept other values.

```javascript
app.param('uid', /^[0-9]+$/);

app.get('/user/:uid', function(req, res, next){
  var uid = req.params.uid;
  res.send('user ' + uid);
});

app.get('/user/:name', function(req, res, next){
  var name = req.params.name;
  res.send('user ' + name);
});
```

## Return Value

  Functions with arity < 3 (less than three parameters) are not
  considered to be middleware-style, and are useful for type coercion.
  For example below we pass `Number`, a function which accepts a string coercing to a number, alternatively we could use `parseInt` here. The result of `req.params.id` will then be a number, however if we were to issue `GET /user/tj` the result would be `NaN`, which is considered invalid by `exports.invalidParamReturnValue(val)` so `next('route')` is called, ignoring the route.

```javascript
app.param('id', Number);

app.get('/user/:id', function(req, res, next){
  var id = req.params.id;
  res.send('typeof ' + typeof id + ' ' + id);
});
```

  The following default logic is applied to test if a return value is invalid:

```javascript  
return null == val
  || false === val
  || ('number' == typeof val && isNaN(val));
```

 It's safe to throw in these functions, as connect's router wraps them in a try/catch block, and they are not asynchronous.

## Running Tests

 First install dependencies:
 
     $ npm install -g

 Then run the tests:
 
     $ make test

## License 

(The MIT License)

Copyright (c) 2011 TJ Holowaychuk &lt;tj@vision-media.ca&gt;

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