---
layout: page
title: Performance Best Practices Using Express in Production
menu: advanced
lang: en
---

# Performance Best Practices Using Express in Production

This is a two-part blog series about some best practices for running Express applications in production. The first part was about security, and this second part focuses on performance and reliability.  It assumes you are already familiar with the basics of Node.js and web development practices and covers topics and concepts especially relevant to the production environment.

* Overview
* Ensure your app automatically restarts
  * Use a process manager
  * Use an init system
    Systemd
    StrongLoop PM as a systemd service
    Upstart
    StrongLoop PM as an Upstart service
* Set NODE_ENV environment variable
* Don't use synchronous functions
* Run your app in a cluster
  * Using Node's cluster module
  * Using StrongLoop PM
* Use gzip compression
* Cache request results
* Don't use res.sendFile() to serve static files
* Do not log messages to the terminal
* Handle exceptions properly
  * Propagate errors
  * Try-catch
  * Promises
* Use a load balancer
  * Using StrongLoop PM with an Nginx load balancer
* Use a reverse proxy

## Overview

As explained in part one, in production your application is generally available for use by end-users, as opposed to development when you're still actively writing and testing code.  Development and production environments are often set up very differently and have vastly different requirements.  For example, in development, you don't need to worry about scalability, reliability, and performance, while in production those concerns become critical.

## Ensure your app automatically restarts

In production, you don't want your application to be offline, ever.  This means you need to make sure it restarts both if the app crashes and if the server itself crashes.  Although of course you hope that neither of those events occurs, realistically you must account for both eventualities by:
Using a process manager to restart the app (and Node) when it crashes.
Using the init system provided by your OS to restart the process manager when the OS crashes.  It's also possible to use the init system without a process manager.

Node applications crash if they encounter an uncaught exception. The foremost thing you need to do is to ensure your app is well-tested and handles all exceptions (see our advice to handle exceptions properly below). But as a fail-safe, put a mechanism in place to ensure that if and when your app crashes, it will automatically restart.

### Use a process manager

In development, you started your app simply from the command line with node server.js or something similar.  But doing this in production is a recipe for disaster.  If the app crashes, it will be offline until you restart it.   To ensure your app restarts if it crashes, use a process manager.  A process manager is a “container” for applications that facilitates deployment, provides high availability, and enables you to manage the application at runtime.

In addition to restarting your app when it crashes, a process manager can enable you to:
Gain insights into runtime performance and resource consumption.
Modify settings dynamically to improve performance.
Control clustering (StrongLoop PM and pm2).

The most popular process managers for Node are:

* StrongLoop Process Manager
* PM2
* Forever

For a feature-by-feature comparison of the three process managers, see http://strong-pm.io/compare/.  For a more detailed introduction to all three, see Process managers for Express apps.

Using any of these process managers will suffice to keep your application up, even if it does crash from time to time.

But we're not going to lie to you: We like StrongLoop Process Manager and recommend using it.  You didn't really expect us to recommend another process manager, did you?  StrongLoop PM has lots of features specifically targeting production deployment.  You can use it and the related StrongLoop tools to:
Build and package your app locally, then deploy it securely to your production system.
Automatically restart your app if it crashes for any reason.
Manage your clusters remotely.
View CPU profiles and heap snapshots to optimize performance and diagnose memory leaks.
View performance metrics for your application.
Easily scale to multiple hosts with an integrated Nginx load balancer.

As explained below, when you install StrongLoop PM as an operating system service using your init system, it will automatically restart when the system restarts.  Thus, it will keep your application processes and clusters alive forever.

### Use an init system

The next layer of reliability is to ensure that your app restarts when the server restarts.  Although we like to think that our systems are highly stable, they can still go down for a variety of reasons.
To ensure that your app restarts if the server crashes, use the init system built into your OS.  The two main init systems in use today are systemd and Upstart.

There are two ways to use init systems with your Express app:
Run your app in a process manager, and install the process manager as a service with the init system.  The process manager will restart your app when the app crashes, and the init system will restart the process manager when the OS restarts.  This is the recommended approach.
Run your app (and Node) directly with the init system.  This is somewhat simpler, but you don't get the additional advantages of using a process manager.

#### Systemd

Systemd is a Linux system and service manager.  Most major Linux distributions have adopted systemd as their default init system.

A systemd service configuration file is called a unit file, with a file name ending in .service.  Here's an example unit file to manage a Node app directly (replace the bolded text with values for your system and app):

