---
layout: page
---
<div id="mw-container">
  <div id="mw-list">
    {% if title contains 'middleware' %}
      {% include mw-list.md %}
    {% else %}
      {% include util-list.md %}
    {% endif %}
  </div>
  <div id="middleware-content">
    {% if module == 'mw-home' %}    
      {{content}} 
    {% elsif module %}
      <div class="alert alert-info" role="alert"><i class="fa fa-info-circle"></i>
        <b>Note:</b> This page was generated from the
        <a target="_blank" href="https://github.com/expressjs/{{module}}">{{module}} README</a>.
      </div>
      {% include readmes/{{module}}.md %}

    {% else %}
      <h3>ERROR: No source specified for README {{module}}</h3>
    {% endif %}

  </div>
</div>