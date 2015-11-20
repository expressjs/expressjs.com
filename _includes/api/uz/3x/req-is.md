<h3 id='req.is'>req.is(type)</h3>

Check if the incoming request contains the "Content-Type" 
header field, and it matches the give mime `type`.

~~~js
// With Content-Type: text/html; charset=utf-8
req.is('html');
req.is('text/html');
req.is('text/*');
// => true

// When Content-Type is application/json
req.is('json');
req.is('application/json');
req.is('application/*');
// => true

req.is('html');
// => false
~~~
