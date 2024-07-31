---
layout: post
title: Express Blog Posts
menu: blog
lang: en
redirect_from: "/blog/posts.html"
---
 
Want to write a post? See the submission [guidelines.](/en/blog/write-post.html)

{% if collections.post_en !=  0 %}
<div class="blog-posts">
{% for post in collections.post_en %}
  <div class="blog-post">
    <div class="blog-title">
      <a href="{{ post.url }}"> {{ post.data.title }}</a>
    </div>
    <div class="blog-details">
      <div>By {{ post.data.author }}</div> 
      <div >{{ post.page.date | date:"%b %d, %Y" }}</div> 
    </div>   
    <div class="blog-excerpt">{{ post.data.page.excerpt | truncate: 240  }}</div>
  </div>
{% endfor %}
</div>
{% else %}
  There are currently no blog posts.
{% endif %}