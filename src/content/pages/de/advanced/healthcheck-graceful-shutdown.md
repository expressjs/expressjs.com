---
title: Gesundheitschecks und anmutiges Herunterfahren
description: Erfahren Sie, wie Sie Gesundheitschecks und anmutiges Herunterfahren in Express-Apps implementieren können, um die Zuverlässigkeit zu verbessern, den Einsatz zu verwalten und sich mit Lastausgleichern wie Kubernetes zu integrieren.
---

## Angemessenes Herunterfahren

Wenn Sie eine neue Version Ihrer Anwendung bereitstellen, müssen Sie die vorherige Version ersetzen. Der von Ihnen verwendete Prozessmanager sendet zuerst ein SIGTERM-Signal an die Anwendung, um zu benachrichtigen, dass es beendet wird. Sobald die Anwendung dieses Signal erhält, sollte sie aufhören, neue Anfragen anzunehmen, alle laufenden Anfragen zu beenden, die verwendeten Ressourcen aufräumen, einschließlich Datenbankverbindungen und Dateisperren dann beenden.

### Beispiel

```js
const server = app.listen(port);

process.on('SIGTERM', () => {
  debug('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    debug('HTTP server closed');
  });
});
```

## Gesundheitschecks

Ein Lastausgleicher verwendet Gesundheitsprüfungen, um festzustellen, ob eine Anwendungsinstanz gesund ist und Anfragen annehmen kann. Zum Beispiel [Kubernetes hat zwei Gesundheitschecke](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/):

- 'liveness', das bestimmt, wann ein Container neu gestartet werden soll.
- `readiness`, das bestimmt, wann ein Container bereit ist, den Verkehr zu akzeptieren. Wenn ein Pod nicht bereit ist, wird er aus den Lastausgleichern entfernt.
