<h3 id='req.fresh'>req.fresh</h3>

Indica se a requisição é "fresh.". É o oposto de `req.stale`.

É true se o cabeçalho `cache-control` da requisição não possui a diretiva `no-cache`
e algum dos seguintes é verdadeiro:

* O cabeçalho `if-modified-since` da requisição foi especificado e o cabeçalho `last-modified` da requisição é igual ou anterior ao cabeçalho `modified` da resposta.
* O cabeçalho `if-none-match` da requisição é `*`.
* O cabeçalho `if-none-match` da requisição após ser feito o parse em suas diretivas, não coincide com o cabeçalho `etag` da resposta.

~~~js
req.fresh
// => true
~~~

Para mais informações ou em caso de problemas veja [fresh](https://github.com/jshttp/fresh).
