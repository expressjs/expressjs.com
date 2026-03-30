---
title: March 2026 Security Releases
description: Security releases for path-to-regexp have been published. We recommend that all users upgrade as soon as possible.
tags: security vulnerabilities
authors:
  - name: Ulises Gascon
    github: UlisesGascon
---

The Express team has released new patch versions of [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) addressing three regular expression denial of service vulnerabilities.

{% capture warning_content %}
We recommend upgrading to the latest version of path-to-regexp to secure your applications. If you have a `package-lock.json`, you can update the dependency by running:

```sh
npm update path-to-regexp
```
{% endcapture %}
{% include admonitions/warning.html content=warning_content %}

The following vulnerabilities have been addressed:

- [CVE-2026-4867 in path-to-regexp utility module (High)](#cve-2026-4867-in-path-to-regexp-utility-module-high)
- [CVE-2026-4926 in path-to-regexp utility module (High)](#cve-2026-4926-in-path-to-regexp-utility-module-high)
- [CVE-2026-4923 in path-to-regexp utility module (Medium)](#cve-2026-4923-in-path-to-regexp-utility-module-medium)

## CVE-2026-4867 in path-to-regexp utility module (High)

**[path-to-regexp](https://www.npmjs.com/package/path-to-regexp) versions `<= 0.1.12` are vulnerable to regular expression denial of service via multiple route parameters**

A bad regular expression is generated any time you have three or more parameters within a single segment, separated by something that is not a period. For example, `/:a-:b-:c`. The backtrack protection added in v0.1.12 only prevents ambiguity for two parameters. With three or more, the generated lookahead does not block single separator characters, causing catastrophic backtracking.

**Affected versions**: `<= 0.1.12`
**Patched version**: `>= 0.1.13`

For more details, see [GHSA-37ch-88jc-xwx2](https://github.com/pillarjs/path-to-regexp/security/advisories/GHSA-37ch-88jc-xwx2).

## CVE-2026-4926 in path-to-regexp utility module (High)

**[path-to-regexp](https://www.npmjs.com/package/path-to-regexp) versions `>= 8.0.0` are vulnerable to denial of service via sequential optional groups**

A bad regular expression is generated any time you have multiple sequential optional groups, such as `{a}{b}{c}:z`. The generated regex grows exponentially with the number of groups, causing denial of service. Avoid passing user-controlled input as route patterns.

**Affected versions**: `>= 8.0.0`
**Patched version**: `>= 8.4.0`

For more details, see [GHSA-j3q9-mxjg-w52f](https://github.com/pillarjs/path-to-regexp/security/advisories/GHSA-j3q9-mxjg-w52f).

## CVE-2026-4923 in path-to-regexp utility module (Medium)

**[path-to-regexp](https://www.npmjs.com/package/path-to-regexp) versions `>= 8.0.0, <= 8.3.0` are vulnerable to regular expression denial of service via multiple wildcards**

When using multiple wildcards combined with at least one parameter, a regular expression can be generated that is vulnerable to ReDoS. The second wildcard must be somewhere other than the end of the path. For example, `/*foo-*bar-:baz`.

**Affected versions**: `>= 8.0.0, <= 8.3.0`
**Patched version**: `>= 8.4.0`

For more details, see [GHSA-27v5-c462-wpq7](https://github.com/pillarjs/path-to-regexp/security/advisories/GHSA-27v5-c462-wpq7).

---

We recommend upgrading to the latest version of path-to-regexp to secure your applications.
