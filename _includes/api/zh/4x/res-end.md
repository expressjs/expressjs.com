<h3 id='res.end'>res.end([data] [, encoding])</h3>

Ends the response process. Inherited from Node's [http.ServerResponse](http://nodejs.org/api/http.html#http_response_end_data_encoding).

Use to quickly end the response without any data. If you need to respond with data, instead use methods such as [res.send()](#res.send) and [res.json()](#res.json).

~~~js
res.end();
res.status(404).end();
~~~
