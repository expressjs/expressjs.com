---
layout: blog-posts
title: Write a Blog Post
menu: blog
lang: en
redirect_from: "/blog/write.html"
---
  
# Write A Blog Post
  
## Have an idea for a blog post? Write a post and make a PR.

Follow the guildlines below to create a new blog post.

1. ### Propose your Post
Before taking the time to write a post, please confirm that we will be able to publish it. We're looking for topics related very specifically to Express, and so we want to pre-approve all posts. For the moment, this means we aren't excepting any unsolicited posts. 
  -  If you have an idea, please ask for approval first by opening an [issue](https://github.com/expressjs/expressjs.com/issues) entitled  `Blog Post Idea <your idea>`.

1. ### Fork the Repository 
Fork the [expressJS.com](https://github.com/expressjs/expressjs.com) repo and clone it to your local machine.
  - OPTIONAL: If you want to run a local installation, find the setup instructions [here](https://github.com/expressjs/expressjs.com?tab=readme-ov-file#expressjscom) 

1. ### Create a new file in the `_posts` directory
Open the files. Inside the `expressjs.com` directory, name your file using following the format: `YYYY-MM-DD-title.md`.

1. ### Adding the Required Front Matter
    The following front matter are required for each post. At the top of the file you created in the previous step, add the following:

    ```yaml
    ---
    layout: blog-posts
    title: "<your-title>"
    sub_title: "<your-sub-title>"
    menu: blog
    date: <date-matching_filename>
    tags: <white-space-seperated-topics>
    author: <your-name>
    img: <path-or-url-to-image>
    lang: en
    excerpt_separator: <!--more-->
    ---
    ```
    - Posts must include a valid image in the `img` field. Either put your image (jpg or png) file into the `/images/blog/` directory, or reference it via URL.
2. ### Add your Content
    Finally, start writing your content. Format your content as follows, including the title, subtitle, and author headings, and put `<!--more-->` following your first paragraph. Make sure this is all below the dotted line for the front matter.

    ```markdown
    {% raw %}
    # {{page.title}}

    ## {{page.sub_title}}
    #### By {{page.author}}
    {% endraw %}
    Lorem ipsum dolor sit amet...
    <!--more-->

    ivamus lacinia sollicitudin turpis sed porta. Ut commodo, orci eget congue dictum, sapien est scelerisque ante, 
    vehicula ultricies ipsum justo in quam. Aliquam pretium diam vitae neque eleifend laoreet. 
    ```

3. ### Make a Pull Request
   If you do not have the app running locally, this is where you will be able to preview your results.  After you make your PR, there will be a section on the page entitled `Deploy Preview for expressjscom-preview ready!` Click here to see your work.
   
   You can use this feature over multiple commits to refine your post, just make sure to open your pull request as a `draft`. Once it's ready for review, switch it to a formal PR.

   