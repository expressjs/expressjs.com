<h3 id='req.subdomains'>req.subdomains</h3>

An array of subdomains in the domain name of the request.

```js
// Host: "tobi.ferrets.example.com"
console.dir(req.subdomains)
// => ['ferrets', 'tobi']
```

The application property `subdomain offset`, which defaults to 2, is used for determining the
beginning of the subdomain segments. To change this behavior, change its value
using [app.set](/{{ page.lang }}/4x/api.html#app.set).
