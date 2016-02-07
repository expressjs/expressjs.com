<h3 id='res.set'>res.set(field, [value])</h3>

Set header `field` to `value`, or pass an object to set multiple fields at once.

{% highlight js %}
res.set('Content-Type', 'text/plain');

res.set({
  'Content-Type': 'text/plain',
  'Content-Length': '123',
  'ETag': '12345'
});
{% endhighlight %}

Aliased as `res.header(field, [value])`.
