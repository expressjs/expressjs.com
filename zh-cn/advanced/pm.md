---
layout: page
title: Express 应用程序的进程管理器
menu: advanced
lang: zh-cn
---

# Express 应用程序的进程管理器

在生产环境中运行 Express 应用程序时，使用*进程管理器*对于完成以下任务很有帮助：

- 在应用程序崩溃后将其重新启动。
- 获得对运行时性能和资源消耗的洞察。
- 动态修改设置以改善性能。
- 控制集群。

进程管理器有点类似于应用程序服务器：它是应用程序的“容器”，可促进部署，提供高可用性并使您可以在运行时管理应用程序。

用于 Express 和其他 Node.js 应用程序的最流行的进程管理器包括：

- [StrongLoop Process Manager](#sl)
- [PM2](#pm2)
- [Forever](#forever)


这三种工具都非常有用，但 StrongLoop Process Manager 是提供全面的运行时和部署解决方案的唯一工具，能够满足整个 Node.js 应用程序生命周期的需求，并在统一的界面中为生产前后的每一个步骤提供工具。

以下是对每种工具的简介。
要获取详细的比较，请参阅 [http://strong-pm.io/compare/](http://strong-pm.io/compare/)。

## <a id="sl">StrongLoop Process Manager</a>

StrongLoop Process Manager (StrongLoop PM) 是 Node.js 应用程序的生产进程管理器。StrongLoop PM 具有内置负载均衡、监控和多主机部署功能，还有一个图形控制台。
可将 StrongLoop PM 用于以下任务：

- 构建、打包 Node.js 应用程序并将其部署到本地或远程系统。
- 查看 CPU 概要文件和堆快照，以优化性能和诊断内存泄漏。
- 使进程和集群持久保持运行。
- 查看应用程序的性能指标。
- 使用 Nginx 集成轻松管理多主机部署。
- 将多个 StrongLoop PM 统一到从 Arc 管理的分布式微服务运行时。

可以使用称为 `slc` 的强大命令行界面工具或者称为 Arc 的图形工具与 StrongLoop PM 协作。Arc 是开源的，由 StrongLoop 提供专业支持。

有关更多信息，请参阅 [http://strong-pm.io/](http://strong-pm.io/)。

完整文档：

- [Operating Node apps](http://docs.strongloop.com/display/SLC)（StrongLoop 文档）
- [Using StrongLoop Process Manager](http://docs.strongloop.com/display/SLC/Using+Process+Manager).

### 安装

```console
$ [sudo] npm install -g strongloop
```

### 基本使用

```console
$ cd my-app
$ slc start
```

查看进程管理器和所有部署的应用程序的状态：

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

列出受到管理的所有应用程序（服务）：

```console
$ slc ctl ls
Id          Name         Scale
 1          my-app       1
```

停止应用程序：

```console
$ slc ctl stop my-app
```

重新启动应用程序：

```console
$ slc ctl restart my-app
```

还可以“软重新启动”，这使工作进程有一个宽限期来关闭现有连接，然后重新启动当前应用程序：

```console
$ slc ctl soft-restart my-app
```

要移除受到管理的应用程序：

```console
$ slc ctl remove my-app
```

## <a id="pm2">PM2</a>

PM2 是 Node.js 应用程序的生产进程管理器，具有内置的负载均衡器。PM2 可以使应用程序保持持久运行，无需宕机即可重新装入，并可以简化常见的系统管理任务。PM2 还使您可以管理应用程序记录、监控和集群。

有关更多信息，请参阅 [https://github.com/Unitech/pm2](https://github.com/Unitech/pm2)。

### 安装

```console
$ [sudo] npm install pm2 -g
```

### 基本使用

在使用 `pm2` 命令启动应用程序时，必须指定应用程序的路径。但在停止、重新启动或删除应用程序时，只需指定应用程序的名称或标识。

```console
$ pm2 start npm --name my-app -- start
[PM2] restartProcessId process id 0
┌──────────┬────┬──────┬───────┬────────┬─────────┬────────┬─────────────┬──────────┐
│ App name │ id │ mode │ pid   │ status │ restart │ uptime │ memory      │ watching │
├──────────┼────┼──────┼───────┼────────┼─────────┼────────┼─────────────┼──────────┤
│ my-app   │ 0  │ fork │ 64029 │ online │ 1       │ 0s     │ 17.816 MB   │ disabled │
└──────────┴────┴──────┴───────┴────────┴─────────┴────────┴─────────────┴──────────┘
 Use the `pm2 show <id|name>` command to get more details about an app.
```

使用 `pm2` 命令启动应用程序时，立即将应用程序发送到后台。可以使用各种 `pm2` 命令从命令行控制后台应用程序。

在使用 `pm2` 命令启动应用程序之后，会 PM2 的进程列表中使用标识注册该应用程序。因此，可以使用标识来管理系统上不同目录中的同名应用程序。

请注意，如果有多个同名的应用程序在运行，那么 `pm2` 命令会影响所有这些应用程序。所以请使用标识而不是名称来管理各个应用程序。

列出所有正在运行的进程：

```console
$ pm2 list
```

停止应用程序：

```console
$ pm2 stop 0
```

重新启动应用程序：

```console
$ pm2 restart 0
```

要查看关于应用程序的详细信息：

```console
$ pm2 show 0
```

要从 PM2 的注册表移除应用程序：

```console
$ pm2 delete 0
```


## <a id="forever">Forever</a>

Forever 是一种简单的命令行界面工具，用于确保特定脚本持续（永久）运行。Forever 的简单界面使其成为运行 Node.js 应用程序和脚本的较小部署的理想选择。

有关更多信息，请参阅 [https://github.com/foreverjs/forever](https://github.com/foreverjs/forever)。

### 安装

```console
$ [sudo] npm install forever -g
```

### 基本使用

要启动脚本，请使用 `forever start` 命令并指定脚本的路径：

```console
$ forever start script.js
```

此命令（在后台）以守护程序方式运行脚本。

要运行脚本以便其附加到终端，请省略 `start`：

```console
$ forever script.js
```

使用日志记录选项 `-l`、`-o` 和 `-e`（如此示例中所示）记录来自 Forever 工具和脚本的输出，是很好的构想：

```console
$ forever start -l forever.log -o out.log -e err.log script.js
```

要查看 Forever 启动的脚本的列表：

```console
$ forever list
```

要停止由 Forever 启动的脚本，请使用 `forever stop` 命令并指定进程索引（如 `forever list` 命令所列出）。

```console
$ forever stop 1
```

或者，指定文件的路径：

```console
$ forever stop script.js
```

要停止 Forever 启动的所有脚本：

```console
$ forever stopall
```

Forever 还有许多其他选项，还提供编程 API。
