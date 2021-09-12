const { Router } = require('express');
const typeOfDocumentController = require('../controllers/typeOfDocumentController');
const router = Router();
const conexion = require('../database/conexion');
const moment = require('moment');
const ip = require('ip');

router.get('/', (req, res) => {     
  if (req.session.loggedin) {
    conexion.query('SELECT * FROM tiposDocumento',(error, listado)=>{
          if (error){
              throw error;
          } else {                       
            conexion.query('SELECT nombre,apellido FROM usuarios WHERE email = ?',[req.session.email],(error, registro)=>{
             res.render('typesOfDocuments/list.ejs', { 
                  listado,
                  alert : false,
                  error : '',
                  email : req.session.email,
                  nombre : registro[0].nombre.toUpperCase(),
                  apellido : registro[0].apellido.toUpperCase(),
                  idRol : req.session.idRol,
                  nombre_empresa : req.session.nombre_empresa
              }); 
             });           
          }   
      })
  } else {
    res.redirect('/');
  }
}) 



 
 router.get('/create', (req,res) => {
  console.log("Esta logeado?" + req.session.loggedin);
  console.log("Email " + req.session.email);
  res.render('typesOfDocuments/create.ejs', 
     {
       alert : false,
       error: '',
       email : req.session.email
     });
 })
 
 router.get('/edit/:id', (req,res) => {    
   
  const id = req.params.id;
  conexion.query('USE ' + req.session.id_empresa + '_empresa', (error, results) => {
    if (error) console.log(error);
    else {
      conexion.query('SELECT * FROM tiposDocumento WHERE id=?',[id] , (error, tipoDocumento) => {
       if (!error) {
           res.render('typesOfDocuments/edit.ejs', {
             tipoDocumento : tipoDocumento[0],
             email : req.session.email  
           })
       }        
      });
    }
  })
})
 
 router.get('/delete/:id', (req, res) => {
   const id = req.params.id;
   conexion.query('USE ' + req.session.id_empresa + '_empresa', (error, results) => {
    if (error) console.log(error);
    else {
      conexion.query('SELECT * FROM tiposDocumento WHERE id = ?',[id], (error, registro)=> {
        if (error) console.log(error);
        else {
          conexion.query('SELECT rol FROM roles WHERE id = ?',[req.session.idRol], (error, rol) => {
            if (error) console.log(error) 
            else {
                conexion.query('DELETE FROM tiposDocumento WHERE id = ?',[id], (error, result) => {
                  if (error) {
                    conexion.query('SELECT * FROM usuarios WHERE email = ?',[req.session.email],(error, usuario) => {  
                    conexion.query('SELECT * FROM tiposDocumento',(error, listado) => {  
                    res.render('typesOfDocuments/list.ejs', {
                          listado : listado,
                          alert : true,
                          error: 'ERROR: No es posible borrarlo, porque existen empleados asociados al tipo de documento.',
                          email : req.session.email,
                          nombre : usuario[0].nombre,
                          apellido : usuario[0].apellido
                    });
                    });
                  });
                  } else {
                    const datos = {
                      usuario: req.session.email,
                      rol: req.session.idRol,
                      accion: 'BAJA',
                      cargo : rol[0].rol,
                      idTipoDoc: registro[0].id,
                      descripcion: registro[0].descripcion,
                      fecha: moment().format('YYYY-DD-MM'),
                      hora: moment().format('HH:mm:ss'),
                      terminal : ip.address()
                  }
                  conexion.query('INSERT INTO auditoria_tipos_de_documentos SET ?', datos);
                  res.redirect('/typesOfDocuments');
                  } 
                });
            } 
          })
        }
      })
    }
    })
  });
 
 router.post('/create', typeOfDocumentController.create);
 router.post('/update', typeOfDocumentController.update);
 
module.exports = router; 

