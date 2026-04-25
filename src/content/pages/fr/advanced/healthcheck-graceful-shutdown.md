---
title: Tests de santé et arrêt gracieux
description: Apprenez comment mettre en œuvre des contrôles de santé et une fermeture gracieuse dans les applications Express pour améliorer la fiabilité, gérer les déploiements et s'intégrer avec les équilibreurs de charge comme Kubernetes.
---

## Arrêt gracieux

Lorsque vous déployez une nouvelle version de votre application, vous devez remplacer la version précédente. Le gestionnaire de processus que vous utilisez enverra d'abord un signal SIGTERM à l'application pour l'informer qu'il sera tué. Une fois que l'application reçoit ce signal, elle devrait cesser d'accepter de nouvelles requêtes, terminer toutes les demandes en cours, nettoyer les ressources utilisées, y compris les connexions à la base de données et les verrous de fichiers puis quitter.

### Exemple

```js
const server = app.listen(port);

process.on('SIGTERM', () => {
  debug('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    debug('HTTP server closed');
  });
});
```

## Examens de santé

Un répartiteur de charge utilise des contrôles de santé pour déterminer si une instance de l'application est saine et peut accepter les demandes. Par exemple, [Kubernetes a deux examens de santé](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/):

- `liveness`, qui détermine quand redémarrer un conteneur.
- `readiness`, qui détermine quand un conteneur est prêt à accepter le trafic. Lorsqu'un pod n'est pas prêt, il est retiré des répartiteurs de charge du service.
