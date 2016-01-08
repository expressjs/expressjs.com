<h3 id='res.locals'>res.locals</h3>

Um objeto que contém variáveis locais no escopo da requisição, e por isso, disponíveis somente durante a renderização das views durante o ciclo requisição/resposta (se houver). Fora isso, esta propriedade é idêntica a [app.locals](#app.locals).


Esta propriedade é útil para mostrar informações a nível de requisição, como o path da requisição, usuário autenticado, configurações de usuário e assim por diante.

~~~js
app.use(function(req, res, next){
  res.locals.user = req.user;
  res.locals.authenticated = ! req.user.anonymous;
  next();
});
~~~
