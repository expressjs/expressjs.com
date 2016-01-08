---
### TRANSLATION INSTRUCTIONS FOR THIS SECTION:
### TRANSLATE THE VALUE OF THE title ATTRIBUTE AND UPDATE THE VALUE OF THE lang ATTRIBUTE. 
### DO NOT CHANGE ANY OTHER TEXT. 
layout: page
title: Installing Express
menu: starter
lang: en
redirect_from: "/starter/installing.html"
### END HEADER BLOCK - BEGIN GENERAL TRANSLATION
---

# Installing

Assuming you've already installed [Node.js](https://nodejs.org/), create a directory to hold your application, and make that your working directory.

<pre><code class="language-sh" translate="no">
$ mkdir myapp
$ cd myapp
</code></pre>

Use the `npm init` command to create a `package.json` file for your application.
For more information on how `package.json` works, see [Specifics of npm's package.json handling](https://docs.npmjs.com/files/package.json).

<pre><code class="language-sh" translate="no">
$ npm init
</code></pre>

This command prompts you for a number of things, such as the name and version of your application.
For now, you can simply hit RETURN to accept the defaults for most of them, with the following exception:

<pre><code class="language-sh" translate="no">
entry point: (index.js)
</code></pre>

Enter `app.js`, or whatever you want the name of the main file to be. If you want it to be `index.js`, hit RETURN to accept the suggested default file name.

Now install Express in the `app` directory and save it in the dependencies list. For example:

<pre><code class="language-sh" translate="no">
$ npm install express --save
</code></pre>

To install Express temporarily and not add it to the dependencies list, omit the `--save` option:

<pre><code class="language-sh" translate="no">
$ npm install express
</code></pre>

<div class="doc-box doc-info" markdown="1">
Node modules installed with the `--save` option are added to the `dependencies` list in the `package.json` file.
Afterwards, running `npm install` in the `app` directory will automatically install modules in the dependencies list.
</div>
