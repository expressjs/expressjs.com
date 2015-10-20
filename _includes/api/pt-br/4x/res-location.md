<h3 id='res.location'>res.location(path)</h3>

Define o cabeçalho HTTP `Location` para o parâmetro `path` especificado.


~~~js
res.location('/foo/bar');
res.location('http://example.com');
res.location('back');
~~~

O valor de `path` para "back" é um caso especial que se refere à URL especificada no cabeçalho `Referer` da requisição. Se `Referer` não foi especificado, "back" fará referência a "/".


<div class='doc-box doc-warn' markdown="1">
O Express repassa para o browser a string URL especificada como está no cabeçalho `Location` sem fazer qualquer alteração ou validação, exceto no caso de `back`.

Os browsers ficam com a responsabilidade de decifrar a intensão da URL passada a partir da URL atual ou URL de referência, e a URL especificada no cabeçalho `Location`; e então redirecionar apropriadamente.
</div>
