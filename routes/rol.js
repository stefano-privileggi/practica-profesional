const { Router } = require('express');
const router = Router();

const database = require('../database/db');
const moment = require('moment');

router.get('/create', (req,res) => {
   database.query('SELECT * FROM roles ORDER BY rol', (error,roles) => {
     if (error) 
       console.log(error);
     else {
        database.query('SELECT nombre,apellido FROM usuarios WHERE email = ?',[req.session.email],(error, registro)=>{  
        res.render('roles/create.ejs', 
           {
             alert : false,
             error: '',
             email : req.session.email,
             roles : roles,
             nombre : registro[0].nombre.toUpperCase(),
             apellido : registro[0].apellido.toUpperCase() 
           });
          });
     }
   })
 });
 
 
 router.get('/', (req, res) => {     
   if (req.session.loggedin) {
     database.query('SELECT * FROM roles',(error, listado)=>{
         if (error){
             throw error;
         } else {                       
            database.query('SELECT nombre,apellido FROM usuarios WHERE email = ?',[req.session.email],(error, registro)=>{   
            res.render('roles/list.ejs', { 
                 listado,
                 alert : false,
                 error : '',
                 nombre : registro[0].nombre.toUpperCase(),
                 apellido : registro[0].apellido.toUpperCase() 
             }); 
            });           
         }   
     }) 
   } else {
     res.redirect('/');
   }
 });
 
 router.get('/edit/:id', (req, res) => {
   const id = req.params.id;
   database.query('SELECT * FROM roles WHERE id = ?', [id], (error, rol) => {
       if (error) {
           throw error
       } else {
           res.render('roles/edit.ejs',
               { 
                 rol: rol[0],
                 alert : false,
                 error : '',
                 email : req.session.email  
               }
           );
       }
     }
   )
 });
 

 
 router.get('/delete/:id', (req, res) => {
   const id = req.params.id;
   if (id == req.session.idRol) {
     res.render('roles.ejs', {
       alert: true,
       alertTitle: 'Error',
       alertMessage: 'No se puede borrar asi mismo',
       alertIcon: 'error',
       showConfirmButton: true,
       timer: 3000,
       ruta: '',
     });
   } else {
       database.query('SELECT * FROM roles WHERE id = ?',[id], (error, results) => { 
           const descripcion = results[0].rol;
           database.query('SELECT * FROM roles WHERE id = ?',[req.session.idRol], (error, resu) => { 
             const cargo = resu[0].rol;
             database.query('SELECT * FROM roles', (error, roles) => {
                 database.query('DELETE FROM roles WHERE id = ?',[id], (error) => {
                 if (error) {
                   res.render('roles/list.ejs', {
                     email : req.session.email,
                     listado : roles,
                     error : 'Existen usuarios asociados',
                     alert : true
                   }) 
                 } else {
                     const datos = {
                       usuario : req.session.email,
                       rol : req.session.idRol,
                       cargo : cargo,
                       accion : "BAJA",
                       id : id,
                       descripcion : descripcion,
                       fecha : moment().format('YYYY-DD-MM'),
                       hora : moment().format('HH:mm:ss')
                     }
                   database.query('INSERT INTO auditoria_roles SET ?',datos, () => {
                 });
                 res.redirect('/roles');
                 } 
               })     
             })
           })   
       }) 
     }
 });

 const rolController = require('../controllers/rolController');
 
 router.post('/roles/update', rolController.update);
 router.post('/roles/create', rolController.create);
 
module.exports = router;