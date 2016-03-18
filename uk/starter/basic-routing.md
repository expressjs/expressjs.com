---
layout: page
title: Базова маршрутизація Express
menu: starter
lang: uk
---

# Базова маршрутизація

_Маршрутизація_ визначає: яку саме відповідь застосунок буде видавати клієнту,
коли від клієнта йде запит з використанням певного HTTP-методу (GET, POST, і т.д.) та по конкретному URI.

Кожен маршрут може мати одну чи більше функцій-обробників, що виконуються, коли даний маршрут затверджено як співпадаючий.

Визначення маршрутів має наступну структуру:
<pre><code class="language-javascript" translate="no">
app.METHOD(PATH, HANDLER)
</code></pre>

Де:

- `app` є екземпляром `express`.
- `METHOD` є [методом HTTP-запиту](https://uk.wikipedia.org/wiki/HTTP).
- `PATH` є шляхом на сервері.
- `HANDLER` є функцією-обробником, що спрацьовує, коли даний маршрут затверджено як співпадаючий.

<div class="doc-box doc-notice" markdown="1">
В цьому керівництві припускається, що у вас вже створено та запущено екземпляр веб-сервера `express` і його передано у змінну з іменем `app`.
Якщо ви ще не вмієте створювати екземпляри застосунків та запускати їх, прогляньте [Приклад Hello world](/{{ page.lang }}/starter/hello-world.html).
</div>

В наступних прикладах продемонстровано визначення простих маршрутів.

Визначення маршруту, що відповідає на GET-запити до головної сторінки, в результаті чого друкується `Hello World!`:

<pre><code class="language-javascript" translate="no">
app.get('/', function (req, res) {
  res.send('Hello World!');
});
</code></pre>

Визначення маршруту, що відповідає на POST-запити до кореневого маршруту (`/`), тобто до головної сторінки:

<pre><code class="language-javascript" translate="no">
app.post('/', function (req, res) {
  res.send('Маємо POST-запит');
});
</code></pre>

Визначення маршруту, що відповідає на PUT-запити до `/user`:

<pre><code class="language-javascript" translate="no">
app.put('/user', function (req, res) {
  res.send('Маємо PUT-запит до /user');
});
</code></pre>

Визначення маршруту, що відповідає на DELETE-запити до `/user`:

<pre><code class="language-javascript" translate="no">
app.delete('/user', function (req, res) {
  res.send('Маємо DELETE-запит до /user');
});
</code></pre>

Більш детально про маршрутизацію описано на сторінці [гід маршрутизації](/{{ page.lang }}/guide/routing.html).
