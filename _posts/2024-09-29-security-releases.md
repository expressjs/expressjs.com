---
title: September 2024 Security Releases
description: Security releases for Express, body-parser, send, serve-static, and path-to-regexp have been published. We recommend that all users upgrade as soon as possible.
tags: security, vulnerabilities
author: Ulises Gascón
---

Recently, the Express team has been made aware of a number of security vulnerabilities in the Express project.  We have released a number of patches to address these vulnerabilities.  

{% include admonitions/warning.html 
content="We strongly recommend that you upgrade these modules to the recommended (or latest) version as soon as possible."
%}

The following vulnerabilities have been addressed:

- [High severity vulnerability CVE-2024-45590 in body-parser middleware](#high-severity-vulnerability-cve-2024-45590-in-body-parser-middleware)
- [High severity vulnerability CVE-2024-47178 in basic-auth-connect middleware](#high-severity-vulnerability-cve-2024-47178-in-basic-auth-connect-middleware)
- [Moderate severity vulnerability CVE-2024-43796 in Express core](#moderate-severity-vulnerability-cve-2024-43796-in-express-core)
- [Moderate severity vulnerability CVE-2024-43799 in send utility module](#moderate-severity-vulnerability-cve-2024-43799-in-send-utility-module)
- [Moderate severity vulnerability CVE-2024-43800 in serve-static middleware](#moderate-severity-vulnerability-cve-2024-43800-in-serve-static-middleware)
- [Moderate severity vulnerability CVE-2024-45296 in path-to-regexp utility module](#moderate-severity-vulnerability-cve-2024-45296-in-path-to-regexp-utility-module)

## High severity vulnerability CVE-2024-45590 in body-parser middleware

**[body-parser](https://www.npmjs.com/package/body-parser) version `<1.20.3` is vulnerable to denial of service when URL-encoding is enabled**

A malicious actor using a specially-crafted payload could flood the server with a large number of requests, resulting in denial of service.

**Affected versions**: `<1.20.3`

**Patched versions**: `>=1.20.3`

This vulnerability was discovered during the [OSTIF audit to Express](https://github.com/expressjs/security-wg/issues/6) and was mitigated by [the Express security triage team](https://github.com/expressjs/security-wg?tab=readme-ov-file#security-triage-team).

For more details, see [GHSA-qwcr-r2fm-qrc7](https://github.com/expressjs/body-parser/security/advisories/GHSA-qwcr-r2fm-qrc7).

## High severity vulnerability CVE-2024-47178 in basic-auth-connect middleware

**[basic-auth-connect](https://www.npmjs.com/package/basic-auth-connect) uses a timing-unsafe equality comparison**

basic-auth-connect `<1.1.0` uses a timing-unsafe equality comparison that can leak timing information

**Affected versions**
- `<1.1.0`

**Patched versions**
- `>=1.1.0`

This vulnerability was discovered during the [OSTIF audit to Express](https://github.com/expressjs/security-wg/issues/6) and was mitigated by [the Express Securty triage team](https://github.com/expressjs/security-wg?tab=readme-ov-file#security-triage-team).

More details area available in [GHSA-7p89-p6hx-q4fw](https://github.com/expressjs/basic-auth-connect/security/advisories/GHSA-7p89-p6hx-q4fw)



## Moderate severity vulnerability CVE-2024-43796 in Express core

The core **[express](https://www.npmjs.com/package/express) package is vulnerable to cross-site scripting (XSS) attack via `response.redirect()`**.

In Express version <4.20.0, passing untrusted user input&mdash;even after sanitizing it&mdash;to `response.redirect()` may execute untrusted code.

**Affected versions**:
- `<4.20.0`
- `>=5.0.0-alpha.1`, `<5.0.0`

**Patched versions**:
- `>=4.20.0`
- `>=5.0.0`

This vulnerability was discovered during the [OSTIF audit of Express](https://github.com/expressjs/security-wg/issues/6) and was mitigated by [the Express security triage team](https://github.com/expressjs/security-wg?tab=readme-ov-file#security-triage-team).

For more details, see [GHSA-qw6h-vgh9-j6wx](https://github.com/expressjs/express/security/advisories/GHSA-qw6h-vgh9-j6wx).


## Moderate severity vulnerability CVE-2024-43799 in send utility module

The **[send](https://www.npmjs.com/package/send) utility module is vulnerable to template injection that can lead to vulnerability to cross-site scripting (XSS) attack**.

Passing untrusted user input&mdash;even after sanitizing it&mdash;to `SendStream.redirect()` can execute untrusted code.

**Affected versions**: `< 0.19.0`

**Patched versions**: `>=0.19.0`

This vulnerability was discovered during the [OSTIF audit of Express](https://github.com/expressjs/security-wg/issues/6) and was mitigated by [the Express security triage team](https://github.com/expressjs/security-wg?tab=readme-ov-file#security-triage-team).

For more details, see [GHSA-m6fv-jmcg-4jfg](https://github.com/pillarjs/send/security/advisories/GHSA-m6fv-jmcg-4jfg).


## Moderate severity vulnerability CVE-2024-43800 in serve-static middleware

The **[serve-static](https://www.npmjs.com/package/serve-static) middleware module is vulnerable to template injection that can lead to vulnerability to cross-site scripting (XSS) attack**.

Passing untrusted user input&mdash;even after sanitizing it&mdash;to `redirect()` can execute untrusted code.

**Affected versions**: 
- `< 1.16.0`
- `>=2.0.0`, `<2.1.0`

**Patched versions**:
- `>=1.16.0`
- `>=2.1.0`

This vulnerability was discovered during the [OSTIF audit of Express](https://github.com/expressjs/security-wg/issues/6) and was mitigated by [the Express security triage team](https://github.com/expressjs/security-wg?tab=readme-ov-file#security-triage-team).

For more details, see [GHSA-cm22-4g7w-348p](https://github.com/expressjs/serve-static/security/advisories/GHSA-cm22-4g7w-348p)


## Moderate severity vulnerability CVE-2024-45296 in path-to-regexp utility module

The **[path-to-regexp](https://www.npmjs.com/package/path-to-regexp) utility module is vulnerable to regular expression denial of service (ReDoS) attack**.

A bad regular expression is generated any time you have two parameters within a single segment, separated by something that is not a period (`.`). For example, `/:a-:b`.

Using `/:a-:b` will produce the regular expression `/^\/([^\/]+?)-([^\/]+?)\/?$/`. This can be exploited by a path such as `/a${'-a'.repeat(8_000)}/a`. [OWASP](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS) has a good example of why this occurs, but in essence, the `/a` at the end ensures this route would never match, but due to naive backtracking it will still attempt every combination of the `:a-:b` on the repeated 8,000 `-a`.

Because JavaScript is single-threaded and regex matching runs on the main thread, poor performance will block the event loop and can lead to a DoS. In local benchmarks, exploiting the unsafe regex will result in performance that is over 1000x worse than the safe regex. In a more realistic environment, using Express v4 and ten concurrent connections results in an average latency of ~600ms vs 1ms.

**Affected versions**:
- `>=4.0.0`, `<8.0.0`
- `>=0.2.0`, `<1.9.0`
- `<0.1.10`
- `>=2.0.0`, `<3.3.0`
- `>=4.0.0`, `<6.3.0`

**Patched versions**:
- `>=8.0.0`
- `>=1.9.0`
- `>=0.1.10`
- `>=3.3.0`
- `>=6.3.0`

Thanks to [Blake Embrey](https://github.com/blakeembrey) who reported and created the security patch.

For more details, see [GHSA-9wv6-86v2-598j](https://github.com/pillarjs/path-to-regexp/security/advisories/GHSA-9wv6-86v2-598j)

