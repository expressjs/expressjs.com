---
layout: page
title: Using template engines with Express
menu: guide
lang: en
---

# Using template engines with Express

Before Express can render template files, the following application settings must be set:

* `views`, the directory where the template files are located. Eg: `app.set('views', './views')`
* `view engine`, the template engine to use. Eg: `app.set('view engine', 'jade')`

Then install the corresponding template engine npm package:

~~~sh
$ npm install jade --save
~~~

<div class="doc-box doc-notice" markdown="1">
Express-compliant template engines such as Jade export a function named `__express(filePath, options, callback)`, which is called by the `res.render()` function to render the template code.

Some template engines do not follow this convention. The [Consolidate.js](https://www.npmjs.org/package/consolidate) library follows this convention by mapping all of the popular Node.js template engines, and therefore works seamlessly within Express.
</div>

After the view engine is set, you don't have to specify the engine or load the template engine module in your app; Express loads the module internally, as shown below (for the above example).

~~~js
app.set('view engine', 'jade');
~~~

Create a Jade template file named `index.jade` in the `views` directory, with the following content:

~~~js
html
  head
    title!= title
  body
    h1!= message
~~~

Then create a route to render the `index.jade` file. If the `view engine` property is not set, you must specify the extension of the `view` file. Otherwise, you can omit it.

~~~js
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});
~~~

When you make a request to the home page, the `index.jade` file will be rendered as HTML.

To learn more about how template engines work in Express, see: ["Developing template engines for Express"](/advanced/developing-template-engines.html).
