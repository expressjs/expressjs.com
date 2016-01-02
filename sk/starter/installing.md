---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Inštalácia Express
menu: starter
lang: sk
redirect_from: "/starter/installing.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

# Inštalácia

Za predpokladu, že ste si už nainštalovali [Node.js](https://nodejs.org/), vytvorte priečinok pre vašu aplikáciu a presuňte sa tam.

<pre><code class="language-sh" translate="no">
$ mkdir myapp
$ cd myapp
</code></pre>

Pomocou príkazu `npm init` vytvorte pre vašu aplikáciu súbor `package.json`.
Viac informácií o tom, ako funguje `package.json` sa dozviete pri prečítaní [Specifics of npm's package.json handling](https://docs.npmjs.com/files/package.json).

<pre><code class="language-sh" translate="no">
$ npm init
</code></pre>

Tento príkaz vás vyzve k zadaniu viacerých informácií, ako sú napr. názov a verzia vašej aplikácie.
Teraz, kvôli zjednodušeniu, stlačte len ENTER k potvrdeniu defaultných hodnôt väčšiny z nich, okrem bodu:

<pre><code class="language-sh" translate="no">
entry point: (index.js)
</code></pre>

Zadajte `app.js`, prípadne akýkoľvek iný názov hlavného súboru vašej aplikácie. Ak ho chcete nazvať `index.js`, stlačte ENTER k potvrdeniu navrhovaného názvu súboru.

Teraz nainštalujte Express v `app` priečinku a pridajte ho ako dependenciu do package.json. Takto:

<pre><code class="language-sh" translate="no">
$ npm install express --save
</code></pre>

Ak chcete nainštalovať Express bez toho, aby bol pridaný ako dependencia, vynechajte prepínač `--save`

<pre><code class="language-sh" translate="no">
$ npm install express
</code></pre>

<div class="doc-box doc-info" markdown="1">
Node moduly inštalované s prepínačom `--save` sú automaticky pridané do `dependencies` zoznamu v súbore `package.json`.
Neskôr spustením príkazu `npm install` v `app` priečinku sa všetky dependencie zo zoznamu automaticky nainštalujú.
</div>
