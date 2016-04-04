---
layout: page
title: Express application generator
menu: starter
lang: en
redirect_from: "/starter/generator.html"
---

# Express application generator

Use the application generator tool, `express-generator`, to quickly create an application skeleton.

Install `express-generator` with the following command:

<pre><code class="language-sh" translate="no">
$ npm install express-generator -g
</code></pre>

Display the command options with the `-h` option:

<pre><code class="language-sh" translate="no">
$ express -h

  Usage: express [options] [dir]

  Options:

    -h, --help          output usage information
    -V, --version       output the version number
    -e, --ejs           add ejs engine support (defaults to pug)
        --hbs           add handlebars engine support
    -H, --hogan         add hogan.js engine support
    -c, --css &lt;engine&gt;  add stylesheet &lt;engine&gt; support (less|stylus|compass|sass) (defaults to plain css)
        --git           add .gitignore
    -f, --force         force on non-empty directory
</code></pre>

For example, the following creates an Express app named _myapp_ in the current working directory:

<pre><code class="language-sh" translate="no">
$ express myapp

   create : myapp
   create : myapp/package.json
   create : myapp/app.js
   create : myapp/public
   create : myapp/public/javascripts
   create : myapp/public/images
   create : myapp/routes
   create : myapp/routes/index.js
   create : myapp/routes/users.js
   create : myapp/public/stylesheets
   create : myapp/public/stylesheets/style.css
   create : myapp/views
   create : myapp/views/index.pug
   create : myapp/views/layout.pug
   create : myapp/views/error.pug
   create : myapp/bin
   create : myapp/bin/www
</code></pre>

Then install dependencies:

<pre><code class="language-sh" translate="no">
$ cd myapp
$ npm install
</code></pre>

On MacOS or Linux, run the app with this command:

<pre><code class="language-sh" translate="no">
$ DEBUG=myapp:* npm start
</code></pre>

On Windows, use this command:

<pre><code class="language-sh" translate="no">
> set DEBUG=myapp:* & npm start
</code></pre>

Then load `http://localhost:3000/` in your browser to access the app.

The generated app has the following directory structure:

<pre><code class="language-sh" translate="no">
.
├── app.js
├── bin
│   └── www
├── package.json
├── public
│   ├── images
│   ├── javascripts
│   └── stylesheets
│       └── style.css
├── routes
│   ├── index.js
│   └── users.js
└── views
    ├── error.pug
    ├── index.pug
    └── layout.pug

7 directories, 9 files
</code></pre>

<div class="doc-box doc-info" markdown="1">
The app structure created by the generator is just one of many ways to structure Express apps. Feel free to use this structure or modify it to best suit your needs.
</div>
