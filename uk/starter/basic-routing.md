---
layout: page
title: Базова маршрутизація Express
menu: starter
lang: uk
---

# Базова маршрутизація

_Маршрутизація_ визначає, яку відповідь застосунок буде видавати клієнту, що посилає запит певним HTTP-методом (GET, POST, і т.д.) по конкретному URI.

Кожен маршрут може мати одну чи більше функцій-обробників, що виконуються, коли даний маршрут затверджено як співпадаючий.

Визначення маршрутів має наступну структуру:
<pre><code class="language-javascript" translate="no">
app.METHOD(PATH, HANDLER)
</code></pre>

Де:

- `app` є екземпляром `express`.
- `METHOD` є [методом HTTP-запиту](https://uk.wikipedia.org/wiki/HTTP).
- `PATH` є шляхом на сервері.
- `HANDLER` є функцією-обробником, коли даний маршрут затверджено як співпадаючий.

<div class="doc-box doc-notice" markdown="1">
В цьому керівництві припускається, що екземпляр `express` з іменем `app` створено, а сервер вже працює. Якщо ви ще не вмієте створювати екземпляри застосунків та запускати їх, прогляньте [Приклад Hello world](/{{ page.lang }}/starter/hello-world.html).
</div>

В наступному прикладі показано просте визначення маршрутів.

Відповідає на GET-запит головної сторінки, в результаті чого друкується `Hello World!`:

<pre><code class="language-javascript" translate="no">
app.get('/', function (req, res) {
  res.send('Hello World!');
});
</code></pre>

Відповідає на POST-запит кореневого маршруту (`/`), тобто головної сторінки:

<pre><code class="language-javascript" translate="no">
app.post('/', function (req, res) {
  res.send('Маємо POST-запит');
});
</code></pre>

Відповідає на PUT-запит по маршруту `/user`:

<pre><code class="language-javascript" translate="no">
app.put('/user', function (req, res) {
  res.send('Маємо PUT-запит до /user');
});
</code></pre>

Відповідає на DELETE-запит по маршруту `/user`:

<pre><code class="language-javascript" translate="no">
app.delete('/user', function (req, res) {
  res.send('Маємо DELETE-запит до /user');
});
</code></pre>

Більш детально про маршрутизацію описано на сторінці [гід маршрутизації](/{{ page.lang }}/guide/routing.html).
