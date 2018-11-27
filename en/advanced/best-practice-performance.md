---
layout: page
title: Performance Best Practices Using Express in Production
menu: advanced
lang: en
redirect_from: "/advanced/best-practice-performance.html"
---

# Production best practices: performance and reliability

## Overview

This article discusses performance and reliability best practices for Express applications.  Performance is a complex topic, and just following a general 
set of guidelines is not enough, because of this we will also provide suggestions on how to [measure your application performance](#measuring-performance) and debug bottlenecks.  Once you
know how to measure your application performance you can apply the best practice suggestions here and ensure they produce the performance results you expect.

Those best practices are broken into two sections:

* Things to do in your code (the dev part):
  * [Don't use synchronous functions](#dont-use-synchronous-functions)
  * [Do logging correctly](#do-logging-correctly)
  * [Handle exceptions properly](#handle-exceptions-properly)
  * [Use Node's cluster module](#use-cluster-module)
* Things to do in your environment / setup (the ops part):
  * [Set NODE_ENV to "production"](#set-node_env-to-production)
  * [Ensure your app automatically restarts](#ensure-your-app-automatically-restarts)
  * [Use a reverse proxy](#use-a-reverse-proxy)

## Measuring Performance {#measuring-performance}

The most basic way to measure performance in your application is to use an external tool to measure the time from making a request to receiving the response.
One example of a tool for this kind of testing is `siege`.  Siege will continually make requests to your application and measure the time and number of responses.
Once you have siege installed you can run it like this:

```
$ siege -t 1m -c5 -g http://localhost:4000

...The request output logs...

Lifting the server siege...
Transactions:		         358 hits
Availability:		       72.47 %
Elapsed time:		        0.82 secs
Data transferred:	        2.11 MB
Response time:		        0.04 secs
Transaction rate:	      436.59 trans/sec
Throughput:		        2.58 MB/sec
Concurrency:		       16.76
Successful transactions:         358
Failed transactions:	         136
Longest transaction:	        0.07
Shortest transaction:	        0.01
```

As you can see you get a nice output with the average response time (`0.04 secs`), the availability (`72.45%` successful requests) and the highest and lowest times (`0.07` and `0.01` respectively).
This is a great way to test the general request performance, but does not really capture the traffic you would really see in a production application.  To get a more realistic test you might want to 
request a set of routes, you can do this with a file like so:

```
# urls.txt
http://localhost:4000
http://localhost:4000/en/advanced/best-practice-performance.html
http://localhost:4000/en/4x/api.html

# Example post request with body
http://localhost:4000 POST {"hello":"world"}
```

```
$ siege -t 1m --file=urls.txt
```

This will make requests to all of the urls in the text file, thus testing something more similar to a real world traffic pattern.  One other thing to consider when doing this kind of testing
is that running `siege` on the same machine which is running the server can lead to contention between the two.  Because of this, it is best to run these from different machines.

Often just doing this kind of testing will be enough to discover and debug performance bottlenecks, but sometimes you find that you have a route which is slow and cannot tell which part is causing the
slowdown.  To debug this you need to dig a bit deeper.

Express applications use middleware to organize and decouple different parts of the application logic, so often it is helpful to time
the execution time from inside the application.  Depending on the situation, there are three types of timing measurements we might choose:

1. [Measure total request time](#measure-total-request-time)
  - This measures the complete time spent in the middleware stack from beginning to end
  - As a high level measurement, it might not give the detail you need on an individual middleware level
  - Suggested module: `response-time`
2. [Measure from a middleware to starting a response](#measure-middleware-response-time)
  - This kind of test is good for middleware which always send a response
  - This is more accurate for performance in this case than waiting for the `next` function or the end of the response (aka the `finished` event)
  - This is not the best way to test middleware which do not always send a response because it would not only include the middelware but all following middleware until the response is sent
  - Suggested module:  `response-time`
3. [Measure a single middleware](#measure-single-middleware)
  - This is great for testing middleware which do not send a response
  - Because you are not required to call `next`, you need to make sure the middleware you are testing will always call `next` or you will miss measurements
  - Suggested module: 

### Measuring total request time {#measure-total-request-time}

To measure complete request processing time you can use the middleware module `response-time` like this:

```js
const responseTime = require('response-time')
const app = require('express')()

// This middleware should be loaded before all others, that
// ensures that the timer starts as soon as we can
app.use(responseTime((req, res, time) => {
  // This is one nice way I have used to get timing on a per route basis
  const route = res.locals.routeName || 'unknown'

  // Report your time to your metrics system, in this case just log
  console.log('requestTime', {
	  route,
	  time,
	  status: res.statusCode
  })
}))

app.get('/', (req, res) => {
  // Name the route, see above
  res.locals.routeName = 'doSomething'

  // do something that takes time, like a dataase query
  doSomething((data) => {
  	res.json(data)
  })
})

app.get('/other-route', (req, res) => {
  res.locals.routeName = 'otherRoute'
  res.json({other: 'route'})
})

app.listen()
```

As you can see above we load in the middleware before all others with `.use` which will be run on every incoming request.  Because this middleware is used
for all requests it will log data for both routes.  Most of the time you will want to tell the difference between the performance of each route individually,
to do this we add a routeName to the response locals which is then made available in the `response-time` callback function.  (Note: this is just one way to achieve
this separation of routes, but in this case it is nice because it shows off another feature of Express `res.locals`.  Use whichever other methods you like.)

### Measure from a middleware to the start of a response {#measure-middleware-response-time}

While very similar to the example above, it can be difficult to tell where the time is being spend in a long or complicated chain of middlware.  To separate these out,
you can often time from the start of a middleware to the response being sent, to see how much it makes up of the complete response time.  To do this we can use the
same module above, but wrapping a single middleware:

```js
const responseTime = require('response-time')
const time = responseTime((req, res, time) => {
	console.log('requestTime', {
		route: 'onlyDoSomething',
		time,
		status: res.statusCode
	})
})

app.get('/', (req, res) => {
	time(req, res, () => {
		doSomething((data) => {
			res.json(data)
		})
	})
})
```

As you can see above, we can move the response time middleware to wrap the middleware in question.  This will isolate the time to be just the time it took for the
set of middleware following this leading up to the headers being sent.  If you have middleware which do other things before this the time taken there will not be measured and
can then be compared with the total request time to see if this was your bottleneck.  Notice how we create the middleware function outside the request cycle, this limits the
amount of code we run on each request to the performance monitoring code has the smallest impact it can.

### Measure a single middleware {#measure-single-middleware}

This last method for timing is the most fine-grained type.  If you have gone through the above steps to measure and still have not found your performance bottleneck, ofthen
adding this kind of tracking to every segment of a request will be necessary.  Because we are not waiting on the headers and just timing to the call of `next` we do not want
to use the `response-time` module for this.  Instead we will want to use

<@TODO...>


# Things to do in your code {#in-code}

Seeing as Express is a library you utilize in your code we will start with some best practices for that implementation.  One thing to remember is that many of these
best practices are not Express specific, but apply to all Node.js code and some to any web applications.

Here are some things you can do in your code to improve your application's performance:

* [Don't use synchronous functions](#dont-use-synchronous-functions)
* [Do logging correctly](#do-logging-correctly)
* [Handle exceptions properly](#handle-exceptions-properly)
* [Use Node's cluster module](#use-cluster-module)

## Don't use synchronous functions {#dont-use-synchronous-functions}

Synchronous functions and methods tie up the executing process until they finish. A single call to a synchronous function might return in a few microseconds or
milliseconds, however on websites with many concurrent users, these calls block each other and add up to reduce the performance of the whole app.

Although Node and many modules provide synchronous and asynchronous versions of their functions, always use the asynchronous version in your runtime code. The one exception
when a synchronous function can be justified is upon initial startup.

If you are using Node.js 4.0+, you can use the `--trace-sync-io` command-line flag to print a warning and a stack trace whenever your application uses a synchronous API.
Of course, you wouldn't want to use this in production, but rather to ensure that your code is ready for production. See the [node command-line options documentation](https://nodejs.org/api/cli.html#cli_trace_sync_io)
for more information.

## Do logging correctly {#do-logging-correctly}

Using `console.log()` or `console.error()` to print log messages to the terminal is common practice in development, but [these functions can be synchronous](https://nodejs.org/api/process.html#process_a_note_on_process_i_o) 
depending on the configuration of the process stdio.  To avoid any accidental synchronous io, as we learned above, you should be sure not to use `console.log`, `console.error` or their underlying
`process.stdout` and `process.stderr` directly.

### For debugging

If you're logging for purposes of debugging, then instead of using `console.log()`, use a special debugging module like [debug](https://www.npmjs.com/package/debug). This module
enables you to use the DEBUG environment variable to control what debug messages are sent to `console.error()`, if any. To keep your app purely asynchronous, you'd still want to
pipe `console.error()` to another program. But then, you're not really going to debug in production, are you?

### For app activity

If you're logging app activity (for example, tracking traffic or API calls), instead of using `console.log()`, use a logging library like [Winston](https://www.npmjs.com/package/winston)
or [Bunyan](https://www.npmjs.com/package/bunyan). For a detailed comparison of these two libraries, see the StrongLoop blog post
[Comparing Winston and Bunyan Node.js Logging](https://strongloop.com/strongblog/compare-node-js-logging-winston-bunyan/).

### Handle exceptions properly {#handle-exceptions-properly}

Typically Node apps crash when they encounter an uncaught exception or a rejected promise without a `.catch`. Not handling these errors will cause your Express app to crash and go offline.
If you follow the advice to [ensure your app automatically restarts](#ensure-your-app-automatically-restarts) below, then your app will restart after a crash. Fortunately,
Express apps typically have a short startup time, but any requests made while starting up will fail, and this is not a great user experience. Generally, you want to avoid
crashing in the first place, and to do that, you need to handle exceptions properly.

Express tries to help you in this by building in handling for exceptions which happen during the middleware stack. If an error condition occurs in a synchronous section of code
which is running as a part of a middleware, Express will catch the error and call the next [error handling middleware](/guide/error-handling.md#writing-error-handlers). This is
good for most errors in an Express application, but often times you will have specific error handling, asynchronous, or other "out of the middleware stack" errors.  In order to
avoid crashing you will need to handle these error conditions directly. See the section on [error handling for more on this topic](/guide/error-handling.md#writing-error-handlers).

Despite doing your best and having high attention to detail when handling errors, things will always occur in your program which you did not expect. In these cases it is helpful to use the
global node error handlers.  There are two events, but both should be handled in the same way, gracefully shut down the server and initiate a restart.  Typically "gracefully" means four things:

1. Close the server to new incoming requests
2. Let other requests finish if they can
3. Log relevant application state for debugging
4. Exit the process with a non-zero code

Here is an example of gracefully handling these kind of unrecoverable errors:

```js
const app = require('express')()
let server

// ... app setup ...

let isClosing = false
function handleErrors (err) {
	// Log all errors even if we are closing
	log.error(err)

	if (isClosing) {
		return
	}
  isClosing = true
	server.close(() => {
		// This is called whtn the server finishes all
		// outgoing responses and has fully closed the server
		process.exit(1)
	})
}
process.on('uncaughtException', handleErrors)
process.on('unhandledRejection', handleErrors)

server = app.listen()
```

*NOTE:* A previous version of this guide recommended against using these event callbacks because they do not kill the process if you listen for them. This is still true,
so remember to ALWAYS exit the process on both `uncaughtException` and `uncaughtRejection`.  The reason it is not recommended to use the default process exiting behavior
is that it gives you no ability to gracefully let the other http requests finish, which can cause odd behavior like incomplete or corrupt response bodies.

### Using Node's cluster module {#use-cluster-module}

Clustering enables a master process to spawn worker processes and distribute incoming connections among the workers. On most modern server configurations you have multiple
cpu cores you can utilize in your app, but because javascript and node are single threaded, you need multiple processes to maximize this hardware's performance.  This is made
possible with Node's [cluster module](https://nodejs.org/api/cluster.html). However, rather than using this module directly, it's better to use one of the many tools out there that
does it for you automatically; for example [node-pm](https://www.npmjs.com/package/node-pm) or [cluster-service](https://www.npmjs.com/package/cluster-service).

## Things to do in your environment / setup {#in-environment}

After you have done all the things above in your application code, there are a bunch of things will you should do for any web application you run. Some of these, since they are not
Express specific and can change often, will just get small mentions here.  If you have questions you can check out the [Express Gitter](https://gitter.im/expressjs/express) or ask about
it on [Stack Overflow](https://stackoverflow.com).

Here are some things you can do in your system environment to improve your app's performance:

### Set `NODE_ENV` to "production"

The NODE_ENV environment variable specifies the environment in which an application is running (usually, development or production). One of the simplest things you can do to
improve performance is to set NODE_ENV to "production."  This has many effects in Express and is a common practice for other node libraries.  Setting NODE_ENV to "production" makes Express:

* Cache view templates
* Cache CSS or JS files generated from CSS
* Generate less verbose error messages

[Tests indicate](http://apmblog.dynatrace.com/2015/07/22/the-drastic-effects-of-omitting-node_env-in-your-express-js-applications/) that just doing this can improve app performance by a factor of three!

In development, you typically set environment variables in your interactive shell, for example by using `export` or your `.bash_profile` file. But in general
you shouldn't do that on a production server; instead, use your OS's init system (systemd or Upstart). The next section provides more details about using your
init system in general, but setting NODE_ENV is so important for performance (and easy to do), that it's highlighted here.

With Upstart, use the `env` keyword in your job file. For example:

```sh
# /etc/init/env.conf
 env NODE_ENV=production
```

For more information, see the [Upstart Intro, Cookbook and Best Practices](http://upstart.ubuntu.com/cookbook/#environment-variables).

With systemd, use the `Environment` directive in your unit file. For example:

```sh
# /etc/systemd/system/myservice.service
Environment=NODE_ENV=production
```

For more information, see [Using Environment Variables In systemd Units](https://coreos.com/os/docs/latest/using-environment-variables-in-systemd-units.html).

### Ensure your app automatically restarts

In production, you don't want your application to be offline, ever. This means you need to make sure it restarts both if the app crashes and if the server
itself crashes. Although you hope that neither of those events occurs, realistically you must account for both eventualities.  There are many options for this, but
a few good ones are:

* Using a process manager to restart the app when it crashes	
  * Examples: [StrongLoop Process Manager](http://strong-pm.io/), [PM2](https://github.com/Unitech/pm2), [Forever](https://www.npmjs.com/package/forever)
  * Gain insights into runtime performance and resource consumption
  * Modify settings dynamically to improve performance
  * Control clustering (StrongLoop PM and pm2)
  * Does not restart itself (for example at server restart) unless you also use an init system
* Using the init system provided by your OS to restart the app (or process manager)
  * Examples: [systemd](https://wiki.debian.org/systemd) and [Upstart](http://upstart.ubuntu.com/)
  * Restarts when the server restarts or the process crashes
  * Common across languages or server frameworks
  * Does not take advantage of node specific things like the cluster module
* Using an external monitoring system
  * @TODO
  * Examples: Consul
  * Typically used by larger, more advanced, or complicated organizations
  * Agnostic to server or language constraints

### Use a reverse proxy

A reverse proxy sits in front of a web app and performs supporting operations on the requests. It can handle error pages, SSL termination, compression, caching, serving files, and load balancing among other things.

Handing over tasks that do not require knowledge of application state to a reverse proxy frees up Express to perform specialized application tasks.
For this reason, it is recommended to run Express behind a reverse proxy like [Nginx](https://www.nginx.com/) or [HAProxy](http://www.haproxy.org/) in production.

#### Reverse Proxy as a Load Balancer

No matter how optimized an app is, a single instance can handle only a limited amount of load and traffic. One way to scale an app is to
run multiple instances of it and distribute the traffic via a load balancer. Setting up a load balancer can improve your app's performance
and speed, and enable it to scale more than is possible with a single instance.

#### Caching Reverse Proxy

Another strategy to improve the performance in production is to cache the result of requests, so that your app does not repeat the operation to serve the same request repeatedly.
With a caching reverse proxy you ensure that your application only handles requests for which it actually needs to do new work.  Examples of caching reverse proxies include
[Varnish](https://www.varnish-cache.org/) and [Nginx](https://www.nginx.com/resources/wiki/start/topics/examples/reverseproxycachingexample/)
(see also [Nginx Caching](https://serversforhackers.com/nginx-caching/)) to greatly improve the speed and performance of your app.

#### Reverse proxy for SSL Termination

Because javascript (and therefore node) is single threaded, many cpu intensive tasks on a single process can cause severe performance degresation.  One such example
is doing strong encryption like in SSL (serving `https://` websites).  Because of this, it is reccomended that you always use something like Nginx for termenation of SSL connections.
This means that your application will serve only `http` requests and should be firewalled from the external world.  All incoming client requests should go to the reverse proxy and
only forward on an http connection.  The flow would look like this: `browser -> https:// -> nginx -> http:// -> express app`.

#### Enable Gzip Compression

Gzip compressing can greatly decrease the size of the response body and hence increase the speed of a web app. This can be done most efficiently on your reverse proxy but can also
be done directly in your node app via the [compression](https://www.npmjs.com/package/compression) middleware.  In nginx you can even combine gzip with caching so that nginx will cache
the already gziped response, saving even more performance.
