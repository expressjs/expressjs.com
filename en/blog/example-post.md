---
layout: blog-posts
title: "Example Blog Post"
sub_title: "How to structure your page" 
menu: blog
date: 01-01-1900
tags: blogging design
author: "Joseph Schmoe"
img: "https://place-kitten.com/200/300"
lang: en
excerpt_separator: <!--more-->
redirect_from: "/blog/example.html"

---

# {{page.title}}

### {{page.sub_title}}

```markdown
---
layout: blog-posts
title: "Example Post"
sub_title: "Laying out a blog post."
menu: blog
date: 01-01-1900
tags: blogging design
author: "Joseph Schmoe"
img: "https://place-kitten.com/200/300"
lang: en
excerpt_separator: <!--more-->
---
{% raw %}
# {{page.title}}

### {{page.sub_title}}
### By {{page.author}}
{% endraw %}

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec lorem nisi. Donec pharetra sapien sed bibendum facilisis. Pellentesque pretium elit magna, ac vehicula ipsum elementum sit amet. Vivamus lacinia sollicitudin turpis sed porta. Ut commodo, orci eget congue dictum, sapien est scelerisque ante, vehicula ultricies ipsum justo in quam. Aliquam pretium diam vitae neque eleifend laoreet. Phasellus a ex hendrerit, dapibus justo id, dapibus mi. Phasellus in tempor velit. Sed dapibus sapien auctor massa tincidunt condimentum. Mauris sit amet sodales odio. Donec vel imperdiet dolor. Etiam egestas elit consequat, pharetra elit nec, aliquam nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla congue consequat ex.
<!--more-->

Mauris ornare leo eros, tincidunt porttitor turpis consequat id. Sed quis ante id enim ultricies luctus sit amet id sem. Maecenas maximus iaculis arcu. Pellentesque porta nisi ac accumsan gravida. Aenean sapien ante, malesuada in odio sit amet, consequat rhoncus nulla. Sed at vulputate orci, sit amet aliquam nibh. Proin non volutpat eros, id lacinia leo. Phasellus luctus orci facilisis dui ultricies, ut tempor magna sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque cursus fringilla facilisis. Donec congue tristique nisi, ac congue sapien commodo sed. Nam arcu augue, bibendum eget eleifend ac, tristique ac risus. Phasellus dictum aliquam turpis, vel posuere nisi accumsan eget.

```