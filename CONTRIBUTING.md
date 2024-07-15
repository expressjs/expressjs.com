## Contributing to expressjs.com

This repository is only for issues related to the website [http://expressjs.com](http://expressjs.com). For issues related to Express, the framework, go to [https://github.com/expressjs/express](https://github.com/expressjs/express).

Feel free to make changes to the template files or the document files. The supporting docs are located in their respective directories, and the API docs are located under the `_includes` directory.

Content on this site is licensed under a Creative Commons Attribution-ShareAlike 3.0 United States License.  See https://creativecommons.org/licenses/by-sa/3.0/us/ for a layman's summary; 
See [LICENSE.md](LICENSE.md) for the full license.

## Contributing translations

We highly encourage community translations! We no longer have professional translations, and we believe in the power of our community to provide accurate and helpful translations.

The documentation is translated into these languages:
- English (`en`)
- Spanish (`es`)
- French (`fr`)
- Italian (`it`)
- Indonesian (`id`)
- Japanese (`ja`)
- Korean (`ko`)
- Brazilian Portuguese (`pt-br`)
- Russian (`ru`)
- Slovak (`sk`)
- Thai (`th`)
- Turkish (`tr`)
- Ukrainian (`uk`)
- Uzbek (`uz`)
- Simplified Chinese (`zh-cn`)
- Traditional Chinese (`zh-tw`)

To find translations that need to be done, you can [filter for merged PRs](https://github.com/expressjs/expressjs.com/pulls?q=is%3Apr+is%3Aclosed+label%3Arequires-translation-es) that include the tag for your language, such as `requires-translation-es`.

When you contribute a translation, please reference the original PR. This helps the person merging your translation to remove the `requires-translation-es` tag from the original PR.


### Adding new translations

To contribute a translation into another language, following the procedure below.

Follow these steps:

0. Clone the [`expressjs.com` repository](https://github.com/expressjs/expressjs.com)
1. Create a directory for the language of your choice using its [ISO 639-1 code](http://www.loc.gov/standards/iso639-2/php/code_list.php) as its name.
2. Copy `index.md`, `api.md`, `starter/`, `guide/`, `advanced/`, `resources/`, `4x/`, and `3x/`, to the language directory.
3. Remove the link to 2.x docs from the "API Reference" menu.
4. Update the `lang` variable in the copied markdown files.
5. Update the `title` variable in the copied markdown files.
6. Create the header, footer, notice, and announcement file for the language in the `_includes/` directory, in the respective directories, and make necessary edits to the contents.
7. Create the announcement file for the language in the `_includes/` directory.
9. Make sure to append `/{{ page.lang }}` to all the links within the site.
10. Update the `CONTRIBUTING.md` and the `.github/workflows/translation.yml` files with the new language


Thank you for your interest in contributing to expressjs.com. Your efforts help make our documentation accessible to everyone!