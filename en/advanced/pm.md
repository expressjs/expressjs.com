---
layout: page
title: Process managers for Express apps
menu: advanced
lang: en
redirect_from: "/advanced/pm.html"
---

# Process managers for Express apps

{% include community-caveat.html %}

When you run Express apps for production, it is helpful to use a _process manager_ to:

- Restart the app automatically if it crashes.
- Gain insights into runtime performance and resource consumption.
- Modify settings dynamically to improve performance.
- Control clustering.

A process manager is somewhat like an application server: it's a "container" for applications that facilitates deployment, provides high availability, and enables you to manage the application at runtime.

The most popular process managers for Express and other Node.js applications are:

- **[Nodemon](https://nodemon.io){: target="_blank"}**: Monitor for any changes in your source and automatically restart your server.
- **[PM2](https://github.com/Unitech/pm2){: target="_blank"}**: A production process manager for Node.js applications that has a built-in load balancer. PM2 enables you to keep applications alive forever, reloads them without downtime, helps you to manage application logging, monitoring, and clustering.
- **[StrongLoop Process Manager (Strong-PM)](http://strong-pm.io/)**: A production process manager for Node.js applications with built-in load balancing, monitoring, and multi-host deployment.   Includes a CLI to build, package, and deploy Node.js applications to a local or remote system.
- **SystemD**: The default process manager on modern Linux distributions, that makes it simple to run a Node application as a service. For more information, see ["Run node.js service with systemd" by Ralph Slooten (@axllent)](https://www.axllent.org/docs/view/nodejs-service-with-systemd/).
