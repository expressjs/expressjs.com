<span class="block-section">
<h3 id='models'>
How do I define models?
</h3>

Express has no notion of a database at all. This is
left up to third-party node modules, allowing you to
interface with nearly any database.
</span>

<span class="block-section">
<h3 id="auth">
How can I authenticate users?
</h3>

This is another opinionated area that Express does not
venture into, you may use any authentication scheme you wish.
For a simple username / password scheme view this [example](https://github.com/strongloop/express/tree/master/examples/auth).
</span>

<span class="block-section">
<h3 id="templates">
Which template engines does Express support?
</h3>

Anything that can conform with the `(path, locals, callback)` signature.
To normalize template engine interfaces and caching, it's recommended to
check the [consolidate.js](https://github.com/visionmedia/consolidate.js)
project for support. Unlisted template engines may still support the Express
signature.
</span>

<span class="block-section">
<h3 id="custom-template-engines">How do I create custom template engines in Express?</h3>

Use the `app.engine(ext, callback)` method to create your own template engine. `ext` refers to the file extension, `callback` is the template engine function which accepts the location of the file, the options object, and the callback function, as its parameters.

The following is an example of implementing a very simple template engine for rendering ".ntl" files.

```
var fs = require('fs'); // this engine requires the `fs` module
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

```
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
})
```
On making a request to the home page, "index.ntl" will be rendered as HTML.
</span>

<span class="block-section">
<h3 id="structure">How should I structure my application?</h3>

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
</span>

<span class="block-section">
<h3 id="multiple-statics">How can I serve statics from several directories?</h3>

You may typically use any middleware several times 
within your application. With the following middleware setup, and a request
for "GET /javascripts/jquery.js", the first check would be "./public/javascripts/jquery.js";
if it does not exist, then the subsequent middleware will check "./files/javascripts/jquery.js".

```
app.use(express.static('public'));
app.use(express.static('files'));
```
</span>

<span class="block-section">
<h3 id="static-prefix">How can I prefix a pathname for serving statics?</h3>

Connect's generic "mounting" feature allows you to define
the pathname "prefix" to which the middleware will be invoked.
This effectively behaves as if that prefix string was never
part of the path. Suppose you wanted "GET /files/javascripts/jquery.js".
You could mount the middleware at "/files", exposing "/javascripts/jquery.js"
as the `req.url`, allowing the middleware to serve the file:

```
app.use('/public', express.static('public'));
```
</span>

<span class="block-section">
<h3 id="migration">How do I migrate my Express 2.x application?</h3>

Express 2x will likely be supported through to node 1.0, so there's
no immediate reason to update beyond the refactoring and API changes
that Express 3x introduces, so if you're happy with 2x feel free
to remain on that branch. For migration information visit the
[migration](https://github.com/strongloop/express/wiki/Migrating-from-2.x-to-3.x)
wiki page, or view a [list of changes](https://github.com/strongloop/express/wiki/New-features-in-3.x) made in 3.x.
</span>

<span class="block-section">
<h3 id="404-handling">How do you handle 404s?</h3>

In Express, 404s are not the result of an error. Therefore,
the error-handler middleware will not capture 404s. This is
because a 404 is simply the absence of additional work to do;
in other words, Express has executed all middleware / routes,
and found that none of them responded. All you need to
do is add a middleware at the very bottom (below all others)
to handle a 404:

```
app.use(function(req, res, next){
  res.send(404, 'Sorry cant find that!');
});
```
</span>

<span class="block-section">
<h3 id="error-handling">How do you setup an error handler in Express?</h3>

Error-handling middleware is defined just like regular middleware,
except that it must be defined with an arity of 4 (that is the signature
`(err, req, res, next)`):

```
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});
```
View [error-handling](/guide.html#error-handling) for more information.
</span>

<span class="block-section">
<h3 id="render-html">How do I render plain HTML?</h3>

You don't! There's no need to "render" HTML with `res.render()`,
if you have a specific file you should use `res.sendFile()`, or
if you are serving many assets from a directory use the `express.static()`
middleware.
</span>

<span class="block-section">
<h3 id="size">How big is the Express codebase?</h3>

Express is a very small framework. The 3.0.0 release is only
932 SLOC, and the mandatory portion of Connect which Express
is built on is only 267 SLOC. The optional middleware bundled
with Connect add an additional 1143 SLOC, and are lazy loaded
upon use.
</span>
