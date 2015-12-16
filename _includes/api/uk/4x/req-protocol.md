<h3 id='req.protocol'>req.protocol</h3>

The request protocol string, `http` or `https` when requested with TLS.

When the [`trust proxy` setting](/{{ page.lang }}/4x/api.html#trust.proxy.options.table) is set
to a non-falsey value, the value of the `X-Forwarded-Proto` header field will
be trusted and used if present. This header can be set by the client or by
the proxy.

~~~js
req.protocol
// => "http"
~~~
