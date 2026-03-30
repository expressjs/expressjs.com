---
title: req.ips
description: When the trust proxy setting does not evaluate to false,
---

# req.ips

When the [`trust proxy` setting](/api/application/app-set/#trust.proxy.options.table) does not evaluate to `false`,
this property contains an array of IP addresses
specified in the `X-Forwarded-For` request header. Otherwise, it contains an
empty array. This header can be set by the client or by the proxy.

For example, if `X-Forwarded-For` is `client, proxy1, proxy2`, `req.ips` would be
`["client", "proxy1", "proxy2"]`, where `proxy2` is the furthest downstream.
