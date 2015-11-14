<h3 id='res.status'>res.status(code)</h3>

Use this method to set the HTTP status for the response.
It is a chainable alias of Node's [response.statusCode](http://nodejs.org/api/http.html#http_response_statuscode).

~~~js
res.status(403).end();
res.status(400).send('Bad Request');
res.status(404).sendFile('/absolute/path/to/404.png');
~~~
