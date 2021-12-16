---
layout: page
title: Sicherheitsspezifische Best Practices für Express-Anwendungen in Produktionsumgebungen
menu: advanced
lang: de
---

# Best Practices in Produktionsumgebungen: Sicherheit

## Überblick

Der Begriff *"Produktion"* bezieht sich auf die Phase im Softwarelebenszyklus, in der eine Anwendung oder API für Endbenutzer oder Verbraucher allgemein verfügbar ist. Im Gegensatz dazu wird in der Phase *"Entwicklung"* noch aktiv Code geschrieben und getestet. Die Anwendung ist in dieser Phase noch nicht für externen Zugriff verfügbar. Die entsprechenden Systemumgebungen werden als *Produktionsumgebungen* und *Entwicklungsumgebungen* bezeichnet.

Entwicklungs- und Produktionsumgebungen werden in der Regel unterschiedlich konfiguriert und weisen deutliche Unterschiede bei den Anforderungen auf. Was in der Entwicklung funktioniert, muss in der Produktion nicht unbedingt akzeptabel sein. Beispiel: In einer Entwicklungsumgebung ist eine ausführliche Protokollierung von Fehlern für Debuggingzwecke sinnvoll. Dieselbe Vorgehensweise kann in einer Produktionsumgebung jedoch zu einem Sicherheitsproblem führen. In einer Entwicklungsumgebung müssen Sie sich keine Gedanken zu Themen wie Skalierbarkeit, Zuverlässigkeit und Leistung machen, während dies in einer Produktionsumgebung kritische Faktoren sind.

In diesem Beitrag werden einige der Best Practices in Bezug auf das Thema Sicherheit für Express-Anwendungen behandelt, die in der Produktionsumgebung bereitgestellt werden.

## Verwenden Sie keine veralteten oder anfälligen Versionen von Express

Express 2.x und 3.x werden nicht mehr gepflegt. Sicherheits- und Leistungsprobleme in diesen Versionen werden nicht mehr behoben. Verwenden Sie diese Versionen nicht! Wenn Sie noch nicht auf Version 4 umgestellt haben, befolgen Sie die Anweisungen im [Migrationshandbuch](/{{ page.lang }}/guide/migrating-4.html).

Stellen Sie außerdem sicher, dass Sie keine anfälligen Express-Versionen verwenden, die auf der [Seite mit den Sicherheitsupdates](/{{ page.lang }}/advanced/security-updates.html) aufgelistet sind. Falls doch, führen Sie ein Update auf eines der stabileren Releases durch, bevorzugt das aktuelle Release.

## TLS verwenden

