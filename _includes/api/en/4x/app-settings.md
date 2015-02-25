If `name` is one of the application settings, it affects the behavior of the application. The following table lists application settings.

<div class="table-scroller">
  <table class="doctable" border="1">
    <thead><tr><th id="app-settings-property">Property</th><th>Type</th><th>Value</th><th>Default</th></tr></thead>
    <tbody>
    <tr>
  <td markdown="1">
  `case sensitive routing`
  </td>
      <td>Boolean</td>
      <td>Enable case sensitivity.</td>
      <td>Disabled. Treats "/Foo" and "/foo" as the same.</td>
    </tr>
    <tr>
  <td markdown="1">
  `env`
  </td>
      <td>String</td>
      <td>Environment mode.</td>
  <td markdown="1">
  `process.env.NODE_ENV` (`NODE_ENV` environment variable) or "development".
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
      <td></td>
    </tr>
    <tr>
  <td markdown="1">
  `jsonp callback name`
  </td>
      <td>String</td>
      <td>Specifies the default JSONP callback name.</td>
  <td markdown="1">
  `?callback=`
  </td>
    </tr>
    <tr>
  <td markdown="1">
  `json replacer`
  </td>
      <td>String</td>
      <td>JSON replacer callback.</td>
  <td markdown="1">
  `null`
  </td>
    </tr>
    <tr>
  <td markdown="1">
  `json spaces`
  </td>
      <td>Number</td>
      <td>When set, sends prettified JSON string indented with the specified amount of spaces.</td>
      <td>Disabled.</td>
    </tr>
    <tr>
  <td markdown="1">
  `query parser`
  </td>
      <td>String</td>
  <td markdown="1">
  The query parser to use, either "simple" or "extended". The simple query parser is based on Node's native query parser, [querystring](http://nodejs.org/api/querystring.html). The extended query parser is based on [qs](https://www.npmjs.org/package/qs).
  </td>
      <td>"extended"</td>
    </tr>
    <tr>
  <td markdown="1">
  `strict routing`
  </td>
      <td>Boolean</td>
      <td>Enable strict routing.</td>
      <td>Disabled. Treats "/foo" and "/foo/" as the same by the router.</td>
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

  `trust proxy` is disabled by default. When enabled, Express attempts to determine the IP address of the client connected through the front-facing proxy, or series of proxies. The `req.ips` property, then, contains an array of IP addresses the client is connected through. To enable it, use the values described in the [`trust proxy` options table](#trust.proxy.options.table).  

  The `trust proxy` setting is implemented using the [proxy-addr](https://www.npmjs.org/package/proxy-addr) package.  For more information, see its documentation.
  </td>
      <td>Disabled.</td>
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
      <td>Enables view template compilation caching.</td>
  <td markdown="1">
  `true` in production.
  </td>
    </tr>
    <tr>
  <td markdown="1">
  `view engine`
  </td>
      <td>String</td>
      <td>The default engine extension to use when omitted.</td>
      <td></td>
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
        <td>IP addresses</td>
  <td markdown="1">
  An IP address, subnet, or an array of IP addresses, and subnets to trust. The following is the list of pre-configured subnet names.

  * loopback - `127.0.0.1/8`, `::1/128`
  * linklocal - `169.254.0.0/16`, `fe80::/10`
  * uniquelocal - `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `fc00::/7`

  Set IP addresses in any of the following ways:  

  <pre><code class="language-js">app.set('trust proxy', 'loopback') // specify a single subnet
  app.set('trust proxy', 'loopback, 123.123.123.123') // specify a subnet and an address
  app.set('trust proxy', 'loopback, linklocal, uniquelocal') // specify multiple subnets as CSV
  app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']) // specify multiple subnets as an array</code></pre>

  When specified, the IP addresses or the subnets are excluded from the address determination process, and the untrusted IP address nearest to the application server is determined as the client's IP address.
  </td>
      </tr>
      <tr>
        <td>Number</td>
  <td markdown="1">
  Trust the `n`th hop from the front-facing proxy server as the client.
  </td>
      </tr>
      <tr>
        <td>Function</td>
  <td markdown="1">
  Custom trust implementation. Use this only if you know what you are doing.
  <pre><code class="language-js">app.set('trust proxy', function (ip) {
    if (ip === '127.0.0.1' || ip === '123.123.123.123') return true; // trusted IPs
    else return false;
  })</code></pre>
  </td>
      </tr>
    </tbody>
  </table>

  <h5 id="etag.options.table">Options for `etag` setting</h5>

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

  <pre><code class="language-js">app.set('etag', function (body, encoding) {
  return generateHash(body, encoding); // consider the function is defined
  })</code></pre>

  </td>
      </tr>
    </tbody>
  </table>
</div>
