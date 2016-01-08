<h3 id='req.protocol'>req.protocol</h3>

A string do protocolo de requisição, "http" ou "https" quando solicitado com TLS. Quando o "trust proxy"
[setting](/4x/api.html#trust.proxy.options.table) confia no endereço de socket, o valor do campo do cabeçalho
"X-Forwarded-Proto" ("http" ou "https") será confiável e utilizado se presente.

~~~js
req.protocol
// => "http"
~~~
