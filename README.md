# JobifySS
Shared Server para la aplicacion Jobify desarrollada en la materia Taller de Programacion 2

### Para correr el servidor localmente hay que instalar node y npm:

sudo apt-get nodejs

sudo apt-get npm

### Luego instalamos los paquetes requeridos por node:

npm install

### El servidor se ejecuta localmente con el comando:

node app.js

###Acceso mediante el browser:

http://localhost:5000/

Nos mostrara la pagina principal.

### La direccion para listar job positions:

http://localhost:5000/job_positions

##CORRER CON HEROKU
Para correr los comandos que se especifican a continuacion es necesario tener heroku instalado.

Ver: https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up

###para correr la aplicacion localmente con heroku correr en la consola:

heroku local web

funciona igual que si lo corremos localmente con el comando node 

###para abrir la aplicacion que corre en heroku:

heroku open

###O podemos acceder manualmente en el browser:

https://still-falls-40635.herokuapp.com


