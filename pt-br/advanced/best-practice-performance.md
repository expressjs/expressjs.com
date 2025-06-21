---
layout: page
title: Melhores Práticas de Desempenho Usando o Express em Produção
description: Discover performance and reliability best practices for Express apps in production, covering code optimizations and environment setups for optimal performance.
menu: advanced
lang: pt-br
redirect_from: "  "
---

# Melhores Práticas de Produção: desempenho e confiabilidade

Este artigo discute as melhores práticas de desempenho e de confiabilidade
para aplicativos Express implementados para produção.

Este tópico se enquadra claramente no mundo de "devops", abordando o desenvolvimento tradicional e as operações. Assim, as informações são divididas em duas partes:

- [Itens a fazer no seu código](#code) (a parte do dev).
  - Use a compactação gzip
  - Não use funções síncronas
  - Faça o registro de logs corretamente
  - [Handle exceptions properly](#handle-exceptions-properly)
- [Itens a fazer no seu ambiente / configuração](#env) (a parte de ops).
  - Configure o NODE_ENV para "produção"
  - Executar o seu aplicativo (e Node) diretamente com o sistema
    de inicialização. Isto é de certa forma mais simples, mas você não
    obtém as vantagens adicionais do uso de um gerenciador de processos.
  - Execute seu aplicativo em um cluster
  - <a name="try-catch"></a>
  - Use um balanceador de carga
  - Use um proxy reverso

## Itens a fazer no seu código

A seguir serão apresentados alguns itens que podem ser feitos no seu código
para melhorar o desempenho dos aplicativos:

- Use a compactação gzip
- Não use funções síncronas
- Faça o registro de logs corretamente
- [Handle exceptions properly](#handle-exceptions-properly)

### Use a compactação gzip

A compactação Gzip pode diminuir bastante o tamanho do corpo de resposta e assim aumentar a velocidade de um aplicativo da web. Use o middleware [compression](https://www.npmjs.com/package/compression) para fazer a compactação gzip no seu aplicativo do Express. Por exemplo:

```js
const compression = require('compression')
const express = require('express')
const app = express()

app.use(compression())
```

Para um website com tráfego intenso na produção, a melhor maneira de colocar a compactação em prática, é implementá-la em um
nível de proxy reverso (consulte [Use um proxy reverso](#proxy)). Neste caso, não é necessário usar o middleware de compactação. Para obter detalhes sobre a ativação da compactação gzip no Nginx, consulte o Módulo
ngx_http_gzip_module na documentação do Nginx.

### Não use funções síncronas

Funções e métodos síncronos impedem o avanço da execução do processo até que eles retornem. Uma
única chamada a uma função síncrona pode retornar em poucos microssegundos ou milissegundos, entretanto, em websites com tráfego
intenso, essas chamadas se somam e reduzem o desempenho do
aplicativo. Evite o uso delas na produção.

Apesar de o Node e muitos módulos fornecerem versões síncronas e assíncronas de suas funções, sempre use as versões assíncronas na produção. O único momento em que o uso de uma função síncrona pode ser justificado é na primeira inicialização.

You can use the `--trace-sync-io` command-line flag to print a warning and a stack trace whenever your application uses a synchronous API. Obviamente, não seria desejado usar isto na produção, mas sim antes, para garantir que seu código está pronto para produção. Consulte a Atualização
semanal para o io.js 2.1.0 para obter mais informações.

### Lide com exceções adequadamente

Em geral, existem duas razões para registrar logs em seu aplicativo: Para depuração e para registro de logs de atividade do aplicativo (essencialmente, todo o resto). Usar
o `console.log()` ou o `console.err()` para imprimir mensagens de log no
terminal é uma prática comum em desenvolvimento. But [these functions are synchronous](https://nodejs.org/api/console.html#console) when the destination is a terminal or a file, so they are not suitable for production, unless you pipe the output to another program.

#### For debugging

Se estiver registrando logs com o propósito de depuração, então ao invés de usar o `console.log()`, use um módulo
especial para depuração como o [debug](https://www.npmjs.com/package/debug). Este
módulo permite que seja usada a variável de ambiente DEBUG para controlar quais mensagens de depuração são enviadas para o
`console.err()`, se houver. Para manter o seu aplicativo puramente assíncrono, você deverá canalizar o
`console.err()` para outro programa. Mas nesse ponto, você não fará a depuração na produção, não é?

#### Para atividade do aplicativo

If you're logging app activity (for example, tracking traffic or API calls), instead of using `console.log()`, use a logging library like [Pino](https://www.npmjs.com/package/pino), which is the fastest and most efficient option available.

### Lide com exceções adequadamente

Aplicativos do Node caem ao encontrarem uma exceção não
capturada. O não tratamento de exceções e a não tomada das ações
apropriadas irão fazer com que o seu aplicativo do Express caia e
fique off-line. Se seguir os conselhos em [Assegurando que o seu aplicativo reinicie automaticamente](#restart)
abaixo, então seu aplicativo se recuperará de uma queda. Felizmente, aplicativos Express tipicamente possuem um tempo curto de inicialização. Contudo,
é desejável evitar quedas em primeiro lugar e, para fazer isso, é
necessário tratar exceções adequadamente.

Para garantir que está tratando todas as exceções, use as seguintes técnicas:

- [Use try-catch](#try-catch)
- [Use promessas](#promises)

Antes de se aprofundar nestes tópicos, você deveria ter um
entendimento básico de manipulação de erros do Node/Express: usando
retornos de chamada erros-first, e propagação de erros no
middleware. O Node usa uma convenção "retorno de chamada erros-first" para retorno de erros de funções assíncronas, onde o
primeiro parâmetro para a função de retorno de chamada é o objeto de erro, seguido dos dados de resultado nos parâmetros subsequentes. Para indicar que não ocorreram erros, passe null como o primeiro parâmetro. A função de retorno de chamada deve correspondentemente seguir a
convenção de retorno de chamada erros-first para tratar o erro de forma significativa. E no Express, a melhor prática é usar a função next() para propagar erros pela cadeia de middlewares.

Para obter mais informações sobre os fundamentos de manipulação de erros, consulte:

- [Manipulação de Erros no Node.js](https://www.tritondatacenter.com/node-js/production/design/errors)

#### Use try-catch

Try-catch é uma construção da linguagem JavaScript que pode ser usada para capturar exceções em um código síncrono. Use try-catch, por exemplo, para tratar erros de análise sintática de JSON como mostrado abaixo.

Aqui está um exemplo de uso de try-catch para tratar uma
potencial exceção causadora de queda de processo.
Esta função middleware aceita um parâmetro de campo de consulta chamado "params" que é um objeto JSON.

```js
app.get('/search', (req, res) => {
  // Simulating async operation
  setImmediate(() => {
    const jsonStr = req.query.params
    try {
      const jsonObj = JSON.parse(jsonStr)
      res.send('Success')
    } catch (e) {
      res.status(400).send('Invalid JSON string')
    }
  })
})
```

Entretanto, o try-catch funciona apenas para códigos síncronos. Como
a plataforma Node é a princípio assíncrona (particularmente em um ambiente de produção), o try-catch deixará de capturar muitas
exceções.

#### Use promessas

When an error is thrown in an `async` function or a rejected promise is awaited inside an `async` function, those errors will be passed to the error handler as if calling `next(err)`

```js
app.get('/', async (req, res, next) => {
  const data = await userData() // If this promise fails, it will automatically call `next(err)` to handle the error.

  res.send(data)
})

app.use((err, req, res, next) => {
  res.status(err.status ?? 500).send({ error: err.message })
})
```

Also, you can use asynchronous functions for your middleware, and the router will handle errors if the promise fails, for example:

```js
app.use(async (req, res, next) => {
  req.locals.user = await getUser(req)

  next() // This will be called if the promise does not throw an error.
})
```

Best practice is to handle errors as close to the site as possible. So while this is now handled in the router, it’s best to catch the error in the middleware and handle it without relying on separate error-handling middleware.

#### O que não fazer

Uma coisa que _não_ deveria fazer é escutar a eventos `uncaughtException`, emitidos quando uma exceção
emerge regressando ao loop de eventos. Incluir um listener de eventos para `uncaughtException` irá mudar o comportamento
padrão do processo que está encontrando uma exceção; o processo irá continuar a execução apesar da exceção. Essa pode parecer como uma boa maneira de prevenir que o seu
aplicativo caia, mas continuar a execução do aplicativo após uma
exceção não capturada é uma prática perigosa e não é recomendada, porque o estado do processo se torna não confiável e imprevisível.

Adicionalmente, usar o `uncaughtException` é oficialmente reconhecido como [grosseiro](https://nodejs.org/api/process.html#process_event_uncaughtexception)
e existe uma [proposta](https://github.com/nodejs/node-v0.x-archive/issues/2582)
de removê-lo do núcleo. Portando escutar por um `uncaughtException` é simplesmente uma má ideia. É
por isso que recomendamos coisas como múltiplos processos e
supervisores: o processo de queda e reinicialização é frequentemente a
forma mais confiável de se recuperar de um erro.

Também não recomendamos o uso de [domínios](https://nodejs.org/api/domain.html). Ele
geralmente não resolve o problema e é um módulo descontinuado.

## Coisa a se fazer no seu ambiente / configuração

A seguir serão apresentados alguns itens que podem ser feitos no seu ambiente de sistema para melhorar o desempenho dos seus aplicativos:

- Configure o NODE_ENV para "produção"
- Executar o seu aplicativo (e Node) diretamente com o sistema
  de inicialização. Isto é de certa forma mais simples, mas você não
  obtém as vantagens adicionais do uso de um gerenciador de processos.
- Execute seu aplicativo em um cluster
- <a name="try-catch"></a>
- Use um balanceador de carga
- Use um proxy reverso

### Configure o NODE_ENV para "produção"

A variável de ambiente NODE_ENV especifica o ambiente no qual um aplicativo está executando (geralmente, desenvolvimento ou
produção). One of the simplest things you can do to improve performance is to set NODE_ENV to `production`.

Configurando NODE_ENV para "produção" faz com que o Express:

- Armazene em Cache os modelos de visualização.
- Armazene em Cache arquivos CSS gerados a partir de extensões CSS.
- Gere menos mensagens de erro detalhadas

[Tests indicate](https://www.dynatrace.com/news/blog/the-drastic-effects-of-omitting-node-env-in-your-express-js-applications/) that just doing this can improve app performance by a factor of three!

Se precisar escrever código específico por ambiente, é possível verificar o valor de NODE_ENV com `process.env.NODE_ENV`. Esteja
ciente de que verificar o valor de qualquer variável de ambiente incorre em perda de desempenho, e por isso deve ser feito raramente.

Em desenvolvimento, você tipicamente configura variáveis de ambiente no seu shell interativo, por exemplo, usando o
`export` ou o seu arquivo `.bash_profile`. But in general, you shouldn't do that on a production server; instead, use your OS's init system (systemd). A próxima seção fornece mais detalhes sobre a utilização do seu sistema de inicialização em geral,
mas configurando NODE_ENV é tão importante para o desempenho (e fácil de fazer), que está destacado aqui.

Com o systemd, use a diretiva `Environment` no seu arquivo de unidade. Por exemplo:

```sh
# /etc/systemd/system/myservice.service
Environment=NODE_ENV=production
```

For more information, see [Using Environment Variables In systemd Units](https://www.flatcar.org/docs/latest/setup/systemd/environment-variables/).

### Assegure que o seu aplicativo reinicie automaticamente

Em produção, não é desejado que seu aplicativo fique off-line,
nunca. Isto significa que é necessário certificar-se de que ele
reinicie tanto se o aplicativo cair quanto se o próprio servidor
cair. Apesar de se esperar que nenhum desses eventos ocorram,
realisticamente você deve considerar ambas as eventualidades:

- Usando um gerenciador de processos para reiniciar o aplicativo (e o Node) quando ele cair.
- Usando o sistema de inicialização fornecido pelo seu sistema operacional para reiniciar o gerenciador de processos quando o
  sistema operacional cair. Também é possível usar o sistema de inicialização sem um gerenciador de processos.

Aplicativos do Node caem se encontrarem uma exceção não
capturada. A principal coisa que precisa ser feita é assegurar que o
seu aplicativo esteja bem testado e trate todas as exceções (consulte
[tratar exceções adequadamente](#exceptions) para
obter detalhes). Mas por segurança, posicione um mecanismo para
assegurar que se e quando o seu aplicativo cair, ele irá
automaticamente reiniciar.

#### Use um gerenciador de processos

Em desenvolvimento, você iniciou o seu aplicativo de forma simples a partir da linha de comandos com  o `node server.js` ou
algo similar. Mas fazer isso na produção é uma receita para o desastre. Se o aplicativo cair, ele ficará off-line até ser reiniciado. Para
assegurar que o seu aplicativo reinicie se ele cair, use um gerenciador de processos. Um
gerenciador de processos é um "contêiner" para aplicativos que facilita a implementação, fornece alta disponibilidade, e permite o
gerenciamento do aplicativo em tempo real.

Em adição à reinicialização do seu aplicativo quando cai, um
gerenciador de processos pode permitir que você:

- Ganhe insights sobre o desempenho em tempo de execução e o consumo de recursos.
- Modifique configurações dinamicamente para melhorar o desempenho.
- Control clustering (pm2).

Historically, it was popular to use a Node.js process manager like [PM2](https://github.com/Unitech/pm2). See their documentation if you wish to do this. However, we recommend using your init system for process management.

#### Use um sistema de inicialização

A próxima camada de confiabilidade é para assegurar que o seu
aplicativo reinicie quando o servidor reiniciar. Os sistemas podem
ainda assim cair por uma variedade de razões. Para assegurar que o
seu aplicativo reinicie se o servidor cair, use o sistema de
inicialização integrado no seu sistema operacional. The main init system in use today is [systemd](https://wiki.debian.org/systemd).

Existem duas formas de usar sistemas de inicialização com o seu aplicativo Express:

- Executar o seu aplicativo em um gerenciador de processos, e instalar o gerenciador de processos com o sistema de inicialização. O gerenciador de processos irá reiniciar seu aplicativo quando o
  aplicativo cair, e o sistema de inicialização irá reiniciar o
  gerenciador de processos quando o sistema operacional reiniciar. Esta é a abordagem recomendada.
- Run your app (and Node) directly with the init system. This is somewhat simpler, but you don't get the additional advantages of using a process manager.

##### Systemd

O Systemd é um sistema Linux e gerenciador de serviço. A
maioria das distribuições principais do Linux adotaram o systemd como
sistema de inicialização padrão.

Um arquivo de configuração de serviço do systemd é chamado
de _arquivo de unidade_, com um nome de arquivo
terminando em .service. Aqui está um exemplo de arquivo de unidade
para gerenciar um aplicativo Node diretamente (substitua o texto em
negrito com valores para o seu sistema e aplicativo): Replace the values enclosed in `<angle brackets>` for your system and app:

```sh
[Unit]
Description=<Awesome Express App>

[Service]
Type=simple
ExecStart=/usr/local/bin/node </projects/myapp/index.js>
WorkingDirectory=</projects/myapp>

User=nobody
Group=nogroup

# Environment variables:
Environment=NODE_ENV=production

# Allow many incoming connections
LimitNOFILE=infinity

# Allow core dumps for debugging
LimitCORE=infinity

StandardInput=null
StandardOutput=syslog
StandardError=syslog
Restart=always

[Install]
WantedBy=multi-user.target
```

Para obter mais informações sobre o systemd, consulte a
referência
do systemd (página do manual).

### Execute seu aplicativo em um cluster

Em um sistema com múltiplos núcleos, é possível aumentar o
desempenho de um aplicativo Node em muitas vezes ativando um cluster
de processos. Um cluster executa múltiplas instâncias do aplicativo,
idealmente uma instância em cada núcleo da CPU, assim distribuindo a carga e as
tarefas entre as instâncias.

![Balancing between application instances using the cluster API](/images/clustering.png)

IMPORTANTE: Como as instâncias do aplicativo são executadas em processos separados, elas não compartilham o mesmo espaço de memória. Isto é, os objetos são locais para cada instância do aplicativo. Portanto, não é possível manter o estado no código do aplicativo. Entretanto, é possível usar um armazenamento de dados em memória como o [Redis](http://redis.io/) para armazenar dados
relativos à sessão e ao estado. Este alerta aplica-se a essencialmente todas as formas de escalonamento horizontal, seja a
clusterização com múltiplos processos ou múltiplos servidores físicos.

Em aplicativos clusterizados, processos de trabalho podem cair individualmente sem afetar o restante dos processos. Fora as vantagens de desempenho, o isolamento de falhas é outra razão para executar um cluster de processos de aplicativos. Sempre que processo de trabalho cair, certifique-se de registrar os logs do evento e spawn um novo processo usando cluster.fork().

#### Usando o módulo de cluster do Node

Clustering is made possible with Node's [cluster module](https://nodejs.org/api/cluster.html). Isto permite que um processo principal faça o
spawn de processos de trabalho e distribua conexões recebidas entre
os trabalhadores.

#### Using PM2

If you deploy your application with PM2, then you can take advantage of clustering _without_ modifying your application code. You should ensure your [application is stateless](https://pm2.keymetrics.io/docs/usage/specifics/#stateless-apps) first, meaning no local data is stored in the process (such as sessions, websocket connections and the like).

When running an application with PM2, you can enable **cluster mode** to run it in a cluster with a number of instances of your choosing, such as the matching the number of available CPUs on the machine. You can manually change the number of processes in the cluster using the `pm2` command line tool without stopping the app.

To enable cluster mode, start your application like so:

```bash
# Start 4 worker processes
$ pm2 start npm --name my-app -i 4 -- start
# Auto-detect number of available CPUs and start that many worker processes
$ pm2 start npm --name my-app -i max -- start
```

This can also be configured within a PM2 process file (`ecosystem.config.js` or similar) by setting `exec_mode` to `cluster` and `instances` to the number of workers to start.

Once running, the application can be scaled like so:

```bash
# Add 3 more workers
$ pm2 scale my-app +3
# Scale to a specific number of workers
$ pm2 scale my-app 2
```

For more information on clustering with PM2, see [Cluster Mode](https://pm2.keymetrics.io/docs/usage/cluster-mode/) in the PM2 documentation.

### Armazene em cache os resultados das solicitações

Outra estratégia para melhorar o desempenho na produção é
armazenar em cache o resultado de solicitações, para que o seu
aplicativo não repita a operação para entregar a mesma solicitação
repetidamente.

Use a caching server like [Varnish](https://www.varnish-cache.org/) or [Nginx](https://blog.nginx.org/blog/nginx-caching-guide) (see also [Nginx Caching](https://serversforhackers.com/nginx-caching/)) to greatly improve the speed and performance of your app.

### Use um balanceador de carga

Não importa o quão otimizado um aplicativo é, uma única
instância pode manipular apenas uma quantidade limitada de carga e
tráfego. Uma maneira de escalar um aplicativo é executar múltiplas
instâncias do mesmo e distribuir o tráfego através de um balanceador
de carga. Configurar um balanceador de carga pode melhorar o
desempenho e velocidade do aplicativo, e permiti-lo escalar mais do
que é possível com uma instância única.

Um balanceador de carga é geralmente um proxy reverso que
orquestra o tráfego para e de múltiplas instâncias de aplicativo e
servidores. You can easily set up a load balancer for your app by using [Nginx](https://nginx.org/en/docs/http/load_balancing.html) or [HAProxy](https://www.digitalocean.com/community/tutorials/an-introduction-to-haproxy-and-load-balancing-concepts).

Com o balanceamento de carga, você pode ter que garantir que
solicitações que estão associadas com um ID de sessão em particular
conectam ao processo que as originou. Isto é conhecido como
_afinidade de sessão_, ou _sessões
pegajosas_, e podem ser endereçadas pela sugestão acima para
usar um armazenamento de dados como o Redis para os dados da sessão
(dependendo do seu aplicativo). Para uma discussão, consulte por
[Usando múltiplos nós](https://socket.io/docs/v4/using-multiple-nodes/).

### Use um proxy reverso

Um proxy reverso fica em frente a um aplicativo web e executa
operações de suporte nas solicitações, fora o direcionamento de
solicitações para o aplicativo. Ele pode lidar com páginas de erro,
compactação, armazenamento em cache, entrega de arquivos, e
balanceamento de carga entre outras coisas.

Entregar tarefas que não requerem conhecimento do estado do
aplicativo para um proxy reverso libera o Express para executar
tarefas especializadas de aplicativos. For this reason, it is recommended to run Express behind a reverse proxy like [Nginx](https://www.nginx.org/) or [HAProxy](https://www.haproxy.org/) in production.
