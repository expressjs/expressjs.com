---
layout: page
title: Verificação de integridade e Desligamento Gracioso
description: Aprenda como implementar verificações de integridade e encerramentos graciosos em aplicativos Express, para melhorar a confiabilidade, gerenciar implantações e integrar com balanceadores de carga como Kubernetes.
menu: advanced
order: 5
redirect_from: "  "
---

# Verificação de integridade e Desligamento Gracioso

## Desligamento Gracioso

Quando você publica uma nova versão do seu aplicativo, você deve substituir a versão anterior. The process manager you're using will first send a SIGTERM signal to the application to notify it that it will be killed. Once the application gets this signal, it should stop accepting new requests, finish all the ongoing requests, clean up the resources it used,  including database connections and file locks then exit.

### Exemplo

```js
const server = app.listen(port)

process.on('SIGTERM', () => {
  debug('SIGTERM signal received: closing HTTP server')
  server.close(() => {
    debug('HTTP server closed')
  })
})
```

## Verificações de integridade

A load balancer uses health checks to determine if an application instance is healthy and can accept requests. Por exemplo, [Kubernetes tem dois exames de saúde](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/):

- `liveness`, that determines when to restart a container.
- `readiness`, that determines when a container is ready to start accepting traffic. When a pod is not ready, it is removed from the service load balancers.