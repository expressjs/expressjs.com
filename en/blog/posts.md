---
layout: blog-posts
title: Express Blog Posts
menu: blog
lang: en
tags: security, optimization, AI, LLMS
redirect_from: "/blog/posts.html"
---
  
# Express Blog
  
{% if site.posts.size !=  0 %}
<div class="blog-posts">
{% for post in site.posts %}
  <div class="blog-post{% if site.posts.first == post %} active{% endif %}">
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
        <div>By {{ post.author }}</div>
        <div>{{ post.date | date:"%b %d, %Y" }}</div> 
      </div>   
      {% if site.posts.first == post %}
      <div class="blog-excerpt">
      {%comment%} Show 20 word excerpt for first post on page {%endcomment%}
       {% assign content_without_title = post.excerpt | remove: post.title %}
       {% assign content_without_title_and_slug = content_without_title | remove: post.sub_title %}
       {% assign content_without_html = content_without_title_and_slug | strip_html %}
         {{ content_without_html | truncatewords: 20}}
        </div>
      {% endif %}
    </div>
     <div class="right-col">
      <div class="blog-img">
          <img src="{{ post.img }}"/>
        </div>
     </div>
  </div>
{% endfor %}
</div>
{% else %}
  There are currently no blog posts.
{% endif %}
