<h3 id='res.download'>res.download(path [, filename] [, fn])</h3>

Transfere o arquivo em `path` como um anexo. Tipicamente os browsers irão mostrar mostrar o prompt de download para o usuário.
Por padrão, o parâmetro "filename=" do cabeçalho `Content-Disposition é `path` (que tipicamente aparece na janela de diálogo para iniciar o download.

O parâmetro `filename` substitue o nome padrão do arquivo fornecido em `path'.

Quando o download é completado ou quando ocorre algum erro, o método chama a função callback opcional `fn`. Este método utiliza [res.sendFile()](#res.sendFile) para transferir o arquivo.
~~~js
res.download('/report-12345.pdf');

res.download('/report-12345.pdf', 'report.pdf');

res.download('/report-12345.pdf', 'report.pdf', function(err){
  if (err) {
    // Trata erro, mas lembre-se de que a resposta pode ter sido parcialmente enviada,
    // então verifique res.headersSent.
  } else {
    // decrement a download credit, etc.
  }
});
~~~
