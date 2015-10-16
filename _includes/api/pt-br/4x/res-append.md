<h3 id='res.append'>res.append(field [, value])</h3>

<div class="doc-box doc-info" markdown="1">
`res.append()` é suportado a partir do Express v4.11.0+
</div>

Acrescenta um campo (`field`) com o valor (`value`) especificado no cabeçalho de resposta HTTP. Se o cabeçalho ainda não foi criado, cria o cabeçalho com campo e valor especificado. O parâmetro `value` pode ser uma string ou um array.


Nota: chamando `res.set()` depois de `res.append()` você irá resetar os cabeçalhos previamente definidos.

~~~js
res.append('Link', ['<http://localhost/>', '<http://localhost:3000/>']);
res.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly');
res.append('Warning', '199 Miscellaneous warning');
~~~
