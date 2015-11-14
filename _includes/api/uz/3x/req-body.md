<h3 id='req.body'>req.body</h3>

This property is an object containing the parsed request body. This feature
is provided by the `bodyParser()` middleware, though other body
parsing middleware may follow this convention as well. This property
defaults to `{}` when `bodyParser()` is used.

~~~js
// POST user[name]=tobi&user[email]=tobi@learnboost.com
req.body.user.name
// => "tobi"

req.body.user.email
// => "tobi@learnboost.com"

// POST { "name": "tobi" }
req.body.name
// => "tobi"
~~~
