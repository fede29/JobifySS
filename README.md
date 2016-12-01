# JobifySS
Shared Server para la aplicacion Jobify desarrollada en la materia Taller de Programacion 2

### Instalacion:
Puede instalar el servidor manualmente utilizando el script install.sh:

./install.sh

Le instalará los paquetes necesarios para correr el servidor localmente.

#### Instalación manual:
Para la instalacion manual deberá asegurarse de instalar los paquetes necesarios para el correcto funcionamiento del servidor:

sudo apt-get nodejs

sudo apt-get npm

sudo apt-get install postgresql-9.4

npm install

### Ejecucion local:

#### Mediante node:
En la consola correr el comando:

node app.js

Esto iniciará el servidor y correra una version local en el puerto 5000 (default).

#### Mediante heroku:
En la consola correr el comando:

heroku local web

Esto iniciará el servidor y correra una version local en el puerto 5000 (default).

#### Pagina principal:

http://localhost:5000/

## CORRER CON HEROKU
Para correr los comandos que se especifican a continuacion es necesario tener heroku instalado.

Ver: https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up

#### Para abrir la aplicacion que corre en heroku:

heroku open

#### O podemos acceder manualmente en el browser:

https://still-falls-40635.herokuapp.com
