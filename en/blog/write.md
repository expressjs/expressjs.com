---
layout: blog-posts
title: Write a Blog Post
menu: blog
lang: en
redirect_from: "/blog/write.html"
---
  
# Write A Blog Post
  
## Have an idea for a blog post? Write a post and make a PR.

Check out an example [post](/{{ page.lang }}/blog/example.html)

- ### Setup the Repository 
A local installation will be required it you want to preview your post. [Here](https://github.com/expressjs/expressjs.com?tab=readme-ov-file#expressjscom) are the instructions for running locally. 

- ### Create a new file in the `_posts` directory
Create a new file and save it following the format: `YYYY-MM-DD-title.md`. The date should be the date of your post.

- ### Adding the Required Front Matter
    The following front matter are required for each post. At the top of the file you just created, add the following:

    ```yaml
    ---
    layout: blog-post
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

- ### Add your Content
    Finally, start writing your content. Format your content as follows, including the title and subtitle, and the `<!--more-->` following your first paragraph.

    ```markdown
    {% raw %}
    # {{page.title}}

    ### {{page.sub_title}}
    {% endraw %}
    Lorem ipsum dolor sit amet...
    <!--more-->

    ivamus lacinia sollicitudin turpis sed porta. Ut commodo, orci eget congue dictum, sapien est scelerisque ante, 
    vehicula ultricies ipsum justo in quam. Aliquam pretium diam vitae neque eleifend laoreet. 
    ```