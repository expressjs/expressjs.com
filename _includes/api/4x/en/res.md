<h2>Response</h2>

The `res` object represents the HTTP response that an Express app sends when it gets an HTTP request.

In this documentation and by convention, 
the object is always referred to as `res` (and the HTTP request is `req`) but its actual name is determined
by the parameters to the callback function in which you're working.

For example:

~~~js
app.get('/user/:id', function(req, res){
  res.send('user ' + req.params.id);
});
~~~

But you could just as well have:

~~~js
app.get('/user/:id', function(request, response){
  response.send('user ' + request.params.id);
});
~~~

<h3 id='res.properties'>Properties</h3>

<section markdown="1">
  {% include api/4x/en/res-app.md %}
</section>

<section markdown="1">
  {% include api/4x/en/res-headersSent.md %}
</section>

<section markdown="1">
  {% include api/4x/en/res-locals.md %}
</section>

<h3 id='res.methods'>Methods</h3>

<section markdown="1">
  {% include api/4x/en/res-append.md %}
</section>

<section markdown="1">
  {% include api/4x/en/res-attachment.md %}
</section>

<section markdown="1">
  {% include api/4x/en/res-cookie.md %}
</section>

<section markdown="1">
  {% include api/4x/en/res-clearCookie.md %}
</section>

<section markdown="1">
  {% include api/4x/en/res-download.md %}
</section>

<section markdown="1">
  {% include api/4x/en/res-end.md %}
</section>

<section markdown="1">
  {% include api/4x/en/res-format.md %}
</section>

<section markdown="1">
  {% include api/4x/en/res-get.md %}
</section>

<section markdown="1">
  {% include api/4x/en/res-json.md %}
</section>

<section markdown="1">
  {% include api/4x/en/res-jsonp.md %}
</section>

<section markdown="1">
  {% include api/4x/en/res-links.md %}
</section>

<section markdown="1">
  {% include api/4x/en/res-location.md %}
</section>

<section markdown="1">
  {% include api/4x/en/res-redirect.md %}
</section>

<section markdown="1">
  {% include api/4x/en/res-render.md %}
</section>

<section markdown="1">
  {% include api/4x/en/res-send.md %}
</section>

<section markdown="1">
  {% include api/4x/en/res-sendFile.md %}
</section>

<section markdown="1">
  {% include api/4x/en/res-sendStatus.md %}
</section>

<section markdown="1">
  {% include api/4x/en/res-set.md %}
</section>

<section markdown="1">
  {% include api/4x/en/res-status.md %}
</section>

<section markdown="1">
  {% include api/4x/en/res-type.md %}
</section>

<section markdown="1">
  {% include api/4x/en/res-vary.md %}
</section>
