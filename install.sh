sudo apt-get install nodejs
sudo apt-get install npm
sudo apt-get install postgresql-9.4

npm install

psql -d localdb -a -f db/start_db.sql

node app.js
