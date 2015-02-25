# expressjs.com

This is the repository of the website [expressjs.com](http://expressjs.com). It is hosted directly from the repository as a [GitHub Pages](https://pages.github.com/) website.

## Local Setup

GitHub Pages websites being served through [Jekyll](http://jekyllrb.com/), you will need to replicate the setup on your local machine to preview the website locally.

[Install Ruby](https://www.ruby-lang.org/en/documentation/installation/) and [Jekyll](http://jekyllrb.com/docs/installation/) on your system, if you don't have them already.

Once installed, `cd` to the respository directory and run Jekyll using the following command:

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

## How do I help translate the docs to a certain language?

Follow these steps:

1. Create a directory for the language of your choice using its [ISO 639-1 code](http://en.wikipedia.org/wiki/ISO_639-1) as its name.
2. Copy `index.md`, `api.md`, `starter/`, `guide/`, `api/`, `advanced/`, and `resources/` to the language directory.
3. Update the `lang` variable in the markdown files in the copied file to the language you have selected.
4. Create the header and footer HTML files for the language in the `_includes/` directory.
5. Copy the `_includes/api/en` to the language of your choice.