~~~
[Unit]
Description=Awesome Express App

[Service]
Type=simple
ExecStart=/usr/local/bin/node /projects/myapp/index.js
WorkingDirectory=/projects/myapp

User=nobody
Group=nogroup

# Environment variables:
Environment=NODE_ENV=production

# Allow many incoming connections
LimitNOFILE=infinity
# Allow core dumps for debugging
LimitCORE=infinity

StandardInput=null
StandardOutput=syslog
StandardError=syslog
Restart=always

[Install]
WantedBy=multi-user.target
~~~

For more information on systemd, see the systemd reference (man page).

#### StrongLoop PM as a systemd service

If you're using StrongLoop Process Manager, you can easily install StrongLoop PM as a systemd service.  Then, when the server restarts, it will automatically restart StrongLoop PM, which will then restart all the apps it is managing.

To install StrongLoop PM as a systemd service:

$ sudo sl-pm-install --systemd
Then start the service with:
$ sudo /usr/bin/systemctl start strong-pm
For more information, see Setting up a production host (StrongLoop documentation).

#### Upstart

Upstart is a system tool available on many Linux distributions for starting tasks and services during system startup, stopping them during shutdown, and supervising them. You can configure your Express app or process manager as a service and then Upstart will automatically restart it when it crashes.

An Upstart service is defined in a job configuration file (also called a “job”) with filename ending in .conf.  The following example shows how to create a job called “myapp” for an app named “myapp” with the main file located at /projects/myapp/index.js.

Create a file named myapp.conf at /etc/init/ with the following content (replace the bolded text with values for your system and app):

# When to start the process
start on runlevel [2345]
# When to stop the process
stop on runlevel [016]
# Increase file descriptor limit to be able to handle more requests
limit nofile 50000 50000
# Use production mode
env NODE_ENV=production
# Run as www-data
setuid www-data
setgid www-data
# Run from inside the app dir
chdir /projects/myapp
# The process to start
exec /usr/local/bin/node /projects/myapp/index.js
# Restart the process if it is down
respawn
# Limit restart attempt to 10 times within 10 seconds
respawn limit 10 10

NOTE: This script requires Upstart 1.4 or newer, supported on Ubuntu 12.04-14.10.

Since the job is configured to run when the system starts, your app will be started along with the operating system, and automatically restarted if the app crashes or the system goes down.

Apart from automatically restarting the app, Upstart enables you to use these commands:
start myapp - Start the app
restart myapp - Restart the app
stop myapp - Stop the app.

For more information on Upstart, see Upstart Intro, Cookbook and Best Practises.

#### StrongLoop PM as an Upstart service

If you are using StrongLoop Process Manager, you can easily install Process Manager as an Upstart service.  Then, when the server restarts, it will automatically restart StrongLoop PM, which will then restart all the apps it is managing.

To install StrongLoop PM as an Upstart 1.4 service:

$ sudo sl-pm-install

Then run the service with:
$ sudo /sbin/initctl start strong-pm

NOTE: On systems that don't support Upstart 1.4, the commands are slightly different.  See Setting up a production host (StrongLoop documentation) for more information.

## Set NODE_ENV environment variable

In Node.js the NODE_ENV environment variable specifies the environment in which an application is running.   Setting NODE_ENV to “production” will enable Express' built-in optimizations for production.  Specifically, Express will:
Cache view templates.
Cache CSS files generated from CSS extensions.
Generate less verbose error messages.

It will also make npm install exclude packages listed as development dependencies under devDependencies in your app's package.json.

Some tests indicate that that just setting  NODE_ENV  to “production” improves app performance by a factor of three!  For that reason, we've highlighted this step, even though the Upstart and systemd examples provided above include statements to set it.

If you need to write environment-specific code, you can check the value of NODE_ENV with  process.env.NODE_ENV.

You're probably used to setting environment variables in your interactive shell, for example with export or your.bash_profile file.  But in general you shouldn't do that on a production server; instead, use your init system as described below.

With Upstart, use the env keyword in your job file.  For example:

# /etc/init/env.conf
env NODE_ENV=production

For more information, see the Upstart Intro, Cookbook and Best Practices.

With Systemd, use the Environment directive in your unit file.  For example:

# /etc/systemd/system/myservice.service
Environment=NODE_ENV=production

For more information, see Using Environment Variables In systemd Units.

If you are using StrongLoop Process Manager, you can also set the environment variable when you install StrongLoop PM as a service and even change it remotely at runtime without restarting your app.

## Don't use synchronous functions

