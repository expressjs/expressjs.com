---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE.
### DO NOT CHANGE ANY OTHER TEXT.
layout: page
title: Serving static files in Express
menu: starter
lang: en
redirect_from: "/starter/static-files.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

# Serving static files in Express

To serve static files such as images, CSS files, and JavaScript files, use the `express.static` built-in middleware function in Express.

Pass the name of the directory that contains the static assets to the `express.static` middleware function to start serving the files directly. For example, use the following code to serve images, CSS files, and JavaScript files in a directory named `public`:

<pre><code class="language-javascript" translate="no">
app.use(express.static('public'));
</code></pre>

Now, you can load the files that are in the `public` directory:

<pre class="plain-text"><code class="plain-text" translate="no">
http://localhost:3000/images/kitten.jpg
http://localhost:3000/css/style.css
http://localhost:3000/js/app.js
http://localhost:3000/images/bg.png
http://localhost:3000/hello.html
</code></pre>

<div class="doc-box doc-info">
Express looks up the files relative to the static directory, so the name of the static directory is not part of the URL.
</div>

To use multiple static assets directories, call the `express.static` middleware function multiple times:

<pre><code class="language-javascript" translate="no">
app.use(express.static('public'));
app.use(express.static('files'));
</code></pre>

Express looks up the files in the order in which you set the static directories with the `express.static` middleware function.

To create a virtual path prefix (where the path does not actually exist in the file system) for files that are served by the `express.static` function, [specify a mount path](/{{ page.lang }}/4x/api.html#app.use) for the static directory, as shown below:

<pre><code class="language-javascript" translate="no">
app.use('/static', express.static('public'));
</code></pre>

Now, you can load the files that are in the `public` directory from the `/static` path prefix.

<pre class="plain-text"><code class="plain-text" translate="no">
http://localhost:3000/static/images/kitten.jpg
http://localhost:3000/static/css/style.css
http://localhost:3000/static/js/app.js
http://localhost:3000/static/images/bg.png
http://localhost:3000/static/hello.html
</code></pre>

However, the path that you provide to the `express.static` function is relative to the directory from where you launch your `node` process. If you run the express app from another directory, it's safer to use the absolute path of the directory that you want to serve:

<pre><code class="language-javascript" translate="no">
app.use('/static', express.static(__dirname + '/public'));
</code></pre>
