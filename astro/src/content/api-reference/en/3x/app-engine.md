<h3 id='app.engine'>app.engine(ext, callback)</h3>

Register the given template engine `callback` as `ext`

By default will `require()` the engine based on the
file extension. For example if you try to render
a "foo.jade" file Express will invoke the following internally,
and cache the `require()` on subsequent calls to increase
performance.

```js
app.engine('jade', require('jade').__express)
```

For engines that do not provide `.__express` out of the box -
or if you wish to "map" a different extension to the template engine
you may use this method. For example mapping the EJS template engine to
".html" files:

```js
app.engine('html', require('ejs').renderFile)
```

In this case EJS provides a `.renderFile()` method with
the same signature that Express expects: `(path, options, callback)`,
though note that it aliases this method as `ejs.__express` internally
so if you're using ".ejs" extensions you dont need to do anything.

Some template engines do not follow this convention, the
<a href="https://github.com/visionmedia/consolidate.js">consolidate.js</a>
library was created to map all of node's popular template
engines to follow this convention, thus allowing them to
work seemlessly within Express.

```js
var engines = require('consolidate')
app.engine('haml', engines.haml)
app.engine('html', engines.hogan)
```
