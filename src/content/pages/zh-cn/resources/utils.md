---
title: Express 实用工具
description: 探索与 Express.js 和 Node.js 相关的实用工具模块，包括 Cookie 处理、CSRF 防护、URL 解析、路由等工具，以增强你的应用程序功能。
---

## Express 实用函数

[pillarjs](https://github.com/pillarjs) GitHub 组织包含许多实用函数模块，这些模块在一般情况下也可能非常有用。

| 实用工具模块                                                   | 描述                                                                                                                     |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| [cookies](https://www.npmjs.com/package/cookies)               | 获取和设置 HTTP(S) Cookie，可使用 Keygrip 进行签名以防止篡改。 可与 Node.js HTTP 库一起使用，或作为 Express 中间件使用。 |
| [csrf](https://www.npmjs.com/package/csrf)                     | 包含 CSRF 令牌创建与验证的核心逻辑。 使用该模块创建自定义 CSRF 中间件。                                                  |
| [finalhandler](https://www.npmjs.com/package/finalhandler)     | 用于作为 HTTP 请求响应最后一步调用的函数。                                                                               |
| [parseurl](https://www.npmjs.com/package/parseurl)             | 解析 URL，并支持缓存。                                                                                                   |
| [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) | 将类似 `/user/:name` 的 Express 风格路径字符串转换为正则表达式。                                                         |
| [resolve-path](https://www.npmjs.com/package/resolve-path)     | 将相对路径解析为基于根路径的绝对路径，并进行校验。                                                                       |
| [router](https://www.npmjs.com/package/router)                 | 简单的中间件风格路由器。                                                                                                 |
| [send](https://www.npmjs.com/package/send)                     | 用于将文件以 HTTP 响应流式传输的库，支持部分响应（Range）、条件 GET 协商以及细粒度事件。                                 |

For additional low-level HTTP-related modules, see [jshttp](https://github.com/jshttp).
