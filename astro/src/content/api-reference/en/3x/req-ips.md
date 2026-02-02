---
title: req.ips
description: When trust proxy is true, parse
menuTitle: req.ips
---

<h3 id='req.ips'>req.ips</h3>

When "trust proxy" is `true`, parse
the "X-Forwarded-For" ip address list
and return an array, otherwise an empty
array is returned.

For example if the value were "client, proxy1, proxy2"
you would receive the array `["client", "proxy1", "proxy2"]`
where "proxy2" is the furthest down-stream.
