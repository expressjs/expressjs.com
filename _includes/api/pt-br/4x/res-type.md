<h3 id='res.type'>res.type(type)</h3>

Define o cabeçalho HTTP `Content-Type` para MIME type como determinado por [mime.lookup()](https://github.com/broofa/node-mime#mimelookuppath) para o parâmetro `type` especificado.
Se `type` contém o caractere "/", `Content-Type` é definido para `type`.

~~~js
res.type('.html');              // => 'text/html'
res.type('html');               // => 'text/html'
res.type('json');               // => 'application/json'
res.type('application/json');   // => 'application/json'
res.type('png');                // => image/png:
~~~
