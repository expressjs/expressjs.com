---
layout: page
title: Express behind proxies
menu: guide
lang: uz
---

# Express behind proxies

Using Express behind a reverse proxy (such as Varnish or Nginx)
is trivial; however, it does require configuration. By enabling the
"trust proxy" setting via `app.enable('trust proxy')`, Express
will have knowledge that it's sitting behind a proxy and that the
`X-Forwarded-*` header fields may be trusted. (Otherwise,
they are easily spoofed.)

Enabling this setting has several subtle effects. The first is
that `X-Forwarded-Proto` may be set by the reverse proxy to
tell the app whether it is https or simply http. This value is reflected
by [req.protocol](/api.html#req.protocol).

The second change is that the [req.ip](/api.html#req.ip)
and [req.ips](/api.html#req.ips) values will be populated with
`X-Forwarded-For`'s list of addresses.
