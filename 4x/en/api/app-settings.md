Express application settings can be set using [`app.set()`](#app.set), and retrieved using [`app.get()`](#app.get). The following settings will alter how the app behaves:

* `trust proxy` Indicate that the app is sitting behind a front-facing proxy, and the `X-Forwarded-*` headers may be trusted for determining the connection and the IP address of the client. It must, however, be noted that, the `X-Forwarded-*` headers are easily spoofed and the detected IP addresses are unreliable.

  `trust proxy` is disabled by default. When enabled, Express attempts to determine the IP address of the client which is connected through the front-facing proxy, or a series of proxies. The `req.ips` property, then, contains an array of IP addresses the client is connected through. It can be enabled using either of the following values.

  <table class="doctable" border="1">
    <thead><tr><th>Type</th><th>Value</th></tr></thead>
    <tbody>
      <tr>
        <td>** Boolean **</td>
        <td>
          If `true`, the client's IP address is understood as the left-most entry in the `X-Forwarded-*` header.  

          If `false`, the app is understood as directly facing the Internet and the client's IP address is derived from `req.connection.remoteAddress`. This is the default setting.
        </td>
      </tr>
      <tr>
        <td>** IP addresses **</td>
        <td>
          An IP address, subnet, or an array of IP addresses, and subnets to trust. The following is the list of pre-configured subnet names.
            <ul>
              <li>loopback - `127.0.0.1/8`, `::1/128`</li>
              <li>linklocal - `169.254.0.0/16`, `fe80::/10`</li>
              <li>uniquelocal - `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `fc00::/7`</li>
            </ul>
          The IP addresses can be set in the following ways.  

          <pre><code class="lang-js">app.set('trust proxy', 'loopback') // specify a single subnet
  app.set('trust proxy', 'loopback, 123.123.123.123') // specify a subnet and an address
  app.set('trust proxy', 'loopback, linklocal, uniquelocal') // specify multiple subnets as CSV
  app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']) // specify multiple subnets as an array</code></pre>

          When specified, the IP addresses or the subnets are excluded from the address determination process, and the untrusted IP address nearest to the application server is determined as the client's IP address.
        </td>
      </tr>
      <tr>
        <td>** Number **</td>
        <td>Trust the `n`th hop from the front-facing proxy server as the client.</td>
      </tr>
      <tr>
        <td>** Function **</td>
        <td> Custom trust implementation. Use this only if you know what you are doing.

            <pre><code class="lang-js">app.set('trust proxy', function (ip) {
    if (ip === '127.0.0.1' || ip === '123.123.123.123') return true; // trusted IPs
    else return false;
  })</code></pre>
      </tr>
    </tbody>
  </table>

  The `trust proxy` setting is implemented using the [proxy-addr](https://www.npmjs.org/package/proxy-addr) package, look up its documentation for further details.
* `env` Environment mode, defaults to `process.env.NODE_ENV` (`NODE_ENV` environment variable) or "development".
* `subdomain offset` The number of dot-separated parts of the host to remove to access subdomain, two by default.
* `jsonp callback name` Changes the default callback name of `?callback=`.
* `json replacer` JSON replacer callback, `null` by default.
* `json spaces` When set, sends prettified JSON string indented with the specified amount of spaces. Disabled by default.
* `case sensitive routing` Enable case sensitivity, disabled by default, treating "/Foo" and "/foo" as the same.
* `strict routing` Enable strict routing, by default "/foo" and "/foo/" are treated the same by the router.
* `view cache` Enables view template compilation caching, enabled in production by default.
* `view engine` The default engine extension to use when omitted.
* `views` The view directory path, defaulting to `"process.cwd() + '/views'"`.
* `query parser` The query parser to use - "simple" or "extended", defaults to "extended". The simple query parser is based on node's native query parser, [querystring](http://nodejs.org/api/querystring.html). The extended query parser is based on [qs](https://www.npmjs.org/package/qs).
* `x-powered-by` Enables the "X-Powered-By: Express" HTTP header, enabled by default.
* `etag` Set the ETag response header.
  <table class="doctable" border="1">
    <thead><tr><th>Type</th><th>Value</th></tr></thead>
    <tbody>
      <tr>
        <td>** Boolean **</td>
        <td>
            `true` enables strong ETag. This is the default setting.<br>
            `false` disables ETag altogether.
        </td>
      </tr>
      <tr>
        <td>** String **</td>
        <td>
            If "strong", enables strong ETag.<br>
            If "weak", enables weak ETag.
        </td>
      </tr>
      <tr>
        <td>** Function **</td>
        <td> Custom ETag function implementation. Use this only if you know what you are doing.

          <pre><code class="lang-js">app.set('etag', function (body, encoding) {
    return generateHash(body, encoding); // consider the function is defined
  })</code></pre>

        </td>
      </tr>
    </tbody>
  </table>

  [More about the HTTP ETag header](http://en.wikipedia.org/wiki/HTTP_ETag).
