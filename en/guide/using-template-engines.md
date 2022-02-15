---
layout: page
title: Using template engines with Express
menu: guide
lang: en
redirect_from: "/guide/using-template-engines.html"
---
# Using template engines with Express

A _template engine_ enables you to use static template files in your application.   At runtime, the template engine replaces
variables in a template file with actual values, and transforms the template into an HTML file sent to the client.
This approach makes it easier to design an HTML page.

Some popular template engines that work with Express are [Pug](https://pugjs.org/api/getting-started.html),
[Mustache](https://www.npmjs.com/package/mustache), and [EJS](https://www.npmjs.com/package/ejs).
The [Express application generator](/{{ page.lang }}/starter/generator.html) uses [Jade](https://www.npmjs.com/package/jade) as its default, but it also supports several others.

See [Template Engines (Express wiki)](https://github.com/expressjs/express/wiki#template-engines)
for a list of template engines you can use with Express.
See also [Comparing JavaScript Templating Engines: Jade, Mustache, Dust and More](https://strongloop.com/strongblog/compare-javascript-templates-jade-mustache-dust/).

<div class="doc-box doc-notice" markdown="1">
**Note**: Jade has been renamed to [Pug](https://www.npmjs.com/package/pug).  You can continue to use Jade in your app, and it will work just fine.  However if you want the latest updates to the template engine, you must replace Jade with Pug in your app.
</div>

To render template files, set the following [application setting properties](/{{ page.lang }}/4x/api.html#app.set), set in `app.js` in the default app created by the generator:

* `views`, the directory where the template files are located. Eg: `app.set('views', './views')`.
This defaults to the `views` directory in the application root directory.
* `view engine`, the template engine to use. For example, to use the Pug template engine: `app.set('view engine', 'pug')`.

Then install the corresponding template engine npm package; for example to install Pug:

```console
$ npm install pug --save
```

<div class="doc-box doc-notice" markdown="1">
Express-compliant template engines such as Jade and Pug export a function named `__express(filePath, options, callback)`,
which is called by the `res.render()` function to render the template code.

Some template engines do not follow this convention. The [Consolidate.js](https://www.npmjs.org/package/consolidate)
library follows this convention by mapping all of the popular Node.js template engines, and therefore works seamlessly within Express.
</div>

After the view engine is set, you don't have to specify the engine or load the template engine module in your app;
Express loads the module internally, as shown below (for the above example).

```js
app.set('view engine', 'pug')
```

Create a Pug template file named `index.pug` in the `views` directory, with the following content:

```pug
html
  head
    title= title
  body
    h1= message
```

Then create a route to render the `index.pug` file. If the `view engine` property is not set,
you must specify the extension of the `view` file. Otherwise, you can omit it.

```js
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})
```

When you make a request to the home page, the `index.pug` file will be rendered as HTML.

Note: The view engine cache does not cache the contents of the template's output, only the underlying template itself. The view is still re-rendered with every request even when the cache is on.

To learn more about how template engines work in Express, see:
["Developing template engines for Express"](/{{ page.lang }}/advanced/developing-template-engines.html).
