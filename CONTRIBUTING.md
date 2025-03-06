# Contributing to Expressjs.com

### The Official Documentation of the Express JS Framework

This is the contribution documentation for the [Expressjs.com](https://github.com/expressjs/expressjs.com) website.

>[!NOTE]
> This is not the repo for Express JS framework. To contribute to the _[Express JS framework](https://github.com/expressjs/express_)_, check out the [Github repo contributing page](https://github.com/expressjs/express/blob/master/Contributing.md) or the website's [Contributing to Express](https://expressjs.com/en/resources/contributing.html) page.


#### Need some ideas? These are some typical issues.

1.  **Website issues**: 
If you see anything on the site that could use a tune-up, think about how to fix it.

    - Display or screen sizing problems
    - Mobile responsiveness issues
    - Missing or broken accessibility features 
    - Website outages
    - Broken links
    - Page structure or user interface enhancements


2. **Content Issues**: 
Fix anything related to site content or typos.
    - Spelling errors
    - Incorrect/outdated Express JS documentation
    - Missing content


3. **Translation Issues**: Fix any translation errors or contribute new content.
    - Fix spelling errors 
    - Fix incorrect/poorly translated words
    - Translate new content
> [!IMPORTANT]
> All translation submissions are currently paused. See this [notice](#notice-we-have-paused-all-translation-contributions) for more information.

   - Check out the [Contributing translations](#contributing-translations) section below for a contributing guide.

#### Want to work on a backlog issue?

We often have bugs or enhancements that need work. You can find these under our repo's [Issues tab](https://github.com/expressjs/expressjs.com/issues). Check out the tags to find something that's a good match for you.

#### Have an idea? Found a bug?

If you've found a bug or a typo, or if you have an idea for an enhancement, you can:
- Submit a [new issue](https://github.com/expressjs/expressjs.com/issues/new/choose) on our repo. Do this for larger proposals, or if you'd like to discuss or get feedback first. 
- Make a [Github pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request). If you have already done work and it's ready to go, feel free to send it our way.

## Getting Started

The steps below will guide you through the Expressjs.com contribution process.

#### Step 1: (OPTIONAL) Open a New Issue
So you've found a problem that you want to fix, or have a site enhancement you want to make. 
1. If you want to get feedback or discuss, open a discussion [issue](https://github.com/expressjs/expressjs.com/issues/new/choose) prior to starting work. This is not required, but encouraged for larger proposals. 
    - While we highly encourage this step, it is only for submissions proposing significant change. It  helps us to clarify and focus the work, and ensure it aligns with overall project priorities.
    - For submissions proposing minor improvements or corrections, this is not needed. You can skip this step.
    - When opening an issue please give it a title and fill in the description section. The more details you provide, the more feedback we can give.

2. After receiving your issue the Express JS documentation team will respond with feedback. We read every submission and always try to respond quickly with feedback. 
    - For submissions proposing significant change, we encourage you to follow the review process before starting work. 

#### Step 2: Get the Application Code Base

Clone the repo and get the code:

    git clone https://github.com/expressjs/expressjs.com.git

After you've got the code you're ready to start making your changes! 

But just in case you need a little extra explanation, this section below outlines the main sections of the code base, where most changes are likely to be made.  

**Markdown Page Files**: 
- These files render to html and make up the individual pages of the site. Most of the site's documentation text content is written in `md` files.
- Change these to make changes to individual pages' content/text or markup. 
- Each language has its own complete set of pages, located under their respective language directories - all the Spanish markdown content is found in the `es` directory, for example. 

**Includes Partials and Layout Templates**
- `_includes` are partials that are imported and reused across multiple pages.
  - These are used to import text content for reuse across pages, such as the API documentation, e.g., `_includes > api > en > 5x`, which is included in every language.
  - These are used to include the page components that make up site-wide user interface and periphery structure, e.g., Header, Footer, etc.
- `_layouts` are the templates used to wrap the site's individual pages. 
  - These are used to display the structure of the site's periphery, such as the header and footer, and for injecting and displaying individual markdown pages inside the `content` tag.

**Blog Markdown Files**
- These files make up the individual blog posts. If you want to contribute a blog post please
follow the specific instructions for [How to write a blog post.](https://expressjs.com/en/blog/write-post.html)
- Located under the `_posts` directory. 

**CSS or Javascript**
- All css and js files are kept in `css` and `js` folders on the project root.

The Express JS website is build using [Jeykyll](https://jekyllrb.com/) and is hosted on [Github Pages](https://pages.github.com/).

#### Step 3: Running the Application


Now you'll need a way to see your changes, which means you'll need a running version of the application. You have two options. 
1. __Run Locally__: This gets the local version of the application up and running on your machine. Follow our [Local Setup Guide](https://github.com/expressjs/expressjs.com?tab=readme-ov-file#local-setup) to use this option.  
    - This is the recommended option for moderate to complex work. 
2. __Run using Deploy Preview__: Use this option if you don't want to bother with a local installation. Part of our continuous integration pipeline includes [Netlify Deploy Preview](https://docs.netlify.com/site-deploys/deploy-previews/). 
    1. To use this you'll need to get your changes online - after you've made your first commit on your feature branch, make a *draft* pull request. 
    2. After the build steps are complete, you'll have access to a __Deploy Preview__ tab that will run your changes on the web, rebuilding after each commit is pushed. 
    3. After you are completely done your work and it's ready for review, remove the draft status on your pull request and submit your work.
  
## Contributing translations

#### Notice: We have paused all translation contributions. 
> [!IMPORTANT]
> We are currently working toward a more streamlined translations workflow. As long as this notice is posted, we will _not_ be accepting any translation submissions. 

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

### Adding New Full Site Translations

If you find a translation is missing from the list you can create a new one.

To translate Expressjs.com into a new language, follow these steps:

1. Clone the [`expressjs.com`](https://github.com/expressjs/expressjs.com) repository.
2. Create a directory for the language of your choice using its [ISO 639-1 code](https://www.loc.gov/standards/iso639-2/php/code_list.php) as its name.
3. Copy `index.md`, `api.md`, `starter/`, `guide/`, `advanced/`, `resources/`, `4x/`, and `3x/`, to the language directory.
4. Remove the link to 2.x docs from the "API Reference" menu.
5. Update the `lang` variable in the copied markdown files.
6. Update the `title` variable in the copied markdown files.
7. Create the header, footer, notice, and announcement file for the language in the `_includes/` directory, in the respective directories, and make necessary edits to the contents.
8. Create the announcement file for the language in the `_includes/` directory.
9. Make sure to append `/{{ page.lang }}` to all the links within the site.
10. Update the [CONTRIBUTING.md](https://github.com/expressjs/expressjs.com/blob/gh-pages/CONTRIBUTING.md#contributing-translations)  and the `.github/workflows/translation.yml` files with the new language. 

### Adding Page and Section Translations

Many site translations are still missing pages. To find which ones we need help with, you can [filter for merged PRs](https://github.com/expressjs/expressjs.com/pulls?q=is%3Apr+is%3Aclosed+label%3Arequires-translation-es) that include the tag for your language, such as `requires-translation-es` for requires Spanish translation.   

If you contribute a page or section translation, please reference the original PR. This helps the person merging your translation to remove the tag from the original PR.