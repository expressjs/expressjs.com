---
layout: page
title: Health Checks and Graceful Shutdown
menu: advanced
lang: en
redirect_from: "/advanced/healthcheck-graceful-shutdown.html"
---

# Health Checks and Graceful Shutdown

## Graceful shutdown

When you deploy a new version of your application, you must replace the previous version. The [process manager](pm.html) you're using will first send a SIGTERM signal to the application to notify it that it will be killed. Once the application gets this signal, it should stop accepting new requests, finish all the ongoing requests, clean up the resources it used,  including database connections and file locks then exit.

### Example Graceful Shutdown
```js
const server = app.listen(port)

process.on('SIGTERM', () => {
  debug('SIGTERM signal received: closing HTTP server')
  server.close(() => {
    debug('HTTP server closed')
  })
})
```

## Health checks

A load balancer uses health checks to determine if an application instance is healthy and can accept requests. For example, [Kubernetes has two health checks](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/):

* `liveness`, that determines when to restart a container.
* `readiness`, that determines when a container is ready to start accepting traffic. When a pod is not ready, it is removed from the service load balancers.

## Third-party solutions

{% include community-caveat.html %}

### Terminus

[Terminus](https://github.com/godaddy/terminus) is an open-source project that adds health checks and graceful shutdown to your application to eliminate the need to write boilerplate code. You just provide the cleanup logic for graceful shutdowns and the health check logic for health checks, and terminus handles the rest.

Install terminus as follows:

```console
$ npm i @godaddy/terminus --save
```

Here's a basic template that illustrates using terminus.  For more information, see <https://github.com/godaddy/terminus>.

```js
const http = require('http')
const express = require('express')
const { createTerminus } = require('@godaddy/terminus')

const app = express()

app.get('/', (req, res) => {
  res.send('ok')
})

const server = http.createServer(app)

function onSignal () {
  console.log('server is starting cleanup')
  // start cleanup of resource, like databases or file descriptors
}

async function onHealthCheck () {
  // checks if the system is healthy, like the db connection is live
  // resolves, if health, rejects if not
}

createTerminus(server, {
  signal: 'SIGINT',
  healthChecks: { '/healthcheck': onHealthCheck },
  onSignal
})

server.listen(3000)
```

### Lightship

[Lightship](https://github.com/gajus/lightship) is an open-source project that adds health, readiness and liveness checks to your application. Lightship is a standalone HTTP-service that runs as a separate HTTP service; this allows having health-readiness-liveness HTTP endpoints without exposing them on the public interface.

Install Lightship as follows:

```console
$ npm install lightship
```

Basic template that illustrates using Lightship:

```js
const http = require('http')
const express = require('express')
const {
  createLightship
} = require('lightship')

// Lightship will start a HTTP service on port 9000.
const lightship = createLightship()

const app = express()

app.get('/', (req, res) => {
  res.send('ok')
})

app.listen(3000, () => {
  lightship.signalReady()
})

// You can signal that the service is not ready using `lightship.signalNotReady()`.
```

[Lightship documentation](https://github.com/gajus/lightship) provides examples of the corresponding [Kubernetes configuration](https://github.com/gajus/lightship#lightship-usage-kubernetes-container-probe-configuration) and a complete example of integration with [Express.js](https://github.com/gajus/lightship#using-with-expressjs).

### http-terminator

[http-terminator](https://github.com/gajus/http-terminator) implements logic for gracefully terminating an express.js server.

Terminating a HTTP server in Node.js requires keeping track of all open connections and signaling them that the server is shutting down. http-terminator implements the logic for tracking all connections and their termination upon a timeout. http-terminator also ensures graceful communication of the server intention to shutdown to any clients that are currently receiving response from this server.

Install http-terminator as follows:

```console
$ npm install http-terminator
```

Basic template that illustrates using http-terminator:

```js
const express = require('express')
const { createHttpTerminator } = require('http-terminator')

const app = express()

const server = app.listen(3000)

const httpTerminator = createHttpTerminator({ server })

app.get('/', (req, res) => {
  res.send('ok')
})

// A server will terminate after invoking `httpTerminator.terminate()`.
// Note: Timeout is used for illustration of delayed termination purposes only.
setTimeout(() => {
  httpTerminator.terminate()
}, 1000)
```

[http-terminator documentation](https://github.com/gajus/http-terminator) provides API documentation and comparison to other existing third-party solutions.

### express-actuator

[express-actuator](https://github.com/rcruzper/express-actuator) is a middleware to add endpoints to help you monitor and manage applications.

Install express-actuator as follows:

```console
$ npm install --save express-actuator
```

Basic template that illustrates using express-actuator:

```js
const express = require('express')
const actuator = require('express-actuator')

const app = express()

app.use(actuator())

app.listen(3000)
```

The [express-actuator documentation](https://github.com/rcruzper/express-actuator) provides different options for customization.
