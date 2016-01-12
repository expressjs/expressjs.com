---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Security - Osvedčené postupy pre Express v produkcii
menu: advanced
lang: sk
redirect_from: "/advanced/best-practice-security.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

# Security - Osvedčené postupy pre Express v produkcii

## Prehľad

Termín _"production"_ znamená stav životného cyklu softvéru, kedy je aplikácia alebo API všeobecne prístupné koncovým používateľom. Naopak, termín _"development"_ znamená, že sa kód aktívne vyvíja a testuje a aplikácia nieje verejne prístupná. K tomu korešpondujúce systémové prostredia sa nazývajú _production_ resp. _development_ prostredie.

Development a production prostredia sú zvyčajne nakonfigurované odlišne a majú často diametrálne odlišné požiadavky. Čo je povolené v developmente nemusí byť akceptovateľné v produkcii. Napr., v development prostredí môžete chcieť logovať maximum error-ov pre debugovanie, ale takéto správananie systému môže byť považované za security problém v prípade production prostredia. V prípade development-u sa často nemusíte starať o veci ako sú škálovateľnosť, spoľahlivosť a výkonnosť, kým v produkcii sa tieto veci považujú za kritické.

Tento článok diskutuje niektoré osvedčené postupy z pohľadu security Express aplikácií v produkcii.

