
# express-expose

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

Expose helpers and local variables to the client-side.


## Install

```bash
npm install -S express-expose
```

## Usage

`express@4.x`:

```js
var express = require('express');
var expose = require('express-expose');
app = expose(app);
app.expose(...);
```

`express@3.x` and `express@2.x`:

```js
var express = require('express');
var expose = require('express-expose');
app.expose(...);
```


## Versions

* `express@4.x` (use `express-expose` at `>= 0.3.4`)
* `express@3.x` (use `express-expose` at `>= 0.2.3` and `<= 0.3.3`)
* `express@2.x` (use `express-expose` at `<= 0.2.2`)


## Examples

### Exposing Objects

A common use-case for exposing objects to the client-side would be exposing some properties, perhaps the express configuration. The call to `app.expose(obj)` below defaults to exposing the properties to `app.*`, so for example `app.views`, `app.title`, etc.

```js
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('title', 'Example');
app.set('default language', 'en');

app.expose(app.settings);
```

Another use-case would be exposing helper methods, perhaps the same ones as you are currently exposing to templates. Below we expose the `math` object as utilities to our templates, as well as the client-side. Within a template we would call `add(1,2)`, and on the CS we would call `utils.add(1,2)`, since we have passed the namespace "utils".

```js
var math = { add: function(a,b){ return a + b; } };
app.expose(math, 'utils').helpers(math);
```

Sometimes you might want to output to a different area, so for this we can pass an additional param "languages" which tells express which buffer to write to, which ends up providing us with the local variable "languages" in our template, where the default is "javascript". The "app" string here is the namespace.

```js
app.expose({ en: 'English', fr: 'French' }, 'app', 'languages');
```

You'll then want to output the default buffer (or others) to your template, in Jade this would look something like:

```jade
script!= javascript
```

And in EJS:

```html
<script><%- javascript %></script>
```

### Raw JavaScript

It is also possible to expose "raw" javascript strings.

```js
app.expose('var some = "variable";');
```

Optionally passing the destination buffer, providing us with the "head" local variable, instead of the default of "javascript".

```js
app.expose('var some = "variable";', 'head');
```

### Exposing Functions

Exposing a named function is easy too, simply pass it in with an optional buffer name for placement within a template much like above.

```js
app.expose(function someFunction(){
  return 'yay';
}, 'foot');
```

### Self-Calling Functions

Another alternative is passing an anonymous function, which executes itself, creating a "wrapper" function.

```js
app.expose(function(){
  function notify() {
    alert('this will execute right away :D');
  }
  notify();
});
```

### Request-Level Exposure

Finally we can apply all of the above at the request-level as well, below we expose "app.current.user" as `{ name: 'tj' }`, for the specific request only.

```js
app.get('/', function(req, res){
  var user = { name: 'tj' };
  res.expose(user, 'app.current.user');
  res.render('index', { layout: false });
});
```


## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/express-expose.svg?style=flat
[npm-url]: https://npmjs.org/package/express-expose
[travis-image]: https://img.shields.io/travis/expressjs/express-expose.svg?style=flat
[travis-url]: https://travis-ci.org/expressjs/express-expose
[coveralls-image]: https://img.shields.io/coveralls/expressjs/express-expose.svg?style=flat
[coveralls-url]: https://coveralls.io/r/expressjs/express-expose?branch=master
[downloads-image]: http://img.shields.io/npm/dm/express-expose.svg?style=flat
[downloads-url]: https://npmjs.org/package/express-expose
