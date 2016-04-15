---
layout: page
title: Розробка шаблонізаторів для Express
menu: advanced
lang: uk
---

# Розробка шаблонізаторів для Express

Use the `app.engine(ext, callback)` method to create your own template engine. `ext` refers to the file extension, and `callback` is the template engine function, which accepts the following items as parameters: the location of the file, the options object, and the callback function.

The following code is an example of implementing a very simple template engine for rendering `.ntl` files.

<pre><code class="language-javascript" translate="no">
var fs = require('fs'); // this engine requires the fs module
app.engine('ntl', function (filePath, options, callback) { // define the template engine
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(new Error(err));
    // this is an extremely simple template engine
    var rendered = content.toString().replace('#title#', '<title>'+ options.title +'</title>')
    .replace('#message#', '<h1>'+ options.message +'</h1>');
    return callback(null, rendered);
  });
});
app.set('views', './views'); // specify the views directory
app.set('view engine', 'ntl'); // register the template engine
</code></pre>

Your app will now be able to render `.ntl` files. Create a file named `index.ntl` in the `views` directory with the following content.

<pre><code class="language-javascript" translate="no">
#title#
#message#
</code></pre>
Then, create the following route in your app.

<pre><code class="language-javascript" translate="no">
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});
</code></pre>
When you make a request to the home page, `index.ntl` will be rendered as HTML.