Wenn über Ihre Anwendung vertrauliche Daten bearbeitet oder übertragen werden, sollten Sie [Transport Layer Security](https://en.wikipedia.org/wiki/Transport_Layer_Security) (TLS) verwenden, um die Verbindung und die Daten zu schützen. Diese Technologie verschlüsselt Daten, bevor sie vom Client zum Server gesendet werden. Dadurch lassen sich einige gängige (und einfache) Hackerattacken vermeiden. Auch wenn Ajax- und POST-Anforderungen nicht sofort offensichtlich und in Browsern "versteckt" zu sein scheinen, ist deren Netzverkehr anfällig für das [Ausspionieren von Paketen](https://en.wikipedia.org/wiki/Packet_analyzer) und [Man-in-the-Middle-Attacken](https://en.wikipedia.org/wiki/Man-in-the-middle_attack).

Möglicherweise sind Sie mit SSL-Verschlüsselung (Secure Socket Layer) bereits vertraut. [TLS ist einfach der nächste Entwicklungsschritt bei SSL](https://msdn.microsoft.com/en-us/library/windows/desktop/aa380515(v=vs.85).aspx). In anderen Worten: Wenn Sie bisher SSL verwendet haben, sollten Sie ein Upgrade auf TLS in Erwägung ziehen. Generell empfehlen wir für TLS den Nginx-Server. Eine gute Referenz zum Konfigurieren von TLS auf Nginx (und anderen Servern) ist [Empfohlene Serverkonfigurationen (Mozilla Wiki)](https://wiki.mozilla.org/Security/Server_Side_TLS#Recommended_Server_Configurations).

Ein handliches Tool zum Abrufen eines kostenloses TLS-Zertifikats ist außerdem [Let's Encrypt](https://letsencrypt.org/about/), eine kostenlose, automatisierte und offene Zertifizierungsstelle der [Internet Security Research Group (ISRG)](https://letsencrypt.org/isrg/).

## "Helmet" verwenden

[Helmet](https://www.npmjs.com/package/helmet) kann beim Schutz Ihrer Anwendung gegen einige gängige Schwachstellen hilfreiche Dienste leisten, indem die HTTP-Header entsprechend konfiguriert werden.

"Helmet" ist eine Ansammlung von neun kleineren Middlewarefunktionen, über die sicherheitsrelevante HTTP-Header festgelegt werden.

* Über [csp](https://github.com/helmetjs/csp) wird der `Content-Security-Policy`-Header festgelegt, um Cross-Site Scripting-Attacken und anderen standortübergreifenden Injektionen vorzubeugen.
* Über [hidePoweredBy](https://github.com/helmetjs/hide-powered-by) wird der `X-Powered-By`-Header entfernt.
* Über [hsts](https://github.com/helmetjs/hsts) werden `Strict-Transport-Security`-Header festgelegt, über die sichere (HTTP over SSL/TLS) Verbindungen zum Server durchgesetzt werden.
* Über [ieNoOpen](https://github.com/helmetjs/ienoopen) werden `X-Download-Options`-Header für IE8+ festgelegt.
* Über [noCache](https://github.com/helmetjs/nocache) werden `Cache-Control`- und Pragma-Header festgelegt, um clientseitiges Caching zu deaktivieren.
* Über [noSniff](https://github.com/helmetjs/dont-sniff-mimetype) werden `X-Content-Type-Options`-Header festgelegt, um bei Browsern MIME-Sniffing von Antworten weg vom deklarierten Inhaltstyp (declared content-type) vorzubeugen.
* Über [frameguard](https://github.com/helmetjs/frameguard) wird der `X-Frame-Options`-Header festgelegt, um [Clickjacking](https://www.owasp.org/index.php/Clickjacking)-Schutz zu gewährleisten.
* Über [xssFilter](https://github.com/helmetjs/x-xss-protection) werden `X-XSS-Protection`-Header festgelegt, um XSS-Filter (Cross-site Scripting) in den meisten aktuellen Web-Browsern zu aktivieren.

Installieren Sie "Helmet" wie alle anderen Module:

```console
$ npm install --save helmet
```

So verwenden Sie "Helmet" in Ihrem Code:

<pre>
<code class="language-javascript" translate="no">
...
var helmet = require('helmet');
app.use(helmet());
...
</code>
</pre>

### Deaktivieren Sie mindestens den X-Powered-By-Header

Wenn Sie "Helmet" nicht verwenden wollen, sollten Sie mindestens den `X-Powered-By`-Header deaktivieren. Angreifer können diesen Header (der standardmäßig aktiviert ist) zum Erkennen von Anwendungen mit Express verwenden und dann gezielte Attacken in die Wege leiten.

Ein bewährtes Verfahren ist also, diesen Header mit der Methode `app.disable()` zu deaktivieren:

<pre>
<code class="language-javascript" translate="no">
app.disable('x-powered-by');
</code>
</pre>

Wenn Sie `helmet.js` verwenden, kümmert sich das Tool darum.

## Cookies sicher verwenden

Um sicherzustellen, dass Cookies Ihre Anwendung nicht für Angriffsmöglichkeiten öffnen, sollten Sie den standardmäßigen Namen des Sitzungscookies nicht verwenden und die Cookie-Sicherheitsoptionen entsprechend festlegen.

Es gibt zwei wesentliche Middleware-Cookie-Sitzungsmodule:

* [express-session](https://www.npmjs.com/package/express-session), das in Express 3.x integrierte `express.session`-Middleware ersetzt.
* [cookie-session](https://www.npmjs.com/package/cookie-session), das in Express 3.x integrierte `express.cookieSession`-Middleware ersetzt.

Der Hauptunterschied zwischen diesen beiden Modulen liegt darin, wie die Cookie-Sitzungsdaten gespeichert werden. Die [express-session](https://www.npmjs.com/package/express-session)-Middleware speichert Sitzungsdaten auf dem Server. Sie speichert nur die Sitzungs-ID im Cookie und nicht die Sitzungsdaten. Standardmäßig wird dabei der speicherinterne Speicher verwendet. Eine Verwendung der Middleware in der Produktionsumgebung ist nicht vorgesehen. In der Produktionsumgebung müssen Sie einen skalierbaren "Session-Store" einrichten. Siehe hierzu die Liste der [kompatiblen Session-Stores](https://github.com/expressjs/session#compatible-session-stores).

Im Gegensatz dazu implementiert die [cookie-session](https://www.npmjs.com/package/cookie-session)-Middleware cookiegestützten Speicher: Sie serialisiert die gesamte Sitzung zum Cookie und nicht nur einen Sitzungsschlüssel. Diese Middleware sollten Sie nur verwenden, wenn Sitzungsdaten relativ klein sind und einfach als primitive Werte (und nicht als Objekte) codiert sind. Auch wenn Browser mindestens 4096 Byte pro Cookie unterstützen sollten, müssen Sie sicherstellen, dass dieses Limit nicht überschritten wird. Überschreiten Sie auf keinen Fall die Größe von 4093 Byte pro Domäne. Achten Sie zudem darauf, dass die Cookiedaten für den Client sichtbar sind. Wenn also ein Grund vorliegt, die Daten sicher oder unkenntlich zu machen, ist "express-session" möglicherweise die bessere Wahl.

### Verwenden Sie nicht den standardmäßigen Namen des Sitzungscookies

Die Verwendung des standardmäßigen Namens des Sitzungscookies kann Ihre Anwendung anfällig für Attacken machen. Das mögliche Sicherheitsproblem ist vergleichbar mit `X-Powered-By`: ein potenzieller Angreifer kann diesen Header verwenden, um einen elektronischen Fingerabdruck des Servers zu erstellen und Attacken entsprechend zu platzieren.

Dieses Problem lässt sich vermeiden, wenn Sie allgemeine Cookienamen verwenden; z. B. durch Verwendung der [express-session](https://www.npmjs.com/package/express-session)-Middleware:

<pre>
<code class="language-javascript" translate="no">
var session = require('express-session');
app.set('trust proxy', 1) // trust first proxy
app.use( session({
   secret : 's3Cur3',
   name : 'sessionId',
  })
);
</code>
</pre>

### Cookie-Sicherheitsoptionen festlegen

Legen Sie die folgenden Cookieoptionen fest, um die Sicherheit zu erhöhen:

* `secure` - Stellt sicher, dass der Browser das Cookie nur über HTTPS sendet.
* `httpOnly` - Stellt sicher, dass das Cookie nur über HTTP(S) und nicht über das Client-JavaScript gesendet wird und dadurch Schutz gegen Cross-Site Scripting-Attacken besteht.
* `domain` - Gibt die Domäne des Cookies an, die für den Vergleich mit der Domäne des Servers verwendet wird, in der die URL angefordert wird. Stimmen diese beiden überein, müssen Sie das Pfadattribut überprüfen.
* `path` - Gibt den Pfad des Cookies an, der für den Vergleich mit dem Anforderungspfad verwendet wird. Wenn dieser Pfad und die Domäne übereinstimmen, können Sie das Cookie in der Anforderung senden.
* `expires` - Wird verwendet, um das Ablaufdatum für persistente Cookies festzulegen.

Dies ist ein Beispiel zur Verwendung der [cookie-session](https://www.npmjs.com/package/cookie-session)-Middleware:

<pre>
<code class="language-javascript" translate="no">
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
</code>
</pre>

## Weitere Überlegungen

Dies sind einige weitere Empfehlungen aus der hervorragenden [Node.js Security Checklist](https://blog.risingstack.com/node-js-security-checklist/).  In diesem Blogbeitrag finden Sie alle Details zu diesen Empfehlungen:

* Implementieren Sie Rate-Limiting, um Brute-Force-Attacken gegen Authentifizierungen zu verhindern. Hierfür können Sie beispielsweise das [StrongLoop API Gateway](https://strongloop.com/node-js/api-gateway/) verwenden, um eine Rate-Limiting-Richtlinie durchzusetzen. Alternativ können Sie eine Middleware wie [express-limiter](https://www.npmjs.com/package/express-limiter) verwenden. Hierzu müssen Sie jedoch Ihren Code etwas modifizieren.
* Verwenden Sie die [csurf](https://www.npmjs.com/package/csurf)-Middleware, um CSRF-Attacken (Cross-Site Request Forgery) vorzubeugen.
* Filtern und bereinigen Sie immer Benutzereingaben, um sich gegen XS-Angriffe (Cross-Site Scripting) und Befehlsinjektionsattacken zu schützen.
* Implementieren Sie Verteidungsmaßnahmen gegen SQL-Injection-Attacken, indem sie parametrisierte Abfragen oder vorbereitete Anweisungen einsetzen.
* Nutzen Sie das Open-Source-Tool [sqlmap](http://sqlmap.org/), um SQL-Injection-Schwachstellen in Ihrer Anwendung zu erkennen.
* Verwenden Sie die Tools [nmap](https://nmap.org/) und [sslyze](https://github.com/nabla-c0d3/sslyze), um die Konfiguration Ihrer SSL-Verschlüsselungen, -Schlüssel und Neuvereinbarungen sowie die Gültigkeit Ihres Zertifikats zu testen.
* Verwenden Sie [safe-regex](https://www.npmjs.com/package/safe-regex), um sicherzustellen, dass Ihre regulären Ausdrücke nicht für [Denial-of-Service-Attacken](https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS) anfällig sind.

## Vermeiden Sie andere Schwachstellen

Achten Sie auf [Node Security Project](https://npmjs.com/advisories)-Empfehlungen, die Express oder andere Module, die Ihre Anwendung nutzt, beeinträchtigen können. Im Allgemeinen ist Node Security Project aber eine exzellente Ressource mit Wissen und Tools zur Sicherheit von Node.

Letztendlich können Express-Anwendungen – wie viele andere Webanwendungen auch – anfällig für eine Vielzahl webbasierter Attacken sein. Machen Sie sich deshalb mit bekannten [webspezifischen Schwachstellen](https://www.owasp.org/index.php/Top_10_2013-Top_10) vertraut und treffen Sie die geeigneten Vorkehrungen, um diese zu vermeiden.
