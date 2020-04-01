---
layout: middleware
title: Express middleware
menu: resources
lang: th
module: mw-home
---

## Express middleware

The Express middleware modules listed here are maintained by the
[Expressjs team](https://github.com/orgs/expressjs/people).

|Middleware module | Description | Replaces built-in function (Express 3)|
|---------------------------|---------------------|----------------------|
| [body-parser](/resources/middleware/body-parser.html) | Parse HTTP request body. See also: [body](https://github.com/raynos/body), [co-body](https://github.com/visionmedia/co-body), and  [raw-body](https://github.com/stream-utils/raw-body). | express.bodyParser |
| [compression](/resources/middleware/compression.html) | Compress HTTP responses. | express.compress |
| [connect-rid](/resources/middleware/connect-rid.html) | Generate unique request ID. | NA |
| [cookie-parser](/resources/middleware/cookie-parser.html) | Parse cookie header and populate `req.cookies`. See also [cookies](https://github.com/jed/cookies) and [keygrip](https://github.com/jed/keygrip). | express.cookieParser|
| [cookie-session](/resources/middleware/cookie-session.html) | Establish cookie-based sessions.| express.cookieSession |
| [cors](/resources/middleware/cors.html) | Enable cross-origin resource sharing (CORS) with various options.| NA
| [csurf](/resources/middleware/csurf.html) | Protect from CSRF exploits.|express.csrf |
| [errorhandler](/resources/middleware/errorhandler.html) |Development error-handling/debugging. |express.errorHandler |
| [method-override](/resources/middleware/method-override.html) |Override HTTP methods using header. |express.methodOverride |
| [morgan](/resources/middleware/morgan.html) | HTTP request logger. | express.logger |
| [multer](/resources/middleware/multer.html) | Handle multi-part form data. | express.bodyParser |
| [response-time](/resources/middleware/response-time.html) |  Record HTTP response time. |express.responseTime |
| [serve-favicon](/resources/middleware/serve-favicon.html) | Serve a favicon. |express.favicon |
| [serve-index](/resources/middleware/serve-index.html) | Serve directory listing for a given path.| express.directory |
| [serve-static](/resources/middleware/serve-static.html) |Serve static files. |express.static |
| [session](/resources/middleware/session.html) | Establish server-based sessions (development only). | express.session |
| [timeout](/resources/middleware/timeout.html) | Set a timeout period for HTTP request processing.|express.timeout |
| [vhost](/resources/middleware/vhost.html) |Create virtual domains.|express.vhost|

## Additional middleware modules

These are some additional popular middleware modules.

|Middleware&nbsp;module | Description |
|---------------------------|---------------------|
| [connect-image-optimus](https://github.com/msemenistyi/connect-image-optimus) | Optimize image serving. Switches images to `.webp` or `.jxr`, if possible.|
| [express-debug](https://github.com/devoidfury/express-debug) | Development tool that adds information about template variables (locals), current session, and so on.|
| [express-partial-response](https://github.com/nemtsov/express-partial-response) | Filters out parts of JSON responses based on the `fields` query-string; by using Google API's Partial Response.|
| [express-simple-cdn](https://github.com/jamiesteven/express-simple-cdn) | Use a CDN for static assets, with multiple host support.|
| [express-slash](https://github.com/ericf/express-slash) | Handles routes with and without trailing slashes.|
| [express-stormpath](https://github.com/stormpath/stormpath-express) | User storage, authentication, authorization, SSO, and data security.|
| [express-uncapitalize](https://github.com/jamiesteven/express-uncapitalize) | Redirects HTTP requests containing uppercase to a canonical lowercase form.|
| [helmet](https://github.com/helmetjs/helmet) |Helps secure your apps by setting various HTTP headers.|
| [join-io](https://github.com/coderaiser/join-io) | Joins files on the fly to reduce the requests count.|
| [passport](https://github.com/jaredhanson/passport) | Authentication using "strategies" such as OAuth, OpenID and many others.  See [http://passportjs.org/](http://passportjs.org/) for more information.|
| [static-expiry](https://github.com/paulwalker/connect-static-expiry) | Fingerprint URLs or caching headers for static assets.|
| [view-helpers](https://github.com/madhums/node-view-helpers) | Common helper methods for views.|
| [sriracha-admin](https://github.com/hdngr/siracha) | Dynamically generate an admin site for Mongoose. |

For more middleware modules, see [http-framework](https://github.com/Raynos/http-framework#modules).
