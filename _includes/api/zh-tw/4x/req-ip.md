<h3 id='req.ip'>req.ip</h3>

The remote IP address of the request.

When the [`trust proxy` setting](/{{ page.lang }}/4x/api.html#trust.proxy.options.table) is set
to a non-falsey value, the value is derived from the left-most entry in the
`X-Forwarded-For` header. This header can be set by the client or by the proxy.

~~~js
req.ip
// => "127.0.0.1"
~~~
