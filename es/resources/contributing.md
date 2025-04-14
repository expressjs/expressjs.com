---
layout: página
title: Contribuir a Express
description: Descubra cómo contribuir a Express.js, incluyendo pautas para reportar problemas, enviar solicitudes de extracción, convertirse en un colaborador y entender las políticas de seguridad.
menu: recursos
lang: es
redirect_from: /resources/community.html
---

# Contribuir a Express

### ¿Quieres contribuir a Expressjs.com? Click [here](#expressjs-website-contributing).

Express y los otros proyectos en la [organización expressjs en GitHub](https://github.com/expressjs) son proyectos de la [Fundación OpenJs](https://openjsf.org/).
Estos proyectos se rigen bajo las políticas generales y directrices de la Fundación Node.js junto con las pautas adicionales a continuación.

- [Comité Técnico](#technical-committee)
- [Guía de contribución de la comunidad] (#community-contributing-guide)
- [Guía del Colaborador](#collaborators-guide)
- [Políticas de seguridad y colegas](#security-policies-and-procedures)

## Comité Técnico

El comité técnico Express consta de miembros activos del proyecto, y guía el desarrollo y el mantenimiento del proyecto Express. Para obtener más información, consulte [Comunidad Express - Comité Técnico](community.html#technical-committee).

## Guía de contribución de la comunidad

<!-- SRC: expressjs/express Contributing.md -->

El objetivo de este documento es crear un proceso de contribución que:

- Alentar nuevas contribuciones.
- Anima a los contribuyentes a seguir implicados.
- Evita procesos y burocracia innecesarios siempre que sea posible.
- Crea un proceso transparente de toma de decisiones que deja claro cómo
 contribuidores pueden ser involucrados en la toma de decisiones.

### Vocabulario

- Un **colaborador** es cualquier persona que crea o comenta un problema o pull request.
- Un **Comité** es un subconjunto de colaboradores que han recibido acceso de escritura al repositorio.
- Un **Capitán del proyecto** es el responsable principal de un repositorio.
- Un **TC (técnica)** es un grupo de comprometidos que representan la experiencia técnica requerida
 para resolver disputas raras.
- Un **Triager** es un subconjunto de colaboradores a los que se les ha dado acceso a triage al repositorio.

### Problemas de registro

Registra un problema para cualquier pregunta o problema que puedas tener. En caso de duda, registra un problema y
cualquier política adicional sobre qué incluir se proporcionará en las respuestas. La única excepción
son las devoluciones de seguridad que deben ser enviadas en privado.

Los comités pueden dirigirte a otro repositorio, pedir aclaraciones adicionales y
añadir metadatos apropiados antes de abordar el problema.

Por favor, sean corteses y respetuosos. Se espera que cada participante siga el Código de Conducta del proyecto
.

### Contribuciones

Cualquier cambio en los recursos de este repositorio debe ser a través de solicitudes de extracción. Esto aplica a todos los cambios
a la documentación, código, archivos binarios, etc. Incluso los comprometidos a largo plazo y los miembros de TC deben usar solicitudes
.

Ningún pull request puede ser fusionado sin ser revisado.

Para contribuciones no triviales, las solicitudes de extracción deben sentarse por lo menos 36 horas para asegurarse de que los contribuidoresformat@@0
en otras zonas horarias tengan tiempo para revisar. También se debe tener en cuenta
fines de semana y otros períodos festivos para asegurar que los comprometidos activos tengan un tiempo razonable para
que se involucren en el proceso de discusión y revisión si lo desean.

El valor por defecto de cada contribución es que se acepta una vez que ningún committer tiene una objeción.
During a review, committers may also request that a specific contributor who is most versed in a
particular area gives a "LGTM" before the PR can be merged. No hay ningún proceso adicional de "desconectar"
para las contribuciones a la tierra. Once all issues brought by committers are addressed it can
be landed by any committer.

En el caso de que una objeción sea planteada en un pull request por otro committer, todos los comprometidos
deben tratar de llegar a un consenso a fin de abordar las preocupaciones que se expresan
por discusión, compromiso sobre el cambio propuesto, o la retirada del cambio propuesto.

Si una contribución es polémica y los comprometidos no pueden ponerse de acuerdo sobre cómo conseguir que llegue a la tierra
o si debe aterrizar, entonces debe escalarse a la TC. Los miembros del TC deben discutir regularmente
sobre contribuciones pendientes para encontrar una resolución. It is expected that only a
small minority of issues be brought to the TC for resolution and that discussion and
compromise among committers be the default resolution mechanism.

### Convertirse en un Triagente

¡Cualquiera puede convertirse en triager! Lea más sobre el proceso de ser un triager en
[el documento del proceso de la prueba](https://github.com/expressjs/express/blob/master/Triager-Guide.md).

Actualmente, cualquier [miembro de la organización] existente (https://github.com/orgs/expressjs/people) puede nominar
un nuevo triager. Si estás interesado en convertirte en triager, nuestro mejor consejo es participar activamente
en la comunidad ayudando a resolver problemas de prueba y solicitudes de extracción. También recomendamos
participar en otras actividades comunitarias como asistir a las reuniones del TC y participar en las discusiones de Slack
. If you feel ready and have been helping triage some issues, reach out to an active member of the organization to ask if they'd
be willing to support you. If they agree, they can create a pull request to formalize your nomination. In the case of an objection to the nomination, the triage team is responsible for working with the individuals involved and finding a resolution.

También puedes contactar a cualquiera de los [miembros de la organización](https://github.com/orgs/expressjs/people)
si tienes preguntas o necesitas orientación.

### Convertirse en un Comité

All contributors who have landed significant and valuable contributions should be onboarded in a timely manner,
and added as a committer, and be given write access to the repository.

Se espera que los comités sigan esta política y sigan enviando solicitudes extra, revisa

### Proceso TC

El TC utiliza un proceso de "búsqueda de consenso" para asuntos que son escalados a la TC.
El grupo trata de encontrar una resolución que no tenga objeciones abiertas entre los miembros de la CT.
Si no se puede alcanzar un consenso que no tenga objeciones, entonces se llama a una mayoría gana el voto
. It is also expected that the majority of decisions made by the TC are via
a consensus seeking process and that voting is only used as a last-resort.

La resolución puede implicar devolver el problema a los capitanes del proyecto con sugerencias sobre
cómo avanzar hacia un consenso. No se espera que una reunión del TC
resuelva todos los problemas en su agenda durante esa reunión y puede preferir continuar
la discusión que ocurre entre los capitanes del proyecto.

Los miembros pueden ser agregados al TC en cualquier momento. Cualquier miembro de TC puede nominar otro committer
al TC y el TC utiliza su consenso estándar buscando proceso para evaluar si o si
no agregar este nuevo miembro. La CT consistirá en un mínimo de 3 miembros activos y unformat@@0
máximo de 10. Si el TC debe caer debajo de 5 miembros, los miembros activos del TC deben nominar
a alguien nuevo. Si un miembro de TC está bajando, se les anima (pero no se requiere) a
nominar a alguien para que ocupe su lugar.

Los miembros del TC serán añadidos como administradores en los órganos de Github, órganos de npm y otros recursos como
necesario para ser efectivos en el rol.

Para permanecer "activo" un miembro de la CT debe tener participación en los últimos 12 meses y perder
no más de seis reuniones de la CT consecutivas. Our goal is to increase participation, not punish
people for any lack of participation, this guideline should be only be used as such
(replace an inactive member with a new active one, for example). Se espera que los miembros que no se reúnan con esta
dimitirán. Si un miembro de TC no dimite de la lista, se puede abrir un problema en el repositorio
discusiones para moverlos al estado inactivo. Los miembros del TC que se retiren o se eliminen debido a
a inactividad serán movidos al estado inactivo.

Los miembros inactivos pueden convertirse en miembros activos por nominación propia si la CT no es ya
mayor que el máximo de 10. They will also be given preference if, while at max size, an
active member steps down.

### Capitanes del proyecto

El Express TC puede designar capitanes para proyectos individuales/repos en las organizaciones
. These captains are responsible for being the primary
day-to-day maintainers of the repo on a technical and community front.
Los capitanes de Repo están facultados de propiedad de repo y de derechos de publicación de paquetes.
Cuando hay conflictos, especialmente en temas que afectan el proyecto Express
en general, los capitanes son responsables de elevarlos al TC y empujar
a resolver esos conflictos. Captains are also responsible for making sure
community members follow the community guidelines, maintaining the repo
and the published package, as well as in providing user support.

Al igual que los miembros de TC, los capitanes de Repo son un subconjunto de committers.

To become a captain for a project the candidate is expected to participate in that
project for at least 6 months as a committer prior to the request. Deben haber ayudado
con contribuciones de código, así como con problemas de prueba. También es necesario que
tenga habilitada la 2FA en sus cuentas de GitHub y npm.

Any TC member or an existing captain on the **same** repo can nominate another committer
to the captain role. To do so, they should submit a PR to this document, updating the
**Active Project Captains** section (while maintaining the sort order) with the project
name, the nominee's GitHub handle, and their npm username (if different).

- Repos can have as many captains as make sense for the scope of work.
- A TC member or an existing repo captain **on the same project** can nominate a new captain.
 Repo captains from other projects should not nominate captains for a different project.

The PR will require at least 2 approvals from TC members and 2 weeks hold time to allow
for comment and/or dissent.  When the PR is merged, a TC member will add them to the
proper GitHub/npm groups.

#### Proyectos activos y capitanes

- [`expressjs/badgeboard`](https://github.com/expressjs/badgeboard): @wesleytodd
- [`expressjs/basic-auth-connect`](https://github.com/expressjs/basic-auth-connect): @ulisesGascon
- [`expressjs/body-parser`](https://github.com/expressjs/body-parser): @wesleytodd, @jonchurch, @ulisesGascon
- [`expressjs/compression`](https://github.com/expressjs/compression): @ulisesGascon
- [`expressjs/connect-multiparty`](https://github.com/expressjs/connect-multiparty): @ulisesGascon
- [`expressjs/cookie-parser`](https://github.com/expressjs/cookie-parser): @wesleytodd, @UlisesGascon
- [`expressjs/cookie-session`](https://github.com/expressjs/cookie-session): @ulisesGascon
- [`expressjs/cors`](https://github.com/expressjs/cors): @jonchurch, @ulisesGascon
- [`expressjs/discussions`](https://github.com/expressjs/discussions): @wesleytodd
- [`expressjs/errorhandler`](https://github.com/expressjs/errorhandler): @ulisesGascon
- [`expressjs/express-paginate`](https://github.com/expressjs/express-paginate): @ulisesGascon
- [`expressjs/express`](https://github.com/expressjs/express): @wesleytodd, @ulisesGascon
- [`expressjs/expressjs.com`](https://github.com/expressjs/expressjs.com): @crandmck, @jonchecch, @bjohansebas
- [`expressjs/flash`](https://github.com/expressjs/flash): @ulisesGascon
- [`expressjs/generator`](https://github.com/expressjs/generator): @wesleytodd
- [`expressjs/method-override`](https://github.com/expressjs/method-override): @ulisesGascon
- [`expressjs/morgan`](https://github.com/expressjs/morgan): @jonchurch, @ulisesGascon
- [`expressjs/multer`](https://github.com/expressjs/multer): @LinusU, @ulisesGascon
- [`expressjs/response-time`](https://github.com/expressjs/response-time): @UlisesGascon
- [`expressjs/serve-favicon`](https://github.com/expressjs/serve-favicon): @ulisesGascon
- [`expressjs/serve-index`](https://github.com/expressjs/serve-index): @ulisesGascon
- [`expressjs/serve-static`](https://github.com/expressjs/serve-static): @ulisesGascon
- [`expressjs/session`](https://github.com/expressjs/session): @ulisesGascon
- [`expressjs/statusboard`](https://github.com/expressjs/statusboard): @wesleytodd
- [`expressjs/timeout`](https://github.com/expressjs/timeout): @ulisesGascon
- [`expressjs/vhost`](https://github.com/expressjs/vhost): @ulisesGascon
- [`jshttp/accepts`](https://github.com/jshttp/accepts): @blakeembrey
- [`jshttp/basic-auth`](https://github.com/jshttp/basic-auth): @blakeembrey
- [`jshttp/compressible`](https://github.com/jshttp/compressible): @blakeembrey
- [`jshttp/content-disposition`](https://github.com/jshttp/content-disposition): @blakeembrey
- [`jshttp/content-type`](https://github.com/jshttp/content-type): @blakeembrey
- [`jshttp/cookie`](https://github.com/jshttp/cookie): @blakeembrey
- [`jshttp/etag`](https://github.com/jshttp/etag): @blakeembrey
- [`jshttp/forwarded`](https://github.com/jshttp/forwarded): @blakeembrey
- [`jshttp/fresh`](https://github.com/jshttp/fresh): @blakeembrey
- [`jshttp/http-assert`](https://github.com/jshttp/http-assert): @wesleytodd, @jonchurch, @ulisesGascon
- [`jshttp/http-errors`](https://github.com/jshttp/http-errors): @wesleytodd, @jonchurch, @ulisesGascon
- [`jshttp/media-typer`](https://github.com/jshttp/media-typer): @blakeembrey
- [`jshttp/methods`](https://github.com/jshttp/methods): @blakeembrey
- [`jshttp/mime-db`](https://github.com/jshttp/mime-db): @blakeembrey, @UlisesGascon
- [`jshttp/mime-types`](https://github.com/jshttp/mime-types): @blakeembrey, @UlisesGascon
- [`jshttp/negotiator`](https://github.com/jshttp/negotiator): @blakeembrey
- [`jshttp/on-finished`](https://github.com/jshttp/on-finished): @wesleytodd, @ulisesGascon
- [`jshttp/on-headers`](https://github.com/jshttp/on-headers): @blakeembrey
- [`jshttp/proxy-addr`](https://github.com/jshttp/proxy-addr): @wesleytodd, @ulisesGascon
- [`jshttp/range-parser`](https://github.com/jshttp/range-parser): @blakeembrey
- [`jshttp/statuses`](https://github.com/jshttp/statuses): @blakeembrey
- [`jshttp/type-is`](https://github.com/jshttp/type-is): @blakeembrey
- [`jshttp/vary`](https://github.com/jshttp/vary): @blakeembrey
- [`pillarjs/cookies`](https://github.com/pillarjs/cookies): @blakeembrey
- [`pillarjs/csrf`](https://github.com/pillarjs/csrf): @ulisesGascon
- [`pillarjs/encodeurl`](https://github.com/pillarjs/encodeurl): @blakeembrey
- [`pillarjs/finalhandler`](https://github.com/pillarjs/finalhandler): @wesleytodd, @ulisesGascon
- [`pillarjs/hbs`](https://github.com/pillarjs/hbs): @ulisesGascon
- [`pillarjs/multiparty`](https://github.com/pillarjs/multiparty): @blakeembrey
- [`pillarjs/parseurl`](https://github.com/pillarjs/parseurl): @blakeembrey
- [`pillarjs/camino a regexp`](https://github.com/pillarjs/path-to-regexp): @blakeembrey
- [`pillarjs/request`](https://github.com/pillarjs/request): @wesleytodd
- [`pillarjs/resolve-path`](https://github.com/pillarjs/resolve-path): @blakeembrey
- [`pillarjs/router`](https://github.com/pillarjs/router): @wesleytodd, @ulisesGascon
- [`pillarjs/send`](https://github.com/pillarjs/send): @blakeembrey
- [`pillarjs/understanding-csrf`](https://github.com/pillarjs/understanding-csrf): @ulisesGascon

#### Capitanes de la Iniciativa actual

- Triage team [ref](https://github.com/expressjs/discussions/issues/227): @UlisesGascon

### Certificado del desarrollador de origen 1.1

```text
By making a contribution to this project, I certify that:

 (a) The contribution was created in whole or in part by me and I
     have the right to submit it under the open source license
     indicated in the file; or

 (b) The contribution is based upon previous work that, to the best
     of my knowledge, is covered under an appropriate open source
     license and I have the right under that license to submit that
     work with modifications, whether created in whole or in part
     by me, under the same open source license (unless I am
     permitted to submit under a different license), as indicated
     in the file; or

 (c) The contribution was provided directly to me by some other
     person who certified (a), (b) or (c) and I have not modified
     it.

 (d) I understand and agree that this project and the contribution
     are public and that a record of the contribution (including all
     personal information I submit with it, including my sign-off) is
     maintained indefinitely and may be redistributed consistent with
     this project or the open source license(s) involved.
```

## Guía del colaborador

<!-- SRC: expressjs/express Collaborator-Guide.md -->

### Problemas del sitio web

Abrir problemas para el sitio web de expressjs.com en https://github.com/expressjs/expressjs.com.

### Contribuciones de código y PRs

- Las pruebas deben pasar.
- Follow the [JavaScript Standard Style](https://standardjs.com/) and `npm run lint`.
- Si arregla un error, añada una prueba.

### Ramas

Utilice la rama `master` para correcciones de errores o trabajo menor que está destinado a la versión
actual de versión.

Utilice la rama nombrada correspondientemente, por ejemplo `5.0`, para cualquier cosa destinada a
una futura versión de Express.

### Pasos para contribuir

1. [Create an issue](https://github.com/expressjs/express/issues/new) for the
 bug you want to fix or the feature that you want to add.
2. Crea tu propio [fork](https://github.com/expressjs/express) en GitHub, luego
 comprueba tu bifurcación.
3. Escriba su código en su copia local. Es una buena práctica crear una rama para
 cada nuevo problema en el que trabaja, aunque no es un problema.
4. Para ejecutar la prueba suite, primero instale las dependencias ejecutando `npm install`,
 luego ejecute `npm test`.
5. Ensure your code is linted by running `npm run lint` -- fix any issue you
 see listed.
6. Si las pruebas pasan, puede confirmar sus cambios en su bifurcación y luego crear
 un pull request desde allí. Asegúrese de hacer referencia a su problema desde el pull
 solicitar comentarios incluyendo el número de incidencia, p. ej., `#123`.

### Problemas que son preguntas

We will typically close any vague issues or questions that are specific to some
app you are writing. Please double check the docs and other references before
being trigger happy with posting a question issue.

Cosas que ayudarán a ver el problema de su pregunta:

- Código JS completo y ejecutable.
- Descripción clara del problema o comportamiento inesperado.
- Descripción clara del resultado esperado.
- Pasos que has tomado para depurarlo tú mismo.

Si publicas una pregunta y no esbozas los elementos anteriores o haces fácil para
entender y reproducir tu problema, se cerrará.

## Políticas y procedimientos de seguridad

<!-- SRC: expressjs/express Security.md -->

Este documento describe los procedimientos de seguridad y las políticas generales para el proyecto Express
.

- [Reportando un bug](#reporting-a-bug)
- [Política de Divulgación](#disclosure-policy)
- [Comentarios sobre esta Política](#comments-on-this-policy)

### Reportando un error

El equipo Express y la comunidad se toman en serio todos los errores de seguridad en Express.
Gracias por mejorar la seguridad de Express. We appreciate your efforts and
responsible disclosure and will make every effort to acknowledge your
contributions.

Report security bugs by emailing `express-security@lists.openjsf.org`.

Para asegurar la respuesta oportuna a su informe, por favor asegúrese de que la totalidad
del informe está contenida en el cuerpo del correo electrónico y no solo detrás de un enlace
web o un adjunto.

El mantenedor principal reconocerá tu correo electrónico dentro de 48 horas y enviará una respuesta
más detallada en 48 horas indicando los siguientes pasos para manejar
tu informe. After the initial reply to your report, the security team will
endeavor to keep you informed of the progress towards a fix and full
announcement, and may ask for additional information or guidance.

Informar de errores de seguridad en módulos de terceros a la persona o al equipo que mantiene
el módulo.

### Versiones de pre-lanzamiento

Los lanzamientos Alpha y Beta son inestables y **no son aptos para uso de producción**.
Las vulnerabilidades encontradas en las pre-versiones deben ser reportadas de acuerdo a la sección [Reportando un bug](#reporting-a-bug).
Debido a la naturaleza inestable de la rama no está garantizado que cualquier corrección sea liberada en la próxima pre-liberación.

### Política de divulgación

When the security team receives a security bug report, they will assign it to a
primary handler. Esta persona coordinará el proceso de reparación y liberación,
que involucra los siguientes pasos:

- Confirme el problema y determine las versiones afectadas.
- Código de auditoría para encontrar posibles problemas similares.
- Prepara las correcciones para todas las versiones todavía en mantenimiento. These fixes will be
 released as fast as possible to npm.

### El Modelo de Amenaza Express

Actualmente estamos trabajando en una nueva versión del modelo de seguridad, la versión más actualizada se puede encontrar [here](https://github.com/expressjs/security-wg/blob/main/docs/ThreatModel.md)

### Comentarios sobre esta política

Si tienes sugerencias sobre cómo mejorar este proceso, por favor envía una solicitud de extracción
.

----

# Contribuyendo a Expressjs.com {#expressjs-website-contributing}

<!-- LOCAL: expressjs/expressjs.com ../../CONTRIBUTING.md -->

### La documentación oficial del Express JS Framework

Esta es la documentación de contribución para el sitio web [Expressjs.com](https://github.com/expressjs/expressjs.com).

#### ¿Necesitas ideas? Estas son algunas cuestiones típicas.

1. **Problemas en el sitio web**:
 Si ves algo en el sitio que pueda usar un ajuste, piensa cómo arreglarlo.

 - Problemas de visualización o tamaño de pantalla
 - Problemas de respuesta móvil
 - Características de accesibilidad perdidas o rotas
 - Interrupciones del sitio web
 - Enlaces rotos
 - Estructura de página o mejoras de interfaz de usuario

2. **Problemas de contenido**:
 Corregir cualquier cosa relacionada con contenidos o errores tipográficos.
 - Errores de ortografía
 - Documentación de JS exprés incorrecta/obsoleta
 - Falta contenido

3. **Problemas de traducción**: soluciona cualquier error de traducción o contribuye con contenido nuevo.
 - Corregir errores de ortografía
 - Corregir palabras incorrectas/mal traducidas
 - Traducir nuevo contenido

> **IMPORTANTE:**
> Todas las traducciones están actualmente en pausa. Ver esta [notice](#notice-we-have-paused-all-translation-contributions) para más información.

- Echa un vistazo a la sección de [Contribuyendo traducciones](#contributing-translations) para una guía de contribución.

#### ¿Quieres trabajar en un problema de atraso?

A menudo tenemos errores o mejoras que necesitan trabajo. Puedes encontrarlos en la [pestaña de problemas] de nuestro repositorio (https://github.com/expressjs/expressjs.com/issues). Echa un vistazo a las etiquetas para encontrar algo que te guste bien.

#### ¿Tienes una idea? ¿Encontrado un error?

Si has encontrado un error o un error tipográfico, o si tienes una idea para una mejora, puedes:

- Envía un [nuevo problema] (https://github.com/expressjs/expressjs.com/issues/new/choose) en nuestro repositorio. Haz esto para propuestas más grandes, o si quieres discutir o recibir comentarios primero.
- Make a [Github pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request). Si usted ya ha hecho el trabajo y está listo para ir, siéntase libre de enviarlo nuestro camino.

## Comenzando

Los siguientes pasos le guiarán a través del proceso de contribución de Expressjs.com.

#### Paso 1: (OPTIONAL) Abrir un nuevo problema

Así que ha encontrado un problema que desea solucionar, o tiene una mejora del sitio que desea realizar.

1. Si quieres recibir comentarios o discutir, abre una discusión [issue](https://github.com/expressjs/expressjs.com/issues/new/choose) antes de comenzar el trabajo. Esto no es necesario, sino alentado para propuestas más amplias.
 - Si bien alentamos mucho este paso, solo es para las propuestas que proponen cambios significativos. Nos ayuda a clarificar y enfocar el trabajo y a asegurar que esté al tanto de las prioridades generales del proyecto.
 - Para las propuestas que proponen pequeñas mejoras o correcciones, esto no es necesario. Puedes omitir este paso.
 - Al abrir un problema, por favor dale un título y rellene la sección de descripción. Cuantos más detalles proporciones, más comentarios podemos dar.

2. Después de recibir su incidencia, el equipo de documentación Express JS responderá con comentarios. Leemos todos los envíos y siempre tratamos de responder rápidamente con comentarios.
 - Para envíos que propongan cambios significativos, le animamos a seguir el proceso de revisión antes de comenzar el trabajo.

#### Paso 2: Obtén el código de aplicación Base

Clona el repositorio y consigue el código:

    git clon https://github.com/expressjs/expressjs.com.git

¡Después de tener el código estás listo para empezar a hacer los cambios!

Pero en caso de que necesites una explicación adicional, esta sección a continuación describe las secciones principales de la base del código, donde es probable que se realicen la mayoría de los cambios.

**Archivos de página Markdown**:

- Estos archivos se renderizan a html y forman las páginas individuales del sitio. La mayor parte del contenido de texto de documentación del sitio está escrito en archivos `md`.
- Cambie estos para hacer cambios en el contenido/texto o marcado de páginas individuales.
- Cada idioma tiene su propio conjunto completo de páginas, ubicado en sus respectivos directorios de idiomas, todo el contenido de markdown en español se encuentra en el directorio `es`, por ejemplo.

**Incluye Parciales y Plantillas de Diseño**

- `_includes` son parciales que son importados y reutilizados a través de varias páginas.
 - Estos se utilizan para importar contenido de texto para reutilizar a través de páginas, como la documentación de la API, e. ., `_includes > api > es > 5x`, que está incluido en cada idioma.
 - Estos se utilizan para incluir los componentes de la página que componen la interfaz y estructura de la periferia de todo el sitio, por ejemplo, Header, Footer, etc.
- `_layouts` son las plantillas utilizadas para envolver las páginas individuales del sitio.
 - Estos se utilizan para mostrar la estructura de la periferia del sitio, como la cabecera y el pie de página, y para inyectar y mostrar páginas de marcado individuales dentro de la etiqueta 'contenido'.

**Archivos Markdown del blog**

- Estos archivos componen las entradas individuales del blog. Si quieres contribuir con una entrada en el blog por favor
 sigue las instrucciones específicas para [Cómo escribir una entrada en el blog.](https://expressjs.com/en/blog/write-post.html)
- Localizado bajo el directorio `_posts`.

**CSS or Javascript**

- Todos los archivos CSS y js se mantienen en carpetas `css` y `js` en la raíz del proyecto.

El sitio web Express JS se construye usando [Jeykyll](https://jekyllrb.com/) y está alojado en [Github Pages](https://pages.github.com/).

#### Paso 3: Ejecutar la aplicación

Ahora necesitarás una forma de ver tus cambios, lo que significa que necesitarás una versión en ejecución de la aplicación. Tiene dos opciones.

1. **Ejecute Locally**: Esto hace que la versión local de la aplicación esté funcionando en su máquina. Sigue nuestra [Guía de configuración local](https://github.com/expressjs/expressjs.com?tab=readme-ov-file#local-setup) para usar esta opción.
 - Esta es la opción recomendada para un trabajo moderado a complejo.
2. **Ejecutar usando Deploy Preview**: Usa esta opción si no quieres molestar con una instalación local. Parte de nuestro pipeline de integración continua incluye [Vista previa de despliegue Netlify](https://docs.netlify.com/site-deploys/deploy-previews/).
 1. Para usar esto necesitarás tener tus cambios en línea - después de que hayas hecho tu primer commit en tu rama de características, hacer una solicitud de extracción _borrador_.
 2. Después de completar los pasos de construcción, tendrás acceso a la pestaña **Vista previa de Desplegar** que ejecutará tus cambios en la web, reconstruyendo después de que cada commit sea empujado.
 3. Después de haber terminado completamente su trabajo y está listo para su revisión, elimine el estado del borrador en su solicitud de extracción y envíe su trabajo.

## Contribuyendo traducciones

#### Aviso: Hemos pausado todas las contribuciones de traducción.

> **IMPORTANTE:**
> Actualmente estamos trabajando hacia un flujo de trabajo de traducciones más estirado. Mientras se publique este aviso, _no_ aceptaremos cualquier envío de traducción.

¡Animamos enormemente las traducciones de la comunidad! Ya no tenemos traducciones profesionales, y creemos en el poder de nuestra comunidad para proporcionar traducciones precisas y útiles.

La documentación está traducida a estos idiomas:

- Inglés (`es`)
- Español (`es`)
- Francés (`fr`)
- Italiano (`it`)
- Indonesiano (`id`)
- Japonés (`ja`)
- Coreano (`ko`)
- Portugués brasileño (`pt-br`)
- Ruso (`ru`)
- Slovak (`sk`)
- Tailandés (`th`)
- Turco (`tr`)
- Ucraniano (`uk`)
- Uzbek (`uz`)
- Chino simplificado (`zh-cn`)
- Chino tradicional (`zh-tw`)

### Añadiendo nuevas traducciones completas del sitio

Si encuentras que falta una traducción en la lista puedes crear una nueva.

Para traducir Expressjs.com a un nuevo idioma, siga estos pasos:

1. Clona el repositorio [`expressjs.com`](https://github.com/expressjs/expressjs.com).
2. Crea un directorio para el idioma de tu elección usando su [código ISO 639-1](https://www.loc.gov/standards/iso639-2/php/code_list.php) como su nombre.
3. Copia `index.md`, `api.md`, `starter/`, `guide/`, `advanced/`, `resources/`, `4x/`, y `3x/`, al directorio de idiomas.
4. Elimina el enlace a la documentación 2.x del menú "Referencia API".
5. Actualiza la variable `lang` en los archivos de markdown copiados.
6. Actualiza la variable `title` en los archivos de markdown copiados.
7. Crea el archivo de encabezado, pie de página, aviso y anuncio para el idioma en el directorio `_includes/`, en los respectivos directorios, y hacer las modificaciones necesarias a los contenidos.
8. Crea el archivo de anuncio para el idioma en el directorio `_includes/`.
9. Asegúrese de añadir \`/{{ page.lang }}a todos los enlaces dentro del sitio.
10. Actualiza el [CONTRIBUTING.md](https://github.com/expressjs/expressjs.com/blob/gh-pages/CONTRIBUTING.md#contributing-translations) y los archivos `.github/workflows/translation.yml` con el nuevo idioma.

### Añadiendo páginas y traducciones de secciones

Muchas traducciones del sitio todavía faltan páginas. Para encontrar aquellas con las que necesitamos ayuda, puedes [filtrar para las PRs combinadas] (https://github.com/expressjs/expressjs.com/pulls?q=is%3Apr+is%3Aclosed+label%3Arequires-translation-es) que incluyen la etiqueta para tu idioma, tal como `requires-translation-es` para requiere traducción al español.

Si contribuye con una página o traducción de una sección, por favor consulte el PR original. Esto ayuda a la persona que fusiona tu traducción a eliminar la etiqueta del PR original.
