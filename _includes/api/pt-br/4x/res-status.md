<h3 id='res.status'>res.status(code)</h3>

Use este método para definir o status para a resposta.
Este é um alias para o [response.statusCode](http://nodejs.org/api/http.html#http_response_statuscode) do Node.
~~~js
res.status(403).end();
res.status(400).send('Bad Request');
res.status(404).sendFile('/absolute/path/to/404.png');
~~~
