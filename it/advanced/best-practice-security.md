---
layout: page
title: Best Practice sulla sicurezza per Express in fase di produzione
menu: advanced
lang: it
---

# Best Practice sulla produzione: Sicurezza

## Panoramica

Il termine *"produzione"* si riferisce alla fase nel ciclo di vita del software quando un'applicazione o API è solitamente disponibile per gli utenti finali o i consumatori. Al contrario, nella fase *"sviluppo"*, si sta ancora scrivendo e verificando il codice e l'applicazione non è aperta ad accessi esterni. Gli ambienti di sistema corrispondenti sono noti rispettivamente come ambienti di *produzione* e di *sviluppo*.

Gli ambienti di sviluppo e produzione sono solitamente configurati diversamente e hanno requisiti molto differenti. Ciò che potrebbe andare bene nello sviluppo potrebbe non essere accettato nella produzione. Ad esempio, in un ambiente di sviluppo è possibile che si richieda una registrazione degli errori ridondante per il processo di debug, mentre la stessa richiesta in un ambiente di produzione potrebbe mettere a rischio la sicurezza. Inoltre, in un ambiente di sviluppo non è necessario preoccuparsi della scalabilità, dell'affidabilità e delle prestazioni, mentre nella produzione è fondamentale tenerne conto.

In questo articolo vengono descritte alcune best practice sulla sicurezza per le applicazioni Express distribuite per la produzione.

## Non utilizzare versioni obsolete o vulnerabili di Express

Express 2.x e 3.x non sono più supportati. I problemi relativi alla sicurezza e alle prestazioni in queste versioni non verranno risolti. Non utilizzare queste versioni!  Se non è stato effettuato l'aggiornamento alla versione 4, consultare la [guida alla migrazione](/{{ page.lang }}/guide/migrating-4.html).

Inoltre, assicurarsi che non si stia utilizzando nessuna delle versioni vulnerabili di Express elencate nella [pagina Aggiornamenti sulla sicurezza](/{{ page.lang }}/advanced/security-updates.html). Nel caso si stia utilizzando una di queste versioni, effettuare l'aggiornamento a una versione aggiornata, preferibilmente l'ultima.

## Utilizzare TLS

Se l'applicazione utilizza o trasmette dati riservati, utilizzare [Transport Layer Security](https://en.wikipedia.org/wiki/Transport_Layer_Security) (TLS) per proteggere la connessione e i dati. Questa tecnologia codifica i dati prima che vengano inviati dal client al server, proteggendo i dati da alcuni attacchi comuni (e facili) da parte di hacker. Anche se le richieste Ajax e POST possono non essere visibili e "nascoste" nei browser, il relativo traffico di rete è vulnerabile agli attacchi [packet sniffing](https://en.wikipedia.org/wiki/Packet_analyzer) e [man-in-the-middle](https://en.wikipedia.org/wiki/Man-in-the-middle_attack).

