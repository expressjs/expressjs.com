---
title: Exame de Saúde e Desligamento Gracioso
description: Aprenda como implementar verificações de saúde e encerramentos graciosos em aplicativos Express, para melhorar a confiabilidade, gerenciar implantações e integrar com balanceadores de carga como Kubernetes.
---

## Encerramento Gracioso

Quando você publica uma nova versão do seu aplicativo, você deve substituir a versão anterior. O gerente de processo que você está utilizando primeiro enviará um sinal SIGTERM ao aplicativo para notificá-lo de que ele será encerrado. Assim que o aplicativo receber este sinal, ele deve parar de aceitar novas solicitações, finalizar todas as solicitações em andamento, limpe os recursos que usou, incluindo conexões de banco de dados e bloqueios de arquivos e depois saia.

### Exemplo

```js
const server = app.listen(port);

process.on('SIGTERM', () => {
  debug('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    debug('HTTP server closed');
  });
});
```

## Exercícios de saúde

Um balanceador de carga usa verificações de saúde para determinar se uma instância do aplicativo é saudável e pode aceitar pedidos. For example, [Kubernetes has two health checks](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes//):

- `liveness`, isso determina quando reiniciar um contêiner.
- `pronto`, que determina quando um recipiente está pronto para começar a aceitar tráfego. Quando um pod não está pronto, é removido dos balanceadores de carga de serviço.
