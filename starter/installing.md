---
layout: page
---

# Installing

First, create a directory to hold your application, if you haven't already done so, and make that your working directory.

{% highlight bash %}
$ mkdir myapp
$ cd myapp
{% endhighlight %}

Create a `package.json` file in the directory of interest, if it does not exist already, with the `npm init` command.

{% highlight bash %}
$ npm init
{% endhighlight %}

Install Express in the app directory and save it in the dependencies list:

{% highlight bash %}
$ npm install express --save
{% endhighlight %}

To install Express temporarily, and not add it to the dependencies list, omit the `--save` option:

{% highlight bash %}
$ npm install express
{% endhighlight %}

<div class="doc-box doc-info">
Node modules installed with the `--save` option are added to the `dependencies` list in the `package.json` file.
Then using `npm install` in the app directory will automatically install modules in the dependencies list.
</div>
