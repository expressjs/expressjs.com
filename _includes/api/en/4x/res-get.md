<h3 id='res.get'>res.get(field)</h3>

Returns the HTTP response header specified by `field`.
The match is case-insensitive.

{% highlight js %}
res.get('Content-Type');
// => "text/plain"
{% endhighlight %}
