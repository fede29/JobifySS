psql -d localdb -a -f db/start_db.sql
node app.js &
pid_node=$!
newman run test/routes_tests.json
kill $pid_node


