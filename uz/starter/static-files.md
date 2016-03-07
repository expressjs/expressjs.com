---
layout: page
title: Expressda server statik fayllar
menu: starter
lang: uz
---

# Expressda server statik fayllar
Serverda statik fayllar bu rasmlar, CSS, JavaScript va fayllarni misol qilish mumkin, ular Expressda o'rnatilgan Expressda o'rnatilgan `express.static` middleware orqali ko'rsatiladi.

Statik fayllarni qayerda joylashini ko'rsatish uchun `express.static` oraliq qayta ishlovchisiga direktoriya nomini jo'nating.
Masalan, siz o'z rasmlaringizni, CSS, JavaScriptlarni `public` direktoriyasida saqlamoqchi bo'lsangiz unda quyidagicha bo'ladi

<pre><code class="language-javascript" translate="no">
app.use(express.static('public'));
</code></pre>

Undan keyin `public` direktoriyasini ko'rsatmagan holda statik fayllarni yuklashingiz mumkin bo'ladi:

<pre class="plain-text"><code class="plain-text" translate="no">
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
</code></pre>

<div class="doc-box doc-info">
Fayllar faqat statik direktoriyadan qidiriladi, faylning nomi qanday bo'lishidan qaramay u statik fayl hisoblanadi, statik direktoriya esa URLga hech qanday ta'sir ko'rsatmaydi.
</div>

Agar siz ko'pgina direktoriyani statik qilmoqchi bo'lsangiz unda, `express.static` oraliq qayta ishlovchisini yana foydalanishingiz mumkin:

<pre><code class="language-javascript" translate="no">
app.use(express.static('public'));
app.use(express.static('files'));
</code></pre>

Fayllar ketma-ketlik bo'yicha statik direktoriyadan joy olishda va `express.static` orqali o'rnatiladi.

Agar siz "virtual" (huddi manzil lekin fayl sistemada mavjud emas) fayllardan oldin prefix qo'shimchalik yaratmoqchi bo'lsangiz, `express.static` ikkita argument jo'nating, qo'shimcha ma'lumotni esa [bu yerdan](/4x/api.html#app.use) olishingiz mumkin bo'ladi. Ishlatishga misol esa:

<pre><code class="language-javascript" translate="no">
app.use('/static', express.static('public'));
</code></pre>

Endi esa `public` direktoriyansidagi statik fayllarni "/static" prefiksi orqali olinadi.

<pre class="plain-text"><code class="plain-text" translate="no">
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
</code></pre>
Agarda siz `express.static` orqali ko'rsatgan direktoriyangiz boshqa joyda ishga tushmasa, Siz uning absolyut manzilini ko'rsatishingiz kerak bo'ladi, masalan u mana bunday bo'ladi:

<pre><code class="language-javascript" translate="no">
app.use('/static', express.static(__dirname + '/public'));
</code></pre>
