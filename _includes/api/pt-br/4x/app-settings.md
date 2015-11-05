Se `name` for uma das configurações da aplicação (app), o comportamento do app é alterado. A tabela a seguir apresenta a lista dessas configurações.

<div class="table-scroller">
  <table class="doctable" border="1">
    <thead><tr><th id="app-settings-property">Propriedade</th><th>Tipo</th><th>Valor</th><th>Padrão</th></tr></thead>
    <tbody>
    <tr>
  <td markdown="1">
  `case sensitive routing`
  </td>
      <td>Boolean</td>
      <td>Habilita diferenciação entre maiúsculas e minúsculas.</td>
      <td>Disabled. Trata  "/Foo" e "/foo" como a mesma coisa.</td>
    </tr>
    <tr>
  <td markdown="1">
  `env`
  </td>
      <td>String</td>
      <td>Modo ambiente de desenvolvimento.</td>
  <td markdown="1">
  `process.env.NODE_ENV` (variável de ambiente de desenvolvimento `NODE_ENV`) ou "development".
  </td>
    </tr>
    <tr>
  <td markdown="1">
  `etag`
  </td>
      <td>Variado</td>
  <td markdown="1">
  Define o parâmetro ETag no cabeçalho de resposta (response header). Para os valores possíveis veja a [tabela opções `etag`](#etag.options.table).
  
  [Mais sobre cabeçalho HTTP ETag](http://en.wikipedia.org/wiki/HTTP_ETag).
  </td>
  <td markdown="1">
  `weak`
  </td>
    </tr>
    <tr>
  <td markdown="1">
  `jsonp callback name`
  </td>
      <td>String</td>
      <td>Especifica o nome padrão da função callback JSONP.</td>
  <td markdown="1">
  `?callback=`
  </td>
    </tr>
    <tr>
  <td markdown="1">
  `json replacer`
  </td>
      <td>String</td>
      <td>Substituto do callback JSON.</td>
  <td markdown="1">
  `null`
  </td>
    </tr>
    <tr>
  <td markdown="1">
  `json spaces`
  </td>
      <td>Número</td>
      <td>Quando definida, envia strings JSON formatadas com a quantidade de espaços de identação especificada.</td>
      <td>Disabled.</td>
    </tr>
    <tr>
  <td markdown="1">
  `query parser`
  </td>
      <td>String</td>
  <td markdown="1">
  Define `query parser` a ser utilizado, entre "simple" ou "extended". Query parser "simple" é baseado no Node nativo, [querystring](http://nodejs.org/api/querystring.html). Query parser "extended" tem como base [qs](https://www.npmjs.org/package/qs).
  </td>
      <td>"extended"</td>
    </tr>
    <tr>
  <td markdown="1">
  `strict routing`
  </td>
      <td>Boolean</td>
      <td>Habilita o roteamento restrito.</td>
      <td>Disabled. Trata "/foo" e "/foo/" como sendo a mesma rota.</td>
    </tr>
    <tr>
  <td markdown="1">
  `subdomain offset`
  </td>
      <td>Número</td>
      <td>O número de partes separadas por ponto do host a remover para acessar subdomínios.</td>
      <td>2</td>
    </tr>
    <tr>
  <td markdown="1">
  `trust proxy`
  </td>
      <td>Variado</td>
  <td markdown="1">
  Indica que o app está por trás de um proxy `front-facing`, e usa os cabeçalhos `X-Forwarded-*` para determinar a conexão e o IP do cliente. Nota: Cabeçalhos `X-Forwarded-*` são facilmente falsificados e os IPs detectados não são confiáveis.  

  `trust proxy` está desabilidado por padrão. Quanto habilitado, o Express tenta determinar o IP do cliente conectado através do proxy `front-facing`, ou série de proxies. A propriedade `req.ips` contém então um array de IPs pelos quais o cliente está conectado. Para habilitar isto, utilize os valores descritos na [tabela opções `trust proxy`](#trust.proxy.options.table).  

  A configuração `trust proxy` é implementada utilizando o pacote [proxy-addr](https://www.npmjs.org/package/proxy-addr). Para mais informações, veja esta documentação.
  </td>
      <td>Disabled.</td>
    </tr>
    <tr>
  <td markdown="1">
  `views`
  </td>
      <td>String ou Array</td>
      <td>Um diretório ou array de diretórios para as views da aplicação. Se é um array, as views são procuradas conforme a ordem em que ocorrem no array.</td>
  <td markdown="1">
  `process.cwd() + '/views'`
  </td>
    </tr>
    <tr>
  <td markdown="1">
  `view cache`
  </td>
      <td>Boleano</td>
      <td>Habilita o cacheamento de compilação de template de view.</td>
  <td markdown="1">
  `true` em produção.
  </td>
    </tr>
    <tr>
  <td markdown="1">
  `view engine`
  </td>
      <td>String</td>
      <td>A extensão padrão da engine a ser utilizada, quando omitida.</td>
      <td></td>
    </tr>
    <tr>
  <td markdown="1">
  `x-powered-by`
  </td>
      <td>Boleano</td>
      <td>Habilita o cabeçalho HTTP "X-Powered-By: Express".</td>
  <td markdown="1">
  `true`
  </td>
    </tr>
    </tbody>
  </table>

  <h5 id="trust.proxy.options.table">Opções para configurações `trust proxy`</h5>

  <p markdown="1">
  Read [Express behind proxies](/guide/behind-proxies.html) for more
  information.
  </p>

  <table class="doctable" border="1">
    <thead><tr><th>Tipo</th><th>Valor</th></tr></thead>
    <tbody>
      <tr>
        <td>Boleano</td>
  <td markdown="1">
  Se `true`, o IP do cliente é entendido como a entrada mais à esquerda no cabeçalho `X-Forwarded-*`.

  Se `false`, a app é considerada como direta da Internet e o IP do cliente é derivado de `req.connection.remoteAddress`. Esta é a configuração padrão.
  </td>
      </tr>
      <tr>
        <td>IP addresses</td>
  <td markdown="1">
  Um endereço IP, sub-rede, ou um array de IPs e sub-redes de confiança. A lista seguinte apresenta a lista de nomes pré configurados.

  * loopback - `127.0.0.1/8`, `::1/128`
  * linklocal - `169.254.0.0/16`, `fe80::/10`
  * uniquelocal - `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `fc00::/7`

  IPs são definidos das seguintes formas:

  <pre><code class="language-js">app.set('trust proxy', 'loopback') // specify a single subnet
  app.set('trust proxy', 'loopback, 123.123.123.123') // specify a subnet and an address
  app.set('trust proxy', 'loopback, linklocal, uniquelocal') // specify multiple subnets as CSV
  app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']) // specify multiple subnets as an array</code></pre>
  Quando especificado, os endereços IP ou sub-redes são excluídas do processo de determinação de endereço, e o endereço IP não confiável mais próximo para o servidor é determinado como o endereço IP do cliente.
  </td>
      </tr>
      <tr>
        <td>Número</td>
  <td markdown="1">
  Trust the `n`th hop from the front-facing proxy server as the client.
  </td>
      </tr>
      <tr>
        <td>Função</td>
  <td markdown="1">
  Custom trust implementation. Use this only if you know what you are doing.
  <pre><code class="language-js">app.set('trust proxy', function (ip) {
    if (ip === '127.0.0.1' || ip === '123.123.123.123') return true; // trusted IPs
    else return false;
  })</code></pre>
  </td>
      </tr>
    </tbody>
  </table>

  <h5 id="etag.options.table">Opções para configuação de `etag`</h5>

  <p markdown="1">
  The ETag functionality is implemented using the
  [etag](https://www.npmjs.org/package/etag) package.
  For more information, see its documentation.
  </p>

  <table class="doctable" border="1">
    <thead><tr><th>Tipo</th><th>Valor</th></tr></thead>
    <tbody>
      <tr>
        <td>Boleano</td>
  <td markdown="1">
  `true` habilita ETag frágil. Esta é a configuração padrão.<br>
  `false` desabilita ETag completamente.
  </td>
      </tr>
      <tr>
        <td>String</td>
        <td>
            Se "strong", habilita ETag forte.<br>
            Se "weak", habilita ETag frágil.
        </td>
      </tr>
      <tr>
        <td>Função</td>
  <td markdown="1">Implementação de função ETag personalizada. Utilize somente se você sabe o que está fazendo.

  <pre><code class="language-js">app.set('etag', function (body, encoding) {
  return generateHash(body, encoding); // consider the function is defined
  })</code></pre>

  </td>
      </tr>
    </tbody>
  </table>
</div>
