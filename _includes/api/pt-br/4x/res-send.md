<h3 id='res.send'>res.send([body])</h3>

Envia a resposta HTTP.
Sends the HTTP response.

O parâmetro `body` pode ser um objeto `Buffer`, uma `String`, um objeto, ou um `Array`.
Por exemplo:

~~~js
res.send(new Buffer('whoop'));
res.send({ some: 'json' });
res.send('<p>some html</p>');
res.status(404).send('Sorry, we cannot find that!');
res.status(500).send({ error: 'something blew up' });
~~~

Este método realiza muitas tarefas usuais para uma resposta `non-streaming` simples:
Por exemplo, o campo `Content-Length` do cabeçalho HTTO é definido automaticamente (se não foi definido previamente), e fornece suporte automático para HEAD e HTTP cache fresh.

Quando o parâmetro é um objeto 'Buffer', o método define o campo `Content-Type` do cabeçalho para "application/octet-stream", caso não tenha sido definido previamente:

~~~js
res.set('Content-Type', 'text/html');
res.send(new Buffer('<p>some html</p>'));
~~~

Quando o parâmetro é uma `String`, o método define `Content-Type` para "text/html":

~~~js
res.send('<p>some html</p>');
~~~

Quando o parâretro é um `Array` ou um `Object`, o Express responde com uma representação JSON:


~~~js
res.send({ user: 'tobi' });
res.send([1,2,3]);
~~~
