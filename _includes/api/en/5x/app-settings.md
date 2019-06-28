The following table lists application settings.

Note that sub-apps will:

* Not inherit the value of settings that have a default value.  You must set the value in the sub-app.
* Inherit the value of settings with no default value; these are explicitly noted in the table below.

Exceptions: Sub-apps will inherit the value of `trust proxy` even though it has a default value (for backward-compatibility);
Sub-apps will not inherit the value of `view cache` in production (when `NODE_ENV` is "production").

<div class="table-scroller">
  <table class="doctable" border="1">
    <thead><tr><th id="app-settings-property">Property</th><th>Type</th><th>Description</th><th>Default</th></tr></thead>
    <tbody>
    <tr>
  <td markdown="1">
  `case sensitive routing`
  </td>
      <td>Boolean</td>
      <td><p>Enable case sensitivity.
      When enabled, "/Foo" and "/foo" are different routes.
      When disabled, "/Foo" and "/foo" are treated the same.</p>
        <p><b>NOTE</b>: Sub-apps will inherit the value of this setting.</p>
      </td>
      <td>N/A (undefined)
      </td>
    </tr>
    <tr>
  <td markdown="1">
  `env`
  </td>
      <td>String</td>
      <td>Environment mode.
      Be sure to set to "production" in a production environment;
      see <a href="/advanced/best-practice-performance.html#env">Production best practices: performance and reliability</a>.
    </td>
  <td markdown="1">
  `process.env.NODE_ENV` (`NODE_ENV` environment variable) or "development" if `NODE_ENV` is not set.
  </td>
    </tr>
    <tr>
  <td markdown="1">
  `etag`
  </td>
  <td>Varied</td>
  <td markdown="1">
  Set the ETag response header. For possible values, see the [`etag` options table](#etag.options.table).

  [More about the HTTP ETag header](http://en.wikipedia.org/wiki/HTTP_ETag).
  </td>
  <td markdown="1">
  `weak`
  </td>
    </tr>
    <tr>
  <td markdown="1">
  `jsonp callback name`
  </td>
      <td>String</td>
      <td>Specifies the default JSONP callback name.</td>
  <td markdown="1">
  "callback"
  </td>
    </tr>
    <tr>
  <td markdown="1">
  `json escape`
  </td>
  <td>Boolean</td>
  <td markdown="1">
  Enable escaping JSON responses from the `res.json`, `res.jsonp`, and `res.send` APIs. This will escape the characters `<`, `>`, and `&` as Unicode escape sequences in JSON. The purpose of this it to assist with [mitigating certain types of persistent XSS attacks](https://blog.mozilla.org/security/2017/07/18/web-service-audits-firefox-accounts/) when clients sniff responses for HTML.
  <p><b>NOTE</b>: Sub-apps will inherit the value of this setting.</p>
  </td>
  <td>N/A (undefined)</td>
    </tr>
    <tr>
  <td markdown="1">
  `json replacer`
  </td>
      <td>Varied</td>
      <td>The <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_replacer_parameter">'replacer' argument used by `JSON.stringify`</a>.
        <p><b>NOTE</b>: Sub-apps will inherit the value of this setting.</p>
      </td>
  <td>N/A (undefined)
  </td>
    </tr>
    <tr>
  <td markdown="1">
  `json spaces`
  </td>
      <td>Varied</td>
      <td>The <a href="https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_space_argument">'space' argument used by `JSON.stringify`</a>.
This is typically set to the number of spaces to use to indent prettified JSON.
        <p><b>NOTE</b>: Sub-apps will inherit the value of this setting.</p>
      </td>
      <td>N/A (undefined)</td>
    </tr>
    <tr>
  <td markdown="1">
  `query parser`
  </td>
      <td>Varied</td>
  <td markdown="1">
Disable query parsing by setting the value to `false`, or set the query parser to use either "simple" or "extended" or a custom query string parsing function.

The simple query parser is based on Node's native query parser, [querystring](http://nodejs.org/api/querystring.html).

The extended query parser is based on [qs](https://www.npmjs.org/package/qs).

A custom query string parsing function will receive the complete query string, and must return an object of query keys and their values.
  </td>
      <td>"extended"</td>
    </tr>
    <tr>
  <td markdown="1">
  `strict routing`
  </td>
      <td>Boolean</td>
      <td><p>Enable strict routing.
      When enabled, the router treats "/foo" and "/foo/" as different.
      Otherwise, the router treats "/foo" and "/foo/" as the same.</p>
        <p><b>NOTE</b>: Sub-apps will inherit the value of this setting.</p>
      </td>
      <td>N/A (undefined) </td>
    </tr>
    <tr>
  <td markdown="1">
  `subdomain offset`
  </td>
      <td>Number</td>
      <td>The number of dot-separated parts of the host to remove to access subdomain.</td>
      <td>2</td>
    </tr>
    <tr>
  <td markdown="1">
  `trust proxy`
  </td>
      <td>Varied</td>
  <td markdown="1">
  Indicates the app is behind a front-facing proxy, and to use the `X-Forwarded-*` headers to determine the connection and the IP address of the client. NOTE: `X-Forwarded-*` headers are easily spoofed and the detected IP addresses are unreliable.
<p>
  When enabled, Express attempts to determine the IP address of the client connected through the front-facing proxy, or series of proxies. The `req.ips` property, then contains an array of IP addresses the client is connected through. To enable it, use the values described in the <a href="#trust.proxy.options.table">trust proxy options table</a>.
</p><p>
  The `trust proxy` setting is implemented using the <a href="https://www.npmjs.org/package/proxy-addr">proxy-addr</a> package.  For more information, see its documentation.
</p><p>
<b>NOTE</b>: Sub-apps <i>will</i> inherit the value of this setting, even though it has a default value.
</p>
  </td>
  <td markdown="1">
  `false` (disabled)
  </td>
    </tr>
    <tr>
  <td markdown="1">
  `views`
  </td>
      <td>String or Array</td>
      <td>A directory or an array of directories for the application's views. If an array, the views are looked up in the order they occur in the array.</td>
  <td markdown="1">
  `process.cwd() + '/views'`
  </td>
    </tr>
    <tr>
  <td markdown="1">
  `view cache`
  </td>
      <td>Boolean</td>
      <td><p>Enables view template compilation caching.</p>
      <p><b>NOTE</b>: Sub-apps will not inherit the value of this setting in production (when `NODE_ENV` is "production").</p>
      </td>
  <td markdown="1">
  `true` in production, otherwise undefined.
  </td>
    </tr>
    <tr>
  <td markdown="1">
  `view engine`
  </td>
      <td>String</td>
      <td>The default engine extension to use when omitted.
        <p><b>NOTE</b>: Sub-apps will inherit the value of this setting.</p>
      </td>
      <td>N/A (undefined)</td>
    </tr>
    <tr>
  <td markdown="1">
  `x-powered-by`
  </td>
      <td>Boolean</td>
      <td>Enables the "X-Powered-By: Express" HTTP header.</td>
  <td markdown="1">
  `true`
  </td>
    </tr>
    </tbody>
  </table>

  <h5 id="trust.proxy.options.table">Options for `trust proxy` setting</h5>

  <p markdown="1">
  Read [Express behind proxies](/guide/behind-proxies.html) for more
  information.
  </p>

  <table class="doctable" border="1">
    <thead><tr><th>Type</th><th>Value</th></tr></thead>
    <tbody>
      <tr>
        <td>Boolean</td>
  <td markdown="1">
  If `true`, the client's IP address is understood as the left-most entry in the `X-Forwarded-*` header.

  If `false`, the app is understood as directly facing the Internet and the client's IP address is derived from `req.connection.remoteAddress`. This is the default setting.
  </td>
      </tr>
      <tr>
        <td>String<br/>String containing comma-separated values<br/>Array of strings </td>
  <td markdown="1">
  An IP address, subnet, or an array of IP addresses, and subnets to trust. Pre-configured subnet names are:

  * loopback - `127.0.0.1/8`, `::1/128`
  * linklocal - `169.254.0.0/16`, `fe80::/10`
  * uniquelocal - `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `fc00::/7`

  Set IP addresses in any of the following ways:

Specify a single subnet:

```js
app.set('trust proxy', 'loopback')
```

Specify a subnet and an address:

```js
app.set('trust proxy', 'loopback, 123.123.123.123')
```

Specify multiple subnets as CSV:

```js
app.set('trust proxy', 'loopback, linklocal, uniquelocal')
```

Specify multiple subnets as an array:

```js
app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal'])
```

  When specified, the IP addresses or the subnets are excluded from the address determination process, and the untrusted IP address nearest to the application server is determined as the client's IP address.
  </td>
      </tr>
      <tr>
        <td>Number</td>
  <td markdown="1">
  Trust the <i>n</i><sup>th</sup> hop from the front-facing proxy server as the client.
  </td>
      </tr>
      <tr>
        <td>Function</td>
  <td markdown="1">
  Custom trust implementation. Use this only if you know what you are doing.

```js
app.set('trust proxy', function (ip) {
  if (ip === '127.0.0.1' || ip === '123.123.123.123') return true // trusted IPs
  else return false
})
```
  </td>
      </tr>
    </tbody>
  </table>

  <h5 id="etag.options.table">Options for `etag` setting</h5>

<p markdown="1">
**NOTE**:  These settings apply only to dynamic files, not static files.
The [express.static](#express.static) middleware ignores these settings.
</p>

  <p markdown="1">
  The ETag functionality is implemented using the
  [etag](https://www.npmjs.org/package/etag) package.
  For more information, see its documentation.
  </p>

  <table class="doctable" border="1">
    <thead><tr><th>Type</th><th>Value</th></tr></thead>
    <tbody>
      <tr>
        <td>Boolean</td>
  <td markdown="1">
  `true` enables weak ETag. This is the default setting.<br>
  `false` disables ETag altogether.
  </td>
      </tr>
      <tr>
        <td>String</td>
        <td>
            If "strong", enables strong ETag.<br>
            If "weak", enables weak ETag.
        </td>
      </tr>
      <tr>
        <td>Function</td>
  <td markdown="1">Custom ETag function implementation. Use this only if you know what you are doing.

```js
app.set('etag', function (body, encoding) {
  return generateHash(body, encoding) // consider the function is defined
})
```
  </td>
      </tr>
    </tbody>
  </table>
</div>
