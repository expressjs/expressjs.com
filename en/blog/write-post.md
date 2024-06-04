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

1. ### Fork the Repository 
Fork the [expressJS.com](https://github.com/expressjs/expressjs.com) repo and clone it to your local machine.
  - OPTIONAL: If you want to run a local installation, find the setup instructions [here](https://github.com/expressjs/expressjs.com?tab=readme-ov-file#expressjscom) 

2. ### Create a new file in the `_posts` directory
Open the files. Inside the `expressjs.com` directory, name your file using following the format: `YYYY-MM-DD-title.md`.

3. ### Adding the Required Front Matter
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
4. ### Add your Content
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
