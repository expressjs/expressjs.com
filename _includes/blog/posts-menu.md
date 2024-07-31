<div id="blog-side-menu-container">
  <h3>
    <a href="/{{ page.lang }}/blog/posts">Posts</a>
  </h3>
  <ul id="blog-side-menu">
      {% for post in collections.posts %}
    <li>
      <a href="{{post.url}}">{{ post.data.title }}</a>
    </li>
      {% endfor %}
  </ul>
</div> 