# Contributing to Expressjs.com

### The Official Documentation of the Express.js Framework

This is the contribution documentation for the [expressjs.com](https://github.com/expressjs/expressjs.com) website.

> [!NOTE]
> This is not the repo for Express.js framework. To contribute to the _[Express.js framework](https://github.com/expressjs/express)_, check out the [GitHub repo contributing page](https://github.com/expressjs/express?tab=contributing-ov-file) or the website's [Contributing to Express](https://expressjs.com/en/resources/contributing.html) page.

#### Need some ideas? These are some typical issues.

1. **Website issues**: If you see anything on the site that could use a tune-up, think about how to fix it.
   - Display or screen sizing problems
   - Mobile responsiveness issues
   - Missing or broken accessibility features
   - Website outages
   - Broken links
   - Page structure or user interface enhancements

2. **Content Issues**: Fix anything related to site content or typos.
   - Spelling errors
   - Incorrect/outdated Express.js documentation
   - Missing content

3. **Translation Issues**: Fix any translation errors or contribute new content.
   - Fix spelling errors
   - Fix incorrect/poorly translated words
   - Check out the [Contributing translations](#contributing-translations) section below for a contributing guide.

#### Want to work on a backlog issue?

We often have bugs or enhancements that need work. You can find these under our repo's [Issues tab](https://github.com/expressjs/expressjs.com/issues). Check out the tags to find something that's a good match for you.

#### Have an idea? Found a bug?

If you've found a bug or a typo, or if you have an idea for an enhancement, you can:

- Submit a [new issue](https://github.com/expressjs/expressjs.com/issues/new/choose) on our repo. Do this for larger proposals, or if you'd like to discuss or get feedback first.

- Make a [GitHub pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request). If you have already done work, and it's ready to go, feel free to send it our way.

## Getting Started

The steps below will guide you through the Expressjs.com contribution process.

#### Step 1: (OPTIONAL) Open a New Issue

So you've found a problem that you want to fix, or have a site enhancement you want to make.

1. If you want to get feedback or discuss, open a discussion [issue](https://github.com/expressjs/expressjs.com/issues/new/choose) prior to starting work. This is not required, but encouraged for larger proposals.
   - While we highly encourage this step, it is only for submissions proposing significant change. It helps us to clarify and focus the work, and ensure it aligns with overall project priorities.
   - For submissions proposing minor improvements or corrections, this is not needed. You can skip this step.
   - When opening an issue please give it a title and fill in the description section. The more details you provide, the more feedback we can give.

2. After receiving your issue the Express.js documentation team will respond with feedback. We read every submission and always try to respond quickly with feedback.
   - For submissions proposing significant change, we encourage you to follow the review process before starting work.

#### Step 2: Get the Application Code Base

## Prerequisites

- **Node.js**: v24.13.0 or higher
- **npm**: v11.0.0 or higher (comes with Node 24)

> We recommend using [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions. This project includes an `.nvmrc` file for automatic version switching.

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/expressjs/expressjs.com.git
   cd expressjs.com
   ```

2. **Install the correct Node.js version** (if using nvm):

   ```bash
   nvm install
   nvm use
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

   The site will be available at `http://localhost:4321`

## Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Build production site to `./dist`        |
| `npm run preview` | Preview production build locally         |

## Project Structure

```
astro/
├── src/
│   ├── assets/              # Static assets (images, icons, etc.)
│   ├── components/          # Reusable UI components
│   │   ├── patterns/        # Complex UI patterns
│   │   └── primitives/      # Base UI primitives
│   ├── config/              # Configuration files
│   ├── content/             # Content collections
│   │   └── docs/            # Documentation content
│   ├── i18n/                # Internationalization
│   ├── layouts/             # Page layouts
│   ├── pages/               # Route pages
│   │   └── [lang]/          # Localized pages
│   ├── styles/              # Global styles
│   │   ├── base/            # Base styles
│   │   ├── tokens/          # Design tokens
│   │   └── utilities/       # Utility classes
│   └── utils/               # Utility functions
├── public/                  # Static assets
│   └── fonts/               # Font files
└── astro.config.mjs         # Astro configuration
```
