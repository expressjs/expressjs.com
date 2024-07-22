<ul id="tags-side-menu">
    {% for tag in site.tags %}
  <li>{{ tag[0] }}</li>
    <ul
        {% for post in tag[1] %}
        <li><a href="{{ post.url }}">{{ post.title }}</a></li>
        {% endfor %}
    </ul>
{% endfor %}  
</ul>
