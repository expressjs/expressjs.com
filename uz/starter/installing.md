---
layout: page
title: Expressni o'rnatish
menu: starter
lang: uz
---

# O'rnatish

Avval, agar ish direktoryasini yaratmagan bo'lsangiz, uni yarating va ish direktoriyasiga aylantiring.

<pre><code class="language-sh" translate="no">
$ mkdir myapp
$ cd myapp
</code></pre>

Agar sizning direktoriyangizda `package.json` fayli mavjud bo'lmasa, uni `npm init` buyrug'i orqali yarating.

<pre><code class="language-sh" translate="no">
$ npm init
</code></pre>

Expressni dastur direktoriyangizga o'rnating va uning kerakli modullarini saqlab qo'ying:

<pre><code class="language-sh" translate="no">
$ npm install express --save
</code></pre>

Expressni vaqtinchalik o'rnatish uchun va uning kerakli modullarni saqlab qo'ymaslik uchun `--save` qo'shimchasini olib tashlang::

<pre><code class="language-sh" translate="no">
$ npm install express
</code></pre>

<div class="doc-box doc-info" markdown="1">
Agar `--save` orqali modullarni o'rnatsangiz u `package.json` faylidagi `dependencies` ro'yxatidagi qo'shiladi.
Dastur direktoriyasida `npm install` buyurug'ini bajarsangiz, dasturning barcha kerakli modullarni avtomatik tarzda o'rnatib beradi.
</div>
