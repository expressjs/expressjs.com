<button id="menu-toggle" title="show blogs list">All Blogs</button>
<ul id="menu" class="blog-side-menu">
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
