# expressjs.com

This is the repository of the website [expressjs.com](http://expressjs.com). It is hosted directly from the repository as a [GitHub Pages](https://pages.github.com/) website.

## Local Setup

GitHub Pages websites being served through [Jekyll](http://jekyllrb.com/), you will need to replicate the setup on your local machine to preview the website locally.

[Install Ruby](https://www.ruby-lang.org/en/documentation/installation/) and [Jekyll](http://jekyllrb.com/docs/installation/) on your system, if you don't have them already.

Install the [jekyll-redirect-from](https://github.com/jekyll/jekyll-redirect-from) gem:
```
$ gem install jekyll-redirect-from`
```

Once installed, `cd` to the repository directory and run Jekyll using the following command:

```
$ jekyll s
```

Then, load [http://localhost:4000/](http://localhost:4000/) on your browser.

Jekyll uses a variant of Markdown known as [Kramdown](http://kramdown.gettalong.org/quickref.html), read up the docs if you need to go beyond basic Markdown in the doc files.

To understand the template system used by Jekyll, read up the [Liquid template engine docs](http://liquidmarkup.org/).

## Contributing

Feel free to make changes to the template files or the document files. The supporting docs are located in their respective directories, and the API docs are located under the `_includes` directory.

## Showcasing

If you have an app you'd like to showcase on the site, open a pull request for it.

## Why use Jekyll instead of an Express-based solution?

Jekyll comes built-in with GitHub Pages. Since we are already using GitHub Pages to host the website, it makes sense to leverage the capabilities it provides. It's all about using the right tool, for the right job, under the right circumstances.

## How do I help translate the docs to another language?

**IMPORTANT:** We [recently announced](https://strongloop.com/strongblog/express-goes-global/) that we are getting professional translation of the Express documentation into the following languages:
- German
- French
- Italian
- Spanish
- Brazilian Portuguese
- Japanese
- Simplified Chinese
- Traditional Chinese
- Russian
- Korean

Therefore we can no longer accept community translations for these languages.  However, we welcome contributions of translations into other languages, following the procedure below.

Follow these steps:

0. Clone the [Express repository](https://github.com/strongloop/expressjs.com)
1. Create a directory for the language of your choice using its [ISO 639-1 code](http://www.loc.gov/standards/iso639-2/php/code_list.php) as its name.
2. Copy `index.md`, `api.md`, `starter/`, `guide/`, `advanced/`, `resources/`, `4x/`, and `3x/`, to the language directory.
3. Remove the link to 2.x docs from the "API Reference" menu.
4. Update the `lang` variable in the copied markdown files.
5. Update the `title` variable in the copied markdown files.
6. Create the header, footer, notice, and announcement file for the language in the `_includes/` directory, in the respective directories, and make necessary edits to the contents.
7. Create the announcement file for the language in the `_includes/` directory.
8. Create a copy of the `_includes/api/en` and rename it according to the language code.
9. Make sure to append `/{{ page.lang }}` to all the links within the site.
