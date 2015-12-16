---
layout: page
title: Serving static files in Express
menu: starter
lang: ko
---

# Serving static files in Express

Serving files, such as images, CSS, JavaScript and other static files is accomplished with the help of a built-in middleware in Express - `express.static`.

Pass the name of the directory, which is to be marked as the location of static assets, to the `express.static` middleware to start serving the files directly. For example, if you keep your images, CSS, and JavaScript files in a directory named `public`, you can do this:

<pre><code class="language-javascript" translate="no">
app.use(express.static('public'));
</code></pre>

Now, you will be able to load the files under the `public` directory:

<pre class="plain-text"><code class="plain-text" translate="no">
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
</code></pre>

<div class="doc-box doc-info">
The files are looked up relative to the static directory, therefore, the name of the static directory is not a part of the URL.
</div>

If you want to use multiple directories as static assets directories, you can call the `express.static` middleware multiple times:

<pre><code class="language-javascript" translate="no">
app.use(express.static('public'));
app.use(express.static('files'));
</code></pre>

The files will be looked up in the order the static directories were set using the `express.static` middleware.

If you want to create a "virtual" (since the path does not actually exist in the file system) path prefix for the files served by `express.static`, you can [specify a mount path](/{{ page.lang }}/4x/api.html#app.use) for the static directory, as shown below:

<pre><code class="language-javascript" translate="no">
app.use('/static', express.static('public'));
</code></pre>

Now, you will be able to load the files under the `public` directory, from the path prefix "/static".

<pre class="plain-text"><code class="plain-text" translate="no">
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
</code></pre>
