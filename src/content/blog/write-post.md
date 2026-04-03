---
title: How to write a blog post
description: Step by step guide to write a blog post
authors:
  - name: Express Technical Committee
    github: expressjs
---

If you have an idea for a blog post, follow these steps to propose it and potentially get it published!

1.  **Propose your post**

    Before taking the time to write a post, please confirm that we will be able to publish it. We're looking for topics specifically related to Express, and so we want to pre-approve all posts. For the moment, this means we aren't accepting any unsolicited posts. To propose a blog post, [open an issue](https://github.com/expressjs/expressjs.com/issues) entitled `Blog post proposal: <your idea>`.

1.  **Fork the repository**

    If the Express TC accepts your proposal, start to write your post by forking the [expressjs.com](https://github.com/expressjs/expressjs.com) repository and cloning it to your local machine. Once you open a pull request, you'll be able to preview your post on GitHub. See step six below.

> Optional: To run the site locally and preview your post before opening a PR, see the [setup instructions in the README](https://github.com/expressjs/expressjs.com?tab=readme-ov-file#expressjscom).

1.  **Create a new file**

    Create a new file in the `src/content/blog` directory named using following the format: `YYYY-MM-DD-title.md`.

1.  **Add the required front matter**

    Copy the following front matter, including the dotted lines, and paste it at the top of file you just created. Replace the placeholder values with as desired.

    ```markdown
    ---
    title: <your-title>
    description: <description-of-your-post>
    tags: ['tag1', 'tag2']
    authors:
      - name: <your-name>
        github: <github-username>
    cover: <optional-cover-image-path>
    ---
    ```

    The `github` property of an author is optional. Including your username only (not your full profile URL) will ensure that your blog post links out to it.

    The `cover` property is optional. If omitted, an Open Graph image will be automatically generated from the post title. If you want a custom cover image, place it in the `public` directory and reference its path (e.g. `/images/my-cover.jpg`).

1.  **Add your content**

    Finally, start writing your content below the front matter. Use standard markdown formatting.

    **Using components (MDX)**

    If you need to use interactive components like alerts, callouts, or other UI elements inside your post, rename your file from `.md` to `.mdx`. MDX lets you import and use Astro components directly in your markdown.

    For example, to add an alert:

    ```mdx
    ---
    title: My blog post
    description: A post with alerts
    tags: ['security']
    authors:
      - name: John Doe
        github: johndoe
    ---

    import Alert from '@components/primitives/Alert/Alert.astro';

    This is regular markdown content.

    <Alert type="warning">
      We strongly recommend upgrading to the latest version as soon as possible.
    </Alert>

    <Alert type="info">This feature is available starting from Express 5.0.</Alert>

    <Alert type="alert">
      This is a breaking change. Please review the migration guide before upgrading.
    </Alert>
    ```

    The available alert types are `info`, `warning`, and `alert`.

1.  **Open a pull request (PR)**

    Once you open a PR, you will be able to preview your results: There will be a section on the page entitled `Deploy Preview for expressjscom-preview ready!` Click the link to see the site rendered from your fork/branch.

    You can use this feature over multiple commits to refine your post by making a `draft` pull request. Once it's ready for review, switch it to a formal PR.
