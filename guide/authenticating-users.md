---
layout: page
title: Authenticating Users with Express
menu: guide
lang: en
---

# Authenticating Users

Authenticating users is an important part of any web application: securely
creating user accounts, logging users into a site, and logging them out.

This guide shows you how to authenticate users using the
[Stormpath](https://stormpath.com/) service.

Stormpath is an API service which securely stores user accounts, and handles
authentication, authorization, and more.  It makes building applications that
require user authentication very simple.

<h2 id="get-an-api-key">Get an API Key</h2>

The first thing you need to do is get an API key from Stormpath.

- Go to [this page](https://api.stormpath.com/register) and create a new account.
- Once you've logged into the dashboard, generate a new API key by clicking the
  large `Create API Key` button. This will generate a new API key for you, and
  prompt you to download it locally.
- Save this API key file into your home directory inside of a folder named
  `.stormpath`.  For instance:

~~~console
$ mkdir ~/.stormpath
$ mv ~/Downloads/apiKey-*.properties ~/.stormpath/apiKey.properties
~~~

This file contains your Stormpath API keys, and will be used to authenticate you
with Stormpath.

<h2 id="install-the-libraries">Install the Libraries</h2>

Next, you need to install the two required libraries:
[express](https://www.npmjs.com/package/express) and
[express-stormpath](https://www.npmjs.com/package/express-stormpath):

~~~console
$ npm install express express-stormpath
~~~

<h2 id="setup-the-express-app">Setup the Express App</h2>

Now, let's create the Express app and configure it to use Stormpath for
authentication.  Here's an example Express app that uses Stormpath:

~~~js
'use strict';

var express = require('express');
var stormpath = require('express-stormpath');

var app = express();

// Initializes the Stormpath middleware for authentication and authorization.
// For a list of all available options, see the documentation here:
// http://docs.stormpath.com/nodejs/express/latest/configuration.html
app.use(stormpath.init(app, {
  website: true
}));

// The stormpath.loginRequired middleware requires a user to be logged in to
// view this route.
app.get('/', stormpath.loginRequired, function(req, res) {
  // Once a user has been logged in, you can access the user's data via the
  // req.user object.
  res.send('Hi: ' + req.user.givenName + ', you are now logged in!');
});

app.on('stormpath.ready', function() {
  app.listen(3000);
});
~~~

<h2 id="test-the-app">Test the App</h2>

Now, run your new application, and then visit [http://localhost:3000](http://localhost:3000).
You will be immediately redirected to a login page: `http://localhost:3000/login`.

This is happening because, your default route (`/`) is protected by the
`stormpath.loginRequired` middleware, which forces you to be logged in.

Since you weren't logged in, the Stormpath middleware function redirected you to
the built-in login route (`/login`), which is provided by default since we
included the `website: true` option when initializing the middleware.

Now, go ahead and either log in using this page, or click the *Create Account*
link, which will take you to the registration route (`/register`), where you can
create a new account.

Once you've created or logged into an account, you'll be immediately redirected
back to the home page (`/`), where you'll see a welcome message.

To logout of your account, you can now visit
[http://localhost:3000/logout](http://localhost:3000/logout), and your session
will be destroyed.

<h2 id="where-are-the-users-stored">Where are the Users Stored?</h2>

When you create user accounts using Stormpath, they'll be available inside of
the [Stormpath
Dashboard](https://api.stormpath.com/ui2/index.html#/applications).

By default, Stormpath creates an *Application* called *My Application* that your
Express app will use by default to store all newly created user accounts.

You can create as many Applications as you want in Stormpath, and can tell each
project you use to store user accounts in a different Stormpath Application.

<h2 id="learn-more">Learn More</h2>

To learn more about [Stormpath](https://stormpath.com) and authentication, check
out the [express-stormpath library documentation](http://docs.stormpath.com/nodejs/express/latest/).
