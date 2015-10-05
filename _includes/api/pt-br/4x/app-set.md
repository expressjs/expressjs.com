<h3 id='app.set'>app.set(name, value)</h3>

Atribui o valor de configuração `name` para `value`, onde `name` é uma das propriedades listada
na [tabela de configurações do aplicativo](#app.settings.table). 

Chamar `app.set('foo', true)` para um valor booleano é a mesma coisa que chamar `app.enable('foo')`. De forma similiar, chamar `app.set('foo', false)` para alterar uma propriedade booleana é a mesma coisa que `app.disable('foo')`.

Obtendo o valor de uma configuração com [`app.get()`](#app.get).

~~~js
app.set('title', 'Meu site');
app.get('title'); // "Meu site"
~~~

<h4 id='app.settings.table'>Configurações do Aplicativo</h4>

{% include api/{{ page.lang }}/4x/app-settings.md %}