Synchronous functions and methods tie up the executing process until they return. A single call to a synchronous function might return in a few microseconds or milliseconds, however in high-traffic websites, they can add up and adversely affect the performance of the website.  Avoid their use in production.

Although Node and many modules provide synchronous and asynchronous versions of their functions, always use the asynchronous version in production. The only time when a synchronous function can be justified is upon initial startup.

If you are using Node.js 4.0+ or io.js 2.1.0+, then you can use the --trace-sync-io command-line flag to print a warning and a stack trace whenever your application uses a synchronous API.  Of course, you wouldn't want to actually use this in production, but rather to ensure that your code is ready for production.  See the Weekly update for io.js 2.1.0 for more information.

## Run your app in a cluster

In a multi-core system, you can increase the performance of a Node app by many times by launching a cluster of processes.  A cluster runs multiple instances of the app, ideally one instance on each CPU core, thereby distributing the load and tasks among the instances.

IMPORTANT: Since the app instances run as separate processes, they do not share the same memory space. That is, objects are local to each instance of the app. Therefore, you cannot maintain state in the application code.  However, you can use an in-memory datastore like Redis to store session-related data and state. This caveat applies to essentially all forms of horizontal scaling, whether clustering with multiple processes or multiple physical servers.

In clustered apps, worker processes can crash individually without affecting the rest of the processes. Apart from performance advantages, failure isolation is another reason to run a cluster of app processes. Whenever a worker process crashes, always make sure to log the event and spawn a new process using cluster.fork().
Using Node's cluster module
Clustering is made possible with Node's cluster module.  This enables a master process to spawn worker processes and distribute incoming connections among the workers.  However, rather than using this module directly, it's far better to use one of the many tools out there that does it for you automatically; for example node-pm or cluster-service.
Using StrongLoop PM
If you deploy your application to StrongLoop Process Manager (PM), then you can take advantage of clustering without modifying your application code.

When StrongLoop Process Manager (PM) runs an application, it automatically runs it in a cluster with a number of workers equal to the number of CPU cores on the system.  You can manually change the number of worker processes in the cluster using the slc command line tool without stopping the app.

For example, assuming you've deployed your app to prod.foo.com and StrongLoop PM is listening on port 8701 (the default), then to set the cluster size to eight using slc:

$ slc ctl -C http://prod.foo.com:8701 set-size my-app 8

For more information on clustering with StrongLoop PM, see Clustering in StrongLoop documentation.

## Use gzip compression

Gzip compressing can greatly decrease the size of the response body and hence increase the speed of a web app.

Use the compression middleware for gzip compression in your Express app. For example:

var compression = require('compression');
var express = require('express');
var app = express();

app.use(compression());

For a high-traffic website in production, the best way to put compression in place is to implement it at a reverse proxy level (see Use a reverse proxy). In that case, you do not need to use compression middleware.

For details on enabling gzip compression in Nginx, see Module ngx_http_gzip_module in the Nginx documentation.

## Cache request results

One strategy to improve the performance of a web app in production is to cache the result of a request, so that the app does not repeat the operation to serve the same request repeatedly.

Use a caching server like Varnish or Nginx (see also Nginx Caching) to greatly improve the speed and performance of your app.

## Don't use res.sendFile() to serve static files

Using res.sendFile() to serve files in a production environment is not recommended. Since it has to read from the file system for every file request, it will encounter significant latency in serving the files and affect the overall performance of the app.  Note that res.sendFile() is not implemented with the sendfile system call, which would make it far more efficient.

Instead, use middleware like serve-static, that is optimized for serving files for Express apps.
An even better option is to use a reverse proxy to serve static files. For more details about reverse proxies, see Use a reverse proxy.

## Do not log messages to the terminal

Using console.log()to print log messages to the terminal is common practice in development.  But console.log() is a synchronous function, so it's not suitable for use in production.  Although a single console.log() call may take only a few milliseconds to execute, in apps with hundreds or thousands requests per seconds, these calls can add up and significantly affect the performance and response time of the app. Do not use console.log() in production code.

If you're using console.log() for debugging, instead use a special debugging module like debug.  If you're using console.log() for logging app activity, instead use a logging library like bunyan.

## Handle exceptions properly

Node.js apps crash when they encounter an uncaught exception. Not handling exceptions and taking appropriate actions will make your Express app crash and go offline.

