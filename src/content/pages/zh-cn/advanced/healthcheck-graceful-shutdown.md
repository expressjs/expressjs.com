---
title: 健康检查与优雅关闭
description: 学习如何在 Express 应用中实现健康检查和优雅关闭，以提升可靠性、管理部署并与 Kubernetes 等负载均衡器集成。
---

## 优雅关闭

部署应用新版本时，必须替换旧版本。 你使用的进程管理器会首先向应用发送 SIGTERM 信号，通知应用即将被终止。 应用收到该信号后，应停止接收新请求、完成所有正在处理的请求，释放已使用的资源（包括数据库连接和文件锁），然后退出。

### 示例

```js
const server = app.listen(port);

process.on('SIGTERM', () => {
  debug('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    debug('HTTP server closed');
  });
});
```

## 健康检查

负载均衡器通过健康检查判定应用实例状态是否正常、能否接收请求。 For example, [Kubernetes has two health checks](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes//):

- `liveness`（存活检查）：用于判断何时重启容器。
- `readiness`（就绪检查）：用于判断容器何时准备就绪并开始接收流量。 Pod 未就绪时，会从服务负载均衡器中被剔除。
