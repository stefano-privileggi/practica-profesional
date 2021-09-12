const { Router } = require('express');
const router = Router();

const conexion = require('../database/conexion');
const moment = require('moment');

const ip = require('ip');

router.get('/', (req, res) => {
   if (req.session.loggedin) {
      conexion.query('SELECT * FROM empleados', (error, empleados) => {
         if (error) console.log(error);
         else {
           conexion.query('SELECT * FROM tiposDocumento ORDER BY id', (error, documentos) => {
              conexion.query('SELECT nombre,apellido FROM usuarios WHERE email = ?',[req.session.email],(error, registro)=>{ 
                res.render('employees/list.ejs', 
                  {
                    empleados,
                    email : req.session.email,
                    documentos,
                    nombre : registro[0].nombre.toUpperCase(),
                    apellido : registro[0].apellido.toUpperCase(),
                    idRol : req.session.idRol,
                    nombre_empresa : req.session.nombre_empresa 
                  }  
                );
              })
           });
         }
       })
   } else {
     res.redirect('/');
   }
 });
 

 router.get('/edit/:id', (req, res) => {
   const id = req.params.id;
   conexion.query('USE ' + req.session.id_empresa + '_empresa', (error, results) => {
    if (error) console.log(error);
    else {
        conexion.query('SELECT * FROM empleados WHERE id = ?', [id], (error, empleado) => {
            if (error) console.log(error);
            else {
                conexion.query('SELECT * FROM tiposDocumento', (error,documentos) => {
                    res.render('employees/edit.ejs',
                    { 
                      empleado: empleado[0], 
                      alert : false,
                      error : '',
                      email : req.session.email,
                      documentos : documentos 
                    }
                  );
                });
                
            }
          }
        )
    }
  })
});
 
 router.get('/delete/:id', (req, res) => {
   if (req.session.loggedin) {
    conexion.query('USE ' + req.session.id_empresa + '_empresa', (error, results) => {
      if (error) console.log(error);
      else {
      const id = req.params.id;
          var sql = 'SELECT * FROM empleados WHERE id = ?';
          conexion.query(sql, [id] , (error, empleado) => {
            if (error) console.log(error);
            else {
              conexion.query('SELECT rol FROM roles WHERE id = ?',[req.session.idRol], (error, rol) => {
                if (error) console.log(error) 
                else {
                  const datos = {
                    usuario : req.session.email,
                    rol : req.session.idRol,
                    cargo : rol[0].rol,
                    accion : "BAJA",
                    idEmpleado : empleado[0].id,
                    nombre : empleado[0].nombre,
                    apellido : empleado[0].apellido,
                    idTipoDoc : empleado[0].idTipoDoc,
                    fecha : moment().format('YYYY-DD-MM'),
                    hora : moment().format('HH:mm:ss'),
                    terminal : ip.address()
                  }
                  conexion.query('INSERT INTO auditoria_empleados SET ?',datos, (error) => {
                    if (error) {
                        console.log(error);
                    }
                  });
                  conexion.query('DELETE FROM empleados WHERE id = ?',[id], (error)=> {
                    if (error) {
                      console.log(error);
                    }
                  });                 
                  res.redirect('/employees');
                }
              })
            }
          })
        }
      })
      }

    });
 
 const employeeController = require('../controllers/employeeController');

 
 router.post('/create', employeeController.create);
 router.post('/update', employeeController.update);

 module.exports = router;
 