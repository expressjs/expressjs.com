<h3 id='req.protocol'>req.protocol</h3>

The request protocol string, "http" or "https" when requested with TLS. When the "trust proxy" [setting](/4x/api.html#trust.proxy.options.table) trusts the socket address, the value of the "X-Forwarded-Proto" header ("http" or "https") field will be trusted and used if present.

~~~js
req.protocol
// => "http"
~~~
