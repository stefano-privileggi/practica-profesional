const mysql = require('mysql');

const database = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_modelo'
});

database.connect((error) => {
  if (error) 
    console.error('El error de conexión es: ' + error)
});

module.exports = database;

