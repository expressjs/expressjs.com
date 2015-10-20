<h3 id='res.sendFile'>res.sendFile(path [, options] [, fn])</h3>

<div class="doc-box doc-info" markdown="1">
`res.sendFile()` Suportado a partir do Express v4.8.0
</div>

Transfere o arquivo dado em `path`. Define o campo `Content-Type` do cabeçalho de requisição HTTP com base no nome de extensão do arquivo. A menos que a opção `root` esteja definida no objeto `options`, `path` precisa ser um caminho absoluto para o arquivo.

Os detalhes do objeto `options` estão listados na seguinte tabela:

<div class="table-scroller" markdown="1">

| Propriedade        | Descrição                                     | Padrão     | Disponibilidade |
|-----------------|-------------------------------------------------|-------------|--------------|
|`maxAge`         | Define a propriedade max-age do cabeçalho `Cache-Control` em milissegundos ou uma string em [formato ms](https://www.npmjs.org/package/ms)| 0 |  |
| `root`          | Diratório raiz para nomes de arquivos relativos.|  |  |
| `lastModified`  | Define o cabeçalho `Last-Modified` para a última data de modificação do arquivo no sistema operacional. Defina como `false` para desabilitar.| Enabled | 4.9.0+ |
| `headers`       | Objeto contento os cabeçalhos HTTP para fornecer com o arquivo.|  |  |
| `dotfiles`      | Opção para servir arquivos `dotfiles`. Os valores possíveis são "allow", "deny", "ignore".| "ignore" | &nbsp; |

</div>

O método invoca a função callback `fn(err)` quando a transferência é completada ou quando ocorre um erro. Se a função callback é especificada e ocorre um erro, a função callback precisa explicitamente manipular o processo de resposta terminando o ciclo de requisição-resposta ou passando o controle para a rota seguinte.

Aqui está um exemplo de utilização de `res.sendFile` com todos estes argumentos.


~~~js
app.get('/file/:name', function (req, res, next) {

  var options = {
    root: __dirname + '/public/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  var fileName = req.params.name;
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });

})
~~~

`res.sendFile` fornece suporte para baixa granulidade para os arquivos que serve, como ilustrado no exemplo a seguir:

~~~js
app.get('/user/:uid/photos/:file', function(req, res){
  var uid = req.params.uid
    , file = req.params.file;

  req.user.mayViewFilesFrom(uid, function(yes){
    if (yes) {
      res.sendFile('/uploads/' + uid + '/' + file);
    } else {
      res.status(403).send('Sorry! you cant see that.');
    }
  });
});
~~~
Para mais informações ou se você tiver problemas ou dúvidas, veja [send](https://github.com/pillarjs/send).
