---
layout: page
title: Gerenciadores de processos para aplicativos do Express
menu: advanced
lang: pt-br
---

# Gerenciadores de processos para aplicativos do Express

Ao executar aplicativos do Express para produção, é útil usar um *gerenciador de processos* para completar as
seguintes tarefas:


- Reiniciar o aplicativo automaticamente se cair.
- Ganhe insights sobre o desempenho em tempo de execução e o consumo de recursos.

- Modifique configurações dinamicamente para melhorar o desempenho.
- Controle a clusterização.

Um gerenciador de processos é de certa forma parecido com um
servidor de aplicativos: ele é um "contêiner" para aplicativos que
facilita a implementação, fornece alta disponibilidade, e permite o
gerenciamento do aplicativo em tempo real.

Os gerenciadores de processos mais populares para o Express e outros aplicativos Node.js são os seguintes:

- [StrongLoop Process Manager](#sl)
- [PM2](#pm2)
- [Forever](#forever)


Usar qualquer uma dessas três ferramentas pode ser muito útil,
entretanto o StrongLoop Process Manager é a única ferramenta que
fornece uma solução abrangente de tempo de execução e implementação
que é atende ao ciclo de vida completo de aplicativos do Node.js, com
ferramentas para todas as etapas antes e depois da produção, em uma
interface unificada.


Aqui está uma breve visão de cada uma dessas ferramentas.
Para obter uma comparação detalhada, consulte [http://strong-pm.io/compare/](http://strong-pm.io/compare/).

## <a id="sl">StrongLoop Process Manager</a>

O StrongLoop Process Manager (StrongLoop PM) é um gerenciador
de processos para aplicativos do Node.js. O StrongLoop PM possui
balanceamento de carga, monitoramento, e implementação em múltiplos
hosts integrada, e um console gráfico.
É possível usar o StrongLoop PM para as seguintes tarefas:

- Construir, empacotar, e implementar aplicativos do Node.js para um sistema local ou remoto.
- Visualizar perfis de CPU e captura instantânea de heap para
otimizar o desempenho e diagnosticar fugas de memória.
- Manter processos e clusters ativos para sempre.
- Visualizar métricas de desempenho no seu aplicativo.
- Facilmente gerenciar implementações em múltiplos hosts com a integração com o Nginx.
- Unificar vários StrongLoop PMs para um tempo de execução de microsserviços distribuído que é gerenciado a partir de um Arc.


É possível trabalhar com o StrongLoop PM usando uma poderosa
ferramenta de interface da linha de comandos chamada
`slc`, ou uma ferramenta gráfica chamada Arc. A Arc
é um software livre, com suporte profissional fornecido pelo StrongLoop.

Para obter mais informações, consulte [http://strong-pm.io/](http://strong-pm.io/).

Documentação completa:

- [Aplicativos operacionais do Node (documentação do StrongLoop)](http://docs.strongloop.com/display/SLC)
- [Usando o StrongLoop Process Manager](http://docs.strongloop.com/display/SLC/Using+Process+Manager).

### Instalação

```console
$ [sudo] npm install -g strongloop
```

### Uso Básico

```console
$ cd my-app
$ slc start
```

Visualizar o status do Gerenciador de Processos e todos os aplicativos implementados:

```console
$ slc ctl
Service ID: 1
Service Name: my-app
Environment variables:
  No environment variables defined
Instances:
    Version  Agent version  Cluster size
     4.1.13      1.5.14           4
Processes:
        ID      PID   WID  Listening Ports  Tracking objects?  CPU profiling?
    1.1.57692  57692   0
    1.1.57693  57693   1     0.0.0.0:3001
    1.1.57694  57694   2     0.0.0.0:3001
    1.1.57695  57695   3     0.0.0.0:3001
    1.1.57696  57696   4     0.0.0.0:3001
```

Listar todos os aplicativos (serviços) sendo gerenciados:

```console
$ slc ctl ls
Id          Name         Scale
 1          my-app       1
```

Parar um aplicativo:

```console
$ slc ctl stop my-app
```

Reiniciar um aplicativo:

```console
$ slc ctl restart my-app
```

É possível também fazer uma "reinicialização leve," que dá aos
processos de trabalho um período de tolerância para fechar conexões
existentes, e em seguida reiniciar o aplicativo atual:


```console
$ slc ctl soft-restart my-app
```

Para remover um aplicativo do gerenciamento:

```console
$ slc ctl remove my-app
```

## <a id="pm2">PM2</a>

O PM2 é um gerenciador de processos de produção para aplicativos do Node.js,
que possui um balanceador de carga integrado. O PM2 permite manter os
aplicativos ativos para sempre e recarregá-los sem tempo de
inatividade, e facilitará tarefas comuns de administração de
sistemas. O PM2 também permite que você gerencie  o registro de logs,
o monitoramento, e a clusterização do aplicativo.


Para obter mais informações, consulte: [https://github.com/Unitech/pm2](https://github.com/Unitech/pm2).

### Instalação

```console
$ [sudo] npm install pm2 -g
```

### Uso Básico

Ao iniciar um aplicativo usando o comando
`pm2`, você deve especificar o caminho do aplicativo. No
entanto, ao parar, reiniciar, ou excluir um aplicativo, é possível
especificar apenas o nome ou o id do aplicativo.


```console
$ pm2 start npm --name my-app -- start
[PM2] restartProcessId process id 0
┌──────────┬────┬──────┬───────┬────────┬─────────┬────────┬─────────────┬──────────┐
│ App name │ id │ mode │ pid   │ status │ restart │ uptime │ memory      │ watching │
├──────────┼────┼──────┼───────┼────────┼─────────┼────────┼─────────────┼──────────┤
│ my-app   │ 0  │ fork │ 64029 │ online │ 1       │ 0s     │ 17.816 MB   │ disabled │
└──────────┴────┴──────┴───────┴────────┴─────────┴────────┴─────────────┴──────────┘
 Use the `pm2 show <id|name>` command to get more details about an app.
```

Ao iniciar um aplicativo usando o comando `pm2`, o aplicativo será imediatamente enviado para
o segundo plano. É possível controlar os aplicativos em segundo plano a partir da linha de comandos usando vários comandos `pm2`.

Após um aplicativo ser iniciado usando o comando `pm2`, ele é registrado na lista de
processos do PM2 com um ID. É possível portanto gerenciar aplicativos com o mesmo nome a partir de diretórios diferentes no sistema, usando
os seus IDs.

Observe que se mais de um aplicativo com o mesmo nome estiver executando, os comandos do `pm2` afetam todos eles.
Portanto use os IDs ao invés dos nomes para gerenciar aplicativos individualmente.

Listar todos os processos em execução:

```console
$ pm2 list
```

Parar um aplicativo:

```console
$ pm2 stop 0
```

Reiniciar um aplicativo:

```console
$ pm2 restart 0
```

Para visualizar informações detalhadas sobre um aplicativo:

```console
$ pm2 show 0
```

Para remover um aplicativo do registro do PM2:

```console
$ pm2 delete 0
```


## <a id="forever">Forever</a>

Forever é uma ferramenta simples de interface da linha de
comandos para assegurar que um dado script executa continuamente
(para sempre). A interface simples do Forever torna-o ideal para a
execução de implementações menores dos aplicativos e scripts do
Node.js.


Para obter mais informações, consulte: [https://github.com/foreverjs/forever](https://github.com/foreverjs/forever).

### Instalação

```console
$ [sudo] npm install forever -g
```

### Uso Básico

Para iniciar um script, use o comando `forever start` e especifique o caminho do script:

```console
$ forever start script.js
```

Este comando irá executar o script em modo daemon (no segundo plano).

Para executar o script de forma que ele seja anexado ao terminal, omita `start`:

```console
$ forever script.js
```

É uma boa ideia registrar os logs da saída da ferramenta Forever e do script usando as opções de log `-l`,
`-o`, e `-e`, como mostradas nesse exemplo:


```console
$ forever start -l forever.log -o out.log -e err.log script.js
```

Para visualizar a lista de scripts que foram iniciados pelo Forever:

```console
$ forever list
```

Para parar um script que foi iniciado pelo Forever use o
comando `forever stop` e especifique o índice do
processo (conforme listado pelo comando `forever
list`).

```console
$ forever stop 1
```

Alternativamente, especifique o caminho do arquivo:

```console
$ forever stop script.js
```

Para parar todos os scripts que foram iniciados pelo Forever:

```console
$ forever stopall
```

O Forever possui muitas outras opções, e ele também fornece uma API programática.

