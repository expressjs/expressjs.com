---
layout: page
title: Express utilities
menu: resources
lang: en
redirect_from: "/resources/utilities.html"
---

## Express utility functions

The [pillarjs](https://github.com/pillarjs) GitHub organization contains a number of modules
for utility functions that may be generally useful.

| Utility modules | Description|
|-----------------|------------|
| [cookies](https://www.npmjs.com/package/cookies) | Get and set HTTP(S) cookies that can be signed to prevent tampering, using Keygrip. Can be used with the Node.js HTTP library or as Express middleware.|
| [csrf](https://www.npmjs.com/package/csrf) | Contains the logic behind CSRF token creation and verification.  Use this module to create custom CSRF middleware.|
| [finalhandler](https://www.npmjs.com/package/finalhandler) | Function to invoke as the final step to respond to HTTP request.|
| [parseurl](https://www.npmjs.com/package/parseurl) | Parse a URL with caching. |
| [path-match](https://www.npmjs.com/package/path-match) | Thin wrapper around [path-to-regexp](https://github.com/component/path-to-regexp) to make extracting parameter names easier.|
| [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) | Turn an Express-style path string such as ``/user/:name` into a regular expression.|
| [resolve-path](https://www.npmjs.com/package/resolve-path) | Resolves a relative path against a root path with validation. |
| [router](https://www.npmjs.com/package/router) | Simple middleware-style router. |
| [routington](https://www.npmjs.com/package/routington) |  Trie-based URL router for defining and matching URLs. |
| [send](https://www.npmjs.com/package/send) | Library for streaming files as a HTTP response, with support for partial responses (ranges), conditional-GET negotiation, and granular events.|
| [templation](https://www.npmjs.com/package/templation) | View system similar to `res.render()` inspired by [co-views](https://github.com/visionmedia/co-views) and [consolidate.js](https://github.com/visionmedia/consolidate.js/). |


For additional low-level HTTP-related modules, see [jshttp](http://jshttp.github.io/).


## Others Modules

Misc modules that extend Express or provide useful utilities.

-   [session.socket.io (SessionSockets)](https://github.com/functioncallback/session.socket.io) -- Connect middleware sessions in socket.io
-   [Express Expose](http://github.com/visionmedia/express-expose) -- Expose js objects, functions, and modules to client-side scripts
-   [Express Messages](http://github.com/visionmedia/express-messages) -- Flash message display dynamicHelper
-   [Express Configuration](http://github.com/visionmedia/express-configuration) -- Async configuration
-   [Express Resource](http://github.com/visionmedia/express-resource) -- Resourceful routing
-   [Express Helpers](https://github.com/masahiroh/express-helpers) -- Misc view helpers for Express (broken link, [try this package](https://github.com/tanema/express-helpers))
-   [Express Load](https://github.com/jarradseers/express-load) -- Autoload scripts (routes, models, controllers...) into application instance for large Express applications
-   [express-error](https://github.com/barc/express-error) -- Injects source code into Express 3 error stack for JavaScript and CoffeeScript. Very useful for CoffeeScript. From [Barc](http://barc.com/)
-   [express-error-with-sources](https://github.com/floatdrop/express-error-with-sources) -- Plain javascript port of [express-error](https://github.com/barc/express-error) that have syntax highlighting.
-   [express-group](https://github.com/damienklinnert/express-group) -- Group express routes and middleware
-   [express-module-server](https://github.com/jaitaiwan/express-module-server) -- Middleware wrapper for google's [module-server](https://github.com/google/module-server)
-   [Express Path](https://github.com/hyubs/express-path) -- Easy route mapping for Express
-   [Express State](https://github.com/yahoo/express-state) -- Share configuration and state data of an Express app with the client-side via JavaScript.
-   [Express Shared Routes](https://github.com/hrajchert/express-shared-routes) -- Small library that let you name routes and easily create navigation components like menus and breadcrumbs.
-   [express-switch](https://github.com/B3rn475/express-switch) -- express-switch is a pattern matching middleware for express
-   [Express run middleware](https://github.com/AminaG/node-run-middleware) - Small utility to manually trigger (calling) express routres, from your code.
-   [krauter](https://github.com/brandon-d-mckay/krauter) -- An extended Router that accepts strings/objects and generates middleware that performs parameterized database queries
