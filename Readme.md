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

The Jade files are the authoring / source files that generate HTML files that are the publishing format.  The website is served from the HTML pages in the `gh-pages` branch.

  - __Don't__ edit the HTML directly, edit the Jade files, then generate the HTML using `make` to view your changes locally.
  - In general, PRs should contain both Jade files and resultant generated HTML files.  However, very small PRs or commits can be just the Jade source, with the understanding the the HTML will be regenerated later to incorporate numerous Jade changes.
  - To publish a change, you must commit the HTML files.  

## Showcasing

If you have an app you'd like to showcase on the express site,
do not just open an issue for it.
Instead, _open a pull request_ for it.
