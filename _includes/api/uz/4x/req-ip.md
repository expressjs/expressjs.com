<h3 id='req.ip'>req.ip</h3>

The remote IP address of the request.

When the [`trust proxy` setting](/4x/api.html#trust.proxy.options.table) trusts
the socket address, it is the upstream address.

~~~js
req.ip
// => "127.0.0.1"
~~~
