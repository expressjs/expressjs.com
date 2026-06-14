---
title: 'Práticas de produção: desempenho e confiabilidade'
description: Descubra desempenho e confiabilidade melhores práticas para aplicativos Express na produção, cobrindo otimizações de código e configurações de ambiente para um desempenho ideal.
---

Este artigo discute as melhores práticas de desempenho e confiabilidade para aplicativos Expresso aplicados à produção.

Este tema cai claramente no mundo "devops", abrangendo tanto o desenvolvimento tradicional como as operações. Assim, a informação é dividida em duas partes:

- Coisas a fazer no seu código (a parte de desenvolvedor):
  - [Usar compressão gzip](#use-gzip-compression)
  - [Não usar funções síncronas](#dont-use-synchronous-functions)
  - [Faça o registro corretamente](#do-logging-correctly)
  - [Tratar exceções corretamente](#handle-exceptions-properly)
- Coisas a fazer em seu ambiente / configuração (a parte ops):
  - [Definir NODE_ENV para "produção"](#set-node_env-to-production)
  - [Verifique se seu aplicativo reinicia automaticamente](#ensure-your-app-automatically-restarts)
  - [Execute seu aplicativo em um cluster](#run-your-app-in-a-cluster)
  - [Resultados da requisição de cache](#cache-request-results)
  - [Usar um balanceador de carga](#use-a-load-balancer)
  - [Usar um proxy reverso](#use-a-reverse-proxy)

## Coisas a fazer em seu código

Aqui estão algumas coisas que você pode fazer em seu código para melhorar o desempenho do seu aplicativo:

- [Usar compressão gzip](#use-gzip-compression)
- [Não usar funções síncronas](#dont-use-synchronous-functions)
- [Faça o registro corretamente](#do-logging-correctly)
- [Tratar exceções corretamente](#handle-exceptions-properly)

### Usar compressão gzip

O compactação Gzip pode diminuir significativamente o tamanho do corpo da resposta e, assim, aumentar a velocidade de um aplicativo da web. Use o [compression](https://www.npmjs.com/package/compression) middleware para compressão gzip no seu aplicativo Express. Por exemplo:

```js
const compression = require('compression');
const express = require('express');
const app = express();

app.use(compression());
```

Para um sítio web de alto tráfego, em produção, a melhor maneira de colocar a compressão no lugar é implementá-la a um nível de proxy reverso (veja [usar um proxy reverso](#use-a-reverse-proxy)). Nesse caso, não é necessário utilizar um middleware de compressão. Para detalhes sobre como ativar a compressão gzip no Nginx, consulte [Module ngx_http_gzip_module](http://nginx.org/en/docs/http/ngx_http_gzip_module) na documentação do Nginx.

### Não usar funções síncronas

Os métodos e funções síncríveis ligam o processo de execução até que retornam. Uma única chamada para uma função síncrona pode retornar em alguns microsegundos ou milissegundos, No entanto, em sites com alto tráfego, essas chamadas somam e reduzem o desempenho do aplicativo. Evite a sua utilização em produção.

Embora o Node e muitos módulos fornecem versões sincronizadas e assíncronas de suas funções, sempre use a versão assíncrona em produção. O único momento em que uma função síncrona pode ser justificada é na inicialização inicial.

Você pode usar o sinalizador de linha de comando `--trace-sync-io` para imprimir um aviso e um rastreamento de pilha sempre que seu aplicativo usar uma API síncrona. Claro, você não gostaria de usar isto em produção, mas sim de garantir que seu código esteja pronto para produção. Veja a [documentação de opções de linha de comando do nó](https://nodejs.org/api/cli#cli_trace_sync_io) para mais informações.

### Faça o login corretamente

Em geral, existem duas razões para registrar seu aplicativo: para depuração e para registrar a atividade do aplicativo (essencialmente, tudo o mais). Usar `console.log()` ou `console.error()` para imprimir mensagens de log no terminal é uma prática comum de desenvolvimento. Mas [essas funções são sincronizadas](https://nodejs.org/api/console#console) quando o destino é um terminal ou um arquivo, então eles não são adequados para produção, a menos que você canalize a saída para outro programa.

#### Para depuração

Se você está logando para fins de depuração, em vez de usar `console.log()`, use um módulo de depuração especial, como [debug](https://www.npmjs.com/package/debug). Esse módulo permite que você use a variável de ambiente DEBUG para controlar quais mensagens de depuração são enviadas para `console.error()`, se houver. Para manter seu aplicativo puramente assíncrono, você ainda pode usar o comando `console.error()` para outro programa. Mas então, você realmente não vai depurar na produção, não é?

#### Para atividades do aplicativo

Se você está registrando a atividade do aplicativo (por exemplo, monitorando tráfego ou chamadas de API), em vez de usar o `console. og()`, use uma biblioteca de logs como [Pino](https://www.npmjs.com/package/pino), que é a opção mais rápida e eficiente disponível.

### Manipular exceções corretamente

Aplicativos do nó falham quando encontram uma exceção desmarcada. Não lidar com exceções e tomar as ações adequadas fará com que seu app Express pare de funcionar e fique offline. Se você seguir o conselho em [Verifique se seu aplicativo reinicia automaticamente](#ensure-your-app-automatically-restarts) abaixo, então seu aplicativo se recuperará de uma falha. Felizmente, os aplicativos Express normalmente têm um curto tempo de inicialização. No entanto, o senhor deputado quer evitar a queda, e, para isso, tem de tratar devidamente as excepções.

Para garantir que você lida com todas as exceções, use as seguintes técnicas:

- [Usar captura final](#use-try-catch)
- [Usar promessas](#use-promises)

Antes de mergulhar nestes tópicos, você deve ter um entendimento básico da manipulação de erro Node/Express: usar callback error first e propagar erros no middleware. O nó utiliza uma convenção "error-first callback" para retornar erros de funções assíncronas, onde o primeiro parâmetro para a função de callback é o objeto de erro, seguido pelos dados de resultado em parâmetros de sucesso. Para indicar nenhum erro, passe nulo como primeiro parâmetro. A função de callback deve seguir correspondentemente a convenção de callback error-first para lidar de forma significativa com o erro. E em Express, a melhor prática é usar a função next() para propagar erros através da cadeia de middleware.

Para saber mais sobre os fundamentos da manipulação de erros, veja:

- [Erro manipulando o Node.js](https://www.tritondatacenter.com/node-js/production/design/errors)

#### Usar try-catch

Try-catch é uma construção de idioma JavaScript que você pode usar para capturar exceções em código síncrono. Use a tentativa de captura, por exemplo, para lidar com erros de análise JSON, como mostrado abaixo.

Aqui está um exemplo de utilização de capturas de tentativa para lidar com uma potencial exceção do crash do processo.
Esta função middleware aceita um parâmetro de campo de consulta chamado "params" que é um objeto JSON.

```js
app.get('/search', (req, res) => {
  // Simulating async operation
  setImmediate(() => {
    const jsonStr = req.query.params;
    try {
      const jsonObj = JSON.parse(jsonStr);
      res.send('Success');
    } catch (e) {
      res.status(400).send('Invalid JSON string');
    }
  });
});
```

No entanto, a tentativa y-catch só funciona para código síncrono. Porque a plataforma Node é principalmente assíncrona (particularmente em ambiente de produção), a tentativa de captura não vai pegar muitas exceções.

#### Usar promessas

Quando um erro é lançado em uma função `async` ou uma promessa rejeitada é aguardada dentro de uma função `async`, esses erros serão passados para o manipulador de erros como se chamando `next(err)`

```js
app.get('/', async (req, res, next) => {
  const data = await userData(); // If this promise fails, it will automatically call `next(err)` to handle the error.

  res.send(data);
});

app.use((err, req, res, next) => {
  res.status(err.status ?? 500).send({ error: err.message });
});
```

Além disso, você pode usar funções assíncronas para o seu middleware, e o roteador irá lidar com erros se a promessa falhar, por exemplo:

```js
app.use(async (req, res, next) => {
  req.locals.user = await getUser(req);

  next(); // This will be called if the promise does not throw an error.
});
```

A melhor prática é lidar com os erros o mais próximo possível do site. Então enquanto isso é manipulado no roteador, É melhor encontrar o erro no middleware e lidar com ele sem depender de um middleware separado para manipular erros.

#### O que não fazer

Uma coisa que você não deveria fazer é ouvir o evento `uncaughtException`, emitido quando uma exceção bolha até o laço de repetição do evento. Adicionando um listener de eventos para `uncaughtException` mudará o comportamento padrão do processo que está encontrando uma exceção; o processo continuará a decorrer apesar da excepção. Isso pode soar como uma boa maneira de impedir que seu aplicativo caia, mas continuar a executar o aplicativo após uma exceção não detectada é uma prática perigosa e não é recomendado, porque o estado do processo se torna pouco fiável e imprevisível.

Além disso, usar `uncaughtException` é oficialmente reconhecido como [crude](https://nodejs.org/api/process#process_event_uncaughtexception). Então ouvir por `uncaughtException` é apenas uma má ideia. É por isso que recomendamos coisas como processos múltiplos e supervisores: falhar e reiniciar é muitas vezes a maneira mais confiável de recuperar de um erro.

Também não recomendamos o uso de [domains](https://nodejs.org/api/domain). Geralmente isso não resolve o problema e é um módulo obsoleto.

## Coisas a fazer no seu ambiente / configuração

Aqui estão algumas coisas que você pode fazer em seu ambiente de sistema para melhorar o desempenho do seu aplicativo:

- [Definir NODE_ENV para "produção"](#set-node_env-to-production)
- [Verifique se seu aplicativo reinicia automaticamente](#ensure-your-app-automatically-restarts)
- [Execute seu aplicativo em um cluster](#run-your-app-in-a-cluster)
- [Resultados da requisição de cache](#cache-request-results)
- [Usar um balanceador de carga](#use-a-load-balancer)
- [Usar um proxy reverso](#use-a-reverse-proxy)

### Definir NODE_ENV para "produção"

A variável de ambiente NODE_ENV especifica o ambiente em que uma aplicação está sendo executada (usualmente, desenvolvimento ou produção). Uma das coisas mais simples que você pode fazer para melhorar o desempenho é configurar NODE_ENV para `produção`.

Definir NODE_ENV para "produção" faz Expressão:

- Modelos de exibição em cache.
- Arquivos CSS do cache gerados a partir de extensões CSS.
- Gerar mensagens de erro menos detalhadas.

[Testes indicados](https://www.dynatrace.com/news/blog/the-drastic-effects-of-omitting-node-env-in-your-express-js-applications/) que apenas fazer isso pode melhorar o desempenho do aplicativo por um fator de três!

Se você precisar escrever código de ambiente específico, você pode verificar o valor de NODE_ENV com `process.env.NODE_ENV`. Esteja ciente de que verificar o valor de qualquer variável de ambiente implica uma penalização de desempenho, assim como deve ser feito com moderação.

No desenvolvimento, você normalmente define variáveis de ambiente em seu shell interativo, por exemplo, usando `export` ou seu arquivo `.bash_profile`. Mas, em geral, você não deve fazer isso em um servidor de produção; em vez disso, use o sistema init do seu SO (sistema). A próxima seção fornece mais detalhes sobre o uso do seu sistema de init em geral mas a configuração de `NODE_ENV` é tão importante para desempenho (e fácil de fazer), que é destacada aqui.

Com o sistema, use a diretiva `Ambiente` no seu arquivo unitário. Por exemplo:

```sh

Environment=NODE_ENV=production
```

Para obter mais informações, consulte [Usando Variáveis de Ambiente em Unidades sistêmicas](https://www.flatcar.org/docs/latest/setup/systemd/environment-variables/).

### Certifique-se de que seu aplicativo reinicie automaticamente

Em produção, você não quer que sua aplicação fique offline, nunca. Isto significa que você precisa ter certeza que ele reiniciará tanto se o aplicativo falhar e o próprio servidor falhar. Embora você espere que nenhum desses acontecimentos ocorra, realisticamente você deve ter em conta ambas as eventualidades por:

- Usando um gerenciador de processo para reiniciar o aplicativo (e Node) quando ele travar.
- Usando o sistema de init fornecido pelo seu sistema operacional para reiniciar o gerenciador de processos quando o sistema operacional travar. Também é possível usar o sistema sem um gerente de processo.

Aplicativos do nó falham se encontrarem uma exceção não capturada. A principal coisa que você precisa fazer é garantir que seu aplicativo seja bem testado e tenha todas as exceções (veja [handle exceptions correctly](#handle-exceptions-properly) para detalhes). Mas como falha, coloque um mecanismo em prática para garantir que se e quando o aplicativo parar de funcionar, ele será reiniciado automaticamente.

#### Usar um gerenciador de processo

Em desenvolvimento, você iniciou seu aplicativo simplesmente pela linha de comando com `node server.js` ou algo parecido. Mas fazer isto em produção é uma receita para o desastre. Se o aplicativo falhar, ele ficará offline até você reiniciá-lo. Para garantir que seu aplicativo seja reiniciado se ele falhar, use um gerenciador de processo. Um gerenciador de processo é um "container" para aplicativos que facilitam a implantação, fornece alta disponibilidade, e permite que você gerencie o aplicativo em tempo de execução.

Além de reiniciar seu aplicativo quando ele falhar, um gerente de processo pode habilitá-lo:

- Receba informações sobre o desempenho da execução e o consumo de recursos.
- Modifique as configurações dinamicamente para melhorar o desempenho.
- Controle agrupamento (pm2).

Historicamente, foi popular usar um gerente de processo Node.js como [PM2](https://github.com/Unitech/pm2). Veja a documentação deles, se você quiser fazer isso. No entanto, recomendamos a utilização de seu sistema de init para gerenciamento de processos.

#### Usar um sistema de entrada

A próxima camada de confiabilidade é garantir que seu aplicativo seja reiniciado quando o servidor reiniciar. Os sistemas ainda podem descer por diversas razões. Para garantir que seu aplicativo seja reiniciado se o servidor falhar, use o sistema incorporado no seu sistema operacional. O sistema principal de init em uso hoje é [systemd](https://wiki.debian.org/systemd).

Existem duas maneiras de usar sistemas de entrada com seu aplicativo Express:

- Execute seu aplicativo em um gerenciador de processo e instale o gerente de processo como um serviço com o sistema de init. O gerenciador de processos irá reiniciar seu aplicativo quando o aplicativo falhar, e o sistema inicial irá reiniciar o gerenciador de processos quando o sistema operacional for reiniciado. Esta é a abordagem recomendada.
- Execute seu aplicativo (e Node) diretamente com o sistema init. Isto é um pouco mais simples, mas você não obtém as vantagens adicionais de usar um gerenciador de processo.

##### Systemd

O Systemd é um gerenciador de serviços e sistema Linux. A maioria das principais distribuições de Linux adotaram o sistema como sistema de init padrão.

Um arquivo de configuração de serviço systemd é chamado de _unit file_, com um nome de arquivo terminando em `.service`. Aqui está um exemplo de arquivo unitário para gerenciar um aplicativo Node diretamente. Substitua os valores colocados em \`<angle brackets>para o seu sistema e aplicativo:

```sh
[Unit]
Description=<Awesome Express App>

[Service]
Type=simple
ExecStart=/usr/local/bin/node </projects/myapp/index.js>
WorkingDirectory=</projects/myapp>

User=nobody
Group=nogroup


Environment=NODE_ENV=production


LimitNOFILE=infinity


LimitCORE=infinity

StandardInput=null
StandardOutput=syslog
StandardError=syslog
Restart=always

[Install]
WantedBy=multi-user.target
```

Para obter mais informações sobre o sistema, consulte a [referência do sistema (man page)](http://www.freedesktop.org/software/systemd/man/systemd.unit).

### Executar seu aplicativo em um cluster

Em um sistema multi-núcleo, você pode aumentar o desempenho de um aplicativo Node muitas vezes, iniciando um cluster de processos. Um cluster executa várias instâncias do aplicativo, idealmente uma instância em cada núcleo da CPU, distribuindo assim a carga e tarefas entre as instâncias.

![Balanceamento entre instâncias de aplicação usando a API de agrupamento](/images/clustering.png)

IMPORTANTE: Como as instâncias do aplicativo são executadas como processos separados, eles não compartilham o mesmo espaço de memória. Ou seja, objetos são locais para cada instância do aplicativo. Por conseguinte, não pode manter o estado no código de candidatura. No entanto, você pode usar um datastore na memória como [Redis](http://redis.io/) para armazenar dados e estado relacionados à sessão. Esta ressalva se aplica essencialmente a todas as formas de escala horizontal, seja agrupamento com vários processos ou vários servidores físicos.

Em apps agrupados, os processos dos trabalhadores podem falhar individualmente sem afetar o resto dos processos. Além das vantagens de desempenho, isolamento de falhas é outra razão para executar um agrupamento de processos de aplicativos. Sempre que um processo do worker parar de funcionar, tenha certeza de registrar o evento e gerar um novo processo usando cluster.fork().

#### Usando módulo de cluster do Node

É possível agrupar com o [módulo cluster do Node](https://nodejs.org/api/cluster). Isto permite a um processo mestre gerar processos de trabalhadores e distribuir conexões de entrada entre os trabalhadores.

#### Usando PM2

Se você publicar sua aplicação com PM2, então você pode aproveitar o clustering _without_ para modificar o código da sua aplicação. Você deve garantir sua [inscrição sem estado](https://pm2.keymetrics.io/docs/usage/specifics/#stateless-apps) primeiro, significando que nenhum dado local é armazenado no processo (como sessões, conexões de websocket e coisas parecidas).

Ao executar um aplicativo com PM2, você pode habilitar o **modo de agrupamento** para executá-lo em um cluster com várias instâncias de sua escolha, como o número de CPUs disponíveis na máquina. Você pode alterar manualmente o número de processos no cluster usando a ferramenta de linha de comando `pm2` sem parar o aplicativo.

Para ativar o modo de agrupamento, inicie seu aplicativo assim:

```bash

$ pm2 start npm --name my-app -i 4 -- start

$ pm2 start npm --name my-app -i max -- start
```

Isto também pode ser configurado em um arquivo de processo PM2 (`ecosystem.config. s` ou similar) definindo `exec_mode` para `cluster` e `instâncias` para o número de trabalhadores para começar.

Ao executar, o aplicativo pode ser dimensionado assim:

```bash

$ pm2 scale my-app +3

$ pm2 scale my-app 2
```

Para obter mais informações sobre agrupamento com PM2, consulte [Modo Cluster](https://pm2.keymetrics.io/docs/usage/cluster-mode/) na documentação PM2.

### Resultados da requisição em cache

Outra estratégia para melhorar o desempenho em produção é armazenar em cache o resultado das solicitações, para que seu aplicativo não repita a operação para atender o mesmo pedido repetidamente.

Use um servidor de cache como [Varnish](https://www.varnish-cache.org/) ou [Nginx](https://blog.nginx.org/blog/nginx-caching-guide) (veja também [Nginx Caching](https://serversforhackers.com/nginx-caching/)) para melhorar muito a velocidade e o desempenho de sua aplicação.

### Use um balanceador de carga

Não importa o quão otimizado um app seja, uma única instância pode manipular apenas uma quantidade limitada de carga e tráfego. Uma maneira de expandir um aplicativo é rodando várias instâncias dele e distribuindo o tráfego através de um balanceador de carga. Configurar um balanceador de carga pode melhorar o desempenho e a velocidade do seu aplicativo, e habilitá-lo a escalar mais do que é possível com uma única instância.

Um balanceador de carga geralmente é um proxy reverso que orqualiza o tráfego de e para a partir de várias instâncias de aplicativos e servidores. Você pode facilmente configurar um balanceador de carga para o seu aplicativo usando [Nginx](https://nginx.org/en/docs/http/load_balancing.html) ou [HAProxy](https://www.digitalocean.com/community/tutorials/an-introduction-to-haproxy-and-load-balancing-concepts).

Com o balanceamento de carga, você pode ter que garantir que os pedidos que estão associados a um determinado ID de sessão estejam conectados ao processo que os originou. Isto é conhecido como afinidade de sessão, ou _sessões fixas_, e pode ser abordado pela sugestão acima para usar um armazenamento de dados, como Redis para dados de sessão (dependendo do seu aplicativo). Para uma discussão, consulte [Usando múltiplos nós](https://socket.io/docs/v4/using-multiple-nodes/).

### Usar um proxy reverso

Um proxy reverso está na frente de um aplicativo web e executa operações de suporte sobre as solicitações, além de direcionar solicitações para o aplicativo. Ele pode lidar com páginas de erro, compressão, cache, arquivos de servidor, e o equilíbrio de carga entre outras coisas.

Atingir tarefas que não exigem conhecimento do estado do aplicativo para um proxy reverso libera o Express para executar tarefas de aplicativo especializado. Por este motivo, é recomendado executar Expresso atrás de um proxy reverso como [Nginx](https://www.nginx.org/) ou [HAProxy](https://www.haproxy.org/) em produção.
