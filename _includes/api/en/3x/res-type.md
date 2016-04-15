<h3 id='res.type'>res.type(type)</h3>

Sets the Content-Type to the mime lookup of `type`,
or when "/" is present the Content-Type is simply set to this
literal value.

{% highlight js %}
res.type('.html');
res.type('html');
res.type('json');
res.type('application/json');
res.type('png');
{% endhighlight %}

p Aliased as `res.contentType(type)`.
