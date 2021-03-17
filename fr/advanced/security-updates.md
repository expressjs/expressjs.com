---
layout: page
title: Express security updates
menu: advanced
lang: fr
---

# Mises à jour de sécurité

<div class="doc-box doc-notice" markdown="1">
Les vulnérabilités Node.js affectent directement Express. Cependant, [gardez un oeil sur les vulnérabilités Node.js](http://blog.nodejs.org/vulnerability/) et assurez-vous d'utiliser la dernière version stable de Node.js.
</div>

La liste ci-dessous répertorie les vulnérabilités Express qui ont été corrigées dans la mise à jour de la version spécifiée.

## 4.x

  * 4.11.1
    * Correction de la vulnérabilité de divulgation de racine dans `express.static`, `res.sendfile` et `res.sendFile`
  * 4.10.7
    * Correction de la vulnérabilité de redirection ouverte dans `express.static` ([advisory](https://npmjs.com/advisories/35), [CVE-2015-1164](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-1164)).
  * 4.8.8
    * Correction des vulnérabilités de traversée de répertoire dans `express.static` ([advisory](http://npmjs.com/advisories/32) , [CVE-2014-6394](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2014-6394)).
  * 4.8.4
    * Node.js 0.10 peut divulguer des `fd` dans certaines situations qui affectent `express.static` et `res.sendfile`. Des demandes malveillantes pouvaient entraîner la divulgation de `fd`, ainsi que des erreurs `EMFILE` et une absence de réponse du serveur.
  * 4.8.0
    * Les tableaux creux qui possèdent des index très élevés dans la chaîne de requête pouvaient entraîner la saturation de mémoire et la panne du serveur.
    * Les objets contenant des chaînes de requête extrêmement imbriquées pouvaient entraîner le blocage du processus et figer temporairement le serveur.

## 3.x

  * 3.19.1
    * Correction de la vulnérabilité de divulgation de racine dans `express.static`, `res.sendfile` et `res.sendFile`
  * 3.19.0
    * Correction de la vulnérabilité de redirection ouverte dans `express.static` ([advisory](https://npmjs.com/advisories/35), [CVE-2015-1164](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-1164)).
  * 3.16.10
    * Correction des vulnérabilités de traversée de répertoire dans `express.static`.
  * 3.16.6
    * Node.js 0.10 peut divulguer des `fd` dans certaines situations qui affectent `express.static` et `res.sendfile`. Des demandes malveillantes pouvaient entraîner la divulgation de `fd`, ainsi que des erreurs `EMFILE` et une absence de réponse du serveur.
  * 3.16.0
    * Les tableaux creux qui possèdent des index très élevés dans la chaîne de requête pouvaient entraîner la saturation de mémoire et la panne du serveur.
    * Les objets contenant des chaînes de requête extrêmement imbriquées pouvaient entraîner le blocage du processus et figer temporairement le serveur.
  * 3.3.0
    * La réponse 404 à une tentative de substitution de méthode non prise en charge était susceptible d'entraîner des attaques de type cross-site scripting.
