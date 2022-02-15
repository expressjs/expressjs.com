---
layout: page
title: Melhores Práticas de Desempenho Usando o Express em Produção
menu: advanced
lang: pt-br
---

# Melhores Práticas de Produção: desempenho e confiabilidade

## Visão Geral

Este artigo discute as melhores práticas de desempenho e de confiabilidade
para aplicativos Express implementados para produção.

Este tópico se enquadra claramente no mundo de "devops", abordando o desenvolvimento tradicional e as operações. Assim, as informações são divididas em duas partes:

* [Itens a fazer no seu código](#code) (a parte do dev).
* [Itens a fazer no seu ambiente / configuração](#env) (a parte de ops).

<a name="code"></a>

## Itens a fazer no seu código

A seguir serão apresentados alguns itens que podem ser feitos no seu código
para melhorar o desempenho dos aplicativos:

* Use a compactação gzip
* Não use funções síncronas
* Use o middleware para entregar arquivos estáticos
* Faça o registro de logs corretamente
* Lide com exceções adequadamente

### Use a compactação gzip

A compactação Gzip pode diminuir bastante o tamanho do corpo de resposta e assim aumentar a velocidade de um aplicativo da web. Use o middleware [compression](https://www.npmjs.com/package/compression) para fazer a compactação gzip no seu aplicativo do Express. Por exemplo:

```js
const compression = require('compression')
const express = require('express')
const app = express()
app.use(compression())
```

Para um website com tráfego intenso na produção, a melhor maneira de colocar a compactação em prática, é implementá-la em um
nível de proxy reverso (consulte [Use um proxy reverso](#proxy)). Neste caso, não é necessário usar o middleware de compactação. Para obter detalhes sobre a ativação da compactação gzip no Nginx, consulte o [Módulo
ngx_http_gzip_module](http://nginx.org/en/docs/http/ngx_http_gzip_module.html) na documentação do Nginx.

### Não use funções síncronas

Funções e métodos síncronos impedem o avanço da execução do processo até que eles retornem. Uma
única chamada a uma função síncrona pode retornar em poucos microssegundos ou milissegundos, entretanto, em websites com tráfego
intenso, essas chamadas se somam e reduzem o desempenho do
aplicativo. Evite o uso delas na produção.

Apesar de o Node e muitos módulos fornecerem versões síncronas e assíncronas de suas funções, sempre use as versões assíncronas na produção. O único momento em que o uso de uma função síncrona pode ser justificado é na primeira inicialização.

Se estiver usando o Node.js 4.0+ ou o io.js 2.1.0+, é possível usar a sinalização `--trace-sync-io` da linha de comandos para imprimir um aviso e um rastreio de pilha sempre que o seu aplicativo usar uma API síncrona. Obviamente, não seria desejado usar isto na produção, mas sim antes, para garantir que seu código está pronto para produção. Consulte a [Atualização
semanal para o io.js 2.1.0](https://nodejs.org/en/blog/weekly-updates/weekly-update.2015-05-22/#2-1-0) para obter mais informações.

### Use o middleware para entregar arquivos estáticos

No desenvolvimento, é possível usar a [res.sendFile()](/{{ page.lang }}/4x/api.html#res.sendFile) para entregar arquivos estáticos. Mas
não use isto na produção, pois esta função precisa ser lida a partir
do sistema de arquivos para cada solicitação de arquivo, e portanto
encontraria latência e afetaria o desempenho geral do aplicativo. Observe que a `res.sendFile()` *não* é implementada com a chamada de sistema [sendfile](http://linux.die.net/man/2/sendfile) o que a tornaria muito mais eficiente.

Ao invés disso, use o middleware [serve-static](https://www.npmjs.com/package/serve-static)
(ou algo equivalente), que é otimizado para a entrega de arquivos para os aplicativos do Express.

Uma opção ainda melhor é usar um proxy reverso para entregar
arquivos estáticos; consulte [Use um proxy
reverso](#proxy) para obter mais informações.

### Faça o registro de logs corretamente

Em geral, existem duas razões para registrar logs em seu aplicativo: Para depuração e para registro de logs de atividade do aplicativo (essencialmente, todo o resto). Usar
o `console.log()` ou o `console.err()` para imprimir mensagens de log no
terminal é uma prática comum em desenvolvimento. Mas [essas
funções são síncronas](https://nodejs.org/api/console.html#console_console_1) quando o destino é um terminal ou um arquivo, portanto elas não são adequadas para produção, a não ser que
a saída seja canalizada para outro programa.

#### Para depuração

Se estiver registrando logs com o propósito de depuração, então ao invés de usar o `console.log()`, use um módulo
especial para depuração como o [debug](https://www.npmjs.com/package/debug). Este
módulo permite que seja usada a variável de ambiente DEBUG para controlar quais mensagens de depuração são enviadas para o
`console.err()`, se houver. Para manter o seu aplicativo puramente assíncrono, você deverá canalizar o
`console.err()` para outro programa. Mas nesse ponto, você não fará a depuração na produção, não é?

#### Para atividade do aplicativo

Se estiver registrando logs de atividade do aplicativo (por
exemplo, rastreamento de tráfico ou chamadas de API), ao invés de
usar o `console.log()`, use uma biblioteca de
registro de logs como [Winston](https://www.npmjs.com/package/winston) ou [Bunyan](https://www.npmjs.com/package/bunyan). Para
obter uma comparação detalhada dessas duas bibliotecas, consulte a postagem do blog do StrongLoop
[Comparando o registro de logs no Node.js usando Winston e Bunyan](https://strongloop.com/strongblog/compare-node-js-logging-winston-bunyan/).

<a name="exceptions"></a>

### Lide com exceções adequadamente

Aplicativos do Node caem ao encontrarem uma exceção não
capturada. O não tratamento de exceções e a não tomada das ações
apropriadas irão fazer com que o seu aplicativo do Express caia e
fique off-line. Se seguir os conselhos em [Assegurando que o seu aplicativo reinicie automaticamente](#restart)
abaixo, então seu aplicativo se recuperará de uma queda. Felizmente, aplicativos Express tipicamente possuem um tempo curto de inicialização. Contudo,
é desejável evitar quedas em primeiro lugar e, para fazer isso, é
necessário tratar exceções adequadamente.

Para garantir que está tratando todas as exceções, use as seguintes técnicas:

* [Use try-catch](#try-catch)
* [Use promessas](#promises)

Antes de se aprofundar nestes tópicos, você deveria ter um
entendimento básico de manipulação de erros do Node/Express: usando
retornos de chamada erros-first, e propagação de erros no
middleware. O Node usa uma convenção "retorno de chamada erros-first" para retorno de erros de funções assíncronas, onde o
primeiro parâmetro para a função de retorno de chamada é o objeto de erro, seguido dos dados de resultado nos parâmetros subsequentes. Para indicar que não ocorreram erros, passe null como o primeiro parâmetro. A função de retorno de chamada deve correspondentemente seguir a
convenção de retorno de chamada erros-first para tratar o erro de forma significativa. E no Express, a melhor prática é usar a função next() para propagar erros pela cadeia de middlewares.

Para obter mais informações sobre os fundamentos de manipulação de erros, consulte:

* [Manipulação de Erros no Node.js](https://www.joyent.com/developers/node/design/errors)
* [Construindo
Aplicativos Node Robustos: Manipulação de Erros](https://strongloop.com/strongblog/robust-node-applications-error-handling/) (blog do StrongLoop)

#### O que não fazer

Uma coisa que *não* deveria fazer é escutar a eventos `uncaughtException`, emitidos quando uma exceção
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

<a name="try-catch"></a>

#### Use try-catch

Try-catch é uma construção da linguagem JavaScript que pode ser usada para capturar exceções em um código síncrono. Use try-catch, por exemplo, para tratar erros de análise sintática de JSON como mostrado abaixo.

Use uma ferramenta como o [JSHint](http://jshint.com/) ou o
[JSLint](http://www.jslint.com/) para ajudá-lo a localizar exceções implícitas como
[erros de referência em variáveis indefinidas](http://www.jshint.com/docs/options/#undef).

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

<a name="promises"></a>

#### Use promessas

Promessas irão tratar quaisquer exceções (ambas explícitas e implícitas) em blocos de códigos assíncronos que usem
`then()`. Apenas inclua `.catch(next)` no final da cadeia de promessas. Por exemplo:

```js
app.get('/', (req, res, next) => {
  // do some sync stuff
  queryDb()
    .then((data) => makeCsv(data)) // handle data
    .then((csv) => { /* handle csv */ })
    .catch(next)
})

app.use((err, req, res, next) => {
  // handle error
})
```

Agora todos os erros assíncronos e síncronos são propagados para o middleware de erros.

Entretanto, existem dois alertas:

1.  Todo seu código assíncrono deve retornar promessas (exceto
emissores). Se uma biblioteca em particular não retornar promessas,
converta o objeto base através do uso de uma função auxiliar como
[Bluebird.promisifyAll()](http://bluebirdjs.com/docs/api/promise.promisifyall.html).
2.  Emissores de eventos (como fluxos) podem ainda causar
exceções não capturadas. Portanto certifique-se de que está tratando
o evento de erro apropriadamente; por exemplo:

```js
const wrap = fn => (...args) => fn(...args).catch(args[2])

app.get('/', wrap(async (req, res, next) => {
  const company = await getCompanyById(req.query.id)
  const stream = getLogoStreamById(company.id)
  stream.on('error', next).pipe(res)
}))
```

Para obter mais informações sobre o manipulação de erros usando
promessas, consulte:

* [Manipulando Erros
Assíncronos no Express com Promessas, Geradores e ES7](https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/)
* [Promessas no Node.js com o Q – Uma Alternativa a Retornos de Chamada](https://strongloop.com/strongblog/promises-in-node-js-with-q-an-alternative-to-callbacks/)

<a name="env"></a>

## Coisa a se fazer no seu ambiente / configuração

A seguir serão apresentados alguns itens que podem ser feitos no seu ambiente de sistema para melhorar o desempenho dos seus aplicativos:

* Configure o NODE_ENV para "produção"
* Assegure que o seu aplicativo reinicie automaticamente
* Execute seu aplicativo em um cluster
* Armazene em cache os resultados das solicitações
* Use um balanceador de carga
* Use um proxy reverso

### Configure o NODE_ENV para "produção"

A variável de ambiente NODE_ENV especifica o ambiente no qual um aplicativo está executando (geralmente, desenvolvimento ou
produção). Uma das coisas mais simples que podem ser feitas para
melhorar o desempenho é configurar NODE_ENV para "produção".

Configurando NODE_ENV para "produção" faz com que o Express:

* Armazene em Cache os modelos de visualização.
* Armazene em Cache arquivos CSS gerados a partir de extensões CSS.
* Gere menos mensagens de erro detalhadas

[Testes
indicam](http://apmblog.dynatrace.com/2015/07/22/the-drastic-effects-of-omitting-node_env-in-your-express-js-applications/) que apenas fazendo isso pode melhorar o desempenho por um fator de três!

Se precisar escrever código específico por ambiente, é possível verificar o valor de NODE_ENV com `process.env.NODE_ENV`. Esteja
ciente de que verificar o valor de qualquer variável de ambiente incorre em perda de desempenho, e por isso deve ser feito raramente.

Em desenvolvimento, você tipicamente configura variáveis de ambiente no seu shell interativo, por exemplo, usando o
`export` ou o seu arquivo `.bash_profile`. Mas
em geral você não deveria fazer isto em um servidor de produção; ao invés disso, use o sistema de inicialização do seu sistema
operacional (systemd ou Upstart). A próxima seção fornece mais detalhes sobre a utilização do seu sistema de inicialização em geral,
mas configurando NODE_ENV é tão importante para o desempenho (e fácil de fazer), que está destacado aqui.

Com o Upstart, use a palavra-chave `env` no
seu arquivo de tarefa. Por exemplo:

<pre>
<code class="language-sh" translate="no">
# /etc/init/env.conf
 env NODE_ENV=production
</code>
</pre>

Para obter mais informações, consulte o [Introdução, Cookbook e Melhores Práticas para o Upstart](http://upstart.ubuntu.com/cookbook/#environment-variables).

Com o systemd, use a diretiva `Environment` no seu arquivo de unidade. Por exemplo:

<pre>
<code class="language-sh" translate="no">
# /etc/systemd/system/myservice.service
Environment=NODE_ENV=production
</code>
</pre>

Para obter mais informações, consulte [Usando
Variáveis de Ambiente em Unidades systemd](https://coreos.com/os/docs/latest/using-environment-variables-in-systemd-units.html).

Se estiver usando o StrongLoop Process Manager, é possível também
[configurar
a variável de ambiente ao instalar o StrongLoop PM como um serviço](https://docs.strongloop.com/display/SLC/Setting+up+a+production+host#Settingupaproductionhost-Setenvironmentvariables).

### Assegure que o seu aplicativo reinicie automaticamente

Em produção, não é desejado que seu aplicativo fique off-line,
nunca. Isto significa que é necessário certificar-se de que ele
reinicie tanto se o aplicativo cair quanto se o próprio servidor
cair. Apesar de se esperar que nenhum desses eventos ocorram,
realisticamente você deve considerar ambas as eventualidades:

* Usando um gerenciador de processos para reiniciar o aplicativo (e o Node) quando ele cair.
* Usando o sistema de inicialização fornecido pelo seu sistema operacional para reiniciar o gerenciador de processos quando o
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

* Ganhe insights sobre o desempenho em tempo de execução e o consumo de recursos.
* Modifique configurações dinamicamente para melhorar o desempenho.
* Controle a clusterização (StrongLoop PM e pm2).

Os gerenciador de processos mais populares para o Node são os
seguintes:

* [StrongLoop Process Manager](http://strong-pm.io/)
* [PM2](https://github.com/Unitech/pm2)
* [Forever](https://www.npmjs.com/package/forever)

Para uma comparação recurso por recurso dos três gerenciadores
de processos, consulte [http://strong-pm.io/compare/](http://strong-pm.io/compare/). Para
obter uma introdução mais detalhada para todos os três, consulte [Gerenciadores de Processos para aplicativos do
Express](/{{ page.lang }}/advanced/pm.html).

Usando qualquer um desses gerenciadores de processos será o
suficiente para manter seu aplicativo funcionando, mesmo se ele cair
de tempos em tempos.

Entretanto, o StrongLoop PM possui vários recursos que são especificamente destinados para a implementação na produção. É possível usá-lo e as ferramentas relacionadas do StrongLoop para:

* Construir e empacotar seu aplicativo localmente, em seguida
implemente-o seguramente para o seu sistema de produção.
* Automaticamente reiniciar seu aplicativo se ele cair por qualquer razão.
* Gerenciar seus clusters remotamente.
* Visualizar perfis de CPU e captura instantânea de heap para
otimizar o desempenho e diagnosticar fugas de memória.
* Visualizar métricas de desempenho para o seu aplicativo.
* Facilmente escalar para múltiplos hosts com controle integrado para o balanceador de carga Nginx.

Como explicado abaixo, ao instalar o StrongLoop PM como um serviço do sistema operacional usando o  seu sistema de
inicialização, ele irá automaticamente reiniciar quando o sistema reiniciar. Assim, ele irá manter seus processos do aplicativo e clusters ativos para sempre.

#### Use um sistema de inicialização

A próxima camada de confiabilidade é para assegurar que o seu
aplicativo reinicie quando o servidor reiniciar. Os sistemas podem
ainda assim cair por uma variedade de razões. Para assegurar que o
seu aplicativo reinicie se o servidor cair, use o sistema de
inicialização integrado no seu sistema operacional. Os dois
principais sistemas de inicialização usados atualmente são o
[systemd](https://wiki.debian.org/systemd) e o [Upstart](http://upstart.ubuntu.com/).

Existem duas formas de usar sistemas de inicialização com o seu aplicativo Express:

* Executar o seu aplicativo em um gerenciador de processos, e instalar o gerenciador de processos com o sistema de inicialização. O gerenciador de processos irá reiniciar seu aplicativo quando o
aplicativo cair, e o sistema de inicialização irá reiniciar o
gerenciador de processos quando o sistema operacional reiniciar. Esta é a abordagem recomendada.
* Executar o seu aplicativo (e Node) diretamente com o sistema
de inicialização. Isto é de certa forma mais simples, mas você não
obtém as vantagens adicionais do uso de um gerenciador de processos.

##### Systemd

O Systemd é um sistema Linux e gerenciador de serviço. A
maioria das distribuições principais do Linux adotaram o systemd como
sistema de inicialização padrão.

Um arquivo de configuração de serviço do systemd é chamado
de *arquivo de unidade*, com um nome de arquivo
terminando em .service. Aqui está um exemplo de arquivo de unidade
para gerenciar um aplicativo Node diretamente (substitua o texto em
negrito com valores para o seu sistema e aplicativo):

<pre>
<code class="language-sh" translate="no">
[Unit]
Description=Awesome Express App

[Service]
Type=simple
ExecStart=/usr/local/bin/node /projects/myapp/index.js
WorkingDirectory=/projects/myapp

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
</code>
</pre>
Para obter mais informações sobre o systemd, consulte a
[referência
do systemd (página do manual)](http://www.freedesktop.org/software/systemd/man/systemd.unit.html).

##### StrongLoop PM como um serviço do systemd

É possível facilmente instalar o StrongLoop Process Manager
como um serviço do systemd. Após fazer isso, quando o servidor
reiniciar, ele irá automaticamente reiniciar o StrongLoop PM, que irá
então reiniciar todos os aplicativos que está gerenciando.

Para instalar o StrongLoop PM como um serviço do systemd:

```console
$ sudo sl-pm-install --systemd
```

Em seguida inicie o serviço com:

```console
$ sudo /usr/bin/systemctl start strong-pm
```

Para obter mais informações, consulte
[Configurando
um host de produção (documentação do StrongLoop)](https://docs.strongloop.com/display/SLC/Setting+up+a+production+host#Settingupaproductionhost-RHEL7+,Ubuntu15.04or15.10).

##### Upstart

O Upstart é uma ferramenta de sistema disponível em muitas distribuições Linux para inicialização de tarefas e serviços durante
a inicialização do sistema, parando-os durante o encerramento, e
supervisionando-os. É possível configurar seu aplicativo Express ou
gerenciador de processos como um serviço e em seguida o Upstart irá
automaticamente reiniciá-lo quando ele cair.

Um serviço do Upstart é definido em um arquivo de configuração de tarefa
(também chamado de uma "tarefa") com o nome do arquivo terminando com
`.conf`. O seguinte exemplo mostra como criar uma
tarefa chamada "myapp" para um aplicativo chamado "myapp" com o
arquivo principal localizado em `/projects/myapp/index.js`.

Crie um arquivo chamado `myapp.conf` em
`/etc/init/` com o seguinte conteúdo (substitua o
texto em negrito com os valores para o seu sistema e aplicativo):

<pre>
<code class="language-sh" translate="no">
# When to start the process
start on runlevel [2345]

# When to stop the process
stop on runlevel [016]

# Increase file descriptor limit to be able to handle more requests
limit nofile 50000 50000

# Use production mode
env NODE_ENV=production

# Run as www-data
setuid www-data
setgid www-data

# Run from inside the app dir
chdir /projects/myapp

# The process to start
exec /usr/local/bin/node /projects/myapp/index.js

# Restart the process if it is down
respawn

# Limit restart attempt to 10 times within 10 seconds
respawn limit 10 10
</code>
</pre>

NOTA: Este script requer o Upstart 1.4 ou mais novo, suportado no Ubuntu 12.04-14.10.

Como a tarefa está configurada para executar quando o sistema
inicia, seu aplicativo será iniciado juntamente com o sistema
operacional, e automaticamente reiniciado se o aplicativo ou o
sistema cair.

À parte da reinicialização automática do aplicativo, o Upstart
permite que você use estes comandos:

* `start myapp` – Inicia o aplicativo
* `restart myapp` – Reinicia o aplicativo
* `stop myapp` – Para o aplicativo

Para obter mais informações sobre o Upstart, consulte a
[Introdução, Cookbook,
e Melhores Práticas para o Upstart](http://upstart.ubuntu.com/cookbook).

##### StrongLoop PM como um serviço do Upstart

É possível facilmente instalar o StrongLoop Process Manager
como um serviço do Upstart. Após fazer isso, quando o servidor
reiniciar, ele irá automaticamente reiniciar o StrongLoop PM, que irá
então reiniciar todos os aplicativos que está gerenciando.

Para instalar o StrongLoop PM como um serviço do Upstart 1.4:

```console
$ sudo sl-pm-install
```

Em seguida execute o serviço com:

```console
$ sudo /sbin/initctl start strong-pm
```

NOTA: Em sistemas que não suportam o Upstart 1.4, os comandos
são ligeiramente diferentes. Consulte [Configurando
um host de produção (documentação do StrongLoop)](https://docs.strongloop.com/display/SLC/Setting+up+a+production+host#Settingupaproductionhost-RHELLinux5and6,Ubuntu10.04-.10,11.04-.10) para obter mais informações.

### Execute seu aplicativo em um cluster

Em um sistema com múltiplos núcleos, é possível aumentar o
desempenho de um aplicativo Node em muitas vezes ativando um cluster
de processos. Um cluster executa múltiplas instâncias do aplicativo,
idealmente uma instância em cada núcleo da CPU, assim distribuindo a carga e as
tarefas entre as instâncias.

<!--![Balanceamento entre instâncias do aplicativo usando a API de cluster](/images/clustering.png)-->

IMPORTANTE: Como as instâncias do aplicativo são executadas em processos separados, elas não compartilham o mesmo espaço de memória. Isto é, os objetos são locais para cada instância do aplicativo. Portanto, não é possível manter o estado no código do aplicativo. Entretanto, é possível usar um armazenamento de dados em memória como o [Redis](http://redis.io/) para armazenar dados
relativos à sessão e ao estado. Este alerta aplica-se a essencialmente todas as formas de escalonamento horizontal, seja a
clusterização com múltiplos processos ou múltiplos servidores físicos.

Em aplicativos clusterizados, processos de trabalho podem cair individualmente sem afetar o restante dos processos. Fora as vantagens de desempenho, o isolamento de falhas é outra razão para executar um cluster de processos de aplicativos. Sempre que processo de trabalho cair, certifique-se de registrar os logs do evento e spawn um novo processo usando cluster.fork().

#### Usando o módulo de cluster do Node

A clusterização é pode ser feita com o [módulo de
cluster](https://nodejs.org/docs/latest/api/cluster.html) do Node. Isto permite que um processo principal faça o
spawn de processos de trabalho e distribua conexões recebidas entre
os trabalhadores. Entretanto, em vez de usar este módulo diretamente,
é muito melhor usar uma das muitas ferramentas que fazem isso
automaticamente por você; por exemplo o [node-pm](https://www.npmjs.com/package/node-pm) ou
o [cluster-service](https://www.npmjs.com/package/cluster-service).

#### Usando o StrongLoop PM

Se você implementar seu aplicativo no StrongLoop Process Manager
(PM), então é possível tirar vantagem da clusterização
*sem* modificar o código do seu aplicativo.

Quando o StrongLoop Process Manager (PM) executa um aplicativo,
ele automaticamente executa-o em um cluster com um número de
trabalhadores igual ao número de núcleos de CPU do sistema. É
possível manualmente alterar o número de processos de trabalho no
cluster usando a ferramenta de linha de comandos slc sem parar o
aplicativo.

Por exemplo, assumindo que tenha implementado o seu aplicativo
para prod.foo.com e o StrongLoop PM está escutando na porta 8701 (a
padrão), em seguida configurar o tamanho do cluster para oito usando
o slc:

```console
$ slc ctl -C http://prod.foo.com:8701 set-size my-app 8
```

Para obter mais informações sobre clusterização com o StrongLoop
PM, consulte por [Clusterização](https://docs.strongloop.com/display/SLC/Clustering)
na documentação do StrongLoop.

### Armazene em cache os resultados das solicitações

Outra estratégia para melhorar o desempenho na produção é
armazenar em cache o resultado de solicitações, para que o seu
aplicativo não repita a operação para entregar a mesma solicitação
repetidamente.

Use um servidor de armazenamento em cache como o
[Varnish](https://www.varnish-cache.org/) ou o
[Nginx](https://www.nginx.com/resources/wiki/start/topics/examples/reverseproxycachingexample/)
(consulte também [Armazenamento
em Cache no Nginx](https://serversforhackers.com/nginx-caching/)) para melhorar imensamente a velocidade e o
desempenho do seu aplicativo.

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
servidores. É possível facilmente configurar um balanceador de carga
para o seu aplicativo usando o [Nginx](http://nginx.org/en/docs/http/load_balancing.html)
ou o [HAProxy](https://www.digitalocean.com/community/tutorials/an-introduction-to-haproxy-and-load-balancing-concepts).

Com o balanceamento de carga, você pode ter que garantir que
solicitações que estão associadas com um ID de sessão em particular
conectam ao processo que as originou. Isto é conhecido como
*afinidade de sessão*, ou *sessões
pegajosas*, e podem ser endereçadas pela sugestão acima para
usar um armazenamento de dados como o Redis para os dados da sessão
(dependendo do seu aplicativo). Para uma discussão, consulte por
[Usando
múltiplos nós](http://socket.io/docs/using-multiple-nodes/).

#### Usando o StrongLoop PM com um balanceador de carga Nginx

O [StrongLoop Process
Manager](http://strong-pm.io/) é integrado com um Controlador Nginx, tornando mais
fácil a configurar configurações de ambientes de produção com
múltiplos hosts. Para obter mais informações, consulte por
[Escalando
para servidores múltiplos](https://docs.strongloop.com/display/SLC/Scaling+to+multiple+servers) (documentação do StrongLoop).
<a name="proxy"></a>

### Use um proxy reverso

Um proxy reverso fica em frente a um aplicativo web e executa
operações de suporte nas solicitações, fora o direcionamento de
solicitações para o aplicativo. Ele pode lidar com páginas de erro,
compactação, armazenamento em cache, entrega de arquivos, e
balanceamento de carga entre outras coisas.

Entregar tarefas que não requerem conhecimento do estado do
aplicativo para um proxy reverso libera o Express para executar
tarefas especializadas de aplicativos. Por esta razão, é recomendado
executar o Express atrás de um proxy reverso como o
[Nginx](https://www.nginx.com/) ou o
[HAProxy](http://www.haproxy.org/) na produção.
