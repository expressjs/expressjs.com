<h3 id='res.attachment'>res.attachment([filename])</h3>

Configura o cabeçalho HTTP response `Content-Disposition` para "attachment" (´anexo´). Se `filename` é dado, configura o `Content-Type` com base no nome de extensão via `res.type()`, e configura o parâmetro "filename=" de `Content-Disposition`.

~~~js
res.attachment();
// Content-Disposition: attachment

res.attachment('path/to/logo.png');
// Content-Disposition: attachment; filename="logo.png"
// Content-Type: image/png
~~~
