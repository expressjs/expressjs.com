# Using template engines with Express

Before Express can render template files, the following application settings have to be set.

* `views`, the directory where the template files are located. Eg: `app.set('views', './views')`
* `view engine`, the template engine to use. Eg: `app.set('view engine', 'jade')`

Then install the corresponding template engine npm package.

```
$ npm install jade --save
```

Express-compliant template engines such as Jade, export a function named `__express(filePath, options, callback)`, which is called by `res.render()` to render the template code.

Some template engines do not follow this convention, the [Consolidate.js](https://www.npmjs.org/package/consolidate) library was created to map all of node's popular template engines to follow this convention, thus allowing them to work seamlessly within Express.

Once the view engine is set, you don't have to explicitly specify the engine or load the template engine module in your app, Express loads it internally as shown below, for the example above.

```
app.engine('jade', require('jade').__express);
```

Create a Jade template files named "index.jade" in the views directory, with the following content.

```
html
  head
    title!= title
  body
    h1!= message
```

Then create a route to render the "index.jade" file.

```js
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
})
```

On making a request to the home page, "index.jade" will be rendered as HTML.

To better understand how template engines work in Express, read ["How do I create custom template engines in Express?"](faq.html#custom-template-engines).
