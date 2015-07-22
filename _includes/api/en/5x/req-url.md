<h3 id='req.url'>req.url</h3>

`req.url` is not a native Express property. It is inherited from Node's [http module](https://nodejs.org/api/http.html#http_message_url).

~~~js
// GET /book?id=123579
req.url
// => "/book?id=123579
~~~
