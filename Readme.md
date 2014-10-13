# ExpressJS.com

  The site for Express.

## Building

Setup:

```
$ npm install -g serve
$ npm install
$ make
$ serve .
$ open http://localhost:3000
```

then rebuild changes with:

```
$ make
```

## Contributing

Markdown files are the authoring / source files that generate HTML files that are the publishing format.  The website is served from the HTML pages in the `gh-pages` branch.  Jade files are used to create a page with appropriate header, footer, and one or more markdown files.  Generally, you shouldn't need to edit Jade files unless you are adding a new page or reorganizing pages.

  - __Don't__ edit the HTML directly.  Instead, edit the Markdown file(s), then generate the HTML using `make` to view your changes locally.
  - In general, PRs should contain both Markdown file(s) and resultant generated HTML file(s).  However, very small PRs or commits can be just the Markdown source, with the understanding the the HTML will be regenerated later to incorporate numerous changes.
  - To publish a change, you must commit the HTML files.  

## Showcasing

If you have an app you'd like to showcase on the site, do not just open an issue for it.
Instead, _open a pull request_ for it.
