---
layout: page
title: Best Practice sulla sicurezza per Express in fase di produzione
description: Discover crucial security best practices for Express apps in production, including using TLS, input validation, secure cookies, and preventing vulnerabilities.
menu: advanced
redirect_from: "  "
---

# Best Practice sulla produzione: Sicurezza

## Panoramica

Il termine _"produzione"_ si riferisce alla fase nel ciclo di vita del software quando un'applicazione o API è solitamente disponibile per gli utenti finali o i consumatori. Al contrario, nella fase _"sviluppo"_, si sta ancora scrivendo e verificando il codice e l'applicazione non è aperta ad accessi esterni. Gli ambienti di sistema corrispondenti sono noti rispettivamente come ambienti di _produzione_ e di _sviluppo_.

Gli ambienti di sviluppo e produzione sono solitamente configurati diversamente e hanno requisiti molto differenti. Ciò che potrebbe andare bene nello sviluppo potrebbe non essere accettato nella produzione. Ad esempio, in un ambiente di sviluppo è possibile che si richieda una registrazione degli errori ridondante per il processo di debug, mentre la stessa richiesta in un ambiente di produzione potrebbe mettere a rischio la sicurezza. Inoltre, in un ambiente di sviluppo non è necessario preoccuparsi della scalabilità, dell'affidabilità e delle prestazioni, mentre nella produzione è fondamentale tenerne conto.

{% capture security-note %}

