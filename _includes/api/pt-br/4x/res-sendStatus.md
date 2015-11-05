<h3 id='res.sendStatus'>res.sendStatus(statusCode)</h3>

Define o código de status de resposta HTTP para `statusCode` e envia esta string com esta representação como response body.

~~~js
res.sendStatus(200); // equivalent to res.status(200).send('OK')
res.sendStatus(403); // equivalent to res.status(403).send('Forbidden')
res.sendStatus(404); // equivalent to res.status(404).send('Not Found')
res.sendStatus(500); // equivalent to res.status(500).send('Internal Server Error')
~~~

Se um código não suportado é especificado, o status HTTP ainda estará definido para `statusCode` e a versão em string do código é enviada como response body.
~~~js
res.sendStatus(2000); // equivalent to res.status(2000).send('2000')
~~~

[Mais sobre Status Codes HTTP](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
