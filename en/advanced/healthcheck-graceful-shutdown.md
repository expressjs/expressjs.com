---
layout: page
title: Health Checks and Graceful Shutdown
menu: advanced
lang: en
redirect_from: "/advanced/healthcheck-graceful-shutdown.html"
---

# Health Checks and Graceful Shutdown

## Graceful shutdown

When you deploy a new version of your application, the old must be replaced. The process manager you are using *(no matter if it is Heroku, Kubernetes, supervisor or anything else)* will first send a SIGTERM signal to the application to let it know, that it will be killed. Once it gets this signal, it should stop accepting new requests, finish all the ongoing requests, and clean up the resources it used. Resources may include database connections or file locks.

## Health checks

Health checks of your applications are called by the load balancer of your application to let it know if the application instance is healthy, and can server traffic. If you are using Kubernetes, Kubernetes has two distinct health checks:

* liveness is used by the kubelet to know when to restart a container,
* readiness is used by the kubelet to know when a container is ready to start accepting traffic - when a pod is not ready, it is removed from the Service load balancers.

## Third-party solution: terminus

[terminus](https://github.com/godaddy/terminus) is an open-source project, which adds health checks and graceful shutdown to your applications - to save you from the boilerplate code you would add otherwise. You only have to provide the cleanup logic for graceful shutdowns, and the health check logic for health checks, all the rest is handled by it.

```js
const http = require('http');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('ok');
});

const server = http.createServer(app);

function onSignal() {
  console.log('server is starting cleanup');
  // start cleanup of resource, like databases or file descriptors
}

async function onHealthCheck() {
  // checks if the system is healthy, like the db connection is live
  // resolves, if health, rejects if not
}

terminus(server, {
  signal: 'SIGINT',
   healthChecks: {
    '/healthcheck': onHealthCheck,
  },
  onSignal
});

server.listen(3000);
```
