---
title: Sicherheitsspezifische Best Practices für Express-Anwendungen in Produktionsumgebungen
description: Discover crucial security best practices for Express apps in production, including using TLS, input validation, secure cookies, and preventing vulnerabilities.
---

# Best Practices in Produktionsumgebungen: Sicherheit

## Überblick

Der Begriff _"Produktion"_ bezieht sich auf die Phase im Softwarelebenszyklus, in der eine Anwendung oder API für Endbenutzer oder Verbraucher allgemein verfügbar ist. Im Gegensatz dazu wird in der Phase _"Entwicklung"_ noch aktiv Code geschrieben und getestet. Die Anwendung ist in dieser Phase noch nicht für externen Zugriff verfügbar. Die entsprechenden Systemumgebungen werden als _Produktionsumgebungen_ und _Entwicklungsumgebungen_ bezeichnet.

Entwicklungs- und Produktionsumgebungen werden in der Regel unterschiedlich konfiguriert und weisen deutliche Unterschiede bei den Anforderungen auf. Was in der Entwicklung funktioniert, muss in der Produktion nicht unbedingt akzeptabel sein. Beispiel: In einer Entwicklungsumgebung ist eine ausführliche Protokollierung von Fehlern für Debuggingzwecke sinnvoll. Dieselbe Vorgehensweise kann in einer Produktionsumgebung jedoch zu einem Sicherheitsproblem führen. In einer Entwicklungsumgebung müssen Sie sich keine Gedanken zu Themen wie Skalierbarkeit, Zuverlässigkeit und Leistung machen, während dies in einer Produktionsumgebung kritische Faktoren sind.

{% capture security-note %}

