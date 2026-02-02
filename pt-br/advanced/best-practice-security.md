---
layout: page
title: Melhores Práticas de Segurança para o Express em Produção
description: Descubra as melhores práticas de segurança cruciais para aplicativos Express em produção, incluindo o uso de TLS, validação de entrada, cookies seguros e prevenção de vulnerabilidades.
menu: advanced
order: 3
redirect_from: "  "
---

# Melhores Práticas em Produção: Segurança

## Visão Geral

O termo _"produção"_ refere-se ao estágio no ciclo de vida do software onde um aplicativo ou API está geralmente
disponível para os seus usuários finais ou consumidores. Em contrapartida, no estágio de _"desenvolvimento"_,
você ainda está ativamente escrevendo e testando o código, e o aplicativo não está aberto para acesso externo. Os ambiente de sistema correspondentes são conhecidos como ambientes de _produção_ e _desenvolvimento_,
respectivamente.

Os ambientes de desenvolvimento e produção são geralmente
configurados de forma diferente e possuem requisitos completamente
diferentes. O que é bom em desenvolvimento pode não ser aceitável na produção. Por exemplo, em um ambiente de desenvolvimento você pode
desejar registros detalhados de erros para depuração, enquanto o
mesmo comportamento pode se tornar um risco de segurança em um
ambiente de produção. E em desenvolvimento, você não precisa se
preocupar com a escalabilidade, confiabilidade, e desempenho,
enquanto estas preocupações se tornam críticas na produção.

{% capture security-note %}

