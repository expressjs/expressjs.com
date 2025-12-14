---
layout: page
title: Express utilities
description: Discover utility modules related to Express.js and Node.js, including tools for cookies, CSRF protection, URL parsing, routing, and more to enhance your applications.
menu: resources
order: 4
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
| [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) | Turn an Express-style path string such as ``/user/:name` into a regular expression.|
| [resolve-path](https://www.npmjs.com/package/resolve-path) | Resolves a relative path against a root path with validation. |
| [router](https://www.npmjs.com/package/router) | Simple middleware-style router. |
| [send](https://www.npmjs.com/package/send) | Library for streaming files as a HTTP response, with support for partial responses (ranges), conditional-GET negotiation, and granular events.|


For additional low-level HTTP-related modules, see [jshttp](http://jshttp.github.io/).
