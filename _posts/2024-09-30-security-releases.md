---
title: September 2024 Security Releases! 
tags: security, vulnerabilities
author: Ulises gascón
---

Recently, the Express team has been made aware of a number of security vulnerabilities in the Express project.  We have released a number of patches to address these vulnerabilities.  We strongly recommend that all users of Express upgrade to the latest version as soon as possible.  The following vulnerabilities have been addressed:


## CVE-2024-45590 (High) in `body-parser`

**[body-parser](https://www.npmjs.com/package/body-parser) vulnerable to denial of service when url encoding is enabled**

body-parser `<1.20.3` is vulnerable to denial of service when url encoding is enabled. a malicious actor using a specially crafted payload could flood the server with a large number of requests, resulting in denial of service.


**Affected versions**
- `<1.20.3`

**Patched versions**
- `>=1.20.3`

This vulnerability was discovered during the [OSTIF audit to Express](https://github.com/expressjs/security-wg/issues/6) and was mitigated by [the Express Securty triage team](https://github.com/expressjs/security-wg?tab=readme-ov-file#security-triage-team).

More details area available in [GHSA-qwcr-r2fm-qrc7](https://github.com/expressjs/body-parser/security/advisories/GHSA-qwcr-r2fm-qrc7)



## CVE-2024-43796 (moderate) in `express`

**[express](https://www.npmjs.com/package/express) vulnerable to XSS via `response.redirect()`**

In express <4.20.0, passing untrusted user input - even after sanitizing it - to `response.redirect()` may execute untrusted code.

**Affected versions**
- `<4.20.0`
- `>=5.0.0-alpha.1`, `<5.0.0`

**Patched versions**
- `>=4.20.0`
- `>=5.0.0`


This vulnerability was discovered during the [OSTIF audit to Express](https://github.com/expressjs/security-wg/issues/6) and was mitigated by [the Express Securty triage team](https://github.com/expressjs/security-wg?tab=readme-ov-file#security-triage-team).

More details area available in [GHSA-qw6h-vgh9-j6wx](https://github.com/expressjs/express/security/advisories/GHSA-qw6h-vgh9-j6wx)


## CVE-2024-43799 (moderate) in `send`.

**Template injection that can lead to XSS**

Passing untrusted user input - even after sanitizing it - to `SendStream.redirect()` may execute untrusted code


**Affected versions**
- `< 0.19.0`

**Patched versions**
- `0.19.0`

This vulnerability was discovered during the [OSTIF audit to Express](https://github.com/expressjs/security-wg/issues/6) and was mitigated by [the Express Securty triage team](https://github.com/expressjs/security-wg?tab=readme-ov-file#security-triage-team).

More details area available in [GHSA-m6fv-jmcg-4jfg](https://github.com/pillarjs/send/security/advisories/GHSA-m6fv-jmcg-4jfg)


## CVE-2024-43800 (moderate) in `serve-static`

**Template injection that can lead to XSS**

Passing untrusted user input - even after sanitizing it - to `redirect()` may execute untrusted code

**Affected versions** 
- `< 1.16.0`
- `>=2.0.0`, `<2.1.0`

**Patched versions**
- `>=1.16.0`
- `>=2.1.0`

This vulnerability was discovered during the [OSTIF audit to Express](https://github.com/expressjs/security-wg/issues/6) and was mitigated by [the Express Securty triage team](https://github.com/expressjs/security-wg?tab=readme-ov-file#security-triage-team).

More details area available in [GHSA-cm22-4g7w-348p](https://github.com/expressjs/serve-static/security/advisories/GHSA-cm22-4g7w-348p)


## CVE-2024-45296 (moderate) in `path-to-regexp`

**Backtracking regular expressions cause ReDoS**

A bad regular expression is generated any time you have two parameters within a single segment, separated by something that is not a period (`.`). For example, `/:a-:b`.


Using `/:a-:b` will produce the regular expression `/^\/([^\/]+?)-([^\/]+?)\/?$/`. This can be exploited by a path such as `/a${'-a'.repeat(8_000)}/a`. [OWASP](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS) has a good example of why this occurs, but the TL;DR is the /a at the end ensures this route would never match but due to naive backtracking it will still attempt every combination of the `:a-:b` on the repeated 8,000 `-a`.

Because JavaScript is single threaded and regex matching runs on the main thread, poor performance will block the event loop and can lead to a DoS. In local benchmarks, exploiting the unsafe regex will result in performance that is over 1000x worse than the safe regex. In a more realistic environment using Express v4 and 10 concurrent connections, this translated to average latency of ~600ms vs 1ms.

**Affected versions**
- `>=4.0.0`, `<8.0.0`
- `>=0.2.0`, `<1.9.0`
- `<0.1.10`
- `>=2.0.0`, `<3.3.0`


**Patched versions**
- `8.0.0`
- `1.9.0`
- `0.1.10`
- `3.3.0`


Thanks to [Blake Embrey](https://github.com/blakeembrey) who reported and created the security patch.


More details area available in [GHSA-9wv6-86v2-598j](https://github.com/pillarjs/path-to-regexp/security/advisories/GHSA-9wv6-86v2-598j)

