---
layout: page
title: Melhores Práticas de Segurança para o Express em Produção
menu: advanced
lang: pt-br
---

# Melhores Práticas em Produção: Segurança

## Visão Geral

O termo *"produção"* refere-se ao estágio no ciclo de vida do software onde um aplicativo ou API está geralmente
disponível para os seus usuários finais ou consumidores. Em contrapartida, no estágio de *"desenvolvimento"*,
você ainda está ativamente escrevendo e testando o código, e o aplicativo não está aberto para acesso externo. Os ambiente de sistema correspondentes são conhecidos como ambientes de *produção* e *desenvolvimento*,
respectivamente.

Os ambientes de desenvolvimento e produção são geralmente
configurados de forma diferente e possuem requisitos completamente
diferentes. O que é bom em desenvolvimento pode não ser aceitável na produção. Por exemplo, em um ambiente de desenvolvimento você pode
desejar registros detalhados de erros para depuração, enquanto o
mesmo comportamento pode se tornar um risco de segurança em um
ambiente de produção. E em desenvolvimento, você não precisa se
preocupar com a escalabilidade, confiabilidade, e desempenho,
enquanto estas preocupações se tornam críticas na produção.

Este artigo discute algumas melhores práticas de segurança para
aplicativos do Express implementadas na produção.

## Não use versões descontinuadas ou vulneráveis do Express

Os Express 2.x e 3.x não são mais mantidos. Problemas de
segurança e desempenho nestas versões não serão corrigidos. Não use-as!  Se
não tiver migrado para a versão 4, siga o [guia de migração](/{{ page.lang }}/guide/migrating-4.html).

Assegure-se também de que não esteja usando nenhuma das versões
vulneráveis do Express listadas na [Página de
atualizações de segurança](/{{ page.lang }}/advanced/security-updates.html). Se estiver, atualize para uma das
liberações estáveis, preferivelmente a mais recente.

## Use TLS

