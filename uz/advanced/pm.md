---
layout: page
title: Process managers for Express apps
menu: advanced
lang: uz
---

# Process managers for Express apps

When running Express apps for production, it is helpful to use a _process manager_ to:

- Restart the app automatically if it crashes.
- Gain insights into runtime performance and resource consumption.
- Modify settings dynamically to improve performance.
- Control clustering.

A process manager is somewhat like an application server: it's a "container" for applications that facilitates deployment,
provides high availability, and enables you to manage the application at runtime.

The most popular process managers for Express and other Node applications are:

- [StrongLoop Process Manager](#sl)
- [PM2](#pm2)
- [Forever](#forever)


Using any of these three tools can be very helpful, however StrongLoop Process Manager is the only solution that provides a comprehensive runtime and deployment solution that address entire Node application life cycle with tooling for every step before and after production in an unified interface.

Here's a brief look at each of these tools.
For a detailed comparison, see [http://strong-pm.io/compare/](http://strong-pm.io/compare/).

## <a id="sl">StrongLoop Process Manager</a>

StrongLoop Process Manager (StrongLoop PM) is a production process manager for Node.js applications with built-in load balancing, monitoring, multi-host deployment, and a graphical console.
It enables you to:

- Build, package, and deploy your Node application to a local or remote system.
- View CPU profiles and heap snapshots to optimize performance and diagnose memory leaks.
- Keep processes and clusters alive forever.
- View performance metrics on your application.
- Easily manage multi-host deployments with Nginx integration.
- Unify multiple StrongLoop PMs to a distributed microservices runtime managed from Arc.

You can work with StrongLoop PM using a powerful CLI tool, `slc`, or a graphical tool, Arc.  It's open source, with professional support provided by StrongLoop.

For more information, see [http://strong-pm.io/](http://strong-pm.io/).

Full documentation:

- [Operating Node apps (StrongLoop documentation)](http://docs.strongloop.com/display/SLC)
- [Using StrongLoop Process Manager](http://docs.strongloop.com/display/SLC/Using+Process+Manager).

### Installation

```console
$ [sudo] npm install -g strongloop
```

### Basic use

```console
$ cd my-app
$ slc start
```

View status of Process Manager and all deployed apps:

```console
$ slc ctl
Service ID: 1
Service Name: my-app
Environment variables:
  No environment variables defined
Instances:
    Version  Agent version  Cluster size
     4.1.13      1.5.14           4
Processes:
        ID      PID   WID  Listening Ports  Tracking objects?  CPU profiling?
    1.1.57692  57692   0
    1.1.57693  57693   1     0.0.0.0:3001
    1.1.57694  57694   2     0.0.0.0:3001
    1.1.57695  57695   3     0.0.0.0:3001
    1.1.57696  57696   4     0.0.0.0:3001
```

List all apps (services) under management:

```console
$ slc ctl ls
Id          Name         Scale
 1          my-app       1
```

Stop an app:

```console
$ slc ctl stop my-app
```

Restart an app:

```console
$ slc ctl restart my-app
```

You can also "soft restart," which gives worker processes a grace period to close existing connections, then restarts the current application:

```console
$ slc ctl soft-restart my-app
```

To remove an app from management:

```console
$ slc ctl remove my-app
```

## <a id="pm2">PM2</a>

PM2 is a production process manager for Node.js applications with a built-in load balancer. It allows you to keep applications alive forever, to reload them without downtime and will facilitate common system admin tasks.  It also enables you to manage application logging, monitoring, and clustering.

For more information, see [https://github.com/Unitech/pm2](https://github.com/Unitech/pm2).

### Installation

```console
$ [sudo] npm install pm2 -g
```

### Basic use

Starting an app with `pm2` requires the path of the app to be specified. However, stopping, restarting, and deleting requires just the name or the id of the app.

```console
$ pm2 start npm --name my-app -- start
[PM2] restartProcessId process id 0
┌──────────┬────┬──────┬───────┬────────┬─────────┬────────┬─────────────┬──────────┐
│ App name │ id │ mode │ pid   │ status │ restart │ uptime │ memory      │ watching │
├──────────┼────┼──────┼───────┼────────┼─────────┼────────┼─────────────┼──────────┤
│ my-app   │ 0  │ fork │ 64029 │ online │ 1       │ 0s     │ 17.816 MB   │ disabled │
└──────────┴────┴──────┴───────┴────────┴─────────┴────────┴─────────────┴──────────┘
 Use `pm2 show <id|name>` to get more details about an app
```

Starting an app with `pm2` will immediately send it to the background. You can control the background app from the command line using various `pm2` commands.

Once an app is started with `pm2` it is registered in `pm2`'s list of processes with an ID, which makes it possible to manage apps with the same name from different directories on the system, using their IDs.

Note that if more than one app with the same name is running, `pm2` commands affect all of them. So use IDs instead of names to manage individual apps.

List all running processes:

```console
$ pm2 list
```

Stop an app:

```console
$ pm2 stop 0
```

Restart an app:

```console
$ pm2 restart 0
```

To view detailed information about an app:

```console
$ pm2 show 0
```

To remove an app from `pm2`'s registry:

```console
$ pm2 delete 0
```


## <a id="forever">Forever</a>

Forever is a simple CLI tool for ensuring that a given script runs continuously (forever). Its simple interface makes it ideal for running smaller deployments of Node apps and scripts.

For more information, see [https://github.com/foreverjs/forever](https://github.com/foreverjs/forever).

### Installation

```console
$ [sudo] npm install forever -g
```

### Basic use

To start a script, use the `forever start` command and specify the path of the script:

```console
$ forever start script.js
```

This will run the script in daemon mode (in the background).

To run the script attached to the terminal, omit `start`:

```console
$ forever script.js
```

It is a good idea to log output from forever and the script using the logging options `-l`, `-o`, `-e`, as shown this example:

```console
$ forever start -l forever.log -o out.log -e err.log script.js
```

To view the list of scripts started by forever:

```console
$ forever list
```

To stop a script started by forever use the `forever stop` command and specify the process index (as listed by the `forever list` command).

```console
$ forever stop 1
```

Alternatively, specify the path of the file:

```console
$ forever stop script.js
```

To stop all the scripts started by `forever`:

```console
$ forever stopall
```

Forever has many more options, and it also provides a programmatic API.
