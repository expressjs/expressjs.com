---
layout: page
title: Express FAQ
menu: starter
lang: uz
---

# FAQ

## Dasturim uchun qanday struktura tanlashim kerak?

Bu savolga bitta javob yo'q. Bu dasturingiz hajmi va dasturchilar jamosiga bog'liq bo'ladi. Tobora moslashuvchan bo'lish uchun, Express struktura yaratishga hech qanday cheklovlar qo'ymaydi.

Dasturning marshrutizatsiya va boshqa logika qismi ko'plab fayllarda joylashgan bo'lishi mumkin, struktura esa siz hohlagan holda yaratish imkoniyati mavjud. Ilhomlanish uchun quyidagi strukturalarni ko'rishingiz mumkin:

* [Marshrutlarni e'lon qilish](https://github.com/expressjs/express/blob/master/examples/route-separation/index.js#L19)
* [Marshrutlarni haritasi](https://github.com/expressjs/express/blob/master/examples/route-map/index.js#L47)
* [MVC ko'rinishida kontrollerlar](https://github.com/expressjs/express/tree/master/examples/mvc)

Bundan tashqari, Express uchun qo'shimcha yordam beruvchi shablonlar mavjud:

* [Resourceful marshrutizatsiya](https://github.com/expressjs/express-resource)
* [Namespaced marshrutizatsiya](https://github.com/expressjs/express-namespace)

## Modellarni qanday aniqlashim mumkin?

Express qaysi ma'lumotlar ombori bilan ishlashni keltirilmagan. Siz hohlagan Node modullarni ishlatishingiz mumkin bo'ladi, bu esa sizga hohlagan ma'lumotlar omborini ishlatish imkonini beradi.

[LoopBack](http://loopback.io) ko'ring, Express asosida modellar bilan ishlash uchun yaratilgan freymvork.

## Qanday qilish foydalanuvchini autenfikatsiya qilishim mumkin?

Bu ham Express o'ziga olmaydigan qismi hisoblanadi. Siz hohlagan autenfikatsiya tizimini ishlatishingiz mumkin bo'ladi.
Oddiy username / password sxemasini ishlatish uchun [ushbu misolni](https://github.com/expressjs/express/tree/master/examples/auth) ko'ring.

## Express qaysi shablonizator ishlatadi?

Express `(path, locals, callback)` signaturasini maqullaydigan barcha shablonizatorni ishlatishi mumkin.
Iterfey shablonizator va keshirovaniyani normalashtirish uchun, [consolidate.js](https://github.com/visionmedia/consolidate.js) ni ko'ring.

## Qanday qilib bir necha direktoriyalarni statik fayllarga aylantirishim mumkin?

Siz oraliq qayta ishlovchilarni bir necha marta ishatishingiz mumkin. Quyidagilar keltirilgan oraliq qayta ishlovchida, `GET /javascripts/jquery.js` ni olishga so'rov jo'natilganda, avvalo `./public/javascripts/jquery.js`ni tekshiradi;
Agarda ushbu fayl direktoriyada topilmasa, undan keyingi oraliq qayta ishlovchida ko'rsatilgan direktoriyani `./files/javascripts/jquery.js` tekshiradi.

<pre><code class="language-javascript" translate="no">
app.use(express.static('public'));
app.use(express.static('files'));
</code></pre>

## Statik fayllarni tarqatish qanday qilib manzil prefiksini ko'rsatsam bo'ladi?

Asosiy Connect "mounting" yordamida "prefiks" aniqlab qaysi middleware ishga tushishini ko'rsatish mumkin bo'ladi.
Bu usul effektiv ishlaydi huddi prefiks hech qachon manzil qismi bo'lmagandek.
Masalan, bizga `GET /files/javascripts/jquery.js` kerak bo'lsa.
Siz `/files` prefiksini o'rnatib, `/javascripts/jquery.js`ni `req.url` aniqlashingiz mumkin, shu bilan tarqatish uchun middleware ko'rsatishingiz mumkin:

<pre><code class="language-javascript" translate="no">
app.use('/public', express.static('public'));
</code></pre>

## Siz qanday qilib 404 xatoni qayta ishlaysiz?

Expressda, 404 xatosi, natija xatosi hisoblanmaydi. Shuning uchun ham xatolarni qayta ishlovchi middleware 404ni qayta ishlay olmaydi. Chunki 404 qo'shimcha ish yo'qligidan dalolat beradi;
Boshqa qilib aytganda, Express hamma oraliq qayta ishlovchi(middleware)  / routerlarni(routes)larni ishga tushuradi,
va ularda hech biri ish haqida natija beramangani aniqlanadi.
Buning uchun siz eng oxirida(hammasidan keyin) 404ni qayta ishlash oraliq qayta ishlovchi ko'rsatishingiz kerak bo'ladi:

<pre><code class="language-javascript" translate="no">
app.use(function(req, res, next){
  res.send(404, 'Sorry cant find that!');
});
</code></pre>

## Xato qayta ishlovchisini qanday aniqlaysiz?

Siz xatolarni qayta ishlovchi middlewareni ko'rsatishingiz mumkin, shu bilan qolgan qayta ishlovchisi(middleware)ga
uchta argumentlar o'rniga to'rtta argument jo'natishingiz kerak; u quyidagicha `(err, req, res, next)`:

<pre><code class="language-javascript" translate="no">
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});
</code></pre>

Batafsil ma'lumot uchun [Xatolarni qayta ishlash](/guide/error-handling.html) o'qing.

## Qanday qilib plain HTMLni render qilishim mumkin?

Siz buni qilishingiz kerak emas! HTMLni `res.render()` orqali "render" qilish kerak emas.
Agar sizda shunday fayl bo'lsa, `res.sendFile()` ishlating.
Agar siz ko'pgina bunday fayllarni ishlatsangiz `express.static()` qayta ishlovchisi(middleware)ni ishlatishingiz mumkin.