Se o seu aplicativo negocia com ou transmite dados sensíveis,
use a [Segurança
da Camada de Transporte](https://en.wikipedia.org/wiki/Transport_Layer_Security) (TLS) para proteger a conexão e os
dados. Esta tecnologia criptografa os dados antes deles serem
enviados do cliente para o servidor, assim evitando alguns ataques
comuns (e fáceis). Apesar de solicitações Ajax e POST não parecerem
visivelmente óbvias e parecerem "ocultas" em navegadores, o seu
tráfego de rede é vulnerável a [sniffing de pacotes](https://en.wikipedia.org/wiki/Packet_analyzer) e
[ataques man-in-the-middle ](https://en.wikipedia.org/wiki/Man-in-the-middle_attack).

Você pode estar familiarizado com a criptografia Secure Sockets Layer(SSL). [O
TLS é simplesmente a próxima progressão do](https://msdn.microsoft.com/en-us/library/windows/desktop/aa380515(v=vs.85).aspx). Em outras palavras, se você estava usando o SSL antes, considere fazer o
upgrade para o TLS.  Em geral, recomendamos o Nginx para lidar com o TLS.  Para
obter uma boa referência para configurar o TLS no Nginx (e outros servidores), consulte
[Configurações
Recomendadas de Servidores (Mozilla Wiki)](https://wiki.mozilla.org/Security/Server_Side_TLS#Recommended_Server_Configurations).

Além disso, uma ferramenta útil para obter um certificado TLS
gratuito é a [Let's
Encrypt](https://letsencrypt.org/about/), uma autoridade de certificação (CA) gratuita,
automatizada, e aberta fornecida pelo
[Grupo de Pesquisas de
Segurança da Internet (ISRG)](https://letsencrypt.org/isrg/).

## Use Helmet

O [Helmet](https://www.npmjs.com/package/helmet) pode
ajudar a proteger o seu aplicativo de algumas vulnerabilidades da web
bastante conhecidas configurando os cabeçalhos HTTP adequadamente.

O Helmet é na realidade apenas uma coleção de nove funções de
middlewares menores que configuram cabeçalhos HTTP relacionados à
segurança:

* A [csp](https://github.com/helmetjs/csp) configura o cabeçalho `Content-Security-Policy` para ajudar a evitar ataques de cross-site scripting e outras injeções cross-site.
* A [hidePoweredBy](https://github.com/helmetjs/hide-powered-by) remove o cabeçalho `X-Powered-By`.
* A [hsts](https://github.com/helmetjs/hsts) configura o cabeçalho `Strict-Transport-Security`
que impinge conexões seguras (HTTP sobre SSL/TLS) com o servidor.
* A [ieNoOpen](https://github.com/helmetjs/ienoopen) configura o `X-Download-Options` para o IE8+.
* A [noCache](https://github.com/helmetjs/nocache) configura os cabeçalhos `Cache-Control` e Pragma
para desativar o armazenamento em cache no lado do cliente.
* A [noSniff](https://github.com/helmetjs/dont-sniff-mimetype)
configura o `X-Content-Type-Options` para evitar que os navegadores procurem por MIME uma resposta a partir do
content-type declarado.
* A [frameguard](https://github.com/helmetjs/frameguard)
configura o cabeçalho `X-Frame-Options` para fornecer proteção [clickjacking](https://www.owasp.org/index.php/Clickjacking).
* A [xssFilter](https://github.com/helmetjs/x-xss-protection)
configura o `X-XSS-Protection` para ativar o filtro
de Cross-site scripting (XSS) nos navegadores da web mais recentes.

Instale o Helmet como qualquer outro módulo:

```console
$ npm install --save helmet
```

Em seguida use-o no seu código:

<pre>
<code class="language-javascript" translate="no">
...
var helmet = require('helmet');
app.use(helmet());
...
</code>
</pre>

### No mínimo, desative o cabeçalho X-Powered-By

Se não desejar usar o Helmet, então pelo menos desative o
cabeçalho `X-Powered-By`.  Invasores podem utilizar
este cabeçalho (que fica ativado por padrão) para detectar
aplicativos executando o Express e então iniciar ataques
especificamente direcionados a eles.

Portanto, a melhor prática é desligar o cabeçalho com o método
`app.disable()`:

<pre>
<code class="language-javascript" translate="no">
app.disable('x-powered-by');
</code>
</pre>

Se usar o `helmet.js`, ele cuida disso por você.

## Use cookies de maneira segura

Para assegurar que os cookies não deixem o seu aplicativo
aberto a ataques, não use o cookie de sessão padrão e configure as
opções de segurança de cookies adequadamente.

Existem dois módulos de middleware principais para sessão de
cookies:

* [express-session](https://www.npmjs.com/package/express-session)
que substitui o middleware `express.session`
integrado no Express 3.x.
* [cookie-session](https://www.npmjs.com/package/cookie-session)
que substitui o middleware `express.cookieSession` integrado no Express 3.x.

A principal diferença entre esses dois módulos é como eles salvam os dados de cookies de sessão.  O middleware [express-session](https://www.npmjs.com/package/express-session)
armazena os dados da sessão no servidor; ele salva apenas o ID da
sessão no cookie, não os dados da sessão.  Por padrão, ele usa
armazenamento em memória e não é projetado para um ambiente de
produção.  Em produção, será necessário configurar um armazenamento de
sessão escalável; consulte a lista de [armazenamentos
de sessão compatíveis](https://github.com/expressjs/session#compatible-session-stores).

Em contrapartida, o middleware [cookie-session](https://www.npmjs.com/package/cookie-session)
implementa um armazenamento apoiado em cookies: ele serializa a sessão inteira para o cookie, ao invés de apenas a chave da sessão.  Use apenas quando os dados da sessão são relativamente pequenos e facilmente codificados como números primitivos(ao invés de objetos).  Apesar de navegadores supostamente suportarem pelo menos 4096 bytes por cookie, para assegurar que você não exceda o limite, não exceda
um tamanho de  4093 bytes por domínio.  Além disso, esteja ciente de que os dados do cookie serão visíveis para o cliente, portanto se
houver razão para mantê-los seguros ou obscuros, então o express-session pode ser uma escolha melhor.

### Não use o nome do cookie da sessão padrão

Usando o nome do cookie da sessão padrão pode deixar o seu
aplicativo aberto a ataques.  O problema de segurança levantado é
parecido ao do `X-Powered-By`: um invasor em
potencial poderia usá-lo para identificar o servidor e direcionar
ataques de acordo com ele.

Para evitar este problema, use nomes de cookie genéricos; por
exemplo usando o middleware [express-session](https://www.npmjs.com/package/express-session):

<pre>
<code class="language-javascript" translate="no">
var session = require('express-session');
app.set('trust proxy', 1) // trust first proxy
app.use( session({
   secret : 's3Cur3',
   name : 'sessionId',
  })
);
</code>
</pre>

### Configure as opções de segurança de cookie

Configure as seguintes opções de cookie para aprimorar a
segurança:

* `secure` - Assegura que o navegador só envie o cookie por HTTPS.
* `httpOnly` - Assegura que o cookie seja enviado apenas por HTTP(S), não por cliente JavaScript, ajudando
assim a se proteger contra ataques de cross-site scripting.
* `domain` - indica o domínio do cookie; use-o para comparação contra o domínio do servidor em que a URL está
sendo solicitada. Se elas corresponderem, verifique o atributo de caminho em seguida.
* `path` - indica o caminho do cookie; use-o para comparação contra o caminho da solicitação. Se este e o domínio corresponderem, então envie o cookie na solicitação.
* `expires` - use para configurar uma data de
expiração para cookies persistentes.

Aqui está um exemplo usando o middleware [cookie-session](https://www.npmjs.com/package/cookie-session):

<pre>
<code class="language-javascript" translate="no">
var session = require('cookie-session');
var express = require('express');
var app = express();

var expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // 1 hour
app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  cookie: { secure: true,
            httpOnly: true,
            domain: 'example.com',
            path: 'foo/bar',
            expires: expiryDate
          }
  })
);
</code>
</pre>

## Considerações adicionais

Aqui estão algumas recomendações adicionais da excelente [Lista
de Verificação de Segurança do Node.js](https://blog.risingstack.com/node-js-security-checklist/).  Refira-se a esta postagem do blog para obter todos os detalhes destas recomendações:

* Implemente limitações de tráfego para evitar ataques de força
bruta contra a autenticação.  Uma forma de fazer isso é usar o [Gateway
da API do StrongLoop](https://strongloop.com/node-js/api-gateway/) para impingir políticas de limitação de tráfego.  Alternativamente,
é possível usar um middleware como o [express-limiter](https://www.npmjs.com/package/express-limiter),
mas fazer isso  irá requerer que você modifique seu código de alguma forma.
* Use o middleware [csurf](https://www.npmjs.com/package/csurf) para se proteger contra falsificações de solicitação cross-site (CSRF).
* Sempre filtrar e limpar a entrada do usuário para se proteger de ataques de cross-site scripting (XSS) e injeção de comando.
* Proteja-se contra ataques de injeção de SQLs usando consultas parametrizadas ou instruções preparadas.
* Use a ferramenta de software livre [sqlmap](http://sqlmap.org/) para detectar
vulnerabilidades de injeção de SQL no seu aplicativo.
* Use as ferramentas [nmap](https://nmap.org/) e [sslyze](https://github.com/nabla-c0d3/sslyze) para
testar a configuração das suas cifras SSL, chaves, e renegociação, bem como a validade do seu certificado.
* Use o [safe-regex](https://www.npmjs.com/package/safe-regex) para assegurar que suas expressões regulares não estejam suscetíveis
a ataques [negação de serviço de expressões regulares](https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS).

## Evitar outras vulnerabilidades conhecidas

Fique atento às recomendações do
[Node Security
Project](https://npmjs.com/advisories) que podem afetar o Express ou outros módulos usados
pelo seu aplicativo.  Em geral, o Node Security Project é um excelente
recurso para conhecimento e ferramentas sobre segurança do Node.

Finalmente, os aplicativos do Express - como outros aplicativos web - podem estar vulneráveis a uma variedade de ataques baseados na
web. Familiarize-se com [vulnerabilidades web](https://www.owasp.org/index.php/Top_10_2013-Top_10) conhecidas e tome precauções para evitá-las.
