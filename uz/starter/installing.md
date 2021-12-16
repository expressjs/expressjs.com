---
layout: page
title: Expressni o'rnatish
menu: starter
lang: uz
---

# O'rnatish

Avval, agar ish direktoryasini yaratmagan bo'lsangiz, uni yarating va ish direktoriyasiga aylantiring.

```console
$ mkdir myapp
$ cd myapp
```

Agar sizning direktoriyangizda `package.json` fayli mavjud bo'lmasa, uni `npm init` buyrug'i orqali yarating.

```console
$ npm init
```

Expressni dastur direktoriyangizga o'rnating va uning kerakli modullarini saqlab qo'ying:

```console
$ npm install express --save
```

Expressni vaqtinchalik o'rnatish uchun va uning kerakli modullarni saqlab qo'ymaslik uchun `--save` qo'shimchasini olib tashlang::

```console
$ npm install express
```

<div class="doc-box doc-info" markdown="1">
Agar `--save` orqali modullarni o'rnatsangiz u `package.json` faylidagi `dependencies` ro'yxatidagi qo'shiladi.
Dastur direktoriyasida `npm install` buyurug'ini bajarsangiz, dasturning barcha kerakli modullarni avtomatik tarzda o'rnatib beradi.
</div>
