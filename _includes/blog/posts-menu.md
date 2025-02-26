<button id="menu-toggle" title="show blogs list">All Blogs <span>&#x25BA;</span></button>
<ul id="menu" class="blog-side-menu">
  <li class="toc-title" role="heading" aria-level="3"><em>Blog posts</em></li>
  <li>
    <ul id="side-menu" class="active">
      {% for post in site.posts %}
    <li>
      <a href="{{post.url}}">{{ post.title }}</a>
    </li>
      {% endfor %}
  </ul>
  </li>
</ul> 
