---
layout: page
title: Process managers for Express apps
menu: advanced
lang: en
redirect_from: "/advanced/pm.html"
---

# Process managers for Express apps

When you run Express apps for production, it is helpful to use a _process manager_ to achieve the following tasks:

- Restart the app automatically if it crashes.
- Gain insights into runtime performance and resource consumption.
- Modify settings dynamically to improve performance.
- Control clustering.

A process manager is somewhat like an application server: it's a "container" for applications that facilitates deployment,
provides high availability, and enables you to manage the application at runtime.

The most popular process managers for Express and other Node.js applications are as follows:

- [StrongLoop Process Manager](#sl)
- [PM2](#pm2)
- [Forever](#forever)


Using any of these three tools can be very helpful, however StrongLoop Process Manager is the only tool that provides a comprehensive runtime and deployment solution that addresses the entire Node.js application life cycle, with tooling for every step before and after production, in a unified interface.

Here's a brief look at each of these tools.
For a detailed comparison, see [http://strong-pm.io/compare/](http://strong-pm.io/compare/).

## <a id="sl">StrongLoop Process Manager</a>

StrongLoop Process Manager (StrongLoop PM) is a production process manager for Node.js applications. StrongLoop PM has built-in load balancing, monitoring, and multi-host deployment, and a graphical console.
You can use StrongLoop PM for the following tasks:

- Build, package, and deploy your Node.js application to a local or remote system.
- View CPU profiles and heap snapshots to optimize performance and diagnose memory leaks.
- Keep processes and clusters alive forever.
- View performance metrics on your application.
- Easily manage multi-host deployments with Nginx integration.
- Unify multiple StrongLoop PMs to a distributed microservices runtime that is managed from Arc.

You can work with StrongLoop PM by using a powerful command-line interface tool called `slc`, or a graphical tool called Arc. Arc is open source, with professional support provided by StrongLoop.

For more information, see [http://strong-pm.io/](http://strong-pm.io/).

Full documentation:

- [Operating Node apps (StrongLoop documentation)](http://docs.strongloop.com/display/SLC)
- [Using StrongLoop Process Manager](http://docs.strongloop.com/display/SLC/Using+Process+Manager).

### Installation
```sh
$ [sudo] npm install -g strongloop
```

### Basic use
```sh
$ cd my-app
$ slc start
```

View the status of Process Manager and all deployed apps:

```sh
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

List all the apps (services) under management:

```sh
$ slc ctl ls
Id          Name         Scale
 1          my-app       1
```

Stop an app:

```sh
$ slc ctl stop my-app
```

Restart an app:

```sh
$ slc ctl restart my-app
```

You can also "soft restart," which gives worker processes a grace period to close existing connections, then restarts the current application:

```sh
$ slc ctl soft-restart my-app
```

To remove an app from management:

```sh
$ slc ctl remove my-app
```

## <a id="pm2">PM2</a>

PM2 is a production process manager for Node.js applications, that has a built-in load balancer. PM2 allows you to keep applications alive forever and reload them without downtime, and will facilitate common system admin tasks.  PM2 also enables you to manage application logging, monitoring, and clustering.

For more information, see [https://github.com/Unitech/pm2](https://github.com/Unitech/pm2).

### Installation

```sh
$ [sudo] npm install pm2 -g
```

### Basic use

When you start an app by using the `pm2` command, you must specify the path of the app. However, when you stop, restart, or delete an app, you can specify just the name or the id of the app.

```sh
$ pm2 start app.js
[PM2] restartProcessId process id 0
┌──────────┬────┬──────┬───────┬────────┬─────────┬────────┬─────────────┬──────────┐
│ App name │ id │ mode │ pid   │ status │ restart │ uptime │ memory      │ watching │
├──────────┼────┼──────┼───────┼────────┼─────────┼────────┼─────────────┼──────────┤
│ my-app   │ 0  │ fork │ 64029 │ online │ 1       │ 0s     │ 17.816 MB   │ disabled │
└──────────┴────┴──────┴───────┴────────┴─────────┴────────┴─────────────┴──────────┘
 Use the `pm2 show <id|name>` command to get more details about an app.
```

When you start an app by using the `pm2` command, the app is immediately sent to the background. You can control the background app from the command line by using various `pm2` commands.

After an app is started by using the `pm2` command, it is registered in PM2's list of processes with an ID. You can therefore manage apps with the same name from different directories on the system, by using their IDs.

Note that if more than one app with the same name is running, `pm2` commands affect all of them. So use IDs instead of names to manage individual apps.

List all running processes:

```sh
$ pm2 list
```

Stop an app:

```sh
$ pm2 stop 0
```

Restart an app:

```sh
$ pm2 restart 0
```

To view detailed information about an app:

```sh
$ pm2 show 0
```

To remove an app from PM2's registry:

```sh
$ pm2 delete 0
```


## <a id="forever">Forever</a>

Forever is a simple command-line interface tool for ensuring that a given script runs continuously (forever). Forever's simple interface makes it ideal for running smaller deployments of Node.js apps and scripts.

For more information, see [https://github.com/foreverjs/forever](https://github.com/foreverjs/forever).

### Installation

```sh
$ [sudo] npm install forever -g
```

### Basic use

To start a script, use the `forever start` command and specify the path of the script:

```sh
$ forever start script.js
```

This command will run the script in daemon mode (in the background).

To run the script so that it is attached to the terminal, omit `start`:

```sh
$ forever script.js
```

It is a good idea to log output from the Forever tool and the script by using the logging options `-l`, `-o`, and `-e`, as shown this example:

```sh
$ forever start -l forever.log -o out.log -e err.log script.js
```

To view the list of scripts that were started by Forever:

```sh
$ forever list
```

To stop a script that was started by Forever use the `forever stop` command and specify the process index (as listed by the `forever list` command).

```sh
$ forever stop 1
```

Alternatively, specify the path of the file:

```sh
$ forever stop script.js
```

To stop all the scripts that were started by Forever:

```sh
$ forever stopall
```

Forever has many more options, and it also provides a programmatic API.
