# Actividad_8
### 8º Actividad semanal. Bueno seguimos integrado con passport, y a la vez utilizamos la internacionalización para que neustra tienda tiene más alcance.
Bueno ahora tenemos cada vez más visitas pero estamos perdiendo visitas a la misma desde los paises con habla inglesa, por ello es interesante crear nuestro web con internacionalización, y a la vez el login desde al menos una red social(facebook, twitter, gmail), etc.

---

## Condiciones.
Generamos nuestra página para que pueda ser visitadas desde paises con lenguaje inglesa, para ello tendremos que integrar el plugin de intenacionalización I18 y traducir las mismas páginas en diferentes idiomas.
A la vez integraremos passport con cualquier otra estrategia de login con passport, ya bién sena facebook, twitter, gmail, etc.

## Características.
* Se utilizará NPM para la instalación de dependencias.
* El proyecto debe estar subido en un contendor en vagrant, y debe cumplir las siguientes condiciones:
  * Debe disponer de un vagrantfile y un archivo .sh donde se encuentren todos los scripts necesarios para construir el contenedor y nuestra aplicacion se autoejecute.
  * El contendor debe tener abierto el puerto 80 y apuntara internamente al puerto 3000 donde tenemos apuntado nuestro servidor de node.js
  * El contendor debe disponer un mysql instalado con la tabla descrita anteriormente.
  * Dentro del package.json debemos disponer la tarea production debe llamar al módulo forever y arrancar la maquina.
  * Debemos generar una nueva carpeta en nuestra estructura denominada log, donde se almacenará un log de los posibles errores que se produzcan en la aplicación.
  * Se utilizará nodemailer para el envio de los emails de los diferentes procesos.
  * Se utilizará Multer para las subidas de archivos al servidor.
  * Se utilizará sequelize para gestionar todas las entidades de nuestro proyecto como ORM del mismo.
  * Las vistas con las tablas dispondrán de paginación.
  * La gestión de las estrategias de logueo se realizará mediante passport.
