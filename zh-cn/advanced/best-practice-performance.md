---
layout: page
title: 在生产环境中使用 Express 的性能最佳实践
menu: advanced
lang: zh-cn
---

# 生产环境最佳实践：性能和可靠性

## 概述

本文讨论了部署到生产环境的 Express 应用程序的性能和可靠性最佳实践。

本主题明显属于“DevOps”范畴，涵盖了传统的开发和运行流程。因此，本信息也相应地分为两个部分：

* [代码中的注意事项](#code)（开发部分）。
* [环境/设置中的注意事项](#env)（运行部分）。

<a name="code"></a>

## 代码中的注意事项

以下是为改进应用程序性能而在代码中要注意的事项：

* 使用 gzip 压缩
* 不使用同步函数
* 使用中间件提供静态文件
* 正确进行日志记录
* 正确处理异常

### 使用 gzip 压缩

通过 Gzip 压缩，有助于显著降低响应主体的大小，从而提高 Web 应用程序的速度。可使用[压缩](https://www.npmjs.com/package/compression)中间件进行 Express 应用程序中的 gzip 压缩。例如：

```js
const compression = require('compression')
const express = require('express')
const app = express()
app.use(compression())
```

对于生产环境中的大流量网站，实施压缩的最佳位置是在反向代理层级（请参阅[使用反向代理](#proxy)）。在此情况下，不需要使用压缩中间件。有关在 Nginx 中启用 gzip 压缩的详细信息，请参阅 Nginx 文档中的 [ngx_http_gzip_module 模块](http://nginx.org/en/docs/http/ngx_http_gzip_module.html)。

### 不使用同步函数

同步函数和方法会阻止执行进程的运行，直至其返回。对同步函数的每次调用可能在数微秒或数毫秒后返回，但是在大流量网站中，这些调用的累积返回时间也相当可观，会影响到应用程序的性能。因此应避免在生产环境中使用同步函数。

虽然 Node 和许多模块提供函数的同步和异步版本，但是在生产环境中请始终使用异步版本。只有在初始启动时才适合使用同步函数。

如果您使用 Node.js 4.0+ 或 io.js 2.1.0+，那么可以使用 `--trace-sync-io` 命令行标记，每当应用程序使用同步 API 时就显示一条警告消息和堆栈跟踪。当然，您不会希望在生产环境中实际使用此功能，这只是为了确保代码已准备好用于生产环境。请参阅 [node 命令行选项文档](https://nodejs.org/api/cli.html#cli_trace_sync_io)以了解更多信息。

### 正确进行日志记录

一般而言，从应用程序进行日志记录有两个原因：出于调试目的和出于记录应用程序活动目的（基本上就是除调试以外的其他所有事项）。通过使用 `console.log()` 或 `console.err()` 在终端上显示日志消息是开发过程中的常见做法。但是，如果目标是终端或文件，[这些函数就是同步的](https://nodejs.org/api/console.html#console_console_1)，因此，除非要将输出通过管道传到另一个程序，否则上述函数就不适合用于生产环境。

#### 出于调试目的

如果您出于调试目的进行日志记录，请使用 [debug](https://www.npmjs.com/package/debug) 这样的特殊调试模块，而不要使用 `console.log()`。此模块支持您使用 DEBUG 环境变量来控制将哪些调试消息（如果有）发送到 `console.err()`。为了确保应用程序完全采用异步方式，仍需要将 `console.err()` 通过管道传到另一个程序。但您并不会真的希望在生产环境中进行调试，对吧？

#### 出于应用程序活动目的

如果要对应用程序活动进行日志记录（例如，跟踪流量或 API 调用），请使用 [Winston](https://www.npmjs.com/package/winston) 或 [Bunyan](https://www.npmjs.com/package/bunyan) 之类的日志记录库，而不要使用 `console.log()`。要了解这两个库的详细对比，请参阅 StrongLoop 博客帖子 [Comparing Winston and Bunyan Node.js Logging](https://strongloop.com/strongblog/compare-node-js-logging-winston-bunyan/)。

<a name="exceptions"></a>

### 正确处理异常

Node 应用程序在遇到未捕获的异常时会崩溃。不处理异常并采取相应的措施会导致 Express 应用程序崩溃并脱机。如果您按照以下[确保应用程序自动重新启动](#restart)中的建议执行，那么应用程序可以从崩溃中恢复。幸运的是，Express 应用程序的启动时间一般很短。然而，应当首先立足于避免崩溃，为此，需要正确处理异常。

要确保处理所有异常，请使用以下方法：

* [使用 try-catch](#try-catch)
* [使用 promise](#promises)

在深入了解这些主题之前，应该对 Node/Express 错误处理有基本的了解：使用 error-first 回调并在中间件中传播错误。Node 将“error-first 回调”约定用于从异步函数返回错误，回调函数的第一个参数是错误对象，后续参数中包含结果数据。为了表明没有错误，可将 null 值作为第一个参数传递。回调函数必须相应地遵循“error-first”回调约定，以便有意义地处理错误。在 Express 中，最佳做法是使用 next() 函数，通过中间件链来传播错误。

有关错误处理基本知识的更多信息，请参阅：

* [Error Handling in Node.js](https://www.joyent.com/developers/node/design/errors)
* [Building Robust Node Applications: Error Handling](https://strongloop.com/strongblog/robust-node-applications-error-handling/)（StrongLoop 博客）

#### 请勿执行以下操作

*请勿*侦听 `uncaughtException` 事件，当异常像气泡一样在事件循环中一路回溯时，就会发出该事件。为 `uncaughtException` 添加事件侦听器将改变进程遇到异常时的缺省行为；进程将继续运行而不理会异常。这貌似是防止应用程序崩溃的好方法，但是在遇到未捕获的异常之后仍继续运行应用程序是一种危险的做法，不建议这么做，因为进程状态可能会变得不可靠和不可预测。

此外，`uncaughtException` 被公认为[比较粗糙](https://nodejs.org/api/process.html#process_event_uncaughtexception)，[建议](https://github.com/nodejs/node-v0.x-archive/issues/2582)从内核中将其移除。所以侦听 `uncaughtException` 并不是个好主意。这就是为何我们推荐诸如多个进程和虚拟机管理器之类的方案：崩溃后重新启动通常是从错误中恢复的最可靠方法。

我们也不建议使用[域](https://nodejs.org/api/domain.html)。它一般并不能解决问题，是一种不推荐使用的模块。

<a name="try-catch"></a>

#### 使用 try-catch

Try-catch 是一种 JavaScript 语言构造，可用于捕获同步代码中的异常。例如，使用 try-catch 来处理 JSON 解析错误（如下所示）。

使用诸如 [JSHint](http://jshint.com/) 或 [JSLint](http://www.jslint.com/) 之类的工具有助于查找类似[未定义变量的引用错误](http://www.jshint.com/docs/options/#undef)这样的隐含异常。

以下示例使用 try-catch 来处理潜在的进程崩溃异常。
此中间件函数接受名为“params”的查询字段参数（JSON 对象）。

```js
app.get('/search', (req, res) => {
  // Simulating async operation
  setImmediate(() => {
    const jsonStr = req.query.params
    try {
      const jsonObj = JSON.parse(jsonStr)
      res.send('Success')
    } catch (e) {
      res.status(400).send('Invalid JSON string')
    }
  })
})
```

然而，try-catch 仅适用于同步代码。而由于 Node 平台主要采用异步方式（尤其在生产环境中），因此 try-catch 不会捕获大量异常。

<a name="promises"></a>

#### 使用 promise

Promise 可以处理使用 `then()` 的异步代码块中的任何异常（显式和隐式）。只需将 `.catch(next)` 添加到 Promise 链的末尾。例如：

```js
app.get('/', (req, res, next) => {
  // do some sync stuff
  queryDb()
    .then((data) => makeCsv(data)) // handle data
    .then((csv) => { /* handle csv */ })
    .catch(next)
})

app.use((err, req, res, next) => {
  // handle error
})
```

现在，所有异步和同步错误都会传播到错误中间件。

然而，有两则警告：

1.  所有异步代码必须返回 Promise（除了发射器）。如果特定库未返回 Promise，请使用类似 [Bluebird.promisifyAll()](http://bluebirdjs.com/docs/api/promise.promisifyall.html) 的助手函数来转换基本对象。
2.  事件发射器（比如流）仍然会导致未捕获的异常。所以请确保正确处理错误事件；例如：

```js
const wrap = fn => (...args) => fn(...args).catch(args[2])

app.get('/', wrap(async (req, res, next) => {
  const company = await getCompanyById(req.query.id)
  const stream = getLogoStreamById(company.id)
  stream.on('error', next).pipe(res)
}))
```

有关使用 Promise 来处理错误的更多信息，请参阅：

* [Asynchronous Error Handling in Express with Promises, Generators and ES7](https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/)
* [Promises in Node.js with Q – An Alternative to Callbacks](https://strongloop.com/strongblog/promises-in-node-js-with-q-an-alternative-to-callbacks/)

<a name="env"></a>

## 环境/设置中的注意事项

以下是为改进应用程序性能而在系统环境中要注意的事项：

* 将 NODE_ENV 设置为“production”
* 确保应用程序能够自动重新启动
* 在集群中运行应用程序
* 高速缓存请求结果
* 使用负载均衡器
* 使用逆向代理

### 将 NODE_ENV 设置为“production”

NODE_ENV 环境变量指定运行应用程序的环境（通常是开发或者生产环境）。为了改进性能，最简单的方法是将 NODE_ENV 设置为“production”。

将 NODE_ENV 设置为“production”会使 Express：

* 高速缓存视图模板。
* 高速缓存从 CSS 扩展生成的 CSS 文件。
* 生成简短的错误消息。

[测试表明](http://apmblog.dynatrace.com/2015/07/22/the-drastic-effects-of-omitting-node_env-in-your-express-js-applications/)仅仅这样做就可以使应用程序性能提高 3 倍多！

如果您需要编写特定于环境的代码，可以使用 `process.env.NODE_ENV` 来检查 NODE_ENV 的值。请注意，检查任何环境变量的值都会导致性能下降，所以应该三思而行。

在开发中，通常会在交互式 shell 中设置环境变量，例如，使用 `export` 或者 `.bash_profile` 文件。但是一般而言，您不应在生产服务器上执行此操作；而是应当使用操作系统的初始化系统（systemd 或 Upstart）。下一节提供如何使用初始化系统的常规详细信息，但是设置 NODE_ENV 对于性能非常重要（且易于操作），所以会在此重点介绍。

对于 Upstart，请使用作业文件中的 `env` 关键字。例如：

<pre>
<code class="language-sh" translate="no">
# /etc/init/env.conf
 env NODE_ENV=production
</code>
</pre>

有关更多信息，请参阅 [Upstart Intro, Cookbook and Best Practices](http://upstart.ubuntu.com/cookbook/#environment-variables)。

对于 systemd，请使用单元文件中的 `Environment` 伪指令。例如：

<pre>
<code class="language-sh" translate="no">
# /etc/systemd/system/myservice.service
Environment=NODE_ENV=production
</code>
</pre>

有关更多信息，请参阅 [Using Environment Variables In systemd Units](https://coreos.com/os/docs/latest/using-environment-variables-in-systemd-units.html)。

如果在使用 StrongLoop Process Manager，还可以[在将 StrongLoop PM 作为服务安装时设置环境变量](https://docs.strongloop.com/display/SLC/Setting+up+a+production+host#Settingupaproductionhost-Setenvironmentvariables)。

### 确保应用程序能够自动重新启动

在生产环境中，您肯定不希望应用程序脱机。这意味着需要确保在应用程序崩溃的情况下以及服务器自身崩溃的情况下应用程序都能够重新启动。虽然您不希望这两种情况发生，但是必须未雨绸缪，以防不测：

* 使用进程管理器在应用程序（和 Node）崩溃时将其重新启动。
* 在操作系统崩溃时，使用操作系统提供的初始化系统重新启动进程管理器。还可以在没有进程管理器的情况下使用初始化系统。

Node 应用程序在遇到未捕获的异常时会崩溃。您需要确保应用程序经过彻底测试，能够处理所有异常，这一点最为重要（请参阅[正确处理异常](#exceptions)以了解详细信息）。但是，作为一种防故障措施，请实施一种机制，确保应用程序崩溃后可以自动重新启动。

#### 使用进程管理器

在开发中，只需在命令行从 `node server.js` 或类似项启动应用程序。但是在生产环境中执行此操作会导致灾难。如果应用程序崩溃，它会脱机，直到其重新启动为止。为了确保应用程序在崩溃后可以重新启动，请使用进程管理器。进程管理器是一种应用程序“容器”，用于促进部署，提供高可用性，并支持用户在运行时管理应用程序。

除了在应用程序崩溃时将其重新启动外，进程管理器还可以执行以下操作：

* 获得对运行时性能和资源消耗的洞察。
* 动态修改设置以改善性能。
* 控制集群（StrongLoop PM 和 pm2）。

Node 的最流行进程管理器包括：

* [StrongLoop Process Manager](http://strong-pm.io/)
* [PM2](https://github.com/Unitech/pm2)
* [Forever](https://www.npmjs.com/package/forever)

要了解对这三种进程管理器的逐个功能的比较，请参阅 [http://strong-pm.io/compare/](http://strong-pm.io/compare/)。有关这所有三种进程管理器的更详细介绍，请参阅 [Express 应用程序的进程管理器](/{{ page.lang }}/advanced/pm.html)。

即使应用程序会不时崩溃，使用其中任何进程管理器都足以使其成功启动。

但 StrongLoop PM 有许多专门针对生产部署的功能。您可以使用该管理器以及相关的 StrongLoop 工具执行以下功能：

* 在本地构建和打包应用程序，然后将其安全地部署到生产系统。
* 在应用程序由于任何原因而崩溃时自动将其重新启动。
* 远程管理集群。
* 查看 CPU 概要文件和堆快照，以优化性能和诊断内存泄漏。
* 查看应用程序的性能指标。
* 轻松地扩展到具有 Nginx 负载均衡器集成控制的多个主机。

如以下所述，在使用初始化系统将 StrongLoop PM 作为操作系统服务安装后，StrongLoop PM 会在系统重新启动时自动重新启动。这样，就可以确保应用程序进程和集群持久保持运行。

#### 使用初始化系统

下一层的可靠性是确保在服务器重新启动时应用程序可以重新启动。系统仍然可能由于各种原因而宕机。为了确保在服务器崩溃后应用程序可以重新启动，请使用内置于操作系统的初始化系统。目前主要使用两种初始化系统：[systemd](https://wiki.debian.org/systemd) 和 [Upstart](http://upstart.ubuntu.com/)。

有两种方法将初始化系统用于 Express 应用程序：

* 在进程管理器中运行应用程序，使用初始化系统将进程管理器安装为服务。进程管理器将在应用程序崩溃时将其重新启动，初始化系统则在操作系统重新启动时重新启动进程管理器。这是建议使用的方法。
* 通过初始化系统直接运行应用程序（和 Node）。这样做要简单些，但是无法发挥使用进程管理器的额外优点。

##### Systemd

Systemd 是一个 Linux 系统和服务管理器。大多数主要 Linux 分发版采用 systemd 作为其缺省初始化系统。

systemd 服务配置文件称为*单元文件*，扩展名为 .service。以下是一个用于直接管理 Node 应用程序的单元文件示例（请将粗体文本替换为系统和应用程序的值）：

<pre>
<code class="language-sh" translate="no">
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
</code>
</pre>
有关 systemd 的更多信息，请参阅 [systemd 参考（联机帮助页）](http://www.freedesktop.org/software/systemd/man/systemd.unit.html)。
##### 作为 systemd 服务的 StrongLoop PM

可以轻松地将 StrongLoop Process Manager 作为 systemd 服务安装。这样做之后，当服务器重新启动时，它会自动重新启动 StrongLoop PM，后者又会重新启动所管理的所有应用程序。

要将 StrongLoop PM 作为 systemd 服务安装：

```console
$ sudo sl-pm-install --systemd
```

使用以下命令启动此服务：

```console
$ sudo /usr/bin/systemctl start strong-pm
```

有关更多信息，请参阅[Setting up a production host](https://docs.strongloop.com/display/SLC/Setting+up+a+production+host#Settingupaproductionhost-RHEL7+,Ubuntu15.04or15.10)（StrongLoop 文档）。

##### Upstart

Upstart 是在许多 Linux 分发版上提供的一种系统工具，用于在系统启动期间启动某些任务和服务，在系统关闭期间停止这些任务和服务，以及对这些任务和服务进行监督。可以将 Express 应用程序或进程管理器配置为服务，这样 Upstart 会在其崩溃时自动将其重新启动。

Upstart 服务以作业配置文件（也称为“作业”）形式定义，扩展名为 `.conf`。以下示例说明如何为名为“myapp”的应用程序创建名为“myapp”的作业，其主文件位于 `/projects/myapp/index.js`。

在 `/etc/init/` 中创建名为 `myapp.conf` 的文件，其中包含以下内容（请将粗体文本替换为系统和应用程序的值）：

<pre>
<code class="language-sh" translate="no">
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
</code>
</pre>

注：此脚本需要 Ubuntu 12.04-14.10 上受支持的 Upstart 1.4 或更新版本。

由于此作业配置为在系统启动时运行，因此应用程序将随操作系统一起启动，并在应用程序崩溃或者系统宕机后自动重新启动。

除了自动重新启动此应用程序，Upstart 还支持您使用以下命令：

* `start myapp` - 启动应用程序
* `restart myapp` - 重新启动应用程序
* `stop myapp` - 停止应用程序。

有关 Upstart 的更多信息，请参阅 [Upstart Intro, Cookbook and Best Practises](http://upstart.ubuntu.com/cookbook)。

##### 作为 Upstart 服务的 StrongLoop PM

可以轻松地将 StrongLoop Process Manager 作为 Upstart 服务安装。这样做之后，当服务器重新启动时，它会自动重新启动 StrongLoop PM，后者又会重新启动所管理的所有应用程序。

要将 StrongLoop PM 作为 Upstart 1.4 服务安装：

```console
$ sudo sl-pm-install
```

使用以下命令运行此服务：

```console
$ sudo /sbin/initctl start strong-pm
```

注：在不支持 Upstart 1.4 的系统上，这些命令略有不同。请参阅 [Setting up a production host](https://docs.strongloop.com/display/SLC/Setting+up+a+production+host#Settingupaproductionhost-RHELLinux5and6,Ubuntu10.04-.10,11.04-.10)（StrongLoop 文档），以了解更新信息。

### 在集群中运行应用程序

在多核系统中，可以通过启动进程的集群，将 Node 应用程序的性能提升多倍。一个集群运行此应用程序的多个实例，理想情况下一个 CPU 核心上运行一个实例，从而在实例之间分担负载和任务。

<!--![使用集群 API 在应用程序实例之间进行负载均衡](/images/clustering.png)-->

重要信息：由于应用程序实例作为单独的进程运行，因此它们不会共享同一内存空间。也就是说，对象位于应用程序每个实例的本地。因此，无法在应用程序代码中保存状态。然而，可以使用 [Redis](http://redis.io/) 之类的内存中数据存储器来存储与会话相关的数据和状态。此警告适用于几乎所有形式的水平扩展（无论是多个进程的集群还是多个物理服务器的集群）。

在集群应用程序中，个别工作进程的崩溃并不会影响其余的进程。除了性能优势，故障隔离是运行应用程序进程集群的另一原因。每当工作进程崩溃时，请确保始终使用 cluster.fork() 来记录事件并生成新进程。

#### 使用 Node 的集群模块

可以使用 Node 的[集群模块](https://nodejs.org/docs/latest/api/cluster.html)来建立集群。这使主进程可以生成工作进程并在工作进程之间分配传入连接。然而，使用可以自动执行此操作的众多工具中的一种（例如 [node-pm](https://www.npmjs.com/package/node-pm) 或 [cluster-service](https://www.npmjs.com/package/cluster-service)），要比直接使用此模块好得多。

#### 使用 StrongLoop PM

如果将应用程序部署到 StrongLoop Process Manager (PM)，那么可以利用集群*而不必*修改应用程序代码。

如果使用 StrongLoop Process Manager (PM) 运行应用程序，它会在集群中自动运行此应用程序，所生成的工作进程数等于系统中的 CPU 核心数。您可以使用 slc 命令行工具手动更改集群中工作进程的数量，而不必停止应用程序。

例如，假设要将应用程序部署到 prod.foo.com，并且 StrongLoop PM 正在端口 8701（缺省值）上侦听，那么可使用 slc 将集群大小设置为 8：

```console
$ slc ctl -C http://prod.foo.com:8701 set-size my-app 8
```

有关使用 StrongLoop PM 建立集群的更多信息，请参阅 StrongLoop 文档中的[集群](https://docs.strongloop.com/display/SLC/Clustering)。

### 高速缓存请求结果

提高生产环境性能的另一种策略是对请求的结果进行高速缓存，以便应用程序不需要为满足同一请求而重复执行操作。

使用 [Varnish](https://www.varnish-cache.org/) 或 [Nginx](https://www.nginx.com/resources/wiki/start/topics/examples/reverseproxycachingexample/)（另请参阅 [Nginx Caching](https://serversforhackers.com/nginx-caching/)）之类的高速缓存服务器，可以显著提高应用程序的速度和性能。

### 使用负载均衡器

无论应用程序如何优化，单个实例都只能处理有限的负载和流量。扩展应用程序的一种方法是运行此应用程序的多个实例，并通过负载均衡器分配流量。设置负载均衡器可以提高应用程序的性能和速度，并使可扩展性远超单个实例可以达到的水平。

负载均衡器通常是逆向代理，用于编排进出多个应用程序实例和服务器的流量。可以使用 [Nginx](http://nginx.org/en/docs/http/load_balancing.html) 或 [HAProxy](https://www.digitalocean.com/community/tutorials/an-introduction-to-haproxy-and-load-balancing-concepts) 轻松地为应用程序设置负载均衡器。

对于负载均衡功能，可能必须确保与特定会话标识关联的请求连接到产生请求的进程。这称为*会话亲缘关系*或者*粘性会话*，可通过以上的建议来做到这一点：将 Redis 之类的数据存储器用于会话数据（取决于您的应用程序）。要了解相关讨论，请参阅 [Using multiple nodes](http://socket.io/docs/using-multiple-nodes/)。

#### 将 StrongLoop PM 与 Nginx 负载均衡器一起使用

[StrongLoop Process Manager](http://strong-pm.io/) 与 Nginx Controller 集成，从而能够方便地配置多主机生产环境配置。有关更多信息，请参阅 [Scaling to multiple servers](https://docs.strongloop.com/display/SLC/Scaling+to+multiple+servers)（StrongLoop 文档）。
<a name="proxy"></a>

### 使用逆向代理

逆向代理位于 Web 应用程序之前，除了将请求转发给应用程序外，还对请求执行支持性操作。它还可以处理错误页、压缩、高速缓存、文件服务和负载均衡等功能。

通过将无需了解应用程序状态的任务移交给逆向代理，可以使 Express 腾出资源来执行专门的应用程序任务。因此，建议在生产环境中，在 [Nginx](https://www.nginx.com/) 或 [HAProxy](http://www.haproxy.org/) 之类的逆向代理背后运行 Express。
