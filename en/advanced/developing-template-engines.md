# Developing template engines for Express

Use the `app.engine(ext, callback)` method to create your own template engine. `ext` refers to the file extension, `callback` is the template engine function which accepts the location of the file, the options object, and the callback function, as its parameters.

The following is an example of implementing a very simple template engine for rendering ".ntl" files.

```js
var fs = require('fs'); // this engine requires the fs module
app.engine('ntl', function (filePath, options, callback) { // define the template engine
  fs.readFile(filePath, function (err, content) {
    if (err) throw new Error(err);
    // this is an exteremly simple template engine
    var rendered = content.toString().replace('#title#', '<title>'+ options.title +'</title>')
    .replace('#message#', '<h1>'+ options.message +'</h1>');
    return callback(null, rendered);
  })
});
app.set('views', './views'); // specify the views directory
app.set('view engine', 'ntl'); // register the template engine
```

Your app will now be able to render ".ntl" files. Create a file named "index.ntl" in the views directory with the following content.

```
#title#
#message#
```
Then, create the following route in your app.

```js
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
})
```
On making a request to the home page, "index.ntl" will be rendered as HTML.

## How should I structure my application?

There is no true answer to this question. It is highly dependant
on the scale of your application and the team involved. To be as
flexible as possible, Express makes no assumptions in terms of structure.

Routes and other application-specific logic may live in as many files
as you wish, in any directory structure you prefer. View the following
examples for inspiration:

* [Route listings](https://github.com/strongloop/express/blob/master/examples/route-separation/index.js#L19)
* [Route map](https://github.com/strongloop/express/blob/master/examples/route-map/index.js#L47)
* [MVC style controllers](https://github.com/strongloop/express/tree/master/examples/mvc)

Also, there are third-party extensions for Express, which simplify some of these patterns:

* [Resourceful routing](https://github.com/expressjs/express-resource)
* [Namespaced routing](https://github.com/expressjs/express-namespace)
