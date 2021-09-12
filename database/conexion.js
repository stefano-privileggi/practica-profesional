const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''

  });
  
  conexion.connect((error) => {
    if (error) 
      console.error('El error de conexión es: ' + error);
    
  });
  
module.exports = conexion;