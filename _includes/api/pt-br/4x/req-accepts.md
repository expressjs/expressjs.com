<h3 id='req.accepts'>req.accepts(tipos)</h3>

Verifica se o conteúdo especificado é aceitával, com base no campo `Accept` do cabeçalho da requisição HTTP.

Este método retorna a melhor combinação ou, se nenhum dos tipos de conteúdo especificado é aceitável, retorna `undefined`
(neste caso, a aplicação deve responder com um `406 "Not Acceptable"`).

O tipo de valor pode ser uma simples string MIME type (como "application/json"), um nome de extensão como "json", uma lista delimitada por vírgula, ou um array. Para uma lista ou array, este método retorna a *melhor* combinação (se houver).

~~~js
// Accept: text/html
req.accepts('html');
// => "html"

// Accept: text/*, application/json
req.accepts('html');
// => "html"
req.accepts('text/html');
// => "text/html"
req.accepts(['json', 'text']);
// => "json"
req.accepts('application/json');
// => "application/json"

// Accept: text/*, application/json
req.accepts('image/png');
req.accepts('png');
// => undefined

// Accept: text/*;q=.5, application/json
req.accepts(['html', 'json']);
// => "json"
~~~

Para mais informações, veja [accepts](https://github.com/expressjs/accepts).
