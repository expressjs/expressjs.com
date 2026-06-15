---
title: '生产环境最佳实践：性能与可靠性'
description: 探寻生产环境下Express应用在性能与可靠性方面的最佳实践，涵盖实现最优性能所需的代码优化与环境配置。
---

本文介绍部署至生产环境的Express应用在性能和可靠性方面的最佳实践。

该主题明显属于“开发运维（DevOps）”范畴，兼顾传统开发与运维两大领域。 因此，相关内容分为两部分：

- 代码层面需要执行的操作（开发部分）：
  - [Use gzip compression](#use-gzip-compression)
  - [Don't use synchronous functions](#dont-use-synchronous-functions)
  - [Do logging correctly](#do-logging-correctly)
  - [Handle exceptions properly](#handle-exceptions-properly)
- 环境/部署配置层面需要完成的事项（运维部分）：
  - [Set NODE_ENV to "production"](#set-node_env-to-production)
  - [Ensure your app automatically restarts](#ensure-your-app-automatically-restarts)
  - [Run your app in a cluster](#run-your-app-in-a-cluster)
  - [Cache request results](#cache-request-results)
  - [Use a load balancer](#use-a-load-balancer)
  - [Use a reverse proxy](#use-a-reverse-proxy)

## 代码层面的优化事项

你可以在代码中执行以下操作来提升应用性能：

- [Use gzip compression](#use-gzip-compression)
- [Don't use synchronous functions](#dont-use-synchronous-functions)
- [Do logging correctly](#do-logging-correctly)
- [Handle exceptions properly](#handle-exceptions-properly)

### 使用gzip压缩

Gzip压缩可大幅减小响应体大小，从而提升Web应用的运行速度。 在Express应用中使用 [compression](https://www.npmjs.com/package/compression) 中间件实现gzip压缩。 举个例子：

```js
const compression = require('compression');
const express = require('express');
const app = express();

app.use(compression());
```

对于生产环境中的高流量网站，实施压缩的最佳方式是在反向代理层实现（参见[使用反向代理](#use-a-reverse-proxy)）。 这种情况下，你无需使用压缩中间件。 For details on enabling gzip compression in Nginx, see [Module ngx_http_gzip_module](https://nginx.org/en/docs/http/ngx_http_gzip_module.html) in the Nginx documentation.

### 不要使用同步函数

同步函数和方法会阻塞执行进程，直至其执行完毕并返回结果。 单次调用同步函数可能仅需几微秒或几毫秒即可返回，但在高流量网站中，这些调用会累积起来，降低应用性能。 在生产环境中应避免使用同步函数。

尽管Node.js及许多模块都提供了函数的同步和异步版本，但在生产环境中务必使用异步版本。 唯一可以合理使用同步函数的场景是应用初始启动阶段。

你可以使用 `--trace-sync-io` 命令行标志，在应用每次调用同步API时输出警告信息与堆栈跟踪。 当然，你不应该在生产环境中使用该标志，而应在代码准备部署到生产环境前使用它来排查问题。 See the [node command-line options documentation](https://nodejs.org/api/cli.html#trace-sync-io) for more information.

### 正确进行日志记录

通常，应用程序记录日志有两个目的：调试，以及记录应用运行活动（除此之外的所有场景基本都归为此类）。 在开发过程中，使用 `console.log()` 或 `console.error()` 将日志信息打印到终端是常见做法。 But [these functions are synchronous](https://nodejs.org/api/console.html#console) when the destination is a terminal or a file, so they are not suitable for production, unless you pipe the output to another program.

#### 用于调试

如果你的日志记录目的是调试，那么请使用专门的调试模块（例如 [debug](https://www.npmjs.com/package/debug)），而非使用 `console.log()`。 该模块允许你使用 DEBUG 环境变量来控制将哪些调试信息发送到 `console.error()`（如果存在的话）。 若要保持应用程序完全异步，你仍然需要将 `console.error()` 的输出通过管道传输到另一个程序。 但话说回来，你并不会真的在生产环境中进行调试，对吧？

#### 用于应用运行活动记录

如果你的目的是记录应用运行活动（例如追踪流量或API调用），请不要使用 `console.log()`，而是使用如 [Pino](https://www.npmjs.com/package/pino) 这样的日志库，它是目前速度最快、效率最高的选择。

### 正确处理异常

Node 应用在遇到未捕获异常时会崩溃。 不处理异常并采取相应措施会导致你的 Express 应用崩溃并下线。 如果你遵循下文 [确保应用自动重启](#ensure-your-app-automatically-restarts) 中的建议，那么你的应用将能从崩溃中恢复。 幸运的是，Express 应用的启动耗时通常很短。 尽管如此，你首先需要避免应用崩溃，而要做到这一点，就必须正确处理异常。

为确保处理所有异常，请使用以下方法：

- [Use try-catch](#use-try-catch)
- [Use promises](#use-promises)

在深入探讨这些主题之前，你应该对 Node/Express 错误处理有基本的了解：使用错误优先回调函数，以及在中间件中传递错误。 Node 使用**错误优先回调**约定从异步函数中返回错误，回调函数的第一个参数是错误对象，后续参数为结果数据。 若不存在错误，请将 `null` 作为第一个参数传递。 回调函数必须相应地遵循错误优先回调约定，才能有效处理错误。 而在 Express 中，最佳实践是使用 `next()` 函数沿着中间件链传递错误。

如需了解错误处理基础的更多内容，请参阅：

- [Error Handling in Node.js](https://web.archive.org/web/20210619211351/https://www.joyent.com/node-js/production/design/errors)

#### 使用 try-catch

`try-catch` 是一种 JavaScript 语言结构，可用于捕获同步代码中的异常。 例如，可使用 `try-catch` 处理 JSON 解析错误，如下所示。

以下是一个使用 `try-catch` 处理可能导致进程崩溃的异常的示例。
该中间件函数接收一个名为 `params` 的查询字段参数，该参数是一个 JSON 对象。

```js
app.get('/search', (req, res) => {
  // Simulating async operation
  setImmediate(() => {
    const jsonStr = req.query.params;
    try {
      const jsonObj = JSON.parse(jsonStr);
      res.send('Success');
    } catch (e) {
      res.status(400).send('Invalid JSON string');
    }
  });
});
```

但是，`try-catch` 仅适用于同步代码。 由于 Node 平台主要是异步的（尤其是在生产环境中），`try-catch` 无法捕获大量异常。

#### 使用 Promise

当在 `async` 函数中抛出错误，或在 `async` 函数内等待（await）一个已被拒绝的 Promise 时，这些错误会被传递给错误处理程序，效果等同于调用 `next(err)`。

```js
app.get('/', async (req, res, next) => {
  const data = await userData(); // If this promise fails, it will automatically call `next(err)` to handle the error.

  res.send(data);
});

app.use((err, req, res, next) => {
  res.status(err.status ?? 500).send({ error: err.message });
});
```

此外，你可以将异步函数用于中间件，若 Promise 失败，路由器会自动处理错误，例如：

```js
app.use(async (req, res, next) => {
  req.locals.user = await getUser(req);

  next(); // This will be called if the promise does not throw an error.
});
```

最佳实践是尽可能在错误发生的就近位置处理错误。 因此，虽然这类错误现在可由路由器处理，但最佳做法是在中间件中捕获并处理错误，而不依赖独立的错误处理中间件。

#### 不要执行的操作

你**不应**执行的操作之一是监听 `uncaughtException` 事件，该事件会在异常一直冒泡回到事件循环时触发。 为 `uncaughtException` 添加事件监听器会改变进程遇到异常时的默认行为；即便发生异常，进程仍会继续运行。 这听起来似乎是防止应用崩溃的好方法，但在发生未捕获异常后继续运行应用是一种危险的做法，**不推荐使用**，因为此时进程的状态会变得不可靠且不可预测。

Additionally, using `uncaughtException` is officially recognized as [crude](https://nodejs.org/api/process.html#event-uncaughtexception). 因此，监听 `uncaughtException` 是一种不可取的做法。 这也是我们推荐使用多进程和进程管理工具的原因：崩溃后重启通常是从错误中恢复的最可靠方式。

We also don't recommend using [domains](https://nodejs.org/api/domain.html). 该模块通常无法解决问题，且已被废弃。

## 环境/安装设置注意事项

你可以在系统环境中进行以下操作来提升应用性能：

- [Set NODE_ENV to "production"](#set-node_env-to-production)
- [Ensure your app automatically restarts](#ensure-your-app-automatically-restarts)
- [Run your app in a cluster](#run-your-app-in-a-cluster)
- [Cache request results](#cache-request-results)
- [Use a load balancer](#use-a-load-balancer)
- [Use a reverse proxy](#use-a-reverse-proxy)

### 将 `NODE_ENV` 设置为 `"production"`

`NODE_ENV` 环境变量用于指定应用的运行环境（通常为开发环境或生产环境）。 提升性能最简单的操作之一就是将 `NODE_ENV` 设为 `production`。

将 `NODE_ENV` 设置为 `"production"` 会使 Express：

- 缓存视图模板。
- 缓存由 CSS 扩展生成的 CSS 文件。
- 生成更简洁的错误提示信息。

[Tests indicate](https://web.archive.org/web/20250814011110/https://www.dynatrace.com/news/blog/the-drastic-effects-of-omitting-node-env-in-your-express-js-applications/) that just doing this can improve app performance by a factor of three!

若需要编写针对特定环境的代码，可通过 `process.env.NODE_ENV` 检查 `NODE_ENV` 的值。 请注意，检查任何环境变量的值都会产生性能损耗，因此应谨慎使用。

在开发环境中，你通常在交互式 shell 中设置环境变量，例如使用 `export` 命令或 `.bash_profile` 文件。 但通常情况下，你不应该在生产服务器上这样做；相反，应使用操作系统的初始化系统（systemd）。 下一节将详细介绍如何使用初始化系统，但由于设置 `NODE_ENV` 对性能至关重要（且操作简便），因此在此单独强调。

使用 systemd 时，在单元文件中使用 `Environment` 指令。 举个例子：

```sh

Environment=NODE_ENV=production
```

如需了解更多信息，参阅[在 systemd 单元中使用环境变量](https://www.flatcar.org/docs/latest/setup/systemd/environment-variables/)。

### 确保应用自动重启

在生产环境中，你绝不希望应用程序出现离线状态。 这意味着你需要确保**无论应用崩溃还是服务器本身崩溃，应用都能自动重启**。 尽管你希望这两种情况都不会发生，但在实际场景中，你必须通过以下方式应对这两种情况：

- 使用进程管理器在应用（及 Node）崩溃时将其重启。
- 借助操作系统自带的初始化系统，在操作系统异常后重启进程管理器。 你也可以不使用进程管理器，直接使用初始化系统。

Node 应用在遇到未捕获异常时会崩溃。 首要任务是保证应用经过充分测试、妥善处理所有异常（详情参见[合理处理异常](#handle-exceptions-properly)）。 但作为故障安全保障，需部署一套机制，确保应用一旦崩溃便能**自动重启**。

#### 使用进程管理器

在开发环境中，你通常只需通过命令行（例如执行 `node server.js`）来启动应用。 但在生产环境中采用这种启动方式极易引发故障。 倘若应用崩溃，服务就会中断，需要手动重启才能恢复。 如需应用程序意外崩溃后自动重启，请使用进程管理器。 进程管理器是应用的“容器”，可简化部署流程、保障高可用，并支持在运行阶段管理应用。

除了在应用崩溃时重启应用外，进程管理器还可实现以下功能：

- 查看运行时性能与资源占用情况。
- 动态修改配置以优化性能。
- 控制集群（pm2）。

以往，使用 [PM2](https://github.com/Unitech/pm2) 这类 Node.js 进程管理器十分普遍。 如需使用，请查阅其官方文档。 不过我们建议采用系统初始化程序进行进程管理。

#### ### 使用系统初始化服务

保障可靠性的下一步是确保服务器重启时应用也能自动重启。 服务器仍可能因各类故障宕机。 如需在服务器崩溃后重启应用，请使用操作系统内置的初始化系统。 如今主流的初始化系统为 [systemd](https://wiki.debian.org/systemd)。

在 Express 应用中使用初始化系统有两种方式：

- 在进程管理器中运行应用，并通过初始化系统将该进程管理器安装为系统服务。 应用崩溃时进程管理器会重启应用，操作系统重启时初始化系统会重启进程管理器。 该方案为推荐方案。
- 直接通过初始化系统运行你的应用（以及 Node）。 该方式相对简便，但无法获得使用进程管理器带来的额外优势。

##### Systemd

systemd 是一款 Linux 系统与服务管理器。 多数主流 Linux 发行版已将 systemd 设为默认初始化系统。

systemd 服务配置文件被称为**单元文件**，文件名以 `.service` 结尾。 以下是一个直接管理 Node 应用的单元文件示例。 请根据你的系统和应用替换 `<0>` 包裹的参数值：

```sh
[Unit]
Description=<Awesome Express App>

[Service]
Type=simple
ExecStart=/usr/local/bin/node </projects/myapp/index.js>
WorkingDirectory=</projects/myapp>

User=nobody
Group=nogroup


Environment=NODE_ENV=production


LimitNOFILE=infinity


LimitCORE=infinity

StandardInput=null
StandardOutput=syslog
StandardError=syslog
Restart=always

[Install]
WantedBy=multi-user.target
```

For more information on systemd, see the [systemd reference (man page)](https://www.freedesktop.org/software/systemd/man/latest/systemd.unit.html).

### 以集群模式运行应用

在多核系统中，通过启动进程集群可以将 Node 应用的性能提升数倍。 集群会运行应用的多个实例，理想情况下每个 CPU 核心运行一个实例，从而在各实例之间分配负载与任务。

![Balancing between application instances using the cluster API](/images/clustering.png)

重要提示：由于应用实例以独立进程运行，它们不共享相同的内存空间。 也就是说，对象仅作用于应用的每个独立实例。 因此，你无法在应用代码中维护状态。 不过你可以使用 [Redis](http://redis.io/) 这类内存型数据存储来存储会话相关数据与状态。 该注意事项基本适用于所有形式的水平扩展，无论是多进程集群还是多物理服务器部署。

在集群化应用中，工作进程可单独崩溃而不会影响其余进程。 除性能优势外，故障隔离是采用应用进程集群部署的另一原因。 每当工作进程崩溃时，务必记录该事件，并使用 cluster.fork() 生成新进程。

#### Using Node's cluster module

Clustering is made possible with Node's [cluster module](https://nodejs.org/api/cluster.html). 该模块可让主进程创建多个工作进程，并将接入的连接分发至各个工作进程。

#### 使用 PM2

如果使用 PM2 部署应用，**无需**修改应用代码即可使用集群功能。 你应当首先确保[应用为无状态应用](https://pm2.keymetrics.io/docs/usage/specifics/#stateless-apps)，即不在进程内存储本地数据（例如会话、WebSocket 连接等数据）。

使用 PM2 运行应用程序时，你可以启用**集群模式**，以指定数量的实例（例如与机器上可用 CPU 数量匹配）集群化运行应用。 你可以使用 `pm2` 命令行工具，**无需停止应用**，手动调整集群中的进程数量。

要启用集群模式，请按如下方式启动应用程序：

```bash

$ pm2 start npm --name my-app -i 4 -- start

$ pm2 start npm --name my-app -i max -- start
```

这也可以在 PM2 进程文件（`ecosystem.config.js` 或类似文件）中进行配置，将 `exec_mode` 设置为 `cluster`，并将 `instances` 设置为要启动的工作进程数量。

应用启动后，可按如下方式进行扩容：

```bash

$ pm2 scale my-app +3

$ pm2 scale my-app 2
```

如需了解更多关于使用 PM2 实现集群部署的相关信息，请参阅 PM2 文档中的[集群模式](https://pm2.keymetrics.io/docs/usage/cluster-mode/)。

### 缓存请求结果

优化生产环境性能的另一方案是缓存请求返回结果，避免应用重复处理相同请求。

Use a caching server like [Varnish](https://www.varnish.org/) or [Nginx](https://blog.nginx.org/blog/nginx-caching-guide) (see also [Nginx Caching](https://serversforhackers.com/c/nginx-caching)) to greatly improve the speed and performance of your app.

### 使用负载均衡器

无论应用优化程度多高，单个实例所能承载的负载与流量都存在上限。 应用扩容的一种方案：部署多实例，并通过负载均衡分发流量。 配置负载均衡能够提升应用性能与访问速度，同时让应用实现单实例无法达成的扩容能力。

负载均衡器通常是一种反向代理，用于调度多应用实例与多服务器之间的往来流量。 You can easily set up a load balancer for your app by using [Nginx](https://nginx.org/en/docs/http/load_balancing.html) or [HAProxy](https://www.digitalocean.com/community/tutorials/an-introduction-to-haproxy-and-load-balancing-concepts).

使用负载均衡时，你可能需要确保与特定会话 ID 关联的请求能连接到创建该会话的进程。 这被称为**会话亲和性**（_session affinity_），即**粘性会话**（_sticky sessions_），可通过上述建议解决（根据你的应用场景，可采用 Redis 等数据存储来存放会话数据）。 相关说明请参阅[多节点部署](https://socket.io/docs/v4/using-multiple-nodes/)。

### # 使用反向代理

反向代理部署在 Web 应用前端，除了将请求转发至应用外，还会对请求执行各类辅助操作。 它可处理错误页面、压缩、缓存、静态资源托管以及负载均衡等多项工作。

将无需感知应用状态的任务交由反向代理处理，可释放 Express 专注处理各类应用专属任务。 For this reason, it is recommended to run Express behind a reverse proxy like [Nginx](https://nginx.org/) or [HAProxy](https://www.haproxy.org/) in production.
