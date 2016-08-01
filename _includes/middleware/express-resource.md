# Express Resource

  express-resource provides resourceful routing to express. For Express 2.x
  use a version __below__ 1.0, for Express 3.x use 1.x.

## Installation

npm:

    $ npm install express-resource

## Usage

 To get started simply `require('express-resource')`, and this module will monkey-patch Express, enabling resourceful routing by providing the `app.resource()` method. A "resource" is simply an object, which defines one of more of the supported "actions" listed below:

    exports.index = function(req, res){
      res.send('forum index');
    };

    exports.new = function(req, res){
      res.send('new forum');
    };

    exports.create = function(req, res){
      res.send('create forum');
    };

    exports.show = function(req, res){
      res.send('show forum ' + req.params.forum);
    };

    exports.edit = function(req, res){
      res.send('edit forum ' + req.params.forum);
    };

    exports.update = function(req, res){
      res.send('update forum ' + req.params.forum);
    };

    exports.destroy = function(req, res){
      res.send('destroy forum ' + req.params.forum);
    };

The `app.resource()` method returns a new `Resource` object, which can be used to further map pathnames, nest resources, and more.

    var express = require('express')
      , Resource = require('express-resource')
      , app = express();

    app.resource('forums', require('./forum'));

## Default Action Mapping

Actions are then mapped as follows (by default), providing `req.params.forum` which contains the substring where ":forum" is shown below:

    GET     /forums              ->  index
    GET     /forums/new          ->  new
    POST    /forums              ->  create
    GET     /forums/:forum       ->  show
    GET     /forums/:forum/edit  ->  edit
    PUT     /forums/:forum       ->  update
    DELETE  /forums/:forum       ->  destroy

## Top-Level Resource

Specify a top-level resource by omitting the resource name:

    app.resource(require('./forum'));

Top-level actions are then mapped as follows (by default):

    GET     /                 ->  index
    GET     /new              ->  new
    POST    /                 ->  create
    GET     /:id              ->  show
    GET     /:id/edit         ->  edit
    PUT     /:id              ->  update
    DELETE  /:id              ->  destroy

## Auto-Loading

Resources have the concept of "auto-loading" associated data. For example we can pass a "load" property along with our actions, which should invoke the callback function with an error, or the object such as a `User`:


      User.load = function(id, fn) {
        fn(null, users[id]);
      };

      // or
      
      User.load = function(req, id, fn) {
        fn(null, users[id]);
      };

      app.resource('users', { show: ..., load: User.load });
      
 With the auto-loader defined, the `req.user` object will now be available to the actions automatically. We may pass the "load" option as the third param as well, although this is equivalent to above, but allows you to either export ".load" along with your actions, or passing it explicitly:
 
     app.resource('users', require('./user'), { load: User.load });

 Finally we can utilize the `Resource#load(fn)` method, which again is functionally equivalent:
 
     var user = app.resource('users', require('./user'));
     user.load(User.load);

  This functionality works when nesting resources as well, for example suppose we have a forum, which contains threads, our setup may look something like below:
  
      var forums = app.resource('forums', require('resources/forums'), { load: Forum.get });
      var threads = app.resource('threads', require('resources/threads'), { load: Thread.get });

      forums.add(threads);

  Now when we request `GET /forums/5/threads/12` both the `req.forum` object, and `req.thread` will be available to thread's _show_ action.

## Content-Negotiation

  Currently express-resource supports basic content-negotiation support utilizing extnames or "formats". This can currently be done two ways, first we may define actions as we normally would, and utilize the `req.format` property, and respond accordingly. The following would respond to `GET /pets.xml`, and `GET /pets.json`.
  
      var pets = ['tobi', 'jane', 'loki'];

      exports.index = function(req, res){
        switch (req.format) {
          case 'json':
            res.send(pets);
            break;
          case 'xml':
            res.send('<pets>' + pets.map(function(pet){
              return '<pet>' + pet + '</pet>';
            }).join('') + '</pets>');
            break;
          default:
            res.send(406);
        }
      };

 The following is equivalent, however we separate the logic into several callbacks, each representing a format. 
 
     exports.index = {
       json: function(req, res){
         res.send(pets);
       },

       xml: function(req, res){
         res.send('<pets>' + pets.map(function(pet){
           return '<pet>' + pet + '</pet>';
         }).join('') + '</pets>');
       }
     };

 We may also provide a `default` format, invoked when either no extension is given, or one that does not match another method is given:
 
 
     exports.default = function(req, res){
       res.send('Unsupported format "' + req.format + '"', 406);
     };

 To assign a default format to an existing method, we can provide the `format` option to the resource. With the following definition both `GET /users/5` and `GET /users/5.json` will invoke the `show.json` action, or `show` with `req.format = 'json'`.
 
     app.resource('users', actions, { format: 'json' });

## Running Tests

First make sure you have the submodules:

    $ git submodule update --init

Then run the tests:

    $ make test

## License

    The MIT License

    Copyright (c) 2010-2012 TJ Holowaychuk <tj@vision-media.ca>
    Copyright (c) 2011 Daniel Gasienica <daniel@gasienica.ch>

    Permission is hereby granted, free of charge, to any person obtaining
    a copy of this software and associated documentation files (the
    'Software'), to deal in the Software without restriction, including
    without limitation the rights to use, copy, modify, merge, publish,
    distribute, sublicense, and/or sell copies of the Software, and to
    permit persons to whom the Software is furnished to do so, subject to
    the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
    IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
    CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
    TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
    SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
