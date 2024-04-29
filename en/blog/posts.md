---
layout: page
title: Express Blog Posts
menu: blog
lang: en
tags: security, optimization, AI, LLMS
redirect_from: "/blog/posts.html"
---
 
# Express Blog 

{% if (site.posts.size != 0) %}
<div class="blog-posts">
{% for post in site.posts %}
  <div class="blog-post">
    <div class="left-col">
      <div class="blog-tags">
        {% for tag in post.tags %}
          <span class="blog-tag">{{ tag|upcase }}</span>
        {% endfor %}
      </div>
      <div class="blog-title">
        <a href="{{ post.url }}"> {{ post.title }}</a>
      </div>
      <div class="blog-details">
        <span>By {{ post.author }}</span>
        <span>{{ post.date | date:"%b %d, %Y" }}</span>
      </div>
    </div>
     <div class="right-col">
      <div class="blog-img">
          <img src="https://loremflickr.com/300/300"/>
        </div>
     </div>
  </div>

{% endfor %}
{% else %}
  There are currently no blog posts.
{% endif %}
</div>
