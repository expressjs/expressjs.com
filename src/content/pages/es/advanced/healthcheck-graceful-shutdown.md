---
title: Comprobaciones de salud y apagado positivo
description: Aprende cómo implementar comprobaciones de salud y apagado con gracia en aplicaciones Express para mejorar la confiabilidad, administrar implementaciones e integrarse con equilibradores de carga como Kubernetes.
---

## Apagado controlado

Cuando despliegues una nueva versión de tu aplicación, debes reemplazar la versión anterior. El gestor de procesos que está utilizando enviará primero una señal de SIGTERM a la aplicación para notificarle que será asesinado. Una vez que la aplicación reciba esta señal, debería dejar de aceptar nuevas solicitudes, terminar todas las solicitudes en curso, limpiar los recursos que utilizó, incluyendo conexiones de base de datos y bloqueos de archivos y luego salir.

### Ejemplo

```js
const server = app.listen(port);

process.on('SIGTERM', () => {
  debug('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    debug('HTTP server closed');
  });
});
```

## Revisiones de salud

Un balanceador de carga utiliza cheques de salud para determinar si una instancia de aplicación es saludable y puede aceptar solicitudes. Por ejemplo, [Kubernetes tiene dos cheques de salud](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/):

- `liveness`, que determina cuándo reiniciar un contenedor.
- `readiness`, que determina cuando un contenedor está listo para empezar a aceptar tráfico. Cuando un pod no está listo, se elimina de los balanceadores de carga de servicio.
