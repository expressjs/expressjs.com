<h3 id='express.static' class='h2'>express.static(root, [options])</h3>

`express.static` é o único 'middleware' embutido no Express. Ele é baseado no [serve-static](https://github.com/expressjs/serve-static), e é responsável em servir conteúdo estático de uma aplicação Express.

O argumento `root` se refere ao diretório raiz no qual o conteúdo estático será distribuído.

O objeto opcional `options` pode conter as seguintes propriedades:

| Propriedade      | Descrição                                                           |   Tipo      | Padrão         |
|---------------|-----------------------------------------------------------------------|-------------|-----------------|
| `dotfiles`    | Opção para servir 'dotfiles'. Os valores possíveis são: "allow", "deny", e "ignore" | String | "ignore" |
| `etag`        | Ativa ou desativa a geração de 'etags'.  | Boolean | `true` |
| `extensions`  | Conjunto de extensões de arquivos. | Boolean | `false` |
| `index`       | Envia arquivo de indexação de diretórios. Atribua `false` para desabilitar a indexação de diretórios. | Mixed | "index.html" |
| `lastModified` | Defina o cabeçalho `Last-Modified` para a data da ultima alteração do arquivo no sistema operacional. Os valores possiveis são: `true` ou `false`. | Boolean | `true` |
| `maxAge`      | Defina a propriedade max-age para o controle de cache em milisegundos ou uma string no formato [ms format](https://www.npmjs.org/package/ms) | Number | 0 |
| `redirect`    | Redireciona a rota "/" quando o caminho for um diretório. | Boolean | `true` |
| `setHeaders`  | Função para definir cabeçalhos HTTP a ser servido com o conteúdo estático. | Function |  |

Para mais detalhes de utilização do middleware, consulte: [Servindo arquivos estáticos pelo Express](/starter/static-files.html).