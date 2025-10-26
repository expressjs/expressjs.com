---
layout: middleware
title: Express middleware
description: Explore a list of Express.js middleware modules maintained by the Express team and the community, including built-in middleware and popular third-party modules.
menu: resources
order: 3
redirect_from: "/resources/middleware.html"
module: mw-home
---

## Express middleware

The Express middleware modules listed here are maintained by the
[Expressjs team](https://github.com/orgs/expressjs/people).

| Middleware module                                                         | Description                                                                                         |
| ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [body-parser](/{{page.lang}}/resources/middleware/body-parser.html)         | Parse HTTP request body.                                                                            |
| [compression](/{{page.lang}}/resources/middleware/compression.html)         | Compress HTTP responses.                                                                            |
| [connect-rid](/{{page.lang}}/resources/middleware/connect-rid.html)         | Generate unique request ID.                                                                         |
| [cookie-parser](/{{page.lang}}/resources/middleware/cookie-parser.html)     | Parse cookie header and populate `req.cookies`. See also [cookies](https://github.com/jed/cookies). |
| [cookie-session](/{{page.lang}}/resources/middleware/cookie-session.html)   | Establish cookie-based sessions.                                                                    |
| [cors](/{{page.lang}}/resources/middleware/cors.html)                       | Enable cross-origin resource sharing (CORS) with various options.                                   |
| [errorhandler](/{{page.lang}}/resources/middleware/errorhandler.html)       | Development error-handling/debugging.                                                               |
| [method-override](/{{page.lang}}/resources/middleware/method-override.html) | Override HTTP methods using header.                                                                 |
| [morgan](/{{page.lang}}/resources/middleware/morgan.html)                   | HTTP request logger.                                                                                |
| [multer](/{{page.lang}}/resources/middleware/multer.html)                   | Handle multi-part form data.                                                                        |
| [response-time](/{{page.lang}}/resources/middleware/response-time.html)     | Record HTTP response time.                                                                          |
| [serve-favicon](/{{page.lang}}/resources/middleware/serve-favicon.html)     | Serve a favicon.                                                                                    |
| [serve-index](/{{page.lang}}/resources/middleware/serve-index.html)         | Serve directory listing for a given path.                                                           |
| [serve-static](/{{page.lang}}/resources/middleware/serve-static.html)       | Serve static files.                                                                                 |
| [session](/{{page.lang}}/resources/middleware/session.html)                 | Establish server-based sessions (development only).                                                 |
| [timeout](/{{page.lang}}/resources/middleware/timeout.html)                 | Set a timeout perioHTTP request processing.                                                         |
| [vhost](/{{page.lang}}/resources/middleware/vhost.html)                     | Create virtual domains.                                                                             |

## Additional middleware modules

These are some additional popular middleware modules.

{% include community-caveat.html %}

| Middleware module                                   | Description                                                                                                                                   |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| [helmet](https://github.com/helmetjs/helmet)        | Helps secure your apps by setting various HTTP headers.                                                                                       |
| [passport](https://github.com/jaredhanson/passport) | Authentication using "strategies" such as OAuth, OpenID and many others.  See [passportjs.org](https://passportjs.org/) for more information. |
