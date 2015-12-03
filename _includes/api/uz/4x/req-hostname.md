<h3 id='req.hostname'>req.hostname</h3>

Contains the hostname from the `Host` HTTP header.

When the [`trust proxy` setting](/4x/api.html#trust.proxy.options.table) trusts
the socket address, the value of the `X-Forwarded-Host` header field will be
trusted and used if present.

~~~js
// Host: "example.com:3000"
req.hostname
// => "example.com"
~~~
