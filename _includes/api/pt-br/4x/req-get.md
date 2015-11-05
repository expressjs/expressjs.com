<h3 id='req.get'>req.get(field)</h3>
Retorna o campo solicitado do cabeçalho da requisição HTTP (não sensível a maiúsculas e minúsculas).
Os campos `Referrer` e `Referer` são intercambiáveis.

~~~js
req.get('Content-Type');
// => "text/plain"

req.get('content-type');
// => "text/plain"

req.get('Something');
// => undefined
~~~

Alias com `req.header(field)`.
