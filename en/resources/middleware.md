---
layout: middleware
title: Express middleware
menu: resources
lang: en
redirect_from: "/resources/middleware.html"
---

## Express middleware

The Express middleware modules listed here are maintained by the Expressjs
Starting with Express 4, all middleware functions that in Express 3 were built-in
are in separate modules (except for `express.static`).

|Express 3 Built-in Function| Middleware modules |
|---------------------------|---------------------|
| express.bodyParser | [body-parser](/{{page.lang}}/resources/middleware/body-parser.html) and [multer](/{{page.lang}}/resources/middleware/multer.html) |
| express.compress | [compression](/{{page.lang}}/resources/middleware/compression.html) |
| express.cookieSession | [cookie-session](/{{page.lang}}/resources/middleware/cookie-session.html) |
| express.cookieParser| [cookie-parser](/{{page.lang}}/resources/middleware/cookie-parser.html) |
| express.logger | [morgan](/{{page.lang}}/resources/middleware/morgan.html) |
| express.session | [session](/{{page.lang}}/resources/middleware/express-session.html) |
| express.favicon | [serve-favicon](/{{page.lang}}/resources/middleware/serve-favicon.html) |
| express.responseTime | [response-time](/{{page.lang}}/resources/middleware/response-time.html) |
| express.errorHandler | [errorhandler](/{{page.lang}}/resources/middleware/errorhandler.html) |
| express.methodOverride | [method-override](/{{page.lang}}/resources/middleware/method-override.html) |
| express.timeout | [timeout](/{{page.lang}}/resources/middleware/connect-timeout.html) |
| express.vhost| [vhost](/{{page.lang}}/resources/middleware/vhost.html) |
| express.csrf | [csurf](/{{page.lang}}/resources/middleware/csurf.html) |
| express.directory | [serve-index](/{{page.lang}}/resources/middleware/serve-index.html) |
| express.static | [serve-static](/{{page.lang}}/resources/middleware/serve-static.html) |

For `body-parser` middleware, see also:
    - [body](https://github.com/raynos/body)
    - [co-body](https://github.com/visionmedia/co-body)
    - [raw-body](https://github.com/stream-utils/raw-body)
The `compression` middleware function was previously exposed as `express.compress`.

## Additional middleware

Here are some Express middleware modules:

- [connect-image-optimus](https://github.com/msemenistyi/connect-image-optimus): Connect/Express middleware modules for optimal image serving. Switches images to `.webp` or `.jxr`, if possible.
- [express-debug](https://github.com/devoidfury/express-debug): unobtrusive development tool that adds a tab with information about template variables (locals), current session, useful request data, and more to your application.
- [express-partial-response](https://github.com/nemtsov/express-partial-response): Express middleware module for filtering-out parts of JSON responses based on the `fields` query-string; by using Google API's Partial Response.
- [express-simple-cdn](https://github.com/jamiesteven/express-simple-cdn): Express middleware module for using a CDN for static assets, with multiple host support (For example: cdn1.host.com, cdn2.host.com).
- [express-slash](https://github.com/ericf/express-slash): Express middleware module for people who are strict about trailing slashes.
- [express-stormpath](https://github.com/stormpath/stormpath-express): Express middleware module for user storage, authentication, authorization, SSO, and data security.
- [express-uncapitalize](https://github.com/jamiesteven/express-uncapitalize): middleware module for redirecting HTTP requests containing uppercase to a canonical lowercase form.
- [helmet](https://github.com/helmetjs/helmet): module to help secure your apps by setting various HTTP headers.
- [join-io](https://github.com/coderaiser/join-io): module for joining files on the fly to reduce the requests count.
- [passport](https://github.com/jaredhanson/passport): Express middleware module for authentication.
- [static-expiry](https://github.com/paulwalker/connect-static-expiry): fingerprinted URLs or Caching Headers for static assets including support for one or more external domains.
- [vhost](https://github.com/expressjs/vhost): previously `express.vhost`
- [view-helpers](https://github.com/madhums/node-view-helpers): Express middleware module that provides common helper methods to the views.
- [sriracha-admin](https://github.com/hdngr/siracha): Express middleware module that dynamically generates an admin site for Mongoose.

Some middleware modules previously included with Connect are no longer supported by the Connect/Express team. These modules are replaced by an alternative module, or should be superseded by a better module. Use one of the following alternatives:

  - express.cookieParser
    - [cookies](https://github.com/jed/cookies) and [keygrip](https://github.com/jed/keygrip)
  - express.limit
    - [raw-body](https://github.com/stream-utils/raw-body)
  - express.multipart
    - [connect-busboy](https://github.com/mscdex/connect-busboy)
    - [multer](https://github.com/expressjs/multer)
    - [connect-multiparty](https://github.com/superjoe30/connect-multiparty)
  - express.query
    - [qs](https://github.com/visionmedia/node-querystring)
  - express.staticCache
    - [st](https://github.com/isaacs/st)
    - [connect-static](https://github.com/andrewrk/connect-static)

For more middleware modules, see [http-framework](https://github.com/Raynos/http-framework/wiki/Modules).
