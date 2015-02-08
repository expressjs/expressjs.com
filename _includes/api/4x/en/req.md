<h2>Request</h2>

The `req` object represents the HTTP request and has properties for the 
request query string, parameters, body, HTTP headers, and so on.  In this documentation and by convention, 
the object is always referred to as `req` (and the HTTP response is `res`) but its actual name is determined
by the parameters to the callback function in which you're working.

For example:

```js
app.get('/user/:id', function(req, res){
    res.send('user ' + req.params.id);
});
```

But you could just as well have:

```js
app.get('/user/:id', function(request, response){
    response.send('user ' + request.params.id);
});
```

<h3 id='req.properties'>Properties</h3>

<section>
  {% include api/4x/en/req-app.md %}
</section>

<section>
  {% include api/4x/en/req-baseUrl.md %}
</section>

<section>
  {% include api/4x/en/req-body.md %}
</section>

<section>
  {% include api/4x/en/req-cookies.md %}
</section>

<section>
  {% include api/4x/en/req-fresh.md %}
</section>

<section>
  {% include api/4x/en/req-hostname.md %}
</section>

<section>
  {% include api/4x/en/req-ip.md %}
</section>

<section>
  {% include api/4x/en/req-ips.md %}
</section>

<section>
  {% include api/4x/en/req-originalUrl.md %}
</section>

<section>
  {% include api/4x/en/req-params.md %}
</section>

<section>
  {% include api/4x/en/req-path.md %}
</section>

<section>
  {% include api/4x/en/req-protocol.md %}
</section>

<section>
  {% include api/4x/en/req-query.md %}
</section>

<section>
  {% include api/4x/en/req-route.md %}
</section>

<section>
  {% include api/4x/en/req-secure.md %}
</section>

<section>
  {% include api/4x/en/req-signedCookies.md %}
</section>

<section>
  {% include api/4x/en/req-stale.md %}
</section>

<section>
  {% include api/4x/en/req-subdomains.md %}
</section>

<section>
  {% include api/4x/en/req-xhr.md %}
</section>

<h3 id='req.methods'>Methods</h3>

<section>
  {% include api/4x/en/req-accepts.md %}
</section>

<section>
  {% include api/4x/en/req-acceptsCharsets.md %}
</section>

<section>
  {% include api/4x/en/req-acceptsEncodings.md %}
</section>

<section>
  {% include api/4x/en/req-acceptsLanguages.md %}
</section>

<section>
  {% include api/4x/en/req-get.md %}
</section>

<section>
  {% include api/4x/en/req-is.md %}
</section>

<section>
  {% include api/4x/en/req-param.md %}
</section>
