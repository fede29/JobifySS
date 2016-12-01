# JobifySS
Shared Server para la aplicacion Jobify desarrollada en la materia Taller de Programacion 2

### Instalacion:
Puede instalar el servidor manualmente utilizando el script install.sh:

./install.sh

Le instalará los paquetes necesarios para correr el servidor localmente.

#### Instalación manual:
Para la instalacion manual deberá asegurarse de instalar los paquetes necesarios para el correcto funcionamiento del servidor.

sudo apt-get nodejs

sudo apt-get npm

sudo apt-get install postgresql-9.4

npm install

### El servidor se ejecuta localmente con el comando:

node app.js

### Acceso mediante el browser:

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


