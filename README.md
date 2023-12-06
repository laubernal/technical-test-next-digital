Esta prueba técnica la he orientado a mostrar que entiendo los conceptos de DDD y arquitecura hexagonal. Cómo se puede comprobar no he
implementado value objects, y otros elementos que he considerado que no aportaban tanto valor a la prueba.

He decidido implementar el endpoint de ingresar dinero ya que al leer los requisitos he pensado que era el que tenía más conceptos de DDD
por implementar, ya que como he explicado arriba he orientado la prueba de esa manera. Obviamente a la hora de construir un producto
la forma de orientar el desarrollo es aportar el máximo valor al cliente.

A nivel de tecnologías he decidido usar NestJs ya que es un framework que conozco y que aporta mucha solidez a la hora de desarrollar
ya que gracias a el he podido usar comandos con CQRS. La base de datos la he implementado en memoria porque porque he querido ahorrar
tiempo y así evitarme implementar la conexión, el modelo, los mappers y todo lo necesario para que sea funcional.

Finalmente, me ha dado tiempo a implementar el endpoint de ingresar dinero y empezar con el test de este, pero con el poco tiempo que me 
quedaba no he podido finalizarlo, no se pueden ejecutar ya que no he podido configurarlos bien.

Sensaciones finales: A la hora de realizar una prueba de este tipo se pierde mucho tiempo en configurar el proyecto, ya que al empezar de cero
no hay ninguna base sobre la que trabajar y eso ralentiza mucho el desarrollo. Todo el tema de infraestructura, implementar el contenedor
de Docker, pese a ser sencillo no lo he realizado porque no lo veía el valor que podía aportar más allá de que cuando vayáis a probar 
no lo tengáis que instalar en local.