<h3 id='res.vary'>res.vary(field)</h3>

Adds the field to the `Vary` response header, if it is not there already.

~~~js
res.vary('User-Agent').render('docs');
~~~
