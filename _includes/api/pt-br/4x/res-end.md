<h3 id='res.end'>res.end([data] [, encoding])</h3>

Finaliza o processo response. Este método vem do core do Node, especificamente do método [responde.end() de http.ServerResponse](https://nodejs.org/api/http.html#http_response_end_data_encoding_callback).

Utilize para interromper rapidamente a resposta sem enviar nenhum dado. Se você precisa responder com dados, utilize outros métodos como [res.send()](#res.send) e [res.json()](#res.json).

~~~js
res.end();
res.status(404).end();
~~~
