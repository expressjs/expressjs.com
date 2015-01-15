If `name` is one of the application settings, it will affect the behavior of the application. The possible application settings are listed in the following table.

<table class="doctable" border="1">
  <thead><tr><th id="app-settings-property">Property</th><th>Value</th><th>Default</th></tr></thead>
  <tbody>
  <tr>
    <td>`trust proxy`</td>
    <td>
      <p>
      Indicate that the app is sitting behind a front-facing proxy, and the `X-Forwarded-*` headers may be trusted for determining the connection and the IP address of the client. It must, however, be noted that, the `X-Forwarded-*` headers are easily spoofed and the detected IP addresses are unreliable.  
      </p>
      <p>
      `trust proxy` is disabled by default. When enabled, Express attempts to determine the IP address of the client which is connected through the front-facing proxy, or a series of proxies. The `req.ips` property, then, contains an array of IP addresses the client is connected through. It can be enabled using either of the values specified in the [`trust proxy` options-table](#trust.proxy.options.table).  
      </p>
      <p>
      The `trust proxy` setting is implemented using the [proxy-addr](https://www.npmjs.org/package/proxy-addr) package, look up its documentation for further details.
      </p>
    </td>
    <td>Disabled.</td>
  </tr>
  <tr>
    <td>`env`</td>
    <td>Environment mode.</td>
    <td>`process.env.NODE_ENV` (`NODE_ENV` environment variable) or "development".</td>
  </tr>
  <tr>
    <td>`subdomain offset`</td>
    <td>The number of dot-separated parts of the host to remove to access subdomain.</td>
    <td>2</td>
  </tr>
  <tr>
    <td>`jsonp callback name`</td>
    <td>Specifies the default JSONP callback name.</td>
    <td>`?callback=`</td>
  </tr>
  <tr>
    <td>`json replacer`</td>
    <td>JSON replacer callback.</td>
    <td>`null`</td>
  </tr>
  <tr>
    <td>`json spaces`</td>
    <td>When set, sends prettified JSON string indented with the specified amount of spaces.</td>
    <td>Disabled.</td>
  </tr>
  <tr>
    <td>`case sensitive routing`</td>
    <td>Enable case sensitivity.</td>
    <td>Disabled. Treats "/Foo" and "/foo" as the same.</td>
  </tr>
  <tr>
    <td>`strict routing`</td>
    <td>Enable strict routing.</td>
    <td>Disabled. Treats "/foo" and "/foo/" as the same by the router.</td>
  </tr>
  <tr>
    <td>`view cache`</td>
    <td>Enables view template compilation caching.</td>
    <td>Enabled in production.</td>
  </tr>
  <tr>
    <td>`view engine`</td>
    <td>The default engine extension to use when omitted.</td>
    <td></td>
  </tr>
  <tr>
    <td>`views`</td>
    <td>A directory or an array of directories for the application's views. If an array is specified, the views are looked up in sequence in the array of directories.</td>
    <td>`"process.cwd() + '/views'"`</td>
  </tr>
  <tr>
    <td>`query parser`</td>
    <td>The query parser to use - "simple" or "extended". The simple query parser is based on node's native query parser, [querystring](http://nodejs.org/api/querystring.html). The extended query parser is based on [qs](https://www.npmjs.org/package/qs).</td>
    <td>"extended"</td>
  </tr>
  <tr>
    <td>`x-powered-by`</td>
    <td>Enables the "X-Powered-By: Express" HTTP header.</td>
    <td>Enabled.</td>
  </tr>
  <tr>
    <td>`etag`</td>
    <td>
      <p>Set the ETag response header. For the possible value, refer the [`etag` options table](#etag.options.table).</p>
      <p>[More about the HTTP ETag header](http://en.wikipedia.org/wiki/HTTP_ETag).</p>
    </td>
    <td></td>
  </tr>
  </tbody>
</table>

<h5 id="trust.proxy.options.table">`trust proxy` options table</h5>

<table class="doctable" border="1">
  <thead><tr><th>Type</th><th>Value</th></tr></thead>
  <tbody>
    <tr>
      <td>** Boolean **</td>
      <td>
        <p>
        If `true`, the client's IP address is understood as the left-most entry in the `X-Forwarded-*` header.  
        </p>
        <p>
        If `false`, the app is understood as directly facing the Internet and the client's IP address is derived from `req.connection.remoteAddress`. This is the default setting.
        </p>
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

<h5 id="etag.options.table">`etag` options table</h5>

<table class="doctable" border="1">
  <thead><tr><th>Type</th><th>Value</th></tr></thead>
  <tbody>
    <tr>
      <td>** Boolean **</td>
      <td>
          `true` enables weak ETag. This is the default setting.<br>
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
