---
layout: page
title: Meilleures pratiques de sécurité pour Express en production
menu: advanced
lang: fr
---

# Meilleures pratiques en production : Sécurité

## Présentation

Le terme *"production"* fait référence à la phase du cycle de vie du logiciel au cours de laquelle une application ou une API est généralement disponible pour ses consommateurs ou utilisateurs finaux. En revanche, en phase de *"développement"*, l'écriture et le test de code se poursuivent activement et l'application n'est pas ouverte pour un accès externe. Les environnements système correspondants sont respectivement appelés environnement de *production* et environnement de *développement*.

Les environnements de développement et de production sont généralement configurés différemment et leurs exigences divergent grandement. Ce qui convient parfaitement en développement peut être inacceptable en production. Par exemple, dans un environnement de développement, vous pouvez souhaiter une consignation prolixe des erreurs en vue du débogage, alors que ce type de comportement présente des risques au niveau de sécurité en environnement de production. De plus, en environnement de développement, vous n'avez pas à vous soucier de l'extensibilité, de la fiabilité et des performances, tandis que ces éléments sont essentiels en environnement de production.

Cet article traite des meilleures pratiques en terme de sécurité pour les applications Express déployées en production.

## N'utilisez pas de versions obsolètes ou vulnérables d'Express

Les versions 2.x et 3.x d'Express ne sont plus prises en charge. Les problèmes liés à la sécurité et aux performances dans ces versions ne seront pas corrigés. Ne les utilisez pas ! Si vous êtes passé à la version 4, suivez le [guide de migration](/{{ page.lang }}/guide/migrating-4.html).

Vérifiez également que vous n'utilisez aucune des versions vulnérables d'Express répertoriées sur la [page Mises à jour de sécurité](/{{ page.lang }}/advanced/security-updates.html). Si tel est le cas, procédez à une mise à jour vers une version stable, de préférence la plus récente.

## Utilisez TLS

Si votre application traite ou transmet des données sensibles, utilisez [TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security) (Transport Layer Security) afin de sécuriser la connexion et les données. Cette technologie de l'information chiffre les données avant de les envoyer du client au serveur, ce qui vous préserve des risques d'hameçonnage les plus communs (et faciles). Même si les requêtes Ajax et POST ne sont pas clairement visibles et semblent "masquées" dans les navigateurs, leur trafic réseau n'est pas à l'abri d'une [détection de paquet](https://en.wikipedia.org/wiki/Packet_analyzer) ni des [attaques d’intercepteur](https://en.wikipedia.org/wiki/Man-in-the-middle_attack).

