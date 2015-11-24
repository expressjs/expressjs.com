---
layout: page
title: Gerenciadores de processo para aplicações Express
menu: advanced
lang: pt-br
---

# Gerenciadores de processo para aplicações Express

Quando uma app Express roda em ambiente de prudução, será útil usar um _gerenciador de processos_ (´process manager´) para:
- Reiniciar automaticamente se a app fechar sozinha por algum motivo inesperado.
- Obter informações em tempo execução sobre a performance e o consumo de recursos.
- Alterar configurações dinamicamente para melhorar a performance.
- Controle de agrupamentos (clustering).

Um gerenciador de processos é mais ou menos como um servidor de aplicações: É um "container" para apps que facilita a implementação, promove alta disponibilidade e permite gerenciar a app em tempo de execução.

Os gerenciadores de processos mais populares para o Express e outras aplicações em Node são:

- [StrongLoop Process Manager](#sl)
- [PM2](#pm2)
- [Forever](#forever)



Usar qualquer um desses gerenciadores de processo pode ser muito útil, porém o StrongLoop é o único que oferece uma solução de em tempo de execução e desenvolvimento que aborda todo o ciclo de vida de uma aplicação Node com várias ferramentas para todos os passos, antes e depois de produção, isso tudo em uma interface unificada.


Aqui veremos uma rápida descrição destes três gerenciadores de processos.
Para uma comparação detalhada entre eles, consulte [http://strong-pm.io/compare/](http://strong-pm.io/compare/).

## <a id="sl">Gerenciador de Processos StrongLoop</a>

O gerenciador de processos StrongLoop (StrongLoop PM) é um gerenciador de processos de produção para aplicações Node que vem com ´load balancing´,  ´multi-host deployment´, e um console gráfico.

Isto permite:
- Construir, empacotar e fazer deploy de suas aplicações Node local ou remotamente.
- Visualizar perfis da CPU e snapshots de heap para otimizar a performance e diagnosticar leaks de memória.
- Manter sempre vivos processos e clusters.
- Gerenciar facilmente deploys multi-host com integração Nginx.
- Unificar múltiplos gerenciadores de processos StrongLoop para um gerenciamento de microservices distribuídos em runtime usando ´Arc´.

Você pode trabalhar com gerenciadores de processo StrongLoops usando uma poderosa ferramenta de linha de comando ou uma ferramenta gráfica, Arc. O gerenciador de processos StrongLoop é open source, com suporte profissional fornecido pela StrongLoop.

Para mais informações, veja [http://strong-pm.io/](http://strong-pm.io/).

Documentação completa:

- [Operating Node apps (StrongLoop documentation)](http://docs.strongloop.com/display/SLC)
- [Using StrongLoop Process Manager](http://docs.strongloop.com/display/SLC/Using+Process+Manager).

### Instalação
~~~sh
$ [sudo] npm install -g strongloop
~~~

### Utilização básica
~~~sh
$ cd my-app
$ slc start
~~~

Visualizar status do gerenciador de processos e todas as apps implantadas:

~~~sh
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
~~~

Listar todas as apps (services) que estão sendo gerenciadas.

~~~sh
$ slc ctl ls
Id          Name         Scale
 1          my-app       1
~~~

Parar uma app.

~~~sh
$ slc ctl stop my-app
~~~

Reiniciar uma app.

~~~sh
$ slc ctl restart my-app
~~~

Você também pode fazer um "soft restart", que dá aos processos que estão trabalhando um período tempo de carência para fechar as conexões existentes, e depois reiniciar a app atual.

~~~sh
$ slc ctl soft-restart my-app
~~~

Para remover uma app do gerenciador.

~~~sh
$ slc ctl remove my-app
~~~

## <a id="pm2">PM2</a>
PM2 é um gerenciador de processos de produção para aplicações Node.js. Este gerenciador tem um balanceador de load. Ele permite que você mantenha suas aplicações rodando sempre, recarregando-as sem tempo de inatividade e facilitando tarefas administrativas comuns. Também lhe permitirá o logging, monitoramento e clustering das aplicações.
Para mais informações, veja [https://github.com/Unitech/pm2](https://github.com/Unitech/pm2).


### Instalação

~~~sh
$ [sudo] npm install pm2 -g
~~~

### Utilização básica

Inicializar uma app com `pm2` requer que seja especificado o caminho para essa aplicação. No entanto, somente o nome ou id são requeridos para parar, reiniciar e deletar uma app.

~~~sh
$ pm2 start app.js
[PM2] restartProcessId process id 0
┌──────────┬────┬──────┬───────┬────────┬─────────┬────────┬─────────────┬──────────┐
│ App name │ id │ mode │ pid   │ status │ restart │ uptime │ memory      │ watching │
├──────────┼────┼──────┼───────┼────────┼─────────┼────────┼─────────────┼──────────┤
│ my-app   │ 0  │ fork │ 64029 │ online │ 1       │ 0s     │ 17.816 MB   │ disabled │
└──────────┴────┴──────┴───────┴────────┴─────────┴────────┴─────────────┴──────────┘
 Utilize `pm2 show <id|name>` para mostrar mais detalhes da aplicação.
~~~

Quando iniciada com `pm2` uma aplicação é imediatamente enviada para o background. Você pode controlar esse background da app utilizando linhas de comando do `pm2`.

Uma vez que uma app é iniciada com `pm2` ela é registrada na lista de processos do PM2 com um ID próprio, o que permite que seja possível gerenciar apps com o mesmo nome em diferentes diretórios no sistema.

Note que se várias apps estão rodando com o mesmo nome, o comando `pm2` utilizado com o nome afetará todas essas apps. Por isso utilize IDs em vez de nomes para gerenciar uma aplicação individualmente.

Lista todos os processo rodando:

~~~sh
$ pm2 list
~~~

Para uma app.

~~~sh
$ pm2 stop 0
~~~

Reinicia uma app:

~~~sh
$ pm2 restart 0
~~~

Mostra informações detalhadas sobre uma app:

~~~sh
$ pm2 show 0
~~~

Remove uma app do registro do PM2:

~~~sh
$ pm2 delete 0
~~~


## <a id="forever">Forever</a>

`Forever` é uma ferramenta simples de linha de comando que serve para garantir que um determinado script rode continuamente (para sempre). Sua interface simples a torna ideal para rodar pequenos `deployments` de aplicações Node e scripts.

Para mais informações, veja [https://github.com/foreverjs/forever](https://github.com/foreverjs/forever).

### Instalação

~~~sh
$ [sudo] npm install forever -g
~~~

### Utilização básica

Para iniciar um script, utilize o comando `forever start` especificando o caminho do script:

~~~sh
$ forever start script.js
~~~

Isto rodará o script em modo `daemon` (no background).

Para rodar o script atrelado ao terminal, omita a opção `start`:

~~~sh
$ forever script.js
~~~

Esta é uma boa ideia para gerar logs de saída a partir do forever e do script utilizando-se as opções de logging `-l`, `-o`, `-e`, como mostra esse exemplo:

~~~sh
$ forever start -l forever.log -o out.log -e err.log script.js
~~~

Para mostrar uma lista de scripts inicializados pelo forever:

~~~sh
$ forever list
~~~

Para parar um script iniciado pelo forever utilize o comando `forever stop`, especificando o index do processo (como listado pelo comando `forever list`).


~~~sh
$ forever stop 1
~~~

Alternativamente, você pode especificar o caminho do script.

~~~sh
$ forever stop script.js
~~~

Para parar todos os scripts inicializados pelo `forever`:

~~~sh
$ forever stopall
~~~

Forever tem muitas outras opções, e também fornece uma API programática.