Error and exception handling in Node is a large topic.  If you're not confident you have a firm handle on it, read up on the topic.  For example, Error Handling in Node.js is a good resource.  Also, see these previous StrongLoop blog posts:
Building Robust Node Applications: Error Handling
Asynchronous Error Handling in Express with Promises, Generators and ES7
Promises in Node.js with Q – An Alternative to Callbacks

One thing you should not do is to listen for the uncaughtException event, emitted when an exception bubbles all the way back to the event loop.  Adding an event listener for uncaughtException will change the default behavior of the process encountering an exception; the process will continue to run despite the exception.  This might sound like a good way of preventing your app from crashing, but continuing to run the app after an uncaught exception is a dangerous practice and is not recommended, because the state of the process becomes unreliable and unpredictable.

Additionally, handling uncaught exceptions with the uncaughtException is officially recognized as crude and there is a proposal to remove uncaughtException from the core.  So listening for uncaughtException is just a bad idea.   This is why we recommend things like multiple processes and supervisors: crashing and restarting is often the most reliable way to recover from an error. The fact that many Express apps start up almost instantly makes this approach quite practical.

We also don't recommend using domains.  It generally doesn't solve the problem and is a deprecated module.

To ensure you handle all exceptions, use the following techniques:
Try-catch
Promises

Add brief discussion of the error-first callback convention and where it is used?
Propagate errors
Best practice in Express is to use the next() function to propagate errors.  For example:

app.get('/', function (req, res, next) {
  queryDb(function (err, data) {
    if (err) return next(err)   // handle data

    makeCsv(data, function (err, csv) {
      if (err) return next(err)  // handle csv
    })
  })
})
app.use(function (err, req, res, next) {
  // handle error
})

However, there are two problems with this approach:

You must explicitly handle every error argument.
Implicit exceptions aren't handled (like trying to access a property that isn't available on the data object).
Try-catch
Try-catch is a JavaScript language construct that you can use to catch exceptions in synchronous code. Here is an example of using try-catch for catching a potential process-crashing operation:

// Accepts a JSON in the query field named "params"
// for specifying the parameters
app.get('/search', function (req, res) {

  // Simulating async operation
  setImmediate(function () {

    var jsonStr = req.query.params;

    try {
      var jsonObj = JSON.parse(jsonStr);
      res.send('Success');
    } catch (e) {
      res.status(400).send('Invalid JSON string');
    }
  })
});

However, try-catch works only for synchronous code. Since the Node.js platform is primarily asynchronous (particularly in a production environment), try-catch will fail to catch a lot of exceptions.

Promises

Promises will handle any exceptions (both explicit and implicit) in asynchronous code blocks using then(). Just add .catch(next) to the end of promise chains.  For example:

app.get('/', function (req, res, next) {
  // do some sync stuff
  queryDb()
    .then(function (data) {
      // handle data
      return makeCsv(data)
    })
    .then(function (csv) {
      // handle csv
    })
    .catch(next)
})
app.use(function (err, req, res, next) {
  // handle error
})

Now all errors asynchronous and synchronous get propagated to the error middleware.

## Use a load balancer

Now matter how optimized an app is, a single instance can handle only a limited amount of load and traffic. One way to scale an app is to run multiple instances of it and distribute the traffic via a load balancer.  Setting up a load balancer can improve your app's performance and speed, and enable it to handle thousands of requests per second.


A load balancer is usually a reverse proxy that sits in front of a distributed instance of application servers, and orchestrates the traffic to and from the servers. You can easily set up a load balancer for your app using Nginx or HAProxy.

With load balancing, you have to ensure that requests associated with a particular session ID connect to the process that originated them.  This is known as session affinity, or sticky sessions, and is partially addressed by the suggestion above to use a data store such as Redis for session data.  For a discussion, see Using multiple nodes.

Load balancing is a vast topic of its own, and a detailed discussion is beyond this scope of this article.

### Using StrongLoop PM with an Nginx load balancer

StrongLoop Process Manager integrates with the Nginx load balancer and provides an Nginx Controller that you can manage via StrongLoop Arc, making it easy to configure multi-host production environment configurations.  For more information, see Scaling to multiple servers (StrongLoop documentation).

## Use a reverse proxy

A reverse proxy sits in front of a web app and performs supporting operations on the requests, apart from directing requests to the app. It can handle error pages, compression, caching, serving files, and load balancing among other things.

Handing over tasks that do not require knowledge of application state to a specially developed tool frees up Express to handle input/output (IO), which is its strength.  It is recommended to run Express behind a reverse proxy like Nginx or HAProxy in production.

