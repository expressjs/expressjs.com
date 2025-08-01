---
layout: page
title: Express changelog
description: Stay updated with the release changelog for Express.js, detailing new features, bug fixes, and important changes across versions.
sitemap: false
redirect_from: 
  - "/changelog/4x.html"
  - "en/changelog/4x.html"
---

<nav aria-label="sidebar-heading">
  <div class="toc-container">
    <h3 id="sidebar-heading" class="toc-heading"><em>Versions</em></h3>
    <button id="menu-toggle" title="show express versions">Versions <span>&#x25BA;</span></button>
    <ul id="menu">
      {% capture readme %}{% include changelog/menu.md %}{% endcapture %}
      <li>
        {{ readme | markdownify }}
      </li>
    </ul>
  </div>
</nav>

<div markdown="1" id="page-doc">

# Release changelog

All the latest updates, improvements, and fixes to Express

## Express v5
{: id="5.x"} 

### 5.1.0 - Release date: 2025-03-31
{: id="5.0.1"}

The 5.1.0 minor release includes some new features and improvements:

* Support for sending responses as Uint8Array
* Added support for ETag option in `res.sendFile()`
* Added support for adding multiple links with the same rel with `res.links()`
* Performance: Use loop for acceptParams
* [body-parser@2.2.0](https://github.com/expressjs/body-parser/releases/tag/v2.2.0)
  * Remove legacy node.js support checks for Brotli & `AsyncLocalStorage`
  * Remove `unpipe` & `destroy`
* [router@2.2.0](https://github.com/pillarjs/router/releases/tag/v2.2.0)
  * Restore `debug`. Now with the `router` scope instead of `express`.
  * Remove legacy node.js support checks for `setImmediate`
  * Deprecate non-native promise support
  * Remove `after`, `safe-buffer`, `array-flatten`, `setprotoypeof`, `methods`, `utils-merge`
* [finalhandler@2.1.0](https://github.com/pillarjs/finalhandler/releases/tag/v2.1.0)
    * Remove legacy node.js support checks for `headersSent`, `setImmediate`, & http2 support
    * Remove `unpipe`
* Transitioned all remaining dependencies to use `^` ranges instead of locked versions
* Add package.json funding field to highlight our OpenCollective 
* See [Changelog v5.1.0](https://github.com/expressjs/express/releases/tag/v5.1.0)
### 5.0.1 - Release date: 2024-10-08
{: id="5.0.1"}

The 5.0.1 patch release includes one security fix:

* Update [jshttps/cookie](https://www.npmjs.com/package/cookie) to address a [vulnerability](https://github.com/advisories/GHSA-pxg6-pf52-xh8x).

### 5.0.0 - Release date: 2024-09-09
{: id="5.0.0"}

Check the [migration guide](/{{page.lang}}/guide/migrating-5.html) with all the changes in this new version of Express.

## Express v4
{: id="4.x"}

### 4.21.2 - Release date: 2024-11-06
{: id="4.21.2"}

The 4.21.2 patch release includes one security fix:

* Update [pillajs/path-to-regexp](https://www.npmjs.com/package/path-to-regexp) to address a [vulnerability](https://github.com/advisories/GHSA-rhx6-c78j-4q9w).

### 4.21.1 - Release date: 2024-10-08
{: id="4.21.1"}

The 4.21.1 patch release includes one security fix:

* Update [jshttps/cookie](https://www.npmjs.com/package/cookie) to address a [vulnerability](https://github.com/advisories/GHSA-pxg6-pf52-xh8x).

### 4.21.0 - Release date: 2024-09-11
{: id="4.21.0"}

The 4.21.0 minor release includes one new feature:

* Deprecate `res.location("back")` and `res.redirect("back")` magic string

### 4.20.0 - Release date: 2024-09-10
{: id="4.20.0"}

The 4.20.0 minor release includes bug fixes and some new features, including:

* The [`res.clearCookie()` method](/{{ page.lang }}/4x/api.html#res.clearCookie) deprecates `options.maxAge` and `options.expires` options.
* The [`res.redirect()` method](/{{ page.lang }}/4x/api.html#res.redirect) removes HTML link rendering.
* The [`express.urlencoded()` method](/{{ page.lang }}/4x/api.html#express.urlencoded) method now has a depth level of `32`, whereas it was previously `Infinity`.
* Adds support for named matching groups in the routes using a regex
* Removes encoding of `\`, `|`, and `^` to align better with URL spec

For a complete list of changes in this release, see [History.md](https://github.com/expressjs/express/blob/master/History.md#4200--2024-09-10)

### 4.19.2 - Release date: 2024-03-25
{: id="4.19.2"}

* Improved fix for open redirect allow list bypass

For a complete list of changes in this release, see [History.md](https://github.com/expressjs/express/blob/master/History.md#4192--2024-03-25)

### 4.19.1 - Release date: 2024-03-20
{: id="4.19.1"}

* Allow passing non-strings to res.location with new encoding handling checks

For a complete list of changes in this release, see [History.md](https://github.com/expressjs/express/blob/master/History.md#4191--2024-03-20)

### 4.19.0 - Release date: 2024-03-20
{: id="4.19.0"}

* Prevent open redirect allow list bypass due to encodeurl
* deps: cookie@0.6.0

For a complete list of changes in this release, see [History.md](https://github.com/expressjs/express/blob/master/History.md#4190--2024-03-20)

### 4.18.3 - Release date: 2024-02-29
{: id="4.18.3"}

The 4.18.3 patch release includes the following bug fix:

<ul>
  <li markdown="1" class="changelog-item">
  Fix routing requests without method. ([commit](https://github.com/expressjs/express/commit/74beeac0718c928b4ba249aba3652c52fbe32ca8))
  </li>
</ul>

For a complete list of changes in this release, see [History.md](https://github.com/expressjs/express/blob/master/History.md#4183--2024-02-26)

### 4.18.2 - Release date: 2022-10-08
{: id="4.18.2"}

The 4.18.2 patch release includes the following bug fix:

<ul>
  <li markdown="1" class="changelog-item">
  Fix regression routing a large stack in a single route. ([commit](https://github.com/expressjs/express/commit/7ec5dd2b3c5e7379f68086dae72859f5573c8b9b))
  </li>
</ul>

For a complete list of changes in this release, see [History.md](https://github.com/expressjs/express/blob/master/History.md#4182--2022-10-08)

### 4.18.1 - Release date: 2022-04-29
{: id="4.18.1"}

The 4.18.1 patch release includes the following bug fix:

<ul>
  <li markdown="1" class="changelog-item">
  Fix the condition where if an Express application is created with a very large stack of routes, and all of those routes are sync (call `next()` synchronously), then the request processing may hang.
  </li>
</ul>

For a complete list of changes in this release, see [History.md](https://github.com/expressjs/express/blob/master/History.md#4181--2022-04-29).

### 4.18.0 - Release date: 2022-04-25
{: id="4.18.0"}

The 4.18.0 minor release includes bug fixes and some new features, including:

<ul>
  <li markdown="1" class="changelog-item">
  The [`app.get()` method](/{{ page.lang }}/4x/api.html#app.get) and the [`app.set()` method](/{{ page.lang }}/4x/api.html#app.set) now ignores properties directly on `Object.prototype` when getting a setting value.
  </li>

  <li markdown="1" class="changelog-item">
  The [`res.cookie()` method](/{{ page.lang }}/4x/api.html#res.cookie) now accepts a "priority" option to set the Priority attribute on the Set-Cookie response header.
  </li>

  <li markdown="1" class="changelog-item">
  The [`res.cookie()` method](/{{ page.lang }}/4x/api.html#res.cookie) now rejects an Invalid Date object provided as the "expires" option.
  </li>

  <li markdown="1" class="changelog-item">
  The [`res.cookie()` method](/{{ page.lang }}/4x/api.html#res.cookie) now works when `null` or `undefined` is explicitly provided as the "maxAge" argument.
  </li>

  <li markdown="1" class="changelog-item">
  Starting with this version, Express supports Node.js 18.x.
  </li>

  <li markdown="1" class="changelog-item">
  The [`res.download()` method](/{{ page.lang }}/4x/api.html#res.download) now accepts a "root" option to match [`res.sendFile()`](/{{ page.lang }}/4x/api.html#res.sendFile).
  </li>

  <li markdown="1" class="changelog-item">
  The [`res.download()` method](/{{ page.lang }}/4x/api.html#res.download) can be supplied with an `options` object without providing a `filename` argument, simplifying calls when the default `filename` is desired.
  </li>

  <li markdown="1" class="changelog-item">
  The [`res.format()` method](/{{ page.lang }}/4x/api.html#res.format) now invokes the provided "default" handler with the same arguments as the type handlers (`req`, `res`, and `next`).
  </li>

  <li markdown="1" class="changelog-item">
  The [`res.send()` method](/{{ page.lang }}/4x/api.html#res.send) will not attempt to send a response body when the response code is set to 205.
  </li>

  <li markdown="1" class="changelog-item">
  The default error handler will now remove certain response headers that will break the error response rendering, if they were set previously.
  </li>

  <li markdown="1" class="changelog-item">
  The status code 425 is now represented as the standard "Too Early" instead of "Unordered Collection".
  </li>
</ul>

For a complete list of changes in this release, see [History.md](https://github.com/expressjs/express/blob/master/History.md#4180--2022-04-25).

### 4.17.3 - Release date: 2022-02-16
{: id="4.17.3"}

The 4.17.3 patch release includes one bug fix:

<ul>
  <li markdown="1" class="changelog-item">
  Update to [qs module](https://www.npmjs.com/package/qs) for a fix around parsing `__proto__` properties.
  </li>
</ul>

For a complete list of changes in this release, see [History.md](https://github.com/expressjs/express/blob/master/History.md#4173--2022-02-16).

### 4.17.2 - Release date: 2021-12-16
{: id="4.17.2"}

The 4.17.2 patch release includes the following bug fixes:

<ul>
  <li markdown="1" class="changelog-item">
  Fix handling of `undefined` in `res.jsonp` when a callback is provided.
  </li>

  <li markdown="1" class="changelog-item">
  Fix handling of `undefined` in `res.json` and `res.jsonp` when `"json escape"` is enabled.
  </li>

  <li markdown="1" class="changelog-item">
  Fix handling of invalid values to the `maxAge` option of `res.cookie()`.
  </li>

  <li markdown="1" class="changelog-item">
  Update to [jshttp/proxy-addr module](https://www.npmjs.com/package/proxy-addr) to use `req.socket` over deprecated `req.connection`.
  </li>

  <li markdown="1" class="changelog-item">
  Starting with this version, Express supports Node.js 14.x.
  </li>

</ul>

For a complete list of changes in this release, see [History.md](https://github.com/expressjs/express/blob/master/History.md#4172--2021-12-16).

### 4.17.1 - Release date: 2019-05-25
{: id="4.17.1"}

The 4.17.1 patch release includes one bug fix:

<ul>
  <li markdown="1" class="changelog-item">
  The change to the `res.status()` API has been reverted due to causing regressions in existing Express 4 applications.
  </li>
</ul>

For a complete list of changes in this release, see [History.md](https://github.com/expressjs/express/blob/master/History.md#4171--2019-05-25).

### 4.17.0 - Release date: 2019-05-16
{: id="4.17.0"}

The 4.17.0 minor release includes bug fixes and some new features, including:

<ul>
  <li markdown="1" class="changelog-item">
  The `express.raw()` and `express.text()` middleware have been added to provide request body parsing for more raw request payloads. This uses the [expressjs/body-parser module](https://www.npmjs.com/package/body-parser) module underneath, so apps that are currently requiring the module separately can switch to the built-in parsers.
  </li>

  <li markdown="1" class="changelog-item">
  The `res.cookie()` API now supports the `"none"` value for the `sameSite` option.
  </li>

  <li markdown="1" class="changelog-item">
  When the `"trust proxy"` setting is enabled, the `req.hostname` now supports multiple `X-Forwarded-For` headers in a request.
  </li>

  <li markdown="1" class="changelog-item">
  Starting with this version, Express supports Node.js 10.x and 12.x.
  </li>

  <li markdown="1" class="changelog-item">
  The `res.sendFile()` API now provides and more immediate and easier to understand error when a non-string is passed as the `path` argument.
  </li>

  <li markdown="1" class="changelog-item">
  The `res.status()` API now provides and more immediate and easier to understand error when `null` or `undefined` is passed as the argument.
  </li>
</ul>

For a complete list of changes in this release, see [History.md](https://github.com/expressjs/express/blob/master/History.md#4170--2019-05-16).

### 4.16.4 - Release date: 2018-10-10
{: id="4.16.4"}

The 4.16.4 patch release includes various bug fixes:

<ul>
  <li markdown="1" class="changelog-item">
  Fix issue where `"Request aborted"` may be logged in `res.sendfile`.
  </li>
</ul>

For a complete list of changes in this release, see [History.md](https://github.com/expressjs/express/blob/master/History.md#4164--2018-10-10).

### 4.16.3 - Release date: 2018-03-12
{: id="4.16.3"}

The 4.16.3 patch release includes various bug fixes:

<ul>
  <li markdown="1" class="changelog-item">
  Fix issue where a plain `%` at the end of the url in the `res.location` method or the `res.redirect` method would not get encoded as `%25`.
  </li>

  <li markdown="1" class="changelog-item">
  Fix issue where a blank `req.url` value can result in a thrown error within the default 404 handling.
  </li>

  <li markdown="1" class="changelog-item">
  Fix the generated HTML document for `express.static` redirect responses to properly include `</html>`.
  </li>
</ul>

For a complete list of changes in this release, see [History.md](https://github.com/expressjs/express/blob/master/History.md#4163--2018-03-12).

### 4.16.2 - Release date: 2017-10-09
{: id="4.16.2"}

The 4.16.2 patch release includes a regression bug fix:

<ul>
  <li markdown="1" class="changelog-item">
  Fix a `TypeError` that can occur in the `res.send` method when a `Buffer` is passed to `res.send` and the `ETag` header is already set on the response.
  </li>
</ul>

For a complete list of changes in this release, see [History.md](https://github.com/expressjs/express/blob/master/History.md#4162--2017-10-09).

### 4.16.1 - Release date: 2017-09-29
{: id="4.16.1"}

The 4.16.1 patch release includes a regression bug fix:

<ul>
  <li markdown="1" class="changelog-item">
  Update to [pillarjs/send module](https://www.npmjs.com/package/send) to fix an edge case scenario regression that affected certain users of `express.static`.
  </li>
</ul>

For a complete list of changes in this release, see [History.md](https://github.com/expressjs/express/blob/master/History.md#4161--2017-09-29).

### 4.16.0 - Release date: 2017-09-28
{: id="4.16.0"}

The 4.16.0 minor release includes security updates, bug fixes, performance enhancements, and some new features, including:

<ul>
  <li markdown="1" class="changelog-item">
  Update to [jshttp/forwarded module](https://www.npmjs.com/package/forwarded) to address a [vulnerability](https://npmjs.com/advisories/527). This may affect your application if the following APIs are used: `req.host`, `req.hostname`, `req.ip`, `req.ips`, `req.protocol`.
  </li>

  <li markdown="1" class="changelog-item">
  Update a dependency of the [pillarjs/send module](https://www.npmjs.com/package/send) to address a [vulnerability](https://npmjs.com/advisories/535) in the `mime` dependency. This may affect your application if untrusted string input is passed to the following APIs: `res.type()`.
  </li>

  <li markdown="1" class="changelog-item">
  The [pillarjs/send module](https://www.npmjs.com/package/send) has implemented a protection against the Node.js 8.5.0 [vulnerability](https://nodejs.org/en/blog/vulnerability/september-2017-path-validation/). Using any prior version of Express with Node.js 8.5.0 (that specific Node.js version) will make the following APIs vulnerable: `express.static`, `res.sendfile`, and `res.sendFile`.
  </li>

  <li markdown="1" class="changelog-item">
  Starting with this version, Express supports Node.js 8.x.
  </li>

  <li markdown="1" class="changelog-item">
  The new setting `"json escape"` can be enabled to escape characters in `res.json()`, `res.jsonp()` and `res.send()` responses that can trigger clients to sniff the response as HTML instead of honoring the `Content-Type`. This can help protect an Express app from a class of persistent XSS-based attacks.
  </li>

  <li markdown="1" class="changelog-item">
  The [`res.download()` method](/{{ page.lang }}/4x/api.html#res.download) now accepts an optional `options` object.
  </li>

  <li markdown="1" class="changelog-item">
  The `express.json()` and `express.urlencoded()` middleware have been added to provide request body parsing support out-of-the-box. This uses the [expressjs/body-parser module](https://www.npmjs.com/package/body-parser) module underneath, so apps that are currently requiring the module separately can switch to the built-in parsers.
  </li>

  <li markdown="1" class="changelog-item">
  The [`express.static()` middleware](/{{ page.lang }}/4x/api.html#express.static) and [`res.sendFile()` method](/{{ page.lang }}/4x/api.html#res.sendFile) now support setting the `immutable` directive on the `Cache-Control` header. Setting this header with an appropriate `maxAge` will prevent supporting web browsers from sending any request to the server when the file is still in their cache.
  </li>

  <li markdown="1" class="changelog-item">
  The [pillarjs/send module](https://www.npmjs.com/package/send) has an updated list of MIME types to better set the `Content-Type` of more files. There are 70 new types for file extensions.
  </li>
</ul>

For a complete list of changes in this release, see [History.md](https://github.com/expressjs/express/blob/master/History.md#4160--2017-09-28).

### 4.15.5 - Release date: 2017-09-24
{: id="4.15.5"}

The 4.15.5 patch release includes security updates, some minor performance enhancements, and a bug fix:

<ul>
  <li markdown="1" class="changelog-item">
  Update to [debug module](https://www.npmjs.com/package/debug) to address a [vulnerability](https://snyk.io/vuln/npm:debug:20170905), but this issue does not impact Express.
  </li>

  <li markdown="1" class="changelog-item">
  Update to [jshttp/fresh module](https://www.npmjs.com/package/fresh) to address a [vulnerability](https://npmjs.com/advisories/526). This will affect your application if the following APIs are used: `express.static`, `req.fresh`, `res.json`, `res.jsonp`, `res.send`, `res.sendfile` `res.sendFile`, `res.sendStatus`.
  </li>

  <li markdown="1" class="changelog-item">
  Update to [jshttp/fresh module](https://www.npmjs.com/package/fresh) fixes handling of modified headers with invalid dates and makes parsing conditional headers (like `If-None-Match`) faster.
  </li>
</ul>

For a complete list of changes in this release, see [History.md](https://github.com/expressjs/express/blob/master/History.md#4155--2017-09-24).

### 4.15.4 - Release date: 2017-08-06
{: id="4.15.4"}

The 4.15.4 patch release includes some minor bug fixes:

<ul>
  <li markdown="1" class="changelog-item">
  Fix array being set for `"trust proxy"` value being manipulated in certain conditions.
  </li>
</ul>

For a complete list of changes in this release, see [History.md](https://github.com/expressjs/express/blob/master/History.md#4154--2017-08-06).

### 4.15.3 - Release date: 2017-05-16
{: id="4.15.3"}

The 4.15.3 patch release includes a security update and some minor bug fixes:

<ul>
  <li markdown="1" class="changelog-item">
  Update a dependency of the [pillarjs/send module](https://www.npmjs.com/package/send) to address a [vulnerability](https://snyk.io/vuln/npm:ms:20170412). This may affect your application if untrusted string input is passed to the `maxAge` option in the following APIs: `express.static`, `res.sendfile`, and `res.sendFile`.
  </li>

  <li markdown="1" class="changelog-item">
  Fix error when `res.set` cannot add charset to `Content-Type`.
  </li>

  <li markdown="1" class="changelog-item">
  Fix missing `</html>` in HTML document.
  </li>
</ul>

For a complete list of changes in this release, see [History.md](https://github.com/expressjs/express/blob/master/History.md#4153--2017-05-16).

### 4.15.2 - Release date: 2017-03-06
{: id="4.15.2"}

The 4.15.2 patch release includes a minor bug fix:

<ul>
  <li markdown="1" class="changelog-item">
  Fix regression parsing keys starting with `[` in the extended  (default) query parser.
  </li>
</ul>

For a complete list of changes in this release, see [History.md](https://github.com/expressjs/express/blob/master/History.md#4152--2017-03-06).

### 4.15.1 - Release date: 2017-03-05
{: id="4.15.1"}

The 4.15.1 patch release includes a minor bug fix:

<ul>
  <li markdown="1" class="changelog-item">
  Fix compatibility issue when using the datejs 1.x library where the [`express.static()` middleware](/{{ page.lang }}/4x/api.html#express.static) and [`res.sendFile()` method](/{{ page.lang }}/4x/api.html#res.sendFile) would incorrectly respond with 412 Precondition Failed.
  </li>
</ul>

For a complete list of changes in this release, see [History.md](https://github.com/expressjs/express/blob/master/History.md#4151--2017-03-05).

### 4.15.0 - Release date: 2017-03-01
{: id="4.15.0"}

The 4.15.0 minor release includes bug fixes, performance improvements, and other minor feature additions, including:

<ul>
  <li markdown="1" class="changelog-item">
  Starting with this version, Express supports Node.js 7.x.
  </li>

  <li markdown="1" class="changelog-item">
  The [`express.static()` middleware](/{{ page.lang }}/4x/api.html#express.static) and [`res.sendFile()` method](/{{ page.lang }}/4x/api.html#res.sendFile) now support the `If-Match` and `If-Unmodified-Since` request headers.
  </li>

  <li markdown="1" class="changelog-item">
  Update to [jshttp/etag module](https://www.npmjs.com/package/etag) to generate the default ETags for responses which work when Node.js has [FIPS-compliant crypto enabled](https://nodejs.org/dist/latest/docs/api/cli.html#cli_enable_fips).
  </li>

  <li markdown="1" class="changelog-item">
  Various auto-generated HTML responses like the default not found and error handlers will respond with complete HTML 5 documents and additional security headers.
  </li>
</ul>

For a complete list of changes in this release, see [History.md](https://github.com/expressjs/express/blob/master/History.md#4150--2017-03-01).

### 4.14.1 - Release date: 2017-01-28
{: id="4.14.1"}

The 4.14.1 patch release includes bug fixes and performance improvements, including:

<ul>
  <li markdown="1" class="changelog-item">
  Update to [pillarjs/finalhandler module](https://www.npmjs.com/package/finalhandler) fixes an exception when Express handles an `Error` object which has a `headers` property that is not an object.
  </li>
</ul>

For a complete list of changes in this release, see [History.md](https://github.com/expressjs/express/blob/master/History.md#4141--2017-01-28).

### 4.14.0 - Release date: 2016-06-16
{: id="4.14.0"}

The 4.14.0 minor release includes bug fixes, security update, performance improvements, and other minor feature additions, including:

<ul>
  <li markdown="1" class="changelog-item">
  Starting with this version, Express supports Node.js 6.x.
  </li>

  <li markdown="1" class="changelog-item">
  Update to [jshttp/negotiator module](https://www.npmjs.com/package/negotiator) fixes a [regular expression denial of service vulnerability](https://npmjs.com/advisories/106).
  </li>

  <li markdown="1" class="changelog-item">
  The [`res.sendFile()` method](/{{ page.lang }}/4x/api.html#res.sendFile) now accepts two new options: `acceptRanges` and `cacheControl`.

  - `acceptRanges` (defaut is `true`), enables or disables accepting ranged requests. When disabled, the response does not send the `Accept-Ranges` header and ignores the contents of the `Range` request header.

  - `cacheControl`, (default is `true`), enables or disables the `Cache-Control` response header. Disabling it will ignore the `maxAge` option.

  - `res.sendFile` has also been updated to handle `Range` header and redirections better.
  </li>

  <li markdown="1" class="changelog-item">
  The [`res.location()` method](/{{ page.lang }}/4x/api.html#res.location) and [`res.redirect()` method](/{{ page.lang }}/4x/api.html#res.redirect) will now URL-encode the URL string, if it is not already encoded.
  </li>

  <li markdown="1" class="changelog-item">
  The performance of the [`res.json()` method](/{{ page.lang }}/4x/api.html#res.json) and [`res.jsonp()` method](/{{ page.lang }}/4x/api.html#res.jsonp) have been improved in the common cases.
  </li>

  <li markdown="1" class="changelog-item">
  The [jshttp/cookie module](https://www.npmjs.com/package/cookie) (in addition to a number of other improvements) has been updated and now the [`res.cookie()` method](/{{ page.lang }}/4x/api.html#res.cookie) supports the `sameSite` option to let you specify the [SameSite cookie attribute](https://tools.ietf.org/html/draft-west-first-party-cookies-07).  
  
  {% capture note-4-14-0 %}

    This attribute has not yet been fully standardized, may change in the future, and many clients may ignore it.

  {% endcapture %}
  {% include admonitions/note.html content=note-4-14-0 %}

  The possible value for the `sameSite` option are:

  - `true`, which sets the `SameSite` attribute to `Strict` for strict same site enforcement.
  - `false`, which does not set the `SameSite` attribute.
  - `'lax'`, which sets the `SameSite` attribute to `Lax` for lax same site enforcement.
  - `'strict'`, which sets the `SameSite` attribute to `Strict` for strict same site enforcement.
  </li>

  <li markdown="1" class="changelog-item">
  Absolute path checking on Windows, which was incorrect for some cases, has been fixed.
  </li>

  <li markdown="1" class="changelog-item">
  IP address resolution with proxies has been greatly improved.
  </li>

  <li markdown="1" class="changelog-item">
  The [`req.range()` method](/{{ page.lang }}/4x/api.html#req.range) options object now supports a `combine` option (`false` by default), which when `true`, combines overlapping and adjacent ranges and returns them as if they were specified that way in the header.
  </li>
</ul>

For a complete list of changes in this release, see [History.md](https://github.com/expressjs/express/blob/master/History.md#4140--2016-06-16).

</div>
