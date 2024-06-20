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
Fork the [expressJS.com](https://github.com/expressjs/expressjs.com) repo and clone it to your local machine. You don't need to get it runnning locally as you'll be able to preview your post on Github. See point 6 below.
  - OPTIONAL: If you want to run a local installation, find the setup instructions [here](https://github.com/expressjs/expressjs.com?tab=readme-ov-file#expressjscom)

1. ### Create a new file in the `_posts` directory
Open the files. Inside the `expressjs.com` directory, name your file using following the format: `YYYY-MM-DD-title.md`.

1. ### Adding the Required Front Matter
    Copy the following front matter, including the dotted lines, and paste it at the top of file you just created in the previous step. Fill in with your own values.

    ```yaml
    ---
    title: <your-title>
    sub_title: <your-optional-sub-title>
    date: <date-matching_filename>
    tags: <white-space-seperated-topics>
    author: <your-name>
    ---
    ```
2. ### Add your Content
    Finally, start writing your content. 
    
     Add your text content below the front matter. Make sure to fill in your own values.
    ```markdown
    ---
    title: My Random Title 
    sub_title: Showing how to post 
    date: 01-01-1900
    tags: AI Security
    author: Joseph Schmoe
    ---
    Lorem ipsum dolor sit amet ivamus lacinia sollicitudin turpis sed porta. 
    Ut commodo, orci eget congue dictum
     
    Sapien est scelerisque ante, vehicula ultricies ipsum justo in quam. 
    Aliquam pretium diam vitae neque eleifend laoreet. 
    ```

3. ### Make a Pull Request
   If you do not have the app running locally, this is where you will be able to preview your results.  After you make your PR, there will be a section on the page entitled `Deploy Preview for expressjscom-preview ready!` Click here to see your work.
   
   You can use this feature over multiple commits to refine your post by making a `draft` pull request. Once it's ready for review, switch it to a formal PR.

   