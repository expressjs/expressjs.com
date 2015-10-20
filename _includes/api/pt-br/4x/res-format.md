<h3 id='res.format'>res.format(object)</h3>

Realiza a negociação de conteúdo no cabeçalho HTTP `Accept` no objeto request, quando presente.
Utiliza [req.accepts()](#req.accepts) para selecionar o `handler` (manipulador) para a requisição, com base nos tipos aceitáveis na ordem definida. Se o cabeçalho não for especificado, o primeiro callback é chamado. Quando nenhum caso é encontrado, o servidor responde com um 406 "Not Acceptable", ou chama o callback `default`.

O cabeçalho de resposta `Content-Type` é definido quando um callback é selecionado. No entanto isto pode ser alterado dentro do callback utilizando métodos como `res.set()` ou `res.type()`.

O exemplo a seguir responderá com `{ "message": "hey" }` quando o cabeçalho `Accept` for definido para "application/json" ou "\*/json"
The following example would respond with `{ "message": "hey" }` when the `Accept` header field is set
to "application/json" or "\*/json" (porém se este for "\*/\*", então a resposta será "hey").

~~~js
res.format({
  'text/plain': function(){
    res.send('hey');
  },

  'text/html': function(){
    res.send('<p>hey</p>');
  },

  'application/json': function(){
    res.send({ message: 'hey' });
  },

  'default': function() {
    // log the request and respond with 406
    res.status(406).send('Not Acceptable');
  }
});
~~~

Adicionalmente para tipos MIME canonizados, você pode também utilizar os nomes de extensão para simplificar a implementação:

~~~js
res.format({
  text: function(){
    res.send('hey');
  },

  html: function(){
    res.send('<p>hey</p>');
  },

  json: function(){
    res.send({ message: 'hey' });
  }
});
~~~
