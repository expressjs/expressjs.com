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

Termín _"production"_ znamená stav životného cyklu softvéru, kedy je aplikácia, alebo jej API, všeobecne prístupné koncovým používateľom. Naopak, termín _"development"_ znamená, že sa kód aktívne vyvíja a testuje a aplikácia nie je verejne prístupná. K tomu korešpondujúce systémové prostredia sa nazývajú _production_ resp. _development_ prostredie.

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

[Helmet](https://www.npmjs.com/package/helmet) môže pomôť ochrániť vašu aplikáciu voči niektorým, všeobecne známym zraniteľnostiam pomocou správneho nastavenia HTTP hlavičiek.

Helmet je v skutočnosti len kolekcia deviatich menších middleware funkcií nastavujúcich HTTP hlavičky týkajúce sa bezpečnosti:

* [csp](https://github.com/helmetjs/csp) nastavuje `Content-Security-Policy` hlavičku, čím pomáha predchádzať cross-site scripting útokom a ďalším cross-site zraniteľnostiam.
* [hidePoweredBy](https://github.com/helmetjs/hide-powered-by) odstraňuje `X-Powered-By` hlavičku.
* [hpkp](https://github.com/helmetjs/hpkp) nastavuje [Public Key Pinning](https://developer.mozilla.org/en-US/docs/Web/Security/Public_Key_Pinning) hlavičky, čím predchádza útokom typu man-in-the-middle so sfalšovanými certifikátmi.
* [hsts](https://github.com/helmetjs/hsts) nastavuje `Strict-Transport-Security` hlavičku čím si vynúti zabezpečené (HTTP over SSL/TLS) spojenie so serverom.
* [ieNoOpen](https://github.com/helmetjs/ienoopen) nastavuje hlavičku `X-Download-Options` pre IE8+.
* [noCache](https://github.com/helmetjs/nocache) nastavuje hlavičky `Cache-Control` a Pragma pre zakázanie client-side caching-u.
* [noSniff](https://github.com/helmetjs/dont-sniff-mimetype) nastavuje `X-Content-Type-Options` hlavičku, čím zabraňuje prehliadačom MIME-sniffing odpovede od deklaroveného content-type-u.
* [frameguard](https://github.com/helmetjs/frameguard) nastavuje `X-Frame-Options` hlavičku čim poskytuje ochranu pred [clickjacking](https://www.owasp.org/index.php/Clickjacking).
* [xssFilter](https://github.com/helmetjs/x-xss-protection) nastavuje `X-XSS-Protection` hlavičku čim povolí Cross-site scripting (XSS) filter vo väčšine najnovších prehliadačov.

Helmet nainštalujete rovnako, ako akýkoľvek iný modul:

<pre><code class="language-sh" translate="no">
$ npm install --save helmet
</code></pre>

Potom ho môžete použiť vo vašom kóde takto:

<pre><code class="language-javascript" translate="no">
...
var helmet = require('helmet');
app.use(helmet());
...
</code></pre>

### Určite aspoň zakážte X-Powered-By hlavičku

Ak nechcete použiť Helmet, potom určite aspoň zakážte `X-Powered-By` hlavičku. Útočník dokáže zneužiť túto hlavičku (ktorá je defaultne povolená) k detekcii Express aplikácií a následne vykonať špecifické typy útokov.

Preto sa odporúča, vypnúť túto hlavičku pomocou `app.disable()` metódy:

<pre><code class="language-javascript" translate="no">
app.disable('x-powered-by');
</code></pre>

V prípade, že použijete modul `helmet.js`, ten sa o to postará.

## Používajte cookies bezpečným spôsobom

Aby ste sa uistili, že cookies nepredstavujú zraniteľnosť vašej aplikácie, nepoužívajte pre session cookie defaultný názov a nastavte správne security parametre.

Pre prácu s cookie existujú dva hlavné middleware moduly:

* [express-session](https://www.npmjs.com/package/express-session), ktorý nahrádza `express.session` middleware vstavaný v Express 3.x.
* [cookie-session](https://www.npmjs.com/package/cookie-session), ktorý nahrádza `express.cookieSession` middleware vstavaný v Express 3.x.

Hlavným rozdielom medzi týmito modulmi je spôsob ukladania cookie session dát. [express-session](https://www.npmjs.com/package/express-session) middleware ukladá session dáta na servery; v samotnej cookie sa ukladá len session ID, nie session dáta.  Defaultne je použité ako úložisko pamäť, čo je nevhodné pre použitie v production prostredí. Tam budete musieť nastaviť škálovateľné session úložisko; pozrite sa na [compatible session stores](https://github.com/expressjs/session#compatible-session-stores).

[cookie-session](https://www.npmjs.com/package/cookie-session) middleware implementuje vlastné cookie-backed úložisko: serializuje celú session do cookie a nie len jej session ID. Použitie tejto implementácie sa odporúča v prípade, že sú session dáta relatívne malé a ľahko šifrovateĺné, ako jednoduché hodnoty (skôr než objekty). Hoci by prehliadače mali podporovať veľkosť cookie aspoň 4096 bytes, aby ste sa uistili, že nepresiahnete limit, nreprekračujte veľkosť 4093 bytes pre doménu. Taktiež si musíte uvedomiť, že cookie dáta budú na klientovi viditeľné, takže ak existuje dôvod, prečo by ste ich chceli uchovávať radšej zabezpečené a utajené, potom je lepšie použiť express-session modul.

### Nepoužívajte defaultný session cookie názov

Používaním defaultného názvu session cookie vystavujete aplikáciu možným útokom. Táto zraniteľnosť je podobná tej `X-Powered-By`: útočník dokáže zneužiť túto informáciu a vykonať cielené útoky.

Aby ste sa vyhli tomuto problému, použite generické názvy cookie; napr použitím [express-session](https://www.npmjs.com/package/express-session) middleware-u:

<pre><code class="language-javascript" translate="no">
var session = require('express-session');
app.set('trust proxy', 1) // trust first proxy
app.use( session({
   secret : 's3Cur3',
   name : 'sessionId',
  })
);
</code></pre>

### Nastavte cookie security parametre

Pre zlepšenie bezpečnosti nastavte nasledujúce cookie parametre:

* `secure` - zabezpečí, že prehliadač zašle cookie iba cez HTTPS.
* `httpOnly` - zabezpečí, že cookie bude poslaná iba cez HTTP(S), nie prostredníctvom JavaScript-u na klientovi, čím pomáha ochraňovať proti cross-site scripting útokom.
* `domain` - udáva doménu cookie; použite to k porovnaniu domény servera, na ktorom bola URL zavolaná. Ak sú zhodné, potom porovnajte ešte path atribút.
* `path` - udáva path pre cookie; použite to k porovnaniu path-u request-u. Ak sa spolu s domain parametrom zhodujú, tak cookie v requeste pošlite.
* `expires` - sa používa na nastavenie dátumu expirácie trvalých cookies.

Tu je príklad použitia [cookie-session](https://www.npmjs.com/package/cookie-session) middleware modulu:

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
