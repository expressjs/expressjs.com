<ul id="menu">
  <li class="toc-title" role="heading" aria-level="3"><em>Blog posts</em></li>
  <li>
    <ul id="side-menu" class="active">
    <li>
      <a href="/{{ page.lang }}/blog/posts">All Posts</a>
    </li>
      {% for post in site.posts %}
    <li>
      <a href="{{post.url}}">{{ post.title }}</a>
    </li>
      {% endfor %}
  </ul>
  </li>
</ul> 
<button id="menu-toggle" title="show blogs list">All Blogs &#x25BC;</button>