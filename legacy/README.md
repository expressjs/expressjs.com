# expressjs.com

This is the repository of the website [expressjs.com](https://expressjs.com). It is hosted directly from the repository as a [GitHub Pages](https://pages.github.com/) website.

## Contributing

Any person who wants to contribute to the Website is welcome! Please read [Contributors' Guide](CONTRIBUTING.md) for more information on contributing to the Express.js documentation.

## Translations

If you're interested in contributing to the site's translations, you can find more information [here](https://github.com/expressjs/expressjs.com/blob/gh-pages/CONTRIBUTING.md#contributing-translations).

## Build the website locally

>[!NOTE]
>If you're only making changes to the content, you most likely won't need to run the site locally.

To preview the website locally, we have two options: using Docker or using Bundler.

### Using Docker

>[!TIP]
> You can run `make help` to obtain detailed information on how to use our make commands.

1. Ensure that you have Docker and Make installed.
1. Run `make build` to build the project.
1. Run `make serve` to serve the project, this include live reloading so any change will be reflected (it can take a while, check the logs).
1. Run `make clean` to remove the docker images and resources generated.

### Using Bundle

1. Install [Ruby and Bundler](https://help.github.com/articles/setting-up-your-pages-site-locally-with-jekyll/) if you don't have them already.

1. Install the [jekyll-redirect-from](https://github.com/jekyll/jekyll-redirect-from) gem:

   ```sh
   $ gem install jekyll-redirect-from
   ```
   
1. Clone this repository by running the following command:

   ```sh
   $ git clone https://github.com/expressjs/expressjs.com.git
   ```

1. Navigate to the cloned repository directory and run the following command:

   ```sh
   $ bundle install
   ```

   Bundler will look in the Gemfile for which gems to install. The `github-pages` gem includes the same version of Jekyll and other dependencies as used by GitHub Pages, so that your local setup mirrors GitHub Pages as closely as possible.

1. Run Jekyll using the following command:

   ```sh
   $ bundle exec jekyll serve
   ```

   Then, load <http://localhost:4000> in your browser.

## License

Content submitted to [expressjs.com](https://expressjs.com/) is Creative Commons Attribution 4.0 International licensed, as found in the [LICENSE.md](LICENSE.md) file.