If you believe you have discovered a security vulnerability in Express, please see
[Security Policies and Procedures](/en/resources/contributing#security-policies-and-procedures).

{% endcapture %}

{% include admonitions/note.html content=security-note %}

In diesem Beitrag werden einige der Best Practices in Bezug auf das Thema Sicherheit für Express-Anwendungen behandelt, die in der Produktionsumgebung bereitgestellt werden.

- [Best Practices in Produktionsumgebungen: Sicherheit](#best-practices-in-produktionsumgebungen-sicherheit)
  - [Überblick](#überblick)
  - [Verwenden Sie keine veralteten oder anfälligen Versionen von Express](#verwenden-sie-keine-veralteten-oder-anfälligen-versionen-von-express)
  - [TLS verwenden](#tls-verwenden)
  - [Do not trust user input](#do-not-trust-user-input)
    - [Prevent open redirects](#prevent-open-redirects)
  - ["Helmet" verwenden](#helmet-verwenden)
  - [Reduce fingerprinting](#reduce-fingerprinting)
  - [Cookies sicher verwenden](#cookies-sicher-verwenden)
    - [Verwenden Sie nicht den standardmäßigen Namen des Sitzungscookies](#verwenden-sie-nicht-den-standardmäßigen-namen-des-sitzungscookies)
    - [Cookie-Sicherheitsoptionen festlegen](#cookie-sicherheitsoptionen-festlegen)
  - [Prevent brute-force attacks against authorization](#prevent-brute-force-attacks-against-authorization)
  - [Ensure your dependencies are secure](#ensure-your-dependencies-are-secure)
    - [Vermeiden Sie andere Schwachstellen](#vermeiden-sie-andere-schwachstellen)
  - [Weitere Überlegungen](#weitere-überlegungen)

## Verwenden Sie keine veralteten oder anfälligen Versionen von Express

Express 2.x und 3.x werden nicht mehr gepflegt. Sicherheits- und Leistungsprobleme in diesen Versionen werden nicht mehr behoben. Verwenden Sie diese Versionen nicht! Wenn Sie noch nicht auf Version 4 umgestellt haben, befolgen Sie die Anweisungen im [Migrationshandbuch](/{{ page.lang }}/guide/migrating-4.html).

Stellen Sie außerdem sicher, dass Sie keine anfälligen Express-Versionen verwenden, die auf der [Seite mit den Sicherheitsupdates](/{{ page.lang }}/advanced/security-updates.html) aufgelistet sind. Falls doch, führen Sie ein Update auf eines der stabileren Releases durch, bevorzugt das aktuelle Release.

## TLS verwenden

Wenn über Ihre Anwendung vertrauliche Daten bearbeitet oder übertragen werden, sollten Sie [Transport Layer Security](https://en.wikipedia.org/wiki/Transport_Layer_Security) (TLS) verwenden, um die Verbindung und die Daten zu schützen. Diese Technologie verschlüsselt Daten, bevor sie vom Client zum Server gesendet werden. Dadurch lassen sich einige gängige (und einfache) Hackerattacken vermeiden. Auch wenn Ajax- und POST-Anforderungen nicht sofort offensichtlich und in Browsern "versteckt" zu sein scheinen, ist deren Netzverkehr anfällig für das [Ausspionieren von Paketen](https://en.wikipedia.org/wiki/Packet_analyzer) und [Man-in-the-Middle-Attacken](https://en.wikipedia.org/wiki/Man-in-the-middle_attack).

Möglicherweise sind Sie mit SSL-Verschlüsselung (Secure Socket Layer) bereits vertraut. [TLS ist einfach der nächste Entwicklungsschritt bei SSL](<https://msdn.microsoft.com/en-us/library/windows/desktop/aa380515(v=vs.85).aspx>). In anderen Worten: Wenn Sie bisher SSL verwendet haben, sollten Sie ein Upgrade auf TLS in Erwägung ziehen. Generell empfehlen wir für TLS den Nginx-Server. Eine gute Referenz zum Konfigurieren von TLS auf Nginx (und anderen Servern) ist [Empfohlene Serverkonfigurationen (Mozilla Wiki)](https://wiki.mozilla.org/Security/Server_Side_TLS#Recommended_Server_Configurations).

Ein handliches Tool zum Abrufen eines kostenloses TLS-Zertifikats ist außerdem [Let's Encrypt](https://letsencrypt.org/about/), eine kostenlose, automatisierte und offene Zertifizierungsstelle der [Internet Security Research Group (ISRG)](https://letsencrypt.org/isrg/).

## Do not trust user input

For web applications, one of the most critical security requirements is proper user input validation and handling. This comes in many forms and we will not cover all of them here.
Ultimately, the responsibility for validating and correctly handling the types of user input your application accepts is yours.

### Prevent open redirects

An example of potentially dangerous user input is an _open redirect_, where an application accepts a URL as user input (often in the URL query, for example `?url=https://example.com`) and uses `res.redirect` to set the `location` header and
return a 3xx status.

An application must validate that it supports redirecting to the incoming URL to avoid sending users to malicious links such as phishing websites, among other risks.

Here is an example of checking URLs before using `res.redirect` or `res.location`:

```js
app.use((req, res) => {
  try {
    if (new Url(req.query.url).host !== 'example.com') {
      return res.status(400).end(`Unsupported redirect to host: ${req.query.url}`);
    }
  } catch (e) {
    return res.status(400).end(`Invalid url: ${req.query.url}`);
  }
  res.redirect(req.query.url);
});
```

## "Helmet" verwenden

[Helmet](https://www.npmjs.com/package/helmet) kann beim Schutz Ihrer Anwendung gegen einige gängige Schwachstellen hilfreiche Dienste leisten, indem die HTTP-Header entsprechend konfiguriert werden.

Helmet is a middleware function that sets security-related HTTP response headers. Helmet sets the following headers by default:

- `Content-Security-Policy`: A powerful allow-list of what can happen on your page which mitigates many attacks
- `Cross-Origin-Opener-Policy`: Helps process-isolate your page
- `Cross-Origin-Resource-Policy`: Blocks others from loading your resources cross-origin
- `Origin-Agent-Cluster`: Changes process isolation to be origin-based
- `Referrer-Policy`: Controls the [`Referer`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer) header
- `Strict-Transport-Security`: Tells browsers to prefer HTTPS
- `X-Content-Type-Options`: Avoids [MIME sniffing](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#mime_sniffing)
- `X-DNS-Prefetch-Control`: Controls DNS prefetching
- `X-Download-Options`: Forces downloads to be saved (Internet Explorer only)
- `X-Frame-Options`: Legacy header that mitigates [Clickjacking](https://en.wikipedia.org/wiki/Clickjacking) attacks
- `X-Permitted-Cross-Domain-Policies`: Controls cross-domain behavior for Adobe products, like Acrobat
- `X-Powered-By`: Info about the web server. Removed because it could be used in simple attacks
- `X-XSS-Protection`: Legacy header that tries to mitigate [XSS attacks](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting), but makes things worse, so Helmet disables it

Each header can be configured or disabled. To read more about it please go to [its documentation website][helmet].

Installieren Sie "Helmet" wie alle anderen Module:

```bash
$ npm install helmet
```

So verwenden Sie "Helmet" in Ihrem Code:

```js
// ...

const helmet = require('helmet');
app.use(helmet());

// ...
```

## Reduce fingerprinting

It can help to provide an extra layer of security to reduce the ability of attackers to determine
the software that a server uses, known as "fingerprinting." Though not a security issue itself,
reducing the ability to fingerprint an application improves its overall security posture.
Server software can be fingerprinted by quirks in how it responds to specific requests, for example in
the HTTP response headers.

Ein bewährtes Verfahren ist also, diesen Header mit der Methode `app.disable()` zu deaktivieren:

```js
app.disable('x-powered-by');
```

{% capture powered-advisory %}

Disabling the `X-Powered-By header` does not prevent
a sophisticated attacker from determining that an app is running Express. It may
discourage a casual exploit, but there are other ways to determine an app is running
Express.

{% endcapture %}

{% include admonitions/note.html content=powered-advisory %}

Express also sends its own formatted "404 Not Found" messages and formatter error
response messages. These can be changed by
[adding your own not found handler](/en/starter/faq#how-do-i-handle-404-responses)
and
[writing your own error handler](/en/guide/error-handling#writing-error-handlers):

```js
// last app.use calls right before app.listen():

// custom 404
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

// custom error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

## Cookies sicher verwenden

Um sicherzustellen, dass Cookies Ihre Anwendung nicht für Angriffsmöglichkeiten öffnen, sollten Sie den standardmäßigen Namen des Sitzungscookies nicht verwenden und die Cookie-Sicherheitsoptionen entsprechend festlegen.

Es gibt zwei wesentliche Middleware-Cookie-Sitzungsmodule:

- [express-session](https://www.npmjs.com/package/express-session), das in Express 3.x integrierte `express.session`-Middleware ersetzt.
- [cookie-session](https://www.npmjs.com/package/cookie-session), das in Express 3.x integrierte `express.cookieSession`-Middleware ersetzt.

Der Hauptunterschied zwischen diesen beiden Modulen liegt darin, wie die Cookie-Sitzungsdaten gespeichert werden. Die [express-session](https://www.npmjs.com/package/express-session)-Middleware speichert Sitzungsdaten auf dem Server. Sie speichert nur die Sitzungs-ID im Cookie und nicht die Sitzungsdaten. Standardmäßig wird dabei der speicherinterne Speicher verwendet. Eine Verwendung der Middleware in der Produktionsumgebung ist nicht vorgesehen. In der Produktionsumgebung müssen Sie einen skalierbaren "Session-Store" einrichten. Siehe hierzu die Liste der [kompatiblen Session-Stores](https://github.com/expressjs/session#compatible-session-stores).

Im Gegensatz dazu implementiert die [cookie-session](https://www.npmjs.com/package/cookie-session)-Middleware cookiegestützten Speicher: Sie serialisiert die gesamte Sitzung zum Cookie und nicht nur einen Sitzungsschlüssel. Diese Middleware sollten Sie nur verwenden, wenn Sitzungsdaten relativ klein sind und einfach als primitive Werte (und nicht als Objekte) codiert sind. Auch wenn Browser mindestens 4096 Byte pro Cookie unterstützen sollten, müssen Sie sicherstellen, dass dieses Limit nicht überschritten wird. Überschreiten Sie auf keinen Fall die Größe von 4093 Byte pro Domäne. Achten Sie zudem darauf, dass die Cookiedaten für den Client sichtbar sind. Wenn also ein Grund vorliegt, die Daten sicher oder unkenntlich zu machen, ist "express-session" möglicherweise die bessere Wahl.

### Verwenden Sie nicht den standardmäßigen Namen des Sitzungscookies

Die Verwendung des standardmäßigen Namens des Sitzungscookies kann Ihre Anwendung anfällig für Attacken machen. Das mögliche Sicherheitsproblem ist vergleichbar mit `X-Powered-By`: ein potenzieller Angreifer kann diesen Header verwenden, um einen elektronischen Fingerabdruck des Servers zu erstellen und Attacken entsprechend zu platzieren.

Über [noSniff](https://github.com/helmetjs/dont-sniff-mimetype) werden `X-Content-Type-Options`-Header festgelegt, um bei Browsern MIME-Sniffing von Antworten weg vom deklarierten Inhaltstyp (declared content-type) vorzubeugen.

```js
const session = require('express-session');
app.set('trust proxy', 1); // trust first proxy
app.use(
  session({
    secret: 's3Cur3',
    name: 'sessionId',
  })
);
```

### Cookie-Sicherheitsoptionen festlegen

Legen Sie die folgenden Cookieoptionen fest, um die Sicherheit zu erhöhen:

- `secure` - Stellt sicher, dass der Browser das Cookie nur über HTTPS sendet.
- `httpOnly` - Stellt sicher, dass das Cookie nur über HTTP(S) und nicht über das Client-JavaScript gesendet wird und dadurch Schutz gegen Cross-Site Scripting-Attacken besteht.
- `domain` - Gibt die Domäne des Cookies an, die für den Vergleich mit der Domäne des Servers verwendet wird, in der die URL angefordert wird. Stimmen diese beiden überein, müssen Sie das Pfadattribut überprüfen.
- `path` - Gibt den Pfad des Cookies an, der für den Vergleich mit dem Anforderungspfad verwendet wird. Wenn dieser Pfad und die Domäne übereinstimmen, können Sie das Cookie in der Anforderung senden.
- `expires` - Wird verwendet, um das Ablaufdatum für persistente Cookies festzulegen.

Dies ist ein Beispiel zur Verwendung der [cookie-session](https://www.npmjs.com/package/cookie-session)-Middleware:

```js
const session = require('cookie-session');
const express = require('express');
const app = express();

const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
app.use(
  session({
    name: 'session',
    keys: ['key1', 'key2'],
    cookie: {
      secure: true,
      httpOnly: true,
      domain: 'example.com',
      path: 'foo/bar',
      expires: expiryDate,
    },
  })
);
```

## Prevent brute-force attacks against authorization

Make sure login endpoints are protected to make private data more secure.

A simple and powerful technique is to block authorization attempts using two metrics:

1. The number of consecutive failed attempts by the same user name and IP address.
2. The number of failed attempts from an IP address over some long period of time. For example, block an IP address if it makes 100 failed attempts in one day.

[rate-limiter-flexible](https://github.com/animir/node-rate-limiter-flexible) package provides tools to make this technique easy and fast. You can find [an example of brute-force protection in the documentation](https://github.com/animir/node-rate-limiter-flexible/wiki/Overall-example#login-endpoint-protection)

## Ensure your dependencies are secure

Using npm to manage your application's dependencies is powerful and convenient. But the packages that you use may contain critical security vulnerabilities that could also affect your application. The security of your app is only as strong as the "weakest link" in your dependencies.

Since npm@6, npm automatically reviews every install request. Also, you can use `npm audit` to analyze your dependency tree.

```bash
$ npm audit
```

If you want to stay more secure, consider [Snyk](https://snyk.io/).

Snyk offers both a [command-line tool](https://www.npmjs.com/package/snyk) and a [Github integration](https://snyk.io/docs/github) that checks your application against [Snyk's open source vulnerability database](https://snyk.io/vuln/) for any known vulnerabilities in your dependencies. Install the CLI as follows:

```bash
$ npm install -g snyk
$ cd your-app
```

Use this command to test your application for vulnerabilities:

```bash
$ snyk test
```

### Vermeiden Sie andere Schwachstellen

Achten Sie auf [Node Security Project](https://npmjs.com/advisories)-Empfehlungen, die Express oder andere Module, die Ihre Anwendung nutzt, beeinträchtigen können. Im Allgemeinen ist Node Security Project aber eine exzellente Ressource mit Wissen und Tools zur Sicherheit von Node.

Letztendlich können Express-Anwendungen – wie viele andere Webanwendungen auch – anfällig für eine Vielzahl webbasierter Attacken sein. Machen Sie sich deshalb mit bekannten [webspezifischen Schwachstellen](https://www.owasp.org/www-project-top-ten/) vertraut und treffen Sie die geeigneten Vorkehrungen, um diese zu vermeiden.

## Weitere Überlegungen

Dies sind einige weitere Empfehlungen aus der hervorragenden [Node.js Security Checklist](https://blog.risingstack.com/node-js-security-checklist/). In diesem Blogbeitrag finden Sie alle Details zu diesen Empfehlungen:

- Filtern und bereinigen Sie immer Benutzereingaben, um sich gegen XS-Angriffe (Cross-Site Scripting) und Befehlsinjektionsattacken zu schützen.
- Implementieren Sie Verteidungsmaßnahmen gegen SQL-Injection-Attacken, indem sie parametrisierte Abfragen oder vorbereitete Anweisungen einsetzen.
- Nutzen Sie das Open-Source-Tool [sqlmap](http://sqlmap.org/), um SQL-Injection-Schwachstellen in Ihrer Anwendung zu erkennen.
- Verwenden Sie die Tools [nmap](https://nmap.org/) und [sslyze](https://github.com/nabla-c0d3/sslyze), um die Konfiguration Ihrer SSL-Verschlüsselungen, -Schlüssel und Neuvereinbarungen sowie die Gültigkeit Ihres Zertifikats zu testen.
- Verwenden Sie [safe-regex](https://www.npmjs.com/package/safe-regex), um sicherzustellen, dass Ihre regulären Ausdrücke nicht für [Denial-of-Service-Attacken](https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS) anfällig sind.

[helmet]: <Wenn Sie `helmet.js` verwenden, kümmert sich das Tool darum.>
