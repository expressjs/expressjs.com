<h3 id='res.set'>res.set(field [, value])</h3>

Define o cabeçalho de resposta HTTP `field` com `value`.
Para definir múltiplos campos de uma vez, passe um objeto como parâmetro.


~~~js
res.set('Content-Type', 'text/plain');

res.set({
  'Content-Type': 'text/plain',
  'Content-Length': '123',
  'ETag': '12345'
})
~~~

Alias como `res.header(field [, value])`.
