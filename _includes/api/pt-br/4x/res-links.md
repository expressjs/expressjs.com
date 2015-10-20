<h3 id='res.links'>res.links(links)</h3>

Define os `links` para popular o campo `Link`do cabeçalho de resposta HTTP.

~~~js
res.links({
  next: 'http://api.example.com/users?page=2',
  last: 'http://api.example.com/users?page=5'
});
~~~

Resultado:

~~~js
Link: <http://api.example.com/users?page=2>; rel="next", 
      <http://api.example.com/users?page=5>; rel="last"
~~~
