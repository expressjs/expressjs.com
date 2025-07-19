---
layout: page
title: Meilleures pratiques de sécurité pour Express en production
description: Discover crucial security best practices for Express apps in production, including using TLS, input validation, secure cookies, and preventing vulnerabilities.
menu: advanced
redirect_from: "  "
---

# Meilleures pratiques en production : Sécurité

## Présentation

Le terme _"production"_ fait référence à la phase du cycle de vie du logiciel au cours de laquelle une application ou une API est généralement disponible pour ses consommateurs ou utilisateurs finaux. En revanche, en phase de _"développement"_, l'écriture et le test de code se poursuivent activement et l'application n'est pas ouverte pour un accès externe. Les environnements système correspondants sont respectivement appelés environnement de _production_ et environnement de _développement_.

Les environnements de développement et de production sont généralement configurés différemment et leurs exigences divergent grandement. Ce qui convient parfaitement en développement peut être inacceptable en production. Par exemple, dans un environnement de développement, vous pouvez souhaiter une consignation prolixe des erreurs en vue du débogage, alors que ce type de comportement présente des risques au niveau de sécurité en environnement de production. De plus, en environnement de développement, vous n'avez pas à vous soucier de l'extensibilité, de la fiabilité et des performances, tandis que ces éléments sont essentiels en environnement de production.

{% capture security-note %}

