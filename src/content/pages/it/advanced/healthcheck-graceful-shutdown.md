---
title: Controlli sanitari e spegnimento grazioso
description: Scopri come implementare controlli di salute e arresto aggraziato nelle app Express per migliorare l'affidabilità, gestire le distribuzioni e integrare con bilanciatori di carico come Kubernetes.
---

## Spegnimento grazioso

Quando si distribuisce una nuova versione della propria applicazione, è necessario sostituire la versione precedente. Il gestore di processo che stai utilizzando invierà prima un segnale SIGTERM all'applicazione per notificarlo che verrà ucciso. Una volta che l'applicazione ottiene questo segnale, dovrebbe smettere di accettare nuove richieste, completare tutte le richieste in corso, pulire le risorse utilizzate, incluse le connessioni del database e i blocchi di file quindi uscire.

### Esempio

```js
const server = app.listen(port);

process.on('SIGTERM', () => {
  debug('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    debug('HTTP server closed');
  });
});
```

## Controlli sanitari

Un bilanciatore del carico utilizza controlli sanitari per determinare se un'istanza di applicazione è sana e può accettare le richieste. Ad esempio, [Kubernetes ha due controlli di salute](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/):

- `liveness`, che determina quando riavviare un contenitore.
- `pronte`, che determina quando un contenitore è pronto per iniziare ad accettare il traffico. Quando un baccello non è pronto, viene rimosso dai balanceri di carico di servizio.
