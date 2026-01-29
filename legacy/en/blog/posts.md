---
layout: post
title: Express Blog Posts
description: Explore the latest articles, announcements, and updates from the Express.js team and community on the Express blog.
menu: blog
redirect_from: "/blog/posts.html"
---
 
Want to write a post? See the submission [guidelines.](/en/blog/write-post.html)

{% if site.posts.size !=  0 %}
<div class="blog-posts">
{% for post in site.posts %}
  <div class="blog-post">
      <div class="blog-title">
        <a href="{{ post.url }}"> {{ post.title }}</a>
      </div>
      <div class="blog-details">
        {% include blog/authors.html authors=post.authors %}
        <div >{{ post.date | date:"%b %d, %Y" }}</div> 
      </div>   
      <div class="blog-excerpt"> {{post.excerpt | truncate: 240 | markdownify }} </div>
  </div>
{% endfor %}
</div>
{% else %}
  There are currently no blog posts.
{% endif %}
