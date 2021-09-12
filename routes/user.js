const { Router } = require('express');
const router = Router();

const conexion = require('../database/conexion');
const moment = require('moment');
const ip = require('ip');

router.get('/', (req, res) => {
   if (req.session.loggedin) {
    conexion.query('USE ' + req.session.id_empresa + '_empresa', (error, results) => {
      if (error) console.log(error);
      else { 
        conexion.query('SELECT * FROM usuarios',(error, listado)=>{
              if (error) console.log(error);
              else {
                conexion.query('SELECT nombre,apellido FROM usuarios WHERE email = ?',[req.session.email],(error, registro)=>{  
                  res.render('users/list.ejs', {
                      listado,
                      alert : false,
                      error : '',
                      email : req.session.email,
                      nombre : registro[0].nombre.toUpperCase(),
                      apellido : registro[0].apellido.toUpperCase() 
                  });
                  })
              }
        })
      } 
    })
  } else
      res.redirect('/');
})



 router.get('/create', (req,res) => {
  conexion.query('USE ' + req.session.id_empresa + '_empresa', (error, results) => {
    if (error) console.log(error);
    else { 
          conexion.query('SELECT * FROM roles ORDER BY rol', (error, roles) => {
            if (error) console.log(error);
            else { 
              conexion.query('SELECT nombre,apellido FROM usuarios WHERE email = ?',[req.session.email],(error, registro)=>{  
                res.render('users/create.ejs', {
                  alert : false,
                  error: '',
                  email : req.session.email,
                  roles : roles,
                  nombre : registro[0].nombre.toUpperCase(),
                  apellido : registro[0].apellido.toUpperCase() 
                });
              })
            }
          })
      }
    })
  })


 router.get('/edit/:email', (req, res) => {
   const email = req.params.email;
   conexion.query('USE ' + req.session.id_empresa + '_empresa', (error, results) => {
    if (error) console.log(error);
    else {
        conexion.query('SELECT * FROM usuarios WHERE email = ?', [email], (error, usuario) => {
          if (error) console.log(error);
          else {
              conexion.query('SELECT nombre,apellido FROM usuarios WHERE email = ?',[req.session.email],(error, registro) => {   
                res.render('users/edit.ejs',
                    {
                      usuario: usuario[0],
                      alert : false,
                      error : '',
                      email : req.session.email,
                      nombre : registro[0].nombre.toUpperCase(),
                      apellido : registro[0].apellido.toUpperCase() 
                    }
                );
              })
          }
        })
      } 
    });
  })

 router.get('/delete/:email', (req, res) => {
   const email = req.params.email;
   conexion.query('USE ' + req.session.id_empresa + '_empresa', (error, results) => {
    if (error) console.log(error);
    else {
        conexion.query('SELECT * FROM usuarios WHERE email = ?',[email], (error, registro) => {
            conexion.query('SELECT * FROM roles WHERE id = ?',[req.session.idRol], (error, result) => {
              const id_rol = registro[0].idRol;
              conexion.query('SELECT * FROM usuarios', (error,listado) => {
                if (id_rol == req.session.idRol) {
                    conexion.query('SELECT nombre,apellido FROM usuarios WHERE email = ?',[req.session.email],(error, registro) => {  
                      res.render('users/list.ejs', {
                      alert: true,
                      alertTitle: 'ERROR',
                      alertMessage: 'DEBE CERRAR SESSION PARA ELIMINAR EL USUARIO',
                      alertIcon: 'error',
                      showConfirmButton: true,
                      timer: 5000,
                      ruta: '/users',
                      email : req.session.email,
                      listado : listado,
                      nombre : registro[0].nombre.toUpperCase(),
                      apellido : registro[0].apellido.toUpperCase() 
                      });
                    })
                  } else {
                      conexion.query('DELETE FROM usuarios WHERE email = ?',[email], (error) => {
                      if (error) console.log(error);
                      else {
                          const datos = {
                            usuario: req.session.email,
                            rol: req.session.idRol,
                            accion: 'BAJA',
                            cargo: result[0].rol,
                            email: email,
                            nombre: registro[0].nombre,
                            apellido: registro[0].apellido,
                            contraseña: registro[0].contraseña,
                            id_rol: registro[0].idRol,
                            fecha: moment().format('YYYY-DD-MM'),
                            hora: moment().format('HH:mm:ss'),
                            terminal : ip.address()
                          }
                          conexion.query('INSERT INTO auditoria_usuarios SET ?',datos);
                          res.redirect('/users');
                      }
                      })
                    }
              })
            })
        })
    }
  })
})

 const userController = require('../controllers/userController');

 router.post('/create', userController.create);
 router.post('/update', userController.update);


 module.exports = router;