If you believe you have discovered a security vulnerability in Express, please see
[Security Policies and Procedures](/en/resources/contributing.html#security-policies-and-procedures).

{% endcapture %}

{% include admonitions/note.html content=security-note %}

Cet article traite des meilleures pratiques en terme de sécurité pour les applications Express déployées en production.

- [Production Best Practices: Security](#production-best-practices-security)
  - [Overview](#overview)
  - [Don't use deprecated or vulnerable versions of Express](#dont-use-deprecated-or-vulnerable-versions-of-express)
  - [hsts](https://github.com/helmetjs/hsts) définit l'en-tête `Strict-Transport-Security` qui impose des connexions (HTTP sur SSL/TLS) sécurisées au serveur.
  - [Do not trust user input](#do-not-trust-user-input)
    - [Prevent open redirects](#prevent-open-redirects)
  - [hidePoweredBy](https://github.com/helmetjs/hide-powered-by) supprime l'en-tête `X-Powered-By`.
  - [Reduce fingerprinting](#reduce-fingerprinting)
  - [xssFilter](https://github.com/helmetjs/x-xss-protection) définit `X-XSS-Protection` afin d'activer le filtre de script intersites (XSS) dans les navigateurs Web les plus récents.
    - [noCache](https://github.com/helmetjs/nocache) définit des en-têtes `Cache-Control` et Pragma pour désactiver la mise en cache côté client.
    - [ieNoOpen](https://github.com/helmetjs/ienoopen) définit `X-Download-Options` pour IE8+.
  - [Prevent brute-force attacks against authorization](#prevent-brute-force-attacks-against-authorization)
  - [Ensure your dependencies are secure](#ensure-your-dependencies-are-secure)
    - Désactivez au minimum l'en-tête X-Powered-By
  - [Additional considerations](#additional-considerations)

## N'utilisez pas de versions obsolètes ou vulnérables d'Express

Les versions 2.x et 3.x d'Express ne sont plus prises en charge. Les problèmes liés à la sécurité et aux performances dans ces versions ne seront pas corrigés. Ne les utilisez pas ! Si vous êtes passé à la version 4, suivez le [guide de migration](/{{ page.lang }}/guide/migrating-4.html).

Vérifiez également que vous n'utilisez aucune des versions vulnérables d'Express répertoriées sur la [page Mises à jour de sécurité](/{{ page.lang }}/advanced/security-updates.html). Si tel est le cas, procédez à une mise à jour vers une version stable, de préférence la plus récente.

## Utilisez TLS

Si votre application traite ou transmet des données sensibles, utilisez [TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security) (Transport Layer Security) afin de sécuriser la connexion et les données. Cette technologie de l'information chiffre les données avant de les envoyer du client au serveur, ce qui vous préserve des risques d'hameçonnage les plus communs (et faciles). Même si les requêtes Ajax et POST ne sont pas clairement visibles et semblent "masquées" dans les navigateurs, leur trafic réseau n'est pas à l'abri d'une [détection de paquet](https://en.wikipedia.org/wiki/Packet_analyzer) ni des [attaques d’intercepteur](https://en.wikipedia.org/wiki/Man-in-the-middle_attack).

Vous connaissez sans doute le chiffrement SSL (Secure Socket Layer). [TLS est simplement une évolution de SSL](https://msdn.microsoft.com/en-us/library/windows/desktop/aa380515\(v=vs.85\).aspx). En d'autres termes, si vous utilisiez SSL auparavant, envisagez de passer à TLS. Nous recommandons généralement Nginx pour gérer TLS. Pour des informations de référence fiables concernant la configuration de TLS sur Nginx (et d'autres serveurs), voir [Configurations de serveur recommandées (wiki Mozilla)](https://wiki.mozilla.org/Security/Server_Side_TLS#Recommended_Server_Configurations).

Par ailleurs, un outil très pratique, [Let's Encrypt](https://letsencrypt.org/about/), autorité de certification gratuite, automatisée et ouverte fournie par le groupe de recherche sur la sécurité sur Internet, [ISRG (Internet Security Research Group)](https://letsencrypt.org/isrg/), vous permet de vous procurer gratuitement un certificat TLS.

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

## Utilisez Helmet

[Helmet](https://www.npmjs.com/package/helmet) vous aide à protéger votre application de certaines des vulnérabilités bien connues du Web en configurant de manière appropriée des en-têtes HTTP.

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

Installez Helmet comme n'importe quel autre module :

```bash
$ npm install helmet
```

Puis, pour l'utiliser dans votre code :

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

## Utilisez les cookies de manière sécurisée

Pour garantir que les cookies n'ouvrent pas votre application aux attaques, n'utilisez pas le nom du cookie de session par défaut et définissez de manière appropriée des options de sécurité des cookies.

Il existe deux modules principaux de session de cookie de middleware :

- [express-session](https://www.npmjs.com/package/express-session) qui remplace le middleware `express.session` intégré à Express 3.x.
- [cookie-session](https://www.npmjs.com/package/cookie-session) qui remplace le middleware `express.cookieSession` intégré à Express 3.x.

La principale différence entre ces deux modules tient à la manière dont ils sauvegardent les données de session des cookies. Le middleware [express-session](https://www.npmjs.com/package/express-session) stocke les données de session sur le serveur ; il ne sauvegarde que l'ID session dans le cookie lui-même, mais pas les données de session. Par défaut, il utilise le stockage en mémoire et n'est pas conçu pour un environnement de production. En production, vous devrez configurer un magasin de sessions évolutif (voir la liste des [magasins de sessions compatibles](https://github.com/expressjs/session#compatible-session-stores)).

En revanche, le middleware [cookie-session](https://www.npmjs.com/package/cookie-session) implémente un stockage sur cookie, c'est-à-dire qu'il sérialise l'intégralité de la session sur le cookie, et non simplement une clé de session. Utilisez-le uniquement lorsque les données de session sont relativement peu nombreuses et faciles à coder sous forme de valeurs primitives (au lieu d'objets). Même si les navigateurs sont censés prendre en charge au moins 4096 octets par cookie, pour ne pas risquer de dépasser cette limite, limitez-vous à 4093 octets par domaine. De plus, n'oubliez pas que les données de cookie seront visibles du client et que s'il n'est pas nécessaire qu'elles soient sécurisées ou illisibles, express-session est probablement la meilleure solution.

### N'utilisez pas de nom de cookie de session par défaut

L'utilisation d'un nom de cookie de session par défaut risque d'ouvrir votre application aux attaques. Le problème de sécurité qui en découle est similaire à `X-Powered-By` : une personne potentiellement malveillante peut l'utiliser pour s'identifier auprès du serveur et cibler ses attaques en conséquence.

Pour éviter ce problème, utilisez des noms de cookie génériques, par exemple à l'aide du middleware [express-session](https://www.npmjs.com/package/express-session) :

```js
const session = require('express-session')
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 's3Cur3',
  name: 'sessionId'
}))
```

### Définissez des options de sécurité de cookie

Définissez les options de cookie suivantes pour accroître la sécurité :

- `secure` - Garantit que le navigateur n'envoie le cookie que sur HTTPS.
- `httpOnly` - Garantit que le cookie n'est envoyé que sur HTTP(S), pas au JavaScript du client, ce qui renforce la protection contre les attaques de type cross-site scripting.
- `domain` - Indique le domaine du cookie ; utilisez cette option pour une comparaison avec le domaine du serveur dans lequel l'URL est demandée. S'ils correspondent, vérifiez ensuite l'attribut de chemin.
- `path` - Indique le chemin du cookie ; utilisez cette option pour une comparaison avec le chemin demandé. Si le chemin et le domaine correspondent, envoyez le cookie dans la demande.
- `expires` - Utilisez cette option pour définir la date d'expiration des cookies persistants.

Exemple d'utilisation du middleware [cookie-session](https://www.npmjs.com/package/cookie-session) :

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

## Implémentez la limitation de débit pour empêcher les attaques de force brute liées à l'authentification.

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

### Eviter les autres vulnérabilités connues

Gardez un oeil sur les recommandations [Node Security Project](https://npmjs.com/advisories) qui peuvent concerner Express ou d'autres modules utilisés par votre application. En règle générale, Node Security Project est une excellente ressource de connaissances et d'outils sur la sécurité de Node.

Pour finir, les applications Express - comme toutes les autres applications Web - peuvent être vulnérables à une variété d'attaques Web. Familiarisez vous avec les [vulnérabilités Web](https://www.owasp.org/www-project-top-ten/) connues et prenez des précautions pour les éviter.

## Autres considérations

Voici d'autres recommandations issues de l'excellente [liste de contrôle de sécurité Node.js](https://blog.risingstack.com/node-js-security-checklist/). Pour tous les détails sur ces recommandations, reportez-vous à cet article de blogue :

- Filtrez et nettoyez toujours les entrées utilisateur pour vous protéger contre les attaques de cross-site scripting (XSS) et d'injection de commande.
- Défendez-vous contre les attaques par injection SQL en utilisant des requêtes paramétrées ou des instructions préparées.
- Utilisez l'outil [sqlmap](http://sqlmap.org/) à code source ouvert pour détecter les vulnérabilités par injection SQL dans votre application.
- Utilisez les outils [nmap](https://nmap.org/) et [sslyze](https://github.com/nabla-c0d3/sslyze) pour tester la configuration de vos chiffrements, clés et renégociations SSL, ainsi que la validité de votre certificat.
- Utilisez [safe-regex](https://www.npmjs.com/package/safe-regex) pour s'assurer que vos expressions régulières ne sont pas exposées à des attaques ReDoS ([regular expression denial of service](https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS)).

[helmet]: <Si vous utilisez `helmet.js`, cette opération s'effectue automatiquement.>