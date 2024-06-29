Profesor, aquí le dejo unos pasos para poder instalar correctamente todo lo que necesita para correr nuestro proyecto :)

Primero que todo, cree y active el entorno como normalmente lo hacemos (desde el cmd) pero esta vez deberá activarlo dentro de la carpeta del repositorio. Es probable que no necesite crear el entorno virtual si ya lo ha hecho anteriormente, así que sólo tendrá que activarlo mediante <virtualenv venv>.

Después de activar el entorno, dentro de la consola de VS, ejecute los siguientes comandos:

1. pip install -r requirements.txt
2. pip install bootstrap4
3. pip install crispy-bootstrap4
4. pip install django-extensions
5. Ejecute el servidor.

**NOTAS IMPORTANTES**: LAS FUNCIONES DEL CRUD, ASÍ COMO PODER ACCEDER AL PANEL DE ADMINISTRACIÓN DE LA ATIENDA, SE ENCUENTRAN EN EL DROPDOWN DEL PERFIL.

Todos los usuarios poseen permisos diferentes y pueden acceder a distintas funcionalidades de la página, es por esto que le creamos 5 usuarios para que pueda comprobar estos permisos. Uno de estos usuarios está creado específicamente para usted y está dentro de la categoría de usuarios "SuperStaff", su usario poseé el acceso a la última funcionalidad del CRUD, la cual es MODIFICAR. Es importante mencionar que su usuario posee permisos para acceder al Panel de Administración, no obstante, no poseé permisos para modificar nada a través de este, salvo los productos.

Primero, le recomendamos que ingrese con el SuperUser, ya que este usuario contiene todos los permisos.

Usuario SuperUser:
user: admin
pass: admin12345

Usuario SuperStaff
user: profevik
pass: vikval1234
Permisos: Agregar-Eliminar-Modificar-VerListado

Usuario para Agregar:
user: useraddproduct
pass: soloagrego123
Permisos: Agregar

Usuario para Eliminar:
user: userdeleteproduct
pass: soloelimino123
Permisos: Eliminar

Usuario para ver listado:
user: useronlyview
pass: soloveo123



