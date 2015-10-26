<h3 id='req.ip'>req.ip</h3>

O IP remoto da requisição.
The remote IP address of the request.

Se a configuração `trust proxy` estiver habilitada, é o endereço upstream;
veja [Express behind proxies](/guide/behind-proxies.html) para mais informações.

~~~js
req.ip
// => "127.0.0.1"
~~~
