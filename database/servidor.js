const mysql = require('mysql');

const servidor = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'servidor'
  });
  
  servidor.connect((error) => {
    if (error) 
      console.error('El error de conexión es: ' + error);
  });


  
module.exports = servidor;