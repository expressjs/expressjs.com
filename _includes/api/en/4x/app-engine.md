<h3 id='app.engine'>app.engine(ext, callback)</h3>

Registers the given template engine `callback` as `ext`.

By default, Express will `require()` the engine based on the file extension.
For example, if you try to render a "foo.pug" file, Express invokes the
following internally, and caches the `require()` on subsequent calls to increase
performance.

```js
app.engine('pug', require('pug').__express);
```

Use this method for engines that do not provide `.__express` out of the box,
or if you wish to "map" a different extension to the template engine.

For example, to map the EJS template engine to ".html" files:

```js
app.engine('html', require('ejs').renderFile);
```

In this case, EJS provides a `.renderFile()` method with
the same signature that Express expects: `(path, options, callback)`,
though note that it aliases this method as `ejs.__express` internally
so if you're using ".ejs" extensions you don't need to do anything.

Some template engines do not follow this convention.  The
[consolidate.js](https://github.com/tj/consolidate.js) library maps Node template engines to follow this convention,
so they work seamlessly with Express.

```js
var engines = require('consolidate');
app.engine('haml', engines.haml);
app.engine('html', engines.hogan);
```
