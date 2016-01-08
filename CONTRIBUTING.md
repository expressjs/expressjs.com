## Contributing to expressjs.com

This repository is only for issues related to the website [http://expressjs.com](http://expressjs.com). For issues related to Express, the framework, go to [https://github.com/strongloop/express](https://github.com/strongloop/express).

Feel free to make changes to the template files or the document files. The supporting docs are located in their respective directories, and the API docs are located under the `_includes` directory.

## Help translate the docs to other languages

We are looking for volunteers to help translate the Express docs to other languages.

Interested? Please follow these steps:

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

## Local Setup

GitHub Pages websites being served through [Jekyll](http://jekyllrb.com/), you will need to replicate the setup on your local machine to preview the website locally.

[Install Ruby](https://www.ruby-lang.org/en/documentation/installation/) and [Jekyll](http://jekyllrb.com/docs/installation/) on your system, if you don't have them already.

Once installed, `cd` to the repository directory and run Jekyll using the following command:

```
$ jekyll s
```

Then, load [http://localhost:4000/](http://localhost:4000/) on your browser.

Jekyll uses a variant of Markdown known as [Kramdown](http://kramdown.gettalong.org/quickref.html), read up the docs if you need to go beyond basic Markdown in the doc files.

To understand the template system used by Jekyll, read up the [Liquid template engine docs](http://liquidmarkup.org/).