Se acredita que descobriu uma vulnerabilidade de segurança em Express, consulte
[Políticas de Segurança e Procedimentos](/en/resources/contributing.html#security-policies-and-procedures).

{% endcapture %}

{% include admonitions/note.html content=security-note %}

Este artigo discute algumas melhores práticas de segurança para
aplicativos do Express implementadas na produção.

- [Práticas recomendadas: Segurança](#production-best-practices-security)
  - [Overview](#overview)
  - [Não usar versões descontinuadas ou vulneráveis do Express](#dont-use-deprecated-or-vulnerable-versions-of-express)
  - [Use TLS](#use-tls)
  - [Não confie na entrada do usuário](#do-not-trust-user-input)
    - [Impedir redirecionamentos abertos](#prevent-open-redirects)
  - [Use Helmet](#use-helmet)
  - [Reduzir impressão digital](#reduce-fingerprinting)
  - A [hsts](https://github.com/helmetjs/hsts) configura o cabeçalho `Strict-Transport-Security`
    que impinge conexões seguras (HTTP sobre SSL/TLS) com o servidor.
    - A principal diferença entre esses dois módulos é como eles salvam os dados de cookies de sessão.  O middleware [express-session](https://www.npmjs.com/package/express-session)
      armazena os dados da sessão no servidor; ele salva apenas o ID da
      sessão no cookie, não os dados da sessão.  Por padrão, ele usa
      armazenamento em memória e não é projetado para um ambiente de
      produção.  Em produção, será necessário configurar um armazenamento de
      sessão escalável; consulte a lista de armazenamentos
      de sessão compatíveis.
    - A [ieNoOpen](https://github.com/helmetjs/ienoopen) configura o `X-Download-Options` para o IE8+.
  - [Impedir ataques brute-force contra a autorização](#prevent-brute-force-attacks-against-authorization)
  - [Garanta que suas dependências sejam seguras](#ensure-your-dependencies-are-secure)
    - A [hidePoweredBy](https://github.com/helmetjs/hide-powered-by) remove o cabeçalho `X-Powered-By`.
  - [Considerações adicionais](#additional-considerations)

## Não use versões descontinuadas ou vulneráveis do Express

Os Express 2.x e 3.x não são mais mantidos. Problemas de
segurança e desempenho nestas versões não serão corrigidos. Não use-as! Se
não tiver migrado para a versão 4, siga o [guia de migração](/{{ page.lang }}/guide/migrating-4.html).

Assegure-se também de que não esteja usando nenhuma das versões
vulneráveis do Express listadas na [Página de
atualizações de segurança](/{{ page.lang }}/advanced/security-updates.html). Se estiver, atualize para uma das
liberações estáveis, preferivelmente a mais recente.

## Use TLS

Se o seu aplicativo negocia com ou transmite dados sensíveis,
use a Segurança
da Camada de Transporte (TLS) para proteger a conexão e os
dados. Esta tecnologia criptografa os dados antes deles serem
enviados do cliente para o servidor, assim evitando alguns ataques
comuns (e fáceis). Apesar de solicitações Ajax e POST não parecerem
visivelmente óbvias e parecerem "ocultas" em navegadores, o seu
tráfego de rede é vulnerável a [sniffing de pacotes](https://en.wikipedia.org/wiki/Packet_analyzer) e
[ataques man-in-the-middle ](https://en.wikipedia.org/wiki/Man-in-the-middle_attack).

Você pode estar familiarizado com a criptografia Secure Sockets Layer(SSL). O
TLS é simplesmente a próxima progressão do. Em outras palavras, se você estava usando o SSL antes, considere fazer o
upgrade para o TLS. Em geral, recomendamos o Nginx para lidar com o TLS. Para
obter uma boa referência para configurar o TLS no Nginx (e outros servidores), consulte
Configurações
Recomendadas de Servidores (Mozilla Wiki).

Além disso, uma ferramenta útil para obter um certificado TLS
gratuito é a Let's
Encrypt, uma autoridade de certificação (CA) gratuita,
automatizada, e aberta fornecida pelo
Grupo de Pesquisas de
Segurança da Internet (ISRG).

## Não confiar em entrada do usuário

Para aplicativos web, um dos requisitos de segurança mais críticos é a validação e tratamento adequado dos dados de entrada do usuário. Isto tem muitas formas e não as cobriremos todas aqui.
Em última análise, a responsabilidade de validar e manipular corretamente os tipos de entrada de usuário que seu aplicativo aceita é sua.

### Impedir redirecionamentos abertos

Um exemplo de entrada de usuário potencialmente perigosa é um _open redirect_, onde um aplicativo aceita uma URL como entrada de usuário (muitas vezes na consulta de URL, por exemplo `? rl=https://exemplo.com`) e usa `res.redirect` para definir o cabeçalho `location` e
return um status de 3xx.

Uma aplicação deve validar que suporta redirecionamento para a URL de entrada, para evitar enviar usuários para links maliciosos, como sites de phishing, entre outros riscos.

Aqui está um exemplo de verificar URLs antes de usar `res.redirect` ou `res.location`:

```js
app.use((req, res) => {
  try {
    if (new Url(req.query.url).host !== 'example.com') {
      return res.status(400).end(`Unsupported redirect to host: ${req.query.url}`)
    }
  } catch (e) {
    return res.status(400).end(`Invalid url: ${req.query.url}`)
  }
  res.redirect(req.query.url)
})
```

## Use Helmet

O [Helmet](https://www.npmjs.com/package/helmet) pode
ajudar a proteger o seu aplicativo de algumas vulnerabilidades da web
bastante conhecidas configurando os cabeçalhos HTTP adequadamente.

Helmet é uma função middleware que define cabeçalhos de resposta HTTP relacionados à segurança. Helmet define os seguintes cabeçalhos por padrão:

- `Content-Security-Policy`: Uma poderosa lista de permissões do que pode acontecer na sua página, que mitiga muitos ataques
- `Cross-Origin-Opener-Policy`: Ajuda a isolar sua página
- `Cross-Origin-Resource-Policy`: Bloqueia outros de carregar seus recursos entre origens
- `Origin-Agent-Cluster`: Altera o isolamento do processo para ser baseado na origem
- `Referrer-Policy`: controla o cabeçalho [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer)
- `Strict-Transport-Security`: Diz aos navegadores para preferir HTTPS
- `X-Content-Type-Options`: Avoids [MIME sniffing](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#mime_sniffing)
- `X-DNS-Prefetch-Control`: Controla o pré-carregamento de DNS
- `X-Download-Options`: Força os downloads a serem salvos (apenas no Internet Explore)
- `X-Frame-Options`: Cabeçalho de legado que mitiga ataques [Clickjacking](https://en.wikipedia.org/wiki/Clickjacking)
- `X-Perting-Cross-Domain-Policies`: Controla o comportamento entre domínios para produtos Adobe, como a Acrobat
- `X-Powered-By`: Informações sobre o servidor web. Removido porque poderia ser utilizado em ataques simples
- `X-XSS-Protection`: Cabeçalho de legado que tenta mitigar [ataques XSS](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting), mas piora as coisas, então o Helmet desabilita isso

Cada cabeçalho pode ser configurado ou desativado. Para ler mais sobre isso, por favor, vá para [a documentação do site][helmet].

Instale o Helmet como qualquer outro módulo:

```bash
$ npm install helmet
```

Em seguida use-o no seu código:

```js
// ...

const helmet = require('helmet')
app.use(helmet())

// ...
```

## Reduzir impressão digital

Ele pode ajudar a fornecer uma camada extra de segurança para reduzir a capacidade dos invasores de determinar
o software que um servidor usa, conhecido como "impressão digital." Embora não seja um problema de segurança em si,
reduzir a capacidade de imprimir impressão digital a um aplicativo melhora sua posição geral de segurança.
O software do servidor pode ser impresso por peculiares em como ele responde a solicitações específicas, por exemplo em
os cabeçalhos de resposta HTTP.

Por padrão, o Express envia o cabeçalho de resposta `X-Powered-By` que você pode
desabilitar usando o método `app.disable()`:

```js
app.disable('x-powered-by')
```

{% capture powered-advisory %}

Desativar o cabeçalho `X-Powered-By` não impede que um atacante sofisticado determine que um aplicativo está executando o Express. Isso pode
desencorajar uma exploração casual, mas existem outras maneiras de determinar se um aplicativo está executando Express.

{% endcapture %}

{% include admonitions/note.html content=powered-advisory %}

Express também envia suas próprias mensagens formatadas "404 Not Found" e erro de formatação
mensagens de resposta. Elas podem ser alteradas por
[adicionando seu próprio manipulador para 404](/en/starter/faq.html#how-do-i-handle-404-responses)
e
[escrevendo seu próprio manipulador de erro](/en/guide/error-handling.html#writing-error-handlers):

```js
// last app.use calls right before app.listen():

// custom 404
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

// custom error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

## Use cookies de maneira segura

Para assegurar que os cookies não deixem o seu aplicativo
aberto a ataques, não use o cookie de sessão padrão e configure as
opções de segurança de cookies adequadamente.

Existem dois módulos de middleware principais para sessão de
cookies:

- [express-session](https://www.npmjs.com/package/express-session)
  que substitui o middleware `express.session`
  integrado no Express 3.x.
- [cookie-session](https://www.npmjs.com/package/cookie-session)
  que substitui o middleware `express.cookieSession` integrado no Express 3.x.

A principal diferença entre estes dois módulos é como eles salvam os dados da sessão de cookie. O [express-session](https://www.npmjs.com/package/express-session) middleware armazena os dados de sessão no servidor; apenas salva o ID da sessão no próprio cookie, não nos dados da sessão. Por padrão, ele usa armazenamento de memória e não é projetado para um ambiente de produção. Na produção, você precisará configurar uma loja de sessão escalável; ver a lista de [lojas de sessões compatíveis](https://github.com/expressjs/session#compatible-session-stores).

Em contrapartida, o middleware [cookie-session](https://www.npmjs.com/package/cookie-session)
implementa um armazenamento apoiado em cookies: ele serializa a sessão inteira para o cookie, ao invés de apenas a chave da sessão.  Use apenas quando os dados da sessão são relativamente pequenos e facilmente codificados como números primitivos(ao invés de objetos). Use isso apenas quando os dados da sessão são relativamente pequenos e facilmente codificados como valores primitivos (em vez de objetos). Apesar de navegadores supostamente suportarem pelo menos 4096 bytes por cookie, para assegurar que você não exceda o limite, não exceda
um tamanho de  4093 bytes por domínio. Além disso, esteja ciente de que os dados do cookie serão visíveis para o cliente, portanto se
houver razão para mantê-los seguros ou obscuros, então o express-session pode ser uma escolha melhor.

### Não use o nome do cookie da sessão padrão

Usando o nome do cookie da sessão padrão pode deixar o seu
aplicativo aberto a ataques. O problema de segurança levantado é
parecido ao do `X-Powered-By`: um invasor em
potencial poderia usá-lo para identificar o servidor e direcionar
ataques de acordo com ele.

Para evitar este problema, use nomes de cookie genéricos; por
exemplo usando o middleware [express-session](https://www.npmjs.com/package/express-session):

```js
const session = require('express-session')
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 's3Cur3',
  name: 'sessionId'
}))
```

### Configure as opções de segurança de cookie

Configure as seguintes opções de cookie para aprimorar a
segurança:

- `secure` - Assegura que o navegador só envie o cookie por HTTPS.
- `httpOnly` - Assegura que o cookie seja enviado apenas por HTTP(S), não por cliente JavaScript, ajudando
  assim a se proteger contra ataques de cross-site scripting.
- `domain` - indica o domínio do cookie; use-o para comparação contra o domínio do servidor em que a URL está
  sendo solicitada. Se elas corresponderem, verifique o atributo de caminho em seguida.
- `path` - indica o caminho do cookie; use-o para comparação contra o caminho da solicitação. Se este e o domínio corresponderem, então envie o cookie na solicitação.
- `expires` - use para configurar uma data de
  expiração para cookies persistentes.

Aqui está um exemplo usando o middleware [cookie-session](https://www.npmjs.com/package/cookie-session):

```js
const session = require('cookie-session')
const express = require('express')
const app = express()

const expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  cookie: {
    secure: true,
    httpOnly: true,
    domain: 'example.com',
    path: 'foo/bar',
    expires: expiryDate
  }
}))
```

## Evite ataques brutos contra autorização

Certifique-se de que os endpoints de login estejam protegidos para tornar os dados privados mais seguros.

Uma técnica simples e poderosa é bloquear tentativas de autorização usando duas métricas:

1. O número de tentativas consecutivas com o mesmo nome de usuário e endereço IP.
2. O número de tentativas falhadas de um endereço IP por um longo período de tempo. Por exemplo, bloqueie um endereço IP se fizer 100 tentativas falhadas em um dia.

[rate-limiter-flexible](https://github.com/animir/node-rate-limiter-flexible) pacote fornece ferramentas para tornar essa técnica fácil e rápida. Você pode encontrar [um exemplo de proteção brute-force na documentação](https://github.com/animir/node-rate-limiter-flexible/wiki/Overall-example#login-endpoint-protection)

## Certifique-se de que suas dependências estejam seguras

Usar o npm para gerenciar as dependências do seu aplicativo é poderoso e conveniente. Mas os pacotes que você usa podem conter vulnerabilidades de segurança críticas que também podem afetar sua aplicação. A segurança do seu aplicativo só é forte como o link "mais fraco" em suas dependências.

Desde npm@6, npm revisa automaticamente toda requisição de instalação. Além disso, você pode usar o `npm audit` para analisar sua árvore de dependências.

```bash
$ npm audit
```

Se você deseja ficar mais seguro, considere [Snyk](https://snyk.io/).

Snyk oferece tanto uma [ferramenta de linha de comando](https://www.npmjs.com/package/snyk) quanto uma [integração com um Github](https://snyk.io/docs/github) que verifica a sua aplicação no [banco de dados de vulnerabilidades de fonte aberta do Snyk](https://snyk.io/vuln/) para quaisquer vulnerabilidades conhecidas em suas dependências. Instalar CLI da seguinte forma:

```bash
$ npm install -g snyk
$ cd your-app
```

Use este comando para testar suas vulnerabilidades:

```bash
$ snyk test
```

### Evitar outras vulnerabilidades conhecidas

Fique atento às recomendações do
Node Security
Project que podem afetar o Express ou outros módulos usados
pelo seu aplicativo. Em geral, o Node Security Project é um excelente
recurso para conhecimento e ferramentas sobre segurança do Node.

Finalmente, os aplicativos do Express - como outros aplicativos web - podem estar vulneráveis a uma variedade de ataques baseados na
web. Familiarize-se com [vulnerabilidades web](https://www.owasp.org/www-project-top-ten/) conhecidas e tome precauções para evitá-las.

## Considerações adicionais

Aqui estão algumas recomendações adicionais da excelente Lista
de Verificação de Segurança do Node.js. Refira-se a esta postagem do blog para obter todos os detalhes destas recomendações:

- Sempre filtrar e limpar a entrada do usuário para se proteger de ataques de cross-site scripting (XSS) e injeção de comando.
- Proteja-se contra ataques de injeção de SQLs usando consultas parametrizadas ou instruções preparadas.
- Use a ferramenta de software livre [sqlmap](http://sqlmap.org/) para detectar
  vulnerabilidades de injeção de SQL no seu aplicativo.
- Use as ferramentas [nmap](https://nmap.org/) e [sslyze](https://github.com/nabla-c0d3/sslyze) para
  testar a configuração das suas cifras SSL, chaves, e renegociação, bem como a validade do seu certificado.
- Use o [safe-regex](https://www.npmjs.com/package/safe-regex) para assegurar que suas expressões regulares não estejam suscetíveis
  a ataques [negação de serviço de expressões regulares](https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS).

[helmet]: https://helmetjs.github.io/