<h3 id='basicAuth'>basicAuth()</h3>

Basic Authentication middleware, populating `req.user`
with the username.

Simple username and password:

{% highlight js %}
app.use(express.basicAuth('username', 'password'));
{% endhighlight %}

Callback verification:

{% highlight js %}
 app.use(express.basicAuth(function(user, pass){
   return 'tj' == user && 'wahoo' == pass;
 }));
{% endhighlight %}

Async callback verification, accepting `fn(err, user)`,
in this case `req.user` will be the user object passed.

{% highlight js %}
app.use(express.basicAuth(function(user, pass, fn){
  User.authenticate({ user: user, pass: pass }, fn);
}))
{% endhighlight %}
