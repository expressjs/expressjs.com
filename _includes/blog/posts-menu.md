<div id="blog-side-menu-container">
<h3>Posts</h3>
  <ul id="blog-side-menu">
      {% for post in site.posts %}
    <li>
      <a href="{{post.url}}">{{ post.title }}</a>
    </li>
      {% endfor %}
  </ul>
</div> 
