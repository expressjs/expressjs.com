---
layout: page
title: Overriding the Express API
menu: guide
lang: en
---
<div id="page-doc" markdown="1">

# Overriding the Express API

Since the Express API are extensions to Node's HTTP request and response objects, if required, you can modify the behavior of some of the existing methods and properties.

## Methods

You can override the signature and behavior of existing methods with your own, by assigning a custom function.

Following is an example of overriding the behavior of [res.sendStatus](/{{ page.lang }}/4x/api.html#res.sendStatus).

```js
app.response.sendStatus = function (statusCode, type, message) {
  // code is intentionally kept simple for demonstration purpose
  return this.contentType(type)
  .status(statusCode)
  .send(message);
}
```

The above implementation completely changes the original signature of [res.sendStatus](/{{ page.lang }}/4x/api.html#res.sendStatus). It now accepts a status code, encoding type, and the message to be sent to the client.

The overridden method may now be used this way:

```js
res.sendStatus(404, 'application/json', '{"error":"resource not found"}')
```

## Properties

Properties in the Express API are either:

1. **Inherited from the Node core** - `res.headersSent` etc.
2. **Assigned properties** - `req.app`, `req.baseUrl`, `req.originalUrl`, `res.app`, etc.
3. **Defined as getters** - `req.protocol`, `req.secure`, `req.ip`, `req.ips`, `req.subdomains`, `req.path`, `req.hostname`, `req.host`, `req.fresh`, `req.stale`, and `req.xhr`.

Since properties under categories **1** and **2** are dynamically assigned on to the `request` and `response` objects in the context of the current request-response cycle, their behavior cannot be overriden.

Properties under **3** are basically helper methods defined as getters, which return the values in the context of the current request-response cycle, so their behavior can be changed by re-assigning a new getter.

The following code rewrites how the value of the `ip` is to be derived. Now, it simply returns '999.999.999.999' (an invalid IP address).

```js
Object.defineProperty(app.request, 'ip', {
  configurable: true,
  enumerable: true,
  get: function () { return '999.999.999.999'; }
});
```

The assignment operator has no affect on properties defined with getters. For example:

```js
app.get('/', (req, res) => {
    req.ip = 'HELLO'
    console.log(req.ip)
  }
)
```

`req.ip` won't be "HELLO" in the code above, it will still be what the getter was programmed to return.
</div>
