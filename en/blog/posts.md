---
layout: blog-posts
title: Express Blog Posts
menu: blog
lang: en
tags: security, optimization, AI, LLMS
redirect_from: "/blog/posts.html"
---
  
# Express Blog

Want to write a post? See the submission [guidelines](/en/blog/write-post.html).
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
    {%comment%} remove title from excerpt {%endcomment%}
       {% assign content_without_title = post.excerpt | remove: post.title %}
    {%comment%} remove sub title {%endcomment%}
       {% assign content_without_title_and_sub_title = content_without_title | remove: post.sub_title %}
    {%comment%} build author string {%endcomment%}
       {% assign author_string = "By " | append: post.author %}
    {%comment%} remove author string {%endcomment%}
       {% assign content_without_author = content_without_title_and_sub_title | remove: author_string %}
       {% assign content_without_html = content_without_author | strip_html %}
         {{ content_without_html | truncatewords: 50}}
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
