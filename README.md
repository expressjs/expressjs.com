# expressjs.com

This is the repository of the website [expressjs.com](https://expressjs.com). It is hosted directly from the repository as a [GitHub Pages](https://pages.github.com/) website.

## Local Setup

To preview the website locally:

1. Install [Ruby and Bundler](https://help.github.com/articles/setting-up-your-pages-site-locally-with-jekyll/) if you don't have them already.

1. Install the [jekyll-redirect-from](https://github.com/jekyll/jekyll-redirect-from) gem:

   ```
   $ gem install jekyll-redirect-from
   ```
   
1. clone this repository by running the following command:
   ```
   $ git clone https://github.com/expressjs/expressjs.com.git
   ```

1. navigate to the cloned repository directory and run the following command:

   ```
   $ bundle install
   ```

   Bundler will look in the Gemfile for which gems to install. The `github-pages` gem includes the same version of Jekyll and other dependencies as used by GitHub Pages, so that your local setup mirrors GitHub Pages as closely as possible.

1. Run Jekyll using the following command:

   ```
   $ bundle exec jekyll serve
   ```

   Then, load <http://localhost:4000> in your browser.

## Formatting

Jekyll uses a variant of Markdown known as [Kramdown](https://kramdown.gettalong.org/quickref.html).

Jekyll uses the [Liquid template engine](http://liquidmarkup.org/) for templating.

You can use [GFM](https://kramdown.gettalong.org/parser/gfm.html) fenced code blocks for JavaScript; for example:

<pre>
```js
var express = require('express')
var app = express()
app.listen(3000)
```
</pre>

The result looks like this:

```js
const express = require('express')
const app = express()
app.listen(3000)
```

The default GitHub Pages syntax highlighting has been disabled in `_config.yml` to allow highlighting with [prism.js](https://prismjs.com/).

## Contributing

Feel free to make changes to the template files or the document files. The supporting docs are located in their respective directories, and the API docs are located under the `_includes` directory.

Please see the [Contributors' Guide](CONTRIBUTING.md) for more information on contributing to the documentation, including information on contributing translations.

## Why use Jekyll instead of an Express-based solution?

Jekyll comes built-in with GitHub Pages. Since we are already using GitHub Pages to host the website, it makes sense to leverage the capabilities it provides. It's all about using the right tool, for the right job, under the right circumstances.
