<h3 id='res.jsonp'>res.jsonp([body])</h3>

Envia uma resposta JSON com suporte a JSONP. Este método é idêntico a `res.json()`, mas dá suporte a callback JSONP.


~~~js
res.jsonp(null)
// => null

res.jsonp({ user: 'tobi' })
// => { "user": "tobi" }

res.status(500).jsonp({ error: 'message' })
// => { "error": "message" }
~~~

Por padrão, o callback JSONP é simplesmente chamado `callback`. Você pode alterar isto configurando <a href="#app.settings.table">o nome do callback de JSONP.</a> 

A seguir alguns exemplos de respostas JSONP utilizando o mesmo código:


~~~js
// ?callback=foo
res.jsonp({ user: 'tobi' })
// => foo({ "user": "tobi" })

app.set('jsonp callback name', 'cb');

// ?cb=foo
res.status(500).jsonp({ error: 'message' })
// => foo({ "error": "message" })
~~~