If you believe you have discovered a security vulnerability in Express, please see
[Security Policies and Procedures](/en/resources/contributing.html#security-policies-and-procedures).

{% endcapture %}

{% include admonitions/note.html content=security-note %}

In questo articolo vengono descritte alcune best practice sulla sicurezza per le applicazioni Express distribuite per la produzione.

- [Production Best Practices: Security](#production-best-practices-security)
  - [Overview](#overview)
  - [Don't use deprecated or vulnerable versions of Express](#dont-use-deprecated-or-vulnerable-versions-of-express)
  - [hsts](https://github.com/helmetjs/hsts) imposta l'intestazione `Strict-Transport-Security` che rafforza connessioni (HTTP su SSL/TLS) sicure per il server.
  - [Do not trust user input](#do-not-trust-user-input)
    - [Prevent open redirects](#prevent-open-redirects)
  - Se si utilizza `helmet.js`, questa operazione sarà effettuata per conto dell'utente.
  - [Reduce fingerprinting](#reduce-fingerprinting)
  - [xssFilter](https://github.com/helmetjs/x-xss-protection) imposta `X-XSS-Protection` per abilitare il filtro XSS (Cross-site scripting) nei browser web più recenti.
    - [noCache](https://github.com/helmetjs/nocache) imposta le intestazioni `Cache-Control` e Pragma per disabilitare la memorizzazione in cache della parte client.
    - [ieNoOpen](https://github.com/helmetjs/ienoopen) imposta `X-Download-Options` per IE8+.
  - [Prevent brute-force attacks against authorization](#prevent-brute-force-attacks-against-authorization)
  - [Ensure your dependencies are secure](#ensure-your-dependencies-are-secure)
    - [hidePoweredBy](https://github.com/helmetjs/hide-powered-by) rimuove l'intestazione `X-Powered-By`.
  - [Additional considerations](#additional-considerations)

## Non utilizzare versioni obsolete o vulnerabili di Express

Express 2.x e 3.x non sono più supportati. I problemi relativi alla sicurezza e alle prestazioni in queste versioni non verranno risolti. Non utilizzare queste versioni! Se non è stato effettuato l'aggiornamento alla versione 4, consultare la [guida alla migrazione](/{{ page.lang }}/guide/migrating-4.html).

Inoltre, assicurarsi che non si stia utilizzando nessuna delle versioni vulnerabili di Express elencate nella [pagina Aggiornamenti sulla sicurezza](/{{ page.lang }}/advanced/security-updates.html). Nel caso si stia utilizzando una di queste versioni, effettuare l'aggiornamento a una versione aggiornata, preferibilmente l'ultima.

## Utilizzare TLS

Se l'applicazione utilizza o trasmette dati riservati, utilizzare [Transport Layer Security](https://en.wikipedia.org/wiki/Transport_Layer_Security) (TLS) per proteggere la connessione e i dati. Questa tecnologia codifica i dati prima che vengano inviati dal client al server, proteggendo i dati da alcuni attacchi comuni (e facili) da parte di hacker. Anche se le richieste Ajax e POST possono non essere visibili e "nascoste" nei browser, il relativo traffico di rete è vulnerabile agli attacchi [packet sniffing](https://en.wikipedia.org/wiki/Packet_analyzer) e [man-in-the-middle](https://en.wikipedia.org/wiki/Man-in-the-middle_attack).

Sicuramente si conosce la crittografia SSL (Secure Socket Layer). [TLS non è altro che un miglioramento di SSL](https://msdn.microsoft.com/en-us/library/windows/desktop/aa380515\(v=vs.85\).aspx). In altre parole, se prima si utilizzava SSL, considerare l'opportunità di passare a TLS. Consigliamo di utilizzare Nginx per gestire la TLS. Per informazioni su come configurare correttamente TLS su Nginx (e altri server), consultare [Recommended Server Configurations (Mozilla Wiki)](https://wiki.mozilla.org/Security/Server_Side_TLS#Recommended_Server_Configurations).

Inoltre, uno strumento molto semplice da utilizzare per ottenere un certificato gratuito TLS è [Let's Encrypt](https://letsencrypt.org/about/), un CA (certificate authority) gratuito, automatizzato e open fornito da [Internet Security Research Group (ISRG)](https://letsencrypt.org/isrg/).

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
      return res.status(400).end(`Unsupported redirect to host: ${req.query.url}`)
    }
  } catch (e) {
    return res.status(400).end(`Invalid url: ${req.query.url}`)
  }
  res.redirect(req.query.url)
})
```

## Utilizzare Helmet

[Helmet](https://www.npmjs.com/package/helmet) è utile per proteggere l'applicazione da alcune vulnerabilità web note configurando le intestazioni HTTP in modo appropriato.

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

Installare Helmet come qualsiasi altro modulo:

```bash
$ npm install helmet
```

Successivamente, per utilizzarlo nel codice:

```js
// ...

const helmet = require('helmet')
app.use(helmet())

// ...
```

## Reduce fingerprinting

It can help to provide an extra layer of security to reduce the ability of attackers to determine
the software that a server uses, known as "fingerprinting." Though not a security issue itself,
reducing the ability to fingerprint an application improves its overall security posture.
Server software can be fingerprinted by quirks in how it responds to specific requests, for example in
the HTTP response headers.

By default, Express sends the `X-Powered-By` response header that you can
disable using the `app.disable()` method:

```js
app.disable('x-powered-by')
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
[adding your own not found handler](/en/starter/faq.html#how-do-i-handle-404-responses)
and
[writing your own error handler](/en/guide/error-handling.html#writing-error-handlers):

```js
// last app.use calls right before app.listen():

// custom 404
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

// custom error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

## Utilizzare i cookie in modo sicuro

Per fare in modo che i cookie non espongano a rischi l'applicazione, non utilizzare il nome cookie della sessione predefinita e impostare le opzioni di sicurezza dei cookie in modo appropriato.

Esistono due moduli di sessione cookie middleware principali:

- [express-session](https://www.npmjs.com/package/express-session) che sostituisce il middleware `express.session` integrato a Express 3.x.
- [cookie-session](https://www.npmjs.com/package/cookie-session) che sostituisce il middleware `express.cookieSession` integrato a Express 3.x.

La differenza principale tra questi due moduli è nel modo in cui salvano i dati di sessione dei cookie. Il middleware [express-session](https://www.npmjs.com/package/express-session) memorizza i dati di sessione sul server; salva l'ID sessione nello stesso cookie e non nei dati di sessione. Per impostazione predefinita, utilizza il processo di memorizzazione in-memory e non è progettato per un ambiente di produzione. Nella produzione, sarà necessario configurare un processo di memorizzazione della sessione scalabile; consultare l'elenco di [compatible session stores](https://github.com/expressjs/session#compatible-session-stores).

Al contrario, il middleware [cookie-session](https://www.npmjs.com/package/cookie-session) implementa la memorizzazione di backup dei cookie: suddivide in serie l'intera sessione per il cookie, piuttosto che una chiave di sessione. Utilizzarlo solo quando i dati di sessione sono relativamente piccoli e facilmente codificati come valori primitivi (piuttosto che oggetti). Poiché si presuppone che i browser supportino almeno 4096 byte per cookie, per non superare il limite, non superare la dimensione di 4093 byte per dominio. Inoltre, fare attenzione perché i dati dei cookie saranno visibili al cliente, quindi, se per qualche motivo devono rimanere sicuri o non visibili, la scelta di utilizzare express-session potrebbe essere quella giusta.

### Non utilizzare il nome del cookie della sessione predefinito

L'utilizzo del nome del cookie della sessione predefinito potrebbe esporre l'applicazione ad attacchi da parte di hacker. Il problema di sicurezza messo in discussione è simile a quello di `X-Powered-By`: un potenziale hacker potrebbe utilizzarlo per individuare il server e indirizzare gli attacchi di conseguenza.

Per evitare questo problema, utilizzare i nomi dei cookie predefiniti; ad esempio, utilizzando il middleware [express-session](https://www.npmjs.com/package/express-session):

```js
const session = require('express-session')
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 's3Cur3',
  name: 'sessionId'
}))
```

### Impostare le opzioni di sicurezza dei cookie

Impostare le seguenti opzioni per i cookie per aumentare la sicurezza:

- `secure` - Assicura che il browser invii il cookie solo tramite HTTPS.
- `httpOnly` - Assicura che il cookie venga inviato solo tramite HTTP, non JavaScript del client, questa procedura consentirà una protezione da attacchi XSS (cross-site scripting).
- `domain` - Indica il dominio del cookie; utilizzarlo per fare un confronto con il dominio del server in cui è stato richiesto l'URL. Se corrispondono, come fase successiva verificare l'attributo del percorso.
- `path` - Indica il percorso del cookie; utilizzarlo per fare un confronto con il percorso di richiesta. Se questo e il dominio corrispondono, inviare il cookie nella richiesta.
- `expires` - Utilizzarlo per impostare la data di scadenza per i cookie permanenti.

Esempio di utilizzo del middleware [cookie-session](https://www.npmjs.com/package/cookie-session):

```js
const session = require('cookie-session')
const express = require('express')
const app = express()

const expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  cookie: {
    secure: true,
    httpOnly: true,
    domain: 'example.com',
    path: 'foo/bar',
    expires: expiryDate
  }
}))
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

### Evitare altre vulnerabilità note

Prestare attenzione alle avvertenze [Node Security Project](https://npmjs.com/advisories) che potrebbero influenzare Express o altri moduli utilizzati dall'applicazione. Solitamente, il Node Security Project è una risorsa eccellente per questioni di apprendimento e per gli strumenti sulla sicurezza di Node.

Infine, le applicazioni Express, come anche altre applicazioni web, possono essere vulnerabili ad una vasta gamma di attacchi basati su web. Cercare di comprendere al meglio le [vulnerabilità web](https://www.owasp.org/www-project-top-ten/) note e prendere precauzioni per evitarle.

## Additional considerations

Ecco alcuni consigli sull'eccellente [Node.js Security Checklist](https://blog.risingstack.com/node-js-security-checklist/). Fare riferimento a quel post del blog per tutti i dettagli su questi consigli:

- Filtrare sempre e verificare gli input utente come protezione contro attacchi XSS (cross-site scripting) e command injection.
- Creare una difesa contro attacchi SQL injection utilizzando query con parametri o istruzioni preparate.
- Utilizzare lo strumento [sqlmap](http://sqlmap.org/) open source per rilevare le vulnerabilità SQL injection nell'applicazione.
- Utilizzare gli strumenti [nmap](https://nmap.org/) e [sslyze](https://github.com/nabla-c0d3/sslyze) per verificare la configurazione delle crittografie SSL, delle chiavi e della rinegoziazione come anche la validità del certificato.
- Utilizzare [safe-regex](https://www.npmjs.com/package/safe-regex) per assicurarsi che le espressioni regolari non siano suscettibili ad attacchi [regular expression denial of service](https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS).

[helmet]: https://helmetjs.github.io/