**POZN.**: Ak si myslíte, že ste objavili security vulnerabilitu Express-u, prosím pozrite si
[Security Policies and Procedures](https://github.com/strongloop/express/blob/master/Security.md).

## Nepoužívajte deprecated a vulnerable verzie Express-u

Express 2.x a 3.x už nie sú viacej udržované. Security a performance problémy v týchto verziách už nik neopravuje. Preto ich nepoužívajte!  Ak ste vaše Express aplikácie ešte nezmigrovali na verziu 4, postupujte podľa príručky [Prechod na Express 4](/{{ page.lang }}/guide/migrating-4.html).

Taktiež sa uistite, že nepoužívate žiadnu z vulnerable Express verzií nachádzajúcu sa na stránke [Security - aktualizácie](/{{ page.lang }}/advanced/security-updates.html). Ak áno, updatnite vašu aplikáciu na niektorú zo stabilných verzií, ideálne na najnovšiu.

## Používajte TLS

Ak vaša aplikácia pracuje alebo prenáša citlivé dáta, použivajte pre zabepečenie spojenia a dát [Transport Layer Security](https://en.wikipedia.org/wiki/Transport_Layer_Security) (TLS). Táto technológia šifruje dáta ich pred odoslaním z klienta na server, čím predchádza niektorým bežným (a jednoduchým) útokom. Hoci Ajax a POST requesty nemusia byť viditeľné a zdajú sa skruté v prehliadači, ich network traffic je vulnerable na [packet sniffing](https://en.wikipedia.org/wiki/Packet_analyzer) a [man-in-the-middle attacks](https://en.wikipedia.org/wiki/Man-in-the-middle_attack).

Možno ste sa už stretli s Secure Socket Layer (SSL) šifrovaním. [TLS je ďalšou modifikáciou SSL](https://msdn.microsoft.com/en-us/library/windows/desktop/aa380515(v=vs.85).aspx). Inými slovami, ak ste predtým používali SSL, zvážte upgrade na TLS. Vo všeobecnosti odporúčame pre handlovanie TLS použivať Nginx. Ako dobrú referenciu ako nakonfigurovať TLS na Ngix-e (a ďalších serveroch) sa pozrite na [Recommended Server Configurations (Mozilla Wiki)](https://wiki.mozilla.org/Security/Server_Side_TLS#Recommended_Server_Configurations).

Taktiež sa vám môže hodiť tento nástroj [Let's Encrypt](https://letsencrypt.org/about/), pomocou ktorého môžete získať TLS certifikát zdarma. Je voľnou, automatizovanou a otvorenou certifikačnou authoritov (CA) prevádzkovanou [Internet Security Research Group (ISRG)](https://letsencrypt.org/isrg/).

## Používajte Helmet

[Helmet](https://www.npmjs.com/package/helmet) can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.

Helmet is actually just a collection of nine smaller middleware functions that set security-related HTTP headers:

* [csp](https://github.com/helmetjs/csp) sets the `Content-Security-Policy` header to help prevent cross-site scripting attacks and other cross-site injections.
* [hidePoweredBy](https://github.com/helmetjs/hide-powered-by) removes the `X-Powered-By` header.
* [hpkp](https://github.com/helmetjs/hpkp) Adds [Public Key Pinning](https://developer.mozilla.org/en-US/docs/Web/Security/Public_Key_Pinning) headers to prevent man-in-the-middle attacks with forged certificates.
* [hsts](https://github.com/helmetjs/hsts) sets `Strict-Transport-Security` header that enforces secure (HTTP over SSL/TLS) connections to the server.
* [ieNoOpen](https://github.com/helmetjs/ienoopen) sets `X-Download-Options` for IE8+.
* [noCache](https://github.com/helmetjs/nocache) sets `Cache-Control` and Pragma headers to disable client-side caching.
* [noSniff](https://github.com/helmetjs/dont-sniff-mimetype) sets `X-Content-Type-Options` to prevent browsers from MIME-sniffing a response away from the declared content-type.
* [frameguard](https://github.com/helmetjs/frameguard) sets the `X-Frame-Options` header to provide [clickjacking](https://www.owasp.org/index.php/Clickjacking) protection.
* [xssFilter](https://github.com/helmetjs/x-xss-protection) sets `X-XSS-Protection` to enable the Cross-site scripting (XSS) filter in most recent web browsers.

Install Helmet like any other module:

<pre><code class="language-sh" translate="no">
$ npm install --save helmet
</code></pre>

Then to use it in your code:

<pre><code class="language-javascript" translate="no">
...
var helmet = require('helmet');
app.use(helmet());
...
</code></pre>

### At a minimum, disable X-Powered-By header

If you don't want to use Helmet, then at least disable the `X-Powered-By` header.  Attackers can use this header (which is enabled by default) to detect apps running Express and then launch specifically-targeted attacks.

So, best practice is to to turn off the header with the `app.disable()` method:

<pre><code class="language-javascript" translate="no">
app.disable('x-powered-by');
</code></pre>

If you use `helmet.js`, it takes care of this for you.

## Use cookies securely

To ensure cookies don't open your app to exploits, don't use the default session cookie name and set cookie security options appropriately.

There are two main middleware cookie session modules:

* [express-session](https://www.npmjs.com/package/express-session) that replaces `express.session` middleware built-in to Express 3.x.
* [cookie-session](https://www.npmjs.com/package/cookie-session) that replaces `express.cookieSession` middleware built-in to Express 3.x.

The main difference between these two modules is how they save cookie session data.  The [express-session](https://www.npmjs.com/package/express-session) middleware stores session data on the server; it only saves the session ID in the cookie itself, not session data.  By default, it uses in-memory storage and is not designed for a production environment.  In production, you'll need to set up a scalable session-store; see the list of [compatible session stores](https://github.com/expressjs/session#compatible-session-stores).

In contrast, [cookie-session](https://www.npmjs.com/package/cookie-session) middleware implements cookie-backed storage: it serializes the entire session to the cookie, rather than just a session key.  Only use it when session data is relatively small and easily encoded as primitive values (rather than objects).  Although browsers are supposed to support at least 4096 bytes per cookie, to ensure you don't exceed the limit, don't exceed a size of 4093 bytes per domain.  Also, be aware that the cookie data will be visible to the client, so if there is any reason to keep it secure or obscure, then express-session may be a better choice.

### Don't use the default session cookie name

Using the default session cookie name can open your app to attacks.  The security issue posed is similar to `X-Powered-By`: a potential attacker can use it to fingerprint the server and target attacks accordingly.

To avoid this problem, use generic cookie names; for example using [express-session](https://www.npmjs.com/package/express-session) middleware:

<pre><code class="language-javascript" translate="no">
var session = require('express-session');
app.set('trust proxy', 1) // trust first proxy
app.use( session({
   secret : 's3Cur3',
   name : 'sessionId',
  })
);
</code></pre>

### Set cookie security options

Set the following cookie options to enhance security:

* `secure` - Ensures the browser only sends the cookie over HTTPS.
* `httpOnly` - Ensures the cookie is sent only over HTTP(S), not client JavaScript, helping to protect against cross-site scripting attacks.
* `domain` - indicates the domain of the cookie; use it to compare against the domain of the server in which the URL is being requested. If they match, then check the path attribute next.
* `path` - indicates the path of the cookie; use it to compare against the request path. If this and domain match, then send the cookie in the request.
* `expires` - use to set expiration date for persistent cookies.

Here is an example using [cookie-session](https://www.npmjs.com/package/cookie-session) middleware:

<pre><code class="language-javascript" translate="no">
var session = require('cookie-session');
var express = require('express');
var app = express();

var expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // 1 hour
app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  cookie: { secure: true,
            httpOnly: true,
            domain: 'example.com',
            path: 'foo/bar',
            expires: expiryDate
          }
  })
);
</code></pre>

## Ensure your dependencies are secure

Using npm to manage your application's dependencies is powerful and convenient.  But the packages that you use may contain critical security vulnerabilities that could also affect your application.  The security of your app is only as strong as the "weakest link" in your dependencies.

Use either or both of the following two tools to help ensure the security of third-party packages that you use: [nsp](https://www.npmjs.com/package/nsp) and [requireSafe](https://requiresafe.com/).  These two tools do largely the same thing.

[nsp](https://www.npmjs.com/package/nsp) is a command-line tool that checks the [Node Security Project](https://nodesecurity.io/) vulnerability database to determine if your application uses packages with known vulnerabilities. Install it as follows:

<pre><code class="language-sh" translate="no">
$ npm i nsp -g
</code></pre>

Use this command to submit the `npm-shrinkwrap.json` file for validation to [nodesecurity.io](https://nodesecurity.io/):

<pre><code class="language-sh" translate="no">
$ nsp audit-shrinkwrap
</code></pre>

Use this command to submit the `package.json` file for validation to [nodesecurity.io](https://nodesecurity.io/):

<pre><code class="language-sh" translate="no">
$ nsp audit-package
</code></pre>

Here's how to use [requireSafe](https://requiresafe.com/) to audit your Node modules:

<pre><code class="language-sh" translate="no">
$ npm install -g requiresafe
$ cd your-app
$ requiresafe check
</code></pre>

## Additional considerations

Here are some further recommendations from the excellent [Node.js Security Checklist](https://blog.risingstack.com/node-js-security-checklist/).  Refer to that blog post for all the details on these recommendations:

* Implement rate-limiting to prevent brute-force attacks against authentication.  One way to do this is to use [StrongLoop API Gateway](https://strongloop.com/node-js/api-gateway/) to enforce a rate-limiting policy.  Alternatively, you can use middleware such as [express-limiter](https://www.npmjs.com/package/express-limiter), but doing so will require you to modify your code somewhat.
* Use [csurf](https://www.npmjs.com/package/csurf) middleware to protect against cross-site request forgery (CSRF).
* Always filter and sanitize user input to protect against cross-site scripting (XSS) and command injection attacks.
* Defend against SQL injection attacks by using parameterized queries or prepared statements.
* Use the open-source [sqlmap](http://sqlmap.org/) tool to detect SQL injection vulnerabilities in your app.
* Use the [nmap](https://nmap.org/) and [sslyze](https://github.com/nabla-c0d3/sslyze) tools to test the configuration of your SSL ciphers, keys, and renegotiation as well as the validity of your certificate.
* Use [safe-regex](https://www.npmjs.com/package/safe-regex) to ensure your regular expressions are not susceptible to [regular expression denial of service](https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS) attacks.

## Avoid other known vulnerabilities

Keep an eye out for [Node Security Project](https://nodesecurity.io/advisories) advisories that may affect Express or other modules that your app uses.  In general, the Node Security Project is an excellent resource for knowledge and tools about Node security.

Finally, Express apps - like any other web apps - can be vulnerable to a variety of web-based attacks. Familiarize yourself with known [web vulnerabilities](https://www.owasp.org/index.php/Top_10_2013-Top_10) and take precautions to avoid them.
