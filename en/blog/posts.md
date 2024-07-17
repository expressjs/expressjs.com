---
layout: post
title: Express Blog Posts
menu: blog
lang: en
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
        <div>By {{ post.author }}</div> 
        <div >{{ post.date | date:"%b %d, %Y" }}</div> 
      </div>   
      <div class="blog-excerpt"> {{post.excerpt | truncate: 240 | markdownify }} </div>
  </div>
{% endfor %}
</div>
{% else %}
  There are currently no blog posts.
{% endif %}
