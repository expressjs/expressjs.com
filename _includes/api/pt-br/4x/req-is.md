<h3 id='req.is'>req.is(type)</h3>

Retorna `true` se o cabeçalho "Content-Type" da requisição HTTP de entrada
corresponde o tipo MIME especificado pelo parametro `type`. Caso contrário retorna `false`.

~~~js
// Com Content-Type: text/html; charset=utf-8
req.is('html');
req.is('text/html');
req.is('text/*');
// => true

// Quando Content-Type é application/json
req.is('json');
req.is('application/json');
req.is('application/*');
// => true

req.is('html');
// => false
~~~

Para mais informações ou em caso de problemas veja [type-is](https://github.com/expressjs/type-is).