Sicuramente si conosce la crittografia SSL (Secure Socket Layer). [TLS non è altro che un miglioramento di SSL](https://msdn.microsoft.com/en-us/library/windows/desktop/aa380515(v=vs.85).aspx). In altre parole, se prima si utilizzava SSL, considerare l'opportunità di passare a TLS.  Consigliamo di utilizzare Nginx per gestire la TLS.  Per informazioni su come configurare correttamente TLS su Nginx (e altri server), consultare [Recommended Server Configurations (Mozilla Wiki)](https://wiki.mozilla.org/Security/Server_Side_TLS#Recommended_Server_Configurations).

Inoltre, uno strumento molto semplice da utilizzare per ottenere un certificato gratuito TLS è [Let's Encrypt](https://letsencrypt.org/about/), un CA (certificate authority) gratuito, automatizzato e open fornito da [Internet Security Research Group (ISRG)](https://letsencrypt.org/isrg/).

## Utilizzare Helmet

[Helmet](https://www.npmjs.com/package/helmet) è utile per proteggere l'applicazione da alcune vulnerabilità web note configurando le intestazioni HTTP in modo appropriato.

Attualmente, Helmet non è altro che una raccolta di nove funzioni middleware più piccole che impostano le intestazioni HTTP relative alla sicurezza:

* [csp](https://github.com/helmetjs/csp) imposta l'intestazione `Content-Security-Policy` per impedire attacchi XSS (cross-site scripting) e altri attacchi da altri siti.
* [hidePoweredBy](https://github.com/helmetjs/hide-powered-by) rimuove l'intestazione `X-Powered-By`.
* [hsts](https://github.com/helmetjs/hsts) imposta l'intestazione `Strict-Transport-Security` che rafforza connessioni (HTTP su SSL/TLS) sicure per il server.
* [ieNoOpen](https://github.com/helmetjs/ienoopen) imposta `X-Download-Options` per IE8+.
* [noCache](https://github.com/helmetjs/nocache) imposta le intestazioni `Cache-Control` e Pragma per disabilitare la memorizzazione in cache della parte client.
* [noSniff](https://github.com/helmetjs/dont-sniff-mimetype) imposta `X-Content-Type-Options` per impedire ai browser di effettuare l'analisi MIME di una risposta fuori dal contenuto dichiarato.
* [frameguard](https://github.com/helmetjs/frameguard) imposta l'intestazione `X-Frame-Options` per fornire la protezione [clickjacking](https://www.owasp.org/index.php/Clickjacking).
* [xssFilter](https://github.com/helmetjs/x-xss-protection) imposta `X-XSS-Protection` per abilitare il filtro XSS (Cross-site scripting) nei browser web più recenti.

Installare Helmet come qualsiasi altro modulo:

```console
$ npm install --save helmet
```

Successivamente, per utilizzarlo nel codice:

<pre>
<code class="language-javascript" translate="no">
...
var helmet = require('helmet');
app.use(helmet());
...
</code>
</pre>

### Disattivare almeno l'intestazione X-Powered-By

Se non si desidera Helmet, disattivare almeno l'intestazione `X-Powered-By`.  Gli hacker possono utilizzare questa intestazione (abilitata per impostazione predefinita) per rilevare le applicazioni su cui è in esecuzione Express e successivamente avviare attacchi indirizzati in modo specifico.

Quindi, la miglior cosa da fare è disattivare l'intestazione con il metodo `app.disable()`:

<pre>
<code class="language-javascript" translate="no">
app.disable('x-powered-by');
</code>
</pre>

Se si utilizza `helmet.js`, questa operazione sarà effettuata per conto dell'utente.

## Utilizzare i cookie in modo sicuro

Per fare in modo che i cookie non espongano a rischi l'applicazione, non utilizzare il nome cookie della sessione predefinita e impostare le opzioni di sicurezza dei cookie in modo appropriato.

Esistono due moduli di sessione cookie middleware principali:

* [express-session](https://www.npmjs.com/package/express-session) che sostituisce il middleware `express.session` integrato a Express 3.x.
* [cookie-session](https://www.npmjs.com/package/cookie-session) che sostituisce il middleware `express.cookieSession` integrato a Express 3.x.

La differenza principale tra questi due moduli è nel modo in cui salvano i dati di sessione dei cookie.  Il middleware [express-session](https://www.npmjs.com/package/express-session) memorizza i dati di sessione sul server; salva l'ID sessione nello stesso cookie e non nei dati di sessione.  Per impostazione predefinita, utilizza il processo di memorizzazione in-memory e non è progettato per un ambiente di produzione.  Nella produzione, sarà necessario configurare un processo di memorizzazione della sessione scalabile; consultare l'elenco di [compatible session stores](https://github.com/expressjs/session#compatible-session-stores).

Al contrario, il middleware [cookie-session](https://www.npmjs.com/package/cookie-session) implementa la memorizzazione di backup dei cookie: suddivide in serie l'intera sessione per il cookie, piuttosto che una chiave di sessione.  Utilizzarlo solo quando i dati di sessione sono relativamente piccoli e facilmente codificati come valori primitivi (piuttosto che oggetti).  Poiché si presuppone che i browser supportino almeno 4096 byte per cookie, per non superare il limite, non superare la dimensione di 4093 byte per dominio.  Inoltre, fare attenzione perché i dati dei cookie saranno visibili al cliente, quindi, se per qualche motivo devono rimanere sicuri o non visibili, la scelta di utilizzare express-session potrebbe essere quella giusta.

### Non utilizzare il nome del cookie della sessione predefinito

L'utilizzo del nome del cookie della sessione predefinito potrebbe esporre l'applicazione ad attacchi da parte di hacker.  Il problema di sicurezza messo in discussione è simile a quello di `X-Powered-By`: un potenziale hacker potrebbe utilizzarlo per individuare il server e indirizzare gli attacchi di conseguenza.

Per evitare questo problema, utilizzare i nomi dei cookie predefiniti; ad esempio, utilizzando il middleware [express-session](https://www.npmjs.com/package/express-session):

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

### Impostare le opzioni di sicurezza dei cookie

Impostare le seguenti opzioni per i cookie per aumentare la sicurezza:

* `secure` - Assicura che il browser invii il cookie solo tramite HTTPS.
* `httpOnly` - Assicura che il cookie venga inviato solo tramite HTTP, non JavaScript del client, questa procedura consentirà una protezione da attacchi XSS (cross-site scripting).
* `domain` - Indica il dominio del cookie; utilizzarlo per fare un confronto con il dominio del server in cui è stato richiesto l'URL. Se corrispondono, come fase successiva verificare l'attributo del percorso.
* `path` - Indica il percorso del cookie; utilizzarlo per fare un confronto con il percorso di richiesta. Se questo e il dominio corrispondono, inviare il cookie nella richiesta.
* `expires` - Utilizzarlo per impostare la data di scadenza per i cookie permanenti.

Esempio di utilizzo del middleware [cookie-session](https://www.npmjs.com/package/cookie-session):

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

## Ulteriori informazioni

Ecco alcuni consigli sull'eccellente [Node.js Security Checklist](https://blog.risingstack.com/node-js-security-checklist/).  Fare riferimento a quel post del blog per tutti i dettagli su questi consigli:

* Implementare il limite di intervallo per evitare attacchi pesanti al processo di autenticazione.  Un modo per effettuare ciò è quello di utilizzare [StrongLoop API Gateway](https://strongloop.com/node-js/api-gateway/) per rafforzare una policy per il limite di intervallo.  In alternativa, è possibile utilizzare il middleware, ad esempio [express-limiter](https://www.npmjs.com/package/express-limiter), ma questo richiede di modificare in parte il codice.
* Utilizzare il middleware [csurf](https://www.npmjs.com/package/csurf) come protezione contro CSRF (cross-site request forgery).
* Filtrare sempre e verificare gli input utente come protezione contro attacchi XSS (cross-site scripting) e command injection.
* Creare una difesa contro attacchi SQL injection utilizzando query con parametri o istruzioni preparate.
* Utilizzare lo strumento [sqlmap](http://sqlmap.org/) open source per rilevare le vulnerabilità SQL injection nell'applicazione.
* Utilizzare gli strumenti [nmap](https://nmap.org/) e [sslyze](https://github.com/nabla-c0d3/sslyze) per verificare la configurazione delle crittografie SSL, delle chiavi e della rinegoziazione come anche la validità del certificato.
* Utilizzare [safe-regex](https://www.npmjs.com/package/safe-regex) per assicurarsi che le espressioni regolari non siano suscettibili ad attacchi [regular expression denial of service](https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS).

## Evitare altre vulnerabilità note

Prestare attenzione alle avvertenze [Node Security Project](https://npmjs.com/advisories) che potrebbero influenzare Express o altri moduli utilizzati dall'applicazione.  Solitamente, il Node Security Project è una risorsa eccellente per questioni di apprendimento e per gli strumenti sulla sicurezza di Node.

Infine, le applicazioni Express, come anche altre applicazioni web, possono essere vulnerabili ad una vasta gamma di attacchi basati su web. Cercare di comprendere al meglio le [vulnerabilità web](https://www.owasp.org/index.php/Top_10_2013-Top_10) note e prendere precauzioni per evitarle.
