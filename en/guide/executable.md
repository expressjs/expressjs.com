<h3 id='executable'>Using express(1) to generate an app</h3>

The Express team maintains a handy quickstart project generator, aptly named `express(1)`. If you install express-generator globally with npm, you'll have it available from anywhere on your machine:

```
$ npm install -g express-generator
```

This tool provides a simple way to get an application skeleton going,
but has limited scope, for example it supports only a few template engines,
whereas Express itself supports virtually any template engine built for node.
Be sure to check out the `--help`:

```
Usage: express [options]

Options:

  -h, --help          output usage information
  -V, --version       output the version number
  -e, --ejs           add ejs engine support (defaults to jade)
  -H, --hogan         add hogan.js engine support
  -c, --css <engine>  add stylesheet <engine> support (less|stylus|compass) (defaults to plain css)
  -f, --force         force on non-empty directory
```

To generate an application with Jade and Stylus
support:

```
$ express --css stylus myapp

create : myapp
create : myapp/package.json
create : myapp/app.js
create : myapp/public
create : myapp/public/javascripts
create : myapp/public/images
create : myapp/public/stylesheets
create : myapp/public/stylesheets/style.styl
create : myapp/routes
create : myapp/routes/index.js
create : myapp/views
create : myapp/views/index.jade
create : myapp/views/layout.jade
```

install dependencies:

```
$ cd myapp && npm install
```

run the app:

```
$ DEBUG=myapp node app
```

Like any other node application, you must then install the dependencies:

```
$ cd myapp
$ npm install
```

Then fire it up!

```
$ npm start
```

That's all you need to get a simple application up and running. Keep in mind
that Express is not bound to any specific directory structure, these are simply
a baseline for you to work from. For application structure alternatives be
sure to view the [examples](https://github.com/strongloop/express/tree/master/examples)
found in the github repo.