Vous connaissez sans doute le chiffrement SSL (Secure Socket Layer). [TLS est simplement une évolution de SSL](https://msdn.microsoft.com/en-us/library/windows/desktop/aa380515(v=vs.85).aspx). En d'autres termes, si vous utilisiez SSL auparavant, envisagez de passer à TLS. Nous recommandons généralement Nginx pour gérer TLS. Pour des informations de référence fiables concernant la configuration de TLS sur Nginx (et d'autres serveurs), voir [Configurations de serveur recommandées (wiki Mozilla)](https://wiki.mozilla.org/Security/Server_Side_TLS#Recommended_Server_Configurations).

Par ailleurs, un outil très pratique, [Let's Encrypt](https://letsencrypt.org/about/), autorité de certification gratuite, automatisée et ouverte fournie par le groupe de recherche sur la sécurité sur Internet, [ISRG (Internet Security Research Group)](https://letsencrypt.org/isrg/), vous permet de vous procurer gratuitement un certificat TLS.

## Utilisez Helmet

[Helmet](https://www.npmjs.com/package/helmet) vous aide à protéger votre application de certaines des vulnérabilités bien connues du Web en configurant de manière appropriée des en-têtes HTTP.

Helmet n'est actuellement qu'une collection de neuf fonctions middleware plus petites qui définissent des en-têtes HTTP liés à la sécurité :

* [csp](https://github.com/helmetjs/csp) définit l'en-tête `Content-Security-Policy` pour la protection contre les attaques de type cross-site scripting et autres injections intersites.
* [hidePoweredBy](https://github.com/helmetjs/hide-powered-by) supprime l'en-tête `X-Powered-By`.
* [hsts](https://github.com/helmetjs/hsts) définit l'en-tête `Strict-Transport-Security` qui impose des connexions (HTTP sur SSL/TLS) sécurisées au serveur.
* [ieNoOpen](https://github.com/helmetjs/ienoopen) définit `X-Download-Options` pour IE8+.
* [noCache](https://github.com/helmetjs/nocache) définit des en-têtes `Cache-Control` et Pragma pour désactiver la mise en cache côté client.
* [noSniff](https://github.com/helmetjs/dont-sniff-mimetype) définit `X-Content-Type-Options` pour protéger les navigateurs du reniflage du code MIME d'une réponse à partir du type de contenu déclaré.
* [frameguard](https://github.com/helmetjs/frameguard) définit l'en-tête `X-Frame-Options` pour fournir une protection [clickjacking](https://www.owasp.org/index.php/Clickjacking).
* [xssFilter](https://github.com/helmetjs/x-xss-protection) définit `X-XSS-Protection` afin d'activer le filtre de script intersites (XSS) dans les navigateurs Web les plus récents.

Installez Helmet comme n'importe quel autre module :

```console
$ npm install --save helmet
```

Puis, pour l'utiliser dans votre code :

<pre>
<code class="language-javascript" translate="no">
...
var helmet = require('helmet');
app.use(helmet());
...
</code>
</pre>

### Désactivez au minimum l'en-tête X-Powered-By

Si vous ne voulez pas utiliser Helmet, désactivez au minimum l'en-tête `X-Powered-By`.  Les intrus peuvent utiliser cet en-tête (activé par défaut) afin de détecter les applications qui exécutent Express et lancer ensuite des attaques spécifiquement ciblées.

Il est donc conseillé de neutraliser l'en-tête à l'aide de la méthode `app.disable()` comme suit :

<pre>
<code class="language-javascript" translate="no">
app.disable('x-powered-by');
</code>
</pre>

Si vous utilisez `helmet.js`, cette opération s'effectue automatiquement.

## Utilisez les cookies de manière sécurisée

Pour garantir que les cookies n'ouvrent pas votre application aux attaques, n'utilisez pas le nom du cookie de session par défaut et définissez de manière appropriée des options de sécurité des cookies.

Il existe deux modules principaux de session de cookie de middleware :

* [express-session](https://www.npmjs.com/package/express-session) qui remplace le middleware `express.session` intégré à Express 3.x.
* [cookie-session](https://www.npmjs.com/package/cookie-session) qui remplace le middleware `express.cookieSession` intégré à Express 3.x.

La principale différence entre ces deux modules tient à la manière dont ils sauvegardent les données de session des cookies. Le middleware [express-session](https://www.npmjs.com/package/express-session) stocke les données de session sur le serveur ; il ne sauvegarde que l'ID session dans le cookie lui-même, mais pas les données de session. Par défaut, il utilise le stockage en mémoire et n'est pas conçu pour un environnement de production.  En production, vous devrez configurer un magasin de sessions évolutif (voir la liste des [magasins de sessions compatibles](https://github.com/expressjs/session#compatible-session-stores)).

En revanche, le middleware [cookie-session](https://www.npmjs.com/package/cookie-session) implémente un stockage sur cookie, c'est-à-dire qu'il sérialise l'intégralité de la session sur le cookie, et non simplement une clé de session. Utilisez-le uniquement lorsque les données de session sont relativement peu nombreuses et faciles à coder sous forme de valeurs primitives (au lieu d'objets).  Même si les navigateurs sont censés prendre en charge au moins 4096 octets par cookie, pour ne pas risquer de dépasser cette limite, limitez-vous à 4093 octets par domaine. De plus, n'oubliez pas que les données de cookie seront visibles du client et que s'il n'est pas nécessaire qu'elles soient sécurisées ou illisibles, express-session est probablement la meilleure solution.

### N'utilisez pas de nom de cookie de session par défaut

L'utilisation d'un nom de cookie de session par défaut risque d'ouvrir votre application aux attaques. Le problème de sécurité qui en découle est similaire à `X-Powered-By` : une personne potentiellement malveillante peut l'utiliser pour s'identifier auprès du serveur et cibler ses attaques en conséquence.

Pour éviter ce problème, utilisez des noms de cookie génériques, par exemple à l'aide du middleware [express-session](https://www.npmjs.com/package/express-session) :

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

### Définissez des options de sécurité de cookie

Définissez les options de cookie suivantes pour accroître la sécurité :

* `secure` - Garantit que le navigateur n'envoie le cookie que sur HTTPS.
* `httpOnly` - Garantit que le cookie n'est envoyé que sur HTTP(S), pas au JavaScript du client, ce qui renforce la protection contre les attaques de type cross-site scripting.
* `domain` - Indique le domaine du cookie ; utilisez cette option pour une comparaison avec le domaine du serveur dans lequel l'URL est demandée. S'ils correspondent, vérifiez ensuite l'attribut de chemin.
* `path` - Indique le chemin du cookie ; utilisez cette option pour une comparaison avec le chemin demandé. Si le chemin et le domaine correspondent, envoyez le cookie dans la demande.
* `expires` - Utilisez cette option pour définir la date d'expiration des cookies persistants.

Exemple d'utilisation du middleware [cookie-session](https://www.npmjs.com/package/cookie-session) :

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

## Autres considérations

Voici d'autres recommandations issues de l'excellente [liste de contrôle de sécurité Node.js](https://blog.risingstack.com/node-js-security-checklist/).  Pour tous les détails sur ces recommandations, reportez-vous à cet article de blogue :

* Implémentez la limitation de débit pour empêcher les attaques de force brute liées à l'authentification.  Une façon de faire consiste à utiliser [StrongLoop API Gateway](https://strongloop.com/node-js/api-gateway/) pour mettre en place une règle de limitation de débit.  Sinon, vous pouvez utiliser des middleware tels que [express-limiter](https://www.npmjs.com/package/express-limiter), mais vous devrez alors modifier quelque peu votre code.
* Utilisez le middleware [csurf](https://www.npmjs.com/package/csurf) pour vous protéger contre les CSRF (Cross-Site Request Forgery).
* Filtrez et nettoyez toujours les entrées utilisateur pour vous protéger contre les attaques de cross-site scripting (XSS) et d'injection de commande.
* Défendez-vous contre les attaques par injection SQL en utilisant des requêtes paramétrées ou des instructions préparées.
* Utilisez l'outil [sqlmap](http://sqlmap.org/) à code source ouvert pour détecter les vulnérabilités par injection SQL dans votre application.
* Utilisez les outils [nmap](https://nmap.org/) et [sslyze](https://github.com/nabla-c0d3/sslyze) pour tester la configuration de vos chiffrements, clés et renégociations SSL, ainsi que la validité de votre certificat.
* Utilisez [safe-regex](https://www.npmjs.com/package/safe-regex) pour s'assurer que vos expressions régulières ne sont pas exposées à des attaques ReDoS ([regular expression denial of service](https://www.owasp.org/index.php/Regular_expression_Denial_of_Service_-_ReDoS)).

## Eviter les autres vulnérabilités connues

Gardez un oeil sur les recommandations [Node Security Project](https://npmjs.com/advisories) qui peuvent concerner Express ou d'autres modules utilisés par votre application. En règle générale, Node Security Project est une excellente ressource de connaissances et d'outils sur la sécurité de Node.

Pour finir, les applications Express - comme toutes les autres applications Web - peuvent être vulnérables à une variété d'attaques Web. Familiarisez vous avec les [vulnérabilités Web](https://www.owasp.org/index.php/Top_10_2013-Top_10) connues et prenez des précautions pour les éviter.
