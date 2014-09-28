<h3 id='getting-started'>Getting started</h3>

First, if you have not already done so,
[download and install Node](http://nodejs.org/download).
Then, to start your first application, create a directory on your machine:

```
$ mkdir hello-world
```
In this same directory you'll be defining the application "package", which
is the same as any other Node package. You'll need a
`package.json` file in the directory, with `express`
as a dependency. 

```js
{
  "name": "hello-world",
  "description": "hello world test app",
  "version": "0.0.1",
  "private": true,
  "dependencies": {
    "express": "4.x"
  }
}
```
In general, as a best practice, use `npm info express version` to
determine the latest version of Express, and then use the version number
returned instead of "4.x" to prevent future surprises.

Now that you have a `package.json` file in this directory use
`npm` to install the dependencies, in this case just Express:

```
$ npm install
```

Once npm finishes you'll have a localized Express dependency in
the `./node_modules` directory.  Verify this with `npm ls`
as shown in the following snippet displaying a tree of Express and its
dependencies.
```
$ npm ls
hello-world@0.0.1 /private/tmp
└─┬ express@3.0.0beta7
  ├── commander@0.6.1
  ├─┬ connect@2.3.9
  │ ├── bytes@0.1.0
  │ ├── cookie@0.0.4
  │ ├── crc@0.2.0
  │ ├── formidable@1.0.11
  │ └── qs@0.4.2
  ├── cookie@0.0.3
  ├── debug@0.7.0
  ├── fresh@0.1.0
  ├── methods@0.0.1
  ├── mkdirp@0.3.3
  ├── range-parser@0.0.4
  ├─┬ response-send@0.0.1
  │ └── crc@0.2.0
  └─┬ send@0.0.3
    └── mime@1.2.6
```

Now to create the application itself! Create a file named `app.js` or `server.js`,
whichever you prefer, require Express and then create a new application with `express()`:

```js
var express = require('express');
var app = express();
```

With the new application instance you can start defining routes via `app.VERB()`,
in this case "GET /" responding with the "Hello World" string. The `req` and
`res` are the exact same objects that node provides to you, thus you may invoke
`req.pipe()`, `req.on('data', callback)` and anything else you
would do without Express involved.

Express augments these objects to provide you with higher level
methods (such as `res.send()`, which, among other things,
adds the Content-Length for you):

```js
app.get('/hello.txt', function(req, res){
  res.send('Hello World');
});
```

Now, to bind and listen for connections, invoke the `app.listen()` method.
It accepts the same arguments as node's [net.Server#listen()](http://nodejs.org/api/net.html#net_server_listen_port_host_backlog_listeninglistener):

```js
var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
```
