---
layout: page
title: Express FAQ
menu: starter
lang: uk
---

# FAQ

## Яку структуру я повинен використовувати для свого додатку?

Немає єдиної відповіді на дане питання. Все залежить від
розміру вашого додатку та від команди яка приймає участь у розробці Для того що б бути
як можливо гнучким, Express не чинить ніяких припущень за структурою.

Маршрутизація та інша логіка додатку можуть розміщуватися в багатьох файлах як ви
вважаєте за потрібне, і мати будь-яку структурі каталогів якій ви віддасте перевагу.
Подивіться наступні приклади для натхнення:

* [Додавання маршрутів](https://github.com/strongloop/express/blob/master/examples/route-separation/index.js#L19)
* [Карта маршрутів](https://github.com/strongloop/express/blob/master/examples/route-map/index.js#L47)
* [Контролери в MVC стилі](https://github.com/strongloop/express/tree/master/examples/mvc)

Також, існують сторонні розширення для Express, які спрощують деякі з цих шаблонів:

* [Resourceful маршрутизація](https://github.com/expressjs/express-resource)
* [Namespaced маршрутизація](https://github.com/expressjs/express-namespace)

## Як я можу визначити моделі?

Express не має визначення для роботи з базою даних. Цю роботу мають виконувати сторонні модулі Node, що дозволяє вам взаємодіяти з практично будь-якою базою данних.

Дивіться [LoopBack](tcp: //loopback.io) фреймворк на базі Express зосереджений на роботі з моделями.

## Як я можу аутентифікувати користувачів?

Це ще одна своєрідна область, яку Express не включає в себе.
Ви можете використовувати будь-яку схему аутентифікації.
Для простої username / password схеми, дивіться [цей приклад](https://github.com/strongloop/express/tree/master/examples/auth).


## Який шаблонизатор підтримує Express?

Express підтримує будь-який шаблонізатор який узгоджується з `(path, locals, callback)` сигнатурою.
Для нормалізації інтерфейсів шаблонізатора і кешування, дивіться
[consolidate.js](https://github.com/visionmedia/consolidate.js)
проект для допомоги. НЕ заявлені шаблонизатори також можуть підтримувати Express сигнатуру.

## Як я можу надавати статичні файли з декількох директорій?

Ви можете використовувати будь-який проміжний обробник кілька разів у вашому додатку. С нижче наведеними налаштуваннями проміжних обробників, запит на отримання `GET /javascripts/jquery.js`, першочергово перевірить`. /public/javascripts/jquery.js`;
якщо файл в даній директорії не існує, тоді перевірка буде зроблена в подальшому проміжному обробнику `. /files/javascripts/jquery.js`.

<pre><code class="language-javascript" translate="no">
app.use(express.static('public'));
app.use(express.static('files'));
</code></pre>

## Як я можу вказати префікс шляху для роздачі статичних файлів?

За допомогою базової можливості Connect "mounting" ви можете визначити "префікс" для того middleware який буде виконаний.
Це ефективно працює як ніби префікс ніколи не був частиною шляху.
Уявімо, що вам потрібно `GET /files/javascripts/jquery.js`.
Ви можете встановити `/files` префікс, визначити` /javascripts/jquery.js`
як `req.url`, тим самим вказавши middleware файл для видачі:

<pre><code class="language-javascript" translate="no">
app.use('/public', express.static('public'));
</code></pre>

## Як ви обробляєте 404 помилку?

У Express, 404 помилку не являеться результатом помилки. Тому,
обробник помилок middleware не спіймаэ 404. Тому що 404
є всього лише фактом відсутності додаткової роботи;
Говорячи інакше, Express виконає всі
проміжні обробники (middleware) / Роутінг (routes),
і виявить що жоден з них не повертаэ результат роботи.
Все що вам потрібно зробити це додати обробник (middleware) в кінці (після всіх інших)
для обробки 404:

<pre><code class="language-javascript" translate="no">
app.use(function(req, res, next){
  res.send(404, 'Sorry cant find that!');
});
</code></pre>

## Як ви визначаєте обробник помилок?

Ви можете визначити middleware обробник помилок тим же самим чином як і інші обробники (middleware),
з відзнакою вказівки чотирьох аргументів замість трьох; з певною сигнатурою `(err, req, res, next)`:


<pre><code class="language-javascript" translate="no">
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});
</code></pre>

Для більш детальної інформації, дивіться [Обробка помилок](/guide/error-handling.html).

## Як я можу рендерить для видачі plain HTML?

Вам не потрібно цього робити! Немає потреби "рендерить" HTML за допомогою `res.render()`.
Якщо у вас є такий файл, використовуйте `res.sendFile()`.
Якщо ви надаєте багато таких файлів з директорії використовуйте `express.static()`
обробник (middleware).
